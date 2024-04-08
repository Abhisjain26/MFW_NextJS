export * from '@theme/types/widgets';

export type RegisterFormType = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  confirm: boolean;
  kvkk_confirm: boolean;
  email_allowed: boolean;
  sms_allowed: boolean;
  formType: string;
  locale: string;
};

export type LoginFormType = {
  email: string;
  password: string;
  formType: string;
  locale: string;
};

export type OtpLoginFormType = {
  phone: string;
  code?: string;
  locale: string;
  formType: string;
};

export enum WIDGET_TYPE {
  category = 'category',
  multiselect = 'multiselect'
}

export interface CreditCardForm {
  card_holder: string;
  card_number: string;
  card_month: string;
  card_year: string;
  card_cvv: string;
  installment: number;
  agreement: boolean;
}

export interface PriceProps {
  currencyCode?: string;
  useCurrencySymbol?: boolean;
  useCurrencyAfterPrice?: boolean;
  useCurrencySpace?: boolean;
  useNegative?: boolean;
  useNegativeSpace?: boolean;
}

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  itemPropName?: string;
  itemPropDescription?: string;
  itemPropImage?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterData1?: string;
  twitterLabel1?: string;
  ogTitle?: string;
  ogImage?: string;
  ogDescription?: string;
  ogPriceAmount?: string;
  ogPriceCurrency?: string;
}
