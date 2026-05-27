<template>
	<div class="qucikEditOut" id="radiusEdit" style="position:relative;height:auto;min-height:35px" :style="{'height':`${40+effectList.length*35}px`}">
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;">动画过渡</pre>
	    <div style="position:relative;float:right;width:60px;height:30px;background-color:transparent;border-radius:10px;display: flex;">
	       <div style="cursor: pointer;">
			   <svg t="1661847751903" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7163" style="margin-top: 3px;" width="25" height="25"><path d="M463.71 363.07l78.34 59.63c49.32-64.97 141.96-77.66 206.93-28.34s77.66 141.96 28.34 206.93c-49.32 64.97-141.96 77.66-206.93 28.34a147.455 147.455 0 0 1-19.11-17.34l-72.24 66.88a245.432 245.432 0 0 0 180.65 78.95c135.93 0 246.13-110.2 246.13-246.13s-110.2-246.13-246.13-246.13c-76.95-0.06-149.48 35.92-195.98 97.21z" fill="#8a8a8a" opacity=".3" p-id="7164"></path><path d="M364.32 758.13c-135.93 0-246.13-110.2-246.13-246.13s110.2-246.13 246.13-246.13S610.45 376.07 610.45 512 500.26 758.13 364.32 758.13z" fill="#8a8a8a" p-id="7165"></path></svg>
	       </div>
		   <div style="cursor: pointer;" @click="addEffect">
			   <svg t="1661847589632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" style="margin-top: 3px;" width="25" height="25"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#8a8a8a" p-id="2393"></path></svg>
		   </div>
	    </div>
		<!--展开-->
	    <div style="width: 90%;margin-left: 5%;position: relative;position: relative;clear: both;min-height: 10px;border-bottom: 1px solid var(--mainColorGrayBg2);padding-bottom: 8px;">
	        <div v-for="(item,index) in effectList" :key="index" class="effectItem">
				<div style="width: 80%;;height: 30px;display: flex;background-color: var(--mainDarkBg1);border-radius: 10px;overflow: hidden;" @click="callBord($event,index,item.type)">
					<div class="effectType" @click="">
						{{item.data.property || "不限"}}
					</div>
					<button class="openBordButton"  style="cursor: pointer;color: var(--mainTextColor1);overflow: hidden;text-overflow: ellipsis;">
						{{item.data.duration+'s'}}
					</button>
				</div>
				<div class="removeEffect" @click="removeEffect(index)">
					<svg t="1661864077717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3301" width="20" height="30"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#8a8a8a" p-id="3302"></path></svg>
				</div>
			</div>
			
	    </div>
		
		<!--阴影编辑-->
		<teleport to="body" v-if="showBord">
			<div @mousemove.stop=""  @mouseup.stop="" draggable="false" style="overflow: hidden;position: absolute;right: 260px;width:300px;background-color: var(--mainDarkBg2);z-index: 99999;border-radius: 10px;height: 200px;" :style="{top:`${top}px`}">
				<div style="height: 35px;width: 100%;background-color: transparent;border-bottom: 2px solid var(--mainColorGrayBg);" >
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 80px;margin-left: 10px;line-height: 35px;color: var(--mainTextColor1);">动画过渡</h3>
					
					<div style="float: right;width: 30px;height: 30px;position: relative;cursor: pointer;" @click="close">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#e6e6e6" p-id="18203"></path></svg>
					</div>

				</div>
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 40px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">时长</h3>
					<div style="display:flex;width:calc(45% - 50px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<input @input="inputValue" v-model="effectList[nowEditIndex].data.duration" @blur="blurFocus" @focus="processFocusIndex(0)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'duration')">S</button>
					</div>
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 40px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">延时</h3>
					<div style="display:flex;width:calc(45% - 50px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						
						
						<input @input="inputValue" v-model="effectList[nowEditIndex].data.delay" @blur="blurFocus" @focus="processFocusIndex(1)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'delay')">S</button>
					</div>
				</div>
				<!--阴影效果-->
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 40px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">曲线</h3>
					<div ref="cubic" @blur="blurFocus" style="display:flex;width:calc(90% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==2?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button @click="callTimingEdit" v-if="!commonTiming" class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px;cursor: pointer;" @mousedown.stop="startDown($event,'B')">
							<svg t="1662127111560" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3528" style="margin-top: 5px;" width="20" height="20"><path d="M363.712 288H224v32H128V224h96v32h224V224h96v32h224V224h96v96h-96V288h-107.168c135.2 63.328 213.12 224.352 233.824 480H928v96h-96v-96h30.56C837.44 463.296 731.296 306.208 544 290.624V320h-96v-25.088C280.928 325.408 185.6 481.408 162.016 768H192v96H96v-96h33.92c20.672-255.648 98.624-416.672 233.792-480z" p-id="3529" fill="#e6e6e6"></path></svg>							
						</button>
						<div @click="callSelectEffectType($event)"   @mousedown.stop="processFocusIndex(2)" :style="{width:`${commonTiming?'100%':'80%'}`}" style="cursor: pointer;;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1);font-weight: normal;font-size: 14px;line-height: 35px;white-space: nowrap;overflow:hidden;text-overflow: ellipsis;">{{effectList[nowEditIndex].data.timing}}</div>
					</div>
				</div>
				<selectListT @change="setEffectType" ref="selectListType" v-if="showSelectType" :list="effectTypeList" @close="showSelectType=false" :selected="selected"  style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
				<!--颜色(CSS变量)-->
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex" >
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 40px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">对象</h3>
					<div style="display:flex;width:calc(90% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==4?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<input placeholder="不限" @input="inputValue" @blur="blurFocus" @focus="processFocusIndex(4)" style="width:100%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)" v-model="effectList[nowEditIndex].data.property"/>
					</div>
				</div>
				
			</div>
		</teleport>
		<!--时间曲线-->
		<teleport to="body"  v-if="showTiming">
			<div  style="position: absolute;z-index: 99999;;background-color: transparent;height: 100px;width: 100px;;" :style="{top:`${timingBord.top}px`,left:`${timingBord.left}px`}">
				<cubicBezier style="margin-top: -80px;" :preBezier="preBezier" @quit="showTiming=false" @returnTiming="getTiming"></cubicBezier>
			</div>
			
		</teleport>
	</div>
