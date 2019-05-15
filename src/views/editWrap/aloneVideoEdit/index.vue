<template>
    <div>
        <el-form ref="form" :model="addOptions" label-width="90px">
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
            <el-form-item label="封面图上传:">
                <input @change="fileImage" type="file" name="thumbnail" accept="image/jpeg,image/x-png,image/gif" value=""/>
                <img src="" alt="">
                <span class="limit">* 图片大小不能超过300KB</span>
            </el-form-item>
            <el-form-item label="视频上传:">
                <!--<input @change="fileVideo" type="file" name="video" accept="audio/mp4,video/mp4" value=""/>-->
                <el-input v-model="videos" placeholder="请填写视频地址" style="width:60%;padding-right:10px;"></el-input>
                 <span class="limit">* 请转换成MP4的线上视频播放地址</span>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer" style="margin-left:40%;">
            <el-button @click="$router.go(-1)" type="warning" style="margin-right:50px;">返 回</el-button>
            <el-button type="primary" @click="uploadVideo()">提 交</el-button>
		</span>
        <!-- <vue-ueditor-wrap v-model="content" :config="myConfig"></vue-ueditor-wrap> -->
    </div>
</template>

<script>
    // import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
    export default {
        data() {
            return {
                videos: '',//视频
                thumbnail: '',//封面图
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
                // content: '',
                // myConfig: {
                //     // 编辑器不自动被内容撑高
                //     autoHeightEnabled: false,
                //     // 初始容器高度
                //     initialFrameHeight: 540,
                //     // 初始容器宽度
                //     initialFrameWidth: '100%',
                //     // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                //     // serverUrl: 'http://35.201.165.105:8000/controller.php',
                //     // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                //     UEDITOR_HOME_URL: '/UEditor/'
                //     ///supplier/
                // },
            }
        },
        created() {
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            for (let attr in this.addOptions) {
                this.addOptions[attr] = '';
            }
            this.addOptions.uid = this.userInfo.uid;
            this.addOptions.token = this.userInfo.token;
            this.getArticleClass();
        },
        // components: {
        //     VueUeditorWrap
        // },
        methods: {
            fileImage(e) {
                var file = e.target.files[0];
                this.thumbnail = file;
                console.log(file)
            },
            // fileVideo(e) {
            //     var file = e.target.files[0];
            //     this.videos = file;
            //     // console.log(file)
            // },
            //视频上传
            uploadVideo() {
                let formData = new FormData();
                formData.append('type', this.addOptions.type);
                formData.append('title', this.addOptions.title);
                formData.append('describe', this.addOptions.describe);
                formData.append('thumbnail', this.thumbnail);
                formData.append('path', this.videos);
                formData.append('token', this.addOptions.token);
                formData.append('uid', this.addOptions.uid);

                this.$store.dispatch('uploadVideo', formData)
                    .then(success => {
                        this.$message({
                            message:success,
                            type:'success'
                        })
                        this.$router.push({name: 'videoEdit'})
                    },err=>{
                        this.$message({
                            message:err,
                            type:'error'
                        })
                    })
            },
            //添加提交
            addSubmit() {
                let formData = new FormData();
                formData.append('type', this.addOptions.type);
                formData.append('title', this.addOptions.title);
                formData.append('describe', this.addOptions.describe);
                formData.append('content', this.addOptions.content);
                formData.append('uid', this.addOptions.uid);
                formData.append('token', this.addOptions.token);
                this.$store.dispatch('articleEdit', formData)
                    .then(suc => {
                        this.$message({
                            message: suc,
                            type: 'success'
                        });
                        this.$router.push({name: 'articleEdit'})
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
                            value: i + 1,
                            label: arry[i]
                        })
                    }
                    // this.optionsList.push(
                    // 		{value:1,label:'公司'},
                    // 		{value:2,label:'合同'},
                    // 		{value:114,label:'婚姻'},
                    // 		{value:115,label:'刑事'},
                    // )
                })
            },
        },
    }
</script>

<style>
    .el-dropdown {
        vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
    .limit{
        color:red;
    }
</style>
