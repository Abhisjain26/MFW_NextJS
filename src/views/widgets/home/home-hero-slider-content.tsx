'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Styled from 'styled-components';

export default function HomeHeroSliderContent({ data }) {

  return (
    <Wrapper>
      <CarouselCore
        responsive={{
          all: {
            breakpoint: { max: 5000, min: 0 },
            items: 1
          }
        }}
        className='container rounded-1'
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
            className='home_hero_slider'
          >
            <div className="home_slider_title">
              <h2><i>Designer</i></h2>
            </div>
            <div className='home_slider_content'>
              <button><Link href="/list">Shop Now</Link></button>
            </div>
          </div>
        ))}
      </CarouselCore>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
  
  @media screen and (max-width:767px) {
    
  } 
`