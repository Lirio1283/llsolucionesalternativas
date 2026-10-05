import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {esESLocale} from '@sanity/locale-es-es';
import {schemaTypes} from './schemas';
import {ArticlePreview} from './editorial';
const projectId=process.env.SANITY_STUDIO_PROJECT_ID;
if(!projectId)throw new Error('Configure SANITY_STUDIO_PROJECT_ID en studio/.env antes de iniciar.');
export default defineConfig({name:'ll-editorial',title:'LL · Bitácora técnica',projectId,dataset:process.env.SANITY_STUDIO_DATASET||'production',plugins:[esESLocale(),structureTool({structure:S=>S.list().title('Mesa editorial').items([
 S.listItem().title('Todos los artículos').child(S.documentTypeList('article').title('Artículos')),
 S.listItem().title('Borradores').child(S.documentList().title('Borradores').filter('_type == "article" && _id in path("drafts.**")')),
 S.divider(),S.documentTypeListItem('author').title('Autores'),
 ]),defaultDocumentNode:(S,{schemaType})=>schemaType==='article'?S.document().views([S.view.form(),S.view.component(ArticlePreview).title('Vista previa')]):S.document().views([S.view.form()])})],schema:{types:schemaTypes}});
