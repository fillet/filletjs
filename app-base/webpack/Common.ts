import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';
import webpack, {
  Configuration as WebpackConfiguration,
  DefinePlugin,
} from 'webpack';
import {Configuration as WebpackDevServerConfiguration} from 'webpack-dev-server';
import {merge} from 'webpack-merge';

import appConfig from '../src/config/App';
import {moduleConfig, webpackConfig} from './utils/ModuleConfig';
import resolveConfig from './utils/ResolveConfig';

interface Configuration
  extends WebpackConfiguration,
    WebpackDevServerConfiguration {}

const plugins = [
  new NodePolyfillPlugin(),
  new DefinePlugin({
    'process.env': JSON.stringify(process.env),
    'process.env.APP_ENV': JSON.stringify(appConfig.env),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new ForkTsCheckerWebpackPlugin(),
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
    process: 'process/browser',
  }),
];

const baseConfig: Configuration = {
  entry: './src/index.tsx',
  module: moduleConfig,
  plugins,
  resolve: {
    ...resolveConfig,
    fallback: {
      ...resolveConfig.fallback,
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
    },
  },
  output: {
    filename: 'assets/bundle-[name]-[chunkhash].js',
    chunkFilename: 'assets/bundle-[name]-[chunkhash].js',
    assetModuleFilename: 'assets/[name]-[hash][ext]',
    publicPath: `${appConfig.baseUrl}${appConfig.path}`,
  },
  devServer: {
    static: path.join(process.cwd(), 'public'),
    compress: true,
    historyApiFallback: {
      index: appConfig.path,
    },
    hot: true,
    host: process.env.HOST,
    port: appConfig.port,
    open: true,
  },
  target: 'web',
};

const config = merge(baseConfig, webpackConfig, {plugins});

export default config;
