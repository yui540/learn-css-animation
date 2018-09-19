const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config.json')
const mode = process.env.MODE

module.exports = {
  mode,
  entry: {
    app: './src/scripts/app.js',
  },
  output: {
    path: `${__dirname}/public/`,
    filename: './scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: (mode === 'development')
              }
            },
            'sass-loader',
            'import-glob-loader'
          ]
        })
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              name: '../images/other/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      `./stylesheets/style.css`
    ),
    new HtmlWebpackPlugin({
      ...config,
      title: '夜空ノ贈リ物',
      template: './src/pug/index.pug',
      inject: false
    })
  ],
  devServer: {
    contentBase: `${__dirname}/public`,
    port: 3000,
    open: true
  }
}
