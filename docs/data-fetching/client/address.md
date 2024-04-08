---
title: Address
sidebar_label: Address
slug: address
custom_edit_url: null
---

## useGetCountriesQuery

This function is used to fetch countries from Omnitron. 

The **useGetCountriesQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetCountriesQuery } from '@akinon/next/data/client/address';
```

To use the function, create a variable and list the countries.

```javascript
const { data: country } = useGetCountriesQuery();
```

Data returned from the function:

-   **count**: Provides the total count of added countries.
-   **next**: Used for pagination. If the user is on the 2nd page, it contains the URL of the 3rd page.
-   **previous**: Used for pagination. If the user is on the 2nd page, it contains the URL of the 1st page.

```json
{
	"count": 1,
	"next": null,
	"previous": null,
	"results": [{
			"pk": 1,
			"is_active": true,
			"name": "Türkiye",
			"code": "TR",
			"translations": null
		},
		{
			"pk": 1,
			"is_active": true,
			"name": "United States",
			"code": "USA",
			"translations": null
		}
	]
}
```



## useGetCitiesQuery

This function is used to fetch cities from Omnitron. 

The **useGetCitiesQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetCitiesQuery } from '@akinon/next/data/client/address';
```

To use the function, selected country data needs to be sent to the **useGetCitiesQuery** function.

```javascript
const { data: city } = useGetCitiesQuery(selectedCountry, {skip: !selectedCountry});
```

Data returned from the function:

```json
{
	"count": 1,
	"next": null,
	"previous": null,
	"results": [{
		"pk": 1,
		"is_active": true,
		"name": "İstanbul",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}]
}
```

## useGetTownshipsQuery

This function is used to fetch townships from Omnitron.

 The **useGetTownshipsQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetTownshipsQuery } from '@akinon/next/data/client/address';
```

To use the function, selected city data needs to be sent to the **useGetTownshipsQuery** function.

```javascript
const { data: township } = useGetTownshipsQuery(selectedCity, {skip: !selectedCity});
```

Data returned from the function:

```json
{
	"count": 1,
	"next": null,
	"previous": null,
	"results": [{
		"pk": 1,
		"is_active": true,
		"name": "Cevizlibağ",
		"city": 1,
		"postcode": null
	}]
}
```

## useGetDistrictsQuery

This function is used to fetch districts from Omnitron.

The **useGetDistrictsQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetDistrictsQuery } from '@akinon/next/data/client/address';
```

To use the function, selected township data needs to be sent to the **useGetDistrictsQuery** function.

```javascript
const { data: district } = useGetDistrictsQuery(selectedTownship, {skip: !selectedTownship});
```

Data returned from the function:

```json
{
	"count": 1,
	"next": null,
	"previous": null,
	"results": [{
		"pk": 1,
		"is_active": true,
		"name": "Cevizlibağ",
		"city": 1,
		"postcode": null
	}]
}
```



## useGetAddressesQuery

This function is used to fetch the addresses saved by the user. 

