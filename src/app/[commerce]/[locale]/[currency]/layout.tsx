import 'server-only';
import '@theme/assets/globals.scss';

import { withSegmentDefaults } from '@akinon/next/hocs/server';
import Footer from '@theme/views/footer';
import Header from '@theme/views/header';
import RootModal from '@theme/views/root-modal';
import ClientRoot from './client-root';
import { RootLayoutProps, Metadata } from '@akinon/next/types';
import { getSeoData } from '@akinon/next/data/server';
import PzRoot from '@akinon/next/components/pz-root';
import MobileAppToggler from '@akinon/next/components/mobile-app-toggler';
import pwaTags from '@theme/components/pwa-tags';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export async function generateMetadata() {
  let result: Metadata = {
    alternates: {
      languages: {
        en: '/en',
        tr: '/tr'
      }
    }
  };

  const response = await getSeoData('/');

  result = { ...result, ...pwaTags, ...response };

  return result;
}

async function RootLayout({
  params,
  locale,
  translations,
  children
}: RootLayoutProps) {
  return (
    <html lang={locale.isoCode} {...(locale.rtl ? { dir: 'rtl' } : {})}>
      <head />
      <body className="overflow-x-hidden">
        <PzRoot translations={translations} {...params}>
          <ClientRoot>
            <div className="overflow-x-hidden">
            <MobileAppToggler>
              <Header />
            </MobileAppToggler>
              <main>
                {children}
                <RootModal />
              </main>
              <MobileAppToggler>
                <Footer />
              </MobileAppToggler>
            </div>
          </ClientRoot>
        </PzRoot>
      </body>
    </html>
  );
}

export default withSegmentDefaults(RootLayout, {
  segmentType: 'root-layout'
});
