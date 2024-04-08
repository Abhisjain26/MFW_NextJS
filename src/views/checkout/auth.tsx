import { useRouter, useLocalization } from '@akinon/next/hooks';
import { Link } from '@theme/components';
import GuestLogin from '@theme/views/guest-login';
import { Login } from '@theme/views/login';
import { useEffect } from 'react';
import { ROUTES } from 'routes';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@akinon/next/redux/hooks';
import { api } from '@akinon/next/data/client/api';

const CheckoutAuth = () => {
  const { t } = useLocalization();
  const router = useRouter();
  const { status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(api.util.invalidateTags(['Checkout']));
    } else if (status === 'unauthenticated') {
      router.replace(ROUTES.CHECKOUT + `?callbackUrl=${ROUTES.CHECKOUT}`);
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full my-5 lg:flex-row">
      <div className="flex-1 flex-shrink-0">
        <Login />
        <div className="text-center text-sm text-gray-600 uppercase mt-5">
          <span>
            {t('checkout.auth.title')}
            <Link
              href={ROUTES.AUTH + `?callbackUrl=${ROUTES.CHECKOUT}`}
              className="ml-1 text-black underline"
            >
              {t('checkout.auth.signup')}
            </Link>
          </span>
        </div>
      </div>

      <div className="flex-1 mt-5 lg:mt-0">
        <div className="px-5 lg:px-16">
          <h2 className="mb-3 text-lg text-start text-black-800 font-light md:mb-9 md:text-2xl">
            {t('checkout.auth.guest_checkout')}
          </h2>
          <GuestLogin />
        </div>
      </div>
    </div>
  );
};

export default CheckoutAuth;
