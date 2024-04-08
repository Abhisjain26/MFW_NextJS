'use client';

import { Link } from '@theme/components';
import { SpecialPageType } from '@akinon/next/types';
import { Image } from '@akinon/next/components/image';
export interface Props {
  data: SpecialPageType;
}

const SpecialPageBanner = (props: Props) => {
  if (!props.data?.banner) {
    return null;
  }

  return (
    <>
      <Link href={props.data?.banner_url || '#'}>
        <Image
          src={props.data?.banner_mobile}
          alt={props.data?.name}
          aspectRatio={768 / 375}
          sizes="768px"
          fill
          className="block md:hidden"
        />

        <Image
          src={props.data?.banner}
          alt={props.data?.name}
          aspectRatio={1370 / 400}
          sizes="1370px"
          fill
          className="hidden md:block"
        />
      </Link>

      {props.data?.banner_description && (
        <div
          className="my-9"
          dangerouslySetInnerHTML={{
            __html: props.data?.banner_description
          }}
        ></div>
      )}
    </>
  );
};

export default SpecialPageBanner;
