import { CleanWebpackPlugin } from 'clean-webpack-plugin';
//PLUGINS
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import appConfig from '../src/config/App';
import common from './Common';

const plugins = [
  new HtmlWebpackPlugin({
    title: appConfig.pageTitle,
    inject: 'body',
    hash: true,
    minify: true,
    scriptLoading: 'defer',
    filename: 'index.html',
    template: 'src/views/index.html',
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'assets/main-[name]-[chunkhash].css',
  }),
  new CopyPlugin({
    patterns: [
      {
        from: '**/*',
        globOptions: {
          dot: false,
          gitignore: false,
          ignore: ['**/file.*', '**/ignored-directory/**'],
        },
        to: '[path][name].[contenthash][ext]',
        context: 'public/',
        noErrorOnMissing: true,
      },
    ],
  }),
];

const prodConfig: Configuration = merge(common, {
  mode: 'production',
  devtool: false,
  plugins,
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    filename: 'assets/bundle-[name]-[chunkhash].js',
    chunkFilename: 'assets/bundle-[name]-[chunkhash].js',
    assetModuleFilename: 'assets/[name]-[hash][ext]',
    publicPath: appConfig.baseUrl + appConfig.path,
    path: path.resolve(process.cwd(), 'build', appConfig.env),
  },
});

export default prodConfig;
