<template>
		<div class="lists">
			<div class="list" v-for="message in pageMessage">
				<div class="headImg">
					<i class="iconfont defaultFace" style="color:#8B8B8B;" v-show="message.message_icon==1||message.message_icon==null||message.message_icon==''">&#xe637;</i>
					<i class="iconfont defaultFace" style="color:#F66DB2;" v-show="message.message_icon==2">&#xe67e;</i>
					<i class="iconfont defaultFace" style="color:#3CAAD3" v-show="message.message_icon==3">&#xe64b;</i>
					<i class="iconfont defaultFace" style="color:#FF895D;" v-show="message.message_icon==4">&#xe638;</i>
				</div>
				<div class="cont">
					<p class="pname" v-text="message.message_name"></p>
					<p class="pcont" v-html="message.message_content"></p>
					<p class="ptime">{{ message.message_time }} <span class="listHf" @click="listHf(message.message_name)">回复</span></p>
				</div>
			</div>
			<!-- 加载指示器 -->
			<div class="loading" v-show="loading">
				<img src="/static/img/loading.gif" alt="">
			</div>
			<!-- 分页 -->
			<div class="callpage">
				<div class="pageBtn" @click="prevPage">上一页</div>
				<div class="pageBtn"
				  v-for="(page,index) in pages"
				  @click="changePage(index,$event)"
				 :class="{active:page.active}">{{page.indexof}}</div>
				<div class="pageBtn" @click="nextPage">下一页</div>
			</div>
		</div>
</template>
<script>
var url1 = 'http://www.zlxblog.cn/php1/';
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
		name:'messageList',
		data () {
			return {
				messages:[],//所有留言
				pages:[],
				pageMessage:[],//一页的留言
				loading:true,
			}
		},
		// computed:{
		// 	pageMessage:function(){
		// 		return []//一页的留言
		// 	}
		// },
		created:function(){
		// 取所有留言数据
			this.$http.post(url1+'zlx.php/Message/find',{emulateJSON:true}).then(
		            function (data) {
		                // 处理成功的结果
		                // console.log(data);
		                this.messages = data.data;//全部留言存在messgaes里面
		                this.pageMessage = data.data.slice(0,10);//截取前10个
		                var num = Math.ceil(data.data.length/10);//计算页数
		                for(var i=0;i<num;i++){
		                	var Obj = {
		                		'indexof':i+1,
		                		'active':false
		                	}
		                	this.pages.push(Obj);
		                }
		                this.pages[0].active = true;
		               this.loading = false;
		            },function (res) {
		            // 处理失败的结果
		            }
		        );
			//输入框组件回复成功触发视图更新
			this.$on('change',function(){
				this.$http.post(url1+'zlx.php/Message/find',{emulateJSON:true}).then(
			            function (data) {
			                // 处理成功的结果
			                // console.log(data);
			                this.messages = data.data;
			                this.pageMessage = data.data.slice(0,10);//截取前10个
			                this.loading = false;
			            },function (res) {
			            // 处理失败的结果
			            }
			        );
			})
		},
		methods:{
			listHf:function(name){
				var that = this;
				var icon = getCookie('icon');
				var myName = getCookie('friendsName');
				if(icon==''||icon==undefined){icon='1';} 
				if(myName==''||myName==undefined) {myName='路人';}
				swal({   
							title: "回复",   
							text: "回复@"+name+"",   
							type: "input", 
							html:true, 
							showCancelButton: true,   
							closeOnConfirm: false, 
							confirmButtonText: "确定", 
							cancelButtonText:'取消',  
							animation: "slide-from-top", 
							confirmButtonColor: "#2AB36F",  
							inputPlaceholder: "回复@"+name+"", 
						}, function(inputValue){ 
						//获取input输入的值 inputValue
							if (inputValue === false) return false; 
							var Value = myName+'@'+name+': '+inputValue;
						   		that.$http.post(url1+'zlx.php/Message/index',{'name':myName,'content':Value,'icon':icon},{emulateJSON:true}).then(
						   	            function (data) {
						   	                // 处理成功的结果
						   	                // console.log(data);
						   	                if(data.data.cod=='success'){
						                   		// 取所有留言数据
						   	                	swal("留言成功!", "", "success");
						   	                	// 去父组件更新视图
						   	                	that.$emit('change');
						   	                }
						   	            },function (res) {
						   	            // 处理失败的结果
						   	            }
						   	        );
						});
			},
			changePage:function(n,event){
				this.pageMessage = this.messages.slice(n*10,n*10+10);
				for(var i=0;i<this.pages.length;i++){
					this.pages[i].active = false;
				}
				this.pages[n].active = true;
			},
			nextPage:function(){
				//下一页
				var n;//当前是哪页(0开始)
				for(var i=0;i<this.pages.length;i++){
					if(this.pages[i].active == true){
						n = i;
					}
				}
				// alert(this.pages.length);
				if(n!=this.pages.length-1){
					//如果不等于最后一页
					this.pageMessage = this.messages.slice((n+1)*10,(n+1)*10+10);//取10条放入pageMessage中
					for(var i=0;i<this.pages.length;i++){
						this.pages[i].active = false;
					}
					this.pages[n+1].active = true;
				}
				
			},
			prevPage:function(){
				//上一页
				var n;//当前是哪页(0开始)
				for(var i=0;i<this.pages.length;i++){
					if(this.pages[i].active == true){
						n = i;
					}
				}
				if(n!=0){
					//如果不等以第一页
					this.pageMessage = this.messages.slice((n-1)*10,(n-1)*10+10);//取10条放入pageMessage中
					for(var i=0;i<this.pages.length;i++){
						this.pages[i].active = false;
					}
					this.pages[n-1].active = true;
				}
			}
		}
	}

</script>
<style scoped>
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
.headImg{
	float:left;
	width: 8%;
	text-align: center;
}
.defaultFace{
	font-size: 50px;
	cursor:pointer;
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
.callpage{
	width: 100%;
	margin:2em 0;
}
.callpage>.pageBtn{
	background-color: #fff;
	display: inline-block;
	*display: inline;
	*zoom:1;
	height: 40px;
	width: 50px;
	line-height: 40px;
	text-align: center;
	color:#428BCA;
	cursor: pointer;
}
.callpage>.pageBtn:hover{
	color:#fff;
	background-color: #428BCA;
}
.callpage>.active{
	color:#fff;
	background-color: #428BCA;
}
@media screen and (max-width: 780px) {
 	.headImg{
	float:left;
	width: 20%;
	text-align: center;
}
.cont{
	float:left;
	width: 80%;
}
}
</style>