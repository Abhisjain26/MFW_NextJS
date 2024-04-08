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

interface NavbarProps {
  menu: MenuItemType[];
}

export default function Navbar(props: NavbarProps) {
  const { menu } = props;

  const dispatch = useAppDispatch();
  const { isSearchOpen, openedMenu } = useAppSelector((state) => state.header);
  const [openedClass, setopenedClass] = useState(null);
  const { t } = useLocalization();

  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);
  // console.log(currentUrl);


  // const toggleMenu = (itemPk) => {
  //   if (openedClass === itemPk) {
  //     setopenedClass(null);
  //   } else {
  //     setopenedClass(itemPk);
  //   }
  // };
  const isActive = (url) => {
    // console.log("url", url);
    // console.log("active", currentUrl);

    return url === currentUrl ? 'active_header' : '';
  };

  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentUrl(window.location.pathname);
    };

    // Subscribe to URL changes when component mounts
    window.addEventListener('popstate', handleUrlChange);

    // Unsubscribe from URL changes when component unmounts
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  return (
    <>
      <nav className="relative flex-wrap items-center justify-center hidden header-grid-area-nav sm:flex justify-items-center">
        <ul className="flex flex-wrap items-center justify-center header_content mt-8 justify-items-center">
          {menu.map(
            (item, index) =>

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
                // onClick={() => toggleMenu(item.pk)}
                >
                  {
                    item.extra_context.attributes.menu_image?.kwargs?.url &&
                    <Image src={item.extra_context.attributes.menu_image?.kwargs?.url} width={10} height={10} alt='' />
                  }

                  <Link
                    href={item.url}
                    className={` flex items-center ms-1 text-sm captialize`}
                    data-testid="navbar-category"
                  >
                    {item.label}
                  </Link>

                  {/*
                     Performance Note:
                     The submenu content in this Navbar component is rendered based on hover-triggered state changes.
                     This approach is adopted for performance optimization reasons. It ensures that:
                     1. Submenu data is only loaded and rendered when necessary, reducing initial load times and resource usage.
                     2. Unnecessary renders are avoided, enhancing the responsiveness and efficiency of the navigation bar.
                     Please be cautious about altering this logic, as changes could negatively impact the performance and user experience of the Navbar.
                    */}

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
                          'bg-gray',
                          'border-x-2',
                          'border-gray',
                          'pt-20',
                          'pb-16',
                          'transform',
                          'translate-y-full',
                          'transition'
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
                          'before:bg-gray'
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
                          'after:bg-gray'
                        ],
                        {
                          '!visible !opacity-100 delay-500':
                            openedMenu === item.pk
                        }
                      )}
                    >
                      <div className="flex space-x-8 lg:space-x-0">
                        {item.children.map((child, index) => (
                          <div key={index}>
                            <Link
                              onClick={() => {
                                dispatch(setOpenedMenu(null));
                              }}
                              href={child.url}
                              className="block mb-4 text-sm transition-colors w-max lg:w-44 hover:text-secondary"
                            >
                              {child.label}
                            </Link>
                            {child.children && (
                              <ul>
                                {child.children.map((grandChild, index) => (
                                  <li key={index}>
                                    <Link
                                      onClick={() => {
                                        dispatch(setOpenedMenu(null));
                                      }}
                                      href={grandChild.url}
                                      className="block mb-4 text-sm transition-colors w-max lg:w-44 hover:text-secondary"
                                    >
                                      {grandChild.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                      {/* {item.extra_context.attributes.images && (

                        <div className="flex">

                          {item.extra_context.attributes.images.map(
                            (image, index) =>
                              image.kwargs.value.image && (
                                <Link href={image.value.url} key={index}>
                             


                                  <Image
                                    src={image.kwargs.value.image?.url}
                                    alt={image.value.title}
                                    title={image.value.title}
                                    width={265}
                                    height={323}
                                  />
                                  <span className="block mt-4">
                                    {image.value.title}
                                  </span>
                                  <span className="inline-block mt-2 text-xs uppercase border-gray-500">
                                    {image.value.link_text}
                                  </span>
                                </Link>
                              )
                          )}
                        </div>
                      )} */}
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
          <li className='hover:text-secondary'>
            <Icon name='user' size={16} />
          </li>
          <li className='hover:text-secondary'>
            <Icon name='cart' size={16} />
          </li>
        </ul>
      </nav>
      {isSearchOpen && <Search />}
    </>
  );
}
