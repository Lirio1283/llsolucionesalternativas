import test from 'node:test';
import assert from 'node:assert/strict';
import {renderPortableText,safeLink,imageUrl} from '../src/lib/portable-text.mjs';
import {validateArticles} from '../src/lib/article-validation.mjs';
const article={_id:'abc',slug:'planificar-una-obra',title:'Planificar',excerpt:'Una guía',body:[{_type:'block'}],publishedAt:'2026-10-05T12:00:00Z',author:{name:'Autor'}};
test('rejects drafts, version records, duplicate slugs and incomplete content',()=>{
 assert.throws(()=>validateArticles([{...article,_id:'drafts.abc'}]));assert.throws(()=>validateArticles([{...article,_id:'versions.release.abc'}]));assert.throws(()=>validateArticles([article,{...article,_id:'def'}]));assert.throws(()=>validateArticles([{...article,author:null}]));assert.throws(()=>validateArticles([{...article,slug:'../secret'}]));assert.throws(()=>validateArticles([{...article,body:[]}]));assert.equal(validateArticles([article]).length,1);
});
test('rich text escapes markup and rejects executable links',()=>{
 const html=renderPortableText([{_type:'block',style:'script',markDefs:[{_key:'link',href:'javascript:alert(1)'}],children:[{text:'<img src=x onerror=alert(1)>',marks:['link']}]}]);assert.equal(html,'<p>&lt;img src=x onerror=alert(1)&gt;</p>');assert.equal(safeLink('//evil.com'),null);assert.equal(safeLink('/\\evil.com'),null);assert.equal(safeLink('data:text/html,hello'),null);
});
test('renders valid headings, lists, links, and closes lists',()=>{
 const html=renderPortableText([{_type:'block',style:'h2',children:[{text:'Planificación',marks:['strong']}]},{_type:'block',listItem:'bullet',children:[{text:'Paso uno'}]},{_type:'block',children:[{text:'Contactar',marks:['l']}],markDefs:[{_key:'l',href:'/contacto/'}]}]);assert.equal(html,'<h2><strong>Planificación</strong></h2><ul><li>Paso uno</li></ul><p><a href="/contacto/">Contactar</a></p>');
});
test('CMS image URLs cannot be forged into arbitrary HTML attributes',()=>{
 assert.equal(imageUrl('image-abc-100x100-jpg','project1','production'),'https://cdn.sanity.io/images/project1/production/abc-100x100.jpg?w=1400&fit=max&auto=format');assert.equal(imageUrl('https://evil.com','project1','production'),null);assert.equal(imageUrl('image-abc-100x100-jpg','bad"','production'),null);
});
