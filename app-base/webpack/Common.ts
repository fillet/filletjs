import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import path from 'path';
import {
  Configuration as WebpackConfiguration,
  DefinePlugin,
} from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import appConfig from '../src/config/App';
import moduleConfig from './utils/ModuleConfig';
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
];

const config: Configuration = {
  entry: './src/index.tsx',
  module: moduleConfig,
  plugins,
  resolve: resolveConfig,
  output: {
    filename: 'assets/bundle-[name]-[chunkhash].js',
    chunkFilename: 'assets/bundle-[name]-[chunkhash].js',
    assetModuleFilename: 'assets/[name]-[hash][ext]',
    publicPath: appConfig.baseUrl + appConfig.path,
  },
  devServer: {
    static: path.join(process.cwd(), 'public'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST,
    port: appConfig.port,
    open: true,
  },
  target: 'web',
};

export default config;
