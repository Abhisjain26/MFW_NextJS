import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeThankYouContent from '@theme/views/widgets/home/home-thankyou-content';

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
            image: string,
            subtext: string,
            text: string;
        };
    }
];

type HomeAdvertismentType = {
    home_thankyou: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeAdvertismentType>({
        slug: 'thank-you'
    });

    return <HomeThankYouContent data={data} />;
}

