<template>
	<div class="qucikEditOut" @mouseup.stop="mouseUp" @mouseleave="mouseUp" id="radiusEdit" style="position:relative;height:auto;min-height:35px;" >
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;float: left;line-height: 45px;">位       置</pre>
		<!--拖动记录-->
		<div @mousemove.stop="mouseMove" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: 2;background-color: transparent;cursor: e-resize;" v-if="mouseAction.down">
		</div>
		<!--展开-->
	    <div style="float: right;width: 60%;position: relative;position: relative;height: 30px;;padding-bottom: 5px;margin-top: 5px;">
			<div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="!editMore" @click="setEditMore">
				<svg t="1662195973771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27253" style="margin-top: 10px;" width="15" height="15"><path d="M0.042667 749.792759v164.515811A110.075414 110.075414 0 0 0 109.691431 1023.957335h164.515812a54.867047 54.867047 0 1 0 0-109.648765H109.691431V749.792759a54.867047 54.867047 0 1 0-109.648764 0zM329.07429 54.867047A54.867047 54.867047 0 0 0 274.207243 0H109.691431A110.075414 110.075414 0 0 0 0.042667 109.648765v164.515811a54.867047 54.867047 0 1 0 109.648764 0V109.648765h164.515812a54.867047 54.867047 0 0 0 54.867047-54.781718z m365.894088 0c0 30.292071 24.574976 54.781717 54.867047 54.781718h164.515812v164.515811a54.867047 54.867047 0 0 0 109.648765 0V109.648765A110.075414 110.075414 0 0 0 914.351237 0H749.835425a54.867047 54.867047 0 0 0-54.867047 54.867047z m0 914.223241c0 30.292071 24.574976 54.867047 54.867047 54.867047h164.515812A110.075414 110.075414 0 0 0 1024.000002 914.30857V749.792759a54.867047 54.867047 0 1 0-109.648765 0v164.515811H749.835425a54.867047 54.867047 0 0 0-54.867047 54.781718z" p-id="27254" fill="#e6e6e6"></path><path d="M512.021334 261.36511A250.698888 250.698888 0 1 0 729.612268 387.397192a50.08858 50.08858 0 1 0-87.036374 49.83259A150.436398 150.436398 0 1 1 512.021334 361.542269a50.173909 50.173909 0 0 0 0-100.262489z" p-id="27255" fill="#e6e6e6"></path></svg>
			</div>
			<div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="editMore" @click="setEditMore">
				<svg t="1662196076352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28219" style="margin-top: 9px;" width="18" height="18"><path d="M384 128h-85.33v170.67H128V384h256zM896 384v-85.33H725.33V128H640v256zM725.33 725.33H896V640H640v256h85.33zM298.67 896H384V640H128v85.33h170.67z" p-id="28220" fill="#e6e6e6"></path></svg>
			</div>
			<div  style="width: 20px;height: 30px;cursor: pointer;float: right;margin-right: 8px;" @click="setEditMore">
				<svg t="1666520310121" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11047" style="margin-top: 9px;" width="18" height="18"><path d="M509.200032 0.01163C332.702036 1.511613 191.403641 144.509989 192.003634 321.007984c0.499994 162.998149 122.998603 297.396622 280.996809 316.596404 3.999955 0.499994 6.99992 3.899956 6.99992 7.899911V992.000363c0 17.699799 14.299838 31.999637 31.999637 31.999637s31.999637-14.299838 31.999637-31.999637V645.604298c0-4.099953 2.999966-7.399916 7.099919-7.899911C709.397758 618.404607 831.996366 483.506139 831.996366 320.007996 831.996366 142.310014 687.19801-1.488353 509.200032 0.01163zM692.997944 501.00594c-23.499733 23.499733-50.899422 41.999523-81.399075 54.899376-31.499642 13.299849-64.999262 20.099772-99.598869 20.099772s-68.099227-6.799923-99.598869-20.099772C381.901478 543.005463 354.501789 524.505673 331.002056 501.00594c-23.499733-23.499733-41.999523-50.899422-54.899377-81.399076-13.299849-31.499642-20.099772-64.999262-20.099772-99.598868 0-34.599607 6.799923-68.099227 20.099772-99.598869 12.899853-30.499654 31.399643-57.899342 54.899377-81.399076 23.499733-23.499733 50.899422-41.999523 81.399075-54.899376C443.900773 70.810826 477.400393 64.010903 512 64.010903s68.099227 6.799923 99.598869 20.099772C642.098522 97.010528 669.498211 115.510318 692.997944 139.010051c23.499733 23.499733 41.999523 50.899422 54.899377 81.399076 13.299849 31.499642 20.099772 64.999262 20.099772 99.598869 0 34.599607-6.799923 68.099227-20.099772 99.598868-12.899853 30.499654-31.399643 57.899342-54.899377 81.399076z" p-id="11048" fill="#ffffff"></path></svg>
			</div>
		</div>
		<div style="width: 100%;" v-if="!isGroup">
			<div style="position:relative;display: flex;width: 60%;margin-left: 20%;height: 30px;background-color: #323232;border-radius: 10px;margin-top: 5px;clear: both;">
				<div @mousedown.stop="startDown($event,-1)" 
				style="width: 20px;height: 30px;margin-left: -20px;cursor:e-resize;color: white;line-height: 30px;font-weight: normal">
					X
				</div>
				<input placeholder="1" @input="inputWidth(-1)" v-model="childrenData_edit[xOrigin].children.value" style="width: 50%;height: 25px;margin-top: 2px;line-height: 30px;background-color: transparent;color: var(--mainTextColor1);text-align: center;outline: none;border: none;"/>
				<unit style="position:absolute;right:5px;top:4px;" @unitChange="" @littleSet="" :defaultUnit="childrenData_edit[xOrigin].children.unit"></unit>
				<button class="styleBindVar" style=";position:absolute;right:-25px;top:2px" :data-attribute="bindName" @click="requestVar($event,xOrigin)">
					<svg t="1666510295001" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6819" width="20" height="20"><path d="M596.32 263.392c18.048 6.56 27.328 26.496 20.8 44.512l-151.04 414.912a34.72 34.72 0 1 1-65.28-23.744l151.04-414.912a34.72 34.72 0 0 1 44.48-20.768zM220.64 192H273.6v55.488H233.024c-26.112 0-38.464 14.4-38.464 44.544v134.304c0 42.496-19.936 71.264-59.104 85.664 39.168 16.448 59.104 44.544 59.104 85.664v134.976c0 28.8 12.352 43.84 38.464 43.84H273.6V832H220.672c-30.24 0-53.6-10.272-70.08-29.44-15.136-17.856-22.72-42.496-22.72-72.64v-128.832c0-19.872-4.096-34.24-12.352-43.2-9.6-10.944-26.784-16.416-51.52-17.792v-56.192c24.736-1.376 41.92-7.52 51.52-17.824 8.256-9.6 12.384-24 12.384-43.168V294.784c0-30.848 7.552-55.488 22.688-73.312C167.04 201.6 190.4 192 220.672 192z m529.792 0h52.896c30.24 0 53.6 9.6 70.08 29.44 15.136 17.856 22.72 42.496 22.72 73.344v128.128c0 19.2 4.096 34.24 13.024 43.84 8.96 9.6 26.112 15.776 50.848 17.152v56.192c-24.736 1.376-41.92 6.848-51.52 17.824-8.256 8.896-12.384 23.296-12.384 43.168v128.8c0 30.176-7.552 54.816-22.688 72.64-16.48 19.2-39.84 29.472-70.08 29.472h-52.896v-55.488h40.544c25.408 0 38.464-15.104 38.464-43.84v-135.04c0-41.088 19.232-69.184 59.104-85.632-39.872-14.4-59.104-43.168-59.104-85.664V292.032c0-30.144-13.056-44.544-38.464-44.544H750.4V192z" fill="#ffffff" p-id="6820"></path></svg>
				</button>
			</div>
			<div style="position:relative;display: flex;width: 60%;margin-left: 20%;height: 30px;background-color: #323232;border-radius: 10px;margin-top: 5px;clear: both;">
				<div @mousedown.stop="startDown($event,-1)" 
				style="width: 20px;height: 30px;margin-left: -20px;cursor:e-resize;color: white;line-height: 30px;font-weight: normal">
					Y
				</div>
				<input placeholder="1" @input="inputWidth(-1)" v-model="childrenData_edit[yOrigin].children.value" style="width: 50%;height: 25px;margin-top: 2px;line-height: 30px;background-color: transparent;color: var(--mainTextColor1);text-align: center;outline: none;border: none;"/>
				<unit style="position:absolute;right:5px;top:4px;" @unitChange="" @littleSet="" :defaultUnit="childrenData_edit[yOrigin].children.unit"></unit>
				<button class="styleBindVar" style=";position:absolute;right:-25px;top:2px" :data-attribute="bindName" @click="requestVar($event,yOrigin)">
					<svg t="1666510295001" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6819" width="20" height="20"><path d="M596.32 263.392c18.048 6.56 27.328 26.496 20.8 44.512l-151.04 414.912a34.72 34.72 0 1 1-65.28-23.744l151.04-414.912a34.72 34.72 0 0 1 44.48-20.768zM220.64 192H273.6v55.488H233.024c-26.112 0-38.464 14.4-38.464 44.544v134.304c0 42.496-19.936 71.264-59.104 85.664 39.168 16.448 59.104 44.544 59.104 85.664v134.976c0 28.8 12.352 43.84 38.464 43.84H273.6V832H220.672c-30.24 0-53.6-10.272-70.08-29.44-15.136-17.856-22.72-42.496-22.72-72.64v-128.832c0-19.872-4.096-34.24-12.352-43.2-9.6-10.944-26.784-16.416-51.52-17.792v-56.192c24.736-1.376 41.92-7.52 51.52-17.824 8.256-9.6 12.384-24 12.384-43.168V294.784c0-30.848 7.552-55.488 22.688-73.312C167.04 201.6 190.4 192 220.672 192z m529.792 0h52.896c30.24 0 53.6 9.6 70.08 29.44 15.136 17.856 22.72 42.496 22.72 73.344v128.128c0 19.2 4.096 34.24 13.024 43.84 8.96 9.6 26.112 15.776 50.848 17.152v56.192c-24.736 1.376-41.92 6.848-51.52 17.824-8.256 8.896-12.384 23.296-12.384 43.168v128.8c0 30.176-7.552 54.816-22.688 72.64-16.48 19.2-39.84 29.472-70.08 29.472h-52.896v-55.488h40.544c25.408 0 38.464-15.104 38.464-43.84v-135.04c0-41.088 19.232-69.184 59.104-85.632-39.872-14.4-59.104-43.168-59.104-85.664V292.032c0-30.144-13.056-44.544-38.464-44.544H750.4V192z" fill="#ffffff" p-id="6820"></path></svg>
				</button>
			</div>
		</div>
		<div style="width: 100%;" v-if="editMore">
			<!--原点设置-->
			<div style="width: 100%;height: 200px;position: relative;">
				<!--第一象限-->
				<div class="originArea" 
				style="right:35px;top:45px;border-radius: 0 10px 0 0;" 
				:style="{backgroundColor:`${xOrigin=='right' && yOrigin=='top'?'#323232':''}`}"
				@click="reSetOrigin('right','top')">
				</div>
				<!--第二象限-->
				<div class="originArea" style="left:35px;top:45px;border-radius: 10px 0 0 0;" 
				:style="{backgroundColor:`${xOrigin=='left' && yOrigin=='top'?'#323232':''}`}"
				@click="reSetOrigin('left','top')">
				</div>
				<!--第三象限-->
				<div class="originArea" style="left:35px;bottom:45px;border-radius: 0 0 0 10px;" 
				:style="{backgroundColor:`${xOrigin=='left' && yOrigin=='bottom'?'#323232':''}`}"
				@click="reSetOrigin('left','bottom')">
				</div>
				<!--第四象限-->
				<div class="originArea" style="right:35px;bottom:45px;border-radius: 0 0 10px  0;" 
				:style="{backgroundColor:`${xOrigin=='right' && yOrigin=='bottom'?'#323232':''}`}"
				@click="reSetOrigin('right','bottom')">
				</div>
				<!--坐标轴-->
				<div style="width: 2px;position: absolute;left: calc(50% - 2px);top: 40px;height: 120px;background-color: transparent;border:none;border-left: 2px dashed white;">
				</div>
				<!--坐标轴-->
				<div style="height: 2px;position: absolute;top: calc(50% - 2px);left: 40px;width: calc(100% - 80px);background-color: transparent;border:none;border-top: 2px dashed white;">
				</div>
				<!--位置文字-->
				<h4 class="originTitle" style="top:10px;left:50%;transform: translateX(-50%);">top</h4>
				<h4 class="originTitle" style="bottom:10px;left:50%;transform: translateX(-50%);">bottom</h4>
				<h4 class="originTitle" style="top:90px;left:10px;">left</h4>
				<h4 class="originTitle" style="top:90px;right:5px;">right</h4>
				<div style="position: absolute;z-index: 2;width: 30px;height: 20px;left: 50%;transform: translate(-50%,-50%);top: 50%;background-color: white;border-radius: 5px;">
				</div>
			</div>
		</div>
		<div style="border-bottom: 1px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;margin-top: 5px;"></div>
		
	</div>
