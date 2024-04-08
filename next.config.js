const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});
const { withSentryConfig } = require('@sentry/nextjs');
const withPzConfig = require('@akinon/next/with-pz-config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config to override defaults
  rewrites: async () => {
    return [
      {
        source: '/:commerce/:locale/:currency/sitemap.xml',
        destination: '/:commerce/:locale/:currency/xml-sitemap'
      },
      {
        source: '/:commerce/:locale/:currency/sitemap/:node',
        destination: '/:commerce/:locale/:currency/xml-sitemap/:node'
      }
    ];
  }
};

const enhancedConfig = withPzConfig(nextConfig);

module.exports = withSentryConfig(withPWA(enhancedConfig), {
  silent: true,
  dryRun: !process.env.SENTRY_DSN
});
