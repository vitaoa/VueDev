<template>
    <div class="user-form-panel register">
        <p class="al-c">注册</p>
        <div class="user-form">
            <div class="form-group">
                <label>用户名：</label>
                <input type="text" class="input-form" v-model="username" placeholder="请输入用户名" />
            </div>
            <div class="form-group">
                <label>密码：</label>
                <input type="password" class="input-form" v-model="password" placeholder="请输入密码" />
            </div>
        </div>
        <div class="al-c">
            <button @click="register" class="form-submit">提交注册</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        register() {
            this.$http.post('/mock/register', {
                username: this.username,
                password: this.password
            }).then(res => {
                let data = res.data;
                if (data.success) {
                    this.$router.back()  //登陆成功返回上一页
                    //  localStorage.setItem('isLogin','ok') //登录标识
                } else {
                    alert(data.message)
                }
            }).catch(error => console.log("error->", error))
        }
    }
}
</script>
<style scoped lang="scss">
</style>