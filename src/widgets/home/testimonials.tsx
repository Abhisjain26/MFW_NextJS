import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeTestimonialsContent from '@theme/views/widgets/home/home-testimonials-content';

type HeroSalesItem = [
    {
        kwargs: {
            data_type: 'nested';
        };
        value: {
            text: string;
            subtext: string,
        };
    }
];

type HomeLeapType = {
    home_testimonials: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'testimonials'
    });

    return <HomeTestimonialsContent data={data} />;
}

