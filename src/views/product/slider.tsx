'use client';

import React, { useState, useRef } from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Icon } from '@theme/components';
import { Product } from '@akinon/next/types';
import { Image } from '@akinon/next/components/image';
import useFavButton from '../../hooks/use-fav-button';

type ProductSliderItem = {
  product: Product;
};

export default function ProductInfoSlider({ product }: ProductSliderItem) {
  const { FavButton } = useFavButton(product.pk);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrev = () => {
    carouselRef.current?.previous();
  };

  const goToNext = () => {
    carouselRef.current?.next();
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    carouselRef.current?.goToSlide(index);
  };

  return (
    <div className="flex relative items-start">
      <div className="flex flex-col items-center justify-center md:mr-4">
        <div
          onClick={goToPrev}
          className="flex justify-center p-2 mb-3 border border-gray-100 rounded-full cursor-pointer hidden md:block"
        >
          <Icon name="chevron-up" size={15} className="fill-[#000000]" />
        </div>
        <div className="flex flex-col items-center overflow-hidden space-y-2 w-[80px] h-[620px] hidden md:block">
          {product?.productimage_set?.map((item, index) => (
            <Image
              key={index}
              src={item.image}
              alt={`Thumbnail ${index}`}
              width={80}
              height={128}
              className="cursor-pointer py-5 first:py-0"
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
        <div
          onClick={goToNext}
          className="flex justify-center p-2 mt-3 border border-gray-100 rounded-full cursor-pointer hidden md:block"
        >
          <Icon name="chevron-down" size={15} className="fill-[#000000]" />
        </div>
      </div>
      <FavButton className="absolute right-8 top-6 z-[20] sm:hidden" />
      <CarouselCore
        responsive={{
          all: {
            breakpoint: { max: 5000, min: 0 },
            items: 1
          }
        }}
        arrows={false}
        swipeable={true}
        ref={carouselRef}
        className="w-full"
      >
        {product?.productimage_set?.map((item, i) => (
          <Image
            key={i}
            src={item.image}
            alt={product.name}
            draggable={false}
            aspectRatio={368 / 560}
            sizes="(min-width: 425px) 512px,
                  (min-width: 601px) 576px,
                  (min-width: 768px) 336px,
                  (min-width: 1024px) 480px, 368px"
            fill
          />
        ))}
      </CarouselCore>
    </div>
  );
}
