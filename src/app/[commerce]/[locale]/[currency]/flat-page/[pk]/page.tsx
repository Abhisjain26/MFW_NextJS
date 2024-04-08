import { getFlatPageData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';

async function Page({ params }: PageProps<{ pk: number }>) {
  const data = await getFlatPageData({ pk: params.pk });

  return (
    <div className="container mx-auto py-6">
      <div
        className="mx-auto prose prose-headings:text-primary"
        dangerouslySetInnerHTML={{ __html: data.flat_page.content }}
      />
    </div>
  );
}

export default withSegmentDefaults(Page, { segmentType: 'page' });
