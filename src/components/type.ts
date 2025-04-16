import React, { CSSProperties, ReactNode } from 'react';

import { JSX } from 'react/jsx-runtime';

type DefaultProps = 'className' | 'style' | 'ref';

export type BasicsProps<T extends keyof JSX.IntrinsicElements = 'div', K extends Exclude<keyof React.ComponentPropsWithRef<T>, DefaultProps> = never> = Pick<
  React.ComponentPropsWithRef<T>,
  DefaultProps | K
>;

export type AsComp =
  | keyof JSX.IntrinsicElements
  | React.ForwardRefExoticComponent<
      React.PropsWithoutRef<{
        style: CSSProperties;
        children: ReactNode;
      }> &
        React.RefAttributes<any>
    >;
