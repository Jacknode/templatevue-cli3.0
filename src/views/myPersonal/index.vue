<template>
	<div>
		<el-table
      :data="lawyerInfo"
      style="width: 100%">
      <el-table-column
		align='center'
        prop="lawfirm"
        label="律师事务所">
      </el-table-column>
      <el-table-column
	  align='center'
        prop="industry_cn"
        label="行业">
      </el-table-column>

	  <el-table-column
	  align='center'
	    prop="sexs"
	    label="性别">
	  </el-table-column>
      <el-table-column
	  align='center'
        prop="email"
        label="邮箱">
      </el-table-column>
    </el-table>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:{},
				lawyerInfo:[],
			}
		},
		created(){
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			this.initData();
		},
		methods:{
			initData(){
				let formData =new FormData();
				formData.append('uid',this.userInfo.uid);
				formData.append('token',this.userInfo.token);
				this.$store.dispatch('myPersonal',formData)
				.then(data=>{
					if(data.data.sex==0){
						data.data.sexs='男'
					}else{
						data.data.sexs='女'
					}
					console.log(data)
					this.lawyerInfo=[data.data];
				})
			}
		}
	}

</script>

<style>
</style>
