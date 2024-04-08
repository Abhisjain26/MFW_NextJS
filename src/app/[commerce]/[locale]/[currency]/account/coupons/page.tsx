'use client';

import { CouponItem } from '@theme/views/coupon-item';
import { LoaderSpinner } from '@theme/components';
import {
  useGetBasketOffersQuery,
  useGetFutureBasketOffersQuery,
  useGetExpiredBasketOffersQuery,
  useGetDiscountItemsQuery
} from '@akinon/next/data/client/account';
import { useLocalization } from '@akinon/next/hooks';

export default function Page() {
  const { t } = useLocalization();
  const {
    data: basketOffers,
    isLoading: basketOffersLoading,
    isSuccess: basketOffersSuccess
  } = useGetBasketOffersQuery();

  const {
    data: futureBasketOffers,
    isLoading: futureBasketOffersLoading,
    isSuccess: futureBasketOffersSuccess
  } = useGetFutureBasketOffersQuery();

  const {
    data: expiredBasketOffers,
    isLoading: expiredBasketOffersLoading,
    isSuccess: expiredBasketOffersSuccess
  } = useGetExpiredBasketOffersQuery();

  const {
    data: discountItems,
    isLoading: discountItemsLoading,
    isSuccess: discountItemsSuccess
  } = useGetDiscountItemsQuery();

  return (
    <div>
      <div className="bg-gray-150 p-4 lg:p-8">
        <h2 className="text-3xl text-center">
          {t('account.my_vouchers.header.title')}
        </h2>
        <p className="text-center mt-5">
          {t('account.my_vouchers.header.subtitle')}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="border border-gray-500 mt-5 p-6 w-full lg:px-24 lg:py-10 relative h-full">
          {basketOffersLoading && <LoaderSpinner className="mb-8" />}
          {basketOffersSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.campaings.active')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={basketOffers.discounts}
              offerType="coupon"
              values={['label', 'start_datetime', 'end_datetime', 'amount']}
              emptyText={t('account.my_vouchers.card.empty_campaign')}
            />
          )}

          {futureBasketOffersLoading && <LoaderSpinner className="mb-8" />}
          {futureBasketOffersSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.campaings.to_be_active')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={futureBasketOffers.results}
              offerType="coupon"
              values={['label', 'start_datetime', 'end_datetime', 'amount']}
              emptyText={t('account.my_vouchers.card.empty_campaign')}
            />
          )}

          {expiredBasketOffersLoading && <LoaderSpinner className="mb-8" />}
          {expiredBasketOffersSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.campaings.expired')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={expiredBasketOffers.results}
              offerType="coupon"
              values={['label', 'start_datetime', 'end_datetime', 'amount']}
              emptyText={t('account.my_vouchers.card.empty_campaign')}
            />
          )}

          {discountItemsLoading && <LoaderSpinner className="mb-8" />}
          {discountItemsSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.campaings.used')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={discountItems.discounts}
              offerType="coupon"
              values={['label', 'created_date', 'order_number', 'amount']}
              emptyText={t('account.my_vouchers.card.empty_campaign')}
            />
          )}

          {basketOffersLoading && <LoaderSpinner className="mb-8" />}
          {basketOffersSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.coupons.active')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={basketOffers.discounts}
              offerType="coupon_code"
              values={[
                'voucher_code',
                'start_datetime',
                'end_datetime',
                'amount'
              ]}
              emptyText={t('account.my_vouchers.card.empty_coupon')}
            />
          )}

          {futureBasketOffersLoading && <LoaderSpinner className="mb-8" />}
          {futureBasketOffersSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.coupons.to_be_active')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={futureBasketOffers.discounts}
              offerType="coupon_code"
              values={[
                'voucher_code',
                'start_datetime',
                'end_datetime',
                'amount'
              ]}
              emptyText={t('account.my_vouchers.card.empty_coupon')}
            />
          )}

          {expiredBasketOffersLoading && <LoaderSpinner className="mb-8" />}
          {expiredBasketOffersSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.coupons.expired')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={expiredBasketOffers.results}
              offerType="coupon_code"
              values={[
                'voucher_code',
                'start_datetime',
                'end_datetime',
                'amount'
              ]}
              emptyText={t('account.my_vouchers.card.empty_coupon')}
            />
          )}

          {discountItemsLoading && <LoaderSpinner className="mb-8" />}
          {discountItemsSuccess && (
            <CouponItem
              mainTitle={t('account.my_vouchers.title.coupons.used')}
              subTitles={[
                t('account.my_vouchers.card.campaign_name'),
                t('account.my_vouchers.card.starting_date'),
                t('account.my_vouchers.card.expiration_date'),
                t('account.my_vouchers.card.amount')
              ]}
              data={discountItems.discounts}
              offerType="coupon_code"
              values={[
                'voucher_code',
                'created_date',
                'order_number',
                'amount'
              ]}
              emptyText={t('account.my_vouchers.card.empty_coupon')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
