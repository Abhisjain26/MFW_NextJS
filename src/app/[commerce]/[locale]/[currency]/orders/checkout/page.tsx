'use client';

import { CheckoutStepList, Summary } from '@theme/views/checkout';
import PaymentStep from '@theme/views/checkout/steps/payment';
import ShippingStep from '@theme/views/checkout/steps/shipping';
import { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import {
  resetCheckoutState,
  setCurrentStep
} from '@akinon/next/redux/reducers/checkout';
import { RootState } from '@theme/redux/store';
import { ROUTES } from '@theme/routes';
import { useFetchCheckoutQuery } from '@akinon/next/data/client/checkout';
import { Button, LoaderSpinner } from '@theme/components';
import { pushAddPaymentInfo, pushAddShippingInfo } from '@theme/utils/gtm';
import { CheckoutStep } from '@akinon/next/types';
import { useRouter, useLocalization } from '@akinon/next/hooks';
import dynamic from 'next/dynamic';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import { Image } from '@akinon/next/components';
import Styled from 'styled-components';
import Style from './page.module.css'

const Checkout = () => {
  const { t } = useLocalization();
  const { steps, preOrder } = useAppSelector(
    (state: RootState) => state.checkout
  );

  const {
    data: checkoutData,
    isFetching,
    isError,
    isSuccess,
    refetch: refetchCheckout
  } = useFetchCheckoutQuery(null, {
    refetchOnMountOrArgChange: true
  });
  const initialStepChanged = useRef<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const CheckoutAuth = useMemo(
    () =>
      dynamic(() => {
        return import('@theme/views/checkout/auth');
      }),
    []
  );

  useEffect(() => {
    if (steps.shipping.completed && !initialStepChanged.current) {
      dispatch(setCurrentStep(CheckoutStep.Payment));
      initialStepChanged.current = true;
    }
  }, [steps.shipping.completed]);

  useEffect(() => {
    if (preOrder && !preOrder.shipping_option) {
      initialStepChanged.current = true;
    }
  }, [preOrder]);

  useEffect(() => {
    return () => {
      dispatch(resetCheckoutState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const products = checkoutData?.pre_order?.basket?.basketitem_set.map(
        (basketItem) => ({
          ...basketItem.product
        })
      );
      if (steps.current === 'shipping') {
        pushAddShippingInfo(products);
      }
      if (steps.current === 'payment') {
        pushAddPaymentInfo(products, String(preOrder?.payment_option?.name));
      }
    }
  }, [isSuccess, steps, checkoutData, preOrder?.payment_option?.name]);

  if (checkoutData?.redirect_url?.includes('basket')) {
    router.push(ROUTES.BASKET);
    return null;
  }

  if (checkoutData?.template_name === 'orders/index.html') {
    return (
      <section className="container px-4 my-7 md:mt-20 lg:px-0 lg:mx-auto">
        <CheckoutAuth />
      </section>
    );
  }

  if (isFetching || isError) {
    return (
      <div className="flex flex-col items-center justify-center h-80">
        {isFetching ? (
          <LoaderSpinner />
        ) : (
          <>
            <div>{t('checkout.error.title')}</div>
            <div className="mt-5">
              <Button onClick={refetchCheckout}>
                {t('checkout.error.button')}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <PluginModule component={Component.MasterpassProvider}>
        <PluginModule component={Component.MasterpassDeleteConfirmationModal} />
        <PluginModule component={Component.MasterpassOtpModal} />
        <PluginModule component={Component.MasterpassLinkModal} />

        <div className="container py-5">
          <div className={`w-3/5 px-24 border border-b-0  mx-auto text-center ${Style.checkout_main_container} pt-5 pb-12`}>
            <h2 className='color_blue mt-3'>Express Checkout</h2>
            <button className={`${Style.checkout_paypal_button}`}><Image className={`${Style.checkout_paypal_image}`} src="/images/local/paypal.svg" alt='Paypal' width={100} height={100} /></button>
          </div>

          {/* <CheckoutStepList /> */}
          <div className='border relative w-3/5 mx-auto checkout_or_mobile'>
            <div className={`color_blue ${Style.or_checkout}`}>OR</div>
          </div>

          <div className={`flex flex-wrap justify-center ${Style.checkout_main_container}`}>
            <div className={`w-3/5 ${Style.checkout_content_mobile} px-24 border border-t-0 pt-9 pb-5`}>
              {steps.current === CheckoutStep.Shipping && <ShippingStep />}
              {steps.current === CheckoutStep.Payment && <PaymentStep />}
            </div>

            {/* <div className="w-full h-fit-content mt-6 lg:w-1/3 lg:pl-8 lg:mt-0"> */}
            {/* <Summary /> */}
            {/* </div> */}
          </div>
        </div>
      </PluginModule>
    </div>
  );
};

export default Checkout;
