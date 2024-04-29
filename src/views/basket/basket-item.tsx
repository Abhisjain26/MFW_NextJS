import {
  basketApi,
  useUpdateQuantityMutation
} from '@akinon/next/data/client/basket';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { BasketItem as BasketItemType } from '@akinon/next/types';
import { Price, Button, Icon, Modal, Select, Link } from '@theme/components';
import { useState } from 'react';
import { useAddFavoriteMutation } from '@akinon/next/data/client/wishlist';
import {
  useCommonProductAttributes,
  useLocalization
} from '@akinon/next/hooks';
import Style from './sumary.module.css'
import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import { Image } from '@akinon/next/components/image';
import clsx from 'clsx';
import { pushRemoveFromCart } from '@theme/utils/gtm';
interface Props {
  basketItem: BasketItemType;
}

export const BasketItem = (props: Props) => {

  const { t } = useLocalization();
  const { basketItem } = props;
  const [updateQuantityMutation] = useUpdateQuantityMutation();
  const dispatch = useAppDispatch();
  const [isRemoveBasketModalOpen, setRemoveBasketModalOpen] = useState(false);
  const [addFavorite, { isLoading: addFavoriteLoading }] =
    useAddFavoriteMutation();
  const [updateQuantityLoading, setUpdateQuantityLoading] = useState(false);
  const commonProductAttributes = useCommonProductAttributes({
    attributes: basketItem.product.attributes_kwargs
  });

  const updateQuantity = async (
    productPk: number,
    quantity: number,
    attributes: object = {}
  ) => {
    await updateQuantityMutation({
      product: productPk,
      quantity,
      attributes
    })
      .unwrap()
      .then((data) =>
        dispatch(
          basketApi.util.updateQueryData(
            'getBasket',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, data.basket);
            }
          )
        )
      );
  };

  const deleteProduct = async (productPk?: number) => {
    setUpdateQuantityLoading(true);

    try {
      await updateQuantity(basketItem.product.pk, 0, basketItem.attributes);
      pushRemoveFromCart(basketItem?.product);

      if (productPk) {
        await addFavorite(productPk);
      }
    } catch (error) {
      console.error('Error in operation:', error);
    } finally {
      setUpdateQuantityLoading(false);
      setRemoveBasketModalOpen(false);
    }
  };

  return (
    <>
      <li
        key={basketItem.id}
        className="flex border-b border-gray-200 py-3 relative my-2 "
      >
        
        <div className="w-20 lg:w-24 mr-4 shrink-0">
          <Link href={basketItem.product.absolute_url} passHref>
            <Image
              src={basketItem.product.productimage_set[0]?.image}
              alt={basketItem.product.name}
              width={80}
              height={128}
              className="md:hidden"
            />

            <Image
              src={basketItem.product.productimage_set[0]?.image}
              alt={basketItem.product.name}
              width={96}
              height={160}
              className="hidden md:block"
            />
          </Link>
        </div>
        <div className="w-full flex flex-col justify-between" >
          <div className="flex h-full">
            <div className="flex flex-1 flex-col gap-3 ">
              <div className="flex-1">
                <div className='flex items-center justify-between w-full'>
                  <Link
                    href={basketItem.product.absolute_url}
                    data-testid="basket-product-name"
                    passHref

                  >
                    <span className="text-xm color_blue">{basketItem.product.name}</span>
                  </Link>
                  <Icon
                    name="close"
                    size={8}
                    className={`self-center cursor-pointer ${Style.close_cart_icon}`} // TODO: Add hover color. Fill not working
                    onClick={() => setRemoveBasketModalOpen(true)}
                    data-testid="basket-product-remove"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  {commonProductAttributes.map((attribute, index) => (
                    <span className="text-xs" key={index}>
                      <span>{attribute.name}</span>:{' '}
                      <span
                        data-testid={`basket-item-${attribute.name.toLowerCase()}`}
                      >
                        {attribute.value}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3 lg:w-52 cart_button_add_mobile">
                <div className={`px-2 ${Style.cart_button_add} py-2 px-3`}  >
                  <button
                    onClick={() => {
                      updateQuantity(basketItem.product.pk, Math.max(1, basketItem.quantity - 1));
                    }}
                    disabled={basketItem.quantity <= 1}
                    className="btn btn-secondary"
                  >
                    <Icon size={10} name='minus' className={`${Style.cart_add_minus} p-1`} />
                  </button>
                  <span className={`mx-4 ${Style.color_cart_add_button}`}>{basketItem.quantity}</span>
                  <button
                    onClick={() => {
                      updateQuantity(basketItem.product.pk, basketItem.quantity + 1);
                    }}
                    className="btn btn-secondary "
                  >
                    <Icon size={10} name='plus' className={`${Style.cart_minus_add} p-1`} />
                    
                  </button>
                </div>
              </div>
              <div className="flex flex-col shrink-0 text-sm gap-2 items-start justify-center w-48 lg:flex-row lg:mr-6 lg:gap-6 sm:items-center lg:justify-start">
                {parseFloat(basketItem.product.retail_price) >
                  parseFloat(basketItem.product.price) && (
                    <Price
                      className="line-through color_blue"
                      value={basketItem.product.retail_price}
                    />
                  )}
                <Price
                  className={clsx(
                    parseFloat(basketItem.product.retail_price) >
                      parseFloat(basketItem.product.price)
                      ? 'text-secondary-500 color_blue'
                      : 'text-primary color_blue'
                  )}
                  value={'$' + basketItem.product.price}

                  data-testid="basket-product-price"
                />
              </div>
            </div>

          </div>

          <PluginModule
            component={Component.BasketGiftPack}
            props={{ basketItem }}
          />
        </div>
      </li>
      <Modal
        portalId="remove-basket-item"
        title={t('basket.card.modal.title')}
        className="w-full sm:w-[28rem] max-h-[90vh] overflow-y-auto"
        open={isRemoveBasketModalOpen}
        setOpen={setRemoveBasketModalOpen}
      >
        <div className="px-6 py-4">
          <p className="mb-10"> {t('basket.card.modal.question')}</p>
          <div className="space-x-3 flex items-end">
            <Button
              disabled={updateQuantityLoading}
              appearance="filled"
              onClick={() => {
                deleteProduct();
              }}
              className={
                updateQuantityLoading && 'opacity-50 cursor-not-allowed'
              }
              data-testid="basket-modal-delete"
            >
              {t('basket.card.modal.delete')}
            </Button>
            <Button
              appearance="outlined"
              disabled={addFavoriteLoading}
              onClick={() => {
                deleteProduct(basketItem.product.pk);
              }}
              className={addFavoriteLoading && 'opacity-50 cursor-not-allowed'}
              data-testid="basket-modal-delete-and-add-favorite"
            >
              {t('basket.card.modal.add_to_favorites')}
            </Button>
            <Button
              appearance="outlined"
              onClick={() => {
                setRemoveBasketModalOpen(false);
              }}
              data-testid="basket-modal-cancel"
            >
              {t('basket.card.modal.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};


