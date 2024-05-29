import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import ENTRYTANENTContent from '@theme/views/tanent';
import TANENTMIDDLEContent from '@theme/views/tanent/index.middle';

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
    hero_slider:HeroSalesItem;
};

export default async function HomeHeroSlider() {
    const data = await getWidgetData<HomeLeapType>({
        slug: 'key-tenant'
    });

    
    return <TANENTMIDDLEContent data={data} />;
}

