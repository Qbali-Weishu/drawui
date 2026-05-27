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
			<div style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">文件上传</div>
			<div style="background-color: transparent;color:var(--mainColorBlue3);font-weight: normal;position: absolute;right: 20px;user-select: none;cursor: pointer;" @click="openBord">编辑</div>
			
		</div>
		<div class="mainArea" style="border: 2px solid white;height: 100px;width: 100%;margin-left: 0;margin-top: 10px;" >
			<!--属性对-->
			<div class="attrItem" v-for="(item,index) in selectedAcceptList" :key="index" >
				<div class="attr">{{acceptList[item].title}}</div>
			</div>
			<!--属性对-->
		</div>
		<div ref="showCreatedDom" style="display: flex;align-items: center;justify-content: center;overflow: hidden;max-width: 250px;max-height: 160px;" v-show="!showCreateBord"></div>
		<!--编辑界面-->
		<teleport to="body">
			
			<div class="createDomOut" v-if="showCreateBord"  :style="{left :`${(bordLeft+deltaX)}px`}" ref="mainbord">
				<div draggable="false" class='moveVar' @mousedown.stop="startDown($event)" @mouseup.stop="endMove" @mouseleave.stop="endMove" @mousemove.stop="moveBord"></div>
				<button style="float: right;color: white;background-color: var(--mainColorBlue3);user-select: none;border-radius: 10px;width: 32px;margin-right: 5px;margin-top: 4px;" @click="close">X</button>
				<div  draggable="false" style="font-weight: normal;line-height: 30px;margin-left: 5px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">可输入表达式,字符串需使用<strong style="color: black;"  draggable="false">引号</strong> 包裹</div>
				<!--元素标签-->
				<div class="headerItem">
					<div class="headerText">函数模式</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<div class="headerText" style="margin: 0;background-color:var(--mainColorGray3);color: var(--mainColorBlue3);cursor: pointer;height: 30px;line-height: 30px;border-radius: 10px;width: 80px;text-align: center;" @click="callSelectObject">{{['( )=>','function( )'][object]}}</div>
					<selectListT @change="selectChange_object" ref="selectList_object" v-if="showSelectObject" :list="['( )=>','function( )']" @close="showSelectObject=false" :selected="['( )=>','function( )'][object]" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 153;" :width="'80px'"></selectListT>
					<div class="headerText" style="position: relative;margin: 0;background-color:transparent;color: var(--mainColorBlue3);cursor: pointer;height: 30px;line-height: 30px;border-radius: 10px;width: 100px;text-align: center;margin-left: 40px;" @click="testInput">
						<span style="position: absolute;height: 20px;width: 20px;top: 5px;left: 0;">
							<svg t="1660886280668" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20217" width="20" height="20">
								<path d="M311.466667 64c4.693333 0 8.533333 3.84 8.533333 8.533333v46.933334a8.533333 8.533333 0 0 1-8.533333 8.533333H234.666667a106.666667 106.666667 0 0 0-106.56 102.037333L128 234.666667v554.666666a106.666667 106.666667 0 0 0 102.037333 106.56L234.666667 896h554.666666a106.666667 106.666667 0 0 0 106.56-102.037333L896 789.333333V234.666667a106.666667 106.666667 0 0 0-102.037333-106.56L789.333333 128h-55.466666a8.533333 8.533333 0 0 1-8.533334-8.533333V72.533333c0-4.693333 3.84-8.533333 8.533334-8.533333H789.333333a170.666667 170.666667 0 0 1 170.666667 170.666667v554.666666a170.666667 170.666667 0 0 1-170.666667 170.666667H234.666667a170.666667 170.666667 0 0 1-170.666667-170.666667V234.666667a170.666667 170.666667 0 0 1 170.666667-170.666667h76.8z m212.138666 0l2.517334 0.298667c4.138667 0.746667 8.106667 2.709333 11.306666 5.909333l185.386667 185.386667a8.533333 8.533333 0 0 1 2.517333 6.058666v66.368a8.533333 8.533333 0 0 1-14.570666 6.037334L554.666667 177.962667V632.96a8.533333 8.533333 0 0 1-8.533334 8.533333h-46.933333a8.533333 8.533333 0 0 1-8.533333-8.533333V177.322667l-156.096 156.096a8.533333 8.533333 0 0 1-14.570667-6.037334v-66.346666a8.533333 8.533333 0 0 1 2.496-6.037334l184.768-184.789333A21.248 21.248 0 0 1 521.088 64h2.517333z" fill="#6D96FF" p-id="20218">
								</path>
							</svg>
						</span>
						上传测试
					</div>
				</div>
				<!--元素属性-->
				<div class="headerItem" >
					<div class="headerText">文件类型</div>
					<!--新增属性-->
					<div @click="callAddAccept" draggable="false" @mousemove="null" @mousedown="" @mouseup=""
					style="margin-left: 10px;margin-top: 8px;display: inline-block;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
					ref="addNewButton" >
						<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;"></span>
						<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;"></span>
					</div>
					<!--新增属性-->
				</div>
				<!--属性编辑框-->
				<div class="mainArea" style="border: 2px solid white;" >
					<!--属性对-->
					<div class="attrItem" v-for="(item,index) in selectedAcceptList" :key="index" @contextmenu.stop="removeAttr($event,index)">
						<div class="attr">{{acceptList[item].title}}</div>
					</div>
					<!--属性对-->
				</div>
				<!--元素样式-->
				<div class="headerItem" >
					<div class="headerText" >选择完成</div>
					<!--新增属性-->
					<div @click="editSendBody" draggable="false" @mousemove="null" @mousedown="" @mouseup=""
					style="text-align: center;font-size: 12px;line-height: 20px;margin-left: 10px;margin-top: 5px;display: inline-block;color: white;font-weight: normal;transition: .2s;;transform:scale(1.2) ;width: 40px;height: 20px;border-radius: 10px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;background-color:var(--mainColorBlue3) " 
					ref="addNewButton" 
					>
						编辑
					</div>
				</div>
				<!--样式编辑-->
				<div  class="mainArea" style="margin-top: 15px;height: 200px;">
					<div ref='codeViewer' style="padding: 10px;box-sizing: border-box;font-weight: normal;width: 100%;height: 180px;overflow-y: scroll;line-height: 25px;outline:none;border:none;font-size:14px">
						<!--属性对-->
						<!--div class="attrItem" v-for="(styleKey,index) in Object.keys(style)" :key="index" @contextmenu.stop="removeAttr($event,index)">
							<div class="attr" contenteditable="true" style="width: 80px;"  >{{styleKey}}</div>
							<strong style="width: 20px;text-align: center;line-height: 30px;color: var(--mainColorBlue3);font-size: 16px;"> : </strong>
							<div class="attr" contenteditable="true"  style="width: 150px;">{{style[styleKey]}}</div>
						</div-->
						
					</div>
				</div>
				
				<!--元素事件-->
				<div class="headerItem" style="margin-top: 20px;">
					<div class="headerText">文件多选</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>

					<verticalCheckBox @setCheck="setMul" :precheck="multiple" style="margin-top: 5px;"></verticalCheckBox>
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
		<!--上传测试完成-->
		<teleport to="body" v-if="showUploadSuccess">
			<div class="acceptList" style="background-color: white;" ref="acceptList">
				<div style="width: 100%;display: flex;height: 40px;background-color: transparent;">
					<div style="width: 80%;display:flex;height: 30px;position: relative;margin-top: 10px;">
						<h4 style="width: 100px;height: 30px;line-height: 30px;margin: 0;padding: 0;text-align: center;user-select: none;color: var(--mainColorBlack);">类型</h4>
						<h4 style="width: 80px;height: 30px;line-height: 30px;margin: 0;padding: 0;text-align: center;user-select: none;color: var(--mainColorBlack);">大小</h4>
						<h4 style="width: calc(100% - 180px);height: 30px;line-height: 30px;margin: 0;padding: 0;text-align: center;user-select: none;color: var(--mainColorBlack);">名称</h4>
					</div>
					<button style="position: absolute;right: 5px;top: 5px;height: 30px;width: 50px;color: var(--mainColorBlue3);background-color: transparent;cursor: pointer;" @click="showUploadSuccess=false;uploadList=[]">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
						
					</button>
				</div>
				<div style="position: relative;margin-top: 10px;overflow-y: scroll;height: calc(80vh - 50px);" ref="acceptMain">
					<div class="acceptItem" v-for="(item,index) in uploadList" :key="index">
						<div class="acceptItem_title"  style="width: 100px;overflow: hidden;text-overflow: ellipsis;">{{item.type}}</div>
						<div class="acceptItem_title"  style="width: 80px;overflow: hidden;text-overflow: ellipsis;">{{item.size}}</div>
						<div class="acceptItem_desc" style="width: calc(100% - 200px)">{{item.name}}</div>
					</div>
				</div>
			</div>
		</teleport>
		<!--文件类型选择-->
		<teleport to="body" v-if="showAcceptList">
			<div class="acceptList" ref="acceptList">
				
				<div style="width: 100%;display: flex;height: 40px;background-color: transparent;">
					<input @input="searchAccept" style="width: 50%;margin-left: 25%;border-radius: 10px;height: 30px;line-height: 30px;text-align: center;box-shadow: 0 0 15px rgba(0,0,0,0.1);outline: none;border: none;margin-top: 10px;" placeholder="搜索文件类型"/>
					<button style="position: absolute;right: 5px;top: 5px;height: 30px;width: 50px;color: var(--mainColorBlue3);background-color: transparent;cursor: pointer;" @click="cancleSelectAccept(true)">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
					</button>
				</div>
				<!--已选文件列表-->
				<div style="z-index: 999999;;width: 100px;height: 80vh;top:0;right: -108px;background-color: white;border-radius: 15px;box-shadow: 0 0 15px rgba(0,0,0,0.1);position: absolute;" v-if="selectedAcceptList.length>0">
					<h4 style="margin: 0;padding: 0;font-weight: normal;color: var(--mainColorGray2);width: 100px;text-align: center;font-size: 14px;height: 30px;line-height: 30px;">已选</h4>
					<div style="position: relative;margin-top: 10px;overflow-y: scroll;height: calc(80vh - 100px);" ref="acceptMain">
						<div class="acceptItem" v-for="(item,index) in selectedAcceptList" :key="index" @click="cancleSelectAccept(index)">
							<div class="acceptItem_title">{{acceptList[item].title}}</div>
						</div>
					</div>
					<button @click="addAccept" style="background-color: var(--mainColorBlue3);width: 90px;border-radius: 10px;color: white;cursor: pointer;height: 30px;margin-left: 5px;margin-top: 10px;">确认</button>
				</div>
				<!--全部文件类型列表-->
				<div style="position: relative;margin-top: 10px;overflow-y: scroll;height: calc(80vh - 50px);" ref="acceptMain">
					<div class="acceptItem" v-for="(item,index) in acceptList" :key="index" @click="selectAccept(index)" :style="{backgroundColor:`${~selectedAcceptList.indexOf(index)?'var(--mainColorGray3)':'transparent'}`}">
						<div class="acceptItem_title">{{item.title}}</div>
						<div class="acceptItem_desc">{{item.desc}}</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	/*
	let source=null
	let a=document.createElement("input")
	a.type="file"
	a.accept=""
	a.onchange=function(){
		source=this.files
	}
	*/
	import outputhook from "../microTools/hookOutPut.vue"
	import inputhook from "../microTools/hookInput.vue"
	import actionEdit from "../microTools/actionEdit.vue"
	import selectListT from "../microTools/select2.vue"
	import fileAcceptList from "./tools/acceptFileList.js"
	import verticalCheckBox from "../microTools/verticalCheckBox.vue"
	export default{
		name:"fileinput",
		components:{
			inputhook,
			outputhook,
			actionEdit,
			selectListT,
			verticalCheckBox
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
					thisECName:"fileinput",//当前组件名称
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
					  tag:"",
					  parent:"",
					  parentCreateDom:false,
					  attr:[
						  
					  ],
					  style:{
						  
					  },
					  showCreateBord:false,
					  bordLeft:0,
					  showRemoveBar:false,
					  removeBarPosition:{left:0,top:0},
					  removeAttrIndex:-1,			 
					  thisDomKey:"",
					  domOutDown:false,
					  startLeft:0,
					  deltaX:0,	  
					  successCode:"",
					  object:0,//标记()=>格式与function()格式
					  showSelectObject:false,
					  testDom:null,//创建完成时向body插入一个input，用于预览上传
					  showAcceptList:false,
					  selectedAcceptList:[],
					  selectedAcceptList_temp:[],//备份，取消选择时恢复
					  acceptList:fileAcceptList,
					  showSelectPreviewObject:false,
					  previewObject:0,
					  multiple:false,
					  showUploadSuccess:false,
					  uploadList:[],
					}
					
					
					
		},
		mounted(){
		    //挂在完成，递归向上传入高度设置
		    this.$emit("setChildHeight",200,this.callIndex)
		    //挂在完成，递归向上传入本组件删除事件
		    this.$emit("setChildRemove",this.removeThis)
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
		        System.insertToLogic(this.xpath,{},false,this.comDesc)
				this.thisDomKey=System.requestNewXpathID()
				this.setContentTarget=['object','selectedAcceptList','successCode','multiple']
				this.setLogicContent(true)
				this.mountedAction()
		    }else{
		       this.processLogic()
		    }
			System.pushComDesc(this.thisECName,`/*文件上传(fileUpload仅为展示使用，代表文件上传对象):*/\n	        let fileUpload_${this.getEcId()}\n	        fileUpload_${this.getEcId()}.onsuccess(${this.object==0?"("+('event_'+this.getEcId())+")=>{":"function("+('event_'+this.getEcId())+"){"}\n        ${this.successCode}\n    })`,'')
		},
		methods:{
			processLogic:function(){
				this.$nextTick(()=>{
					this.initArguments()
					this.mountedAction()
				})
			},
			//用户定义的挂载完成操作
			mountedAction:function(){
				let input=document.createElement('input')
				input.type="file"
				input.value=""
				input.style.cssText=`
					width:1px;
					height:1px;
					opacity:0;
					position:absolute;
					top:130vh;
					left:130vw;
					z-index:-1`
				document.body.appendChild(input)
				this.testDom=input
				let temp=[]
				input.addEventListener("change",(e)=>{
					console.log(e.target.files.length)
					if(e.target.files.length>0){
						let item=null
						let type=null
						for(let i=0;i<e.target.files.length;i++){
							item=e.target.files[i]
							if(item.type=='') type="--未知类型--"
							else type=item.type.split("/")[1]		
							temp.push({name:item.name,size:(item.size/1024).toFixed(2)+"K",type:type})
						}
						this.uploadList=temp
						this.showUploadSuccess=true
					}else{
						console.log("cancle")
						System.showToast("取消选择",2000)
					}

					
				})
				this.addAccept()
				this.setMul(this.multiple)
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
					}
					console.log(this.multiple)
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
			},
			//定义标签
			
			close:function(){

				this.showCreateBord=false

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
						this.selectedAcceptList.splice(this.removeAttrIndex,1)
						this.addAccept()
				}
			},
			blurAttrBar:function(){
				setTimeout(()=>{
					
					this.showRemoveBar=false
				},200)
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

			gotoParent:function(){
				//跳转到父节点位置
				let box=document.getElementById(this.parent).parentNode
				let targetTop=box.offsetTop
				System.ecScrollToArea({
					top:targetTop,
					behavior:"smooth"
				},box)
			},

			selectChange_object:function(index){
				//方法选择
				this.object=index.index
				this.showSelectObject=false
				this.setContentTarget=['object']
				this.setLogicContent()
			},
			callSelectObject:function(e){
				this.showSelectObject=true
				this.$nextTick(()=>{
					this.$refs['selectList_object'].setSpread(e)
				})
			},
			callSelectPreviewObject:function(e){
				this.showSelectPreviewObject=true
				this.$nextTick(()=>{
					this.$refs['selectList_previewObject'].setSpread(e)
				})
			},
			selectChange_previewObject:function(index){
				this.previewObject=index.index
				this.showSelectPreviewObject=false
			},
			editSendBody:function(){
				let saveCallBack=(text,canvas=null,object=0)=>{
					if(text!=null){
						this.successCode=text
						this.setContentTarget=['successCode']
						this.setLogicContent()
						System.pushComDesc(this.thisECName,`/*文件上传(fileUpload仅为展示使用，代表文件上传对象):*/\n	        let fileUpload_${this.getEcId()}\n	        fileUpload_${this.getEcId()}.onsuccess(${this.object==0?"("+('event_'+this.getEcId())+")=>{":"function("+('event_'+this.getEcId())+"){"}\n        ${this.successCode}\n    })`,'')
					}
					if(canvas!=null){
						this.$refs['codeViewer'].innerHTML=""
						canvas.style.width="100%"
						canvas.style.aspectRatio="4/3"
						this.$refs['codeViewer'].appendChild(canvas)
					}
					this.object=object
					this.setContentTarget=['object']
					this.setLogicContent()
				}
				System.callOpenCode(saveCallBack,this.successCode,{
					title:"文件选择onchange()事件",
					props:['event_'+this.getEcId()],
					object:this.object
				})
			},
			testInput:function(){
				this.testDom.click()
			},
			callAddAccept:function(){
				this.selectedAcceptList_temp=JSON.parse(JSON.stringify(this.selectedAcceptList))//复制备份
				this.showAcceptList=true
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.$refs['acceptList'].style.backdropFilter='blur(15px)';
						this.$refs['acceptList'].style.backgroundColor=' rgba(255,255,255,0.75)';
					},600)
				})
			},
			searchAccept:function(e){
				if(this.timeout!=null){
					clearTimeout(this.timeout)
				}
				this.timeout=setTimeout(()=>{
					let value=e.target.value
					if(value.length>0){
						let childNodes=document.querySelectorAll('.acceptItem')
						let node
						for(let i=0;i<childNodes.length;i++){
							node=childNodes[i]
							if(~node.innerText.indexOf(value)){
								console.log(node.parentNode)
								this.$refs['acceptMain'].scrollTo({
									top:node.offsetTop,
									behavior:"smooth"
								})
								break
								
							}
						}
						node=null
						childNodes=null
					}
					this.timeout=null
				},500)
			},
			cancleSelectAccept:function(index){
				if(index===true){
					//此时为取消全部
					this.selectedAcceptList=JSON.parse(JSON.stringify(this.selectedAcceptList_temp))
					this.selectedAcceptList_temp=[]
					this.showAcceptList=false
				}else{
					this.selectedAcceptList.splice(index,1)
				}
				
			},
			selectAccept:function(index){
				let existIndex=this.selectedAcceptList.indexOf(index)
				if(existIndex>-1){
					//此时已经存在
					this.cancleSelectAccept(existIndex)
				}else{
					this.selectedAcceptList.push(index)
				}
			},
			addAccept:function(){
				this.showAcceptList=false
				this.$nextTick(()=>{
					this.setContentTarget=['selectedAcceptList']
					this.setLogicContent()
					let accept=[]
					this.selectedAcceptList.forEach(index => {
						if(index<3){
							accept.push(this.acceptList[index].title)
						}else{
							accept.push(this.acceptList[index].desc)
						}
						
					})
					accept=accept.join(",")
					this.testDom.accept=accept
					console.log(this.testDom)
					accept=null
				})
			},
			setMul:function(mul){
				this.multiple=mul
				if(this.multiple){
					this.testDom.setAttribute("multiple","multiple")
				}else{
					this.testDom.removeAttribute("multiple")
				}
				console.log(this.testDom)
				this.setContentTarget=['multiple']
				this.setLogicContent()
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
		height: 600px;
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
		float: left;
		margin-left: 5px;
		margin-top: 10px;
		
		
	}
	.attr{
		cursor: pointer;
		width: auto;
		padding-left: 10px;
		padding-right: 10px;
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
	.acceptList{
		z-index: 999;
		position: absolute;
		height: 80vh;
		width: 30vw;
		background-color: rgba(255,255,255,0.95);
		border-radius: 15px;
		top: 150vh;
		left: 50vw;
		transition: .2s;
		transform: translate(-50%,-50%);
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		animation: acceptListShow .5s;
		animation-fill-mode: forwards;
	}
	@keyframes acceptListShow {
		from{
			top:150vh;
			opacity: 0;
		}to{
			top:50vh;
			opacity: 1;
		}
	}
	.acceptItem{
		display: flex;
		height: 30px;
		width: 100%;
		margin-top: 5px;
		background-color: transparent;
	}
	.acceptItem_title{
		width: 80px;
		text-align: center;
		height: 30px;
		line-height: 30px;
		color: var(--mainColorBlue3);
		font-weight: normal;
		cursor: pointer;
		font-size: 14px;
		
	}
	
	.acceptItem_desc{
		cursor: pointer;
		width: calc(100% - 100px);
		text-align: left;
		height: 30px;
		line-height: 30px;
		color: var(--mainColorGrayA8);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: normal;
	}
</style>