The **useGetAddressesQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetAddressesQuery } from '@akinon/next/data/client/address';
```

To use the function, create a variable and call the function.

`const { data, isLoading, isSuccess } = useGetAddressesQuery();`

Data returned from the function:

```json
{
	"status": "fulfilled",
	"endpointName": "getAddresses",
	"requestId": "fs8jWDhQbLoByte5XatHQ",
	"startedTimeStamp": 1234567,
	"data": {
		"count": 1,
		"next": null,
		"previous": null,
		"results": [{
			"pk": 32,
			"email": "mail@akinon.com",
			"phone_number": "05555555555",
			"first_name": "firstName",
			"last_name": "lastName",
			"country": {
				"pk": 1,
				"is_active": true,
				"name": "United Arab Emirates",
				"code": "UAE",
				"translations": null
			},
			"city": {
				"pk": 1,
				"is_active": true,
				"name": "Abu Dhabi",
				"country": 1,
				"translations": null,
				"priority": null,
				"postcode": null
			},
			"line": "Sample Line",
			"title": "sample title",
			"township": {
				"pk": 1,
				"is_active": true,
				"name": "Abu Dhabi International Airport",
				"city": 1,
				"postcode": null
			},
			"district": {
				"pk": 1,
				"is_active": true,
				"name": "Abu Dhabi International Airport",
				"city": 1,
				"township": 1,
				"postcode": null
			},
			"postcode": "34437",
			"notes": null,
			"company_name": null,
			"tax_office": null,
			"tax_no": null,
			"e_bill_taxpayer": false,
			"hash_data": "e73013890e49f788c156312d9aff87c9",
			"address_type": "customer",
			"retail_store": null,
			"remote_id": null,
			"identity_number": null,
			"extra_field": null,
			"user": {
				"pk": 7,
				"username": "ddd5c81fdaa6c9625e077d270573a61f",
				"first_name": "firstName",
				"last_name": "lastName",
				"email": "mail@akinon.com",
				"is_active": true,
				"date_joined": "2023-04-12T09:29:38.783518Z",
				"last_login": "2023-05-05T12:59:29.747447Z",
				"email_allowed": false,
				"sms_allowed": false,
				"call_allowed": null,
				"gender": "female",
				"attributes": {
					"register_client_type": "default",
					"logged_ip": "31.223.57.74",
					"confirm": true
				},
				"phone": "05555555555",
				"date_of_birth": "2023-04-28",
				"attributes_kwargs": {},
				"user_type": "registered",
				"modified_date": "2023-04-28T12:49:42.545375Z"
			},
			"is_corporate": false,
			"primary": false
		}]
	},
	"fulfilledTimeStamp": 1683301012664,
	"isUninitialized": false,
	"isLoading": false,
	"isSuccess": true,
	"isError": false,
	"currentData": {
		"count": 1,
		"next": null,
		"previous": null,
		"results": [{
			"pk": 32,
			"email": "mail@akinon.com",
			"phone_number": "05555555555",
			"first_name": "firstName",
			"last_name": "lastName",
			"country": {
				"pk": 1,
				"is_active": true,
				"name": "United Arab Emirates",
				"code": "UAE",
				"translations": null
			},
			"city": {
				"pk": 1,
				"is_active": true,
				"name": "Abu Dhabi",
				"country": 1,
				"translations": null,
				"priority": null,
				"postcode": null
			},
			"line": "Sample Line",
			"title": "sample title",
			"township": {
				"pk": 1,
				"is_active": true,
				"name": "Abu Dhabi International Airport",
				"city": 1,
				"postcode": null
			},
			"district": {
				"pk": 1,
				"is_active": true,
				"name": "Abu Dhabi International Airport",
				"city": 1,
				"township": 1,
				"postcode": null
			},
			"postcode": "34437",
			"notes": null,
			"company_name": null,
			"tax_office": null,
			"tax_no": null,
			"e_bill_taxpayer": false,
			"hash_data": "e73013890e49f788c156312d9aff87c9",
			"address_type": "customer",
			"retail_store": null,
			"remote_id": null,
			"identity_number": null,
			"extra_field": null,
			"user": {
				"pk": 7,
				"username": "ddd5c81fdaa6c9625e077d270573a61f",
				"first_name": "firstName",
				"last_name": "lastName",
				"email": "mail@akinon.com",
				"is_active": true,
				"date_joined": "2023-04-12T09:29:38.783518Z",
				"last_login": "2023-05-05T12:59:29.747447Z",
				"email_allowed": false,
				"sms_allowed": false,
				"call_allowed": null,
				"gender": "female",
				"attributes": {
					"register_client_type": "default",
					"logged_ip": "31.223.57.74",
					"confirm": true
				},
				"phone": "05555555555",
				"date_of_birth": "2023-04-28",
				"attributes_kwargs": {},
				"user_type": "registered",
				"modified_date": "2023-04-28T12:49:42.545375Z"
			},
			"is_corporate": false,
			"primary": false
		}]
	},
	"isFetching": false
}
```

## useGetRetailStoreQuery

This function is used to fetch the cities where a product is available in stores. 

The **useGetRetailStoreQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetRetailStoreQuery } from '@akinon/next/data/client/address';
```

To use the function, create a variable and call the function.

```javascript
const { data: retailStore } = useGetRetailStoreQuery();
```

Data returned from the function:

```json
{
	"count": 3,
	"next": null,
	"previous": null,
	"results": [{
		"pk": 2,
		"is_active": true,
		"name": "Test City 1",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}, {
		"pk": 1,
		"is_active": true,
		"name": "Test City 2",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}, {
		"pk": 3,
		"is_active": true,
		"name": "Test City 3",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}]
}
```



