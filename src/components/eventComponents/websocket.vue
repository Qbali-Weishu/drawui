<template>
	<div
	draggable="false"
	:id="xpathId"
	style="background-color: rebeccapurple;margin-top: 20px;min-width: 330px;height:165px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
	ref="forOut"
	
	@mousedown.stop="requestInsertPath(true)"
	@click.stop=""
	>
	
		<!--效果预览部分-->
		
		<div class="header" draggable="false" ref="viewDom" style="height: 20px;margin-bottom: 10px;">
			 <div class="logicName" >
				{{ecLogicName}}
			</div>
			<div style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">{{httpObject}}</div>
			
		</div>
		<div ref="showCreatedHttp" style="overflow: hidden;max-width: 330px;max-height: 160px;" v-show="!showCreateHttp">
			<!--示例名称与请求方式-->
			<div style="width: 100%;height: 35px;display: flex;">
				<div class="headerText">实例名称</div>
				<div style="text-align: center;width: 30%;height: 30px;border-radius: 10px;background-color: var(--mainColorGray3);margin-left: 5px;overflow: hidden;text-overflow: ellipsis;line-height: 30px;color: var(--mainColorBlack);font-weight: normal;" >{{varName}}</div>
			</div>
			<!--请求路径-->
			<div style="width: 100%;height: 35px;display: flex;">
				<div class="headerText">请求地址</div>
				<div style="text-align: center;width: 75%;height: 30px;border-radius: 10px;background-color: var(--mainColorGray3);margin-left: 5px;overflow: hidden;text-overflow: ellipsis;line-height: 30px;color: var(--mainColorBlack);font-weight: normal;" >{{requestUrl}}</div>
			</div>
			<div style="width: 100%;height: 35px;margin-top: 5px;">
				<div style="background-color: var(--mainColorBlue2);color:white;font-weight: normal;position: absolute;right: 20px;user-select: none;cursor: pointer;width: 50px;text-align: center;border-radius: 5px;height: 25px;line-height: 25px;" @click="openBord">编辑</div>
				<div style="background-color: white ;color:var(--mainColorBlue3);font-weight: normal;position: absolute;right: 80px;user-select: none;cursor: pointer;width: 60px;text-align: center;border-radius: 5px;height: 25px;line-height: 25px;box-shadow: 0 0 10px rgba(0,0,0,0.1);" @click="openBord">请求调试</div>
			</div>
		</div>
		<!--编辑界面-->
		<teleport to="body">
			<div class="createDomOut" v-if="showCreateHttp"  :style="{left :`${(bordLeft+deltaX)}px`,height:`${varName==''?'200px':'700px'}`}" ref="mainbord">
				<div draggable="false" class='moveVar' style="z-index: 1;" @mousedown.stop="startDown($event)" @mouseup.stop="endMove" @mouseleave.stop="endMove" @mousemove.stop="moveBord"></div>
				<button style="float: right;color: white;background-color: var(--mainColorBlue3);user-select: none;border-radius: 10px;width: 32px;margin-right: 5px;margin-top: 4px;height: 20px;" @click="closeBord">{{showEventEdit?'O':'X'}}</button>
				<button style="z-index: 2;;float: right;color: white;background-color: var(--mainColorBlue3);user-select: none;border-radius: 10px;width: 50px;margin-right: 5px;margin-top: 4px;height: 20px;" @click="close">调试</button>
				
				<div  draggable="false" style="font-weight: normal;line-height: 30px;margin-left: 5px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">可输入表达式,字符串需使用<strong style="color: black;"  draggable="false">引号</strong> 包裹</div>
				
				<div class="headerItem">
					<div class="headerText">实例名称</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input ref='tagInput' @input="setVarName"/>
				</div>
				<div class="headerItem" v-if="varName!=''">
					<div class="headerText" >请求地址</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input v-model="requestUrl"/>
				</div>
				<div class="headerItem" v-if="varName!=''">
					<dcheckBox @setCheck="setUseProtocols" style="margin-top: 5px;margin-left: 0px;" :precheck="useProtocols"></dcheckBox>
					<div style="font-weight: normal;line-height: 30px;margin-left:10px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">使用子级协议</div>
				</div>
				<div class="headerItem" v-if="useProtocols">
					<div class="headerText">子级协议</div>
					<div draggable="false" @click="addProtocols" @mousemove="null" @mousedown="" @mouseup=""
					style="margin-left: 10px;margin-top: 8px;display: inline-block;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
					>
						<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;margin: 0;"></span>
						<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;margin: 0;"></span>
					</div>
				</div>
				
				<div class="mainArea" style="border: 2px solid white;" v-if="useProtocols">
					<div class="attrItem" style="width: 100%;" v-for="(protocol,index) in protocolsList" :key="index" @contextmenu.stop="removeProtocolsItem($event,index)">
						<div style="outline: none;cursor: pointer;border: none;float: left;width: 95%;overflow: hidden;text-overflow: ellipsis;height: 30px;background-color: var(--mainColorGray3);border-radius: 10px;color: var(--mainColorGreen);line-height: 30px;text-align: center;" contenteditable="true" @input="setProtocol($event,index)" >{{protocol}}</div>
					</div>
				</div>
				
				<!--内置属性-->
				<div class="headerItem" style="clear: both;" v-if="varName!=''">
					<div class="headerText">内置属性</div>
					<div style="font-weight: normal;line-height: 30px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">单击获取引用语句</div>
				</div>
				<!--内置属性列表-->
				<div class="mainArea" style="border: 2px solid white;" v-if="varName!=''">
					<div class="attrItem" v-for="(attrItem,index) in attr" :key="index">
						<div class="attr" @click="getPropertype(attrItem)" >{{attrItem}}</div>
					</div>
				</div>

				<!--内置方法-->
				<div class="headerItem" v-if="varName!=''">
					<div class="headerText">内置方法</div>
					<div style="font-weight: normal;line-height: 30px;margin-left:5px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">单击获取引用语句(open,send已内置)</div>
				</div>
				<!--内置属性列表--> 
				<div class="mainArea" style="border: 2px solid white;height: 50px;" v-if="varName!=''">
					<div class="attrItem" v-for="(eventItem,index) in eventList" :key="index">
						<div class="attr" @click="getPropertype(eventItem,'function')">{{eventItem}}</div>
					</div>
				</div>

				
				<!--元素事件-->
				<div v-if="varName!=''" class="headerItem">
					<div class="headerText">响应事件</div>
				</div>
				<!--事件选择-->
				<div v-if="varName!=''" class="mainArea" style="margin-bottom: 20px;height:100px">
					<div class="eventButton"
						v-for="(eventKey,index) in Object.keys(httpevent)" :key="index"
						@click="viewEventLogic(eventKey)"
						>
						{{eventKey}}
					</div>
				</div>
			</div>
		</teleport>
		<teleport to="body" v-if="showHttpObjectList">
			<div 
			style="overflow: hidden;position: absolute;z-index: 999;width: 200px;height: 400px;overflow-y: scroll;border-radius: 10px;background-color: rgba(255,255,255,0.3);backdrop-filter: blur(10px);user-select: none;cursor: pointer;
			color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
			:style="{left:`${httpObjectListBar.left}px`,top:`${httpObjectListBar.top}px`}"
			>
			<input @blur="blurHttpObjectList" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeTagList"/>
				<div style="width: 100%;height: auto;" v-for="(httpObject,index) in httpObjectList" :key="index">
					<h3 style="margin: 0;text-align: left;margin-left: 10px;color:var(--mainColorBlack)">{{httpObject}}</h3>
				</div>
			</div>
		</teleport>
		<teleport to="#actionEdit" v-if="showEventEdit">
			<actionEdit v-bind="editVbind" ref="editThisEvent" style="left:0;top:40px;z-index: 999;height:calc(80vh - 40px);box-shadow: none;border-radius: 10px;" @quit="closeEventEdit"></actionEdit>
		</teleport>
		<teleport to="body" v-if="showRemoveBar">
			<div 
			@click="removeProtocolsItem"
			style="overflow: hidden;position: absolute;z-index: 999;width: 100px;height: 35px;border-radius: 10px;background-color: white;user-select: none;cursor: pointer;
			color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
			:style="{left:`${removeBarPosition.left}px`,top:`${removeBarPosition.top}px`}"
			>
			<input @blur="blurUrlItemBar" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeRemoveUrlItem"/>
				删除
			</div>
		</teleport>
	</div>
