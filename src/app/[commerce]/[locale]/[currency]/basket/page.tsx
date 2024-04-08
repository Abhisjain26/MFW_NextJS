'use client';

import { useEffect } from 'react';
import { ROUTES } from '@theme/routes';
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
import { pushCartView } from '@theme/utils/gtm';
import { Button, LoaderSpinner, Link } from '@theme/components';
import { BasketItem, Summary } from '@theme/views/basket';
import { useLocalization } from '@akinon/next/hooks';

export default function Page() {
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
  const { t } = useLocalization();

  useEffect(() => {
    if (isSuccess) {
      const products = basket.basketitem_set.map((basketItem) => ({
        ...basketItem.product
      }));
      pushCartView(products);
    }
  }, [basket, isSuccess]);

  return (
    <div className="max-w-screen-xl p-4 flex flex-col text-primary-800 lg:p-8 xl:flex-row xl:mx-auto">
      {isLoading && (
        <div className="flex justify-center w-full">
          <LoaderSpinner />
        </div>
      )}
      {isSuccess &&
        (basket && basket.basketitem_set && basket.basketitem_set.length > 0 ? (
          <>
            <div className="flex-1 xl:mr-16">
              <div className="flex items-center justify-between py-2 border-b border-gray-200 lg:py-3">
                <h2 className="text-xl lg:text-2xl font-light">
                  {t('basket.my_cart')}
                </h2>
                <Link
                  href={ROUTES.HOME}
                  className="text-xs hover:text-secondary-500"
                >
                  {t('basket.back_to_shopping')}
                </Link>
              </div>
              <ul>
                {basket.basketitem_set.map((basketItem, index) => (
                  <BasketItem basketItem={basketItem} key={index} />
                ))}
              </ul>
            </div>
            <Summary basket={basket} />
          </>
        ) : (
          <div className="flex flex-col items-center container max-w-screen-sm py-4 px-4 xs:py-6 xs:px-6 sm:py-8 sm:px-8 lg:max-w-screen-xl">
            <h1
              className="w-full text-xl font-light text-secondary text-center sm:text-2xl"
              data-testid="basket-empty"
            >
              {t('basket.empty.title')}
            </h1>

            <div className="w-full text-sm text-black-800 text-center my-4 mb-2 sm:text-base">
              <p>{t('basket.empty.content_first')}</p>
              <p>{t('basket.empty.content_second')}.</p>
            </div>

            <Link href={ROUTES.HOME} passHref>
              <Button className="px-10 mt-2" appearance="filled">
                {t('basket.empty.button')}
              </Button>
            </Link>
          </div>
        ))}
    </div>
  );
}
