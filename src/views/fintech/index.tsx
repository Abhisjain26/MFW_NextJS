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

export default function FintechContent({ data }) {

    return (
        <div className='my-10 container container_md'>
            {data.attributes.fintech_info.map((item, index) => {
                return (
                    <div className="flex common_flex_direction border-pink" key={index}>
                        <div className="w-6/12 common_width px-9">
                            <div className="w-full">
                                <div className="flex flex-col items-left">
                                    <h1
                                        className="mt-4 text-2xl text-left md-mt-0 heading-main"
                                        data-testid="product-name"
                                    >
                                        Fintech
                                    </h1>
                                </div>
                                <div className='mt-4 text-1xl text-left md-mt-0 fintech-desc' dangerouslySetInnerHTML={{ __html: item.value.text }}></div>
                                <div className="button-group">
                                    <button
                                        className="px-4 text-xs bg-primary text-primary-foreground border border-primary transition-all hover:bg-white hover:border-primary hover:text-primary bottom-0 right-0 w-1/1 h-10 z-[20] flex items-center justify-center fill-primary-foreground hover:fill-primary sm:relative sm\:w-1\/3 sm:mt-3 sm:font-regular greenbtn"
                                        data-testid="product-add-to-cart"
                                    >
                                        <span>CONTACT US</span>
                                    </button>
                                </div>
                                <div className="button-group ">
                                    <Image
                                        src="images/local/genfin.svg"
                                        alt="payment"
                                        width={20}
                                        height={20}
                                        className="block button-inner"
                                        style={{ height: '40px', width: '100%' }}
                                    />

                                    <Image
                                        src="images/local/bridgement.svg"
                                        alt="payment"
                                        width={20}
                                        height={20}
                                        className="block button-inner"
                                        style={{ height: '40px', width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-6/12 common_width common_image flex-col items-center col-span-2 lg:col-span-1">
                            <div className="flex relative items-center w-full">
                                <Image
                                    src={item.kwargs.value.image.url}
                                    alt="payment"
                                    width={285}
                                    height={27}
                                    className="block w-full"
                                    style={{ height: 'auto', width: '100%' }}
                                // unoptimized
                                />
                                <div className='dress_digital_left_image'>
                                    <Image src='images/home/dress.png' width={10} height={10} alt='Dress' />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div >
    );
}
