<template>
	<div>
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
				<vue-ueditor-wrap v-model="addOptions.content" :config="myConfig"></vue-ueditor-wrap>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<!-- <el-button @click="addDialog = false">取 消</el-button> -->
			<el-button type="primary" @click="addSubmit()" style="margin:auto;display:block;">提 交</el-button>
		</span>
		<!-- <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap> -->
	</div>
</template>

<script>
	import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
	import {mapGetters} from 'vuex'
	export default {
		computed: mapGetters([
		  'setPersonalInfo',//把数据从getters拿过来
		]),
		data() {
			return {
				updateObj: {},
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
		created() {
			// console.log(setPersonalInfo);
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			for (let attr in this.addOptions) {
				this.addOptions[attr] = '';
			}
			this.addOptions.uid = this.userInfo.uid;
			this.addOptions.token = this.userInfo.token;
			this.getArticleClass();
		},
		components: {
			VueUeditorWrap
		},
	}
</script>

<style>
</style>
