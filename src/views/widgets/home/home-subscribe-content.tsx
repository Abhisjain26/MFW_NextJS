'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeSubscribeContent({ data }) {

    return (
        <Wrapper>
            <div className='max-container home_subscribe'>
                <div className="subscribe_top"></div>
                <div className="subscribe_back"></div>
                {data?.attributes?.home_subscribe?.map((item, i) => (
                    <div className='home_subscribe_content'
                        key={i}
                    >
                        <h2 className='home_subscribe_title'>{item.value.title}</h2>
                        {/* <div className='home_advertisment_image'>
                        </div> */}
                        <div className='home_advertisment_content'>
                            <div className='home_subscribe_text' dangerouslySetInnerHTML={{ __html: item.value.text }} />
                            <div className='home_subscribe_text' dangerouslySetInnerHTML={{ __html: item.value.subtext }} />
                        </div>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

const Wrapper = Styled.section`
   .home_subscribe_content{
    text-align:center;
    position:relative;
    padding:10px 0;
    z-index:10;
   }
.home_subscribe{
    position: relative;
    margin-top:100px;

}
    .home_subscribe_title{
        font-size:30px;
        font-family: Georgia, 'Times New Roman', Times, serif;
        color:#000000;
    }
    .home_subscribe_text {
        font-family: Georgia, 'Times New Roman', Times, serif;
        width:80%;
        font-size:14px;
        margin:10px auto;

    }

    .subscribe_back{
        background-image:url("images/home/subscribe-back.svg");
        background-repeat:no-repeat;
        background-position:center;
        height: 180px;
        top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
        width:100% ;
    border-radius:30px;
    background-size: cover;
        position: absolute;
    }
    .subscribe_top{
        background-image: url("images/home/subscribe-top.svg");
        z-index:10;
    position: absolute;
    width: 90%;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius:30px;
    background-position: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    }
`