import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import CheckoutAgreements from '../agreements';

export default function PayOnDelivery() {
  return (
    <PluginModule
      component={Component.PayOnDelivery}
      props={{
        agreementCheckbox: (
          <CheckoutAgreements control={null} error={null} fieldId="agreement" />
        )
      }}
    />
  );
}