</template>

<script>
	import unit from "../microTools/unit.vue"
	/* width | style | color */
	import selectListT from "../microTools/select2.vue"
	import colorBord from "../microTools/color.vue"
	export default{
		name:"absolute",
		props:{
			isGroup:{
				type:Boolean,
				default:false
			},
			left:{
				type:Object,
				default:{}
			},
			top:{
				type:Object,
				default:{}
			},
			right:{
				type:Object,
				default:{}
			},
			bottom:{
				type:Object,
				default:{}
			},
			absoluteOrigin:{
				type:Object,
				default:{}
			}
		},
		components:{
			selectListT,
			colorBord,
			unit
		},
		data(){
			return {
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
				
				height:"65px",
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
				remountedTimeout:null,
				
				xOrigin:"left",//默认以left为x方向定位
				yOrigin:"top",//默认以top为y方向定位
				originTimeout:null,
				selected:"实线",
				filterList:{
					"实线":"solid",
					"块虚线":'dashed',
					"点虚线":'dotted',
					"双实线":"double",
					"雕刻":'groove',
					"浮雕":"ridge",
					"内陷":"inset",
					"突出":'outset',
					"隐藏(none)":"none",
					"隐藏(hidden)":"hidden",
				},
				styleToText:{
					"solid":"实线",
					'dashed':"块虚线",
					'dotted':"点虚线",
					"double":"双实线",
					'groove':"雕刻",
					"ridge":"浮雕",
					"inset":"内陷",
					'outset':"突出",
					"none":"隐藏(none)",
					"hidden":"隐藏(hidden)"
				},
				mouseAction:{
					down:false,
					startX:0,
					target:"X",
					deltaX:0,
					pre:0
				},
				lineStyleList:['实线 ——','虚线 -----'],
				showFilterSelect:false,
				showColorBord:false,
				color:"",
				realValue:{
					"color":"#ffffff",
					width:"1",
					style:"solid"
				},
				borderList:[
					{
						style:"solid",
						color:"#ffffff",
					},
					{
						style:"solid",
						color:"#ffffff",
					},
					{
						style:"solid",
						color:"#ffffff",
					},
					{
						style:"solid",
						color:"#ffffff",
					}
				],
				borderNameList:[
					"top",'right','bottom','left'
				],
				editMore:false,
				nowEditIndex:0,
				
				tempOriginX:null,
				tempOriginY:null,
				tempNodes:null,
				provideSet:false,
				originTimeout:null
			}
		},
		watch:{
			top:{
				handler:function(val){
					if( Object.prototype.toString.call(val)=='[object Object]'){
						this.childrenData_edit.top=JSON.parse(JSON.stringify(val))
						if(!val.children.unit)this.childrenData_edit.top.children.unit="px"
						this.setOrigin()
					}
				},
				immediate:true,
				deep:true
			},
			left:{
				handler:function(val){
					if( Object.prototype.toString.call(val)=='[object Object]'){
						this.childrenData_edit.left=JSON.parse(JSON.stringify(val))
						if(!val.children.unit)this.childrenData_edit.left.children.unit="px"
						this.setOrigin()
					}
				},
				immediate:true,
				deep:true
			},
			right:{
				handler:function(val){
					if( Object.prototype.toString.call(val)=='[object Object]'){
						this.childrenData_edit.right=JSON.parse(JSON.stringify(val))
						if(!val.children.unit)this.childrenData_edit.right.children.unit="px"
						this.setOrigin()
					}
				},
				immediate:true,
				deep:true
			},
			bottom:{
				handler:function(val){
					if( Object.prototype.toString.call(val)=='[object Object]'){
						this.childrenData_edit.bottom=JSON.parse(JSON.stringify(val))
						if(!val.children.unit)this.childrenData_edit.bottom.children.unit="px"
						this.setOrigin()
					}
				},
				immediate:true,
				deep:true
			}
		},
		computed:{
		},
		mounted(){
			this.emitProcess()
			System.resetPositionByOrigin=(nodeId)=>{
				/*if(Object.keys(System.operatingNodes).length>1){
					this.reSetOrigin('left','top')
				}else if(Object.keys(System.operatingNodes).length==1)
				{
					for(let key in System.operatingNodes){
						this.reSetOrigin(System.metaData.STYLESTRUCT[key].style.absoluteOrigin.x,System.metaData.STYLESTRUCT[key].style.absoluteOrigin.y)
					}
				}*/
				this.provideSet=true
				//this.xOrigin=this.absoluteOrigin.x
				//this.yOrigin=this.absoluteOrigin.y
				let temp={}
				temp[nodeId]=true
				this.xOrigin=System.metaData.STYLESTRUCT[nodeId].style.absoluteOrigin.x
				this.yOrigin=System.metaData.STYLESTRUCT[nodeId].style.absoluteOrigin.y
				this.reSetOrigin(this.xOrigin,this.yOrigin)
			}
			
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.set(false)
					this.$emit("preProcess",'border',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'border',callBack)
			},
			set:function(emit=true){
				if(!this.editMore){
					this.childrenData_edit.value={
						color:this.realValue.color || '#ffffff',
						width:this.realValue.width || 0,
						style:this.realValue.style || 'solid'
					}
				}else{
					this.childrenData_edit.value=null
					this.childrenData_edit.children['borderTop'].value=this.borderList[0]
					this.childrenData_edit.children['borderRight'].value=this.borderList[1]
					this.childrenData_edit.children['borderBottom'].value=this.borderList[2]
					this.childrenData_edit.children['borderLeft'].value=this.borderList[3]
				}
				if(emit)
					this.$emit("set","border",this.childrenData_edit,function(a,b){return true},this.setted)
				this.setted=false
			},

			reSetOrigin:function(x,y,targetList=System.operatingNodes){
				this.xOrigin=x
				this.yOrigin=y
				this.tempOriginX=x
				this.tempOriginY=y
				let opX={'left':'right','right':'left'}[x]
				let opY={'bottom':'top','top':'bottom'}[y]
				let parentId
				let xValue,yValue
				for(let nodeId in targetList){
					parentId=System.getParentId(nodeId)
					if(parentId===null) parentId='projectFrameInner'
					xValue=(document.getElementById(parentId).getBoundingClientRect()[x]-document.getElementById(nodeId).getBoundingClientRect()[x])/System.scalePercent
					yValue=(document.getElementById(parentId).getBoundingClientRect()[y]-document.getElementById(nodeId).getBoundingClientRect()[y])/System.scalePercent
					if(x=='right'){
						System.writeToClass(nodeId,'left',"")
					} else{
						System.writeToClass(nodeId,'right',"")
						xValue*=-1
					}
					
					if(y=='bottom'){
						System.writeToClass(nodeId,'top',"")
					} else{
						System.writeToClass(nodeId,'bottom',"")
						yValue*=-1
					}
					if(!this.isGroup){
						this.childrenData_edit[this.xOrigin].children.value=xValue.toFixed(0)*1
						this.childrenData_edit[this.yOrigin].children.value=yValue.toFixed(0)*1
					}
					
					//修改样式类
					System.writeToClass(nodeId,x,xValue.toFixed(0)+"px")
					System.writeToClass(nodeId,y,yValue.toFixed(0)+"px")
					System.metaData.STYLESTRUCT[nodeId].style.absoluteOrigin={
						x:x,
						y:y
					}
					if(System.metaData.STYLESTRUCT[nodeId].style[x]){
						System.metaData.STYLESTRUCT[nodeId].style[x].children.value=xValue.toFixed(0)*1
						System.metaData.STYLESTRUCT[nodeId].style[x].children.unit='px'
					}else{
						System.metaData.STYLESTRUCT[nodeId].style[x]={
																		value:"",
																		children:{
																			value:xValue.toFixed(0)*1,
																			unit:"px"
																		},
																		group:false,
																		condition:{
																			bindList:null,
																			default:""
																		}
																	}
					}
					if(System.metaData.STYLESTRUCT[nodeId].style[y]){
						System.metaData.STYLESTRUCT[nodeId].style[y].children.value=yValue.toFixed(0)*1
						System.metaData.STYLESTRUCT[nodeId].style[y].children.unit='px'
					}else{
						System.metaData.STYLESTRUCT[nodeId].style[y]={
																		value:"",
																		children:{
																			value:yValue.toFixed(0)*1,
																			unit:"px"
																		},
																		group:false,
																		condition:{
																			bindList:null,
																			default:""
																		}
																	}
					}
					System.metaData.STYLESTRUCT[nodeId].style[opX]={
																		value:"",
																		children:{
																			value:"",
																			unit:"px"
																		},
																		group:false,
																		condition:{
																			bindList:null,
																			default:""
																		}
																	}
					System.metaData.STYLESTRUCT[nodeId].style[opY]={
																		value:"",
																		children:{
																			value:"",
																			unit:"px"
																		},
																		group:false,
																		condition:{
																			bindList:null,
																			default:""
																		}
																	}
					
				}
				System.drawSelectBound()

			},
			inputWidth:function(){
				if(this.setDataValueTime!=null)
					clearTimeout(this.setDataValueTime)
				this.setDataValueTime=setTimeout(()=>{
					this.setted=true
					this.set()
					this.setDataValueTime=null
				},200)
			},
			setEditMore:function(){
				this.editMore=!this.editMore
				if(this.editMore){
					for(let i=0;i<this.borderList.length;i++){
						this.borderList[i]={
						"color":"#ffffff",
						width:"1",
						style:"solid"
					}
					}
				}else{
					this.realValue={
						"color":"#ffffff",
						width:"1",
						style:"solid"
					}
				}
			},
			startDown:function(e,index){
				this.mouseAction.startX=e.clientX
				this.nowEditIndex=index
				if(this.editMore){
					if(!isNaN(this.borderList[this.nowEditIndex].width)){
						this.mouseAction.pre=this.borderList[this.nowEditIndex].width*1
					}else{
						this.mouseAction.pre=1
					}
					
				}else{
					if(!isNaN(this.realValue.width)){
						this.mouseAction.pre=this.realValue.width*1
					}else{
						this.mouseAction.pre=1
					}
				}
				this.mouseAction.down=true
			},
			mouseMove:function(e){
				if(this.mouseAction.down){
					
					this.mouseAction.deltaX=e.clientX-this.mouseAction.startX
					let out=this.mouseAction.pre+this.mouseAction.deltaX
					if(out<=0){
						out=0
					}
					if(this.editMore){
						this.borderList[this.nowEditIndex].width=out
					}else{
						
						try{
							this.realValue.width=out
						}catch{
							this.realValue={
								width:out
							}
						}
					}
					if(this.setDataValueTime!=null)
						clearTimeout(this.setDataValueTime)
					this.setDataValueTime=setTimeout(()=>{
						this.setted=true
						this.set()
					},50)
				}
			},
			mouseUp:function(e){
				this.mouseAction.down=false
				this.deltaX=0
			},
			requestVar:function(e,name){//请求绑定变量
				this.$emit("requestVar",e,name,this.childrenData_edit[name].condition)
			},
			setOrigin:function(){
				if(this.originTimeout!==null)
					clearTimeout(this.originTimeout)
				this.originTimeout=setTimeout(()=>{
					if(!this.isGroup){
						for(let nodeId in System.operatingNodes){
							if(System.metaData.STYLESTRUCT[nodeId].style.absoluteOrigin){
								this.xOrigin=System.metaData.STYLESTRUCT[nodeId].style.absoluteOrigin.x
								this.yOrigin=System.metaData.STYLESTRUCT[nodeId].style.absoluteOrigin.y
							}else{
								this.xOrigin='left'
								this.yOrigin='top'
							}
							
						}
					}
				},200)
			}
		}
	}
</script>

<style scoped>
@import url(./css/absolute.css);
</style>