'use client';

import { useMemo } from 'react';
import { useAutocompleteQuery } from '@akinon/next/data/client/misc';
import { ROUTES } from '@theme/routes';

import { LoaderSpinner, Price, Link, Icon } from '@theme/components';
import { useDebounce, useLocalization } from '@akinon/next/hooks';
// eslint-disable-next-line @akinon/projectzero/image-import
import Image from 'next/image';
interface ResultsProps {
  searchText: string;
}

const MINIMUM_SEARCH_LENGTH = 3;

export default function Results(props: ResultsProps) {
  const { searchText } = props;
  const { t } = useLocalization();
  const debouncedSearchText = useDebounce(searchText, 400);
  const { currentData, isFetching, isLoading } = useAutocompleteQuery(
    debouncedSearchText,
    {
      refetchOnMountOrArgChange: true,
      skip: debouncedSearchText.length < MINIMUM_SEARCH_LENGTH
    }
  );

  const categories = useMemo(
    () =>
      currentData?.groups.find((group) => group.suggestion_type === 'Category')
        ?.entries ?? [],
    [currentData]
  );

  const products = useMemo(
    () =>
      currentData?.groups.find((group) => group.suggestion_type === 'Product')
        ?.entries ?? [],
    [currentData]
  );

  if (
    debouncedSearchText.length < MINIMUM_SEARCH_LENGTH ||
    searchText !== debouncedSearchText
  ) {
    return null;
  }

  if (isLoading || isFetching) {
    return <LoaderSpinner />;
  }

  if (categories.length === 0 && products.length === 0) {
    return <p className="text-left p-3">{t('common.search.not_found')}</p>;
  }

  return (
    <div className='w-full mx-auto flex justify-center bg-white'>
      <div className="w-full p-3 justify-center flex flex-wrap gap-4 md:gap-0">
        {categories.length > 0 && (
          <div className="flex flex-col w-44">
            <h6 className="mb-6 font-semibold">
              {t('common.search.categories')}
            </h6>
            <ul className="flex flex-col gap-3">
              {categories.map((category, index) => (
                <li key={index} className="text-sm">
                  <Link href={category.url}>{category.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex-1 mt-5 px-6 flex flex-col gap-6">
          {/* <h6 className="font-semibold">
            {t('common.search.products_for')}{' '}
            <span className="text-secondary uppercase">
              {debouncedSearchText}
            </span>
          </h6> */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-8">
            {products.map((product, index) => (
              <div className='flex justify-between' key={index}>
                <div className='flex'>
                  <div className="relative aspect-[315/448] w-11 h-12">
                    {product.extra.image ? (
                      <Image
                        src={product.extra.image}
                        alt={product?.label}
                        fill
                        className=' rounded-full'
                        sizes="(min-width: 320px) 164px,
                     (min-width: 640px) 50vw,
                     (min-width: 1160px) 315px"
                      />
                    ) : (
                      <Image
                        className="h-full rounded-full object-cover"
                        src="/noimage.jpg"
                        alt={product?.label}
                        fill
                        sizes="100vw"
                      />
                    )}
                  </div>

                  <span className="text-sm mt-2 ms-5">{product?.label}</span>
                </div>
                <Link href={product?.url} key={index}>

                  <div>
                    <Icon name='chevron-end' className='search_icon' size={12} />
                  </div>
                  {/* <Price
                  value={product?.extra?.price}
                  className="font-semibold text-sm"
                /> */}
                </Link>
              </div>
            ))}
          </div>
          <Link
            href={`${ROUTES.LIST}/?search_text=${debouncedSearchText}`}
            data-testid="search-view-all"
            className="w-full py-3 px-10 border border-primary text-center text-xs font-semibold hover:bg-primary hover:text-white transition-all"
          >
            {t('common.search.view_all')} {debouncedSearchText.toUpperCase()}
          </Link>
        </div>
      </div>
    </div>
  );
}
