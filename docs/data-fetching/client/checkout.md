---
title: Checkout
sidebar_label: Checkout
slug: checkout
custom_edit_url: null
---

## useFetchCheckoutQuery

This function is used to fetch all the data added during the payment steps. 

The **useFetchCheckoutQuery** function is imported from `'@akinon/next/data/client/checkout'`.

```javascript
import { useFetchCheckoutQuery } from '@akinon/next/data/client/checkout';
```

To use this function, a variable can be created to retrieve checkout data as follows:

```javascript
const {
    data: checkoutData,
    isFetching,
    isError,
    isSuccess,
    refetch: refetchCheckout
  } = useFetchCheckoutQuery(null, {
    refetchOnMountOrArgChange: true
  });
```

Data returned from the function:

```json
{
  "context_list": [{
      "page_context": {
        "is_user_logged_in": true,
        "can_guest_purchase": true,
        "has_gift_box": true
      },
      "page_name": "IndexPage",
      "page_slug": "indexpage"
    },
    {
      "page_context": {
        "delivery_options": [{
            "pk": 2,
            "slug": "store",
            "name": "Mağazadan Teslimat",
            "delivery_option_type": "retail_store",
            "sort_order": 1
          },
          {
            "pk": 1,
            "slug": "delivery_point",
            "name": "Teslim Noktasına Teslimat",
            "delivery_option_type": "customer",
            "sort_order": 2
          },
          {
            "pk": 3,
            "slug": "address",
            "name": "Eve Teslim",
            "delivery_option_type": "customer",
            "sort_order": 3
          }
        ]
      },
      "page_name": "DeliveryOptionSelectionPage",
      "page_slug": "deliveryoptionselectionpage"
    },
    {
      "page_context": {
        "addresses": [{
          "pk": 84,
          "email": "akinon.mail@akinon.com",
          "phone_number": "05555555555",
          "first_name": "Firsname",
          "last_name": "Lastname",
          "country": {
            "pk": 1,
            "name": "Test Country",
            "code": "tr"
          },
          "city": {
            "pk": 2,
            "name": "Test City 1",
            "country": 1
          },
          "line": "this is a test address.",
          "title": "Test Title",
          "township": {
            "pk": 2,
            "name": "Test Township 1",
            "city": 2
          },
          "district": {
            "pk": 2,
            "name": "Test District 1",
            "city": 2,
            "township": 2
          },
          "postcode": "00000",
          "notes": null,
          "company_name": null,
          "tax_office": null,
          "tax_no": null,
          "e_bill_taxpayer": false,
          "is_corporate": false,
          "primary": false,
          "identity_number": null,
          "extra_field": null
        }],
        "retail_stores": [{
            "pk": 1,
            "name": "Shop 2",
            "township": {
              "pk": 1,
              "name": "Test Township 3",
              "city": {
                "pk": 1,
                "name": "Test City 2",
                "country": 1
              }
            },
            "district": {
              "pk": 1,
              "name": "Test District 3",
              "city": 1,
              "township": 1
            },
            "address": "Shop 2 Address"
          },
          {
            "pk": 2,
            "name": "Shop 1",
            "township": {
              "pk": 2,
              "name": "Test Township 1",
              "city": {
                "pk": 2,
                "name": "Test City 1",
                "country": 1
              }
            },
            "district": {
              "pk": 2,
              "name": "Test District 1",
              "city": 2,
              "township": 2
            },
            "address": "Shop Test Address"
          },
          {
            "pk": 5,
            "name": "Shop 4",
            "township": {
              "pk": 2,
              "name": "Test Township 1",
              "city": {
                "pk": 2,
                "name": "Test City 1",
                "country": 1
              }
            },
            "district": {
              "pk": 2,
              "name": "Test District 1",
              "city": 2,
              "township": 2
            },
            "address": "Istanbul Turkey"
          },
          {
            "pk": 4,
            "name": "Shop 3",
            "township": {
              "pk": 3,
              "name": "Test Township 4",
              "city": {
                "pk": 3,
                "name": "Test City 3",
                "country": 1
              }
            },
            "district": {
              "pk": 3,
              "name": "Test District 4",
              "city": 3,
              "township": 3
            },
            "address": "Boston Marriott Quincy"
          },
          {
            "pk": 3,
            "name": "Shop 3",
            "township": {
              "pk": 3,
              "name": "Test Township 4",
              "city": {
                "pk": 3,
                "name": "Test City 3",
                "country": 1
              }
            },
            "district": {
              "pk": 3,
              "name": "Test District 4",
              "city": 3,
              "township": 3
            },
            "address": "Boston Marriott Quincy 1000"
          }
        ],
        "country": {
          "pk": 1,
          "name": "Test Country",
          "code": "tr"
        }
      },
      "page_name": "RetailStoreSelectionPage",
      "page_slug": "retailstoreselectionpage"
    },
    {
      "page_context": {
        "shipping_options": [{
            "pk": 2,
            "name": "UPS",
            "slug": "ups",
            "logo": null,
            "shipping_amount": "8.50",
            "description": null,
            "kwargs": {}
          },
          {
            "pk": 1,
            "name": "MNG Kargo",
            "slug": "Mng",
            "logo": null,
            "shipping_amount": "0",
            "description": "{}",
            "kwargs": {}
          }
        ]
      },
      "page_name": "ShippingOptionSelectionPage",
      "page_slug": "shippingoptionselectionpage"
    },
    {
      "page_context": {
        "checkout_url": null,
        "status_url": null,
        "payment_options": [{
            "pk": 1,
            "name": "Credit Card",
            "slug": "credit-card",
            "payment_type": "credit_card",
            "payment_type_label": "Credit Card"
          },
          {
            "pk": 34,
            "name": "Masterpass",
            "slug": "masterpass",
            "payment_type": "masterpass",
            "payment_type_label": "Masterpass"
          },
          {
            "pk": 4,
            "name": "havale",
            "slug": "havale",
            "payment_type": "funds_transfer",
            "payment_type_label": "Funds Transfer"
          },
          {
            "pk": 5,
            "name": "İyzico ile Öde",
            "slug": "pay_with_iyzico",
            "payment_type": "redirection",
            "payment_type_label": "Redirect to Bank"
          },
          {
            "pk": 3,
            "name": "Pay On Delivery",
            "slug": "pay-on-delivery",
            "payment_type": "pay_on_delivery",
            "payment_type_label": "Pay On Delivery"
          }
        ],
        "unavailable_options": []
      },
      "page_name": "PaymentOptionSelectionPage",
      "page_slug": "paymentoptionselectionpage"
    },
    {
      "page_context": {},
      "page_name": "BinNumberPage",
      "page_slug": "binnumberpage"
    }
  ],
  "template_name": "orders/checkout.html",
  "errors": [],
  "pre_order": {
    "basket": {
      "basketitem_set": [{
        "quantity": 1,
        "unit_price": "54.49",
        "tax_rate": "20.00",
        "currency_type": "eur",
        "product": {
          "pk": 212,
          "name": "Driving Shoes Soft Leather Brown",
          "sku": "AKN-010-brown001-43",
          "base_code": "AKN-010",
          "attributes": {
            ...
          },
          "attribute_set": 7,
          "attributes_kwargs": {
            ...
          },
          "extra_attributes": {},
          "productimage_set": [{
            "pk": 255,
            "status": "active",
            "image": "https://image-url.jpg",
            "order": 0,
            "created_date": "2023-01-09T07:02:08.250452Z",
            "specialimage_set": []
          }],
          "price": "54.49",
          "in_stock": true,
          "currency_type": "eur",
          "retail_price": "69.99",
          "unit_type": "qty",
          "absolute_url": "/product/212/",
          "productvideo_set": [],
          "product_type": "0",
          "price_type": "default",
          "form_schema": null,
          "is_ready_to_basket": false,
          "stock": 997,
          "data_source": null
        },
        "total_amount": "54.49",
        "shipping_discount": null,
        "currency_type_label": "EUR",
        "image": null,
        "datasource": null,
        "datasource_detailed": null,
        "extra_product_stock_detailed": null,
        "extra_product_price_detailed": null
      }],
      "total_quantity": 1,
      "total_amount": "54.49",
      "total_discount_amount": "0.00",
      "discounts": [],
      "upsell_messages": [],
      "total_product_amount": "54.49",
      "pk": 73,
      "created_date": "2023-02-03T09:03:04.791076Z",
      "modified_date": "2023-04-10T11:30:26.634021Z"
    },
    "shipping_address": {
      "pk": null,
      "email": "akinon.mail@akinon.com",
      "phone_number": "+321321321",
      "first_name": "Firsname",
      "last_name": "Lastname",
      "country": {
        "pk": 1,
        "name": "Test Country",
        "code": "tr"
      },
      "city": {
        "pk": 1,
        "name": "Test City 2",
        "country": 1
      },
      "line": "Shop 2 Address",
      "title": "Shop 2",
      "township": {
        "pk": 1,
        "name": "Test Township 3",
        "city": 1
      },
      "district": {
        "pk": 1,
        "name": "Test District 3",
        "city": 1,
        "township": 1
      },
      "postcode": null,
      "notes": null,
      "company_name": null,
      "tax_office": null,
      "tax_no": null,
      "e_bill_taxpayer": false,
      "primary": null,
      "identity_number": null,
      "extra_field": null
    },
    "billing_address": {
      "pk": 84,
      "email": "akinon.mail@akinon.com",
      "phone_number": "05555555555",
      "first_name": "Firsname",
      "last_name": "Lastname",
      "country": {
        "pk": 1,
        "name": "Test Country",
        "code": "tr"
      },
      "city": {
        "pk": 2,
        "name": "Test City 1",
        "country": 1
      },
      "line": "this is a test address.",
      "title": "Test Title",
      "township": {
        "pk": 2,
        "name": "Test Township 1",
        "city": 2
      },
      "district": {
        "pk": 2,
        "name": "Test District 1",
        "city": 2,
        "township": 2
      },
      "postcode": "00000",
      "notes": null,
      "company_name": null,
      "tax_office": null,
      "tax_no": null,
      "e_bill_taxpayer": false,
      "is_corporate": false,
      "primary": false,
      "identity_number": null,
      "extra_field": null
    },
    "shipping_option": {
      "pk": 2,
      "name": "UPS",
      "slug": "ups",
      "logo": null,
      "shipping_amount": "8.50",
      "description": null,
      "kwargs": {}
    },
    "billing_and_shipping_same": false,
    "payment_option": {
      "pk": 1,
      "name": "Credit Card",
      "slug": "credit-card",
      "payment_type": "credit_card",
      "payment_type_label": "Credit Card"
    },
    "notifications": null,
    "shipping_amount": "8.50",
    "total_amount": "62.99",
    "unpaid_amount": "62.99",
    "loyalty_money": "0.00",
    "currency_type_label": "TL",
    "installment": null,
    "redirect_to_three_d": null,
    "delivery_option": {
      "pk": 2,
      "slug": "store",
      "name": "Mağazadan Teslimat",
      "delivery_option_type": "retail_store",
      "sort_order": 1
    },
    "retail_store": {
      "pk": 1,
      "name": "Shop 2",
      "township": {
        "pk": 1,
        "name": "Test Township 3",
        "city": {
          "pk": 1,
          "name": "Test City 2",
          "country": 1
        }
      },
      "district": {
        "pk": 1,
        "name": "Test District 3",
        "city": 1,
        "township": 1
      },
      "address": "Shop 2 Address"
    },
    "payment_choice": null,
    "phone_number": null,
    "gift_box": null,
    "delivery_range": null,
    "user_phone_number": "05555555555",
    "total_amount_with_interest": "62.99",
    "is_guest": false,
    "is_post_order": false
  }
}
```

