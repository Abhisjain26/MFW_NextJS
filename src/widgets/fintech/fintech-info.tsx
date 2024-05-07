import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import AboutContent from '@theme/views/widgets/about/about-content';
import FintechContent from '@theme/views/fintech/fintech-content-info';

type HeroSalesItem = [
    {
        kwargs: {
            data_type: 'nested';
            value: {
                mobile_image: ImageType;
                image: ImageType;
            subtext:string;

            };
        };
        value: {
            url: string;
            mobile_image: string;
            alt: string;
            image: string;
            text:string;
            subtext:string;
        };
    }
];

type HomeLeapType = {
    fintech_info: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'fintech-1'
    });

    return <FintechContent data={data} />;
}

