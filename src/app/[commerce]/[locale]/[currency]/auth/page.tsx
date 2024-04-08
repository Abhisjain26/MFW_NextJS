'use client';

import { Login } from '@theme/views/login';
import { Register } from '@theme/views/register';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocalization, useRouter } from '@akinon/next/hooks';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Button } from '@theme/components';

export default function Auth() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocalization();
  const [activeTab, setActiveTab] = useState('login');

  const tabClass = (tabName) => {
    return twMerge(
      clsx(
        'text-base font-normal text-primary-800 px-7 py-4 border border-b-0 border-gray-100 bg-gray-100 h-auto relative',
        {
          'bg-white before:w-full before:bg-white before:h-2 before:-bottom-1 before:left-0 before:absolute':
            activeTab === tabName
        }
      )
    );
  };

  useEffect(() => {
    if (session?.user) {
      router.push(searchParams.get('callbackUrl') ?? '/');
    }
  }, [session?.user]);

  return (
    <section className="container px-4 my-7 md:mt-20 lg:px-0 lg:mx-auto">
      <div className="w-full flex justify-center gap-3 md:hidden">
        <Button
          className={tabClass('login')}
          onClick={() => setActiveTab('login')}
        >
          {t('auth.login.mobile_title')}
        </Button>
        <Button
          className={tabClass('register')}
          onClick={() => setActiveTab('register')}
        >
          {t('auth.register.mobile_title')}
        </Button>
      </div>
      <div className="w-full flex flex-wrap border md:border-0">
        <div
          className={twMerge(
            clsx('w-full md:block md:w-1/2', {
              hidden: activeTab !== 'register'
            })
          )}
        >
          <Register />
        </div>
        <div
          className={twMerge(
            clsx('w-full md:block md:w-1/2', {
              hidden: activeTab !== 'login'
            })
          )}
        >
          <Login />
        </div>
      </div>
    </section>
  );
}
