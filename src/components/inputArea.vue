<template>
	<!-- 留言框组件 -->
	<div class="luarea">
		<div class="luleft">
			<p @click="changeIcon">
				<i class="iconfont defaultFace" style="color:#8B8B8B;" v-show="icon==1||icon==''">&#xe637;</i>
				<i class="iconfont defaultFace" style="color:#F66DB2;" v-show="icon==2">&#xe67e;</i>
				<i class="iconfont defaultFace" style="color:#3CAAD3" v-show="icon==3">&#xe64b;</i>
				<i class="iconfont defaultFace" style="color:#FF895D;" v-show="icon==4">&#xe638;</i>
			</p>
			<p class="userName">
				<input type="text" value="" id="nameInput" placeholder="少侠留个名字!" v-if="name==''||name=='undefined'">
				<span v-else class="lyzname">{{ name }}</span>
			</p>
		</div>
		<div class="luright">
			<form>
				<div class="box" id="box" :class="{ColorOrange:borderColor}"></div>
				<textarea id="messageArea" @focus='showColor' @blur='backColor' v-model="textarea"></textarea>
				<div class="faceBox">
					<div class="face">
						<i class="iconfont" @click="showFace($event)">&#xe602;</i>
					</div>
					<div class="submitBtn">
						<button type="submit" @click.stop.prevent="submitForm">留言</button>
					</div>
				</div>
			</form>
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
		data () {
			return {
				borderColor:false,
				name:'',//留言者名字
				textarea:'',//留言内容
				icon:1,//icon
				// messages:[]//所有留言
			}
		},
		created:function(){
			var friendsName = getCookie('friendsName');//取现在的留言者名字(如果没有则是新来的)
			var hisIcon = getCookie('icon');//取留言者icon
			this.icon = hisIcon;
			// alert(friendsName);
			if(friendsName!=''&&friendsName!='undefined'){
				//如果不为空(证明留言者不是第一次来)
				this.name = friendsName;//把该留言者的名字赋给this.name
			}
		
		},
		methods:{
			showColor:function(){
				this.borderColor = true;
				this.textarea = $('#messageArea').val();
			},
			backColor:function(){
				this.borderColor = false;
			},
			showFace:function(event){
				$(event.target).sinaEmotion('#messageArea');
				event.preventDefault();
				event.stopPropagation();
				$('#messageArea').focus();
			},
			changeIcon:function(){
				var icon = getCookie('icon');
				// alert(icon);
				if(icon==''){
					//如果cookie已有icon则不能换
					if(this.icon<4){
						this.icon++;
					}else if(this.icon==4){
						this.icon=1;
					}
				}
				
				
			},
			submitForm:function(){
				var text = $('#messageArea').val();//填写的留言内容
				var textParsed = $('<span>'+text+'</span>').parseEmotion().html();//转换表情
				var friendsName = getCookie('friendsName');//取留言者的名字
				if(friendsName==''||friendsName=='undefined'){
					//如果是新来的(如果不是新来的,就直接用cookie中的名字)
					friendsName = $('#nameInput').val();//取输入框值为留言者名字
					if(friendsName!=''&&friendsName!='undefined'){
						//如果留言者填了名字
						// alert(this.icon);
						setCookie('friendsName',friendsName,240);//存
						setCookie('icon',this.icon,240);//存icon
						var friendsName = getCookie('friendsName');
						var icon = getCookie('icon');
						// alert();
						this.name = friendsName;
						this.icon = icon;
						var name = this.name;
						// alert(name);
						this.$http.post(url1+'zlx.php/Message/index',{'name':name,'content':textParsed,'icon':icon},{emulateJSON:true}).then(
					            function (data) {
					                // 处理成功的结果
					                // console.log(data);
					                if(data.data.cod=='success'){
				                		// 取所有留言数据
					                	swal("留言成功!", "", "success");
					                	this.textarea = '';
					                	// 去父组件更新视图
					                	this.$emit('changeListData');
					                }
					            },function (res) {
					            // 处理失败的结果
					            }
					        );
					}else{
						//如果留言者没填名字
						swal("少侠留个名字吧.", "", "warning");
						return false;
					}
				}else{
					//如果留言者不是新来的(cookie中取到了他的name)
						var icon = getCookie('icon');//取出他的icon
						this.name = friendsName;
						this.icon = icon;
						this.$http.post(url1+'zlx.php/Message/index',{'name':friendsName,'content':textParsed,'icon':icon},{emulateJSON:true}).then(
					            function (data) {
					                // 处理成功的结果
					                console.log(data);
					                if(data.data.cod=='success'){
				                		// 取所有留言数据
					                	swal("留言成功!", "", "success");
					                	this.textarea = '';
					                	this.$emit('changeListData');
					                }
					            },function (res) {
					            // 处理失败的结果
					            }
					        );
				}
			},
		
		}
	}
</script>
<style scoped>
.ColorOrange{
	border-left:1px solid #FF895D !important;
	border-bottom:1px solid #FF895D !important;
}
.luarea{
width: 50%;
background-color: #fff;
margin-left: 25%;
}

.luarea>div{
	float:left;
}
.luarea>.luleft{
	width: 20%;
}
.luarea>.luright{
	width: 79%;
	position: relative;
	padding-right: 20px;
}
.luright .box{
	width: 20px;
	height: 20px;
	border-left:1px solid #ddd;
	border-bottom:1px solid #ddd;
	background-color: #fff;
	position: absolute;
	left:-10px;
	top:35px;
	transform: rotateZ(45deg);
}
.luleft p{
	margin:10px 0 10px 0;
}
.userName{
	font-size: 26px;
}
.luarea:after{
	content:'';
	height: 0;
	display: block;
	visibility: hidden;
	clear:both;
}
.defaultFace{
	font-size: 50px;
	cursor:pointer;
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
.faceBox>div{
	display: inline-block;
	margin:10px 0 10px 0;
	cursor:pointer;
}
.faceBox .face{
	float:left;
}
.faceBox .face i{
	font-size: 20px;
}
.faceBox .submitBtn{
	float:right;
}
.faceBox .submitBtn button{
	width: 60px;
	height: 26px;
	outline:none;
	border:1px solid #eee;
	background-color: #FF895D;
	border-radius: 3px;
	color:#fff;
}
#nameInput{
	width: 80%;
	outline:none;
	border:1px solid #eee;
	height: 3em;
	text-align: center;
	border-radius: 2px;
}
@media screen and (max-width: 780px) {
    #nameInput{
    	font-size: .5rem;
    }
    .luarea{
    width: 100%;
    background-color: #fff;
    margin-left: 0;
    }
    .lyzname{
    display: inline-block;
    *display: inline;
    zoom:1;
	width: 4rem;
	text-overflow:ellipsis;
	overflow:hidden; 
	white-space:nowrap;
	font-size: .8rem;
}
}
</style>