'use client';

import { Icon, Input } from '@theme/components';
import React from 'react';
import { useLocalization } from '@akinon/next/hooks';

interface Props {
  handleChange: (e) => void;
  searchKey?: string;
}

export function FaqSearch(props: Props) {
  const { handleChange, searchKey } = props;
  const { t } = useLocalization();

  return (
    <div className="bg-gray-150 flex flex-col items-center justify-center p-6 w-full">
      <h3 className="text-2xl	mb-4 md:mb-0 md:mr-4 xl:text-3xl">
        {t('account.faq.header.title')}
      </h3>

      <div className="w-full flex items-center justify-between bg-white px-6 py-2 rounded-3xl md:mt-5 lg:w-4/12 lg:mt-2">
        <div className="w-full">
          <Input
            className="w-full h-10 border-none placeholder:text-black text-base"
            placeholder={t('account.faq.header.button.placeholder').toString()}
            value={searchKey}
            onChange={handleChange}
          />
        </div>
        <Icon name="search" size={20} className="fill-primary ml-1" />
      </div>
    </div>
  );
}
