'use client';

import { usePathname, useSearchParams } from 'next/navigation';

export default function CanonicalURL() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const URL = process.env.NEXT_PUBLIC_URL;
  const asPath = pathname === '/' ? '' : pathname;
  const currentPage = Number(searchParams.get('page')) || 1;
  const canonicalUrl =
    currentPage > 1
      ? `${(URL + asPath).split('?')[0]}/?page=${currentPage}`
      : (URL + asPath).split('?')[0];

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
