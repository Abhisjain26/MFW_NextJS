'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Price, LoaderSpinner } from '@theme/components';
import { Image } from '@akinon/next/components/image';

export type InstallmentProps = {
  productPk: number;
};

import { useGetInstallmentsQuery } from '@akinon/next/data/client/product';
import { useLocalization } from '@akinon/next/hooks';

const InstallmentOptions = (props: InstallmentProps) => {
  const { t } = useLocalization();
  const { productPk } = props;

  const { data, isLoading, isSuccess } = useGetInstallmentsQuery(productPk);

  const [activeCardSlug, setActiveCardSlug] = useState(null);

  useEffect(() => {
    if (isSuccess && data) {
      setActiveCardSlug(data.results[0].slug);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        isSuccess && (
          <>
            {data && data.results.length === 0 && (
              <span className="text-xs">
                {t('product.installment_not_available')}
              </span>
            )}
            <div className="grid gap-1 grid-cols-3">
              {data.results.map((card) => (
                <div
                  key={card.pk.toString()}
                  data-card-slug={card.slug}
                  onClick={() => setActiveCardSlug(card.slug)}
                  className={clsx(
                    'border border-gray-200 p-1 flex justify-center items-center transition-all cursor-pointer',
                    activeCardSlug === card.slug
                      ? 'bg-gray-50 border-gray-400'
                      : 'bg-white'
                  )}
                >
                  {/* TODO: There is no image. It should be checked. May need fix. */}
                  <Image
                    src={card.card_type.logo}
                    alt={card.name}
                    width={60}
                    height={25}
                    imageClassName={clsx(
                      'object-contain',
                      activeCardSlug === card.slug ? 'grayscale-0' : 'grayscale'
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <table className="w-full">
                <thead>
                  <tr className="text-xs">
                    <th className="text-left">
                      {t('product.number_of_installments')}
                    </th>
                    <th className="text-right">
                      {t('product.monthly_amount')}
                    </th>
                    <th className="text-right">{t('product.total_amount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((value) => {
                    if (activeCardSlug === value.slug)
                      return value.installments.map((installment, index) => {
                        return (
                          <tr
                            key={index.toString()}
                            className={clsx(
                              'odd:bg-gray-50 even:bg-gray-25',
                              index === 0 && 'font-bold text-success'
                            )}
                          >
                            <td className="text-xs p-1.5">
                              <span>
                                {installment.installment_count === 1
                                  ? ''
                                  : installment.installment_count}{' '}
                              </span>
                              <span>
                                {installment.installment_count === 1
                                  ? t('product.cash')
                                  : t('product.installment')}
                              </span>
                            </td>
                            <td className="text-xs p-1.5 text-right">
                              <Price
                                value={installment.single_installment_amount}
                              />
                            </td>
                            <td className="text-xs p-1.5 text-right">
                              <Price value={installment.total_amount} />
                            </td>
                          </tr>
                        );
                      });
                  })}
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </>
  );
};

export default InstallmentOptions;
