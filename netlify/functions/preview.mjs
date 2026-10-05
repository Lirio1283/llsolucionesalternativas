import { timingSafeEqual } from 'node:crypto';
import { escapeHtml, renderPortableText } from '../../src/lib/portable-text.mjs';
export default async function handler(request) {
  const headers={'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; style-src 'unsafe-inline'; img-src https://cdn.sanity.io; base-uri 'none'; frame-ancestors 'none'"};
  const reply=(status,message,extra={})=>new Response(message,{status,headers:{...headers,...extra}});
  if(request.method!=='GET')return reply(405,'GET required');
  const {SANITY_PROJECT_ID:project,SANITY_DATASET:dataset='production',SANITY_PREVIEW_TOKEN:token,PREVIEW_PASSWORD:password}=process.env;
  if(!project||!token||!password)return reply(503,'La vista previa aún no está configurada.');
  const expected=Buffer.from(`editor:${password}`);let actual;
  try{const authorization=request.headers.get('authorization')||'';actual=authorization.startsWith('Basic ')?Buffer.from(authorization.slice(6),'base64'):Buffer.alloc(0)}catch{actual=Buffer.alloc(0)}
  if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return reply(401,'Acceso privado a la vista previa.',{'WWW-Authenticate':'Basic realm="Vista previa LL", charset="UTF-8"'});
  const id=new URL(request.url).searchParams.get('id')||'';if(!/^[a-zA-Z0-9_.-]{1,200}$/.test(id))return reply(400,'Artículo no válido.');
  if(!/^[a-z0-9]+$/.test(project)||!/^[a-z0-9_-]+$/.test(dataset))return reply(503,'Configuración no válida.');
  const cleanId=id.replace(/^drafts\./,'');const query=`*[_type == "article" && (_id == $draft || _id == $published)] | order(_id desc) [0] {title, excerpt, body, "author": author->{name}}`;
  const url=new URL(`https://${project}.api.sanity.io/v2025-02-19/data/query/${dataset}`);url.searchParams.set('query',query);url.searchParams.set('$draft',JSON.stringify(`drafts.${cleanId}`));url.searchParams.set('$published',JSON.stringify(cleanId));url.searchParams.set('perspective','raw');
  try{const response=await fetch(url,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(15000)});if(!response.ok)return reply(502,'No pudimos cargar la vista previa.');const {result}=await response.json();if(!result)return reply(404,'No encontramos el artículo.');
    return reply(200,`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Vista previa · ${escapeHtml(result.title)}</title><style>body{background:#f6f3e9;color:#20251f;font:17px/1.8 system-ui;margin:0}main{max-width:760px;margin:auto;padding:40px 24px}header{background:#20251f;color:#f6f3e9;padding:16px;font:12px system-ui;text-align:center}h1{font-size:clamp(32px,6vw,54px);line-height:1.15}img{max-width:100%;height:auto}a{color:inherit}figure{margin:30px 0}blockquote{border-left:3px solid #ed6636;padding-left:20px}</style><header>VISTA PREVIA PRIVADA · ESTE BORRADOR NO ESTÁ PUBLICADO</header><main><h1>${escapeHtml(result.title)}</h1><p>${escapeHtml(result.excerpt)}</p><small>${escapeHtml(result.author?.name)}</small><article>${renderPortableText(result.body,{project,dataset})}</article></main></html>`);
  }catch{return reply(502,'La vista previa no está disponible. Inténtelo de nuevo.');}
}
