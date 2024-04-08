'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { resetHeaderState } from '@akinon/next/redux/reducers/header';
import { closeMiniBasket } from '@akinon/next/redux/reducers/root';
import { ROUTES } from '@theme/routes';
import { GoogleTagManager } from '@next/third-parties/google';
import { pushPageView } from '@theme/utils/gtm';

export default function RootTemplate({
  children
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const URL = process.env.NEXT_PUBLIC_URL;
  const currentUrl = URL + pathname + searchParams;

  useEffect(() => {
    dispatch(closeMiniBasket());
    dispatch(resetHeaderState());
  }, [dispatch, pathname, searchParams]);

  useEffect(() => {
    if (pathname === ROUTES.HOME) {
      window.scrollTo(0, 0);
    }
    pushPageView(pathname);
  }, [pathname]);

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: currentUrl,
    name: 'Project Zero',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: `${URL}/list/?search_text={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    ]
  };

  const jsonLdOrganization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url: currentUrl,
    name: 'Project Zero',
    logo: `${URL}/logo.svg`
  };

  return (
    <>
      {/* Google Tag Manager */}
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GTM_KEY || 'GTM-W8JJWXD'}
      />
      {/* End Google Tag Manager */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      {children}
    </>
  );
}
