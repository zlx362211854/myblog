<template>
	<div class="page">
		<div class="headImg">
			<div class="imgBox">
				<img src="../static/head.jpg" alt="">
				<p class="myMessage">赵林肖,前端码农</p>
			</div>
		</div>
		<div class="labels">
			<span class="labelSpan" @click="allArt"><i class="iconfont labelIcon">&#xe618;</i> 文章分类(全部) :</span>
			<span class="labelSpan" v-for="type in types" @click="change(type.type_id)">
				{{ type.type_name }} 
				<span class="numSpan">{{ type.count }}</span>
			</span>
		</div>
		<div class="cards">
			<div class="card" v-for="card in cards">
				<router-link :to="{path:'article',query: {id:card.article_id}}">
					<div class="cardImg" v-if="card.article_img!=''">
						<img :src="card.article_img" alt="">
					</div>
					<div class="cardTitle">
						<h4 v-text='card.article_title'></h4>
					</div>
					<div class="cardContent">
						<p v-text="card.article_ms"></p>
					</div>
					<div class="cardBottom">
						<p class="tags">
							<i class="iconfont">&#xe618;</i>
							<span class="tagNames" v-text="card.type_name"></span>
						</p>
						<p class="time" v-text="card.article_time"></p>
					</div>
				</router-link>
			</div>
		</div>
		<!-- 加载指示器 -->
		<div class="loading" v-show="loading">
			<img src="/static/img/loading.gif" alt="">
		</div>
	</div>
	
</template>
<script>
var url1 = 'http://www.zlxblog.cn/php1/';
	export default {
		name:'blogs',
		data () {
			return {
				cards:[],
				types:[],
				loading:true,
			}
		},
		created:function(){
			 // this.$emit('changeColor');
			this.$http.post(url1+'zlx.php/Index/index',{emulateJSON:true}).then(
		            function (data) {
		                // 处理成功的结果
		                // console.log(data);
		               this.cards =  data.data.article;
		               this.types = data.body.type;
		               this.loading = false;
		            },function (res) {
		            // 处理失败的结果
		            }
		        );
		},
		methods:{
			change:function(id){
				//点击分类
				if(id){
					this.$http.post(url1+'zlx.php/Index/index',{'id':id},{emulateJSON:true}).then(
			            function (data) {
			                // 处理成功的结果
			                // console.log(data);
			               this.cards =  data.data.article;
			               this.types = data.body.type;
			                
			            },function (res) {
			            // 处理失败的结果
			            }
			        );
		        }
			},
			allArt:function(){
				//点击全部
				this.$http.post(url1+'zlx.php/Index/index',{emulateJSON:true}).then(
			            function (data) {
			                // 处理成功的结果
			                // console.log(data);
			               this.cards =  data.data.article;
			               this.types = data.body.type;
			                
			            },function (res) {
			            // 处理失败的结果
			            }
			        );
			}
		}
	}
</script>
<style scoped>

/*headimg*/
.headImg{
	width: 100%;
	height: 20em;
	margin-bottom: 2em;
	text-align: center;
	 background: -webkit-linear-gradient(top left,  #78BBE6,#FF895D);
	 background: -o-linear-gradient(top left,  #78BBE6,#FF895D);
	 background: linear-gradient(to bottom right , #78B,#FF895D);
}
.myMessage{
	color:#606060;
	font-size: 1.8em;
	color:#fff;
}
.headImg img{
	width: 12em;
	height: 12em;
	border-radius: 50%;
	margin-top: 2em;
}
/*labels*/
.labels{
	width: 100%;
	padding:0 5%;
	margin-bottom:1rem;
}
.labels .labelIcon{
	font-size: 1.6em;
	color:#FF895D;
	margin-right: 1em;
}
.labels	.labelSpan{
	margin:0 1em;
	cursor:pointer;
	font-size: 1.4em;
}
.labels	.labelSpan:hover{
	color:#FF895D;
	transition:color .3s;
}
.numSpan{
	font-size: .8em;
	color:#A2A2A2;
}
/*cards*/
.cards{
	/*column-count:4;
	column-gap:20px;*/
	-webkit-column-count:4;
	-webkit-column-gap:20px;
	-moz-column-count:4;
	-moz-column-gap:20px;
	padding:0 5%;
	height: auto;
	column-span:none;
	-webkit-column-fill:auto;
	-moz-column-fill:balance;
	column-fill:auto;
}
.card{
	border:1px solid #ddd;
	margin-bottom:2em;
	cursor:pointer;
	height: auto;
	column-break-inside:avoid;
	-webkit-column-break-inside:avoid;
	-moz-column-break-inside:avoid;
}
@media screen and (max-width: 780px) {
    .card{
    	width: 100%;
    }
}
@media screen and (max-width: 780px) {
   .cards{
   	
   	-webkit-column-count:1;
   	-webkit-column-gap:20px;
   	-moz-column-count:4;
   	-moz-column-gap:20px;
   	padding:0 5%;
   	height: auto;
   	column-span:none;
   	-webkit-column-fill:auto;
   	-moz-column-fill:balance;
   	column-fill:auto;
   }
}
.card:hover{
	box-shadow: 0 0 10px #eee;
	transition:all .3s;
}
.card>div{
	padding:0 .5em;
}
.card>.cardImg{
	padding:0;
}
.cardImg img{
	width: 100%;
}
.tagNames{
	margin:0 .2em;
}
.tagNames:hover{
	color:#FF895D;
	transition:color .3s;
}
.cardTitle{
	font-size: 1.6em;
	color:#333;
	padding:0 .5em;
}
.cardContent{
	font-size: 1.4em;
	padding:0 .5em;
}
.cardContent:hover{
	color:#333;
	transition:color .3s;
}
.cardBottom{
	border-top:1px solid #eee;
	height: 3em;
	background-color: #FBFBFB;
	padding:0 .5em;
}
.cardBottom>p.tags{
	float:left;
}
.cardBottom>p.time{
	float:right;
}

</style>