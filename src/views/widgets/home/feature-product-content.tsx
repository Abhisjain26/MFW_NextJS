'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

// import { GetCategoryResponse } from '@akinon/next/types';

export default function FeatureComponent() {

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
        {/* {data?.attributes?.hero_slider?.map((item, i) => ( */}
        <div className='home_feature_container flex gap-3'>
          <div className='home_feature_card'>
            <div className="home_feature_image">
              <Image src={'images/home/girl.svg'} className='home_feature_image_1' width={100} height={100} alt="" />
            </div>
            <div className="home_feature_text">
              <h2>Satin Nightgown Spaghetti Straps</h2>
              <div className="home_feature_price flex gap-4">
                <h3>1502.12 INR</h3>
                <h4>1502.12 INR</h4>
              </div>
              <button className='pinkbtn'>Buy Now</button>
              <button className='addCart'>Add to Cart</button>
            </div>
          </div>
          <div className='home_feature_card'>
            <div className="home_feature_image">
              <Image src={'images/home/girl.svg'} className='home_feature_image_1' width={100} height={100} alt="" />
            </div>
            <div className="home_feature_text">
              <h2>Satin Nightgown Spaghetti Straps</h2>
              <div className="home_feature_price flex gap-4">
                <h3>1502.12 INR</h3>
                <h4>1502.12 INR</h4>
              </div>
              <button className='pinkbtn'>Buy Now</button>
              <button className='addCart'>Add to Cart</button>
            </div>
          </div>
          <div className='home_feature_card'>
            <div className="home_feature_image">
              <Image src={'images/home/girl.svg'} className='home_feature_image_1' width={100} height={100} alt="" />
            </div>
            <div className="home_feature_text">
              <h2>Satin Nightgown Spaghetti Straps</h2>
              <div className="home_feature_price flex gap-4">
                <h3>1502.12 INR</h3>
                <h4>1502.12 INR</h4>
              </div>
              <button className='pinkbtn'>Buy Now</button>
              <button className='addCart'>Add to Cart</button>
            </div>
          </div>
          <div className='home_feature_card'>
            <div className="home_feature_image">
              <Image src={'images/home/girl.svg'} className='home_feature_image_1' width={100} height={100} alt="" />
            </div>
            <div className="home_feature_text">
              <h2>Satin Nightgown Spaghetti Straps</h2>
              <div className="home_feature_price flex gap-4">
                <h3>1502.12 INR</h3>
                <h4>1502.12 INR</h4>
              </div>
              <button className='pinkbtn'>Buy Now</button>
              <button className='addCart'>Add to Cart</button>
            </div>
          </div>
        </div>
        {/* ))} */}
      </CarouselCore>
    </Wrapper>
  );
}

const Wrapper = Styled.section`
.home_feature_container{
  /* margin-top:10px; */
  padding:10px 20px;
}
  .home_feature_card{
    width:24%
  }
  .home_feature_image_1{
    width:100%;
    height:100%;
  }
  .home_feature_image{
    position:relative;
    width:100%;
    height:auto;
    /* border:1px solid #fff; */
  }
  .home_feature_text h2{
    color:#003744;
    font-size:16px;
  }
  .home_feature_price h3{
    color:#003744;
    font-size:14px;
    font-weight:600;
  }
  .home_feature_price h4{
    color:#666666;
    font-size:12px;
    text-decoration:line-through;
  }
  .pinkbtn{
    width:100%;
    text-align:center;
    margin-bottom:10px;
    border-radius:0px !important;
  }
  .addCart{
    background-color:#003744;
    color:#fff;
    width:100%;
    text-align:center;
    padding:8px 10px;
  }
`