<template>
	<div>
		<el-form ref="form" :model="initInfo" label-width="60px">
			<el-form-item label="分类:">
				<el-select v-model="initInfo.type_cn" :placeholder="initInfo.type_cn">
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

			<el-form-item label="内容:">
				<vue-ueditor-wrap v-model="initInfo.content" :config="myConfig"></vue-ueditor-wrap>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer" style="margin-left:40%;">
			 <el-button @click="$router.go(-1)" type="warning" style="margin-right:50px;">返 回</el-button>
			<el-button type="primary" @click="UpdataEdit()">提 交</el-button>
		</span>
		<!-- <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap> -->
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
	import {mapGetters} from 'vuex'//导出
	export default {
		data() {
			return {
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
				content: '',
				myConfig: {
					// 编辑器不自动被内容撑高
					autoHeightEnabled: false,
					// 初始容器高度
					initialFrameHeight: 540,
					// 初始容器宽度
					initialFrameWidth: '100%',
					// 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
					// serverUrl: 'http://35.201.165.105:8000/controller.php',
					// UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
					UEDITOR_HOME_URL: '/UEditor/'
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
		components: {
			VueUeditorWrap
		},
		methods: {
			//添加提交
			UpdataEdit() {
				let formData = new FormData();
				formData.append('uid', this.addOptions.uid);
				formData.append('token', this.addOptions.token );
				formData.append('id', this.initInfo.id);
				formData.append('title', this.initInfo.title);
				formData.append('describe', this.initInfo.describe);
				formData.append('content', this.initInfo.content);
				this.$store.dispatch('UpdataEdit', formData)
						.then(suc => {
							this.$message({
								message:suc,
								type:'success'
							})
							this.$router.push({name:'articleEditIndex'});
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
							value: i,
							label: arry[i]
						})
					}
				})
			},
		},
	}
</script>

<style>
</style>
