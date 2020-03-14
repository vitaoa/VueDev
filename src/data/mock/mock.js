const Mock = require('mockjs')
// 使用mockjs模拟数据
let dataList = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'lists|1-10': [
        {
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1,
            name: '@FIRST',
            creatTime: new Date().getTime()
        }
    ]
})
//根据数据模板生成模拟数据
Mock.mock('/api/getprodlist', 'get', (req, res) => {
    return {
        status: 0,
        data: dataList,
        message: '成功'
    }
})

//bannerData
let bannerDataList = Mock.mock([
    {
        cover: '/static/images/banner.jpg'
    },
    {
        cover: '/static/images/banner2.jpg'
    }
])
Mock.mock('/api/getbannerlist', 'get', (req, res) => {
    return {
        status: 0,
        data: bannerDataList,
        message: '成功'
    }
})
