import { createApp,h} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {createPinia} from "pinia"
//import lazyPlugin from "vue3-lazy"

/**
 * 全局数据在此处请求并加载
 */
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

System={'a':"123"}
var runoobA = {
  template: `<h1>自定义组件!</h1>`
}
var app=createApp(App)
app.component("site-name",runoobA)

window.APP=app
app.use(store).use(router).use(createPinia()).use(hljsVuePlugin).mount('#app')
let targetNodeList={}

//测试节点
app.component('testNode', {
	render(){
		return h(
		'div',this.test)
	},
	props:{
		test:{
			default:"",
			type:String
		}
	}
})
window['testNode']=app._context.components.testNode
//组件挂载逻辑
//逐层遍历组件
window.createComponent=(targetNode,componentData)=>{
	//targetNode:创建的组件名称
	//componentData:组件结构
	if(targetNodeList[targetNode]){
		return
	} 
	targetNodeList[targetNode]=true
	app.component(targetNode, componentData)
}

/*.use(lazyPlugin,{
	loading: require('./assets/img/image.png'), // 图片加载时默认图片
	error: require('./assets/img/image.png')// 图片加载失败时默认图片
})*/