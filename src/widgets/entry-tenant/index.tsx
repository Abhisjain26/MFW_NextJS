import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const ENTRYTANENT_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'entry-tenant-prices': dynamic(
    async () => import('@theme/widgets/entry-tenant/entry-tenant-top-content')
  ),
  'entry-tenant': dynamic(
    async () => import('@theme/widgets/entry-tenant/entry-tanent-content')
  )
};
