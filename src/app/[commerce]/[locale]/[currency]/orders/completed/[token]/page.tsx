'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { setCurrentStep } from '@akinon/next/redux/reducers/checkout';
import { ROUTES } from '@theme/routes';
import { useFetchCheckoutResultQuery } from '@akinon/next/data/client/checkout';
import { CheckoutStep, PageProps } from '@akinon/next/types';
import { CarouselCore } from '@theme/components/carousel-core';
import { Price, Button, Icon, LoaderSpinner, Link } from '@theme/components';
import { CheckoutStepList } from '@theme/views/checkout';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import { Trans } from '@akinon/next/components/trans';
import { pushPurchaseEvent } from '@theme/utils/gtm';

const CheckoutCompleted = ({
  params
}: PageProps<{
  token: string;
}>) => {
  const { t } = useLocalization();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useFetchCheckoutResultQuery(String(params.token));

  const carouselRef = useRef(null);

  const goToPrev = () => {
    carouselRef.current?.previous();
  };

  const goToNext = () => {
    carouselRef.current?.next();
  };

  useEffect(() => {
    dispatch(setCurrentStep(CheckoutStep.Confirmation));

    return () => {
      dispatch(setCurrentStep(CheckoutStep.Shipping));
    };
  }, []);

  useEffect(() => {
    if (data?.order) {
      pushPurchaseEvent(data?.order);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <LoaderSpinner />
      </div>
    );
  }

  if (!data || !data?.order) {
    return (
      <div className="flex items-center justify-center py-20">
        {t('checkout.completed.not_found')}
      </div>
    );
  }

  const LinkText = (props) => {
    return (
      <Link
        {...props}
        href={props.href || '#'}
        className="underline cursor-pointer transition-all hover:text-secondary"
        passHref
      >
        <span data-testid="order-number">{props.orderNumber}</span>
      </Link>
    );
  };

  return (
    <div className="container pb-16 px-4 lg:px-0">
      <CheckoutStepList />

      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/10 2xl:w-2/3 mb-6 lg:mb-0">
          <div className="p-6 w-full h-full border border-solid border-gray-400 md:px-20 md:py-14">
            <div className="mb-4 text-black-800 text-xl font-light sm:text-2xl md:mb-8">
              {t('checkout.completed.title')}
            </div>
            <div className="text-xs leading-6 text-black-400 mb-6">
              <p>{t('checkout.completed.thank_you')}</p>
              <p>
                <Trans
                  i18nKey="checkout.completed.confirmation_message"
                  components={{
                    OrderNumber: (
                      <LinkText
                        href={`${ROUTES.ACCOUNT_ORDERS}/${data.order.id}`}
                        orderNumber={data.order.number}
                      />
                    )
                  }}
                />
              </p>
              <p>{t('checkout.completed.purchase_info')}</p>
            </div>
            <div>
              <div className="mb-4">
                <div className="text-xs text-gray-950 uppercase tracking-wider mb-1">
                  {t('checkout.completed.your_email')}
                </div>
                <div className="text-xs text-black-400">
                  {data.order.user_email}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-950 uppercase tracking-wider mb-1">
                  {t('checkout.completed.order_total')}
                </div>
                <div className="text-xs text-black-400">
                  <Price
                    value={data.order.amount}
                    data-testid="order-total-price"
                  />
                </div>
              </div>
              <div className="mb-8">
                <div className="text-xs text-gray-950 uppercase tracking-wider mb-1">
                  {t('checkout.completed.payment_type')}
                </div>
                <div
                  className="text-xs text-black-400"
                  data-testid="order-payment-type"
                >
                  {data.order.payment_option.name}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center border-t border-solid border-gray-400 py-6">
                <span className="text-black-800 text-lg font-light">
                  {t('checkout.completed.order_summary')}
                </span>
                <span className="text-gray-950 text-sm ml-4">
                  <span data-testid="order-item-count">
                    {data.order.orderitem_set.length}
                  </span>{' '}
                  {t('checkout.completed.items')}
                </span>
              </div>
              <div className="flex gap-6">
                <div
                  onClick={goToPrev}
                  className="items-center justify-center hidden sm:flex"
                >
                  <div className="flex justify-center p-2 border border-gray-100 rounded-full cursor-pointer">
                    <Icon
                      name="chevron-start"
                      size={15}
                      className="fill-[#000000]"
                    />
                  </div>
                </div>
                <div className="w-full overflow-hidden">
                  <CarouselCore
                    ref={carouselRef}
                    responsive={{
                      large: {
                        breakpoint: { max: 5000, min: 1370 },
                        items: 2
                      },
                      default: {
                        breakpoint: { max: 1369, min: 0 },
                        items: 1
                      }
                    }}
                    swipeable={true}
                    arrows={false}
                    itemClass="pr-[50px]"
                  >
                    {data.order.orderitem_set.map((item) => (
                      <div key={`order-item-${item.id}`} className="flex">
                        <Link href={item.product.absolute_url} passHref>
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={64}
                            height={96}
                          />
                        </Link>
                        <div className="flex justify-between flex-1 items-center ml-4">
                          <>
                            <div className="text-xs text-black-800 transition-all w-full hover:text-secondary">
                              {item.product.name}
                            </div>
                          </>
                          <div>
                            {item.retail_price !== item.price && (
                              <div className="text-black-800 line-through text-xs min-w-max sm:text-sm">
                                <Price value={item.retail_price} />
                              </div>
                            )}
                            <div className="text-xs text-secondary min-w-max sm:text-sm">
                              <Price value={item.price} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CarouselCore>
                </div>
                <div
                  onClick={goToNext}
                  className="items-center justify-center hidden sm:flex"
                >
                  <div className="flex justify-center p-2 border border-gray-100 rounded-full cursor-pointer">
                    <Icon
                      name="chevron-end"
                      size={15}
                      className="fill-[#000000]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:pl-8 lg:w-4/10 2xl:w-1/3">
          <div className="p-6 w-full h-full border border-solid border-gray-400 md:px-20 md:py-14">
            <div className="mb-4 text-black-800 text-xl font-light sm:text-2xl md:mb-8">
              {t('checkout.completed.side.whats_next')}
            </div>
            <div className="text-xs leading-6 text-black-400 mb-6">
              <p>{t('checkout.completed.side.description_first')}</p>
            </div>
            <div className="text-xs leading-6 text-black-400 mb-6">
              <p>{t('checkout.completed.side.description_second')}:</p>
              <ul>
                <li>
                  <Link
                    href={ROUTES.ACCOUNT_CONTACT}
                    className="underline cursor-pointer transition-all hover:text-secondary"
                  >
                    {t('checkout.completed.side.help_contact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.ACCOUNT}
                    className="underline cursor-pointer transition-all hover:text-secondary"
                    data-testid="order-my-account"
                  >
                    {t('checkout.completed.side.my_account')}
                  </Link>
                </li>
                <li>
                  <Link
                    href={ROUTES.ACCOUNT_FAQ}
                    className="underline cursor-pointer transition-all hover:text-secondary"
                  >
                    {t('checkout.completed.side.faq')}
                  </Link>
                </li>
              </ul>
              <Button
                appearance="outlined"
                type="submit"
                className="w-full mt-8 font-bold"
                data-testid="order-new-items"
              >
                {t('checkout.completed.side.discover_new_items')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCompleted;
