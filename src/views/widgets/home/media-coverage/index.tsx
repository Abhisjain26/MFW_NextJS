'use client'

import React from 'react';
import Style from './index.module.css';
import FooterSubscriptionForm from '@theme/widgets/footer-subscription/footer-subscription-form';
import { Image } from '@akinon/next/components';

export default function HomeMediaContent({ data }) {

    return (
        <div>
            <div className={`${Style.home_media} container relative mt-20`}>
                <div className={`${Style.home_dress}`}>
                    <Image src='images/home/dress.png' width={10} height={10} alt='Dress' />
                </div>
                <div className='title_all mb-3'>
                    Media Coverage
                </div>
                <div className={`${Style.grid_media}`}>
                    {data?.attributes?.media_coverage?.map((item, i) => (
                        <div key={i} className={`${Style.home_media_content}`}>
                            <p className={`${Style.home_media_text}`}>{item.value.text}</p>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/jVTgpDkNTHU?si=f9dltxRMXJ-MdU9c" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
