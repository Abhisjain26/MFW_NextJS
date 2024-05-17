'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import { CarouselCore } from '@theme/components/carousel-core';

export default function HomeengStories({ data }) {
    return (
        <Wrapper>
            <div className='container container_mx'>
                <div className='title_all explore_department mt-10 pb-5'>
                    EXPLORE OUR DEPARTMENTS
                </div>
                <div className="w-11/12 mx-auto pb-10">
                    <CarouselCore
                        responsive={{
                            all: {
                                breakpoint: { max: 5000, min: 0 },
                                items: 6
                            },
                            mobile :{
                                breakpoint:{max:768,min:0},
                                items:2
                            }
                        }}
                        arrows={true}
                        swipeable={true}
                        className="w-full bg-white"
                    >
                        {data?.attributes?.stories?.map((story, index) => {

                            return (
                                <div
                                    className="flex-shrink-0 w-32 mx-auto"
                                    key={`story__${index}`}
                                >
                                    <Link href={story?.value?.url} aria-label={story?.value?.alt}>
                                        <Image
                                            src={story?.kwargs?.value?.image?.url}
                                            alt={story?.value?.alt}
                                            aspectRatio={1}
                                            sizes="(max-width: 768px) 112px, 140px"
                                            imageClassName="rounded-full mb-2"
                                            fill
                                        />
                                    </Link>

                                    <Link
                                        href={story?.value?.url}
                                        className="block text-centern explore_content text-sm font-medium mt-3"
                                        aria-label={story?.value?.alt}
                                    >
                                        {story?.value?.alt}
                                    </Link>
                                </div>
                            )
                        })}
                    </CarouselCore>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = Styled.section`
  .home_advertisment_image{
    width:100% !important;
    height:100% !important;
  }
  .home_advertisment_image img{
    border-radius: 10px;
  }
  @media screen and (max-width:768px){
    .react-multiple-carousel__arrow{
        background:#C475AB !important;
        min-height:25px !important;
        min-width:25px !important;
        top:55px !important;
    }
    .react-multiple-carousel__arrow::before{
        color:#fff !important;
        font-size:12px !important;
    }
    .explore_department{
        text-align:center;
    }
  }

`