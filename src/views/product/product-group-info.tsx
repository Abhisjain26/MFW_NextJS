'use client';

import React, { useEffect, useState } from 'react';
import Share from '@theme/views/share';
import { AccordionWrapper, CombineProductCard } from '@theme/views/product';
import { ProductPageProps } from './layout';

export default function ProductGroupInfo({
  data,
  deliveryReturn
}: ProductPageProps) {
  const [currentUrl, setCurrentUrl] = useState(null);

  const shareButtonItemProps = {
    iconSize: 18,
    className: 'px-2 py-2 h-10 flex items-center hover:bg-gray-100'
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [currentUrl]);

  return (
    <>
      <div className="flex items-center justify-between mb-5 border-b border-gray-300 mt-10 lg:mt-0">
        <h1 className="text-2xl">{data.product.name}</h1>
        <Share
          buttonClassName="border-none hover:bg-gray-100"
          items={[
            {
              href: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
              iconName: 'facebook',
              ...shareButtonItemProps
            },
            {
              href: `https://twitter.com/intent/tweet?text=${currentUrl}`,
              iconName: 'twitter',
              ...shareButtonItemProps
            },
            {
              href: `https://api.whatsapp.com/send?text=${data.product.name}%20${currentUrl}`,
              iconName: 'whatsapp',
              ...shareButtonItemProps
            }
          ]}
        />
      </div>
      <div className="space-y-10 mb-10">
        {data.group_products.map((groupProduct, index) => (
          <div key={groupProduct.pk}>
            <CombineProductCard
              index={index}
              product={groupProduct}
              in_stock={groupProduct.in_stock}
            />
          </div>
        ))}
      </div>

      <AccordionWrapper data={data} deliveryReturn={deliveryReturn} />
    </>
  );
}
