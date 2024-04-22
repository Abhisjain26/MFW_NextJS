'use client';

import { useLocalization } from '@akinon/next/hooks';
import { Accordion } from '@theme/components';
import InstallmentOptions from '@theme/views/installment-options';
import React from 'react';

export default function AccordionWrapper({ data, deliveryReturn }) {

  const { t } = useLocalization();
  const generateHtml = (data: string) => {
    return { __html: data };
  };
  // const items = ['sexy sleepwer: Home wear', 'dress: Woman dresses', 'color: black / red / skin / Navy blue / pink', 'Thickness: Thin', 'Sleeve Length(cm): Sleeveless'];





  return (

    <div className="flex flex-col items-left products-features">
      <h1
        className="mt-2 pb-2 text-2xl text-left md-mt-0 product-name"
        data-testid="product-name"
      >
        Product Features:
      </h1>

      <div>
          <span dangerouslySetInnerHTML={{ __html: data.product.attributes['body-name1'] }}></span>
      </div>

    </div>






    // <div className="w-full">
    //   <Accordion title={t('product.details_care')}>
    //     {t('product.product_code')}: {data.product.sku} -{' '}
    //     {data.product.base_code}
    //     {data.product.attributes.integration_ProductAtt03Desc &&
    //       data.product.attributes.integration_ProductAtt03Desc}
    //     {data.product.attributes.integration_kumas_icerik &&
    //       data.product.attributes.integration_kumas_icerik}
    //     {data.product.attributes.model_olculeri &&
    //       data.product.attributes.model_olculeri}
    //     {data.product.attributes.aciklama && (
    //       <div
    //         dangerouslySetInnerHTML={generateHtml(
    //           data.product.attributes.aciklama
    //         )}
    //       />
    //     )}
    //   </Accordion>
    //   <Accordion title={t('product.delivery_collections')}>
    //     <div
    //       dangerouslySetInnerHTML={generateHtml(
    //         deliveryReturn?.product_delivery_returns?.value
    //       )}
    //     />
    //   </Accordion>

    //   <Accordion title={t('product.installment_options')}>
    //     <InstallmentOptions productPk={data.product.pk} />
    //   </Accordion>
    // </div>




  );
}