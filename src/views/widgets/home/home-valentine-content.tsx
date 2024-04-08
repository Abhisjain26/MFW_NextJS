'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeValentineContent({ data }) {
    return (
        <Wrapper>
            <div className='max-container home_advertisment_container p-10'>
                <div className='home_dress'>
                    <Image src='images/home/dress.png'
                        width={20}
                        height={20}
                        alt='Dress' />
                </div>
                <div className='home_flower'>
                    <Image src='images/home/flower.png'
                        width={100}
                        height={100}
                        alt='Dress' />
                </div>
                {data?.attributes?.home_advertisment?.map((item, i) => (
                    <div className=' flex items-center gap-10 home_advertisment_content_mobile'
                        key={i}
                    >

                        <div className='home_advertisment_image'>
                            <Image
                                src={item.kwargs.value.image.url}
                                width={500}
                                height={500}
                                alt={""}
                            />

                        </div>
                        <div className='home_advertisment_content'>
                            <div dangerouslySetInnerHTML={{ __html: item.value.text }} />
                            <button className='btn pinkbtn'>{item.value.link}SHOP NOW</button>
                        </div>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

const Wrapper = Styled.section`
    .home_advertisment_container{
        border: 1px solid #E987B4;
        border-radius:30px;
        position:relative;
        margin-top:50px;
        margin-bottom:20px;
    }
    .home_advertisment_image{
        width:50%;
    }
    .home_advertisment_image img{
        width:100%;
        height:100%;
        border-radius:30px;
    }
    .home_advertisment_content{
        width:50%;
    }
    .home_advertisment_content h1{
        font-size:50px;
        line-height:50px;
        color:#000000;
    }
    .home_advertisment_content p{
        margin-top:10px;
    }
    .home_dress{
        position:absolute;
        bottom:-32px;
        left:50%;
        transform:translateY(-50%);
    }
    .home_flower{
        position:absolute;
        top:-44px;
        right:-50px;
    }
`