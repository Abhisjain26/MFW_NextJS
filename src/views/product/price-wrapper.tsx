'use client';

import React from 'react';
import { Price } from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';
import { Product } from '@akinon/next/types';

export interface PriceProps {
  price: Product['price'];
  retailPrice: Product['retail_price'];
}

export default function PriceWrapper(props: PriceProps) {
  const { t } = useLocalization();
  const { price, retailPrice } = props;
  const hasRetailPrice = parseFloat(retailPrice) > parseFloat(price);

  return (
    <div className="flex items-center gap-3 justify-center h-full">
      <div className="flex flex-col items-end">
        {hasRetailPrice && (
          <div>
            <Price value={retailPrice} className="text-xs line-through" />
          </div>
        )}
        <div className="-mt-2">
          <Price value={price} className="text-2xl" data-testid="price" />
        </div>
      </div>

      {hasRetailPrice && (
        <div className="flex flex-col items-center w-9 py-0.5 text-xs text-white bg-secondary">
          <span className="font-bold">
            {Math.round(100 - (parseInt(price) / parseInt(retailPrice)) * 100)}%
          </span>
          <span>{t('product.off')}</span>
        </div>
      )}
    </div>
  );
}
