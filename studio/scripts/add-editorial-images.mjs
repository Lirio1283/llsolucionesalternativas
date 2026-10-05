import {getCliClient} from 'sanity/cli';
import {readFileSync, createReadStream, existsSync, writeFileSync} from 'node:fs';

// Run from studio: sanity exec scripts/add-editorial-images.mjs --with-user-token
// Changes only these draft heroes and appends source credits without replacing text.
const client=getCliClient({apiVersion:'2025-02-19'}).withConfig({projectId:'k56pw45w',dataset:'production',useCdn:false,perspective:'raw'});
const sources=JSON.parse(readFileSync(new URL('../../docs/content/images/sources.json',import.meta.url),'utf8'));
const references={};
for(const source of sources){
  const id=`drafts.ll-${source.slug}`;
  const draft=await client.getDocument(id);
  if(!draft||draft._type!=='article')throw new Error(`Draft missing: ${id}. No published document will be modified.`);
  const file=new URL(`../../docs/content/images/${source.filename}`,import.meta.url);
  if(!existsSync(file))throw new Error(`Missing image: ${source.filename}`);
  const asset=await client.assets.upload('image',createReadStream(file),{
    filename:source.filename, label:source.alt,
    creditLine:`${source.author} / Wikimedia Commons / ${source.license}`,
    source:{id:source.source,name:'Wikimedia Commons',url:source.source},
  });
  const hero={_type:'image',alt:source.alt,asset:{_type:'reference',_ref:asset._id}};
  const credit={_type:'block',_key:'editorial-image-credit',style:'normal',
    markDefs:[{_type:'link',_key:'image-source',href:source.source}],
    children:[{_type:'span',_key:'credit',text:source.credit,marks:['image-source']}]};
  const body=[...(draft.body||[]).filter(block=>block._key!==credit._key),credit];
  await client.patch(id).ifRevisionId(draft._rev).set({hero,body}).commit();
  const verified=await client.getDocument(id);
  if(verified.hero?.asset?._ref!==asset._id||!verified.body.some(block=>block._key===credit._key))throw new Error(`Verification failed: ${id}`);
  references[source.slug]={hero,credit};
  console.log(`Verified image and source credit on draft: ${source.slug}`);
}
writeFileSync(new URL('../../docs/content/images/sanity-references.json',import.meta.url),JSON.stringify(references,null,2)+'\n');
