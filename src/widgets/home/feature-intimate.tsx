import { getCategoryData, getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import HomeFeatureIntimateContent from '@theme/views/widgets/home/home-feature-intimate-content';
import { GetCategoryResponse } from '@akinon/next/types';

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
            text: string;
        };
    }
];

type HomeLeapType = {
    home_feature_intimate: HeroSalesItem;
};

export default async function HomeHeroSlider() {

    // const datas = await getWidgetData<HomeLeapType>({
    //     slug: 'feature-intimate'
    // });

    return <HomeFeatureIntimateContent  />;
    
}
