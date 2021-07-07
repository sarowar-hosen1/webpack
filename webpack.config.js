const currentTask = process.env.npm_lifecycle_event;
//path
const path = require('path')

//plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const config = {
    mode: "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.[hash].js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 8080,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader:'file-loader',
                options:{
                    name: '[path][name].[ext]',
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })]
}


if (currentTask == "build") {
    config.mode = "production";
    config.module.rules[1].use[0] = MiniCssExtractPlugin.loader;
    config.module.rules[2].use[0] = MiniCssExtractPlugin.loader;
    config.plugins.push(
        new MiniCssExtractPlugin({ filename: 'style.[hash].css' }),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin()
    )

}

module.exports = config;

