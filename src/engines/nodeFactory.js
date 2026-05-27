import drawBoundWorker from "worker-loader!../worker/drawBoundWorker"
import {structStore} from "../store/struct.js"
import * as otherFunction from "./nodeFactory/other.js"
import * as textData from "./nodeFactory/textData.js"
import * as newNodeMeta from "./nodeFactory/newNodeData.js"
//系统属性定义
//当前所有操作中的节点ID列表
System.operatingNodes={}
//标记元素移动准备状态
System.nodeMovingStatus=false
//系统属性定义

//排序子线程
const worker=new drawBoundWorker()

//按下时的位置
var downPosition={
    left:0,
    top:0,
	toLeftDistance:0,//距离边框左边的距离
	toTopDistance:0,//距离边框上边的距离
    targetLeft:"",//边框位置
    targetTop:"",//边框位置
    targetWidth:"",
    targetHeight:""
}

//记录变化差距
var scaleChange={
    sideType:0,//0为单边移动，1为顶点移动
    xside:"right",//横向移动的
    xdirect:"",//移动方向
    xdistance:0//移动距离
}

//记录范围宽高
var boundWH={
	width:0,
	height:0
}
//记录范围原先位置
var boundXY={
	left:0,
	top:0
}
//设置遮罩层mask移动时的处理事件时拉伸还是移动
var movingType='scale'
//当前处理的组件元数据（不是System.nodeMeta,System.nodeMeta是当前编辑的，此处时当前挂载时处理中所需要提取的）
var nowComponentMeta={}
//存储当前要生成的组件的data变量与props变量数据
var comData={}
//记录当前生成的组件路径，用于减少生成组件中刷新变量数据的开销
var nowCreatingComPath=""
//边框绘制定时器
var drawTimeout=null
//拉伸计算比例
var yScaleNumber=0
var refreshNumberTimeout_y=null
var xScaleNumber=0
var refreshNumberTimeout_x=null
//按下时记录节点ID
var downId=""
//选择延时
var selectTimeout=null
//解决bfc属性
let bfc=document.createElement("div")
bfc.style.cssText=`clear:both;width:0px;height:0px`
//按下时为节点设置移动类
let moveClassNode=document.createElement("style")
let moveClassName="drawUI_moveNode_class"
moveClassNode.id="move_style"
moveClassNode.innerText=`
.${moveClassName}{
	translate:0px 0px;
}
`
document.getElementsByTagName("head")[0].appendChild(moveClassNode)
//标记是否已添加移动类
var hasAddMoveClass=false
//边框的样式类，用于控制边框显示
var sideBoundClassNode=document.createElement("style")
sideBoundClassNode.id="sideBound_style"
var sideBoundClassName="drawUI_sideBound_class"
sideBoundClassNode.innerText=`.${sideBoundClassName}{}`
document.getElementsByTagName("head")[0].appendChild(sideBoundClassNode)
//记录各节点的实际变化位置
/*节点选中时，预先创建一个移除了rotate与scale的节点，记录节点的boundClientRect，
将节点的with增加10px，再次记录boundClientRect，检测right取值是否有变化，若有变化，
则计算10px的实际取值，即除以System.saclePercent,计算两次的right值的差值
用差值除以10px的实际取值，再乘cos值，得到需要增加的比例数，
*/
var scaleValuePercent={}
function setScaleValuePercent(list){
	for(let nodeId in System.operatingNodes){
		nodeId=nodeId.replace("$NODE:","")
		//计算时选择最后一个，即聚焦后最后添加的节点
		scaleValuePercent[nodeId]=otherFunction.scaleValuePercent(System.getElement(nodeId))
	}
}
//获取选中的ID节点
function getNodeId(node){
	while(true){
		if(node.id){
			return node.id
		}
		node=node.parentNode
	}
	return null
}

