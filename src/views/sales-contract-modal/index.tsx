'use client';

import { Price, Button, Modal } from '@theme/components';
import { Order } from '@akinon/next/types';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useLocalization } from '@akinon/next/hooks';

interface Props {
  data: Order;
}

export const SalesContractModal = ({ data }: Props) => {
  const { t } = useLocalization();
  const [openModal, setOpenModal] = useState(false);

  const billingAddressName = data.billing_address.is_corporate
    ? data.billing_address.company_name
    : data.billing_address.first_name + ' ' + data.billing_address.last_name;

  const billingAddress =
    data.billing_address.line +
    '/' +
    data.billing_address.township.name +
    '/' +
    data.billing_address.city.name;

  return (
    <div className="w-full">
      <Button
        className="underline bg-white text-black border-0 px-0"
        onClick={() => setOpenModal(true)}
      >
        {t('account.my_orders.return.contract')}
      </Button>
      <Modal
        title={t('account.sales_contract.title_modal')}
        portalId="portal-modal-container"
        open={openModal}
        setOpen={setOpenModal}
      >
        <div className="p-6 max-h-80 overflow-auto">
          <div>
            <div className="mb-5">
              <div className="leading-6">
                {t('account.sales_contract.customer_details')}
              </div>

              <div className="font-light text-sm">
                <span>{t('account.sales_contract.name_surname_title')}</span>
                <span>{billingAddressName}</span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.address')}
                <span>{billingAddress}</span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.phone')}
                <span>{data.billing_address.phone_number}</span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.email')}
                <span>{data.billing_address.email}</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="leading-6">
                {t('account.sales_contract.shipping_details')}
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.name_surname_title')}
                <span>
                  {data.shipping_address.is_corporate
                    ? data.shipping_address.company_name
                    : data.shipping_address.first_name +
                      ' ' +
                      data.shipping_address.last_name}
                </span>
              </div>

              {data.billing_address.is_corporate && (
                <>
                  <div className="font-light text-sm">
                    {t('account.sales_contract.tax_no')}
                    <span>{data.shipping_address.tax_no}</span>
                  </div>

                  <div className="font-light text-sm">
                    {t('account.sales_contract.tax_office')}
                    <span>{data.shipping_address.tax_office}</span>
                  </div>
                </>
              )}

              <div className="font-light text-sm">
                {t('account.sales_contract.address')}
                <span>
                  {data.shipping_address.line +
                    '/' +
                    data.shipping_address.township.name +
                    '/' +
                    data.shipping_address.city.name}
                </span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.phone')}
                <span>{data.shipping_address.phone_number}</span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.email')}
                <span>{data.shipping_address.email}</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="leading-6">
                {t('account.sales_contract.billing_details')}
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.name_surname_title')}
                <span>{billingAddressName}</span>
              </div>

              {data.billing_address.is_corporate && (
                <>
                  <div className="font-light text-sm">
                    {t('account.sales_contract.tax_no')}
                    <span>{data.billing_address.tax_no}</span>
                  </div>

                  <div className="font-light text-sm">
                    {t('account.sales_contract.tax_office')}
                    <span>{data.billing_address.tax_office}</span>
                  </div>
                </>
              )}

              <div className="font-light text-sm">
                {t('account.sales_contract.address')}
                <span>{billingAddress}</span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.phone')}
                <span>{data.billing_address.phone_number}</span>
              </div>

              <div className="font-light text-sm">
                {t('account.sales_contract.email')}
                <span>{data.billing_address.email}</span>
              </div>
            </div>

            <div className="mb-5">
              <div className="leading-6">
                <span>{t('account.sales_contract.agreement_details')}</span>
              </div>
              <div className="font-light text-sm">
                {t('account.sales_contract.agreement_date')}
                <span>{dayjs().format('DD/MM/YYYY')}</span>
              </div>
            </div>

            <table className="w-full border">
              <thead className="text-sm">
                <tr>
                  <th className="border font-normal text-left py-2 px-3">
                    {t('account.sales_contract.product')}
                  </th>
                  <th className="border font-normal py-2 px-3">
                    {t('account.sales_contract.quantity')}
                  </th>
                  <th className="border font-normal text-left py-2 px-3">
                    {t('account.sales_contract.product_price')}
                  </th>
                  <th className="border font-normal text-left py-2 px-3">
                    {t('account.sales_contract.total_price')}
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {data.orderitem_set.map((value, index) => {
                  return (
                    <tr key={index.toString()}>
                      <td className="border font-light text-left py-2 px-3">
                        {value.product.name}
                      </td>
                      <td className="border font-light text-center py-2 px-3">
                        {value.quantity ? value.quantity : '1'}
                      </td>
                      <td className="border font-light text-center py-2 px-3">
                        <Price
                          value={
                            value.unit_price ? value.unit_price : value.price
                          }
                        />
                      </td>
                      <td className="border font-light text-right py-2 px-3">
                        <Price
                          value={
                            value.total_amount
                              ? value.total_amount
                              : value.price
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className="text-sm">
                <tr>
                  <th
                    colSpan={3}
                    className="border text-left py-2 px-3 font-normal"
                  >
                    {t('account.sales_contract.products_total')}
                  </th>
                  <td
                    className="border text-right py-2 px-3 font-light"
                    colSpan={1}
                  >
                    <Price value={data.discount_amount} />
                  </td>
                </tr>

                <tr>
                  <th
                    colSpan={3}
                    className="border text-left py-2 px-3 font-normal"
                  >
                    {t('account.sales_contract.shipping_price')}
                  </th>
                  <td
                    className="border text-right py-2 px-3 font-light"
                    colSpan={1}
                  >
                    <Price value={data.shipping_amount} />
                  </td>
                </tr>

                <tr>
                  <th
                    colSpan={3}
                    className="border text-left py-2 px-3 font-normal"
                  >
                    {t('account.sales_contract.payment_type')}
                  </th>
                  <td
                    className="border text-right py-2 px-3 font-light"
                    colSpan={1}
                  >
                    {data.payment_option_slug}
                  </td>
                </tr>

                <tr>
                  <th
                    colSpan={3}
                    className="border text-left py-2 px-3 font-normal"
                  >
                    {t('account.sales_contract.order_total')}
                  </th>
                  <td
                    className="border text-right py-2 px-3 font-light"
                    colSpan={1}
                  >
                    <Price value={data.amount} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};
