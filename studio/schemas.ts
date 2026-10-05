import {defineType,defineField} from 'sanity';
const serviceOptions=[
 ['Ingeniería civil','ingenieria-civil'],['Agrimensura y deslinde','agrimensura-y-deslinde'],['Estudios de suelos','estudios-de-suelos'],['Planos MIVED y ayuntamientos','planos-mived-y-ayuntamientos'],['Presupuestos de obra','presupuestos-de-obra'],['Proyectos llave en mano','proyectos-llave-en-mano'],['Supervisión técnica','supervision-tecnica'],['Alquiler de equipos','alquiler-de-equipos'],
 ['Movimiento de suelo','movimiento-de-suelo'],['Transporte','transporte'],['Perforación de pozos','perforacion-de-pozos'],['Demolición de infraestructuras','demolicion-de-infraestructuras'],
].map(([title,value])=>({title,value}));
export const schemaTypes=[
 defineType({name:'author',title:'Autores',type:'document',fields:[
  defineField({name:'name',title:'Nombre',type:'string',validation:rule=>rule.required()}),
  defineField({name:'biography',title:'Presentación y experiencia',type:'text',rows:3,description:'Incluya únicamente experiencia y credenciales verificadas.'}),
 ],preview:{select:{title:'name',subtitle:'biography'}}}),
 defineType({name:'article',title:'Artículos',type:'document',initialValue:{category:'Planificación'},groups:[{name:'content',title:'Contenido',default:true},{name:'seo',title:'Buscadores'},{name:'review',title:'Publicación'}],fields:[
  defineField({name:'title',title:'Título',type:'string',group:'content',validation:rule=>rule.required().max(140)}),
  defineField({name:'slug',title:'Dirección del artículo',type:'slug',group:'content',options:{source:'title',maxLength:96},description:'Evite cambiar la dirección después de publicar. Si cambia, necesita una redirección.',validation:rule=>rule.required().custom(value=>!value?.current||/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)?true:'Use letras minúsculas sin acentos, números y guiones.')}),
  defineField({name:'excerpt',title:'Resumen',type:'text',rows:3,group:'content',validation:rule=>rule.required().max(350)}),
  defineField({name:'author',title:'Autor',type:'reference',to:[{type:'author'}],group:'content',validation:rule=>rule.required()}),
  defineField({name:'category',title:'Tema',type:'string',group:'content',options:{list:['Planificación','Terreno','Diseño','Construcción','Supervisión']},validation:rule=>rule.required()}),
  defineField({name:'hero',title:'Imagen principal (opcional)',type:'image',group:'content',options:{hotspot:true},fields:[{name:'alt',title:'Descripción accesible',type:'string',validation:rule=>rule.required()}]}),
  defineField({name:'body',title:'Contenido',type:'array',group:'content',of:[{type:'block',styles:[{title:'Texto',value:'normal'},{title:'Subtítulo',value:'h2'},{title:'Subsección',value:'h3'},{title:'Cita',value:'blockquote'}],marks:{decorators:[{title:'Negrita',value:'strong'},{title:'Cursiva',value:'em'}],annotations:[{name:'link',type:'object',title:'Enlace',fields:[{name:'href',type:'url',title:'Dirección',validation:rule=>rule.uri({allowRelative:true,scheme:['https','http','mailto','tel']})}]}]}},{type:'image',options:{hotspot:true},fields:[{name:'alt',title:'Descripción accesible',type:'string',validation:rule=>rule.required()},{name:'caption',title:'Pie de imagen',type:'string'}]}],validation:rule=>rule.required().min(1)}),
  defineField({name:'relatedServices',title:'Servicios relacionados',type:'array',of:[{type:'string'}],group:'content',options:{list:serviceOptions},validation:rule=>rule.unique()}),
  defineField({name:'publishedAt',title:'Fecha de publicación',type:'datetime',group:'review',description:'No programe fechas futuras: la publicación programada aún no está integrada.',validation:rule=>rule.required().custom(value=>!value||Date.parse(value)<=Date.now()?true:'Use una fecha actual o anterior.')}),
  defineField({name:'seoTitle',title:'Título para buscadores (opcional)',type:'string',group:'seo',description:'Si está vacío se usa el título del artículo.',validation:rule=>rule.max(70).warning('Considere un título más breve.')}),
  defineField({name:'seoDescription',title:'Descripción para buscadores (opcional)',type:'text',rows:2,group:'seo',description:'Si está vacía se usa el resumen.',validation:rule=>rule.max(170).warning('Considere una descripción más breve.')}),
 ],preview:{select:{title:'title',subtitle:'category',media:'hero'}}}),
];
