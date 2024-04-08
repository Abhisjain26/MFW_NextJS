import { ImageType } from '@akinon/next/types';

export type FooterSubscriptionFormType = {
  email: string;
  subscribe_contract: boolean;
};

export interface PointerComponentProduct {
  kwargs: {
    data_type: 'nested';
    value: {
      mobile_image: ImageType;
      desktop_image: ImageType;
    };
  };
  value: {
    mobile_image: string;
    banner_title_text: string;
    desktop_image: string;
    banner_button_text: string;
    position_content_over_image: string;
    normal_price: string;
    url: string;
    reduced_price: string;
    banner_title_color: string;
    banner_button_icon: string;
    banner_description_color: string;
    product_button_mobile_position_left: string;
    banner_button_bg_color: string;
    product_button_mobile_position_top: string;
    product_button_desktop_position_top: string;
    slider_banner_product_button: string;
    product_button_desktop_position_left: string;
    alt: string;
    banner_button_text_color: string;
  };
}

export interface PointerComponentProductItem {
  kwargs: {
    data_type: 'nested';
    value: {
      card_image: ImageType;
    };
  };
  value: {
    banner_title_text: string;
    banner_title_color: string;
    normal_price: string;
    url: string;
    reduced_price: string;
    banner_button_text: string;
    banner_button_icon: string;
    card_image: string;
    banner_button_bg_color: string;
    banner_button_text_color: string;
    alt: string;
  };
}

export type AccountDiscoveryItem = {
  kwargs: {
    data_type: 'nested';
    value: {
      mobile_image: ImageType;
      image: ImageType;
    };
  };
  value: {
    url: string;
    text: string;
    image: string;
    url_text: string;
  };
};

export type AccountFaqItem = {
  faq_categories: [
    {
      kwargs: {
        data_type: 'nested';
        value: {
          is_top_five: {
            data_type: string;
            value: string;
          };
        };
      };
      value: {
        category: string;
        category_id: string;
        is_top_five: string;
      };
    }
  ];
  faq_contents: [
    {
      kwargs: {
        data_type: 'nested';
        value: {
          is_top_five: {
            data_type: string;
            value: string;
          };
        };
      };
      value: {
        category: string;
        content: string;
        is_top_five: string;
        title: string;
      };
    }
  ];
};
