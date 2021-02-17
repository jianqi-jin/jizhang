<template>
<div class="account-list-wrap">
    <el-tabs v-model="activeType" @tab-click="getList()">
        <el-tab-pane label="全部资产" name="-1"></el-tab-pane>
        <el-tab-pane label="流动资产" name="0"></el-tab-pane>
        <el-tab-pane label="固定资产" name="1"></el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="addAccountDetail">新增</el-button>
    <el-table
        :data="accountList"
        style="width: 100%"
        v-loading="loading"
    >
        <el-table-column
            prop="id"
            label="编号">
        </el-table-column>
        <el-table-column
            prop="name"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="price"
            label="金额"
            width="180">
        </el-table-column>
        <el-table-column
            prop="channel"
            label="渠道"
            width="180">
        </el-table-column>
        <!-- <el-table-column
            prop="detail"
            label="详情"
            width="180">
        </el-table-column> -->
        <el-table-column
            prop="from"
            label="来源"
            width="180">
        </el-table-column>
        <el-table-column
            prop="type"
            label="类型"
            width="180"
        >
            <template slot-scope="scope">
                {{typeOptions[scope.row.type]}}
            </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button size="mini" @click="editDetail(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteDetail(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-container">
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="pn"
            :total="accountDetailInfo.total">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {fromOptions} from '@/constant/account';
import {deleteDetail} from '@/request/request';
import {typeOptions} from '@/constant/account';

export default {
    data() {
        return {
            pn: 0,
            rn: 0,
            activeType: '-1',
            typeOptions
        }
    },
    computed: {
        ...mapGetters(['loading', 'accountDetailInfo']),
        accountList() {
            return (this.accountDetailInfo?.list || []).map(v => {
                return {
                    ...v,
                    createTime: new Date(v.create_date).toLocaleDateString(),
                    from: fromOptions[v.from]
                }
            })
        }
    },
    methods: {
        ...mapActions(['getAccountDetailList']),
        addAccountDetail() {
            this.$router.push('/account/detail');
        },
        editDetail(item) {
            this.$router.push(`/account/detail?id=${item.id}`);
        },
        async deleteDetail({id}) {
            let {code, msg} = await deleteDetail({id});
            if (code !== 0) {
                return this.$message.error(msg);
            }
            this.$message({
                type: 'success',
                message: '删除成功'
            });
            this.getList();
        },
        getList() {
            this.getAccountDetailList({
                pn: this.pn - 1,
                rn: 10,
                type: this.activeType
            });
        }
    },
    watch: {
        pn: {
            handler(v) {
                this.getAccountDetailList({
                    pn: v - 1,
                    rn: 10,
                    type: this.activeType
                });
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.account-list-wrap
    padding 30px
    .pagination-container
        text-align center
</style>