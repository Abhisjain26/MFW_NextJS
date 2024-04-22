import { getListData } from '@akinon/next/data/server';
import { withSegmentDefaults } from '@akinon/next/hocs/server';
import { useAppSelector } from '@akinon/next/redux/hooks';
import { PageProps } from '@akinon/next/types';
import convertFacetSearchParams from '@theme/utils/convert-facet-search-params';

// import FeatureComponent from '@theme/views/widgets/feature/feature-product-content';
import HomeFeatureIntimateContent from '@theme/views/widgets/home/home-feature-intimate-content';
import { useSearchParams } from 'next/dist/client/components/navigation';

async function FeaturePage() {
  // const searchText = searchParams();
  const searchParams = useSearchParams();
  const { facets, selectedFacets } = useAppSelector((state) => state.category);
  const facetSearchParams =
  convertFacetSearchParams(selectedFacets).toString();
  const newsearchParams = new URLSearchParams(facetSearchParams);
  const searchText = searchParams.get('search_text');
  
//   searchText && searchParams.set('search_text', searchText);
  searchParams && searchText && newsearchParams.set('search_text', searchText);

  const data = await getListData({ searchParams });
  
  
  return (
    <>
      <HomeFeatureIntimateContent  />
    </>
  );
}

export default FeaturePage;



