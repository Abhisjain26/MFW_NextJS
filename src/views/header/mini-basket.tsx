'use client';

import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import {
  basketApi,
  useGetBasketQuery,
  useUpdateQuantityMutation
} from '@akinon/next/data/client/basket';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { closeMiniBasket } from '@akinon/next/redux/reducers/root';
import { BasketItem } from '@akinon/next/types';
import { Price, Button, Icon, LoaderSpinner, Link } from '@theme/components';
import { ROUTES } from '@theme/routes';
import {
  useCommonProductAttributes,
  useLocalization
} from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import { pushRemoveFromCart } from '@theme/utils/gtm';

interface MiniBasketItemProps {
  basketItem: BasketItem;
  highlightedItem: number;
  miniBasketListRef: MutableRefObject<HTMLUListElement>;
}

function MiniBasketItem(props: MiniBasketItemProps) {
  const { basketItem, highlightedItem, miniBasketListRef } = props;
  const dispatch = useAppDispatch();
  const [updateQuantityMutation] = useUpdateQuantityMutation();
  const commonProductAttributes = useCommonProductAttributes({
    attributes: basketItem.product.attributes_kwargs
  });
  const { t } = useLocalization();

  const isHighlighted = useMemo(() => {
    return highlightedItem === basketItem.product.pk;
  }, [highlightedItem, basketItem.product.pk]);

  useEffect(() => {
    const miniBasketList = miniBasketListRef.current;

    if (highlightedItem === basketItem.product.pk) {
      if (miniBasketList.scrollTop > 0) {
        miniBasketList.scrollTop = 0;
      }
    }
  }, [highlightedItem, basketItem.product.pk]);

  const removeItem = () => {
    updateQuantityMutation({
      product: basketItem.product.pk,
      quantity: 0,
      attributes: {} // TODO: Handle attributes
    })
      .unwrap()
      .then((data) => {
        dispatch(
          basketApi.util.updateQueryData(
            'getBasket',
            undefined,
            (draftBasket) => {
              Object.assign(draftBasket, data.basket);
            }
          )
        );

        pushRemoveFromCart(basketItem?.product);
      });
  };

  return (
    <li
      style={{ order: isHighlighted ? '-1' : '0' }}
      className={clsx('flex gap-3 py-4 border-b border-gray-500')}
    >
      <Link
        href={basketItem.product.absolute_url}
        className={clsx(
          'block shrink-0 transition-all duration-300',
          isHighlighted ? 'w-24 h-40' : 'w-12 h-20'
        )}
      >
        <Image
          src={basketItem.product.productimage_set?.[0]?.image ?? ''}
          alt={basketItem.product.name}
          width={isHighlighted ? 96 : 48}
          height={isHighlighted ? 160 : 80}
          className="transition-all duration-300"
        />
      </Link>
      <div className="flex flex-col flex-1">
        <div
          className={clsx(
            'flex items-center gap-1 transition-all duration-300',
            isHighlighted
              ? 'h-16 opacity-100 visible'
              : 'h-0 opacity-0 invisible'
          )}
        >
          <p className="text-[rgb(123,157,118)]">
            {t('basket.mini_basket.in_the_bag')}
          </p>
          <Icon name="check" className="text-[rgb(123, 157, 118)]" size={14} />
        </div>
        <Link
          href={basketItem.product.absolute_url}
          className="block"
          data-testid="mini-basket-item-name"
        >
          {basketItem.product.name}
          {/* TODO: Get correct variants */}
        </Link>
        {commonProductAttributes.map((attribute, index) => (
          <span
            key={index}
            data-testid={`mini-basket-item-${attribute.name.toLowerCase()}`}
          >
            {attribute.name}: {attribute.value}
          </span>
        ))}
        <footer className="flex justify-between mt-3">
          {parseFloat(basketItem.retail_price) >
            parseFloat(basketItem.price) && (
            <Price
              value={parseFloat(basketItem.retail_price) * basketItem.quantity}
              className="line-through"
            />
          )}
          <Price value={basketItem.total_amount} />
          <Button
            appearance="ghost"
            className={clsx(
              'p-0 h-auto text-xs font-semibold underline transition-all duration-300',
              isHighlighted ? 'invisible' : 'visible'
            )}
            onClick={removeItem}
          >
            {t('basket.mini_basket.remove')}
          </Button>
        </footer>
      </div>
    </li>
  );
}

