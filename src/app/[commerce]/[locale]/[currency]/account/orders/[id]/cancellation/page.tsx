'use client';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useCancelOrderMutation,
  useGetOrderQuery,
  useGetCancellationReasonsQuery
} from '@akinon/next/data/client/account';
import { AccountOrderCancellation } from '@akinon/next/types';
import {
  Button,
  Checkbox,
  Select,
  Modal,
  LoaderSpinner,
  Link
} from '@theme/components';
import { useState } from 'react';
import { OrderDetailHeader } from '@theme/views/account/orders/order-detail-header';
import { OrderCancellationItem } from '@theme/views/account/orders/order-cancellation-item';
import { useLocalization } from '@akinon/next/hooks';

const accountOrderCancellationSchema = yup.object().shape({
  return_policy: yup.boolean().oneOf([true], 'This field is required.')
});

const AccountOrderCancellation = ({ params }) => {
  const { t } = useLocalization();
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<AccountOrderCancellation>({
    resolver: yupResolver(accountOrderCancellationSchema)
  });
  const { data: cancellationReasons, isSuccess: cancellationReasonsSuccess } =
    useGetCancellationReasonsQuery();

  const {
    data: order,
    isLoading,
    isSuccess: orderSuccess
  } = useGetOrderQuery(params.id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    title: '',
    content: ''
  });
  const watchAllFields = watch();
  const cancelItemsLength = watchAllFields?.cancel_order_items?.length;
  const [cancelOrder] = useCancelOrderMutation();

  const modalHandleClick = () => {
    setIsModalOpen(false);
    location.reload();
  };

  const selectCondition = (item, isActive, cancellationType) => {
    const cancelReasons = cancellationReasons.results
      .filter((item) => item.cancellation_type === cancellationType)
      .map((item) => {
        return { label: item.subject, value: String(item.id) };
      });

    if (item.active_cancellation_request?.easy_return?.code) {
      return (
        <div className="flex items-center">
          <div>
            <span>{t('account.my_orders.return.return_code')}</span>:
          </div>
          <div>{item.active_cancellation_request.easy_return.code}</div>
        </div>
      );
    } else if (item.is_cancelled) {
      return <div>{t('account.my_orders.return.cancelled')}</div>;
    } else if (
      !item.is_cancelled &&
      item.active_cancellation_request?.cancellation_type?.value == 'cancel'
    ) {
      return (
        <div>{t('account.my_orders.return.cancellation_request_recieved')}</div>
      );
    } else if (item.is_cancellable || item.is_refundable) {
      return (
        <Select
          className="w-full md:w-64"
          options={cancelReasons}
          disabled={isActive}
          data-testid="account-orders-return-select"
          onChange={(e) => handleChange(e, item)}
        ></Select>
      );
    }
  };

  const handleChange = (e, item) => {
    setValue('cancel_order_items', [
      ...getValues('cancel_order_items').map((val) => {
        if (val.order_item === item.id) {
          val.reason = e.target.value;
        }

        return val;
      })
    ]);
  };

  const onSubmit: SubmitHandler<AccountOrderCancellation> = (orderItems) => {
    cancelOrder({ id: order.number, ...orderItems })
      .unwrap()
      .then(() => {
        setResponseMessage({
          title: t('account.my_orders.return.success.title').toString(),
          content: t('account.my_orders.return.success.description').toString()
        });
        setIsModalOpen(true);
      })
      .catch(() => {
        setResponseMessage({
          title: t('account.my_orders.return.error.title').toString(),
          content: t('account.my_orders.return.error.description').toString()
        });
        setIsModalOpen(true);
      });
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (orderSuccess && cancellationReasonsSuccess) {
    return (
      <>
        <div className="flex-1">
          <OrderDetailHeader
            title={t('account.my_orders.return.title')}
            order={order}
          />

          <div>
            <div className="pb-2 mb-3 text-lg border-gray border-b">
              <span data-testid="account-orders-return-order-count">
                {order.orderitem_set.length}
              </span>{' '}
              <span>{t('account.my_orders.detail.products')}</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {order.orderitem_set.map((item, index: number) => (
                <Controller
                  defaultValue={[]}
                  control={control}
                  name="cancel_order_items"
                  key={index}
                  render={({ field: { onChange, value } }) => {
                    const isActive = value.some((cancelItem) => {
                      return cancelItem.order_item === item.id;
                    });

                    const cancellationType = item.is_refundable
                      ? 'refund'
                      : 'cancel';

                    const selectOption = selectCondition(
                      item,
                      !isActive,
                      cancellationType
                    );

                    return (
                      <OrderCancellationItem
                        item={item}
                        onChange={onChange}
                        value={value}
                        selectOption={selectOption}
                      />
                    );
                  }}
                />
              ))}
              <div className="flex flex-wrap items-center justify-center mt-6 md:flex-nowrap md:justify-start">
                <Link
                  href={`/users/orders/${order.id}`}
                  className="text-sm text-black-700 underline mt-5 order-2 md:order-none md:mt-0"
                >
                  {t('account.my_orders.return.contract_process_cancel')}
                </Link>

                <div className="flex flex-wrap items-center ml-auto md:flex-nowrap">
                  <div>
                    <label className="flex text-xs mb-3 md:mr-6 md:mb-0">
                      <Checkbox
                        {...register('return_policy')}
                        data-testid="account-orders-return-agreement"
                      />{' '}
                      <span className="ml-2">
                        {t('account.my_orders.return.agreement_label')}
                      </span>
                    </label>
                    {errors.return_policy && (
                      <div className="text-sm text-error">
                        {errors.return_policy.message}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-48 font-medium"
                    data-testid="account-orders-return-submit"
                    disabled={cancelItemsLength > 0 ? false : true}
                  >
                    {t('account.my_orders.return.return_selected_items')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Modal
          portalId="cancellation-order-modal"
          open={isModalOpen}
          setOpen={setIsModalOpen}
        >
          <div className="flex flex-col items-center justify-center gap-12 p-6">
            <h3
              className="text-2xl font-bold"
              data-testid="account-orders-return-response"
            >
              {responseMessage.title}
            </h3>
            <p className="text-center">{responseMessage.content}</p>
            <Button
              onClick={modalHandleClick}
              appearance="outlined"
              className="font-medium px-10 py-2"
              data-testid="account-orders-return-response-button"
            >
              {t('account.my_orders.return.close_button')}
            </Button>
          </div>
        </Modal>
      </>
    );
  }
};

export default AccountOrderCancellation;
