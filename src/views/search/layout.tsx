import clsx from 'clsx';
import { GetCategoryResponse } from '@akinon/next/types';
import Breadcrumb from '@theme/views/breadcrumb';
import { CategoryBanner } from '@theme/views/category/category-banner';
import ListPage from '@theme/views/search/category-info';
import HomeHeroSlider from '@theme/widgets/home/home-hero-slider';
import Search from '../header/search';
import Results from '../header/search/results';
import SearchModal from './search-modal';


export default async function Layout({
  data,
  children,
}: {
  data: GetCategoryResponse;
  children?: React.ReactNode;
}) {
  return (
    <>
      {/* <HomeHeroSlider /> */}
      <div
        className={clsx(
          data.category?.attributes?.category_banner
            ? 'relative w-full'
            : 'container px-4 mx-auto lg:px-0 lg:my-4'
        )}
      >
        {children}
        <div
          className={clsx(
            'my-4 lg:mt-7',
            data.category?.attributes?.category_banner &&
            'lg:absolute lg:inset-x-0 z-10 container lg:my-4 mx-auto'
          )}
        >
          <SearchModal total={data.pagination.total_count} />
          {/* <Breadcrumb /> */}
        </div>
        <CategoryBanner {...data.category?.attributes?.category_banner} />
        <ListPage data={data} />
      </div>
    </>
  );
}
