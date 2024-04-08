import { urlLocaleMatcherRegex } from '@akinon/next/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params }) {
  const node = context.params.node;
  const url = new URL(request.url);
  const matchedLocale = url.pathname.match(urlLocaleMatcherRegex);

  const sitemap = await fetch(
    `https://s3.eu-central-1.amazonaws.com/0fb534/sitemaps/sitemaps/sitemap-${node}.xml.gz`
  );
  let sitemapContent = await sitemap.text();

  sitemapContent = sitemapContent.replace(
    /\.com/g,
    `.com${matchedLocale?.[0] ?? ''}`
  );

  return new Response(sitemapContent, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
