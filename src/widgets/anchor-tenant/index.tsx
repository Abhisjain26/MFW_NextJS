import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const ANCHORTANENT_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'anchor-tenant-price': dynamic(
    async () => import('@theme/widgets/anchor-tenant/anchor-tenant-top-content')
  ),
  'anchor-tenant': dynamic(
    async () => import('@theme/widgets/anchor-tenant/anchor-tanent-content')
  )
};
