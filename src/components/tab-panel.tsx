import { ReactElement } from 'react';

type Props = {
  title: string;
  icon?: string;
  iconPosition?: string;
  children: ReactElement | ReactElement[];
};

export const TabPanel = ({ children }: Props) => <div>{children}</div>;
