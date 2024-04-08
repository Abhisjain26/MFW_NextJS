'use client';

import { useAddProductToBasket } from '../../hooks';
import useFavButton from '../../hooks/use-fav-button';
import { Button } from '@theme/components';
import { useEffect, useState } from 'react';
import { useGetProductByPkQuery } from '@akinon/next/data/client/product';
import { ProductResult } from '@akinon/next/types';
import PriceWrapper from './price-wrapper';
import Variant from './variant';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';

export default function CombineProductCard(
  props: ProductResult & { index: number }
) {
  const { t } = useLocalization();
  const { index, product, in_stock } = props;
  const [productPk, setProductPk] = useState(product.pk);
  const [productVariants, setProductVariants] = useState([]);
  const [addProduct, { isLoading }] = useAddProductToBasket();
  const { data } = useGetProductByPkQuery(productPk);
  const { FavButton } = useFavButton(productPk);

  const addProductToCart = () => {
    addProduct({ product: productPk, quantity: 1, attributes: {} });
  };

  useEffect(() => {
    if (data) {
      setProductVariants(data.variants ?? []);
    }
  }, [data]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-start w-full">
        <div className="mr-4 shrink-0">
          <Image
            src={product.productimage_set[0]?.image}
            alt={props.product.name}
            width={144}
            height={224}
          />
        </div>
        <div className="flex flex-col items-start w-full relative">
          <FavButton className="absolute top-0 right-0" />
          <h2 className="text-base text-center" data-testid="product-name">
            {index + 1}. {product.name}
          </h2>
          <div className="">
            <PriceWrapper
              price={product.price}
              retailPrice={product.retail_price}
            />
          </div>
          <div className="flex flex-col">
            {productVariants.map((variant) => (
              <Variant
                key={variant.attribute_key}
                {...variant}
                preventDefaultClick={true}
                onChange={(option) => {
                  setProductPk(option.product.pk);
                }}
                className="items-start mt-4"
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        disabled={!in_stock || isLoading}
        className="w-full h-12 mt-3 font-semibold"
        onClick={addProductToCart}
        data-testid="product-add-to-cart"
      >
        {t('product.add_to_cart')}
      </Button>
    </div>
  );
}
