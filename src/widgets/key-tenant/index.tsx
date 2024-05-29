import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const KEYTANENT_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'key-tenant-price': dynamic(
    async () => import('@theme/widgets/key-tenant/key-tenant-top-content')
  ),
  'key-tenant': dynamic(
    async () => import('@theme/widgets/key-tenant/key-tanent-content')
  )
};
