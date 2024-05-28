'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Style from './home-hero.module.css'

export default function HomeHeroSliderContent({ data }) {

  return (
    <div>
      <CarouselCore
        responsive={{
          all: {
            breakpoint: { max: 5000, min: 0 },
            items: 1
          }
        }}
        className='container rounded-1 container_mx'
        arrows={true}
        swipeable={true}
      >
        {data?.attributes?.hero_slider?.map((item, i) => (
          <div
            key={i}
            style={{
              backgroundImage: `url(${item.kwargs.value.image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '450px',
              borderRadius: '20px'
            }}
            className={`${Style.home_hero_slider}`}
          >
            <div className={`${Style.home_slider_title}`}>
              <h2 className='font_family_italic'><i>Designer</i></h2>
            </div>
            <div className={`${Style.home_slider_content}`}>
              <button><Link href="/list" className='font_family'>Shop Now</Link></button>
            </div>
          </div>
        ))}
      </CarouselCore>
    </div>
  );
}

