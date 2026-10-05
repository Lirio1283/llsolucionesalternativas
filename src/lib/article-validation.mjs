export function validateArticles(records) {
  if(!Array.isArray(records))throw new Error('CMS response is not an article array');
  const slugs=new Set();
  return records.map(article=>{
    if(!article._id||article._id.startsWith('drafts.')||article._id.startsWith('versions.'))throw new Error('Unpublished CMS document rejected');
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug||''))throw new Error('Invalid article slug');
    if(slugs.has(article.slug))throw new Error(`Duplicate article slug: ${article.slug}`);slugs.add(article.slug);
    if(!article.title||!article.excerpt||!Array.isArray(article.body)||article.body.length===0)throw new Error(`Incomplete article: ${article.slug}`);
    if(!article.author?.name)throw new Error(`Missing author: ${article.slug}`);
    if(!article.publishedAt||!Number.isFinite(Date.parse(article.publishedAt)))throw new Error(`Invalid date: ${article.slug}`);
    if(article.hero?.asset?._ref&&!article.hero.alt)throw new Error(`Missing image alt: ${article.slug}`);
    return article;
  });
}
