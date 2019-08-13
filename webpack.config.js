const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const paths = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

const devMode = process.env.NODE_ENV !== 'production';
const styleLoader = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

const devServer = {
  contentBase: paths.dist,
  compress: true,
  hot: true,
  port: 9000
};

const devtool = devMode ? 'inline-source-map' : '';

const entry = path.join(paths.source, 'index.tsx');

const rules = [
  {
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'tslint-loader'
  },
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/
  },
  {
    test: /\.scss$/,
    use: [
      styleLoader,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: '@import "src/styles/globals";',
          minimize: !devMode,
          sourceMap: !devMode
        }
      }
    ]
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: ['file-loader']
  }
];

const optimization = {
  minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserPlugin()],
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
};

const output = {
  filename: 'app.js',
  path: paths.dist
};

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({ template: './src/index.html' })
];

if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  );
}

const resolve = {
  extensions: ['.tsx', '.ts', '.js', '.jsx'],
  modules: ['node_modules', 'src', 'src/components']
};

module.exports = {
  devServer,
  devtool,
  entry,
  module: {
    rules
  },
  output,
  optimization,
  plugins,
  resolve
};
