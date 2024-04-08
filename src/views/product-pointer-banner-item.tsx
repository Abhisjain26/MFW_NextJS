'use client';

import { useState, useEffect } from 'react';
import {
  PointerComponentProduct,
  PointerComponentProductItem
} from '@theme/types';
import clsx from 'clsx';

import { Button, Link } from '@theme/components';
import { useMediaQuery } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import { useInView } from 'react-intersection-observer';
import { pushViewPromotion, pushSelectPromotion } from '@theme/utils/gtm';

interface ProductPointerWidgetProps {
  productItem?: PointerComponentProductItem;
  productPointerItem?: PointerComponentProduct;
}

const ProductPointerWidget = (props: ProductPointerWidgetProps) => {
  const { productItem, productPointerItem } = props;
  const [viewed, setViewed] = useState(false);
  const { ref, inView } = useInView();
  const matches = useMediaQuery('(min-width: 768px)');
  const [buttonStatus, setButtonStatus] = useState(true);
  const [matchesStatus, setMatchesStatus] = useState(false);

  const handleClick = () => {
    setButtonStatus(!buttonStatus);
  };

  const generatePromotionPayload = (promotion) => {
    return {
      creative_name: promotion?.value.banner_title_text,
      promotion_id: `promo_${promotion?.value?.url}`,
      promotion_name: promotion?.value?.banner_title_text,
      items: [
        {
          item_id: promotion?.value?.url,
          item_name: promotion?.value?.banner_title_text,
          price:
            parseFloat(promotion?.value.reduced_price?.replace(',', '.')) || 0,
          quantity: 1
        }
      ]
    };
  };

  const handleSelectPromotion = (promotionType) => {
    const promotion =
      promotionType === 'pointerItem' ? productPointerItem : productItem;
    if (promotion && promotion?.value?.url) {
      pushSelectPromotion(generatePromotionPayload(promotion));
    }
  };

  useEffect(() => {
    if (inView && !viewed) {
      setViewed(true);

      const promotions = [productItem, productPointerItem].filter(Boolean);
      promotions.forEach((promotion) => {
        if (promotion?.value?.url) {
          pushViewPromotion(generatePromotionPayload(promotion));
        }
      });
    }
  }, [productItem, productPointerItem, inView, viewed]);

  useEffect(() => {
    setMatchesStatus(matches);
  }, [matches]);

  return (
    <div ref={ref} className="relative flex-1 mb-4 xl:mb-0">
      <Link href={productPointerItem?.value?.url || '#'}>
        <Image
          src={productPointerItem?.kwargs?.value?.mobile_image?.url}
          alt={productPointerItem?.value?.alt}
          aspectRatio={1.3}
          sizes="380px"
          fill
          className="block md:hidden"
        />

        <Image
          src={productPointerItem?.kwargs?.value?.desktop_image?.url}
          alt={productPointerItem?.value?.alt}
          aspectRatio={1.3}
          sizes="675px"
          fill
          className="hidden md:block"
        />
      </Link>
      <div
        className="absolute"
        style={{
          left: matchesStatus
            ? `${productPointerItem?.value?.product_button_desktop_position_left}%`
            : `${productPointerItem?.value?.product_button_mobile_position_left}%`,
          top: matchesStatus
            ? `${productPointerItem?.value?.product_button_desktop_position_top}%`
            : `${productPointerItem?.value?.product_button_mobile_position_top}%`
        }}
      >
        <div
          className={clsx('absolute w-60 h-32 bg-white bottom-10 p-2 z-10', {
            hidden: buttonStatus
          })}
        >
          <div className="w-full h-full flex items-center gap-2 flex-shrink-0">
            <Image
              src={productItem?.kwargs?.value?.card_image?.url}
              alt={productItem?.value?.alt}
              width={110}
              height={110}
            />
            <div className="flex flex-col h-full">
              {productItem?.value?.banner_title_text && (
                <div
                  className="text-md line-clamp-2 font-medium"
                  style={{
                    color: productItem?.value?.banner_title_color
                  }}
                >
                  {productItem?.value?.banner_title_text}
                </div>
              )}
              {productItem?.value.normal_price && (
                <div className="text-sm line-through">
                  ₺ {productItem?.value?.normal_price}
                </div>
              )}

              {productItem?.value?.reduced_price && (
                <div className="text-sm mb-1.5">
                  ₺ {productItem?.value?.reduced_price}
                </div>
              )}

              {productItem?.value?.banner_button_text && (
                <Link
                  href={productItem?.value?.url || '#'}
                  onClick={() => handleSelectPromotion('item')}
                >
                  <Button
                    appearance="filled"
                    style={{
                      backgroundColor:
                        productItem?.value?.banner_button_bg_color,
                      borderColor: productItem?.value?.banner_button_bg_color,
                      color: productItem?.value?.banner_button_text_color
                    }}
                  >
                    {productItem?.value?.banner_button_text}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {productPointerItem?.value?.slider_banner_product_button ===
          'shown' && (
          <div
            className="relative flex items-center justify-center w-8 h-8 cursor-pointer z-10"
            onClick={handleClick}
          >
            <div className="absolute animate-ping w-6 h-6 bg-white rounded-full"></div>
            <div className="border-4 border-white w-6 h-6 bg-secondary rounded-full relative"></div>
          </div>
        )}
      </div>

      <div
        className={clsx('absolute flex justify-center items-center flex-col', {
          'top-8 right-24':
            productPointerItem?.value?.position_content_over_image ===
            'top-right',
          'top-8 left-24':
            productPointerItem?.value?.position_content_over_image ===
            'top-left',
          'bottom-12 left-10':
            productPointerItem?.value?.position_content_over_image ===
            'bottom-left',
          'bottom-12 right-10':
            productPointerItem?.value?.position_content_over_image ===
            'bottom-right'
        })}
      >
        {productPointerItem?.value?.banner_title_text && (
          <div
            className="text-base font-normal leading-tight mb-1.5"
            style={{
              color: productPointerItem?.value?.banner_title_color
            }}
          >
            {productPointerItem?.value?.banner_title_text}
          </div>
        )}

        <div
          className="text-base font-normal leading-tight mb-1.5"
          style={{
            color: productPointerItem?.value?.banner_description_color
          }}
        >
          {productPointerItem?.value?.normal_price && (
            <span className="line-through font-light px-1">
              ₺ {productPointerItem?.value?.normal_price}
            </span>
          )}
          {productPointerItem?.value?.reduced_price && (
            <span className="font-medium text-xl px-1">
              ₺ {productPointerItem?.value?.reduced_price}
            </span>
          )}
        </div>

        {productPointerItem?.value?.banner_button_text && (
          <div
            className="text-base font-normal leading-tight flex w-full"
            style={{
              color: productPointerItem?.value?.banner_button_text_color,
              backgroundColor: productPointerItem?.value?.banner_button_bg_color
            }}
          >
            <Link
              onClick={() => handleSelectPromotion('pointerItem')}
              href={productPointerItem?.value?.url || '#'}
              className="w-full flex justify-center py-2 text-sm"
            >
              {productPointerItem?.value?.banner_button_text}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPointerWidget;
