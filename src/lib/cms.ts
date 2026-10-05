import { validateArticles } from './article-validation.mjs';
export interface Article {
  _id: string; _updatedAt: string; title: string; slug: string; excerpt: string; category: string;
  body: any[]; publishedAt: string; seoTitle?: string; seoDescription?: string;
  author: { name: string; biography?: string }; hero?: {asset?:{_ref:string};alt:string}; relatedServices?: string[];
}
export const cmsProject = import.meta.env.SANITY_PROJECT_ID || '';
export const cmsDataset = import.meta.env.SANITY_DATASET || 'production';
export const ARTICLE_QUERY = `*[_type == "article" && !(_id in path("drafts.**")) && !(_id in path("versions.**")) && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now())] | order(publishedAt desc) { _id, _updatedAt, title, "slug": slug.current, excerpt, body, publishedAt, seoTitle, seoDescription, "category": coalesce(category, "Bitácora técnica"), "author": author->{name, biography}, hero, relatedServices }`;
let articlePromise: Promise<Article[]> | undefined;
export function getArticles(): Promise<Article[]> {
  if(!articlePromise)articlePromise=loadArticles();
  return articlePromise;
}
async function loadArticles(): Promise<Article[]> {
  if(!cmsProject){
    if(import.meta.env.REQUIRE_CMS==='true')throw new Error('Production requires SANITY_PROJECT_ID');
    return [];
  }
  if(!/^[a-z0-9]+$/.test(cmsProject)||!/^[a-z0-9_-]+$/.test(cmsDataset))throw new Error('Invalid CMS configuration');
  const url=new URL(`https://${cmsProject}.api.sanity.io/v2025-02-19/data/query/${cmsDataset}`);
  url.searchParams.set('query',ARTICLE_QUERY);url.searchParams.set('perspective','published');
  const token=import.meta.env.SANITY_READ_TOKEN;
  const response=await fetch(url,{headers:token?{Authorization:`Bearer ${token}`}:{},signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw new Error(`CMS build failed (${response.status}); existing production deploy should be retained.`);
  const data=await response.json();return validateArticles(data.result) as Article[];
}
