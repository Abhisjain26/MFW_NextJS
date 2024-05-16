'use client';

import { ReactNode, useState } from 'react';
import { Icon } from './icon';
import { twMerge } from 'tailwind-merge';

type AccordionProps = {
  isCollapse?: boolean;
  title?: string;
  subTitle?: string;
  icons?: string[];
  iconSize?: number;
  iconColor?: string;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  dataTestId?: string;
};

export const AccordionFooter = ({
  isCollapse = false,
  title,
  subTitle,
  icons = ['minus', 'plus'],
  iconSize = 16,
  iconColor = 'fill-[#000000]',
  children,
  className,
  titleClassName,
  dataTestId
}: AccordionProps) => {
//   const [collapse, setCollapse] = useState(isCollapse);

  return (
    <div
      className={twMerge(
        'flex flex-col justify-center border-b border_list_bottom pb-4 mb-4 last:border-none',
        className
      )}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        // onClick={() => setCollapse(!collapse)}
        data-testid={dataTestId}
      >
        <div className="flex flex-col">
          {title && (
            <h3 className={twMerge('text-sm', titleClassName)}>{title}</h3>
          )}
          {subTitle && <h4 className="text-xs text-gray-700">{subTitle}</h4>}
        </div>

        {/* {icons && (
          <Icon
            name={icons[0]}
            size={iconSize}
            className={`fill-[${iconColor}]}`}
          />
        )} */}
      </div>
      <div className="mt-3 text-sm" dangerouslySetInnerHTML={{ __html: String(children) }} />
      
    </div>
  );
};
