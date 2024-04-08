'use client';

import { useLocalization } from '@akinon/next/hooks';
import React from 'react';
import { Accordion } from '@theme/components';
import InstallmentOptions from '@theme/views/installment-options';

export default function AccordionWrapper({ data, deliveryReturn }) {
  const { t } = useLocalization();

  const generateHtml = (data: string) => {
    return { __html: data };
  };

  return (
    <div className="w-full">
      <Accordion title={t('product.details_care')}>
        {t('product.product_code')}: {data.product.sku} -{' '}
        {data.product.base_code}
        {data.product.attributes.integration_ProductAtt03Desc &&
          data.product.attributes.integration_ProductAtt03Desc}
        {data.product.attributes.integration_kumas_icerik &&
          data.product.attributes.integration_kumas_icerik}
        {data.product.attributes.model_olculeri &&
          data.product.attributes.model_olculeri}
        {data.product.attributes.aciklama && (
          <div
            dangerouslySetInnerHTML={generateHtml(
              data.product.attributes.aciklama
            )}
          />
        )}
      </Accordion>
      <Accordion title={t('product.delivery_collections')}>
        <div
          dangerouslySetInnerHTML={generateHtml(
            deliveryReturn?.product_delivery_returns?.value
          )}
        />
      </Accordion>

      <Accordion title={t('product.installment_options')}>
        <InstallmentOptions productPk={data.product.pk} />
      </Accordion>
    </div>
  );
}
