import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import ENTRYTANENTTOPContent from '@theme/views/tanent/index-top';

type SideItem = {
    value: string;
    data_type: 'dropdown';
};

type TargetBlank = {
    value: string;
    data_type: 'dropdown';
};


type JoinMallMenuItem = [
    {
        // TODO: Refactor this from commerce_proxy
        kwargs: {
            data_type: 'nested';
            value: {
                is_side_column_item?: SideItem;
                is_target_blank: TargetBlank;
                image:string;
            };
        };
        value: {
            is_side_column_item?: string;
            is_target_blank: string;
            name: string;
            redirect_url: string;
        };
    }
];

type HeroSalesItem = [
    {
        kwargs: {
            data_type: 'nested';
            image:string;
        };
        value: {
            name: string
        };
    }
];

type HomeLeapType = {
    first_column_title: HeroSalesItem;
    second_column_title: HeroSalesItem;
    third_column_title: HeroSalesItem;
    fourth_column_items: HeroSalesItem;
    image: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'anchor-tenant-price'
    });
    return <ENTRYTANENTTOPContent data={data} />;
}

