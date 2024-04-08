import { Facet } from '@akinon/next/types';
import { Middleware } from '@reduxjs/toolkit';
import { setSelectedFacets } from '@theme/redux/reducers/category';

const getSelectedFacets = (facets: Array<Facet>) => {
  return facets
    .map((facet) => {
      return {
        ...facet,
        data: {
          ...facet.data,
          choices: facet.data.choices.filter((choice) => choice.is_selected)
        }
      };
    })
    .filter((facet) => {
      return facet.data.choices.filter((choice) => choice.is_selected).length;
    });
};

const categoryMiddleware: Middleware = ({ dispatch, getState }) => {
  return (next) => (action) => {
    const result = next(action);

    if (action.type === 'category/setFacets') {
      const facets: Array<Facet> = result.payload;
      const selectedFacets = getSelectedFacets(facets);

      dispatch(setSelectedFacets(selectedFacets));
    } else if (action.type === 'category/toggleFacet') {
      const selectedFacets = getSelectedFacets(
        getState().category.selectedFacets
      );

      dispatch(setSelectedFacets(selectedFacets));
    }

    return result;
  };
};

export default categoryMiddleware;
