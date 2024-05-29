'use client';

import React, { useState } from 'react';
import Style from './index.module.css'
import { Link } from '@akinon/next/components';
import { P } from 'pino';

export default function TANENTMIDDLEContent({ data }) {
    // console.log("hello",data);

    return (
        <div className='container container_md'>
            <p className='mt-5'><b>{data.attributes.first_column_title.value}</b></p>
            <p className='mt-2'>{data.attributes.second_column_title.value}</p>
            <div>
                {data.attributes.hero_slider.map((index,i) => (
                    <p className='mt-2 ms-2' key={i}>{index.value.text}</p>
                ))}
            </div>
        </div>
    );
}
