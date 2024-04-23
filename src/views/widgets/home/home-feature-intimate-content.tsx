'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import FeatureComponent from '@theme/views/widgets/feature/feature-product-content';
// import FeaturePage from '@theme/app/[commerce]/[locale]/[currency]/feature/page'
import { GetCategoryResponse } from '@akinon/next/types';


export default function HomeFeatureIntimateContent({data}) {
    
    return (
        <Wrapper className='max-container'>
            {/* {datas?.attributes?.home_feature_intimate?.map((item, i) => ( */}
            <div>
                <div className='home_slider_feature'>
                    <h2>Feature Shoes</h2>
                </div>
                {/* <FeaturePage /> */}
                <FeatureComponent data={data}  />
            </div>
            {/* ))} */}
        </Wrapper>
    );
}

const Wrapper = Styled.section`
    background-color:#E987B4;
    border-radius:10px;
    padding:10px;
    margin-bottom:20px;

  .home_slider_feature{
    font-size:30px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    display: flex;
    justify-content: center;
  }
`