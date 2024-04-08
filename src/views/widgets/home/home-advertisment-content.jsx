'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeAdvertismentContent({ data }) {
    return (
        <Wrapper>
            <div className='max-container home_advertisment_container p-10'>
                <div className='home_dress'>
                    <Image src='images/home/dress.png'
                        width={20}
                        height={20}
                        alt='Dress' />
                </div>
                <div className='home_leaf'>
                    <Image src='images/home/leaf.png'
                        width={80}
                        height={80}
                        alt='Dress' />
                </div>
                {data?.attributes?.home_advertisment?.map((item, i) => (
                    <div className=' flex items-center gap-10 home_advertisment_content_mobile'
                        key={i}
                    >
                        <div className='home_advertisment_content'>
                            <div dangerouslySetInnerHTML={{ __html: item.value.text }} />
                            <button className='btn pinkbtn'>{item.value.link}SHOP NOW</button>
                        </div>
                        <div className='home_advertisment_image'>
                            <Image
                                src={item.kwargs.value.image.url}
                                width={500}
                                height={500}
                                alt={""}
                            />

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
        position:relative;
        border-radius:30px;
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
    .home_leaf{
        position:absolute;
        bottom:-40%;
        left:-60px;
        z-index:-1px
    }
`