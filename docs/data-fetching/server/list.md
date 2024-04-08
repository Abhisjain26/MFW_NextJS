---
title: List
sidebar_label: List
slug: list
custom_edit_url: null
---

## **getListData**

This function is used to fetch a list of all products. 

The **getListData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getListData } from '@akinon/next/data/server';
```

The list data is fetched by defining this function as `const data = await getListData({ searchParams });`.

-   `searchParams`: An optional parameter that can be used to send additional data via query strings. It should be of type String.

Data returned from the function:

```json
{
  "pagination": {
    "total_count": 28,
    "current_page": 1,
    "num_pages": 2,
    "page_size": 24
  },
  "facets": [
    {
      "name": "Categories",
      "key": "category_ids",
      "search_key": "category_ids",
      "widget_type": "category",
      "order": 1,
      "extra_params": {},
      "data": {
        "name": "Categories",
        "search_key": "category_ids",
        "choices": [
          {
            "label": "WOMEN",
            "value": 5,
            "quantity": 27,
            "is_selected": false,
            "depth": 0,
            "real_depth": 2,
            "url": "/list/?category_ids=5",
            "menuitemmodel": "2daa4696de204a1085667bc9f75e1e2c",
            "is_parent_of_selection": false
          },
          {
            "label": "MEN",
            "value": 2,
            "quantity": 28,
            "is_selected": false,
            "depth": 0,
            "real_depth": 2,
            "url": "/list/?category_ids=2",
            "menuitemmodel": "5a04a230583e4b888264006014214862",
            "is_parent_of_selection": false
          },
          {
            "label": "CHILD",
            "value": 8,
            "quantity": 28,
            "is_selected": false,
            "depth": 0,
            "real_depth": 2,
            "url": "/list/?category_ids=8",
            "menuitemmodel": "00935903f73d4f23b87b71b486e7fe49",
            "is_parent_of_selection": false
          }
        ],
        "widget_type": "category",
        "key": "category_ids",
        "order": 1
      }
    },
    {
      "name": "Voorbeeld",
      "key": "hallo",
      "search_key": "attributes_hallo",
      "widget_type": "multiselect",
      "order": null,
      "extra_params": {},
      "data": {
        "name": "Voorbeeld",
        "search_key": "attributes_hallo",
        "choices": [
          {
            "label": "Voorbeeld",
            "value": "Voorbeeld",
            "quantity": 17,
            "is_selected": false
          },
          {
            "label": "122",
            "value": "122",
            "quantity": 2,
            "is_selected": false
          }
        ],
        "widget_type": "multiselect",
        "key": "hallo",
        "order": null
      }
    },
    {
      "name": "in_stock",
      "key": "in_stock",
      "search_key": "in_stock",
      "widget_type": "multiselect",
      "order": null,
      "extra_params": {},
      "data": {
        "name": "in_stock",
        "search_key": "in_stock",
        "choices": [
          {
            "label": "1",
            "value": 1,
            "quantity": 28,
            "is_selected": false
          }
        ],
        "widget_type": "multiselect",
        "key": "in_stock",
        "order": null
      }
    },
    {
      "name": "Color",
      "key": "integration_ColorId",
      "search_key": "attributes_integration_ColorId",
      "widget_type": "multiselect",
      "order": null,
      "extra_params": {},
      "data": {
        "name": "Color",
        "search_key": "attributes_integration_ColorId",
        "choices": [
          {
            "label": "Black",
            "value": "Siyah",
            "quantity": 6,
            "is_selected": false
          },
          {
            "label": "White",
            "value": "BEYAZ",
            "quantity": 6,
            "is_selected": false
          }
        ],
        "widget_type": "multiselect",
        "key": "integration_ColorId",
        "order": null
      }
    },
    {
      "name": "Size",
      "key": "integration_SizeId",
      "search_key": "attributes_integration_SizeId",
      "widget_type": "multiselect",
      "order": null,
      "extra_params": {},
      "data": {
        "name": "Size",
        "search_key": "attributes_integration_SizeId",
        "choices": [
          {
            "label": "L",
            "value": "L",
            "quantity": 7,
            "is_selected": false
          },
          {
            "label": "M",
            "value": "M",
            "quantity": 6,
            "is_selected": false
          },
          {
            "label": "S",
            "value": "S",
            "quantity": 3,
            "is_selected": false
          },
          {
            "label": "XL",
            "value": "97d47ab9-96ee-465e-a780-1dd819710095",
            "quantity": 2,
            "is_selected": false
          }
        ],
        "widget_type": "multiselect",
        "key": "integration_SizeId",
        "order": null
      }
    },
    {
      "name": "PRICE",
      "key": "price",
      "search_key": "price",
      "widget_type": "multiselect",
      "order": -1,
      "extra_params": {},
      "data": {
        "name": "PRICE",
        "search_key": "price",
        "choices": [
          {
            "label": " 0 $ - 250 $ ",
            "value": "0-250",
            "quantity": 3,
            "is_selected": false
          },
          {
            "label": "250 $ - 500 $ ",
            "value": "251-500",
            "quantity": 4,
            "is_selected": false
          },
          {
            "label": "500 $ - 750 $",
            "value": "501-750",
            "quantity": 6,
            "is_selected": false
          },
          {
            "label": "750 $ Üzeri",
            "value": "750",
            "quantity": 18,
            "is_selected": false
          }
        ],
        "widget_type": "multiselect",
        "key": "price",
        "order": -1
      }
    }
  ],
  "sorters": [
    {
      "label": "Default",
      "value": "default",
      "is_selected": true
    },
    {
      "label": "Ascending Price",
      "value": "price",
      "is_selected": false
    },
    {
      "label": "Descending Price",
      "value": "-price",
      "is_selected": false
    },
    {
      "label": "Newcomers",
      "value": "newcomers",
      "is_selected": false
    },
    {
      "label": "Varsayılan",
      "value": "default2",
      "is_selected": false
    },
    {
      "label": "Sorteer op laagste prijs eerst",
      "value": "ad",
      "is_selected": false
    },
    {
      "label": "test",
      "value": "test",
      "is_selected": false
    }
  ],
  "search_text": null,
  "products": [
    {
      "pk": 530,
      "name": "product multi",
      "sku": "220",
      "base_code": "200",
      "attributes": {
        "code": true,
        "hallo": "Voorbeeld",
        "integration_ColorId": "70c0fe45-43fa-4c51-a9e8-c7a8826b638e",
        "integration_SizeId": "e4f6afa3-fc48-4260-a179-da4b8ab21fb5",
        "integration_kol_boyu": "kısa"
      },
      "attribute_set": 1,
      "attributes_kwargs": {
        "hallo": {
          "value": "Voorbeeld",
          "data_type": "valuelabel",
          "label": "Voorbeeld"
        },
        "integration_ColorId": {
          "value": "70c0fe45-43fa-4c51-a9e8-c7a8826b638e",
          "data_type": "dropdown",
          "label": "Blue"
        },
        "integration_SizeId": {
          "value": "e4f6afa3-fc48-4260-a179-da4b8ab21fb5",
          "data_type": "dropdown",
          "label": "L"
        },
        "integration_kol_boyu": {
          "value": "kısa",
          "data_type": "dropdown",
          "label": "kısa"
        }
      },
      "extra_attributes": {},
      "productimage_set": [
        {
          "pk": 1164,
          "status": "active",
          "image": "https://demo.akinoncdn.com/products/2022/12/14/7733/e6bde183-352f-4f82-80e7-35b06061ea9e.jpg",
          "order": 0,
          "created_date": "2022-12-14T09:09:32.348066Z",
          "specialimage_set": []
        }
      ],
      "price": "1600",
      "in_stock": true,
      "currency_type": "try",
      "retail_price": "1800",
      "unit_type": "qty",
      "absolute_url": "/product-multi-220/",
      "productvideo_set": [],
      "product_type": "0",
      "price_type": "default",
      "form_schema": null,
      "is_ready_to_basket": false,
      "stock": 68295,
      "data_source": null,
      "basket_offers": [],
      "extra_data": {
        "variants": []
      }
    }
  ]
}

```