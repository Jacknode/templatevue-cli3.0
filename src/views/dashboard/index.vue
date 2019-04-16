<template>
    <div>
        <div class="dashboard-container">
            <div class="dashboard-text">欢迎您: {{userInfo.data.username}}</div>
            <!--<div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
            <!--<ve-pie :data="chartData"></ve-pie>-->
            <ve-pie :data="chartData"></ve-pie>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    // import vePie from 'v-charts/lib/pie.common'

    export default {
        name: 'dashboard',
        // components: {
        //     vePie
        // },
        data() {
            return {
                userInfo: {},
                data:{},
                chartData: {
                    columns: ['title', 'number'],
                    rows: [
                        // { '日期': '1/1', '访问用户': 1393 },
                        // { '日期': '1/2', '访问用户': 3530 },
                        // { '日期': '1/3', '访问用户': 2923 },
                        // { '日期': '1/4', '访问用户': 1723 },
                        // { '日期': '1/5', '访问用户': 3792 },
                        // { '日期': '1/6', '访问用户': 4593 }
                    ]
                }
            }
        },
        created() {
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            this.myProfit();

        },
        computed: {
            ...mapGetters([
                'name',
                'roles'
            ])
        },
        methods: {
            //个人收益
            myProfit() {
                let formData = new FormData();
                formData.append('uid', this.userInfo.uid);
                formData.append('token', this.userInfo.token);
                this.$store.dispatch('myProfit', formData)
                    .then(data => {
                        this.data=data.data;
                        this.chartData.rows=[
                            { 'title': '内容发布', 'number': data.data.contentcount },
                            { 'title': '获赞数量', 'number': data.data.laud },
                            { 'title': '订单数量', 'number': data.data.orders },
                            { 'title': '今日收益', 'number': data.data.profit },
                            { 'title': '历史问答数量', 'number': data.data.qas },
                            { 'title': '视频发布数量', 'number': data.data.videocount },
                            { 'title': '钱包信息', 'number': data.data.wallet }
                        ]
                        console.log(this.data)
                    })
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard {
        &-container {
            margin: 30px;
        }

        &-text {
            font-size: 30px;
            line-height: 46px;
        }
    }
</style>
