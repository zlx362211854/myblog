<template>
<div class="page" id="app">
  <!-- 头部 -->
  <div class="topNavbar">
      <div class="navbarInner">
          <i class="iconfont logoIcon">&#xe630;</i>
      </div>
      <div class="navbarInner">
          <span class="navBarTitle navBarActive">
            <router-link to="/index" :class="{colorOrange:colors[0].color}">首页</router-link>
           </span>
      </div>
      <div class="navbarInner">
        <span class="navBarTitle">
          <router-link to="/blogs" :class="{colorOrange:colors[1].color}">文章</router-link>
        </span>
      </div>
      <div class="navbarInner">
        <span class="navBarTitle">
          <router-link to="/message" :class="{colorOrange:colors[2].color}">留言</router-link>
        </span>
      </div>
  </div>
  
 
 <!-- 路由加载的内容 -->
 <transition name="bounce">
   <router-view></router-view>
 </transition>
  
  <!-- 页脚 -->
  <div class="bottomBar">
    <div class="bottomTop">
      <div class="leftCont">
        <h4>前端备忘录</h4>
        <p>这里是我的新版博客,老版本界面比较单一,功能不齐全,也是我在前端刚入门不久时写的,开发博客的初衷是想把我在工作中踩过的坑找个地方记录下来,这样一路走来也能看到自己的成长.<br>新版采用Vue.js驱动,使用vue-router前端路由实现页面切换,采用.Vue单文件组件配合webpack打包实现css,js和图片资源的按需加载.速度快了很多! <br>所有动画效果使用css3渲染,不使用额外js代码.去旧版 
        <a href="http://www.zlxblog.applinzi.com" target="_blank">戳这里</a></p>
      </div>
      <div class="midCont">
        <h4>站内链接</h4>
        <p><router-link to="/blogs">文章</router-link></p>
        <p><router-link to="/message">留言</router-link></p>
        <p><router-link to="/blogs">关于我</router-link></p>
      </div>
      <div class="rightCont">
        <h4>分享</h4>
        <p class="shareIcon">
          <i class="iconfont">&#xe6df;</i>
          <i class="iconfont">&#xe60a;</i>
          <i class="iconfont">&#xe600;</i>
        </p>
      </div>
    </div>
    <div class="bottomBot">
      <p>design & code by @赵林肖,base on Vue.js + php</p>
      <p>蜀ICP备<a href="http://www.miitbeian.gov.cn/" target="_blank" style="color:#D8D8D8;">16036067号</a></p>
      <p class="lastP"><a href="http://www.zlxblog.applinzi.com" target="_blank">回到原版</a></p>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'app',
  components: {
    // blogs
  },
  data () {
    return {
      colors:[
        {color:true},
        {color:false},
        {color:false},
      ]
    }
  },
  watch: {
        '$route': 'changeColor',//监听$route的改变,来执行所对应的函数
    },
  created:function(){
   this.changeColor();//执行changeColor
  },
  methods:{
    //导航条对应项目字体颜色改变
    changeColor:function(){
      var pageName = this.$route.name;
      var that = this;
      function removeColor(){
        for(var i=0;i<that.colors.length;i++){
          that.colors[i].color = false;
        }
      }
      if(pageName == 'index'){
        removeColor();
        this.colors[0].color = true;
      }else if(pageName == 'blogs' || pageName == 'article'){
        removeColor();
        this.colors[1].color = true;
      }else if(pageName == 'message'){
        removeColor();
        this.colors[2].color = true;
      }
    }
  },
}




</script>

