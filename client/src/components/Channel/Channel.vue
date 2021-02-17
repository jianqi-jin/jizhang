<template>
<div class="channel-wrap">
    <el-button type="primary" @click="add">新增</el-button>
    <el-table
        :data="channelList"
        style="width: 100%"
        v-loading="loading"
    >
        <el-table-column
            prop="id"
            label="编号"
        >
        </el-table-column>
        <el-table-column
            prop="label"
            label="标题"
        >
            <template slot-scope="scope">
                <el-input @blur="edit(scope.row)" v-model="scope.row.label"></el-input>
            </template>
        </el-table-column>
        <el-table-column
            prop="enable"
            label="启用"
        >
            <template slot-scope="scope">
                <el-switch @change="edit(scope.row)" v-model="scope.row.enable"></el-switch>
            </template>
        </el-table-column>
        <el-table-column
            prop="create_date"
            label="创建时间"
        >
        </el-table-column>
        <el-table-column
            label="操作"
        >
        <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteChannel(scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-dialog
        :visible.sync="dialogVisible"
    >
        <div class="dialog-content">
            <el-form label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="currentItem.label" placeholder="输入标题"></el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn" @click="submitAdd">确定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {getChannelList, addChannel, editChannel, deleteChannel} from '@/request/request';
export default {
    data() {
        return {
            loading: false,
            channelList: [],
            dialogVisible: false,
            currentItem: {}
        }
    },
    methods: {
        add() {
            this.currentItem = {};
            this.dialogVisible = true;
        },
        deleteChannel(item) {
            deleteChannel(item).then(res => {
                if (res.code !== 0) {
                    return this.$message.error(res.msg || '删除失败');
                }
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
                this.getChannelList();
            });
        },
        async submitAdd() {
            let res = await addChannel(this.currentItem);
            if (res.code !== 0) {
                return this.$message.error(res.msg || '添加失败');
            }
            this.$message({
                type: 'success',
                message: '添加成功~'
            })
            this.dialogVisible = false;
            this.getChannelList();
        },
        edit(item) {
            item.enable = +item.enable;
            editChannel(item).then(res => {
                if (res.code !== 0) {
                    return this.$message.error('更新失败');
                }
                this.getChannelList();
            });
        },
        getChannelList() {
            this.loading = true;
            getChannelList().then(res => {
                this.channelList = res.data.map(v => {
                    v.enable = !!v.enable;
                    v.create_date = new Date(v.create_date).toLocaleString();
                    return v;
                });
            })
            .finally(() => {
                this.loading = false;
            });
        }
    },
    mounted() {
        this.getChannelList();
    }
}
</script>

<style lang="stylus" scoped>
.channel-wrap
    margin 30px
    .dialog-content
        text-align center
        .btn
            margin-top 20px
</style>