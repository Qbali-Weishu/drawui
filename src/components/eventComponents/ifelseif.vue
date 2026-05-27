<template>
	<div 
	        draggable="false"
	        style="margin-top: 20px;min-width: 250px;height:165px;background-color: white;border-radius: 15px;padding: 10px;box-sizing: border-box;position: absolute;transition: .2s;" 
	        ref="forOut"
			:id="xpathId"
			@mousedown.stop="requestInsertPath(true)"
			@click.stop=""
	        >
	                <div class="header" draggable="false">
	                    <div class="logicName" >
							{{ecLogicName}}
						</div>
	                        <!--头部参数列表-->
	                    	<!--输入参数表-->
							<h3 style="margin: 0;padding: 0;font-weight: normal;margin-top: 10px;margin-left: 10px;line-height: 30px;">执行条件</h3>
							<div class="inputDiv" style="display: flex;box-sizing: border-box;overflow: hidden;width: 60%;">
								<div v-if="mounted[0]" style="margin-left: 5px;height: 20px;background-color: var(--mainColorBlue3);color: white;margin-top: 5px;border-radius: 5px;padding: 2px;box-sizing: border-box;" data-var="0">{{mountedData[0]}}</div>
								<div style="text-align: center;white-space: nowrap;width: 100%;overflow: hidden;text-overflow: ellipsis;height: 30px;outline: none;border: none;;line-height: 30px;letter-spacing: 0px;padding-left: 2px;box-sizing: border-box;"  contenteditable="true" @input.stop="inputVar"  @keydown="mountedIndex=0;deleteContent($event)"></div>
								
							</div>
							<inputhook :callIndex="0" :xpath="xpath" @dropHook="drop" style="left: 90%;margin-top: 2px;"></inputhook>
	                </div>
	                <div style="display: none;">
	                        <!--远程组件挂载缓冲-->
	                        <div v-for="(newComId,index) in remoteEC" :key="index" >
	                                
	                        </div>
	                </div>
	                <!--若需要载入子逻辑，此块必须存在-->
	                <div class="ecblock1 main" style="padding: 10px;box-sizing: border-box;position: relative;background-color: transparent;min-height: 50px;" ref="ecMain"  draggable="false">
	                        
	                        <div class="areaContentLine">
	                                <!--顺序控制器-->
	                                <div class="logicViews" style="overflow-y: scroll;">
	                                        <div class="logicIndexItem" v-for="(indexItem,index) in logicIndex" :key="index" @contextmenu.stop="logicViewMenu($event,index)" @click="gotoArea(indexItem.index)">
	                                                {{indexItem.name}}
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
											@setPathList='setPathList'></component>
	                        </div>
	                        
	                        <div @click.stop="requestNewComponent" draggable="false" @mousemove="null" @mousedown.stop="" @mouseup="" 
	                        style="margin-left:60px;display: inline-block;position: absolute;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
	                        ref="addNewButton" 
	                        :style="{top:`${logicIndex.length<2?60:logicIndex.length*30}px`}">
	                                <span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;margin: 0;"></span>
	                                <span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;margin: 0;"></span>
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
	        </div>
</template>

