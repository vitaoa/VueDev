<template>
    <div class="user-form-panel register">
        <EfForm :model="modelForm" classForm="user-form" :rules="rules">
            <EfInput type="text" prop="username" :borderActive="borderActive" v-model="modelForm.username" placeholder="请输入用户名">
                <span>用户名：</span>
            </EfInput>
            <EfInput type="password" prop="password" :borderActive="borderActive" v-model="modelForm.password" placeholder="设置密码">
                <span>密码：</span>
            </EfInput>
        </EfForm>
        <div class="al-c">
            <EfButton color="primary" type="block" radius="true" nativeType="submit" :disabled="disabled" @click="register">提交注册</EfButton>
        </div>
    </div>
</template>
<script>
import EfButton from '@/components/efui/button/button'
import EfInput from '@/components/efui/input/input'
import EfForm from '@/components/efui/form/form'
export default {
    data() {
        return {
            modelForm: {
                username: '',
                password: '',
            },
            usernameNull: true,
            passwordNull: true,
            disabled: true,
            borderActive: true,
            rules: {
                username: [
                    { required: true, trigger: 'blur', validator: this.checkUsername, regs: /^[a-zA-Z0-9\u4e00-\u9fa5_]{4,18}$/ }
                ],
                password: [
                    { required: true, trigger: 'blur', validator: this.checkPassword, regs: /^[a-zA-Z0-9_]{6,12}$/ },
                ]
            }
        }
    },
    methods: {
        checkUsername(rule, value, callback) {
            var regs = rule.regs;
            if (!value) {
                this.usernameNull = true
                return callback(new Error('用户名不能为空'));
            }
            if (regs.test(value)) {
                this.usernameNull = false
                callback();
            } else {
                this.usernameNull = true
                callback(new Error('请输入4-18位中英文用户名！'));
            }
        },
        checkPassword(rule, value, callback) {
            var regs = rule.regs;
            console.log("checkPassword==", rule, value, callback)
            if (!value) {
                this.passwordNull = true
                return callback(new Error('密码不能为空'));
            }
            if (regs.test(value)) {
                this.passwordNull = false
                callback();
            } else {
                this.passwordNull = true
                callback(new Error('请输入6-12位中英文密码！'));
            }
        },
        submitDisabled() {
            if (this.passwordNull || this.usernameNull) {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        register() {
            this.$http.post('/mock/register', {
                username: this.modelForm.username,
                password: this.modelForm.password
            }).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$router.back()  //登陆成功返回上一页
                    // this.$store.commit('setToken', 'demo')
                    // window.localStorage.setItem('token', 'demo') //登录标识
                } else {
                    alert(data.message)
                }
            }).catch(error => console.log("error->", error))
        }
    },
    components: {
        EfButton,
        EfInput,
        EfForm
    },
    watch: {
        usernameNull(v) {
            this.$nextTick(this.submitDisabled);
        },
        passwordNull(v) {
            this.$nextTick(this.submitDisabled);
        }
    }
}
</script>