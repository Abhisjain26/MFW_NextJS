'use client';

import { useLocalization } from '@akinon/next/hooks';
import { Checkbox, Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';

export const OrderCancellationItem = ({
  item,
  value,
  onChange,
  selectOption
}) => {
  const { t } = useLocalization();
  const checkboxStatus =
    (item.is_cancellable || item.is_refundable) &&
    !item.active_cancellation_request;

  const handleClick = () => {
    const checkItem = (element) => element.order_item === item.id;
    const hasCancelItem = value.some(checkItem);

    if (hasCancelItem) {
      return onChange(value.filter((order) => order.order_item !== item.id));
    } else {
      onChange([
        ...value,
        {
          cancellation_type: item.is_refundable ? 'refund' : 'cancel',
          order_item: item.id,
          reason: '1',
          description: ''
        }
      ]);
    }
  };

  return (
    <div className="flex flex-wrap justify-between border-gray border-b mb-4 pb-3">
      <div className="flex gap-3 mb-5 lg:mb-0">
        {checkboxStatus && (
          // TODO: Static image will change (TR)
          <Checkbox
            className="m-auto"
            data-testid="account-orders-return-checkbox"
            onClick={handleClick}
          />
        )}
        <div className="flex-shrink-0">
          <Link href={item.product.absolute_url}>
            <Image
              src={item.product.image ? item.product.image : '/noimage.jpg'}
              alt={item.product.name}
              width={112}
              height={160}
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-sm">
            <Link href={item.product.absolute_url}>{item.product.name}</Link>
          </div>
          <div className="text-gray-900 text-xs">
            {item.product.attributes.renk && (
              <div>
                <span>{t('account.my_orders.detail.color')}</span>:{' '}
                {item.product.attributes.renk}
              </div>
            )}

            {item.product.attributes.beden && (
              <div>
                <span>{t('account.my_orders.detail.size')}</span>:
                {item.product.attributes.beden}
              </div>
            )}
            <div>
              <span>{t('account.my_orders.detail.code')}</span>:{' '}
              {item.product.base_code}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between w-full items-start lg:items-center lg:w-auto">
        <div className="w-full flex flex-col lg:items-center lg:flex-row">
          {item.active_cancellation_request?.easy_return?.code && (
            <div className="flex items-center">
              <div>
                <span>{t('account.my_orders.return.return_code')}</span>:{' '}
              </div>
              <div>{item.active_cancellation_request.easy_return.code}</div>
            </div>
          )}

          {selectOption}
        </div>
      </div>
    </div>
  );
};
