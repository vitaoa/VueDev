<template>
    <div class="user-form-panel login">
        <EfForm :model="modelForm" classForm="user-form" :rules="rules">
            <EfInput type="text" prop="username" :borderActive="borderActive" v-model="modelForm.username" placeholder="请输入用户名">
                <span>用户名：</span>
            </EfInput>
            <EfInput type="text" prop="password" :borderActive="borderActive" v-model="modelForm.password" placeholder="请输入密码" @input="pswInput" :class="`${pswAbs?'is-abs':'' }`"> 
                <span>密码：</span>
                <span slot="inpt" ref="pswText1" class="inp-font txt1" :style="`width:${pswWidth}px;`" v-html="txtpsw" v-show="pswAbs"></span>
            </EfInput>
            <span class="psw-input-text" ref="pwsText">{{modelForm.password}}</span>
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
            },
            pswWidth: 0
        }
    },
    computed: {
        txtpsw(){
            console.log(',this.modelForm.password==== ', this.modelForm.password);
            return this.modelForm.password.replace(/./g, '<i>•</i>');
        },
        pswAbs(){
            return !!this.modelForm.password;
        }
    },
    methods: {
        pswInput(o){
            this.$nextTick(()=>{
                console.log('input=====', o, this.$refs, this.$refs.pwsText.offsetWidth);
                this.pswWidth = this.$refs.pwsText.offsetWidth;
            })
        },
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
<style scoped lang="scss">
.login{
    position: relative;
    .psw-input-text{
        font-size: 16px;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        bottom: 0;
        left:0;
    }
    /deep/ .input{
        &.is-abs{
            .inp-font[type='text']{
                color: transparent;
                caret-color: #000;
                position: absolute;
                background: transparent;
                left:0;
                top:0;
            }
        }
        .input-box{
            position: relative;
            .txt1{
                // background:#ccc; 
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                i{font-style: normal;}
            }
            // .inp-font{
            //     // -webkit-text-security: disc;
            // }
        }
    }
}
</style>