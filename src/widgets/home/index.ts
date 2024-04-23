import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const HOME_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'home-hero-slider2': dynamic(
    async () => import('@theme/widgets/home/home-hero-slider')
  ),
  // 'home-product-recommendation': dynamic(
  //   async () => import('@theme/widgets/home-product-recommendation')
  // ),
  // 'home-discovery': dynamic(
  //   async () => import('@theme/widgets/home-discovery')
  // ),
  // 'product-pointer-banners': dynamic(
  //   async () => import('@theme/widgets/product-pointer-banners')
  // ),
  'home-storieseng': dynamic(
    async () => import('@theme/widgets/home/home-stories-eng')
  ),
  // 'home-image-leap': dynamic(
  //   async () => import('@theme/widgets/home-images')
  // ),
  'sales-on-now': dynamic(
    async () => import('@theme/widgets/home/home-sales')
  ),
  'valentines-offer': dynamic(
    async () => import('@theme/widgets/home/home-valentine')
  ),
  'leap-banner': dynamic(
    async () => import('@theme/widgets/home/home-leap')
  ),
  // 'feature-intimate': dynamic(
  //   async () => import('@theme/widgets/home/feature-intimate')
  // ),
  // 'feature-product': dynamic(
  //   async () => import('@theme/widgets/home/home-feature-product')
  // ),
  'high-performance': dynamic(
    async () => import('@theme/widgets/home/home-high-performance')
  ),
  'finance-plus': dynamic(
    async () => import('@theme/widgets/home/home-finance-plus')
  ),
  'power-on': dynamic(
    async () => import('@theme/widgets/home/home-power-on')
  ),
  'samsung-endless': dynamic(
    async () => import('@theme/widgets/home/home-samsung-endless')
  ),
  'lucmo-wines': dynamic(
    async () => import('@theme/widgets/home/home-lucmo-wines')
  ),
  'exclusive-discount': dynamic(
    async () => import('@theme/widgets/home/home-exclusive-discount')
  ),
  'news': dynamic(
    async () => import('@theme/widgets/home/home-news')
  ),
  'home-partners': dynamic(
    async () => import('@theme/widgets/home/home-partners')
  ),
  'testimonials': dynamic(
    async () => import('@theme/widgets/home/testimonials')
  ),
  'home-subscribe': dynamic(
    async () => import('@theme/widgets/home/home-subscribe')
  ),
  'thank-you': dynamic(
    async () => import('@theme/widgets/home/home-thankyou')
  ),
};
