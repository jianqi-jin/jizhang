<template>
<div class="account-reconcil-wrap">
    <el-form
        label-width="100px"
    >
        <el-form-item
            label="渠道"
        >
            <el-select v-model="form.channel">
                <el-option
                    v-for="(item, index) in channels"
                    :key="index"
                    :label="item"
                    :value="item"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item
            label="价格"
        >
            <el-input
                placeholder="对账目标价格"
                v-model="form.price"
            ></el-input>
        </el-form-item>
        <el-form-item label="类别">
            <el-select
                v-model="form.type"
                filterable
                placeholder="请选择类别"
            >
                <el-option
                    v-for="(item, index) in typeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
</div>
</template>

<script>
import {typeOptions} from '@/constant/account';
import {getChannelList, accountReconcil} from '@/request/request';
export default {
    data() {
        return {
            channels: [],
            typeOptions: typeOptions.map((v, i) => ({
                label: v,
                value: i
            })),
            form: {
                price: 0,
                type: '',
                channel: ''
            }
        }
    },
    mounted() {
        getChannelList().then(res => {
            if (res.code !== 0) {
                return this.channelOptions = [];
            }
            this.channels = res.data.map(v => {
                if (v.enable) {
                    return v.label;
                }
            }).filter(v => v);
        });
    },
    methods: {
        submit() {
            accountReconcil(this.form).then(res => {
                if (res.code !== 0) {
                    return this.$message.error(res.msg);
                }
                this.$message.success('提交成功~');
            }).catch(e => {
                this.$message.error(e.toString());
            })
        }
    }
}
</script>

<style lang="stylus">
.account-reconcil-wrap
    margin 20px
</style>