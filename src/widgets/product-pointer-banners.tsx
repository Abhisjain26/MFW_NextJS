import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import {
  PointerComponentProduct,
  PointerComponentProductItem
} from '@theme/types';

import ProductPointerBanner from '@theme/views/product-pointer-banner-item';

type ProductPointerBannersType = {
  product_pointer_banner_left: PointerComponentProduct;
  product_card_left: PointerComponentProductItem;
  product_pointer_banner_right: PointerComponentProduct;
  product_card_right: PointerComponentProductItem;
};

export default async function ProductPointerBanners() {
  const data = await getWidgetData<ProductPointerBannersType>({
    slug: 'product-pointer-banners'
  });

  return (
    <div className="container xl:gap-5 xl:flex my-8">
      <ProductPointerBanner
        productItem={data?.attributes?.product_card_left}
        productPointerItem={data?.attributes?.product_pointer_banner_left}
      />
      <ProductPointerBanner
        productItem={data?.attributes?.product_card_right}
        productPointerItem={data?.attributes?.product_pointer_banner_right}
      />
    </div>
  );
}
