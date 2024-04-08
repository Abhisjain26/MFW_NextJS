'use client';

import { useLocalization } from '@akinon/next/hooks';
import { LocaleUrlStrategy } from '@akinon/next/localization';
import { urlLocaleMatcherRegex } from '@akinon/next/utils';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useMemo } from 'react';

interface LinkProps extends NextLinkProps {
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}

export const Link = ({
  children,
  target,
  className,
  href,
  ...rest
}: LinkProps) => {
  const { locale, defaultLocaleValue, localeUrlStrategy } = useLocalization();
  const formattedHref = useMemo(() => {
    if (typeof href !== 'string' || href.startsWith('http')) {
      return href;
    }

    const pathnameWithoutLocale = href.replace(urlLocaleMatcherRegex, '');
    const hrefWithLocale = `/${locale}${pathnameWithoutLocale}`;

    if (localeUrlStrategy === LocaleUrlStrategy.ShowAllLocales) {
      return hrefWithLocale;
    } else if (
      localeUrlStrategy === LocaleUrlStrategy.HideDefaultLocale &&
      locale !== defaultLocaleValue
    ) {
      return hrefWithLocale;
    }

    return href || '#';
  }, [href, defaultLocaleValue, locale, localeUrlStrategy]);

  return (
    <NextLink
      href={formattedHref}
      target={target}
      className={className}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
