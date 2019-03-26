<template>
    <div>
        <div class="title">
            <span>文章发布</span>
        </div>
        <p>
            <el-button type="primary" @click="Add">添 加</el-button>
        </p>
        <!-- 数据展示 -->

        <el-table :data="wordList" style="width: 100%">
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="type_cn" label="类型">
            </el-table-column>
            <el-table-column prop="content" label="内容">
            </el-table-column>
            <el-table-column label="发表时间">
                <template slot-scope="scope">
                    {{scope.row.add_time*1000 | getAddTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click.stop="searchDetails(scope.row.id)">详 情</el-button>
                    <el-button size="mini" @click.stop="Update(scope.row)">修 改</el-button>
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

        <!-- 添加 -->
        <el-dialog title="添加文章" :visible.sync="addDialog" :close-on-click-modal="false" width="700px">


            <el-form ref="form" :model="addOptions" label-width="120px">
                <el-form-item label="分类:">
                    <el-select v-model="addOptions.type" placeholder="请选择">
                        <el-option v-for="item in optionsList" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题:">
                    <el-input v-model="addOptions.title" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input v-model="addOptions.describe" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="内容:">
                    <el-input v-model="addOptions.content" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="addSubmit()">确 定</el-button>
			</span>
        </el-dialog>


        <!--删除-->
        <el-dialog
                title="提示"
                :visible.sync="deleteDialog"
                width="30%"
                :close-on-click-modal="false"
        >
            <span>是否确定删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary"  @click.stop="deleteData(deleteId)">确 定</el-button>
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
                deleteId:'',
                userInfo: {},
                lawyerInfo: [],
                addDialog: false,
                deleteDialog:false,
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
        created() {
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            this.initData();
            this.addOptions.uid = this.userInfo.uid;
            this.addOptions.token = this.userInfo.token;
            this.getArticleClass();
            console.log(this.optionsList)
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
                formData.append('type', this.userInfo.type);
                formData.append('page', this.pageNum);
                formData.append('count', 10);
                this.$store.dispatch('articleList', formData)//获取列表数据
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
                for (let attr in this.addOptions) {
                    this.addOptions[attr] = '';
                }
                this.addOptions.uid = this.userInfo.uid;
                this.addOptions.token = this.userInfo.token;
                this.addDialog = true;
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
                        console.log(data)
                        // detailsDialog = true;
                    }, err => {

                    })
            },
            //修改
            Update(obj) {
                console.log(obj)
                this.updateObj = deepClone(obj);
            },
            //删除
            deleteData(id) {
                let formData = new FormData();
                formData.append('uid', this.addOptions.uid);
                formData.append('token', this.addOptions.token);
                formData.append('id', id);
                this.$store.dispatch('deleteData', formData).then(data => {
                    console.log(data)
                    this.$message({
                        message: data.message,
                        type: 'warning'
                    })
                })
                this.deleteDialog=false;
            },
            //获取ID删除
            getId(id){
                this.deleteId=id;
                this.deleteDialog = true;
            },
            //文章分类数据获取
            getArticleClass() {
                let formData = new FormData();
                formData.append('uid', this.addOptions.uid);
                formData.append('token', this.addOptions.token);
                this.$store.dispatch('articleClass', formData).then(data => {
                    // var re = new RegExp('<[^<>]+>','g');
                    // var text = html_str.replace(re ,"");
                    var text = data.info.replace(/<[^<>]+>/g, "");//截取JSON标签里的内容
                    // console.log(text.trim())去掉首尾空格
                    let arry = (text.trim()).split(' ');
                    for (let i = 0; i < arry.length; i++) {
                        this.optionsList[i] = {
                            value: i,
                            label: arry[i]
                        }
                    }
                })
            },


        }
    }
</script>

<style>


</style>
