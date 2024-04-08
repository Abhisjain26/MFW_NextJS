---
title: Account
sidebar_label: Account
slug: account
custom_edit_url: null
---

## useGetProfileInfoQuery

This function is used to fetch user profile information.

The **useGetProfileInfoQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetProfileInfoQuery } from '@akinon/next/data/client/account';
```
This function can be used to access data like the user's **name, surname, email, phone number, birth date, birth month, birth year, gender**, and more. To use this function, assign it to a variable like this:

```javascript
const { data: profileInfo } = useGetProfileInfoQuery();
```

Specific data can be accessed by using the `profileInfo` variable. For example, to access the email:

```javascript
const userEmail = profileInfo?.email ?? '';
```

The data returned from the function:

```json
{
	"id": 7,
	"first_name": "FirstName",
	"last_name": "LastName",
	"email_allowed": false,
	"sms_allowed": false,
	"call_allowed": null,
	"avatar": null,
	"email": "mail@akinon.com",
	"phone": "05351231212",
	"date_of_birth": "2023-04-28",
	"gender": "female",
	"genders": [
		{
			"value": "female",
			"label": "female"
		},
		{
			"value": "male",
			"label": "male"
		}
	],
	"language_code": "en",
	"attributes": {
		"register_client_type": "default",
		"logged_ip": "31.223.57.74",
		"confirm": true
	}
}
```

## useGetContactSubjectsQuery

This function is used to fetch contact form subject titles from Omnitron.

The **useGetContactSubjectsQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetContactSubjectsQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

```javascript
  const {
    data: contactSubject,
    isLoading: subjectLoading,
    isSuccess: subjectSuccess
  } = useGetContactSubjectsQuery();
```

-   The `isLoading` value indicates whether the subject data is being loaded. In order to use **LoaderSpinner** properly, **isLoading** data can be used.
-   The `isSuccess` value becomes `true` when the subjects are successfully loaded.

The data returned from the function:

```json
{
  isLoading: false,
  isSuccess: false,
  data: [{
    "id": 1,
    "text":"Example Subject",
  }]
}
```

## useGetOrderQuery

This function is used to fetch details about a single order. 

The **useGetOrderQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetOrderQuery } from '@akinon/next/data/client/account';
```

To use this function, the order ID needs to be given to the function:

```javascript
const { data: order } = useGetOrderQuery(id);
```

The returned data can be used as `{order.status.label}`.

Data returned from the function:

