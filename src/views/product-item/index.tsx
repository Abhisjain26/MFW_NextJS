'use client';

import { useEffect, useState } from 'react';
import {
  pushAddToCart,
  pushProductClicked,
  pushProductListProductViewed
} from '@theme/utils/gtm';
import { useInView } from 'react-intersection-observer';
import useFavButton from '../../hooks/use-fav-button';
import { Product } from '@akinon/next/types';
import { Image } from '@akinon/next/components/image';
import { Price, Link } from '@theme/components';
import Styled from 'styled-components'
import { useAddProductToBasket } from '@theme/hooks';
import { useAddStockAlertMutation } from '@akinon/next/data/client/wishlist';
import { Button } from '@akinon/next/components';

interface Props {
  product: Product;
  width?: number;
  height?: number;
  index: number;
}

export const ProductItem = (props: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  // TODO: Static image will change (TR)
  const { product, width, height, index } = props;
  const [viewed, setViewed] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { FavButton } = useFavButton(product.pk);
  const { ref, inView } = useInView();
  const [productError, setProductError] = useState(null);
  const [addProductToCart, { isLoading: isAddToCartLoading }] = useAddProductToBasket();
  const [addStockAlert, { isLoading: isAddToStockAlertLoading }] = useAddStockAlertMutation();

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
  const handleAddToCart = async () => {
    setShowPopup(true);
    pushProductClicked(product);
    setSelectedProduct(product);
    try {
      await addProductToCart({
        product: product.pk,
        quantity: 1,
        attributes: {}
      });

      pushAddToCart(product);
      setShowPopup(true);
    } catch (error) {
      setProductError(
        error?.data?.non_field_errors ||
        Object.keys(error?.data).map(
          (key) => `${key}: ${error?.data[key].join(', ')}`
        )
      );
    }
  };

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000); // 10 seconds
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  // const handleNavigate = () => {
  //   navigate('/orders/checkout' , {state: {message:product.pk}});
  // };

  // const handleProductClick = () => {
  //   pushProductClicked(product);
  //   setSelectedProduct(product);
  //   setShowPopup(true);
  // };

  return (
    <Wrapper>
      <div
        className="text-sm text-left flex flex-col h-full"
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
                value={"$" + retail_price}
                className="font-normal line-through mr-3"
              />
            )}
            <span className='listing_text'>$ <Price value={`${"$" + price}`} data-testid="product-price" className='listing_text' /></span>
            <Button className='pinkbtn w-full font-normal uppercase py-5 rounded-none add_to_cart_mobile' onClick={handleAddToCart}>
              {/* <Link href={{ , query: { productId: product.pk } }}> */}
              Buy Now
              {/* </Link> */}
            </Button>
            <Button
              disabled={isAddToCartLoading || isAddToStockAlertLoading}
              className='bluebtn mt-1 font-normal flex justify-center items-center w-full uppercase rounded-none add_to_cart_mobile'
              onClick={() => handleAddToCart()}>
              <Image width={20} className='add_to_cart_image mr-1' height={20} src={'images/listing/add-to-cart.svg'} alt='' />
              Add to cart
            </Button>
            {showPopup && selectedProduct && (
              <div className="popup absolute pop_up border rounded p-4 top-0 right-10">
                <div className='flex gap-2 items-center'>
                  <div>
                    <Image src={selectedProduct.productimage_set[0]?.image || '/noimage.jpg'} width={30} sizes='10vw' height={30} className='popup_image' aspectRatio={1} alt={selectedProduct.name} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{selectedProduct.name}</div>
                    <div className="font-normal text-white mt-2">Price: ${selectedProduct.price}</div>
                  </div>
                </div>
                <button onClick={() => setShowPopup(false)} className="p-2 popup_view_all w-full py-2 border"><Link href='/baskets/basket'>View All</Link></button>
              </div>
            )}
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
    width:330px;
  }
  .bluebtn{
    padding:16px 0;
  }
  .react-multi-carousel-item {
    width:260px;
  }
  .pop_up {
    background-color: #b27697;
    border-radius: 10px;
    border: 1px solid #b27697;
    position:fixed;
    top:10px;
    z-index:11;
  }
  .popup_image{
    width:75px;
    height:75px;
  }
  @media screen and (max-width:768px){
    .add_to_cart_mobile{
      font-size:12px;
    }
    .listing_text{
      font-size:13px;
    }
    .pop_up{
      right:0;
      margin:10px 30px;
    }
    .popup_image{
      width:120px;
      height:110px;
    }
    .popup_view_all{
      margin-top:10px;
    }
  }
`