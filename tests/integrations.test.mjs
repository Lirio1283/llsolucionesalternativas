import test from 'node:test';
import assert from 'node:assert/strict';
import {encodeSignatureHeader,SIGNATURE_HEADER_NAME} from '@sanity/webhook';
import webhook from '../netlify/functions/cms-published.mjs';
import preview from '../netlify/functions/preview.mjs';
const secret='test-only-signing-secret',hook='https://api.netlify.com/build_hooks/test-only';
const envKeys=['SANITY_WEBHOOK_SECRET','NETLIFY_BUILD_HOOK_URL','SANITY_PROJECT_ID','SANITY_DATASET','SANITY_PREVIEW_TOKEN','PREVIEW_PASSWORD'];
function setupEnv(values){const previous=Object.fromEntries(envKeys.map(key=>[key,process.env[key]]));for(const key of envKeys)delete process.env[key];Object.assign(process.env,values);return ()=>{for(const key of envKeys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key]}}}
async function signedRequest(data){const body=JSON.stringify(data);return new Request('https://example.com/api/cms-published',{method:'POST',body,headers:{[SIGNATURE_HEADER_NAME]:await encodeSignatureHeader(body,Date.now(),secret)}})}
test('webhook requires configuration and rejects forged signatures',async()=>{
 const restore=setupEnv({});try{assert.equal((await webhook(new Request('https://example.com',{method:'POST'}))).status,503);process.env.SANITY_WEBHOOK_SECRET=secret;process.env.NETLIFY_BUILD_HOOK_URL=hook;assert.equal((await webhook(new Request('https://example.com',{method:'POST',body:'{}',headers:{[SIGNATURE_HEADER_NAME]:'forged'}}))).status,401);}finally{restore()}
});
test('webhook ignores drafts and rebuilds only approved public document events',async()=>{
 const restore=setupEnv({SANITY_WEBHOOK_SECRET:secret,NETLIFY_BUILD_HOOK_URL:hook});const originalFetch=globalThis.fetch;let calls=0;globalThis.fetch=async url=>{assert.equal(String(url),hook);calls++;return new Response('{}',{status:200})};try{
  assert.equal((await webhook(await signedRequest({_id:'drafts.article1',_type:'article'}))).status,202);assert.equal(calls,0);
  assert.equal((await webhook(await signedRequest({_id:'article1',_type:'article'}))).status,202);assert.equal(calls,1);
  assert.equal((await webhook(await signedRequest({_id:'author1',_type:'author'}))).status,202);assert.equal(calls,2);
 }finally{globalThis.fetch=originalFetch;restore()}
});
test('failed build hook returns retryable error rather than false success',async()=>{
 const restore=setupEnv({SANITY_WEBHOOK_SECRET:secret,NETLIFY_BUILD_HOOK_URL:hook});const originalFetch=globalThis.fetch;globalThis.fetch=async()=>new Response('',{status:500});try{assert.equal((await webhook(await signedRequest({_id:'article1',_type:'article'}))).status,502)}finally{globalThis.fetch=originalFetch;restore()}
});
test('draft preview is inaccessible without authentication and always uncached/noindex',async()=>{
 const restore=setupEnv({SANITY_PROJECT_ID:'testproject',SANITY_PREVIEW_TOKEN:'private-test-token',PREVIEW_PASSWORD:'private-test-password'});try{
  const response=await preview(new Request('https://example.com/api/preview?id=article1'));assert.equal(response.status,401);assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('X-Robots-Tag'),'noindex, nofollow');
 }finally{restore()}
});
test('authenticated preview fetches a draft server-side and escapes its content',async()=>{
 const restore=setupEnv({SANITY_PROJECT_ID:'testproject',SANITY_PREVIEW_TOKEN:'private-test-token',PREVIEW_PASSWORD:'private-test-password'});const originalFetch=globalThis.fetch;globalThis.fetch=async(url,options)=>{assert.equal(options.headers.Authorization,'Bearer private-test-token');assert.equal(new URL(url).searchParams.get('perspective'),'raw');return Response.json({result:{title:'<script>alert(1)</script>',excerpt:'Borrador',body:[{_type:'block',children:[{text:'Contenido'}]}],author:{name:'Autor'}}})};try{
  const response=await preview(new Request('https://example.com/api/preview?id=article1',{headers:{Authorization:`Basic ${Buffer.from('editor:private-test-password').toString('base64')}`}}));assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('private-test-token'));assert.ok(html.includes('ESTE BORRADOR NO ESTÁ PUBLICADO'));
 }finally{globalThis.fetch=originalFetch;restore()}
});
