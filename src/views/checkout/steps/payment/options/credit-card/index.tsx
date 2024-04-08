import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import {
  useCompleteCreditCardPaymentMutation,
  useSetBinNumberMutation
} from '@akinon/next/data/client/checkout';
import { CreditCardForm } from '@theme/types';
import { Button, Icon, Input, Select } from '@theme/components';
import * as yup from 'yup';
import CheckoutAgreements from '../../agreements';
import PaymentHeader from '../../payment-header';
import CreditCardInstallments from './installments';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import { getPosError } from '@akinon/next/utils';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import { PaymentOption } from '@akinon/next/types';

const creditCardFormSchema = (
  t,
  payment_option: PaymentOption,
  isMasterpassDirectPurchase?: boolean
) => {
  if (
    payment_option?.payment_type === 'masterpass' &&
    isMasterpassDirectPurchase === false
  ) {
    return yup.object().shape({
      agreement: yup
        .boolean()
        .oneOf([true], t('checkout.payment.credit_card.form.error.required'))
    });
  }

  return yup.object().shape({
    card_holder: yup
      .string()
      .required(t('checkout.payment.credit_card.form.error.required'))
      .matches(
        /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/,
        t('checkout.payment.credit_card.form.error.card_holder_matches')
      ),
    card_number: yup
      .string()
      .transform((value: string) => value.replace(/_/g, '').replace(/ /g, ''))
      .length(
        16,
        t('checkout.payment.credit_card.form.error.card_number_length')
      )
      .required(t('checkout.payment.credit_card.form.error.required')),
    card_month: yup
      .string()
      .required(t('checkout.payment.credit_card.form.error.required')),
    card_year: yup
      .string()
      .required(t('checkout.payment.credit_card.form.error.required')),
    card_cvv: yup
      .string()
      .transform((value: string) => value.replace(/_/g, '').replace(/ /g, ''))
      .length(3, t('checkout.payment.credit_card.form.error.cvv_length'))
      .required(t('checkout.payment.credit_card.form.error.required')),
    installment: yup
      .number()
      .required(t('checkout.payment.credit_card.form.error.installment')),
    agreement: yup
      .boolean()
      .oneOf([true], t('checkout.payment.credit_card.form.error.required'))
  });
};

