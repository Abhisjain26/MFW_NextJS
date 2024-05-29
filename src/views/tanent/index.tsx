'use client';

import React, { useState } from 'react';
import Style from './index.module.css'
import { Link } from '@akinon/next/components';
import TANENTTOPContent from './index-top';
import TANENTMIDDLEContent from './index.middle';

export default function ENTRYTANENTContent({ data, dataType }) {

  
    return (
        <div className='my-10 container container_md'>
            <h1
                className={`mt-4 w-full text-center mb-5 text-2xl text-left md-mt-0 ${Style.heading_main}`}
                data-testid="product-name"
            >
                <i>Entry Tanent</i>
            </h1>
            <TANENTTOPContent data={data} />
            <TANENTMIDDLEContent data={data} />
        </div>
    );
}
