const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const resolve = dir => path.resolve(__dirname, dir);
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const config = {
  target: 'web',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    publicPath: isProd ? './' : '/', // Dev必须使用 `/`,线上暂设为相对路径
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'assets/img/',
            },
          },
        ],
      },
      {
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        // 预处理
        enforce: 'pre',
        loader: 'eslint-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'), // 这样配置后 @ 可以指向 src 目录
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"',
      },
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
      // 主页 index.html 配置 【link,script, meta】
      links: ['https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css'],
      // scripts: [],
      meta: [
        {
          name: 'description',
          content: 'A better default template for rainbow-vue-cli.',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : 'style.[hash:8].css',
      ignoreOrder: false, // 启用以删除有关顺序冲突的警告
    }),
    new LodashModuleReplacementPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          // eslint-disable-next-line
          test: /[\\\/]node_modules[\\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};

// development mode

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: 9000,
    overlay: {
      errors: true,
    },
    hot: true,
  };
  config.module.rules.push({
    test: /\.(scss)$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { sourceMap: true },
      },
      'sass-loader',
    ],
  });
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 作用：HMR插件将HMR Runtime代码嵌入到bundle中，能够操作APP代码，完成代码替换
    new webpack.NoEmitOnErrorsPlugin(), // 作用：跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
  );
}

// production mode

if (isProd) {
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
    test: /\.(scss)$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: './',
        },
      },
      'css-loader',
      {
        loader: 'postcss-loader',
        options: { sourceMap: true },
      },
      'sass-loader',
    ],
  });
  // 生产模式分析
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
      generateStatsFile: true, // 是否生成stats.json文件
    }),
  );
}

module.exports = config;
