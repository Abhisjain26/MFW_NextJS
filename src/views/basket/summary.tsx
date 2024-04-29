import { useEffect } from 'react';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  basketApi,
  useApplyVoucherCodeMutation,
  useRemoveVoucherCodeMutation
} from '@akinon/next/data/client/basket';
import { Basket, Error } from '@akinon/next/types';
import { Price, Button, Input, Icon } from '@theme/components';
import { pushBeginCheckout } from '@theme/utils/gtm';
import { ROUTES } from '@theme/routes';
import { useRouter, useLocalization } from '@akinon/next/hooks';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import Style from './sumary.module.css'

interface Props {
  basket: Basket;
}

const voucherCodeFormSchema = (t) =>
  yup.object().shape({
    voucherCode: yup.string().required(t('basket.summary.form.error.required'))
  });

export const Summary = (props: Props) => {
  const { t } = useLocalization();
  const { basket } = props;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<{ voucherCode: string }>({
    resolver: yupResolver(voucherCodeFormSchema(t))
  });
  const dispatch = useAppDispatch();
  const [applyVoucherCodeMutation] = useApplyVoucherCodeMutation();
  const [removeVoucherCodeMutation] = useRemoveVoucherCodeMutation();

  useEffect(() => {
    if (basket.voucher_code) {
      reset({ voucherCode: basket.voucher_code });
    }
  }, [basket, reset]);

  const removeVoucherCode = () => {
    removeVoucherCodeMutation()
      .unwrap()
      .then((basket) =>
        dispatch(
          basketApi.util.updateQueryData(
            'getBasket',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, basket);
            }
          )
        )
      )
      .catch((error: Error) => {
        setError('voucherCode', { message: error.data.non_field_errors });
      });
  };

  const onSubmit = (data) => {
    applyVoucherCodeMutation({
      voucher_code: data.voucherCode
    })
      .unwrap()
      .then((basket) =>
        dispatch(
          basketApi.util.updateQueryData(
            'getBasket',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, basket);
            }
          )
        )
      )
      .catch((error: Error) => {
        setError('voucherCode', { message: error.data.non_field_errors });
      });
  };

  useEffect(() => {
    const products = basket.basketitem_set.map((basketItem) => ({
      ...basketItem.product
    }));
    pushBeginCheckout(products);
  }, [basket]);

  return (
    <div className="w-full xl:w-[400px]">
      <div className='border px-2 py-3 flex items-center justify-between'>
        <div className='flex mb-3'>
          <div>
            <Icon name='pin' className={`${Style.summary_icon}`} size={16} />
          </div>
          <div>
            <h3 className='color_blue text-sm'>Your Location</h3>
            <h3 className='text-sm'>Erand Gardens Ext 94, 1682</h3>
            <p className={`${Style.loaction_text_color} text-xs`}>We need your address to check item availability</p>
          </div>
        </div>
        <div >
          <Button className={`pinkbtn ${Style.add_address_button} border-0 text-xs px-3`}>Add Address</Button>
        </div>
      </div>
      <div className='border px-2 py-3'>
        <div className="py-3 border-b border-gray-200 flex justify-between items-end">
          <h2 className="text-xl color_blue">{t('basket.summary.title')}</h2>
          {/* <span className="text-xs" data-testid="basket-count">
          {basket.basketitem_set.map((x) => x.quantity).reduce((a, b) => a + b)}{' '}
          {t('basket.summary.items').toUpperCase()}
        </span> */}
        </div>
        <div className="py-3  border-gray-200 text-xs leading-6">
          <div className="flex items-center justify-between mt-4">
            <p className='uppercase text-sm'>
              Price
            </p>
            <p className='color_blue text-base'>
              <Price value={basket.total_product_amount} />
            </p>
          </div>
          <div className='flex items-center justify-between mt-4'>
            <p className='uppercase text-sm'>
              {t('basket.summary.subtotal')}
            </p>
            <p className='color_blue text-base'>
              {basket.basketitem_set
                .map((x) => x.quantity)
                .reduce((a, b) => a + b)}{' '}
              {/* {t('basket.summary.items')} */}
            </p>
          </div>

          {basket.discounts.length > 0 && (
            <>
              {basket.discounts.map((discount, index) => (
                <div key={index} className="flex justify-between text-secondary">
                  <p data-testid="basket-voucher-code">{discount.description}</p>
                  <Price value={discount.discount} useNegative />
                </div>
              ))}
              <div className="flex justify-between">
                <p>{t('basket.summary.discounts_total')}</p>
                <Price
                  value={basket.discounts.reduce(
                    (acc, curr) => acc + Number(curr.discount),
                    0
                  )}
                  useNegative
                />
              </div>
            </>
          )}
        </div>
        {/* <div className=" py-3 px-5 border-b border-gray-200 text-xs">
        <p className="mb-3 text-lg font-light">
          {t('basket.summary.form.title')}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
          <div className="w-full md:w-1/2 lg:w-auto">
            <Input
              placeholder={t('basket.summary.form.placeholder')}
              className="h-9 w-full lg:w-40"
              data-testid="basket-voucher-input"
              {...register('voucherCode')}
              error={errors.voucherCode}
              disabled={!!basket.voucher_code}
            />
          </div>
          {basket.voucher_code ? (
            <Button
              className="h-9 w-20 px-0 border-gray-500 border-l-0"
              appearance="outlined"
              data-testid="basket-voucher-remove"
              type="button"
              onClick={removeVoucherCode}
            >
              {t('basket.summary.remove')}
            </Button>
          ) : (
            <Button
              className="h-9 w-20 px-0 border-gray-500 border-l-0"
              appearance="outlined"
              data-testid="basket-voucher-submit"
            >
              {t('basket.summary.submit')}
            </Button>
          )}
        </form>
      </div> */}

        <div className=" py-3  border-gray-200 text-xs">
          {/* <p className="mb-3 text-lg font-light">
    {t('basket.summary.form.title')}
  </p> */}
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="w-full md:w-1/2 lg:w-auto">
              <Input
                placeholder={t('basket.summary.form.placeholder')}
                className="h-9 w-full py-6 px-2"
                data-testid="basket-voucher-input"
                {...register('voucherCode')}
                error={errors.voucherCode}
                disabled={!!basket.voucher_code}
              />
            </div>
            {basket.voucher_code ? (
              <Button
                className={`h-9 w-20 px-0 ${Style.summary_cart_button}`}
                // appearance="outlined"
                data-testid="basket-voucher-remove"
                type="button"
                onClick={removeVoucherCode}
              >
                {t('basket.summary.remove')}
              </Button>
            ) : (
              <Button
                className="h-9 w-20 px-0 summary_cart_button"
                // appearance="outlined"
                data-testid="basket-voucher-submit"
                type="submit" // Changed type to submit for form submission
              >
                {t('basket.summary.submit')}
              </Button>
            )}
          </form>
        </div>


        <div>
          <div className="flex justify-between pt-3 text-xl">
            <h2 className="text-sm  uppercase">{t('basket.summary.total')}</h2>
            <Price value={basket.total_amount} data-testid="basket-total" className='color_blue text-base' />
          </div>
          <div className="flex justify-between pb-3 pt-1 text-xl border-b">
            <h2 className="text-sm  uppercase">Shipping</h2>
            <p className='text-sm'> Enter Shipping Address</p>
          </div>
          <div className="flex justify-between py-4 text-xl">
            <h2 className="text-sm  uppercase">{t('basket.summary.total')}</h2>
            <Price value={basket.total_amount} data-testid="basket-total" className='color_blue text-base' />
          </div>

          <Button
            className="w-full pinkbtn border-0"
            onClick={() => {
              router.push(ROUTES.CHECKOUT);
            }}
            data-testid="basket-checkout"
          >
            {t('basket.summary.proceed_to_checkout')}
          </Button>


          <PluginModule component={Component.OneClickCheckoutButtons} />
        </div>
      </div>
    </div>
  );
};
