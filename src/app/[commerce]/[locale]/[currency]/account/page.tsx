'use client';

import { ContentHeader } from '@theme/views/account/content-header';
import {
  Accordion,
  TabPanel,
  Tabs,
  Skeleton,
  SkeletonWrapper,
  Link
} from '@theme/components';
import { Image } from '@akinon/next/components/image';
import { Trans } from '@akinon/next/components/trans';
import { useGetOrdersQuery } from '@akinon/next/data/client/account';
import { ROUTES } from '@theme/routes';
import { useGetWidgetQuery } from '@akinon/next/data/client/misc';
import { useGetAddressesQuery } from '@akinon/next/data/client/address';
import { useLocalization } from '@akinon/next/hooks';

export default function Page() {
  const { t } = useLocalization();

  const {
    data: address,
    isLoading: addressLoading,
    isSuccess: addressSuccess
  } = useGetAddressesQuery();
  const {
    data: orders,
    isLoading: orderLoading,
    isSuccess: orderSuccess
  } = useGetOrdersQuery({});
  const {
    data: faq,
    isLoading: faqLoading,
    isSuccess: faqSuccess
  } = useGetWidgetQuery('faq');
  const {
    data: discovery,
    isLoading: discoveryLoading,
    isSuccess: discoverySuccess
  } = useGetWidgetQuery('account-discovery');

  const filteredData = orders?.results?.map((item) => {
    return { label: item.number, value: item.id };
  });

  const defaultAddress = address?.results?.find(
    (address) => address.primary === true
  );

  return (
    <div className="hidden lg:block">
      <div className="bg-gray-150">
        {orderLoading && (
          <SkeletonWrapper className="w-full px-6 mb-12 h-28 items-center justify-center !flex-row xl:h-[5.5rem]">
            <Skeleton className="w-[11.375rem] h-16 mr-4 xl:w-[16rem] xl:h-10" />
            <Skeleton className="w-56 h-10 mr-4" />
            <Skeleton className="w-[12.75rem] h-10 xl:w-56" />
          </SkeletonWrapper>
        )}
        {orderSuccess && <ContentHeader orders={filteredData} />}
      </div>

      <div className="grid gap-7 grid-cols-6 ">
        <div className="border border-gray-200 pt-8 pb-6 px-8 text-center flex flex-col justify-between col-span-2">
          <h2 className="text-3xl xl:w-44 xl:mx-auto after:content-[''] after:w-16 after:h-[1px] after:bg-gray-300 after:block after:my-5 after:mx-auto">
            {t('account.base.widgets.address_book.title')}
          </h2>
          {addressLoading && (
            <SkeletonWrapper className="items-center justify-center">
              <Skeleton className="w-56 h-4" />
            </SkeletonWrapper>
          )}
          {addressSuccess && (
            <div className="text-xs">
              {defaultAddress ? (
                <p className="break-words">
                  {defaultAddress.line} / {defaultAddress.city.name}
                </p>
              ) : (
                <p>{t('account.base.widgets.address_book.content_first')}</p>
              )}
            </div>
          )}
          <p className="mt-10 text-xs">
            <Trans
              i18nKey="account.base.widgets.address_book.content_second"
              components={{
                Link: (
                  <Link href={ROUTES.ACCOUNT_ADDRESS} className="underline">
                    {t('account.base.widgets.address_book.link_title')}
                  </Link>
                )
              }}
            />
          </p>
        </div>

        <div className="border border-gray-200 pt-8 pb-6 px-8 text-center col-span-2">
          <h2 className="text-3xl xl:w-44 xl:mx-auto after:content-[''] after:w-16 after:h-[1px] after:bg-gray-300 after:block after:my-5 after:mx-auto">
            {t('account.base.widgets.gift_card.title')}
          </h2>
          <p className="text-xs">
            <Trans
              i18nKey="account.base.widgets.gift_card.content"
              components={{
                Link: (
                  <Link href={ROUTES.ACCOUNT_COUPONS} className="underline">
                    {t('account.base.widgets.gift_card.link_title')}
                  </Link>
                )
              }}
            />
          </p>
        </div>

        <div className="border border-gray-200 pt-8 pb-6 px-8 text-center flex flex-col justify-between col-span-2">
          <h2 className="text-3xl xl:w-44 xl:mx-auto after:content-[''] after:w-16 after:h-[1px] after:bg-gray-300 after:block after:mb-5 after:mt-14 after:mx-auto">
            {t('account.base.widgets.contact_us.title')}
          </h2>
          <p className="border-b border-gray-200 pb-4 text-xs">
            <Trans
              i18nKey="account.base.widgets.contact_us.content"
              components={{
                Link: (
                  <Link href={ROUTES.ACCOUNT_CONTACT} className="underline">
                    {t('account.base.widgets.contact_us.link_title')}
                  </Link>
                )
              }}
            />
          </p>
          <p className="pt-3">
            <Link href="tel:+902123270050" className="text-2xl">
              +90 212 327 00 50
            </Link>
          </p>
        </div>

        <div className="border border-gray-200 pt-8 pb-6 px-8 col-span-4">
          <h2 className="text-3xl w-44">
            {t('account.base.widgets.faq.title')}
          </h2>
          <p className="my-4 text-xs">
            {t('account.base.widgets.faq.content')}
          </p>
          {faqLoading && (
            <SkeletonWrapper className="gap-4">
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-full h-[8.375rem]" />
            </SkeletonWrapper>
          )}
          {faqSuccess && (
            <Tabs>
              {faq?.attributes?.faq_categories
                ?.filter((item) => item.value.is_top_five === 'yes')
                .map((item, index) => (
                  <TabPanel key={index} title={item.value.category}>
                    <div key={index}>
                      <div className="text-lg font-medium text-black-700 mb-4">
                        {item.value.category}
                      </div>
                      {faq?.attributes?.faq_contents
                        ?.filter((item) => item.value.is_top_five === 'yes')
                        .map((faq, index) => {
                          if (faq.value.category == item.value.category_id) {
                            return (
                              <Accordion title={faq.value.title} key={index}>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: faq.value.content
                                  }}
                                />
                              </Accordion>
                            );
                          }
                        })}
                    </div>
                  </TabPanel>
                ))}
            </Tabs>
          )}
        </div>

        <div className="col-span-2">
          {discoveryLoading && (
            <SkeletonWrapper>
              <Skeleton className="w-full h-[11.875rem] mb-1 xl:h-[14.75rem]" />
              <Skeleton className="w-48 h-4 mb-1" />
              <Skeleton className="w-24 h-4" />
            </SkeletonWrapper>
          )}

          {discoverySuccess && (
            <div>
              {discovery?.attributes?.account_discovery?.kwargs?.value?.image
                ?.url && (
                <Image
                  src={
                    discovery?.attributes?.account_discovery?.kwargs?.value
                      ?.image?.url
                  }
                  alt={discovery?.attributes?.account_discovery?.value?.text}
                  aspectRatio={432 / 304}
                  sizes="(min-width: 1170px) 320px,
                            (min-width: 1370px) 432px"
                  fill
                />
              )}
              <p>{discovery?.attributes?.account_discovery?.value?.text}</p>
              {discovery?.attributes?.account_discovery.value?.url && (
                <Link
                  href={discovery?.attributes?.account_discovery?.value?.url}
                  className="text-xs underline"
                >
                  {discovery?.attributes?.account_discovery?.value?.url_text}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
