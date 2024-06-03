import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import OrderSuccessfullContent from '@theme/views/widgets/order-successfull/index';

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
  order_successfull: HeroSliderItem;
};

export default async function HomeHeroSlider() {
  const data = await getWidgetData<HomeHeroSliderType>({
    slug: 'order-successfull'
  });

  return (
    <div >
      <OrderSuccessfullContent data={data} />
    </div>
  );
}