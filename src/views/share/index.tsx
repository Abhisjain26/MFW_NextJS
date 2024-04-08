'use client';

import React, { useState } from 'react';
import { Button, Icon } from '@theme/components';
// eslint-disable-next-line @akinon/projectzero/link-import
import Link from 'next/link';
import { ShareProps } from '@theme/components/types';
import clsx from 'clsx';

const Share = ({
  buttonText = null,
  buttonClassName,
  buttonAppearance = 'ghost',
  className,
  buttonIconName = 'share',
  buttonIconSize = 16,
  buttonIconProps = {},
  items
}: ShareProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx('flex items-center', className)}>
      <Button
        onClick={() => setOpen(!open)}
        appearance={buttonAppearance}
        className={clsx('text-base', buttonClassName)}
        aria-label="Share"
      >
        <div className="flex items-center gap-2">
          <Icon
            name={buttonIconName}
            size={buttonIconSize}
            {...buttonIconProps}
          />
          {buttonText && <span>{buttonText}</span>}
        </div>
      </Button>

      <div
        className={clsx(
          'share-group flex transition-max-width ease-linear duration-300',
          open
            ? 'opacity-100 max-w-xs visible pointer-events-auto'
            : 'opacity-0 max-w-0 invisible pointer-events-none'
        )}
      >
        {items.map((item, index) => (
          <div key={index} className="share-item">
            <Link
              target={'_blank'}
              href={item.href}
              className={
                item.className
                  ? item.className
                  : 'px-6 py-2 h-10 flex items-center hover:bg-gray-100'
              }
            >
              <Icon
                name={item.iconName}
                size={item.iconSize ? item.iconSize : 16}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Share;
