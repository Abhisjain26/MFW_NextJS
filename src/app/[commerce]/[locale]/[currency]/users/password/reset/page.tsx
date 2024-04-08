'use client';

import { Button, Input, Link } from '@theme/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ForgotPasswordFormType } from '@akinon/next/types';
import { useForgotPasswordMutation } from '@akinon/next/data/client/user';
import { useLocalization } from '@akinon/next/hooks';

const forgotPasswordFormSchema = (t) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('forgot_password.form.error.email_valid'))
      .required(t('forgot_password.form.error.required'))
  });

export default function ForgotPassword() {
  const { t } = useLocalization();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordFormType>({
    resolver: yupResolver(forgotPasswordFormSchema(t))
  });

  const [forgotPassword, { isSuccess: formSuccess }] =
    useForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotPasswordFormType> = (data) => {
    forgotPassword(data);
  };

  return (
    <div className="container my-12 flex flex-col items-center px-4">
      <div className="w-full xl:w-5/12 text-center">
        {formSuccess ? (
          <div>
            <h3 className="text-3xl mb-5">
              {t('forgot_password.form.success.title')}
            </h3>
            <p className="text-sm mb-4">
              {t('forgot_password.form.success.subtitle')}
            </p>
            <Link href={'/'} className="underline">
              {t('forgot_password.form.success.button')}
            </Link>
          </div>
        ) : (
          <div>
            <div className="text-2xl mb-4">{t('forgot_password.title')}</div>
            <div>{t('forgot_password.description_first')}</div>
            <div>{t('forgot_password.description_second')}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mt-8 mb-2 text-left">
                <Input
                  label={t('forgot_password.form.email.placeholder')}
                  className="mb-1 h-12"
                  {...register('email')}
                  error={errors.email}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 font-medium uppercase"
              >
                {t('forgot_password.form.button')}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
