'use client';

import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { openSearch, setOpenedMenu } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';
import { MenuItemType } from '@akinon/next/types';
import React, { useEffect, useState } from 'react';
import { Icon, Link } from '@theme/components';
import Search from './search';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface NavbarProps {
  menu: MenuItemType[];
}

export default function Navbar(props: NavbarProps) {
  const { menu } = props;

  const dispatch = useAppDispatch();
  const { isSearchOpen, openedMenu } = useAppSelector((state) => state.header);
  const [currentUrl, setCurrentUrl] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTabIndex(index);
    dispatch(setOpenedMenu(null));
  };
  const isActive = (url: string) => {
    return url === currentUrl ? 'active_header' : '';
  };

  useEffect(() => {
    setCurrentUrl(window.location.pathname);

    const handleUrlChange = () => {
      setCurrentUrl(window.location.pathname);
    };

    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return (
    <>
      <nav className="relative flex-wrap items-center justify-center hidden header-grid-area-nav sm:flex justify-items-center">
        <ul className="flex flex-wrap items-center justify-center header_content mt-8 justify-items-center">
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
                  className={`flex items-center ms-1 text-xs capitalize`}
                  data-testid="navbar-category"
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
                    <Tabs className='flex pt-5'>
                      <TabList className=" space-x-8 lg:space-x-0 navbar_content_card">
                        {item.children.map((childItem, childIndex) => (
                          <Tab key={childIndex} className="flex">
                            <div className='flex items-center'>
                              <Link
                                // onClick={() => {
                                //   dispatch(setOpenedMenu(null));
                                // }}
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
                    </Tabs>
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
            <Icon name="user" size={16} />
          </li>
          <li className="hover:text-secondary">
            <Link href='/baskets/basket'>
              <Icon name="cart" size={16} />
            </Link>
          </li>
        </ul>
      </nav>
      {isSearchOpen && <Search />}
    </>
  );
}
