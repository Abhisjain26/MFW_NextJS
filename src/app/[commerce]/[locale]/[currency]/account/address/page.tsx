'use client';

import { useState } from 'react';
import { Button, LoaderSpinner, Modal } from '@theme/components';
import { AddressCard, AddressForm } from '@theme/views/account';
import {
  useAddAddressMutation,
  useGetAddressesQuery
} from '@akinon/next/data/client/address';
import { useLocalization } from '@akinon/next/hooks';

export default function Page() {
  const { t } = useLocalization();
  const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);

  const { data, isLoading, isSuccess } = useGetAddressesQuery();
  const [addAddress] = useAddAddressMutation();

  const onSubmit = async (data) => {
    await addAddress(data);
    setIsNewAddressModalOpen(false);
  };

  return (
    <div>
      <div className="bg-gray-150 p-6 w-full mb-12">
        <div className="mb-4 lg:flex lg:gap-16 lg:justify-center">
          <h3 className="text-3xl text-center mb-4">
            {t('account.address_book.header.title')}
          </h3>
          <Button
            className="w-56 mx-auto block lg:mx-0"
            onClick={() => setIsNewAddressModalOpen(true)}
            data-testid="account-address-add"
          >
            {t('account.address_book.add_button')}
          </Button>
          <Modal
            portalId="account-address-new-address-modal"
            title={t('account.address_book.modal.add_new_address')}
            open={isNewAddressModalOpen}
            setOpen={setIsNewAddressModalOpen}
            className="w-full sm:w-[28rem] max-h-[90vh] overflow-y-auto"
          >
            <AddressForm onSubmit={onSubmit} />
          </Modal>
        </div>
        <p className="text-center max-w-xs mx-auto lg:max-w-none">
          {t('account.address_book.header.description')}
        </p>
      </div>
      {isLoading && (
        <div className="flex justify-center mb-4">
          <LoaderSpinner />
        </div>
      )}
      {isSuccess && (
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-3">
          {data.results.map((address, index) => (
            <AddressCard address={address} key={address.pk} index={index} />
          ))}
        </div>
      )}
      <Button
        appearance="outlined"
        className="w-full my-5 lg:hidden"
        onClick={() => setIsNewAddressModalOpen(true)}
        data-testid="account-address-add-2"
      >
        {t('account.address_book.add_button')}
      </Button>
    </div>
  );
}
