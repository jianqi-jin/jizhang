<template>
<div class="user-login-wrap">
    登录
    <el-form class="login-form">
        <el-input placeholder="账号" v-model="form.username"></el-input>
        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
    </el-form>
    <el-button @click="login(form)">登录</el-button>
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
        ...mapActions(['login'])
    }
}
</script>

<style lang="stylus" scoped>
.user-login-wrap
    .login-form
        margin 30px
        width 300px
</style>