import {copyFile,mkdir} from 'node:fs/promises';
import sharp from 'sharp';
await mkdir('public/fonts',{recursive:true});
await copyFile('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2','public/fonts/manrope-latin.woff2');
await copyFile('node_modules/@fontsource-variable/manrope/LICENSE','public/fonts/OFL.txt');
await sharp('public/images/social.svg').png().toFile('public/images/social.png');
console.log('Prepared self-hosted Manrope font and social sharing image.');
