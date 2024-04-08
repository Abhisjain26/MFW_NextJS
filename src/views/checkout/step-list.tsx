import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import { Icon } from '@theme/components';
import { CheckoutStepButton } from './step-button';
import { CheckoutStep } from '@akinon/next/types';
import { useLocalization } from '@akinon/next/hooks';

export const CheckoutStepList = () => {
  const { t } = useLocalization();

  const { steps } = useAppSelector((state: RootState) => state.checkout);

  const separator = (
    <Icon
      name="chevron-end"
      size={12}
      className="mx-4 fill-gray-600 md:ml-5 pointer-events-none"
    />
  );

  return (
    <div className="w-full flex items-center justify-center py-5 md:pl-1 md:justify-start md:py-8 lg:py-11">
      <CheckoutStepButton
        number="1"
        label={t('checkout.step.shipping')}
        selected={steps.current === CheckoutStep.Shipping}
        completed={steps.current !== CheckoutStep.Shipping}
        disabled={steps.current === CheckoutStep.Confirmation}
        tabKey={CheckoutStep.Shipping}
      />
      {separator}
      <CheckoutStepButton
        number="2"
        label={t('checkout.step.payment')}
        selected={steps.current === CheckoutStep.Payment}
        completed={steps.current === CheckoutStep.Confirmation}
        disabled={
          !steps.shipping.completed ||
          steps.current === CheckoutStep.Confirmation
        }
        tabKey={CheckoutStep.Payment}
      />
      {separator}
      <CheckoutStepButton
        number="3"
        label={t('checkout.step.confirmation')}
        disabled
      />
    </div>
  );
};
