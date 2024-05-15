'use client';

import React from 'react';
import Style from './subscribe.module.css';
import FooterSubscriptionForm from '@theme/widgets/footer-subscription/footer-subscription-form';

export default function HomeSubscribeContent({ data }) {

    return (
        <div>
            <div className={`${Style.home_subscribe} container`}>
                <div className={`${Style.subscribe_top}`}></div>
                <div className={`${Style.subscribe_back}`}></div>
                {data?.attributes?.home_subscribe?.map((item, i) => (
                    <div className={`${Style.home_subscribe_content}`}
                        key={i}
                    >
                        <h2 className={`${Style.home_subscribe_title}`}>{item.value.title}</h2>
                        {/* <div className='home_advertisment_image'>
                        </div> */}
                        <div className={`${Style.home_advertisment_content}`}>
                            <div className={`${Style.home_subscribe_text}`} dangerouslySetInnerHTML={{ __html: item.value.text }} />
                            <div className={`${Style.home_subscribe_text}`} dangerouslySetInnerHTML={{ __html: item.value.subtext }} />
                        </div>
                    </div>
                ))}
                <div className={`flex justify-center${Style.subscribe_input}`}>
                    <FooterSubscriptionForm />
                </div>
            </div>
        </div>
    );
}
