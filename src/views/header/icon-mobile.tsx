'use client';

import { Icon, Link } from '@theme/components';
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
import { openSearch, setOpenedMenu } from '@akinon/next/redux/reducers/header';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { useState } from 'react';

export default async function IconMobile() {

    const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
    const dispatch = useAppDispatch();
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setSelectedTabIndex(index);
        dispatch(setOpenedMenu(null));
    };
    return (
        <div>
            <button
                onClick={() => dispatch(openSearch())}
                className="flex items-center gap-2 text-sm uppercase transition hover:text-secondary cursor-pointer"
                data-testid="header-nav-search"
            >
                <Icon name="search" size={16} />
            </button>

            <Link href="/account">
                <Icon name="user" size={16} />
            </Link>
            <div className='relative'>
                <Icon name="cart" size={16} />
                <span className='absolute header_cart right-0'>
                    {basket && basket.total_quantity !== undefined && basket.total_quantity}
                </span>
            </div>
        </div >
    );
}

