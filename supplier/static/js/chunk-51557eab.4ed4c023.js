(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51557eab"],{1660:function(t,e,i){},e763:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-form",{ref:"form",attrs:{model:t.addOptions,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"分类:"}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.addOptions.type,callback:function(e){t.$set(t.addOptions,"type",e)},expression:"addOptions.type"}},t._l(t.optionsList,function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}),1)],1),i("el-form-item",{attrs:{label:"标题:"}},[i("el-input",{attrs:{placeholder:"请输入"},model:{value:t.addOptions.title,callback:function(e){t.$set(t.addOptions,"title",e)},expression:"addOptions.title"}})],1),i("el-form-item",{attrs:{label:"描述:"}},[i("el-input",{attrs:{placeholder:"请输入"},model:{value:t.addOptions.describe,callback:function(e){t.$set(t.addOptions,"describe",e)},expression:"addOptions.describe"}})],1),i("el-form-item",{attrs:{label:"封面图上传:"}},[i("input",{attrs:{type:"file",name:"thumbnail",accept:"image/jpeg,image/x-png,image/gif",value:""},on:{change:t.fileImage}}),i("img",{attrs:{src:"",alt:""}}),i("span",{staticClass:"limit"},[t._v("* 图片大小不能超过300KB")])]),i("el-form-item",{attrs:{label:"视频上传:"}},[i("el-input",{staticStyle:{width:"60%","padding-right":"10px"},attrs:{placeholder:"请填写视频地址"},model:{value:t.videos,callback:function(e){t.videos=e},expression:"videos"}}),i("span",{staticClass:"limit"},[t._v("* 请转换成MP4的线上视频播放地址")])],1)],1),i("span",{staticClass:"dialog-footer",staticStyle:{"margin-left":"40%"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{staticStyle:{"margin-right":"50px"},attrs:{type:"warning"},on:{click:function(e){return t.$router.go(-1)}}},[t._v("返 回")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.uploadVideo()}}},[t._v("提 交")])],1)],1)},a=[],n=(i("28a5"),i("a481"),{data:function(){return{videos:"",thumbnail:"",optionsList:[],userInfo:{},addOptions:{uid:"",token:"",type:"",title:"",describe:"",content:""}}},created:function(){for(var t in this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")),this.addOptions)this.addOptions[t]="";this.addOptions.uid=this.userInfo.uid,this.addOptions.token=this.userInfo.token,this.getArticleClass()},methods:{fileImage:function(t){var e=t.target.files[0];this.thumbnail=e,console.log(e)},uploadVideo:function(){var t=this,e=new FormData;e.append("type",this.addOptions.type),e.append("title",this.addOptions.title),e.append("describe",this.addOptions.describe),e.append("thumbnail",this.thumbnail),e.append("path",this.videos),e.append("token",this.addOptions.token),e.append("uid",this.addOptions.uid),this.$store.dispatch("uploadVideo",e).then(function(e){t.$message({message:e,type:"success"}),t.$router.push({name:"videoEdit"})},function(e){t.$message({message:e,type:"error"})})},addSubmit:function(){var t=this,e=new FormData;e.append("type",this.addOptions.type),e.append("title",this.addOptions.title),e.append("describe",this.addOptions.describe),e.append("content",this.addOptions.content),e.append("uid",this.addOptions.uid),e.append("token",this.addOptions.token),this.$store.dispatch("articleEdit",e).then(function(e){t.$message({message:e,type:"success"}),t.$router.push({name:"articleEdit"})},function(e){t.$message({message:e,type:"error"})})},getArticleClass:function(){var t=this,e=new FormData;e.append("uid",this.addOptions.uid),e.append("token",this.addOptions.token),this.$store.dispatch("articleClass",e).then(function(e){for(var i=e.info.replace(/<[^<>]+>/g,""),s=i.trim().split(" "),a=0;a<s.length;a++)t.optionsList.push({value:a+1,label:s[a]})})}}}),o=n,d=(i("f576"),i("2877")),l=Object(d["a"])(o,s,a,!1,null,null,null);e["default"]=l.exports},f576:function(t,e,i){"use strict";var s=i("1660"),a=i.n(s);a.a}}]);