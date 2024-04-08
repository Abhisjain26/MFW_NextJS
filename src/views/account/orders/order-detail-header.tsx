'use client';

import { useLocalization } from '@akinon/next/hooks';

export interface Props {
  title: string;
  order: {
    number: string;
    created_date: string;
  };
  children?: React.ReactNode;
}

export const OrderDetailHeader = ({ title, order, children }: Props) => {
  const { t } = useLocalization();

  const orderDate = new Date(order.created_date)
    .toJSON()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join(' ');

  return (
    <div className="bg-gray-150 flex flex-col items-center justify-center p-6 w-full mb-8 md:flex-row">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="text-3xl mb-2">{title}</div>
        <div>
          <span>{t('account.my_orders.detail.order_number')}</span>:{' '}
          <span data-testid="account-orders-return-order-id">
            {order.number}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
};
