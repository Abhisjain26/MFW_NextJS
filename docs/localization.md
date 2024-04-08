---
title: Localization
sidebar_label: Localization
slug: localization
custom_edit_url: null
---

Project Zero Next supports multiple languages and currencies, and all the necessary settings for language and currency management can be found within the settings.js file.

## Locales

### Adding a New Locale

To add a new locale to the project, follow these steps:

1.  Open the settings.js file.
2.  Locate the **localization** section.
3.  Inside the **locales** array, add a new object with the following properties:

| Property | Description |
| --- | --- |
| label | A label that can be displayed on any page of the website. |
| value | The lowercase locale value in ISO 639-1 format or including the country code in ISO 3166-1 alpha-2 format. |
| localePath | Name of the locale's JSON translation file. For example, if the value is "en," the file should be placed in the public/locales/en directory. |
| apiValue | The value of the locale defined in Commerce. |
| rtl | A boolean value that specifies whether it is right-to-left, like Arabic. |

Here's an example of adding a new locale:

```javascript
localization: {
  locales: [
    {
      label: 'EN',
      value: 'en',
      localePath: 'en',
      apiValue: 'en-us',
      rtl: false,
    },
  ],
}
```

### Default Locale

The default locale for the project can be specified by using the **defaultLocaleValue** in the settings.js file. This value should match the "value" of one of the defined locales.

### Setting a Locale

To set a locale in the project, the **setLocale** method available in the useLocalization hook can be used. This method will automatically change the URL to reflect the selected locale.

Example of using **setLocale**:

```javascript
const { setLocale } = useLocalization();

setLocale('en-us');
```

### Disabling Redirection to Default Locale

In some cases, like displaying a landing page on example.com/ while using the ShowAllLocales strategy, users are automatically redirected to URLs containing the default locale (e.g., example.com/en). To disable this redirection, set **redirectToDefaultLocale** to false in the settings.js file:

```javascript
localization: {
  redirectToDefaultLocale: false,
}
```

## Currencies

### Adding a New Currency

To add a new currency to the project, follow these steps:

1.  Open the settings.js file.
2.  Locate the **currencies** section.
3.  Inside the **currencies** array, add a new object with the following properties:
    -   **label**: The label for the currency (e.g., 'USD').
    -   **code**: The code for the currency (e.g., 'usd').

Here's an example of adding a new currency:

```javascript
currencies: [
  {
    label: 'USD',
    code: 'usd',
  },
]
```

### Default Currency

The default currency in the project can be specified by using the **defaultCurrencyCode** in the settings.js file. This code must match the "code" of one of the defined currencies.

### Determining Active Currency

The **getActiveCurrencyCode** function's default behavior is to retrieve the active currency code from a cookie named `pz-currency`. Users can customize this function to obtain the currency code from different sources, such as headers or the URL. If the return value doesn't match any currency code in the `currencies` array, the default currency code will be used.

Here's an example:

```javascript
getActiveCurrencyCode: ({ req, locale, defaultCurrencyCode }) => {
  const [, countryCode] = locale.split('-');

  if (countryCode === 'ae') {
    return 'aed';
  } else if (countryCode === 'qa') {
    return 'qar';
  }

  return defaultCurrencyCode;
}
```

### Setting a Currency

To set a currency in the project, the **setCurrency** method available in the useLocalization hook can be used.

Important: If the currency is linked to the locale by using `getActiveCurrencyCode` function in the settings, you need to use `setLocale` instead of this.

Example of using **setCurrency**:

```javascript
const { setCurrency } = useLocalization();

setCurrency('usd');
```

Important: Basket will be cleared when the currency is changed. Both of `setCurrency` and `setLocale` methods will clear the basket automatically.

## URL Strategy

Project Zero Next supports multiple URL structures to cater to different requirements. Users can set the URL strategy using the **localeUrlStrategy** value in settings.js.

Example of setting the URL strategy:

```javascript
localization: {
  localeUrlStrategy: LocaleUrlStrategy.ShowAllLocales,
}
```

The available values for **localeUrlStrategy** are:

-   LocaleUrlStrategy.HideDefaultLocale
-   LocaleUrlStrategy.HideAllLocales
-   LocaleUrlStrategy.ShowAllLocales

LocaleUrlStrategy.HideDefaultLocale:

-   For English (en): "/women"
-   For Turkish (tr): "/tr/women"

LocaleUrlStrategy.ShowAllLocales:

-   For English (en): "/en/women"
-   For Turkish (tr): "/tr/women"

LocaleUrlStrategy.HideAllLocales:

-   For English (en): "/women"
-   For Turkish (tr): "/women"

> **Note:** The "HideAllLocales" option is not recommended for SEO purposes.

## Translations

Translations can be managed by adding key-value pairs to JSON files located under the public/locales directory. For example, if the English (en) locale is used, translation files can be stored in public/locales/en/account.json.

## Localization in Components

### Client Components

The **useLocalization** hook provides all the necessary properties for localization in client components. To make use of translations in the client components, use the "**t**" function as shown in the example below:

```javascript
import { useLocalization } from '@akinon/next/hooks';

const {
  t,
  currencies,
  currency,
  defaultCurrencyCode,
  locales,
  locale,
  defaultLocaleValue,
  localeUrlStrategy,
  setLocale,
} = useLocalization();

const translatedText = t('account.change_email.header.title');
```

### Server Components

For server components, the "**t**" function can be imported from the following path to access translations:

```javascript
import { t } from '@akinon/next/utils/server-translation';

const translatedText = t('account.change_email.header.title');
```