```json
{
  "id": 213,
  "status": {
    "value": "400",
    "label": "Onaylandı"
  },
  "currency": {
    "value": "try",
    "label": "TL"
  },
  "orderitem_set": [{
      "id": 487,
      "status": {
        "value": "400",
        "label": "Onaylandı"
      },
      "price_currency": {
        "value": "try",
        "label": "TL"
      },
      "product": {
        "pk": 209,
        "sku": "123456",
        "base_code": "5eb0c13d-123456",
        "name": "Product Name",
        "image": "https://example/image.jpg",
        "absolute_url": "/product-url/",
        "attributes": {
          ...
        },
        "attributes_kwargs": {
        ...
        }
      },
      "is_cancelled": false,
      "is_cancellable": true,
      "is_refundable": false,
      "cancellationrequest_set": [],
      "active_cancellation_request": null,
      "shipping_company": null,
      "tracking_url": null,
      "is_tradable": false,
      "created_date": "2022-10-10T15:10:04.828931Z",
      "modified_date": "2022-10-10T15:14:10.882500Z",
      "attributes": {},
      "attributes_kwargs": {},
      "localized_attributes": {},
      "localized_attributes_kwargs": {},
      "price": "400.00",
      "tax_rate": "0.00",
      "invoice_number": null,
      "invoice_date": null,
      "e_archive_url": null,
      "tracking_number": null,
      "retail_price": "400.00",
      "image": null,
      "estimated_delivery_date": null,
      "shipping_tracking_url": null,
      "order": 213,
      "extra_product_price": 400,
      "extra_product_stock": 400,
      "datasource": 26
    }
  ],
  "discountitem_set": [],
  "is_cancelled": false,
  "is_cancellable": true,
  "is_refundable": false,
  "shipping_address": {
    "pk": 214,
    "email": "email@akinon.com",
    "phone_number": "05320000000",
    "first_name": "firstName",
    "last_name": "lastName",
    "country": {
      "pk": 1,
      "is_active": true,
      "name": "Türkiye",
      "code": "tr",
      "translations": null
    },
    "city": {
      "pk": 1,
      "is_active": true,
      "name": "Adana",
      "country": 1,
      "translations": null,
      "priority": null,
      "postcode": null
    },
    "line": "Example Adress Line",
    "title": "Adress Title",
    "township": {
      "pk": 1,
      "is_active": true,
      "name": "ALADAĞ",
      "city": 1,
      "postcode": null
    },
    "district": {
      "pk": 61802,
      "is_active": true,
      "name": "AKÖREN MAH",
      "city": 1,
      "township": 1,
      "postcode": null
    },
    "postcode": null,
    "notes": null,
    "company_name": "",
    "tax_office": "",
    "tax_no": "",
    "e_bill_taxpayer": false,
    "hash_data": "2f8d20d7f12b5a844c24e337cd736c93",
    "address_type": "customer",
    "retail_store": null,
    "remote_id": null,
    "identity_number": "11111111111",
    "extra_field": null,
    "user": {
      "pk": 3,
      "username": "4251d92a20e3d795d30bfd5b4fa5f6f2",
      "email": "email@akinon.com",
      "first_name": "firstName",
      "last_name": "lastName",
      "is_active": true,
      "date_joined": "2022-07-01T11:46:01.970233Z",
      "last_login": "2023-05-02T14:31:58.673990Z",
      "email_allowed": true,
      "sms_allowed": true,
      "call_allowed": true,
      "gender": null,
      "attributes": {
        "verified_phone": true,
        "register_client_type": "default",
        "logged_ip": "3.73.5.7",
        "user_type": "architect",
        "confirm": true,
        "verified_user": true
      },
      "phone": "05320000000",
      "date_of_birth": "1998-03-09",
      "attributes_kwargs": {},
      "user_type": "registered",
      "modified_date": "2023-04-18T07:40:10.621112Z"
    },
    "is_corporate": false,
    "primary": false
  },
  "billing_address": {
    "pk": 214,
    "email": "email@akinon.com",
    "phone_number": "05320000000",
    "first_name": "firstName",
    "last_name": "lastName",
    "country": {
      "pk": 1,
      "is_active": true,
      "name": "Türkiye",
      "code": "tr",
      "translations": null
    },
    "city": {
      "pk": 1,
      "is_active": true,
      "name": "Adana",
      "country": 1,
      "translations": null,
      "priority": null,
      "postcode": null
    },
    "line": "Example Adress Line",
    "title": "Adress Title",
    "township": {
      "pk": 1,
      "is_active": true,
      "name": "ALADAĞ",
      "city": 1,
      "postcode": null
    },
    "district": {
      "pk": 61802,
      "is_active": true,
      "name": "AKÖREN MAH",
      "city": 1,
      "township": 1,
      "postcode": null
    },
    "postcode": null,
    "notes": null,
    "company_name": "",
    "tax_office": "",
    "tax_no": "",
    "e_bill_taxpayer": false,
    "hash_data": "2f8d20d7f12b5a844c24e337cd736c93",
    "address_type": "customer",
    "retail_store": null,
    "remote_id": null,
    "identity_number": "11111111111",
    "extra_field": null,
    "user": {
      "pk": 3,
      "username": "4251d92a20e3d795d30bfd5b4fa5f6f2",
      "email": "email@akinon.com",
      "first_name": "firstName",
      "last_name": "lastName",
      "is_active": true,
      "date_joined": "2022-07-01T11:46:01.970233Z",
      "last_login": "2023-05-02T14:31:58.673990Z",
      "email_allowed": true,
      "sms_allowed": true,
      "call_allowed": true,
      "gender": null,
      "attributes": {
        "verified_phone": true,
        "register_client_type": "default",
        "logged_ip": "3.73.5.7",
        "user_type": "architect",
        "confirm": true,
        "verified_user": true
      },
      "phone": "05320000000",
      "date_of_birth": "1998-03-09",
      "attributes_kwargs": {},
      "user_type": "registered",
      "modified_date": "2023-04-18T07:40:10.621112Z"
    },
    "is_corporate": false,
    "primary": false
  },
  "shipping_company": null,
  "client_type": "default",
  "payment_option": {
    "pk": 1,
    "name": "Kredi Kartı / Banka Kartı",
    "payment_type": "credit_card",
    "slug": "credit-card"
  },
  "amount_without_discount": "1180.00",
  "is_payable": false,
  "tracking_url": null,
  "bank": {
    "pk": 1,
    "name": "Other",
    "slug": "other",
    "logo": "https://441fa4.cdn.akinoncloud.com/banks/2022/06/30/728390b7-22d8-4987-9cd6-3edffc50d578.jpg"
  },
  "created_date": "2022-10-10T15:10:04.823510Z",
  "modified_date": "2022-10-10T15:10:19.212651Z",
  "number": "2101925807112197",
  "amount": "1180.00",
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
  "remote_addr": "10.8.0.46",
  "has_gift_box": false,
  "gift_box_note": null,
  "language_code": "tr-tr",
  "notes": null,
  "delivery_range": null,
  "extra_field": {},
  "user_email": "email@akinon.com",
  "shipping_option_slug": "sendeo",
  "payment_option_slug": "credit-card",
  "bin_number": "545454",
  "installment_count": 1,
  "installment_interest_amount": "0.00",
  "shipping_tracking_url": null,
  "user": 3,
  "basket": 544,
  "shipping_option": 1,
  "card": 1,
  "installment": 1,
  "segment": null,
  "checkout_provider": null
}
```

