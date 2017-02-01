<template>
	<div class="page">
		<div class="articleHead">
			<h1 v-text="mess.article_title" class="articleTitle"></h1>
			<p class="articleTime" v-text="mess.article_time"></p>
		</div>
		<div class="articleContent">
			<p v-html="mess.article_content"></p>
		</div>
		<div class="pl">
			<!-- 留言列表组件 -->
			<!-- <messageList ref="list"></messageList> -->
		</div>
		<!-- 加载指示器 -->
		<div class="loading" v-show="loading">
			<img src="/static/img/loading.gif" alt="">
		</div>
	</div>
</template>
<script>
var url1 = 'http://www.zlxblog.cn/php1/';
// import messageList from './messageList.vue'
	export default {
		name:'article',
		data () {
			return {
				mess:{},
				id:'',
				loading:true,
			}
		},
		created:function(){
			var id = this.$route.query.id;
			this.id = id;
			this.$http.post(url1+'zlx.php/Index/xq',{'id':id},{emulateJSON:true}).then(
		            function (data) {
		                // 处理成功的结果
		                // console.log(data);
		               this.mess =  data.data;
		                this.loading = false;
		            },function (res) {
		            // 处理失败的结果
		            }
		        );
		},
		components:{
			// messageList,
		}
	}
</script>
<style>

.articleHead{
	text-align: center;
	padding:5em 0;
	background-image: url(/static/img/point.png);
}
.articleTitle{
	font-size: 3em;
	color:#333;
}
.articleTime{
	font-size: 1.4em;
}
.articleContent{
	padding:0 5%;
}
.articleContent p{
	font-size: 1.8em;
}
.articleContent img{
	max-width: 100%;
}

.pl{
	margin-top: 2em;
	border-top: 1px solid #eee;
	padding:0 5%;
}
.pl:after{
	content: '';
	height:0;
	display: block;
	visibility: hidden;
	clear:both;
}
@media screen and (max-width: 780px) {
 	.articleContent p img[title]{
 		width: 100%;
 	}

}
</style>