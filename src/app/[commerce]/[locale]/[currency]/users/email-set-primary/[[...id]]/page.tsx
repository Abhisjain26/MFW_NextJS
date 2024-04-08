'use client';
import { Icon, Link, LoaderSpinner } from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';
import { useChangeEmailVerificationQuery } from '@akinon/next/data/client/user';

export default function Page({ params: { id } }) {
  const { t } = useLocalization();
  const { isSuccess, isLoading } = useChangeEmailVerificationQuery(
    id.join('/')
  );

  return (
    <div className="flex flex-col items-center text-center max-w-lg py-8 lg:py-16 mx-auto">
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          {isSuccess ? (
            <>
              <Icon className="text-7xl text-success block mb-6" name="check" />

              <p className="text-xl mb-6 lg:text-3xl">
                {t('account.change_email.email_set_primary.success')}
              </p>
            </>
          ) : (
            <>
              <Icon className="text-7xl text-error block mb-6" name="close" />

              <p className="text-xl mb-6 lg:text-3xl">
                {t('account.change_email.email_set_primary.error')}
              </p>
            </>
          )}

          <Link href={'/'} className="underline">
            {t('account.change_email.email_set_primary.button')}
          </Link>
        </>
      )}
    </div>
  );
}
