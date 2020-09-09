const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.ts'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
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
  stats: {
    warningsFilter: ['Critical dependency', 'mongodb-client-encryption'],
  },
  optimization: {
    usedExports: true,
  },
};
