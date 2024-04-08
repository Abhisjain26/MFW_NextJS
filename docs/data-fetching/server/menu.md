---
title: Menu
sidebar_label: Menu
slug: menu
custom_edit_url: null
---

## getMenu

This function is used to fetch the data for menus created in Omnitron. 

The **getMenu** function is imported from `'@akinon/next/data/server'`.

```javascript
import { getMenu } from '@akinon/next/data/server';
```

The menu data is fetched by defining this function as `const response = await getMenu({ depth: 4 });`.

-   `depth`: This parameter determines how many levels of menu data should be retrieved. It is optional and defaults to 3. It should be of type Number.
-   `parent`: This parameter is used to fetch the submenus of a specific menu by providing the pk value of the parent menu. If this parameter is not provided, menu data is retrieved from level 0 up to the specified depth. It should be of type String.

Data returned from the function:

```json
{
    "menu": [
        {
            "label": "Women",
            "url": "/women",
            "level": 0,
            "pk": "3cbf2ed2-04ef-4f78-ba37-194491cbd645",
            "sort_order": 0,
            "path": "00010001",
            "parent_pk": null,
            "parent": null,
            "generator_name": "menu_item",
            "extra_context": {
                "attributes": {
                    "shop_by_activity_title": {
                        "value": "Shop By Activity",
                        "kwargs": {}
                    },
                    "category_countdown": {
                        "value": {
                            "slug": "countdown-banner-women",
                            "is_countdown_active": "True"
                        },
                        "kwargs": {
                            "data_type": "nested",
                            "value": {
                                "is_countdown_active": {
                                    "data_type": "dropdown",
                                    "value": "True"
                                }
                            }
                        }
                    },
                    "best_sellers": [
                        {
                            "value": {
                                "url": "#",
                                "image": "cms/2023/07/13/c97efc07-4275-4c1c-a656-b27cb8084faa.jpg"
                            },
                            "kwargs": {
                                "data_type": "nested",
                                "value": {
                                    "image": {
                                        "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/13/c97efc07-4275-4c1c-a656-b27cb8084faa.jpg",
                                        "data_type": "image",
                                        "value": "cms/2023/07/13/c97efc07-4275-4c1c-a656-b27cb8084faa.jpg"
                                    }
                                }
                            }
                        }
                    ],
                    "shop_by_activity": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "css_class": {
                        "value": "bg-[#EAE0A0]",
                        "kwargs": {}
                    },
                    "images": [
                        {
                            "value": {
                                "url": "#",
                                "image": "cms/2023/07/21/3fad3f63-ca24-4b92-b7d6-94da5d2ae0fe.jpg",
                                "title": null
                            },
                            "kwargs": {
                                "data_type": "nested",
                                "value": {
                                    "image": {
                                        "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/21/3fad3f63-ca24-4b92-b7d6-94da5d2ae0fe.jpg",
                                        "data_type": "image",
                                        "value": "cms/2023/07/21/3fad3f63-ca24-4b92-b7d6-94da5d2ae0fe.jpg"
                                    }
                                }
                            }
                        }
                    ],
                    "best_sellers_title": {
                        "value": "Best Sellers",
                        "kwargs": {}
                    },
                    "category_id": 2,
                    "festival_edit": [
                        {
                            "value": {
                                "url": "#",
                                "alt": "Summer Collection",
                                "image": "cms/2023/07/07/14bacc14-c036-484e-b30e-0d9b94007790.jpg"
                            },
                            "kwargs": {
                                "data_type": "nested",
                                "value": {
                                    "image": {
                                        "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/07/14bacc14-c036-484e-b30e-0d9b94007790.jpg",
                                        "data_type": "image",
                                        "value": "cms/2023/07/07/14bacc14-c036-484e-b30e-0d9b94007790.jpg"
                                    }
                                }
                            }
                        }
                    ],
                    "festival_edit_title": {
                        "value": "Festival Edit",
                        "kwargs": {}
                    }
                },
                "numchild": 7,
                "include_parent": false
            }
        },
        {
            "label": "Men",
            "url": "/men",
            "level": 0,
            "pk": "a98bafbc-32d5-4a59-8a85-5d849980a2b6",
            "sort_order": 1,
            "path": "00010002",
            "parent_pk": null,
            "parent": null,
            "generator_name": "menu_item",
            "extra_context": {
                "attributes": {
                    "category_countdown": {
                        "value": {
                            "slug": "countdown-banner-men",
                            "is_countdown_active": "True"
                        },
                        "kwargs": {
                            "data_type": "nested",
                            "value": {
                                "is_countdown_active": {
                                    "data_type": "dropdown",
                                    "value": "True"
                                }
                            }
                        }
                    },
                    "best_sellers": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "shop_by_activity": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "images": [
                        {
                            "value": {
                                "url": "#",
                                "image": "cms/2023/07/20/8649ff5e-a114-4cf4-bb8a-22547e7ab795.jpg"
                            },
                            "kwargs": {
                                "data_type": "nested",
                                "value": {
                                    "image": {
                                        "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/20/8649ff5e-a114-4cf4-bb8a-22547e7ab795.jpg",
                                        "data_type": "image",
                                        "value": "cms/2023/07/20/8649ff5e-a114-4cf4-bb8a-22547e7ab795.jpg"
                                    }
                                }
                            }
                        }
                    ],
                    "category_id": 3,
                    "festival_edit": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ]
                },
                "numchild": 4,
                "include_parent": false
            }
        },
        {
            "label": "Kids",
            "url": "/kids",
            "level": 0,
            "pk": "b58ca68a-3d44-4585-a4ea-b37d18a60da3",
            "sort_order": 2,
            "path": "00010003",
            "parent_pk": null,
            "parent": null,
            "generator_name": "menu_item",
            "extra_context": {
                "attributes": {
                    "category_countdown": {
                        "value": {
                            "slug": "countdown-banner-kids",
                            "is_countdown_active": "True"
                        },
                        "kwargs": {
                            "data_type": "nested",
                            "value": {
                                "is_countdown_active": {
                                    "data_type": "dropdown",
                                    "value": "True"
                                }
                            }
                        }
                    },
                    "best_sellers": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "shop_by_activity": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "images": [
                        {
                            "value": {
                                "url": "#",
                                "image": "cms/2023/07/24/b4191bde-4b8e-4143-8ac4-e21310a173e9.jpg"
                            },
                            "kwargs": {
                                "data_type": "nested",
                                "value": {
                                    "image": {
                                        "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/24/b4191bde-4b8e-4143-8ac4-e21310a173e9.jpg",
                                        "data_type": "image",
                                        "value": "cms/2023/07/24/b4191bde-4b8e-4143-8ac4-e21310a173e9.jpg"
                                    }
                                }
                            }
                        }
                    ],
                    "category_id": 4,
                    "festival_edit": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ]
                },
                "numchild": 10,
                "include_parent": false
            }
        },
        {
            "label": "Home",
            "url": "/home/",
            "level": 0,
            "pk": "4e2dd206-a909-46ee-8c53-b494d12aaba1",
            "sort_order": 3,
            "path": "00010004",
            "parent_pk": null,
            "parent": null,
            "generator_name": "menu_item",
            "extra_context": {
                "attributes": {
                    "images": [
                        {
                            "value": {
                                "url": "#",
                                "image": "cms/2023/07/24/59b08b1d-4105-4c28-a113-f1b94a445935.jpg"
                            },
                            "kwargs": {
                                "data_type": "nested",
                                "value": {
                                    "image": {
                                        "url": "https://akn-randb.a-cdn.akinoncloud.com/cms/2023/07/24/59b08b1d-4105-4c28-a113-f1b94a445935.jpg",
                                        "data_type": "image",
                                        "value": "cms/2023/07/24/59b08b1d-4105-4c28-a113-f1b94a445935.jpg"
                                    }
                                }
                            }
                        }
                    ],
                    "best_sellers": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "shop_by_activity": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "festival_edit": [
                        {
                            "value": {},
                            "kwargs": {
                                "data_type": "nested",
                                "value": {}
                            }
                        }
                    ],
                    "category_id": 5
                },
                "numchild": 4,
                "include_parent": false
            }
        }
    ]
}
```