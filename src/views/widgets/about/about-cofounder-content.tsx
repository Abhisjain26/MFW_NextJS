'use client';

import React from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import Style from './about-content.module.css';

export default function AboutCoFounderContent({ data }) {

    return (
        <div>
            <div className={`${Style.about_cofounder_content} container`}>
                {data?.attributes?.about_ecommerce?.map((item, i) => (
                    <div key={i}>
                        <div>
                            <div>
                                <h2 className={`${Style.about_main_subcontent_text}`}>{item.value.text}</h2>
                                <h2 className={`${Style.about_main_subcontent_text1}`}>{item.value.text1}</h2>
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
