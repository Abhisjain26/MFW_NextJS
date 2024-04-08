'use client';

import { Fragment } from 'react';
import { Icon, Link } from '@theme/components';
import { ROUTES } from '@theme/routes';
import { useLocalization } from '@akinon/next/hooks';
import { BreadcrumbResultType } from '@akinon/next/types';

export interface BreadcrumbProps {
  breadcrumbList?: BreadcrumbResultType[];
}

export default function Breadcrumb(props: BreadcrumbProps) {
  const { t } = useLocalization();
  const { breadcrumbList = [] } = props;

  const list = [
    { url: ROUTES.HOME, text: t('common.breadcrumb.homepage') },
    ...breadcrumbList.map((breadcrumb) => ({
      url: breadcrumb.url,
      text: breadcrumb.label
    }))
  ];

  return (
    <div className="flex items-center breadcrummp_all gap-3 text-xs mb-3 leading-4 text-gray-950">
      {list.map((item, index) => (
        <Fragment key={index}>
          <Link href={item.url}>{item.text}</Link>
          {index !== list.length - 1 && <Icon name="chevron-end" size={8} />}
        </Fragment>
      ))}
    </div>
  );
}