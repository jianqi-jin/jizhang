<template>
<div class="sale-goodlist-wrap">
    <div class="action-bar">
        <div class="search-bar">
            <div class="search-input">
                <el-input v-model="query" placeholder="请输入关键词"></el-input>
            </div>
            <el-button @click="getDate">搜索</el-button>
        </div>
        <el-button class="add-btn" type="primary" @click="addGood">添加商品</el-button>
    </div>
    <el-tabs v-model="activeType" @tab-click="getDate">
        <el-tab-pane label="全部" name="-1"></el-tab-pane>
        <el-tab-pane label="已上架" name="0"></el-tab-pane>
        <el-tab-pane label="已下架" name="1"></el-tab-pane>
    </el-tabs>
    <h2>共计：{{totalPrice}}元</h2>
    <h2>已卖：{{salePrice}}元</h2>
    <h2>剩余：{{leftPrice}}元</h2>
    <el-table
        :data="goodList"
        v-loading="loading"
    >
        <el-table-column
            prop="id"
            label="编号"
        ></el-table-column>
        <el-table-column
            prop="title"
            label="标题"
        ></el-table-column>
        <!-- <el-table-column
            prop="description"
            label="描述"
        ></el-table-column>
        <el-table-column
            prop="content"
            label="详情"
        ></el-table-column> -->
        <el-table-column
            prop="create_date"
            label="创建时间"
        ></el-table-column>
        <el-table-column
            prop="img"
            label="图片"
        >
            <template slot-scope="scope">
                <el-image
                    class="img-content"
                    :src="scope.row.img || ''"
                    fit="contain"
                    :preview-src-list="[scope.row.img]"
                >
                </el-image>
            </template>
        </el-table-column>
        <el-table-column
            prop="price"
            label="价格"
        ></el-table-column>
        <!-- <el-table-column
            prop="total"
            label="数量"
        ></el-table-column> -->
        <el-table-column
            prop="left_num"
            label="剩余数量"
        ></el-table-column>
        <el-table-column
            prop="status"
            label="状态"
        >
            <template slot-scope="scope">
                <div
                    :class="`status-text-${scope.row.status}`"
                >{{statusEnum[scope.row.status]}}</div>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="200px"
        >
            <template slot-scope="scope">
                <el-button size="mini" @click="goEdit(scope.row)">修改</el-button>
                <el-button size="mini" @click="deleteClick(scope.row)" type="danger">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-container">
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page.sync="pn"
            :total="total">
        </el-pagination>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogDelShow"
        width="30%"
    >
        <span>您真的要删除吗？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDelShow = false">取 消</el-button>
            <el-button type="primary" @click="deleteCurrentRow">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {getGoodList, deleteGood, getGoodInfo} from '@/request/request.js';
export default {
    data() {
        return {
            pn: 1,
            rn: 0,
            goodList: [],
            dialogDelShow: false,
            currentDeleteId: 0,
            total: 0,
            query: '',
            loading: false,
            activeType: '-1',
            statusEnum: ['已上架', '已下架'],
            totalPrice: 0,
            salePrice: 0,
            leftPrice: 0
        };
    },
    watch: {
        pn: {
            handler(v) {
                this.getDate({
                    pn: v - 1,
                    rn: 10
                });
            },
            immediate: true
        }
    },
    mounted() {
        this.getGoodInfo();
    },
    methods: {
        goEdit(item) {
            this.$router.push(`/sale/goodDetail?id=${item.id}`);
        },
        getGoodInfo() {
            getGoodInfo().then(res => {
                this.totalPrice = res?.data?.total_price || 0;
                this.salePrice = res?.data?.sale_price || 0;
                this.leftPrice = res?.data?.left_price || 0;
            });
        },
        getDate({pn = this.pn - 1, rn = 10, query = this.query.trim(), status = +this.activeType} = {}) {
            this.loading = true;
            getGoodList({pn, rn, query, status}).then(res => {
                this.total = res.total;
                this.goodList = res.data.map(v => {
                    v.create_date = new Date(v.create_date).toLocaleDateString();
                    return v;
                });
            }).finally(() => {
                this.loading = false;
            });
        },
        deleteCurrentRow() {
            this.dialogDelShow = false;
            deleteGood({id: this.currentDeleteId}).then(res => {
                if (res.code !== 0) {
                    return this.$message.error(res.msg || '请求失败');
                }
                this.$message({
                    type: 'success',
                    message: '删除成功~'
                });
                this.getDate();
            })
        },
        deleteClick(item) {
            this.dialogDelShow = true;
            this.currentDeleteId = item.id;
        },
        addGood() {
            this.$router.push('/sale/goodDetail');
        }
    }
}
</script>

<style lang="stylus" scoped>
.sale-goodlist-wrap
    h2
        display inline-block
        margin-right 20px
    margin-top 20px
    .pagination-container
        text-align center
    .img-content
        height 46px
        width 70px
    .action-bar
        position relative
        >*
            display inline-block
    .search-bar
        .search-input
            width 400px
        >*
            display inline-block
    .add-btn
        position absolute
        right 30px
    .status-text
        &-0
            color green
        &-1
            color gray
</style>