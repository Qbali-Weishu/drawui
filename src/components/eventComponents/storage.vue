<template>
	<div 
	        draggable="false"
	        style="margin-top: 20px;min-width: 250px;height:165px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
	        ref="forOut"
			:id="xpathId"
			@mousedown.stop="requestInsertPath(true)"
			@click.stop=""
	        >
	                <div class="header" draggable="false" ref="viewDom" style="height: 20px;margin-bottom: 10px;">
	                	 <div class="logicName" >
	                		{{ecLogicName}}
	                	</div>
	                	<div style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">storage</div>
	                	
	                </div>
					<!--已存储数据列表-->
					<div ref="showCreatedDom" style="display: flex;align-items: center;justify-content: center;overflow: hidden;max-width: 250px;max-height: 160px;" v-show="!showCreateHttp"></div>
					<div ref="showCreatedHttp" style="overflow: hidden;max-width: 330px;max-height: 160px;" v-show="!showCreateHttp">
						<!--示例名称与请求方式-->
						<div style="width: 100%;height: 35px;display: flex;">
							<div class="headerText">实例名称</div>
							<div style="text-align: center;width: 45%;height: 30px;border-radius: 10px;background-color: var(--mainColorGray3);margin-left: 5px;overflow: hidden;text-overflow: ellipsis;line-height: 30px;color: var(--mainColorBlack);font-weight: normal;" >{{varName}}</div>
							<div style="background-color: var(--mainColorBlue2);color:white;font-weight: normal;position: absolute;right: 20px;margin-top: 2px;user-select: none;cursor: pointer;width: 50px;text-align: center;border-radius: 5px;height: 25px;line-height: 25px;" @click="openBord">编辑</div>
						</div>
					</div>
					<!--编辑界面-->
					<teleport to="body">
						<div class="createDomOut" v-if="showCreateHttp"  :style="{left :`${(bordLeft+deltaX)}px`,height:`${varName==''?'200px':'450px'}`}" ref="mainbord">
							<div draggable="false" class='moveVar' style="z-index: 1;" @mousedown.stop="startDown($event)" @mouseup.stop="endMove" @mouseleave.stop="endMove" @mousemove.stop="moveBord"></div>
							<button style="float: right;color: white;background-color: var(--mainColorBlue3);user-select: none;border-radius: 10px;width: 32px;margin-right: 5px;margin-top: 4px;height: 20px;" @click="showCreateHttp=false">X</button>
							
							<div  draggable="false" style="font-weight: normal;line-height: 30px;margin-left: 5px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">可输入表达式,字符串需使用<strong style="color: black;"  draggable="false">引号</strong> 包裹</div>
							
							<div class="headerItem">
								<div class="headerText">实例名称</div>
								<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
								<div ref='tagInput' @input="setVarName" style="width: 200px;background-color: var(--mainColorGray3);border-radius: 10px;height: 30px;text-align: center;font-weight: normal;outline: none;border: none;line-height: 30px;" contenteditable="true">{{varName}}</div>
							</div>
							<!--内置属性-->
							<div class="headerItem" style="clear: both;" v-if="varName!=''">
								<div class="headerText">内置属性</div>
								<div style="font-weight: normal;line-height: 30px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">单击获取引用语句</div>
							</div>
							<!--内置属性列表-->
							<div class="mainArea" style="border: 2px solid white;height: 50px;" v-if="varName!=''">
								<div class="attrItem" v-for="(attrItem,index) in attr" :key="index">
									<div class="attr" @click="getPropertype(attrItem)" >{{attrItem}}</div>
								</div>
							</div>
					
							<!--内置方法-->
							<div class="headerItem" v-if="varName!=''">
								<div class="headerText">存储内容</div>
								<div draggable="false" @click="addItem" @mousemove="null" @mousedown="" @mouseup=""
								style="text-align: center;margin-left: 10px;margin-top: 8px;display: inline-block;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
								>
									<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;margin: 0;" v-if="!addNew"></span>
									<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;margin: 0;" v-if="!addNew"></span>
									<h4 v-if="addNew" style="margin: 0;pad: 0;font-weight: normal;color: white;font-size: 12px;transform: scale(0.9);transform-origin: center;line-height: 15px;">取消</h4>
								</div>
							</div>
							<!--新增存储项输入-->
							<div class="newItem" v-if="addNew">
								<input class="inp" style="width: 50px;margin-left: 10px;margin-top: 5px;text-align: center;color:var(--mainColorGreen);font-weight: bold;" v-model="newItemData.key"/>
								<strong style="user-select: none;margin-left: 5px;margin-top: 5px;line-height: 25px;">=</strong>
								<input class="inp" style="width: 130px;margin-left: 5px;margin-top: 5px;text-align: center;color:var(--mainColorBlue3);font-weight: bold;" v-model="newItemData.value"/>
								<div class="newItemEdit">
									<!--提交新增-->
									<button @click="commitNew" class="sendButton" style="margin-left: 30px;margin-top: 3px;background-color: white;width: 40px;height: 18px;border-radius:10px;">
										<svg t="1660660318217" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4428" width="20" height="15">
											<path d="M385 840.5c-20.8 0-41.7-7.9-57.6-23.8L87.6 576.9c-31.8-31.8-31.8-83.3 0-115.1s83.3-31.8 115.1 0l239.8 239.8c31.8 31.8 31.8 83.3 0 115.1-15.9 15.9-36.7 23.8-57.5 23.8z" fill="#6D96FF" p-id="4429"></path><path d="M384.6 840.5c-20.8 0-41.7-7.9-57.6-23.8-31.8-31.8-31.8-83.3 0-115.1l494.2-494.2c31.8-31.8 83.3-31.8 115.1 0s31.8 83.3 0 115.1L442.2 816.7c-15.9 15.9-36.8 23.8-57.6 23.8z" fill="#6D96FF" p-id="4430"></path></svg>
									</button>
									<!--复制到别处使用-->
									<button @click="copyUsing" class="sendCopyButton" style="margin-left: 10px;margin-top: 3px;background-color: white;width: 40px;height: 18px;border-radius:10px;">
										<svg t="1660660531244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5054" width="20" height="15"><path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z" p-id="5055" fill="#6D96FF"></path><path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="5056" fill="#6D96FF"></path><path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="5057" fill="#6D96FF"></path></svg>
									</button>
								</div>
							</div>
							<!--已有存储项列表--> 
							<div class="mainArea" style="border: 2px solid white;z-index: 1;box-shadow: 0 8px 15px rgba(0,0,0,0.1);" v-if="varName!=''">
								<h3 style="width: 100px;height: 30px;line-height: 30px;margin: 0;padding: 0;font-weight: normal;margin-left: 10px;color: var(--mainColorGray4);">已有内容:</h3>
								<div class="attrItem" style="display: flex;" v-for="(item,index) in itemList" :key="index" @contextmenu="callOptionBar($event,index)">
									<div contenteditable="true" class="inp" style="line-height: 25px;width: 50px;margin-left: 10px;margin-top: 5px;text-align: center;color:var(--mainColorGreen);font-weight: bold;" @input="setData($event,index,'key')">{{item.key}}</div>
									<strong style="user-select: none;margin-left: 5px;margin-top: 5px;line-height: 25px;">=</strong>
									<div contenteditable="true" class="inp" style="line-height: 25px;width: 130px;margin-left: 5px;margin-top: 5px;text-align: center;color:var(--mainColorBlue3);font-weight: bold;" @input="setData($event,index,'value')">{{item.value}}</div>
								</div>
							</div>
						</div>
					</teleport>
	                <!--右键-->
	                <teleport to="body" v-if="showOptions">
	                	<div 
	                	style="overflow: hidden;position: absolute;z-index: 999;width: 150px;height: 220px;border-radius: 10px;background-color: white;user-select: none;cursor: pointer;
	                	color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
	                	:style="{left:`${optionBarPosition.left}px`,top:`${optionBarPosition.top}px`}"
	                	>
	                	<input @blur="blurOptionBar" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeOptionBar"/>
						<div class="optionItem" v-for="(item,index) in optionList" :key="index" @click="item.event">
							{{item.name}}
							<hr style="width: 100%;margin: 0;padding: 0;border: none;outline:none;height: 3px;background-color: var(--mainColorGray3);" v-if="item.partition"/>
						</div>
	                	</div>
	                </teleport>
	        </div>
