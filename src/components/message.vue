<template>
	<div class="page">
		<div class="header">
			<h1 class="title"><i class="iconfont">&#xe6a3;</i> <span class="titleText">留个言吧</span></h1>
			<!-- 留言框组件 -->
			<inputArea v-on:changeListData="listChange"></inputArea>
		</div>
		<!-- 列表 -->
		<div class="showList">

			<!-- 留言列表组件 -->
			<messageList ref="list"></messageList>
			
			 
			<div class="rightNews">
				<img src="/static/img/cover.jpg" alt="">
			</div>
		</div>
	
	</div>
</template>
<script>

import messageList from './messageList.vue';
import inputArea from './inputArea.vue';
function setCookie(cookiename, cookievalue, hours) {
    var date = new Date();
    cookievalue=encodeURI(cookievalue);
    date.setTime(date.getTime() + Number(hours) * 3600 * 1000);
    document.cookie = cookiename + "=" + cookievalue + "; path=/;expires = " + date.toGMTString();
}
//取出指定name的cookie函数
function getCookie(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]==name)return decodeURI(arr[1]);
    }
    return "";
}
	export default {
		name:'message',
		data () {
			return {
				borderColor:false,
				name:'',//留言者名字
				textarea:'',//留言内容
				icon:1,//icon
				messages:[],//所有留言
			}
		},
		components:{
			messageList,
			inputArea,
		},
		methods:{
			listChange:function(){
				//触发list子组件自定义更新列表的事件
				this.$refs.list.$emit('change');
			}
		},
		created:function(){
			 console.log(this.$route.name);
		}
	}

// var bus = new Vue();//创建通信bus
</script>
<style scoped>

.header{
	text-align: center;
	height: 30em;
	width: 100%;
	background-image: url(/static/img/bghead.jpg);
	background-size: cover;
	padding-top: 5em;
}
#messageArea{
	width:100%;
	height: 80px;
	outline:none;
	border:1px solid #ddd;
	resize: none;
	border-radius: 3px;
	font-size: 20px;
	color:#000;
	font-family: Microsoft YaHei;
	float:right;
	margin-top: 20px;
	text-indent: 13px;
}
#messageArea:focus{
	border:1px solid #FF895D;
}
.title{
	margin-top: 0;
	color:#fff;
	font-size: 5em;
}
.titleText{
	font-size: 36px;
	font-weight: 500;
}
.defaultFace{
	font-size: 50px;
	cursor:pointer;
}


.showList{
	width: 100%;
	padding:40px 5% 20px 5%;
	background-image: url(/static/img/point.png);
}
.showList:after{
	content: '';
	height: 0;
	display: block;
	visibility: hidden;
	clear:both;
}
.lists{
	float:left;
	width: 70%;
}
.rightNews{
	float:right;
	width: 25%;
	background-color: #fff;
}
.rightNews img{
	width: 100%;
}

.list{
	background-color: #fff;
	border-bottom: 1px solid #eee;
}
.list:after{
	content: '';
	height: 0;
	display: block;
	visibility: hidden;
	clear:both;
}

.cont{
	float:left;
	width: 90%;
}
.pname,.pcont{
	font-size: 16px;
	color:#333;
	margin:10px 0;
}
.ptime{
	font-size: 14px;
	color:#d8d8d8;
}
.listHf{
	float:right;
	margin-right: 20px;
	font-size: 14px;
	cursor: pointer;
}
@media screen and (max-width: 780px) {
    .rightNews{
	display: none;
}
.lists{
	width: 100% !important;
}
}
</style>