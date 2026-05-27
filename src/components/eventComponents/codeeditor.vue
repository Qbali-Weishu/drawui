<template>
	<div 
		draggable="false"
		style="margin-top: 20px;width: 400px;height:300px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
		ref="forOut"
		:id="xpathId"
		@mousedown.stop="requestInsertPath(true)"
		@click.stop=""
		>
	                <div class="header" draggable="false" style="height: 20px;margin-bottom: 10px;">
	                    <div class="logicName" >
							{{ecLogicName}}
						</div>
						<div style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;height: 25px;">代码编辑框</div>
						<div @click="spreadCode" style="width: 20px;height: 25px;position: absolute;right: 50px;top:10px;cursor: pointer;" ecTitle="放大" class="codeToastButton">
							<svg t="1661342201486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6004" width="20" height="20"><path d="M288 928h-96c-52.8 0-96-43.2-96-96v-96c0-17.6 14.4-32 32-32s32 14.4 32 32v96c0 17.6 14.4 32 32 32h96c17.6 0 32 14.4 32 32s-14.4 32-32 32z m544 0h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96c17.6 0 32-14.4 32-32v-96c0-17.6 14.4-32 32-32s32 14.4 32 32v96c0 52.8-43.2 96-96 96z m64-608c-17.6 0-32-14.4-32-32v-96c0-17.6-14.4-32-32-32h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96c52.8 0 96 43.2 96 96v96c0 17.6-14.4 32-32 32z m-768 0c-17.6 0-32-14.4-32-32v-96c0-52.8 43.2-96 96-96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32h-96c-17.6 0-32 14.4-32 32v96c0 17.6-14.4 32-32 32z m544 448H352c-52.8 0-96-43.2-96-96V352c0-52.8 43.2-96 96-96h320c52.8 0 96 43.2 96 96v320c0 52.8-43.2 96-96 96zM352 320c-17.6 0-32 14.4-32 32v320c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32V352c0-17.6-14.4-32-32-32H352z" p-id="6005" fill="#6D96FF"></path></svg>
						</div>
						<div @click="callEditor" style="width: 20px;height: 25px;position: absolute;right: 20px;top:10px;cursor: pointer;" ecTitle="使用代码编辑器" class="codeToastButton">
							<svg t="1661327848169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2184" width="20" height="20"><path d="M288.256 216.064a51.2 51.2 0 0 0-72.192 8.192l-204.8 256a51.2 51.2 0 0 0 0 64l204.8 256a51.2 51.2 0 0 0 79.872-64L116.736 512l179.2-224.256a51.2 51.2 0 0 0-7.68-71.68zM1012.736 480.256l-204.8-256a51.2 51.2 0 0 0-79.872 64l179.2 223.744-179.2 224.256a51.2 51.2 0 0 0 79.872 64l204.8-256a51.2 51.2 0 0 0 0-64zM599.552 102.4a51.2 51.2 0 0 0-60.928 39.424l-153.6 716.8A51.2 51.2 0 0 0 424.448 921.6h10.752a51.2 51.2 0 0 0 51.2-40.448l153.6-716.8A51.2 51.2 0 0 0 599.552 102.4z" fill="#6D96FF" p-id="2185"></path></svg>
						</div>
	                </div>
					
					<div v-if="!callCodeEditor" ref="showCreatedDom" class="mainArea" style="border: 2px solid white;margin-left: 0;width: 370px;height: 260px;overflow:inherit;position: relative;">
							<div style="position: absolute;width: 370px;height: 260px;left:0px;top:0px;transition: .2s;border-radius: 10px;" ref="codeOut">
								<div v-if="spreadEditor" style="position: absolute;width: 100px;height: 25px;background-color: rebeccapurple;top: -30px;z-index: 99999;right: 10px;border-radius: 10px;background-color: white;box-shadow: 0 0 15px rgba(0,0,0,0.15);">
									<div  ecTitle="缩小" @click="spreadCode" class="codeToastButton" style="float: left;width: 25px;height: 25px;margin: 0;cursor: pointer;margin-left: 25px;">
										<svg t="1661342139382" class="icon" viewBox="0 0 1024 1024"  style="margin-left:2px;margin-top: 2px;pointer-events: none;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3359" width="20" height="20"><path d="M638.293333 588.8m-240.64 0a240.64 240.64 0 1 0 481.28 0 240.64 240.64 0 1 0-481.28 0Z" fill="#6D96FF" opacity=".3" p-id="3360" data-spm-anchor-id="a313x.7781069.0.i4" class=""></path><path d="M658.773333 752.64H365.226667c-51.2 0-92.16-40.96-92.16-92.16V365.226667c0-51.2 40.96-92.16 92.16-92.16h295.253333c51.2 0 92.16 40.96 92.16 92.16v295.253333c0 49.493333-42.666667 92.16-93.866667 92.16zM365.226667 322.56c-22.186667 0-40.96 18.773333-40.96 40.96v295.253333c0 22.186667 18.773333 40.96 40.96 40.96h295.253333c22.186667 0 40.96-18.773333 40.96-40.96V365.226667c0-22.186667-18.773333-40.96-40.96-40.96H365.226667zM203.093333 989.866667c-13.653333 0-25.6-11.946667-25.6-25.6v-117.76H59.733333c-13.653333 0-25.6-10.24-25.6-25.6s11.946667-25.6 25.6-25.6h143.36c13.653333 0 25.6 11.946667 25.6 25.6v143.36c0 13.653333-11.946667 25.6-25.6 25.6zM820.906667 989.866667c-13.653333 0-25.6-11.946667-25.6-25.6v-143.36c0-13.653333 11.946667-25.6 25.6-25.6h143.36c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6h-117.76v117.76c0 13.653333-10.24 25.6-25.6 25.6zM203.093333 228.693333H59.733333c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h117.76V59.733333c0-13.653333 10.24-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v143.36c0 13.653333-11.946667 25.6-25.6 25.6zM964.266667 228.693333h-143.36c-13.653333 0-25.6-11.946667-25.6-25.6V59.733333c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v117.76h117.76c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6z" fill="#6D96FF" p-id="3361"></path></svg>									
									</div>
									<div  ecTitle="使用代码编辑器" @click="callEditor" class="codeToastButton" style="float: right;width: 25px;height: 25px;margin: 0;margin-right: 25px;cursor: pointer;">
										<svg t="1661327848169" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-left: 15px;margin-top: 2px;pointer-events: none;" xmlns="http://www.w3.org/2000/svg" p-id="2184" width="20" height="20"><path d="M288.256 216.064a51.2 51.2 0 0 0-72.192 8.192l-204.8 256a51.2 51.2 0 0 0 0 64l204.8 256a51.2 51.2 0 0 0 79.872-64L116.736 512l179.2-224.256a51.2 51.2 0 0 0-7.68-71.68zM1012.736 480.256l-204.8-256a51.2 51.2 0 0 0-79.872 64l179.2 223.744-179.2 224.256a51.2 51.2 0 0 0 79.872 64l204.8-256a51.2 51.2 0 0 0 0-64zM599.552 102.4a51.2 51.2 0 0 0-60.928 39.424l-153.6 716.8A51.2 51.2 0 0 0 424.448 921.6h10.752a51.2 51.2 0 0 0 51.2-40.448l153.6-716.8A51.2 51.2 0 0 0 599.552 102.4z" fill="#6D96FF" p-id="2185"></path></svg>
									</div>
								</div>
								<div style="width: 100%;height: 100%;overflow: hidden;border-radius: 10px;">
									<newCode ref="code" @changeCode="changeCode"></newCode>
								</div>
								
							</div>
					</div>
	</div>
