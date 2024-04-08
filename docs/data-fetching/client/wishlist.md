---
title: Wishlist
sidebar_label: Wishlist
slug: wishlist
custom_edit_url: null
---

## useGetFavoritesQuery

This function is used to fetch a list of favorite products. 

The **useGetFavoritesQuery** function is imported from `'@akinon/next/data/client/wishlist'`.

```javascript
import { useGetFavoritesQuery } from '@akinon/next/data/client/wishlist';
```

To fetch the list of favorite products, create a variable and call the function:

```javascript
  const { data: favorites } = useGetFavoritesQuery({
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  });
```

Following parameters can be sent to the function:

-   **page**: This value is used for pagination, indicating the page the user is currently on.
-   **limit**: It determines the limit of products on page the user is currently on.

Data returned from function:

-   **count**: It provides the total number of products that have been added to favorites.
-   **next**: This is used for pagination. If a user is on page 2, it contains the URL of page 3.
-   **previous**: This is used for pagination. If a user is on page 2, it contains the URL of page 1.

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [{
    "pk": 12,
    "product": {
      "pk": 39,
      "name": "Product Name",
      "sku": "000000",
      "base_code": "000000",
      "attributes": {
        ...
      },
      "attribute_set": 1,
      "attributes_kwargs": {
        ...
      },
      "extra_attributes": {},
      "productimage_set": [{
        "status": "active",
        "image": "https://image-url.jpg",
        "created_date": "2023-04-18T09:52:55.333304Z",
        "specialimage_set": [],
        "pk": 312,
        "order": 4
      }],
      "price": "59",
      "in_stock": true,
      "currency_type": "aed",
      "retail_price": "85",
      "unit_type": "qty",
      "absolute_url": "/product-url/",
      "productvideo_set": [],
      "product_type": "0",
      "price_type": "default",
      "form_schema": null,
      "is_ready_to_basket": false,
      "stock": 80,
      "data_source": null,
      "basket_offers": [{
        ...
      }],
      "extra_data": {
        "variants": [{
          "attribute_key": "color",
          "options": [{
            "product": {
              "absolute_url": "/url",
              "price": "59",
              "attributes": {
                ...
              },
              "pk": 31,
              "productimage_set": [{
                "status": "active",
                "image": "https://image-url.jpg",
                "created_date": "2023-04-18T09:52:55.333304Z",
                "specialimage_set": [],
                "pk": 312,
                "order": 4
              }]
            },
            "in_stock": true,
            "is_selectable": true,
            "label": "Green"
          }]
        }]
      }
    }
  }]
}
```