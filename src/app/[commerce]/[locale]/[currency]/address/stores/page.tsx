'use client';

import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useLocalization } from '@akinon/next/hooks';
import {
  useGetCountriesQuery,
  useGetStoresQuery,
  useGetRetailStoreCitiesQuery
} from '@akinon/next/data/client/address';
import {
  Select,
  Accordion,
  Button,
  Icon,
  SkeletonWrapper,
  Skeleton
} from '@theme/components';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { Image } from '@akinon/next/components/image';

type SelectOptionType = {
  label: string;
  value: string | number;
};

export default function Stores() {
  const { t } = useLocalization();

  const [selectedCityPk, setSelectedCityPk] = useState(null);
  const [center, setCenter] = useState({
    lat: 39.1615254,
    lng: 35.0687716,
    zoom: 2
  });

  const { register, watch } = useForm();

  const selectedCountry = watch('country');
  const selectedCity = watch('city');

  const { data: stores } = useGetStoresQuery();
  const { data: country, isLoading: countryLoading } = useGetCountriesQuery();
  const { data: city, isLoading: cityLoading } = useGetRetailStoreCitiesQuery(
    selectedCountry,
    {
      skip: !selectedCountry
    }
  );

  const countryOptions = useMemo(() => {
    if (country) {
      const options: SelectOptionType[] = [
        { label: t('common.stores.select_country'), value: '' }
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
        { label: t('common.stores.select_city'), value: '' }
      ];
      options.push(
        ...city.results.map((item) => ({ label: item.name, value: item.pk }))
      );
      return options;
    }
    return [];
  }, [city]);

  const handleBackButtonClick = () => {
    setSelectedCityPk(null);
    setCenter({ lat: 39.1615254, lng: 35.0687716, zoom: 2 });
  };

  useEffect(() => {
    if (selectedCity) {
      setSelectedCityPk(Number(selectedCity));
    }
  }, [selectedCity]);

  return (
    <div className="container px-4 mx-auto my-4 lg:px-0">
      <h1 className="text-lg lg:text-3xl mb-4">{t('common.stores.title')}</h1>

      <form className="flex flex-wrap flex-col gap-1 md:gap-6 md:flex-row">
        {countryLoading && (
          <SkeletonWrapper>
            <Skeleton className="w-full h-10 md:w-60" />
          </SkeletonWrapper>
        )}

        {country && (
          <Select
            className="border-gray-100 w-full mb-3 md:mb-0 md:w-60"
            options={countryOptions}
            {...register('country')}
          />
        )}

        {cityLoading && (
          <SkeletonWrapper>
            <Skeleton className="w-full h-10 md:w-60" />
          </SkeletonWrapper>
        )}

        {city && (
          <Select
            className="border-gray-100 w-full mb-3 md:mb-0 md:w-60"
            options={cityOptions}
            {...register('city')}
          />
        )}
      </form>

      <div className="flex gap-6 mt-4 flex-col md:flex-row">
        {city && (
          <div className="w-full flex-shrink-0 md:w-60 overflow-y-scroll max-h-[36rem]">
            {cityLoading && (
              <SkeletonWrapper>
                <Skeleton className="w-full h-20" />
              </SkeletonWrapper>
            )}

            {city.results.map((city, index) => (
              <div
                className={clsx({
                  hidden: selectedCityPk !== city.pk && selectedCityPk !== null
                })}
                key={index}
              >
                <div className="flex items-center border-b border-gray-100">
                  <Button
                    className={clsx([
                      'w-full',
                      'flex',
                      'justify-between',
                      'items-center',
                      'bg-transparent',
                      'text-primary',
                      'border-0',
                      'p-0'
                    ])}
                    onClick={() => setSelectedCityPk(city.pk)}
                  >
                    {city.name}
                  </Button>
                  {selectedCityPk !== city.pk ? (
                    <Icon name="chevron-end" size={12} />
                  ) : (
                    <Button
                      onClick={handleBackButtonClick}
                      className="bg-transparent text-primary border-0 p-0"
                    >
                      <Icon name="close" size={12} />
                    </Button>
                  )}
                </div>

                <div className={clsx({ hidden: selectedCityPk !== city.pk })}>
                  {stores &&
                    stores.results
                      .filter((store) => store?.township?.city?.pk === city.pk)
                      .map((store, index) => (
                        <Accordion
                          key={index}
                          title={store.name}
                          titleClassName="text-xs font-bold"
                          iconSize={12}
                          className="relative py-3 border-b justify-center mb-0"
                        >
                          <div className="text-xs">
                            {store.address && (
                              <div className="mb-2">T: {store.address} </div>
                            )}
                            <div className="mb-1">
                              {store.township.city.name && (
                                <span>{store.township.city.name} / </span>
                              )}
                              {store.township.city.country.name && (
                                <span>{store.township.city.country.name}</span>
                              )}
                            </div>
                            {store.phone_number && (
                              <div>T: {store.phone_number} </div>
                            )}
                            {store.fax_phone_number && (
                              <div>F: {store.fax_phone_number}</div>
                            )}

                            {store.image && (
                              <Image
                                src={store.image}
                                alt={store.address}
                                className="mt-2"
                                sizes="256px"
                                aspectRatio={256 / 192}
                                fill
                              />
                            )}
                          </div>

                          {store.latitude && store.longitude && (
                            <Button
                              className="w-full mt-2"
                              onClick={() =>
                                setCenter({
                                  lat: Number(store.latitude),
                                  lng: Number(store.longitude),
                                  zoom: 15
                                })
                              }
                            >
                              {t('common.stores.directions')}
                            </Button>
                          )}
                        </Accordion>
                      ))}

                  <button
                    className="text-sm font-medium underline cursor-pointer mt-2"
                    onClick={handleBackButtonClick}
                  >
                    {t('common.stores.back')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="w-full">
          <div className="relative w-full h-[18rem] lg:h-[36rem]">
            <LoadScriptNext
              googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
              loadingElement={
                <SkeletonWrapper>
                  <Skeleton className="w-full h-48 mt-4 md:h-96 md:mt-0" />
                </SkeletonWrapper>
              }
            >
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={center.zoom}
              >
                {stores &&
                  stores.results.map((store, index) => (
                    <Marker
                      key={index}
                      position={{
                        lat: parseFloat(store.latitude),
                        lng: parseFloat(store.longitude)
                      }}
                    />
                  ))}
              </GoogleMap>
            </LoadScriptNext>
          </div>
        </div>
      </div>
    </div>
  );
}
