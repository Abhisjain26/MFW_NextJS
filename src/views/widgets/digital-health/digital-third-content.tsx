'use client';

import React, { useEffect, useState } from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';
import { useSearchParams } from 'next/dist/client/components/navigation';
import convertFacetSearchParams from '@theme/utils/convert-facet-search-params';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { usePathname } from 'next/navigation';
import { getListData } from '@akinon/next/data/server';
import { Category } from '@akinon/next/types';
import { pushProductClicked, pushProductListProductViewed } from '@theme/utils/gtm';
import { useInView } from 'react-intersection-observer';

export default function DigitalThirdContent({ data }) {

    return (
        <div className='my-10 container container_md'>
            {data.attributes.digital_info.map((item, index) => {
                return (
                    <div className="flex mb-5" key={index}>
                        <div className="w-full common_flex_direction border-pink flex gap-3 items-center">
                            <div className="w-4/12 common_width">
                                <div className="flex relative items-center w-full">
                                    <Image
                                        src={item.kwargs.value.image.url}
                                        alt="payment"
                                        width={285}
                                        height={27}
                                        className="block w-full digital_second_image"
                                    // unoptimized
                                    />
                                    <div className='dress_digital_right_image'>
                                        <Image src='images/home/dress.png' width={10} height={10} alt='Dress' />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 w-8/12 common_width px-9 text-1xl text-left md-mt-0 fintech-desc' dangerouslySetInnerHTML={{ __html: item.value.text }}></div>
                        </div>
                    </div>
                )
            })}
        </div >
    );
}
