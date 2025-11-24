import { generateSitemap } from 'next-sitemap';
import config from '../next-sitemap.config.js';

await generateSitemap(config);
console.log('✅ Sitemap generated successfully');
