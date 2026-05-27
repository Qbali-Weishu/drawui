<template>
	<div id="floatEdit" style="margin-top: 0px;">
		<pre style="color: var(--mainTextColor1);line-height: 35px;margin-right: 0;">定位方式</pre>
		<!--
		-->
		<div style="float: left;width: 60%;margin-left: 0%;position: relative;position: relative;min-height: 30px;;padding-bottom: 0px;margin-top: 0px;">
			<div @click="callFloatSelect" class="filterTypeButton" style="float: right;width: 100px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 10px;margin-top: 5px;margin-right: -24px;">
				<h3 style="width: calc(100% - 30px);text-align: center;margin: 0;padding: 0;float: left;color: var(--mainTextColor1);font-weight: normal;font-size: 12px;margin-top: 3px;margin-left: 3px;">
				{{data.children.position}}</h3>
				
				<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="float: left;margin-top: 8px;margin-left: 0px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
				
			</div>
		</div>

		<div style="clear: both;"></div>
		<div style="border-bottom: 1px solid var(--mainColorGrayBg2);width: 80%;margin-left: 5%;height: 1px;background-color: transparent;position: relative;margin-top: 10px;"></div>
		
		<selectListT @change="setFloatType" ref="selectFloatType" v-if="showFloatSelect" :list="postionOptions" @close="showFloatSelect=false" :selected="data.children.position"  style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
	</div>	
</template>

