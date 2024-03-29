<template>
    <div class="app">
        <h5>组件实例：</h5>
        <ul>
            <li>
                <h6>Button</h6>
                <div class="row">
                    <EfButton v-for="(item,index) in buttonLists" :key="index" :color="item.color" :type="item.type" :radius="radius" :native-type="item.native" :disabled="disabled" :circle="item.circle">{{ item.color }}{{ item.type?'-'+item.type:'' }}</EfButton>
                </div>
                <div class="row">
                    <EfButton color="primary" :circle="true">
                        c
                    </EfButton>
                    <EfButton color="default" :round="true" icon="font icon-APPkaifa">
                        图标
                    </EfButton>
                </div>
            </li>
            <li>
                <h6>Dialog</h6>
                <EfButton color="primary" @click="visible=true">popDialog</EfButton>
                <!-- :visible="visible" @update:visible="fn" -->
                <!-- .sync语法糖写法：:visible.sync="visible" -->
                <!-- 子组件触发：this.$emit('update:visible', false) -->
                <EfDailog :visible.sync="visible" width="30%" top="200px" title="温馨提示">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                    <template v-slot:footer>
                        <EfButton color="default" @click="visible=false">取消</EfButton>
                        <EfButton color="primary" @click="visible=false">确定</EfButton>
                    </template>
                </EfDailog>
            </li>
            <li>
                <h6>Input</h6>
                <!-- v-modle语法糖 -->
                <!-- 给普通表单元素使用v-model
                <input type="text" v-model="msg" />
                等价于：
                <input type="text" v-bind:value="msg" v-on:input="msg=$event.target.value" />
                 -->
                <!-- 给组件使用v-model，实质上相当于给组件传递了value属性和监听了input事件
                <EfInput v-model="msg" />
                等价于：
                <EfInput v-bind:value="msg" v-on:input="msg=arguments[0]" />
                 -->
                <EfInput></EfInput>
                <EfInput clearable></EfInput>
                <EfInput :show-password="true"></EfInput>
            </li>
            <li>
                <h6>Form</h6>{{ modelForm.username }}
                <EfForm :model="modelForm" label-width="80px" :rules="rules">
                    <EfFormItem label="用户名">
                        <EfInput v-model="modelForm.username" placeholder="请输入用户名" clearable></EfInput>
                    </EfFormItem>
                    <EfFormItem label="密码">
                        <EfInput v-model="modelForm.password" :show-password="true" placeholder="请输入密码"></EfInput>
                    </EfFormItem>
                </EfForm>
            </li>
            <!-- <li>
                <h6>Checkbox</h6>
                <EfCheckbox v-model="checked">我已仔细阅读并同意</EfCheckbox>
            </li> -->
            <!-- <li>
                <h6>Input</h6>
                <EfInput v-model="modelForm.username" type="text" prop="username" :border-active="borderActive" placeholder="请输入用户名">
                    <span>用户名：</span>
                </EfInput>
            </li> -->
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            buttonLists: [
                { color: 'primary' },
                { color: 'info' },
                { color: 'success' },
                { color: 'danger' },
                { color: 'warning' },
                { color: 'default' },
                { color: 'link' },
                { color: 'primary', type: 'block', native: 'submit' }
            ],
            checked: false,
            radius: true,
            disabled: false,
            borderActive: false,
            visible: false,
            modelForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, trigger: 'blur', validator: this.checkUsername, regs: /^[a-zA-Z0-9\u4e00-\u9fa5_]{4,18}$/ }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: this.checkPassword, regs: /^[a-zA-Z0-9_]{6,12}$/ }
                ]
            }
        }
    },
    created() {
    }
}
</script>
<style scoped lang="scss">
.app {
    padding: 10px;
    ul {
        list-style-type: decimal;
        .row{margin-top: 10px;}
    }
}
</style>
