const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, './src/main.js')
    },
    output: {
        clean: true,
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: "asset/[hash][ext][query]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/templates/index.html'),
            filename: 'index.html',
            inject: 'body',
        }),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            //Vue files
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            //HTML files
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            //Sass/css files
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    "style-loader",
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader']
            },
            //Images files
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ]
    },
    devServer: {
        static: {
            directory: './src',
            watch: true
        },
        open: true,
    },
}
