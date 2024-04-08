'use client';

import { Button, Input, Link } from '@theme/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  usePasswordResetMutation,
  PasswordResetType
} from '@akinon/next/data/client/account';
import { useLocalization } from '@akinon/next/hooks';
import PasswordRulesFeedback from '@theme/components/password-rules-feedback';

export default function NewPassword({ params: { id } }) {
  const { t } = useLocalization();
  const [newPassword, { isSuccess: formSuccess }] = usePasswordResetMutation();

  const newPasswordFormSchema = (t) =>
    yup.object().shape({
      password: yup
        .string()
        .required(t('forgot_password.create_new_password.form.error.required'))
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/,
          t('forgot_password.create_new_password.form.error.password_rule')
        )
        .max(50, t('forgot_password.create_new_password.form.error.password_max')),
      repeatPassword: yup
        .string()
        .required(t('forgot_password.create_new_password.form.error.required'))
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PasswordResetType>({
    resolver: yupResolver(newPasswordFormSchema(t))
  });
  const passwordValue = watch('password', '');

  const onSubmit: SubmitHandler<PasswordResetType> = (data) => {
    data.slug = id;
    newPassword(data);
  };

  return (
    <div className="container my-12 flex flex-col items-center px-4">
      <div className="w-full xl:w-5/12 text-center">
        {formSuccess ? (
          <div>
            <h3 className="text-3xl mb-5">
              {t('forgot_password.create_new_password.form.success.title')}
            </h3>

            <Link href={'/'} className="underline">
              {t('forgot_password.create_new_password.form.success.button')}
            </Link>
          </div>
        ) : (
          <div>
            <div className="text-2xl mb-4">
              {t('forgot_password.create_new_password.title')}
            </div>

            <div>{t('forgot_password.create_new_password.description')}</div>

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mt-8 mb-2 text-left">
                <Input
                  label={t(
                    'forgot_password.create_new_password.form.password.placeholder_first'
                  )}
                  {...register('password')}
                  type="password"
                  className="mb-1 h-12"
                  error={errors.password}
                  required
                />

                <PasswordRulesFeedback password={passwordValue} isVisible={errors?.password ? true : false}/>
              </div>

              <div className="mb-2 text-left">
                <Input
                  label={t(
                    'forgot_password.create_new_password.form.password.placeholder_second'
                  )}
                  {...register('repeatPassword')}
                  type="password"
                  className="mb-1 h-12"
                  error={errors.password}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 font-medium uppercase"
              >
                {t('forgot_password.create_new_password.form.button')}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
