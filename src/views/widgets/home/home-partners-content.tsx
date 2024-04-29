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
            <div className='partner_content'>
                <Title title={"Our Strategic Partners"} />
                <div className='relative'>
                    <Image src={"images/home/rectangle-left.png"} className='rectanagle_left' width={100} height={100} alt='' />
                    <Image src={"images/home/rectangle-right.png"} className='rectanagle_right' width={100} height={100} alt='' />
                    <CarouselCore
                        responsive={{
                            all: {
                                breakpoint: { max: 5000, min: 0 },
                                items: 6
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
                                <div className='home_news_text ms-3 '>
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
    z-index:1;
  }
  .rectanagle_right{
    position:absolute;
    top:20px;
    z-index:1;
    right:-50px;
  }
  .react-multi-carousel-track {
    gap:20px;
  }
`