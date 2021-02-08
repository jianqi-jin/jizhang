<template>
<div class="user-center-wrap">
    <el-form class="form" label-width="80px">
        <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label=" 账户">
            <el-input v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="余额">
            <el-input v-model="form.amount" disabled></el-input>
        </el-form-item>
        <el-form-item label="头像">
            <div class="img-uploader">
                <uploader v-model="form.avatarurl"></uploader>
            </div>
        </el-form-item>
        <el-form-item label="简介">
            <el-input type="textarea" v-model="form.detail"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
            <el-input :value="new Date(form.date).toLocaleString()" disabled></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
</div>
</template>

<script>
import Uploader from '@/components/Uploader/Uploader.vue';
import {mapGetters} from 'vuex';
import {editUserInfo} from '@/request/request';
export default {
    components: {
        Uploader
    },
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
                this.form = v || {};
            }
        }
    },
    methods: {
        submit() {
            editUserInfo(this.form)
            .then(({code}) => {
                if (code !== 0) {
                    throw '请求失败~';
                }
                this.$message({
                    type: 'success',
                    message: '请求成功!'
                })
                this.$router.go(-1);
            })
            .catch(res => {
                this.$message.error(res.toString());
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
.user-center-wrap
    padding 30px
    .form
        width 400px
    .img-uploader
        position relative
        height 100px
        width 100px
        margin auto
        border-radius 100%
        overflow hidden
        box-shadow 1px 1px 10px #ccc
</style>