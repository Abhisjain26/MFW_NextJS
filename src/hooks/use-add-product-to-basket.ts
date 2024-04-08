'use client';

import { useAppDispatch } from '@akinon/next/redux/hooks';
import { useAddProductMutation, AddProductRequest } from '@akinon/next/data/client/product';
import { basketApi } from '@akinon/next/data/client/basket';
import { openMiniBasket, setHighlightedItem } from '@akinon/next/redux/reducers/root';

export const useAddProductToBasket = () => {
  const dispatch = useAppDispatch();
  const [addProduct, options] = useAddProductMutation();

  const addProductToBasket = async ({
    product,
    quantity,
    attributes,
    shouldOpenMiniBasket = true 
  }: AddProductRequest & { shouldOpenMiniBasket?: boolean }) => {
    await addProduct({
      product,
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
      )
      .then(() => {
        if (shouldOpenMiniBasket) {
          dispatch(openMiniBasket());
          dispatch(setHighlightedItem(product));
          setTimeout(() => {
            dispatch(setHighlightedItem(null));
          }, 3000);
        }
        
      });
  };

  return [addProductToBasket, options] as const;
};
