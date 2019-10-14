
const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const titles = require('./title.js')
const htmlWebpackPlugins = []
const pages = {}

console.log('\x1b[33m%s\x1b[0m', process.env.NODE_ENV) // yellow
glob.sync('./src/**/app.js').forEach(filePath => {
    const entryPath = path.dirname(filePath)
    const filename = entryPath.substring(entryPath.lastIndexOf('\/') + 1)
    const chunk = entryPath.split('./src/')[1]
    console.log('\x1b[36m%s\x1b[0m', 'entryPath-filename-chunk->>>>', entryPath, filename, chunk)// cyan
    pages[filename] = filePath // js文件路径
    let conf = {
        filename: filename + '.html',
        template: entryPath + `/template.html`,
        title: titles[chunk],
        chunks: ['chunk-vendors', 'chunk-common', filename],
        inject: true
    }
    if (process.env.NODE_ENV === 'production') {
        const productionConfig = {
            minify: {
              removeComments: true, // 移除注释
              collapseWhitespace: false, // 删除空白符和换行符
              removeAttributeQuotes: false // 移除属性引号
            },
            chunksSortMode: 'dependency' // 对引入的chunk模块进行排序
        }
        conf = { ...conf, ...productionConfig } // 合并基础配置和生产环境专属配置
    }
    htmlWebpackPlugins.push(new HtmlWebpackPlugin(conf))
})

module.exports = {
    htmlWebpackPlugins,
    pages
}
