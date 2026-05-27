<!--元素生成器-->
<template>
	<div
	draggable="false"
	:id="xpathId"
	style="background-color: rebeccapurple;margin-top: 20px;min-width: 250px;height:165px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
	ref="forOut"
	@mousedown.stop="requestInsertPath(true)"
	@click.stop=""
	>
	
		<!--效果预览部分-->
		
		<div class="header" draggable="false" ref="viewDom" style="height: 20px;margin-bottom: 10px;">
			 <div class="logicName" >
				{{ecLogicName}}
			</div>
			<outputhook @startHook="provideThisDom" :xpath="xpath" style="left: 20px;" v-show="!showCreateBord"></outputhook>
			<div  v-show="!showCreateBord" style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">引出锚点以获取此元素</div>
			<div style="background-color: transparent;color:var(--mainColorBlue3);font-weight: normal;position: absolute;right: 20px;user-select: none;cursor: pointer;" @click="openBord">编辑</div>
			
		</div>
		<div ref="showCreatedDom" style="display: flex;align-items: center;justify-content: center;overflow: hidden;max-width: 250px;max-height: 160px;" v-show="!showCreateBord"></div>
		<!--编辑界面-->
		<teleport to="body">
			
			<div class="createDomOut" v-if="showCreateBord" v-show="!showEventEdit" :style="{left :`${(bordLeft+deltaX)}px`,height:`${tag==''?'200px':'700px'}`}" ref="mainbord">
				<div draggable="false" class='moveVar' @mousedown.stop="startDown($event)" @mouseup.stop="endMove" @mouseleave.stop="endMove" @mousemove.stop="moveBord"></div>
				<button style="float: right;color: white;background-color: var(--mainColorBlue3);user-select: none;border-radius: 10px;width: 32px;margin-right: 5px;margin-top: 4px;" @click="close">X</button>
				<div  draggable="false" style="font-weight: normal;line-height: 30px;margin-left: 5px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">可输入表达式,字符串需使用<strong style="color: black;"  draggable="false">引号</strong> 包裹</div>
				<!--元素标签-->
				<div class="headerItem">
					<div class="headerText">元素标签</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input @click="callTagList" ref='tagInput' v-model="tag"/>
				</div>
				<div class="headerItem">
					<div class="headerText">元素载体</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input placeholder="引入锚点或输入变量值" v-model="parent" v-if="!parentCreateDom"/>
					<div class="parentNode" v-if="parentCreateDom" @click="gotoParent">
						<div style="width: 80%;height: 24px;font-weight: normal;line-height: 25px;border-radius: 10px;background-color: var(--mainColorBlue3);color: white;">{{parent}}</div>
					</div>
					
					<inputhook :callIndex="0" :xpath="xpath" @dropHook="dropParent" style="left: 90%;margin-top: 2px;position: absolute;right: 0;top: 10px;"></inputhook>
				</div>
				<!--元素属性-->
				<div class="headerItem" v-if="tag!=''">
					<div class="headerText">元素属性</div>
					<!--新增属性-->
					<div @click="addAttr" draggable="false" @mousemove="null" @mousedown="" @mouseup=""
					style="margin-left: 10px;margin-top: 8px;display: inline-block;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
					ref="addNewButton" >
						<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;"></span>
						<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;"></span>
					</div>
					<!--新增属性-->
				</div>
				<!--属性编辑框-->
				<div class="mainArea" style="border: 2px solid white;" v-if="tag!=''">
					<!--属性对-->
					<div class="attrItem" v-for="(attrItem,index) in attr" :key="index" @contextmenu.stop="removeAttr($event,index)">
						<div class="attr" contenteditable="true" @input="setAttr($event,'key',index)" >{{attrItem.key}}</div>
						<strong style="width: 20px;text-align: center;line-height: 30px;color: var(--mainColorBlue3);font-size: 16px;"> = </strong>
						<div class="attr" contenteditable="true" @input="setAttr($event,'value',index)" style="width: 150px;">{{attrItem.value}}</div>
					</div>
					<!--属性对-->
				</div>
				<!--元素样式-->
				<div class="headerItem" v-if="tag!=''">
					<div class="headerText" >元素样式</div>
					<!--新增属性-->
					<div @click="editDomStyle" draggable="false" @mousemove="null" @mousedown="" @mouseup=""
					style="text-align: center;font-size: 12px;line-height: 20px;margin-left: 10px;margin-top: 5px;display: inline-block;color: white;font-weight: normal;transition: .2s;;transform:scale(1.2) ;width: 40px;height: 20px;border-radius: 10px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
					ref="addNewButton" 
					:style="{backgroundColor:`${callStyleEdit?'var(--mainColorBlack2)':'var(--mainColorBlue3)'}`}">
						{{callStyleEdit?"保存":"编辑"}}
					</div>
					<div style="font-weight: normal;line-height: 30px;margin-left: 70px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">子元素插入锚点</div>
					<inputhook :callIndex="1" :xpath="xpath" @dropHook="insertChildNode" style="left: 90%;margin-top: 2px;position: absolute;right: 0;top: 10px;"></inputhook>
				</div>
				<!--样式预览-->
				<div v-if="tag!=''" class="mainArea" style="overflow: hidden;background-color: var(--mainColorGray3);box-shadow: none;flex-shrink: 0;display: flex;justify-content: center;align-items: center;">
					<div ref="preView" style="height: 100px;width: 200px;background-color: transparent;flex-shrink: 0;display: flex;justify-content: center;align-items: center;" class='preView' :id="thisDomKey"></div>
				</div>
				<!--样式编辑-->
				<div v-if="tag!=''" class="mainArea" style="margin-top: 15px;height: 250px;">
					<!--引用类列表-->
					<div style="transition: .2s;width: 100%;border-bottom: 1px solid var(--mainColorGray2);display: flex;" :style="{height:`${classList.length==0?'30px':'60px'}`}">
						<div style="width: 80%;height:100%;overflow-y: scroll;">
							<div v-if="classList.length==0" style="width: 100%;font-weight: normal;color: var(--mainColorGray2);text-align: center;line-height: 30px;">点击右侧按钮添加样式类</div>
							<button class="classItem" v-for="(item ,index) in classList" :key="index" @contextmenu="removeClass($event,index)">{{item}}</button>
						</div>
						<!--添加按钮-->
						<div style="cursor: pointer;user-select: none;;width: 20%;height: 100%;text-align: center;background-color: transparent;font-size: 1.3rem;font-weight: normal;color:var(--mainColorBlue3);" 
						:style="{lineHeight:`${classList.length==0?'30px':'60px'}`}"
						@click="addClass"
						>+</div>
					</div>
					<div style="padding: 10px;box-sizing: border-box;font-weight: normal;width: 100%;height: 180px;overflow-y: scroll;line-height: 25px;outline:none;border:none;font-size:14px" ref="cssText" contenteditable="true" @keydown="checkCssText">
						<!--属性对-->
						<!--div class="attrItem" v-for="(styleKey,index) in Object.keys(style)" :key="index" @contextmenu.stop="removeAttr($event,index)">
							<div class="attr" contenteditable="true" style="width: 80px;"  >{{styleKey}}</div>
							<strong style="width: 20px;text-align: center;line-height: 30px;color: var(--mainColorBlue3);font-size: 16px;"> : </strong>
							<div class="attr" contenteditable="true"  style="width: 150px;">{{style[styleKey]}}</div>
						</div-->
						
					</div>
				</div>
				
				<!--元素事件-->
				<div v-if="tag!=''" class="headerItem">
					<div class="headerText">元素事件</div>
					<div @click="addEvent" draggable="false" @mousemove="null" @mousedown="" @mouseup=""
					style="margin-left: 10px;margin-top: 8px;display: inline-block;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
					ref="addNewButton" >
						<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;"></span>
						<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;"></span>
					</div>
				</div>
				<!--事件选择-->
				<div v-if="tag!=''" class="mainArea" style="margin-bottom: 20px;">
					<div class="eventButton"
						v-for="(eventKey,index) in Object.keys(domevent)" :key="index"
						@click="viewEventLogic(eventKey)"
						>
						{{eventKey}}
					</div>
				</div>
			</div>
		</teleport>
		<teleport to="body" v-if="showRemoveBar">
			<div 
			@click="removeAttr"
			style="overflow: hidden;position: absolute;z-index: 999;width: 100px;height: 35px;border-radius: 10px;background-color: white;user-select: none;cursor: pointer;
			color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
			:style="{left:`${removeBarPosition.left}px`,top:`${removeBarPosition.top}px`}"
			>
			<input @blur="blurAttrBar" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeRemoveAttr"/>
				删除
			</div>
		</teleport>
		<teleport to="body" v-if="showRemoveClass">
			<div 
			@click="removeClass"
			style="overflow: hidden;position: absolute;z-index: 999;width: 100px;height: 35px;border-radius: 10px;background-color: white;user-select: none;cursor: pointer;
			color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
			:style="{left:`${removeClassPosition.left}px`,top:`${removeClassPosition.top}px`}"
			>
			<input @blur="blurClassRemove" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeRemoveClass"/>
				删除
			</div>
		</teleport>
		<teleport to="body" v-if="showTagList">
			<div 
			style="overflow: hidden;position: absolute;z-index: 999;width: 200px;height: 400px;overflow-y: scroll;border-radius: 10px;background-color: rgba(255,255,255,0.3);backdrop-filter: blur(10px);user-select: none;cursor: pointer;
			color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
			:style="{left:`${tageListBar.left}px`,top:`${tageListBar.top}px`}"
			>
			<input @blur="blurTagList" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeTagList"/>
				<div style="width: 100%;height: auto;" v-for="(tagKind,index) in tagList" :key="index">
					<h3 style="margin: 0;text-align: left;margin-left: 10px;color:var(--mainColorBlack)">{{tagKind.kind}}</h3>
					<div style="height: auto;" class="tagItem" v-for="(tagChildren,index_child) in tagKind.children" :key="index_child" @click="defineDom(tagChildren.tag,tagChildren.input)">
						<h4 style="margin: 0;font-weight: normal;text-align: left;margin-left: 20px;">{{tagChildren.tag}}</h4>
					</div>
					<hr style="width: 100%;height: 3px;border: none;outline: none;background-color: var(--mainColorGray3);"/>
				</div>
			</div>
		</teleport>
		<teleport to="#actionEdit" v-if="showEventEdit">
			<actionEdit v-bind="editVbind" ref="editThisEvent" style="left:0;top:30px;z-index: 999;height:calc(80vh - 40px);box-shadow: none;border-radius: 10px;" @quit="showEventEdit=false;" v-show="!showEventList"></actionEdit>
		</teleport>
	</div>
