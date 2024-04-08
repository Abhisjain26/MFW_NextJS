'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountProfileFormType } from '@akinon/next/types';
import * as yup from 'yup';
import {
  Button,
  Checkbox,
  Input,
  Modal,
  Radio,
  Select,
  Link
} from '@theme/components';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { useEffect, useState } from 'react';
import {
  useUpdateProfileMutation,
  useGetProfileInfoQuery
} from '@akinon/next/data/client/account';
import { ROUTES } from '@theme/routes';
import { useLocalization } from '@akinon/next/hooks';
import { Trans } from '@akinon/next/components/trans';

const accountProfileFormSchema = (t) =>
  yup.object().shape({
    first_name: yup
      .string()
      .required(t('account.my_profile.form.required'))
      .matches(
        /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/,
        t('account.my_profile.form.error.name_match')
      ),
    last_name: yup
      .string()
      .required(t('account.my_profile.form.required'))
      .matches(
        /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/,
        t('account.my_profile.form.error.surname_match')
      ),
    birthdate: yup
      .object()
      .shape({
        day: yup.number().required(t('account.my_profile.form.required')),
        month: yup.number().required(t('account.my_profile.form.required')),
        year: yup.number().required(t('account.my_profile.form.required'))
      })
      .test(
        'isValidBirthdate',
        t('account.my_profile.form.birth_date.error.not_valid'),

        (value) => {
          const { day, month, year } = value;
          const date = new Date(`${year}-${month}-${day}`);

          return date && date <= new Date();
        }
      ),
    phone: yup
      .string()
      .transform((value: string) => value?.replace(/_/g, '').replace(/ /g, ''))
      .length(11, t('account.my_profile.form.phone.error.not_valid'))
      .required(t('account.my_profile.form.required')),
    gender: yup.string().required(t('account.my_profile.form.required'))
  });

