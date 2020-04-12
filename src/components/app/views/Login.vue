<template>
    <div class="user-form-panel login">
        <EfForm :model="modelForm" classForm="user-form" :rules="rules">
            <EfInput type="text" prop="username" :borderActive="borderActive" v-model="modelForm.username" placeholder="请输入用户名">
                <span>用户名：</span>
            </EfInput>
            <EfInput type="password" prop="password" :borderActive="borderActive" v-model="modelForm.password" placeholder="请输入密码">
                <span>密码：</span>
            </EfInput>
            <div class="form-agreement">
                <EfCheckbox v-model="checked" @change="checkBoxChange">我已仔细阅读并同意</EfCheckbox>
            </div>
        </EfForm>
        <div class="al-c">
            <EfButton color="primary" type="block" radius="true" nativeType="submit" :disabled="disabled" @click="login">登录</EfButton>
            <EfButton color="link" to="/register">去注册</EfButton>，可以查看更多
        </div>
    </div>
</template>
<script>
import EfButton from '@/components/efui/button/button'
import EfCheckbox from '@/components/efui/checkbox/checkbox'
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
            checked: false,
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
        checkBoxChange(val) {
            this.checked = val;
        },
        submitDisabled() {
            if (this.passwordNull || this.usernameNull || !this.checked) {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        async login(e) {
            e.preventDefault();
            try {
                const result = await this.$http.post('/mock/login', { username: this.modelForm.username, password: this.$md5(this.modelForm.password) })
                let data = result.data;
                if (data.success) {
                    //登录成功跳转页面
                    this.$router.back()  //登陆成功返回上一页
                    this.$store.commit('SET_TOKEN', data.token)
                    window.localStorage.setItem('token', data.token) //登录标识
                } else {
                    alert(data.message)
                }
            } catch (err) {
                console.log(err)
            }
        }
    },
    components: {
        EfButton,
        EfCheckbox,
        EfInput,
        EfForm
    },
    watch: {
        usernameNull(v) {
            this.$nextTick(this.submitDisabled);
        },
        passwordNull(v) {
            this.$nextTick(this.submitDisabled);
        },
        checked(v) {
            this.$nextTick(this.submitDisabled);
        }
    }
}
</script>
