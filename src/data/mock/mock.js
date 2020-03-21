const Mock = require('mockjs')
import quotesJson from '@/base/json/quotes.json'

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
Mock.mock('/mock/getprodlist', 'get', (req, res) => {
    return {
        success: true,
        data: dataList,
        message: '成功'
    }
})

Mock.Random.extend({
    bannerDefaultList: function(date) {
        var constellations = [
            'https://dummyimage.com/375x160/e977fd.png&text=vue+mockjs',
            'https://dummyimage.com/375x160/85f5a2.png&text=vue+mockjs'
        ]
        return this.pick(constellations)
    }
})
Mock.Random.bannerDefaultList()

//bannerData
let bannerDataList = Mock.mock({
    list: [
        {
            cover: '/static/images/banner.jpg',title:'activity'
        },
        {
            cover: '@bannerDefaultList'
        },
        {
            cover: '/static/images/banner2.jpg'
        }
    ]
})
Mock.mock('/mock/getbannerlist', (req, res) => {
    return {
        success: true,
        data: bannerDataList,
        message: '成功'
    }
})

let userpoor = [
    { username: 'vita', password: 'e807f1fcf82d132f9bb018ca6738a19f', token: '123435465465' },
    { username: 'demo', password: '123456' }
]
//注册接口
Mock.mock('/mock/register', (req, res) => {
    const { username, password } = JSON.parse(req.body)
    const userlength = userpoor.filter(v => v.username == username).length
    if (userlength > 0) {
        return {
            success: false,
            message: '用户名已存在'
        }
    } else {
        if (!!password) {
            return {
                success: true,
                message: '注册成功'
            }
        } else {
            return {
                success: false,
                message: '请输入密码'
            }
        }
    }
})
//登录接口
Mock.mock('/mock/login', (req, res) => {
    const { username, password } = JSON.parse(req.body)
    const userItem = userpoor.filter(v => v.username == username)
    if (userItem.length > 0) {
        const userInfo = userItem.filter(v => v.password == password)
        if (userInfo.length > 0) {
            return {
                success: true,
                token: userInfo[0].token,
                message: '登录成功'
            }
        } else {
            return {
                success: false,
                message: '登录密码错误'
            }
        }
    } else {
        return {
            success: false,
            message: '登录帐户或密码错误'
        }
    }
})
//名言警句接口
Mock.mock('/mock/quotes', (req, res) => {
    const query = JSON.parse(decodeURI(req.body))
    res = quotesJson
    if (query && query.key) {
        res = quotesJson.filter(v => v.mrname == query.key)
        if (query.num) {
            res = res.slice(0, query.num)
        }
    } else {
        if (query && query.num) {
            res = quotesJson.slice(0, query.num)
        }
    }
    return res
})