</template>

<script>
	import outputhook from "../microTools/hookOutPut.vue"
	import inputhook from "../microTools/hookInput.vue"
	import actionEdit from "../microTools/actionEdit.vue"
	export default{
		name:"createdom",
		components:{
			inputhook,
			outputhook,
			actionEdit
		},
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
			},
			provide:{
				type:Boolean,
				default:false,//为true时为外部挂载
			},
			},
		data(){
			return {
				comDesc:"",
					ecLogicName:this.logicName,//此逻辑命名
					thisECName:"createdom",//当前组件名称
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
					  callTarget:{},
					  setContentTarget:[], //需要设置的目标对象
					  remoteEC:[],//远程组件加载列表

					  //用户自定义参数
					  hasTouchSpan:false,
					  tag:"",
					  parent:"",
					  parentCreateDom:false,
					  attr:[
						  
					  ],
					  style:{
						  
					  },
					  classList:[],
					  domevent:{
						 
					  },
					  dataset:{},
					  showCreateBord:false,
					  bordLeft:0,
					  setDataTimeOut:null,
					  showRemoveBar:false,
					  removeBarPosition:{left:0,top:0},
					  removeAttrIndex:-1,
					  showRemoveClass:false,
					  removeClassPosition:{left:0,top:0},
					  removeClassIndex:-1,
					  thisDomKey:"",
					  sendTarget:null,//父元素传递回来用作提供当前元素作为子元素的操作
					  cloneNode:null,//当前生成元素的复制品
					  childrenNodes:{},//当前生成元素的子元素列表，由子元素提供
					  childrenNodesIndex:[],//当前生成元素的子元素先后顺序，由子元素提供
					  childrenNodesXpath:[],
					  parentNodeXPath:null,//父节点的xpath
					  callStyleEdit:false,
					  domOutDown:false,
					  startLeft:0,
					  deltaX:0,
					  tagList:[],
					  tageListBar:{left:0,top:0},
					  showTagList:false,
					  domContent:"",//元素的innerText
					  cssText:"",
					  setCssTextTimeout:null,
					  transCssToJsonTimeout:null,
					  showEventEdit:false,
					  showEventList:false,
					  editVbind:{
						  provide:true,
						  sourceXpath:this.xpath+".userDefine.domevent",
						  dataSource:{
							  store:{},
							  logicSource:{},
							  logic:{},
							  logicIndexKey:[],
							  type:0,
							  name:"",
							  
						  }
					  }
					}
		},
		mounted(){
		    //挂在完成，递归向上传入高度设置
		    this.$emit("setChildHeight",200,this.callIndex)
		    //挂在完成，递归向上传入本组件删除事件
		    this.$emit("setChildRemove",this.removeThis)
			//
			this.callTarget=System.requestCallTarget()
			console.log(this.callTarget.$refs['ecMain'],'fi')
		    this.logicIndex=JSON.parse(JSON.stringify(this.logicIndexList))
		    if(!this.isNew){
		       this.xpath=this.parentXpath!=""?this.parentXpath+"=>"+this.ownPath:this.ownPath
			   this.lastXpath=this.ownPath
		    }else{
		        //父组件新增
		       //新组建，请求新增XpathId
		       this.xpath=this.parentXpath+"=>"+this.thisECName+"_"+this.newXpath
			   this.lastXpath=this.thisECName+"_"+this.newXpath
		       //新增时，子组件为空，故只需传其组件本身的高度
		    }
			this.getEcId()
		    if(this.isNew){
		        //当前组件所需要的数据，除logic外，logic有actionEdit统一插入
		        let thisData={
		            argument:this.argument
		        }
		        //remote: System.insertToLogic(this.xpath,thisData,true),新增远端组件时需要标记远端组件，最后一个参数为true
		        System.insertToLogic(this.xpath,thisData,false,this.comDesc)
				this.thisDomKey=System.requestNewXpathID()
				this.setContentTarget=['thisDomKey','domevent']
				this.setLogicContent(true)
		    }else{
		        this.processLogic()
		    }
			System.pushComDesc(this.thisECName,"/*生成元素*/")
			this.mountedAction()
		},
		methods:{
			processLogic:function(){
				this.$nextTick(()=>{
					this.initArguments()
					try{
						let dom=this.cloneNodeToDom()
						if(this.showCreateBord){
							this.$refs['preView'].innerHTML=""
							this.$refs['preView'].appendChild(dom)
						}
						else{
							this.$refs['showCreatedDom'].innerHTML=""
							this.$refs['showCreatedDom'].appendChild(dom)
						}
							
						this.processChildNode()
						//加载style属
						for(let key in this.style){
							this.processStyle(key,this.style[key],false)
						}
						this.$refs['showCreatedDom'].innerHTML=this.$refs['preView'].innerHTML
						this.editVbind.sourceXpath=this.xpath+".userDefine.domevent"
					}catch{}
				})
			},
			//用户定义的挂载完成操作
			mountedAction:function(){
				window['resetThis'+this.getEcId()]=()=>{
					console.log("reset")
					try{
						this.initArguments()
						let dom=this.cloneNodeToDom()
						if(this.showCreateBord){
							this.$refs['preView'].innerHTML=""
							this.$refs['preView'].appendChild(dom)
						}
						else{
							this.$refs['showCreatedDom'].innerHTML=""
							this.$refs['showCreatedDom'].appendChild(dom)
						}
						this.processChildNode()
						//加载style属
						for(let key in this.style){
							this.processStyle(key,this.style[key],false)
						}
						try{
							this.$refs['showCreatedDom'].innerHTML=this.$refs['preView'].innerHTML
						}catch(e){
							console.log(e)
						}
						
						this.editVbind.sourceXpath=this.xpath+".userDefine.domevent"
						System.eventComponent_Out=()=>{
							
							//抛出的锚点数据
							return {
									xpath:this.getPosition(),
									change:{
										node:true,
										xpath:this.getPosition(),
										parentID:this.getEcId(),//当前组件的子元素
										parentPositon:this.getPosition(),
										childrenNodes:this.childrenNodes,
										childrenNodesIndex:this.childrenNodesIndex,
										style:this.style,
										classList:this.classList,
										event:this.domevent,
										attr:this.attr,
										childrenNodesXpath:this.childrenNodesXpath,
										cloneNode:this.cloneNode
									}
								}
						}
						window['resetThis'+this.getEcId()+'_change'](this.getPosition())//元素可能接受修改，故同时需要从修改元素的元素修改器中修改
						
					}catch(e){
						
							console.log(e)
					}
				}
			},
			//：设置当前组件的参数，如arguments
			setLogicContent:function(isNew=false){
			    //setContentTarget即要设置的属性参数：此处为自定义的arguments
			    //对请求的setContentTarget内容进行遍历
			    for(let index=0;index<this.setContentTarget.length;index++){
			        let key=this.setContentTarget[index]
			        //System.requestSetLogicContent(xpath:组件xpath,key:要设置的属性,value:属性值)
			        System.requestSetLogicContent(this.xpath,key,this[key],isNew,this.processLogic)
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
			//初始化自定义参数
			initArguments:function(){
				System.acceptArgument=(argument)=>{
					for(let key in argument){
						this[key]=argument[key]
						if(key=='parentNodeXPath')console.log(this[key])
					}
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
				
				//用户自定义
				this.removeFromParent()
				try{
					window['removeThis'+this.getEcId()+"_change"]()
				}catch{}
				
			},
			//当前组件调起
			requestInsertPath:function(start=false){
				/*
					start为true时表明为递归起始点，此时需要先请求清空路径列表
				*/
			   if(start) System.clearPathList()
				this.$emit("setPathList",this.ecLogicName)
				//通知父组件跳转到制定位置
				this.$emit("gotoArea",this.callIndex)
			},

			//自定义函数
			openBord:function(e){
				this.initArguments()
				this.bordLeft=e.clientX
				this.showCreateBord=true
				if(this.cloneNode!=null){
					this.$nextTick(()=>{
						//转换当前元素
						let dom=this.cloneNodeToDom()
						let timeout=null
						dom.addEventListener('input',(e)=>{
							if(timeout!=null){
								clearTimeout(timeout)
							}
							timeout=setTimeout(()=>{
								this.domContent=e.target.innerText
								let tempnNode=e.target.cloneNode(true)
								tempnNode.setAttribute("contenteditable",false)
								this.cloneNode=this.domToStr(tempnNode)
								this.$refs['showCreatedDom'].innerHTML=this.cloneNode//重新更改显示的innerHTml
								this.setContentTarget=['domContent','cloneNode']
								this.setLogicContent()
								tempnNode=null
								timeout=null
							},200)
						})
						this.$refs['preView'].appendChild(dom)
						dom.setAttribute("contenteditable",true)
						this.processChildNode()
						//加载style属
						for(let key in this.style){
							this.processStyle(key,this.style[key],false)
						}
						
						//this.cloneNode=document.getElementById(this.thisDomKey)
					})
				}
			},
			//定义标签
			
			close:function(){
				//同步样式
				if(this.cloneNode!=null){
					this.$refs['showCreatedDom'].innerHTML=this.$refs['preView'].innerHTML
					this.$refs['showCreatedDom'].childNodes[0].removeAttribute("contenteditable")
				}
				this.showCreateBord=false
				this.callStyleEdit=false
				System.closeStyleEdit()
			},
			domToStr:function(node){
				var tmpNode = document.createElement( "div" );
				tmpNode.appendChild( node.cloneNode( true ) );  
				var str = tmpNode.innerHTML;  
				tmpNode = node = null;
				return str;  
			},
			strToDom:function(str){
				let tempDom=document.createElement("div")
				tempDom.innerHTML=str
				let dom=tempDom.childNodes[0]
				return dom
			},
			cloneNodeToDom:function(){
				let tempDom=document.createElement("div")
				tempDom.innerHTML=this.cloneNode
				let dom=tempDom.childNodes[0]
				return dom
			},
			callTagList:function(e){
				this.tagList=System.requestDomTags()
				this.tageListBar.left=e.clientX
				this.tageListBar.top=e.clientY
				this.showTagList=true
				this.$nextTick(()=>{
					this.$refs['closeTagList'].focus()
				})
			},
			defineDom:function(tag,input){
				this.$refs['tagInput'].innerText=tag
				this.tag=tag
				let dom=document.createElement(tag)
				dom.style.cssText='height: 100px;width: 200px;background-color:  var(--mainColorGray2);flex-shrink: 0;'
				this.style={
					'height':"100px",
					'width':"200px",
					'backgroundColor':'rgba(0, 0, 0, 0.25)'
				}
				this.$nextTick(()=>{
					if(input){
						//若元素需要控制允许输入
						dom.setAttribute("contenteditable",true)
						let timeout=null
						dom.addEventListener('input',(e)=>{
							if(timeout!=null){
								clearTimeout(timeout)
							}
							timeout=setTimeout(()=>{
								this.domContent=e.target.innerText
								let tempnNode=e.target.cloneNode(true)
								tempnNode.removeAttribute("contenteditable")
								this.cloneNode=this.domToStr(tempnNode)
								this.$refs['showCreatedDom'].innerHTML=this.cloneNode//重新更改显示的innerHTml
								this.setContentTarget=['domContent','cloneNode']
								this.setLogicContent()
								tempnNode=null
								timeout=null
							},200)
						})
					}
					this.$refs['preView'].innerHTML=""
					this.$refs['preView'].appendChild(dom)
					this.cloneNode=this.domToStr(dom)
					this.setContentTarget=['cloneNode','style','tag']
					this.setLogicContent()
					this.$nextTick(()=>{
						this.$refs['showCreatedDom'].innerHTML=dom.outerHTML
					})
					this.showTagList=false
				})
			},
			//attr属性
			setAttr:function(e,target,index){
				/*
					@param {String} target:标记修改key还是value 
					@param {String} data:修改的参数值
					@param {Number} index:修改的索引  
				*/
			   let data=e.target.innerText
				if(this.setDataTimeOut!=null){
					clearTimeout(this.setDataTimeOut)
				}
				this.setDataTimeOut=setTimeout(()=>{
					this.attr[index][target]=data
					this.setContentTarget=['attr']
					this.setDataTimeOut=null
					this.setLogicContent()
				},200)
			},
			addAttr:function(){
				let allow=false
				if(this.attr.length>0){
					let lastIndex=this.attr.length-1
					if(this.attr[lastIndex].key.length==0 && this.attr[lastIndex].value.length==0){
						alert("新增属性未设置,请先处理新增参数值")
					}else{
						allow=true
					}
				}else{
					allow=true
				}
				if(allow)
					this.attr.push({
						key:"",
						value:""
					})
			},
			//新增引用类
			addClass:function(e){
				this.classList.push(System.requestClassList())
				this.$nextTick(()=>{
					let childNodes=e.target.parentNode.childNodes[0].childNodes
					let node=childNodes[childNodes.length-2]
					let targetTop=node.offsetTop
					e.target.parentNode.childNodes[0].scrollTo({
						top:targetTop,
						behavior:"smooth"
					})
				})
				
			},
			addEvent:function(){
				let callBack=(eventName,eventContent)=>{
					this.domevent[eventName]=eventContent
					this.setContentTarget=['domevent']
					this.setLogicContent()
					
				}
				System.requestEventList(callBack,Object.keys(this.domevent))
			},
			removeAttr:function(e,index=-1){
				e.preventDefault()
		
				if(!this.showRemoveBar){
					//未显示时显示
					this.removeBarPosition.left=e.clientX
					this.removeBarPosition.top=e.clientY
					this.showRemoveBar=true
					this.removeAttrIndex=index
					this.$nextTick(()=>{
						this.$refs['closeRemoveAttr'].focus()
					})
				}else{
					//已显示时删除
						this.showRemoveBar=false
						this.attr.splice(this.removeAttrIndex,1)
				}
			},
			blurAttrBar:function(){
				setTimeout(()=>{
					
					this.showRemoveBar=false
				},200)
			},
			removeClass:function(e,index=-1){
				e.preventDefault()
				
				if(!this.showRemoveClass){
					//未显示时显示
					this.removeClassPosition.left=e.clientX
					this.removeClassPosition.top=e.clientY
					this.showRemoveClass=true
					this.removeClassIndex=index
					this.$nextTick(()=>{
						this.$refs['closeRemoveClass'].focus()
					})
				}else{
					//已显示时删除
						this.showRemoveClass=false
						this.classList.splice(this.removeClassIndex,1)
				}
			},
			blurClassRemove:function(){
				setTimeout(()=>{
					this.showRemoveClass=false
				},200)
			},
			
			blurTagList:function(){
				setTimeout(()=>{
					this.showTagList=false
				},200)
			},
			lineFocus:function(e){
				console.log(e)
			},
			processCssText:function(){
				let box=this.$refs['cssText']
				box.innerHTML=""
				let html,reg=new RegExp(/[A-Z]/)
				for(let key in this.style){
					let text=key
					let value=this.style[key]
					reg=new RegExp(/[A-Z]/g)
					//console.log(text)
					if(reg.test(text)){
						let matchList=text.match(reg)
						//console.log(matchList)
						matchList.forEach(alpha=>{
							//console.log(alpha)
							//console.log(text)
							text=text.replace(alpha,'-'+alpha.toLowerCase())
						})
						
					}
					
						
					
					//console.log(text,value)
					//替换var /gradient等
					reg=new RegExp(/([a-z]+)(-?)([a-z]*)\(/g)
					if(reg.test(value))
						value.match(reg).forEach(re=>{
							let first=re.split("(")[0]
							value=value.replace(first,`<h4 style='height:20px;width:auto;margin:0;padding:0;color:var(--mainColorGreen);font-weight:normal;flex-shrink:0'>${first}</h4><h4 style='height:20px;width:auto;margin:0;padding:0;color:var(--mainColorBlue2);font-weight:normal;flex-shrink:0'>`)
						})
					value+="</h4>"
					html+=`<div onfocus='lineFocus' style='width:90%;margin-left:5%;height:25px;white-space:nowrap;display:flex;outline:none;border:none;font-size:14px' contenteditable="true">
										<h4 style='height:20px;width:auto;margin:0;padding:0;color:var(--mainColorBlue);font-weight:normal;flex-shrink:0'>${text}:</h4>
										<h4 style='height:20px;margin:0;padding:0;color:var(--mainColorBlue2);font-weight:normal;flex-shrink:0'>${value+';'}</h4>
					</div>`
				}
				html+=`<div style='width:auto;height:25px;white-space:nowrap;display:flex;outline:none;border:none;font-size:14px' contenteditable="true"></div>`
				reg=new RegExp(/undefined+/g)
				html=html.replace(reg,"")
				box.innerHTML=html
			},
			checkCssText:function(e){
				
				if(e.key=='s' && window.Control){
					e.preventDefault()
					if(this.cloneNode==null){
						alert("未选择元素标签")
						e.target.innerText=""
						return 
					}
					let ref=new RegExp(/(\s)+/g)
					let cssText=e.target.innerText.replace(ref,"")
					let line=cssText.split(";")
					ref=new RegExp(/(\-[a-z]){1}/g)
					let exist=[]
					let existKey=[]
					line.forEach(item => {
						let t=item.split(":")
						if(t.length>1){
							if(ref.test(t[0])){
								t[0]=t[0].replace(ref,t[0].match(ref)[0].split("-")[1].toUpperCase())
							}
							exist.push(t)
							existKey.push(t[0])
						}
					})
					
					//删除在编辑完成的css中不存在的东西
					for(let key in this.style){
						if(!existKey.includes[key]){
							delete this.style[key]
						}
					}
					
					existKey=null
					
					exist.forEach( t =>{
						this.processStyle(t[0],t[1])
					})
					
					exist=null
				}
			},
			processStyle:function(styleName,styleValue,insert=true){
				if(this.cloneNode!=null){
					//insert为false时表示为打开时加载，否则为修改
					let box=this.showCreateBord?this.$refs['preView'].childNodes[0]:this.$refs['showCreatedDom'].childNodes[0]
					let preWidth=box.offsetWidth
					let preHeight=box.offsetHeight
					if(insert)
						this.style[styleName]=styleValue
					if(['width','height'].includes(styleName)){
						//设置长宽时需要重新计算比例
						let percent=1
						box.style[styleName]=styleValue
						
							let checkWidth=()=>{
								let widthValue=box.offsetWidth
								//console.log(widthValue)
								if(widthValue*percent>220){
									//当宽大于高时，以宽为缩放比例
									percent*=(220/(widthValue*percent)).toFixed(2)*1
								}
								
							}
							let checkHeight=()=>{
								let heightValue=box.offsetHeight
								//console.log(heightValue)
								if(heightValue*percent>140){
									//当宽大于高时，以宽为缩放比例
									percent*=(140/(heightValue*percent)).toFixed(2)*1
								}					
								
							}
							
							if(styleName=='width'){
								checkWidth()
								checkHeight()
							}else{
								checkHeight()
								checkWidth()
							}
						let reg=new RegExp(/scale\((\S*)\)/)
						try{
							let temp=box.style.transform.match(reg)[0]
							if(temp!="")
								box.style.transform=box.style.transform.replace(temp,'scale('+percent+')')
							else{
								box.style.transform='scale('+percent+')'
							}
						}catch{
							box.style.transform+=' scale('+percent+')'
						}
						
					}else if(styleName=='transform'){
						//检测scale ，translate
						let reg=new RegExp(/scale\((\S*)\)/)
						try{
							let temp=styleValue.match(reg)[0]
							if(temp!="")//当设置了scale时替换为空
								styleValue=styleValue.replace(temp,'')
						}catch{}
						
						reg=new RegExp(/translateX\((\S*)\)/)
						try{
							let temp=styleValue.match(reg)[0]
							if(temp!="")//当设置了scale时替换为空
								styleValue=styleValue.replace(temp,'')
						}catch{}
						
						reg=new RegExp(/translateY\((\S*)\)/)
						try{
							temp=styleValue.match(reg)[0]
							if(temp!="")//当设置了scale时替换为空
								styleValue=styleValue.replace(temp,'')
						}catch{}
						
						
						reg=new RegExp(/translate\((\S*)\)/)
						try{
							let temp=styleValue.match(reg)[0]
							if(temp!="")//当设置了scale时替换为空
								styleValue=styleValue.replace(temp,'')
						}catch{}
						box.style[styleName]=styleValue
					}else{
						box.style[styleName]=styleValue
					}
					if(insert){
						this.cloneNode=this.domToStr(box)
						this.setContentTarget=['style','cloneNode']
						this.setLogicContent()
						this.$refs['showCreatedDom'].innerHTML=box.outerHTML
						//执行向父组件插入操作,修改父组件的childNode的值，父组件在打开的时候将自动显示
						if(this.parentNodeXPath!=null){
							System.requestSetLogicContent(this.parentNodeXPath,'childrenNodes.'+this.lastXpath,this.cloneNode)
						}
					}
					if(this.showCreateBord)
						this.processCssText()
				}
				else{
					alert("未选择元素标签")
				}
			},
			editDomStyle:function(){
				if(this.cloneNode==null){
					alert("未选择元素标签")
				}else{
					if(!this.callStyleEdit){
						let q=this.thisDomKey
						//定义返回操作
						let virtualDom=document.createElement("div")
						for(let key in this.style){
							virtualDom.style[key]=this.style[key]
						}
						System.returnForStyle=this.processStyle
						eval(`System.requestProvideEditDom({${q}:true},${'`'+virtualDom.outerHTML+'`'})`)
					}else{
						System.closeStyleEdit()
					}
					this.callStyleEdit=!this.callStyleEdit
				}
			},
			//加载子元素
			processChildNode:function(){
				this.$nextTick(()=>{
					this.childrenNodesIndex.forEach(childOwnXpath => {
						if(!childOwnXpath.startsWith("var:")){
							let node=this.childrenNodes[childOwnXpath]
							node=this.strToDom(node)
							if(this.showCreateBord){
								try{
									this.$refs['preView'].childNodes[0].appendChild(node)
								}catch{}
							}else{
								try{
									this.$refs['showCreatedDom'].childNodes[0].appendChild(node)
								}catch{}
							}
						}
					})
				})
			},
			//新增子元素
			insertToThis:function(node,childOwnXpath){
				//将子元素节点插入到当前元素
				this.childrenNodesIndex.push(childOwnXpath)
				this.childrenNodes[childOwnXpath]=this.domToStr(node)
				if(this.showCreateBord){
					//编辑面板打开的情况下
					this.$nextTick(()=>{
						this.$refs['preView'].childNodes[0].appendChild(node)
					})
					this.$refs['preView'].childNodes[0].removeAttribute("contenteditable")
				}
				
				/*注：此处不更改cloneNode，防止才initiArguments中调用初始化时重复生成子元素*/
				this.$refs['showCreatedDom'].childNodes[0].appendChild(node)
				this.setContentTarget=['childrenNodes','childrenNodesIndex','childNodesXpath']
				this.setLogicContent()
			},
			provideThisDom:function(index,callBack,xpath){
				/*xpath引出组件所在的xpath*/
				if(this.cloneNode==null){
					alert("元素未定义，请打开编辑面板定义此元素")
				}else{
					//向外提供此元素
					//需要重新加载一遍数据，否则可能出现无法获取到cloneNode 的情况
					this.initArguments()
					 System.eventComponent_Out=()=>{
						callBack()
						//抛出的锚点数据
						return {
								xpath:xpath,
								parentInsert:{//此项为提供给其他组件用作父元素
									node:true,
									parentID:this.getEcId(),//当前组件的子元素
									insertEvent:this.insertToThis,
									parentPositon:this.getPosition()
								},
								children:{//此项为提供给其他组件用作子元素
									node:true,
									event:(inserToParent,parentPosition,parentOwnPath)=>{
									//父元素传递其子元素插入操作
									if(this.childrenNodesIndex.includes(parentOwnPath)){
										alert("无法将父元素作为当前元素的子元素")
									}else{
										this.sendTarget=inserToParent
										//立即执行一次
										inserToParent(this.cloneNodeToDom(),this.lastXpath)
										this.parentNodeXPath=parentPosition
										this.parent=parentOwnPath
										this.parentCreateDom=true
										this.setContentTarget=['parentNodeXPath','parent','parentCreateDom']
										this.setLogicContent()
										}
									}
								},
								change:{
									node:true,
									xpath:xpath,
									parentID:this.getEcId(),//当前组件的子元素
									parentPositon:this.getPosition(),
									childrenNodes:this.childrenNodes,
									childrenNodesIndex:this.childrenNodesIndex,
									style:this.style,
									classList:this.classList,
									event:this.domevent,
									attr:this.attr,
									childrenNodesXpath:this.childrenNodesXpath,
									cloneNode:this.cloneNode,
									domContent:this.domContent
								}
							}
					}
				}
			},
			insertChildNode:function(index,backContent="",varPath=""){
				let data=System.eventComponent_Out()
				if(System.requestCheckVarArea(varPath,this.xpath)){
					//接受子节点锚点传入
					
					let children=data.children//调用系统事件中由锚点抛出源赋值的输入事件获取输出值
					let childXpath=data.xpath
					if(Object.prototype.toString.call(data)=='[object Object]'){
					    //this.showMen=false
					    //#锚点放置处理
						try{
							if(data.node=="var"){
								System.showToast("变量数据,无法创建预览效果",2000)
								this.childrenNodes['var:'+data.varName]=""
								this.childrenNodesXpath.push("var:"+data.varName)
								this.childrenNodesIndex.push("var:"+data.varName)
								this.setContentTarget=['childrenNodes','childrenNodesIndex','childNodesXpath']
								this.setLogicContent()
							}
							else if(children.node===true){
								this.childrenNodesXpath.push(childXpath)
								children.event(this.insertToThis,this.getPosition(),this.getEcId())//向传进来的子节点插入本节点的子元素插入操作
								
							}else{
								alert("不接受此类型父节点")
							}
						}
					    catch(e){
							console.log(e)
							alert("引入错误")
						}
					    //#锚点放置处理
					}else{
					    alert("不接受此类型变量参数")
					}
				}else{
					alert('定义顺序混乱，请将子组件上移至当前组件上方,或在子组件定义处之后使用元素修改器进行插入')
				}

			},
			dropParent:function(index,backContent="",varPath){
				let data=System.eventComponent_Out()
				//插入父级时，父级元素必须在当前元素之后定义,jicheckvararea返回的比较值要为false
				let areaType="up"
				if(data.node==='var') areaType="low"
				if(!System.requestCheckVarArea(varPath,this.xpath,areaType)){
					let parent=data.parentInsert//调用系统事件中由锚点抛出源赋值的输入事件获取输出值
					
					if(Object.prototype.toString.call(data)=='[object Object]'){
					    //this.showMen=false
					    //#锚点放置处理
						try{
							if(data.node=="var"){
								System.showToast("变量数据,无法创建预览效果",2000)
								this.parent='var:'+data.varName
								this.parentCreateDom=true
								console.log(data)
								this.parentNodeXPath=data.position
								this.setContentTarget=['parentNodeXPath','parent','parentCreateDom']
								this.setLogicContent()
							}
							else if(parent.node){
								let parentXpath=parent.parentID
								this.sendTarget=parent.insertEvent
								//立即执行一次
								parent.insertEvent(this.cloneNodeToDom(),this.lastXpath)
								this.parentNodeXPath=parent.parentPositon
								this.parent=parent.parentID
								this.parentCreateDom=true
								this.setContentTarget=['parentNodeXPath','parent','parentCreateDom']
								this.setLogicContent()
							}else{
								alert("不接受此类型父节点")
							}
						}
					    catch(e){
							console.log(e)
							alert("引入错误")
						}
					    //#锚点放置处理
					}else{
					    alert("不接受此类型变量参数")
					}
				}else{
					if(areaType=='up')
						alert('定义顺序混乱，请在将当前元素移至父元素定义位置前')
					else
						alert('定义顺序混乱，请在将当前元素移至父元素变量位置之后')
				}
				
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
			viewEventLogic:function(name){
				
				if(this.callStyleEdit) this.editDomStyle()
				
				this.showCreateBord=false
				
				this.editVbind.dataSource.name=name
				this.editVbind.sourceXpath=this.getPosition()+".userDefine.domevent."+name
				this.editVbind.dataSource.logicSource=this.domevent[name]
				console.log(this.domevent[name])
				this.editVbind.dataSource.logic=this.domevent[name].logic
				this.editVbind.dataSource.logicIndexKey=this.domevent[name].logicIndexKey
				this.showEventEdit=true
			},
			gotoParent:function(){
				//跳转到父节点位置
				let box
				if(this.parent.startsWith("var:"))
					{
						let lastOne=this.parentNodeXPath.split("=>").at(-1).split("_")
						lastOne.splice(0,1)
						lastOne=lastOne.join("_")
						try{
							box=document.getElementById(lastOne).parentNode
						}catch{
							alert("无法搜索到目标对象，请确认变量名是否修改")
							this.parent=""
							this.parentCreateDom=false
						}
					}
				else
					box=document.getElementById(this.parent).parentNode
				let targetTop=box.offsetTop
				System.ecScrollToArea({
					top:targetTop,
					behavior:"smooth"
				},box)
			},
			removeFromParent:function(){
				
				if(this.parentCreateDom && !this.parent.startsWith("var:")){
					//从父组件中删除此组件
					let callBack=(data)=>{
						let index=data.indexOf(this.lastXpath)
						let arr=[]
						for(let i=0;i<data.length;i++){
							if(i!=index){
								arr.push(data[i])
							}
						}
						//请求删除子组件列表
						System.requestSetOtherUserDefine(this.parentNodeXPath+'.userDefine.childrenNodesIndex',arr)
						arr=null
						let callBack2=(data2)=>{
							delete data2[this.lastXpath]
							//请求删除子组件html
							System.requestSetOtherUserDefine(this.parentNodeXPath+'.userDefine.childrenNodes',data2)
							callBack2=null
							//调用父组件插入的重置事件
							this.$nextTick(()=>{
								setTimeout(()=>{
									window['resetThis'+this.parent]()
								},300)
							})
						}
						System.requestGetOtherUserDefine(this.parentNodeXPath+'.userDefine.childrenNodes',callBack2)
					}
					System.requestGetOtherUserDefine(this.parentNodeXPath+'.userDefine.childrenNodesIndex',callBack)
				}

				
				//将所有子元素的父级参数删除
				this.childrenNodesXpath.forEach(childXpath => {
					if(!childXpath.startsWith("var:")){
						System.requestSetOtherUserDefine(childXpath+'.userDefine.parent',"")
						System.requestSetOtherUserDefine(childXpath+'.userDefine.parentCreateDom',false)
					}
				})
			
				
			}
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
		display: flex;
		width: 96%;
		margin-left: 2%;
		margin-top: 5px;
	}
	.attr{
		width: 50px;
		height: 30px;
		background-color: var(--mainColorGray3);
		color: var(--mainColorBlue3);
		line-height: 30px;
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
		width: 80%;
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