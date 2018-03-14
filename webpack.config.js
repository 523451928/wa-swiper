const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname+'/app/main.js',
  output: {
    path: __dirname+'/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase:"./public",
    historyApiFallback:true,
    inline:true,
    port:8808
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      },
      {
        test:/\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader?limit=8192"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-withimg-loader'
          },
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: __dirname+"/app/index.html"
    })
  ]
}