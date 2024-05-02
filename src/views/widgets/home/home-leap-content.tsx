'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeLeapContent({ data }) {

    return (
        <Wrapper>
            <div className='container container_mx'>

                {data?.attributes?.home_banner?.map((item, i) => (
                    <div
                        key={i}
                    >
                        <div className='home_advertisment_image'>
                            <Image
                                src={item.kwargs.value.image.url}
                                width={900}
                                height={700}
                                alt={""}
                                className='home_advertisment_image'
                            />
                        </div>
                    </div>
                ))}
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
`