(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c39ff76"],{"1b1d":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),i("p",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.Add()}}},[t._v("添 加")])],1),i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.wordList,"highlight-current-row":!0}},[i("el-table-column",{attrs:{prop:"title",label:"标题",fixed:"",width:"200",align:"center"}}),i("el-table-column",{attrs:{prop:"type_cn",label:"类型",width:"50",align:"center"}}),i("el-table-column",{attrs:{prop:"content",label:"内容",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticStyle:{"max-height":"70px","-webkit-box-orient":"vertical",overflow:"hidden","text-overflow":"ellipsis",width:"100%","-webkit-line-clamp":"3",display:"-webkit-box"},attrs:{id:"contentP"},domProps:{innerHTML:t._s(e.row.content)}})]}}])}),i("el-table-column",{attrs:{label:"发表时间",width:"100",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                    "+t._s(t._f("getAddTime")(1e3*e.row.add_time))+"\n                ")]}}])}),i("el-table-column",{attrs:{label:"审核状态",width:"80",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.review_status?i("span",{staticClass:"HavePassed2"},[t._v("待审核")]):1==e.row.review_status?i("span",{staticClass:"HavePassed"},[t._v("已通过")]):2==e.row.review_status?i("span",{staticClass:"HavePassed3"},[t._v("\n                        已驳回\n                        "),i("i",{staticClass:"Reject"},[t._v(t._s(e.row.reason))])]):t._e()]}}])}),i("el-table-column",{attrs:{label:"操作",width:"260",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(i){return i.stopPropagation(),t.searchDetails(e.row.id)}}},[t._v("详 情")]),i("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(i){return i.stopPropagation(),t.Update(e.row)}}},[t._v("修 改")]),i("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(i){return t.getId(e.row.id)}}},[t._v("删 除")])]}}])})],1),i("div",{staticClass:"block",staticStyle:{"text-align":"right","margin-top":"20px"}},[i("el-pagination",{directives:[{name:"show",rawName:"v-show",value:t.total,expression:"total"}],attrs:{background:"","page-size":10,layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.changePage}})],1),i("el-dialog",{attrs:{title:"文章详情",visible:t.addDialog,"close-on-click-modal":!1,width:"60%"},on:{"update:visible":function(e){t.addDialog=e}}},[i("el-form",{ref:"form",staticClass:"detailsList",attrs:{model:t.addOptions,"label-width":"60px"}},[i("el-form-item",{attrs:{label:"分类:"}},[i("div",{staticClass:"details",staticStyle:{"min-height":"40px"}},[t._v(t._s(t.articleDetails.type_cn))])]),i("el-form-item",{attrs:{label:"标题:"}},[i("div",{staticClass:"details"},[t._v(t._s(t.articleDetails.title))])]),i("el-form-item",{attrs:{label:"描述:"}},[i("div",{staticClass:"details"},[t._v(t._s(t.articleDetails.describe))])]),i("el-form-item",{attrs:{label:"内容:"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("div",{staticClass:"details",domProps:{innerHTML:t._s(t.articleDetails.content)}})]}}])})],1)],1),i("el-dialog",{attrs:{title:"提示",visible:t.deleteDialog,width:"30%","close-on-click-modal":!1},on:{"update:visible":function(e){t.deleteDialog=e}}},[i("span",[t._v("是否确定删除？")]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:function(e){return e.stopPropagation(),t.deleteData(t.deleteId)}}},[t._v("确 定")])],1)])],1)},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"title"},[i("span",[t._v("视频发布")])])}],s=i("f499"),o=i.n(s),l=(i("c5f6"),i("466f"),{data:function(){return{articleDetails:{},deleteId:"",userInfo:{},lawyerInfo:[],addDialog:!1,deleteDialog:!1,addOptions:{uid:"",token:"",type:"",title:"",describe:"",content:""},total:0,wordList:[],optionsList:[],updateObj:{},pageNum:1}},mounted:function(){},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")),this.addOptions.uid=this.userInfo.uid,this.addOptions.token=this.userInfo.token,this.initData()},methods:{changePage:function(t){this.pageNum=t,this.initData()},initData:function(){var t=this,e=new FormData;e.append("uid",this.userInfo.uid),e.append("token",this.userInfo.token),e.append("page",this.pageNum),e.append("count",10),this.$store.dispatch("articleList",e).then(function(e){t.total=Number(e.count),t.wordList=e.list},function(e){t.$message({message:e,type:"error"})})},Add:function(){this.$router.push({name:"aloneVideoEdit"})},addSubmit:function(){var t=this,e=new FormData;e.append("uid",this.addOptions.uid),e.append("token",this.addOptions.token),e.append("type",this.addOptions.type),e.append("title",this.addOptions.title),e.append("describe",this.addOptions.describe),e.append("content",this.addOptions.content),this.$store.dispatch("articleEdit",e).then(function(e){t.$message({message:e,type:"success"}),t.addDialog=!1,t.initData()},function(e){t.$message({message:e,type:"error"})})},searchDetails:function(t){var e=this,i=new FormData;i.append("uid",this.addOptions.uid),i.append("token",this.addOptions.token),i.append("id",t),this.$store.dispatch("articleDetails",i).then(function(t){e.articleDetails=t,e.addDialog=!0},function(t){})},Update:function(t){this.$router.push({name:"Updata"}),this.$store.commit("setPersonalInfo",t),sessionStorage.setItem("initInfo",o()(t))},deleteData:function(t){var e=this,i=new FormData;i.append("uid",this.addOptions.uid),i.append("token",this.addOptions.token),i.append("id",t),this.$store.dispatch("deleteData",i).then(function(t){e.$message({message:t.message,type:"success"}),e.initData(),e.deleteDialog=!1},function(t){e.$message({message:t,type:"warning"})})},getId:function(t){console.log(t),this.deleteId=t,this.deleteDialog=!0}}}),d=l,r=(i("ff5f"),i("2877")),c=Object(r["a"])(d,a,n,!1,null,"52409b66",null);e["default"]=c.exports},"77ac":function(t,e,i){},ff5f:function(t,e,i){"use strict";var a=i("77ac"),n=i.n(a);n.a}}]);