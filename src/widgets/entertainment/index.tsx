import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const ENTERTAINMENT_WIDGETS  : {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'entertainment-info': dynamic(
    async () => import('@theme/widgets/entertainment/entertainment-content')
  )
};
