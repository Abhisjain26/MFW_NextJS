'use client';

import React from 'react';
import clsx from 'clsx';
import { FacetChoice } from '@akinon/next/types';

interface Props {
  data: FacetChoice;
}

export const SizeFilter = (props: Props) => {
  const { data, ...rest } = props;

  return (
    <button
      className={clsx(
        'text-xs w-10 h-10 flex items-center justify-center border-2',
        data.is_selected
          ? 'border-primary bg-gray-400 font-bold'
          : 'border-transparent bg-gray-50'
      )}
      {...rest}
    >
      {data.label}
    </button>
  );
};