## useGetOrdersQuery

This function is used to fetch a list of orders belonging to a user. 

The **useGetOrdersQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetOrdersQuery } from '@akinon/next/data/client/account';
```

This function can be used like this:

```javascript
const { data: orders } = useGetOrdersQuery({});
```

The incoming data can be mapped within `orders?.results?`. The item from the mapped list can be processed in the component where it is located or can be sent to a card component as shown below and processed there.

```javascript
{orders.results.map((item, index) => (
	<Order  key={index}  {...item}  />
))}
```

The returned data from the function:

```json
{
  "count": 551,
  "next": "https://demo.akinon.net/users/orders/?format=json&page=2",
  "previous": null,
  "results": [{
    "id": 2841,
    "status": {
      "value": "450",
      "label": "Hazırlanıyor"
    },
    "currency": {
      "value": "try",
      "label": "TL"
    },
    "orderitem_set": [{
      "id": 7336,
      "status": {
        "value": "450",
        "label": "Hazırlanıyor"
      },
      "price_currency": {
        "value": "try",
        "label": "TL"
      },
      "product": {
        "pk": 209,
        "sku": "123456",
        "base_code": "5eb0c13d-123456",
        "name": "Product Name",
        "image": "https://example/image.jpg",
        "absolute_url": "/product-url/",
        "attributes": {
          ...
        },
        "attributes_kwargs": {
          ...
        }
      },
      "is_cancelled": false,
      "is_cancellable": false,
      "is_refundable": true,
      "cancellationrequest_set": [],
      "active_cancellation_request": null,
      "shipping_company": null,
      "tracking_url": null,
      "is_tradable": false,
      "available_easy_return_shipping_companies": [],
      "created_date": "2023-04-11T06:24:47.015497Z",
      "modified_date": "2023-04-11T06:40:26.649191Z",
      "attributes": {},
      "attributes_kwargs": {},
      "localized_attributes": {},
      "localized_attributes_kwargs": {},
      "price": "39.99",
      "tax_rate": "0.00",
      "invoice_number": "x",
      "invoice_date": null,
      "e_archive_url": null,
      "tracking_number": "-1",
      "retail_price": "39.99",
      "image": null,
      "extra_field": {
        "price_extra_field": {
          "sort": 0,
          "leadtime_to_ship": 3,
          "delivery_time_earliest_days": 3,
          "delivery_time_latest_days": 5
        },
        "stock_extra_field": {}
      },
      "estimated_delivery_date": null,
      "shipping_tracking_url": null,
      "order": 2841,
      "parent": null,
      "extra_product_price": 5985,
      "extra_product_stock": 6018,
      "datasource": 83
    }],
    "discountitem_set": [{}],
    "is_cancelled": false,
    "is_cancellable": false,
    "is_refundable": true,
    "shipping_address": {
      "pk": 1370,
      "email": "email@akinon.com",
      "phone_number": "05320000000",
      "first_name": "firstName",
      "last_name": "lastName",
      "country": {
        "pk": 1,
        "is_active": true,
        "name": "Türkiye",
        "code": "tr",
        "translations": null
      },
      "city": {
        "pk": 40,
        "is_active": true,
        "name": "İSTANBUL",
        "country": 1,
        "translations": null,
        "priority": null,
        "postcode": null
      },
      "line": "Example Adress Line",
      "title": "Adress Title",
      "township": {
        "pk": 449,
        "is_active": true,
        "name": "ARNAVUTKÖY",
        "city": 40,
        "postcode": null
      },
      "district": {
        "pk": 23739,
        "is_active": true,
        "name": "ADNAN MENDERES MAH",
        "city": 40,
        "township": 449,
        "postcode": null
      },
      "postcode": null,
      "notes": null,
      "company_name": "",
      "tax_office": "",
      "tax_no": "",
      "e_bill_taxpayer": false,
      "hash_data": "680009c875031382348ea491673c7b2f",
      "address_type": "customer",
      "retail_store": null,
      "remote_id": null,
      "identity_number": "11111111111",
      "extra_field": null,
      "user": {
        "pk": 3,
        "username": "4251d92a20e3d795d30bfd5b4fa5f6f2",
        "first_name": "firstName",
        "last_name": "lastName",
        "email": "email@akinon.com",
        "is_active": true,
        "date_joined": "2022-07-01T11:46:01.970233Z",
        "last_login": "2023-05-02T14:31:58.673990Z",
        "email_allowed": true,
        "sms_allowed": true,
        "call_allowed": true,
        "gender": null,
        "attributes": {
          "verified_phone": true,
          "register_client_type": "default",
          "logged_ip": "3.73.5.7",
          "user_type": "architect",
          "confirm": true,
          "verified_user": true
        },
        "phone": "05320000000",
        "date_of_birth": "1998-03-09",
        "attributes_kwargs": {},
        "user_type": "registered",
        "modified_date": "2023-04-18T07:40:10.621112Z"
      },
      "is_corporate": false,
      "primary": false
    },
    "billing_address": {
      "pk": 1370,
      "email": "email@akinon.com",
      "phone_number": "05320000000",
      "first_name": "firstName",
      "last_name": "lastName",
      "country": {
        "pk": 1,
        "is_active": true,
        "name": "Türkiye",
        "code": "tr",
        "translations": null
      },
      "city": {
        "pk": 40,
        "is_active": true,
        "name": "İSTANBUL",
        "country": 1,
        "translations": null,
        "priority": null,
        "postcode": null
      },
      "line": "Example Adress Line",
      "title": "Adress Title",
      "township": {
        "pk": 449,
        "is_active": true,
        "name": "ARNAVUTKÖY",
        "city": 40,
        "postcode": null
      },
      "district": {
        "pk": 23739,
        "is_active": true,
        "name": "ADNAN MENDERES MAH",
        "city": 40,
        "township": 449,
        "postcode": null
      },
      "postcode": null,
      "notes": null,
      "company_name": "",
      "tax_office": "",
      "tax_no": "",
      "e_bill_taxpayer": false,
      "hash_data": "680009c875031382348ea491673c7b2f",
      "address_type": "customer",
      "retail_store": null,
      "remote_id": null,
      "identity_number": "11111111111",
      "extra_field": null,
      "user": {
        "pk": 3,
        "username": "4251d92a20e3d795d30bfd5b4fa5f6f2",
        "first_name": "firstName",
        "last_name": "lastName",
        "email": "email@akinon.com",
        "is_active": true,
        "date_joined": "2022-07-01T11:46:01.970233Z",
        "last_login": "2023-05-02T14:31:58.673990Z",
        "email_allowed": true,
        "sms_allowed": true,
        "call_allowed": true,
        "gender": null,
        "attributes": {
          "verified_phone": true,
          "register_client_type": "default",
          "logged_ip": "3.73.5.7",
          "user_type": "architect",
          "confirm": true,
          "verified_user": true
        },
        "phone": "05320000000",
        "date_of_birth": "1998-03-09",
        "attributes_kwargs": {},
        "user_type": "registered",
        "modified_date": "2023-04-18T07:40:10.621112Z"
      },
      "is_corporate": false,
      "primary": false
    },
    "shipping_company": null,
    "client_type": "default",
    "payment_option": {
      "pk": 1,
      "name": "Kredi Kartı / Banka Kartı",
      "payment_type": "credit_card",
      "slug": "credit-card"
    },
    "amount_without_discount": "159.96",
    "is_payable": false,
    "tracking_url": null,
    "bank": {
      "pk": 16,
      "name": "İş Bankası",
      "slug": "is-bankas",
      "logo": null
    },
    "created_date": "2023-04-11T06:24:47.012358Z",
    "modified_date": "2023-04-11T06:38:19.104843Z",
    "number": "2259722258911780",
    "amount": "159.96",
    "discount_amount": "0.00",
    "shipping_amount": "0.00",
    "shipping_tax_rate": null,
    "refund_amount": "0.00",
    "discount_refund_amount": "0.00",
    "shipping_refund_amount": "0.00",
    "invoice_number": "x",
    "invoice_date": null,
    "e_archive_url": null,
    "tracking_number": "-1",
    "remote_addr": "31.145.77.36",
    "has_gift_box": false,
    "gift_box_note": null,
    "language_code": "tr-tr",
    "notes": null,
    "delivery_range": null,
    "extra_field": {},
    "user_email": "email@akinon.com",
    "shipping_option_slug": "other",
    "payment_option_slug": "credit-card",
    "bin_number": "450803",
    "installment_count": 1,
    "installment_interest_amount": "0.00",
    "shipping_tracking_url": null,
    "user": 3,
    "basket": 4169,
    "shipping_option": 6,
    "card": 42,
    "installment": 23,
    "segment": null,
    "checkout_provider": null
  }]
}
```

## useGetCancellationReasonsQuery

This function is used to fetch cancellation reasons for orders from Omnitron. 

The **useGetCancellationReasonsQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetCancellationReasonsQuery } from '@akinon/next/data/client/account';
```

