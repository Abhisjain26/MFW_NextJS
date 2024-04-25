'use client';

import { useEffect, useState } from 'react';
import {
  pushProductClicked,
  pushProductListProductViewed
} from '@theme/utils/gtm';
import { useInView } from 'react-intersection-observer';
import useFavButton from '../../hooks/use-fav-button';
import { Product } from '@akinon/next/types';
import { Image } from '@akinon/next/components/image';
import { Price, Link } from '@theme/components';
import Styled from 'styled-components'

interface Props {
  product: Product;
  width?: number;
  height?: number;
  index: number;
}

export const ProductItem = (props: Props ) => {

  // TODO: Static image will change (TR)
  const { product, width, height, index } = props;
  const [viewed, setViewed] = useState(false);
  const { FavButton } = useFavButton(product.pk);
  const { ref, inView } = useInView();

  const image_url = product.productimage_set[0]?.image;
  const absolute_url = product.absolute_url;
  const product_name = product.name;
  const retail_price = product.retail_price;
  const price = product.price;

  useEffect(() => {
    if (!viewed && inView) {
      setViewed(true);
      pushProductListProductViewed(product);
    }
  }, [inView]);

  return (
    <Wrapper>
      <div
        className="text-sm text-left flex  flex-col h-full"
        data-testid="product-box"
        ref={ref}
      >
        <div className="relative mb-3 border-pink-400 h-full">
          <Link href={absolute_url} onClick={() => pushProductClicked(product)}>
            {image_url ? (
              <Image
                fill
                loading="lazy"
                src={image_url}
                alt={product_name}
                aspectRatio={1}
                sizes="
                  (max-width: 768px) 50vw,
                  (max-width: 1024px) 30vw,
                  33vw"
                crop="center"
              />
            ) : (
              <Image
                className="h-full"
                src="/noimage.jpg"
                fill
                aspectRatio={1}
                sizes="100vw"
                alt={product_name}
                imageClassName="object-cover"
              />
            )}
          </Link>
          <FavButton className="absolute top-4 right-4" />
        </div>
        <div>
          <Link
            href={absolute_url}
            className='listing_text text-base'
            data-testid={`${product_name}-${index}`}
            onClick={() => pushProductClicked(product)}
          >
            {product_name}
          </Link>
          <div className="font-semibold mt-1">
            {parseFloat(retail_price) > parseFloat(price) && (
              <Price
                value={retail_price}
                className="font-normal line-through mr-3"
              />
            )}
            <Price value={price} data-testid="product-price" className='listing_text' />
            <button className='pinkbtn w-full font-normal uppercase py-5 rounded-none'>Buy Now</button>
            <button className='bluebtn mt-1 font-normal flex justify-center items-center w-full uppercase rounded-none'><Image width={20} className='add_to_cart_image mr-1' height={20} src={'images/listing/add-to-cart.svg'} alt='' />Add to cart</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = Styled.section`
height:100%;
  .listing_text{
    color:#003744;
    font-weight:600;
    margin-bottom:5px;
  }
  .bluebtn{
    padding:16px 0;
  }
`