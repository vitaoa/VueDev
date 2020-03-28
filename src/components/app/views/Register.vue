<template>
    <div class="user-form-panel register">
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
        </div>
        <div class="al-c">
            <EfButton color="primary" type="block" radius="true" nativeType="submit" :disabled="disabled" @click="register">提交注册</EfButton>
        </div>
    </div>
</template>
<script>
import EfButton from '@/components/efui/button/button'
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
            if (this.passwordNull || this.usernameNull) {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        register() {
            this.$http.post('/mock/register', {
                username: this.username,
                password: this.password
            }).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$router.back()  //登陆成功返回上一页
                } else {
                    alert(data.message)
                }
            }).catch(error => console.log("error->", error))
        }
    },
    components: {
        EfButton,
        EfInput
    }
}
</script>