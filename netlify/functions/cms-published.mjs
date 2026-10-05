import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
export default async function handler(request) {
  const headers={'Content-Type':'application/json','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'};
  const reply=(status,message)=>new Response(JSON.stringify({message}),{status,headers});
  if(request.method!=='POST')return reply(405,'POST required');
  const secret=process.env.SANITY_WEBHOOK_SECRET,hook=process.env.NETLIFY_BUILD_HOOK_URL;
  if(!secret||!hook)return reply(503,'Publishing integration is not configured');
  let url;try{url=new URL(hook)}catch{return reply(503,'Invalid publishing configuration')}
  if(url.protocol!=='https:'||url.hostname!=='api.netlify.com'||!url.pathname.startsWith('/build_hooks/'))return reply(503,'Invalid publishing configuration');
  const raw=await request.text();if(raw.length>65536)return reply(413,'Payload too large');
  const signature=request.headers.get(SIGNATURE_HEADER_NAME);
  if(!signature||!await isValidSignature(raw,signature,secret))return reply(401,'Invalid signature');
  let data;try{data=JSON.parse(raw)}catch{return reply(400,'Invalid JSON')}
  if(typeof data?._id!=='string'||data._id.startsWith('drafts.')||data._id.startsWith('versions.')||!['article','author'].includes(data._type))return reply(202,'No public content change');
  try{const response=await fetch(url,{method:'POST',signal:AbortSignal.timeout(15000)});if(!response.ok)return reply(502,'Build trigger failed; retry this event');return reply(202,'Production rebuild requested');}
  catch{return reply(502,'Build trigger unavailable; retry this event')}
}
