const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'graphql-client-react.js',
    library: 'graphql-client-react',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          },
          'source-map-loader'
        ],
        enforce: 'pre'
      },
      {
        test: /\.(ts|tsx)?$/,
        include: path.resolve('./src'),
        exclude: /node_modules/,
        use: [{
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      tslint: path.resolve(__dirname, './tslint.json')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 8080
  }
};
