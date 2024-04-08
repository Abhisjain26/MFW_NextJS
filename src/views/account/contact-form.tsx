import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FileInput,
  Input,
  LoaderSpinner,
  Select,
  Link
} from '@theme/components';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@akinon/next/redux/hooks';
import {
  useGetContactSubjectsQuery,
  useGetOrdersQuery,
  useSendContactMutation
} from '@akinon/next/data/client/account';
import { ContactFormType } from '@akinon/next/types';
import * as yup from 'yup';
import { useLocalization } from '@akinon/next/hooks';

const contactFormSchema = (t) =>
  yup.object().shape({
    full_name: yup.string().required(t('account.contact.form.error.required')),
    email: yup
      .string()
      .email(t('account.contact.form.error.email_valid'))
      .required(t('account.contact.form.error.required')),
    phone: yup
      .string()
      .transform((value: string) => value.replace(/_/g, '').replace(/ /g, ''))
      .length(11, t('account.contact.form.error.phone_length'))
      .required(t('account.contact.form.error.required')),
    subject: yup.string().required(t('account.contact.form.error.required')),
    message: yup
      .string()
      .required(t('account.contact.form.error.required'))
      .min(10, t('account.contact.form.error.message_length'))
      .label('message'),
    order: yup
      .string()
      .nullable()
      .notRequired()
      .when('subject', {
        is: (value) => value === '2',
        then: yup.string().required(t('account.contact.form.error.required'))
      })
  });

const ContactForm = () => {
  const { t } = useLocalization();
  const { data: session, status } = useSession();

  const filteredOrders = [
    { label: t('account.contact.form.order.placeholder'), value: '' }
  ];
  const filteredSubjects = [
    { label: t('account.contact.form.subject.placeholder'), value: '' }
  ];
  const [selectedSubject, setSelectedSubject] = useState(null);
  const { user_phone_format } = useAppSelector((state) => state.config);

  const {
    data: contactSubject,
    isLoading: subjectLoading,
    isSuccess: subjectSuccess
  } = useGetContactSubjectsQuery();

  const {
    data: orders,
    isLoading: ordersLoading,
    isSuccess: ordersSuccess
  } = useGetOrdersQuery(
    {},
    {
      skip: status === 'unauthenticated' || status === 'loading'
    }
  );

  const [sendContact, { isSuccess: formSuccess }] = useSendContactMutation();

  if (ordersSuccess) {
    orders?.results?.map((item) => {
      filteredOrders.push({ label: item.number, value: item.id.toString() });
    });
  }

  if (subjectSuccess) {
    contactSubject
      ?.filter((item) => {
        if (status === 'unauthenticated') {
          return !item.is_order_needed;
        }

        return item;
      })
      .forEach((item) => {
        filteredSubjects.push({ label: item.text, value: item.id });
      });
  }

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ContactFormType>({
    resolver: yupResolver(contactFormSchema(t))
  });

  const onSubmit: SubmitHandler<ContactFormType> = (data) => {
    sendContact(data);
  };

  const handleChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  useEffect(() => {
    reset({
      full_name:
        session?.user?.firstName && session?.user?.lastName
          ? `${session?.user?.firstName} ${session?.user?.lastName}`
          : '',
      email: session?.user?.email,
      phone: session?.user?.phone
    });
  }, [session, reset]);

  return (
    <div className="flex-1">
      <div className="bg-gray-150 p-4 lg:p-8">
        <h2 className="text-3xl text-center mb-5">
          {t('account.contact.header.title')}
        </h2>
        <p className="text-center">{t('account.contact.header.subtitle')}</p>
      </div>
      <div className="flex flex-col lg:flex-row">
        {formSuccess ? (
          <div>
            <div className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]">
              <h3 className="text-3xl mb-5">
                {t('account.contact.form.success.title')}
              </h3>
              <p className="text-sm mb-4">
                {t('account.contact.form.success.description')}
              </p>
              <Link href={'/'} className="underline">
                {t('account.contact.form.success.button')}
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]"
          >
            <div className="mb-5">
              <Input
                label={t('account.contact.form.full_name.placeholder')}
                className="mb-1"
                {...register('full_name')}
                error={errors.full_name}
                required
              />
            </div>
            <div className="mb-5">
              <Input
                label={t('account.contact.form.email.placeholder')}
                type="email"
                className="mb-1"
                {...register('email')}
                error={errors.email}
                required
              />
            </div>
            <div className="mb-5">
              <Input
                label={t('account.contact.form.phone.placeholder')}
                type="tel"
                className="mb-1"
                format={user_phone_format.replace(/\9/g, '#')}
                mask="_"
                allowEmptyFormatting={true}
                control={control}
                {...register('phone')}
                error={errors.phone}
                required
              />
            </div>

            <div className="mb-5 relative">
              {subjectLoading && <LoaderSpinner />}
              {subjectSuccess && (
                <>
                  <Select
                    className="w-full mb-1 border-gray-500 text-sm"
                    options={filteredSubjects}
                    {...register('subject')}
                    error={errors.subject}
                    onChange={handleChange}
                    label={t('account.contact.form.subject.title')}
                    required
                  />
                </>
              )}
            </div>

            {selectedSubject === '2' && (
              <div className="mb-5 relative">
                {ordersLoading && <LoaderSpinner />}
                {ordersSuccess && (
                  <>
                    <Select
                      className="w-full mb-1 border-gray-500 text-sm"
                      options={filteredOrders}
                      {...register('order')}
                      error={errors.order}
                      label={t('account.contact.form.order.title')}
                      required
                    />
                  </>
                )}
              </div>
            )}

            <label className="text-xs text-gray-800 mb-2 block">
              {t('account.contact.form.message.title')}{' '}
              <span className="text-secondary">*</span>
            </label>
            <textarea
              className="border-gray-500 border w-full text-xs p-2.5 focus-visible:outline-none focus:border-black hover:border-black"
              rows={7}
              name="message"
              {...register('message')}
            />
            {errors.message && (
              <div className="text-sm text-error">{errors.message.message}</div>
            )}
            <label className="text-xs text-gray-800 mb-2 block">
              {t('account.contact.form.file.title')}
            </label>
            <FileInput className="w-full mb-5" title="test" />
            <Button type="submit" className="w-full font-medium">
              {t('account.contact.form.submit_button')}
            </Button>
          </form>
        )}

        <div className="my-6 lg:ml-8">
          <h2 className="text-3xl mb-4">
            {' '}
            {t('account.contact.address_title')}
          </h2>
          <div className="mb-4">
            <h3 className="font-medium text-sm">London</h3>
            <p className="text-sm">7 Bell Yard, London, WC2A 2JR</p>
            <p className="text-sm">+44 20 3740 62 63</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-sm">İstanbul</h3>
            <p className="text-sm">YTU Davutpasa Teknopark A1 Z10</p>
            <p className="text-sm">+90 212 483 72 45</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-sm">Dubai</h3>
            <p className="text-sm">Level 21 Al Habtoor Business Tower</p>
            <p className="text-sm">+971 4275 6336</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium text-sm">Athens</h3>
            <p className="text-sm">Averof 18a, Chalandri</p>
            <p className="text-sm">+30 21 1411 6000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
