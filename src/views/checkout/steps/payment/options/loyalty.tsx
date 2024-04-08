'use client';

import { useCompleteLoyaltyPaymentMutation } from '@akinon/next/data/client/checkout';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { useForm } from 'react-hook-form';

export default function LoyaltyPayment() {
  const { payment_option } = useAppSelector((state) => state.checkout.preOrder);
  const { handleSubmit } = useForm();
  const [completeLoyaltyPayment] = useCompleteLoyaltyPaymentMutation();

  const onSubmit = async () => {
    completeLoyaltyPayment();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={payment_option.slug}></form>
  );
}