function initTree(root,indexList=System.nodeMeta.index){
	
    //创建虚拟节点
    let fragment=document.createDocumentFragment()
    let tree=System.nodeMeta.tree
    indexList.forEach(nodeId =>{
        mountNode(nodeId,fragment,tree[nodeId])
    })
    root.appendChild(fragment)
	if(System.focusStatus){
		root.onmouseup=function (e){
			if(!drawLine){
				let id=e.target.id
				if(id.endsWith('_focusClone')) id=id.replace('_focusClone','')
				e.stopPropagation()
				if(e.button==0)
					selectNode(id)
				System.nodeMovingStatus=false
				movingMask=null
			}
		}
		root.onmousedown=function(e){
			//当已经点击选择是才能够移动
			e.stopPropagation()
			let id=e.target.id
			if(id.endsWith('_focusClone')) id=id.replace('_focusClone','')
			downId=id
			downPosition.left=e.clientX
			downPosition.top=e.clientY
			downPosition.toTopDistance=e.clientY-boundXY.top
			downPosition.toLeftDistance=e.clientX-boundXY.left
			System.nodeMovingStatus=true
			if(e.button==2){
				//右键按下
				System.menuStatus=true
			}
		}
		root.oncontextmenu=function(e){
			e.stopPropagation()
			e.preventDefault()
			let id=e.target.id
			if(id.endsWith('_focusClone')) id=id.replace('_focusClone','')
			System.callNodeMenu(e,id)
			if(!System.operatingNodes[id])
				selectNode(id)
		}
	}
}
function getIndex(id){//获取元素在store中的索引
    return System.nodeMeta.index[id]
}
function insert(parentId,childId){//插入父元素的子元素列表中
    if(parentId!=null){
        let parentIndex=getIndex(parentId)
        System.nodeMeta.tree[parentIndex].children.push(childId)
    }
}
//拉伸与移动数据写回
function moveScaleWrite(id,head,child,transdata,offset,parentId){
	id=id.replace('_accepter',"")
	if(document.querySelector('#'+id).dataset.node=='1'){
		id='$NODE:'+id
	}
	//let head=type=='absolute'?y:"margin"
	let metaStyle=System.metaData.STYLESTRUCT[id].style[head]
	if(!metaStyle) {
		if(Object.prototype.toString.call(System.metaData.STYLESTRUCT[id].style) !== '[object Object]'){
			System.metaData.STYLESTRUCT[id].style={}
		}
			System.metaData.STYLESTRUCT[id].style[head]
				=
			JSON.parse(JSON.stringify(System.stylePropertype[head]))
			metaStyle=System.metaData.STYLESTRUCT[id].style[head]
		
		
	}
	if(['width','height','left','top','bottom','right'].includes(head)){
		//写回宽高数据
		let metaValue=metaStyle.children.value || 0
		let metaUnit=metaStyle.children.unit || 'px'
		let transtop=0
		System.metaData.STYLESTRUCT[id].style[head].children.value=System.unitTransform(transdata+"px",metaValue,metaUnit,head,offset,parentId)
	}else{
		let metaValue=metaStyle.children[child].value || 0
		let metaUnit=metaStyle.children[child].unit || 'px'
		let transtop=0
		System.metaData.STYLESTRUCT[id].style[head].children[child].value=System.unitTransform(transdata+"px",metaValue,metaUnit,child,offset,parentId)
	}
}
//记录执行了mousedown等事件的节点，用于在鼠标弹起之后移除事件，恢复click事件
var downEventNode=[]
//绑定基础事件
var movingMask=null//移动遮罩层
//上一个鼠标移入的节点
var lastLocatedNode=null
//创建移动遮罩层
function createMask(e,cursor="",direct=""){
	//隐藏节点旋转、圆角栏
	//document.getElementById("radiusRotate").style.transform="scale(0)"
	let mask=document.createElement("div")
	mask.style.cssText=`
	                    z-index:12000;
	                    background-color:rgba(0,0,0,0);
	                    width:100%;
	                    height:100%;
	                    left:0;
	                    top:0;
						position:absolute;
						cursor:${cursor}
	                    `
	mask.onmousemove=(e)=>{
	    if(System.nodeMovingStatus){
			movingType=='scale'?scaleNode(e,direct):moveNode(e)
	    }
	}
	mask.onmouseup=(e)=>{
	    System.nodeMovingStatus=false
		mask.remove()
		if(movingType=='move'){
			let box=document.getElementById("movingMask")
			if(box) box.remove()
			movingMask=null	
			movingType='scale'
			finishMove(e)
			//重新显示节点顶部栏
			//document.getElementById("radiusRotate").style.transform=""
		}else{
			finishScaleNode()
		}
	}
	mask.onmouseleave=(e)=>{
	    System.nodeMovingStatus=false
		mask.remove()
		if(movingType=='move'){
			let box=document.getElementById("movingMask")
			if(box) box.remove()
			movingMask=null
			movingType='scale'
			finishMove(e)
			//重新显示节点顶部栏
			//document.getElementById("radiusRotate").style.transform=""
		}else{
			finishScaleNode()
		}
	}
	document.body.appendChild(mask)
}
//用于存储当前正则挂载的组件层次，以区分是组件内的节点还是普通节点
var mountingComponent=[]
//挂载节点
function mountNode(id,parent,metaData,newNode=false,rank='inherit',refTarget=null){
	System.unSelectAll()
	System.clearBoundSide()
    //标记是否为组件
    let isComponent=false
    let el
    let returnEl=[]
	let floatList=[]
	//此时为组件挂载
	//在组件挂载添加时，会自动在组件ID前加上$NODE:
	if(id.startsWith("$NODE:")){
    //if(nowComponentMeta.__modulePath__ && nowComponentMeta.props && !metaData.children){
        isComponent=true
    }else if(mountingComponent.length==0){
		nowComponentMeta=structStore()
	}
	//标记是否是组件下的节点
	let isComponentNode=false
	
	if(mountingComponent.length>0){
		isComponentNode=true
		id=id.replace('$NODE:','')
	}
    if(!isComponent){
        //标签
        let tag=metaData.tag
		if(tag=='span'){
			el=document.createElement("span")
			el.innerText=metaData.innerContent
		}else{
			el=document.createElement(tag)
		}
        if(newNode){
            //生成随机ID
            //新增标签，则metaData为基础数据
            let style=metaData.style
            let parentId=metaData.parentId
            el.id=id
            let cssGroup=[]
            for(let key in style){
                cssGroup.push({
                    styleName:key,
                    styleValue:style[key],
                    targetId:null,
                })
            }
            //el.style.cssText=System.requestSetStyleGroup(cssGroup)
			//id样式必须放在最后以保证优先级
			el.classList.add(id)
			floatList.push(false)
            //检测v-for展示次数
        }else{
            //读取样式数据 style 与 class列表,样式在getCSSMeta中生成
			let [styleList,classList,float]=System.getCSSMeta(id,nowComponentMeta,comData)
			floatList.push(float)
            el.id=id
            //处理样式
			if(styleList) el.style.cssText=styleList//System.requestProcessStyle(styleList)
            if(classList){
				let className=""
				classList.forEach(name => {
				    className+=name+" "
				})
				el.className=className
			}
			//id样式必须放在最后以保证优先级
			el.classList.add(id)
			metaData.children.forEach(nodeId =>{
			    mountNode(nodeId,el,System.nodeMeta.tree[nodeId])
			})
            //检测v-for展示次数
        }
        //非组件下的节点时绑定基础事件
		if(!isComponentNode){
			el.onmouseup=function (e){
				try{
					lastLocatedNode.classList.remove("locatedNode")
					lastLocatedNode=null
					System.lastLocatedNode=null
				}catch{}
				if(System.linkingAnimation){
					System.linkAnimationNode(el.id)
				}
				else if(!drawLine){
					let id=e.target.id
					if(id.endsWith('_focusClone')) id=id.replace('_focusClone','')
					e.stopPropagation()
					if(e.button==0)
						selectNode(e.target.id)
					System.nodeMovingStatus=false
					movingMask=null
				}
			}
			el.onmousedown=function(e){
				
				//当已经点击选择是才能够移动
				e.stopPropagation()
				downId=e.target.id
				downPosition.left=e.clientX
				downPosition.top=e.clientY
				downPosition.toTopDistance=e.clientY-boundXY.top
				downPosition.toLeftDistance=e.clientX-boundXY.left
				System.nodeMovingStatus=true
				//按下时应立即隐藏边框线条,通过修改样式类，防止影响拖动操作
				sideBoundClassNode.innerText=`.${sideBoundClassName}{display:none}`
				//隐藏节点顶部选择框
				System.hideNodeTopBar()
				if(e.button==2){
					//右键按下
					System.menuStatus=true
				}
			}
			el.onmousemove=function(e){
				if(System.linkingAnimation){
					//不处于连接选择交互时
				}
				else if(System.isDragingComponent){
					
				}
				else if(!drawLine){
					//拉伸对齐
					e.stopPropagation()
					if(System.nodeMovingStatus){
						if(Math.abs(e.clientX-downPosition.left)>5 || Math.abs(e.clientY - downPosition.top)>5){
							//移动前更新
							boundWH={
								width:document.getElementById("sideBar_right").getBoundingClientRect().left-document.getElementById("sideBar_left").getBoundingClientRect().left,
								height:document.getElementById("sideBar_bottom").getBoundingClientRect().top-document.getElementById("sideBar_top").getBoundingClientRect().top
							}
							movingType="move"
							createMask()
						}
					}
				}
			}
			el.oncontextmenu=function(e){
				e.stopPropagation()
				e.preventDefault()
				System.callNodeMenu(e,e.target.id)
				if(!System.operatingNodes[id])
					selectNode(e.target.id)
			}
			el.onmouseover=function(e){
				e.stopPropagation()
				if(drawLine)
					System.drawAlignBound(e.target.getBoundingClientRect())
				try{
					lastLocatedNode.classList.remove('locatedNode')
				}catch{}
				lastLocatedNode=e.target
				System.lastLocatedNode=lastLocatedNode
				e.target.classList.add("locatedNode")
				if(System.isDragingComponent){
					System.createComAccepter(el.id)
				}
			}
			el.onmouseout=function(e){
				if(System.isDragingComponent && !System.isEnterAccepter && !['absolute','fixed','sticky'].includes(window.getComputedStyle(el).position)){
					System.closeComAccepter()
				}
			}
		}
        returnEl=[el]
    }else{
        //组件挂载
        //读取此组件的路径
        let path=metaData.__modulePath__
        //读入props数据
        let props=metaData.props
        //调用createComponent获取处理完成的组件
        el=createComponent(path,props,parent,id)
        returnEl=[el]
		floatList.push(false)
    }
	//插入父组件
    for(let i=0;i<returnEl.length;i++){
        if(returnEl[i]){
			//插入bfc属性消除节点
			if(!floatList[i]){
				bfc=document.createElement("div")
				bfc.style.cssText=`clear:both;width:0px;height:0px`
				if(refTarget==null){
					parent.appendChild(bfc)
				}else{
					parent.insertBefore(bfc,refTarget)
				}
			}
			if(rank=='inherit')
				parent.appendChild(returnEl[i].acceptNode || returnEl[i])
			else if(rank=='before' || rank=='after'){
				if(refTarget==null){
					parent.appendChild(returnEl[i].acceptNode || returnEl[i])
				}else{
					parent.insertBefore(returnEl[i].acceptNode || returnEl[i],refTarget)
				}
			}
			if(returnEl[i].componentName){
				//表示创建组件完成
				//创建一个接受组件
				System.mountComponentToNode(
					returnEl[i].acceptNodeId,
					returnEl[i].componentName,
					{prop1:"test new node"},
					returnEl[i].nativeList,
					returnEl[i].needDefineId || false,
				)
			}
		}
    }
}
function createComponent(comPath,props,parent,id){
	//comPath:组件索引
    let componentMeta=otherFunction.readComponentMeta(comPath)
    //componentMeta为codeFile时，表示为远程挂载组件
	let useMountComponent=componentMeta!='codeFile' 
							&& Object.prototype.toString.call(componentMeta)=='[object Object]' 
	let tag=componentMeta.__ROOT__?(componentMeta.__ROOT__.tag || 'div'):"div"
	tag=['button','div'].includes(tag)?tag:'div'
	let rootEl=document.createElement(tag)
	//绑定根组件样式
	rootEl.id=id.replace("$NODE:","")
	rootEl.setAttribute('data-node','1')
	const nativeOn_mouseup=function(e){
		try{
			lastLocatedNode.classList.remove("locatedNode")
			lastLocatedNode=null
			System.lastLocatedNode=null
		}catch{}
		if(System.linkingAnimation){
			System.linkAnimationNode(rootEl.id)
		}
		else if(!drawLine){
			let _id=getNodeId(e.target)
			if(e.target.shadowRoot){
				_id=e.target.parentNode.id.replace("_accepter","")
			}
			if(_id.endsWith('_focusClone')) _id=_id.replace('_focusClone','')
			e.stopPropagation()
			console.log(e.target)
			if(e.button==0)
				selectNode('$NODE:'+_id)
			System.nodeMovingStatus=false
			movingMask=null
		}
	}
	const nativeOn_mousedown=function(e){
		//当已经点击选择是才能够移动
		e.stopPropagation()
		downId=getNodeId(e.target)
		downPosition.left=e.clientX
		downPosition.top=e.clientY
		downPosition.toTopDistance=e.clientY-boundXY.top
		downPosition.toLeftDistance=e.clientX-boundXY.left
		System.nodeMovingStatus=true
		//按下时应立即隐藏边框线条,通过修改样式类，防止影响拖动操作
		sideBoundClassNode.innerText=`.${sideBoundClassName}{display:none}`
		//隐藏节点顶部选择框
		System.hideNodeTopBar()
		if(e.button==2){
			//右键按下
			System.menuStatus=true
		}
	}
	const nativeOn_mousemove=function(e){
		
		if(System.linkingAnimation){
			//不处于连接选择交互时
		}
		else if(System.isDragingComponent){
		}
		else if(!drawLine){
			//拉伸对齐
			e.stopPropagation()
			if(System.nodeMovingStatus){
				if(Math.abs(e.clientX-downPosition.left)>5 || Math.abs(e.clientY - downPosition.top)>5){
					//移动前更新
					boundWH={
						width:document.getElementById("sideBar_right").getBoundingClientRect().left-document.getElementById("sideBar_left").getBoundingClientRect().left,
						height:document.getElementById("sideBar_bottom").getBoundingClientRect().top-document.getElementById("sideBar_top").getBoundingClientRect().top
					}
					movingType="move"
					createMask()
				}
			}
		}
	}
	const nativeOn_contextmenu=function(e){
		e.stopPropagation()
		e.preventDefault()
		System.callNodeMenu(e,getNodeId(e.target))
		if(!System.operatingNodes[id])
			selectNode(getNodeId(e.target))
	}
	const nativeOn_mouseover=function(e){
		e.stopPropagation()
		if(drawLine)
			System.drawAlignBound(e.target.getBoundingClientRect())
		try{
			lastLocatedNode.classList.remove('locatedNode')
		}catch{}
		let target=document.querySelector("#"+getNodeId(e.target))
		console.log('over target',target)
		while(true){
			if(target.dataset.node==1){
				break
			}else if(target.id==System.rootId || target.id==null){
				return
			}
			target=target.parentNode
		}
		lastLocatedNode=target
		System.lastLocatedNode=lastLocatedNode
		e.target.classList.add("locatedNode")
		if(System.isDragingComponent){
			System.createComAccepter(getNodeId(target))
		}
	}
	const nativeOn_mouseout=function(e){
		if(System.isDragingComponent && !System.isEnterAccepter && !['absolute','fixed','sticky'].includes(window.getComputedStyle(e.target).position)){
			System.closeComAccepter()
		}
	}
	let componentPath=componentMeta.__moduleId__
    if(useMountComponent){
		
        //创建组件根节点(根节点必须以div为元素)
		//rootEl.innerHTML=componentMeta.__ROOT__.innerContent || ''
        //设置组件根节点样式 componentMeta.STYLESTRUCT.__ROOT__.style componentMeta.STYLESTRUCT.__ROOT__.class
        let indexList=componentMeta.DOMSTRUCT[System.device].index
        let tree=componentMeta.DOMSTRUCT[System.device].tree
        let el
		let newId=""
		mountingComponent.push(1)
		
		//创建样式
		let tempSTYLESTRUCT={
			STYLESTRUCT:{}
		}
		tempSTYLESTRUCT.STYLESTRUCT[rootEl.id]=componentMeta.__ROOT__
		let [styleList,classList,float]=System.getCSSMeta(rootEl.id,tempSTYLESTRUCT,{})
		if(indexList.length>0){
			//如果有子组件，则需要使用组件创建
			//需要读取深层次组件列表
			rootEl.id=rootEl.id+"_accepter"
			let componentName=System.compressComponent(componentPath,true,{
				id:rootEl.id.replace("_accepter",''),
				'mousedown':nativeOn_mousedown,
				'mouseup':nativeOn_mouseup,
				'mouseover':nativeOn_mouseover,
				'mousemove':nativeOn_mousemove,
				'mouseout':nativeOn_mouseout,
				'contextmenu':nativeOn_contextmenu
			})
			rootEl.removeAttribute('data-node')
			mountingComponent.pop()
			return {
				acceptNode:rootEl,
				acceptNodeId:rootEl.id,
				componentName:componentName,
			}
		}else{
			//否则只需要创建一个组件即可
			
		}
        /*indexList.forEach(nodeId =>{
            //刷新变量值
            if(comPath!=nowCreatingComPath){
                //可能从子组件挂载完成后退出,此时为新的组件层次,需要刷新所有组件变量用于处理节点的条件变量绑定(合并data数据与porps数据)
                comData=componentMeta.VARLIST
				//重置挂载数据源
                nowComponentMeta=componentMeta 
                for(let key in componentMeta.PORPS){
                    comData[key]=componentMeta.PORPS[key].default
                }
                for(let propKey in props){
                    comData[propKey]=props[key]
                }
                nowCreatingComPath=comPath
            }
			//组件内的节点ID需要重新生成
			newId=Math.random().toString(32).substr(2)
            mountNode(nodeId,rootEl,tree[nodeId])
        })*/
		
		mountingComponent.pop()
		rootEl.classList.add(rootEl.id)
		id=rootEl.dataset.node=='1'?'$NODE:'+id:id
		//if(!System.nodeMeta[id]) return rootEl
        //为根节点绑定基础事件
        rootEl.onmouseup=function (e){
			nativeOn_mouseup(e)
        }
        rootEl.onmousedown=function(e){
			nativeOn_mousedown(e)
        }
        rootEl.onmousemove=function(e){
			nativeOn_mousemove(e)
        }
        rootEl.oncontextmenu=function(e){
			nativeOn_contextmenu(e)
        }
        rootEl.onmouseover=function(e){
			nativeOn_mousemove(e)
        }
        rootEl.onmouseout=function(e){
			nativeOn_mouseout(e)
        }
        //判断是否存在循环生成
		return rootEl
        /*let returnEl=[rootEl]
        for(let i=0;i<returnEl.length;i++){
            if(returnEl[i]) parent.appendChild(returnEl[i])
        }*/
    }else{
		if(componentMeta.startsWith('builtIn:')){
			//读取组件路径
			//创建样式
			let tempSTYLESTRUCT={
				STYLESTRUCT:{}
			}
			tempSTYLESTRUCT.STYLESTRUCT[rootEl.id]={
				style:{},
				class:{}
			}
			let [styleList,classList,float]=System.getCSSMeta(rootEl.id,tempSTYLESTRUCT,{})
			rootEl.classList.add(rootEl.id)
			let componentName=System.compressComponent(comPath,true,{
				id:rootEl.id,
				'mousedown':nativeOn_mousedown,
				'mouseup':nativeOn_mouseup,
				'mouseover':nativeOn_mouseover,
				'mousemove':nativeOn_mousemove,
				'mouseout':nativeOn_mouseout,
				'contextmenu':nativeOn_contextmenu
			})
			rootEl.onmouseup=function (e){
				
				nativeOn_mouseup(e)
			}
			rootEl.onmousedown=function(e){
				nativeOn_mousedown(e)
			}
			rootEl.onmousemove=function(e){
				nativeOn_mousemove(e)
			}
			rootEl.oncontextmenu=function(e){
				nativeOn_contextmenu(e)
			}
			rootEl.onmouseover=function(e){
				nativeOn_mousemove(e)
			}
			rootEl.onmouseout=function(e){
				nativeOn_mouseout(e)
			}
			mountingComponent.pop()
			return {
				acceptNode:rootEl,
				acceptNodeId:rootEl.id,
				componentName:componentName,
			}
		}else if(componentMeta.startsWith('remote:')){
			//远程请求
		}
        //远程组件挂载
		//挂载链接<script标签>
        let preScript=document.querySelector(`[data-remote=${comPath}]`)
        if(!window.remoteComponent){
            window.remoteComponent={}
        }
        if(!preScript){
            //此远程组件的链接未引入
            let script=document.createElement("script")
            script.type='text/javascript'
            script.setAttribute('data-remote',comPath)
            script.onload = script.onreadystatechange=function(){
                //设置挂载完成回调
                window.mountRemoteCallBack=(node)=>{
                    //绑定基础事件
                    let returnEl=[node]
                    for(let i=0;i<returnEl.length;i++){
                        if(returnEl[i]) parent.appendChild(returnEl[i])
                    }
                }
                //调用远程组件挂载事件
                window.remoteComponent[comPath](props)
            }
            script.src=comPath
            document.getElementsByTagName("head")[0].appendChild(script)
        }else{
            window.mountRemoteCallBack=(node)=>{
                let returnEl=[node]
                for(let i=0;i<returnEl.length;i++){
                    if(returnEl[i])
                        parent.appendChild(returnEl[i])
                }
            }
            //调用远程组件挂载事件
            window.remoteComponent[comPath]()
        }
    }
    //组件均返回null
    return null
}
//新增节点
function createNode(option){
    let parent=option.parentId
    let parenNode=document.getElementById(parent)
    let style=option.style
    let tag=option.tag
    let isComponent=tag.startsWith("$COM:")
    //生成随机ID
    let newNodeId=otherFunction.createRandomId()
    //获取父节点数据源
    let parentMetaData=System.nodeMeta.tree[parent]
    const newNodeMeta={
        'name':"新"+(isComponent?'组件':tag),
        'tag':tag,
        status:{
            lock:true,
            editing:false,
            editingMan:null
        },
        propertype:{
            id:'$NEW:'+newNodeId
        },
        event:{},
        condition:{},
        parent:parent,
    }
    //针对是否为组件再次设置元数据
    if(isComponent){
        let path=tag.slice(5,tag.length)
        if(path.length>0){
            //设置__modulePath__属性
            newNodeMeta.__modulePath__=path
            //设置props属性，默认创建时不传入任何值
            newNodeMeta.props={}
        }
        else{
            System.showToast("创建组件节点时出错:ID标识为空",2000)
        }
    }else{
        newNodeMeta.children=[]
    }

    let http=new XMLHttpRequest()
    http.open('POST',"/updateResource",true)
    http.onreadystatechange=()=>{
        if(http.readyState==4 && http.status==200){
            //更新成功
            parentMetaData.children.push(newNodeId)
            System.nodeMeta.tree[newNodeId]=newNodeMeta
            if(isComponent){
                //组件的挂载
                mountNode(newNodeId,parenNode,newNodeMeta)
            }else{
                //标签的挂载
                mountNode(newNodeId,parenNode,option)
            }
        }
    }
}
//更新选择数
function refreshNumber(){
	if(refreshNumberTimeout_y!=null)
		clearTimeout(refreshNumberTimeout_y)
	refreshNumberTimeout_y=setTimeout(()=>{
		yScaleNumber=0
		for(let key in System.operatingNodes){
			key=key.replace('$NODE:',"")
			if(!['left','right'].includes(System.getElement(key).style.float)) yScaleNumber++
		}
		refreshNumberTimeout_y=null
	},200)
	if(refreshNumberTimeout_x!=null)
		clearTimeout(refreshNumberTimeout_x)
	refreshNumberTimeout_x=setTimeout(()=>{
		let preNode=document.querySelectorAll(".drawUI_moveNode_class")
		preNode.forEach(node =>{
			node.classList.remove('drawUI_moveNode_class')
		})
		xScaleNumber=0
		for(let key in System.operatingNodes){
			key=key.replace('$NODE:',"")
			document.querySelectorAll('.'+key).forEach((node)=>{
				node.classList.add('drawUI_moveNode_class')
			})
			//if(['left','right'].includes(document.getElementById(key).style.float)) xScaleNumber++
		}
		refreshNumberTimeout_x=null
	},200)
}
function selectNode(nodeId){
	nodeId=nodeId.replace('$NODE:','').replace("_accepter","")
	console.log('selectNode')
	if(!System.nodeMeta.tree[nodeId]){
	    let selectNode=System.getElement(nodeId)
		console.log('selectNode',nodeId,selectNode)
		if(!selectNode) return
	    while(true){
			if(selectNode.dataset.node=='1'){
				//如果是组件节点
				if(System.nodeMeta.tree['$NODE:'+selectNode.id]){
					nodeId='$NODE:'+selectNode.id
					break
				}
			}else if(System.nodeMeta.tree[selectNode.id]){
				nodeId=selectNode.id
				break
			}else if(selectNode.id==System.rootId){
				//遍历到根节点都没有，则直接返回
				System.showToast("此节点可能为其它组件内节点，禁止在当前页面操作",2000)
				return
			}
			selectNode=selectNode.parentNode
		}
	}
	
	/*if(document.getElementById(nodeId))
		nodeId=document.getElementById(nodeId).dataset.node=='1'?'$NODE:'+nodeId:nodeId*/
	if(!System.nodeMeta.tree[nodeId]){
	    System.showToast("此节点可能为其它组件内节点，禁止在当前页面操作1",2000)
	    return
	}
    //非最外层时逐步向上递归至可以操作的节点层次
	let parentNodeId
    if(System.nodeMeta.index.indexOf(nodeId)==-1 && !System.checkFocusNode(nodeId)){
		//如果在聚焦记录中则不需要查找父节点
        try{
            while(true){
				parentNodeId=System.nodeMeta.tree[nodeId].parent
				//移除父层级的移动样式类
				if(parentNodeId!==null) document.getElementById(parentNodeId).classList.remove(moveClassName)
                //console.log("父级聚焦",parentNodeId,System.nodeMeta.tree,System.checkFocusNode(parentNodeId))
				if(parentNodeId==null || System.nodeMeta.tree[parentNodeId].status.lock==0 || System.checkFocusNode(parentNodeId)){
                    //达到最外层或父节点已解锁或父层级在聚焦层次中
					
					break
                }
                nodeId=parentNodeId
            }
        }catch(e){
			console.error(e)
            System.showToast("此节点可能为其它组件内节点1，禁止在当前页面操作",2000)
			refreshNumber()
            return
        }
    }
	console.log('selectnode',nodeId)
	let box=document.getElementById(nodeId)
    if(System.operatingNodes[nodeId]){
		//若原来节点已被选择
		if(System.menuStatus){
			System.operatingNodes[nodeId]=true
			System.updateOperateNode(System.operatingNodes)
			drawSelectBound()
			//若是右键按下，则不进行任何修改，直接返回
			return
		}
		else if(!(Object.keys(System.operatingNodes).length>1 && !System.keybord.shift )){
			//在选中的多个中在点击其中一个，且shift键没有按下,则转为只选择一个
			//原先已选中,且非多选中已选中的，则此时取消选择
			delete System.operatingNodes[nodeId]
			//锁定原先所有
			System.lockNode(System.unLockList)
			nodeId=nodeId.replace('$NODE:',"")
			document.querySelectorAll("."+nodeId).forEach(node=>{
				node.classList.remove(moveClassName)
			})
			//还要防止组件出错
			try{
				System.getElement(nodeId).querySelectorAll("#"+nodeId).forEach(node=>{
					node.classList.remove(moveClassName)
				})
			}catch{}
			//box.classList.remove(moveClassName)
			drawSelectBound()
			//更新选择列表
			System.updateOperateNode(System.operatingNodes)
			refreshNumber()
			return
		}
    }
	//shift未按下，且非多选框选择以及非聚焦节点
    if(!System.keybord.shift && !System.selectMoreNode && !System.checkFocusNode(nodeId)){
		//移除之前选择的所有节点的移动样式类
		//锁定原先所有已经解锁的列表
		//获取当前节点的父级节点
		let parentList=System.getParentList(nodeId)
		for(let key in System.unLockList){
			if(!parentList.includes(key)){
				System.lockNode(key)
			}
		}
		for(let id in System.operatingNodes){
			document.querySelectorAll("."+id.replace('$NODE:',"")).forEach(node=>{
				node.classList.remove(moveClassName)
			})
			try{
				System.getElement(id.replace('$NODE:',"")).querySelectorAll("#"+id.replace('$NODE:',"")).forEach(node=>{
					node.classList.remove(moveClassName)
				})
			}catch{}
		}
        //若未按下shift键，且非拖拽选择,即未多选，则先清空所有选中
        System.operatingNodes={}
    }
    //将节点选中状态记录
    System.operatingNodes[nodeId]=true
	//box.classList.add(moveClassName)
	//计算缩放比例
	try{
		scaleValuePercent[nodeId]=otherFunction.scaleValuePercent(box)
	}catch(e){}
	//更新选择列表
	for(let key in System.beforeOpeNodesAction){
		try{
			System.beforeOpeNodesAction[key]()
		}catch{}
	}
	System.updateOperateNode(System.operatingNodes)
    drawSelectBound()
	System.selectMoreNode=false
	refreshNumber()
}
//记录当前被拖动的顶点以及随动点，若移动左上角的点时，x方向移动为左下角点，y方向移动为右上角点
var nowDragingPoint=null,nowDragingPoint_x=null,nowDragingPoint_y=null

