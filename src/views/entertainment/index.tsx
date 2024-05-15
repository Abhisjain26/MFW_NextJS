'use client';

import React from 'react';
import Style from './entertainment.module.css'
import { Icon, Image } from '@akinon/next/components';

export default function EntertanimentContent({ data }) {

    return (
        <div className='my-10 container container_md'>
            {data.attributes.entertainmnet_info.map((item, index) => {
                return (
                    <>
                        <h1
                            className="mt-4 w-full text-center mb-3 text-2xl text-left md-mt-0 heading-main"
                            data-testid="product-name"
                        >
                            Entertainment
                        </h1>
                        <div className={`${Style.entertainment} border`} key={index}>
                            <div>
                                <Image className={`${Style.entertainment_image}`} src={item.kwargs.value.image.url} width={100} height={100} alt="" />
                            </div>
                            <div className={`${Style.entertainment_content}`}>
                                <h3><b>{item.value.title}</b></h3>
                                <p>{item.value.text}</p>
                            </div>
                            <button className={`${Style.entertainment_button}`}>
                                <span> READ NOW </span><span> <Icon name='chevron-end' size={12} className='ms-1' /></span>
                            </button>
                        </div>
                    </>
                )
            })}
        </div >
    );
}
