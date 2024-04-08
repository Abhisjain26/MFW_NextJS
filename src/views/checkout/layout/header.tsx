import React from 'react';
import clsx from 'clsx';
import { Link } from '@theme/components';
import { ROUTES } from '@theme/routes';
import { Image } from '@akinon/next/components/image';

const CheckoutHeader = () => {
  return (
    <div className="relative border-b border-gray-100 shadow">
      <header
        className={clsx(['py-8', 'px-4', 'mx-auto', 'container', 'md:px-0'])}
      >
        <div className="flex justify-between items-center">
          <Link
            href={ROUTES.HOME}
            passHref={true}
            className="self-center block w-40 sm:w-72 sm:justify-self-center sm:p-0"
            aria-label="Homepage"
          >
            <Image
              src="/logo.svg"
              alt="Project Zero"
              aspectRatio={285 / 27}
              sizes="285px"
              fill
            />
          </Link>

          <div className="text-sm text-black-800 transition-al hover:text-secondary md:text-base lg:text-lg">
            <a href={'tel:08508500000'}>0 850 850 00 00</a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CheckoutHeader;