//为顶点和四个边框赋值事件
function setSideEvent(dom,direct,i=-1,type='point'){
    dom.onmousedown=(e)=>{
		//隐藏节点旋转、圆角栏
		System.hideNodeTopBar()
		movingType='scale'
		e.stopPropagation()
		//清除移动记录
		scaleChange={}
		//记录原先宽高,可能拉伸后停止再拉伸，则原先宽高会被改变，应该更新
		boundWH={
			width:document.getElementById("sideBar_right").getBoundingClientRect().left-document.getElementById("sideBar_left").getBoundingClientRect().left,
			height:document.getElementById("sideBar_bottom").getBoundingClientRect().top-document.getElementById("sideBar_top").getBoundingClientRect().top
		}
        //赋值其它移动点
        scaleChange.sideType=0
		let cursor=['top','bottom'].includes(direct)?"ns-resize":"ew-resize" 
		
		//边拖动时，共线上的两点也要移动
		if(['left','right'].includes(direct)){
			nowDragingPoint_x=document.getElementById("sidePoint_"+direct+"_top")
			nowDragingPoint_y=document.getElementById("sidePoint_"+direct+"_bottom")
		}else if(['top','bottom'].includes(direct)){
			nowDragingPoint_x=document.getElementById("sidePoint_left_"+direct)
			nowDragingPoint_y=document.getElementById("sidePoint_right_"+direct)
		}
		
        if(type=='point'){
            scaleChange.sideType=1
            nowDragingPoint=e.target
			let yName=direct[1]=='top'?'bottom':'top'//取得是另一边
			let xName=direct[0]=='left'?'right':'left'
            nowDragingPoint_x=document.getElementById("sidePoint_"+direct[0]+"_"+yName)
            nowDragingPoint_y=document.getElementById("sidePoint_"+xName+"_"+direct[1])
			i%2==0?"nwse-resize":"nesw-resize"
        }

        //移动准备就绪
        System.nodeMovingStatus=true
        //记录按下位置
        const rect=e.target.getBoundingClientRect()
        downPosition.left=rect.left
        downPosition.top=rect.top
        //记录边框参数 宽度、高度、left值、top值
        downPosition.targetLeft=e.target.style.left.replace("px","")*1
        downPosition.targetTop=e.target.style.top.replace("px","")*1
        //创建移动蒙版
        createMask(e,cursor,direct)
    }
}
//对齐点事件
const moveLine=(e)=>{
	if(drawLine)
		System.drawAlignment(e)
}
let drawLine=false
const circleDirect={
	"left":"x",
	"right":"x",
	"top":"y",
	"bottom":"y"
}
//设置抛出线条按钮事件
function setCircleEvent(dom,direct){
    dom.onmousedown=(e)=>{
		drawLine=true
		let position=circleDirect[direct]
		//设置拉伸方向
		scaleChange[position+"side"]=direct
		e.stopPropagation()
		System.startDrawAlign(e,position,direct)
		window.onmouseup=()=>{
			System.drawAlignBound(false)
			drawLine=false
			window.onmousemove=null
			window.onmouseup=null
		}
		window.onmousemove=moveLine
    }
}

