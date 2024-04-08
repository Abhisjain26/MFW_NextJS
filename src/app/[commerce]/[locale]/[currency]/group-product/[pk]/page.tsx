import ProductLayout from '@theme/views/product/layout';
import { ProductGroupInfo } from '@theme/views/product';
import { getProductData, getWidgetData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps, Metadata } from '@akinon/next/types';
import { generateJsonLd } from '@theme/utils/generate-jsonld';

export async function generateMetadata({
  params,
  searchParams
}: PageProps<{ pk: number }>) {
  let result: Metadata = {};

  try {
    const {
      data: { product }
    } = await getProductData({
      pk: params.pk,
      searchParams,
      groupProduct: true
    });

    result = {
      title: product.name,
      description: String(product.attributes.description),
      twitter: {
        title: product.name,
        description: String(product.attributes.description)
      },
      openGraph: {
        title: product.name,
        description: String(product.attributes.description),
        images: product.productimage_set?.map((item) => ({
          url: item.image
        }))
      }
    };
    // eslint-disable-next-line no-empty
  } catch (error) {}

  return result;
}

async function Page({ params, searchParams }: PageProps<{ pk: number }>) {
  const [{ data}, deliveryReturn] = await Promise.all([
    // const [{ data, breadcrumbData }, deliveryReturn] = await Promise.all([
    getProductData({
      pk: params.pk,
      searchParams,
      groupProduct: true
    }),
    getWidgetData({ slug: 'product-delivery-returns' })
  ]);

  const jsonLd = generateJsonLd(data.product);

  return (
    <>
      {/* <ProductLayout data={data} breadcrumbData={breadcrumbData}> */}
      <ProductLayout data={data} >
        <ProductGroupInfo
          data={data}
          deliveryReturn={deliveryReturn?.attributes}
        />
      </ProductLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
