import PluginModule, { Component } from '@akinon/next/components/plugin-module';
import CheckoutAgreements from '../agreements';

export default function CreditPayment() {

  return <PluginModule
    component={Component.CreditPayment}
    props={{
      agreementCheckbox: (
        <CheckoutAgreements control={null} error={null} fieldId="agreement" />
      )
  }}
/>
}
