'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { closeSearch } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';

import { Icon } from '@theme/components';
import Results from './results';
import { ROUTES } from '@theme/routes';
import { useLocalization, useRouter } from '@akinon/next/hooks';

export default function Search() {
  const { t } = useLocalization();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isSearchOpen = useAppSelector((state) => state.header.isSearchOpen);
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  return (
    <>
      <div
        className={clsx(
          // 177px is the height of the header
          ' bg-black opacity-75 w-full  transition duration-500 left-0 bottom-0 translate-y-full z-30',
          isSearchOpen && searchText
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        )}
        role="button"
        onClick={() => dispatch(closeSearch())}
      />
      <div
        className={clsx(
          'search_bar_content absolute overflow-auto max-h-screen  p-6 left-0 lg:bottom-0 z-40 ',
          isSearchOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="max-w-screen-2xl mx-auto flex flex-col gap-12 relative py-5">
          <div className='w-7/12 mx-auto'>
            <div className='w-11/12 px-16 py-9 bg-white'>
              <div className="border-b border-gray-400 mx-auto flex-col py-1.5 gap-2 self-center items-center md:flex-row">
                {/* <span className="text-xl lg:text-2xl">
              {t('common.search.results_for')}
            </span> */}
                <div className='flex justify-end mb-5'>
                  <Icon
                    name="close"
                    size={14}
                    
                    onClick={() => dispatch(closeSearch())}
                    className="cursor-pointer "
                  />
                </div>
                <div className="flex justify-between w-full px-4 search_input items-center">
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchText.trim() !== '') {
                        router.push(`${ROUTES.LIST}/?search_text=${searchText}`);
                      }
                    }}
                    className="border-0 text-sm py-3 outline-none text-secondary search_input px-4 placeholder:text-sm placeholder:text-black placeholder:lg:text-sm"
                    placeholder={t('common.search.placeholder')}
                    ref={inputRef}
                  />
                  <Icon
                    name="search"
                    size={14}
                    onClick={() => dispatch(closeSearch())}
                    className="cursor-pointer search_icon"
                  />

                </div>
              </div>
              <Results searchText={searchText} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