const CheckoutCreditCard = () => {
  const { installment, payment_option } = useAppSelector(
    (state: RootState) => state.checkout.preOrder
  );
  const { cardType } = useAppSelector((state: RootState) => state.checkout);
  const masterpass = useAppSelector((state: RootState) => state.masterpass);
  const { t } = useLocalization();
  const {
    register,
    handleSubmit,
    setValue: setFormValue,
    trigger: validateInput,
    control,
    formState: { errors },
    setError,
    getValues
  } = useForm<CreditCardForm>({
    resolver: yupResolver(
      creditCardFormSchema(t, payment_option, masterpass?.isDirectPurchase)
    )
  });
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [formError, setFormError] = useState(null);
  const [cardBinNumber, setCardBinNumber] = useState(null);
  const [setBinNumber] = useSetBinNumberMutation();
  const [completeCreditCardPayment] = useCompleteCreditCardPaymentMutation();

  const handleCardNumberChange = (value) => {
    const binNumber = value.replace(/\D/g, '').substring(0, 6);

    if (binNumber.length === 6) {
      if (cardBinNumber !== binNumber) {
        setBinNumber(binNumber);
        setCardBinNumber(binNumber);
      }
    } else if (cardBinNumber && binNumber.length < 6) {
      setCardBinNumber(null);
    }
  };

  const onSubmit: SubmitHandler<CreditCardForm> = async (data) => {
    const response = await completeCreditCardPayment(data).unwrap();

    setFormError(response?.errors);
  };

  useEffect(() => {
    const posErrors = getPosError();

    if (posErrors) {
      setFormError(posErrors);
    }

    const months = [
      {
        label: t('checkout.payment.credit_card.form.month.placeholder'),
        value: ''
      }
    ];
    const years = [
      {
        label: t('checkout.payment.credit_card.form.year.placeholder'),
        value: ''
      }
    ];
    const date = new Date();
    const currentYear = date.getFullYear();

    for (let i = 1; i <= 12; i++) {
      months.push({ label: i.toString(), value: i.toString() });
    }

    for (let i = currentYear; i < currentYear + 13; i++) {
      years.push({ label: i.toString(), value: i.toString() });
    }

    setMonths(months);
    setYears(years);
  }, []);

  useEffect(() => {
    if (installment?.pk) {
      setFormValue('installment', installment?.pk);
      validateInput('installment');
    }
  }, [installment?.pk, setFormValue, validateInput]);

  useEffect(() => {
    Object.keys(formError ?? {})
      .filter((key) => key !== 'non_field_errors')
      .forEach((item: keyof CreditCardForm) => {
        setError(item, {
          type: 'custom',
          message: formError[item].join(', ')
        });
      });
  }, [formError, setError]);

  return (
    <form
      className={clsx('flex flex-row flex-wrap w-full')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col xl:w-6/10">
        {(payment_option?.payment_type === 'credit_card' ||
          (payment_option?.payment_type === 'masterpass' &&
            masterpass?.isDirectPurchase)) && (
          <>
            <PaymentHeader title={t('checkout.payment.credit_card.title')} />

            <div className="w-full bg-white">
              <div className="text-xs text-black-800 p-4 sm:p-6">
                {t('checkout.payment.credit_card.description')}
              </div>

              <div className="px-4 my-2 w-full flex justify-between flex-wrap pb-4 sm:px-6 sm:py-6">
                <div className="my-2 w-full sm:px-4">
                  <Input
                    label={t(
                      'checkout.payment.credit_card.form.cardholder_name.placeholder'
                    )}
                    {...register('card_holder')}
                    error={errors.card_holder}
                    data-testid="checkout-credit-card-holder"
                  />
                </div>

                <div className="my-2 w-full flex flex-col sm:px-4">
                  <div className="text-xs text-gray-800 mb-2 w-full flex justify-between items-center">
                    <span>
                      {t(
                        'checkout.payment.credit_card.form.card_number.placeholder'
                      )}
                    </span>

                    {cardType?.logo && cardBinNumber && (
                      <Image
                        width={50}
                        height={30}
                        src={cardType?.logo}
                        alt="bankLogo"
                      />
                    )}
                  </div>

                  <Input
                    format="#### #### #### ####"
                    mask="_"
                    allowEmptyFormatting={true}
                    control={control}
                    onValueChange={(values) => {
                      const { value } = values;

                      handleCardNumberChange(value);
                    }}
                    {...register('card_number')}
                    error={errors.card_number}
                    data-testid="checkout-credit-card-number"
                  />
                </div>

                <div className="w-full my-2 sm:flex">
                  <div className="sm:w-2/3 sm:px-4">
                    <label
                      className="flex w-full text-xs text-start text-black-400 mb-1.5"
                      htmlFor="card_month"
                    >
                      {t(
                        'checkout.payment.credit_card.form.expiration_date.title'
                      )}
                    </label>

                    <div className="flex w-full h-10 space-x-2.5">
                      <div className="w-2/4">
                        <Select
                          className="w-full text-xs border-gray-400 sm:text-sm"
                          options={months}
                          {...register('card_month')}
                          error={errors.card_month}
                          data-testid="checkout-credit-card-month"
                        />
                      </div>

                      <div className="w-2/4">
                        <Select
                          className="w-full text-xs border-gray-400 sm:text-sm"
                          options={years}
                          {...register('card_year')}
                          error={errors.card_year}
                          data-testid="checkout-credit-card-year"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="my-2 sm:w-1/3 sm:px-4 sm:my-0">
                    <label
                      className="flex w-full text-xs text-start text-black-400 mb-1.5"
                      htmlFor="card_cvv"
                    >
                      {t(
                        'checkout.payment.credit_card.form.security_code.title'
                      )}
                    </label>
                    <Input
                      format="###"
                      mask="_"
                      control={control}
                      allowEmptyFormatting={true}
                      {...register('card_cvv')}
                      error={errors.card_cvv}
                      data-testid="checkout-credit-card-cvv"
                    />
                    <div className="group relative flex items-center justify-start text-gray-600 cursor-pointer mt-2 transition-all hover:text-secondary">
                      <span className="text-xs underline">
                        {t(
                          'checkout.payment.credit_card.form.security_code.cvc'
                        )}
                      </span>
                      <Icon
                        name="cvc"
                        size={16}
                        className="leading-none ml-2"
                      />
                      <div className="hidden group-hover:block absolute right-0 bottom-5 w-[11rem] lg:w-[21rem] lg:left-auto lg:right-auto border-2">
                        {/* TODO: Fix this */}
                        <Image
                          src="/cvv.jpg"
                          alt="Cvv"
                          width={385}
                          height={262}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <PluginModule
          component={Component.MasterpassCardList}
          props={{
            className: 'p-10'
          }}
        />

        <PluginModule
          component={Component.MasterpassCardRegistration}
          props={{
            className: 'mt-5 mb-10 sm:px-10',
            getValues
          }}
        />
      </div>

      <div className="w-full flex flex-col border-gray-400 border-solid xl:w-4/10 xl:border-l xl:border-t-0">
        <PaymentHeader
          title={t('checkout.payment.installment_options.title')}
        />

        <div className="w-full border-solid border-gray-400 bg-white">
          <CreditCardInstallments error={errors.installment} />

          <div className="flex flex-col text-xs pb-4 px-4 sm:px-6 sm:pb-6 md:mt-0 mt-4">
            <CheckoutAgreements
              control={control}
              fieldId="agreement"
              error={errors.agreement}
            />
            {formError?.non_field_errors && (
              <div
                className="w-full text-xs text-start px-1 mt-3 text-error"
                data-testid="checkout-form-error"
              >
                {formError.non_field_errors}
              </div>
            )}
            {formError?.status && (
              <div
                className="w-full text-xs text-start px-1 mt-3 text-error"
                data-testid="checkout-form-error"
              >
                {formError.status}
              </div>
            )}
            <Button
              className="group uppercase mt-4 inline-flex items-center justify-center"
              type="submit"
              data-testid="checkout-credit-card-place-order"
            >
              <span>{t('checkout.payment.credit_card.form.button')}</span>
              <Icon
                name="chevron-end"
                size={12}
                className="fill-primary-foreground ml-2 h-3 group-hover:fill-primary"
              />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutCreditCard;
