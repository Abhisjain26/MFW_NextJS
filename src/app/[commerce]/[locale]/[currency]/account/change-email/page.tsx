'use client';

import { useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { AccountChangeEmailFormType } from '@akinon/next/types';

import { Button, Input, Link } from '@theme/components';
import { ROUTES } from '@theme/routes';
import { useUpdateEmailMutation } from '@akinon/next/data/client/account';
import { useMemo, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter, useLocalization } from '@akinon/next/hooks';
import { useGetProfileInfoQuery } from '@akinon/next/data/client/account';
import { Trans } from '@akinon/next/components/trans';

const accountChangeEmailSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('account.change_email.form.email.error'))
      .required(t('account.change_email.form.required')),
    emailConfirm: yup
      .string()
      .email(t('account.change_email.form.email.error'))
      .oneOf(
        [yup.ref('email')],
        t('account.change_email.form.email_confirm.error.not_same')
      )
      .required(t('account.change_email.form.required')),
    password: yup.string().required(t('account.change_email.form.required'))
  });

export default function Page() {
  const { data } = useSession();
  const { data: profileInfo } = useGetProfileInfoQuery();

  const { t } = useLocalization();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AccountChangeEmailFormType>({
    resolver: yupResolver(accountChangeEmailSchema(t))
  });

  const [formError, setFormError] = useState(null);
  const [updateEmail] = useUpdateEmailMutation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const onSubmit: SubmitHandler<AccountChangeEmailFormType> = async (data) => {
    updateEmail(data)
      .unwrap()
      .then(() => {
        router.push(pathname + '?formSuccess=true');
      })
      .catch((error) => setFormError(error.data));
  };

  const LinkText = (props) => {
    return (
      <Link {...props} href={props.href || '#'} className="underline">
        {props.title}
      </Link>
    );
  };

  const successParam = searchParams.get('formSuccess');

  const isSuccess = useMemo(() => successParam === 'true', [successParam]);

  return (
    <div>
      <div className="p-6 bg-gray-150">
        <h3 className="text-3xl text-center mb-5">
          {t('account.change_email.header.title')}
        </h3>
        <p className="text-center">
          {' '}
          {t('account.change_email.header.subtitle')}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {isSuccess ? (
          <div className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]">
            <h3 className="text-3xl mb-5">
              {t('account.change_email.form.success.title')}
            </h3>
            <p className="text-sm mb-4">
              {t('account.change_email.form.success.description')}
            </p>
            <Link href={'/'} className="underline">
              {t('account.change_email.form.success.button')}
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]"
          >
            <div className="text-sm mb-10">
              <p>{t('account.change_email.form.current_email')}</p>
              <p>{profileInfo?.email}</p>
              {formError && (
                <div className="text-sm text-error">
                  {formError.non_field_errors}
                </div>
              )}
            </div>
            <div className={clsx(errors.email ? 'mb-8' : 'mb-5')}>
              <Input
                label={t('account.change_email.form.email.placeholder')}
                {...register('email')}
                error={errors.email}
                required
              />
            </div>
            <div className={clsx(errors.emailConfirm ? 'mb-8' : 'mb-5')}>
              <Input
                label={t('account.change_email.form.email_confirm.placeholder')}
                {...register('emailConfirm')}
                error={errors.emailConfirm}
                required
              />
            </div>
            <div className={clsx(errors.password ? 'mb-8' : 'mb-5')}>
              <Input
                label={t('account.change_email.form.password.placeholder')}
                type="password"
                {...register('password')}
                error={errors.password}
                required
              />
            </div>

            <Button type="submit" className="w-full font-medium">
              {t('account.change_email.form.submit_button')}
            </Button>
          </form>
        )}
        <div className="my-6 lg:ml-8">
          <h2 className="text-3xl mb-4">
            {t('account.change_email.info.title')}
          </h2>
          <p className="text-sm font-medium">
            <Trans
              i18nKey="account.change_email.info.content"
              components={{
                ContactLink: (
                  <LinkText
                    href={ROUTES.ACCOUNT_CONTACT}
                    title={t('account.change_email.info.contact')}
                  />
                ),
                Faq: (
                  <LinkText
                    href={ROUTES.ACCOUNT_FAQ}
                    title={t('account.change_email.info.faq')}
                  />
                )
              }}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
