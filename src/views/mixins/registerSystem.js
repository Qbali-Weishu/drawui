import * as complexComponent from "../../builtInComponent/componentList.js"
//注册系统事件
export default{
	data(){
		return{
			alignBound:{
				show:false,
				left:0,
				top:0,
				right:0,
				bottom:0,
				width:0,
				height:0
			},
			operatingStack:[],//记录聚焦层
			showFocusLayer:false,
			headerButton:{
				show:false,
				text:"",
				event:()=>{}
			},
			editingMode:0,//0普通，1浮动，2动画
			cursor:{
				left:0,
				top:0
			},
			mountComponentList:[]
		}
	},
	methods:{
		register_beforeMount:function(){
			//页面根节点（当前编辑的根节点）
			System.rootId="projectFrameInner"
			//解锁的节点列表
			System.unLocklist={}
			//当前操作模式
			System.editingMode=0
			//修改操作模式
			System.resetEditingMode=(mode=0)=>{
				this.editingMode=mode
				System.editingMode=mode
				//修改顶部操作栏显示内容
				System.resetHeaderTools()
			}
			//主屏大小
			System.screenSize={
				width:1536,
				height:721
			}
			if(!System.componentLayer)
				System.componentLayer={}
			System.componentLayer[this.componentPath]=this.componentLayer
			
			//标记当前编辑的组件路径
			System.nowComponentPath=this.componentPath
			
			//标记当前显示的设备
			System.device="DEVICE_WEB"
			//标记当前的语言平台
			System.platform="vue" //'wx' 'uni'
			const device=System.device
			//设置数据源
			System.projectMeta=System.metaData=this.store
			//初始化节点数据源
			System.nodeMeta=System.metaData.DOMSTRUCT[device]
			//当前操作层次
			System.nowOpeLayers=System.nodeMeta.index
			//设置当前组件允许直接使用的变量节点即DATA,PROPS,INJECT,COMPUTED,四个变量节点
			System.resetComponentVar=()=>{
				let varList=JSON.parse(JSON.stringify(System.metaData.VARLIST.DATA))
				let props=JSON.parse(JSON.stringify(System.metaData.VARLIST.PROPS))
				let computed=JSON.parse(JSON.stringify(System.metaData.VARLIST.COMPUTED))
				let inject=JSON.parse(JSON.stringify(System.metaData.VARLIST.INJECT))
				System.componentVar=Object.values(Object.assign(varList,props,computed,inject)).map((value)=>{return value.name}) 
			}
			//设置光标
			/*System.setCursor=(cursor)=>{
				document.getElementById('projectFrameOut').style.setProperty('--cursor','url('+cursor+')');
			}*/
			System.resetComponentVar()
			//为各组件提供按钮按下时的处理事件
			System.keyDownEvent={}
			//为各组件提供按钮抬起时的处理事件
			System.keyUpEvent={}
			//启动绘制对齐线
			System.startDrawAlign=(e,direct,side)=>{
				this.startAlignLine(e,direct,side)
				this.frameOutMoveStatus=true
			}
			//提供对齐点链接线绘制
			System.drawAlignment=(e)=>{
				this.drawAlignLine(e)
			}
			//绘制目标节点的接收对齐节点
			System.drawAlignBound=(position)=>{
				if(position!==false){
					this.alignBound={
						show:true,
						left:position.left,
						top:position.top,
						right:position.right,
						bottom:position.bottom,
						width:position.width,
						height:position.height,
					}
				}else{
					this.alignBound.show=false
					this.endAlignMove()
				}
			}
			//更新操作节点前执行操作集
			System.beforeOpeNodesAction={}
			//调起节点顶部设置框
			System.callRadiusRotate=(left,top)=>{
				if(left===null || top===null){
					this.nodeTopBar.show=false
					return
				}
				this.showRRBar(left,top)
			}
			//隐藏节点顶部框
			System.hideNodeTopBar=()=>{
				this.nodeTopBar.show=false
			}
			//重新显示节点顶部框
			System.showNodeTopBar=()=>{
				this.nodeTopBar.show=true
			}
			//提示文字
			System.showTip=(text)=>{
				this.headerTip={
					show:true,
					text:text
				}
			}
			//关闭提示文字
			System.closeTip=()=>{
				this.headerTip={
					show:false,
					text:""
				}
			}

			//标记右键状态
			System.menuStatus=false
			//节点调出右键
			System.callNodeMenu=(e,id,multiple=false)=>{
				System.menuStatus=true
				this.$refs['contextmenu'].show(e,id,multiple,System.editingMode)
			}
			//节点关闭右键
			System.closeNodeMenu=(e,id,multiple=false)=>{
				System.menuStatus=false
				this.$refs['contextmenu'].close()
			}
			//插入聚焦节点
			System.inertFocusStack=(id)=>{
				this.operatingStack.push(id)
			}
			//弹出聚焦节点
			System.popFocusStack=()=>{
				if(this.operatingStack.length==1){
					System.focusingNode=null
					System.closeHeaderButton()
					System.focusStatus=false
				}
				return this.operatingStack.pop()
			}
			//标记聚焦状态 true在contextmenu中设置
			System.focusStatus=false
			//调出聚焦层
			System.callFocusLayer=(child)=>{
				this.showFocusLayer=true
				this.$nextTick(()=>{
					let focusLayer=document.getElementById("focusLayer")
					focusLayer.innerHTML=""
					let boxStyle=document.getElementById('projectFrameInner').style
					let x=boxStyle.left,y=boxStyle.top
					focusLayer.style.left=x
					focusLayer.style.top=y
					focusLayer.appendChild(child)
				})
			}
			//关闭聚焦层
			System.closeFocusLayer=()=>{
				this.showFocusLayer=false
				System.focusStatus=false
				this.operatingStack=[]
				System.focusingNode=null
			}
			//顶层提示按钮
			System.requestHeaderButton=(text,action)=>{
				this.headerButton={
					show:true,
					text:text,
					event:action
				}
			}
			//当前聚焦ID
			System.focusingNode=null
			//关闭顶层按钮
			System.closeHeaderButton=(text,action)=>{
				this.headerButton.show=false
			}
			//读取最后一层
			System.getLastFocusStack=()=>{
				return this.operatingStack.length>0 ? this.operatingStack.at(-1) : null
			}
			//检查节点是否在聚焦层次之中
			System.checkFocusNode=(id)=>{
				return System.focusStatus && (this.operatingStack.includes(id) || id==System.focusingNode)
			}
			//进入子层
			System.intoChild=(target)=>{
				if(Object.keys(System.operatingNodes).length>1){
					System.showToast("无法同时解锁多个节点",3000)
					return false
				}
				
				//记录原先层次
				this.dom.opeTarget=Object.keys(System.operatingNodes)[0]
				try{
					if(this.dom.opeTarget!=null)
						document.getElementById("v_"+this.dom.opeTarget).style.backgroundColor=""//进入子列表之前，取消原节点高亮显示	
				}catch{}
				if(this.dom.opeTarget && this.dom.layers.indexOf(this.dom.opeTarget)==-1){
					this.dom.layers.push({id:this.dom.opeTarget,"name":""})//进入子节点之前，记录当前层级
				}
				this.nowViewDom=Object.keys(System.operatingNodes)[0]
				this.tree.show=[]
				this.$nextTick(()=>{
					this.tree.show=System.getChildIds(this.nowViewDom)//将右侧元素显示列表置为当前元素的子元素列表
					this.unLockList[this.nowViewDom]=1//将当前解锁的元素加入unLock列表
					System.unLockList=JSON.parse(JSON.stringify(this.unLockList))
					this.tree.lockParent=this.nowViewDom//设置解锁的父级元素为当前操作元素，等同于解锁操作
					System.unLockNode(this.nowViewDom)//标记当前元素的所有父辈为解锁状态
					System.unSelectAll()//置空choseGroup,取消所有节点选择
					this.unLockIndexList=System.getParentList(this.nowViewDom)//获取当前要解锁元素的所有父级元素id，this.nowViewDon记录的都是要选中元素的父级元素
				})
				System.showToast("节点已解锁",2000)
				return true
			}
			//标记当前是否在拖动选择交互节点
			System.linkingAnimation=false
			//上一个鼠标移入的节点
			System.lastLocatedNode=null
			//标记当前是否在拖拽添加组件
			System.isDragingComponent=false
			//标记是否有进入组件接收点
			System.isEnterAccepter=false
			//创建组件拖入点 在组件component中定义
			System.createComAccepter=()=>{}
			System.closeComAccepter=()=>{}
			//System.insertNewMeta 插入新节点，在nodeFactory => newNodeData中定义
			
			//组件配置
			/*
			{name:"布局",type:'layout'},
			{name:"基础",type:"normal"},
			{name:"表单",type:"form"},
			{name:"复合",type:"complex"}
			*/
			System.componentConfig={
				"layout":[],
				'normal':[
					
				],
				'form':[],
				'complex':[]
			}
			System.componentRefrences={
				
			}
			//请求组件列表
			System.requestComponentList=(type)=>{
				let list
				if(type=='complex'){
					//先请求本地的
					list=[]
					for(let key in complexComponent.data){
						console.log(complexComponent.data[key])
						list.push({
							logo:`./created/normal.type/demo1.com/index.png`,
							componentId:complexComponent.data[key].componentId,
							name:complexComponent.data[key].name
						})
					}
				}else{
					list=[
						{
							logo:`./created/normal.type/demo1.com/index.png`,
							componentId:"$DRAWUI_button",
							name:"按钮"
						},
						{
							logo:`./created/normal.type/demo1.com/index.png`,
							componentId:"$DRAWUI_flex",
							name:"测试"
						}
					]
				}
				
				let preHas=System.componentConfig[type].map(item=>{
					return item.componentId
				})
				for(let i=0;i<list.length;i++){
					if(!preHas.includes(list[i].componentId)){
						System.componentConfig[type].push(list[i])
					}
				}
			}
			const sm=(path)=>{
				if(path=='$DRAWUI_echart') return "builtIn:echart"
				else return "meta"
			}
			System.requsetComponentData=(path)=>{
				let value=sm(path)
				console.log("value",value)
				if(value=='meta'){
					System.componentStore[path]={
						__moduleId__:"$DRAWUI_button2",
						__moduleName:"按钮2",
						props:{},//传参列表
						__ROOT__:{//根节点数据
							style:{
								"width":{
									value:"",
									children:{
										value:200,
										unit:"px"
									},
									group:false,
									condition:{
										bindList:null,
										default:""
									}
								},
								"height":{
									value:"",
									children:{
										value:100,
										unit:"px"
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
											value:"#00ff00",
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
							},
							class:{}
						},
						//以下为子节点的数据
						DOMSTRUCT:{//结构字典
							DEVICE_WEB:{
								tree:{
									
								},
								index:[]//tree树结构为数组存储，index表示各个节点在tree数组中的索引，用于在修改元素id等信息时仍能保证先后次序
							},
							DEVICE_PHONE:{},
							DEVICE_PAD:{}
						},
						STYLESTRUCT:{
							//样式字典
						},
						ATTRIBUTESTURCT:{//属性字典
						},
						DATASETSTURCT:{//数据集字典
							/*varData:数据名称 &表示替代+号完成拼接操作，$表示使用变量数据*/
						},
						//以上为子节点数据
						VARLIST:{//组件变量字典
						},
						CLASSLIST:{},
						METHODS:{//方法列表
						},
						Events:{
						},
					}	
				}else if(value.startsWith("builtIn:")){
					//内置复合组件，根据componentList.js读取数据
					System.componentStore[path]=value
				}
				//根据path请求返回数据,并谢晖componentStore中
				
			return System.componentStore[path]
			}
			
			
			System.mountComponentToNode=(targetNode,componentName,bindData,nativeList,needDefineId=false)=>{
				console.log("mount id",targetNode)
				console.trace()
				this.mountComponentList.push({
					nodeId:targetNode.replace("_accepter",""),
					needDefineId:needDefineId,
					targetNode:targetNode,
					componentName:componentName,
					bindData:bindData,
					nativeList:nativeList
				})
			}
			//重置入参数据的函数，在各个mountComponent中定义
			System.resetComponentProps={}
			
			//注册调出节点事件相应函数，处理函数位于：componentEmit.js
			System.callNodeEventEditor=(nodeId)=>{
				this.openEventEdit()//位于：componentEmit.js
			}
		},

	}
}