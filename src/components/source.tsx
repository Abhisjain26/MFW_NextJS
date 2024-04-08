import { ComponentPropsWithoutRef } from 'react';

export const Source = (props: ComponentPropsWithoutRef<'source'>) => {
  const { srcSet, ...rest } = props;

  return (
    <source
      srcSet={`/_next/image?url=${encodeURIComponent(srcSet)}&w=1080&q=75`}
      {...rest}
    />
  );
};
