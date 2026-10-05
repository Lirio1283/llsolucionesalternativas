import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {renderPortableText} from '../src/lib/portable-text.mjs';

// Deliberately creates draft IDs only. Import with --missing to preserve edits.
const authorId = 'll-equipo-editorial';
const imageReferencesFile=new URL('../docs/content/images/sanity-references.json',import.meta.url);
const imageReferences=existsSync(imageReferencesFile)?JSON.parse(readFileSync(imageReferencesFile,'utf8')):{};
const articles = [
  {slug:'construccion-resistente-a-sismos-rd', category:'Construcción',
    excerpt:'Antes de construir en RD, conoce qué preguntar sobre el suelo, el diseño estructural, la supervisión y las futuras ampliaciones de tu vivienda.',
    seoTitle:'Construcción resistente a sismos en RD: guía para propietarios',
    relatedServices:['ingenieria-civil','estudios-de-suelos','supervision-tecnica']},
  {slug:'prevenir-filtraciones-techos-rd', category:'Construcción',
    excerpt:'Una guía para identificar el origen de la humedad, revisar drenajes y detalles, y contratar la reparación de un techo de concreto con un alcance claro.',
    seoTitle:'Cómo prevenir filtraciones en techos de concreto en RD',
    relatedServices:['ingenieria-civil','supervision-tecnica']},
];
const documents = [{_id:`drafts.${authorId}`, _type:'author', name:'Equipo editorial de LLSOLUCIONES ALTERNATIVAS',
  biography:'Contenido informativo de LLSOLUCIONES ALTERNATIVAS E.I.R.L. para ayudar a propietarios a planificar sus proyectos.'}];
for (const article of articles) {
  const markdown = readFileSync(new URL(`../docs/content/${article.slug}.md`, import.meta.url),'utf8');
  const [heading, ...paragraphs] = markdown.trim().split(/\r?\n\r?\n/);
  let index=0;
  const body=[];
  for (const paragraph of paragraphs) {
    const lines=paragraph.startsWith('- ')?paragraph.split(/\r?\n/):[paragraph];
    for (const line of lines) {
      const key=`b${index++}`;
      const style=line.startsWith('## ')?'h2':'normal';
      const text=line.replace(/^## |^- /,'');
      const children=[],markDefs=[];
      let offset=0;
      for (const match of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
        if(match.index>offset)children.push({_type:'span',_key:`s${children.length}`,text:text.slice(offset,match.index),marks:[]});
        const mark=`link${markDefs.length}`;
        markDefs.push({_type:'link',_key:mark,href:match[2]});
        children.push({_type:'span',_key:`s${children.length}`,text:match[1],marks:[mark]});
        offset=match.index+match[0].length;
      }
      if(offset<text.length)children.push({_type:'span',_key:`s${children.length}`,text:text.slice(offset),marks:[]});
      body.push({_type:'block',_key:key,style,markDefs,children,...(line.startsWith('- ')?{listItem:'bullet',level:1}:{})});
    }
  }
  const document={_id:`drafts.ll-${article.slug}`,_type:'article',...article,
    title:heading.replace(/^# /,''),slug:{_type:'slug',current:article.slug},body,
    author:{_type:'reference',_ref:authorId,_weak:true},
    publishedAt:'2026-10-05T12:00:00Z',seoDescription:article.excerpt};
  if(imageReferences[article.slug]){
    document.hero=imageReferences[article.slug].hero;
    document.body.push(imageReferences[article.slug].credit);
  }
  if(document.title.length>140||document.seoTitle.length>70||document.seoDescription.length>170)throw new Error(`Metadata too long: ${article.slug}`);
  const html=renderPortableText(body);
  if(!html.includes('<h2>')||!html.includes('<ul>')||!html.includes('href='))throw new Error(`Invalid content: ${article.slug}`);
  documents.push(document);
  console.log(`${article.slug}: ${body.length} blocks; metadata and rendering checked`);
}
writeFileSync(new URL('../docs/content/sanity-drafts.ndjson',import.meta.url),documents.map(doc=>JSON.stringify(doc)).join('\n')+'\n');
