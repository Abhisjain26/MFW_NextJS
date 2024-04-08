'use client';

import { useLocalization } from '@akinon/next/hooks';
import { useGetFavoritesQuery } from '@akinon/next/data/client/wishlist';
import { useSearchParams } from 'next/navigation';
import FavoriteProductsList from '@theme/views/account/favourite-products/favourite-products-list';

const AccountWishlist = () => {
  const { t } = useLocalization();
  const searchParams = useSearchParams();
  const { data: favorites } = useGetFavoritesQuery({
    page: Number(searchParams.get('page')),
    limit: Number(searchParams.get('limit'))
  });

  return (
    <div className="flex-1">
      <div className="bg-gray-150 p-4 lg:p-8">
        <h2 className="text-3xl text-center mb-5">
          {t('account.my_wishlist.header.title')}
        </h2>
        <p className="text-center">
          <span>{t('account.my_wishlist.header.subtitle')}</span> (
          <span data-testid="favorites-count">{favorites?.count || 0}</span>)
        </p>
      </div>
      <FavoriteProductsList />
    </div>
  );
};

export default AccountWishlist;
