<template>
<div class="sale-good-detail-wrap">
    售卖商品
    <el-form class="form" label-width="80px">
        <el-form-item v-if="isEdit" label="id">
            <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
            <div class="img-uploader">
                <uploader v-model="form.img"></uploader>
            </div>
        </el-form-item>
        <el-form-item label="金额">
            <el-input v-model="form.price" placeholder="输入金额，仅可以为正"></el-input>
        </el-form-item>
        <el-form-item label="说明">
            <el-input type="textarea" placeholder="请输入说明" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input type="textarea" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="数量">
            <el-input v-model="form.total" type="number" placeholder="请输入剩余数量"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="form.status">
                <el-option label="上架" :value="0"></el-option>
                <el-option label="下架" :value="1"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">{{btnTitle}}</el-button>
</div>
</template>

<script>
import Uploader from '@/components/Uploader/Uploader.vue';
import {addGood, editGood, getGoodDetail} from '@/request/request';
export default {
    data() {
        return {
            form: {}
        };
    },
    components: {
        Uploader
    },
    computed: {
        id() {
            return this.$route.query.id;
        },
        isEdit() {
            return !!this.id;
        },
        btnTitle() {
            return this.isEdit ? '确定修改' : '添加';
        }
    },
    mounted() {
        if (this.id) {
            getGoodDetail(this.id).then(res => {
                this.form = res.data;
            })
        }
    },
    methods: {
        submit() {
            let submitDetail = addGood;
            if (this.isEdit) {
                submitDetail = editGood;
            }
            submitDetail(this.form).then(res => {
                if (res.code !== 0) {
                    return this.$message.error(res.msg || '请求失败');
                }
                this.$message({
                    type: 'success',
                    message: '请求成功~'
                });
                return this.$router.push('/sale/goodList');
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.sale-good-detail-wrap
    margin-top 20px
    .form
        width 400px
    .img-uploader
        height 300px
</style>