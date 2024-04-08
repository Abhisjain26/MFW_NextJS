import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { setCurrentStep } from '@akinon/next/redux/reducers/checkout';
import { RootState } from '@theme/redux/store';
import { useSetShippingOptionMutation } from '@akinon/next/data/client/checkout';
import { Price, Button, Radio } from '@theme/components';
import { CheckoutStep } from '@akinon/next/types';
import { useLocalization } from '@akinon/next/hooks';

const ShippingOptions = () => {
  const { t } = useLocalization();
  const { steps, shippingOptions, preOrder, addressList } = useAppSelector(
    (state: RootState) => state.checkout
  );
  const { shipping_option, shipping_address } = preOrder ?? {};
  const [setShippingOption] = useSetShippingOptionMutation();
  const dispatch = useAppDispatch();

  return (
    <div className="w-full lg:w-2/5">
      <div className="border-b border-gray-400 px-8 py-4">
        <h2 className="text-2xl">{t('checkout.address.shipping.title')}</h2>
      </div>
      {addressList.length < 1 ? (
        <div className="py-4 px-8">
          <p className="text-xs">
            {t('checkout.address.shipping.select_address_to_continue')}
          </p>
        </div>
      ) : (
        <div className="py-4 px-6">
          <p className="text-xs border-gray-400 pb-4">
            {t('checkout.address.shipping.chosen_address')}:{' '}
            {shipping_address?.city.name}
          </p>
          {shippingOptions.map((option) => (
            <div
              key={option.pk}
              className="py-4 border-t border-gray-400 flex justify-between"
            >
              <Radio
                name="shipping"
                checked={option.pk === shipping_option?.pk}
                onChange={() => {
                  setShippingOption(option.pk);
                }}
                onClick={() => {
                  setShippingOption(option?.pk);
                }}
                data-testid={`checkout-shipping-option-${option.pk}`}
              >
                {option.name}
              </Radio>
              <span className="text-xs">
                <Price value={option.shipping_amount} />
              </span>
            </div>
          ))}
          <Button
            className="mt-2 w-full"
            disabled={!steps.shipping.completed}
            onClick={() => dispatch(setCurrentStep(CheckoutStep.Payment))}
            data-testid="checkout-shipping-save"
          >
            {t('checkout.address.shipping.button')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShippingOptions;
