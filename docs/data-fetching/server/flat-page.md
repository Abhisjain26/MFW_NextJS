---
title: Flat Page
sidebar_label: Flat Page
slug: flat-page
custom_edit_url: null
---

## getFlatPageData

This function is used to fetch flat page data created in Omnitron.

The **getFlatPageData** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getFlatPageData } from '@akinon/next/data/server';
```

The flat page data is fetched by defining this function as `const data = await getFlatPageData({ pk });`.

-   `pk`: The pk of the desired flat page to be fetched. This parameter is mandatory and should be of type Number.

Data returned from the function:

```json
{
    "pk": 3,
    "flat_page": {
        "pk": 3,
        "url": "/blog",
        "title": "Blog",
        "content": "<h1>Top Ramadan 2022 Outfits &amp; Fashion Ideas</h1><p>The holy month of Ramadan is a month of spirituality, sharing and giving back in its essence. It comes with a lot of discipline, commitment and also a lot of preparation ahead. With the dedication to prayer and fasting of the day, also come the Iftar gathering, nighttime Suhoor and catching up with family, relatives and friends over all the celebrations that Ramadan brings.</p><p>While cherishing the holy month, the dress code is at the top of the list of preparations. Dressing respectfully while looking fashionable will require some dress code alteration going well along with the holy month’s spirit, culture and tradition. We thought of showing you ways that women, men and kids can dress in this holy month with Ramadan staple styles and statement pieces for fashionable and modest&nbsp;<strong>Ramadan outfit ideas</strong>&nbsp;and looks.</p>",
        "template_name": "flatpages/about-us/index.html",
        "registration_required": false,
        "sites": [
            1
        ],
        "flatpageprettyurl_set": [],
        "type": null
    },
    "type": null
}
```