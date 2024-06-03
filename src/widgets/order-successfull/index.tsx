import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const ORDER_SUCCESSFULL_WIDGETS: {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'order-successfull': dynamic(
    async () => import('@theme/widgets/order-successfull/index-content')
  )
};
