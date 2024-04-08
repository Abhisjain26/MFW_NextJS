const { LocaleUrlStrategy } = require('@akinon/next/localization');
const { ROUTES } = require('@theme/routes');

const commerceUrl = encodeURI(process.env.SERVICE_BACKEND_URL ?? 'default');

/** @type {import('@akinon/next/types').Settings} */
module.exports = {
  commerceUrl,
  commonProductAttributes: [
    { translationKey: 'color', key: 'color' },
    { translationKey: 'size', key: 'size' }
  ],
  localization: {
    locales: [
      {
        label: 'EN',
        value: 'en',
        localePath: 'en',
        apiValue: 'en-us',
        rtl: false
      },
      {
        label: 'TR',
        value: 'tr',
        localePath: 'tr',
        apiValue: 'tr-tr',
        rtl: false
      }
    ],
    currencies: [
      {
        label: 'USD',
        code: 'usd'
      },
      {
        label: 'TRY',
        code: 'try'
      }
    ],
    defaultLocaleValue: 'en',
    localeUrlStrategy: LocaleUrlStrategy.HideDefaultLocale,
    redirectToDefaultLocale: true,
    defaultCurrencyCode: 'usd'
  },
  rewrites: [
    {
      source: ROUTES.AUTH,
      destination: '/auth'
    },
    {
      source: ROUTES.BASKET,
      destination: '/basket'
    },
    {
      source: ROUTES.ACCOUNT_ORDERS,
      destination: '/account/orders'
    }
  ],
  redis: {
    defaultExpirationTime: 900 // 15 min
  }
};
