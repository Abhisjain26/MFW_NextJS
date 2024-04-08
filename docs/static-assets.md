---
title: Static Assets
sidebar_label: Static Assets
slug: static-assets
custom_edit_url: null
---

This page covers the management of **static assets** in the cloned project, accessing and optimizing various types of files in the local development environment. 

## Accessing Static Assets

The **projectrepo/public** folder in the cloned project is the repository where the **static assets** are located.

All files placed in this folder can be accessed once the local server is up and running. For example, files such as **http://localhost:3000/404.png** can be accessed from this folder.

It should be noted that this accessibility is not limited to image files; files with various extensions, such as **.json** and **.js**, can also be displayed in the local browser without any compatibility issues.


## Configuration with Vercel

To achieve this functionality, matcher property in Vercel's platform is used. The core of this configuration can be found within the **src/middleware.ts** file, where the regular expression can be examined:

```markdown 
matcher: ['/((?!api|_next|[\\w-\\/*]+\\.\\w+).*)']
```

This expression ensures that the necessary routing occurs correctly.

## Additional Resources

For more detailed information, please check out following documents:

-   [Vercel Platforms Commit](https://github.com/vercel/platforms/commit/53cb3242c0eb047ee535d539ded1ac0f948e5433)
-   [Next.js Middleware Upgrade Guide](https://nextjs.org/docs/messages/middleware-upgrade-guide#how-to-upgrade)
-   [Optimizing Static Assets](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)
-   [Skipping Next.js Middleware for Static and Public Files](https://clerk.com/blog/skip-nextjs-middleware-static-and-public-files?utm_source=www.google.com&utm_medium=referral&utm_campaign=none)