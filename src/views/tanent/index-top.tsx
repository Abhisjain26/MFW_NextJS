'use client';

import React, { useState } from 'react';
import Style from './index.module.css'
import { Button, Image, Link } from '@akinon/next/components';
import { P } from 'pino';

export default function TANENTTOPContent({ data }) {
    // console.log("hello", data);

    return (
        <>
            <div className='container container_md'>
                <div className={`${Style.tanent_content}`}>
                    <div className={`${Style.tanent_top}`}>
                        <div className={`${Style.tenant_image}`}>
                            <Image src={data.attributes.image.kwargs.url} className={`${Style.tenant_image_i}`} width={100} height={100} alt='JOIN MALL FOR WOMEN' />
                        </div>
                        <div className={`${Style.tanent_top_content}`}>
                            <p className={`${Style.tanent_top_title}`}>{data.attributes.first_column_title.value}</p>
                            <p className={`${Style.tanent_top_title} mt-2`}>{data.attributes.second_column_title.value}</p>
                            <p className={`${Style.tanent_top_title} mt-2`}>{data.attributes.third_column_title.value}:</p>
                            <div className={`${Style.tanent_top_titl} mt-2`}>
                                {data.attributes.fourth_column_items.map((index, i) => (
                                    <p key={i}>{index.value.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex items-center mt-5 gap-5'>
                        <Button className={`${Style.button_paypal}`}><span>Subscribe</span><span><Image src='images/local/paypal_tenant.svg' height={10} width={10} alt='PAYPAL' /></span></Button>
                        <Button className={`${Style.button_debit}`}><span className={`${Style.button_debit_image}`}><Image src='images/local/debit.svg' height={10} width={10} alt='PAYPAL' /></span><span className='uppercase'>Debit & Credit Card</span></Button>
                    </div>
                </div>
            </div>
        </>
    );
}
