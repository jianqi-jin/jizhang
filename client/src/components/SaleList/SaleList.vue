<template>
    <div class="sale-list-wrap">
        共计{{totalPrice}}元
        <el-button class="add-btn" @click="handleAdd">
            + 新增
        </el-button>
        <el-table :data="saleList" v-loading="loading">
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="title" label="标题">
            <template
                slot-scope="{row}"
            >
                <el-autocomplete
                    v-if="row.isEdit"
                    v-model="row.title"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="selectedRow => handleSelect(selectedRow, row)"
                ></el-autocomplete>
                <span v-else>{{row.title}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="price" label="单价">
            <template slot-scope="{row}">
                <el-input v-if="row.isEdit" v-model="row.price"></el-input>
                <span v-else>{{row.price}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="total" label="数量">
            <template slot-scope="{row}">
                <el-input v-if="row.isEdit" v-model="row.total"></el-input>
                <span v-else>{{row.total}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="{row}">
                <el-button v-if="row.isEdit" @click="applyRow(row)">应用</el-button>
                <template v-else>
                    <el-button @click="editRow(row)">编辑</el-button>
                    <el-button @click="deleteRow(row)">删除</el-button>
                </template>
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

<script lang="ts">
import { getSaleList, getGoodList, updateSaleInfo, addSaleInfo, getSaleInfo, deleteSale } from "@/request/request.js";
export default {
    data() {
        return {
            pn: 0,
            rn: 10,
            totalPrice: 0,
            total: 0,
            dialogDelShow: false,
            loading: false,
            saleList: [],
            emptySaleInfo: {
                title: '',
                price: 0,
                total: 1,
                isEdit: true
            }
        };
    },
    watch: {
        pn: {
            handler() {
                this.$nextTick(() => {
                    this.getSaleList();
                });
            }
        }
    },
    mounted() {
        this.getSaleInfo();
    },
    methods: {
        getSaleInfo() {
            getSaleInfo().then(res => {
                this.totalPrice = res.data?.total_price || 0;
            })
        },
        handleSelect(selectedRow, row) {
            row.goods_id = selectedRow.id || row.goods_id;
        },
        editRow(row) {
            row.isEdit = true;
        },
        async applyRow(row) {
            row.isEdit = false;
            if (!row.id) {
                // 新增
                await addSaleInfo(row);
            }
            else {
                await updateSaleInfo(row);
            }
            this.getSaleList();
        },
        deleteRow(row) {
            this.currentDeleteId = row.id;
            this.dialogDelShow = true;
        },
        deleteCurrentRow() {
            deleteSale({id: this.currentDeleteId}).then(res => {
                if (res.code !== 0) {
                    return this.$message.error('删除错误');
                }
                this.dialogDelShow = false;
                this.getSaleList();
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            });
        },
        querySearchAsync(queryString, cb) {
            getGoodList({pn: 0, rn: 10, query: queryString}).then(res => {
                if (res.code !== 0) {
                    return this.$message.error('获取列表错误');
                }
                cb(res.data.map(v => {
                    v.value = v.title;
                    v.address = v.id;
                    return v;
                }));
            }).catch(e => {
                console.log(e);
            });
        },
        handleAdd() {
            this.saleList.unshift({
                ...this.emptySaleInfo
            });
        },
        getSaleList() {
            this.loading = true;
            getSaleList({
                pn: this.pn - 1,
                rn: this.rn,
            }).then((res) => {
                if (res.code !== 0) {
                    return this.$message.error('获取列表错误');
                }
                this.total = res.total || 0;
                this.saleList = res.data.map(v => {
                    v.isEdit = false;
                    return v;
                });
                this.loading = false;
            });
        }
    },
};
</script>

<style lang="stylus" scoped>
.sale-list-wrap
    position relative
    padding-top 80px
    .add-btn
        position absolute
        right 20px
        top 20px
        margin-top 20px
    .pagination-container
        text-align center
</style>