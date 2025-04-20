import React from 'react';

import { BasicsProps } from '@/components/type.ts';

const FutiPath: React.FC<BasicsProps<'path', 'fill'>> = (props) => (
  <path
    d="M296.629 0v3.371h-6.741v3.371h-3.372v13.484h3.372v-3.371h6.741v-3.371H300V0h-3.371zm-67.416 20.225h-6.741v3.37h-6.742v3.372h-3.371V13.484h-3.371v-3.372h-6.741v-3.37h-3.371v26.966h-3.371v3.371h-6.741v3.371h-6.741v3.372h-6.742v13.483h6.742v-3.371h6.741v-3.371h6.741v-3.371h3.371v60.675h3.371v3.371h6.741v3.371h3.371V40.45h3.371v-3.37h6.742v-3.372h6.741v-3.371h6.741V16.853h-6.741v3.372zm-175.284 0h-6.741v3.37h-6.741v3.372h-6.742v3.371h-6.74v3.371h-6.742v3.371h-6.74v3.372H6.74v3.37H0v80.901h6.741v3.371h6.741V74.161h6.741V70.79h6.742v-3.372h6.74v-3.37h6.742V53.934h-6.741v3.371h-6.742v3.371h-6.74v3.372h-6.742V50.565h6.741v-3.371h6.741v-3.371h6.742v-3.371h6.74V37.08h6.742v-3.372h6.741v-3.37h6.741V16.854H53.93v3.37zm87.642 0h-6.742v53.933h-6.74v3.37h-6.742V80.9h-6.741v3.371h-6.741v3.371h-6.741V40.451h-6.741v3.37h-6.741v53.933h6.74v3.371h6.742v3.372h6.741v-3.372h6.741v-3.37h6.741v-3.372h6.742v-3.371h6.74v-3.371h6.741V84.27h6.742V16.854h-6.742l.001 3.37zm155.058 10.112h-6.741v3.371h-3.372v74.159h3.372v-3.372h6.741v-3.371H300V26.966h-3.371v3.37z"
    {...props}
  />
);

type IFutiIconProps = BasicsProps<'svg'>;
export const FutiIcon: React.FC<IFutiIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="128.094" fill="none" viewBox="0 0 300 128.094" {...props}>
    <FutiPath fill="#fff" />
  </svg>
);

type IFutiClipPathProps = BasicsProps<'svg', 'id'>;
export const FutiClipPath: React.FC<IFutiClipPathProps> = ({ id = 'futi-icon-clip', ...props }) => (
  <svg aria-hidden {...props}>
    <clipPath id={id}>
      <FutiPath />
    </clipPath>
  </svg>
);
