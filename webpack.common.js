const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    display: './src/modules/display.js',
    task: './src/modules/task.js',
    list: './src/modules/list.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'To-Do List',
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          'file-loader?name=[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: false,
              disable: false,
            },
          },
        ],
      },
    ],
  },
};
