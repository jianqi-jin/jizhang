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
            <el-col :span="8">余额</el-col>
            <el-col :span="16">{{userInfo.amount}}</el-col>
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
        <el-button class="btn" type="primary" @click="toEdit">编辑</el-button>
    </div>
    <div id="echart" class="chart-contain"></div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import * as echart from 'echarts';
import {loginOut, getChartList} from '@/request/request';
export default {
    data() {
        return {
            chart: {},
            legend: []
        }
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        ...mapActions(['getUserInfo']),
        toEdit() {
            this.$router.push('/user/edit');
        },
        async loginOut() {
            await loginOut();
            this.$router.push('/user/login');
        },
        async getChartList() {
            const {code, msg, data} = await getChartList();
            if (code !== 0) {
                return this.$message.error(msg);
            }
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
            this.chart = echart.init(document.getElementById('echart'));
            this.chart.setOption(this.option);
        },
        chartResize() {
            this.chart.resize && this.chart.resize();
        }
    },
    mounted() {
        this.getUserInfo();
        this.getChartList();
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
</style>