import { getCategoryData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';
import CategoryLayout from '@theme/views/category/layout';

async function Page({ params, searchParams }: PageProps<{ pk: number }>) {
  const { data } = await getCategoryData({ pk: params.pk, searchParams });

  return (
    <>
      <CategoryLayout data={data} />
    </>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
