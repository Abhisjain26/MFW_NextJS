'use client';

import { signIn, SignInOptions } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@theme/routes';
import { LoginFormType } from '@theme/types';
import { Button, Input, Link } from '@theme/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useGetBasketQuery } from '@akinon/next/data/client/basket';
import { useCaptcha } from '@akinon/next/hooks';
import { AuthError } from '@akinon/next/types';
import { useLocalization } from '@akinon/next/hooks';
import { Image } from '@akinon/next/components/image';

const oauthProviders = [
  {
    key: 'google',
    label: 'Google',
    image: '/google.svg'
  },
  {
    key: 'facebook',
    label: 'Facebook',
    image: '/facebook.svg'
  },
  {
    key: 'apple',
    label: 'Apple',
    image: '/apple.svg'
  },
  {
    key: 'akifast',
    localeKey: 'auth.login.form.quick_login'
  }
];

const loginFormSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('auth.login.form.error.email_valid'))
      .required(t('auth.login.form.error.required')),
    password: yup.string().required(t('auth.login.form.error.required'))
  });

export const Login = () => {
  const { t, locale } = useLocalization();

  const { refetch: refetchBasketData } = useGetBasketQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginFormSchema(t))
  });

  const searchParams = useSearchParams();
  const [formError, setFormError] = useState(null);

  const {
    CaptchaView,
    validated: captchaValidated,
    isVisible: isCaptchaVisible,
    validate: validateCaptcha
  } = useCaptcha();

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setFormError(null);

    const loginResponse = await signIn('default', {
      redirect: false,
      callbackUrl: searchParams.get('callbackUrl') ?? '/',
      captchaValidated,
      ...data
    } as SignInOptions);

    if (loginResponse.error) {
      const errors: AuthError[] = JSON.parse(loginResponse.error);

      if (errors.find((error) => error.type === 'captcha')) {
        if (await validateCaptcha()) {
          onSubmit(data);
        }

        return;
      }

      const fieldErrors = errors.find((error) => error.type === 'field_errors')
        ?.data as { name: string; value: string[] }[];
      const nonFieldErrors = errors.find(
        (error) => error.type === 'non_field_errors'
      )?.data as string[];

      fieldErrors?.forEach((item) => {
        setError(item.name as keyof LoginFormType, {
          type: 'custom',
          message: item.value.join(', ')
        });
      });

      if (nonFieldErrors?.length) {
        setFormError(nonFieldErrors.join(', '));
      }

      return;
    }

    if (loginResponse.url) {
      window.location.href = loginResponse.url;
      refetchBasketData();
    }
  };

  return (
    <section
      className={clsx([
        'w-full py-10 px-5 md:py-0 md:px-8 md:mx-auto lg:px-16'
      ])}
    >
      <h2 className="mb-3 text-lg text-start text-black-800 font-light md:mb-9 md:text-2xl">
        {t('auth.login.title')}
      </h2>

      <form
        action="/api/auth/signin/credentials"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="hidden" value="login" {...register('formType')} />
        <input type="hidden" value={locale} {...register('locale')} />

        <div className={clsx(errors.email ? 'mb-8' : 'mb-4')}>
          <Input
            labelStyle="floating"
            label={t('auth.login.form.email.placeholder')}
            className="h-14"
            {...register('email')}
            error={errors.email}
            data-testid="login-email"
            required
          />
        </div>

        <div className={clsx(errors.password ? 'mb-8' : 'mb-4')}>
          <Input
            labelStyle="floating"
            label={t('auth.login.form.password.placeholder')}
            className="h-14"
            type="password"
            {...register('password')}
            error={errors.password}
            data-testid="login-password"
            required
          />
        </div>

        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="block text-sm underline mb-8"
          data-testid="login-forgot-password"
        >
          {t('auth.login.form.forgot_password')}
        </Link>

        {formError && (
          <p
            className="text-error text-xs my-5"
            data-testid="login-error-field"
          >
            {formError}
          </p>
        )}

        <div className="flex justify-center">
          <CaptchaView className="mb-5" data-testid="login-captcha" />
        </div>

        <Button
          className="w-full h-12 uppercase text-xs font-semibold"
          type="submit"
          disabled={isCaptchaVisible && !captchaValidated}
          data-testid="login-submit"
        >
          {t('auth.login.form.submit')}
        </Button>

        <p className="relative text-gray-600 text-center my-4 before:absolute before:h-[1px] before:w-5/12 before:bg-gray-600 before:bg-opacity-25 before:top-1/2 before:left-0 after:absolute after:h-[1px] after:w-5/12 after:bg-gray-600 after:bg-opacity-25 after:top-1/2 after:right-0">
          {t('auth.login.form.or')}
        </p>

        <div className="social-login">
          <p className="mb-3 text-lg text-start font-light md:mb-9 md:text-2xl">
            {t('auth.login.form.sign_in_with')}
          </p>
        </div>
      </form>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {oauthProviders.map((provider) => (
          <Button
            key={provider.key}
            className="w-full h-14 uppercase text-xs font-semibold flex items-center justify-center gap-2 hover:bg-transparent hover:border hover:border-primary-800 hover:text-primary"
            type="submit"
            appearance="outlined"
            disabled={isCaptchaVisible && !captchaValidated}
            onClick={() => {
              location.href = `/${provider.key}/login/`;
            }}
          >
            {provider.image && (
              <Image
                src={provider.image}
                alt={provider.label}
                width={provider.label === 'Facebook' ? 10 : 18}
                height={18}
                className="flex-shrink-0"
              />
            )}

            {provider.localeKey ? t(provider.localeKey) : provider.label}
          </Button>
        ))}
      </div>
    </section>
  );
};
