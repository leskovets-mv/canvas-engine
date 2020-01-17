const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'app', 'app.ts'),
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugins({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'src', 'app', 'assets'),
                to: path.resolve(__dirname, 'public', 'assets'),
            },
        ]),
        new CleanWebpackPlugin()
    ],
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
                    name: path.resolve(__dirname, 'public', 'assets', '[name].[ext]')
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
};
