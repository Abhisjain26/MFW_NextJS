import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const DIGITAL_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'digital-1': dynamic(
    async () => import('@theme/widgets/digital-health/digital-info')
  ),
  'digital-2': dynamic(
    async () => import('@theme/widgets/digital-health/digital-second')
  ),
  'digital-3': dynamic(
    async () => import('@theme/widgets/digital-health/digital-third')
  )
};


