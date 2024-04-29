import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeMediaContent from '@theme/views/widgets/home/media-coverage';

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
    media_coverage: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeAdvertismentType>({
        slug: 'home-media-covergae'
    });

    return <HomeMediaContent data={data} />;
}

