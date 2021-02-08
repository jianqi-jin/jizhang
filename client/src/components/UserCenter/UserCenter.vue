<template>
<div class="user-center-wrap">
    <el-form class="form" label-width="80px">
        <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label=" 账户">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="余额">
            <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="头像">
            <el-input v-model="form.avatarurl"></el-input>
        </el-form-item>
        <el-form-item label="简介">
            <el-input v-model="form.detail"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
            <el-input :value="new Date(form.date).toLocaleString()" disabled></el-input>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    data() {
        return {
            form: {}
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    watch: {
        userInfo: {
            deep: true,
            immediate: true,
            handler(v) {
                console.log(v);
                this.form = v || {};
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.user-center-wrap
    padding 30px
    .form
        width 400px
</style>