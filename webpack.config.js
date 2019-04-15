const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

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
          sourceMap: true
        }
      }
    ]
  }
];

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
  extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  modules: ['node_modules', 'src', 'src/components']
};

module.exports = {
  devServer,
  entry,
  module: {
    rules
  },
  output,
  plugins,
  resolve
};