</template>

<script>
	import inputhook from "../microTools/hookInput.vue"
	import actionEdit from "../microTools/actionEdit.vue"
	import selectListT from "../microTools/select2.vue"
	import dcheckBox from "../microTools/checkBox.vue"
	export default{
		name:"websocket",
		props:{
			logicName:"",//组件的逻辑命名
			parentXpath:"",//父级xpath
			ownPath:"",//当前组件的xpath最后一级
			isNew:false,//是否为新增
			newXpath:"",//由父组件定义，为当前子组件的xpath层级ID
			callIndex:0,//当前组件在其父组件中加载的节点次序索引
			logicIndexList:{//当前组件所包含的逻辑
				type:Array,
				default:[]
			}},
		components:{
			inputhook,
			actionEdit,
			selectListT,
			dcheckBox
		},
		data(){
			return {
				comDesc:"",
				ecLogicName:this.logicName,//此逻辑命名
				thisECName:"websocket",//当前组件名称
				mountedIndex:0,//多个锚点的目标标记
				mounted:[false,false],//标记是否已经有锚点
				//enterDrag:false,
				mountedData:[],//锚点所绑定的数据
				xpath:"",//当前组件的xpath
				lastXpath:"",//组件层级xpath
				xpathId:"",
				timeout:null,//防抖延时器
				requestConponent:[],//请求加载的组件列表
				logicIndex:[],//通过此数组控制模块先后顺序，其值为各个模块的加载索引，
				childHeight:[],//记录子组件的所有高度
				removeEvent:[],//子节点删除事件集合
				rightBarMenu:{//右键列表
					selected:0,//被选中的序号
					show:false,
					left:0,
					top:0,
					options:[
							{name:"重命名",event:()=>{
								 //注册回调事件
								 let index=this.logicIndex[this.rightBarMenu.selected].index
								 System.renameLogicCallBack=(newName)=>{
								 this.logicIndex[this.rightBarMenu.selected].name=newName
								 this.$refs["ecMain"].childNodes[index+2].querySelector('.header .logicName').innerText=newName
								}
								let prename=this.logicIndex[this.rightBarMenu.selected].name
								//与最外层的xpat不同，组件内的重名事件是在父组件调起，故必须加上选中的子组件的xpath
								System.requestRenameLogic(this.xpath+"=>"+this.logicIndex[index].xpath,prename)
							},partition:false},
							{name:"注释说明",event:()=>{
								let xpath=this.xpath+"=>"+this.logicIndex[this.rightBarMenu.selected].xpath
								System.requestWriteExplain(xpath)
							},partition:false},
							{name:"上移",event:()=>{this.indexUp(this.rightBarMenu.selected)},partition:true},
							{name:"下移",event:()=>{this.indexDown(this.rightBarMenu.selected)},partition:false},
							{name:"删除",event:(item)=>{
								 let index=this.logicIndex[this.rightBarMenu.selected].index
											this.removeEvent[index]()
											this.logicIndex.splice(this.rightBarMenu.selected,1)
											let tempIndex=[]
											this.logicIndex.forEach(item =>{
												tempIndex.push(item.xpath)
											})
											System.requestResetLogicIndex(this.xpath,tempIndex)
											tempIndex=[]
							 },
							 partition:true}
							 ]
				 },
				 
				  setContentTarget:[], //需要设置的目标对象
				  remoteEC:[],//远程组件加载列表
					
					
				  //用户自定义参数
				  //实例化对象变量名
				  varName:"",
				  showCreateHttp:false,
				  useProtocols:false,
				  protocolsList:[],
				  requestUrl:"https://www.baidu.com",
				  requestData:`data=abc&bd=qqs`,
				  httpObject:'XMLHttpRequest',

				  attr:['binaryType','bufferedAmount','extensions','protocol','readyState','url'],//内置属性列表
				  eventList:['send','close'],//所有内置方法列表
				  hasEvent:{
				  },//已有内置方法列表，open/send必须存在，否则无意义
				  httpevent:{
					 close:{
						 argument: [],
						 logic: {},
						 logicIndexKey: [],
						 name: "readyState 变为 CLOSED时被调用",
						 object: 0
					 },
					 loadstart:{
						 argument: [],
						 logic: {},
						 logicIndexKey: [],
						 name: "连接由于一些错误事件的发生而被关闭时",
						 object: 0,
					 },
					 message:{
						 argument: [],
						 logic: {},
						 logicIndexKey: [],
						 name: "接收到新消息时被触发",
						 object: 0,
					 },
					 open:{
						 argument: [],
						 logic: {},
						 logicIndexKey: [],
						 name: "readyState 变为1时调用",
						 object: 0
					 },

				  },//响应事件
				  methodsList:['GET','POST','DELETE','PUT','HEAD','REQUEST','PATCH'],
				  httpObjectList:[],
				  httpObjectListBar:{left:0,top:0},
				  showHttpObjectList:false,
				  deltaX:0,
				  bordLeft:0,
				  showEventEdit:false,
				  showSelectMethods:false,
				  removeBarPosition:{
					  left:0,
					  top:0
				  },
				  showRemoveBar:false,
				  removeProtocolItemIndex:-1,
				  setDataTimeOut:null,
				  setContentTarget:[],
				  editVbind:{
					  provide:true,
					  sourceXpath:this.xpath+".userDefine.httpevent",
					  dataSource:{
						  store:{},
						  logicSource:{},
						  logic:{},
						  logicIndexKey:[],
						  type:0,
						  name:""
					  }
				  },
				  startLeft:0,
				  deltaX:0,
				  domOutDown:false,
				  preMiniStyle:"",//保存缩小前的style样式
				  minibord:false,
				  cssScope:""
				}
		},
		mounted(){
		    //挂在完成，递归向上传入高度设置
		    this.$emit("setChildHeight",165,this.callIndex)
		    //挂在完成，递归向上传入本组件删除事件
		    this.$emit("setChildRemove",this.removeThis)
		    this.logicIndex=JSON.parse(JSON.stringify(this.logicIndexList))
		    if(!this.isNew){
		       this.xpath=this.parentXpath!=""?this.parentXpath+"=>"+this.ownPath:this.ownPath
		    }else{
		        //父组件新增
		       //新组建，请求新增XpathId
		       this.xpath=this.parentXpath+"=>"+this.thisECName+"_"+this.newXpath
		       //新增时，子组件为空，故只需传其组件本身的高度
		    }
		    if(this.isNew){
		        //当前组件所需要的数据，除logic外，logic有actionEdit统一插入
		        let thisData={
		            argument:this.argument
		        }
		        //remote: System.insertToLogic(this.xpath,thisData,true),新增远端组件时需要标记远端组件，最后一个参数为true
		        System.insertToLogic(this.xpath,thisData,false,this.comDesc)
				
				this.setContentTarget=['varName','requestUrl','requestData','useProtocols','protocolsList','hasEvent','httpevent']
				this.setLogicContent()
		    }else{
		        this.$nextTick(()=>{
					this.initArguments()
		        })
		    }
			System.pushComDesc(this.thisECName,"/*webSocket轮询:"+this.requestUrl+"*/")
			this.mountedAction()
		},
		methods:{
			mountedAction:function(){
				
			},
			//：设置当前组件的参数，如arguments
			setLogicContent:function(){
			    //setContentTarget即要设置的属性参数：此处为自定义的arguments
			    //对请求的setContentTarget内容进行遍历
			    for(let index=0;index<this.setContentTarget.length;index++){
			        let key=this.setContentTarget[index]
			        //System.requestSetLogicContent(xpath:组件xpath,key:要设置的属性,value:属性值)
			        System.requestSetLogicContent(this.xpath,key,this[key])
			    }
			    this.setContentTarget=[]
			},
			//获取当前组件的逻辑位置
			getPosition:function(path=""){
				if(path!=""){
					path=path.split(".")
					if(path[path.length-1].length==0){
						path.pop()
					}
					path=path.join("=>")
					if(!path.startsWith("=>")){
						path='=>'+path
					}
				}
				return this.xpath+path
			},
			//获取当前组件的标识ID
			getEcId:function(){
				let temp=this.lastXpath.split("_")
				let arr=[]
				for(let i=1;i<temp.length;i++){
					arr.push(temp[i])
				}
				this.xpathId=arr.join("_")
				arr=null
				temp=null
				return this.xpathId
			},
			//定义用户内容
			initArguments:function(data){
					System.acceptArgument=(argument)=>{
						for(let key in argument){
							this[key]=argument[key]
						}
						console.log(this.httpevent,"load")
					}
					System.requestArgument(this.getPosition())
			},
			//:请求删除
			removeThis:function(emitToParent=true){//删除当前本体
			    System.requestRemoveEC(this.xpath)
			    //将当前节点的高度设置为0
			    this.$emit("setChildHeight",-1,this.callIndex)
				if(emitToParent){
					//仅在当前组件调用删除事件时需要传递到父级进行删除
					this.$emit('removeChild',this.callIndex)
				}
			    this.$refs['forOut'].style.display="none"
				//用户自定义
			},
			
			//自定义函数
			setVarName:function(e){
				
				
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
					let createSuccess=()=>{
						if(System.checkJsKeyword(e.target.value)){
							this.varName=e.target.value
							this.setContentTarget=['varName']
							this.setLogicContent()
						}else{
							System.showToast("此变量名与JS关键词冲突，请重新输入")
						}
					}
					let createError=()=>{
						System.showToast("变量名非法，请重新输入")
					}
					if(e.target.value.length>0){
						try{
							new Function('createSuccess','createError',`try{
									let ${e.target.value}=1
										createSuccess()
									}catch{
										createError()
									}`).call(this,createSuccess,createError)
						}catch(e){
							console.error(e)
							createError()
						}
					}else{
						this.varName=""
					}
					
					
				},200)
			},
			openBord:function(e){
				this.initArguments()
				this.bordLeft=e.clientX
				this.showCreateHttp=true
			},
			closeBord:function(){
				if(this.showEventEdit){
					//事件编辑面板打开时，关闭表示缩小
					this.preMiniStyle=this.$refs['mainbord'].style
					this.$refs['mainbord'].className=`createDomOut_mini`
					//提交缩小事件
					let recoverSize=()=>{
						this.$refs['mainbord'].className=`createDomOut`
						this.minibord=false
					}
					this.minibord=true
					System.requestBrowSizing(recoverSize)
				}else{
					//表示关闭
					this.showCreateHttp=false
				}
			},
			callHttpObjectList:function(e){
				this.httpObjectList=['XMLHttpRequest','axios','websocket']
				this.httpObjectListBar.left=e.clientX
				this.httpObjectListBar.top=e.clientY
				this.showHttpObjectList=true
				this.$nextTick(()=>{
					this.$refs['closeTagList'].focus()
				})
			},
			blurHttpObjectList:function(){
				setTimeout(()=>{
					this.showHttpObjectList=false
				},200)
			},
			callSelectMethods:function(e){
				this.showSelectMethods=true
				console.log("hello")
				this.$nextTick(()=>{
					this.$refs['selectList_methods'].setSpread(e)
				})
			},
			setUseProtocols:function(isuse){
				if(!isuse){
					if(this.protocolsList.length>0){
						if(confirm("当前存在子级协议列表，是否确认取消使用子协议并清空列表")){
							this.useProtocols=isuse
							this.protocolsList=[]
						}
					}else{
						this.useProtocols=isuse
					}	
				}else{
					this.useProtocols=isuse
				}
			},
			removeProtocolsItem:function(e,index=-1){
				e.preventDefault()
					
				if(!this.showRemoveBar){
					//未显示时显示
					this.removeBarPosition.left=e.clientX
					this.removeBarPosition.top=e.clientY
					this.showRemoveBar=true
					this.removeProtocolItemIndex=index
					this.$nextTick(()=>{
						this.$refs['closeRemoveUrlItem'].focus()
					})
				}else{
					//已显示时删除
						this.showRemoveBar=false
						this.protocolsList.splice(this.removeProtocolItemIndex,1)
				}
			},
			blurUrlItemBar:function(){
				setTimeout(()=>{
					
					this.showRemoveBar=false
				},200)
			},
			addProtocols:function(){
				this.protocolsList.push("")
			},
			setProtocol:function(e,index){
				/*
					@param {Number} index:修改的索引  
				*/
			   let data=e.target.innerText
				if(this.setDataTimeOut!=null){
					clearTimeout(this.setDataTimeOut)
				}
				this.setDataTimeOut=setTimeout(()=>{
						this.protocolsList[index]=data
						this.setContentTarget=['protocolsList']
						this.setDataTimeOut=null
						this.setLogicContent()
					
				},200)
			},
			//编辑发送体
			editSendBody:function(){
				let saveCallBack=(text)=>{
					this.requestData=text
				}
				System.callOpenCode(saveCallBack,this.requestData)
			},
			//获取属性引用语句
			getPropertype:function(attrItem,type="attr"){
				let hill=""
				if(type=="function") hill="()"
				try{
					navigator.clipboard.writeText(this.varName+"."+attrItem+hill)
					System.showToast("引用语句已复制到剪贴板",2000)
				}catch(e){
					alert("粘贴到剪贴板失败，请复制引用语句："+this.varName+"."+attrItem+hill)
				}
			},
			viewEventLogic:function(name){
				if(this.showEventEdit){
					System.showToast("请关闭当前事件编辑面板后重试",3000)
				}else{
					this.deltaX=0
					this.bordLeft=document.body.offsetWidth-340
					this.editVbind.dataSource.name=name
					this.editVbind.sourceXpath=this.getPosition()+".userDefine.httpevent."+name
					this.editVbind.dataSource.logicSource=this.httpevent[name]
					this.editVbind.dataSource.logic=this.httpevent[name].logic
					this.editVbind.dataSource.logicIndexKey=this.httpevent[name].logicIndexKey
					this.showEventEdit=true
				}
				
			},
			closeEventEdit:function(){
				
				if(this.minibord){
					//若编辑版缩小
					this.$refs['mainbord'].className=`createDomOut`
					this.minibord=false
					//将缩小事件设为null
					System.requestBrowSizing(null)
				}
				this.showEventEdit=false
				this.showCreateHttp=true
			},
			startDown:function(e){
				this.startLeft=e.clientX
				this.$refs['mainbord'].style.transition="0s"
				this.domOutDown=true
			},
			moveBord:function(e){
				if(this.domOutDown){
					this.deltaX=e.clientX-this.startLeft
				}
			},
			endMove:function(e){
				this.bordLeft=this.bordLeft+this.deltaX
				this.deltaX=0
				this.$refs['mainbord'].style.transition=".2s"
				this.domOutDown=false
			},
		}
	}
