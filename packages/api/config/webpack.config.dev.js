const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');

const envPath = path.resolve(__dirname, '../../../.env.dev');

Dotenv.config({
  path: envPath,
});

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: path.resolve(__dirname, '../src/index.ts'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, '../src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  externals: [nodeExternals(), { saslprep: "require('saslprep')" }],
  plugins: [
    new DotenvWebpack({
      path: envPath,
      allowEmptyValues: true,
    }),
  ],
  stats: {
    warningsFilter: ['Critical dependency', 'mongodb-client-encryption'],
    chunks: false,
    assets: false,
    entrypoints: false,
    modules: false,
  },
  devtool: 'inline-source-map',
};
