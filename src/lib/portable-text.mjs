export function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
export function safeLink(value) {
  if (typeof value !== 'string') return null;
  if (value.startsWith('/') && !value.startsWith('//') && !/[\\\s]/.test(value)) return value;
  try { const url = new URL(value); return ['https:','http:','mailto:','tel:'].includes(url.protocol) ? url.href : null; } catch { return null; }
}
export function imageUrl(ref, project, dataset, width=1400) {
  if (!/^[a-z0-9]+$/.test(project || '') || !/^[a-z0-9_-]+$/.test(dataset || '')) return null;
  const match = /^image-([a-zA-Z0-9]+)-(\d+x\d+)-(jpg|jpeg|png|webp|gif|avif)$/.exec(ref || '');
  if (!match) return null;
  return `https://cdn.sanity.io/images/${project}/${dataset}/${match[1]}-${match[2]}.${match[3]}?w=${width}&fit=max&auto=format`;
}
export function renderPortableText(blocks=[], {project='',dataset='production'}={}) {
  let html='', listType=null;
  const closeList=()=>{if(listType){html+=`</${listType}>`;listType=null;}};
  for(const block of blocks){
    if(block._type==='image'){
      closeList();const url=imageUrl(block.asset?._ref,project,dataset);
      if(url)html+=`<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(block.alt)}" loading="lazy" width="1400" height="900"/>${block.caption?`<figcaption>${escapeHtml(block.caption)}</figcaption>`:''}</figure>`;
      continue;
    }
    if(block._type!=='block')continue;
    const text=(block.children||[]).map(child=>{
      let value=escapeHtml(child.text||'').replace(/\n/g,'<br/>');
      for(const mark of child.marks||[]){
        if(mark==='strong')value=`<strong>${value}</strong>`;
        else if(mark==='em')value=`<em>${value}</em>`;
        else if(mark==='code')value=`<code>${value}</code>`;
        else { const definition=(block.markDefs||[]).find(item=>item._key===mark);const href=safeLink(definition?.href);if(href)value=`<a href="${escapeHtml(href)}">${value}</a>`; }
      }
      return value;
    }).join('');
    if(block.listItem){
      const type=block.listItem==='number'?'ol':'ul';
      if(listType!==type){closeList();html+=`<${type}>`;listType=type;}
      html+=`<li>${text}</li>`;
    }else{closeList();const tag=['h2','h3','h4','blockquote'].includes(block.style)?block.style:'p';html+=`<${tag}>${text}</${tag}>`;}
  }
  closeList();return html;
}
