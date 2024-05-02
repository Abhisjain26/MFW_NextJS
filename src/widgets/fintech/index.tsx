import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const FINTECH_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'fintech-1': dynamic(
    async () => import('@theme/widgets/fintech/fintech-info')
  )
};
