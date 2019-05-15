<template>
	<div>
		<el-form ref="form" :model="initInfo" label-width="90px">
			<el-form-item label="分类:">
				<el-select v-model="addOptions.type" :placeholder="initInfo.type_cn">
					<el-option v-for="item in optionsList" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标题:">
				<el-input v-model="initInfo.title" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="描述:">
				<el-input v-model="initInfo.describe" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="封面图上传:">
				<input @change="fileImage" type="file" name="thumbnail" accept="image/jpeg,image/x-png,image/gif" value=""/>
				<div class="ImgShow">
					<img :src="initInfo.thumbnail" alt="">
				</div>
			</el-form-item>
			<el-form-item label="视频上传:">
				<el-input v-model="initInfo.path" placeholder="请输入地址"></el-input>
			</el-form-item>

		</el-form>
		<span slot="footer" class="dialog-footer" style="margin-left:40%;">
			 <el-button @click.stop="$router.go(-1)" type="warning" style="margin-right:50px;">返 回</el-button>
			<el-button type="primary" @click.top="uploadVideo(initInfo)">提 交</el-button>
		</span>
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
	import {mapGetters} from 'vuex'//导出
	export default {
		data() {
			return {
				ImgShow:'',
				thumbnail:'',
				initInfo:{},
				optionsList: [],
				userInfo: {},
				addOptions: {
					uid: '',
					token: '',
					type: '',
					title: '',
					describe: '',
					content: '',
				},
			}
		},
		computed: mapGetters([
			'modify',//把数据从getters拿过来
		]),
		created() {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			this.addOptions.uid = this.userInfo.uid;
			this.addOptions.token = this.userInfo.token;
			// this.initInfo=this.modify;
			if(this.modify.uid){
				this.initInfo=this.modify;
			}else{
				this.initInfo=JSON.parse(sessionStorage.getItem('initInfo'));
			}
			// this.initInfo=JSON.parse(sessionStorage.getItem('initInfo'));
			this.getArticleClass();
		},
		methods: {
			fileImage(e) {
				var file = e.target.files[0];
				this.thumbnail = file;
				// console.log(file)
			},
			//添加提交
			uploadVideo(initInfo) {
				let formData = new FormData();
				formData.append('uid', this.addOptions.uid);
				formData.append('token', this.addOptions.token );
				formData.append('id', this.initInfo.id);
				formData.append('title', this.initInfo.title);
				formData.append('describe', this.initInfo.describe);
				formData.append('thumbnail', this.thumbnail);
				formData.append('path', this.initInfo.path);
				formData.append('type', initInfo.type);
				this.$store.dispatch('UpdataVideo', formData)
						.then(suc => {
							this.$message({
								message:suc,
								type:'success'
							})
							this.$router.push({name:'videoEditIndex'});
						}, err => {
							this.$message({
								message: err,
								type: 'error'
							})
							// this.addDialog = false;
						})
			},
			//文章分类数据获取
			getArticleClass() {
				let formData = new FormData();
				formData.append('uid', this.addOptions.uid);
				formData.append('token', this.addOptions.token);
				this.$store.dispatch('articleClass', formData).then(data => {
					// var re = new RegExp('<[^<>]+>','g');
					// var text = html_str.replace(re ,"");
					var text = data.info.replace(/<[^<>]+>/g, ""); //截取JSON标签里的内容
					// console.log(text.trim())去掉首尾空格
					let arry = (text.trim()).split(' ');
					for (let i = 0; i < arry.length; i++) {
						this.optionsList.push({
							value: i+1,
							label: arry[i]
						})
					}
				})
			},
		},
	}
</script>

<style>
	.ImgShow{
		width:300px;
	}
	.ImgShow img{
		width:100%;
	}
</style>
