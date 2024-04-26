import 'server-only';

import clsx from 'clsx';
import { ROUTES } from '@theme/routes';
import { menuGenerator } from '@akinon/next/utils';
import { Icon } from '@theme/components';

import HeaderBand from './band';
import MobileHamburgerButton from './mobile-hamburger-button';
import MobileMenu from './mobile-menu';
import Navbar from './navbar';
import { getMenu } from '@akinon/next/data/server';
import { Image } from '@akinon/next/components/image';

export default async function Header() {
  const response = await getMenu();
  const menu = menuGenerator(response);

  return (
    <header className="relative container">
      <div className=' flex justify-center mt-5'>
        <Image width={200} height={150} alt='' className='header_logo' src="/images/logoMall.svg" />
      </div>
      <div
        className={clsx([
          'mx-auto',
          'header-m-template-cols',
          'flex',
          'justify-center',
          'mb-5',
          // 'border-gray-100',
          // 'before:hidden',
          // 'before:absolute',
          // 'before:top-0',
          // 'before:left-0',
          // 'before:w-full',
          // 'before:bg-gray-100',
          // 'before:h-9',
          // 'before:z-[-1]',
          // 'before:content-[""]',
          // 'sm:grid-cols-3',  
          // 'sm:container',
          // 'sm:before:block'
        ])}
      >
        {/* <HeaderBand /> */}
        <div className='flex items-center mobile_content_middle w-full'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-5'>
              <MobileHamburgerButton />
              <Image width={100} height={90} alt='' className='mobile_header_logo' src="/images/logoMall.svg" />
            </div>
            <div className='flex justify-center gap-5'>
              <Icon name="search" size={20} className='icon_header'  />
              <Icon name="cart" size={20} className='icon_header' />
              <Icon name="user" size={20} className='icon_header' />
            </div>
          </div>
        </div>
        <MobileMenu menu={menu} />
        <Navbar menu={menu} />
      </div>
    </header>
  );
}