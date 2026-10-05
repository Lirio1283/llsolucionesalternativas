import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://llsolucionesalternativas.com',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
