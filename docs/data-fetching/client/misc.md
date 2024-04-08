---
title: Misc
sidebar_label: Misc
slug: misc
custom_edit_url: null
---

## useAutocompleteQuery

This function is used to match the entered keyword in categories and products for search input. 

The **useAutocompleteQuery** function is imported from `'@akinon/next/data/client/misc'`.

```javascript
import { useAutocompleteQuery } from '@akinon/next/data/client/misc';
```

To use the function, create a variable and call the function with the following properties: 
* **debouncedSearchText**
* **refetchOnMountOrArgChange**
*  **skip**

```javascript
const { currentData, isFetching, isLoading } = useAutocompleteQuery(
    debouncedSearchText,
    {
      refetchOnMountOrArgChange: true,
      skip: debouncedSearchText.length < MINIMUM_SEARCH_LENGTH
    }
  );
```
For example, if searching for the keyword "**WOM**", the data returned from the function:

```json
{
  "groups": [{
      "entries": [{
        "label": "WOMAN",
        "url": "/woman/",
        "suggestion_type": "category",
        "extra": {
          "category_id": 2,
          "parent_categories": []
        }
      }],
      "suggestion_type": "Category"
    },
    {
      "entries": [{
          "label": "Mini Turnlock Flap Zebra Print Clutch Bag Black",
          "url": "/mini-turnlock-flap-zebra-print-clutch-bag-black/",
          "suggestion_type": "product",
          "extra": {
            "image": "https://0fb534.cdn.akinoncloud.com/products/2022/02/02/303/ae5f3cc6-d918-4dff-bdc0-b8b397f3882f_size273x210.jpg",
            "retail_price": 89.99,
            "product_type": "0",
            "price": 49.99
          }
        },
        {
          "label": "Resin Hair Clip Claw Zebra Print",
          "url": "/resin-hair-clip-claw-zebra-print/",
          "suggestion_type": "product",
          "extra": {
            "image": "https://0fb534.cdn.akinoncloud.com/products/2022/02/02/305/7374553d-151d-4cf0-b06f-45164313c959_size273x210.jpg",
            "retail_price": 8.49,
            "product_type": "0",
            "price": 8.49
          }
        },
        {
          "label": "Frill Neck Mini Dress With Fluted Three Quarter Sleeves Black",
          "url": "/frill-neck-mini-dress-with-fluted-three-quarter-sleeves-black-1/",
          "suggestion_type": "product",
          "extra": {
            "image": "https://0fb534.cdn.akinoncloud.com/products/2022/04/11/274/7f470497-fb62-4c41-afe8-f3c1bc01ed37_size273x210.jpg",
            "retail_price": 1000,
            "product_type": "0",
            "price": 1000
          }
        },
        {
          "label": "Wide Fit Embrace Leather High-Heeled Square Toe Boots Burgundy",
          "url": "/wide-fit-embrace-leather-high-heeled-square-toe-boots-burgundy/",
          "suggestion_type": "product",
          "extra": {
            "image": "https://0fb534.cdn.akinoncloud.com/products/2022/02/02/297/fdc50378-d570-44c0-9a69-1c16e3c15321_size273x210.jpg",
            "retail_price": 109.99,
            "product_type": "0",
            "price": 99.99
          }
        }
      ],
      "suggestion_type": "Product"
    }
  ]
}
```

## useGetWidgetQuery

The **useGetWidgetQuery** function is used to fetch widget data in '**use client**' components. 

It should be imported into the component:

```javascript
import { useGetWidgetQuery } from '@akinon/next/data/client/misc';
```

To use this function, create a variable where you specify the slug name of the widget you want to access:

```javascript
const { data } = useGetWidgetQuery('slug-name');
```

The returned data varies depending on the widget you have created.

The returned data can be sent to another component as `<ComponentName data={data} />` or can be processed in the component where it is located.


## useGetMenuQuery

The **useGetMenuQuery** function is used to fetch menu data in '**use client**' components. 

It should be imported into the component:

```javascript
import { useGetMenuQuery } from '@akinon/next/data/client/misc';
```

To use this function, create a variable and provide the menu level as an argument when calling the function:

```javascript
const { data: menuData, isSuccess, isFetching } = useGetMenuQuery(4);
```