//清除选择边框
function clearBoundSide(type=0){
	try{
		//隐藏圆角旋转选择框
		System.callRadiusRotate(null,null)
		let list=textData.sideIdList
		let dom
		for(let i=0;i<list.length;i++){
			dom=document.getElementById(list[i])
			if(dom){
				switch(type){
					case 0://删除
						dom.remove()
						break
					case 1://隐藏
						dom.style.display="none"
						break
					case 2://显示
						dom.style.display=""
						break
				}
			}else{
				return
			}
		}
	}catch(e){
		console.error(e)
	}
}
//绘制选择边框
function drawSelectBound(side_enter,targetList=System.operatingNodes){
	//当没有选择对象时清除
	//隐藏边框线条,通过修改样式类
	sideBoundClassNode.innerText=`.${sideBoundClassName}{display:none}`
	//隐藏节点顶部选择框
	System.hideNodeTopBar()
	if(Object.keys(targetList).length==0)
		clearBoundSide()
	let boundList=[]
	let bounding
	//读取位置信息
	let tempKey
	for(let key in targetList){
		tempKey=key.replace("$NODE:","")
		bounding=System.getElement(tempKey).getBoundingClientRect() 
		if(targetList[key]){
			boundList.push(
				{
					left:bounding.left,
					right:bounding.left+bounding.width,
					top:bounding.top ,
					bottom:bounding.top+bounding.height
				}
			)
		}
	}
	console.log('bound',boundList)
	setTimeout(()=>{
		worker.postMessage(boundList)
	},100)
	const direct=[['left','top'],['right','top'],['right','bottom'],['left','bottom']]
	const pointCss=textData.pointCss
	const sideCss=textData.sideCss
	const sideCircleCss=textData.sideCircleCss
	worker.onmessage=(sideBound)=>{
		console.log("sideBound",sideBound)
		//绘制四个顶点
		sideBound=sideBound.data
		let outLeft=document.getElementById("projectFrameInner").getBoundingClientRect().left-document.getElementById("projectFrameInner").style.left.replace("px","")*1
		let outTop=document.getElementById("projectFrameInner").getBoundingClientRect().top-document.getElementById("projectFrameInner").style.top.replace("px","")*1
		let existNode_point=true
		let point
		for(let i =0;i<4;i++){
			existNode_point=true
			point=document.getElementById("sidePoint_"+direct[i][0]+"_"+direct[i][1])  
			if(!point){
				//不存在时创建，否则直接修改位置
				existNode_point=false
				point=document.createElement("div")
				//绑定样式类，在移动时控制隐藏
				point.className=sideBoundClassName
				point.style.cssText=pointCss
				point.style.cursor=i%2==0?"nwse-resize":"nesw-resize"
				point.id="sidePoint_"+direct[i][0]+"_"+direct[i][1]
				//赋值事件
				setSideEvent(point,direct[i],i)
				document.getElementById("projectFrameOut").appendChild(point)
			}
			point.style.left=(sideBound[direct[i][0]]-outLeft-(i==0 || i==3?8:0))+'px'
			point.style.top=(sideBound[direct[i][1]]-outTop-(i==0 || i==1?8:0))+'px'
		}
		//记录当前边框位置
		boundXY={
			left:sideBound.left-outLeft,
			top:sideBound.top-outTop
		}
		//记录边框宽高
		boundWH={
			width:sideBound.right-sideBound.left,
			height:sideBound.bottom-sideBound.top
		}
		//绘制四条边与边中心点
		let sideBars=['left','top','right','bottom']
		let side,sideCircle
		let existNode_side=true,existNode_circle=true
		for(let i=0;i<sideBars.length;i++){
			existNode_side=true,existNode_circle=true
			side=document.getElementById("sideBar_"+sideBars[i]) 
			if(!side){
				existNode_side=false
				side=document.createElement("div")
				//绑定样式类，在移动时控制隐藏
				side.className=sideBoundClassName
			}
			
			sideCircle=document.getElementById("sideCircle_"+sideBars[i])   
			if(!sideCircle){
				existNode_circle=false
				sideCircle=document.createElement("div")
			}
			//绑定样式类，在移动时控制隐藏
			sideCircle.className=sideBoundClassName
			if(!existNode_side){
				side.style.cssText=sideCss
				side.id="sideBar_"+sideBars[i]
			}
			if(!existNode_circle){
				sideCircle.style.cssText=sideCircleCss
				sideCircle.id="sideCircle_"+sideBars[i]
			}
			switch(i){
				case 0:
					//左
					if(!existNode_side){
						side.style.width="2px"
						side.style.cursor="ew-resize"
					}
					side.style.height=`${sideBound.bottom-sideBound.top}px`
					side.style.left=`${sideBound.left-outLeft}px`
					side.style.top=`${sideBound.top-outTop}px`
					
					if(!existNode_circle){
						sideCircle.style.width="8px"
						sideCircle.style.height=`16px`
					}
					sideCircle.style.left=`${sideBound.left-outLeft-8}px`
					sideCircle.style.top=`${sideBound.top-outTop+(sideBound.bottom-sideBound.top)/2-8}px`
					break
				case 1:
					//上
					if(!existNode_side){
						side.style.height="2px"
						side.style.cursor="ns-resize"
					}
					side.style.width=`${sideBound.right-sideBound.left}px`
					side.style.left=`${sideBound.left-outLeft}px`
					side.style.top=`${sideBound.top-outTop}px`
					
					if(!existNode_circle){
						sideCircle.style.width="16px"
						sideCircle.style.height=`8px`
					}
					sideCircle.style.left=`${sideBound.left-outLeft+(sideBound.right-sideBound.left)/2-8}px`
					sideCircle.style.top=`${sideBound.top-outTop-8}px`
					break
				case 2:
					//右
					if(!existNode_side){
						side.style.width="2px"
						side.style.cursor="ew-resize"
					}
					side.style.height=`${sideBound.bottom-sideBound.top}px`
					side.style.left=`${sideBound.right-outLeft}px`
					side.style.top=`${sideBound.top-outTop}px`
					
					if(!existNode_circle){
						sideCircle.style.width="8px"
						sideCircle.style.height=`16px`	
					}
					sideCircle.style.left=`${sideBound.right-outLeft-0}px`
					sideCircle.style.top=`${sideBound.top-outTop+(sideBound.bottom-sideBound.top)/2-8}px`
					break
				case 3:
					//下
					if(!existNode_side){
						side.style.height="2px"
						side.style.cursor="ns-resize"
					}
					side.style.width=`${sideBound.right-sideBound.left}px`
					side.style.left=`${sideBound.left-outLeft}px`
					side.style.top=`${sideBound.bottom-outTop}px`
					
					if(!existNode_circle){
						sideCircle.style.width="16px"
						sideCircle.style.height=`8px`
					}
					sideCircle.style.left=`${sideBound.left-outLeft+(sideBound.right-sideBound.left)/2-8}px`
					sideCircle.style.top=`${sideBound.bottom-outTop-0}px`
					break
			}
			if(!existNode_side){
				document.getElementById("projectFrameOut").appendChild(side)
				//赋值事件
				setSideEvent(side,sideBars[i],-1,'side')
			}
			if(!existNode_circle){
				document.getElementById("projectFrameOut").appendChild(sideCircle)
				setCircleEvent(sideCircle,sideBars[i])
			}
		}
		//绘制圆角与旋转框
		System.callRadiusRotate(
			sideBound.left-outLeft+(sideBound.right-sideBound.left)/2-3,
			sideBound.top-outTop+20
		)
		//等待重新绘制边框位置后显示边框线条,通过修改样式类
		sideBoundClassNode.innerText=``
		//显示节点顶部选择框
		System.showNodeTopBar()
	}
}

