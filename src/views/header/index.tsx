import 'server-only';

import { Link } from '@theme/components';
import clsx from 'clsx';
import { ROUTES } from '@theme/routes';
import { menuGenerator } from '@akinon/next/utils';

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
    <header className="relative">
      <div className=' flex justify-center mt-5'>
        <Image width={200} height={150} alt='' className='header_logo' src="/images/logoMall.svg" />
      </div>
      <div
        className={clsx([
          'mx-auto',
          'header-m-template-cols',
          'flex',
          'justify-evenly',
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
          'sm:container',
          'sm:before:block'
        ])}
      >
        {/* <HeaderBand /> */}
        <MobileHamburgerButton />

        <MobileMenu menu={menu} />
        <Navbar menu={menu} />
      </div>
    </header>
  );
}
