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
import { Price, Button, Input } from '@theme/components';
import { pushBeginCheckout } from '@theme/utils/gtm';
import { ROUTES } from '@theme/routes';
import { useRouter, useLocalization } from '@akinon/next/hooks';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';

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
    <div className="w-full xl:w-[300px]">
      <div className="py-3 border-b border-gray-200 flex justify-between items-end">
        <h2 className="text-xl font-light">{t('basket.summary.title')}</h2>
        <span className="text-xs" data-testid="basket-count">
          {basket.basketitem_set.map((x) => x.quantity).reduce((a, b) => a + b)}{' '}
          {t('basket.summary.items').toUpperCase()}
        </span>
      </div>
      <div className="py-3 border-b border-gray-200 text-xs leading-6">
        <div className="flex justify-between">
          <p>
            {t('basket.summary.subtotal')} (
            {basket.basketitem_set
              .map((x) => x.quantity)
              .reduce((a, b) => a + b)}{' '}
            {t('basket.summary.items')})
          </p>
          <p>
            <Price value={basket.total_product_amount} />
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
      <div className="bg-gray-50 py-3 px-5 border-b border-gray-200 text-xs">
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
      </div>
      <div>
        <div className="flex justify-between py-3 text-xl">
          <h2 className="font-light">{t('basket.summary.total')}</h2>
          <Price value={basket.total_amount} data-testid="basket-total" />
        </div>
        <Button
          className="w-full"
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
  );
};
