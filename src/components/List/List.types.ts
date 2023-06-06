import React from 'react';
import { Children, ClassName } from '../../@types/global.types';

export interface ListProps extends Children {}

export interface ListItemProps extends Children, ClassName {
  className: string;
  ripple?: boolean;
  clickHandler?: () => void;
  icon?: React.ReactNode;
}

export interface ListItemIconProps extends Children {
  clickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
}
