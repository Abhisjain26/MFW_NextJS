import { Product } from '@akinon/next/types/commerce/product';

export const generateJsonLd = (product: Product) => {
  const URL = process.env.NEXT_PUBLIC_URL;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.productimage_set?.map((item) => item.image),
    description: product.attributes?.description,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${URL + product.absolute_url}`,
      priceCurrency: product.currency_type,
      price: product.price,
      availability: 'https://schema.org/InStock'
    }
  };

  return productJsonLd;
};
