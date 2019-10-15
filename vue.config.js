const path = require('path')
const port = 1234 // dev port

const { htmlWebpackPlugins, pages } = require('./build/pages.js')
// console.log('htmlWebpackPlugins==============', htmlWebpackPlugins)
// console.log('pages==============', pages)

module.exports = {
    pages,
    publicPath: process.env.NODE_ENV === 'production' ? '/VueDev' : '/',
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
        }
    },
    configureWebpack: {
        plugins: [...htmlWebpackPlugins]
    },
    chainWebpack: config => {
        // 添加别名
        config.resolve.alias
          .set('@', path.join(__dirname, 'src'))
    }
}
