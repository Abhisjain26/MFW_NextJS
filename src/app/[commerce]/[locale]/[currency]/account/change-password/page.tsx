'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { AccountChangePasswordFormType } from '@akinon/next/types';

import { Button, Input, Link } from '@theme/components';
import { ROUTES } from 'routes';
import { useUpdatePasswordMutation } from '@akinon/next/data/client/account';
import { useMemo, useState } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from '@akinon/next/hooks';
import { useLocalization } from '@akinon/next/hooks';
import PasswordRulesFeedback from '@theme/components/password-rules-feedback';
import { Trans } from '@akinon/next/components/trans';

const accountChangePasswordSchema = (t) =>
  yup.object().shape({
    old_password: yup
      .string()
      .required(t('account.change_password.form.required')),
    new_password1: yup
      .string()
      .required(t('account.change_password.form.required'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/,
        t('account.change_password.form.error.password_rule')
      )
      .max(50, t('account.change_password.form.error.password_max')),
    new_password2: yup
      .string()
      .oneOf(
        [yup.ref('new_password1')],
        t('account.change_password.form.new_password_repeat.error.not_same')
      )
      .required(t('account.change_password.form.required'))
  });
export default function Page() {
  const { t } = useLocalization();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AccountChangePasswordFormType>({
    resolver: yupResolver(accountChangePasswordSchema(t))
  });

  const [formError, setFormError] = useState(null);
  const [updatePassword] = useUpdatePasswordMutation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const passwordValue = watch('new_password1', '');

  const onSubmit: SubmitHandler<AccountChangePasswordFormType> = (data) => {
    updatePassword(data)
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
          {t('account.change_password.header.title')}
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row">
        {isSuccess ? (
          <div className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]">
            <h3
              className="text-3xl mb-5"
              data-testid="account-change-password-response"
            >
              {t('account.change_password.form.success.title')}
            </h3>

            <p className="text-sm mb-4">
              {t('account.change_password.form.success.description')}
            </p>

            <Link
              href={'/'}
              className="underline"
              data-testid="account-change-password-response-button"
            >
              {t('account.change_password.form.success.button')}
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]"
          >
            <div className={clsx(errors.old_password ? 'mb-8' : 'mb-5')}>
              <Input
                label={t(
                  'account.change_password.form.current_password.placeholder'
                )}
                data-testid="account-current-password"
                type="password"
                {...register('old_password')}
                error={errors.old_password}
                required
              />

              {formError && (
                <div className="text-sm text-error mb-2">
                  {formError.old_password}
                </div>
              )}
            </div>

            <div
              className={clsx(
                'relative',
                errors.new_password1 ? 'mb-8' : 'mb-5'
              )}
            >
              <Input
                label={t(
                  'account.change_password.form.new_password.placeholder'
                )}
                type="password"
                data-testid="account-new-password"
                {...register('new_password1')}
                error={errors.new_password1}
                required
              />

              <PasswordRulesFeedback
                password={passwordValue}
                isVisible={errors?.new_password1 ? true : false}
              />
            </div>

            <div className={clsx(errors.new_password2 ? 'mb-8' : 'mb-5')}>
              <Input
                label={t(
                  'account.change_password.form.new_password_repeat.placeholder'
                )}
                type="password"
                data-testid="account-repeat-password"
                {...register('new_password2')}
                error={errors.new_password2}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full font-medium"
              data-testid="account-password-change"
            >
              {t('account.change_password.form.submit_button')}
            </Button>
          </form>
        )}

        <div className="my-6 lg:ml-8">
          <h2 className="text-3xl mb-4">
            {t('account.change_password.info.title')}
          </h2>
          <p className="text-sm font-medium">
            <Trans
              i18nKey="account.change_password.info.content"
              components={{
                ContactLink: (
                  <LinkText
                    href={ROUTES.ACCOUNT_CONTACT}
                    title={t('account.change_password.info.contact')}
                  />
                ),
                Faq: (
                  <LinkText
                    href={ROUTES.ACCOUNT_FAQ}
                    title={t('account.change_password.info.faq')}
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
