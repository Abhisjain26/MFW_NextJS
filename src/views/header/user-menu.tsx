'use client';

import { Link, Icon } from '@theme/components';
import { useSession } from 'next-auth/react';
import { ROUTES } from '@theme/routes';
import clsx from 'clsx';

import { closeMobileMenu } from '@akinon/next/redux/reducers/header';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { useLocalization } from '@akinon/next/hooks';

interface UserMenuProps {
  isMobile: boolean;
}

export const UserMenu = (props: UserMenuProps) => {
  const { isMobile } = props;
  const { data: session, status } = useSession();
  const { t } = useLocalization();
  const dispatch = useAppDispatch();

  const MenuItems = [
    {
      url: ROUTES.AUTH,
      label: t('common.header.login'),
      dataTestId: `header-login${isMobile ? '-mobile' : ''}`
    },
    {
      url: ROUTES.AUTH,
      label: t('common.header.signup'),
      dataTestId: `header-signup${isMobile ? '-mobile' : ''}`
    }
  ];

  return (
    <ul
      className={clsx(
        'items-center divide-x divide-black',
        isMobile ? 'flex pt-2 text-sm pb-6 border-b mx-8' : 'hidden sm:flex'
      )}
      id="user-menu"
    >
      {status === 'authenticated' ? (
        <li>
          <Link
            href={ROUTES.ACCOUNT}
            data-testid={`header-user${isMobile ? '-mobile' : ''}`}
            className="flex items-center space-x-2.5"
            onClick={() => dispatch(closeMobileMenu())}
          >
            <Icon name="user" size={24} />
            <span className="uppercase">{`${session.user.firstName} ${session.user.lastName}`}</span>
          </Link>
        </li>
      ) : (
        MenuItems.map((link, index) => (
          <li
            key={index}
            className={clsx(
              'flex items-center uppercase',
              isMobile ? 'first:pr-2 last:pl-2' : 'px-2'
            )}
          >
            <Link href={link.url} passHref={true} data-testid={link.dataTestId}>
              {link.label}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};
