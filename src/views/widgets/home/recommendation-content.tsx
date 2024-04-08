'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { ProductItem } from '@theme/views/product-item';
import { Icon } from '@theme/components';
import { useRef } from 'react';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 2
  }
};

export default function RecommendationContent({ data }) {
  const carouselRef = useRef(null);

  const goToPrev = () => {
    carouselRef.current.previous();
  };

  const goToNext = () => {
    carouselRef.current.next();
  };

  return (
    data?.products && (
      <div className="container my-8">
        {data?.attributes?.title?.value && (
          <div className="text-2xl text-secondary font-light lg:mb-2">
            {data?.attributes?.title.value}
          </div>
        )}
        <div className="flex items-center relative">
          <div className="justify-center items-center z-10">
            <div
              onClick={goToPrev}
              className="flex justify-center cursor-pointer bg-secondary rounded-full p-2.5 mr-2"
            >
              <Icon name="chevron-start" size={18} className="fill-[#FFFFFF]" />
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <CarouselCore
              ref={carouselRef}
              swipeable={true}
              responsive={responsive}
              arrows={false}
              itemClass="pr-2.5"
            >
              {data?.products?.map((product, index) => (
                <div key={product.pk}>
                  <ProductItem
                    product={product}
                    width={272}
                    height={416}
                    index={index}
                  />
                </div>
              ))}
            </CarouselCore>
          </div>
          <div className="justify-center items-center z-10 ml-2">
            <div
              onClick={goToNext}
              className="flex justify-center cursor-pointer bg-secondary rounded-full p-2.5"
            >
              <Icon name="chevron-end" size={18} className="fill-[#FFFFFF]" />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