export default function Page() {
  const { t } = useLocalization();
  const { user_phone_format } = useAppSelector((state) => state.config);
  const { data: profileInfo } = useGetProfileInfoQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [responseMessage, setResponseMessage] = useState({
    title: '',
    content: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<AccountProfileFormType>({
    resolver: yupResolver(accountProfileFormSchema(t))
  });

  const handleSuccess = () => {
    setResponseMessage({
      title: t('account.my_profile.form.success.title').toString(),
      content: t('account.my_profile.form.success.description').toString()
    });
    setIsModalOpen(true);
  };

  const handleError = () => {
    setResponseMessage({
      title: t('account.my_profile.form.error.title').toString(),
      content: t('account.my_profile.form.error.description').toString()
    });
    setIsModalOpen(true);
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<AccountProfileFormType> = async (data) => {
    const dateOfBirth = `${data.birthdate.year}-${data.birthdate.month}-${data.birthdate.day}`;

    if ('birthdate' in data) {
      delete data.birthdate;
    }

    updateProfile({
      date_of_birth: dateOfBirth,
      ...data
    })
      .unwrap()
      .then(handleSuccess)
      .catch(handleError);
  };

  const buildOptionDays = () => {
    const days = Array.from({ length: 31 }, (_, index) => {
      const day = (index + 1).toString().padStart(2, '0');
      return { label: day, value: day };
    });

    return days;
  };

  const buildOptionMonths = () => {
    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ];

    const options = months.map((month, index) => {
      const monthValue = (index + 1).toString().padStart(2, '0');
      return {
        label: t(`account.my_profile.form.months.${month}`),
        value: monthValue
      };
    });

    return options;
  };

  const buildOptionYears = () => {
    const currentYear = new Date().getFullYear();
    const minOffset = 0;
    const maxOffset = 80;

    const years = Array.from(
      { length: maxOffset - minOffset + 1 },
      (_, index) => {
        const year = currentYear - index;
        return { label: year, value: year };
      }
    );

    return years;
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);

    const {
      first_name = '',
      last_name = '',
      phone = '',
      gender = '',
      email_allowed = false,
      sms_allowed = false,
      date_of_birth = todayDate
    } = profileInfo || {};

    const [year, month, day] =
      date_of_birth?.split('-') ?? todayDate.split('-');

    reset({
      first_name,
      last_name,
      phone,
      gender,
      email_allowed,
      sms_allowed,
      birthdate: {
        day,
        month,
        year
      }
    });
  }, [profileInfo, reset]);

  return (
    <div>
      <div className="p-6 bg-gray-150">
        <h3 className="text-3xl text-center mb-5">
          {t('account.my_profile.header.title')}
        </h3>
        <p className="text-center">{t('account.my_profile.header.subtitle')}</p>
      </div>
      <div className="flex flex-col lg:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-500 mt-5 p-6 lg:px-24 lg:py-10 lg:w-[670px]"
        >
          <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:gap-x-7">
            <Input
              type="text"
              label={t('account.my_profile.form.name.placeholder')}
              className="w-full lg:w-56"
              {...register('first_name')}
              error={errors.first_name}
              required
            />
            <Input
              type="text"
              label={t('account.my_profile.form.surname.placeholder')}
              className="w-full lg:w-56"
              {...register('last_name')}
              error={errors.last_name}
              required
            />
          </div>
          <Input
            name="email"
            label={t('account.my_profile.form.email.placeholder')}
            type="email"
            value={profileInfo?.email ?? ''}
            disabled
            className="mb-5"
            required
          />
          <div className="mb-5">
            <Input
              label={t('account.my_profile.form.phone.placeholder')}
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
          <div className="mb-6">
            <label className="text-xs text-gray-800 mb-2 block">
              {t('account.my_profile.form.birth_date.title')}
            </label>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <div className="w-full sm:w-24">
                <Select
                  className="w-full border-gray-400 text-gray-800 bg-white"
                  options={buildOptionDays()}
                  {...register('birthdate.day')}
                />
              </div>
              <div className="w-full sm:w-24">
                <Select
                  className="w-full border-gray-400 text-gray-800 bg-white"
                  options={buildOptionMonths()}
                  {...register('birthdate.month')}
                />
              </div>
              <div className="w-full sm:w-24">
                <Select
                  className="w-full border-gray-400 text-gray-800 bg-white pr-0.5"
                  options={buildOptionYears()}
                  {...register('birthdate.year')}
                />
              </div>
            </div>
            {errors && (
              <div className="mt-1 text-sm text-error">
                {errors.birthdate?.message}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label className="text-xs text-gray-800 mb-3 block">
              {t('account.my_profile.form.gender.title')}
            </label>
            <div className="flex flex-wrap gap-4">
              <Radio
                className="accent-primary"
                name="gender"
                value="female"
                {...register('gender')}
              >
                {t('account.my_profile.form.gender.female')}
              </Radio>
              <Radio
                className="accent-primary"
                name="gender"
                value="male"
                {...register('gender')}
              >
                {t('account.my_profile.form.gender.male')}
              </Radio>
              <Radio
                className="accent-primary"
                name="gender"
                value="none"
                {...register('gender')}
              >
                {t('account.my_profile.form.gender.other')}
              </Radio>
            </div>
            {errors.gender?.type === 'typeError' && (
              <div className="text-sm text-error">
                {t('account.my_profile.form.required')}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label className="text-xs text-gray-800 mb-3 block">
              {t('account.my_profile.form.communication_channel.title')}
            </label>
            <div className="flex gap-6">
              <Checkbox
                className="accent-primary"
                {...register('email_allowed')}
              >
                {t('account.my_profile.form.communication_channel.email')}
              </Checkbox>
              <Checkbox className="accent-primary" {...register('sms_allowed')}>
                {t('account.my_profile.form.communication_channel.sms')}
              </Checkbox>
            </div>
          </div>
          <Button type="submit" className="w-full">
            {t('account.my_profile.form.submit_button')}
          </Button>
        </form>
        <div className="my-6 lg:ml-8">
          <h2 className="text-3xl mb-4">
            {t('account.my_profile.info.title')}
          </h2>
          <p className="text-sm font-medium">
            <Trans
              i18nKey="account.my_profile.info.content"
              components={{
                ContactLink: (
                  <Link href={ROUTES.ACCOUNT_CONTACT}>
                    {t('account.my_profile.info.contact')}
                  </Link>
                ),
                Faq: (
                  <Link href={ROUTES.ACCOUNT_FAQ}>
                    {t('account.my_profile.info.faq')}
                  </Link>
                )
              }}
            />
          </p>
        </div>
      </div>
      <Modal
        portalId="my-profile-modal"
        open={isModalOpen}
        setOpen={setIsModalOpen}
      >
        <div className="flex flex-col items-center justify-center gap-12 p-6">
          <h3
            className="text-2xl font-bold"
            data-testid="account-my-profile-response"
          >
            {responseMessage.title}
          </h3>
          <p className="text-center">{responseMessage.content}</p>
          <Button
            onClick={handleModalClick}
            appearance="outlined"
            className="font-medium px-10 py-2"
          >
            {t('account.my_profile.form.close_button')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
