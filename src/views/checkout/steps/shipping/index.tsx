import clsx from 'clsx';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import Addresses from './addresses';
import ShippingOptions from './shipping-options';
import { Link } from '@akinon/next/components';

const ShippingStep = () => {
  const isShippingStepBusy = useAppSelector(
    (state: RootState) => state.checkout.steps.shipping.busy
  );

  return (
    <>

      <div className='w-full flex  justify-between items-center border-b py-3 mb-3'>
        <p className='color_blue text-base'>Contact</p>
        <Link className='color_lightblue text-sm' href="/auth">Login</Link>
      </div>
      <div
        className={clsx(
          'flex flex-col w-full lg:flex-row',
          {
            'pointer-events-none opacity-30': isShippingStepBusy
          }
        )}
      >
        <Addresses />
        {/* <ShippingOptions /> */}
      </div>
    </>
  );
};

export default ShippingStep;
