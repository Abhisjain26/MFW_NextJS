---
title: Product
sidebar_label: Product
slug: product
custom_edit_url: null
---

## useGetProductByPkQuery

This function is used to fetch product data. 

The **useGetProductByPkQuery** function is imported from `'@akinon/next/data/client/product'`.

```javascript
import { useGetProductByPkQuery } from '@akinon/next/data/client/product';
```

To use this function, the product's primary key (pk) needs to be provided as an argument:

```javascript
const { data, isLoading, isSuccess } = useGetProductByPkQuery(
    item.product.pk
  );
```

The returned data can be used as `data.product.in_stock`. 

Data returned from the function:

```json
{
  "in_stock": true,
  "product": {
    "pk": 154,
    "name": "Product Name",
    "sku": "AKN-002-starprint001-XS",
    "base_code": "AKN-002",
    "attributes": {
      ...
    },
    "attribute_set": 6,
    "attributes_kwargs": {
      ...
    },
    "extra_attributes": {},
    "productimage_set": [{
      "pk": 201,
      "status": "active",
      "image": "https://img-url.jpg",
      "order": 0,
      "created_date": "2022-12-30T07:43:17.590001Z",
      "specialimage_set": []
    }],
    "price": "29.99",
    "in_stock": true,
    "currency_type": "eur",
    "retail_price": "29.99",
    "unit_type": "qty",
    "absolute_url": "/product-url/",
    "productvideo_set": [],
    "product_type": "0",
    "price_type": "default",
    "form_schema": null,
    "is_ready_to_basket": false,
    "stock": 968,
    "data_source": null,
    "basket_offers": []
  },
  "variants": [{
    ...
  }],
  "selected_variant": null
}
```

## useGetInstallmentsQuery

This function is used to fetch installment payment information available in banks for a product's purchase. 

The **useGetInstallmentsQuery** function is imported from `'@akinon/next/data/client/product'`.

```javascript
import { useGetInstallmentsQuery } from '@akinon/next/data/client/product';
```

To use this function, the productPk needs to be provided as an argument:

```javascript
const { data, isLoading, isSuccess } = useGetInstallmentsQuery(productPk);
```

Data returned from the function:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [{
    "pk": 1,
    "name": "Other",
    "bank": {
      "pk": 1,
      "name": "Other",
      "slug": "other",
      "logo": "https://0fb534.cdn.akinoncloud.com/banks/2023/01/17/be59a98c-00f6-486d-be4e-e3451ea3e970.jpg"
    },
    "card_type": {
      "pk": 1,
      "name": "Other",
      "slug": "other",
      "logo": "https://0fb534.cdn.akinoncloud.com/card_types/2021/12/17/4c22a73e-cd2a-423a-af7f-9078690ada89.jpg"
    },
    "card_payment_type": "credit",
    "cash_payment": 1,
    "installment_payment": 1,
    "slug": "other",
    "three_d_payment": 1,
    "is_commerce_card": false,
    "installments": [{
        "pk": 1,
        "card": 1,
        "installment_count": 1,
        "label": "1",
        "interest_rate": "0.000000",
        "is_active": true,
        "config": {},
        "translations": null,
        "amount": 19.49,
        "interest_amount": 0,
        "single_installment_amount": 19.49,
        "total_amount": 19.49
      },
      {
        "pk": 2,
        "card": 1,
        "installment_count": 2,
        "label": "2",
        "interest_rate": "0.010000",
        "is_active": true,
        "config": {},
        "translations": null,
        "amount": 19.49,
        "interest_amount": 0.2,
        "single_installment_amount": 9.85,
        "total_amount": 19.69
      },
      {
        "pk": 3,
        "card": 1,
        "installment_count": 3,
        "label": "3",
        "interest_rate": "0.050000",
        "is_active": true,
        "config": {},
        "translations": null,
        "amount": 19.49,
        "interest_amount": 0.98,
        "single_installment_amount": 6.83,
        "total_amount": 20.47
      }
    ]
  }]
}
```

## useGetProductByParamsQuery

This function is used to fetch product and variants information, selected_variant, and in_stock status without navigating to the product details page.

The **useGetProductByParamsQuery** function is imported from `'@akinon/next/data/client/product'`.

```javascript
import { useGetProductByParamsQuery } from '@akinon/next/data/client/product';
```

To use this function, the productPk needs to be provided as an argument:

```javascript
const { data, isFetching, isSuccess } = useGetProductByParamsQuery({ pk });
```

Data returned from the function:

```json
{
	"in_stock": true,
	"product": {
		"pk": 123456,
		"name": "Product Name",
		"sku": "123456",
		"base_code": "123456",
		"attributes": {
			...
		},
		"attribute_set": 12,
		"attributes_kwargs": {
			...
		},
		"extra_attributes": {},
		"productimage_set": [{
			...
		}],
		"price": "15",
		"in_stock": true,
		"currency_type": "aed",
		"retail_price": "15",
		"unit_type": "qty",
		"absolute_url": "/product-url/",
		"productvideo_set": [],
		"product_type": "0",
		"price_type": "default",
		"form_schema": null,
		"is_ready_to_basket": false,
		"stock": 319,
		"data_source": null,
		"basket_offers": []
	},
	"variants": [{
			"attribute_key": "color",
			"attribute_name": "Color",
			"options": [{
				"is_selected": true,
				"is_selectable": true,
				"is_selectable_without_stock": true,
				"in_stock": true,
				"order": "0",
				"label": "Pink",
				"value": "Pink",
				"product": {
					...
				}
			}]
		},
		{
			"attribute_key": "size",
			"attribute_name": "Size",
			"options": [{
				"is_selected": true,
				"is_selectable": true,
				"is_selectable_without_stock": true,
				"in_stock": true,
				"order": "5020",
				"label": "236ML",
				"value": "236ML",
				"product": {
					...
				}
			}]
		}
	],
	"selected_variant": {
		"pk": 123456,
		"name": "Product name",
		"sku": "123456",
		"base_code": "123456",
		"attributes": {
			...
		},
		"attribute_set": 12,
		"attributes_kwargs": {
			...
		},
		"extra_attributes": {},
		"productimage_set": [{
			...
		}],
		"price": "15",
		"in_stock": true,
		"currency_type": "usd",
		"retail_price": "15",
		"unit_type": "qty",
		"absolute_url": "/product-url",
		"productvideo_set": [],
		"product_type": "0",
		"price_type": "default",
		"form_schema": null,
		"is_ready_to_basket": false,
		"stock": 319,
		"data_source": null
	}

}
```