</template>
<script>
	export default{
		name:"storage",
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
			return{
				comDesc:"",
				ecLogicName:this.logicName,//此逻辑命名
				thisECName:"for",//当前组件名称
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
					  
					varName:"",
					showCreateHttp:false,
					attr:['length'],
					addNew:false,
					newItemData:{
						key:"",
						data:"",
					},
					deltaX:0,
					bordLeft:0,
					itemList:[
						
					],
					domOutDown:false,
					showOptions:false,
					opeIndex:0,
					optionBarPosition:{
						let:0,
						top:0
					},
					optionList:[
						{name:"获取键名 [key()]",event:()=>{
							let index=this.opeIndex
							try{
								navigator.clipboard.writeText(`${this.varName}.key(${index})`)
								System.showToast("引用语句已复制",2000)
							}catch{
								alert(`写入剪贴板失败，请复制语句:${this.varName}.key(${index})`)
							}
							index=null
						},partition:false},
						{name:"获取键值 [getItem()]",event:()=>{
							let index=this.opeIndex
							try{
								navigator.clipboard.writeText(`${this.varName}.getItem(${this.itemList[index].key})`)
								System.showToast("引用语句已复制",2000)
							}catch{
								alert(`写入剪贴板失败，请复制语句:${this.varName}.getItem(${this.itemList[index].key})`)
							}
							index=null
						},partition:false},
						{name:"移动重置 [setItem()]",event:()=>{
							let index=this.opeIndex
							try{
								navigator.clipboard.writeText(`${this.varName}.setItem(${this.itemList[index].key},"")`)
								System.showToast("引用语句已复制",2000)
							}catch{
								alert(`写入剪贴板失败，请复制语句:${this.varName}.setItem(${this.itemList[index].key},"")`)
							}  
							index=null
						},partition:true},
						{name:"移除 	 [removeItem()]",event:()=>{
							let index=this.opeIndex
							try{
								navigator.clipboard.writeText(`${this.varName}.removeItem(${this.itemList[index].key})`)
								System.showToast("引用语句已复制",2000)
							}catch{
								alert(`写入剪贴板失败，请复制语句:${this.varName}.removeItem(${this.itemList[index].key})`)
							}  
							index=null
						},partition:false},
						{name:"立即移除",event:()=>{
							let index=this.opeIndex
							if(confirm("确定移除当前项")){
								this.itemList.splice(index,1)
								System.showToast("移除成功",2000)
								this.setContentTarget=['itemList']
								this.setLogicContent()
							}
							
						},partition:true},
						{name:"移动引用 ",event:()=>{
							let index=this.opeIndex
							try{
								navigator.clipboard.writeText(`${this.varName}.setItem(${this.itemList[index].key},${this.itemList[index].value})`)
								System.showToast("引用语句已复制",2000)
							}catch{
								alert(`写入剪贴板失败，请复制语句:${this.varName}.setItem(${this.itemList[index].key},${this.itemList[index].value})`)
							}  
							this.itemList.splice(index,1)
							this.setContentTarget=['itemList']
							this.setLogicContent()
							index=null
						},partition:false},
				  ]
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
				System.insertToLogic(this.xpath,{},false,this.comDesc)
				this.setContentTarget=['varName','itemList']
				this.setLogicContent(true)
			}else{
				this.$nextTick(()=>{
					//
					let mylogic,myLogicIndexKey;
					//注册获取逻辑事件，由系统调用传入
					System.getLogic=(logic,logicIndexKey)=>{
						mylogic=logic
						myLogicIndexKey=logicIndexKey
					}
					//请求系统提取子逻辑节点，在提取操作中执行上方获取事件
					System.requestLogicContent(this.xpath)
					//加载子逻辑
					this.initLogic(mylogic,myLogicIndexKey)
				})
			}
			System.pushComDesc(this.thisECName,"/*本地存储localSrorage*/")
			this.mountedAction()
		},
		methods:{
			//挂载完成后执行的用户自定义逻辑
			mountedAction:function(){
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
			//：设置当前组件的参数，如arguments
			setLogicContent:function(isNew=false){
			    //setContentTarget即要设置的属性参数：此处为自定义的arguments
			    //对请求的setContentTarget内容进行遍历
			    for(let index=0;index<this.setContentTarget.length;index++){
			        let key=this.setContentTarget[index]
			        //System.requestSetLogicContent(xpath:组件xpath,key:要设置的属性,value:属性值)
			        System.requestSetLogicContent(this.xpath,key,this[key],isNew)
			    }
			    this.setContentTarget=[]
			},
			//读取用户定义内容
			initArguments:function(data){
				System.acceptArgument=(argument)=>{
					for(let key in argument){
						this[key]=argument[key]
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
			},
			//自定义：
			setVarName:function(e){
				
				
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
					let createSuccess=()=>{
						if(System.checkJsKeyword(e.target.innerText)){
							this.varName=e.target.innerText
							this.setContentTarget=['varName']
							this.setLogicContent()
						}else{
							this.varName=""
							e.target.innerText=""
							System.showToast("此变量名与JS关键词冲突，请重新输入")
						}
					}
					let createError=()=>{
						this.varName=""
						e.target.innerText=""
						System.showToast("变量名非法，请重新输入")
					}
					if(e.target.innerText.length>0){
						try{
							new Function('createSuccess','createError',`try{
									let ${e.target.innerText}=1
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
						e.target.innerText=""
					}
					
					
				},200)
			},
			addItem:function(){
				this.newItemData={
					key:"",
					value:""
				}
				this.addNew=!this.addNew
			},
			openBord:function(e){
				this.initArguments()
				this.bordLeft=e.clientX
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
			commitNew:function(e){
				if(this.newItemData.key!=""){
					this.itemList.push(this.newItemData)
					this.addNew=false
					this.setContentTarget=['itemList']
					this.setLogicContent()
					console.log("success",this.itemList)
				}
				else
					System.showToast("提交失败:存储键名未填写",2000)
			},
			copyUsing:function(index=-1){
				let key=this.addNew?this.newItemData.key:this.itemList[index].key
				let value=this.addNew?this.newItemData.value:this.itemList[index].value
				try{
					navigator.clipboard.writeText(`${this.varName}.setItem(${key},${value})`)
					System.showToast("已复制引用语句，请在执行处粘贴")
				}catch{
					alert(`复制失败,请复制引用语句:${this.varName}.setItem(${key},${value}`)
				}
				this.addNew=false
			},
			callOptionBar:function(e,index){
				e.preventDefault()
				this.optionBarPosition.left=e.clientX
				this.optionBarPosition.top=e.clientY
				this.showOptions=true
				this.opeIndex=index
				this.$nextTick(()=>{
						this.$refs['closeOptionBar'].focus()
				})
			},
			blurOptionBar:function(){
				setTimeout(()=>{
					this.showOptions=false
				},200)
			},
			setData:function(e,index,target){
				if(this.timeout!=null){
					clearTimeout(this.timeout)
				}
				let setSuccess=()=>{
					this.itemList[index][target]=e.target.innerText
					
					this.setContentTarget=['itemList']
					this.setLogicContent()
				}
				let setError=()=>{
					System.showToast("数据有误",1000)
				}
				new RegExp()
				this.timeout=setTimeout(()=>{
					if(e.target.innerText.length>0){
						let reg=new RegExp(/"/g)
						let isString=false
						if(reg.test(e.target.innerText)){
							if(e.target.innerText.match(reg).length%2==0){
								isString=true
							}else if(e.target.innerText.match(reg).length>0){
								console.log("error1",e.target.innerText.match(reg))
								isString=false
								setError()
							}else{
								isString=false
							}
						}
						reg=new RegExp(/'/g)
						if(reg.test(e.target.innerText)){
							if(e.target.innerText.match(reg).length%2==0){
								isString=true
							}else if(e.target.innerText.match(reg).length>0){
								isString=false
								console.log("error2",e.target.innerText.match(reg))
								setError()
							}else{
								isString=false
							}
						}
						reg=new RegExp(/\`/g)
						if(reg.test(e.target.innerText)){
							if(e.target.innerText.match(reg).length%2==0){
								isString=true
							}else if(e.target.innerText.match(reg).length>0){
								isString=false
								console.log("error3",e.target.innerText.match(reg))
								setError()
							}else{
								isString=false
							}
						}
						if(!isString){
							try{
								new Function('success','err',`
												try{
													let ${e.target.innerText}=1
													success()
												}catch(er){
													err()
												}
									}
									`).call(this,setSuccess,setError)
									}
								catch(er){
									setError()
							}
						}
						else{
							setSuccess()
						}
					}

				},200)
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
	.newItem{
		position: relative;
		width: 230px;
		display: flex;
		background-color: white;
		border-radius: 15px 15px 0 0 ;
		margin-left: 60px;
		border: 1px solid var(--mainColorBlue3);
		height: 0px;
		animation: .2s;
		animation: showHeight .2s;
		animation-fill-mode: forwards;
		z-index: 2;
	}
	@keyframes showHeight{
		from{
			height: 0px;
		}to{
			height: 40px;
		}
	}
	.inp{
		height: 25px;
		background-color: var(--mainColorGray3);
		border-radius: 10px;
		outline: none;
		border: none;
	}
	.newItemEdit{
		position: absolute;
		right: -1px;
		bottom: -25px;
		background-color:var(--mainColorBlue3);
		width: 130px;
		box-sizing: border-box;
		height: 25px;
		border-top: 1px solid white;
		box-sizing: border-box;
		overflow: hidden;
		clip-path: polygon(0 0,100% 0,100% 100%,25px 100%,0 0) ;
	}
	.sendButton:hover::after{
		content: '提交';
		position: absolute;
		width: 50px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		right: 0;
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover1 .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	@keyframes showhover1 {
		from{
			opacity: 0;
			right: 10px;
		}to{
			opacity: 1;
			right:1px;
		}
	}
	.sendCopyButton:hover::after{
		content: '复制';
		position: absolute;
		width: 50px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		left: 0;
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover2 .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	@keyframes showhover2 {
		from{
			opacity: 0;
			left: 10px;
		}to{
			opacity: 1;
			left:25px;
		}
	}
	.optionItem{
		margin-top: 5px;
		width: 100%;
		height: 30px;
		background-color: transparent;
		text-align: left;
		padding-left: 10px;
		padding-right: 10px;
		box-sizing: border-box;
		font-weight: normal;
		color: var(--mainColorBlue3);
		line-height: 30px;
		transition: .2s;
	}
	.optionItem:hover{
		background-color: var(--mainColorGray3);
	}
</style>