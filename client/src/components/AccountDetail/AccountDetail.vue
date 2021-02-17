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
        <el-form-item label="类别">
            <el-select v-model="form.type" filterable placeholder="请选择类别">
                <el-option
                    v-for="(item, index) in typeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="来源">
            <el-select v-model="form.from" filterable placeholder="请选择来源">
                <el-option
                    v-for="(item, index) in fromOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
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
import {channelOptions, typeOptions, fromOptions} from '@/constant/account';
import {getAccountDetail, addAccountDetail, getChannelList, editAccountDetail} from '@/request/request';
export default {
    data() {
        return {
            form: {},
            loading: false,
            channelOptions: [],
            typeOptions: typeOptions.map((v, i) => ({
                label: v,
                value: i
            })),
            fromOptions: fromOptions.map((v, i) => ({
                label: v,
                value: i
            }))
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
        getChannel() {
            getChannelList().then(res => {
                if (res.code !== 0) {
                    return this.channelOptions = channelOptions;
                }
                this.channelOptions = res.data.map(v => {
                    if (v.enable) {
                        return v.label;
                    }
                })
            });
        },
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
        this.getChannel();
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