## useFetchCheckoutResultQuery

This function is used to fetch order data and checkout data after the payment step is completed.

The **useFetchCheckoutResultQuery** function is imported from `'@akinon/next/data/client/checkout'`.

```javascript
import { useFetchCheckoutResultQuery } from '@akinon/next/data/client/checkout';
```

To use this function, a variable needs to be created and the token value needs to be given to the function, like this:

```javascript
const { data, isLoading } = useFetchCheckoutResultQuery(String(params.token));
```

Data returned from the function:

```json
{
  "campaigns": [],
  "order": {
    "id": 164,
    "status": {
      "value": "400",
      "label": "Onaylandı"
    },
    "currency": {
      "value": "try",
      "label": "TL"
    },
    "orderitem_set": [{
      "id": 363,
      "status": {
        "value": "400",
        "label": "Onaylandı"
      },
      "price_currency": {
        "value": "try",
        "label": "TL"
      },
      "product": {
        "pk": 29,
        "sku": "4546327",
        "base_code": "TF9253",
        "name": "Product Name",
        "image": "https://image-url.jpg",
        "absolute_url": "/product-url/",
        "attributes": {
          ...
        },
        "attributes_kwargs": {
          ...
        },
        "form_schema": null,
        "data_source": null,
        "extra_attributes": {}
      },
      "is_cancelled": false,
      "is_cancellable": true,
      "is_refundable": false,
      "cancellationrequest_set": [],
      "active_cancellation_request": null,
      "shipping_company": null,
      "tracking_url": null,
      "is_tradable": false,
      "available_easy_return_shipping_companies": [{
        "pk": 1,
        "shipping_company": {
          "value": "yurtici",
          "label": "Yurtiçi Kargo"
        }
      }],
      "datasource_detailed": null,
      "extra_product_stock_detailed": null,
      "extra_product_price_detailed": null,
      "created_date": "2023-05-09T14:32:54.660351Z",
      "modified_date": "2023-05-09T14:33:01.526676Z",
      "attributes": {},
      "attributes_kwargs": {},
      "localized_attributes": {},
      "localized_attributes_kwargs": {},
      "price": "1349.00",
      "tax_rate": "8.00",
      "invoice_number": null,
      "invoice_date": null,
      "e_archive_url": null,
      "tracking_number": null,
      "retail_price": "1349.00",
      "image": null,
      "extra_field": {
        "price_extra_field": {},
        "stock_extra_field": {}
      },
      "estimated_delivery_date": null,
      "shipping_tracking_url": null,
      "order": 164,
      "parent": null,
      "extra_product_price": null,
      "extra_product_stock": null,
      "datasource": null
    }],
    "discountitem_set": [],
    "is_cancelled": false,
    "is_cancellable": true,
    "is_refundable": false,
    "shipping_address": {
      "pk": 108,
      "email": "akinon.mail@akinon.com",
      "phone_number": "05555555555",
      "first_name": "firsname",
      "last_name": "lastname",
      "country": {
        "pk": 1,
        "is_active": true,
        "name": "TÜRKİYE",
        "code": "TR",
        "translations": null
      },
      "city": {
        "pk": 1,
        "is_active": true,
        "name": "ADANA",
        "country": 1,
        "translations": null,
        "priority": null,
        "postcode": null
      },
      "line": "this is a test address.",
      "title": "test",
      "township": {
        "pk": 1,
        "is_active": true,
        "name": "ALADAĞ",
        "city": 1,
        "postcode": null
      },
      "district": {
        "pk": 5,
        "is_active": true,
        "name": "AKÖREN MAH",
        "city": 1,
        "township": 1,
        "postcode": null
      },
      "postcode": "00000",
      "notes": null,
      "company_name": "",
      "tax_office": "",
      "tax_no": "",
      "e_bill_taxpayer": false,
      "hash_data": "testakinon",
      "address_type": "customer",
      "retail_store": null,
      "remote_id": null,
      "identity_number": null,
      "extra_field": null,
      "user": {
        "pk": 97,
        "username": "ddd5c81fdaa6c9625e077d270573a61f",
        "first_name": "firsname",
        "last_name": "lastname",
        "email": "akinon.mail@akinon.com",
        "is_active": true,
        "date_joined": "2023-05-09T14:30:13.110643Z",
        "last_login": "2023-05-09T14:30:13.531807Z",
        "email_allowed": false,
        "sms_allowed": false,
        "call_allowed": null,
        "gender": null,
        "attributes": {
          "register_client_type": "default",
          "verified_phone": true,
          "logged_ip": "31.223.57.74"
        },
        "phone": "05555555555",
        "date_of_birth": null,
        "attributes_kwargs": {},
        "user_type": "registered",
        "modified_date": "2023-05-09T14:30:13.140105Z"
      },
      "is_corporate": false,
      "primary": false
    },
    "billing_address": {
      "pk": 108,
      "email": "akinon.mail@akinon.com",
      "phone_number": "05555555555",
      "first_name": "firsname",
      "last_name": "lastname",
      "country": {
        "pk": 1,
        "is_active": true,
        "name": "TÜRKİYE",
        "code": "TR",
        "translations": null
      },
      "city": {
        "pk": 1,
        "is_active": true,
        "name": "ADANA",
        "country": 1,
        "translations": null,
        "priority": null,
        "postcode": null
      },
      "line": "this is a test address.",
      "title": "test",
      "township": {
        "pk": 1,
        "is_active": true,
        "name": "ALADAĞ",
        "city": 1,
        "postcode": null
      },
      "district": {
        "pk": 5,
        "is_active": true,
        "name": "AKÖREN MAH",
        "city": 1,
        "township": 1,
        "postcode": null
      },
      "postcode": "00000",
      "notes": null,
      "company_name": "",
      "tax_office": "",
      "tax_no": "",
      "e_bill_taxpayer": false,
      "hash_data": "da5af4d2cb10b8b38194991817154730",
      "address_type": "customer",
      "retail_store": null,
      "remote_id": null,
      "identity_number": null,
      "extra_field": null,
      "user": {
        "pk": 97,
        "username": "ddd5c81fdaa6c9625e077d270573a61f",
        "first_name": "firsname",
        "last_name": "lastname",
        "email": "akinon.mail@akinon.com",
        "is_active": true,
        "date_joined": "2023-05-09T14:30:13.110643Z",
        "last_login": "2023-05-09T14:30:13.531807Z",
        "email_allowed": false,
        "sms_allowed": false,
        "call_allowed": null,
        "gender": null,
        "attributes": {
          "register_client_type": "default",
          "verified_phone": true,
          "logged_ip": "31.223.57.74"
        },
        "phone": "05555555555",
        "date_of_birth": null,
        "attributes_kwargs": {},
        "user_type": "registered",
        "modified_date": "2023-05-09T14:30:13.140105Z"
      },
      "is_corporate": false,
      "primary": false
    },
    "shipping_company": null,
    "client_type": "default",
    "payment_option": {
      "pk": 1,
      "name": "Credit Card",
      "payment_type": "credit_card",
      "slug": "credit-card"
    },
    "amount_without_discount": "1349.00",
    "is_payable": false,
    "tracking_url": null,
    "bank": {
      "pk": 1,
      "name": "Other",
      "slug": "other",
      "logo": "https://aad216.cdn.akinoncloud.com/banks/2023/02/28/74cd8546-8ef4-4e61-a5cc-a17fdd12fdae.jpg"
    },
    "created_date": "2023-05-09T14:32:54.651818Z",
    "modified_date": "2023-05-09T14:33:01.528271Z",
    "number": "2284207301612555",
    "amount": "1349.00",
    "discount_amount": "0.00",
    "shipping_amount": "0.00",
    "shipping_tax_rate": null,
    "refund_amount": "0.00",
    "discount_refund_amount": "0.00",
    "shipping_refund_amount": "0.00",
    "invoice_number": null,
    "invoice_date": null,
    "e_archive_url": null,
    "tracking_number": null,
    "remote_addr": "31.223.57.74",
    "has_gift_box": false,
    "gift_box_note": null,
    "language_code": "tr-tr",
    "notes": null,
    "delivery_range": null,
    "extra_field": {},
    "user_email": "akinon.mail@akinon.com",
    "shipping_option_slug": "yurtici",
    "payment_option_slug": "credit-card",
    "bin_number": "545454",
    "installment_count": 1,
    "installment_interest_amount": "0.00",
    "shipping_tracking_url": null,
    "user": 97,
    "basket": 332,
    "shipping_option": 1,
    "card": 1,
    "installment": 1,
    "segment": null,
    "checkout_provider": null
  }
}
```

