<template>
<div class="index">
	<div class="headDiv">
		<img src="/static/img/head.jpg" alt="" class="myImg">
		<h1>我是赵林肖</h1>
		<p>前端开发工程师</p>
		<p>热爱前端,追求完美,享受编程</p>
	</div>
	<div class="indexContent">
		<p>这个小站主要用于记录我在工作中遇到的各种问题,踩过的各种坑,以及解决这些问题的办法.和我的一些总结.供我自己翻阅</p>
		<p></p>
	</div>
</div>
</template>
<script>
	export default {
		name:'index',
		data: function() {
			return {

			}
		},
	}
</script>
<style scoped>
.index{
	
}
.headDiv{
	height: 30em;
	background-image: url(/static/img/point.png);
	text-align: center;
}
.headDiv .myImg{
	width: 14em;
	height: 14em;
	border-radius: 50%;
	margin-top: 5em;
}
.headDiv p{
	font-size: 1.8em;
	margin:.5em 0 .5em 0;
}
.indexContent{
	padding:0 5%;
	font-size: 16px;
	min-height:500px;
}
</style>