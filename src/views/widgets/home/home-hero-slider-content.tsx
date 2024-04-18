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
        className='max-container rounded-1'
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
              height: '540px',
              borderRadius: '20px'
            }}
            className='home_hero_slider'
          >
            <div className='home_slider_content'>
              <h2>{item.value.text}</h2>

            </div>
          </div>
        ))}
      </CarouselCore>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
  .home_hero_slider{
    position:relative;
    margin-top:20px;
  }
  .home_slider_content{
    position:absolute;
    top:50%;
    left:10px;
    transform:translateY(-50%);
  }
  @media screen and (max-width:767px) {
    .home_hero_slider{
      margin-top:0px;
    }
  } 
`