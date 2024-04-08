---
title: SEO Management
sidebar_label: SEO Management
slug: seo-management
custom_edit_url: null
---

The SEO tags in your project should be included in the following files:

- `src/app/[commerce]/[locale]/[currency]/layout.tsx`
- `src/app/[commerce]/[locale]/[currency]/(root)/category/[pk]/page.tsx`
- `src/app/[commerce]/[locale]/[currency]/(root)/list/page.tsx`
- `src/app/[commerce]/[locale]/[currency]/(root)/product/[pk]/page.tsx`
- `src/app/[commerce]/[locale]/[currency]/(root)/special-page/[pk]/page.tsx`
- `src/app/[commerce]/[locale]/[currency]/(root)/group-product/[pk]/page.tsx`

If your project has a category landing page, you also need to edit the SEO tags for the category landing page created within the root.

- `src/app/[commerce]/[locale]/[currency]/(root)/categoryLandigPage/page.tsx`

To create metadata, first import the existing Metadata in Next.js:

```javascript
import { Metadata } from '@akinon/next/types';
```

An async function named **generateMetadata** is created. This function runs before the **function root** and puts metadata in head.

The `params` and `searchParams` parameters, as well as the `props` you want to display in the metadata, can be added to the **generateMetadata** function.

Examples of **generateMetadata** function with different parameter options:

**Without parameters:**

```javascript
export async function generateMetadata() {}
```

**With parameters:**

```javascript
export async function generateMetadata({ params, searchParams }) {}
```

**With parameters and props:**

`<{ pk: number }>` represents a single attribute to be extracted from props.

```javascript
export async function generateMetadata({
  params,
  searchParams
}: PageProps<{ pk: number }>) {}
```

SEO data such as title, description, canonical, openGraph can also be added to **metadata**.

Example **Metadata** variable:

```javascript
const result: Metadata = {
  title: 'title',
  description: 'description',
  keywords: 'keywords',
  twitter: {
    title: 'title',
    description: 'description'
  },
  alternates: {
    canonical: 'canonicalUrl'
  },
  openGraph: {
    title: 'title',
    description: 'description',
    images: 'image'
  }
};
```

Example of the **generateMetadata** function for `src/app/[commerce]/[locale]/[currency]/(root)/product/[pk]/page.tsx`:

```javascript
export async function generateMetadata({
  params,
  searchParams
}: PageProps<{ pk: number, locale: string }>) {
  const nextHeaders = pzUrl();
  const pageUrl = new URL(
    nextHeaders.get('pz-url') ?? process.env.NEXT_PUBLIC_URL
  );

  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}${pageUrl?.pathname}`;
  let result: Metadata = {};

  try {
    const {
      data: { product }
    } = await getProductData({
      pk: params.pk,
      searchParams
    });
    result = {
      title: product.name,
      description: product.attributes.description,
      twitter: {
        title: product.name,
        description: product.attributes.description
      },
      openGraph: {
        title: product.name,
        description: product.attributes.description,
        images: product.productimage_set?.map((item) => ({
          url: item.image
        }))
      },
      alternates: {
        canonical: canonicalUrl
      }
    };
    // eslint-disable-next-line no-empty
  } catch (error) {}

  return result;
}
```