To get the cancellation reasons, define a variable and call the function:

```javascript
  const {
    data: cancellationReasons,
    isSuccess: cancellationReasonsSuccess } = useGetCancellationReasonsQuery();
```

-   `isSuccess` becomes `true` when the reasons are successfully loaded.

The returned data from the function:

```
{
  isSuccess: false,
  data: [{
    "id": 1,
    "subject":"Example Subject",
  }]
}
```
To map the data, a variable called **cancelReasons** is defined.

```
const cancelReasons = cancellationReasons.results
  .filter((item) => item.cancellation_type === cancellationType)
  .map((item) => {
    return { label: item.subject, value: String(item.id) };
  });
```

**cancelReasons** now becomes a variable that provides a plain list of the cancellation reasons.

## useGetBasketOffersQuery

This function is used to fetch a list of coupons from Omnitron. 

The **useGetBasketOffersQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetBasketOffersQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

```javascript
  const {
    data: basketOffers,
    isLoading: basketOffersLoading,
    isSuccess: basketOffersSuccess
  } = useGetBasketOffersQuery();
```

Data returned from the function:

```json
{
  "discounts": [{
    "label": "This is a test coupon.",
    "amount": 100,
    "percentage": null,
    "end_datetime": "2024-05-08T08:32:12.181000Z",
    "start_datetime": "2023-05-08T08:00:00.138000Z",
    "currency": {
      "value": "aed",
      "label": "AED"
    },
    "voucher_code": null,
    "offer_type": {
      "value": "coupon",
      "label": "Coupon"
    },
    "condition": {
      "type": "Amount",
      "value": 10
    },
    "benefit_type": {
      "value": "fixed",
      "label": "Fixed"
    }
  }],
  "total_discount": 100,
  "all_discounts": [{
    "label": "This is a test coupon.",
    "amount": 100,
    "percentage": null,
    "end_datetime": "2024-05-08T08:32:12.181000Z",
    "start_datetime": "2023-05-08T08:00:00.138000Z",
    "currency": {
      "value": "aed",
      "label": "AED"
    },
    "voucher_code": null,
    "offer_type": {
      "value": "coupon",
      "label": "Coupon"
    },
    "condition": {
      "type": "Amount",
      "value": 10
    },
    "benefit_type": {
      "value": "fixed",
      "label": "Fixed"
    }
  }]
}
```

