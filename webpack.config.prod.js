const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/graphqlClientReactIndex.ts'),
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'graphql-client-react.js',
    library: 'graphql-client-react',
    libraryTarget: 'commonjs2'
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  resolve: {
    // this needs to be in this order. don't ask.
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  module: {
    rules: [
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
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: path.resolve(__dirname, './src'),
      tsconfig: path.resolve(__dirname, './tsconfig.json'),
      tslint: path.resolve(__dirname, './tslint.json')
    })
  ]
};
