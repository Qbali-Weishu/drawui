 <template>
	 <div
	         draggable="false"
			 :id="xpathId"
	         style="margin-top: 20px;min-width: 350px;height:165px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
	         ref="forOut"
			 @mousedown.stop="requestInsertPath(true)"
			 @click.stop=""
	         >
	                
	                <div class="header" draggable="false" ref="viewDom" style="height: 20px;margin-bottom: 10px;">
	                	 <div class="logicName" >
	                		{{ecLogicName}}
	                	</div>
						<outputhook @startHook="provideThisElement" :xpath="xpath" style="left: 20px;" v-if="!findAll"></outputhook>
	                	<div v-if="!findAll" style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">引出锚点以提供所获取DOM节点</div>
						<div v-if="findAll" style="font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">结果为节点数组，无法引出锚点</div>
					</div>
	                <div ref="showCreatedDom" class="mainArea" style="border: 2px solid white;margin-left: 0;width: 100%;overflow: hidden;" :style="{height:`${getType=='信息匹配'?'165px':'190px'}`}">
	 				   <div class="headerItem" style="height: 35px">
							<div class="headerText">变量名称</div>
							<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
							<input @input="inputDefineVar"  v-model="defineVar"/>
						</div>
					   <div class="headerItem" style="height: 35px">
	 						<div class="headerText">查找方式</div>
	 						<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
	 						<div @click="callTypeList" ref='tagInput' style="width: 60%;background-color: var(--mainColorGray3);border-radius: 10px;text-align: center;line-height: 30px;cursor: pointer;user-select: none;">{{getType}}</div>
	 					</div>

	 					<div class="headerItem" v-if="getType=='信息匹配'">
	 						<div class="headerText">查找信息</div>
	 						<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
	 						<div @click="callInfoList" ref='tagInput' style="width: 25%;background-color: var(--mainColorGray3);border-radius: 10px;text-align: center;line-height: 30px;cursor: pointer;user-select: none;">{{infoName}}</div>
							<strong style="width: 20px;text-align: center;line-height: 30px;color: var(--mainColorBlue3);font-size: 16px;"> = </strong>
							<input @input="inputInfo" style="width: 35%;" v-model="findInfo"/>
						</div>
						
						<div  v-if="getType=='选择器'" style="font-weight: normal;line-height: 20px;margin-left:5px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">querySelector表达式,字符串请使用引号包裹</div>
						<div class="headerItem" v-if="getType=='选择器'">
							<div class="headerText">选择内容</div>
							<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
							<input @input="inputQuery" v-model="findQuery"/>
						</div>
						<div class="headerItem" style="margin-top: 10px;">
							<div class="headerText">查找所有</div>
							<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
							<verticalCheckBox @setCheck="setFindAll" :precheck="findAll" style="margin-top: 5px;"></verticalCheckBox>
						</div>
	 			   </div>
	                    <!--右键-->
	                 <teleport to="body" v-if="rightBarMenu.show">
	                         <input style="position: absolute;border: none;outline: none;top: -30px;left: -50px;width: 1px;height:1px;" @blur="closeBar" ref="inputForClose">
	                         <div class="ecRightBar" :style="{left:`${rightBarMenu.left}px`,top:`${rightBarMenu.top}px`}">
	                                 <div class="ecRightBarItem" v-for="(option,index) in rightBarMenu.options" :key="index" @click="option.event" :style="{borderTop:`${option.partition?'2px solid rgba(128,128,128,0.5)':'none'}`,borderRadius:`${option.partition?'0 0 5px 5px':'5px'}`}">
	                                         {{option.name}}
	                                 </div>
	                         </div>
	                 </teleport>
	 				<teleport to="body" v-if="showTypeList">
	 					<div 
	 					style="overflow: hidden;position: absolute;z-index: 999;width: 200px;height: 60px;padding-top: 10px;padding-bottom: 10px;overflow-y: scroll;border-radius: 10px;background-color: rgba(255,255,255,0.3);backdrop-filter: blur(10px);user-select: none;cursor: pointer;
	 					color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
	 					:style="{left:`${tageListBar.left}px`,top:`${tageListBar.top}px`}"
	 					>
	 					<input @blur="blurTagList" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeTagList"/>
	 						<div style="width: 100%;height: auto;" v-for="(typeKind,index) in typeList" :key="index">
	 							<div style="height: auto;" class="tagItem" @click="setType(typeKind)">
	 								<h4 style="margin: 0;font-weight: normal;text-align: left;margin-left: 20px;color: var(--mainColorBlue3);height: 25px;line-height: 25px;">{{typeKind}}</h4>
	 							</div>
	 						</div>
	 					</div>
	 				</teleport>
					<teleport to="body" v-if="showInfoList">
						<div 
						style="overflow: hidden;position: absolute;z-index: 999;width: 200px;height: 80px;padding-top: 10px;padding-bottom: 10px;overflow-y: scroll;border-radius: 10px;background-color: rgba(255,255,255,0.3);backdrop-filter: blur(10px);user-select: none;cursor: pointer;
						color: var(--mainColorBlue3);text-align: center;line-height: 30px;box-shadow: 0 0 15px rgba(0,0,0,0.15);"
						:style="{left:`${tageListBar.left}px`,top:`${tageListBar.top}px`}"
						>
						<input @blur="blurTagList" style="position: absolute;left:-20px;width:1px;height:1px" ref="closeTagList"/>
							<div style="width: 100%;height: auto;" v-for="(typeKind,index) in infoList" :key="index">
								<div style="height: auto;" class="tagItem" @click="setType_info(typeKind)">
									<h4 style="margin: 0;font-weight: normal;text-align: left;margin-left: 20px;color: var(--mainColorBlue3);height: 25px;line-height: 25px;">{{typeKind}}</h4>
								</div>
							</div>
						</div>
					</teleport>
	         </div>
