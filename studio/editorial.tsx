export function ArticlePreview({document}:{document:{displayed:{_id:string;title?:string}}}){
 const site=process.env.SANITY_STUDIO_SITE_URL||'https://llsolucionesalternativas.com';
 const url=`${site}/api/preview?id=${encodeURIComponent(document.displayed._id)}`;
 return <div style={{padding:32,fontFamily:'system-ui',lineHeight:1.7}}><h2>Vista previa privada</h2><p>Guarde los cambios antes de abrir la vista previa. Se abrirá en otra pestaña y solicitará el acceso privado del equipo editorial.</p><a href={url} target="_blank" rel="noopener noreferrer">Abrir vista previa de «{document.displayed.title||'Artículo'}» ↗</a><p>Esta vista previa no publica el artículo. La versión pública cambia después de publicar y completar el despliegue.</p></div>;
}
