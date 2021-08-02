const webpack = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');
const os = require('os');
const resolve = (dir) => path.resolve(__dirname, dir);
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const indexEntryConfig = require('./public/index.config');
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
  // 外部扩展
  // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  // 将 Vue 从 vendors.js 中移除，使用 cdn 引入 73k =>
  externals: {
    Vue: 'Vue',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=babel',
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
    ],
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('src'), // 这样配置后 @ 可以指向 src 目录
      vue: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': isDev
        ? require('./config/dev.env')
        : require('./config/prod.env'),
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: require('html-webpack-template'),
      inject: false,
      appMountId: 'app',
      // 主页 index.html 配置 【link,script, meta】
      links: indexEntryConfig.links,
      scripts: indexEntryConfig.scripts,
      meta: indexEntryConfig.meta,
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
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
          // https://webpack.docschina.org/plugins/split-chunks-plugin/
          // TODO: 更新 需要导入的 vendor.js 模块，此处选择将 vue 移除，使用 cdn 外部引入
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          // 所有 import 导入 vendor.js  test: /[\\/]node_modules[\\/]/,
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
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.com',
    //     pathRewrite: { '^/api': '' },
    //     changeOrigin: true, // target是域名的话，跨域需要这个参数，
    //   },
    // },
    port: 9002,
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
