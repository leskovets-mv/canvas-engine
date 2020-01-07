const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugins({
            template: './src/index.html',
            title: 'Game'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" }
        ]
      }
}