'use client';

import React, { useState } from 'react';
import Style from './index.module.css'
import { Icon, Image } from '@akinon/next/components';
import Layout from '../category/layout';
import Breadcrumb from '../breadcrumb';
import { CategoryBanner } from '../category/category-banner';
import ListPage from '../category/category-info';
import { Filters } from '../category/filters';
import CategoryActiveFilters from '../category/category-active-filters';

export default function EntertanimentContent({ data }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const [Data , setData] = useState([...data.attributes]);
    
    return (
        <div className='my-10 container container_md'>
            <h1
                className="mt-4 w-full text-center mb-3 text-2xl text-left md-mt-0 heading-main"
                data-testid="product-name"
            >
                Entertainment
            </h1>
            {data.attributes.entertainmnet_info.map((item, index) => {
                return (
                    <>
                        <div> 
                            <Filters isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                            <CategoryActiveFilters />
                        </div>

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
            {/* <Layout data={data} /> */}
        </div >
    );
}
