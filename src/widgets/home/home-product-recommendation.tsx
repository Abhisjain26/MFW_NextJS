import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';
import RecommendationContent from '@theme/views/widgets/home/recommendation-content';

type HomeProductRecommendationType = {
  title: {
    value: string;
  };
};

export default async function HomeProductRecommendation() {
  const data = await getWidgetData<HomeProductRecommendationType>({
    slug: 'home-product-recommendation'
  });

  return <RecommendationContent data={data} />;
}
