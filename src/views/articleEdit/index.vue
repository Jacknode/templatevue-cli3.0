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
			<el-table-column prop="content" label="内容">
			</el-table-column>
			<el-table-column label="发表时间">
				<template slot-scope="scope">
					{{scope.row.add_time | getAddTime}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="success" @click="searchDetails(scope.row.id)">详 情</el-button>
					<el-button size="mini" @click="Update(scope.row)">修 改</el-button>
					<el-button size="mini" type="danger">删 除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 分页 -->

		<div class="block" style="text-align: right;margin-top: 10px;">
			<el-pagination background :page-size="10" layout="total, prev, pager, next" :total="total" v-show='total' @current-change="changePage">
			</el-pagination>
		</div>

		<!-- 添加 -->
		<el-dialog title="添加文章" :visible.sync="addDialog" :close-on-click-modal="false" width="700px">


			<el-form ref="form" :model="addOptions" label-width="120px">
				<el-form-item label="分类:">
					<el-select v-model="addOptions.type" placeholder="请选择">
						<el-option v-for="item in optionsList" :key="item.value" :label="item.label" :value="item.value">
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
				<el-button type="primary" @click="addSubmit">确 定</el-button>
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
				userInfo: {},
				lawyerInfo: [],
				addDialog: false,
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
				optionsList: [{
						value: 0,
						label: '物权担保'
					},
					{
						value: 1,
						label: '治安刑事'
					},
					{
						value: 2,
						label: '诉讼仲裁'
					},
				],
				updateObj: {},
				pageNum: 1,
			}
		},
		created() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			this.initData();
		},
		methods: {
			//分页
			changePage(num) {
				this.pageNum = num;
				this.initData()
			},
			initData() {
				let formData = new FormData();
				formData.append('uid', this.userInfo.uid);
				formData.append('token', this.userInfo.token);
				formData.append('type', this.userInfo.type);
				formData.append('page', this.pageNum);
				formData.append('count', 10);
				this.$store.dispatch('articleList', formData)
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
				console.log(row)
				// 				
				// 				this.$store.dispatch('getDetails',formData)
				// 				.then(data=>{
				// 					...
				// 					detailsDialog = true;
				// 				},err=>{
				// 					
				// 				})

			},
			//修改
			Update(obj) {
				this.updateObj = deepClone(obj);
			},
		}
	}
</script>

<style>
	.title {}
</style>
