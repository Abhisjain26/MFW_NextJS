'use client';

import { signOut, useSession } from 'next-auth/react';
import { useLogoutMutation } from '@akinon/next/data/client/user';
import { ROUTES } from '@theme/routes';

import { Icon, Link } from '@theme/components';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useLocalization } from '@akinon/next/hooks';

const ACCOUNT_MENU_ITEMS = [
  {
    translationKey: 'account.base.menu.my_orders',
    href: ROUTES.ACCOUNT_ORDERS,
    testId: 'account-orders'
  },
  {
    translationKey: 'account.base.menu.my_profile',
    href: ROUTES.ACCOUNT_PROFILE,
    testId: 'account-profile'
  },
  {
    translationKey: 'account.base.menu.address_book',
    href: ROUTES.ACCOUNT_ADDRESS,
    testId: 'account-address'
  },
  {
    translationKey: 'account.base.menu.change_email',
    href: ROUTES.ACCOUNT_CHANGE_EMAIL,
    testId: 'account-change-email'
  },
  {
    translationKey: 'account.base.menu.change_password',
    href: ROUTES.ACCOUNT_CHANGE_PASSWORD,
    testId: 'account-change-password'
  },
  {
    translationKey: 'account.base.menu.my_wishlist',
    href: ROUTES.ACCOUNT_WISHLIST,
    testId: 'account-wishlist'
  },
  {
    translationKey: 'account.base.menu.my_vouchers',
    href: ROUTES.ACCOUNT_COUPONS,
    testId: 'account-coupons'
  },
  {
    translationKey: 'account.base.menu.faq',
    href: ROUTES.ACCOUNT_FAQ,
    testId: 'account-faq'
  },
  {
    translationKey: 'account.base.menu.contact_us',
    href: ROUTES.ACCOUNT_CONTACT,
    testId: 'account-contact'
  }
];

export default function AccountMenu() {
  const { t } = useLocalization();
  const { data: session, status } = useSession();
  const [logout] = useLogoutMutation();
  const pathname = usePathname();
  const accountMenuRegex = new RegExp(`^${ROUTES.ACCOUNT}/?$`).test(pathname);

  const handleLogout = async () => {
    logout()
      .unwrap()
      .then(() => {
        signOut({
          callbackUrl: '/account'
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div
      className={clsx('w-full lg:w-[270px] lg:mr-8', {
        'hidden lg:block': !accountMenuRegex
      })}
    >
      <div className="border-b border-gray-200 py-4">
        <h2 className="text-3xl">{t('account.base.menu.my_account')}</h2>
        <p className="text-xl text-secondary-500">
          {t('account.base.menu.hello')}{' '}
          {status === 'authenticated' && `, ${session.user.firstName}`}
        </p>
      </div>
      <div>
        <ul className="text-xs">
          {ACCOUNT_MENU_ITEMS.map((item) => (
            <li
              key={item.testId}
              className="border-b border-gray-200 py-4 flex justify-between items-center"
            >
              <Link href={item.href} data-testid={item.testId}>
                {t(item.translationKey)}
              </Link>
              <Icon className="lg:hidden" name="chevron-end" size={12} />
            </li>
          ))}
          <li className="py-7 flex justify-between items-center lg:py-4 lg:border-b lg:border-gray-200">
            <button
              className="w-full uppercase cursor-pointer border border-primary lg:w-auto lg:border-none py-4 lg:py-0 lg:normal-case"
              data-testid="account-logout"
              onClick={handleLogout}
            >
              {t('account.base.menu.logout')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
