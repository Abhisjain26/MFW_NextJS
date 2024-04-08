import SelectedPaymentOptionView from '@akinon/next/components/selected-payment-option-view';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { CheckoutPaymentOption } from '@akinon/next/types';
import clsx from 'clsx';
import { RootState } from '@theme/redux/store';
import PaymentOptionButtons from './payment-option-buttons';

export const PaymentOptionViews: Array<CheckoutPaymentOption> = [];

const PaymentStep = () => {
  const isPaymentStepBusy = useAppSelector(
    (state: RootState) => state.checkout.steps.payment.busy
  );

  return (
    <div
      className={clsx('flex flex-wrap w-full', {
        'pointer-events-none opacity-30': isPaymentStepBusy
      })}
    >
      <div className="w-full mt-4 flex justify-start border border-gray-400 -mb-px z-10 md:mt-0 md:border-r-0 md:border-b-0 md:w-auto order-2 md:order-none">
        <PaymentOptionButtons />
      </div>
      <div className="w-full border border-solid border-gray-400 bg-white">
        <SelectedPaymentOptionView />
      </div>
    </div>
  );
};

export default PaymentStep;
