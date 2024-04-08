import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import { useSetInstallmentOptionMutation } from '@akinon/next/data/client/checkout';
import { Radio, Price } from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';

const CreditCardInstallments = ({ error }) => {
  const { t } = useLocalization();
  const { preOrder, cardType, installmentOptions } = useAppSelector(
    (state: RootState) => state.checkout
  );
  const [setInstallmentOption] = useSetInstallmentOptionMutation();

  const errorMessage = (
    <div className="px-6 mt-4 text-sm text-error">{error?.message}</div>
  );

  if (installmentOptions.length === 0) {
    return (
      <>
        <div className="text-xs text-black-800 p-4 sm:p-6">
          {t('checkout.payment.installment_options.description')}
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="text-xs text-black-800 p-4">
          {t('checkout.payment.installment_options.installment')}:{' '}
          {cardType?.name ?? 'Other'}
        </div>

        <div className="px-4 mb-4 sm:px-6 sm:mb-6">
          <table className="w-full border-t border-b border-solid border-gray-400">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="text-xs font-normal border-e border-solid border-gray-400 px-2 py-2 border-0 text-start"
                >
                  {t('checkout.payment.installment_options.payments')}
                </th>
                <th
                  scope="col"
                  className="text-xs font-normal border-e border-solid border-gray-400 px-2 py-2 border-0 text-right"
                >
                  {t('checkout.payment.installment_options.per_month')}
                </th>
                <th
                  scope="col"
                  className="text-xs font-normal border-e border-solid border-gray-400 px-2 py-2 border-0 text-right"
                >
                  {t('checkout.payment.installment_options.total')}
                </th>
              </tr>
            </thead>
            <tbody>
              {installmentOptions.map((option) => (
                <tr
                  key={`installment-${option.pk}`}
                  className="border-t border-solid border-gray-400"
                >
                  <td className="text-xs font-normal border-e border-solid border-gray-400 px-2 py-2 text-left">
                    <Radio
                      value={option.pk}
                      name="installment"
                      checked={option.pk === preOrder?.installment?.pk}
                      onChange={() => {
                        setInstallmentOption(option.pk);
                      }}
                      data-testid={`checkout-credit-card-installment-${option.pk}`}
                    >
                      <span className="w-full flex items-center justify-start pl-2">
                        <span className="text-xs text-black-800 transition-all">
                          {option.label}
                        </span>
                      </span>
                    </Radio>
                  </td>
                  <td className="text-xs font-normal border-e border-solid border-gray-400 px-2 py-2 text-right">
                    <Price value={option.monthly_price_with_accrued_interest} />
                  </td>
                  <td className="text-xs font-normal border-e border-solid border-gray-400 px-2 py-2 text-right">
                    <Price value={option.price_with_accrued_interest} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && errorMessage}
      </div>
    </>
  );
};

export default CreditCardInstallments;
