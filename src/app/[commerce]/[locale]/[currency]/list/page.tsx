import { getListData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';
import CategoryLayout from '@theme/views/category/layout';

async function Page({ searchParams }: PageProps) {
  const data = await getListData({ searchParams });

  return (
    <>
      <CategoryLayout data={data} />
    </>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
