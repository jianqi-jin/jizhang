<template>
<div class="usercenter-wrap">
    <el-button type="danger" @click="loginOut">退出登录</el-button>
    <div class="user-info-box">
        <el-row style="text-align: center;">
            <el-image
                class="user-icon"
                :src="userInfo.avatarurl || ''"
                fit="contain"
                :preview-src-list="[userInfo.avatarurl]"
            >
            </el-image>
        </el-row>
        <el-row>
            <el-col :span="8">账户</el-col>
            <el-col :span="16">{{userInfo.username}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">全部资产</el-col>
            <el-col :span="16">{{round(userInfo.amount + userInfo.fixed_amount)}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">简介</el-col>
            <el-col :span="16">{{userInfo.detail}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="8">注册时间</el-col>
            <el-col :span="16">{{new Date(userInfo.date).toLocaleString()}}</el-col>
        </el-row>
    </div>
    <div class="btn-bar">
        <el-button class="btn" type="primary" @click="toEdit">编辑个人资料</el-button>
    </div>
    <div class="amount-content">
        <div class="amount-box" @click="activeType = '-1'">
            <div class="amount-title">全部资产</div>
            <div class="amount-value-content">
                <span class="amount-value">
                    {{round(userInfo.amount + userInfo.fixed_amount)}}
                </span>元
            </div>
        </div>
        <div class="amount-box" @click="activeType = '0'">
            <div class="amount-title">移动资产</div>
            <div class="amount-value-content">
                <span class="amount-value">{{userInfo.amount}}</span>元
            </div>
        </div>
        <div class="amount-box" @click="activeType = '1'">
            <div class="amount-title">固定资产</div>
            <div class="amount-value-content">
                <span class="amount-value">{{userInfo.fixed_amount}}</span>元
            </div>
        </div>
    </div>
    <el-tabs v-model="activeType">
        <el-tab-pane label="全部资产" name="-1"></el-tab-pane>
        <el-tab-pane label="流动资产" name="0"></el-tab-pane>
        <el-tab-pane label="固定资产" name="1"></el-tab-pane>
    </el-tabs>
    <div id="echart" class="chart-contain"></div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as echart from 'echarts';
import {round} from '@/util/util';
import {loginOut, getChartList} from '@/request/request';
export default {
    data() {
        return {
            chart: {},
            legend: [],
            activeType: '-1'
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    watch: {
        activeType: {
            immediate: true,
            handler(v) {
                this.getChartList();
            }
        }
    },
    methods: {
        round,
        ...mapActions(['getUserInfo']),
        toEdit() {
            this.$router.push('/user/edit');
        },
        async loginOut() {
            await loginOut();
            this.$router.push('/user/login');
        },
        async getChartList() {
            const {code, msg, data} = await getChartList({type: +this.activeType});
            if (code !== 0) {
                return this.$message.error(msg);
            }
            data.list = data.list.filter(v => !v.data || v.data.length > 0);
            this.legend = data.list.map(v => v.channel);
            this.series = data.list.map(v => ({
                name: v.channel,
                type: 'line',
                stack: '',
                data: v.splitData
            }));
            this.xAxis = data.xAxis;
            this.makeChartOption();
        },
        makeChartOption() {
            this.option = {
                title: {
                    text: '收支折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: this.legend
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                dataZoom: {
                    type: 'slider',
                    show: true,
                    xAxis: [0]
                },
                series: this.series
            };
            this.chart.setOption(this.option, true);
        },
        chartResize() {
            this.chart.resize && this.chart.resize();
        }
    },
    mounted() {
        this.getUserInfo();
        this.getChartList();
        this.chart = echart.init(document.getElementById('echart'));
        window.addEventListener('resize', this.chartResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.chartResize);
    }
}
</script>

<style lang="stylus" scoped>
.usercenter-wrap
    padding 30px
    .user-info-box
        width 500px
        margin auto
        .user-icon
            cursor pointer
            margin auto
            border-radius 100%
            height 100px
            width 100px
            overflow hidden
            box-shadow 1px 1px 10px #ccc
    .btn-bar
        margin-top 20px
        text-align center
    .chart-contain
        width 100%
        height 400px
    .amount-content
        font-size 0
        text-align center
        .amount-box
            overflow hidden
            font-size 14px
            display inline-block
            border-radius 20px
            height 200px
            width 200px
            box-shadow 0px 0px 10px #ccc
            margin 20px 20px 0 0
            &:hover
                box-shadow 0px 0px 20px #ccc
            text-align center
            .amount-title
                margin-top 20px
            .amount-value-content
                margin-top 50px
                .amount-value
                    font-size 20px
                    font-weight 500

</style>