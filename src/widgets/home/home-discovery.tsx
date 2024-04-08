import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';

import { Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';

type DiscoveryItem = {
  // TODO: Refactor this from commerce_proxy
  kwargs: {
    data_type: 'nested';
    value: {
      mobile_image: ImageType;
      image: ImageType;
    };
  };
  value: {
    mobile_image?: string;
    link_url: string;
    link_name: string;
    image: string;
    text_desc: string;
    alt: string;
  };
};

type HomeDiscoveryType = {
  discovery_left: DiscoveryItem;
  discovery_top_right: DiscoveryItem;
  discovery_bottom_right: DiscoveryItem;
};

export default async function HomeDiscovery() {
  const data = await getWidgetData<HomeDiscoveryType>({
    slug: 'home-discovery'
  });

  return (
    <div className="container flex flex-col justify-center mx-auto md:flex-row my-8">
      <div className="mb-8 lg:w-7/12 sm:mr-4 md:mb-0 lg:mr-8">
        <div className="w-full h-full">
          <div className="relative">
            {data?.attributes?.discovery_left?.value && (
              <Link href={data?.attributes?.discovery_left?.value?.link_url}>
                <Image
                  src={
                    data?.attributes?.discovery_left?.kwargs?.value
                      ?.mobile_image?.url
                  }
                  alt={data?.attributes?.discovery_left?.value?.alt}
                  aspectRatio={670 / 765}
                  sizes="670px"
                  className="block md:hidden"
                  fill
                />
                <Image
                  src={
                    data?.attributes?.discovery_left?.kwargs?.value?.image?.url
                  }
                  alt={data?.attributes?.discovery_left?.value?.alt}
                  aspectRatio={670 / 765}
                  sizes="670px"
                  className="hidden md:block"
                  fill
                />
              </Link>
            )}

            <div className="absolute flex justify-center w-full py-2 text-white capitalize bg-black bottom-16">
              <span>Summer Sale</span>

              <span className="px-4 mx-4 text-red-500 border-l border-r border-white">
                70% Off
              </span>

              <span>3 Weeks Only</span>
            </div>
          </div>

          <p className="block px-4 pt-2 text-sm md:inline md:mr-2 md:p-0">
            {data?.attributes?.discovery_left?.value?.text_desc}
          </p>

          <Link
            href={data?.attributes?.discovery_left?.value?.link_url}
            className="block px-4 text-sm font-medium underline md:inline md:px-0"
          >
            {data?.attributes?.discovery_left?.value?.link_name}
          </Link>
        </div>
      </div>

      <div className="lg:w-5/12 md:flex md:flex-col md:justify-between">
        <div className="mb-8 md:mb-0">
          <div>
            {data?.attributes?.discovery_top_right?.value && (
              <Link
                href={data?.attributes?.discovery_top_right?.value?.link_url}
              >
                <Image
                  src={
                    data?.attributes?.discovery_top_right?.kwargs?.value
                      ?.mobile_image?.url
                  }
                  alt={data?.attributes?.discovery_top_right?.value?.alt}
                  aspectRatio={470 / 345}
                  sizes="470px"
                  className="block md:hidden"
                  fill
                />

                <Image
                  src={
                    data?.attributes?.discovery_top_right?.kwargs?.value?.image
                      ?.url
                  }
                  alt={data?.attributes?.discovery_top_right?.value?.alt}
                  aspectRatio={470 / 345}
                  sizes="100vw"
                  className="hidden md:block"
                  fill
                />
              </Link>
            )}
          </div>

          <p className="block px-4 pt-2 text-sm md:inline md:mr-2 md:p-0">
            {data?.attributes?.discovery_top_right?.value?.text_desc}
          </p>

          {data?.attributes?.discovery_top_right?.value && (
            <Link
              href={data?.attributes?.discovery_top_right?.value?.link_url}
              className="block px-4 text-sm font-medium underline md:inline md:px-0"
            >
              {data?.attributes?.discovery_top_right?.value?.link_name}
            </Link>
          )}
        </div>

        <div>
          <div>
            {data?.attributes?.discovery_bottom_right?.value && (
              <Link
                href={data?.attributes?.discovery_bottom_right?.value?.link_url}
              >
                <Image
                  src={
                    data?.attributes?.discovery_bottom_right?.kwargs?.value
                      ?.mobile_image?.url
                  }
                  alt={data?.attributes?.discovery_bottom_right?.value?.alt}
                  aspectRatio={470 / 345}
                  sizes="470px"
                  className="block md:hidden"
                  fill
                />

                <Image
                  src={
                    data?.attributes?.discovery_bottom_right?.kwargs?.value
                      ?.image?.url
                  }
                  alt={data?.attributes?.discovery_bottom_right?.value?.alt}
                  aspectRatio={470 / 345}
                  sizes="100vw"
                  className="hidden md:block"
                  fill
                />
              </Link>
            )}
          </div>

          <p className="block px-4 pt-2 text-sm md:inline md:mr-2 md:p-0">
            {data?.attributes?.discovery_bottom_right?.value?.text_desc}
          </p>

          {data?.attributes?.discovery_bottom_right?.value && (
            <Link
              href={data?.attributes?.discovery_bottom_right?.value?.link_url}
              className="block px-4 text-sm font-medium underline md:px-0 md:inline"
            >
              {data?.attributes?.discovery_bottom_right?.value?.link_name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
