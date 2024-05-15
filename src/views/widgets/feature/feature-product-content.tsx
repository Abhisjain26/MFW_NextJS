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
import { Category, GetCategoryResponse } from '@akinon/next/types';
import { pushProductClicked, pushProductListProductViewed } from '@theme/utils/gtm';
import { useInView } from 'react-intersection-observer';
import { ProductItem } from '@theme/views/product-item';

interface ListPageProps {
  data: GetCategoryResponse;
}

export default function FeatureComponent(props: ListPageProps) {
  const { data } = props;

  // const { facets, selectedFacets } = useAppSelector((state) => state.category);
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const facetSearchParams =

  //   convertFacetSearchParams(selectedFacets).toString();

  // const urlSearchParams = new URLSearchParams(facetSearchParams);
  // console.log(urlSearchParams);

  // const searchText = searchParams.get('search_text');
  // searchText && urlSearchParams.set('search_text', searchText);
  // pathname + '?' + urlSearchParams.toString();

  // const getFeatureeData = async () => {
  //   const data1 = await getListData({ searchParams });
  //   console.log(data1);
  // }
  // const [viewed, setViewed] = useState(false);
  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   if (!viewed && inView) {
  //     setViewed(true);l
  //     pushProductListProductViewed(data);
  //   }
  // }, [inView]);

  // const data1 = [
  //   {
  //     image: '/images/home/girl.svg',
  //     title: 'Satin Nightgown Spaghetti Straps',
  //     price: '1502.12 INR',
  //     price_old: '1502.12 INR',
  //     buy: 'Buy Now',
  //     cart: 'Add to Cart'
  //   },
  //   {
  //     image: '/images/home/girl.svg',
  //     title: 'Satin Nightgown Spaghetti Straps',
  //     price: '1502.12 INR',
  //     price_old: '1502.12 INR',
  //     buy: 'Buy Now',
  //     cart: 'Add to Cart'
  //   },
  //   {
  //     image: '/images/home/girl.svg',
  //     title: 'Satin Nightgown Spaghetti Straps',
  //     price: '1502.12 INR',
  //     price_old: '1502.12 INR',
  //     buy: 'Buy Now',
  //     cart: 'Add to Cart'
  //   },
  //   {
  //     image: '/images/home/girl.svg',
  //     title: 'Satin Nightgown Spaghetti Straps',
  //     price: '1502.12 INR',
  //     price_old: '1502.12 INR',
  //     buy: 'Buy Now',
  //     cart: 'Add to Cart'
  //   },
  //   {
  //     image: '/images/home/girl.svg',
  //     title: 'Satin Nightgown Spaghetti Straps',
  //     price: '1502.12 INR',
  //     price_old: '1502.12 INR',
  //     buy: 'Buy Now',
  //     cart: 'Add to Cart'
  //   },
  // ]
  // const absolute_url = data.absolute_url || '';
  const [paginationData, setPaginationData] = useState([...data.products]);
  return (
    <Wrapper>
      <CarouselCore
        responsive={{
          all: {
            breakpoint: { max: 5000, min: 0 },  
            items: 4
          },
          mobile: {
            breakpoint: { max: 767, min: 0 },
            items: 2
          }
        }}
        className='rounded-1'
        arrows={true}
        swipeable={true}
      >


        {paginationData?.map((product, index) => (
          <>
            {
              <ProductItem 
                key={product.pk}
                product={product}
                width={0}
                height={0}
                index={index}
              />
            }
          </>
        ))}
        {/* {data.products.map((item, index) => {
          const image = item.productimage_set[0];
          return (<div className='home_feature_container flex gap-1' key={index}>
            <div className='home_feature_card'>
              <Link href={item.absolute_url} onClick={() => pushProductClicked(data)}>
                <div className="home_feature_image">
                  <Image src={image.image} className='home_feature_image_1' width={100} height={100} alt="" />
                </div>
              </Link>

              <div className="home_feature_text">
                <h2>{item.name}</h2>        
                <div className="home_feature_price flex gap-4">
                  <h3>{item.price}</h3>
                  <h4>{item.price_old}</h4>
                </div>
                <div>
                  <button className='pinkbtn'>Shop Now</button>
                  <button className='addCart'>Add to cart</button>
                </div>
              </div>
            </div>
          </div>
          )
        })} */}
      </CarouselCore>
    </Wrapper >
  );
}

const Wrapper = Styled.section`

    .react-multi-carousel-track{
    gap:10px;
  }
  @media screen and (max-width:767px){
   
}
`