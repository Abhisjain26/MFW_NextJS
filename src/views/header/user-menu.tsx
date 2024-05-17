import { Link, Icon } from '@theme/components';
import { useSession } from 'next-auth/react';
import { ROUTES } from '@theme/routes';
import clsx from 'clsx';

import { closeMobileMenu } from '@akinon/next/redux/reducers/header';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components';

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
    // {
    //   url: ROUTES.AUTH,
    //   label: t('common.header.signup'),
    //   dataTestId: `header-signup${isMobile ? '-mobile' : ''}`
    // }
  ];

  const handleIconClick = () => {
    dispatch(closeMobileMenu());
  };

  return (
    <div
      className={clsx(
        'items-center  header_login_mobile',
        isMobile ? 'flex pt-2 text-sm pb-1 justify-between border-b mx-4' : 'hidden sm:flex'
      )}
      id="user-menu"
    >
      <div className='flex items-center gap-1' onClick={handleIconClick}>
        <div><Icon name="chevron-start" size={16} /></div>
        <div><Image src='/images/navbar/mobile-user.svg' className='mobile_user_profile_image' width={100} height={100} alt='User Profile' /></div>
        <div>
          {status === 'authenticated' ? (
            <h2 className='mobile_user_profile_text'>Hii , <br />{`${session.user.firstName} ${session.user.lastName}`}</h2>
          ) : (
            <h2 className='mobile_user_profile_text'>Hii,<br /> There</h2>
          )}
        </div>
      </div>
      <div>
        {status === 'authenticated' ? (
          <div>
            <Link
              href={ROUTES.ACCOUNT}
              data-testid={`header-user${isMobile ? '-mobile' : ''}`}
              className="flex items-center space-x-2.5"
              onClick={() => dispatch(closeMobileMenu())}
            >

              {/* <Icon name="user" size={24} /> */}
              <span className="uppercase"></span>
            </Link>
          </div>
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
      </div>
    </div>
  );
};
