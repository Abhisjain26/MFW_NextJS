import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeHeroSliderContent from '@theme/views/widgets/home/banner-slider';

type HeroSliderItem = [
  {
    kwargs: {
      data_type: 'nested';
      value: {
        mobile_image: ImageType;
        image: ImageType;
      };
    };
    value: {
      url: string;
      mobile_image: string;
      alt: string;
      image: string;
      text: string;
      subtext: string;
    };
  }
];

type HomeHeroSliderType = {
  hero_slider: HeroSliderItem;
};

export default async function HomeHeroSlider() {
  const data = await getWidgetData<HomeHeroSliderType>({
    slug: 'home-hero-slider2'
  });

  return (
    <div >
      <HomeHeroSliderContent data={data} />
    </div>
  );
}