export default function MiniBasket() {
  const { open: miniBasketOpen } = useAppSelector(
    (state) => state.root.miniBasket
  );
  const dispatch = useAppDispatch();
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
  const { t } = useLocalization();
  const { highlightedItem } = useAppSelector((state) => state.root.miniBasket);
  const [highlightedItemPk, setHighlightedItemPk] = useState(0);
  const [sortedBasket, setSortedBasket] = useState([]);

  const totalQuantity = useMemo(() => basket?.total_quantity ?? 0, [basket]);
  const miniBasketList = useRef();

  useEffect(() => {
    if (highlightedItem > 0) {
      setHighlightedItemPk(highlightedItem);
    }
  }, [highlightedItem]);

  useEffect(() => {
    if (isSuccess) {
      if (highlightedItemPk > 0) {
        setSortedBasket(
          basket.basketitem_set.slice().sort((a, b) => {
            if (a.product.pk === highlightedItemPk) {
              return -1;
            } else if (b.product.pk === highlightedItemPk) {
              return 1;
            } else {
              return a.product.pk - b.product.pk;
            }
          })
        );
      } else {
        setSortedBasket(basket.basketitem_set);
      }
    }
  }, [isSuccess, highlightedItem, basket]);

  return (
    <>
      <div
        className={clsx(
          miniBasketOpen
            ? 'opacity-100 visible lg:invisible'
            : 'opacity-0 invisible',
          'fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-80 transition-all duration-300'
        )}
        onClick={() => {
          dispatch(closeMiniBasket());
        }}
      />
      <div
        className={clsx(
          miniBasketOpen
            ? 'flex flex-col opacity-100 visible lg:translate-y-[calc(100%)]'
            : 'opacity-0 invisible translate-x-full lg:translate-x-0 lg:translate-y-[calc(100%+16px)]',
          'fixed lg:absolute bottom-0 lg:-bottom-1 right-0 w-80 h-screen lg:h-auto bg-white lg:border-l lg:border-t lg:border-r-2 lg:border-b-2 lg:border-gray-500 p-5 z-50 transition-all duration-300'
        )}
      >
        <header className="flex items-center gap-2 pb-3 border-b">
          <h3 className="text-xl font-bold">
            {t('basket.mini_basket.my_bag')}
          </h3>
          <span>
            {totalQuantity}
            {t('basket.mini_basket.items')}
          </span>
          <Icon
            name="close"
            size={16}
            className="ml-auto fill-primary hover:cursor-pointer"
            onClick={() => dispatch(closeMiniBasket())}
          />
        </header>
        {isLoading && <LoaderSpinner />} {/* TODO: Fix spinner position */}
        {isSuccess && (
          <ul
            ref={miniBasketList}
            className="overflow-y-auto lg:max-h-64 flex flex-col"
          >
            {sortedBasket.map((basketItem) => (
              <MiniBasketItem
                key={basketItem.product.pk}
                basketItem={basketItem}
                highlightedItem={highlightedItem}
                miniBasketListRef={miniBasketList}
              />
            ))}
          </ul>
        )}
        <footer className="flex flex-col gap-3 mt-auto lg:mt-3 lg:flex-1">
          <div className="flex self-center gap-1 text-xs font-semibold">
            <span>{t('basket.mini_basket.subtotal')}</span>
            <Price value={basket?.total_amount} />
          </div>
          {/* TODO: Fix link styles */}
          <Link
            onClick={() => {
              dispatch(closeMiniBasket());
            }}
            href={ROUTES.BASKET}
            data-testid="mini-basket-view-bag"
            className="w-full flex items-center justify-center bg-primary text-primary-foreground border border-primary h-8 font-semibold transition-all hover:bg-primary-foreground hover:text-primary"
          >
            {t('basket.mini_basket.view_bag')}
          </Link>
          <Link
            href="/"
            className="h-auto p-0 font-semibold underline self-center"
            data-testid="mini-basket-continue-shopping"
          >
            {t('basket.mini_basket.continue_shopping')}
          </Link>
        </footer>
      </div>
    </>
  );
}
