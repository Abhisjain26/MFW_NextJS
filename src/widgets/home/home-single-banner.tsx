import 'server-only';

import { Link } from '@theme/components';
import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import { Image } from '@akinon/next/components/image';

type SingleBannerTextItem = {
  value: {
    content: string;
    link_url: string;
    link_name: string;
    title: string;
  };
};

type SingleBannerItem = {
  kwargs: {
    data_type: 'nested';
    value: {
      mobile_image: ImageType;
      image: ImageType;
    };
  };

  value: {
    mobile_image?: string;
    url: string;
    alt: string;
  };
};

type HomeSingleBannerType = {
  text_overlay: SingleBannerTextItem;
  single_banner: SingleBannerItem;
};

export default async function HomeSingleBanner() {
  const data = await getWidgetData<HomeSingleBannerType>({
    slug: 'home-single-banner'
  });

  return (
    <div className="container container_mx relative">
      {data?.attributes?.single_banner?.value && (
        <Link
          href={data?.attributes?.single_banner?.value?.url}
          className="mb-7 block"
        >
          <Image
            src={
              data?.attributes?.single_banner?.kwargs?.value?.mobile_image?.url
            }
            alt={data?.attributes?.single_banner?.value?.alt}
            aspectRatio={670 / 870}
            sizes="670px"
            fill
          />

          <Image
            src={data?.attributes?.single_banner?.kwargs?.value?.image?.url}
            alt={data?.attributes?.single_banner?.value?.alt}
            aspectRatio={1370 / 480}
            sizes="1370px"
            fill
          />
        </Link>
      )}
      <div className="text-center lg:max-w-md lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-56 lg:transform">
        <h3 className="text-2xl font-light mb-5 lg:text-5xl">
          {data?.attributes?.text_overlay?.value?.title}
        </h3>
        <p className="text-sm mb-3">
          {data?.attributes?.text_overlay?.value?.content}
        </p>
        {data?.attributes?.text_overlay?.value?.link_url && (
          <Link
            href={data?.attributes?.text_overlay?.value?.link_url}
            className="text-sm font-medium underline"
          >
            {data?.attributes?.text_overlay?.value?.link_name}
          </Link>
        )}
      </div>
    </div>
  );
}
