const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env = {}) => {
  const production = env.production || process.env.NODE_ENV === 'production';

  return {
    mode: production ? 'production' : 'development',
    devtool: production ? false : 'eval-source-map',
    
    entry: {
      app: ['aurelia-bootstrapper']
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: production ? '[name].[chunkhash].js' : '[name].js',
      publicPath: '/'
    },

    resolve: {
      extensions: ['.js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        // Mencegah duplicate aurelia-binding/templating issues
        'aurelia-binding': path.resolve(__dirname, 'node_modules/aurelia-binding'),
        'aurelia-templating': path.resolve(__dirname, 'node_modules/aurelia-templating')
      }
    },

    devServer: {
      historyApiFallback: true,
      open: true,
      port: 8080,
      proxy: {
        // Mengalihkan request API dari Aurelia (8080) ke Node.js (5000)
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false
        }
      }
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: production
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        }
      ]
    },

    plugins: [
      new AureliaPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: production ? {
          collapseWhitespace: true,
          removeComments: true
        } : false
      }),
      new CleanWebpackPlugin()
    ]
  };
};