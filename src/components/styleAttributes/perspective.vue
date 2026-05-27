<template>
	<div class="qucikEditOut" id="radiusEdit" style="position:relative;height:auto;min-height:60px" :style="{'height':`${40+effectList.length*35}px`}">
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;">透   视</pre>
		<!--展开-->
	    <div style="display: flex;width: 90%;margin-left: 5%;position: relative;position: relative;background-color:  var(--mainDarkBg1);clear: both;min-height: 10px;height: 25px;border-radius: 10px;margin-bottom: 8px;">
			<div class="effectType" style="width: 80%;height: 25px;border-radius: 10px 0 0 10px;line-height: 25px;text-align: center;color: var(--mainTextColor1);font-weight: normal;cursor: pointer;" @click="callBord($event,0,'')" >
			{{perspective=='none'?'none':perspective+'px'}}
			</div>
			<div style="width: 20%;height: 25px;cursor: pointer;border-radius: 0 10px 10px 0;" class="effectType" @click="setNone">
				<svg v-if="realValue.perspective=='none'" t="1662276997996" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4809" style="margin-top: 2px;" width="20" height="20"><path d="M913.857461 396.859633c11.758812-14.706957 9.360182-36.174897-5.329379-47.933709-14.72333-11.775184-36.142152-9.343809-47.967478 5.329379-1.232061 1.565658-128.745223 157.741627-348.561627 157.741627-218.583321 0-347.362312-156.226111-348.561627-157.741627-11.791557-14.673188-33.210379-17.121959-47.967478-5.329379-14.68956 11.758812-17.08819 33.226752-5.329379 47.933709 2.113127 2.642177 21.660322 26.325575 56.684 55.720046l-59.815317 72.892147 52.730968 43.270503 61.98268-75.5333c25.709545 16.709567 55.655578 33.143864 89.703021 47.205115l-34.332946 95.016027 64.156182 23.184025 34.82004-96.363721c31.357172 8.410554 65.380056 14.159488 101.81999 16.500812l0 103.795994 68.219731 0L546.108842 578.751287c37.151132-2.388397 71.749114-8.359388 103.614869-17.031908l35.190477 96.261391 64.055898-23.433712-34.653241-94.792946c32.302707-13.469779 60.725036-29.102828 85.466534-45.005007l61.610196 76.041884 52.997028-42.954301-59.442834-73.369008C891.431705 424.184979 911.699308 399.558092 913.857461 396.859633z" p-id="4810" fill="#e6e6e6"></path></svg>
				<svg v-else t="1662277057894" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5788" style="margin-top: 2px;" width="20" height="20"><path d="M512 851.7c-155.4 0-287-125.4-351.6-200.2-35.1-40.6-35.1-101.9 0-142.5 12.3-14.2 25.2-28.2 38.5-41.6l3.8-3.8-61.5-75.7c-11.3-13.9-9.1-34.3 4.7-45.6 5.8-4.7 12.9-7.2 20.4-7.2 9.8 0 19 4.4 25.2 12l59.1 72.7 4.7-3.8c24-19.7 48.5-37 72.8-51.4l5-3-49-86.8c-8.8-15.6-3.2-35.4 12.3-44.1 4.9-2.7 10.4-4.2 15.9-4.2 11.7 0 22.5 6.3 28.3 16.5l50.9 90.2 4.8-1.8c26.2-10 52.5-16.7 78.1-20l5.2-0.7v-106c0-17.9 14.5-32.4 32.4-32.4s32.4 14.5 32.4 32.4v105.8l5.2 0.7c25.7 3.3 52 10 78.1 20l4.8 1.8 50.9-90.2c5.7-10.2 16.6-16.5 28.3-16.5 5.5 0 11 1.4 15.9 4.2 15.6 8.8 21.1 28.6 12.3 44.1l-49 86.8 5 3c24.3 14.4 48.8 31.7 72.8 51.4l4.7 3.8 59-72.7c6.2-7.6 15.3-12 25.2-12 7.4 0 14.7 2.6 20.4 7.2 13.9 11.3 16 31.7 4.7 45.6l-61.5 75.7 3.8 3.8c13.2 13.4 26.2 27.4 38.5 41.6l0.8 0.9c34.3 40.6 34 101.3-0.8 141.6-64.5 75-196 200.4-351.5 200.4z m0-478.1c-37.8 0-77.3 9.6-117.5 28.5l-0.2 0.1-0.9 0.5c-1.3 0.7-2.8 1.4-4.3 2l-0.3 0.1-0.2 0.1c-39.2 19.3-79 47.4-118.3 83.6l-0.1 0.1-0.1 0.1c-1 1-1.9 1.9-2.9 2.7l-0.2 0.1-0.1 0.1c-19.7 18.3-39 38.4-57.4 59.7-14.2 16.5-14.2 41.3 0 57.8 57.4 66.4 172.9 177.8 302.5 177.8s245.2-111.4 302.5-177.8c14.2-16.5 14.2-41.3 0-57.8-18.3-21.2-37.5-41.2-57.2-59.5l-0.2-0.2-0.3-0.2c-1-0.9-2-1.8-3-2.8l-0.1-0.1-0.2-0.1c-39.3-36-79-64.1-118.1-83.3l-0.3-0.1-0.3-0.1c-1.5-0.6-3.1-1.3-4.5-2.1l-0.9-0.5-0.3-0.1c-39.8-19.1-79.3-28.6-117.1-28.6z" fill="#e6e6e6" p-id="5789"></path><path d="M512 715.4c-71.9 0-130.4-58.5-130.4-130.4S440.1 454.6 512 454.6 642.4 513.1 642.4 585 583.9 715.4 512 715.4z m0-194.6c-35.4 0-64.2 28.8-64.2 64.2 0 35.4 28.8 64.2 64.2 64.2 35.4 0 64.2-28.8 64.2-64.2 0-35.4-28.8-64.2-64.2-64.2z" fill="#e6e6e6" p-id="5790"></path></svg>
			</div>
	    </div>
		<div style="border-bottom: 1px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;"></div>
		<!--阴影编辑-->
		<teleport to="body" v-if="showBord">
			<!--positionx,positiony,perspective-->
			<div @mousemove.stop=""  @mouseup.stop="mouseUp" draggable="false" style="position: absolute;right: 260px;width:300px;background-color: var(--mainDarkBg2);z-index: 99999;border-radius: 10px;height: 245px;" :style="{top:`${top}px`}">
				<div @mousemove.stop="mouseMove" style="position: absolute;left: 0;top: 0;width: 200%;height: 100%;z-index: 2;background-color: transparent;cursor: e-resize;" v-if="mouseAction.down">
				</div>
				<div style="height: 35px;width: 100%;background-color: transparent;border-bottom: 2px solid var(--mainColorGrayBg);" >
					<!--标题-->
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 80px;margin-left: 10px;line-height: 35px;color: var(--mainTextColor1);"></h3>
					<!--关闭按钮-->
					<div style="float: right;width: 30px;height: 30px;position: relative;cursor: pointer;" @click="close">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#e6e6e6" p-id="18203"></path></svg>
					</div>
				</div>
				<div style="width: 100%;height: calc(100% - 50px);display: flex;">
					<!--透视展示框-->
					<div style="width: 70%;height: 100%;">
						<div id="output" class="output large">
						    <section id="default-example" class="default-example" >
						        <div id="example-element" class="transition-all" :style="{perspective:`${perspective}px`,perspectiveOrigin:`${perspectiveOrigin}`}">
						            <div class="face front">1</div>
						            <div class="face back">2</div>
						            <div class="face right">3</div>
						            <div class="face left">4</div>
						            <div class="face top">5</div>
						            <div class="face bottom">6</div>
						        </div>
						    </section>
						</div>
					</div>
					<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;width: 150px;margin-left: 8px;">
						<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 80px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">焦点位置</h3>
						<div style="display:flex;width:90%;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							
							<input @input="inputValue" @blur="blurFocus" v-model="realValue.perspectiveOriginX" @focus="processFocusIndex(0)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'perspectiveOriginX')">%</button>
						</div>
						<div style="display:flex;width:90%;margin-top: 10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							
							<input @input="inputValue"  @blur="blurFocus"  v-model="realValue.perspectiveOriginY" @focus="processFocusIndex(1)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'perspectiveOriginY')">%</button>
						</div>
						<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 80px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">透视距离</h3>
						<div style="display:flex;width:90%;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @input="inputValue" @blur="blurFocus" v-model="realValue.perspective"  @focus="processFocusIndex(2)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'perspective')">px</button>
						</div>
					</div>
				</div>
				
			</div>
		</teleport>
	</div>
