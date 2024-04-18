'use client';

import React, { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import Styled from 'styled-components'
import { Button, Icon, Select, Link } from '@theme/components';
import { SortOption } from '@akinon/next/types';

import { useRouter, useLocalization } from '@akinon/next/hooks';
import Breadcrumb from '../breadcrumb';

interface Props {
  totalCount: number;
  setMenuStatus: () => void;
  sortOptions: SortOption[];
}

export const CategoryHeader = (props: Props) => {
  const { t } = useLocalization();
  const PAGE_SIZE = [
    { label: t('category.filters.48_products'), value: 48 },
    { label: t('category.filters.96_products'), value: 96 }
  ];

  const LAYOUTS = [
    { icon: 'layout-2', value: 2 },
    { icon: 'layout-3', value: 3 }
  ];
  const { totalCount, setMenuStatus, sortOptions } = props;
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageSize = useMemo(
    () => searchParams.get('page_size') ?? 48,
    [searchParams]
  );
  const layoutSize = useMemo(
    () => searchParams.get('layout') ?? 3,
    [searchParams]
  );

  const handleSelectFilter = ({
    key,
    value
  }: {
    key: string;
    value: string;
  }) => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());

    urlSearchParams.set(key, value);

    router.push(pathname + '?' + urlSearchParams.toString());
  };
  // const breadcrumbList = [
  //   { url: '/list', label: 'List' },
  // ];
  return (
    <Wrapper>
      {/* <Breadcrumb breadcrumbList={breadcrumbList} /> */}

      <div className="flex flex-col gap-4 mb-4 text-gray-950 text-sm">
        <div className="flex items-center border list_main_content">
          <span className="hidden lg:block">
            <span data-testid="list-count">{totalCount}</span>{' '}
            {t('category.header.results')}
          </span>

          <div className="hidden lg:flex gap-5 ml-auto mr-7 py-2 border border-gray-100 dropdown_list_sorter">
            {/* <span> {t('category.header.view')}</span>
          {PAGE_SIZE.map(({ label, value }) => (
            <a
              key={value}
              onClick={() => {
                handleSelectFilter({
                  key: 'page_size',
                  value: String(value)
                });
              }}
              className={clsx('cursor-pointer', {
                'text-black font-semibold': Number(pageSize) === value
              })}
            >
              {label}
            </a>
          ))} */}
            <div className="flex items-center gap-2 pl-5 grid_layout border-gray-400">
              {LAYOUTS.map(({ icon, value }) => (
                <a
                  key={value}
                  onClick={() => {
                    handleSelectFilter({
                      key: 'layout',
                      value: String(value)
                    });
                  }}
                  className={clsx(
                    'cursor-pointer',
                    Number(layoutSize) === value ? 'fill-black' : 'fill-gray-500'
                  )}
                >
                  <Icon key={value} name={icon} size={16} />
                </a>
              ))}
            </div>
          </div>
          <Button
            className="relative border-gray-100 text-left mr-5 bg-white text-primary-100 w-40 lg:hidden lg:mr-0"
            onClick={() => setMenuStatus()}
            data-testid="list-filter"
          >
            {t('category.filters.title')}
            <Icon
              name="chevron-down"
              size={10}
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            />
          </Button>
          <div className='flex items-center'>
            <h3 className='uppercase text-base font-medium'>Sort by :</h3>
            <Select
              options={sortOptions}
              value={sortOptions.find(({ is_selected }) => is_selected).value}
              data-testid="list-sorter"
              className='dropdown_list_grid'
              onChange={(e) => {
                handleSelectFilter({
                  key: 'sorter',
                  value: e.currentTarget.value
                });
              }}
              borderless={false}
            />
          </div>
        </div>
        {totalCount === 0 && (
          <div className="h-40 flex items-center justify-center  flex-col bg-gray-200 p-4">
            <div className="text-center">
              <span className="text-lg">{t('category.search.not_found')}</span>
            </div>
            <div className="mt-3 text-center">
              <Link href="/" className="underline text-lg">
                {t('category.search.link')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = Styled.section`
  .list_main_content{
    border-top:1.5px solid #E987B4; 
    border-bottom:1.5px solid #E987B4; 
    border-right:0px; 
    border-left:0px;
    padding:2px;
  }
  .dropdown_list_sorter{
    border:none;
    color:#000000;
    padding-right:3.25rem !important;
    border-right:1px solid #E987B4;
  }
  .dropdown_list_grid{
    border: none;
    margin-right: 10px;
    color: #000000;
    font-weight: 600;
    font-size: 14px;
  }
`