<style>
@font-face {
  font-family: 'iconfont';  /* project id 199258 */
  src: url('http://at.alicdn.com/t/font_0ew4hy9nkgumobt9.eot');
  src: url('http://at.alicdn.com/t/font_0ew4hy9nkgumobt9.eot?#iefix') format('embedded-opentype'),
  url('http://at.alicdn.com/t/font_0ew4hy9nkgumobt9.woff') format('woff'),
  url('http://at.alicdn.com/t/font_0ew4hy9nkgumobt9.ttf') format('truetype'),
  url('http://at.alicdn.com/t/font_0ew4hy9nkgumobt9.svg#iconfont') format('svg');
}
.iconfont{
  font-family:iconfont;
  font-style:normal;
}
*{
  box-sizing: border-box;
}
a{
  color:#606060;
  text-decoration: none;
}
body{
  margin:0;
  font-size: 62.5%;
  font-family:Helvetica, STHeiti STXihei, Microsoft JhengHei, Microsoft YaHei, Tohoma, Arial;/*神级font-family*/
}
pre{
  display: block;
  padding:10px;
  margin:0 0 10px;
  font-size: 14px;
  line-height: 14px;
  color:#333;
  word-break:break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border:1px solid #ccc;
  border-radius:4px;
}
#app{
  width: 100%;
}
.colorOrange{
  color:#FF895D !important;
}
/*transition*/
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-out 0s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0);
  }
}

/*navbar*/
.topNavbar{
  width: 100%;
  height: 5em;
  line-height: 5em;
  border-bottom:1px solid #ddd;
  /*box-shadow: 0 0 20px #ddd;*/
  padding:0 5%;
}
.logoIcon{
  font-size: 3em;
}
.logoIcon:hover{
  color:#FF895D;
  transition:color .3s;
}
.topNavbar>.navbarInner{
  display: inline-block;
  *display: inline;
  *zoom:1;
  width: 5%;
  height: 5em;
  line-height: 5em;
  vertical-align: top;
  text-align: center;
  cursor:pointer;
}

.topNavbar>.navbarInner span.navBarTitle{
    font-size: 1.6em;
    font-weight: 500;
    color:#606060;
}
.topNavbar>.navbarInner span.navBarTitle:hover{
    color:#FF895D;
    transition: color 0.3s;
}
.topNavbar>.navbarInner span.navBarTitle a:hover{
    color:#FF895D;
    transition: color 0.3s;
}
.topNavbar>.navbarInner span.navBarActive{
  color:#FF895D;
}
/*bottomBar*/
.bottomBar{
  width: 100%;
  background-color:#333333;
  color:#D8D8D8 !important;
  padding:2em 5% 8em 5%;
  cursor:pointer;
  box-sizing: border-box;
  margin-top: 2em;
}

.bottomBar h4{
  font-size: 1.8em;
}
.bottomBar h4:hover{
  color:#fff;
  text-shadow: 1px 1px #D7D7D7;
  transition:all 2s;
}
.bottomBar p{
  font-size: 1.4em;
}
.leftCont{
  width:50%;
  float:left;
}

.leftCont a{
  color:#d8d8d8;
}
.leftCont a:hover{
  text-decoration: underline;
}
.midCont{
  width:10%;
  float:left;
  text-align: center;
}

.midCont a{
  color:#D8D8D8;
}
.midCont a:hover{
  color:#fff;
  transition: color .5s;
}
.rightCont{
  width:40%;
  float:left;
  text-align: center;
}

.midCont p{
  margin:.5em 0;
}

.shareIcon i.iconfont{
  font-size: 2em;
  color:#8B8B8B;
}
.shareIcon i.iconfont:hover{
  color:#fff;
  transition: color .5s;
}
.bottomTop:after{
  content:'';
  height: 0;
  clear:both;
  display: block;
  visibility: hidden;
}
.bottomBot{
  width: 100%;
  padding:0 5%;
  border-top: 1px solid #8B8B8B;
  margin-top: 2em;
  text-align: center;
}
.lastP{
  margin-bottom: 0 !important;
}
.lastP a{
  color:#d8d8d8;
}
.loading{
  height: 4em;
  line-height: 4em;
  text-align: center;
  margin-top: 2em;
}
/*=-===*/
@media screen and (max-width: 780px) {
    .topNavbar>.navbarInner{
      width: 20%;
    }
    .midCont p{
   text-align: center;
  }
  .rightCont{
    width:100%;
    text-align: center;
  }
  .midCont{
      width:100%;
      text-align: center;
    }
    .leftCont{
      width:100%;
    }
    .bottomBar{
      padding:2em 5% 3em 5%;
    }
}
</style>
