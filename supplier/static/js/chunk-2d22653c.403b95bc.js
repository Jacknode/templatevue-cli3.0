(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22653c"],{e7d8:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.lawyerInfo}},[n("el-table-column",{attrs:{align:"center",prop:"lawfirm",label:"律师事务所"}}),n("el-table-column",{attrs:{align:"center",prop:"industry_cn",label:"行业"}}),n("el-table-column",{attrs:{align:"center",prop:"sex",label:"性别"}}),n("el-table-column",{attrs:{align:"center",prop:"email",label:"邮箱"}})],1)],1)},l=[],r={data:function(){return{userInfo:{},lawyerInfo:[]}},created:function(){this.userInfo=JSON.parse(sessionStorage.getItem("userInfo")),this.initData()},methods:{initData:function(){var e=this,t=new FormData;t.append("uid",this.userInfo.uid),t.append("token",this.userInfo.token),this.$store.dispatch("myPersonal",t).then(function(t){console.log(t),e.lawyerInfo=[t.data]})}}},o=r,s=n("2877"),i=Object(s["a"])(o,a,l,!1,null,null,null);t["default"]=i.exports}}]);