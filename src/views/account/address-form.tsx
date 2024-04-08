import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { AddressType, AddressFormType } from '@akinon/next/types';
import {
  Button,
  Checkbox,
  Icon,
  Input,
  Radio,
  Select
} from '@theme/components';
import {
  useGetCountriesQuery,
  useGetCitiesQuery,
  useGetTownshipsQuery,
  useGetDistrictsQuery
} from '@akinon/next/data/client/address';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { useLocalization } from '@akinon/next/hooks';

type SelectOptionType = {
  label: string;
  value: string | number;
};

interface Props {
  data?: any;
  onSubmit: (data: any) => void;
}

const makeAddressFormSchema = (t, { phoneNumberLength }) =>
  yup.object().shape({
    title: yup.string().required(t('account.address_book.form.error.required')),
    first_name: yup
      .string()
      .required(t('account.address_book.form.error.required')),
    last_name: yup
      .string()
      .required(t('account.address_book.form.error.required')),
    phone_number: yup
      .string()
      .transform((value: string) => value.replace(/_/g, '').replace(/ /g, ''))
      .length(
        phoneNumberLength,
        t('account.address_book.form.error.phone_length')
      )
      .required(t('account.address_book.form.error.required')),
    country: yup
      .string()
      .required(t('account.address_book.form.error.required')),
    city: yup.string().required(t('account.address_book.form.error.required')),
    township: yup
      .string()
      .required(t('account.address_book.form.error.required')),
    district: yup
      .string()
      .required(t('account.address_book.form.error.required')),
    line: yup
      .string()
      .required(t('account.address_book.form.error.required'))
      .min(10, t('account.address_book.form.error.line_min'))
      .max(255, t('account.address_book.form.error.line_max')),
    postcode: yup
      .string()
      .min(5, t('account.address_book.form.error.postcode_min'))
      .max(5, t('account.address_book.form.error.postcode_max'))
      .required(t('account.address_book.form.error.required')),
    company_name: yup.string().nullable(),
    tax_no: yup.string().nullable(),
    tax_office: yup.string().nullable(),
    e_bill_taxpayer: yup.boolean().nullable()
  });

