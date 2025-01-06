import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import webpack, {ModuleOptions} from 'webpack';

const isDevelopment = process.env.NODE_ENV !== 'production';

const moduleConfig: ModuleOptions = {
  rules: [
    //ts; js; tsx; jsx;
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
    //mjs
    {
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    },
    //css; scss;
    {
      test: /\.s?css$/i,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: isDevelopment,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [postcssPresetEnv()],
            },
          },
        },
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: ['./src/stylesheets/includes/**/*.scss'],
          },
        },
      ],
    },
    //images
    {
      test: /\.(jpe?g|png|gif|svg|webp)/i,
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name]-[hash][ext]',
      },
    },
    //videos
    {
      test: /\.(mp4|webm)(\?v=\d+\.\d+\.\d+)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/video/[name]-[hash][ext]',
      },
    },
    //fonts
    {
      test: /(\.woff|\.woff2|\.svg|.eot|\.ttf)(\?v=\d+\.\d+\.\d+)?$/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name]-[hash][ext]',
      },
    },
  ],
};

const webpackConfig = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      process: require.resolve('process/browser'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
};

export {moduleConfig, webpackConfig};
