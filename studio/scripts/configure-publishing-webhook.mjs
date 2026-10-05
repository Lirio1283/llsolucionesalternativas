import {getCliClient} from 'sanity/cli';
import {readFileSync,writeFileSync} from 'node:fs';
const client=getCliClient({apiVersion:'2025-02-19'}).withConfig({projectId:'k56pw45w',dataset:'production',useCdn:false});
const stateFile=new URL('../../artifacts/webhook-state.json',import.meta.url);
const state=JSON.parse(readFileSync(stateFile,'utf8'));
const url='https://llsolucionesalternativas.com/api/cms-published';
const uri='/hooks/projects/k56pw45w';
const hooks=await client.request({url:uri,method:'GET'});
const existing=hooks.filter(h=>h.url===url);
if(existing.length>1)throw new Error('Multiple matching webhooks; inspect before making changes.');
const config={type:'document',name:'Netlify: published articles and authors',url,dataset:'production',
 description:'Rebuild the production website after publishing, editing or unpublishing articles and authors.',
 rule:{on:['create','update','delete'],filter:'coalesce(after()._type, before()._type) in ["article", "author"] && !(coalesce(after()._id, before()._id) in path("drafts.**")) && !(coalesce(after()._id, before()._id) in path("versions.**"))',
 projection:'{"_id": coalesce(after()._id, before()._id), "_type": coalesce(after()._type, before()._type)}'},
 apiVersion:'v2021-03-25',httpMethod:'POST',includeDrafts:false,includeAllVersions:false,secret:state.secret,isDisabledByUser:!process.argv.includes('--enable')};
const {type,...update}=config;
const hook=await client.request({url:existing.length?`${uri}/${existing[0].id}`:uri,method:existing.length?'PATCH':'POST',body:existing.length?update:config});
state.sanityHookId=hook.id;
writeFileSync(stateFile,JSON.stringify(state,null,2));
console.log(JSON.stringify({id:hook.id,name:hook.name,dataset:hook.dataset,url:hook.url,includeDrafts:hook.includeDrafts,isDisabled:hook.isDisabled,isDisabledByUser:hook.isDisabledByUser}));
