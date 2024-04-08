import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeLucmoWinesContent from '@theme/views/widgets/home/home-lucmo-wines-content';

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
            url: string;
            mobile_image: string;
            alt: string;
            image: string;
            text: string;
        };
    }
];

type HomeAdvertismentType = {
    home_advertisment: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeAdvertismentType>({
        slug: 'lucmo-wines'
    });

    return <HomeLucmoWinesContent data={data} />;
}