## useGetContractQuery

This function is used to fetch data for contracts from Omnitron for the checkout process. 

The **useGetContractQuery** function is imported from `'@akinon/next/data/client/checkout'`.

```javascript
import { useGetContractQuery } from '@akinon/next/data/client/checkout';
```

To use this function, a variable needs to be created and the slug value needs to be given to the function, like this:

```javascript
  const { data } = useGetContractQuery(slug, { skip: !isModalOpen });
```

Data returned from the function:

```
{
  "result": "<div id=\"js-modal-information\" class=\"modal\"></div>"
}
```

The returned data can be used as follows:

```jsx
  <div dangerouslySetInnerHTML={{ __html: data.result }}></div>
```

## useGet3dRedirectFormQuery

The **useGet3dRedirectFormQuery** hook sends a request to the endpoint **"/orders/redirect-three-d"** and retrieves HTML data in text format. 

The returned HTML data contains a form. This form is selected and submitted by adding session information to it.

The **useGet3dRedirectFormQuery** hook is imported from `'@akinon/next/data/client/checkout'`.

```javascript
import { useGet3dRedirectFormQuery } from '@akinon/next/data/client/checkout';
```

To use the function, create a variable:

```javascript
  const { data } = useGet3dRedirectFormQuery();
```

Next, create a fragment element and assign the **data.result** to its innerHTML:

```javascript
  const fragment = document.createElement('fragment');
  fragment.innerHTML = data.result;
```
If the data contains a **link[rel="canonical"]** query selector, the router is replaced:

```javascript
  if (fragment.querySelector('link[rel="canonical"]')) {
    setError('Redirection to 3D Secure failed. Please wait...');

    setTimeout(() => {
      router.replace(ROUTES.CHECKOUT);
    }, 3000);
    return;
  }
```

If there's no **link[rel="canonical"]** query selector in the fragment, locate the form element within the fragment. Then, create an input element for a session, set its **type**, **name**, and **value** attributes, and append it to the form. The form is appended to the body before submitting it:

```javascript
const form = fragment.querySelector('form');
const sessionInput = document.createElement('input');
sessionInput.setAttribute('type', 'hidden');
sessionInput.setAttribute('name', 'session');
sessionInput.setAttribute('value', getCookie('osessionid'));
form.appendChild(sessionInput);
form.style.display = 'none';
document.body.appendChild(form);
form.submit();
```