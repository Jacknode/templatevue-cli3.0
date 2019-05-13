<template>
    <div>
        <div class="title">
            <span>视频发布</span>
        </div>
        <p>
            <el-button type="primary" @click="Add()">添 加</el-button>
        </p>
        <!-- 数据展示 -->

        <el-table :data="wordList" style="width: 100%;" :highlight-current-row="true">
            <el-table-column prop="title" label="标题" fixed width="200" align="center">
            </el-table-column>
            <el-table-column prop="type_cn" label="类型" width="50" align="center">
            </el-table-column>
            <!--<el-table-column prop="describe" label="描述">-->
            <!--</el-table-column>-->
            <el-table-column prop="content" label="内容" align="center">
                <template slot-scope="scope">
                    <div v-html="scope.row.content" id="contentP"
                         style="max-height:70px;-webkit-box-orient: vertical;
                         overflow: hidden;text-overflow:ellipsis;width:100%;-webkit-line-clamp:3;display: -webkit-box;"></div>
                </template>
            </el-table-column>
            <el-table-column label="发表时间" width="100" align="center">
                <template slot-scope="scope">
                    {{scope.row.add_time*1000 | getAddTime}}
                </template>
            </el-table-column>
            <el-table-column label="审核状态" width="80" align="center">
                <template slot-scope="scope">
                    <span class="HavePassed2" v-if="scope.row.review_status==0">待审核</span>
                    <span class="HavePassed" v-else-if="scope.row.review_status==1">已通过</span>
                    <span class="HavePassed3" v-else-if="scope.row.review_status==2">
                        已驳回
                        <i class="Reject">{{scope.row.reason}}</i>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click.stop="searchDetails(scope.row.id)">详 情</el-button>
                    <el-button size="mini" @click.stop="Update(scope.row)" type="warning">修 改</el-button>
                    <el-button size="mini" type="danger" @click="getId(scope.row.id)">删 除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block" style="text-align: right;margin-top: 20px;">
            <el-pagination background :page-size="10" layout="total, prev, pager, next" :total="total" v-show='total'
                           @current-change="changePage">
            </el-pagination>
        </div>

        <!-- 文章详情 -->
        <el-dialog title="文章详情" :visible.sync="addDialog" :close-on-click-modal="false" width="60%">
            <el-form ref="form" :model="addOptions" label-width="60px" class="detailsList">
                <el-form-item label="分类:">
                    <div class="details"  style="min-height:40px;">{{articleDetails.type_cn}}</div>
                </el-form-item>
                <el-form-item label="标题:">
                    <div class="details">{{articleDetails.title}}</div>
                </el-form-item>
                <el-form-item label="描述:">
                    <div class="details">{{articleDetails.describe}}</div>
                </el-form-item>

                <el-form-item label="内容:">
                    <template slot-scope="scope">
                        <div v-html="articleDetails.content" class="details"></div>
                    </template>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--删除确定-->
        <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" :close-on-click-modal="false">
            <span>是否确定删除？</span>
            <span slot="footer" class="dialog-footer">
				<el-button @click="deleteDialog = false">取 消</el-button>
				<el-button type="primary" @click.stop="deleteData(deleteId)">确 定</el-button>
			</span>
        </el-dialog>


    </div>
</template>

<script>
    import {
        deepClone
    } from '@/assets/js/public'

    export default {
        data() {
            return {
                articleDetails: {},//文章详情数据
                deleteId: '',
                userInfo: {},
                lawyerInfo: [],
                addDialog: false,
                deleteDialog: false,
                addOptions: {
                    uid: '',
                    token: '',
                    type: '',
                    title: '',
                    describe: '',
                    content: '',
                },
                total: 0,
                wordList: [],
                optionsList: [],
                updateObj: {},
                pageNum: 1,
            }
        },
        mounted() {
            // 实例化editor编辑器
        },
        created() {
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            this.addOptions.uid = this.userInfo.uid;
            this.addOptions.token = this.userInfo.token;
            this.initData();
        },
        methods: {
            //分页
            changePage(num) {
                this.pageNum = num;
                this.initData();
            },
            initData() {
                let formData = new FormData();
                formData.append('uid', this.userInfo.uid);
                formData.append('token', this.userInfo.token);
                // formData.append('type', this.userInfo.type);
                formData.append('page', this.pageNum);
                formData.append('count', 10);
                this.$store.dispatch('articleList', formData) //获取列表数据
                    .then(data => {
                        this.total = Number(data.count);
                        this.wordList = data.list;
                    }, err => {
                        this.$message({
                            message: err,
                            type: 'error'
                        })
                    })
            },
            //添加
            Add() {
                this.$router.push({name: 'aloneArticleEdit'})
            },
            //添加提交
            addSubmit() {
                let formData = new FormData();
                formData.append('uid', this.addOptions.uid);
                formData.append('token', this.addOptions.token);
                formData.append('type', this.addOptions.type);
                formData.append('title', this.addOptions.title);
                formData.append('describe', this.addOptions.describe);
                formData.append('content', this.addOptions.content);
                this.$store.dispatch('articleEdit', formData)
                    .then(suc => {
                        this.$message({
                            message: suc,
                            type: 'success'
                        })
                        this.addDialog = false;
                        this.initData();
                    }, err => {
                        this.$message({
                            message: err,
                            type: 'error'
                        })
                        // this.addDialog = false;
                    })
            },
            //查看详情
            searchDetails(row) {
                let formData = new FormData();
                formData.append('uid', this.addOptions.uid);
                formData.append('token', this.addOptions.token);
                formData.append('id', row);
                this.$store.dispatch('articleDetails', formData)
                    .then(data => {
                        this.articleDetails = data;
                        this.addDialog = true;
                        // detailsDialog = true;
                    }, err => {

                    })
            },
            //修改
            Update(obj) {
                this.$router.push({name: 'Updata'})
                this.$store.commit('setPersonalInfo', obj);
                sessionStorage.setItem('initInfo', JSON.stringify(obj));
                // this.updateObj = deepClone(obj);
            },
            //删除
            deleteData(id) {
                let formData = new FormData();
                formData.append('uid', this.addOptions.uid);
                formData.append('token', this.addOptions.token);
                formData.append('id', id);
                this.$store.dispatch('deleteData', formData).then(data => {
                        this.$message({
                            message: data.message,
                            type: 'success'
                        })
                        this.initData();
                        this.deleteDialog = false;
                    }, err => {
                        this.$message({
                            message:err,
                            type:'warning'
                        })
                    }
                )
            },
            //获取ID删除
            getId(id) {
                console.log(id)
                this.deleteId = id;
                this.deleteDialog = true;
            },
        }
    }
</script>

<style scoped>
    .title{
        font-size:22px;
    }
    .detailsList .details {
        border: 1px solid #ddd;
        padding: 0 20px;
        border-radius: 4px;
        box-shadow: 1px 1px 35px 0 #ddd;
    }
    .HavePassed{
        color:green;
        font-weight:bold;
    }
    .HavePassed2{
        color:#97a8be;
        font-weight:bold;
    }
    .HavePassed3{
        color:red;
        font-weight:bold;
    }
    .HavePassed3 .Reject {
        font-style: normal;
        color: #97a8be;
    }
</style>