</template>

<script>
	export default{
		name:"perspective",
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
						"外阴影","内阴影","滤镜","背景滤镜"
					],
					nowEditIndex:-1,//当前编辑索引
					top:0,
					showBord:false,


					focusIndex:-1,
					focusTimeout:null,

					mouseAction:{
						down:false,
						startX:0,
						target:"X",
						deltaX:0,
						pre:0
					},
					alpha:"",
					filterPercent:10,
					scrollBarLeft:0,
					scrollBarWidth:0,

					realValue:{
						perspective:"",
						perspectiveOriginX:"",
						perspectiveOriginY:"",
					},
					
					perspective:"none",
					perspectiveOrigin:"50% 50%"
				}
			}catch(e){
				console.error("变量定义错误",e)
			}
			
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					if(Object.prototype.toString.call(val)=='[object Object]'){
						if(this.remountedTimeout!=null)
							clearTimeout(this.remountedTimeout)
						this.remountedTimeout=setTimeout(()=>{
							this.childrenData_edit=JSON.parse(JSON.stringify(val))
							try{
								this.realValue={
									perspective:this.childrenData_edit.children.perspective.value || 'none',
									perspectiveOriginX:this.childrenData_edit.children.perspectiveOriginX.value || 50,
									perspectiveOriginY:this.childrenData_edit.children.perspectiveOriginY.value || 50
								}
							}catch(e){
								this.realValue={
									perspective:'none',
									perspectiveOriginX:50,
									perspectiveOriginY:50
								}
							}
							this.perspectiveOrigin=`${this.realValue.perspectiveOriginX}% ${this.realValue.perspectiveOriginY}%`
							this.perspective=this.realValue.perspective
							this.remountedTimeout=null
							
						},200)
						this.setted=false
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
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.inputValue(false,false)
					this.$emit("preProcess",'perspective',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'perspective',callBack)
			},
			set:function(e){
			   	this.$emit("set","perspective",this.childrenData_edit,function(a,b){return true},this.setted)
				this.setted=false
			},

			inputValue:function(onlySet=false,emit=true){
				if(this.setDataValueTime!=null)
					clearTimeout(this.setDataValueTime)
				this.perspectiveOrigin=`${this.realValue.perspectiveOriginX}% ${this.realValue.perspectiveOriginY}%`
				this.perspective=this.realValue.perspective
				this.setDataValueTime=setTimeout(()=>{
					this.childrenData_edit.children['perspective'].value=this.realValue.perspective
					this.childrenData_edit.children['perspectiveOriginX'].value=this.realValue.perspectiveOriginX
					this.childrenData_edit.children['perspectiveOriginY'].value=this.realValue.perspectiveOriginY
					if(emit){
					this.setted=true
					this.set()
					}
					this.setDataValueTime=null
				},200)
			},
			setEffectType:function(index){
				//this.setted=true
				if(index.index>1){
					
					
					this.effectList[this.nowEditIndex].data={
						filterType:"blur",
						value:5
					}
				}else{
					this.effectList[this.nowEditIndex].data={
						X:"0",
						Y:"0",
						B:"4",
						S:"0",
						color:"#ffffff",
						alpha:"30%",
						code:false
					}
				}
				
				this.effectList[this.nowEditIndex].type=this.effectTypeList[index.index]
				this.setted=true
				this.inputValue(true)
			},
			callBord:function(e,){
				if(this.realValue.perspective!='none'){
					this.top=e.clientY
					let touchBottom=false
					if(screen.height-this.top<350){
						touchBottom=true
						this.top=screen.height-400
					}
					this.showBord=true
				}else{
					System.showToast("未开启透视,请点击右侧按钮开启",3000)
				}
				
			},
			blurFocus:function(){
				this.focusTimeout=setTimeout(()=>{
					this.focusIndex=-1
				})
			},
			processFocusIndex:function(index){
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
				this.mouseAction.pre=this.realValue[target]*1
				this.mouseAction.down=true
			},
			mouseMove:function(e){
				if(this.mouseAction.down){
					
					this.mouseAction.deltaX=e.clientX-this.mouseAction.startX
					this.realValue[this.mouseAction.target]=this.mouseAction.pre+this.mouseAction.deltaX
					if(this.setDataValueTime!=null)
						clearTimeout(this.setDataValueTime)
					this.setDataValueTime=setTimeout(()=>{
						this.setted=true
						this.inputValue()
					},50)
				}
			},
			mouseUp:function(e){
				this.mouseAction.down=false
				this.deltaX=0
			},
			setNone:function(){
				if(this.realValue.perspective!='none'){
					this.realValue.perspective='none'
				}else{
					this.realValue.perspective=300
				}
				this.setted=true
				this.inputValue()
			}
		}
	}
</script>

<style scoped>
	@import url(./css/perspective.css);
</style>