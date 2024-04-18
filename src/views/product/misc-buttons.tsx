'use client';

import { FindInStore } from '@theme/views/find-in-store';
import useFavButton from '../../hooks/use-fav-button';
import React, { useState } from 'react';
import { Button, Icon, Modal } from '@theme/components';
import { VariantType } from '@akinon/next/types';
import clsx from 'clsx';
import { useLocalization } from '@akinon/next/hooks';

interface MiscButtonsProps {
  productPk: number;
  productName: string;
  variants: Array<VariantType>;
}

export default function MiscButtons({
  variants,
  productPk,
  productName
}: MiscButtonsProps) {
  const { t } = useLocalization();
  const { FavButton } = useFavButton(productPk);
  const [isFindinStoreModalOpen, setIsFindinStoreModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 place-items-center mb-2 mt-4 sm:grid-cols-[1fr_auto_1fr] sm:my-4 xl:gap-6">
      <FavButton
        label={t('product.add_to_favorites')}
        className="px-1 py-2 text-base hidden sm:flex"
      />
      {/* <div className="h-5 border border-black hidden sm:block" /> */}
      {/* <Button
        appearance="outlined"
        className="group px-12 py-2 text-xs place-self-start sm:text-base sm:border-none sm:px-4"
        data-testid="product-find-in-store"
        onClick={() => setIsFindinStoreModalOpen(true)}
      >
        <div className="flex items-center gap-2">
          <span>{t('product.find_in_store.title')}</span>
          <Icon
            name="store-pin"
            size={20}
            className={clsx('hidden sm:block group-hover:fill-[white]')}
          />
        </div>
      </Button> */}
      <Modal
        portalId="find-in-store-modal"
        title={t('product.find_in_store.title')}
        open={isFindinStoreModalOpen}
        setOpen={setIsFindinStoreModalOpen}
        className="w-[22rem] sm:w-[36rem] max-h-[90vh] overflow-y-auto"
      >
        <div className="px-6">
          <FindInStore
            productName={productName}
            productPk={productPk}
            variants={variants}
          />
        </div>
      </Modal>
    </div>
  );
}