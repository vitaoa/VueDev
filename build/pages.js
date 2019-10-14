
const glob = require('glob')
const titles = require('./title.js')
const pages = {}

glob.sync('./src/**/app.js').forEach(path => {
    const pageArr = path.split('./src/')
    const pagePath = pageArr[1].split('/app.js')
    const chunk = pagePath[0]
    // console.log('\033[42;30m pages->chunk: \033[42;30m', chunk)
    console.log('\x1b[36m%s\x1b[0m', 'pages->chunk->>>>') // cyan
    console.log('\x1b[36m%s\x1b[0m', chunk) // cyan
// console.log('\x1b[33m%s\x1b[0m', chunk) // yellow
    if (chunk.split('/').length > 0) {
        const chunkArr = chunk.split('/')
        const chunkPage = chunkArr.pop()
        pages[chunkPage] = {
            entry: path,
            template: `./src/${chunk}/template.html`, // 模板名
            title: titles[chunk],
            chunks: [chunkPage]
        }
    } else {
        pages[chunk] = {
            entry: path,
            //   template: 'public/index.html',
            template: `./${chunk}/template.html`, // 模板名
            title: titles[chunk],
            chunks: [chunk]
        }
    }
})
module.exports = {
    pages,
    titles
}
