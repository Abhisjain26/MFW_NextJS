'use client';

import clsx from 'clsx';
import { Button, Icon, Modal } from '@theme/components';
import { useAddProductToBasket } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { useAddStockAlertMutation } from '@akinon/next/data/client/wishlist';
import { pushAddToCart, pushProductViewed } from '@theme/utils/gtm';
import { PriceWrapper, Variant } from '@theme/views/product';
import Share from '@theme/views/share';
import { ProductPageProps } from './layout';
import MiscButtons from './misc-buttons';
import { useLocalization } from '@akinon/next/hooks';
import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import { Trans } from '@akinon/next/components/trans';
import { useSession } from 'next-auth/react';

export default function ProductInfo({ data }: ProductPageProps) {
  
  const { t } = useLocalization();
  const { data: session } = useSession();
  const [currentUrl, setCurrentUrl] = useState(null);
  const [productError, setProductError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockAlertResponseMessage, setStockAlertResponseMessage] =
    useState(null);

  const [addProduct, { isLoading: isAddToCartLoading }] =
    useAddProductToBasket();
  const [addStockAlert, { isLoading: isAddToStockAlertLoading }] =
    useAddStockAlertMutation();
  const inStock = data.selected_variant !== null || data.product.in_stock;

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [currentUrl]);

  useEffect(() => {
    pushProductViewed(data?.product);
  }, []);

  const addProductToCart = async () => {
    if (!variantsSelectionCheck()) {
      return;
    }

    try {
      await addProduct({
        product: data.product.pk,
        quantity: 1,
        attributes: {}
      });

      pushAddToCart(data?.product);
    } catch (error) {
      setProductError(
        error?.data?.non_field_errors ||
        Object.keys(error?.data).map(
          (key) => `${key}: ${error?.data[key].join(', ')}`
        )
      );
    }
  };

  const variantsSelectionCheck = () => {
    const unselectedVariant = data.variants.find((variant) =>
      variant.options.every((opt) => !opt.is_selected)
    );

    if (unselectedVariant) {
      setProductError(() => (
        <Trans
          i18nKey="product.please_select_variant"
          components={{
            VariantName: <span>{unselectedVariant.attribute_name}</span>
          }}
        />
      ));

      return false;
    }

    return true;
  };

  const addProductToStockAlertList = async () => {
    try {
      await addStockAlert({
        productPk: data.product.pk,
        email: session?.user?.email
      })
        .unwrap()
        .then(handleSuccess)
        .catch((err) => handleError(err));

      // TODO: handle success response
    } catch (error) {
      setProductError(error?.data?.non_field_errors || null);
    }
  };

  const handleModalClick = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    setStockAlertResponseMessage(() => (
      <Trans
        i18nKey="product.stock_alert.success_description"
        components={{
          Email: <span>{session?.user?.email}</span>
        }}
      />
    ));
    setIsModalOpen(true);
  };

  const handleError = (err) => {
    if (err.status !== 401) {
      setStockAlertResponseMessage(
        t('product.stock_alert.error_description').toString()
      );
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-1/2 h-14 z-[20] bg-white mt-0 border-t border-gray-500 items-center justify-center',
          'sm:relative sm:flex sm:items-center sm:mt-5 sm:border-none'
        )}
      >
        <PriceWrapper
          price={data.product.price}
          retailPrice={data.product.retail_price}
        />
      </div>
      <div className="flex flex-col">
        {data.variants.map((variant) => (
          <Variant
            key={variant.attribute_key}
            {...variant}
            className="items-center mt-8"
            onChange={() => setProductError(null)}
          />
        ))}
      </div>

      {productError && (
        <div className="mt-4 text-xs text-center text-error">
          {productError}
        </div>
      )}

      <Button
        disabled={isAddToCartLoading || isAddToStockAlertLoading}
        className={clsx(
          'fixed bottom-0 right-0 w-1/2 h-14 z-[20] flex items-center justify-center fill-primary-foreground',
          'hover:fill-primary sm:relative sm:w-full sm:mt-3 sm:font-semibold pinkbtn'
        )}
        onClick={() => {
          setProductError(null);

          if (inStock) {
            addProductToCart();
          } else {
            addProductToStockAlertList();
          }
        }}
        data-testid="product-add-to-cart"
      >
        {inStock ? (
          <span>{t('product.add_to_cart')}</span>
        ) : (
          <>
            <Icon name="bell" size={20} className="mr-4" />
            <span>{t('product.add_stock_alert')}</span>
          </>
        )}
      </Button>

      <PluginModule
        component={Component.OneClickCheckoutButtons}
        props={{
          product: data.product,
          clearBasket: true,
          addBeforeClick: variantsSelectionCheck,
          openMiniBasket: false
        }}
      />

      <MiscButtons
        productName={data.product.name}
        productPk={data.product.pk}
        variants={data.variants}
      />

      <Share
        className="my-2 sm:my-4"
        buttonText={t('product.share')}
        items={[
          {
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`,
            iconName: 'facebook',
            iconSize: 22
          },
          {
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              currentUrl
            )}`,
            iconName: 'twitter',
            iconSize: 22
          },
          {
            href: `https://api.whatsapp.com/send?text=${data.product.name
              }%20${encodeURIComponent(currentUrl)}`,
            iconName: 'whatsapp',
            iconSize: 22
          }
        ]}
      />

      <Modal
        portalId="stock-alert-modal"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        showCloseButton={false}
        className="w-5/6 md:max-w-md"
      >
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-9">
          <Icon name="bell" size={48} />
          <h2 className="text-xl font-semibold">
            {t('product.stock_alert.title')}
          </h2>
          <div className="max-w-40 text-xs text-center leading-4">
            <p>{stockAlertResponseMessage}</p>
          </div>
          <Button
            onClick={handleModalClick}
            appearance="outlined"
            className="font-semibold px-10 h-12"
          >
            {t('product.stock_alert.close_button')}
          </Button>
        </div>
      </Modal>
    </>
  );
}
