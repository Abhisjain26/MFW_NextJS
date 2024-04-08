---
title: Product
sidebar_label: Product
slug: product
custom_edit_url: null
---

## getProductData

This function is used to fetch product data and related breadcrumb data. 

The **getProductData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getProductData } from '@akinon/next/data/server';
```

The product data is fetched by defining this function as follow:

```javascript
const {
      data: { product }
    } = await getProductData({
      pk
      searchParams,
      groupProduct: true
    });
```


- `pk`: The pk of the desired product to be fetched. This parameter is mandatory and should be of type Number.
- `searchParams`: An optional parameter that can be used to send additional data via query strings. It should be of type String.
- `groupProduct`: This parameter has a default value of `false`. When set to `true`, it fetches group product data. It should be of type Boolean.

Data returned from the function:

```json
{
    "in_stock": false,
    "product": {
        "pk": 2,
        "name": "Pink Polyester Tunic",
        "sku": "sp0001",
        "base_code": "Sample1",
        "attributes": {
            "filterable_size": "10",
            "integration_pack_color": "Pink",
            "color": "Pink",
            "gender": "woman",
            "size_switcher": "UK",
            "hexcolorcode": "#FF4081",
            "international_size": "34",
            "filterable_color": "Pink",
            "size": "10"
        },
        "attribute_set": 1,
        "attributes_kwargs": {
            "filterable_size": {
                "value": "10",
                "data_type": "dropdown",
                "label": "10"
            },
            "color": {
                "value": "Pink",
                "data_type": "dropdown",
                "label": "Pink"
            },
            "gender": {
                "value": "woman",
                "data_type": "dropdown",
                "label": "Woman"
            },
            "size_switcher": {
                "value": "UK",
                "data_type": "dropdown",
                "label": "UK"
            },
            "international_size": {
                "value": "34",
                "data_type": "dropdown",
                "label": "34"
            },
            "filterable_color": {
                "value": "Pink",
                "data_type": "dropdown",
                "label": "Pink"
            },
            "size": {
                "value": "10",
                "data_type": "dropdown",
                "label": "10"
            }
        },
        "extra_attributes": {},
        "productimage_set": [
            {
                "pk": 1,
                "status": "active",
                "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/04/10/1/44709396-f2cc-4b21-968e-087acada415e.jpg",
                "order": 0,
                "created_date": "2023-04-10T17:27:02.525048Z",
                "specialimage_set": []
            },
            {
                "pk": 2,
                "status": "active",
                "image": "https://akn-randb.a-cdn.akinoncloud.com/products/2023/04/10/1/d38e0570-1c04-466d-a122-2242f86bdf71.jpg",
                "order": 1,
                "created_date": "2023-04-10T17:27:02.634909Z",
                "specialimage_set": []
            }
        ],
        "price": "32",
        "in_stock": false,
        "currency_type": "aed",
        "retail_price": "80",
        "unit_type": "qty",
        "absolute_url": "/women/pink-polyester-tunic-sample1-pink/p/",
        "productvideo_set": [],
        "product_type": "0",
        "price_type": "default",
        "form_schema": null,
        "is_ready_to_basket": false,
        "stock": 0,
        "data_source": null,
        "basket_offers": []
    },
    "variants": [],
    "selected_variant": null
}
```