import clsx from 'clsx';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import Addresses from './addresses';
import ShippingOptions from './shipping-options';

const ShippingStep = () => {
  const isShippingStepBusy = useAppSelector(
    (state: RootState) => state.checkout.steps.shipping.busy
  );

  return (
    <div
      className={clsx(
        'flex flex-col border border-gray-400 w-full lg:flex-row',
        {
          'pointer-events-none opacity-30': isShippingStepBusy
        }
      )}
    >
      <Addresses />
      <ShippingOptions />
    </div>
  );
};

export default ShippingStep;
