// import Breadcrumb from '@theme/views/breadcrumb';
import { ProductInfoSlider } from '@theme/views/product';
import { BreadcrumbResultType, ProductResult } from '@akinon/next/types';

interface DeliveryReturnItem {
  product_delivery_returns?: {
    value: string;
    kwargs: object;
  };
}

export interface ProductPageProps {
  children?: React.ReactNode;
  data: ProductResult;
  // breadcrumbData?: BreadcrumbResultType[];
  deliveryReturn?: DeliveryReturnItem | null;
}

export default async function ProductLayout({
  data,
  // breadcrumbData,
  children
}: ProductPageProps) {
  return (
    <div className="container mx-auto">
      <div className="max-w-5xl mx-auto my-5 px-7">
        {/* <Breadcrumb breadcrumbList={breadcrumbData} /> */}
      </div>
      <div className="grid max-w-5xl grid-cols-2 lg:gap-8 mx-auto px-7">
        <div className="col-span-2 lg:col-span-1">
          <ProductInfoSlider product={data.product} />
        </div>
        <div className="flex flex-col items-center col-span-2 lg:col-span-1">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
