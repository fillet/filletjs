import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { merge } from 'webpack-merge';

import appConfig from './App';
import common from './Common';

const plugins = [
  new HtmlWebpackPlugin({
    title: appConfig.pageTitle,
    inject: 'body',
    hash: true,
    minify: false,
    scriptLoading: 'defer',
    filename: 'index.html',
    template: 'src/views/index.html',
  }),
  new HotModuleReplacementPlugin(),
];

const devConfig: Configuration = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins,
  output: {
    path: path.resolve(process.cwd(), 'src'),
  },
});

export default devConfig;
