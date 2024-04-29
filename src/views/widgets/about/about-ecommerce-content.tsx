'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import Style from './about-content.module.css';

export default function AboutEcommerceContent({ data }) {

    return (
        <div>
            <div className={`${Style.about_ecommerce_content}  container`}>
                {data?.attributes?.about_ecommerce?.map((item, i) => (
                    <div key={i} className={`${Style.about_ecommerce_about} mt-7`}>
                        <div className='flex  gap-3'>
                            <div className='padding_about_main mt-1'>
                                <Image
                                    src={item.kwargs.value.image.url}
                                    width={30}
                                    height={30}
                                    alt=""
                                    className={`${Style.about_main_content_image} rounded-xl`}
                                />
                            </div>
                            <div>
                                <h2 className={`${Style.about_main_subcontent_text}`}>{item.value.text}</h2>
                                <div className={`${Style.about_main_subcontent}`} dangerouslySetInnerHTML={{ __html: item.value.subtext }}>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
