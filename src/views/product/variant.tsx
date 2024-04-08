'use client';

import React, { useMemo } from 'react';
import { VariantOption, VariantType } from '@akinon/next/types';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useRouter, useLocalization } from '@akinon/next/hooks';

type VariantProps = {
  className?: string;
  onChange?: (option: VariantOption) => void;
  preventDefaultClick?: boolean;
} & VariantType;

export const Variant = (props: VariantProps) => {
  const { t } = useLocalization();
  const {
    attribute_key,
    attribute_name,
    options,
    preventDefaultClick,
    onChange
  } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // This is a workaround for the fact that we can't use the useSearchParams set method because of this is not implemented in next.js yet. So we have to use the URLSearchParams's set method.
  const params = new URLSearchParams(searchParams.toString());

  const hasSelected = useMemo(
    () => options.some((option) => option.is_selected),
    [options]
  );

  const selectedVariant = useMemo(
    () => options.find((option) => option.is_selected),
    [options]
  );

  const handleClick = (option: VariantOption) => {
    if (onChange) {
      onChange(option);
    }

    if (preventDefaultClick) {
      return;
    }

    params.set(attribute_key, option.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={clsx('flex flex-col gap-2', props.className)}
      data-testid={`product-variant-${attribute_name}`}
    >
      <p className="flex gap-2 text-xs leading-4">
        <span>
          {hasSelected
            ? `${t('product.selected')} ${attribute_name}:`
            : attribute_name}
        </span>
        {hasSelected && (
          <span
            className="font-bold"
            data-testid={`product-variant-${attribute_name}-value`}
          >
            {selectedVariant.value}
          </span>
        )}
      </p>
      <div className="flex gap-3">
        {options.map((option, i) => (
          <button
            key={i}
            className={clsx(
              'h-10 px-4 transition-colors duration-200 text-xs',
              option.is_selected &&
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground pointer-events-none',
              option.is_selectable &&
                !option.is_selected &&
                'bg-gray-200 hover:bg-gray-400',
              !option.is_selectable &&
                !option.is_selected &&
                'border border-gray-300 text-gray-600',
              !option.is_selectable &&
                !option.is_selectable_without_stock &&
                'border border-gray-300 text-gray-600 cursor-not-allowed',
              !option.is_selectable &&
                option.is_selected &&
                'border border-dashed border-black bg-white text-gray-600 overflow-hidden relative'
            )}
            onClick={() => handleClick(option)}
          >
            {option.value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Variant;
