---
title: Widget
sidebar_label: Widget
slug: widget
custom_edit_url: null
---

## getWidgetData

This function is used to fetch data for widgets created in Omnitron.

The **getWidgetData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getWidgetData } from '@akinon/next/data/server';
```

The widget data is fetched by defining this function as follow:

```javascript
const data = await getWidgetData({slug: 'gender-widget-order'});
```

- `slug`: The slug of the widget to be fetched needs to be provided as a parameter. This parameter is mandatory and should be of type String.

Data returned from the function:

```json
{
  "attributes": {
    "widget_order": [
      {
        "value": {
          "item_slug": "home-stories-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-hero-slider-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "countdown-banner-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-single-banner-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-categories-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "multiple-banner-1-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "new-arrivals-recommendation-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "multiple-banner-2-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-quad-category-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "multiple-banner-3-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "price-selector-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "best-sellers-recommendation-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-two-banner-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "multiple-banner-4-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-size-selector-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "multiple-banner-5-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-quad-category-3-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-quad-category-2-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "home-quad-category-4-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      },
      {
        "value": {
          "item_slug": "category-seo-recommendation-men"
        },
        "kwargs": {
          "value": {},
          "data_type": "nested"
        }
      }
    ]
  },
  "name": "Men Widget Order",
  "template": "none",
  "slug": "men-widget-order"
}
```