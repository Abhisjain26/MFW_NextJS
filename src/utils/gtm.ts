'use client';

import {
  GTMEvent,
  Product,
  GTMUserType,
  GA4EventParams
} from '@akinon/next/types';
import dayjs from 'dayjs';

//In GA4 this is automatically collected. No need to push it manually for GA4.
export const pushPageView = (url: string) => {
  pushEventGA4('page_view', {
    page_location: url
  });
};

export const pushAddToCart = (product) => {
  pushEventGA4('add_to_cart', {
    currency: product?.currency_type, 
    items: [
      {
        item_id: product?.base_code?.toString(),
        item_name: product?.name,
        price: product?.price,
        quantity: 1,
        item_brand: product?.attributes_kwargs?.gender?.value,
        item_category: product?.attributes?.color,
        item_variant: product?.sku
      }
    ]
  });
};

export const pushRemoveFromCart = (product) => {
  pushEventGA4('remove_from_cart', {
    currency: product?.currency_type,
    items: [
      {
        item_id: product?.base_code?.toString(),
        item_name: product?.name,
        price: product?.price,
        quantity: 1,
        item_brand: product?.attributes_kwargs?.gender?.value,
        item_category: product?.attributes?.color,
        item_variant: product?.sku
      }
    ]
  });
};

export const pushCartView = (
  products: Pick<Product, 'name' | 'pk' | 'price' | 'currency_type'>[]
) => {
  const productCurrency = products[0]?.currency_type;
  pushEventGA4('view_cart', {
    currency: productCurrency,
    items: products?.map((product) => ({
      item_id: product?.pk?.toString(),
      item_name: product?.name,
      price: product?.price
    }))
  });
};

export const pushBeginCheckout = (
  products: Pick<Product, 'name' | 'pk' | 'price' | 'currency_type'>[]
) => {
  const productCurrency = products[0]?.currency_type;
  pushEventGA4('begin_checkout', {
    currency: productCurrency,
    items: products.map((product) => ({
      item_id: product?.pk?.toString(),
      item_name: product?.name,
      price: product?.price
    }))
  });
};

export const pushAddShippingInfo = (
  products: Pick<Product, 'name' | 'pk' | 'price' | 'currency_type'>[]
) => {
  const productCurrency = products[0]?.currency_type;
  pushEventGA4('add_shipping_info', {
    currency: productCurrency,
    items: products.map((product) => ({
      item_id: product?.pk?.toString(),
      item_name: product?.name,
      price: product?.price
    }))
  });
};

export const pushAddPaymentInfo = (
  products: Pick<Product, 'name' | 'pk' | 'price' | 'currency_type'>[],
  payment_type: string
) => {
  const productCurrency = products[0]?.currency_type;
  pushEventGA4('add_payment_info', {
    currency: productCurrency,
    payment_type,
    items: products.map((product) => ({
      item_id: product?.pk?.toString(),
      item_name: product?.name,
      price: product?.price
    }))
  });
};

export const pushProductListProductViewed = (
  product: Pick<Product, 'name' | 'pk' | 'price'>
) => {
  pushEventGA4('view_item_list', {
    items: [
      {
        item_id: product?.pk?.toString(),
        item_name: product?.name,
        price: product?.price
      }
    ]
  });
};

export const pushProductClicked = (
  product: Pick<Product, 'name' | 'pk' | 'price'>
) => {
  pushEventGA4('select_item', {
    items: [
      {
        item_id: product?.pk?.toString(),
        item_name: product?.name,
        price: product?.price
      }
    ]
  });
};

export const pushProductViewed = (
  product: Pick<
    Product,
    'base_code' | 'sku' | 'name' | 'price' | 'currency_type'
  >
) => {
  pushEventGA4('view_item', {
    currency: product.currency_type,
    items: [
      {
        item_id: product?.base_code?.toString(),
        item_name: product?.name,
        price: product?.price
      }
    ]
  });
};

export const pushAddToWishlist = (
  product: Pick<Product, 'base_code' | 'name' | 'price' | 'currency_type'>
) => {
  pushEventGA4('add_to_wishlist', {
    currency: product?.currency_type,
    items: [
      {
        item_id: product?.base_code?.toString(),
        item_name: product?.name,
        price: product?.price,
        quantity: 1
      }
    ]
  });
};

const generatePromotionPayload = (promotion) => ({
  creative_name: promotion?.creative_name,
  promotion_id: promotion?.promotion_id,
  promotion_name: promotion?.promotion_name,
  items: promotion?.items?.map((item) => ({
    item_id: item?.item_id.toString(),
    item_name: item?.item_name,
    price: item?.price,
    quantity: item?.quantity
  }))
});

export const pushSelectPromotion = (promotion) => {
  const payload = generatePromotionPayload(promotion);
  pushEventGA4('select_promotion', payload);
};

export const pushViewPromotion = (promotion) => {
  const payload = generatePromotionPayload(promotion);
  pushEventGA4('view_promotion', payload);
};

export const pushUserData = (
  value: Pick<
    GTMUserType,
    'pk' | 'hashedEmail' | 'dateJoined' | 'gender' | 'emailAllowed'
  >
) => {
  pushEventGA4('user_data_updated', {
    user_id: value?.pk.toString(),
    email_hashed: value?.hashedEmail || '',
    signup_date: dayjs(value?.dateJoined).format('YYYY-MM-DD'),
    gender: value?.gender || '',
    email_permission: value.emailAllowed ? 'yes' : 'no'
  });
};

export const pushPurchaseEvent = (order) => {
  const transactionId = order?.id?.toString();
  const currency = order?.currency?.value?.toUpperCase();
  const totalAmount = Number(order?.amount);

  const products = order.orderitem_set.map((item) => ({
    base_code: item?.product.base_code,
    name: item?.product?.name,
    price: item?.price,
    currency_type: item?.price_currency?.value
  }));

  pushEventGA4('purchase', {
    transaction_id: transactionId,
    currency,
    value: totalAmount,
    items: products.map((product) => ({
      item_id: product?.base_code?.toString(),
      item_name: product?.name,
      price: product?.price
    }))
  });
};

export const pushEvent = (event: GTMEvent) => {
  const { Category = 'Enhanced Ecommerce', Value = 0, ...rest } = event;

  window.dataLayer.push({ Category, Value, ...rest });
};

export const pushEventGA4 = (
  eventAction: string,
  eventParams: GA4EventParams
) => {
  window.dataLayer.push({
    event: eventAction,
    ...eventParams
  });
};