export const AddressForm = (props: Props) => {
  const { t } = useLocalization();

  const { data, onSubmit } = props;
  const config = useAppSelector((state) => state.config);
  const addressFormSchema = makeAddressFormSchema(t, {
    phoneNumberLength: config.user_phone_format.length
  });
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm<AddressFormType>({
    resolver: yupResolver(addressFormSchema),
    defaultValues: { is_corporate: AddressType.individual, type: 'customer' }
  });

  const selectedFormType = watch('is_corporate');
  const selectedCountry = watch('country');
  const selectedCity = watch('city');
  const selectedTownship = watch('township');

  const { data: country } = useGetCountriesQuery();
  const { data: city } = useGetCitiesQuery(selectedCountry, {
    skip: !selectedCountry
  });
  const { data: township } = useGetTownshipsQuery(selectedCity, {
    skip: !selectedCity
  });
  const { data: district } = useGetDistrictsQuery(selectedTownship, {
    skip: !selectedTownship
  });

  const countryOptions = useMemo(() => {
    if (country) {
      const options: SelectOptionType[] = [
        { label: t('account.address_book.form.country.placeholder'), value: '' }
      ];
      options.push(
        ...country.results.map((item) => ({ label: item.name, value: item.pk }))
      );
      return options;
    }
    return [];
  }, [country]);

  const cityOptions = useMemo(() => {
    if (city) {
      const options: SelectOptionType[] = [
        {
          label: t('account.address_book.form.province.placeholder'),
          value: ''
        }
      ];
      options.push(
        ...city.results.map((item) => ({ label: item.name, value: item.pk }))
      );
      return options;
    }
    return [];
  }, [city]);

  const townshipOptions = useMemo(() => {
    if (township) {
      const options: SelectOptionType[] = [
        {
          label: t('account.address_book.form.township.placeholder'),
          value: ''
        }
      ];
      options.push(
        ...township.results.map((item) => ({
          label: item.name,
          value: item.pk
        }))
      );
      return options;
    }
    return [];
  }, [township]);

  const districtOptions = useMemo(() => {
    if (district) {
      const options: SelectOptionType[] = [
        {
          label: t('account.address_book.form.district.placeholder'),
          value: ''
        }
      ];
      options.push(
        ...district.results.map((item) => ({
          label: item.name,
          value: item.pk
        }))
      );
      return options;
    }
    return [];
  }, [district]);

  useEffect(() => {
    if (data && country) {
      reset({
        ...data,
        is_corporate:
          String(data.is_corporate) === AddressType.company ? 'true' : 'false' // TODO: Fix this! This hack for radio buttons can't be set to boolean value
      });
    }
  }, [data, country, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col py-4 px-6 gap-6"
    >
      <div className="flex gap-8">
        <Radio
          {...register('is_corporate')}
          value="false"
          data-testid="address-form-personal"
        >
          <span className="text-base">
            {t('account.address_book.form.type.personal')}
          </span>
        </Radio>
        <Radio
          {...register('is_corporate')}
          value="true"
          data-testid="address-form-corporate"
        >
          <span className="text-base">
            {t('account.address_book.form.type.corporate')}
          </span>
        </Radio>
      </div>
      <Input
        label={t('account.address_book.form.address_title.placeholder')}
        {...register('title')}
        error={errors.title}
        data-testid="address-form-title"
        required
      />
      <Input
        label={t('account.address_book.form.name.placeholder')}
        {...register('first_name')}
        error={errors.first_name}
        data-testid="address-form-first-name"
        required
      />
      <Input
        label={t('account.address_book.form.surname.placeholder')}
        {...register('last_name')}
        error={errors.last_name}
        data-testid="address-form-last-name"
        required
      />
      <Input
        label={t('account.address_book.form.phone.placeholder')}
        format={config.user_phone_format.replaceAll(/\9/g, '#')}
        mask="_"
        allowEmptyFormatting={true}
        control={control}
        {...register('phone_number')}
        error={errors.phone_number}
        data-testid="address-form-phone"
        required
      />
      {/* TODO: Fix select and textarea components */}

      <Select
        className="w-full border-gray-500 text-sm mt-2"
        options={countryOptions}
        {...register('country')}
        error={errors.country}
        data-testid="address-form-country"
        label={t('account.address_book.form.country.title')}
        required
      />

      {city && (
        <Select
          className="w-full border-gray-500 text-sm mt-2"
          options={cityOptions}
          {...register('city')}
          error={errors.city}
          data-testid="address-form-city"
          label={t('account.address_book.form.province.title')}
          required
        />
      )}
      {township && (
        <div className="flex gap-4">
          <div className="flex-1">
            <Select
              className="w-full border-gray-500 text-sm mt-2"
              options={townshipOptions}
              {...register('township')}
              error={errors.township}
              data-testid="address-form-township"
              label={t('account.address_book.form.township.title')}
              required
            />
          </div>
          {district && (
            <div className="flex-1">
              <Select
                className="w-full border-gray-500 text-sm mt-2"
                options={districtOptions}
                {...register('district')}
                error={errors.district}
                data-testid="address-form-district"
                label={t('account.address_book.form.district.title')}
                required
              />
            </div>
          )}
        </div>
      )}
      <label className="text-xs text-gray-800 relative">
        <>
          <span>{t('account.address_book.form.address.title')}</span>
          <span className="text-secondary"> *</span>
        </>

        <textarea
          {...register('line')}
          rows={6}
          className={clsx(
            'block w-full mt-2 border p-2',
            errors.line
              ? 'border-error focus:border-error'
              : 'border-gray-500 hover:border-black focus:border-black'
          )}
          data-testid="address-form-address-field"
        />
        {errors.line && (
          <span
            className="absolute -bottom-5 left-0 text-sm text-error"
            data-testid="address-form-address-field-error"
          >
            {errors.line.message}
          </span>
        )}
      </label>
      <Input
        type="number"
        label={t('account.address_book.form.post_code.placeholder')}
        {...register('postcode')}
        error={errors.postcode}
        data-testid="address-form-post-code"
        required
      />
      {selectedFormType === AddressType.company && (
        <>
          <Input
            type="text"
            label={t('account.address_book.form.company_name.placeholder')}
            {...register('company_name')}
            error={errors.company_name}
            data-testid="address-form-company-name"
          />
          <Input
            type="number"
            label={t('account.address_book.form.tax_no.placeholder')}
            {...register('tax_no')}
            error={errors.tax_no}
            data-testid="address-form-tax-no"
          />
          <Input
            type="text"
            label={t('account.address_book.form.tax_office.placeholder')}
            {...register('tax_office')}
            error={errors.tax_office}
            data-testid="address-form-tax-office"
          />
          <Checkbox
            className="accent-primary"
            {...register('e_bill_taxpayer')}
            data-testid="address-form-taxpayer"
          >
            {t('account.address_book.form.taxpayer.title')}
          </Checkbox>
        </>
      )}
      <Button
        type="submit"
        className="flex items-center justify-center font-semibold gap-2"
        data-testid="address-form-submit"
      >
        <span>{t('account.address_book.form.submit_button')}</span>
        <Icon name="chevron-end" size={12} className="fill-white" />
      </Button>
    </form>
  );
};
