'use client';

import React, { useMemo } from 'react';
import {
  Accordion,
  Button,
  LoaderSpinner,
  Select,
  Link
} from '@theme/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetRetailStoreQuery } from '@akinon/next/data/client/address';
import { useGetRetailStoreStockMutation } from '@akinon/next/data/client/product';
import { FindInStoreFormType } from '@akinon/next/types';
import { useLocalization } from '@akinon/next/hooks';
import { commonProductAttributes } from '@theme/settings';

const findInStoreFormSchema = (t) =>
  yup.object().shape({
    city_id: yup.string().required(t('product.find_in_store.required')),
    size: yup
      .string()
      .nullable()
      .notRequired()
      .when({
        is: (value) => value === '',
        then: yup.string().required(t('product.find_in_store.required'))
      })
  });

export const FindInStore = ({ productPk, productName, variants }) => {
  const { t } = useLocalization();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(findInStoreFormSchema(t))
  });
  const sizeKey = commonProductAttributes.find(
    (item) => item.translationKey === 'size'
  ).key;

  const { data: retailStore } = useGetRetailStoreQuery();
  const [
    getRetailStock,
    { data: response, isLoading: stockLoading, isSuccess: stockSuccess }
  ] = useGetRetailStoreStockMutation();

  const retailStoreOptions = useMemo(() => {
    if (retailStore) {
      const options = [
        { label: t('product.find_in_store.select_an_option'), value: '' }
      ];
      options.push(
        ...retailStore.results.map((item) => ({
          label: item.name,
          value: item.pk
        }))
      );
      return options;
    }
    return [];
  }, [retailStore]);

  const sizeOptions = useMemo(() => {
    if (variants) {
      const options = [
        { label: t('product.find_in_store.select_an_option'), value: '' }
      ];
      variants
        .filter((item) => item.attribute_name === sizeKey)
        .map((item) => {
          item.options.map((item) => {
            return options.push({ label: item.label, value: item.value });
          });
        });
      return options;
    }
    return [];
  }, [variants]);

  const createStockStatus = (stock) => {
    const status = {
      label: t('product.find_in_store.available')
    };

    if (stock == 0) {
      status.label = t('product.find_in_store.out_of_stock');
    } else if (stock < 5) {
      status.label = t('product.find_in_store.limited_stock');
    }

    return status.label;
  };

  const createStoreHours = (hours) => {
    const start = hours[0].slice(0, 5);
    const end = hours[1].slice(0, 5);

    if (hours) {
      return `${start} - ${end}`;
    }

    return t('product.find_in_store.unknown');
  };

  const onSubmit: SubmitHandler<FindInStoreFormType> = async (data) => {
    const queryString = new URLSearchParams(data).toString();

    getRetailStock({ productPk, queryString });
  };

  return (
    <div className="">
      <div className="my-4">{productName}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 flex-col border-b border-gray-150 lg:pb-7 lg:flex-row">
          <div className="flex flex-col lg:flex-row gap-4">
            <Select
              className="w-full"
              options={retailStoreOptions}
              {...register('city_id')}
              error={errors.city_id}
            />
            {sizeOptions.length > 1 && (
              <Select
                className="w-full"
                options={sizeOptions}
                {...register('size')}
                error={errors.size}
              />
            )}
          </div>
          <Button className="w-full lg:w-4/10" type="submit">
            {t('product.find_in_store.submit')}
          </Button>
        </div>
      </form>
      <div className="text-sm text-gray-850 text-start mt-4">
        {t('product.find_in_store.description')}
      </div>
      <div className="mt-4">
        {stockLoading && <LoaderSpinner />}

        {stockSuccess &&
          response.length > 0 &&
          response.map((store, index) => {
            return (
              <Accordion
                title={store.name}
                subTitle={createStockStatus(store.stock)}
                key={index}
              >
                <div className="flex flex-col items-center lg:flex-1">
                  <div className="mb-2">{store.address}</div>
                  <div>{t('product.find_in_store.working_hours')}:</div>
                  <div className="mb-3">
                    {createStoreHours(store.store_hours[0])}
                  </div>
                  <Link
                    href={`https://maps.google.com/?q=${store.latitude},${store.longitude}`}
                  >
                    {/* <a target="_blank"> */}
                    <Button>{t('product.find_in_store.directions')}</Button>
                    {/* </a> */}
                  </Link>
                </div>
              </Accordion>
            );
          })}

        {stockSuccess && response.length < 1 && (
          <div className="text-center my-4">
            {t('product.find_in_store.store_not_found')}
          </div>
        )}
      </div>
    </div>
  );
};


















