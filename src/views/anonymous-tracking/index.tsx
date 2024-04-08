'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, LoaderSpinner } from '@theme/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalization, useRouter } from '@akinon/next/hooks';
import { useGetAnonymousTrackingMutation } from '@akinon/next/data/client/user';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type AnonymousTrackingFormType = {
  email: string;
  number: string;
};

export const AnonymousTracking = ({ setOrder }) => {
  const { t } = useLocalization();
  const pathname = usePathname();
  const router = useRouter();
  const [getAnonymousTrackingData, { isLoading }] =
    useGetAnonymousTrackingMutation();

  const loginFormSchema = (t) =>
    yup.object().shape({
      email: yup
        .string()
        .email(t('account.anonymous_order.error.email_valid'))
        .required(t('account.anonymous_order.error.required')),
      number: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required(t('account.anonymous_order.error.required'))
    });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AnonymousTrackingFormType>({
    resolver: yupResolver(loginFormSchema(t))
  });

  const onSubmit: SubmitHandler<AnonymousTrackingFormType> = (data) => {
    getAnonymousTrackingData(data)
      .unwrap()
      .then((response) => {
        if (response) {
          setOrder(response?.[0]);
        }
      })
      .catch(() => {
        setOrder(null);
      })
      .finally(() => {
        router.push(pathname + '?formSuccess=true');
      });
  };

  return (
    <section className="w-full py-10 px-5 md:py-0 md:px-8 md:mx-auto lg:px-16">
      <h2 className="mb-3 text-lg text-start text-black-800 font-light md:mb-9 md:text-2xl">
        {t('account.anonymous_order.form.title')}
      </h2>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <Input
            labelStyle="floating"
            label={t('account.anonymous_order.form.order_id')}
            name="number"
            className="h-14"
            data-testid="order-id"
            required
            {...register('number')}
            error={errors.number}
          />
        </div>

        <div className="mb-4">
          <Input
            labelStyle="floating"
            label={t('account.anonymous_order.form.email')}
            name="email"
            className="h-14"
            data-testid="anonymous-tracking-email"
            required
            {...register('email')}
            error={errors.email}
          />
        </div>

        <Button
          className={clsx(
            'w-full h-12 uppercase text-xs font-semibold',
            isLoading && 'bg-white pointer-events-none'
          )}
          type="submit"
          data-testid="anonymous-tracking-submit"
        >
          {isLoading ? (
            <LoaderSpinner className="w-6 h-6" />
          ) : (
            t('account.anonymous_order.form.submit_button')
          )}
        </Button>
      </form>
    </section>
  );
};
