/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions(opts) {
        opts.plugins?.unshift('babel-plugin-react-compiler');
      },
    }),
  ],
  html: {
    title: 'LF112「@futiwolf」- 伏科一',
    meta: {
      description: "futiowlf's personal website, A NodeJS Fullstack Developer. | 一位正在努力钻研前端开发的开发者，趁年轻，做爱做的事。",
    },
  },
});
