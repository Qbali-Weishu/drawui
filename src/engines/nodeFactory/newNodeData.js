//引入节点旋转worker
import operationStack from "worker-loader!../../worker/operationStack"
const opeWorker=new operationStack()
const createId=(type="node")=>{
	let id=Math.random().toString(32).substr(2)
	let head=id[0]
	if(!isNaN(head)){
		//若第一个为数字
		id="a"+id
	}
	const nameIndex={
		'node':'节点',
		'text':"文字",
		'img':'图像',
		'pencil':'路径',
		'rect':'矩形',
		'circle':'圆' ,
		'line':'直线',
		'polygon':'多边形'
	}
	let name=nameIndex[type]+'_'+Math.random().toString(32).slice(2,7)
	return [id,name]
}
const createNewNodeMeta=(parent,type,position="absolute")=>{
	let [id,name]=createId(type)
	const tag={
		'node':"div",
		'text':"span",
		'img':'img',
		'pencil':'svg',
		'rect':'shape',
		'circle':'shape',
		'line':'shape',
		'polygon':'shape',
	}[type]
	let background=tag=='span' ?'rgba(255,255,255,0)':'#d8d8d8'
	if(tag=='shape'){
		//此时仅在动画模式下的形状，记录到animation模块
		return
	}
	//否则为节点
	System.nodeMeta.tree[id]=
					{
						"name":name,
						"tag":tag,
						"status":{
							lock:1,
							'editing':false,
							'editingMan':""
						},
						'innerContent':'',
						"propertype":{
							id:id,	
						},
						"event":{
							
						},
						'condition':{},
						"parent":parent, 
						'children':[]
					}
	System.metaData.STYLESTRUCT[id]={
		class:{},
		style:{
			"position":{
				value:position,
				children:{
					position:position
				},
				group:false,
				condition:{
					bindList:null,
					default:""
				}
			},
			"background":{
			    value:"",
				children:{
					"backgroundColor":
					{
						value:background,
						conditon:{
							bindList:null,
							default:""
						}
					},
					"backgroundPosition":[
						/*{
							value:"",
							conditon:{
								bindList:null,
								default:""
							}
						}*/
					],
					"backgroundSize":[
			
					],
					"backgroundRepeat":{
						value:"",
						conditon:{
							bindList:null,
							default:""
						}
					},
					"backgroundOrigin":[
			
					],
					"backgroundClip":[
			
					],
					"backgroundAttachment":[
			
					],
					"backgroundImage":[
			
					],
					"backgroundBlendMode":[
			
					]
					},
				group:false,
				condition:{
					bindList:null,
					default:""
				}
			},
		}
	}
	if(parent===null){
		System.nodeMeta.index.push(id)
	}else{
		System.nodeMeta.tree[id].parent=parent
		System.nodeMeta.tree[parent].children.push(id)
	}
	//插入操作记录，用于回退与重做
	opeWorker.postMessage(
	{
		action:"push",
		operation:'insertNode',
		model:"node",
		data:JSON.stringify(System.metaData.STYLESTRUCT[id])
	})
	let temp
	
	return id
}

function insertNewComponent(parent,name,path){
	let id=Math.random().toString(32).substr(2)
	let head=id[0]
	if(!isNaN(head)){
		//若第一个为数字
		id="a"+id
	}
	id="$NODE:"+id
	System.nodeMeta.tree[id]=
					{
						"name":name+Math.random().toString().substr(2,7),
						"status":{
							lock:1,
							'editing':false,
							'editingMan':""
						},
						'innerContent':'',
						"propertype":{
							id:id,	
						},
						"event":{
						},
						'condition':{},
						"parent":parent,
						__modulePath__:path,
						props:{}
					}
	//读取componentStore  requestComponentMeta在nodeFactory中定义
	let componentData=System.requestComponentMeta(path)
	if([null,undefined].includes(componentData)){
		//若此组件不存在，则请求数据
		componentData=System.requsetComponentData(path)
		if([null,undefined].includes(componentData)){
			return false
		}
		componentData=JSON.parse(JSON.stringify(componentData))
	}
	let isRemote=Object.prototype.toString.call(componentData) == '[object String]'
	System.metaData.STYLESTRUCT[id]={
		style:isRemote?"":componentData.__ROOT__.style,
		class:isRemote?"":componentData.__ROOT__.class
	}
	if(parent===null){
		System.nodeMeta.index.push(id)
	}else{
		System.nodeMeta.tree[id].parent=parent
		System.nodeMeta.tree[parent].children.push(id)
	}
	return id
}
System.insertNewComponent=insertNewComponent
export {
	createNewNodeMeta
}