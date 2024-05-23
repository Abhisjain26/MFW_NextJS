'use client';

import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { openSearch, setOpenedMenu } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';
import { MenuItemType } from '@akinon/next/types';
import React, { useEffect, useState } from 'react';
import { Icon, Link } from '@theme/components';
import Search from './search';
import { Image } from '@akinon/next/components/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ROUTES } from '@theme/routes';
import { useRouter, useLocalization } from '@akinon/next/hooks';
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
import MobileHamburgerButton from './mobile-hamburger-button';
// import { useRouter } from 'next/router';

interface NavbarProps {
  menu: MenuItemType[];
}

export default function Navbar(props: NavbarProps) {
  const { menu } = props;
  // const router = useRouter();

  const dispatch = useAppDispatch();
  const { data: basket, isLoading, isSuccess } = useGetBasketQuery();
  const { isSearchOpen, openedMenu } = useAppSelector((state) => state.header);
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [change, setChange] = useState('')
  const router = useRouter();
  const windowurl = window.location.pathname
  const handleTabClick = (index) => {
    setSelectedTabIndex(index);
    dispatch(setOpenedMenu(null));
  };
  const isActive = (url: string) => {
    const result = (url.replace("-new", "") === windowurl.replace("-new","") ? 'active_header' : '');
    return result;
  };

  // useEffect(() => {
  //   // setCurrentUrl(window.location.pathname);
  // },[windowurl, change])

  useEffect(() => {
    // setCurrentUrl(window.location.pathname);
    const handleUrlChange = () => {
      setCurrentUrl(window.location.pathname);
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [currentUrl,windowurl, change]);

  // useEffect(() => {
  //   if (page > 1 && data.products?.length === 0) {
  //     const newUrl = new URL(window.location.href);
  //     // newUrl.searchParams.delete('page');
  //     router.push(newUrl.pathname + newUrl.search, undefined);
  //   }

  // }, [searchParams, data.products, page]);

  const handleChildItemClick = (childUrl) => {
    dispatch(setOpenedMenu(null));
    router.push(`/list?attributes_type=${childUrl}&page=1`);
  };

  const handleChange = (url) => {
    // router.push(url);
  }

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {

  //   }
  // }, [router]);  
  // Close the opened menu

  // Navigate to the list page with the selected data type as a query parameter

  return (
    <div key={change} className='relative w-full container'>
      <nav className="relative w-full flex-wrap items-center mobile_dekstop_view justify-center hidden header-grid-area-nav sm:flex justify-between">
        <ul className="flex flex-wrap w-full items-center justify-center header_content mt-8 justify-between">
          {menu.map((item, index) =>
            item.label != null && (
              <li
                key={index}
                className={`flex items-center h-full group ${openedMenu === item.pk ? 'active_header' : ''} ${isActive(item.url)}`}
                onMouseEnter={() => {
                  dispatch(setOpenedMenu(item.pk));
                }}
                onMouseLeave={() => {
                  dispatch(setOpenedMenu(null));
                }}
              >
                {item.extra_context?.attributes?.menu_image?.kwargs?.url && (
                  <Image src={item.extra_context.attributes.menu_image.kwargs.url} width={10} height={10} alt="" />
                )}

                <Link
                  href={item.url}
                  className={`flex items-center ms-1 text-xs capitalize ${isActive(item.url)}`}
                  data-testid="navbar-category"
                  onClick={() => { setChange(item.url); handleChange(item.url)}}
                >
                  {item.label}
                </Link>

                {openedMenu === item.pk && item.children.length > 0 && (
                  <div
                    className={clsx(
                      [
                        'container',
                        'absolute',
                        'bottom-0',
                        'left-0',
                        'z-30',
                        'flex',
                        'justify-between',
                        'invisible',
                        'opacity-0',
                        'bg-white',
                        'text-dark',
                        'border-x-2',
                        'border-gray',
                        'pt-22',
                        'rounded-xl',
                        'shadow-slate-100',
                        'pb-16',
                        'transform',
                        'translate-y-full',
                        'transition',
                      ],
                      [
                        'before:left-0',
                        'before:-translate-x-full',
                        'before:content-[""]',
                        'before:w-1/2',
                        'before:h-full',
                        'before:block',
                        'before:absolute',
                        'before:top-0',
                        'before:transform',
                        'before:bgwhitey',
                        'text-dark',
                      ],
                      [
                        'after:right-0',
                        'after:translate-x-full',
                        'after:content-[""]',
                        'after:w-1/2',
                        'after:h-full',
                        'after:block',
                        'after:absolute',
                        'after:top-0',
                        'after:transform',
                        'after:bgwhitey',
                        'text-dark',
                      ],
                      {
                        '!visible !opacity-100 delay-500': openedMenu === item.pk,
                      }
                    )}
                  >
                    <div className="flex text-black w-full mx-auto justify-center flex-wrap space-x-8 lg:space-x-0">
                      {item.children.map((child, index) => (
                        <div key={index} className='text-center'>
                          <Link
                            onClick={() => {
                              dispatch(setOpenedMenu(null));
                            }}
                            href={child.url}
                            className="block mb-4 font-semibold text-ms mt-3 transition-colors w-max lg:w-44 hover_color"
                          >
                            {child.label}

                          </Link>

                          {child.children && (
                            <ul>
                              {child.children.map((grandChild, index) => (
                                <li key={index} className='header_rechange cursor-pointer	'>
                                  <div
                                    onClick={() => {
                                      dispatch(setOpenedMenu(null));
                                      handleChildItemClick(grandChild.url);
                                    }}
                                    className="block mb-4 text-ms transition-colors w-max lg:w-44 hover_color"
                                  >
                                    <span>{grandChild.label}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                    {item.extra_context.attributes.images && (
                      <div className="flex">
                        {item.extra_context.attributes.images.map(
                          (image, index) =>
                            image.kwargs.value.image && (
                              <Link href={image.value.url} key={index}>
                                {/* TODO: There is no image. It should be checked. May need fix. */}
                                {/* <Image
                                  src={image.kwargs.value.image?.url}
                                  alt={image.value.title}
                                  title={image.value.title}
                                  width={265}
                                  height={323}
                                /> */}
                                <span className="block mt-4">
                                  {image.value.title}
                                </span>
                                {/* <span className="inline-block mt-2 text-xs uppercase border-b border-gray-500">
                                  {image.value.link_text}
                                </span> */}
                              </Link>
                            )
                        )}
                      </div>
                    )}
                    {/* <Tabs className='flex pt-5'>
                      <TabList className=" space-x-8 lg:space-x-0 navbar_content_card">
                        {item.children.map((childItem, childIndex) => (
                          <Tab key={childIndex} className="flex">
                            <div className='flex items-center'>
                              <Link
                               
                                href={childItem.url}
                                className="block mb-4 flex text-xs items-center justify-between text-black transition-colors w-max lg:w-44 hover:text-secondary"
                              >
                                {childItem.label}
                                <Icon name='chevron-end' size={12} />
                              </Link>
                            </div>
                          </Tab>
                        ))}
                      </TabList>

                      {item.children.map((childItem, childIndex) => (
                        <TabPanel key={childIndex}>
                          {childItem.children && (
                            <ul className='flex flex-wrap ps-5'>
                              {childItem.children.map((grandChildItem, grandChildIndex) => (
                                <li key={grandChildIndex} className='grid place-items-center'>
                                  <Image alt='' className='navbar_dummy_image' width={100} height={100} src={'images/navbar/dummy-navbar.svg'} />

                                  <Link
                                    onClick={() => {
                                      dispatch(setOpenedMenu(null));
                                    }}
                                    href={grandChildItem.url}
                                    className="block mb-4 text-black text-center justify-center whitespace-nowrap flex text-ms font-medium transition-colors w-max lg:w-44 hover:text-secondary"
                                  >
                                    {grandChildItem.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </TabPanel>
                      ))}
                    </Tabs> */}
                  </div>
                )}
              </li>
            )
          )}
          <li>
            <button
              onClick={() => dispatch(openSearch())}
              className="flex items-center gap-2 text-sm uppercase transition hover:text-secondary cursor-pointer"
              data-testid="header-nav-search"
            >
              <Icon name="search" size={16} />
            </button>
          </li>
          <li className="hover:text-secondary">
            <Link href="/account">
              <Icon name="user" size={16} />
            </Link>
          </li>
          <li className="hover:text-secondary relative" >
            <Link href='/baskets/basket'>
              <Icon name="cart" size={16} />
              <span className='absolute header_cart right-0'>
                {basket && basket.total_quantity !== undefined && basket.total_quantity}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        {isSearchOpen && <Search />}
      </div>
      <div className='mobile_desktop_container'>
        <div className='flex items-center mt-3 justify-between '>
          <div className='flex items-center gap-3'>
            <div>
              <MobileHamburgerButton />
            </div>
            <div>
              <Image width={100} height={90} alt='' className='mobile_header_logo' src="/images/logoMall.svg" />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div>
              <button
                onClick={() => dispatch(openSearch())}
                className="flex items-center gap-2 text-sm uppercase transition hover:text-secondary cursor-pointer"
                data-testid="header-nav-search"
              >
                <Icon name="search" size={16} />
              </button>
            </div>
            <div className='relative'>
              <Link href='/baskets/basket'>
                <Icon name="cart" size={16} />
                <span className='absolute header_cart left-3'>
                  {basket && basket.total_quantity !== undefined && basket.total_quantity}
                </span>
              </Link>
            </div>
            <div>
              <Link href="/account">
                <Icon name="user" size={16} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