</template>

<script>
	import newCode from "./tools/code.vue"
	export default{
		name:"codeeditor",
		components:{
			//newCode
			newCode
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
			},},
		data(){
			return {
				comDesc:"",
				ecLogicName:this.logicName,//此逻辑命名
				thisECName:"codeeditor",//当前组件名称
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
					callTarget:null,
				  setContentTarget:[], //需要设置的目标对象
				  remoteEC:[],//远程组件加载列表
					
					
				spreadEditor:false,
				codeText:"",
				callCodeEditor:false
			}
		},
		mounted(){
			console.log("gello",this.$options.components)
		    //挂在完成，递归向上传入高度设置
		    this.$emit("setChildHeight",320,this.callIndex)
		    //挂在完成，递归向上传入本组件删除事件
		    this.$emit("setChildRemove",this.removeThis)
		    this.callTarget=System.requestCallTarget()
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
			//初始化一次xpathId
			this.getEcId()
		    if(this.isNew){
		        //当前组件所需要的数据，除logic外，logic有actionEdit统一插入
		        let thisData={
		            argument:this.argument
		        }
		        //remote: System.insertToLogic(this.xpath,thisData,true),新增远端组件时需要标记远端组件，最后一个参数为true
		        System.insertToLogic(this.xpath,thisData,false,this.comDesc)
				this.codeText=`/*tip:请在下方编写代码,若需代码提示等功能，\n请使用代码编辑器,请注意检查代码逻辑是否完\n\整,若需在此代码逻辑内使用组件,请在逻辑完\n成后再添加一个代码框 ，写入}或})等结尾符*/`
		        this.setContentTarget=['codeText']
				this.setLogicContent(true)
				this.$nextTick(()=>{
					try{
						this.$refs['code'].setCode(this.codeText,true)
					}catch{}
					
				})
		    }else{
		       this.processLogic()
		    }
		    this.mountedAction()
			System.pushComDesc(this.thisECName,this.codeText)
			
		},
		methods:{
			processLogic:function(){
				this.$nextTick(()=>{
				    this.initArguments()
				})
			},
			beforeMountedAction:function(){
			},
			mountedAction:function(){
				if(!this.isNew){
					this.$nextTick(()=>{
						try{
							this.$refs['code'].setCode(this.codeText,true)
						}catch{}
					})
				}
			},
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
			        System.requestSetLogicContent(this.xpath,key,this[key],isNew,this.processLogic)
			    }
			    this.setContentTarget=[]
			},
			//读取用户定义内容
			initArguments:function(data){
					System.acceptArgument=(argument)=>{
								for(let key in argument){
									this[key]=argument[key]
									console.log(argument)
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
			
			
			spreadCode:function(){
				this.spreadEditor=!this.spreadEditor
				if(this.spreadEditor){
					this.$refs['codeOut'].style.width="600px"
					this.$refs['codeOut'].style.height="340px"
					this.$refs['codeOut'].style.left="-125px"
					this.$refs['codeOut'].style.top="-40px"
					this.$refs['codeOut'].style.boxShadow="0 0 15px rgba(0,0,0,0.15)"
					
				}else{
					this.$refs['codeOut'].style.width="350px"
					this.$refs['codeOut'].style.height="260px"
					this.$refs['codeOut'].style.left="0px"
					this.$refs['codeOut'].style.top="0px"
					this.$refs['codeOut'].style.boxShadow="none"
				}
			},
			changeCode:function(code){
				this.codeText=code
				this.setContentTarget=['codeText']
				this.setLogicContent()
			},
			//使用代码编辑器
			callEditor:function(){
				/*t=null
				eventComs={}*/
				let text=this.$refs['code'].getVal()
				this.callCodeEditor=true
				
				this.$nextTick(()=>{
					let saveCallBack=(text,canvas=null,object=0)=>{
						this.callCodeEditor=false
						if(text!=null){
							this.codeText=text
							this.$nextTick(()=>{
								this.$refs['code'].setCode(this.codeText)
								System.pushComDesc(this.thisECName,this.codeText)
								this.setContentTarget=['codeText']
								this.setLogicContent()
							})
						}
					}
						System.callOpenCode(saveCallBack,text,{
							title:"代码编辑器",
							props:[],
							object:-1
						})
					
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
	.tagItem{
		color: var(--mainColorBlue3);
		width: 90%;
		margin-left: 5%;
		border-radius: 5px;
		height: 40px;
		line-height: 40px;
	}
	.tagItem:hover{
		background-color: var(--mainColorGray2);
	}
	.codeToastButton:hover::after{
		content: attr(ecTitle);
		position: absolute;
		width: 100px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}		
	@keyframes showhover {
		from{
			opacity: 0;
			top: 0px;
		}to{
			opacity: 1;
			top:-25px;
		}
	}
	</style>