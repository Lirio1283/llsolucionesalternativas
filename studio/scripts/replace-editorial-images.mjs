import {getCliClient} from 'sanity/cli';
import {readFileSync,writeFileSync,createReadStream} from 'node:fs';
const client=getCliClient({apiVersion:'2025-02-19'}).withConfig({projectId:'k56pw45w',dataset:'production',useCdn:false,perspective:'raw'});
const sources=JSON.parse(readFileSync(new URL('../../docs/content/images/generated-sources.json',import.meta.url),'utf8'));
const references={};
for(const source of sources){
 const id=`ll-${source.slug}`;
 const published=await client.getDocument(id);
 if(!published||published._type!=='article')throw new Error(`Published article missing: ${id}`);
 const draft=await client.getDocument(`drafts.${id}`);
 const asset=await client.assets.upload('image',createReadStream(new URL(`../../docs/content/images/${source.filename}`,import.meta.url)),{filename:source.filename,label:source.alt,creditLine:source.credit});
 const hero={_type:'image',alt:source.alt,asset:{_type:'reference',_ref:asset._id}};
 const credit={_type:'block',_key:'editorial-image-credit',style:'normal',markDefs:[],children:[{_type:'span',_key:'credit',text:source.credit,marks:[]}]};
 const transaction=client.transaction();
 for(const document of [published,draft].filter(Boolean)){
  const body=[...(document.body||[]).filter(block=>block._key!==credit._key),credit];
  transaction.patch(document._id,patch=>patch.ifRevisionId(document._rev).set({hero,body}));
 }
 await transaction.commit();
 const verified=await client.getDocument(id);
 if(verified.hero?.asset?._ref!==asset._id)throw new Error(`Image verification failed: ${id}`);
 references[source.slug]={hero,credit};
 console.log(`Replaced published image: ${source.slug}`);
}
writeFileSync(new URL('../../docs/content/images/sanity-references.json',import.meta.url),JSON.stringify(references,null,2)+'\n');
