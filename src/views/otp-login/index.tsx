'use client';

import { signIn, SignInOptions } from 'next-auth/react';
import { useState } from 'react';
import { OtpLoginFormType } from '@theme/types';
import { Button, Input } from '@theme/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useLocalization } from '@akinon/next/hooks';
// import type { useOtpLoginMutation } from '@akinon/next/data/client/user';
import { useAppSelector } from '@akinon/next/redux/hooks';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';

const loginFormSchema = (t) =>
  yup.object().shape({
    phone: yup
      .string()
      .transform((value: string) => value?.replace(/_/g, '').replace(/ /g, ''))
      .length(11, t('account.my_profile.form.phone.error.not_valid'))
      .required(t('auth.login.form.error.required')),
    code: yup.string()
  });

export const OtpLogin = () => {
  const { user_phone_format } = useAppSelector((state) => state.config);
  const { t, locale } = useLocalization();
  const [showOtpModal, setShowOtpModal] = useState(false);
  // const [otpLoginMutation] = useOtpLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control
  } = useForm<OtpLoginFormType>({
    resolver: yupResolver(loginFormSchema(t))
  });

  const [formError, setFormError] = useState(null);

  const loginHandler: SubmitHandler<OtpLoginFormType> = async (data) => {
    return await signIn('default', {
      redirect: false,
      callbackUrl: '/',
      ...data
    } as SignInOptions);
  };

  const onSubmit = async (data: OtpLoginFormType) => {
    // await otpLoginMutation({
    //   phone: data.phone
    // })
    //   .unwrap()
    //   .then(() => {
    //     setShowOtpModal(true);
    //   })
    //   .catch((error) => {
    //     if (error.status === 429) {
    //       setFormError(t('auth.login.form.error.too_many_requests'));
    //       return;
    //     }

    //     for (const key in error.data) {
    //       setFormError(error.data[key]);
    //     }
    //   });
  };

  return (
    <section className={clsx(['w-full py-10 md:py-0 md:mx-auto'])}>
      <h2 className="mb-3 text-lg text-start text-black-800 font-light md:mb-9 md:text-2xl">
        {t('auth.login.title_gsm')}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" value="otpLogin" {...register('formType')} />
        <input type="hidden" value={locale} {...register('locale')} />

        <div className="mb-4">
          <Input
            labelStyle="floating"
            className="h-14"
            label={t('auth.login.form.phone.placeholder')}
            type="tel"
            format={user_phone_format.replace(/\9/g, '#')}
            mask="_"
            allowEmptyFormatting={true}
            control={control}
            {...register('phone')}
            error={errors.phone}
            required
          />
        </div>

        {formError && (
          <p
            className="text-error text-xs mb-4"
            data-testid="login-error-field"
          >
            {formError}
          </p>
        )}

        <Button
          className="w-full h-12 uppercase text-xs font-semibold"
          type="submit"
          data-testid="otp-login-submit"
        >
          {t('auth.login.form.submit')}
        </Button>
      </form>

      {showOtpModal && (
        <PluginModule
          component={Component.Otp}
          props={{
            setShowPopup: setShowOtpModal,
            data: getValues(),
            submitAction: loginHandler
          }}
        />
      )}
    </section>
  );
};
