<template>
    <div class="user-form-panel login">
        <p class="al-c">登录</p>
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
            <button @click="login" class="form-submit">登录</button>
        </div>
        <router-link to="/register">去注册</router-link>
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
    }
}
</script>
<style scoped lang="scss">
</style>