<script>
	import { structStore } from "../../store/struct.js";
	import selectListT from "../microTools/select2.vue"
	export default{
		name:"position",
		components:{
			selectListT
		},
		props:{
		    dataValue:{
		        default:""
		    },
			isGroup:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				data:JSON.parse(JSON.stringify(System.stylePropertype.position)),
				setData:"",
				enterValue:"",//传入的参数
				targetDom:null,//要被修改的dom对象
				realData:this.dataValue.value !='' ? this.dataValue.value :'none',//原数据对象
				realDataContion:null,
				isSameValue:true,
				setStyleTimeout:null,
				spreadEdit:false,//是否展开
				height:"35px",
				spreadRotate:0,
				spreadChange:false,
				store:null,
				bindName:null,//请求变量绑定的组件名称
				setted:false,
				positonList:['static','relative','absolute','fixed','sticky'],
				postionText:['默认','相对定位','绝对定位','视口固定','粘性定位'],
				showFloatSelect:false,
				
			}
		},
		computed:{
		    VARLIST(){
		        this.store=structStore()
		        return this.store.VARLIST
		    },
			postionOptions(){
				let a=[]
				for(let i=0;i<5;i++){
					a.push(this.postionText[i]+" "+this.positonList[i])
				}
				return a
			}
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					this.setted=false
					if(val.value=="")
						val.value='static'
					if(Object.prototype.toString.call(val)=='[object Object]'){
						this.data=JSON.parse(JSON.stringify(val))
						if(!this.data.children.position){
							this.data.children.position='static'
						}
						//this.realData=val.value
						//this.realDataContion=val.condition
					}
		        },
		        immediate:true,
		        deep:true
		    },
		    realData:{
		        handler:function(val){
					/*console.log("float",this.realData,this.dataValue.value,this.dataValue.value!='')
		            if(this.setStyleTimeout!=null){
		                clearTimeout(this.setStyleTimeout)
		            }
		            this.setStyleTimeout=setTimeout(()=>{
		                this.set()
		            },200)*/
		            
		        },
		        immediate:true,
		        deep:true
		    },
		    VARLIST:{
		        handler:function(val){
		            if(this.store!=null){
		                //仅当在选择需要绑定的属性名称时才会处理  (this.isSameValue && this.realDataContion!=null)
		                if(this.bindName!=null){//说明原先已经统一绑定变量 调出变量界面一定会经过设置bindName的操作，故可根据bindName确定变量绑定对象
		                    let bind=this.bindName 
							this.setted=true
		                    if(bind!=null && bind.startsWith("$")){
		                        bind=bind.replace("$","")
		                    }
		                    if(this.realDataContion!=null)//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
		                        this.realData=this.store.VARLIST[this.realDataContion.replace("$","")].value  
							this.set()
		                }
		        }
		        },
		        immediate:true,
		        deep:true
		    }
		},
		mounted(){
			this.emitProcess()
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.$emit("preProcess",'position',this.realData)
				}
				this.$emit("emitPreFun",'position',callBack)
			},
			chose:function(e){
				this.setted=true
				this.realData=e.target.dataset.float
				this.set()
			},
			set:function(e){
			    this.$emit("set","position",this.data,()=>{
					return true
				},this.setted)
				this.setted=false
			},
			requestVar:function(styleName){//请求绑定变量
			    //let attributeName=e.target.dataset.attribute
			    if(this.realDataContion!=null){
			        this.bindName="$"+styleName
			    }else{
			        this.bindName=styleName
			    }
			    let attributeName=this.bindName
			    //this.bindName=styleName//赋值绑定对象
			    try{
			        this.$emit("requestVar",{
			        component:"float",//请求组件名
			        attribute:attributeName,//请求属性值,$开头表示已经绑定，此时通知父组件显示取消绑定按钮
			        })
			    }catch(e){
			    }
			},
			bindVar:function(attribute,varName,varValue){//绑定变量
			    //this.bindName="$"+this.bindName
				this.setted=true
			    if(attribute=="float"){
			        this.realDataContion="$"+varName
			        this.realData=this.store.VARLIST[varName].value
			    }else{
			        this.childrenData_edit[attribute].condition="$"+varName
			        this.childrenData_edit[attribute].value=this.store.VARLIST[varName].value
			    }
				this.set()
			},
			removeBind:function(attribute){//移除变量绑定
				this.setted=true
				if(attribute.startsWith("$")){
						attribute=attribute.replace("$","")
				}
				this.bindName=null
				this.realDataContion=null
				this.realData=100
				this.set()
			},
			setFloatType:function(index){
				let prePosition=this.positonList.indexOf(this.data.children.position)
				if(index.index==prePosition) return
				let relativeNodePosition={}
				let transType=-1
				let box
				let nextRelativeElement
				let resetPosition=false,resetList={}
				let screen=document.getElementById("projectFrameInner").getBoundingClientRect()
				if(index.index>1){
					resetPosition=true
					const marginData={
						value:"",
						unit:"",
						condition:{
							bindList:null,
							default:""
						},
					}
					//清除margin,并赋值left top
					let left,top,bottom,right
					let rect
					const margin=new RegExp(`margin([^:])+(:{1})([^;])+;{1}`)
					let firstId
					let bound
					let parentId,parentRect
					for(let id in System.operatingNodes){
						if(System.metaData.STYLESTRUCT[id].style['margin']){
							System.metaData.STYLESTRUCT[id].style['margin']=JSON.parse(JSON.stringify(System.stylePropertype.margin))
						}
						
						firstId=id
						box=document.getElementById(id.replace('$NODE:',""))
						parentId=System.getParentId(id)
						if(parentId===null) parentId=System.rootId
						parentRect=document.getElementById(parentId.replace('$NODE:',"")).getBoundingClientRect()
						nextRelativeElement=System.getNextRelativeElment(box)
						bound=box.getBoundingClientRect()
						if(nextRelativeElement){
							transType=0
							relativeNodePosition[nextRelativeElement.id]=JSON.parse(JSON.stringify(nextRelativeElement.getBoundingClientRect())) 
						}
						//记录原先位置
						left=((bound.left-parentRect.left)/System.scalePercent).toFixed(0)
						top=((bound.top-parentRect.top)/System.scalePercent).toFixed(0)
						resetList[id]={
							left:left,
							top:top
						}
						System.metaData.STYLESTRUCT[id].style['top']={
							value:"",
							children:{
								value:top*1,
								unit:"px"
							},
							group:false,
							condition:{
								bindList:null,
								default:""
							}
						}
						System.metaData.STYLESTRUCT[id].style['left']={
							value:"",
							children:{
								value:left*1,
								unit:"px"
							},
							group:false,
							condition:{
								bindList:null,
								default:""
							}
						}
						
						
						//写入数据
						System.metaData.STYLESTRUCT[id].style['absolueOrigin']={
							x:'left',
							y:"top"
						}
						System.metaData.STYLESTRUCT[id].style['left']={
																		value:"",
																		children:{
																			value:left,
																			unit:"px"
																		},
																		group:false,
																		condition:{
																			bindList:null,
																			default:""
																		}
																	}
						System.metaData.STYLESTRUCT[id].style['top']={
																		value:"",
																		children:{
																			value:top,
																			unit:"px"
																		},
																		group:false,
																		condition:{
																			bindList:null,
																			default:""
																		}
																	}
						//若此节点是从非绝对定位转向绝对定位，修改下一个非绝对定位的节点
					}
				}else{
					transType=1
					//记录当前节点位置，不需要记录其他节点
					const absoluteData={
						value:"",
						children:{
							value:"",
							unit:""
						},
						group:false,
						condition:{
							bindList:null,
							default:""
						}
					}
					for(let id in System.operatingNodes){
						box=document.getElementById(id.replace('$NODE:',""))
						nextRelativeElement=System.getNextRelativeElment(box)
						if(nextRelativeElement)relativeNodePosition[nextRelativeElement.id]=JSON.parse(JSON.stringify(nextRelativeElement.getBoundingClientRect()))
						relativeNodePosition[id]=JSON.parse(JSON.stringify(box.getBoundingClientRect()))
						System.writeToClass(id,'left',"")
						System.writeToClass(id,'right',"")
						System.writeToClass(id,'top',"")
						System.writeToClass(id,'bottom',"")
						delete System.metaData.STYLESTRUCT[id].style['left']
						delete System.metaData.STYLESTRUCT[id].style['top']
						delete System.metaData.STYLESTRUCT[id].style['right']
						delete System.metaData.STYLESTRUCT[id].style['bottom']
					}
				}
				this.data.children.position=this.positonList[index.index]
				this.setted=true
				this.set()
				//设置完成后，移动所有相邻节点
				let distanceX,distanceY,temp
				for(let nodeId in relativeNodePosition){
					if(!['absolute','fixed','sticky'].includes(window.getComputedStyle(document.getElementById(nodeId.replace('$NODE:',""))).position)){
						temp={}
						temp[nodeId]=true
						distanceX=(relativeNodePosition[nodeId].left-document.getElementById(nodeId.replace('$NODE:',"")).getBoundingClientRect().left)/System.scalePercent	
						distanceY=(relativeNodePosition[nodeId].top-document.getElementById(nodeId.replace('$NODE:',"")).getBoundingClientRect().top)/System.scalePercent					
						System.moveNodes(null,temp,distanceX,distanceY)
					}
				}
				let nums=0,fKey=""
				for(let nodeId in resetList){
					nums++
					fKey=nodeId
					System.writeToClass(nodeId,'left',resetList[nodeId].left+"px")
					System.writeToClass(nodeId,'top',resetList[nodeId].top+"px")
					try{
						System.requestProcessStyle('margin',nodeId,System.metaData.STYLESTRUCT[nodeId].style['margin'])
					}catch{}
				}
				//若只有一个则更新样式
				if(nums==1) 
				{
					System.reloadData('left',System.metaData.STYLESTRUCT[fKey].style['left'])
					System.reloadData('top',System.metaData.STYLESTRUCT[fKey].style['top'])
					System.reloadData('margin',System.metaData.STYLESTRUCT[fKey].style['margin'])
				}
			},
			callFloatSelect:function(e){
				this.showFloatSelect=true
				this.$nextTick(()=>{
					this.$refs['selectFloatType'].setSpread(e)
				})
			}
		}
	}
</script>

<style scoped>
	@import url(./css/position.css);
	pre{
	    font-weight:normal;
	    padding:0;
	    margin:0;
	    font-family: 'Sail';
	    font-style: normal;
	    height: 30px;
	    float: left;
	    margin-left: 0px;
	    text-align: left;
	    color: var(--mainColorGray8A);
	    line-height: 30px;
	}
</style>
