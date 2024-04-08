---
title: Widgets
sidebar_label: Widgets
slug: widgets
custom_edit_url: null
---

# Widget Order

In certain cases, websites, particularly homepages, require frequent content updates. To eliminate the need for constantly editing code, a widget sorting system is used. This sorting widget is simple, featuring multiple text fields that facilitate the input of widget information and their reordering.

Once the Widget Order scheme has been integrated into Omnitron, the next step is to create a widget that allows for the addition of widget slugs. Instructions for creating this widget can be found below. The names of the created widgets are then entered based on this widget order.

## Example Widget Order Schema

```json
{
	"widget_order": {
		"multi": true,
		"data_type": "nested",
		"key": "widget_order",
		"label": "Widget Order",
		"schema": {
			"item_slug": {
				"data_type": "text",
				"key": "item_slug",
				"label": "Widget Slug"
			}
		}
	}
}
```

## Widget Integration

### Home Page

1.  Create a Widget Order named **home-widget-order** and append the corresponding widget slug names to it.

2.  To retrieve the widget slug names that have been added, use the **HOME_WIDGETS** variable's slug name in the `src/widgets/index.ts` file along with the widget's relative path.

    ```java
    export const HOME_WIDGETS: {
        [key: string]: ComponentType<WidgetResultType<unknown>>;
    } = {
        'widget-slug-name': dynamic(async () => import('./widget-relative-path.ts'))
        };
    ```

### Using the Client Server

1.  In **'use client'** components, import the **useGetWidgetQuery** function into the component.

    ```java
    import { useGetWidgetQuery } from '@akinon/next/data/client/misc';
    ```

2.  Create a variable to hold the imported function, and pass the slug name of the targeted widget to this variable.

    ```java
    const { data } = useGetWidgetQuery('slug-name');
    ```

3.  Retrieve the widget's data and either send it to another component using `<ComponentName data={data} />` syntax or process it within the component where it was retrieved.

### Server-Only Components

1.  In **'server-only'** components, import the **getWidgetData** function into the component.

    ```java
    import { getWidgetData } from '@akinon/next/data/server';
    ```

2.  Prepare a type according to the schema of the created widget.

    ### Example Type

    ```typescript
    type  FooterMenuTitle = {
        value: string;
    };

    type  FooterMenuItem = [{
        kwargs: {
            data_type: 'nested';
            value: {
            is_side_column_item?: SideItem;
            is_target_blank: TargetBlank;
            };
        };
        value: {
            is_side_column_item?: string;
            is_target_blank: string;
            name: string;
            redirect_url: string;
        };
    }];

    type  FooterMenuType = {
        first_column_title: FooterMenuTitle;
        first_column_items: FooterMenuItem;
    };
    ```

3.  Create a variable for the imported function. Add the type for the **getWidgetData** function to this variable, and provide the widget's slug name to the function.

    ```java
    const data = await getWidgetData<FooterMenuType>({ slug: 'footer-menu' });
    ```

4.  Obtain the data for the targeted widget as intended.

At times, there be a need to duplicate the same widget while supplying it with different data. In such situations, creating a widget content is necessary. To use the created widget, import the **dynamic** function.

```java
import  dynamic  from  'next/dynamic';
```
After importing, create a variable to invoke the function, and call the function with the relative path of the preferred content as its argument.

```java
const FooterMenuContent = dynamic(
	() => import('../views/widgets/footer-menu-content'),
	{ssr: false}
);
```

The `FooterMenuContent` component, which incorporates the desired content, is now available for use. To add this component, simply insert `<FooterMenuContent data={data} />` at the desired location.
