<template>
<div class="user-login-wrap">
    <el-form class="login-form" label-width="80px">
        <div class="title">登录</div>
        <el-form-item label="账号">
            <el-input placeholder="账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="btn-bar">
            <el-button @click="login(form)">登录</el-button>
            <el-button type="text" @click="register">注册</el-button>
        </div>
    </el-form>
</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data() {
        return {
            msg: '',
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions(['login']),
        register() {
            this.$router.push('/user/register');
        }
    }
}
</script>

<style lang="stylus" scoped>
.user-login-wrap
.title
    text-align center
    margin-bottom 20px
    padding 30px
    .login-form
        width 300px
        margin auto
    .btn-bar
        text-align center
</style>