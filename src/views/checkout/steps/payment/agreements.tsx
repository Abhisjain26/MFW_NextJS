import useContract from '../../../../hooks/use-contract';
import { Controller } from 'react-hook-form';
import { Checkbox } from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';
import { Trans } from '@akinon/next/components/trans';

const CheckoutAgreements = ({ control, fieldId, error }) => {
  const { t } = useLocalization();
  const {
    ContractButton: InfoContractButton,
    ContractModal: InfoContractModal
  } = useContract('info', t('checkout.agreement.info_contract'));
  const {
    ContractButton: SalesContractButton,
    ContractModal: SalesContractModal
  } = useContract('sales', t('checkout.agreement.sales_contract'));

  return (
    <>
      <Controller
        name={fieldId}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <Checkbox {...field} error={error} data-testid="checkout-agreement">
            <Trans
              i18nKey="checkout.agreement.content"
              components={{
                InfoContract: <InfoContractButton />,
                SalesContract: <SalesContractButton />
              }}
            />
          </Checkbox>
        )}
      />
      <InfoContractModal />
      <SalesContractModal />
    </>
  );
};

export default CheckoutAgreements;
