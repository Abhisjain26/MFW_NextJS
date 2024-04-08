import { ReactNode } from 'react';
import { Control, FieldError } from 'react-hook-form';
import { UsePaginationType } from '@akinon/next/hooks/use-pagination';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: 'filled' | 'outlined' | 'ghost';
}

export interface PaginationProps {
  total: number | undefined;
  limit?: number | undefined;
  currentPage: number | undefined;
  numberOfPages?: number | undefined;
  containerClassName?: string;
  moreButtonClassName?: string;
  prevClassName?: string;
  nextClassName?: string;
  pageClassName?: string;
  threshold?: number | undefined;
  delta?: number | undefined;
  render?: (pagination: UsePaginationType) => ReactNode;
  type?: 'infinite' | 'list' | 'more';
  onPageChange?: (page: number) => void;
  direction?: 'next' | 'prev';
}

export type FileInputProps = React.HTMLProps<HTMLInputElement>;

export type RadioProps = React.HTMLProps<HTMLInputElement>;

export interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  labelStyle?: 'default' | 'floating';
  error?: FieldError | undefined;
  control?: Control<any, any>;
  required?: boolean;
}

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  error?: FieldError | undefined;
}

export type SelectItem = {
  label: string | number;
  value: string | number;
  class?: string;
  is_selected?: boolean;
};
export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  options: SelectItem[];
  borderless?: boolean;
  icon?: string;
  iconSize?: number;
  error?: FieldError | undefined;
  required?: boolean;
}
export interface IconProps extends React.ComponentPropsWithRef<'i'> {
  name: string;
  size?: number;
  className?: string;
}

export interface PriceProps extends React.HTMLProps<HTMLSpanElement> {
  children: ReactNode;
}

export interface ShareProps extends React.HTMLProps<HTMLElement> {
  buttonText?: string;
  buttonIconName?: string;
  buttonIconSize?: number;
  buttonClassName?: string;
  buttonAppearance?: 'filled' | 'outlined' | 'ghost';
  buttonIconProps?: React.ComponentPropsWithoutRef<'i'>;
  className?: string;
  items: ShareItem[];
}

export type ShareItem = {
  iconName: string;
  iconSize?: number;
  href: string;
  className?: string;
};

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}
