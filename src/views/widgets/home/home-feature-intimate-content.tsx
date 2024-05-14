'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import FeatureComponent from '@theme/views/widgets/feature/feature-product-content';
// import FeaturePage from '@theme/app/[commerce]/[locale]/[currency]/feature/page'
import { GetCategoryResponse } from '@akinon/next/types';

export default function HomeFeatureIntimateContent({
  data,
  backgroundColor,
  children,
  widgetData
}: {
  backgroundColor:string;
  widgetData:any;
  data: GetCategoryResponse;
  children?: React.ReactNode;
}) {

  return (
    <Wrapper className='container' style={{ backgroundColor }}>

      {widgetData?.attributes?.home_feature_intimate?.map((item, index) => (
        <div key={index}> {/* Added key prop */}
          <div className='home_slider_feature'>
            <h2>{item.value.text}</h2>
          </div>
        </div>
      ))}
      <FeatureComponent data={data} />
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
