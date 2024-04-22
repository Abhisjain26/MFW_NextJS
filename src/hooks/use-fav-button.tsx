'use client';

import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation
} from '@akinon/next/data/client/wishlist';
import { Icon } from '@theme/components';
import { pushAddToWishlist } from '@theme/utils/gtm';

interface FavButtonProps {
  label?: string;
  size?: number;
  className?: string;
}

const useFavButton = (productPk: number) => {
  const { status } = useSession();

  const { data: favorites } = useGetFavoritesQuery(
    {
      limit: 1000
    },
    { skip: status !== 'authenticated' }
  );

  const favoriteItem = useMemo(
    () =>
      favorites?.results?.find(
        (item) => Number(item.product.pk) === Number(productPk)
      ),
    [favorites, productPk]
  );

  const [isActive, setIsActive] = useState(Boolean(favoriteItem));
  const [isPushed, setIsPushed] = useState<boolean>(false);

  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleClick = useCallback(async () => {
    try {
      if (favoriteItem) {
        await removeFavorite(favoriteItem.pk);
      } else {
        await addFavorite(productPk);
        setIsPushed(true);
      }
    } catch (error) {
      console.error('Failed operation:', error);
    }
  }, [favoriteItem, productPk, addFavorite, removeFavorite]);

  useEffect(() => {
    setIsActive(Boolean(favoriteItem));
  }, [favoriteItem]);

  useEffect(() => {
    if (favoriteItem && !isActive && isPushed) {
      setIsActive(true);
      pushAddToWishlist({
        base_code: favoriteItem?.product?.base_code,
        name: favoriteItem?.product?.name,
        price: favoriteItem?.product?.price,
        currency_type: favoriteItem?.product?.currency_type
      });
    }
  }, [favoriteItem, isActive, isPushed]);

  const FavButton = useMemo(() => {
    const View = (props: FavButtonProps) => (
      <button
        className={clsx(
          'flex items-center hover:text-secondary-hover hover:cursor-pointer  rounded-full px-2 py-1',
          props.className
        )}
        onClick={handleClick}
        data-testid="favourites-icon"
      >
        <Icon
          name={isActive ? 'heart-full' : 'heart-stroke'}
          className={clsx('text-2xl md:text-xl hover:fill-secondary-hover')}
        />
        {props.label && <span className="ml-2">{props.label}</span>}
      </button>
    );

    return View;
  }, [isActive, handleClick]);

  return {
    FavButton
  };
};

export default useFavButton;
