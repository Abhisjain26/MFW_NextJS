import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import DigitalContent from '@theme/views/digital-health/digital-content-info';

type HeroSalesItem = [
    {
        kwargs: {
            data_type: 'nested';
            value: {
                mobile_image: ImageType;
                image: ImageType;
                subtext: string;

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

type HomeLeapType = {
    digital_info: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'digital-1'
    });

    return <DigitalContent data={data} />;
}


