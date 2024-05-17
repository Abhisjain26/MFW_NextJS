'use client';
import React, { useState } from 'react';
import { MenuItemType } from '@akinon/next/types';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { closeMobileMenu } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { UserMenu } from './user-menu';
import {
  Button,
  CurrencySelect,
  Icon,
  LanguageSelect,
  Link,
  // Image // Import Image component
} from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';

interface MobileMenuProps {
  menu: MenuItemType[];
}

export default function MobileMenu(props: MobileMenuProps) {
  const { menu } = props;

  const dispatch = useAppDispatch();
  const [selectedSubMenu, setSelectedSubMenu] = useState<MenuItemType | null>(null);

  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState(0);

  const isMobileMenuOpen = useAppSelector((state) => state.header.isMobileMenuOpen);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setSelectedSubMenu(null);
  };

  return (
    <>
      <div
        className={clsx(
          'fixed top-0 left-0 z-30 w-screen h-screen bg-black bg-opacity-80 transition-opacity',
          {
            'opacity-100 visible': isMobileMenuOpen,
            'opacity-0 invisible': !isMobileMenuOpen
          }
        )}
        onClick={() => {
          dispatch(closeMobileMenu());
          setSelectedSubMenu(null);
        }}
      />
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 flex flex-col bg-white w-72 h-screen transform transition-transform',
          {
            'translate-x-0': isMobileMenuOpen,
            '-translate-x-72': !isMobileMenuOpen
          }
        )}
      >
        <UserMenu isMobile />
        <div className="relative flex-1 overflow-x-hidden">
          <Tabs selectedIndex={activeTab} onSelect={handleTabClick}>
            <TabList>
              {menu.map((item, index) => (
                <Tab key={index} className="py-4 text-sm px-4 mobile_menu_items">
                  <Link
                    href={item.url}
                    onClick={(e) => {
                      if (item.children && item.children.length > 0) {
                        e.preventDefault();
                        setSelectedSubMenu(item);
                      }
                    }}
                    className="flex items-center justify-between"
                  >
                    <span className='flex gap-2'>
                      <span>
                        {item.extra_context &&
                          item.extra_context.attributes &&
                          item.extra_context.attributes.menu_image && (
                            <img
                              width={10}
                              height={10}
                              alt=""
                              src={item.extra_context.attributes.menu_image.kwargs.url}
                            />
                          )}
                      </span>

                      <span>{item.label}</span>
                    </span>
                    {item.children && item.children.length > 0 ? (
                      <Icon name='chevron-end' size={12} />
                    ) : null}
                  </Link>
                </Tab>
              ))}
            </TabList>

            {menu.map((item, index) => (
              <TabPanel key={index}>
                <ul className='flex flex-wrap items-center'>
                  {item.children && item.children.map((child, childIndex) => (
                    <li key={childIndex} className="grid mobile_inline_content px-5 place-items-left">
                      <Link
                        onClick={() => {
                          dispatch(closeMobileMenu());
                        }}
                        href={child.url}
                        className="text-xm flex items-center justify-between py-4"
                      >
                        <span>{child.label}</span>

                      </Link>
                      {child.children && (
                        <ul>
                          {child.children.map((grandChild, grandChildIndex) => (
                            <li key={grandChildIndex} className='header_rechange cursor-pointer'>
                              <div
                                onClick={() => {
                                  dispatch(closeMobileMenu());
                                }}
                                className="block mb-4 text-xs transition-colors w-max lg:w-44 hover_color"
                              >
                                <span>{grandChild.label}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}

                </ul>
              </TabPanel>
            ))}
          </Tabs>
        </div>
        <div className="flex gap-x-4 px-4 py-4">
          <LanguageSelect className="bg-transparent w-11 px-0 text-sm" />
          <CurrencySelect className="bg-transparent w-12 px-0 text-sm" />
        </div>
      </div>
    </>
  );
}
