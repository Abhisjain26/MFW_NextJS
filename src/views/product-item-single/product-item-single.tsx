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

export const ProductItemSingle = (props: Props) => {

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
                className="text-sm text-left border_pink list_single_content flex"
                data-testid="product-box"
                ref={ref}
            >
                <div className="relative border-pink-400  list_single_image w-100 h-full">
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
                    {/* <FavButton className="absolute top-4 right-4" /> */}
                </div>
                <div className='flex justify-between flex-col'>
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
                        <div className='flex gap-5 mt-5'>
                            <button className='pinkbtn listbtn  font-normal uppercase rounded-none'>Buy Now</button>
                            <button className='pinkbtn listbtn font-normal uppercase rounded-none'>Whislist</button>
                            {/* <FavButton>
                                <div className=''>Whislist</div>
                            </FavButton> */}

                        </div>
                        <div className='w-full'>
                            <button className='bluebtn listbtn mt-1 font-normal  uppercase rounded-none'><Image width={20} className='add_to_cart_image mr-1' height={20} src={'images/listing/add-to-cart.svg'} alt='' />Add to cart</button>
                        </div>
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
    font-size:20px;
    margin-bottom:5px;
  }
  .list_single_image{
    width:200px;
  }
  .list_single_content{
    width:100%;
    gap:20px;
  }
  .listbtn{
    width: 50%;
    padding: 12px 11px;
  }
  .bluebtn{
    width:100%;
  }
`