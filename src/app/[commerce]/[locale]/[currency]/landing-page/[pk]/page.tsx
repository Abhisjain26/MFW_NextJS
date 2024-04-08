import { getLandingPageData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { PageProps } from '@akinon/next/types';
import logger from '@akinon/next/utils/log';
import * as console from 'console';

async function Page({ params }: PageProps<{ pk: number }>) {
  const data = await getLandingPageData({ pk: params.pk });

  const content = data.landing_page;

  return (
    <div className="container mx-auto py-6">
      <div className="mx-auto prose prose-headings:text-primary">
        Landing page {JSON.stringify(content)}
      </div>
    </div>
  );
}

export default withSegmentDefaults(Page, {
  segmentType: 'page'
});
