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

export default function DigitalSecondContent({ data }) {

    return (
        <div className='my-10 container container_md'>
            {data.attributes.digital_info.map((item, index) => {
                return (
                    <div className="flex" key={index}>
                        <div className="flex items-center w-full justify-center common_margin gap-3">
                            <div className="flex items-center">
                                <Image
                                    src={item.kwargs.value.image.url}
                                    alt="payment"
                                    width={285}
                                    height={27}
                                    className="block phoneix_life_image"
                                    style={{ height: 'auto', width: '100%' }}
                                // unoptimized
                                />
                            </div>
                            <div className='text-3xl text-left md-mt-0 fintech-desc' dangerouslySetInnerHTML={{ __html: item.value.text }}></div>
                        </div>

                    </div>
                )
            })}
        </div >
    );
}
