'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import Style from './about-content.module.css';
import AboutECommerce from './about-ecommerce-content';

export default function AboutContent({ data }) {

    return (
        <div>
            <div className={`${Style.about_main_content} container`}>
                {data?.attributes?.about_us?.map((item, i) => (
                    <div key={i}>
                        <div className='flex items-center'>
                            <div className=' p-11'>
                                <Image
                                    src={item.kwargs.value.image.url}
                                    width={800}
                                    height={700}
                                    alt=""
                                    className={`${Style.about_main_content_image_1} rounded-xl`}
                                />
                            </div>
                            <div>
                                <h2 className={`${Style.about_main_content_text}`}><i>{item.value.text}</i></h2>
                            </div>
                        </div>
                        <div className={`${Style.about_content} mx-9 my-5 rounded-xl`}>
                            <p>Mall For Women is a digital platform with all a woman needs in one convenient place. We are a strategic solution aimed at addressing the digital divide by establishing a comprehensive e-commerce marketplace. This platform is designed to cater exclusively to the needs and preferences of women, offering a diverse range of carefully curated products and services.</p>
                            <p>
                                Beyond serving as a retail hub our platform is committed to fostering women entrepreneurship by providing essential support to female business owners who choose to list their products and services on our website. In essence Mall for Women is not just an e-commerce destination its an ecosystem that empowers women consumers and entrepreneurs alike.
                            </p>
                            <p>Our Product and services include: E-Commerce&quot;, Logistics, FinTech, and Digital Health services ensuring women participate, benefit, and support each other in the digital economy.</p>
                            <p>We aim to be a complete eco-system for women worldwide by offering lifestyle and entertainment. We believe the power of technology and collaboration can truly change the world. </p>
                        </div>
                        {/* <About */}
                    </div>
                ))}
                {/* <AboutECommerce dataEcommerce={data} /> */}

            </div>
        </div>
    );
}
