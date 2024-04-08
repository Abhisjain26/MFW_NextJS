'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeThankYouContent({ data }) {

    return (
        <Wrapper>
            {data?.attributes?.home_thankyou?.map((item, i) => (
                <div className='home_subscribe_content' key={i}>
                    <div className='thankyou_image' style={{ backgroundImage: `url(${item.kwargs.value.image.url})` }}>
                        <div className="home_thankyou_text">
                            <div className='home_thankyou_suncontent'>
                                <h2>{item.value.text}</h2>
                                <h3>{item.value.subtext}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Wrapper>
    );
}

const Wrapper = Styled.section`
    .home_subscribe_content {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 70px;
        width: 100%;
        height: 100%;
    }

    .thankyou_image {
        width: 100%;
        height: 350px;
        background-size: cover;
        background-position: center;
        position: relative;
    }
.home_thankyou_suncontent{
    padding:30px;
    border-radius:10px;
    border: 2px solid #F8ECD9;
}
    .home_thankyou_text {
        padding: 0 30px;
        border-radius: 10px;
        text-align: center;
        color: #fff;
        display:flex;
        flex-direction:column;
        align-items:Center;
        height:100%;
        justify-content:center;
    }

    .home_thankyou_text h3 {
        font-weight: 300;
        font-size: 30px;
        margin: 0;
    }

    .home_thankyou_text h2 {
        font-size: 55px;
        margin: 0;
    }
`;