//拉伸节点
function scaleNode(e,direct,targetList=System.operatingNodes){
    let distance,xdirect=false,ydirect=false,moveLeft=false,moveTop=false
	let xFlag=1,yFlag=1
	//当左边移动时，xFlag为-1，用于计算distance是加还是减
    if(~direct.indexOf("left")){
        //左边移动
        scaleChange.xside='left'//设置移动边
        distance=e.clientX-downPosition.left//计算移动距离
        xdirect=distance<0?'left':'right'//设置移动方向
		moveLeft=true//记录为左边移动
		xFlag=-1
    }else if(~direct.indexOf("right")){
        //右边移动
        scaleChange.xside='right'
        distance=e.clientX-downPosition.left
        xdirect=distance>0?'right':'left'
    }
	let left
    if(scaleChange.sideType==1 || ['left','right'].includes(direct)){
        //有两个值或是传入方向为left right时x相关参数一定存在
		//设置移动数据中的横向移动距离
        scaleChange.xdistance=distance
		//记录移动数据中的横向移动方向
        scaleChange.xdirect=xdirect
        let box=document.getElementById("sideBar_"+(scaleChange.sideType==0 ?direct:direct[0]))
		let topBox=document.getElementById("sideBar_top")
		let bottomBox=document.getElementById("sideBar_bottom")
		//新的left值等于按下时原先的left值加上移动距离
		left=downPosition.targetLeft+distance
		box.style.left=left+"px"
		if(moveLeft){
			//左边移动时才需要改变上下left并重新更新边框x位置
			//上下两边的边框处理
			topBox.style.left=left+"px"
			bottomBox.style.left=left+"px"
			//更新当前边框位置
			boundXY.left=left
		}
        topBox.style.width=(boundWH.width+distance*xFlag)+"px"
        bottomBox.style.width=(boundWH.width+distance*xFlag)+"px"
    }
	System.pageTop=0
    if(~direct.indexOf("top")){
        //上边移动
        scaleChange.yside='top'
        distance=e.clientY-downPosition.top-System.pageTop
        ydirect=distance<0?'top':'bototm'
		moveTop=true
		yFlag=-1
    }else if(~direct.indexOf("bottom")){
        //底边移动
        scaleChange.yside='bottom'
		//System.pageTop:除去浏览器上部分
        distance=e.clientY-downPosition.top-System.pageTop
        ydirect=distance>0?'bottom':'top'
    }
	let top
    if(scaleChange.sideType==1 || ['top','bottom'].includes(direct)){
        //有两个值或是传入方向为top bottom时y相关参数一定存在
        scaleChange.ydistance=distance
        scaleChange.ydirect=ydirect
        let box=document.getElementById("sideBar_"+(scaleChange.sideType==0 ?direct:direct[1]))
		let leftBox=document.getElementById("sideBar_left")
		let rightBox=document.getElementById("sideBar_right")
        top=downPosition.targetTop+distance
        box.style.top=top+"px"
        //左右两边的边框处理
		if(moveTop){
			leftBox.style.top=top+"px"
			rightBox.style.top=top+"px"
			boundXY.top=top
		}
        leftBox.style.height=(boundWH.height+distance*yFlag)+"px"
        rightBox.style.height=(boundWH.height+distance*yFlag)+"px"
    }
	
	if(scaleChange.sideType==1){
	    //顶点拖拽
	    //移动其它顶点
	    nowDragingPoint.style.top=(top-4)+"px"
	    nowDragingPoint.style.left=(left-4)+"px"
	    nowDragingPoint_x.style.left=(left-4)+"px"
	    nowDragingPoint_y.style.top=(top-4)+"px"
	}else{
		//边框移动，移动共线上的两点
		if(ydirect!==false){
			//移动上下两边
			//左上角或左下角
			nowDragingPoint_x.style.top=(top-4)+"px"
			//右上角或右下角
			nowDragingPoint_y.style.top=(top-4)+"px"
		}else if(xdirect!==false){
			//移动左右两边
			//左上角或右上角
			nowDragingPoint_x.style.left=(left-4)+"px"
			//左下角或右下角
			nowDragingPoint_y.style.left=(left-4)+"px"
		}
	}
}

