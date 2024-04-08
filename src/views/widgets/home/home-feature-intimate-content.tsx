'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import FeatureComponent from '@theme/views/widgets/home/feature-product-content';



export default function HomeFeatureIntimateContent({ datas }) {

    return (
        <Wrapper className='max-container'>
            {datas?.attributes?.home_feature_intimate?.map((item, i) => (
                <div
                    key={i}
                >
                    <div className='home_slider_content'>
                        <h2>{item.value.text}</h2>
                    </div>
                    <FeatureComponent />
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = Styled.section`
    background-color:#E987B4;
    border-radius:10px;
    padding:10px;
    margin-bottom:20px;

  .home_slider_content{
    font-size:30px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    display: flex;
    justify-content: center;
  }
`