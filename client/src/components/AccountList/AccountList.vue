<template>
<div class="account-list-wrap">
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
        <el-table-column
            prop="detail"
            label="详情"
            width="180">
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
export default {
    data() {
        return {
            pn: 0,
            rn: 0
        }
    },
    computed: {
        ...mapGetters(['loading', 'accountDetailInfo']),
        accountList() {
            return (this.accountDetailInfo?.list || []).map(v => {
                return {
                    ...v,
                    createTime: new Date(v.create_date).toLocaleDateString()
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
        }
    },
    watch: {
        pn: {
            immediate: true,
            handler(v) {
                console.log(v);
                this.getAccountDetailList({
                    pn: v - 1,
                    rn: 10
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