<script>
	import inputhook from "../microTools/hookInput.vue"
	import rightBarOptions from "../microTools/rightBarOptions.js"
	export default{
		name:"ifelseifBlock",
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
			},provide:{
				type:Boolean,
				default:false,//为true时为外部挂载
			},
			},
		components:{
			inputhook
		},
		data(){
			return {
				comDesc:"",
				ecLogicName:this.logicName,//此逻辑命名
				thisECName:"ifelseifBlock",//当前组件名称
				mountedIndex:0,//多个锚点的目标标记
				mounted:[false,false],//标记是否已经有锚点
				//enterDrag:false,
				mountedData:[],//锚点所绑定的数据
				xpath:"",//当前组件的xpath
				xpathId:"",
				lastXpath:"",
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
					options:rightBarOptions.rightBarOptions.call(this)
				 },
				 callTarget:{},
				  setContentTarget:[], //需要设置的目标对象
				  remoteEC:[],//远程组件加载列表
					
					
				  //用户自定义参数
				  hasTouchSpan:false,
				  condition:""
				}
		},
		mounted(){
		    //挂在完成，递归向上传入高度设置
		    this.$emit("setChildHeight",165,this.callIndex)
		    //挂在完成，递归向上传入本组件删除事件
		    this.$emit("setChildRemove",this.removeThis)
			this.callTarget=System.requestCallTarget()
			//当前组件是否允许其他组件获取数据，此函数不存在且不在此函数请求列表中存在时默认为false
			System.provideAllowGetData({
				ecName:this.thisECName,
				unshow:true,allowdGetIndex:false
			})
		    this.logicIndex=JSON.parse(JSON.stringify(this.logicIndexList))
			
			
		    if(!this.isNew){
		       this.xpath=this.parentXpath!=""?this.parentXpath+"=>"+this.ownPath:this.ownPath
			   this.lastXpath=this.ownPath
		    }else{
		        //父组件新增
		       //新组建，请求新增XpathId
		       this.xpath=this.parentXpath+"=>"+this.thisECName+"_"+this.newXpath
		       //新增时，子组件为空，故只需传其组件本身的高度
			   this.lastXpath=this.thisECName+"_"+this.newXpath
		    }
		    if(this.isNew){
		        //当前组件所需要的数据，除logic外，logic有actionEdit统一插入
		        let thisData={
		            condition:this.condition
		        }
		        //remote: System.insertToLogic(this.xpath,thisData,true),新增远端组件时需要标记远端组件，最后一个参数为true
		        System.insertToLogic(this.xpath,{},false,this.comDesc)
				this.setContentTarget=['condition']
				this.setLogicContent()
		    }else{
		        this.processLogic()
		    }
			System.pushComDesc(this.getEcId(),"/*else if("+this.condition+")*/")
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
			inputCondition:function(e){
				if(this.timeout!=null){
					clearTimeout(this.timeout)
				}
				this.timeout=setTimeout(()=>{
					let value=e.target.innerText
					if(this.mounted[1])
						this.condition=this.mountedData[1]+value
					else{
						this.condition=value
					}
					this.setContentTarget=['condition']
					this.setLogicContent(true)
						
				
				},200)
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
						console.log(key,argument[key])
					}
				}
				System.requestArgument(this.getPosition())
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
			//:初始化子逻辑           
			initLogic:function(logic,logicIndexKey){
			    /*
			                	*@param {*} logic:当前组件的logic内容
			                	*@param {*} logicIndexKey 当前组件的逻辑顺序列表
			                */
			    for(let index=0;index<logicIndexKey.length;index++){
			        let key=logicIndexKey[index]
			        let comTarget=key.split("_")[0]
			        let remote=logic[key].remote
			        //此时为远程组件
			        if(remote){
			            //随机生成挂在目标节点的Id
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
			                //远端组件所需要的绑定的事件
			                let emit={
			                    removeChild:this.removeChild,
			                    setChildHeight:this.setChildHeight,
			                    setChildRemove:this.setChildRemove
			                }
			                //远端组件所需要的v-bind数据
			                let vBind=this.requestConponent[this.requestConponent.length-1].data
			                //请求挂载目标
			                System.requestEC(comTarget,true,newXpathId,emit,vBind)
			            })
			
			        }else{
			            if(this.$options.components[comTarget]!=undefined){
			                //先检测是否已经加载到组件列表中
			                this.requestConponent.push({
			                    name:comTarget,//component :is=comTarget
			                    remote:false,//div v-if=!remote
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
			
			        this.logicIndex.push({
			            name:logic[key].ecTitle,//加载标题
			            index:index,//加载指向的索引,
			            xpath:key//加载指向的逻辑键名
			
			        })
			    }
			},//请求新增
			//由下一级子组件调起
			setPathList:function(pathName){
				//先提交当前组件
				let temp=
					{
						logicIndex:this.logicIndex,
						gotoArea:this.gotoArea,
						logicViewMenu:this.logicViewMenu
					}
				console.log(temp)
				System.insertPathList(pathName,temp)
				this.requestInsertPath()
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
			requestNewComponent:function(){//请求新增组件
				//注册系统事件,选择之后执行
				System.requestEcCallBack=(component)=>{

					//判断是否是远程加载
					let remote=false
					let newComId=""
					//远程加载时，component:{remote:true,name:"组件名"}
					if(Object.prototype.toString.call(component)=='[object Object]'){
						remote=component.remote
						//重设为要请求的组件名
						component=component.name
					}

					//返回组件名称，判断是否在当前以引入的组件中,(且需要非远程组件)
					if(this.$options.components[component]==undefined && !remote){
						//不存在时请求加载组件
						this.$options.components[component]=System.requestEC(component)
					}
					//请求生成新组件的ID
					let newXpathId=System.requestNewXpathID()
					//生成完成Xpath层级
					let newXpath=component+"_"+newXpathId

					//为远程组件要挂载的目标节点设置ID值
					if(remote) newComId=newXpathId

					//预设新组件的高度，后续组件创建完成可直接根据索引更改，防止报错
					this.childHeight.push(0)
					//像当前组件的逻辑索引插入新组件
					this.logicIndex.push({name:"步骤"+this.requestConponent.length,
										  index:this.requestConponent.length,
										  xpath:newXpath})
					//注：为保证各组件独立执行，各组件的完整xpath由其在创建的时候请求系统注入，
					//当前的logicIndex仅保存新增子组件将要使用的xpath，与子组件将要保存的一致
					this.requestConponent.push({
						name:component,//component :is="comTarget"
						remote:remote,//component v-if="!remote"
						newComId:newComId,////div :id=newComId
						data:{//props
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
							//最新的节点，跳过前面两个，加上当前的requestConponent最后一个索引
							let lastIndex=(this.requestConponent.length-1)+2
							let lastOne=area[lastIndex]
							//setChildHeight:function(height,index,rec=true,logicIndex=null)
							lastOne.style.top=this.setChildHeight(0,0,false)+"px"
							let tempIndex=[]
							this.logicIndex.forEach(item =>{
								tempIndex.push(item.xpath)
							})
							//请求重新加载此组件的logicIndexKey
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
						this.remoteEC.push(newComId)
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
						})
					}else{
						finishEC()
					}
				}
				//请求列出组件列表
				System.requestECList(this.provide)
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
			//:子组件请求删除
			removeChild:function(index){//接收子组件删除事件
			    //this.removeList.push(index)
			    //this.getExistEC()
			},
			//:设置高度
			setChildHeight:function(height,index,rec=true,logicIndex=null){
			    /*
								*@param {*} height是请求此事件的子组件的高度，index是该子组件的加载顺序,即callIndex
								*@param {*} rec为true时标明为修改/删除/新增时的调用，rec为false时为新增后为最新的子节点设定高度值
								*@param {*} rec:是否修改
								*@param {*} loginIndex:移动时传入新的logicIndex数据
							*/
			
			    if(rec && height!=-1)//表示为 新增、修改
			        this.childHeight[index]=height
			    if(height==-1 && logicIndex==null)//表明为删除，此时将被删除的高度设置为0
			        this.childHeight[index]=0
			
			    let parentChilds=this.$refs['ecMain'].childNodes
			    //修改或新增时，需要加上子组件的高度与所有子组件的高度
			    let allChildHeight=0
			    let domHeight=0
			    //rec为true时，为全部，为false时，除去最后即最新的一个
			    let dif=rec?0:1
			
			    //新增/删除/修改
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
			            allChildHeight+=this.childHeight[i]+20
			            domHeight+=this.childHeight[i]
			        }
			        if(rec && logicIndex==null){
			            this.$refs['ecMain'].style.height=domHeight+'px'
			            //加上自身高度
			            allChildHeight+=145
			            this.$refs['forOut'].style.height=domHeight+"px"
			            domHeight+=165
			            //再次调用当前函数，对排序过的进行重新更改高度
			            this.setChildHeight(-1,0,false,{indexs:this.logicIndex,from:0,to:0})
			            //继续向上递归
			            this.$emit("setChildHeight",allChildHeight,this.callIndex)
			        }else{
			            return allChildHeight
			        }
			    }else{//排序
			        let moveToTop=0
			            for(let i=0;i<this.logicIndex.length;i++){
			                parentChilds[this.logicIndex[i].index+2].style.top=moveToTop+"px"
			                moveToTop+=this.childHeight[this.logicIndex[i].index]+20
			            }
			    }
			},
			//:接受子组件提交的删除事件
			setChildRemove:function(removeEvent){
			    this.removeEvent.push(removeEvent)
			},
			//：右键控制
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
			//:关闭右键
			closeBar:function(){
			    setTimeout(()=>{
			        this.rightBarMenu.show=false
			    },200)
			},
			//:上移
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
			    }
			},
			//:下移
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
			    }
			},
			//跳转到指定位置
			gotoArea:function(index){
			    //跳到指定位置
			    let box=this.$refs['ecMain'].childNodes[index+2]
			    console.log("newLe",index,box,this.$refs['ecMain'].childNodes)
			    let targetTop=box.offsetTop
			    System.ecScrollToArea.call(this.callTarget,{
					top:targetTop,
					behavior:"smooth"
				},box,this.ecLogicName)
			},
			drop:function(index,backContent=""){
			    //由于阻止冒泡，故此处需要再次执行放置时的操作
			    //在此处触发，说明已经进入目标位置，无需再判断是否有enterDrag
			    let data=System.eventComponent_Out()//调用系统事件中由锚点抛出源赋值的输入事件获取输出值
			    if(Object.prototype.toString.call(data.value)=='[object String]'){
			        //this.showMen=false
			        //#锚点放置处理
			        this.mounted[index]=true
			        this.mountedData[index]=data.name
			        this.condition=this.mountedData[index]
			        this.setContentTarget=['condition']
			        this.setLogicContent()
			        //#锚点放置处理
			    }else{
			        alert("不接受此类型变量参数")
			    }
			
			},
		}
	}
</script>

<style scoped>
	.ifItem{
		position: relative;
		border-radius: 10px;
		height: 30px;
		cursor: pointer;
		width: 90%;
		margin-left: 5%;
		line-height: 30px;
		text-align: center;
		user-select: none;
		color: var(--mainColorBlue3);
		background-color: transparent;
		transition: .2s;
	}
	.ifItem:before{
		content: "";
		position: absolute;
		z-index: 1;
		left: 5%;
		width: 90%;
		height: 1px;
		bottom: -3px;
		background-color: var(--mainColorGray2);
	}
	.ifItem:hover{
		background-color: var(--mainColorGray3);
	}
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
		margin-top: 10px;
		margin-left: 10px;
		padding: 0;
		font-weight: normal;
		width: 60%;
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