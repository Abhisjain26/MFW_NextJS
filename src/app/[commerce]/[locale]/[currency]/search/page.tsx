import { getListData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';
import SearchLayout from '@theme/views/search/layout';

async function Page({ searchParams }: PageProps) {
  const data = await getListData({ searchParams });
  return (
    <>
      <SearchLayout data={data} />
    </>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
