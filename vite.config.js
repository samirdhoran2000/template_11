import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import prerender from 'vite-plugin-prerender'; 
import tailwindcss from '@tailwindcss/vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import fs from 'fs';

// Read and parse SEO data from seodata.json
const seoData = JSON.parse(fs.readFileSync('./seodata.json', 'utf-8'));

export default defineConfig({
  
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          title: seoData.data.title || 'Default Title',
          description: seoData.data.meta_description || 'Default Description',
          keywords: seoData.data.keywords || '',
          og_title: seoData.data.og_title || '',
          og_description: seoData.data.og_description || '',
          og_image: seoData.data.og_image || '',
          og_type: seoData.data.og_type || '',
          favicon: seoData.data.favicon || '',
          robots:
            seoData.data.status === 'Active' ? 'index, follow' : 'noindex, nofollow',
          script_1: seoData.data.script_1 || '',
          script_2: seoData.data.script_2 || '',
          domain: seoData.data.domain || '',
          h1_text :  seoData.data.title || 'Default Title',
          h2_text :  seoData.data.meta_description || 'Default Title',    
          
        },
      },
    })
  ],
  define: {
  'import.meta.env.VITE_H1': JSON.stringify(seoData.data.title || ''),
  'import.meta.env.VITE_H2': JSON.stringify( seoData.data.meta_description || ''),
  },
});
