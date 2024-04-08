import { Facet } from '@akinon/next/types';

const convertFacetSearchParams = (facets: Facet[]) => {
  const _facets: string[][] = facets.flatMap((facet) => {
    return [
      ...facet.data.choices.map((choice) => {
        return [facet.search_key, choice.value as string];
      })
    ];
  });

  return new URLSearchParams(_facets);
};

export default convertFacetSearchParams;
