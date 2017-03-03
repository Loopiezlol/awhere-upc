import path from 'path';

export default {
  entry: path.resolve(__dirname, 'app/app.jsx'),
  output: {
    path: path.resolve(__dirname, './www'),
    filename: 'client-bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: ['react-hot-loader', 'babel-loader'],
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.js?$/,
        loader: ['babel-loader', 'eslint-loader'],
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
        exclude: [/node_modules/, /dist/],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'scss', 'css'],
  },
};
