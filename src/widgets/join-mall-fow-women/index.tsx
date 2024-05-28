import 'server-only';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { WidgetResultType } from '@akinon/next/types';

export const JOINMALLFORWOMEN_WIDGETS  : {
  [key: string]: ComponentType<WidgetResultType<unknown>>;
} = {
  'join-mall-for-women': dynamic(
    async () => import('@theme/widgets/join-mall-fow-women/join-mall-content')
  )
};
