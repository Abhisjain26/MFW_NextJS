---
title: Category
sidebar_label: Category
slug: category
custom_edit_url: null
---

## getCategoryData

This function is used to fetch category data.

The **getCategoryData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getCategoryData } from '@akinon/next/data/server';
```

The category data is fetched by defining this function as `const categoryData = await getCategoryData({ pk, searchParams });`.

-   `pk`: The pk of the desired category to be fetched. This parameter is mandatory and should be of type Number.
-   `searchParams`: An optional parameter that can be used to send additional data via query strings. It should be of type String.

Data returned from the function:

```json
{
  "category": {
    "pk": 6,
    "name": "Clothing",
    "menuitemmodel": "e49751bc-647d-4c4f-9b8d-b028b6114a44",
    "absolute_url": "/women-clothing/",
    "sort_option": null,
    "uuid": "64301647-62bf-47b3-bc63-440ee5e47739",
    "depth": 3,
    "attributes": {
      "category_image": {
        "value": "cms/2023/07/12/949ad74b-b920-425d-a6e1-ea24c00b17db.png",
        "kwargs": {
          "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/12/949ad74b-b920-425d-a6e1-ea24c00b17db.png",
          "data_type": "image",
          "value": "cms/2023/07/12/949ad74b-b920-425d-a6e1-ea24c00b17db.png"
        }
      }
    }
  },
  "pagination": {
    "total_count": 2106,
    "current_page": 1,
    "num_pages": 106,
    "page_size": 20
  },
  "products": [
    {
      "pk": 101623,
      "name": "Typography Printed Cropped T-Shirt with Round Neck and Short Sleeves",
      "sku": "RB713826222",
      "base_code": "222-0451WY043-1",
      "attributes": {
        "filterable_size": "8",
        "integration_season": "222",
        "integration_type": "T-Shirts",
        "eu_size": "34",
        "color": "Green",
        "gender": "Women",
        "size_switcher": "UK",
        "hexcolorcode": "#4CAF50",
        "integration_color_family": "Green",
        "integration_width": "Between 9 inches (23 cm) and 18 inches (45 cm)",
        "uk_size": "8",
        "integration_brand": "R&B",
        "integration_category_bread_crumb": "Women>Clothing>Tops>T-Shirts",
        "filterable_color": "Green",
        "integration_pack_color": "Green",
        "integration_height": "Between 1 inch (2.5 cm) and 6 inches (15 cm)",
        "integration_length": "Between 12 inches (30 cm) and 24 inches (60 cm)",
        "integration_description": "T-Shirts are a must-have in anyone's wardrobe, as they're the go-to picks while rushing out to meet friends or simply gazing out the window. Pair this admirable piece with a pair of torn jeans and stylish heels along with your favorite hijab you've planned to stun out in to appear enticingly cool and attractive. The addition of a chic bag to your outfit will surely enhance and justify your appearance.",
        "size": "8"
      },
      "attribute_set": 2,
      "attributes_kwargs": {
        "filterable_size": {
          "data_type": "dropdown",
          "value": "8",
          "label": "8"
        },
        "color": {
          "value": "Green",
          "label": "Green"
        },
        "gender": {
          "value": "Women",
          "label": "Women"
        },
        "filterable_color": {
          "data_type": "dropdown",
          "value": "Green",
          "label": "Green"
        },
        "size": {
          "value": "8",
          "label": "8"
        }
      },
      "extra_attributes": {},
      "productimage_set": [
        {
          "pk": 767923,
          "status": "active",
          "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/c51bc2ba-8704-434e-8d0c-f348749b0818.jpg",
          "order": 1,
          "created_date": "2023-07-11T17:01:57.434107Z",
          "specialimage_set": []
        },
        {
          "pk": 767925,
          "status": "active",
          "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/bdb0a5c4-0562-4536-8ee4-2060f8d0c540.jpg",
          "order": 2,
          "created_date": "2023-07-11T17:01:57.614842Z",
          "specialimage_set": []
        },
      ],
      "price": "17.50",
      "in_stock": true,
      "currency_type": "aed",
      "retail_price": "35",
      "unit_type": "qty",
      "absolute_url": "/typography-printed-cropped-t-shirt-with-round-neck-and-short-sleeves-222-0451wy043-1-1/",
      "productvideo_set": [],
      "product_type": "0",
      "price_type": "default",
      "form_schema": null,
      "is_ready_to_basket": false,
      "stock": 6,
      "data_source": null,
      "basket_offers": [
        {
          "pk": 4,
          "label": "test-campaign-aed",
          "listing_kwargs": {},
          "kwargs": {
            "show_benefit_products": true
          }
        }
      ],
      "extra_data": {
        "variants": [
          {
            "attribute_key": "color",
            "options": [
              {
                "product": {
                  "productimage_set": [
                    {
                      "status": "active",
                      "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/c51bc2ba-8704-434e-8d0c-f348749b0818.jpg",
                      "created_date": "2023-07-11T17:01:57.434107Z",
                      "pk": 767923,
                      "specialimage_set": [],
                      "order": 1
                    },
                    {
                      "status": "active",
                      "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/bdb0a5c4-0562-4536-8ee4-2060f8d0c540.jpg",
                      "created_date": "2023-07-11T17:01:57.614842Z",
                      "pk": 767925,
                      "specialimage_set": [],
                      "order": 2
                    },
                    {
                      "status": "active",
                      "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/96aa2fd5-38c6-4c52-bcdd-5e780d4e7fd0.jpg",
                      "created_date": "2023-07-11T01:59:47.061183Z",
                      "pk": 601276,
                      "specialimage_set": [],
                      "order": 3
                    },
                    {
                      "status": "active",
                      "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/cdb58c83-8f70-41be-931d-caacfa90be5a.jpg",
                      "created_date": "2023-07-11T01:59:47.268466Z",
                      "pk": 601277,
                      "specialimage_set": [],
                      "order": 4
                    },
                    {
                      "status": "active",
                      "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/06/530302/13285848-4d79-4ca9-ad59-ef40c153cf4b.jpg",
                      "created_date": "2023-07-11T02:16:30.500437Z",
                      "pk": 602607,
                      "specialimage_set": [],
                      "order": 5
                    },
                    {
                      "status": "active",
                      "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/07/11/530302/ab4b1fcb-2f2f-4967-ba5f-7d942e68c959.jpg",
                      "created_date": "2023-07-11T02:16:30.810356Z",
                      "pk": 602608,
                      "specialimage_set": [],
                      "order": 6
                    }
                  ],
                  "absolute_url": "/typography-printed-cropped-t-shirt-with-round-neck-and-short-sleeves-222-0451wy043-1-1/",
                  "price": "17.50",
                  "pk": 101623,
                  "attributes": {
                    "color": "Green",
                    "hexcolorcode": "#4CAF50"
                  }
                },
                "label": "Green",
                "in_stock": true,
                "is_selectable": true
              }
            ]
          }
        ]
      }
    }
  ],
  "search_text": null,
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
            "label": "Clothing",
            "value": 6,
            "quantity": 2106,
            "is_selected": true,
            "depth": 0,
            "real_depth": 3,
            "url": "/women-clothing/",
            "menuitemmodel": "e49751bc647d4c4f9b8db028b6114a44",
            "is_parent_of_selection": false
          }
        ],
        "widget_type": "category",
        "key": "category_ids",
        "order": 1
      }
    },
    {
      "name": "Color",
      "key": "integration_color_family",
      "search_key": "attributes_integration_color_family",
      "widget_type": "visual_swatch",
      "order": 5,
      "extra_params": {},
      "data": {
        "name": "Color",
        "search_key": "attributes_integration_color_family",
        "choices": [
          {
            "label": "Green",
            "value": "Green",
            "quantity": 370,
            "is_selected": false,
            "hex": "#4CAF50",
            "klass": null
          }
        ],
        "widget_type": "visual_swatch",
        "key": "integration_color_family",
        "order": 5
      }
    },
    {
      "name": "Size",
      "key": "size",
      "search_key": "attributes_size",
      "widget_type": "multiselect",
      "order": 5,
      "extra_params": {},
      "data": {
        "name": "Size",
        "search_key": "attributes_size",
        "choices": [
          {
            "label": "8",
            "value": "8",
            "quantity": 521,
            "is_selected": false
          },

        ],
        "widget_type": "multiselect",
        "key": "size",
        "order": 5
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
    }
  ]
}
```