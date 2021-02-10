<template>
<div class="account-detail-wrap" v-loading="loading">
    <el-form class="form" label-width="80px">
        <el-form-item v-if="isEdit" label="id">
            <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="form.name" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="金额">
            <el-input v-model="form.price" placeholder="输入金额，可以为正负"></el-input>
        </el-form-item>
        <el-form-item label="渠道">
            <el-select v-model="form.channel" filterable placeholder="请选择渠道">
                <el-option
                    v-for="(item, index) in channelOptions"
                    :key="index"
                    :label="item"
                    :value="item"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="detail">
            <el-input type="textarea" placeholder="输入其他附加信息" v-model="form.detail"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">{{btnTitle}}</el-button>
</div>
</template>

<script>
import {getAccountDetail, addAccountDetail, editAccountDetail} from '@/request/request';
export default {
    data() {
        return {
            form: {},
            loading: false,
            channelOptions: [
                '基金',
                '黄金',
                '理财',
                '花呗',
                '备用金',
                '购物',
                '吃饭',
                '通勤',
                '娱乐',
                '支出',
                '其他'
            ]
        }
    },
    computed: {
        id() {
            return this.$route.query.id;
        },
        isEdit() {
            return this.id;
        },
        btnTitle() {
            return this.isEdit ? '修改' : '创建';
        }
    },
    methods: {
        submit() {
            let submitDetail = null;
            if (this.isEdit) {
                submitDetail = editAccountDetail;
            }
            else {
                submitDetail = addAccountDetail;
            }
            this.loading = true;
            submitDetail(this.form).then(({code, msg, data}) => {
                if (code !== 0) {
                    return this.$message.error(msg);
                }
                this.$message({
                    type: 'success',
                    message: `${this.btnTitle}成功~`
                })
                this.$router.go(-1);
            }).finally(() => {
                this.loading = false;
            });
        }
    },
    mounted() {
        if (this.isEdit) {
            getAccountDetail(this.id).then(({code, msg, data}) => {
                if (code !== 0) {
                    return this.$message.error(msg);
                }
                this.form = data;
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.account-detail-wrap
    padding 30px
    .form
        width 400px
</style>