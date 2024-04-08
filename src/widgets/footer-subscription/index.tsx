import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';

import FooterSubscriptionForm from './footer-subscription-form';

type FooterSubscriptionType = {
  description: {
    value: string;
  };
  title: {
    value: string;
  };
};

export default async function FooterSubscription() {
  const data = await getWidgetData<FooterSubscriptionType>({
    slug: 'footer-subscription'
  });

  return (
    <div className="py-4 border-t md:border-t-0 lg:pl-7">
      <h3 className="mb-1 text-xs font-medium">
        {data?.attributes?.title?.value}
      </h3>
      <p className="mb-2 text-xs">{data?.attributes?.description?.value}</p>
      <FooterSubscriptionForm />
    </div>
  );
}
