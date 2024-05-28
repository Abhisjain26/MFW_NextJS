import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import { ImageType } from '@akinon/next/types';
import AboutContent from '@theme/views/widgets/about/about-content';
import JoinMallForWoemanContent from '@theme/views/join-mall-for-women';

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
        };
        value: {
            name:string
        };
    }
];

type HomeLeapType = {
    first_column_title: HeroSalesItem;
    second_column_title: HeroSalesItem;
    first_column_table: JoinMallMenuItem;
    second_column_table: HeroSalesItem;
    third_column_table: HeroSalesItem;
    fourth_column_table: HeroSalesItem;
    fifth_column_table: HeroSalesItem;
    third_column_title: HeroSalesItem;
    third_column_items: HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'join-mall-for-women'
    });

    return <JoinMallForWoemanContent data={data} />;
}

