import { urlLocaleMatcherRegex } from '@akinon/next/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const matchedLocale = url.pathname.match(urlLocaleMatcherRegex);

  const sitemap = await fetch(`${process.env.SERVICE_BACKEND_URL}/sitemap.xml`);
  const sitemapNodes = [
    'specialpages',
    'products',
    'categories',
    'flatpages',
    'landingpages'
  ];

  let sitemapContent = await sitemap.text();

  sitemapNodes.forEach((sitemapNode) => {
    sitemapContent = sitemapContent.replace(
      new RegExp(
        `<loc>[\\.\\w:\\/-]+(${sitemapNode}-\\d+)[\\.\\w\\/-]+</loc>`,
        'g'
      ),
      `<loc>${process.env.NEXT_PUBLIC_URL}${
        matchedLocale?.[0] ?? ''
      }/sitemap/$1</loc>`
    );
  });

  return new Response(sitemapContent, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
