'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeDiscountContent({ data }) {

    return (
        <Wrapper>
            <div className='max-container relative home_advertisment_container flex gap-5'>
                <div className="branch_leaf">
                    <Image
                        src={'/images/home/branch-leaf.png'}
                        width={10}
                        height={10}
                        alt={""}
                    />
                </div>

                {data?.attributes?.home_banner?.map((item, i) => (
                    <div
                        className='home_discount'
                        key={i}
                    >
                        <div className='home_advertisment_image'>
                            <Image
                                src={item.kwargs.value.image.url}
                                width={300}
                                height={300}
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
  .home_discount{
    width:50%;
  }
  .branch_leaf{
    position:absolute;
    top: 69px;
    right: -80px;
  }
`