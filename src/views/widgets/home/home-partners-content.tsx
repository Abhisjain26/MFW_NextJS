'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import Title from './title';

export default function HomePartnersContent({ data }) {

    return (
        <Wrapper>
            <div className='partner_content relative '>
                <Title title={"Our Strategic Partners"} />
                <div className=''>
                    <Image src={"images/home/rectangle-left.png"} className='rectanagle_left' width={100} height={100} alt='' />
                    <Image src={"images/home/rectangle-right.png"} className='rectanagle_right' width={100} height={100} alt='' />
                    <CarouselCore
                        responsive={{
                            all: {
                                breakpoint: { max: 5000, min: 0 },
                                items: 6
                            },
                            table:{
                                breakpoint: { max: 1023, min: 0 },
                                items: 3
                            },
                            mobile: {
                                breakpoint: { max: 767, min: 0 },
                                items: 1
                            }
                        }}
                        className='flex justify-center w-full gap-10'
                        arrows={true}
                        swipeable={true}
                        infinite={true}
                    >
                        {data?.attributes?.home_partners?.map((item, i) => (
                            <div
                                key={i}
                                className='home_hero_slider '
                            >
                                <div className='home_news_text text-center'>
                                    <Image
                                        src={item.kwargs.value.image.url}
                                        width={100}
                                        height={100}
                                        alt={""}
                                        className='home_advertisment_image'
                                    />
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
    background-color:#FFFAF1;
    padding:1rem 3rem;
    margin:20px 0;
}
  .home_hero_slider{
    position:relative;
    margin-top:20px !important;
  }
  .home_slider_content{
    position:absolute;
    top:50%;
    left:10px;
    transform:translateY(-50%);
  }
  .rectanagle_left{
    position:absolute;
    top:20px;
    left:-50px;
    width:300px;
    height:185px;
    z-index:1;
  }
  .rectanagle_right{
    position:absolute;
    top:20px;
    z-index:1;
    right:-50px;
    width:300px;
    height:185px;
  }
  
  /* .react-multi-carousel-track {
    gap:20px;
  } */
  @media screen and (max-width:768px){
    .rectanagle_left,.rectanagle_right{
        display:none;
    }
    .react-multiple-carousel__arrow{
        min-height:20px;
        min-width:20px;
    }
    .react-multiple-carousel__arrow::before{
        font-size:12px;
    }
    .react-multi-carousel-item  {
        margin:auto;
    }
    .home_advertisment_image{
        width:150px !important;
    }
    /* .home_advertisment_image{
        width:100px !important;
    } */
    /* .home_news_text{
        padding:0 40px;
    } */
  }
`