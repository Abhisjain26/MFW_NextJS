import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { RootState } from '@theme/redux/store';
import {
  useCompleteFundsTransferMutation,
  useSetFundsTransferOptionMutation
} from '@akinon/next/data/client/checkout';
import { Button, Icon, Price, Radio } from '@theme/components';
import * as yup from 'yup';
import CheckoutAgreements from '../agreements';
import PaymentHeader from '../payment-header';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import PaymentOptionButtons from '../payment-option-buttons';
import { Trans } from '@akinon/next/components/trans';

const fundsTransferFormSchema = (t) =>
  yup.object().shape({
    agreement: yup.boolean().oneOf([true], 'This field is required.')
  });

const CheckoutFundsTransfer = () => {
  const { t } = useLocalization();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(fundsTransferFormSchema(t))
  });
  const [formError, setFormError] = useState(null);
  const { bankAccounts, selectedBankAccountPk, preOrder } = useAppSelector(
    (state: RootState) => state.checkout
  );
  const [setFundsTransferOption] = useSetFundsTransferOptionMutation();
  const [completeFundsTransfer] = useCompleteFundsTransferMutation();

  const onSubmit: SubmitHandler<null> = async () => {
    const response = await completeFundsTransfer().unwrap();

    setFormError(response?.errors?.non_field_errors);
  };

  useEffect(() => {
    if (!selectedBankAccountPk && bankAccounts?.length) {
      setFundsTransferOption(bankAccounts[0].pk);
    }
  }, [bankAccounts, selectedBankAccountPk, setFundsTransferOption]);

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <PaymentHeader title={t('checkout.payment.fund_transfer.title')} />

      <div className="w-full bg-white">
        <div className="text-xs text-black-800 p-4 sm:p-6">
          <p className="w-full mb-2">
            {t('checkout.payment.fund_transfer.description')}
          </p>

          <p className="w-full">
            <span className="text-soft block sm:inline-block">
              {t('checkout.payment.fund_transfer.account_title')}{' '}
              <b>
                {t('checkout.payment.fund_transfer.receiver')}: Project Zero
                Ltd. Sti
              </b>
            </span>
          </p>
        </div>
      </div>
      <div className="px-4 sm:px-6">
        {bankAccounts.map((bankAccount) => (
          <div
            key={`bank-account-${bankAccount.pk}`}
            className="w-full border-t border-solid border-gray-400 py-4 last:border-b"
          >
            <label className="w-full flex items-center justify-start">
              <Radio
                name="bank_account"
                type="radio"
                value={bankAccount.pk}
                checked={bankAccount.pk === selectedBankAccountPk}
                onChange={() => {
                  setFundsTransferOption(bankAccount.pk);
                }}
                data-testid={`checkout-bank-account-${bankAccount.pk}`}
              ></Radio>

              <span className="w-full flex items-start justify-start flex-col pl-3 sm:flex-row sm:items-center sm:pl-0">
                <div className="flex items-center justify-start sm:w-32 sm:px-3">
                  <Image
                    src={bankAccount.bank.logo}
                    alt={bankAccount.bank.name}
                    width={80}
                    height={24}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-1 items-start justify-start flex-col sm:flex-row sm:items-center">
                  <span className="min-w-max text-black-800 text-xs">
                    {bankAccount.bank.name} IBAN:
                  </span>
                  <span className="text-black-800 text-xs sm:pl-1">
                    {bankAccount.iban}
                  </span>
                </div>
              </span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-start justify-start flex-col sm:flex-row sm:items-center">
        <div className="text-xs text-black-800 p-4 sm:p-6">
          <p className="w-full mb-1">
            {t('checkout.payment.fund_transfer.attention')}
          </p>

          <p className="w-full mb-1">
            {t('checkout.payment.fund_transfer.transfer_amount_title')}

            <Price className="ml-1" value={preOrder?.total_amount} />
          </p>

          <p className="w-full mb-2 soft text-[#508bc9]">
            <Trans
              i18nKey="checkout.payment.fund_transfer.info_first"
              components={{
                BoldTitle: (
                  <b>{t('checkout.payment.fund_transfer.bold_title')}</b>
                )
              }}
            />
          </p>

          <p className="w-full mb-1">
            <i>{t('checkout.payment.fund_transfer.info_second')}</i>
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6">
        <div className="flex items-start flex-col border-t border-solid border-gray-400 py-4 space-y-4">
          <CheckoutAgreements
            control={control}
            fieldId="agreement"
            error={errors.agreement}
          />
          {formError && (
            <div className="w-full text-xs text-start px-1 mt-3 text-error">
              {formError}
            </div>
          )}
          <Button
            className="group uppercase mt-4 inline-flex items-center justify-center w-full"
            type="submit"
            data-testid="checkout-bank-account-place-order"
          >
            <span> {t('checkout.payment.fund_transfer.button')}</span>
            <Icon
              name="chevron-end"
              size={12}
              className="fill-primary-foreground ml-2 h-3 group-hover:fill-primary"
            />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutFundsTransfer;
