'use client';

import { ReactNode, useMemo, useRef, useCallback } from 'react';
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import {
  closeMiniBasket,
  toggleMiniBasket
} from '@akinon/next/redux/reducers/root';
import { openSearch } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';
import { ROUTES } from '@theme/routes';

import MiniBasket from './mini-basket';
import { Badge, Icon, Link } from '@theme/components';
import { useOnClickOutside } from '@akinon/next/hooks';

interface MenuItem {
  label: string;
  url?: string;
  action?: () => void;
  icon: string;
  className?: string;
  badge?: ReactNode;
  miniBasket?: ReactNode;
  dataTestId?: string;
}

export default function ActionMenu() {
  const dispatch = useAppDispatch();

  const { data } = useGetBasketQuery();
  const totalQuantity = useMemo(() => data?.total_quantity ?? 0, [data]);

  const { open: miniBasketOpen } = useAppSelector(
    (state) => state.root.miniBasket
  );
  const miniBasketRef = useRef(null);
  const closeMiniBasketCb = useCallback(() => {
    if (miniBasketOpen) dispatch(closeMiniBasket());
  }, [miniBasketOpen, dispatch]);
  useOnClickOutside(miniBasketRef, closeMiniBasketCb);

  const MenuItems: MenuItem[] = [
    {
      label: 'Search',
      action: () => {
        dispatch(openSearch());
      },
      icon: 'search',
      className: 'sm:hidden',
      dataTestId: 'header-search'
    },
    {
      label: 'Favourite Products',
      url: ROUTES.ACCOUNT_WISHLIST,
      icon: 'heart-stroke',
      dataTestId: 'header-favourite'
    },
    {
      label: 'Basket',
      action() {
        dispatch(toggleMiniBasket());
      },
      icon: 'cart',
      dataTestId: 'header-basket',
      badge: (
        <Badge
          className={clsx(
            'w-4',
            totalQuantity === 0
              ? 'bg-primary text-gray-500'
              : 'bg-secondary-500 text-white'
          )}
        >
          {totalQuantity}
        </Badge>
      ),
      miniBasket: <MiniBasket />
    }
  ];

  return (
    <ul className="flex items-center space-x-3 lg:space-x-10">
      {MenuItems.map((menu, index) => (
        <li
          key={index}
          className={clsx('flex items-center relative', menu.className)}
          ref={menu.miniBasket ? miniBasketRef : null}
        >
          {menu.action ? (
            <button onClick={menu.action} data-testid={menu.dataTestId}>
              <Icon name={menu.icon} size={24} />
              {menu.badge}
            </button>
          ) : (
            <Link
              href={menu.url ?? '#'}
              passHref={true}
              onClick={(event) => {
                if (menu.action) {
                  event.preventDefault();
                  menu.action();
                }
              }}
              data-testid={menu.dataTestId}
            >
              <Icon name={menu.icon} size={24} />
              {menu.badge}
            </Link>
          )}
          {menu.miniBasket}
        </li>
      ))}
    </ul>
  );
}
