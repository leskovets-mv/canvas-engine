const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: false,
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugins({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'image-loader',
        options: {
          name: path.resolve(__dirname, 'public', 'assets', '[name].[ext]'),
        }
      }
    ]
  }
}
