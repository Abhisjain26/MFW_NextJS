import clsx from 'clsx';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import { useSetPaymentOptionMutation } from '@akinon/next/data/client/checkout';
import { CheckoutPaymentOption } from '@akinon/next/types';
import { Radio } from '@theme/components';
import { usePaymentOptions } from '@akinon/next/hooks/use-payment-options';

const PaymentOptionButtons = () => {
  const { preOrder } = useAppSelector((state: RootState) => state.checkout);
  const [setPaymentOption] = useSetPaymentOptionMutation();
  const { filteredPaymentOptions } = usePaymentOptions();

  const onClickHandler = (option: CheckoutPaymentOption) => {
    setPaymentOption(option.pk);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="w-full space-y-4 px-4 flex flex-col mb-8 md:hidden">
        {filteredPaymentOptions.map((option) => (
          <label
            key={`payment-option-${option.pk}`}
            className="border px-4 py-3 mt-3 flex h-12"
            onClick={scrollToTop}
          >
            <Radio
              type="radio"
              name="payment-option"
              value={option.pk}
              checked={preOrder?.payment_option?.pk === option.pk}
              onChange={() => onClickHandler(option)}
              className="mr-2 mt-1"
            />
            <span className="flex text-primary-800 font-light text-lg">
              {option.name}
            </span>
          </label>
        ))}
      </div>

      <div className="hidden md:flex">
        {filteredPaymentOptions.map((option) => (
          <button
            key={`payment-option-${option.pk}`}
            onClick={() => onClickHandler(option)}
            className={clsx(
              'flex items-center justify-center border-r border-b border-solid',
              'border-gray-400 text-xs uppercase text-black-800 font-medium',
              'text-opacity-60 bg-white h-11 px-5 transition-colors sm:h-15 sm:px-8 sm:py-8 hover:text-secondary',
              {
                'text-opacity-100 border-b-transparent':
                  preOrder?.payment_option?.pk === option.pk
              }
            )}
            data-testid={`checkout-payment-tab-${option.pk}`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default PaymentOptionButtons;
