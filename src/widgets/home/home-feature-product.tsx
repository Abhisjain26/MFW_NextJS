import 'server-only';

import { ImageType } from '@akinon/next/types';
import { getWidgetData } from '@akinon/next/data/server';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';
import { useRef } from 'react';
import { getListData } from '@akinon/next/data/server';
import { PageProps } from '@akinon/next/types';
import { useSearchParams } from 'next/navigation';

type StoryData = {
  value: {
    url: string;
    alt: string;
    image: string;
  };
  kwargs: {
    data_type: 'nested';
    value: {
      image: ImageType;
    };
  };
};

type MobileLinks = {
  value: {
    url: string;
    text: string;
  };
};

type HomeStoriesEngType = {
  mobileTitle?: {
    value: string;
  };
  mobileSubtitle?: {
    value: string;
  };
  stories: StoryData[];
  mobileLinks: MobileLinks[];
};


export default async function HomeStoriesEng({ searchParams }: PageProps) {
  const data = await getListData({ searchParams });



//   const TitleSection = () => (
//     <>
//       {data?.attributes?.mobileTitle ? (
//         <h2 className="text-5xl text-center font-light px-11 mb-2 lg:hidden">
//           {data?.attributes?.mobileTitle?.value}
//         </h2>
//       ) : null}
//       {data?.attributes?.mobileSubtitle ? (
//         <p className="text-sm text-center mb-2 lg:hidden">
//           {data?.attributes?.mobileSubtitle?.value}
//         </p>
//       ) : null}
//     </>
//   );

//   const MobileLinks = () => (
//     <ul className="flex justify-center text-sm font-medium underline mb-4 lg:hidden">
//       {data?.attributes?.mobileLinks?.map((item, index) => {
//         return (
//           <li
//             className="mr-4 first:ml-4"
//             key={`${item?.value?.text}__${index}`}
//           >
//             <Link href={item?.value?.url}>{item?.value?.text}</Link>
//           </li>
//         );
//       })}
//     </ul>
//   );

  return (
    <section className="my-8">
      Hello
      {/* <FeatureComponent /> */}
      {/* <TitleSection />
      <MobileLinks /> */}

      <div className="flex items-center overflow-x-auto pb-4 md:justify-center">
        {/* {data?.attributes?.stories?.map((story, index) => {
          return (
            <div
              className="mr-4 flex-shrink-0 first:ms-4 w-32 md:w-32"
              key={`story__${index}`}
            >
              <Link href={story?.value?.url} aria-label={story?.value?.alt}>
                <Image
                  src={story?.kwargs?.value?.image?.url}
                  alt={story?.value?.alt}
                  aspectRatio={1}
                  sizes="(max-width: 768px) 112px, 140px"
                  imageClassName="rounded-full mb-2" // TODO: Fix width and height
                  fill
                />
              </Link>

              <Link
                href={story?.value?.url}
                className="block text-center underline text-sm font-medium"
                aria-label={story?.value?.alt}
              >
                {story?.value?.alt}
              </Link>
            </div>
          );
        })} */}
      </div>
      {/* </CarouselCore> */}
    </section>
  );
}


