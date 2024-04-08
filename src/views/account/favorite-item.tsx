import { useGetProductByPkQuery } from '@akinon/next/data/client/product';
import { useRemoveFavoriteMutation } from '@akinon/next/data/client/wishlist';
import { useAddProductToBasket } from '../../hooks';
import clsx from 'clsx';
import { FavoriteItem as FavoriteItemType } from '@akinon/next/types';
import {
  Price,
  Button,
  Icon,
  Select,
  Skeleton,
  SkeletonWrapper,
  Link
} from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import { useState } from 'react';
interface Props {
  item: FavoriteItemType;
  index: number;
}

// item.produt is the product come from the favorites endpoint
// data.product is the product come from the product endpoint
// these are different because the favorites endpoint does not have the product variant and selected variants etc.

export const FavoriteItem = (props: Props) => {
  const { t } = useLocalization();
  const { item, index } = props;
  const [selectedProduct, setProduct] = useState(item.product);
  const { data, isLoading, isSuccess } = useGetProductByPkQuery(
    selectedProduct.pk
  );
  const [removeFavorite, { isLoading: isRemoveFavoriteLoading }] =
    useRemoveFavoriteMutation();
  const [addProductToBasket, { isLoading: isAddProductToBasketLoading }] =
    useAddProductToBasket();

  const handleOnClick = (selectedProduct, favoriteProduct) => {
    if (
      favoriteProduct.product.attributes.color ===
        selectedProduct.attributes.color ||
      favoriteProduct.product.pk === selectedProduct.pk
    )
      removeFavorite(favoriteProduct.pk);

    addProductToBasket({
      product: selectedProduct.pk,
      quantity: 1,
      attributes: {}
    });
  };

  return (
    <div className="w-1/2 flex flex-col mb-8 px-3 lg:w-1/3">
      <div className="relative mb-3 h-full flex items-center">
        <Link href={selectedProduct.absolute_url} className="w-full h-full">
          {selectedProduct.productimage_set[0] ? (
            <Image
              src={selectedProduct.productimage_set[0]?.image}
              alt={selectedProduct.name}
              aspectRatio={192 / 280}
              fill
              crop="center"
              sizes="(min-width: 425px) 216px,
              (min-width: 475px) 264px,
              (min-width: 768px) 356px,
              (min-width: 1024px) 212px,
              (min-width: 1170px) 260px,
              (min-width: 1370px) 352px, 192px"
            />
          ) : (
            <Image
              src="/noimage.jpg"
              fill
              aspectRatio={192 / 280}
              sizes="(min-width: 425px) 216px,
              (min-width: 475px) 264px,
              (min-width: 768px) 356px,
              (min-width: 1024px) 212px,
              (min-width: 1170px) 260px,
              (min-width: 1370px) 352px, 192px"
              alt={t('account.base.no_image')}
              className="object-cover"
            />
          )}
        </Link>

        <Icon
          name="close"
          size={14}
          onClick={() => removeFavorite(item.pk)}
          className={clsx(
            'absolute top-4 right-4 cursor-pointer',
            isRemoveFavoriteLoading
              ? 'pointer-events-none hover:cursor-wait' // TODO: Cursors not working fix!
              : 'hove:cursor-pointer'
          )}
          data-testid="favorites-remove"
        />
      </div>

      <div
        data-testid={`favorites-variant-${selectedProduct.pk}-${index}`}
        className="flex flex-1 flex-col justify-between"
      >
        <div className="text-sm">
          <Link
            href={selectedProduct.absolute_url}
            data-testid="favorites-product-name"
          >
            {selectedProduct.name}
          </Link>
        </div>

        <div>
          {parseFloat(selectedProduct.retail_price) >
            parseFloat(selectedProduct.price) && (
            <span className="font-normal line-through mr-3">
              <Price value={selectedProduct.retail_price} />
            </span>
          )}
          <span className="font-semibold">
            <Price value={selectedProduct.price} />
          </span>
        </div>

        {isLoading && (
          <SkeletonWrapper className="gap-2">
            <SkeletonWrapper>
              <Skeleton className="w-full h-10 mt-2" />
              <Skeleton className="w-full h-10 mt-2" />
            </SkeletonWrapper>
            <Skeleton className="w-full h-10" />
          </SkeletonWrapper>
        )}

        {isSuccess && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              {data.variants.map((variant, i) => {
                const variantOptions = variant.options
                  .filter((option) => option.is_selectable)
                  .map((option) => ({
                    is_selected: option.is_selected,
                    label: option.label,
                    value: option.value
                  }));

                return (
                  <Select
                    className="w-full mt-2"
                    key={i}
                    options={variantOptions}
                    defaultValue={
                      selectedProduct.attributes[variant.attribute_key]
                    }
                    onChange={(e) => {
                      const selectedProduct = variant.options.find(
                        ({ label }) => label === e.currentTarget.value
                      )?.product;

                      setProduct(selectedProduct);
                    }}
                  />
                );
              })}
            </div>

            <Button
              disabled={
                !selectedProduct.in_stock || isAddProductToBasketLoading
              }
              appearance="outlined"
              type="submit"
              className={clsx(
                'w-full',
                !selectedProduct.in_stock &&
                  'hover:bg-transparent hover:text-black'
              )}
              onClick={() => handleOnClick(selectedProduct, item)}
              data-testid="favorites-add-cart"
            >
              {t('account.my_wishlist.submit_button')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
