'use client';

import { useEffect } from 'react';
import { ROUTES } from '@theme/routes';
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
import { pushCartView } from '@theme/utils/gtm';
import { Button, LoaderSpinner, Link, Icon } from '@theme/components';
import { BasketItem, Summary } from '@theme/views/basket';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components';
import FeatureComponent from '@theme/views/widgets/feature/feature-product-content';
import { pushBeginCheckout } from '@theme/utils/gtm';
import Style from './page.module.css'


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

  // useEffect(() => {
  //   const products = basket.basketitem_set.map((basketItem) => ({
  //     ...basketItem.product
  //   }));
  //   pushBeginCheckout(products);
  // }, [basket]);

  return (
    <div>
      <div className='container'>
        <div className={`${Style.cart_header}`}>
          <p>Your cart shows the price in your local currency. We process all orders in USD and you will be checked out using the most current exchange rate.</p>
        </div>
        <div className="flex items-center justify-between py-2  border-gray-200 lg:py-3">

          {/* <Link
            href={ROUTES.HOME}
            className="text-xs hover:text-secondary-500"
          >
            {t('basket.back_to_shopping')}
          </Link> */}
        </div>
        <div className="max-w-screen-xl flex flex-col text-primary-800 xl:flex-row xl:mx-auto">
          {isLoading && (
            <div className="flex justify-center w-full">
              <LoaderSpinner />
            </div>
          )}
          {isSuccess &&
            (basket && basket.basketitem_set && basket.basketitem_set.length > 0 ? (
              <>

                <div className="flex-1 xl:mr-6 ">
                  <h2 className="text-xl lg:text-2xl font-light color_blue my-3">
                    {t('basket.my_cart')} ({basket && basket.total_quantity !== undefined && basket.total_quantity})
                  </h2>

                  <ul className='border p-5'>
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
                  className={`w-full text-xl font-light text-secondary text-center ${Style.cart_empty_title} sm:text-2xl`}
                  data-testid="basket-empty"
                >
                  {t('basket.empty.title')}
                </h1>

                {/* <div className="w-full text-sm text-black-800 text-center my-4 mb-2 sm:text-base"> */}
                {/* <p>{t('basket.empty.content_first')}</p> */}
                {/* <p>{t('basket.empty.content_second')}.</p> */}
                {/* </div> */}
                <div>
                  <Image src='/images/cart/empty_cart.svg' width={100} height={100} alt='' />
                </div>
                <p className={`${Style.cart_empty_sutitle}`}>{t('basket.empty.content_third')}</p>
                <Link href={ROUTES.HOME} passHref>
                  <Button className="px-10 pinkbtn border-0 flex items-center gap-2 justify-center mt-2" appearance="filled">
                    <Icon name='cart' size={12} />
                    {t('basket.empty.button')}
                    <Icon name='chevron-end' size={12} />
                  </Button>
                </Link>
              </div>
            ))}

        </div>
        <div className={`${Style.feature_outer_container}`} style={{ background: '#FDF0F6' }}>
          <div className='pb-2'>
            {/* <FeatureComponent data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
