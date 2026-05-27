/*
dom节点数据
所有对当前项目所有组件有效
以组件ID区分
切换编辑页时重新加载

*/
import {defineStore} from "pinia"
let path=require("path")
const files = require.context('./drawComponent', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
	const name = path.basename(key, '.js')
	modules[name] = files(key).default || files(key)
})
/*元素的锁定再project.vue中通过在choseGroup中获取是否村存在，存在则为选定 */
/*
	$DRAWUI_:	DRAWUI内置组件
	$USER_:		用户自定义节点
	$RESOURCE_:	外部社区引入
*/
/*
	组件列表System.componentConfig在registerSystem中定义
*/
export const componentStore= defineStore({
    id:"struct_component",
    state:()=>{
        return{
			"$DRAWUI_button":modules['button'],
			"$DRAWUI_flex":modules['flex']
        }
    },
    getters:{},
    actions:{}
})