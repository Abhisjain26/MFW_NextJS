---
title: Special Page
sidebar_label: Special Page
slug: special-page
custom_edit_url: null
---

## getSpecialPageData

This function is used to fetch data for a special page created in Omnitron based on its pk.

The **getSpecialPageData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getSpecialPageData } from '@akinon/next/data/server';
```

The special page data is fetched by defining this function as follow:

```javascript
const data = await getSpecialPageData({pk, searchParams});
```

-   `pk`: The pk of the desired special page to be fetched. This parameter is mandatory and should be of type Number.
-   `searchParams`: An optional parameter that can be used to send additional data via query strings. It should be of type String.

Data returned from the function:

```json
{
  "pagination": {
    "total_count": 865,
    "current_page": 1,
    "num_pages": 44,
    "page_size": 20
  },
  "facets": [],
  "sorters": [],
  "search_text": null,
  "products": [],
  "special_page": {
    "pk": 59,
    "name": "Men Size S",
    "url": "/men-size-s/",
    "template": null,
    "banner": null,
    "banner_url": null,
    "product_collection": 30,
    "banner_description": null,
    "is_active": true,
    "created_date": "2023-07-12T18:19:05.711537Z",
    "modified_date": "2023-07-12T18:19:05.747308Z",
    "video_embedded_code": null,
    "specialpageprettyurl_set": [],
    "pretty_url": {
      "pk": 71257,
      "new_path": "/men-size-s/",
      "old_path": "/special-page/59/",
      "parent": null,
      "language": "en",
      "func_module": "omnishop.cms.resources.views",
      "func_name": "SpecialPageView",
      "func_initkwargs": {},
      "args": [],
      "kwargs": {
        "special_page_id": "59"
      },
      "query_params": {},
      "viewname": "special-page-detail",
      "created_date": "2023-07-12T18:19:05.743009Z",
      "modified_date": "2023-07-12T18:19:05.743036Z",
      "prettyurl_set": []
    },
    "extraction_strategy": "omnishop.search.strategies.DefaultProductExtractionStrategy",
    "banner_mobile": null
  }
}

```