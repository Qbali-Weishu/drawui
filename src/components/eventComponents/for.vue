<template>
	<div 
	draggable="false"
	style="margin-top: 20px;min-width: 250px;height:165px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
	ref="forOut"
	:id="xpathId"
	@mousedown.stop="requestInsertPath(true)"
	@click.stop=""
	>
		
		<!--div class="insertECBar" draggable="false" style="background-color: transparent;">
			<要确定当前I组件的索引，用于确定插入在第几个之前-->
			<!--inputhook :callIndex="callIndex" @dropHook="acceptInsert" style="left: -20px;top: 0;"></inputhook>
			<outputhook :callIndex='callIndex' @startHook="startInsert" style="left: 0px;top: 0;"></outputhook>
		</div-->
		<!--button @click="removeThis" style="position: absolute;right: 2px;top: 1px;border-radius: 10px;padding: 0;width: 30px;height: 15px;user-select: none;background-color: var(--mainColorRed2);color: white;">X</button-->
		<div class="header" draggable="false">
			<div class="logicName" >
				{{ecLogicName}}
			</div>
			<div class="headerItem" style="width: 30%;" ref="varName" >
				
				<h3>
					循环变量
				</h3>
				<div class="inputDiv" style="display: flex;box-sizing: border-box;overflow: hidden;">
					<div v-if="mounted[0]" style="margin-left: 5px;height: 20px;background-color: var(--mainColorBlue3);color: white;margin-top: 5px;border-radius: 5px;padding: 2px;box-sizing: border-box;" data-var="0">{{mountedData[0]}}</div>
					<div style="white-space: nowrap;width: 100%;overflow: hidden;text-overflow: ellipsis;height: 30px;text-align: left;outline: none;border: none;;line-height: 30px;letter-spacing: 0px;padding-left: 2px;box-sizing: border-box;"  contenteditable="true" @input.stop="inputVar"  @keydown="mountedIndex=0;deleteContent($event)">{{argument[0]}}</div>
				</div>
				<inputhook :callIndex="0" :xpath="xpath" @dropHook="drop"></inputhook>
			</div>
			<div class="headerItem" style="width: 40%;" ref="condition">
				<h3>
					循环条件
				</h3>
				<div class="inputDiv" style="display: flex;box-sizing: border-box;overflow: hidden;">
					<div v-if="mounted[1]" style="margin-left: 5px;height: 20px;background-color: var(--mainColorBlue3);color: white;margin-top: 5px;border-radius: 5px;padding: 2px;box-sizing: border-box;" data-var="0">{{mountedData[1]}}</div>
					<div  style="width: 100%;overflow: hidden;text-overflow: ellipsis;height: 30px;text-align: left;outline: none;border: none;;line-height: 30px;letter-spacing: 2px;padding-left: 2px;box-sizing: border-box;"  contenteditable="true" @input.stop="inputCondition"   @keydown="mountedIndex=1;deleteContent($event)">{{argument[1]}}</div>
				</div>
				<inputhook :callIndex="1" :xpath="xpath" @dropHook="drop"></inputhook>
			</div>
			<div class="headerItem" style="width: 30%;" ref="step">
				<h3>
					间距变化 
				</h3>
				<input v-model="argument[2]" @input="inputstep"/>
			</div>
		</div>
		<div class="ecblock1 main" style="padding: 10px;box-sizing: border-box;position: relative;background-color: transparent;min-height: 50px;max-height: 150px;" ref="ecMain"  draggable="false">
			
			<div class="areaContentLine">
				<!--顺序控制器-->
				<div class="logicViews" style="overflow-y: scroll;">
					<div class="logicIndexItem"  v-for="(indexItem,index) in logicIndex" :key="index" @contextmenu.stop="logicViewMenu($event,index)" @click="logicSelect?selectThisLogic(index):gotoArea(indexItem.index)">
						<div class="logicSelectCircle" v-if="logicSelect" :style="{backgroundColor:`${logicSelectedList[index]?'var(--mainColorBlue3)':'white'}`}" ></div>
						<div style="float: left;white-space:nowrap;text-overflow: ellipsis;overflow: hidden;">{{indexItem.name}}</div>
					</div>
				</div>
			</div>
			<div v-for="(item,index) in requestConponent" :key="index" class="componentArea" :id="item.newComId">
				<component 
					v-if="!item.remote"
					:is="item.name" 
					v-bind="item.data" 
					@removeChild="removeChild"
					@setChildHeight='setChildHeight'
					@setChildRemove='setChildRemove'
					@setPathList='setPathList'
					@gotoArea="gotoArea"
					></component>
			</div>
			<!--div  draggable="true" @drop="acceptInsert" style="margin-left:133px;bottom: -15px;display: inline-block;position: absolute;" class="insertECBar" >
			</div-->
			<div @click.stop="requestNewComponent" draggable="false" @mousemove="null" @mousedown.stop="" @mouseup="" 
			style="margin-left:60px;display: inline-block;position: absolute;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
			ref="addNewButton" 
			:style="{top:`${logicIndex.length<2?60:logicIndex.length*30}px`}">
				<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;margin: 0;"></span>
				<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;margin: 0;"></span>
			</div>
		</div>
		<teleport to="body" v-if="rightBarMenu.show">
			<input style="position: absolute;border: none;outline: none;top: -30px;left: -50px;width: 1px;height:1px;" @blur="closeBar" ref="inputForClose">
			<div class="ecRightBar" :style="{left:`${rightBarMenu.left}px`,top:`${rightBarMenu.top}px`}">
				<div class="ecRightBarItem" v-for="(option,index) in rightBarMenu.options" :key="index" @click="option.event.call(this)" :style="{borderTop:`${option.partition?'2px solid rgba(128,128,128,0.5)':'none'}`,borderRadius:`${option.partition?'0 0 5px 5px':'5px'}`}">
					{{option.name}}
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>

	import inputhook from "../microTools/hookInput.vue"
	import outputhook from "../microTools/hookOutPut.vue"
	import rightBarOptions from "../microTools/rightBarOptions.js"
	export default{
		name:"forCom",
		props:{
			logicName:"",
			parentXpath:"",//父级xpath
			ownPath:"",//当前组件的xpath最后一级
			isNew:false,//是否为新增
			newXpath:"",
			callIndex:0,
			logicIndexList:{
				type:Array,
				default:[]
			},
			provide:{
				type:Boolean,
				default:false,//为true时为外部挂载
			},
		},
		components:{
			inputhook,
			outputhook,
		},
		data(){
			return {
				comDesc:"",
				ecLogicName:this.logicName,
				thisECName:"for",//当前组件名称
				//showMen:false,
				/*mount:{
					varName:{//ref为varName的锚点对象
						mountTarget:null,//未挂钩锚点
						valueType:"var",//仅接受变量
					}
				},*/
				mountedIndex:0,//多个锚点的目标标记
				mounted:[false,false],//标记是否已经有锚点
				//enterDrag:false,
				mountedData:[],
				xpath:"",//当前组件的xpath
				xpathId:"",
				lastXpath:"",
				timeout:null,
				requestConponent:[],
				hasTouchSpan:false,
				//removeList:[],//被删除的子组件的index
				/*ecArea:{
					start:false,
					left:0,
					top:0,
					startX:0,
					startY:0,
					dertaX:0,
					dertaY:0
				},*/
				logicIndex:[],//通过此数组控制模块先后顺序，其值为各个模块的加载索引，
				childHeight:[],//记录子组件的所有高度
				removeEvent:[],//子节点删除事件集合
				rightBarMenu:{
					selected:0,//被选中的序号
					show:false,
					left:0,
					top:0,
					options:rightBarOptions.rightBarOptions.call(this)
				},
				logicSelect:false,//选择模式
				logicSelectedList:[],
				//需要设置的目标对象
				callTarget:{},
				setContentTarget:[],
				
				
				//自定义参数
				argument:["","",""],
			}
		},
		mounted(){
			//父组件新增
			
			this.$emit("setChildHeight",165,this.callIndex)
			this.$emit("setChildRemove",this.removeThis)
			//
			this.callTarget=System.requestCallTarget()
			this.logicIndex=JSON.parse(JSON.stringify(this.logicIndexList))
			if(!this.isNew){
				this.xpath=this.parentXpath!=""?this.parentXpath+"=>"+this.ownPath:this.ownPath
				this.lastXpath=this.ownPath
				
			}else{
				//新组建，请求新增XpathId
				this.xpath=this.parentXpath+"=>"+this.thisECName+"_"+this.newXpath
				//新增时，子组件为空，故只需传其组件本身的高度
				this.lastXpath=this.thisECName+"_"+this.newXpath
			}
			if(this.isNew){
				
				//当前组件所需要的数据，除logic外，logic有actionEdit统一插入
				let thisData={
					argument:this.argument
				}
				//remote: System.insertToLogic(this.xpath,thisData,true)
				System.insertToLogic(this.xpath,{},false,this.comDesc)
				this.setContentTarget=['argument']
				this.setLogicContent(true)
			}else{
				this.$nextTick(()=>{
					//
					this.processLogic()
					this.initArguments()
				})
				
			}
			System.pushComDesc(this.getEcId(),"/*for循环*/\nfor("+this.argument[0]+";"+this.argument[1]+";"+this.argument[2]+"){","}")
		},
		
		methods:{
			processLogic:function(insert=true){
				if(insert){
					this.logicIndex=[]
					this.requestConponent=[]
					this.childHeight=[]
				}
				this.$nextTick(()=>{
					//
					let mylogic,myLogicIndexKey;
					//注册获取逻辑事件
					System.getLogic=(logic,logicIndexKey)=>{
						mylogic=logic
						myLogicIndexKey=logicIndexKey
						//console.log("初始化",myLogicIndexKey,mylogic)
					}
					//请求系统提取子逻辑节点，在提取操作中执行上方获取事件
				
					System.requestLogicContent(this.xpath)
					
						
						
					this.initLogic(mylogic,myLogicIndexKey,insert)
					//window.addEventListener("")
				})
			},
			setLogicContent:function(isNew=false){
				console.log("设置for",this.setContentTarget,this.argument)
				for(let index=0;index<this.setContentTarget.length;index++){
					let key=this.setContentTarget[index]
					System.requestSetLogicContent(this.xpath,key,this[key],isNew,this.processLogic)
				}
				this.setContentTarget=[]
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
			//初始化原有内容
			initArguments:function(){
				System.acceptArgument=(argument)=>{
					for(let key in argument){
						this[key]=argument[key]
					}
				}
				System.requestArgument(this.getPosition())
			},
			//开启选择状态
			selectThisLogic:function(index){
				if(this.logicSelectedList[index]){
					this.logicSelectedList[index]=false
				}else{
					this.logicSelectedList[index]=true
				}
			},
			deleteContent:function(e){//检测删除
				if(e.key=='Backspace'){
					if(e.target.innerText.length==0 || e.target.innerText==""){
						//说明后面已经没有了
						if(this.hasTouchSpan){
							try{
								//e.target.previousElementSibling.remove()
								this.mounted[this.mountedIndex]=false
							}catch(e){}
							
						}
						this.hasTouchSpan=!this.hasTouchSpan
					}
				}
			},
			//自定义事件：检测参数输入
			inputVar:function(e){
				if(this.timeout!=null){
					clearTimeout(this.timeout)
				}
				this.timeout=setTimeout(()=>{
					let value=e.target.innerText
					if(this.mounted[0])
						this.argument[0]=this.mountedData[0]+value
					else{
						this.argument[0]=value
					}
					this.setContentTarget=['argument']
					this.setLogicContent()
				},200)
			},
			inputCondition:function(e){
				if(this.timeout!=null){
					clearTimeout(this.timeout)
				}
				this.timeout=setTimeout(()=>{
					let value=e.target.innerText
					if(this.mounted[1])
						this.argument[1]=this.mountedData[1]+value
					else{
						this.argument[1]=value
					}
					this.setContentTarget=['argument']
					this.setLogicContent()
						
				
				},200)
			},
			inputstep:function(){
				//step使用vmodel不需要重新赋值
				if(this.timeout!=null){
					clearTimeout(this.timeout)
				}
				this.timeout=setTimeout(()=>{
					this.setContentTarget=['argument']
					this.setLogicContent()
						
				
				},200)
			},
			//锚点放置，自定义事件
			drop:function(index,backContent=""){
				//由于阻止冒泡，故此处需要再次执行放置时的操作
				//在此处触发，说明已经进入目标位置，无需再判断是否有enterDrag
				let data=System.eventComponent_Out()//调用系统事件中由锚点抛出源赋值的输入事件获取输出值
				if(Object.prototype.toString.call(data.value)=='[object String]'){
					//this.showMen=false
					this.mounted[index]=true
					this.mountedData[index]=data.name
					this.argument[index]=this.mountedData[index]
					this.setContentTarget=['argument']
					this.setLogicContent()
				}else{
					alert("不接受此类型变量参数")
				}
				
			},
			
			
			//处理逻辑组件的挂载
			initLogic:function(logic,logicIndexKey,pushToLogicIndex=true){
				for(let index=0;index<logicIndexKey.length;index++){
					let key=logicIndexKey[index]
					let comTarget=key.split("_")[0]
					let remote
					try{
						remote=logic[key].remote
					}catch(e){
						console.error(this.xpath,key,logic)
					}
					//此时为远程组件
					if(remote){
						let newXpathId=System.requestNewXpathID()
						this.requestConponent.push({
							name:comTarget,
							remote:true,
							newComId:newXpathId,
							data:{
								logicName:logic[key].ecTitle,
								parentXpath:this.xpath,
								ownPath:key,
								logicIndexList:[],
								callIndex:index
							}})
							this.$nextTick(()=>{
								//this.remoteEC.push(newComId)
								//远端组件所需要的绑定的事件
								let emit={
									removeChild:this.removeChild,
									setChildHeight:this.setChildHeight,
									setChildRemove:this.setChildRemove
								}
								//远端组件所需要的v-bind数据
								let vBind=this.requestConponent[this.requestConponent.length-1].data
								System.requestEC(comTarget,true,newXpathId,emit,vBind)
							})

					}else{
						if(this.$options.components[comTarget]!=undefined){
								//先检测是否已经加载到组件列表中
								
								this.requestConponent.push({
									name:comTarget,
									remote:false,
									newComId:"",
									data:{
										logicName:logic[key].ecTitle,
										parentXpath:this.xpath,
										ownPath:key,
										logicIndexList:[],
										callIndex:index
										
									}})
						}else{
							//否则请求
								this.$options.components[comTarget]=System.requestEC(comTarget)
								this.requestConponent.push({
									name:comTarget,
									remote:false,
									newComId:"",
									data:{
										logicName:logic[key].ecTitle,
										parentXpath:this.xpath,
										ownPath:key,
										logicIndexList:[],
										callIndex:index
									}})
						}
					}

					//在如粘贴在前等操作中会提前设置好logicIndex前后顺序，故需检测是否需要插入logicIndex中
					if(pushToLogicIndex){
						this.logicIndex.push({
							name:logic[key].ecTitle,//加载标题
							index:index,//加载指向的索引,
							xpath:key//加载指向的逻辑键名
						})
					}
				}
			},
			
			requestNewComponent:function(){//请求新增组件
				//注册系统事件,选择之后执行
				System.requestEcCallBack=(component)=>{
					
					//判断是否是远程加载
					let remote=false
					let newComId=""
					if(Object.prototype.toString.call(component)=='[object Object]'){
						remote=component.remote
						component=component.name
					}
					
					//返回组件名称，判断是否在当前以引入的组件中,(且需要非远程组件)
					if(this.$options.components[component]==undefined && !remote){
						//不存在时请求加载组件
						this.$options.components[component]=System.requestEC(component)
					}
					let newXpathId=System.requestNewXpathID()
					let newXpath=component+"_"+newXpathId
					
					if(remote) newComId=newXpathId
					
					this.childHeight.push(0)
					this.logicIndex.push({name:"步骤"+this.requestConponent.length,index:this.requestConponent.length,xpath:newXpath})
					//注：为保证各组件独立执行，各组件的完整xpath由其在创建的时候请求系统注入，当前的logicIndex仅保存新增子组件将要使用的xpath，与子组件将要保存的一致
					this.requestConponent.push({
						name:component,
						remote:remote,
						newComId:newComId,
						data:{
							logicName:"步骤"+this.requestConponent.length,
							parentXpath:this.xpath,
							isNew:true,
							callIndex:this.requestConponent.length,
							newXpath:newXpathId,
							provide:this.provide
							}})
					
					
					const finishEC=()=>{
						//给最后一个设定高度值
						this.$nextTick(()=>{
							//.componentArea
							let area=this.$refs['ecMain'].childNodes
							//最新的节点
							let lastOne=area[area.length-4]//.childNodes[0]
							lastOne.style.top=this.setChildHeight(0,0,false)+"px"
							let tempIndex=[]
							this.logicIndex.forEach(item =>{
								tempIndex.push(item.xpath)
							})
							console.log("请求传入")
							System.requestResetLogicIndex(this.xpath,tempIndex,true)
							//跳转
							setTimeout(()=>{
								//已经push，所以需要减一
								this.gotoArea(this.requestConponent.length-1)
								area=null
								lastOne=null
								tempIndex=null
							},200)
							
						})
					}
					
					//请求加载远程组件
					if(remote){
						//this.remoteEC.push(newComId)
						//远端组件所需要的绑定的事件
						let emit={
							removeChild:this.removeChild,
							setChildHeight:this.setChildHeight,
							setChildRemove:this.setChildRemove
						}
						//远端组件所需要的v-bind数据
						let vBind=this.requestConponent[this.requestConponent.length-1].data
						this.$nextTick(()=>{
							System.requestEC(component,true,newComId,emit,vBind)
							finishEC()
							
							//远程组件加载完成后向logic中插入remote数据
							
						})
					}else{
						finishEC()
					}
					
					
					
				}
				System.requestECList(this.provide)
			},
			removeThis:function(emitToParent=true){//删除当前本体
				
				//将当前节点的高度设置为0
				//删除按钮是一级子节点，执行其父节点的移除事件即可移除整个节点
				//e.target.parentNode.remove()
				//为防止执行remove之后影响childNode的查找顺序，仅将当前组件的display设置为none,从节点树中移除，并删除其事件数据，在下次重新打开编辑器并渲染时将继续保证其准确性
				//e.target.parentNode.style.display="none"
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
			removeChild:function(index){//接收子组件删除事件
				//this.removeList.push(index)
				//this.getExistEC()
				if(this.logicSelect){
					let tempLength=this.logicIndex.length
					for(let i=tempLength-1;i>-1;i--){
						if(this.logicSelectedList[i]){
							this.rightBarMenu.selected=i
							index=this.logicIndex[this.rightBarMenu.selected].index
							this.removeEvent[index]()
							this.logicIndex.splice(this.rightBarMenu.selected,1)
							this.logicSelectedList.splice(i,1)
						}
					}
					if(this.logicIndex.length==0){
						this.logicSelect=false
						this.rightBarMenu.options[2].name="选择"
						this.rightBarMenu.options[5].name="复制"
						this.rightBarMenu.options[6].name="剪切"
						this.rightBarMenu.options[9].name="删除"
					}
				}else{
					for(let i=0;i<this.logicIndex.length;i++){
						if(this.logicIndex[i].index==index){
							this.rightBarMenu.selected=i
							break
						}
					}
					//index=this.logicIndex[this.rightBarMenu.selected].index
					this.removeEvent[index](false)
					this.logicIndex.splice(this.rightBarMenu.selected,1)
				}
				let tempIndex=[]
				this.logicIndex.forEach(item =>{
					tempIndex.push(item.xpath)
				})
				System.requestResetLogicIndex(this.xpath,tempIndex)
				tempIndex=[]
			},

			setChildHeight:function(height,index,rec=true,logicIndex=null){
				/*
				|*|height是请求此事件的子组件的高度，index是该子组件的加载顺序,即callIndex
				|*|rec为true时标明为修改/删除/新增时的调用，rec为false时标明为新增后为最新的子节点设定高度值
				*/
				if(rec && height!=-1)
					this.childHeight[index]=height
				if(height==-1 && logicIndex==null)
					this.childHeight[index]=0
				let parentChilds=this.$refs['ecMain'].childNodes
				//修改或新增时，需要加上子组件的高度与所有子组件的高度
				let allChildHeight=0
				let domHeight=0
				//rec为true时，为全部，为false时，除去最后即最新的一个
				let dif=rec?0:1
				if(logicIndex==null){
					//非排序调用
					for(let i=0;i<this.childHeight.length-dif;i++){
						//将当前组件中，index之后的组件的top值全部修改
						if(rec)
							{
								if(i>index){
									parentChilds[i+2].style.top=allChildHeight+"px"
								}
							}
						allChildHeight+=this.childHeight[i]>0?this.childHeight[i]+20:0
						domHeight+=this.childHeight[i]
					}
					if(rec && logicIndex==null){
						this.$refs['ecMain'].style.height=domHeight+'px'
						//加上自身高度
						allChildHeight+=165
						this.$refs['forOut'].style.height=domHeight+"px"
						domHeight+=165
						//再次调用当前函数，对排序过的进行重新更改高度
						this.setChildHeight(-1,0,false,{indexs:this.logicIndex,from:0,to:0})
						//继续向上递归
						this.$emit("setChildHeight",allChildHeight,this.callIndex)
					}else{
						return allChildHeight
					}
				}else{
					let moveToTop=0
					for(let i=0;i<this.logicIndex.length;i++){
						parentChilds[this.logicIndex[i].index+2].style.top=moveToTop+"px"
						moveToTop+=this.childHeight[this.logicIndex[i].index]+20
					}
				}
			},
			setChildRemove:function(removeEvent){
				this.removeEvent.push(removeEvent)
			},
			logicViewMenu:function(e,index){
				e.preventDefault()
				this.rightBarMenu.selected=index
				let left=e.clientX,top=e.clientY
				this.rightBarMenu.left=left
				this.rightBarMenu.top=top
				this.rightBarMenu.show=true
				this.$nextTick(()=>{
					this.$refs['inputForClose'].focus()
				})
			},
			closeBar:function(){
				setTimeout(()=>{
					this.rightBarMenu.show=false
				},200)
			},
			indexUp:function(index){
				if(index==0){
					alert('已经到顶了')
				}else{
					let preLogicIndex=JSON.parse(JSON.stringify(this.logicIndex))
					let from=index
					let to=index-1
					let llg=preLogicIndex[from]
					//console.log(lg,from)
					//逻辑上移
					/*
					index:在logicIndex中的index，lg:其数据data中所指向的目标子节点顺序
					*/
					//起始位置与目标位置的距离
					let dif=from-to
					//console.log(dif)
					//插入到目标位置
					let t=from-dif
					this.logicIndex.splice(t,0,llg)
					//删除原位置
					this.logicIndex.splice(from+1,1)
					this.$nextTick(()=>{
						this.setChildHeight(-1,0,false,
						{indexs:preLogicIndex,from:from,to:to})
					})
					
					//存回新的数据
					let tempIndex=[]
					this.logicIndex.forEach(item =>{
						tempIndex.push(item.xpath)
					})
					System.requestResetLogicIndex(this.xpath,tempIndex)
					tempIndex=[]
				}
			},
			indexDown:function(index){
				if(index==this.logicIndex.length-1){
					alert("已经到底了")
				}else{
					//逻辑下移
					/*
					index:在logicIndex中的index，lg:其数据data中所指向的目标子节点顺序
					*/
					let preLogicIndex=JSON.parse(JSON.stringify(this.logicIndex))
					let from=index
					let to=index+1
					let llg=preLogicIndex[from]
					let dif=to-from
					//删除原位置
					this.logicIndex.splice(from,1)
					//插入到目标位置
					this.logicIndex.splice(to,0,llg)		  
					this.$nextTick(()=>{
						this.setChildHeight(-1,0,false,
						{indexs:preLogicIndex,from:from,to:to})
					})
					//存回新的数据
					let tempIndex=[]
					this.logicIndex.forEach(item =>{
						tempIndex.push(item.xpath)
					})
					System.requestResetLogicIndex(this.xpath,tempIndex)
					tempIndex=[]
				}
			},
			gotoArea:function(index){
				//跳到指定位置
				//console.log(index,this.$refs['ecMain'].childNodes)
				let box=this.$refs['ecMain'].childNodes[index+2]
				let targetTop=box.offsetTop
				System.ecScrollToArea.call(this.callTarget,{
					top:targetTop,
					behavior:"smooth"
				},box,this.$refs["ecMain"].childNodes[index+2].querySelector('.header .logicName').innerText)

			},
			//由下一级子组件调起
			setPathList:function(pathName,index){
				//先提交当前组件
				let temp=
					{
						logicIndex:this.logicIndex,
						gotoArea:(index)=>{
							if(this.logicSelect){
								this.selectThisLogic(index)
								return this.logicSelectedList[index]
							}else{
								this.gotoArea(index)
								return false
							}
							
							},
						logicViewMenu:this.logicViewMenu
					}
				System.insertPathList(pathName,temp)
				this.requestInsertPath()
			},
			//当前组件调起
			requestInsertPath:function(start=false){
				/*
					start为true时表明为递归起始点，此时需要先请求清空路径列表
				*/
				if(start){
					System.clearPathList()
					//通知父组件跳转到制定位置
					this.$emit("gotoArea",this.callIndex)
				} 
				this.$emit("setPathList",this.ecLogicName)
				
			},
		}
	}
</script>

<style scoped>
	.header{
		min-width: 250px;
		user-select: none;
		width: auto;
		height: 60px;
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
	.headerItem{
		z-index: 2;
		margin: 5px;
		height: 50px;
		background-color: transparent;
		position: relative;
		font-size: 14px;
		color: var(--mainColorBlue3);
	}
	.headerItem h3{
		font-size: 13px;
		margin: 0;
		padding: 0;
		font-weight: normal;
		width: 100%;
		
		height: 20px;
		line-height: 20px;
		color:var(--mainColorBlue3);
	}
	.headerItem input{
		
		margin: 0;
		padding: 0;
		font-weight: normal;
		width: 100%;
		height: 30px;
		border:none;
		outline:none;
		text-align: center;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 10px;
		color:var(--mainColorBlue3);
	}
	.main{
		min-width: 200px;
		background-color: transparent;
		min-height: 50px;
	}
	.inputDiv{
		margin: 0;
		padding: 0;
		font-weight: normal;
		width: 100%;
		height: 30px;
		border:none;
		outline:none;
		text-align: center;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 10px;
		color:var(--mainColorBlue3);
	}
	.componentArea{
		z-index: 99;
		transition: .2s;
		position: relative;
		margin:10px;
		margin-left: 125px;
	}
	.areaContentLine{
		position: absolute;
		top: 0;
		left: 130px;
		height: 100%;
		background-color: transparent;
		width: 10px;
		border:2px dashed var(--mainColorGray2);
		border-right: none;
	}
	.areaContentLine::after{
		content: '';
		position: absolute;
		height: 50px;
		width: 10px;
		background-color: transparent;
		left: -14px;
		border:2px dashed var(--mainColorGray4);
		border-right: none;
		border-left: none;
		border-top: none;
		top: -10px;
	}
</style>