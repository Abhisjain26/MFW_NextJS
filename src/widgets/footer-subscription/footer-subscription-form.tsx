'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FooterSubscriptionFormType } from '@theme/types';
import { useEmailSubscriptionMutation } from '@akinon/next/data/client/misc';
import { useGetWidgetQuery } from '@akinon/next/data/client/misc';
import { Input, Button, Checkbox, Modal } from '@theme/components';
import { useLocalization } from '@akinon/next/hooks';

const subscriptionFormSchema = (t: any) =>
  yup.object().shape({
    email: yup
      .string()
      .email(t('common.newsletter_signup.required_email'))
      .required(t('common.newsletter_signup.required')),
    subscribe_contract: yup
      .boolean()
      .oneOf([true], t('common.newsletter_signup.required'))
  });

export default function FooterSubscriptionForm() {
  const { t } = useLocalization();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailSubscription] = useEmailSubscriptionMutation();
  const { data: privacyPolicy } = useGetWidgetQuery('privacy-policy');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FooterSubscriptionFormType>({
    resolver: yupResolver(subscriptionFormSchema(t))
  });

  const onSubmit: SubmitHandler<FooterSubscriptionFormType> = (data) => {
    emailSubscription(data)
      .unwrap()
      .then(() => setIsModalOpen(true));
  };

  return (
    <div>
      <div className="flex mb-5 relative z-10">
        <Input
          id="footer-subscription-email"
          type="email"
          placeholder={t('common.newsletter_signup.email_address')}
          className="text-sm h-7 w-50 email_subscribe_input"
          {...register('email')}
          error={errors.email}
          data-testid="newsletter-input"
        />

        <Button
          type="submit"
          appearance="outlined"
          className="text-xs font-semibold h-7 email_subscribe_button"
          data-testid="newsletter-submit"
          onClick={handleSubmit(onSubmit)}
        >
          Subscribe
          {/* {t('common.newsletter_signup.submit')} */}
        </Button>
      </div>

      {/* <Checkbox
        {...register('subscribe_contract')}
        error={errors.subscribe_contract}
        data-testid="newsletter-agreement-checkbox"
      >
        {t('common.newsletter_signup.accept')}{' '}
        <button
          type="button"
          className="underline"
          onClick={() => {
            setIsModalOpen(true);
          }}
          data-testid="newsletter-agreement"
        >
          {t('common.newsletter_signup.privacy_policy')}
        </button>
        <Modal
          className="h-4/5 w-4/5 p-4 flex flex-col justify-between items-center md:p-12 lg:h-1/2 lg:w-1/2"
          portalId="footer-subscription-privacy-policy-modal"
          open={isModalOpen}
          setOpen={setIsModalOpen}
          showCloseButton={false}
        >
          <div
            className="mb-3 overflow-hidden overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: privacyPolicy?.attributes?.privacy_policy?.value
            }}
          />

          <Button
            onClick={() => setIsModalOpen(false)}
            appearance="outlined"
            className="font-medium px-10 py-2"
            data-testid="newsletter-modal-close-button"
          >
            {t('common.newsletter_signup.close')}
          </Button>
        </Modal>
      </Checkbox> */}
    </div>
  );
}
