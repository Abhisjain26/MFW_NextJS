'use client';

import { WIDGET_TYPE } from '@theme/types';
import clsx from 'clsx';

import { Accordion, Button, Checkbox, Icon, Radio } from '@theme/components';
import { SizeFilter } from './size-filter';

import { useLocalization } from '@akinon/next/hooks';
import { Facet, FacetChoice } from '@akinon/next/types';
import { useAppDispatch, useAppSelector } from '@akinon/next/redux/hooks';
import {
  resetSelectedFacets,
  toggleFacet
} from '@theme/redux/reducers/category';
import CategoryActiveFilters from '@theme/views/category/category-active-filters';
import { useMemo } from 'react';

const COMPONENT_TYPES = {
  [WIDGET_TYPE.category]: Radio,
  [WIDGET_TYPE.multiselect]: Checkbox
};

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const Filters = (props: Props) => {
  const facets = useAppSelector((state) => state.category.facets);
  const dispatch = useAppDispatch();
  const { t } = useLocalization();
  const { isMenuOpen, setIsMenuOpen } = props;

  const handleSelectFilter = ({
    facet,
    choice
  }: {
    facet: Facet;
    choice: FacetChoice;
  }) => {
    dispatch(
      toggleFacet({
        facet,
        choice
      })
    );
  };

  const haveFilter = useMemo(() => {
    return (
      facets.filter(
        (facet) =>
          facet.data.choices.filter((choice) => choice.is_selected).length > 0
      ).length > 0
    );
  }, [facets]);

  const handleResetFilter = () => {
    dispatch(resetSelectedFacets());
  };

  return (
    <div
      className={clsx(
        'w-9/10 fixed left-0 top-0 bottom-0 bg-white z-20 p-6 transition-all ease-in duration-300 lg:static lg:block lg:mr-16 lg:text-sm lg:p-0 lg:pt-4',
        isMenuOpen
          ? 'flex flex-col opacity-100 overflow-auto'
          : 'opacity-0 invisible absolute -translate-x-full lg:opacity-100 lg:visible lg:translate-x-0'
      )}
    >
      <div className="flex justify-between mb-6 lg:hidden">
        <h3 className="text-2xl">{t('category.filters.title')}</h3>
        <Icon name="close" size={22} onClick={() => setIsMenuOpen(false)} />
      </div>
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <span className="text-sm">1 {t('category.filters.results')}</span>
        <span>{t('category.filters.ready_to_wear')}</span>
      </div>
      {facets.map((facet) => {
        let Component = null;
        const choices = [...facet.data.choices];

        if (facet.key === 'integration_SizeId') {
          // If it's a size facet, use the custom size filter component
          Component = SizeFilter;

          const order = ['xs', 's', 'm', 'l', 'xl'];
          choices.sort((a, b) => {
            return (
              order.indexOf(a.label.toLowerCase()) -
              order.indexOf(b.label.toLowerCase())
            );
          });
        } else {
          Component =
            COMPONENT_TYPES[facet.widget_type] ||
            COMPONENT_TYPES[WIDGET_TYPE.category];
        }

        return (
          <Accordion
            key={facet.key}
            title={facet.name}
            isCollapse={choices.some((choice) => choice.is_selected)}
            dataTestId={`filter-${facet.name}`}
          >
            <div
              className={clsx(
                'flex gap-4',
                facet.key === 'integration_SizeId' ? 'flex-row' : 'flex-col' // TODO: This condition must be refactor to a better way
              )}
            >
              {choices.map((choice, index) => (
                <Component // TODO: This dynamic component can be a hook or higher order component so it props can be standardized
                  key={choice.label}
                  data={choice}
                  name={facet.key}
                  onChange={() => {
                    if (facet.key !== 'integration_SizeId') {
                      // TODO: This condition must be refactor to a better way
                      handleSelectFilter({ facet, choice });
                    }
                  }}
                  onClick={() => {
                    if (facet.key === 'integration_SizeId') {
                      // TODO: This condition must be refactor to a better way
                      handleSelectFilter({ facet, choice });
                    }
                  }}
                  checked={choice.is_selected}
                  data-testid={`${choice.label.trim()}`}
                >
                  {choice.label} (
                  <span
                    data-testid={`filter-count-${facet.name.toLowerCase()}-${index}`}
                  >
                    {choice.quantity}
                  </span>
                  )
                </Component>
              ))}
            </div>
          </Accordion>
        );
      })}
      <div className="lg:hidden">
        <CategoryActiveFilters />
      </div>
      {haveFilter && (
        <div className="lg:hidden">
          <Button
            onClick={handleResetFilter}
            appearance="outlined"
            className="w-full mt-4 lg:hidden"
          >
            {t('category.filters.clear_all')}
          </Button>
        </div>
      )}
    </div>
  );
};
