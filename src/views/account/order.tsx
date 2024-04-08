import { useLocalization } from '@akinon/next/hooks';
import React from 'react';
import { Price, Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';
import { getOrderStatus } from 'utils';

export const Order = (props) => {
  const { t } = useLocalization();
  const date = new Date(props.created_date)
    .toJSON()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join(' ');

  const orderStatus = getOrderStatus(props.status.value.toString(), t);

  return (
    <div className="border border-gray px-5 py-4 text-sm mb-4 last:mb-0">
      <div className="flex flex-wrap">
        <div className="flex items-center flex-1 order-1 md:order-none">
          <div className="flex flex-col">
            <div className="font-semibold uppercase">
              {t('account.my_orders.order.order_placed')}
            </div>
            <div>{date}</div>
          </div>

          <div className="flex flex-col ml-10 md:ml-14">
            <div className="font-semibold uppercase">
              {t('account.my_orders.order.total')}
            </div>
            <div>
              <Price
                className="font-normal min-w-max"
                value={props.amount}
                data-testid="account-orders-amount"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:items-end order-4 md:order-none">
          <div className="font-semibold uppercase">
            <span>{t('account.my_orders.order.order')}</span> #
            <span data-testid="account-orders-id">{props.number}</span>
          </div>

          <div
            className="text-secondary underline"
            data-testid={`account-orders-detail-${props.number}`}
          >
            <Link href={`/account/orders/${props.id}`}>
              {t('account.my_orders.order.order_detail')}
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col justify-between mt-6 mb-2 order-3 md:items-center md:flex-row md:order-none md:gap-20 lg:gap-40">
          <ul className="flex flex-wrap gap-3.5 mb-6 items-center md:mb-0">
            {props.orderitem_set.slice(0, 3).map((item, index) => (
              // TODO: Static image will change (TR)
              <li className="flex-shrink-0" key={index}>
                <Image
                  src={item.product.image ? item.product.image : '/noimage.jpg'}
                  alt={item.product.name}
                  width={64}
                  height={96}
                />
              </li>
            ))}
            {props.orderitem_set.length > 3 && (
              <div>+ {props.orderitem_set.length - 3}</div>
            )}
          </ul>

          <span className={orderStatus.className}>{orderStatus.label}</span>
        </div>

        <div
          className="order-2 flex items-end md:order-none"
          data-testid="account-orders-count"
        >
          {props.orderitem_set.length} {t('account.my_orders.order.items')}
        </div>
      </div>
    </div>
  );
};
