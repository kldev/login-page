const path = require('path');
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
   main: './src/index.ts',   
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, 'src')],
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(scss)$/,
        use: [ExtractCssChunks.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
    filename: '[name].js',    
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    port: 4200,
    contentBase: path.join(__dirname, './public'),
    watchContentBase: true,        
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      title: 'LOGO'

    }),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ]
};