const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
  entry: path.join(__dirname, 'src/index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};

const devConfig = () => ({
  ...common,
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
});

const prodConfig = () => ({
  ...common,
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ]
});

module.exports = (env, args) => {
  const mode = (env && env.mode) || (args && args.mode) || 'development';
  switch (mode) {
    case 'production':
      return prodConfig();
    case 'development':
      return devConfig();
    default:
      return new Error('Invalid mode');
  }
};
