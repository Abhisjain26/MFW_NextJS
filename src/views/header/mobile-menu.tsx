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
  Link
} from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components';

interface MobileMenuProps {
  menu: MenuItemType[];
}

export default function MobileMenu(props: MobileMenuProps) {
  const { menu } = props;
  const dispatch = useAppDispatch();
  const [selectedSubMenu, setSelectedSubMenu] = useState<MenuItemType | null>(
    null
  );
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab index

  const isMobileMenuOpen = useAppSelector(
    (state) => state.header.isMobileMenuOpen
  );

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setSelectedSubMenu(null);
  };

  return (
    <>
      {/* MENU OVERLAY */}
      <div
        className={clsx(
          'fixed top-0 left-0 z-30 w-screen h-screen invisible opacity-0 bg-black bg-opacity-80 transition duration-500',
          {
            '!visible !opacity-100 scroll-lock': isMobileMenuOpen
          }
        )}
        // TODO: Remove this after we have a better solution for clicking outside of the menu
        onClick={() => {
          dispatch(closeMobileMenu());
          setSelectedSubMenu(null);
        }}
      />
      {/* TODO: Add a way to close the menu when clicking outside of it */}
      <div
        className={clsx(
          'fixed top-0 left-0 z-50 flex flex-col bg-white w-72 pt-4 h-screen invisible opacity-0 transition duration-500 transform -translate-x-72',
          {
            '!visible !opacity-100 translate-x-0': isMobileMenuOpen
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
                      if (item.children.length > 0) {
                        e.preventDefault();
                        setSelectedSubMenu(item);
                      }
                    }}
                    className="flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <Icon name="chevron-end" size={14} />
                  </Link>
                </Tab>
              ))}
            </TabList>
            {menu.map((item, index) => (
              <TabPanel key={index}>
                <ul className='flex flex-wrap items-center justify-center gap-10'>
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="grid place-items-center">
                      <Image className='navbar_dummy_image' alt='' width={100} height={100} src={'images/navbar/dummy-navbar.svg'} />
                      <Link
                        onClick={() => dispatch(closeMobileMenu())}
                        href={child.url}
                        className="text-sm flex items-center justify-between py-4"
                      >
                        <span>{child.label}</span>
                      </Link>
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
