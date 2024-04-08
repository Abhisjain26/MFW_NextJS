import clsx from 'clsx';
import { ReactElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Props as TabProps } from './tab';
import { Tab } from './tab';

type Props = {
  children: ReactElement<TabProps>[];
  preSelectedTabIndex?: number;
  tabBarPosition?: string;
  className?: string;
};

export const Tabs = (props: Props) => {
  const { children, preSelectedTabIndex, tabBarPosition, className, ...rest } =
    props;

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
    preSelectedTabIndex || 0
  );

  return (
    <div
      className={twMerge(
        clsx({
          'flex flex-col-reverse': tabBarPosition === 'bottom',
          'flex flex-row gap-4':
            tabBarPosition === 'left' || tabBarPosition === 'right',
          'flex-row-reverse': tabBarPosition === 'right'
        }),
        className
      )}
      {...rest}
    >
      <ul
        className={clsx('flex flex-wrap gap-4 mb-4', {
          'flex-col max-w-[10rem]':
            tabBarPosition === 'left' || tabBarPosition === 'right'
        })}
      >
        {children.map((item, index) => (
          <Tab
            key={item.props.title}
            title={item.props.title}
            index={index}
            icon={item.props.icon}
            iconPosition={item.props.iconPosition}
            isActive={index === selectedTabIndex}
            setSelectedTab={setSelectedTabIndex}
          />
        ))}
      </ul>

      <div className="w-full">{children[selectedTabIndex]}</div>
    </div>
  );
};