## useGetRetailStoreCitiesQuery

This function is used to fetch city information for stores from Omnitron. 

The **useGetRetailStoreCitiesQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetRetailStoreCitiesQuery } from '@akinon/next/data/client/address';
```

To use this function, selected country data needs to be sent to the **useGetRetailStoreCitiesQuery** function.

```javascript
const { data: city, isLoading: cityLoading } = useGetRetailStoreCitiesQuery(selectedCountry, {skip: !selectedCountry});
```

Data returned from the function:

```json
{
	"count": 3,
	"next": null,
	"previous": null,
	"results": [{
		"pk": 2,
		"is_active": true,
		"name": "Test City 1",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}, {
		"pk": 1,
		"is_active": true,
		"name": "Test City 2",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}, {
		"pk": 3,
		"is_active": true,
		"name": "Test City 3",
		"country": 1,
		"translations": null,
		"priority": null,
		"postcode": null
	}]
}
```

## useGetStoresQuery

This function is used to fetch a list of stores from Omnitron. 

The **useGetStoresQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetStoresQuery } from '@akinon/next/data/client/address';
```

To use the function, create a variable and call the function.

```javascript
const { data: stores } = useGetStoresQuery();
```

Data returned from the function:

```json
{
	"count": 5,
	"next": null,
	"previous": null,
	"results": [{
		"pk": 2,
		"name": "Shop 1",
		"township": {
			"pk": 2,
			"is_active": true,
			"name": "Test Township 1",
			"city": {
				"pk": 2,
				"is_active": true,
				"name": "Test City 1",
				"country": {
					"pk": 1,
					"is_active": true,
					"name": "Test Country",
					"code": "tr",
					"translations": null
				}
			}
		},
		"district": {
			"pk": 2,
			"is_active": true,
			"name": "Test District 1",
			"city": 2,
			"township": 2,
			"postcode": null
		},
		"address": "Shop Test Address",
		"phone_number": "+32043843442",
		"fax_phone_number": "+320438434424",
		"image": "https://0fb534.cdn.akinoncloud.com/retail_stores/2023/04/02/ddd53ac7-970c-469a-96c6-76c391a59f6a.jpg",
		"store_hours": [
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"]
		],
		"latitude": "41.01513700",
		"longitude": "28.97953000",
		"is_active": true,
		"click_and_collect": true,
		"store_type": null,
		"kapida_enabled": true,
		"fast_delivery": false,
		"config": {
			"districts": [],
			"price_list_id": null,
			"quota": null,
			"stock_list_id": null
		},
		"group": null,
		"sort_order": null,
		"erp_code": "shop12",
		"translations": {
			"tr-tr": {
				"name": "Shop 1"
			}
		},
		"related_retail_stores": [],
		"absolute_url": "/address/retail_store/2/"
	}, {
		"pk": 5,
		"name": "Shop 4",
		"township": {
			"pk": 2,
			"is_active": true,
			"name": "Test Township 1",
			"city": {
				"pk": 2,
				"is_active": true,
				"name": "Test City 1",
				"country": {
					"pk": 1,
					"is_active": true,
					"name": "Test Country",
					"code": "tr",
					"translations": null
				}
			}
		},
		"district": {
			"pk": 2,
			"is_active": true,
			"name": "Test District 1",
			"city": 2,
			"township": 2,
			"postcode": null
		},
		"address": "Istanbul Turkey",
		"phone_number": "+90 216 234 5423",
		"fax_phone_number": "+90 216 234 54233",
		"image": null,
		"store_hours": [],
		"latitude": null,
		"longitude": null,
		"is_active": true,
		"click_and_collect": true,
		"store_type": null,
		"kapida_enabled": false,
		"fast_delivery": false,
		"config": {
			"districts": [],
			"price_list_id": null,
			"quota": null,
			"stock_list_id": null
		},
		"group": null,
		"sort_order": null,
		"erp_code": "shop44",
		"translations": null,
		"related_retail_stores": [],
		"absolute_url": "/address/retail_store/5/"
	}, {
		"pk": 1,
		"name": "Shop 2",
		"township": {
			"pk": 1,
			"is_active": true,
			"name": "Test Township 3",
			"city": {
				"pk": 1,
				"is_active": true,
				"name": "Test City 2",
				"country": {
					"pk": 1,
					"is_active": true,
					"name": "Test Country",
					"code": "tr",
					"translations": null
				}
			}
		},
		"district": {
			"pk": 1,
			"is_active": true,
			"name": "Test District 3",
			"city": 1,
			"township": 1,
			"postcode": null
		},
		"address": "Shop 2 Address",
		"phone_number": "+32043843443",
		"fax_phone_number": "+320438434434",
		"image": null,
		"store_hours": [
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"],
			["07:00:00", "22:00:00"]
		],
		"latitude": "40.99294140",
		"longitude": "39.73126000",
		"is_active": true,
		"click_and_collect": true,
		"store_type": null,
		"kapida_enabled": false,
		"fast_delivery": false,
		"config": {
			"districts": [],
			"price_list_id": null,
			"quota": null,
			"stock_list_id": null
		},
		"group": null,
		"sort_order": null,
		"erp_code": "shop22",
		"translations": null,
		"related_retail_stores": [],
		"absolute_url": "/address/retail_store/1/"
	}, {
		"pk": 4,
		"name": "Shop 3",
		"township": {
			"pk": 3,
			"is_active": true,
			"name": "Test Township 4",
			"city": {
				"pk": 3,
				"is_active": true,
				"name": "Test City 3",
				"country": {
					"pk": 1,
					"is_active": true,
					"name": "Test Country",
					"code": "tr",
					"translations": null
				}
			}
		},
		"district": {
			"pk": 3,
			"is_active": true,
			"name": "Test District 4",
			"city": 3,
			"township": 3,
			"postcode": null
		},
		"address": "Boston Marriott Quincy",
		"phone_number": "+352 234 4562",
		"fax_phone_number": "+352 234 45624",
		"image": null,
		"store_hours": [],
		"latitude": "42.36114500",
		"longitude": "-71.05708300",
		"is_active": true,
		"click_and_collect": true,
		"store_type": null,
		"kapida_enabled": false,
		"fast_delivery": false,
		"config": {
			"districts": [],
			"price_list_id": null,
			"quota": null,
			"stock_list_id": null
		},
		"group": null,
		"sort_order": null,
		"erp_code": "shop33",
		"translations": null,
		"related_retail_stores": [],
		"absolute_url": "/address/retail_store/4/"
	}, {
		"pk": 3,
		"name": "Shop 3",
		"township": {
			"pk": 3,
			"is_active": true,
			"name": "Test Township 4",
			"city": {
				"pk": 3,
				"is_active": true,
				"name": "Test City 3",
				"country": {
					"pk": 1,
					"is_active": true,
					"name": "Test Country",
					"code": "tr",
					"translations": null
				}
			}
		},
		"district": {
			"pk": 3,
			"is_active": true,
			"name": "Test District 4",
			"city": 3,
			"township": 3,
			"postcode": null
		},
		"address": "Boston Marriott Quincy 1000",
		"phone_number": "+358 432 6543",
		"fax_phone_number": null,
		"image": null,
		"store_hours": [],
		"latitude": "42.36114500",
		"longitude": "-71.05708300",
		"is_active": true,
		"click_and_collect": true,
		"store_type": null,
		"kapida_enabled": false,
		"fast_delivery": false,
		"config": {
			"districts": [],
			"price_list_id": null,
			"quota": null,
			"stock_list_id": null
		},
		"group": null,
		"sort_order": null,
		"erp_code": "shop3",
		"translations": null,
		"related_retail_stores": [],
		"absolute_url": "/address/retail_store/3/"
	}]
}
```

## useGetRetailStoreTownshipsQuery

This function is used to fetch the townships of retail stores. 

The **useGetRetailStoreTownshipsQuery** function is imported from `'@akinon/next/data/client/address'`.

```javascript
import { useGetRetailStoreTownshipsQuery } from '@akinon/next/data/client/address';
```

To use the function, create a variable and provide the selected city information to the function.

```javascript
const { data: townships, isLoading: townshipLoading } = useGetRetailStoreTownshipsQuery(selectedCity);
```

Data returned from the function:

```json
{
	"count": 8,
	"next": null,
	"previous": null,
	"results": [{
			"pk": 1,
			"is_active": true,
			"name": "Abu Dhabi International Airport",
			"city": 1,
			"postcode": null
		},
		{
			"pk": 745,
			"is_active": true,
			"name": "Al Danah",
			"city": 1,
			"postcode": null
		}
	]
}
```