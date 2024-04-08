---
title: SEO
sidebar_label: SEO
slug: seo
custom_edit_url: null
---

## getSeoData

This function is used to fetch SEO data for a given URL from Omnitron.

The **getSeoData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getSeoData } from '@akinon/next/data/server';
```

The SEO data is fetched by defining this function as follow:

```javascript
const response = await getSeoData('/');
``` 

-   `url` : Provide the URL for which SEO data is fetched. This parameter is mandatory and should be of type String.

> **Note:** The URL for which the data is fetched should have content defined in the **Sales Channels > Marketing > SEO Settings** section of Omnitron.

Data returned from the function:

```json
{
    "pk": 1,
    "created_date": "2023-06-07T23:11:14.519842Z",
    "modified_date": "2023-06-07T23:11:14.519866Z",
    "attributes": {
        "css_class": "randb"
    },
    "url": "/",
    "title": "Shop Fashion for Women, Men, and Kids Online | R&B UAE",
    "description": "Discover the latest fashion clothes at R&B UAE, and create the best outfits with our fashion collection for men, women, and kids. Get the trendiest clothes online.",
    "keywords": "R&B",
    "attributes_kwargs": {}
}
```