import React, { useState } from 'react';
import { Button, Select } from '@theme/components';
import clsx from 'clsx';
import { ROUTES } from '@theme/routes';
import { useRouter, useLocalization } from '@akinon/next/hooks';

interface Props {
  orders: Array<any>;
}

export const ContentHeader = (props: Props) => {
  const { orders } = props;
  const { t } = useLocalization();
  const [selectedOrder, setSelectedOrder] = useState(orders[0]?.value);
  const router = useRouter();

  const handleChange = (e) => {
    setSelectedOrder(e.target.value);
  };

  const handleClick = () => {
    router.push(`${ROUTES.ACCOUNT_ORDERS}/${selectedOrder}`);
  };

  const isButtonDisabled = orders.length < 1;

  return (
    <div className="bg-gray-150 flex flex-col items-center justify-center p-6 w-full mb-12 md:flex-row">
      <h3 className="text-2xl	mb-4 md:mb-0 md:mr-4 xl:text-3xl">
        {t('account.base.widgets.order.title')}
      </h3>
      <Select
        onChange={handleChange}
        className="w-full mb-4 md:mb-0 md:w-56 md:mr-4 text-xs"
        options={orders}
        data-testid="account-orders-header-select"
      ></Select>
      <Button
        className={clsx(
          'w-full md:w-56',
          isButtonDisabled &&
            'hover:bg-black hover:text-white disabled:opacity-75'
        )}
        onClick={handleClick}
        data-testid="account-orders-header-button"
        disabled={isButtonDisabled}
      >
        {t('account.base.widgets.order.button')}
      </Button>
    </div>
  );
};
