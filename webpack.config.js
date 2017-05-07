let webpack = require('webpack')
let path = require('path')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: './public/dist/scripts',
        filename: '[chunkhash].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015'
                    ]
                }
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose?$!expose?jQuery'
            },
            {
                test: require.resolve('socket.io-client'),
                loader: 'expose?io'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        function () {
            this.plugin('done', function (stats) {
                require('fs').writeFileSync(
                    path.join(__dirname, 'server', 'hashBundleInfo.json'),
                    JSON.stringify(stats.toJson()))
            })
        }
    ]
}
