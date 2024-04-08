import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeDiscountContent from '@theme/views/widgets/home/home-discount-content';

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
        };
    }
];

type HomeLeapType = {
    home_banner: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'exclusive-discount'
    });

    return <HomeDiscountContent data={data} />;
}