## useGetFutureBasketOffersQuery

This function is used to fetch a list of coupons that will be used in the future from Omnitron.

The **useGetFutureBasketOffersQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetFutureBasketOffersQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

```javascript
  const {
    data: futureBasketOffers,
    isLoading: futureBasketOffersLoading,
    isSuccess: futureBasketOffersSuccess
  } = useGetFutureBasketOffersQuery();
```

Data returned from the function:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [{
    "label": "This is a test coupon.",
    "amount": 0,
    "percentage": null,
    "end_datetime": "2024-05-04T08:47:22.286000Z",
    "start_datetime": "2023-05-31T08:47:10.669000Z",
    "currency": {
      "value": "aed",
      "label": "AED"
    },
    "voucher_code": null,
    "offer_type": {
      "value": "coupon",
      "label": "Coupon"
    },
    "condition": {
      "type": "Amount",
      "value": 10
    },
    "benefit_type": {
      "value": "shipping_free",
      "label": "Shipping Free"
    }
  }]
}
```

## useGetExpiredBasketOffersQuery

This function is used to fetch a list of expired coupons from Omnitron. 

The **useGetExpiredBasketOffersQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetExpiredBasketOffersQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

```javascript
  const {
    data: expiredBasketOffers,
    isLoading: expiredBasketOffersLoading,
    isSuccess: expiredBasketOffersSuccess
  } = useGetExpiredBasketOffersQuery();
