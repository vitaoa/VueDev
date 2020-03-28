<template>
    <div class="user-form-panel login">
        <div class="user-form">
            <EfInput type="text" :borderActive="borderActive" v-model="username" placeholder="请输入用户名" @input="inputChangeUsername">
                <span>用户名</span>
            </EfInput>
            <EfInput
                type="password"
                id="passwordRaw_div"
                :borderActive="borderActive"
                v-model="password"
                placeholder="设置密码"
                @input="inputChangePassword"
            >
                <span>设置密码</span>
            </EfInput>
            <div class="form-agreement">
                <EfCheckbox v-model="checked" @change="checkBoxChange">我已仔细阅读并同意</EfCheckbox>
            </div>
        </div>
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
export default {
    data() {
        return {
            username: '',
            password: '',
            usernameNull: true,
            passwordNull: true,
            checked: false,
            disabled: true,
            borderActive: true
        }
    },
    methods: {
        inputChangeUsername(val) {
            if (val) {
                this.usernameNull = false
            } else {
                this.usernameNull = true
            }
            this.$nextTick(this.submitDisabled);
        },
        inputChangePassword(val) {
            if (val) {
                this.passwordNull = false
            } else {
                this.passwordNull = true
            }
            this.$nextTick(this.submitDisabled);
        },
        submitDisabled() {
            if (this.passwordNull || this.usernameNull || !this.checked) {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        checkBoxChange(val) {
            this.checked = val;
            this.$nextTick(this.submitDisabled);
        },
        async login(e) {
            e.preventDefault();
            try {
                const result = await this.$http.post('/mock/login', { username: this.username, password: this.$md5(this.password) })
                let data = result.data;
                if (data.success) {
                    //登录成功跳转页面
                    this.$router.back()  //登陆成功返回上一页
                    this.$store.commit('setToken', data.token)
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
        EfInput
    }
}
</script>
