'use client';

import { Image } from '@akinon/next/components';
import { useLocalization } from '@akinon/next/hooks';
import { Button, Link, Price } from '@theme/components';
import { ROUTES } from '@theme/routes';
import settings from '@theme/settings';
import { getOrderStatus } from '@theme/utils';
import { OrderDetailHeader } from '@theme/views/account/orders/order-detail-header';
import { SalesContractModal } from '@theme/views/sales-contract-modal';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const AnonymousTrackingOrderDetail = ({ order }) => {
  const { locale, t } = useLocalization();
  const [orderDate, setOrderDate] = useState('');

  const localeValue = settings.localization.locales.find(
    (locale_) => locale_.value === locale
  ).apiValue;

  const groupedOrder = [];

  if (order) {
    const groupedData = order.orderitem_set.reduce((groups, item) => {
      const { tracking_number } = item;
      if (!groups[tracking_number]) {
        groups[tracking_number] = [];
      }
      groups[tracking_number].push(item);
      return groups;
    }, {});

    const result = Object.values(groupedData);

    groupedOrder.push(...result);
  }

  useEffect(() => {
    if (!order) {
      return;
    }

    const shortDate = new Date(order.created_date).toLocaleDateString(
      localeValue,
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
    );
    setOrderDate(shortDate);
  }, [order, localeValue]);

  return (
    <div className="container my-5">
      {order ? (
        <div className="flex-1">
          <OrderDetailHeader
            title={t('account.my_orders.detail.title')}
            order={order}
          >
            <div data-testid="account-orders-detail-date">
              <span>{t('account.my_orders.detail.order_date')}</span>:{' '}
              {orderDate}
            </div>

            <div>
              <span className="text-base font-bold">
                {order.orderitem_set.length}{' '}
                {t('account.my_orders.detail.products')} {groupedOrder.length}{' '}
                {t('account.my_orders.detail.packages')}
              </span>
            </div>

            <div
              data-testid="account-orders-detail-address"
              className="break-words"
            >
              <span>{t('account.my_orders.detail.delivery_address')}</span>:{' '}
              {order?.shipping_address.line}{' '}
              {order?.shipping_address.district.name}{' '}
              {order?.shipping_address.township.name}{' '}
              {order?.shipping_address.city.name}
            </div>
          </OrderDetailHeader>

          <div>
            {groupedOrder.map((group, i) => {
              const orderStatus = getOrderStatus(
                group[0].status.value.toString(),
                t
              );

              return (
                <div className="border border-gray" key={i}>
                  <div className="border-b border-gray py-6 px-4 flex flex-col justify-between lg:items-center lg:flex-row">
                    <div className="flex items-center justify-start gap-x-3">
                      <span className="text-base font-semibold">
                        {t('account.my_orders.detail.package_no')}: {i + 1}
                      </span>

                      <span
                        className="text-xs"
                        data-testid="account-orders-detail-count"
                      >
                        ({group.length}{' '}
                        <span>{t('account.my_orders.detail.items')}</span>)
                      </span>
                    </div>

                    <div className="flex justify-between items-center lg:gap-x-12">
                      <div className="text-base">{orderStatus.label}</div>

                      {group[0].tracking_number && group[0].tracking_url && (
                        <Link href={group[0].tracking_url}>
                          <Button className="px-7" appearance="filled">
                            {t('account.my_orders.detail.track_shipment')}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="px-4 lg:px-7">
                    {group.map((item, index) => {
                      const itemStatus = getOrderStatus(
                        item.status.value.toString(),
                        t
                      );

                      return (
                        <div
                          className="flex flex-wrap justify-between py-6 border-b border-gray last:border-none"
                          key={index}
                        >
                          <div className="flex gap-3 mb-5 lg:mb-0">
                            <div className="flex-shrink-0">
                              <Link
                                className="block"
                                href={item.product.absolute_url}
                              >
                                <Image
                                  src={
                                    item.product.image
                                      ? item.product.image
                                      : '/noimage.jpg'
                                  }
                                  alt={item.product.name}
                                  width={112}
                                  height={150}
                                />
                              </Link>
                            </div>

                            <div className="flex flex-col justify-between lg:max-w-48">
                              <div className="text-sm">
                                <Link href={item.product.absolute_url}>
                                  {item.product.name}
                                </Link>
                              </div>

                              <div className="text-gray-900 text-xs">
                                {item.product.attributes.filterable_color && (
                                  <div>
                                    <span>
                                      {t('account.my_orders.detail.color')}
                                    </span>
                                    : {item.product.attributes.filterable_color}
                                  </div>
                                )}

                                {item.product.attributes.size && (
                                  <div>
                                    <span>
                                      {t('account.my_orders.detail.size')}
                                    </span>
                                    :{item.product.attributes.size}
                                  </div>
                                )}

                                <div>
                                  <span>
                                    {t('account.my_orders.detail.code')}
                                  </span>
                                  : {item.product.base_code}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-between w-full items-start lg:items-center lg:w-auto">
                            <div className="flex flex-col lg:items-center lg:flex-row">
                              <div
                                className={clsx(
                                  'mb-4 lg:mb-0 font-medium',
                                  itemStatus.className
                                )}
                              >
                                {itemStatus.label}
                              </div>

                              {(item.is_cancellable || item.is_refundable) &&
                                order.is_cancellable &&
                                item.status.value == '400' && (
                                  <div className="lg:ml-24">
                                    <Link
                                      href={`${ROUTES.ACCOUNT_ORDERS}/${order.id}/cancellation`}
                                    >
                                      <Button
                                        className="px-4 uppercase font-bold h-7"
                                        appearance="outlined"
                                        data-testid="account-orders-return-items"
                                      >
                                        {t(
                                          'account.my_orders.detail.return_this_item'
                                        )}
                                      </Button>
                                    </Link>
                                  </div>
                                )}
                            </div>

                            <div className="flex flex-col justify-center items-end lg:ml-6 lg:min-w-[7rem]">
                              {parseFloat(item.retail_price) >
                                parseFloat(item.price) && (
                                <Price
                                  className="font-normal line-through"
                                  value={item.retail_price}
                                />
                              )}

                              <Price
                                className={clsx('font-normal', {
                                  'text-secondary-600':
                                    parseFloat(item.retail_price) >
                                    parseFloat(item.price)
                                })}
                                value={item.price}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center mt-6 lg:flex-nowrap justify-end">
            <SalesContractModal data={order} />

            <div className="w-full lg:w-72 lg:ms-auto">
              <div className="flex justify-between text-sm text-black-700 mb-2">
                <p>
                  <span>{t('account.my_orders.detail.subtotal')}</span> (
                  {order?.orderitem_set.length}{' '}
                  <span>{t('account.my_orders.detail.items')}</span>)
                </p>

                <Price
                  className="font-normal min-w-max"
                  value={
                    parseFloat(order.amount_without_discount) -
                    parseFloat(order.shipping_amount)
                  }
                />
              </div>

              {order.discountitem_set &&
                order.discountitem_set.map((item, index) => (
                  <div
                    className="flex justify-between text-sm text-black-700 mb-2"
                    key={index}
                  >
                    <p>{item.name}</p>
                    <Price
                      className="font-normal min-w-max"
                      value={item.amount}
                      useNegative
                    />
                  </div>
                ))}

              <div className="flex justify-between text-sm text-black-700 uppercase mt-6 pt-2 border-gray border-t">
                <p>{t('account.my_orders.detail.total')}</p>

                <Price
                  className="font-normal min-w-max"
                  data-testid="account-orders-detail-total"
                  value={
                    parseFloat(order.amount) - parseFloat(order.shipping_amount)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-150 flex flex-col items-center justify-center p-6 w-full mb-8 md:flex-row">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="text-3xl mb-2">
              {t('account.anonymous_order.not_found.title')}
            </div>
            <div className="mb-2">
              <span>{t('account.anonymous_order.not_found.description')}</span>
            </div>
            <Link className="underline" href={ROUTES.ANONYMOUS_TRACKING}>
              {t('account.anonymous_order.not_found.button')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
