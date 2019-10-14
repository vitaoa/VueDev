const path = require('path')
const port = 1234 // dev port

const { pages } = require('./build/pages.js')
// console.log('pages==============', pages)

module.exports = {
    pages,
    // publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    lintOnSave: false,
    productionSourceMap: true,
    devServer: {
        port: port,
        open: false,
        overlay: {
            warnings: false,
            errors: true
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        }
    }
}

