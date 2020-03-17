const path = require('path')
const port = 1234 // dev port

const { htmlWebpackPlugins, pages } = require('./build/pages.js')
// console.log('htmlWebpackPlugins==============', htmlWebpackPlugins)
// console.log('pages==============', pages)

module.exports = {
    pages,
    // publicPath: process.env.NODE_ENV === 'production' ? '/VueDev' : '/',//git
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/', // test
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'https://cnodejs.org',
                ws: true, //是否启用websockets
                changeOrigin: true, //开启代理
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    configureWebpack: {
        plugins: [...htmlWebpackPlugins],
        optimization: {
            splitChunks: {// 代码拆分
                minSize: 30,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 5,
                automaticNameDelimiter: '~',
                name: true,
                chunks: 'all', // initial(初始块)、async(按需加载块)、all(默认，全部块)
                cacheGroups: {
                  default: false,
                  vendor: {
                    test(module) {
                      let path = module.resource
                      if (!path) return true
                      path = path.replace(/\\/g, '/')
                      const isNeed = path &&
                          /node_modules/.test(path) &&
                          /node_modules\/(?!jquery)/.test(path)
                      if (!isNeed && path.indexOf('node_modules') > -1) {
                        console.log('vendor not need::', path, isNeed)
                      }
                      return isNeed
                    },
                    name: 'chunk-vendors',
                    priority: 10,
                    enforce: true
                  },
                  common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    minSize: 30000
                  }
                }
            }
        }
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias.set('@', path.join(__dirname, 'src'))
        // .set('vue$', 'vue/dist/vue.esm.js')
    },
    css: {
        extract: false, // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入
        loaderOptions: {
            sass: {
                prependData: `@import "~@/scss/app/setting"`
            },
            scss: {
                prependData: `@import "~@/scss/app/setting";`
            }
        }
    }
}
