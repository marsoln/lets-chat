let webpack = require('webpack')
let path = require('path')
const pkg = require('./package.json')
const __DEV__ = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: [
        ...__DEV__ ? [
            'webpack-hot-middleware/client'
        ] : [],
        './src/entry.js'
    ],
    output: {
        path: __DEV__ ? '/' : path.resolve(__dirname, './public/dist/scripts'),
        publicPath: __DEV__ ? '/dist/scripts/' : './public',
        filename: __DEV__ ? 'main.debug.js' : '[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: [
                    path.resolve('./src/')
                ],
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: pkg.browserList
                                },
                                modules: false,
                                useBuiltIns: false,
                                debug: false
                            }
                        ],
                        'es2015',
                    ],
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            minimize: false,
                            discardComments: { removeAll: true },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: path.resolve('./postcss.config.js')
                        },
                    }
                ]
            },
        ]
    },
    plugins: [
        ...__DEV__ ? [
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ] : [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    },
                    comments: false
                })
            ],
        function () {
            this.plugin('done', function (stats) {
                let _stats = stats.toJson()
                require('fs').writeFileSync(
                    path.join(__dirname, 'server', 'bundleInfo.json'),
                    JSON.stringify(_stats.assetsByChunkName))
            })
        }
    ]
}
