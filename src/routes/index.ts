enum GENERAL_ROUTES {
  HOME = '/',
  BASKET = '/baskets/basket',
  LIST = '/list',
}

enum AUTH_ROUTES {
  AUTH = '/users/auth',
  FORGOT_PASSWORD = '/users/password/reset',
  EMAIL_SET_PRIMARY = '/users/email-set-primary/.+',
  CONFIRM_EMAIL = '/users/registration/account-confirm-email/.+'
}

enum ACCOUNT_ROUTES {
  ACCOUNT = '/account',
  ACCOUNT_ADDRESS = '/account/address',
  ACCOUNT_CHANGE_EMAIL = '/account/change-email',
  ACCOUNT_CHANGE_PASSWORD = '/account/change-password',
  ACCOUNT_CONTACT = '/account/contact',
  ACCOUNT_COUPONS = '/account/coupons',
  ACCOUNT_FAQ = '/account/faq',
  ACCOUNT_ORDERS = '/users/orders',
  ACCOUNT_PROFILE = '/account/profile',
  ACCOUNT_WISHLIST = '/account/favourite-products/',
  ANONYMOUS_TRACKING = '/anonymous-tracking'
}

enum ORDER_ROUTES {
  CHECKOUT = '/orders/checkout',
  CHECKOUT_COMPLETED = '/orders/completed'
}

enum FLATPAGE_ROUTES {
  CONTACT_US = '/contact-us'
}

enum PRODUCT_ROUTES {
  FINTECH = '/fintech'
}

export const ROUTES = {
  ...GENERAL_ROUTES,
  ...AUTH_ROUTES,
  ...ACCOUNT_ROUTES,
  ...ORDER_ROUTES,
  ...FLATPAGE_ROUTES,
  ...PRODUCT_ROUTES
};
