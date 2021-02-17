<template>
<div class="navigator-wrap">
    <el-menu
        default-active="/user/center"
        class="el-menu-vertical-demo"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>账号</span>
            </template>
            <el-menu-item index="/user/center">个人中心</el-menu-item>
            <el-menu-item index="/user/channel">渠道设置</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">账单</span>
            </template>
            <el-menu-item index="/account/list">账单明细</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">笔记</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">理财</span>
        </el-menu-item>
    </el-menu>
</div>
</template>

<script>
    export default {
    }
</script>

<style lang="stylus" scoped>
.navigator-wrap
    ul
        height 100vh
</style>