</template>

<script>
	import verticalCheckBox from "../microTools/verticalCheckBox.vue"
	import outputhook from "../microTools/hookOutPut.vue"
	export default{
		name:"getelement",
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
		components:{
			 verticalCheckBox,
			 outputhook
		},
		data(){
			return {
				comDesc:"",
				ecLogicName:this.logicName,//此逻辑命名
				thisECName:"getelement",//当前组件名称
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
				getType:"信息匹配",
				infoName:"id",//匹配属性
				findInfo:"",//对应信息
				findQuery:"",//query语句
				targetURL:"",
				typeList:['信息匹配','选择器'],
				infoList:['id','class','tagName'],
				tageListBar:{left:0,top:0},
				showTypeList:false,
				showInfoList:false,
				findAll:false,
				defineVar:"",
				resetDefineVarTimeout:null,//超时重置变量名
				}
	},
	mounted(){
		    //挂在完成，递归向上传入高度设置
		    this.$emit("setChildHeight",260,this.callIndex)
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
			//执行用户定义的挂载前操作
			this.beforeMountedAction()
		    if(this.isNew){
		        //当前组件所需要的数据，除logic外，logic有actionEdit统一插入
		        let thisData={
		            argument:this.argument
		        }
		        //remote: System.insertToLogic(this.xpath,thisData,true),新增远端组件时需要标记远端组件，最后一个参数为true
		        System.insertToLogic(this.xpath,{},false,this.comDesc)
				this.setContentTarget=["getType","infoName","findInfo","findQuery","findAll","defineVar"]
				this.setLogicContent(true)
		    }else{
		        this.$nextTick(()=>{
					this.initArguments()
					//执行用户定义的初始化完成操作
					this.afterInitAction()
		        })
		    }
			System.pushComDesc(this.thisECName,"/*Dom节点获取*/\n"+`${this.getType=='信息匹配'?this.infoName+'='+this.findInfo:this.findQuery}`)
		    //执行用户定义的挂载完成操作
		    this.mountedAction()
		},
		methods:{
			//挂载之前的操作
			beforeMountedAction:function(){
				this.defineVar=this.getEcId()
			},
			//已有组件初始化完成后的操作
			afterInitAction:function(){
				
			},
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
			//用户自定义
			inputurl:function(e){
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
					this.setContentTarget=['targetURL']
					this.setLogicContent()
				},200)
			},
			inputDefineVar:function(e){
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				if(this.resetDefineVarTimeout!=null)
					clearTimeout(this.resetDefineVarTimeout)
				this.timeout=setTimeout(()=>{
					if(System.checkJsKeyword(this.defineVar)){
						this.setContentTarget=['defineVar']
						this.setLogicContent()
					}else{
						System.showToast("变量名与JS关键词冲突",3000)
						this.resetDefineVarTimeout=setTimeout(()=>{
							this.defineVar=this.getEcId()
							this.setContentTarget=['defineVar']
							this.setLogicContent()
							System.showToast("变量名已重置",2000)
						},10000)
					}
				},500)
			},
			inputInfo:function(){
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
						this.setContentTarget=['findInfo']
						this.setLogicContent()
				},500)
			},
			inputQuery:function(){
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
						this.setContentTarget=['findQuery']
						this.setLogicContent()
				},500)
			},
			callTypeList:function(e){
				clearTimeout(this.timeout)
				this.showInfoList=false
				this.tageListBar.left=e.clientX
				this.tageListBar.top=e.clientY
				this.showTypeList=true
				this.$nextTick(()=>{
					this.$refs['closeTagList'].focus()
				})
			},
			blurTagList:function(){
				this.timeout=setTimeout(()=>{
					this.showTypeList=false
					this.showInfoList=false
				},200)
			},
			setType:function(type){
				this.getType=type
				this.setContentTarget=['getType']
				this.setLogicContent()
			},
			setType_info:function(type){
				this.infoName=type
				this.setContentTarget=['infoName']
				this.setLogicContent()
			},
			callInfoList:function(e){
				clearTimeout(this.timeout)
				this.showTypeList=false
				this.tageListBar.left=e.clientX
				this.tageListBar.top=e.clientY
				this.showInfoList=true
				this.$nextTick(()=>{
					this.$refs['closeTagList'].focus()
				})
			},
			setFindAll:function(all){
				this.findAll=all
				this.setContentTarget=['findAll']
				this.setLogicContent()
			},
			provideThisElement:function(index,callBack,xpath){
				System.eventComponent_Out=()=>{
					callBack()
					return {node:"var",varName:this.defineVar,position:this.getPosition()}
				}
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
</style>