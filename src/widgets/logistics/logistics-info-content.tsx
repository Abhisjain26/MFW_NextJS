import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const LOGISTICS_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'logisctis-info': dynamic(
    async () => import('@theme/widgets/logistics/logistics-info')
  )
};
