# Artículos iniciales

Dos artículos en español dominicano, preparados para revisión técnica y editorial del propietario. Las fuentes están enlazadas dentro de cada artículo. No se han asignado credenciales profesionales; las fotografías de terceros tienen su procedencia y licencia documentadas.

Los archivos Markdown son la copia editorial. `sanity-drafts.ndjson` contiene únicamente borradores de Sanity: dos artículos y un autor corporativo. La referencia al autor es débil para permitir su revisión antes de publicarlo.

Estos archivos conservan la versión inicial, no se sincronizan con las ediciones de Studio. Sanity es la fuente del contenido publicado. Para futuros artículos y correcciones, editar y publicar directamente en Studio; no es necesario modificar el repositorio ni hacer un push. No volver a importar estos borradores después de publicarlos: podría recrear borradores con contenido anterior aunque se use `--missing`.

Para regenerar el archivo de importación desde la raíz:

```sh
node scripts/prepare-editorial-drafts.mjs
```

Para importar desde `studio`, con la sesión de Sanity iniciada:

```sh
npx sanity datasets import ../docs/content/sanity-drafts.ndjson production --project-id=k56pw45w --missing
```

`--missing` conserva los documentos existentes; no reemplaza cambios realizados en Studio. Regenerar este archivo no actualiza borradores ya importados.

Antes de publicar, revisar el contenido técnico, confirmar el nombre del autor y ajustar la fecha de publicación. Publicar primero el autor y después cada artículo. La publicación en el sitio depende de una nueva compilación de Netlify, iniciada por el webhook de Sanity si está configurado.

## Fotografías

Actualización: las dos fotografías iniciales fueron sustituidas en los artículos publicados por ilustraciones arquitectónicas conceptuales generadas con el servicio integrado `image_gen`. Los originales nuevos son `images/sismos-conceptual.png` y `images/techo-conceptual.png`; los prompts completos y textos alternativos están en `images/generated-sources.json`. Las imágenes se identifican como generadas con IA, sin presentarlas como obras de la empresa ni detalles técnicos ejecutables. No se les atribuye una licencia de dominio público.

`images/sanity-references.json` ahora contiene las referencias actuales. Las fotografías y sus licencias siguientes se conservan como archivo histórico.

Se añadieron imágenes principales a los dos borradores, con texto alternativo y créditos enlazados al final. Son imágenes ilustrativas de terceros, no obras de la empresa:

- Sismos: [Rebar.jpg, MarnixR](https://commons.wikimedia.org/wiki/File:Rebar.jpg), CC0 1.0; original de 600 × 800 px.
- Filtraciones: [Flat roof roofing.JPG, KVDP](https://commons.wikimedia.org/wiki/File:Flat_roof_roofing.JPG), cedida al dominio público por su autor; versión web de 1280 × 1029 px.

Las licencias fueron comprobadas en las páginas de cada archivo el 5 de octubre de 2026. `images/sources.json` guarda procedencia, autoría y licencia; `images/sanity-references.json` guarda las referencias de los archivos subidos a Sanity. Se conservan las descargas en esta carpeta.

Para volver a aplicar estas imágenes, desde `studio`:

```sh
npx sanity exec scripts/add-editorial-images.mjs --with-user-token
```

Este script modifica únicamente los dos borradores y conserva el texto existente. Actualiza su imagen principal y un crédito identificado; no publica artículos. Comprueba la revisión del documento para evitar sobrescribir una edición concurrente. Después se puede regenerar el NDJSON desde la raíz para incluir las imágenes.

El script anterior corresponde a las fotografías antiguas. Para las nuevas ilustraciones, `studio/scripts/replace-editorial-images.mjs` sustituye imágenes y créditos en los artículos publicados y en cualquier borrador existente, con control de revisión. Ejecutarlo activa la compilación mediante el webhook; no modifica los demás campos editoriales.
