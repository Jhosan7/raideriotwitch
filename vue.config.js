module.exports = {
  publicPath: './',
  pages: {
    viewer: {
      entry: 'src/viewer/main.js',
      template: 'public/index.html',
      filename: 'viewer.html',
      chunks: ['chunk-vendors', 'chunk-common', 'viewer'],
    },
    config: {
      entry: 'src/config/main.js',
      template: 'public/index.html',
      filename: 'config.html',
      chunks: ['chunk-vendors', 'chunk-common', 'config'],
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('named-chunks');
      config.optimization.minimize(false);
      config.plugins.delete('optimize-css');
      config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap((options) => {
          const Options = options;
          Options.compilerOptions.preserveWhitespace = true;
          return Options;
        });
      config
        .plugin('html-viewer')
        .tap((args) => {
          const Args = args;
          Args[0].minify.collapseWhitespace = false;
          return Args;
        });
      config
        .plugin('html-config')
        .tap((args) => {
          const Args = args;
          Args[0].minify.collapseWhitespace = false;
          return args;
        });
    }
  },
  configureWebpack: {
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
  },
  css: {
    extract: {
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    },
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/': '' },
      },
    },
  },
};
