import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeSubscribeContent from '@theme/views/widgets/home/subscribe';

type HeroSalesItem = [
    {
        kwargs: {
            data_type: 'nested';
            value: {
                mobile_image: ImageType;
                image: ImageType;
            };
        };
        value: {
            title:string,
            subtext:string,
            text: string;
        };
    }
];

type HomeAdvertismentType = {
    home_subscribe: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeAdvertismentType>({
        slug: 'home-subscribe'
    });

    return <HomeSubscribeContent data={data} />;
}

