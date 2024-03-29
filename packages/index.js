// 整个包的入口
// 定义install方法，接收Vue作为参数，如果使用use注册插件，则所有的组件都将被注册
// 统一导出
import Button from './button'
// import Checkbox from './checkbox'
import Dailog from './dialog'
import Form from './form'
import FormItem from './form-item'
import Input from './input'
// import Link from './link'
// import Loading from './loading'
import './font/font.css'

// 存储组建列表
const components = [Button, Form, FormItem, Input, Dailog]
const install = function(Vue) {
    // 全局注册所有的组件
    components.forEach(function(item) {
        Vue.component(item.name, item)
    })
}

// 判断是否是直接引入文件，如果是，就不用调用Vue.use()
// 使用script直接引入，不是模块化（commonjs）开发环境的时候，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default install
