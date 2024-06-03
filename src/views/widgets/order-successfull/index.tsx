'use client';

import React from 'react';
import { CarouselCore } from '@theme/components/carousel-core';
import { Link } from '@theme/components';
import Style from './index.module.css'
import { Image } from '@akinon/next/components';
import styled from 'styled-components';

export default function OrderSuccessfullContent({ data }) {
  console.log(data);

  return (
    <div className='container md_container'>
      <div className='mx-auto w-full text-center'>
        {data.attributes.order_successfull.map((index, i) => {
          return (
            <div key={i} className='my-9'>
              <Image width={10} className={`${Style.order_check_image}`} height={10} src={index.kwargs.value.image.url} alt='Order Successfull' />
              <h2 className='text-2xl'>{index.value.text}</h2>
              <h2 dangerouslySetInnerHTML={{ __html: index.value.subtext }} className='text-xs'></h2>
            </div>
          )
        })}
      </div>
    </div>
  );
}

