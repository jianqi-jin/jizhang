<template>
<div class="usercenter-wrap">
    <el-button type="danger" @click="loginOut">退出登录</el-button>
    <div class="user-info-box">
        <el-row style="text-align: center;">
            <el-image
                class="user-icon"
                :src="userInfo.avatarurl || ''"
                fit="contain"
                :preview-src-list="[userInfo.avatarurl]"
            >
            </el-image>
        </el-row>
        <el-row>
            <el-col :span="8">账户</el-col>
            <el-col :span="16">{{userInfo.username}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">余额</el-col>
            <el-col :span="16">{{userInfo.amount}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">简介</el-col>
            <el-col :span="16">{{userInfo.detail}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">注册时间</el-col>
            <el-col :span="16">{{new Date(userInfo.date).toLocaleString()}}</el-col>
        </el-row>
    </div>
    <div class="btn-bar">
        <el-button class="btn" type="primary" @click="toEdit">编辑</el-button>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import {loginOut} from '@/request/request';
export default {
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        toEdit() {
            this.$router.push('/user/edit');
        },
        async loginOut() {
            await loginOut();
            this.$router.push('/user/login');
        }
    }
}
</script>

<style lang="stylus" scoped>
.usercenter-wrap
    padding 30px
    .user-info-box
        width 500px
        margin auto
        .user-icon
            cursor pointer
            margin auto
            border-radius 100%
            height 100px
            width 100px
            overflow hidden
            box-shadow 1px 1px 10px #ccc
    .btn-bar
        margin-top 20px
        text-align center
</style>