const MyPlugin ={
    install(Vue,opts){
        // 1. 添加全局方法或属性
        Vue.myGlobalMethod = function () {
            // 逻辑...
        }

        // 2. 添加全局资源
        Vue.directive('gtm', {
            bind( el, binding, vnode, oldVnode){
                el.addEventListener('click', ()=>{
                    if(binding.arg){
                        binding.value.name && dataLayer.push({ event: binding.value.name, 'gtm.elementTarget': binding.arg});
                    }else{
                        dataLayer.push({ event: binding.value.action, 'gtm.elementTarget': binding.value.category });
                    }
                })
            }
        });

        // 3. 注入组件选项
        Vue.mixin({
            created: function () {
            // 逻辑...
            }
        })

        // 4. 添加实例方法
        /* ajax接口封装 */
        Vue.prototype.$ajaxFn = function(opts) {
            if (!opts) return false;
            return new Promise((resolve, reject) => {
                $.ajax(opts).then(
                    function(res) {
                        try {
                            resolve(res);
                        } catch (error) {
                            reject(error);
                        }
                    },
                    function(error) {
                        reject(error);
                    }
                );
            });
        };
    }
}
export default MyPlugin;