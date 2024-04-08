'use client';

import { useCompleteRedirectionPaymentMutation } from '@akinon/next/data/client/checkout';
import { useLocalization } from '@akinon/next/hooks';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox } from '@theme/components';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import PaymentOptionButtons from '../payment-option-buttons';
import { useEffect, useState } from 'react';
import { getPosError } from '@akinon/next/utils';

interface FormValues {
  agreement: boolean;
}

const formSchema = (t) =>
  yup.object().shape({
    agreement: yup
      .boolean()
      .required('This field is required')
      .oneOf([true], 'This field is required')
  });

export default function RedirectionPayment() {
  const { payment_option } = useAppSelector((state) => state.checkout.preOrder);
  const [formError, setFormError] = useState(null);

  const { t } = useLocalization();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(formSchema(t))
  });
  const [completeRedirectionPayment] = useCompleteRedirectionPaymentMutation();

  const onSubmit = async () => {
    completeRedirectionPayment();
  };

  useEffect(() => {
    const posErrors = getPosError();

    if (posErrors) {
      setFormError(posErrors);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg-5 space-y-5 lg:p-10">
      <h1 className="text-2xl font-bold px-4 md:px-0">
        Pay With {payment_option.name}
      </h1>

      <p className="px-4 md:px-0">
        You can quickly and easily pay and complete your order with{' '}
        {payment_option.name}.
      </p>

      <Checkbox
        className="px-4 md:px-0"
        {...register('agreement')}
        error={errors.agreement}
      >
        Check here to indicate that you have read and agree to the all terms.
      </Checkbox>

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

      <Button className={twMerge('w-full md:w-36 px-4 md:px-0')}>
        {payment_option.name}
      </Button>
    </form>
  );
}
