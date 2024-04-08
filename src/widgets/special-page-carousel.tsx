'use client';

import React from 'react';
import { useGetWidgetQuery } from '@akinon/next/data/client/misc';
import { CarouselCore } from '@theme/components/carousel-core';
import { Image } from '@akinon/next/components/image';
import { Link } from '@theme/components';

export interface Props {
  slug: string;
}

export function SpecialPageCarousel(props: Props) {
  const { data } = useGetWidgetQuery(props.slug);

  if (data?.attributes?.special_page_category) {
    return (
      <CarouselCore
        responsive={{
          all: {
            breakpoint: { max: 5000, min: 0 },
            items: 2
          },
          medium: {
            breakpoint: { max: 3000, min: 640 },
            items: 4
          }
        }}
        arrows={false}
        swipeable={true}
        showDots={true}
        itemClass="pr-2.5"
      >
        {data.attributes.special_page_category.map((item, i) => (
          <div key={i.toString()}>
            <Link href={item.value.url ? item.value.url : '#'}>
              <Image
                src={item.kwargs.value.mobile_image.url}
                alt={item.value.alt}
                draggable={false}
                width={300}
                height={300}
                className="block md:hidden"
              />

              <Image
                src={item.kwargs.value.image.url}
                alt={item.value.alt}
                draggable={false}
                width={600}
                height={600}
                className="hidden md:block"
              />
              <div className="my-2 h-14">
                <span className="text-sm">{item.value.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </CarouselCore>
    );
  }

  return null;
}

export default SpecialPageCarousel;
