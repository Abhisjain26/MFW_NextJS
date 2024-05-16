'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import Title from './title';

export default function HomeTestimonialsContent({ data }) {

    return (
        <Wrapper>
            <div className='partner_content testimonials_content container container_mx'>
                <div className="leaf-right">
                    <Image width={50} height={70} src={'images/home/leaf-right.svg'} className='leaf_right_testimonials' alt="Leaf" />
                </div>
                <Title title={"TESTIMONIALS"} />
                <div className='relative'>
                    <CarouselCore
                        responsive={{
                            all: {
                                breakpoint: { max: 6000, min: 0 },
                                items: 3
                            },
                            mobile: {
                                breakpoint: { max: 768, min: 0 },
                                items: 1
                            }
                        }}
                        // className='flex justify-center w-full gap-10'
                        arrows={true}
                        swipeable={true}
                    >
                        {data?.attributes?.home_testimonials?.map((item, i) => (
                            <div key={i} className='home_testimonials_card'>
                                <div className='home_testimonials_text'>{item.value.text}
                                    <Image width={10} src={"images/home/top_testimonials.png"} className='top_testimonials' height={10} alt={""} />
                                    <Image width={10} src={"images/home/bottom_testimonials.png"} className='bottom_testimonials' height={10} alt={""} />
                                </div>
                                <div className='home_testimonials_subtext relative'>
                                    <h2>{item.value.subtext}</h2>
                                </div>
                            </div>
                        ))}
                    </CarouselCore>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = Styled.section`
.partner_content{
    position:relative;
}
.leaf_right_testimonials{
    position:absolute;
        top:-30px;
        right:-75px;
        z-index:1;
}
  .home_testimonials_card{
      background-color:#F3F3F3;
      padding:40px 20px 20px;
      border-radius:10px;
      height:100%;
      width:auto;
    }
    .top_testimonials{
        position:absolute;
        top:-20px;
        left:40px;
        z-index:1;
    }
    .bottom_testimonials{
        position:absolute;
        bottom:-30px;
        z-index:1;
        right:0;
    }
    .home_testimonials_text{
        position:relative;
        padding-left: 60px;
        font-size: 14px;
        text-align:end;
  }
  .home_testimonials_subtext{
    font-weight:700;
    text-align:end;
    margin-top:40px;    
  }
  .react-multi-carousel-track {
    /* gap:20px; */
    width:100%;
  }
  /* .react-multi-carousel-item  {
    width:320px !important;
  } */
  .react-multiple-carousel__arrow--right {
    right: calc(0% + 1px);
  }
  .react-multiple-carousel__arrow--left {
    left: calc(0% + 1px);
  }
  @media screen and (max-width:768px) {
    .home_testimonials_card{
        padding:40px 20px;
    }
    .home_testimonials_text{
        padding-left:0;
        text-align:center;
    }
    .react-multi-carousel-track {
        gap:0;
    }
    .top_testimonials{
        left:0;
    }
    .bottom_testimonials{
        right:0;
    }
  }
  @media screen and (max-width:2400px) and (min-width:1300px) {
    .leaf_right_testimonials{
        right:-20px;
        width: 60px;
        height:auto;
        display:none;
    }
    .top_testimonials,.bottom_testimonials{
        width:20px;
    }
  
    .top_testimonials{
        width:20px;
    }
}

`