</script>

<style scoped>
	.header{
		min-width: 250px;
		user-select: none;
		width: auto;
		height: 150px;
		display: flex;
		background-color: transparent;
		border-radius: 10px;
		/*border: 1px solid var(--mainColorBlue3);*/
		box-shadow: 0 0px 15px rgba(0,0,0,0.15);
		z-index: 999;
	}
	.header:after{
		border-radius: 10px 10px 0 0;
		content: "";
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 30px;
		top: -20px;
		left: 0;
		background-color: var(--mainColorBlue3);
	}
	.createDomOut{
		overflow-y: scroll;
		position: absolute;
		z-index: 99;
		width: 330px;
		
		background-color: rgba(255,255,255,0.95);
		transition: .2s;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 15px;
		top: 50vh;
		left: 20vw;
		transform: translateY(-50%);
		transform-origin: left center;
		animation: showCreateDom .5s;
		animation-fill-mode: forwards;
	}
	.createDomOut_mini{
		overflow-y: scroll;
		position: absolute;
		z-index: 99;
		width: 330px;
		background-color: rgba(255,255,255,0.95);
		transition: .2s;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 15px;
		top: 50vh;
		left: 20vw;
		transform-origin: left top;
		animation: browsizing .5s;
		animation-fill-mode: forwards;
	}
	@keyframes  browsizing{
		from{
			transform: scale(1) translateY(-50%);
			opacity: 1;
			top: 50vh;
		}
		to{
			transform: scale(0) translateY(-50%);
			opacity: 0;
			top: 10vh;
		}
	}
	@keyframes showCreateDom {
		from{
			transform: scale(0) translateY(-50%);
			border-radius: 100% 15px 100% 15px;
		}
		to{
			transform: scale(1) translateY(-50%);
			border-radius:15px;
		}
	}
	.headerItem{
		display: flex;
		z-index: 2;
		margin: 5px;
		height: 35px;
		background-color: transparent;
		position: relative;
		font-size: 14px;
		color: var(--mainColorBlue3);
	}
	.headerText{
		user-select: none;
		line-height: 30px;
		height: 30px;
		width: 70px;
		text-align: center;
		background-color: var(--mainColorGray3);
		font-weight: normal;
		color: var(--mainColorBlue3);
		border-radius: 10px;
	}
	.headerItem input{
		width: 60%;
		background-color: var(--mainColorGray3);
		text-align: center;
		height: 30px;
		outline: none;
		border: none;
		border-radius: 10px;
		
	}
	.parentNode{
		cursor: pointer;
		width: 60%;
		background-color: var(--mainColorGray3);
		text-align: center;
		height: 30px;
		outline: none;
		border: none;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.attrItem{
		height: 30px;
		float: left;
		margin-left: 5px;
		margin-top: 10px;
	}
	.attr{
		padding-left: 5px;
		cursor: pointer;
		padding-right: 5px;
		height: 30px;
		background-color: var(--mainColorBlue3);
		color: white;
		line-height: 30px;
		font-weight: normal;
		border-radius: 10px;
		text-align: center;
		outline: none;
		border: none;
		overflow: hidden;
		white-space: nowrap;
	}
	.mainArea{
		width: 230px;
		height: 150px;
		overflow-y: scroll;
		background-color: white;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 15px;
		margin-left: 60px;
		transform: scale(1);
	}
	.moveVar{
		position: absolute;
		top: 5px;
		
		left: 5px;
		border-radius: 10px;
		height: 20px;
		background-color: transparent;
		transition: .2s;
		cursor: move;
		width: 70%;
	}
	.moveVar:hover{
		background-color: var(--mainColorGray2);
	}
	.tagItem{
		color: var(--mainColorBlue3);
		width: 90%;
		margin-left: 5%;
		border-radius: 5px;
		height: 30px;
	}
	.tagItem:hover{
		background-color: var(--mainColorGray2);
	}
	.eventButton{
		cursor:pointer;
		user-select: none;
		width: auto;
		padding-left: 5px;
		min-width: 50px;
		text-align: center;
		padding-right:5px;
		height: 30px;
		line-height:30px;
		margin: 10px;
		margin-left: 10px;
		margin-right: 0;
		float: left;
		border-radius: 10px;
		background-color: var(--mainColorGray3);
		color: var(--mainColorBlue3);
		font-weight: normal;
		transition: .2s;
	}
	.eventButton:hover{
		background-color: var(--mainColorBlue3);
		color: white;
	}
	.classItem{
		height: 25px;
		background-color: var(--mainColorBlue3);
		color: white;
		border-radius: 10px;
		text-align: center;
		line-height: 25px;
		margin: 5px;
		padding: 0;
		padding-left: 5px;
		padding-right: 5px;
		float: left;
	}
	
</style>