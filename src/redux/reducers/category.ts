'use client';

import { Facet } from '@akinon/next/types';
import { createSlice } from '@reduxjs/toolkit';
import { WIDGET_TYPE } from '@theme/types';

export interface CategoryState {
  facets: Facet[];
  selectedFacets: Facet[];
}

const initialState: CategoryState = {
  facets: [],
  selectedFacets: []
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setFacets(state, action) {
      state.facets = action.payload;
    },
    setSelectedFacets(state, action) {
      state.selectedFacets = action.payload;
    },
    toggleFacet(state, action) {
      const facets = JSON.parse(JSON.stringify(state.facets));

      state.selectedFacets = facets.map((facet) => {
        if (facet.key === action.payload.facet.key) {
          facet.data.choices = facet.data.choices
            .map((choice) => {
              if (action.payload.facet.widget_type === WIDGET_TYPE.category) {
                choice.is_selected = false;
              }
              return choice;
            })
            .map((choice) => {
              if (choice.label === action.payload.choice.label) {
                choice.is_selected = !choice.is_selected;
              }

              return choice;
            });
        }

        return facet;
      });
    },
    resetSelectedFacets(state) {
      return {
        ...state,
        selectedFacets: []
      };
    }
  }
});

export const {
  setFacets,
  setSelectedFacets,
  toggleFacet,
  resetSelectedFacets
} = categorySlice.actions;

export default categorySlice.reducer;
