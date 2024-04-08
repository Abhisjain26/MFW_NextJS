import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomePartnersContent from '@theme/views/widgets/home/home-partners-content';

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
            subtext: string,
        };
    }
];

type HomeLeapType = {
    home_partners: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'home-partners'
    });

    return <HomePartnersContent data={data} />;
}

