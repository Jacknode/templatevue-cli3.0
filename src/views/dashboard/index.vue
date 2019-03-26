<template>
    <div class="dashboard-container">
        <div class="dashboard-text">欢迎您: {{userInfo.data.username}}</div>
        <!--<div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'dashboard',
        data() {
            return {
                userInfo: {}
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
                        console.log(data, 123)
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
