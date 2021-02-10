<template>
<div class="user-register-wrap">
    <el-form class="register-form" label-width="80px">
        <div class="title">登录</div>
        <el-form-item label="账号">
            <el-input placeholder="账号" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
            <el-input type="password" v-model="form.passwordRepeat" placeholder="重复密码"></el-input>
        </el-form-item>
        <div class="btn-bar">
            <el-button @click="submit">注册</el-button>
        </div>
    </el-form>
</div>
</template>

<script>
import {mapActions} from 'vuex';
import {register} from '@/request/request';

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
        submit() {
            if (this.form.password !== this.form.passwordRepeat) {
                return this.$message.error('两次输入密码不一致~');
            }
            register(this.form)
                .then(({code, msg, data}) => {
                    if (code !== 0) {
                        return this.$message.error(msg);
                    }
                    this.$message({
                        type: 'success',
                        message: '注册成功! 请登录~'
                    })
                    this.$router.go(-1);
                });
        }
    }
}
</script>

<style lang="stylus" scoped>
.user-register-wrap
.title
    text-align center
    margin-bottom 20px
    padding 30px
    .register-form
        width 300px
        margin auto
    .btn-bar
        text-align center
</style>