import {readdir,readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
async function walk(dir){const files=[];for(const entry of await readdir(dir,{withFileTypes:true})){const target=path.join(dir,entry.name);if(entry.isDirectory())files.push(...await walk(target));else files.push(target)}return files;}
const files=await walk(root),htmlFiles=files.filter(file=>file.endsWith('.html'));const errors=[],titles=new Set();
for(const file of htmlFiles){const html=await readFile(file,'utf8'),name=path.relative(root,file);
 if(!/<html[^>]+lang="es"/.test(html))errors.push(`${name}: Spanish language missing`);
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];if(!title||titles.has(title))errors.push(`${name}: missing/duplicate title`);titles.add(title);
 if(!html.includes('name="description"')||!html.includes('rel="canonical"'))errors.push(`${name}: metadata missing`);
 if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(`${name}: expected one H1`);
 if(/cdn\.tailwindcss\.com|drafts\.|SANITY_READ_TOKEN|NETLIFY_BUILD_HOOK_URL/.test(html))errors.push(`${name}: unsafe or legacy content`);
 for(const match of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)){const url=new URL(match[1],'https://llsolucionesalternativas.com');if(url.pathname.startsWith('/api/'))continue;const target=path.join(root,decodeURIComponent(url.pathname));try{const info=await stat(target);if(info.isDirectory())await stat(path.join(target,'index.html'));}catch{errors.push(`${name}: missing ${url.pathname}`)}}
}
for(const required of ['index.html','404.html','sitemap-index.xml','rss.xml','robots.txt','images/social.png','fonts/manrope-latin.woff2']){if(!files.includes(path.join(root,required)))errors.push(`Missing generated asset: ${required}`)}
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');if(/gracias|404|drafts|api\/preview/.test(sitemap))errors.push('Sitemap includes private/non-indexable routes');
for(const key of ['SANITY_READ_TOKEN','SANITY_PREVIEW_TOKEN','SANITY_WEBHOOK_SECRET','NETLIFY_BUILD_HOOK_URL','PREVIEW_PASSWORD']){const secret=process.env[key];if(secret&&secret.length>7){for(const file of files.filter(file=>/\.(html|js|json|xml|css)$/.test(file))){if((await readFile(file,'utf8')).includes(secret))errors.push(`Secret exposed in ${path.relative(root,file)}`)}}}
if(errors.length)throw new Error(errors.join('\n'));console.log(`Verified ${htmlFiles.length} pages, internal links, assets, metadata and secret isolation.`);
