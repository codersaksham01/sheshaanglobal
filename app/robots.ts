import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.sheshaanglobal.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/*?*price=', '/*?*filter='],
      },
      // Explicit Authorization for Web Search Spiders
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // Explicit Authorization for Generative AI Crawlers (GEO)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap-index.xml`,
      `${BASE_URL}/sitemap.xml`,
    ],
    host: BASE_URL,
  };
}
