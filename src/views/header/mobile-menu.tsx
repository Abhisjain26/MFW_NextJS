'use client';

import { useState } from 'react';
import { MenuItemType } from '@akinon/next/types';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import { closeMobileMenu } from '@akinon/next/redux/reducers/header';
import clsx from 'clsx';

import { UserMenu } from './user-menu';
import {
  Button,
  CurrencySelect,
  Icon,
  LanguageSelect,
  Link
} from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';

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

  const isMobileMenuOpen = useAppSelector(
    (state) => state.header.isMobileMenuOpen
  );

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
          <ul
            className={clsx('pt-4 transition duration-500 transform', {
              '-translate-x-full': selectedSubMenu
            })}
          >
            {menu.map(
              (item, index) =>
                item.label != null && (
                  <li key={index} className="py-4 text-sm px-8">
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
                  </li>
                )
            )}
          </ul>
          <div
            className={clsx(
              'absolute top-0 left-0 right-0 px-8 bg-white invisible opacity-0 transition duration-500 transform translate-x-full',
              {
                '!visible !opacity-100 !translate-x-0': selectedSubMenu
              }
            )}
          >
            <header className="flex items-center justify-between border-b h-[61px] py-4 mb-4">
              <Button
                appearance="ghost"
                onClick={() => setSelectedSubMenu(null)}
                className="underline text-xs font-semibold flex items-center gap-2 !p-0"
              >
                <Icon name="chevron-start" size={12} className="shrink-0" />
                {t('common.mobile_menu.back')}
              </Button>
              <span className="text-sm">{selectedSubMenu?.label}</span>
            </header>
            <div className="flex flex-col">
              {selectedSubMenu?.children.map((child, index) => (
                <div key={index} className="flex flex-col">
                  <Link
                    onClick={() => dispatch(closeMobileMenu())}
                    href={child.url}
                    className="text-xs font-bold py-4"
                  >
                    {child.label}
                  </Link>

                  <ul>
                    {child.children.map((subChild, index) => (
                      <li key={index} className="">
                        <Link
                          onClick={() => dispatch(closeMobileMenu())}
                          href={subChild.url}
                          className="text-sm flex items-center justify-between py-4"
                        >
                          <span>{subChild.label}</span>
                          <Icon name="chevron-end" size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 px-8 py-4">
          <LanguageSelect className="bg-transparent w-11 px-0 text-sm" />
          <CurrencySelect className="bg-transparent w-12 px-0 text-sm" />
        </div>
      </div>
    </>
  );
}
