'use client';

import { Category } from '@akinon/next/types';
import { Image } from '@akinon/next/components/image';

export const CategoryBanner = (
  props: Category['attributes']['category_banner']
) => {
  if (Object.keys(props).length === 0) {
    return null;
  }

  return (
    <>
      <Image
        src={props.kwargs.value.image_mobile.url}
        alt="Category Banner"
        aspectRatio={768 / 375}
        sizes="768px"
        fill
        className="block md:hidden"
      />

      <Image
        src={props.kwargs.value.image_desktop.url}
        alt="Category Banner"
        aspectRatio={1370 / 400}
        sizes="1370px"
        fill
        className="hidden md:block"
      />
    </>
  );
};
