import { setCurrentStep } from '@akinon/next/redux/reducers/checkout';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import { Price, Link } from '@theme/components';
import { CheckoutStep } from '@akinon/next/types';
import { useLocalization } from '@akinon/next/hooks';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import { twMerge } from 'tailwind-merge';
import { Image } from '@akinon/next/components/image';
import { Trans } from '@akinon/next/components/trans';

export const Summary = () => {
  const { t } = useLocalization();

  const currentStep = useAppSelector(
    (state: RootState) => state.checkout.steps.current
  );
  const preOrder = useAppSelector(
    (state: RootState) => state.checkout.preOrder
  );
  const { isMobileApp } = useAppSelector((state: RootState) => state.root);
  const dispatch = useAppDispatch();

  if (!preOrder) {
    return null;
  }

  const Text = (props) => {
    return props.title;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <PluginModule
        component={Component.CheckoutGiftPack}
        props={{
          className:
            'flex flex-col w-full mb-4 border border-solid border-gray-400'
        }}
      />
      <div className="flex flex-col w-full border border-solid border-gray-400">
        <div className="flex justify-between items-center flex-row border-b border-solid border-gray-400 px-4 py-2 sm:px-5 sm:py-4 sm:min-h-15">
          <span className="text-black-800 text-xl font-light sm:text-2xl">
            {t('checkout.summary.title')}
          </span>
          <span className="text-gray-950 text-xs">
            {preOrder.basket.basketitem_set.length}{' '}
            {t('checkout.summary.items').toUpperCase()}
          </span>
        </div>
        <div className="border-b border-solid border-gray-400 max-h-64 overflow-y-auto">
          {preOrder.basket.basketitem_set.map((item, index) => (
            <div
              key={`summary-basketitem-${index}`}
              className="flex flex-row border-b border-solid border-gray-400 py-3 px-4 last:border-b-0 sm:px-5"
            >
              <Link
                href={'#'}
                className={twMerge(
                  'min-w-max flex items-center justify-center',
                  isMobileApp && 'pointer-events-none'
                )}
                passHref
              >
                <Image
                  src={item.product.productimage_set[0]?.image}
                  alt="Checkout Summary Image"
                  width={64}
                  height={96}
                />
              </Link>
              <div className="w-full flex flex-wrap justify-between pl-4">
                <div className="flex justify-center flex-col w-1/2">
                  <Link
                    href={item.product.absolute_url}
                    className={twMerge(
                      'text-xs text-black-800 transition-all mb-1 hover:text-secondary',
                      isMobileApp && 'pointer-events-none'
                    )}
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex text-xs text-black-800">
                      <span>{t('checkout.summary.quantity')}:</span>
                      <span className="ml-1 min-w-max">{item.quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-center flex-col w-1/2">
                  {item.product.retail_price !== item.product.price && (
                    <div className="text-xs text-black-800 line-through min-w-max sm:text-sm">
                      <Price value={item.product.retail_price} />
                    </div>
                  )}
                  <div className="text-xs text-secondary min-w-max sm:text-sm">
                    <Price value={item.product.price} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-3">
          <div className="flex items-center justify-between w-full text-xs text-black-800 py-1 px-4 sm:px-5">
            <span>
              {t('checkout.summary.subtotal')} (
              {preOrder.basket.basketitem_set.length}{' '}
              {t('checkout.summary.items')})
            </span>
            <span>
              <Price value={preOrder?.basket?.total_amount} />
            </span>
          </div>
          <div className="flex items-center justify-between w-full text-xs text-black-800 py-1 px-4 sm:px-5">
            <span>{t('checkout.summary.shipping')}</span>
            <span>
              <Price value={preOrder?.shipping_amount} />
            </span>
          </div>
          <div className="flex items-center justify-between w-full text-xs text-black-800 py-1 px-4 sm:px-5">
            <span>{t('checkout.summary.discounts_total')}</span>
            <span>
              <Price
                value={preOrder?.basket?.total_discount_amount}
                useNegative
              />
            </span>
          </div>
          <div className="flex items-center justify-between w-full text-black-800 px-4 sm:px-5 text-lg border-t border-solid border-gray-400 py-2 mt-3 sm:text-xl sm:py-3">
            <span className="font-light">{t('checkout.summary.total')}</span>
            <span className="min-w-max pl-4">
              <Price value={preOrder?.unpaid_amount} />
            </span>
          </div>
        </div>
      </div>
      {currentStep === CheckoutStep.Payment && (
        <div className="flex flex-col w-full border border-solid border-gray-400 mt-4">
          <div className="flex justify-between items-center flex-row border-b border-solid border-gray-400 px-4 py-2 sm:px-5 sm:py-3 sm:min-h-15">
            <div className="text-black-800 text-xl font-light sm:text-2xl">
              {t('checkout.summary.delivery_info')}
            </div>
            <div
              className="text-xs text-black-800 italic cursor-pointer underline transition-all hover:text-secondary"
              onClick={() => dispatch(setCurrentStep(CheckoutStep.Shipping))}
            >
              {t('checkout.summary.change')}
            </div>
          </div>
          <div className="flex flex-col py-4 px-4 text-black-800 text-xs sm:px-5">
            <div className="w-full overflow-hidden overflow-ellipsis mb-1 last:mb-0">
              <Trans
                i18nKey="checkout.summary.info"
                components={{
                  ShippingAddress: (
                    <Text title={preOrder.shipping_address?.title} />
                  ),
                  ShippingOption: (
                    <Text title={preOrder.shipping_option?.name} />
                  )
                }}
              />
            </div>
            <div className="w-full overflow-hidden overflow-ellipsis mb-1 last:mb-0">
              {preOrder.shipping_address?.line}{' '}
              {preOrder.shipping_address?.postcode}{' '}
              {preOrder.shipping_address?.district && (
                <>{preOrder.shipping_address?.district.name} / </>
              )}
              {preOrder.shipping_address?.township && (
                <>{preOrder.shipping_address?.township.name} / </>
              )}
              {preOrder.shipping_address?.city?.name}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
