'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeValentineContent({ data }) {

    return (
        <Wrapper>
            <div className='max-container home_advertisment_container p-10'>

                {data?.attributes?.home_advertisment?.map((item, i) => (
                    <div className=' flex items-center gap-10 home_advertisment_container'
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
        border-radius:30px;
        position:relative;
        margin-top:50px;
        margin-bottom:100px;
        background-color:#F3F3F3;
    }
    .home_advertisment_image{
        width:50% ;
        padding-right:30px;
        position:absolute;
        bottom:-80px;
        right:0;
    }
    .home_advertisment_image img{
        width:100%;
        height:100%;
        border-radius:30px;
    }
    .home_advertisment_content{
        width:45%;
    }
    .home_advertisment_content h1{
        font-size:50px;
        line-height:50px;
        color:#000000;
    }
    .home_advertisment_content p{
        margin-top:10px;
    }
`