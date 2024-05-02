import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const ABOUT_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'about-us': dynamic(
    async () => import('@theme/widgets/about/about-us')
  ),
  'about-e-commerce': dynamic(
    async () => import('@theme/widgets/about/about-ecommerce')
  ),
  'about-co-founder': dynamic(
    async () => import('@theme/widgets/about/about-cofounder')
  ),
};
