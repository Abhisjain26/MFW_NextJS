'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { closeSearch } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';

import { Icon } from '@theme/components';
import { ROUTES } from '@theme/routes';
import { useLocalization, useRouter } from '@akinon/next/hooks';
import Results from '../header/search/results';
import ListPage from './category-info';
import { useSearchParams } from 'next/navigation'

export default function SearchModal({ total }) {
    const { t } = useLocalization();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const isSearchOpen = useAppSelector((state) => state.header.isSearchOpen);
    const [searchText, setSearchText] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [urlText, setUrlText] = useState<string | null>(null);
    const searchParams = useSearchParams()
    //   useEffect(() => {
    //     if (isSearchOpen) {
    //       inputRef.current?.focus();
    //       document.body.style.overflow = 'hidden';
    //     }

    //     return () => {
    //       document.body.style.overflow = 'auto';
    //     };
    //   }, [isSearchOpen]);
    useEffect(() => {
        // Check if running in the browser environment
        if (typeof window !== 'undefined') {
            const currentURL = window.location.href;
            const url = new URL(currentURL);
            const urlText = url.searchParams.get('search_text');
            setUrlText(urlText);
        }
    }, [searchParams]);
    const handleSearch = () => {
        if (searchText.trim() !== '') {
            router.push(`${ROUTES.SEARCH}/?search_text=${searchText}`);
            setSearchText(searchText)
        }
    };
    return (
        <>
            <div
            // className={clsx(
            //   // 177px is the height of the header
            //   ' bg-black opacity-75 w-full  transition duration-500 left-0 bottom-0 translate-y-full z-30',
            //   isSearchOpen && searchText
            //     ? 'visible opacity-100'
            //     : 'invisible opacity-0'
            // )}
            // role="button"
            // onClick={() => dispatch(closeSearch())}
            />
            <div
                className={clsx(
                    // 'search_bar_content absolute overflow-auto max-h-screen  p-6 left-0 lg:bottom-0 z-40 ',
                    //   isSearchOpen ? 'visible opacity-100' : 'invisible opacity-0'
                )}
            >
                <div className="max-w-screen-2xl mx-auto flex flex-col gap-6 relative py-5">
                    <div className='px-24 flex justify-center search_text_search uppercase'>
                        {total} RESULTS FOR &quot; {urlText || searchText} &quot;
                    </div>
                    <div className='w-11/12 mx-auto'>
                        <div className='w-full px-16 pb-9 bg-white'>
                            <div className="border-b border-gray-400 mx-auto flex py-1.5 gap-4 self-center items-center">
                                <div className="flex justify-between w-full px-4 search_input items-center">
                                    <input
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSearch();
                                            }
                                        }}
                                        className="border-0 text-sm py-3 outline-none text-secondary search_input px-4 placeholder:text-sm placeholder:text-black placeholder:lg:text-sm"
                                        placeholder={t('common.search.placeholder')}
                                        ref={inputRef}

                                    />
                                    <Icon
                                        name="search"
                                        size={14}
                                        onClick={handleSearch}
                                        className="cursor-pointer search_icon"
                                    />
                                </div>
                                <div>
                                    <Icon
                                        name="close"
                                        size={14}

                                        onClick={() => setSearchText('')}
                                        className="cursor-pointer "
                                    />
                                </div>
                            </div>
                            {/* <ListPage /> */}
                            {/* <Results searchText={searchText} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
