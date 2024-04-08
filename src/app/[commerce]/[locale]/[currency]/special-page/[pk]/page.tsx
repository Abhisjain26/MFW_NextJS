import { getSpecialPageData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';
import CategoryLayout from '@theme/views/category/layout';
import SpecialPageBanner from '@theme/widgets/special-page-banner';
import SpecialPageCarousel from '@theme/widgets/special-page-carousel';

async function Page({ params, searchParams }: PageProps<{ pk: number }>) {
  const data = await getSpecialPageData({ pk: params.pk, searchParams });

  return (
    <>
      <CategoryLayout data={data}>
        {data.special_page && (
          <>
            <SpecialPageBanner data={data.special_page} />
            <SpecialPageCarousel slug={data.special_page.video_embedded_code} />
          </>
        )}
      </CategoryLayout>
    </>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
