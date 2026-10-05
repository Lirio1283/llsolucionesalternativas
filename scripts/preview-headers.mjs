import {writeFile} from 'node:fs/promises';
if(['deploy-preview','branch-deploy'].includes(process.env.CONTEXT)){
 await writeFile('dist/_headers','/*\n  X-Robots-Tag: noindex, nofollow\n');
 await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
 console.log('Preview indexing disabled.');
}
