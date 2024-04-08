---
title: Basket
sidebar_label: Basket
slug: basket
custom_edit_url: null
---

## useGetBasketQuery

This function is used to fetch a list of products in the shopping basket. 

The **useGetBasketQuery** function is imported from `'@akinon/next/data/client/basket'`.

```javascript
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
```

To use the function, create a variable and call the function:

```javascript
const { data } = useGetBasketQuery();
```

Data returned from the function:

```json
{
  "basketitem_set": [{
    "quantity": 1,
    "product": {
      "pk": 37,
      "name": "Product Name",
      "sku": "AKN12345",
      "base_code": "AKN12345",
      "attributes": {
        ...
      },
      "attribute_set": 1,
      "attributes_kwargs": {
        ...
      },
      "extra_attributes": {},
      "productimage_set": [{
        "pk": 378,
        "status": "active",
        "image": "https://image-url.jpg",
        "order": 0,
        "created_date": "2023-04-18T09:52:58.863335Z",
        "specialimage_set": []
      }],
      "price": "59",
      "in_stock": true,
      "currency_type": "aed",
      "retail_price": "85",
      "unit_type": "qty",
      "absolute_url": "/product/37/",
      "productvideo_set": [],
      "product_type": "0",
      "price_type": "default",
      "form_schema": null,
      "is_ready_to_basket": false,
      "stock": 230,
      "data_source": null
    },
    "unit_price": "59.00",
    "currency_type": "aed",
    "tax_rate": "5.00",
    "total_amount": "59.00",
    "shipping_discount": null,
    "attributes": {},
    "id": 95,
    "attributes_kwargs": {},
    "image": null,
    "parent": null,
    "offer_badges": [{
      "description": "This is a test coupon.",
      "discount": "58.99"
    }],
    "price": "59.00",
    "retail_price": "85.00",
    "stock": 230,
    "discount_amount": "100.00",
    "datasource": null,
    "extra_product_stock_detailed": null,
    "extra_product_price_detailed": null
  }],
  "total_amount": "0.01",
  "total_quantity": 1,
  "unavailable_basket_products": [],
  "upsell_details": [],
  "discounts": [{
    "description": "This is a test coupon.",
    "discount": "58.99"
  }],
  "total_discount_amount": "58.99",
  "total_product_amount": "59.00",
  "voucher_code": null,
  "pk": 55,
  "created_date": "2023-04-27T12:12:28.890431Z",
  "modified_date": "2023-04-27T12:12:28.890452Z",
  "segment": {
    "pk": 2,
    "stock_list": null,
    "price_list": null
  }
}
```