//处理翻转
const tempOpSide={
	'left':"right",
	"right":"left",
	'bottom':"top",
	"top":"bottom"
}
function processOverturn(id,index,direct,Value){
	let temp={}
	temp[id]=true
	let transformData=document.getElementById(id+"_style").innerText
	let transfromReg=new RegExp(`transform-origin(:{1})([^;])+;{1}`)
	//若发生翻转，则在按下左边时，实际处理的为右边，按下右边时，实际处理的为左边
	let origin=transformData.match(transfromReg)[0].replace("transform-origin:","").split(" ")[index]
	let isAbsolute=System.metaData.STYLESTRUCT[id].style.position
					?['absolute','fixed','sticky'].includes(System.metaData.STYLESTRUCT[id].style.position.children.position)
					:false
	let actionIndex={
		"right":"A_Action",
		"left":"B_Action",
		"bottom":"A_Action",
		"top":"B_Action"
	}[direct]
	let s={
		'right':'x',
		'left':'x',
		'top':'y',
		'bottom':'y'
	}[direct]
	let absoluteOrigin=System.metaData.STYLESTRUCT[id].style.absoluteOrigin
					   ?System.metaData.STYLESTRUCT[id].style.absoluteOrigin[s]
					   :absoluteOrigin={"x":'left','y':'top'}[s]
	let preValue=isAbsolute?(System.metaData.STYLESTRUCT[id].style[direct]?System.metaData.STYLESTRUCT[id].style[direct].children.value:0):0
	let flag=direct==absoluteOrigin?1:-1
	let originEnd=index===0?"":";"
	let opDirect={
		left:"right",
		top:"bottom",
		right:'left',
		bottom:'top'
	}[direct]
	let a=""
	const actions={
		"A_Action":()=>{
			if(scaleChange[s+'side']==direct){//发生了由右向左的翻转，此时按下右边，执行的即是原来左边的
				if(transfromReg.test(transformData) && origin==direct+originEnd)
				{
					isAbsolute
					?System.resetAbsolutePosition(id,s,flag*2*Value,direct,opDirect)
					:(index==0?finishMove({},temp,2*Value,0):finishMove({},temp,0,2*Value))
				}else{
					isAbsolute
					?(flag>0?finishMove({},temp,0,1*Value):finishMove({},temp,0,1*Value))
					:(index==0?finishMove({},temp,-1*Value,0):finishMove({},temp,0,-1*Value))
				}
			}else{
				if(transfromReg.test(transformData) && origin==direct+originEnd)
				{
					isAbsolute
					?(flag>0?finishMove({},temp,0,-2*Value):finishMove({},temp,0,2*Value))
					:(index==0?finishMove({},temp,2*Value,0):finishMove({},temp,0,2*Value))
				}else if(transfromReg.test(transformData) && origin=='center'+originEnd)
				{
					if(isAbsolute){
						if(direct=='bottom' && absoluteOrigin!='bottom'){
							finishMove({},temp,0,1*Value)
						}else if(direct=='right'){
							absoluteOrigin=='right'?finishMove({},temp,-1*Value,0):finishMove({},temp,1*Value,0)
						}
					}else{
						index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
					}
				}
			}
		},
		'B_Action':()=>{
			if(scaleChange[s+'side']==opDirect){
				if(transfromReg.test(transformData) && origin==direct+originEnd)
				{
					if(isAbsolute && (absoluteOrigin!==direct))
						index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
					else
						index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
				}else if(transfromReg.test(transformData) && origin.includes("px"))
				{
					if(isAbsolute && (absoluteOrigin!==direct))
						index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
					else
						index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
				}
				else if(origin!='center'+originEnd){
					if(isAbsolute && (absoluteOrigin!==direct))
						index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
					else
						index==0?finishMove({},temp,-1*Value,0):finishMove({},temp,0,-1*Value)
				}else if(isAbsolute && (absoluteOrigin!==direct)){
					index==0?finishMove({},temp,1*Value,0):finishMove({},temp,0,1*Value)
				}
			}else{
				if(transfromReg.test(transformData)&&origin=='center'+originEnd)
				{
					isAbsolute
					?System.resetAbsolutePosition(id,s,flag*-1*Value,direct,opDirect)
					:(index==0?finishMove({},temp,-1*Value,0):finishMove({},temp,0,-1*Value))
				}
			}
			opDirect=null
		}
	}
	actions[actionIndex]()
}
//读取下一个相对元素
function getNextRelativeElment(box){
	let nextBox=box.nextElementSibling
	let nextBoxPositon
	while(nextBox){
		if(nextBox===null) break
		else if(nextBox.id!="" && !['absolute','fixed','sticky'].includes(window.getComputedStyle(nextBox).position)){
			break
		}
		else nextBox=nextBox.nextElementSibling
	}
	return nextBox
}
//处理相邻元素
function processNextElement_x(box,xValue){
	let nextBox=getNextRelativeElment(box)
	if(!nextBox) return
	let nextID=nextBox.id
	if(nextBox.dataset.node=='1') nextID='$NODE:'+nextID
	let float=System.metaData.STYLESTRUCT[nextID].style['float']?['left','right'].includes(System.metaData.STYLESTRUCT[nextID].style['float'].children.float):false
	if(float){
		let temp={}
		temp[nextID]=true
		finishMove({},temp,-xValue,0,false,false)
	}
}
//横向拉伸处理
const tempOpSideX={
	'left':"right",
	"right":"left"
}
function scaleX(box,left,xValue,type='absolute',xKey='left'){
	//若是上边框拉动，则检测定位方式，若上边相关参数(marginLeft,left)存在或上下参数都不存在，则以以上边相关参数计算，若上边相关参数不存在，而下边存在，
	//则不需要设置上边相关参数，只需要修改宽度
	//若是下边框拉动，则检测定位方式，若上边相关参数(marginLeft,left)存在或上下参数都不存在,则不需要设置上边相关参数，只需要修改宽度,
	//若是上边相关参数不存在而下边存在，则以下边相关参数计算
	let x=type=='absolute'?'left':'marginLeft'
	//相反方向
	let x_op=type=='absolute'?'right':'marginRight'
	let head=type=='absolute'?x:"margin"
	//检测是否有transform中的rotate scale导致节点翻转
	let reg=new RegExp(/(scale|scaleX|rotate|rotate3d)\(([^\)]+)\){1}/g)
	let transleft=0
	let	width=0
	if(xScaleNumber==0) xScaleNumber=1
	let valuePercent=scaleValuePercent[box.id]['xside']
	let realSide=valuePercent<0?tempOpSideX[scaleChange.xside]:scaleChange.xside
	let boxID=box.dataset.node=='1'?'$NODE:'+box.id:box.id
	let preWidthData=System.metaData.STYLESTRUCT[boxID].style.width
	
	let preFLoat=System.metaData.STYLESTRUCT[boxID].style.float?System.metaData.STYLESTRUCT[boxID].style.float.children.float:null
	if(realSide!==scaleChange.xside){
		processOverturn(box.id,0,realSide,xValue)
	}else if(realSide=='left'){
		//若为absolute类型，则判断xkey
		if(type=='absolute' && xKey=='left'){
			//减少left值，增加width值
			left+=xValue
			transleft=left
			System.writeToClass(box.id,x,left.toFixed(0)+"px")
			System.resetAbsolutePosition(box.id,'x',left.toFixed(0)*1,'left','right')
		}else if(type=='margin'){
			//若float为left或不存在float
			(preFLoat=='left' || !preFLoat)
			?(()=>{
				//margin-left减少
				left+=xValue
				transleft=left
				System.writeToClass(box.id,x,left.toFixed(0)+"px")
				moveScaleWrite(box.id,head,x,transleft,xValue,box.parentNode.id)
				System.reloadData(head,{},box.id)
			 })()
			:(()=>{/*没有float或float非left*/})()
		}
		//写回位置数据
	}else if(realSide=='right'){
		//若为absolute类型，则判断xkey
		if(type=='absolute' && xKey=='right'){
			//减少left值，增加width值
			left-=xValue
			transleft=left
			System.writeToClass(box.id,'right',left.toFixed(0)+"px")
			System.resetAbsolutePosition(box.id,'x',left.toFixed(0)*1,'right','left')
		}else if(type=='margin'){
			//若float为left
			preFLoat=='right'
			?(()=>{
				//margin-left减少
				left-=xValue
				transleft=left
				System.writeToClass(box.id,x,left.toFixed(0)+"px")
				moveScaleWrite(box.id,head,x,transleft,xValue,box.parentNode.id)
				System.reloadData(head,{},box.id)
			 })()
			:(()=>{})()
		}
	}
	if(realSide=='left'){
		width=box.offsetWidth - xValue*valuePercent
		preWidthData.children.value=width.toFixed(0)*1
		preWidthData.children.unit="px"
		System.requestProcessStyle('width',box.id,preWidthData,true)
		//System.writeToClass(box.id,'width',width.toFixed(0) + 'px')
		//写回宽高数据
		//id,head,child,transdata,offset,parentId,reload=true
		moveScaleWrite(box.id,'width','',width,transleft,box.parentNode.id)
		//processNextElement_y(box,yValue)
		System.reloadData('width',{},box.id)
		return
	}
	//否则就是拖动底部
	if(type!='absolute') processNextElement_x(box,xValue)
	width=box.offsetWidth + xValue*valuePercent
	preWidthData.children.value=width.toFixed(0)*1
	preWidthData.children.unit="px"
	System.requestProcessStyle('width',box.id,preWidthData,true)
	//System.writeToClass(box.id,'width',width.toFixed(0) + 'px')
	//写回宽高数据
	moveScaleWrite(box.id,'width','',width,transleft,box.parentNode.id)
	System.reloadData('width',{},box.id)
}
//处理相邻元素
function processNextElement_y(box,yValue){
	let nextBox=getNextRelativeElment(box)
	if(!nextBox){
		return
	}
	if(['left','right'].includes(nextBox.style.float)){
		return
	}
	/*let temp={}
	temp[nextBox.id]=true
	finishMove({},temp,0,-yValue,false,false)*/
	let boxID=box.dataset.node=='1'?'$NODE:'+box.id:box.id
	let float=System.metaData.STYLESTRUCT[boxID].style['float']
	if(float){
		float=['left','right'].includes(float.children.float)
	}
	if(!float){
		let nextBoxPositon
		let nodeStyle=document.getElementById(nextBox.id+"_style")
		let preTop=window.getComputedStyle(nextBox).marginTop.replace("px","")*1
		let transtop=(preTop-yValue).toFixed(1)
		let reg=new RegExp(`margin-top(:{1})([^;])+;{1}`,'g')
		if(reg.test(nodeStyle.innerText))
			nodeStyle.innerText=nodeStyle.innerText.replace(reg,`margin-top:${transtop}px;`)
		else
			nodeStyle.innerText=nodeStyle.innerText.replace("}",`margin-top:${transtop}px;}`)
		//数据写回
		moveScaleWrite(nextBox.id,'margin','marginTop',transtop,yValue,nextBox.parentNode.id,false)
	}
}
//竖向拉伸处理
const tempOpSideY={
	'top':"bottom",
	"bottom":"top"
}
function scaleY(box,top,yValue,type='absolute',yKey='top'){
	//若是上边框拉动，则检测定位方式，若上边相关参数(marginLeft,left)存在或上下参数都不存在，则以以上边相关参数计算，若上边相关参数不存在，而下边存在，
	//则不需要设置上边相关参数，只需要修改宽度
	//若是下边框拉动，则检测定位方式，若上边相关参数(marginLeft,left)存在或上下参数都不存在,则不需要设置上边相关参数，只需要修改宽度,
	//若是上边相关参数不存在而下边存在，则以下边相关参数计算
	let y=type=='absolute'?'top':'marginTop'
	//相反方向
	let y_op=type=='absolute'?'bottom':'marginBottom'
	let head=type=='absolute'?y:"margin"
	//检测是否有transform中的rotate scale导致节点翻转
	let reg=new RegExp(/(scale|scaleY|rotate|rotate3d)\(([^\)]+)\){1}/g)
	
	let transtop=0
	let height=0
	if(yScaleNumber==0) yScaleNumber=1
	let valuePercent=scaleValuePercent[box.id]['yside']
	let realSide=valuePercent<0?tempOpSideY[scaleChange.yside]:scaleChange.yside
	if(realSide!==scaleChange.yside){
		processOverturn(box.id,1,realSide,yValue)
	}else if(realSide=='top' && yKey=='top'){
		if(box.style[y]!="" || (box.style[y_op]=="" && box.style[y]=="")){
			transtop=top+yValue
		    top+=yValue
		    //box.style[y]=top+"px"
			System.writeToClass(box.id,y,top+"px")
		}else if(box.style[y_op]!="" && box.style[y]==""){
			transtop=top-yValue
		}
		//写回位置数据
		moveScaleWrite(box.id,head,y,transtop,yValue,box.parentNode.id)
		//更新样式列表
		System.reloadData(head,{},box.id)
	}else if(realSide=='bottom' && yKey=='bottom'){
		transtop=top-yValue
		top-=yValue
		System.writeToClass(box.id,yKey,top+"px")
		System.resetAbsolutePosition(box.id,'y',top.toFixed(0)*1,'bottom','top')
		//写回位置数据
		//moveScaleWrite(box.id,head,yKey,transtop,-yValue,box.parentNode.id)
	}
	if(realSide=='top'){
		height=box.offsetHeight - yValue*valuePercent
		System.writeToClass(box.id,'height',height.toFixed(0) + 'px')
		//写回宽高数据
		//id,head,child,transdata,offset,parentId,reload=true
		moveScaleWrite(box.id,'height','',height,transtop,box.parentNode.id)
		//processNextElement_y(box,yValue)
		//更新样式列表
		System.reloadData('height',{},box.id)
		return
	}
	//否则就是拖动底部
	if(type!='absolute') processNextElement_y(box,yValue)
	height=box.offsetHeight + yValue*valuePercent
	System.writeToClass(box.id,'height',height.toFixed(0) + 'px')
	//写回宽高数据
	moveScaleWrite(box.id,'height','',height,transtop,box.parentNode.id)
	//更新样式列表
	System.reloadData('height',{},box.id)
}
//通过设置参数对节点进行拉伸
function setScaleData(direct,distance){
	let op={x:'y',y:'x'}[direct]
	//设置x时y为假，反之亦然
	scaleChange[op+"direct"]=false
	scaleChange[op+'distance']=0
	scaleChange[direct+"direct"]=true
	scaleChange[direct+'distance']=distance
	finishScaleNode()
}
//拖拽完成，绘制所有节点
function finishScaleNode(targetList=System.operatingNodes){
	//隐藏边框线条,通过修改样式类
	sideBoundClassNode.innerText=`.${sideBoundClassName}{display:none}`
	//隐藏节点顶部选择框
	System.hideNodeTopBar()
    let box,positon,left,top,xValue=null,yValue=null
	let offset=scaleChange.sideType==1?4:0
    if(scaleChange.xdirect){
		//移动距离除以缩放比例得到真实移动距离
        xValue=((scaleChange.xdistance-offset)/System.scalePercent).toFixed(1)*1
    }
    if(scaleChange.ydirect){
		//移动距离除以缩放比例得到真实移动距离
        yValue=((scaleChange.ydistance-offset)/System.scalePercent).toFixed(1)*1
    }
	let style
	let xKey,yKey,parentId
    for(let key in targetList){
		parentId=System.getParentId(key) || 'projectFrameInner'
		if(scaleChange.sideType==1){
			//此时要清除各个节点中的长宽比例
			System.metaData.STYLESTRUCT[key].style['aspectRatio']
			?System.metaData.STYLESTRUCT[key].style['aspectRatio']=JSON.parse(JSON.stringify(System.stylePropertype.aspectRatio))
			:(()=>{})()

		}
        box=document.getElementById(key.replace('$NODE:',""))
		style=window.getComputedStyle(box)
		if(xValue>box.getBoundingClientRect().width) xValue=box.getBoundingClientRect().width
		if(yValue>box.getBoundingClientRect().height) yValue=box.getBoundingClientRect().height
        positon=style.position
        if(['absolute','fixed'].includes(positon)){
			if(!System.metaData.STYLESTRUCT[key].style['absoluteOrigin']){
				xKey='left'
				yKey='top'
			} 
			else{
				xKey=System.metaData.STYLESTRUCT[key].style['absoluteOrigin'].x
				yKey=System.metaData.STYLESTRUCT[key].style['absoluteOrigin'].y
			} 
			//读取当前位置
			left=box.offsetLeft//document.getElementById(nodeId).offsetLeft//(document.getElementById(nodeId).getBoundingClientRect()[xKey]-document.getElementById(parentId).getBoundingClientRect()[xKey])/System.scalePercent
			top=box.offsetTop//document.getElementById(nodeId).offsetTop//(document.getElementById(nodeId).getBoundingClientRect()[yKey]-document.getElementById(parentId).getBoundingClientRect()[yKey])/System.scalePercent
			
			if(yKey=='bottom') top=box.parentNode.offsetHeight-(top+box.offsetHeight)
			if(xKey=='right') left=box.parentNode.offsetWidth-(left+box.offsetWidth)
            scaleX(box,left,xValue,'absolute',xKey)
            scaleY(box,top,yValue,'absolute',yKey)
        }else if(['relative',"static"].includes(positon) || positon==""){
            left=style.marginLeft.replace("px","")*1
            top=style.marginTop.replace("px","")*1
            scaleX(box,left,xValue,'margin')
            scaleY(box,top,yValue,'margin')
        } 
    }
	if(scaleChange.sideType==1){
		//此时要清除各个节点中的长宽比例
		System.reloadData('aspectRatio',JSON.parse(JSON.stringify(System.stylePropertype.aspectRatio)))
	}
	//拖动完成，重新绘制选择范围
	drawSelectBound()
}
//移动节点
function moveNode(e,targetList=System.operatingNodes){
	if(System.nodeMovingStatus){
		if(movingMask==null){
			//生成遮罩层
			movingMask=document.createElement("div")
			movingMask.style.cssText=`
										width:${boundWH.width}px;
										height:${boundWH.height}px;
										background-color:rgba(243,113,61,0.3);
										position:absolute;
										left:${boundXY.left}px;
										top:${boundXY.top}px;
										z-index:999
									`
			movingMask.id="movingMask"
			document.getElementById("projectFrameOut").appendChild(movingMask)
			
		}
	}
	let left=e.clientX-downPosition.toLeftDistance,top=e.clientY-downPosition.toTopDistance
	movingMask.style.left=left+"px"
	movingMask.style.top=top+"px"
	moveClassNode.innerText=`.${moveClassName}{translate:${(e.clientX-downPosition.left)/System.scalePercent}px ${(e.clientY-downPosition.top)/System.scalePercent}px;}`
}
//移动结束，绘制定位
function moveX(box,left,xdistance,type='absolute'){
	console.log("end moveNode")
	let x=type=='absolute'?"left":'marginLeft'
	//相反方向
	let x_op=type=='absolute'?'right':'marginRight'
	let head=type=='absolute'?x:"margin"
	let transleft=0
	let nodeStyle=document.getElementById(box.id+"_style")
	let reg="",stylename=otherFunction.nameToLower(x)
	let stylereg=new RegExp(`${otherFunction.nameToLower(x)}(:{1})([^;])*;{1}`,'g')
	let stylereg_op=new RegExp(`${otherFunction.nameToLower(x_op)}(:{1})([^;])*;{1}`,'g')
	let writeValue=x
	if(true===(stylereg.test(nodeStyle.innerText) || (!stylereg.test(nodeStyle.innerText)  && !stylereg_op.test(nodeStyle.innerText)))){
		//原先有left值或left与right都不存在
		reg=new RegExp(`${stylename}(:{1})([^;])+;{1}`,'g')
		let value=left+xdistance
		if(reg.test(nodeStyle.innerText)){
			nodeStyle.innerText=nodeStyle.innerText.replace(reg,`${stylename}:${(value).toFixed(0)}px;`)
		}
		else{
			nodeStyle.innerText=nodeStyle.innerText.replace('}',`${stylename}:${(value).toFixed(0)}px;}`)
			box.style
		}
		//若是当前处于动画编辑模式，则修改style，以抵消动画时间轴对style属性赋值所产生的样式优先级冲突
		if(System.editingMode==2)
			box.style[x]=`${(value).toFixed(0)}px`
		transleft=left+xdistance
		if(type=='absolute'){
			//重置绝对定位数据
			System.resetAbsolutePosition(box.id,'x',value.toFixed(0)*1,x,x_op)
		}
	}else{
		if(stylereg_op.test(nodeStyle.innerText) && !stylereg.test(nodeStyle.innerText) && type!='absolute'){
			reg=new RegExp(`${otherFunction.nameToLower(x_op)}(:{1})([^;])+;{1}`,'g')
			nodeStyle.innerText=nodeStyle.innerText.replace(reg,`${otherFunction.nameToLower(x_op)}:${(left-xdistance).toFixed(0)}px`)
			if(System.editingMode==2)
				box.style[x_op]=`${(left-xdistance).toFixed(0)}px`
			transleft=left-xdistance
		}else if(type=='absolute'){
			reg=new RegExp(`${otherFunction.nameToLower(x_op)}(:{1})([^;])*;{1}`)
			head=type=='absolute'?x_op:"margin"
			writeValue=x_op
			if(reg.test(nodeStyle.innerText))
				nodeStyle.innerText=nodeStyle.innerText.replace(reg,`${otherFunction.nameToLower(x_op)}:${(left-xdistance).toFixed(0)}px;`)
			else
				nodeStyle.innerText=nodeStyle.innerText.replace('}',`${otherFunction.nameToLower(x_op)}:${(left-xdistance).toFixed(0)}px;}`)
			if(System.editingMode==2)
				box.style[x_op]=`${(left-xdistance).toFixed(0)}px`
			transleft=left-xdistance
			System.resetAbsolutePosition(box.id,'x',(left-xdistance).toFixed(0)*1,x_op,x)
		}
	}
	//若非绝对定位，则需要处理下一个节点的问题
	if(type!='absolute'){
		//数据写回
		moveScaleWrite(box.id,head,writeValue,transleft,xdistance,box.parentNode.id)
		let nextBox=box.dataset.node=='1'?box.parentNode.nextElementSibling:box.nextElementSibling
		let nextBoxPositon
		while(nextBox){
			if(nextBox===null)break
			else if(nextBox.id!="" && !['absolute','fixed','sticky'].includes(window.getComputedStyle(nextBox).position)){
				break
			}
			else nextBox=nextBox.nextElementSibling
		}
		if(!nextBox){
			return
		}
		//检测原节点是否已经有float属性
		let nextId=nextBox.id.replace("_accepter","")
		if(document.querySelector('#'+nextId).dataset.node=="1") nextId="$NODE:"+nextId
		let float=System.metaData.STYLESTRUCT[nextId].style['float']
		if(float){
			float=['left','right'].includes(float.children.float)
		}
		if(float){
			//仅修改相对元素
			nodeStyle=document.getElementById(nextBox.id+"_style")
			let preLeft=window.getComputedStyle(nextBox).marginLeft.replace("px","")*1
			transleft=(preLeft-xdistance).toFixed(0)*1
			reg=new RegExp(`margin-left(:{1})([^;])+;{1}`,'g')
			if(reg.test(nodeStyle.innerText))
				nodeStyle.innerText=nodeStyle.innerText.replace(reg,`margin-left:${transleft}px;`)
			else
				nodeStyle.innerText=nodeStyle.innerText.replace("}",`margin-left:${transleft}px;}`)
			moveScaleWrite(nextBox.id,head,'marginLeft',transleft,xdistance,nextBox.parentNode.id,false)
		}	
	}
}
function moveY(box,top,ydistance,type='absolute'){
	let y=type=='absolute'?"top":'marginTop'
	let y_op=type=='absolute'?'bottom':'marginBottom'
	let transtop=0
	let nodeStyle=document.getElementById(box.id+"_style")
	let reg="",stylename=otherFunction.nameToLower(y)
	let stylereg=new RegExp(`${otherFunction.nameToLower(y)}(:{1})([^;])*;{1}`,'g')
	let stylereg_op=new RegExp(`${otherFunction.nameToLower(y_op)}(:{1})([^;])*;{1}`,'g')
	let writeValue=y
	let head=type=='absolute'?y:"margin"
	if(true===(stylereg.test(nodeStyle.innerText) || (!stylereg.test(nodeStyle.innerText)  && !stylereg_op.test(nodeStyle.innerText)))){
		//原先有left值或left与right都不存在
		head=type=='absolute'?y:"margin"
		reg=new RegExp(`${stylename}(:{1})([^;])+;{1}`,'g')
		let value=top+ydistance
		if(reg.test(nodeStyle.innerText))
			nodeStyle.innerText=nodeStyle.innerText.replace(reg,`${stylename}:${(value).toFixed(0)}px;`)
		else
			nodeStyle.innerText=nodeStyle.innerText.replace('}',`${stylename}:${(value).toFixed(0)}px;}`)
		if(System.editingMode==2)
			box.style[y]=`${(value).toFixed(0)}px`
		transtop=top+ydistance
		if(type=='absolute'){
			//重置绝对定位数据
			System.resetAbsolutePosition(box.id,'y',value.toFixed(0)*1,y,y_op)
		}
	}else if(type=='absolute'){
		reg=new RegExp(`${otherFunction.nameToLower(y_op)}(:{1})([^;])*;{1}`)
		head=type=='absolute'?y_op:"margin"
		writeValue=y_op
		let value=top-ydistance
		if(reg.test(nodeStyle.innerText))
			nodeStyle.innerText=nodeStyle.innerText.replace(reg,`${otherFunction.nameToLower(y_op)}:${(value).toFixed(0)}px;`)
		else
			nodeStyle.innerText=nodeStyle.innerText.replace('}',`${otherFunction.nameToLower(y_op)}:${(value).toFixed(0)}px;}`)
		if(System.editingMode==2)
			box.style[y_op]=`${(value).toFixed(0)}px;`
		transtop=top-ydistance
		System.resetAbsolutePosition(box.id,'y',value.toFixed(0)*1,y_op,y)
	}
	if(type!=='absolute'){
		//数据写回
		moveScaleWrite(box.id,head,writeValue,transtop,ydistance,box.parentNode.id)
	}
	//若非绝对定位，则需要处理下一个节点的问题
	//检测原节点是否已经有float属性
	let nextId=box.id
	if(box.dataset.node=="1") nextId="$NODE:"+nextId
	let float=System.metaData.STYLESTRUCT[nextId].style['float']
	if(float){
		float=['left','right'].includes(float.children.float)
	}
	if(type!='absolute' && !float){
		let nextBox=box.dataset.node=='1'?box.parentNode.nextElementSibling:box.nextElementSibling
		let nextBoxPositon
		while(nextBox){
			if(nextBox===null) break
			else if(nextBox.id!="" && !['absolute','fixed','sticky'].includes(window.getComputedStyle(nextBox).position)){
				break
			}else{
				nextBox=nextBox.nextElementSibling
			}
		}
		if(!nextBox){
			return
		}
		let _id=nextBox.id.replace('_accepter',"")
		nodeStyle=document.getElementById(_id+"_style")
		let preTop=window.getComputedStyle(document.querySelector('#'+_id)).marginTop.replace("px","")*1
		transtop=(preTop-ydistance).toFixed(1)
		reg=new RegExp(`margin-top(:{1})([^;])+;{1}`,'g')
		if(reg.test(nodeStyle.innerText))
			nodeStyle.innerText=nodeStyle.innerText.replace(reg,`margin-top:${transtop}px;`)
		else
			nodeStyle.innerText=nodeStyle.innerText.replace("}",`margin-top:${transtop}px;}`)
		//数据写回
		moveScaleWrite(nextBox.id,head,'marginTop',transtop,ydistance,nextBox.parentNode.id,false)
	}
}
function finishMove(e,targetList=System.operatingNodes,distanceX=null,distanceY=null,align=false,reload=true){
	//计算移动距离
	let box,positon,left,top
	if(distanceX===null)
		distanceX=(e.clientX-downPosition.left)/System.scalePercent
	if(distanceY===null)
		distanceY=(e.clientY-downPosition.top)/System.scalePercent
	let style
	let xKey,yKey,parentId
	for(let nodeId in targetList){
		parentId=System.getParentId(nodeId) || 'projectFrameInner'
		box=document.getElementById(nodeId.replace('$NODE:',''))
		style=window.getComputedStyle(box)
		positon=style.position
		if(['absolute','fixed','sticky'].includes(positon)){
			if(!System.metaData.STYLESTRUCT[nodeId].style['absoluteOrigin']){
				xKey='left'
				yKey='top'
			} 
			else{
				xKey=System.metaData.STYLESTRUCT[nodeId].style['absoluteOrigin'].x
				yKey=System.metaData.STYLESTRUCT[nodeId].style['absoluteOrigin'].y
			} 
			//读取当前位置
		    left=box.offsetLeft//document.getElementById(nodeId).offsetLeft//(document.getElementById(nodeId).getBoundingClientRect()[xKey]-document.getElementById(parentId).getBoundingClientRect()[xKey])/System.scalePercent
		    top=box.offsetTop//document.getElementById(nodeId).offsetTop//(document.getElementById(nodeId).getBoundingClientRect()[yKey]-document.getElementById(parentId).getBoundingClientRect()[yKey])/System.scalePercent
		    
			if(yKey=='bottom') top=box.parentNode.offsetHeight-(top+box.offsetHeight)
			if(xKey=='right') left=box.parentNode.offsetWidth-(left+box.offsetWidth)
			moveX(box,left,distanceX)
		    moveY(box,top,distanceY)
		}else if(['relative',"static"].includes(positon) || positon==""){
		    left=style.marginLeft.replace("px","")*1
		    top=style.marginTop.replace("px","")*1
		    moveX(box,left,distanceX,'margin')
		    moveY(box,top,distanceY,'margin')
			if(reload){
				//修改完后根据reload决定是否更新样式列表，在scale中时可能会传入false
				System.reloadData('margin',{},nodeId)
			}
		}
	}
	//移动移动样式类效果
	moveClassNode.innerText=``
	//重新绘制选择边框
	drawSelectBound()
}


