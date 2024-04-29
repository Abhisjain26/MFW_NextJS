import 'server-only';

import { ImageType } from '@akinon/next/types';
import { getWidgetData } from '@akinon/next/data/server';
import { Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';
import HomeengStories from '@theme/views/widgets/home/home-eng-stories-content';

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



export default async function HomeStoriesEng() {
  const data = await getWidgetData<HomeStoriesEngType>({
    slug: 'home-storieseng'
  });
 
return <HomeengStories data={data} />
  // const TitleSection = () => (
  //   <>
  //     {data?.attributes?.mobileTitle ? (
  //       <h2 className="text-5xl text-center font-light px-11 mb-2 lg:hidden">
  //         {data?.attributes?.mobileTitle?.value}
  //       </h2>
  //     ) : null}
  //     {data?.attributes?.mobileSubtitle ? (
  //       <p className="text-sm text-center mb-2 lg:hidden">
  //         {data?.attributes?.mobileSubtitle?.value}
  //       </p>
  //     ) : null}
  //   </>
  // );

  // const MobileLinks = () => (
  //   <ul className="flex justify-center text-sm font-medium underline mb-4 lg:hidden">
  //     {data?.attributes?.mobileLinks?.map((item, index) => {
  //       return (
  //         <li
  //           className="mr-4 first:ml-4"
  //           key={`${item?.value?.text}__${index}`}
  //         >
  //           <Link href={item?.value?.url}>{item?.value?.text}</Link>
  //         </li>
  //       );
  //     })}
  //   </ul>
  // );

  // return (
  //   <section className="my-8 container container_mx">

  //     <TitleSection />
  //     <MobileLinks />
     
  //   </section>
  // );
}


