import { h,defineCustomElement  } from "vue"
import * as builtInComponent from "../builtInComponent/componentList.js"
//处理props
function processProps(data){
	let returnData={}
	for(let key in data){
		if(data[key].inputType==1){
			//下拉框
			returnData[key]={
				type:data[key].type,
				default:data[key].default
			}
		}else if(data[key].inputType==2){
			//开关
			returnData[key]={
				type:data[key].type,
				default:data[key].default
			}
		}else if(data[key].inputType==3){
			//单选框
			returnData[key]={
				type:data[key].type,
				default:data[key].checkRadios[data[key].default]
			}
		}else if(data[key].inputType==4){
			//多选框
			let dataValue=[]
			for(let i=0;i<data[key].default.length;i++){
				if(data[key].default[i]){
					dataValue.push(data[key].checkRadios[i])
				}
			}
			returnData[key]={
				type:Array,
				default:dataValue
			}
		}else if(data[key].inputType==5){
			returnData[key]={
				type:data[key].type,
				default:data[key].type,
			}
		}
	}
	return returnData
}
//创建子组件列表
function createChild(componentData,indexs){
	//componentData:组件数据
	//读取子节点
	let childNodes=[],children=[]
	let nodeData=null
	for(let i=0;i<indexs.length;i++){
		//读取节点数据
		nodeData=componentData.DOMSTRUCT[System.device].tree[indexs[i]]
		if(indexs[i].startsWith('$NODE:')){
			//$NODE:为组件，不存在children
			//是组件，请求创建组件
			createComponent(nodeData.__modulePath__)
			//再读取当前节点的子节点
			children=createChild(System.componentStore[nodeData.__modulePath__],System.componentStore[nodeData.__modulePath__].DOMSTRUCT[System.device].index)
			childNodes.push(
				(_this)=>{
					return h(
						window[System.componentStore[nodeData.__modulePath__].__moduleId__.replace("$","").replace('_','-')+'_noEvent'],//$DRAWUI_button去除掉$,_改为-
						{
							class:{},
							style:{
								...System.processStyleBind(componentData.STYLESTRUCT[indexs[i]].style),//style数据 processStyleBind:在styleClass中定义
							},
							...nodeData.props,//调用时的传参
							/*...System.processClassBind(componentData.STYLESTRUCT[indexs[i]].class),//class数据 processClassBind:在styleClass中定义
							//所有事件都重新赋空，防止已经有的组件影响事件传递
							onMousedown:()=>{},
							onMouseup:	()=>{},
							onMouseover:()=>{},
							onMouseout:	()=>{},
							onMousemove:()=>{},
							onContextmenu:()=>{}*/
						},
						[
							...(()=>{
								let childrensList=[]
								for(let i=0;i<children.length;i++){
									childrensList.push(children[i](this))
								}
								return childrensList
							})()
					]
					)
				}
			)
		}else{
			//否则为节点
			children=createChild(componentData,nodeData.children)
			childNodes.push(
				(_this)=>{
					return h(
						nodeData.tag,//$DRAWUI_button去除掉$,_改为-
						{
							style:{
								...System.processStyleBind(componentData.STYLESTRUCT[indexs[i]].style),//style数据 processStyleBind:在styleClass中定义
								},
							/*...System.processClassBind(componentData.STYLESTRUCT[indexs[i]].class),//class数据 processClassBind:在styleClass中定义
							//所有事件都重新赋空，防止已经有的组件影响事件传递
							onMousedown:()=>{},
							onMouseup:	()=>{},
							onMouseover:()=>{},
							onMouseout:	()=>{},
							onMousemove:()=>{},
							onContextmenu:()=>{}*/
						}
						,
						[
							nodeData.innerContent || '',
							...(()=>{
								let childrensList=[]
								for(let i=0;i<children.length;i++){
									
									childrensList.push(children[i](this))
								}
								return childrensList
							})()
						]
					)
				}
			)
		}
	}
	return childNodes
}
function createRemoteComponent(componentPath){
	if(componentPath.startsWith('builtIn:')){
		//内置组件
		let target=componentPath.replace("builtIn:","")
		componentPath=builtInComponent.data[target].path
		let componentMountEvent=require(`../builtInComponent/${componentPath}/component/mount.js`)
		//执行组件挂载,获取组件名称
		let componentName=componentMountEvent.mount()
		return componentName
	}else if(componentPath.startsWith('remote:')){
		//请求远程组件
	}
}
//创建组件
function createComponent(componentId,isParent=false,nativeList={}){
	//let componentName=defineCom(componentId,isParent)
	//testDefin()
	/*
		@param isParent {Boolean} 标记是否为最外层组件
		@param nativeEventList {Object} 原生事件列表
	*/
	//return
	let componentData=System.componentStore[componentId]
	console.log(componentId,componentData,System.componentStore)
	if(Object.prototype.toString.call(componentData)=='[object String]'){
		//挂载非元数据结构的组件
		console.log("remote",componentData)
		return createRemoteComponent(componentData)
	}
	let children=createChild(componentData,componentData.DOMSTRUCT[System.device].index)
	let className={}
	if(isParent)className[nativeList.id]=true
	//处理props
	let propsList=processProps(componentData.props)
	for(let key in propsList){
		delete propsList[key][0]
		delete propsList[key][1]
	}
	let data={
		render() {
			return h(
				componentData.__ROOT__.tag || 'div',
				// 标签名称
				{
					id:nativeList.id || '',
					class:{
						...className
					},
					'data-node':1,
					style:{
						...System.processStyleBind(componentData.__ROOT__.style),//style数据 processStyleBind:在styleClass中定义
					},
					/*...System.processClassBind(componentData.__ROOT__.class),//class数据 processClassBind:在styleClass中定义
					//所有事件都重新赋空，防止已经有的组件影响事件传递*/
					onMousedown	 :	nativeList['mousedown'],
					onMouseup	 :	nativeList['mouseup'],
					onMouseover	 :	nativeList['mouseover'],
					onMouseout	 :	nativeList['mouseout'],
					onMousemove	 :	nativeList['mousemove'],
					onContextmenu:	nativeList['contextmenu'],
				},
				[
					componentData.__ROOT__.innerContent
						?(componentData.__ROOT__.innerContent.startsWith('$VAR:')
							?this[componentData.__ROOT__.innerContent.replace("$VAR:","")]
							:componentData.__ROOT__.innerContent
						 )
						:'',
					...(()=>{
						let childrensList=[]
						for(let i=0;i<children.length;i++){
							childrensList.push(children[i](this))
						}
						return childrensList
					})()
				]
			)
		},
		props:{
			...propsList
		},
		data(){
			return{
			}
		},
		mounted(){},
		methods:{
		}
	}
	let componentName=componentData.__moduleId__.replace("$","").replace('_','-')+(isParent?'':"_noEvent")
	defineCustomElement(componentName,{})
	//加上后缀用于区分是最外层的使用还是在其他组件中的嵌套使用
	if(window[componentName]){
		return componentName
	}
	//在main.js中定义
	window.createComponent(componentName,data)
	window[componentName]=window.APP._context.components[componentName]
	return componentName
}
System.compressComponent=createComponent
export {}
//app.mount('#app')