</template>

<script>
	/*
		transition:property name | duration | timing function | delay
	*/
   import { structStore } from "../../store/struct.js";
   import colorBord from "../microTools/color.vue"
   import selectListT from "../microTools/select2.vue"
   import verticalCheckBox from "../microTools/verticalCheckBox.vue"
   import cubicBezier from "../microTools/cubicBezier.vue"
   export default{
   	name:"float",
   	props:{
   	    dataValue:{
   	        default:""
   	    },
   		isGroup:{
   			type:Boolean,
   			default:false
   		}
   	},
   	components:{
   		selectListT,
   		colorBord,
   		verticalCheckBox,
		cubicBezier
   	},
   	data(){
   		try{
   			return{
   				setData:"",
   				enterValue:"",//传入的参数
   				targetDom:null,//要被修改的dom对象
   				realDataContion:null,
   				isSameValue:true,
   				setStyleTimeout:null,
   				spreadEdit:false,//是否展开
   				height:65,
   				spreadRotate:0,
   				spreadChange:false,
   				store:null,
   				bindName:null,//请求变量绑定的组件名称
   				thisUnit:"px",
   				realData:this.dataValue,//原数据对象,
   				height:"35px",
   				childrenData:{       
   				       "boxShadow":{value:0,unit:"",condition:null},
   				       "filter":{value:0,unit:"",condition:null},
   				       "backdropFilter":{value:0,unit:"",condition:null},
   				},
   				childrenData_group:{
   						"boxShadow":{value:0,unit:"",condition:null},
   				       "filter":{value:0,unit:"",condition:null},
   				       "backdropFilter":{value:0,unit:"",condition:null},  
   				},
   				childrenData_edit:{},//实际操作数据
   				setted:false,
   				setDataValueTime:null,
   				setTarget:0,//0realData,1各个值
   				
   				effectList:[],
   				effectTypeList:[
   					"缓动(ease)",'淡入(ease-in)','淡出(ease-out)','淡入淡出(ease-in-out)','自定义'
   				],
   				nowEditIndex:-1,//当前编辑索引
   				showSelectType:false,
   				top:0,
   				showBord:false,
   				shadowColor:"#000",
   				shadowData:{
   					X:"",
   					Y:"",
   					B:"",
   					S:""
   				},
   				focusIndex:-1,
   				focusTimeout:null,
   				showColorBord:false,
   				mouseAction:{
   					down:false,
   					startX:0,
   					target:"X",
   					deltaX:0,
   					pre:0
   				},
   				alpha:"",
   				filterList:{
   					"缓动":"blur",//px
   					"亮度":"brightness",//percent
   					'对比':'contrast',//percent
   					"轮廓阴影":'drop-shadow',
   					'灰度':"grayscale",//percent
   				},
   				filterPercent:10,
   				scrollBarLeft:0,
   				scrollBarWidth:0,
   				filterTypeIndex:"",//滤镜类型中文，用于在首次加载时类型显示
   				showFilterSelect:false,
				showTiming:false,
				timingBord:{
					left:0,
					top:0
				}
   			}
   		}catch(e){
   			console.error("变量定义错误",e)
   		}
   		
   	},
   	computed:{
   	    VARLIST(){
   	        this.store=structStore()
   	        return this.store.VARLIST
   	    },
		commonTiming(){
			return ['ease','ease-in','ease-out','ease-in-out'].includes(this.effectList[this.nowEditIndex].data.timing)
		},
		selected(){
			let index
			if(this.effectList[this.nowEditIndex].data.timing.startsWith("cubic")){
				index='自定义'
			}else{
				index=['ease','ease-in','ease-out','ease-in-out'].indexOf(this.effectList[this.nowEditIndex].data.timing)
				index=this.effectTypeList[index]
			}
			return index
		},
		preBezier(){
			let pre=this.effectList[this.nowEditIndex].data.timing
			pre=pre.split("cubic-bezier(")[1]
			pre='#'+pre.slice(0,pre.length-1)
			return pre
		}
   	},
   	watch:{
   	    dataValue:{
   	        handler:function(val){
   				this.setted=false
				this.showBord=false
   				this.effectList=[]
   				if(Object.prototype.toString.call(val)=='[object Object]'){
   					this.childrenData_edit=JSON.parse(JSON.stringify(val))
   					let transition=this.childrenData_edit.children.transition
					if(Object.prototype.toString.call(transition)=='[object Array]'){
						for(let i=0;i<transition.length;i++){
							this.effectList.push(transition[i])
						}
					}else{
						this.effectList=[]
					}
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
				this.inputValue(false,false)
				this.$emit("preProcess",'transition',this.childrenData_edit)
			}
			this.$emit("emitPreFun",'transition',callBack)
		},
   		set:function(e){
   		   	this.$emit("set","transition",this.childrenData_edit,function(a,b){return true},this.setted)
   			this.setted=false
   		},
   		addEffect:function(){
   			this.nowEditIndex=this.effectList.length
   			this.effectList.push({
   				data:{
   					property:"",
   					duration:".2",
   					timing:"ease-in",
   					delay:"0",
   				},
   				type:""
   			})
   			this.childrenData_edit.children.transition.push({
   				data:{
   					property:"",
   					duration:".2",
   					timing:"ease-in",
   					delay:"0",
   				},
   				type:""
   			})
   			document.getElementById("loadList").scrollTop+=35
   			this.setted=true
   			this.inputValue()
   		},
   		callSelectEffectType:function(e,index){
   			this.showSelectType=true
   			this.$nextTick(()=>{
   				this.$refs['selectListType'].setSpread(e)
   			})
   		},
   		removeEffect:function(index){
   			this.effectList.splice(index,1)
   			this.inputValue(true)
   		},
   		inputValue:function(onlySet=false,emit=true){
   			if(this.setDataValueTime!=null)
   				clearTimeout(this.setDataValueTime)
   			
   			this.setDataValueTime=setTimeout(()=>{
   				let shadow=[],filter=[],badkrop=[],transition=[]
   				let i=this.nowEditIndex
   				for(i=0;i<this.effectList.length;i++){
					transition.push(this.effectList[i])
   				}
   				this.childrenData_edit.children.transition=transition
				if(emit){
   				this.setted=true
   				this.set()
				}
   				this.setDataValueTime=null
   			},200)
   		},
   		callBord:function(e,index,type){
   			
   			this.nowEditIndex=index
   			this.top=e.clientY
   			let touchBottom=false
   			if(screen.height-this.top<350){
   				touchBottom=true
   				this.top=screen.height-400
   			}
   			this.showBord=true
   		},
   		blurFocus:function(){
   			this.focusTimeout=setTimeout(()=>{
   				this.focusIndex=-1
   			})
   		},
   		processFocusIndex:function(index){
			if(index==2) this.$refs['cubic'].focus()
   			if(this.focusTimeout!=null)
   				clearTimeout(this.focusTimeout)
   			this.focusIndex=index
   		},
   		close:function(){
   			this.showBord=false
   		},

   		startDown:function(e,target){
   			
   			this.mouseAction.startX=e.clientX
   			this.mouseAction.target=target
   			this.mouseAction.down=true
   		},
   		callFilterSelect:function(e){
   			this.showFilterSelect=true
   			this.$nextTick(()=>{
   				if(screen.height-e.clientY<400){
   					this.$refs['selectFilterType'].setSpread({clientX:e.clientX,clientY:screen.height-450})
   				}else{
   					this.$refs['selectFilterType'].setSpread(e)
   				}
   			})
   		},
		setEffectType:function(index){
			//this.setted=true
			this.effectList[this.nowEditIndex].data.timing=['ease','ease-in','ease-out','ease-in-out','cubic-bezier(.42,0,.58,1)'][index.index]
			this.setted=true
			this.set()
			/*
			this.setted=true
			this.inputValue(true)*/
		},
		callTimingEdit:function(e){
			this.timingBord.left=e.clientX-80
			this.timingBord.top=e.clientY-180
			this.showTiming=true
		},
		getTiming:function(timing){
			this.effectList[this.nowEditIndex].data.timing=timing
			this.showTiming=false
			this.setted=true
			this.set()
		}
   	}
   }
</script>

<style>
	@import url(./css/transition.css);
</style>