```

Data returned from the function:
```
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [{
    "label": "This is a test coupon.",
    "amount": 0,
    "percentage": null,
    "end_datetime": "2024-05-04T08:47:22.286000Z",
    "start_datetime": "2023-05-31T08:47:10.669000Z",
    "currency": {
      "value": "aed",
      "label": "AED"
    },
    "voucher_code": null,
    "offer_type": {
      "value": "coupon",
      "label": "Coupon"
    },
    "condition": {
      "type": "Amount",
      "value": 10
    },
    "benefit_type": {
      "value": "shipping_free",
      "label": "Shipping Free"
    }
  }]
}
```

## useGetDiscountItemsQuery

This function is used to fetch a list of used coupons from Omnitron. 

The **useGetDiscountItemsQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetDiscountItemsQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

```javascript
  const {
    data: discountItems,
    isLoading: discountItemsLoading,
    isSuccess: discountItemsSuccess
  } = useGetDiscountItemsQuery();
```

Data returned from the function:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [{
    "label": "This is a test coupon.",
    "amount": 0,
    "percentage": null,
    "end_datetime": "2024-05-04T08:47:22.286000Z",
    "start_datetime": "2023-05-31T08:47:10.669000Z",
    "currency": {
      "value": "aed",
      "label": "AED"
    },
    "voucher_code": null,
    "offer_type": {
      "value": "coupon",
      "label": "Coupon"
    },
    "condition": {
      "type": "Amount",
      "value": 10
    },
    "benefit_type": {
      "value": "shipping_free",
      "label": "Shipping Free"
    }
  }]
}
```


## useGetLoyaltyBalanceQuery

This function is used to fetch a user's loyalty points balance. 

The **useGetLoyaltyBalanceQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetLoyaltyBalanceQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

```javascript
const { data: loyaltyBalance, isLoading: isLoadingLoyaltyBalance } = useGetLoyaltyBalanceQuery();
```

## useGetLoyaltyTransactionsQuery

This function is used to fetch a list of a user's loyalty transactions, both used and unused points. Negative points in the list represent used points.

The **useGetLoyaltyTransactionsQuery** function is imported from `'@akinon/next/data/client/account'`.

```javascript
import { useGetLoyaltyTransactionsQuery } from '@akinon/next/data/client/account';
```

To use this function, create a variable and call the function:

`const { data: loyalty, isLoading: isLoadingLoyaltyList } = useGetLoyaltyTransactionsQuery();`

The variable can be mapped to the location where you desire to display list. An example of how to map the data is provided below:

```jsx
{loyalty.results.map((item, index) => (
  <div key={`loyalty-${index}`}>
    <span>
      {new Date(item.transaction.created_date).toLocaleDateString(
        localeValue,
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }
      )}
    </span>
    <span>
      {item.transaction.order}
    </span>
    <Price value={item.amount} />
  </div>
))}
```