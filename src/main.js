// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'//引入路由
import VueResource from 'vue-resource'//引入ajax插件
require ('../static/css/jquery.sinaEmotion.css')
require ('../static/css/alert.css')
require ('../static/js/jquery.js')
require ('../static/js/jquery.sinaEmotion.js')
require ('../static/js/alert.js')
Vue.use(VueRouter);
Vue.use(VueResource);
/* eslint-disable no-new */
// url1 = 'http://192.168.10.116/zlx/';

//定义路由组件
import index from './components/index.vue';//引入首页
import blogs from './components/blogs.vue';//引入blogs页面
import article from './components/article.vue';///引入article页面
import message from './components/message.vue';///引入留言页面

//创建路由实例
const router = new VueRouter({
	mode: '',
 	base: __dirname,
	routes:[
	{path:'/blogs',name:'blogs',component:blogs},
	{path:'/article',name:'article',component:article},
	{path:'/index',name:'index',component:index},
	{path:'/message',name:'message',component:message},
	{path: '*', redirect: '/index'}//路由默认加载的文件为首页
]
});

///挂载到实例
const app = new Vue({
	el:'#app',
	template: '<App/>',
	components: { App },
    router: router,
}).$mount('#app');
//挂载到实例

