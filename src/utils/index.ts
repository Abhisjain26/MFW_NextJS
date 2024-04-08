export const getOrderStatus = (
  itemStatus: string,
  t: (path: string) => string
) => {
  const result = {
    label: '',
    className: 'text-black'
  } as {
    label: string;
    className?: string;
  };

  if (itemStatus === '50') {
    result.label = t('account.my_orders.status.cancel_requested');
  } else if (itemStatus === '100') {
    result.label = t('account.my_orders.status.cancelled');
  } else if (itemStatus === '200') {
    result.label = t('account.my_orders.status.order_waiting');
  } else if (itemStatus === '300') {
    result.label = t('account.my_orders.status.payment_waiting');
  } else if (itemStatus === '350') {
    result.label = t('account.my_orders.status.confirmation_waiting');
  } else if (itemStatus === '400') {
    result.label = t('account.my_orders.status.approved');
  } else if (itemStatus === '450') {
    result.label = t('account.my_orders.status.preparing');
  } else if (itemStatus === '500') {
    result.label = t('account.my_orders.status.shipped');
  } else if (itemStatus === '510') {
    result.label = t('account.my_orders.status.shipped_and_informed');
  } else if (itemStatus === '520') {
    result.label = t('account.my_orders.status.ready_for_pickup');
  } else if (itemStatus === '540') {
    result.label = t('account.my_orders.status.attempted_delivery');
  } else if (itemStatus === '550') {
    result.label = t('account.my_orders.status.delivered');
  } else if (itemStatus === '600') {
    result.label = t('account.my_orders.status.returned');
  }

  if (
    itemStatus === 'cancel' ||
    itemStatus === '100' ||
    itemStatus === '600' ||
    itemStatus === 'refund'
  ) {
    result.className = 'text-red-600';
  }

  if (
    itemStatus === '400' ||
    itemStatus === '450' ||
    itemStatus === '500' ||
    itemStatus === '550'
  ) {
    result.className = 'text-green';
  }

  return result;
};