System.hideSelectBound=()=>{
	clearBoundSide(1)
}													//隐藏选择框
System.showSelectBound=()=>{
	clearBoundSide(2)
}													//显示选择框
System.processNextElement=(direct,box,value)=>{
	if(direct=='x')
		processNextElement_x(box,value)
	else if(direct=='y')
		processNextElement_y(box,value)
}													//处理相邻节点的位置问题
System.clearBoundSide=clearBoundSide				//清除选择框
System.getNextRelativeElment=getNextRelativeElment		//获取下一个相对定位的节点元素			
System.initTree=initTree							//加载节点树
System.mountNode=mountNode							//挂载节点
System.createComponent=createComponent				//创建组件
System.createNode=createNode						//创建节点
System.selectNode=selectNode						//选择节点
System.drawSelectBound=drawSelectBound				//绘制选择框
System.scaleNode=scaleNode							//缩放选中节点
System.moveNodes=finishMove							//移动节点
System.setScaleData=setScaleData					//以设置参数方式拉伸节点
System.setScaleValuePercent=setScaleValuePercent
//其他辅助函数
System.unSelectAll=otherFunction.unSelectAll		//取消选择所有
System.getChildIds=otherFunction.getChilds			//读取子节点列表
System.getParentList=otherFunction.getParentList	//读取父节点列表
System.getParentId=otherFunction.getParentId		//读取父节点id
System.getNodeLayers=otherFunction.getLayers		//读取节点层次
System.unitTransform=otherFunction.unitTransform	//单位转换
System.requestComponentMeta=otherFunction.readComponentMeta		//读取组件数据
System.insertNewMeta=newNodeMeta.createNewNodeMeta
System.getElement=(nodeId)=>{
	let selectNode=document.getElementById(nodeId)
	if(!selectNode) {
		selectNode=document.getElementById(nodeId+'_accepter')
		if(!selectNode) return null
		selectNode=selectNode.childNodes[0].shadowRoot
		if(!selectNode) return null
		selectNode=selectNode.querySelector('#'+nodeId)
		if(!selectNode) return null
		return selectNode
	}
	return selectNode
}
export {}