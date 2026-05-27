<template>
	<div>
		<!--事件选择与简介面板-->
		<teleport to="body" v-if="showEventList">
			<div class="eventList">
				<!--header-->
				<div class="eventListHeader">
					<div style="height: 40px;padding: 0;width: 30%;background-color: transparent;color: var(--mainColorBlue2);font-weight: normal;">
						<button @click="closeEventList" style="background-color: transparent;height: 40px;width: 85px;font-size: 14px;letter-spacing: 5px;color: var(--mainColorBlue2);float: left;">
							返回
						</button>
						<button style="width: 30px;padding: 0;height: 40px;background-color: transparent;padding: 0;float: left;" @click="showScrollTarget">
							<svg t="1658208109514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top: 5px;" p-id="3285" width="20" height="20">
								<path d="M504.32 81.92C293.888 81.92 122.88 252.928 122.88 463.36c0 145.408 106.496 238.08 200.704 335.872 32.256 33.28 110.592 106.496 153.088 145.408 15.872 14.336 39.936 14.336 55.808 0 41.984-38.912 120.32-111.616 152.576-145.408 96.256-99.84 200.704-190.976 200.704-335.872C885.76 252.928 714.752 81.92 504.32 81.92z m160.256 645.12c-36.352 35.84-121.344 114.176-150.016 141.312-5.632 5.12-14.336 5.12-19.968 0-29.696-27.648-118.272-109.568-149.504-140.8-74.24-73.728-149.504-152.576-149.504-264.704C195.072 291.84 333.312 153.6 504.32 153.6s309.248 138.24 309.248 309.248c0 112.128-74.752 190.976-148.992 264.192z" p-id="3286" fill="#3662EC"></path><path d="M504.32 286.72c-88.064 0-159.744 71.68-159.744 159.744s71.68 159.744 159.744 159.744 159.744-71.68 159.744-159.744S592.384 286.72 504.32 286.72z m0 250.88c-50.688 0-91.648-40.96-91.648-91.648s40.96-91.648 91.648-91.648 91.648 40.96 91.648 91.648-40.96 91.648-91.648 91.648z" p-id="3287" fill="#3662EC"></path></svg>
						</button>
					</div>
					<input id="closeSelect" v-if="showTargetList" @blur="blurClose" style="position: absolute;width: 1px;height: 1px;border: none;outline: none;left: -10px;top: 0;"/>
					<selectListT @mouseenter='enterList=true' @mouseleave="enterList=false" v-if="showTargetList" :toBody="true" :width="'150px'"  @close="showTargetList=false" @change="scrollToTarget" ref="selectList_scroll" :list="targetList" style="margin: 0;margin-left:45px;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position:absolute;width:55%;z-index: 999;" ></selectListT>
					<h2 style="margin: 0;width: 40%;height: 40px;text-align: center;font-weight: normal;line-height: 40px;">
						事件选择
					</h2>
					<div style="width: 30%;height: 40px;background-color: transparent;display: flex;">
						<input style="text-align: center;border: none;outline: none;background-color: var(--mainColorGray3);width: 70%;height: 30px;margin-top: 5px;border-radius: 10px;"/>
						<button style="width: 25%;height: 30px;margin-top: 5px;background-color: var(--mainColorBlue2);color: white;margin-left: 2%;border-radius: 10px;">查找</button>
					</div>
				</div>
				<!--main-->
				<div class="eventListMain">
					<!--类别-->
					<div class="eventListType" v-for="(eventItem,index) in  eventList" :key="index" :id="eventItem.id">
						<h3 class="eventType">{{eventItem.type}}</h3>
						<div style="width: 90%;margin-left: 5%;display: grid;grid-template-columns:repeat(4,1fr);grid-template-rows:100px;row-gap: 20px;margin-bottom: 20px;">
							<div class="event" v-for="(event,index) in eventItem.children" :key="index">
								<div class="event_h">
									<h3 style="margin: 0;margin-left: 5px;font-weight: normal;float: left;">{{event.name}}</h3>
									<button @click="addEvent(event.name,event.text)" style="width: 55px;height: 25px;float: right;color: white;margin-right: 5px;margin-top: 6px;border-radius: 10px;padding: 0;" 
									:style="{backgroundColor:havenEventsName.indexOf(event.name)>-1?'var(--mainColorRed)':'var(--mainColorBlue2)'}">{{havenEventsName.indexOf(event.name)>-1?'移除':"添加"}}</button>
								</div>
								<div style="width: 100%;height: 65px;color: var(--mainColorGray4);font-size: 14px;font-weight: normal;padding: 5px;overflow-y: scroll;box-sizing: border-box;">
									{{event.text}}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</teleport>
		<!--事件编辑器主面板-->
		<teleport to="body" v-if="showEventEdit">
			<actionEdit ref="actionEdit" id="actionEdit" style="right: 18vw;top:10vh;z-index: 99;" @quit="showEventEdit=false;nowEditEventName=null" v-show="!showEventList"></actionEdit>
		</teleport>
		<!--当前元素已有事件列表-->
		<teleport to="body">
			<div class="havenEvents" style="right:0px;z-index: 98;" >
				<div style="height: 93%;width: 100%;overflow-y: scroll;overflow-x: hidden;" >
					<div v-for="(eventName,index) in havenEvents" :key="index" class="eventsItem" @click="editEvent(index)">
						{{eventName}}
					</div>
				</div>
				<!--添加按钮-->
				<button id="callList" style="border-radius: 10px;margin-left: 5px;width: 40px;height: 40px;padding: 0;border: 0;transition: .2s;" @click="showList">
					<svg t="1658127466633" style="background-color: transparent;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10282" data-spm-anchor-id="a313x.7781069.0.i5" width="35" height="35">
						<path d="M512 652.9c-13.2 0-24-10.7-24-24V394.5c0-13.2 10.7-24 24-24s24 10.7 24 24v234.4c0 13.2-10.8 24-24 24z" fill="#3662EC" opacity=".4" p-id="10283" data-spm-anchor-id="a313x.7781069.0.i3" class="selected"></path>
						<path d="M629.3 535.7H394.7c-13.2 0-24-10.7-24-24 0-13.2 10.7-24 24-24h234.6c13.2 0 24 10.7 24 24s-10.7 24-24 24z" fill="#3662EC" opacity=".4" p-id="10284" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path>
						<path d="M661.9 856H362.1C246 856 168 774.5 168 653.3V370.8C168 249.5 246 168 362.1 168H662c116.1 0 194 81.5 194 202.7v282.5C856 774.5 778 856 661.9 856zM362.1 216c-88.7 0-146 60.7-146 154.7v282.5c0 94 57.3 154.7 146 154.7H662c88.6 0.1 146-60.6 146-154.6V370.8c0-94-57.3-154.7-146-154.7H362.1z" fill="#3662EC" p-id="10285"></path>
					</svg>
				</button>
			</div>
		</teleport>
		
		<!--当前组件函数库-->
		<teleport to="body" v-if="showMethodsHub">
			<div class="methodsList" ref="methodList">
				<button @click="editFunction(-1)" style="width: 80px;height: 25px;position: absolute;left:10px;top:5px;z-index: 99;background-color: var(--mainColorBlue3);color: white;user-select: none;border-radius: 10px;cursor: pointer;">新建</button>
				<button @click="showMethodsHub=false;openMethodsHub=false" draggable="false" style="position:absolute;z-index: 99;;right: 0px;top:0px;border: none;outline: none;border-radius: 10px;background-color: transparent;backdrop-filter: blur(10px);color: var(--mainColorBlue3);height: 30px;width: 50px;">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;pointer-events: none;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15" >
						<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
				</button>
				<h3 style="width: 100%;height: 30px;margin: 0;padding: 0;font-weight: normal;color: #212121;line-height: 30px;text-align: center;">函数库</h3>
				<h4 style="width: 100%;height: 30px;margin: 0;padding: 0;font-weight: normal;color: var(--mainColorGray2);line-height: 30px;text-align: center;" v-if="!openMethodsHub">请选择事件指向函数</h4>
				<div class="functionItem" v-for="(item,index) in functionItems" :key="index" @click="methodsControl(item)">
					<div @click.stop="editFunction(index)" style="width: 20px;height: 20px;margin-top: 5px;margin-left: 2px;">
						<!--svg t="1661525397619" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2953" data-spm-anchor-id="a313x.7781069.0.i2" width="20" height="20"><path d="M512 1024L68.338225 767.821104V256.178896L512 0l443.661775 256.178896v511.642208zM211.454927 685.529001L512 858.70021l300.545073-173.171209V338.470999L512 165.29979 211.454927 338.470999z" fill="#eb5744" p-id="2954" data-spm-anchor-id="a313x.7781069.0.i3" class=""></path><path d="M512 511.642208m-143.116702 0a143.116702 143.116702 0 1 0 286.233404 0 143.116702 143.116702 0 1 0-286.233404 0Z" fill="#eb5744" p-id="2955" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path></svg-->
						<svg t="1661577470275" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7170" width="20" height="20"><path d="M616.3 536.8l195.9 195.9c20.5 20.5 20.5 53.9 0 74.4-20.7 20.7-54.3 20.5-74.8-0.4L539.8 605c-13.8-16.9-37.1-21.4-57-12.6-18.7 8.3-38.9 13.9-60.1 16.3-81.3 9-156.5-37-199.2-106.9-29.6-48.4-32.4-93-24.9-133.9l101.8 101.7c18.5 18.5 48.5 18.5 67 0L463 374c18.5-18.5 18.5-48.5 0-67.1L360.1 204.2c12.9-2.6 26.2-4 39.9-4 102.6 0 187.8 75.9 202.5 174.5 2.4 16.2 16.4 28.1 32.8 28.1 20.4 0 36.4-18.1 33.4-38.3C649.1 233.7 536.3 133.3 400 133.3c-33 0-64.5 6.2-93.8 17-32.3 12-41.3 53.3-16.9 77.6L402 340.6l-68 68-113-113c-24-24-64.7-14.9-76.2 17l-0.4 1c-17.8 49.8-22.4 105.9-5.9 165C166.9 579.9 253.9 658 358 673.7c47.4 7.1 92.8 2 133.7-12.7l196 196c48.1 48.1 126 48.1 174.1 0 48.1-48.1 48.1-126 0-174.1L666 487.2c-13.5-13.5-35.4-13.7-49.2-0.5-14.1 13.7-14.4 36.2-0.5 50.1z" fill="#eb5744" p-id="7171"></path></svg>
					</div>
					<div style="width: calc(100% - 60px);display: flex;height: 100%;">
						<h3 style="margin: 0;padding: 0;font-weight: normal;color: var(--mainColorGreen);margin-left: 10px;height: 30px;line-height: 30px;">{{item.functionName}}</h3>
						<h3 style="margin: 0;padding: 0;font-weight: normal;line-height: 30px;height: 30px;">{{processProps(item.props)}}</h3>
					</div>
					<div @click.stop="removeFunction(index)" style="width: 20px;height: 20px;margin-top: 5px;margin-left: 2px;">
						<svg t="1661577234511" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4702" width="20" height="20"><path d="M507.904 52.224q95.232 0 179.2 36.352t145.92 98.304 98.304 145.408 36.352 178.688-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-178.688-36.352-145.408-98.304-98.304-145.92-36.352-179.2 36.352-178.688 98.304-145.408 145.408-98.304 178.688-36.352zM736.256 573.44q30.72 0 55.296-15.872t24.576-47.616q0-30.72-24.576-45.568t-55.296-14.848l-452.608 0q-30.72 0-56.32 14.848t-25.6 45.568q0 31.744 25.6 47.616t56.32 15.872l452.608 0z" p-id="4703" fill="#eb5744"></path></svg>
					</div>
				</div>
			</div>
		</teleport>
		
		<!--新建函数-->
		<teleport to="body" v-if="editFunctionOptions.show">
			<div :style="{height:`${editFunctionOptions.props.length>0?'350px':'200px'}`}" style="position: absolute;z-index: 99999;width: 300px;transition: .2s;background-color: rgba(255,255,255,0.85);backdrop-filter: blur(10px);;left: 50vw;top:50vh;;transform: translate(-50%,-50%);border-radius: 10px;box-shadow: 0 0 15px rgba(0,0,0,0.15);">
				<div class="headerItem">
					<div class="headerText">函数名称</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input placeholder="输入函数名称" v-model="editFunctionOptions.name" @input="dataChange"/>
									
				</div>
				<div class="headerItem">
					<dcheckBox @setCheck="setAsyncFunction" style="margin-top: 5px;margin-left: 5px;" :precheck="editFunctionOptions.async"></dcheckBox>
					<div style="font-weight: normal;line-height: 30px;margin-left:10px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">异步函数(async)</div>
				</div>
				<div class="headerItem">
					<div class="headerText">形参列表</div>
					<div @click.stop="addNewProps" draggable="false" @mousemove="null" @mousedown="" @mouseup=""
					style="margin-left: 10px;margin-top: 8px;display: inline-block;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
					ref="addNewButton" >
						<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;"></span>
						<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;"></span>
					</div>
					<div v-if="editFunctionOptions.showError" style="font-weight: normal;line-height: 30px;margin-left:20px;color: var(--mainColorRed);user-select: none;font-size: 13px;">{{editFunctionOptions.errorText}}</div>
				</div>
				<div class="mainArea" style="border: 2px solid white;margin-left: 10px;width:270px" v-if="editFunctionOptions.props.length>0"><!-- -->
					<!--属性对-->
					<div class="functionPropsLine" v-for="(propsItem,index) in editFunctionOptions.props" :key="index">
						<input v-model="propsItem.name" style="width: 30%;" class="propInput" />
						<strong style="width: 20px;text-align: center;line-height: 25px;color: var(--mainColorBlue3);font-size: 16px;"> = </strong>
						<input v-model="propsItem.default" style="width: 60%;" class="propInput" @keydown="checkPropTab($event,index)"/>
					</div>
					<!--属性对-->
				</div>
				<div style="width: 90%;height: 30px;margin-left: 5%;position: absolute;bottom: 20px;">
					<button @click.stop="cancleEditFunction" style="border-radius: 10px;width: 45%;margin-right: 5%;height: 30px;background-color: white;box-shadow: 0 0 15px rgba(0,0,0,0.15);color: var(--mainColorBlue3);">取消</button>
					<button @click.stop="saveFunctionEdit" style="border-radius: 10px;width: 45%;margin-left: 5%;height: 30px;box-shadow: 0 0 15px var(--mainColorBlue2);background-color:var(--mainColorBlue3);color: white;">保存</button>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	/*
		事件选择组件
		事件编辑组件
		事件列表组件
		若是在主屏选择，则列表显示为store中的，包括组件（native事件）
		若是在组件DIY工具中选择，则列表显示为componentStore中的，即组件内部事件
	*/
    import selectListT from "./microTools/select2.vue"
	import actionEdit from "./microTools/actionEdit.vue"
	import { structStore } from "../store/struct.js";
	import { componentStore } from "../store/componentsStore.js";
		import dcheckBox from "./microTools/checkBox.vue"
	export default{
		name:"eventEdit",
		data(){
			return{
				showEventList:false,//控制选择与简介面板
				showEventEdit:false,//控制编辑面板
				havenEvents:[],//已有事件列表 (中文名)
				havenEventsName:[],//已有事件列表 (英文事件名)
				havenEvents_backUp:[],//已有事件列表 (中文名) 备份用于在其他组件调用完成后恢复原事件列表
				havenEventsName_backUp:[],//已有事件列表 (英文事件名) 备份
				eventTarget:{},//事件指向的函数名称
				store:null,//全局store
				store_com:null,//组件store
				eventList:[],
				isDom:true,//标记是否时编辑节点的事件，否则为窗口或浏览器事件
				isCom:false,//标记是组件还是主页
				comId:"",//组件ID
				componentName:null,
				targetList:[],//事件类型列表，用于快速定位
				showTargetList:false,
				cssScope:"",//scope标识
				nowScrollTop:0,
				enterList:false,//控制是否鼠标移入跳转列表
				provide:false,
				provideCallBack:null,
				newEventSetTarget:false,//控制新增事件选择指向函数
				domId:"",
				newEventName:"",
				functionItems:[
					
				],
				showMethodsHub:false,
				openMethodsHub:false,//控制函数库显示
				editFunctionOptions:{
					preName:"",
					index:-1,//-1表示新增
					errorText:"",
					showError:false,
					show:false,//控制面板显示
					errorTimeout:null,
					name:"",
					async:false,//是否异步函数
					props:[],
					hasChange:false,//标记是否已经修改
				},//新建函数数据项
				tabTimeOut:null,//函数编辑面板连续点击两次tab键则新增
				tabTimes:0,
				nowEditEventName:""//当前编辑的事件名称
				
			}
		},
		components:{
			selectListT,
			actionEdit,
			dcheckBox
		},
		mounted(){
	
			if(this.store==null){
				this.store=structStore()
			}
			if(this.store_com==null){
				this.store_com=componentStore()
			}
			
			this.setEvents("dom1","component1",false)
			
			if(this.eventList.length==0){
				this.setEventList()
			}
			let attrs=document.querySelector(".havenEvents").getAttributeNames()
			for(let index=0;index<attrs.length;index++){
				if(attrs[index].startsWith("data-v-")){
					this.cssScope=attrs[index].split("data-v-")[1]
					break
				}
			}
			attrs=null
			//请求事件列表
			System.requestEventList=(callBack,hasEvent)=>{
				this.havenEvents
				this.provideCallBack=callBack
				this.havenEventsName=hasEvent
				this.provide=true
				this.showEventList=true
			}
			//请求函数库
			System.requestMethodsHub=()=>{
				this.openMethodsHub=true//控制函数库显示
				this.showMethodsHub=true
			}
			
			//js关键字检查
			System.checkJsKeyword=(varName)=>{
				return !("break case catch class const continue debugger default delete do else export extends false finally for function " +
			  "if in import instanceof new null return super switch this throw true try typeof var void while with yield").split(" ").includes(varName)
			}
			
			System.refreshEvent=null
		},
		beforeDestroy(){
		},
		methods:{
			editEvent:function(nameOrIndex,newEvent=false,eventText="",domId=null,refresh=false){
				if((this.nowEditEventName!==nameOrIndex || nameOrIndex==="") || refresh){
					this.nowEditEventName=nameOrIndex
					console.log('eidt',this.nowEditEventName,nameOrIndex)
						/*
							此函数一定会是标签事件调用
							@param nameOrIndex:事件名称/索引
							@param newEvent:是否是新增，当newEvent为true时，name为name，此时为新增事件，否则为读取已有事件 
							@param {String}  name:"函数名称"
							@param {string} componentNmae:组件名称
							@domId {String} domId:标签ID
						*/
					System.refreshEvent=()=>{
						this.editEvent(nameOrIndex,newEvent,eventText,domId,true)
					}
					if(newEvent)this.newEventName=nameOrIndex
					if(!newEvent){
						//当此事件已有指向函数时，或直接选择函数编辑时，进入函数编辑面板
					   if(nameOrIndex!==""){
						  
						   document.querySelector(".havenEvents").style.width="150px"
						   document.querySelector(".havenEvents").style.right="85vw"
						   this.showEventEdit=true
						   //name:"函数名称"
						   let name
						   if(!isNaN(nameOrIndex)){
							   //点击已有事件转入
							   //获取指向的函数名称
							   name=this.eventTarget[this.havenEventsName[nameOrIndex]]
						   }else{
							   //从函数库选中函数后转入,传入的就是函数名称
							   //获取指向的函数名称
							   name=nameOrIndex
						   }
						   this.$nextTick(()=>{
								this.$refs['actionEdit'].setEditData(1,this.isDom,name,domId,this.componentName)
								this.showMethodsHub=false
						   })
					   }else{
						   //该事件未指向任何函数，需要重新选择
						   this.newEventSetTarget=true
						   this.showMethodsHub=true
						   this.$nextTick(()=>{
							setTimeout(()=>{
								this.$refs['methodList'].style.backgroundColor="rgba(255,255,255,0.85)"
								this.$refs['methodList'].style.backdropFilter="blur(5px)"
							},350)
						   })
					   }
					}else{
						//新增操作,弹出新增事件的函数选择框（函数库）
						this.newEventSetTarget=true
						this.showMethodsHub=true
						if(this.isDom){
							this.store.Events[this.domId][nameOrIndex]={
								name:eventText,//事件名称
								props:[{name:"event",default:""}],//传参@clikc="clickEvent($event,a,b,c...)"
								object:0,//0表示function形式，1表示()=>形式
								logic:"",//执行部分
								logicIndexKey:[]//操作逻辑的先后加载顺序对应的键名
							}
							
						}else{
							this.store_com[this.componentName].Events[this.domId][nameOrIndex]={
								name:eventText,//事件名称
								props:[{name:"event",default:""}],//传参@clikc="clickEvent($event,a,b,c...)"
								object:0,//0表示function形式，1表示()=>形式
								logic:"",//执行部分
								logicIndexKey:[]//操作逻辑的先后加载顺序对应的键名
							}
						}
						this.havenEventsName.push(nameOrIndex)
						this.havenEvents.push(eventText)
						this.havenEventsName_backUp=JSON.parse(JSON.stringify(this.havenEventsName))
						this.havenEvents_backUp=JSON.parse(JSON.stringify(this.havenEvents))
						this.$nextTick(()=>{
							setTimeout(()=>{
								this.$refs['methodList'].style.backgroundColor="rgba(255,255,255,0.85)"
								this.$refs['methodList'].style.backdropFilter="blur(5px)"
							},350)
						})
					}
				}

			},
			addEvent:function(eventName,text){
				/*
					添加事件
				*/
				if(this.provide){
				   //外部提供事件时，使用addEventListsener创建，故需要完整逻辑，若是标签创建，则只需要选择指向函数即可
					this.provideCallBack(eventName,{
						name:text,//事件名称
						props:[{name:"event",default:""}],//传参@clikc="clickEvent($event,a,b,c...)"
						object:0,//0表示function形式，1表示()=>形式
						logic:{},//执行部分
						logicIndexKey:[]//操作逻辑的先后加载顺序对应的键名
					}
				   )
					this.showEventList=false
					//恢复原事件列表
					this.havenEvents=JSON.parse(JSON.stringify(this.havenEvents_backUp))
					this.havenEventsName=JSON.parse(JSON.stringify(this.havenEventsName_backUp))
				}else{
					this.showEventList=false
					this.$nextTick(()=>{
						this.editEvent(eventName,true,text)
					})
				}
			},
			showScrollTarget:function(e){
				/*
					展开滚动列表
				*/
			   this.showTargetList=true
			   this.$nextTick(()=>{
				   this.$refs['selectList_scroll'].setSpread(e,false)
				   /*setTimeout(()=>{
					   document.getElementById("closeSelect").focus()
				   },500)*/
			   })
			},
			closeEventList:function(){
				this.showEventList=false
				if(!this.provide)
					document.querySelector(".havenEvents").style.right="270px"
				else{
					//恢复原事件列表
					this.havenEvents=JSON.parse(JSON.stringify(this.havenEvents_backUp))
					this.havenEventsName=JSON.parse(JSON.stringify(this.havenEventsName_backUp))
				}
			},
			setEventTarget:function(functionName){
				if(!this.provide){
					this.eventTarget[this.newEventName]=functionName
					if(this.isDom){
						this.store.Events[this.domId][this.newEventName].logic=functionName
					}else{
						this.store_com[this.componentName].Events[this.domId][this.newEventName].logic=functionName
					}
					this.editEvent(functionName,false)
					this.newEventSetTarget=false
					this.showMethodsHub=false
				}
				
			},
			showList:function(e){
				/*
					展开事件选择列表
				*/
				if(this.eventList.length==0)
					this.setEventList()
				this.targetList=this.eventList.map((item)=>{
					return item.type
				})
				document.querySelector(".havenEvents").style.right="10px"
				
				this.showEventList=true
				
			},
			blurClose:function(){
				setTimeout(()=>{
					if(!this.enterList){
						this.showTargetList=false
					}
				},100)
				
			},
			scrollToTarget:function(target){
				target=this.eventList[target['index']].id
				this.$nextTick(()=>{
					let box=document.querySelector(`.eventListMain #${target}`)
					setTimeout(()=>{
						let offsetTop=box.offsetTop
						let dis=Math.abs(offsetTop-this.nowScrollTop)
						this.nowScrollTop=offsetTop
						document.querySelector('.eventListMain').scrollTo({
							top:offsetTop,
							behavior:"smooth"
						})
						box=document.querySelector(`.eventListMain #${target} .eventType`)
						box.style.animationDelay=`.${(dis / 5).toFixed(0)}s`
						box.style.animationDuration="2s"
						box.style.animationName=`scrollEnd`
						setTimeout(()=>{
							box.style.animation=""
						},3000)
					},200)
				})
			},
			setEvents:function(nodeId,comId=null,isCom=false){
				this.domId=nodeId
				this.isCom=isCom
				this.comId=comId
				//父组件传入节点ID,组件ID，查找当前dom元素已有函数列表,isCom表明为组件DIY时调用的
				/*
					首先判断是标签还是组件
					标签时，读取Store -> events -> id
					组件时：读取componentStore -> id ->events
				*/
			   if(isCom){//组件内部编辑
					//读取事件列表
					this.havenEventsName=Object.keys(this.store_com[comId].Events[nodeId])
					this.havenEvents=this.havenEventsName.map((key)=>{
						this.eventTarget[key]=this.store_com[comId].Events[nodeId][key].logic
						return this.store_com[comId].Events[nodeId][key].name
					})
					for(let key in this.store_com[comId].METHODS){
						this.functionItems.push({
							functionName:key,
							async:this.store_com[comId].METHODS[key].async,
							props:this.store_com[comId].METHODS[key].props
						})
					}
					
			   }else{
				   this.havenEventsName=Object.keys(this.store.Events[nodeId])
				   this.havenEvents=this.havenEventsName.map((key)=>{
						this.eventTarget[key]=this.store.Events[nodeId][key].logic
						return this.store.Events[nodeId][key].name
				   })
				   for(let key in this.store.METHODS){
					   this.functionItems.push({
					   	functionName:key,
						async:this.store.METHODS[key].async,
					   	props:this.store.METHODS[key].props
					   })
				   }
			   }
			    this.havenEventsName_backUp=JSON.parse(JSON.stringify(this.havenEventsName))
				this.havenEvents_backUp=JSON.parse(JSON.stringify(this.havenEvents))
			},
			methodsControl:function(item){
				if(!this.openMethodsHub){
					//新增事件
					this.setEventTarget(item.functionName)
				}else{
					//编辑函数
					this.editEvent(item.functionName,false)
				}
			},
			processProps:function(props){
				let prop=[]
				props.forEach(item =>{
					if(item.default.length==0){
						prop.push(item.name)
					}else{
						prop.push(item.name+"="+item.default)
					}
				} 
				)
				return "("+prop.join(",")+')'
			},
			editFunction:function(index=-1){
				if(index==-1){
					this.editFunctionOptions={
						preName:"",
						index:-1,//-1表示新增
						errorText:"",
						showError:false,
						show:true,//控制面板显示
						errorTimeout:null,
						name:"",
						async:false,//是否异步函数
						props:[],
						hasChange:false
					}
				}else{
					this.editFunctionOptions={
						preName:this.functionItems[index].functionName,
						index:index,//-1表示新增
						errorText:"",
						showError:false,
						show:true,//控制面板显示
						errorTimeout:null,
						name:this.functionItems[index].functionName,
						async:this.functionItems[index].async,//是否异步函数
						props:this.functionItems[index].props,
						hasChange:false
					}
					
				}
				console.log(this.editFunctionOptions,"新建")
			},
			checkPropTab:function(e,index){
				if(e.key=='Tab' && !window.Shift){
					if(index==this.editFunctionOptions.props.length-1){
						//最后一个
						console.log("新增")
						if(this.tabTimes==0){
							e.preventDefault()
							this.tabTimes=1
							System.showToast("再次点击Tab键新增形参")
							this.tabTimeOut=setTimeout(()=>{
								this.tabTimes=0
								this.tabTimeOut=null
							},200)
						}else if(this.tabTimes==1){
							e.preventDefault()
							this.tabTimes=2
							clearTimeout(this.tabTimeOut)
							this.tabTimeOut=setTimeout(()=>{
								this.tabTimes=0
								this.addNewProps()
								this.tabTimeOut=null
							},200)
						}else{
							this.tabTimes=0
							clearTimeout(this.tabTimeOut)
						}
					}
				}
			},
			showPropsError:function(text){
				this.editFunctionOptions.errorText=text
				this.editFunctionOptions.showError=true
				if(this.editFunctionOptions.errorTimeout!=null){
					clearTimeout(this.editFunctionOptions.errorTimeout)
				}
				this.editFunctionOptions.errorTimeout=setTimeout(()=>{
					this.editFunctionOptions.showError=false
				},2000)
			},
			checkProps:function(){
				let existName=[]
				console.log("be",JSON.parse(JSON.stringify(this.editFunctionOptions)))
				try{
					this.editFunctionOptions.props.forEach(item => {
						if(~existName.indexOf(item.name)){		
							this.showPropsError("形参名重复")
							throw ""
						}else{
							existName.push(item.name)
							if(item.name=="" || item.name.length==0){
								this.showPropsError("存在未处理形参,新增失败")
								throw ""
							}else{
								if(!System.checkJsKeyword(item.name)){
									this.showPropsError("形参名与JS关键词冲突")
									throw ""
								}else{
									//检测是否合法
									try{
										new Function(
												`
													let ${item.name}="test"
												`)()
									}catch(e){
										this.showPropsError("形参变量命名非法")
										throw ""
									}
								}				
							}
						}
					})
					console.log("after1",JSON.parse(JSON.stringify(this.editFunctionOptions)))
				}catch{
					return false
				}
				console.log("after2",JSON.parse(JSON.stringify(this.editFunctionOptions)))
				return true
			},
			addNewProps:function(){
				let permit=this.checkProps()
				if(permit){
					this.editFunctionOptions.props.push({
						name:"",
						default:""
					})
					this.dataChange()
				}
			},
			saveFunctionEdit:function(){
				let functionExist=false
				let errorText="保存失败,函数名非法"
				try{
					this.functionItems.forEach(item =>{
						if(item.functionName==this.editFunctionOptions.name){
							errorText="函数名重复"
							throw ""
						}
					})
				}catch{
					functionExist=true
				}
				if(this.editFunctionOptions.name.length!=0 && System.checkJsKeyword(this.editFunctionOptions.name) &&!functionExist){
					if(this.checkProps()){
						try{
							if(this.editFunctionOptions.index==-1){
								console.log(this.editFunctionOptions)
								this.functionItems.push({
									functionName:this.editFunctionOptions.name,
									props:this.editFunctionOptions.props,
									async:this.editFunctionOptions.async
								})
								let newData={
										props:this.editFunctionOptions.props,
										object:1,
										varList:[],
										logic:{},
										logicIndexKey:[]
									}
								if(this.isCom){
									this.store_com[comId].METHODS[this.editFunctionOptions.name]=newData
								}else{
									this.store.METHODS[this.editFunctionOptions.name]=newData
								}
								
							}else{
								this.functionItems[this.editFunctionOptions.index]={
									functionName:this.editFunctionOptions.name,
									props:this.editFunctionOptions.props,
									async:this.editFunctionOptions.async
								}
								if(this.isCom){
									let preName=this.editFunctionOptions.preName
									let preData=JSON.parse(JSON.stringify(this.store_com[this.comId].METHODS[preName]))
									delete this.store_com[this.comId].METHODS[preName]
									this.store_com[this.comId].METHODS[this.editFunctionOptions.name]=preData
									this.store_com[this.comId].METHODS[this.editFunctionOptions.name].props=this.editFunctionOptions.props
									this.store_com[this.comId].METHODS[this.editFunctionOptions.name].async=this.editFunctionOptions.async
								}else{
									let preName=this.editFunctionOptions.preName
									let preData=JSON.parse(JSON.stringify(this.store.METHODS[preName]))
									delete this.store.METHODS[preName]
									this.store.METHODS[this.editFunctionOptions.name]=preData
									this.store.METHODS[this.editFunctionOptions.name].props=this.editFunctionOptions.props
									this.store.METHODS[this.editFunctionOptions.name].async=this.editFunctionOptions.async
								}
							}
							System.showToast("保存成功",2000)
							this.editFunctionOptions.show=false
							this.editFunctionOptions.hasChange=false
							this.editFunctionOptions={
								preName:"",
								index:-1,//-1表示新增
								errorText:"",
								showError:false,
								show:false,//控制面板显示
								errorTimeout:null,
								name:"",
								async:false,//是否异步函数
								props:[],
								hasChange:false
							}
						}catch(e){
							System.showToast("保存失败",2000)
							console.error(e)
						}
					}
				}else{
					System.showToast(errorText,2000)
				}

			},
			setAsyncFunction:function(asyncData){
				this.editFunctionOptions.async=asyncData
				this.dataChange()
			},
			cancleEditFunction:function(){
				if(this.editFunctionOptions.hasChange){
					if(confirm("数据已修改，是否保存?")){
						this.saveFunctionEdit()
					}
				}
				this.editFunctionOptions={
					preName:"",
					index:-1,//-1表示新增
					errorText:"",
					showError:false,
					show:false,//控制面板显示
					errorTimeout:null,
					name:"",
					async:false,//是否异步函数
					props:[],
					hasChange:false
				}
			},
			dataChange:function(){
				if(!this.editFunctionOptions.hasChange)
					this.editFunctionOptions.hasChange=true
			},
			removeFunction:function(index){
				let functionName=this.functionItems[index].functionName
				if(confirm("是否确定删除函数"+functionName)){
					try{
						if(this.isCom){
							delete this.store_com[this.comId].METHODS[functionName]
						}else{
							delete this.store.METHODS[functionName]
						}	
						this.functionItems.splice(index,1)
						System.showToast("删除成功",2000)
					}catch{
						System.showToast("删除失败",2000)
					}
				}
			},
			setEventList:function(){//设置事件列表
				this.eventList=[
					{
						type:'鼠标事件',
						id:"mouse_event",
						children:[
							{
								name:'click',
								text:"在元素上按下并释放任意鼠标按键"
							},
							{
								name:'contextmenu',
								text:"右键点击（在右键菜单显示前触发）"
							},
							{
								name:'dblclick',
								text:"在元素上双击鼠标按钮"
							},
							{
								name:'mousedown',
								text:"在元素上按下任意鼠标按钮"
							},
							{
								name:'mouseenter',
								text:"指针移到有事件监听的元素内"
							},
							{
								name:'mouseleave',
								text:"指针移出元素范围外（不冒泡）"
							},
							{
								name:'mousemove',
								text:"指针在元素内移动时持续触发"
							},
							{
								name:'mouseover',
								text:"指针移到有事件监听的元素或者它的子元素内"
							},
							{
								name:'mouseout',
								text:"指针移出元素，或者移到它的子元素上"
							},
							{
								name:'mouseup',
								text:"在元素上释放任意鼠标按键"
							},
							{
								name:'pointerlockchange',
								text:"鼠标被锁定或者解除锁定发生时"
							},
							{
								name:'pointerlockerror',
								text:"可能因为一些技术的原因鼠标锁定被禁止时"
							},
							{
								name:'select',
								text:"有文本被选中"
							},
							{
								name:'wheel',
								text:"滚轮向任意方向滚动"
							},
						]
					},
					{
						type:"资源事件",
						id:"source_event",
						children:[
							{
								name:'error',
								text:"资源加载失败事件"
							},
							{
								name:'abort',
								text:"正在加载资源已经被中止事件"
							},
							{
								name:'load',
								text:"资源及其相关资源已完成加载"
							},
							{
								name:'beforeunload',
								text:"window，document 及其资源即将被卸载"
							},
							{
								name:'unload',
								text:"文档或一个依赖资源正在被卸载"
							}
						]
					},
					{
					   type:"网络事件",
					   id:"net_event",
					   target:["window",'elment','svg_element','frameset'],//使用对象，默认为未定义内容
					   children:[
						   {
							   name:"online",
							   text:'浏览器已获得网络访问'
						   },
						   {
								name:"offline",
								text:'浏览器已失去网络访问'
						   }
					   ]
					},
					{
						type:'焦点事件',
						id:"focus_event",
						children:[
							{
								name:'focus',
								text:"元素获得焦点（不会冒泡）"
							},
							{
								name:'blur',
								text:"元素失去焦点（不会冒泡）"
							},
						]
					},
					{
						type:'CSS 动画事件',
						id:"animation_event",
						children:[
							{
								name:'animationstart',
								text:"某个 CSS 动画开始时触发"
							},
							{
								name:'animationend',
								text:"某个 CSS 动画完成时触发"
							},
							{
								name:'animationiteration',
								text:"某个 CSS 动画完成后重新开始时触发"
							},
							{
								name:'transitionend',
								text:"CSS 过渡已经完成"
							},
						]
					},
					{
						type:'表单事件',
						id:"form_event",
						tag:'form',//专有对象事件
						children:[
							{
								name:'reset',
								text:"点击重置按钮时触发"
							},
							{
								name:'submit',
								text:"点击提交按钮时触发"
							},

						]
					},
					{
						type:'文本写作事件',
						id:"input_event",
						tag:['input'],//专有对象事件
						children:[
							{
								name:'compositionstart',
								text:"中文文本输入前触发"
							},
							{
								name:'compositionupdate',
								text:"中文文本输入中触发"
							},
							{
								name:'compositionend',
								text:"中文文本输入中触发"
							},
						]
					},
					{
						type:'剪贴板事件',
						id:"cut_event",
						children:[
							{
								name:'cut',
								text:"已经剪贴选中的文本内容并且复制到了剪贴板"
							},
							{
								name:'copy',
								text:"已经把选中的文本内容复制到了剪贴板"
							},
							{
								name:'paste',
								text:"从剪贴板复制的文本内容被粘贴"
							},
						]
					},
					{
						type:'键盘事件',
						id:"keybord_event",
						children:[
							{
								name:'keydown',
								text:"按下任意按键触发"
							},
							{
								name:'keypress',
								text:"除 Shift、Fn、CapsLock 外的任意键被按住。（连续触发。）"
							},
							{
								name:'keyup',
								text:"抬起任意按键"
							},
						]
					},
					
					{
						type:'触摸事件',
						id:"touch_event",
						children:[
							{
								name:'touchcancel',
								text:"触摸取消时"
							},
							{
								name:'touchend',
								text:"触摸结束时"
							},
							{
								name:'touchmove',
								text:"触摸移动时"
							},
							{
								name:'touchstart',
								text:"触摸开始时"
							},
						]
					},
					{
						type:'拖放事件',
						id:"drag_event",
						children:[
							{
								name:'drag',
								text:"正在拖动元素或文本选区（在此过程中持续触发，每 350ms 触发一次）"
							},
							{
								name:'dragend',
								text:"拖放操作结束。（松开鼠标按钮或按下 Esc 键）"
							},
							{
								name:'dragenter',
								text:"被拖动的元素或文本选区移入有效释放目标区"
							},
							{
								name:'dragstart',
								text:"用户开始拖动 HTML 元素或选中的文本"
							},
							{
								name:'dragleave',
								text:"被拖动的元素或文本选区移出有效释放目标区"
							},
							{
								name:'dragover',
								text:"被拖动的元素或文本选区正在有效释放目标上被拖动（在此过程中持续触发，每 350ms 触发一次）"
							},
							{
								name:'drop',
								text:"元素在有效释放目标区上释放"
							},
						]
					},
					{
						type:'媒体事件',
						id:"media_event",
						tag:['vedio','audio','image'],
						children:[
							{
								name:'audioprocess',
								text:"处理缓冲区"
							},
							{
								name:'canplay',
								text:"当浏览器可以播放音频/视频时"
							},
							{
								name:'canplaythrough',
								text:"当浏览器可在不因缓冲而停顿的情况下进行播放时"
							},
							{
								name:'complete',
								text:"媒体资源加载完成"
							},
							{
								name:'durationchange',
								text:"当音频/视频的时长已更改时"
							},
							{
								name:'emptied',
								text:"当目前的播放列表为空时"
							},
							{
								name:'ended',
								text:"当目前的播放列表已结束时"
							},
							{
								name:'loadeddata',
								text:"当浏览器已加载音频/视频的当前帧时"
							},
							{
								name:'loadedmetadata',
								text:"当浏览器已加载音频/视频的元数据时"
							},
							{
								name:'pause',
								text:"当音频/视频已暂停时"
							},
							{
								name:'play',
								text:"当音频/视频已开始或不再暂停时"
							},
							{
								name:'playing',
								text:"当音频/视频在已因缓冲而暂停或停止后已就绪时"
							},
							{
								name:'ratechange',
								text:"当音频/视频的播放速度已更改时"
							},
							{
								name:'seeked',
								text:"当用户已移动/跳跃到音频/视频中的新位置时"
							},
							{
								name:'seeking',
								text:"当用户开始移动/跳跃到音频/视频中的新位置时"
							},
							{
								name:'stalled',
								text:"当浏览器尝试获取媒体数据，但数据不可用时"
							},
							{
								name:'suspend',
								text:"当浏览器刻意不获取媒体数据时"
							},
							{
								name:'timeupdate',
								text:"当目前的播放位置已更改时"
							},
							{
								name:'volumechange',
								text:"当音量已更改时"
							},
							{
								name:'waiting',
								text:"当视频由于需要缓冲下一帧而停止"
							},
						]
					},
					{
						type:'进度事件',
						id:"progress_event",
						children:[
							{
								name:'abort',
								text:"当音频/视频的加载已放弃时"
							},
							{
								name:'error',
								text:"当在音频/视频加载期间发生错误时"
							},
							{
								name:'load',
								text:"资源及其相关资源已完成加载"
							},
							{
								name:'loadend',
								text:"当浏览器查找音频/视频完成时"
							},
							{
								name:'loadstart',
								text:"当浏览器开始查找音频/视频时"
							},
							{
								name:'progress',
								text:"当浏览器正在下载音频/视频时"
							},
						]
					},
					{
						   type:"视图事件",
						   id:"view_event",
						   children:[
							   {
								   name:"resize",
								   text:""
							   },{
								   name:"scroll",
								   text:""
							   }
						   ]
					},
					{
						type:'存储事件',
						id:"store_event",
						children:[
							{
								name:'change',
								text:"内容被改变时"
							},
							
						]
					},
					{
						type:'值变化事件',
						id:"value_event",
						children:[
							{
								name:'input',
								text:"有内容输入时"
							},
							{
								name:'readystatechange',
								text:"加载状态改变时"
							},
						]
					},
					{
						type:'SVG事件',
						id:"svg_event",
						tag:["svg"],
						children:[
							{
								name:'SVGError',
								text:"加载错误时"
							},
							{
								name:'SVGLoad',
								text:"加载完成时"
							},
						]
					},
				]
				if(!this.isDom){
					
					/*
						当当前的isDom值为false时，表示是在事件编辑器编写函数时调用事件处理列表
						此时需要加上window、document事件
					*/
				   console.log("domenter", this.eventList[13])
				   this.eventList[14]={
						type:'存储事件',
						id:"store_event",
						children:[
							{
								name:'change',
								text:"内容被改变时"
							},
							{
								name:'storage',
								text:"本地存储"
							},
						]
					}
				   let temp=[
					   {
						   type:"会话历史事件",
						   id:"page_event",
						   target:['window'],
						   children:[
							   {
								   name:"pagehide",
								   text:"页面隐藏时"
							   },
							   {
								   name:"pageshow",
								   text:""
							   },
							   {
								   name:"popstate",
								   text:""
							   }
						   ]
					   },
					   {
						   type:"打印事件",
						   id:"print_event",
						   target:['window'],
						   children:[
							   {
								   name:"beforeprint",
								   text:"打印机已经就绪时触发"
							   },
							   {
								   name:"afterprint",
								   text:"打印机关闭时触发"
							   },
						   ]
					   },
					   {
						   type:"窗口视图事件",
						   id:"windowView_event",
						   target:['document'],
						   children:[
							   {
								   name:"fullscreenchange",
								   text:"打印机已经就绪时触发"
							   },
							   {
								   name:"fullscreenerror",
								   text:"打印机关闭时触发"
							   },
							   {
								   name:"resize",
								   text:""
							   },{
								   name:"scroll",
								   text:""
							   }
						   ]
					   },
					   {
						   type:"传感器事件",
						   id:"device_event",
						   target:['window'],
						   children:[
							   {
								   name:"devicemotion",
								   text:""
							   },
							   {
								   name:"deviceorientation",
								   text:""
							   },
							   {
								   name:"orientationchange",
								   text:""
							   }
						   ]
					   }
				   ]
				   this.eventList.push(...temp)
				   temp=null
				}
			}
		}
	}
</script>

<style scoped="scope1">
	.eventListMain::-webkit-scrollbar{
		display: block;
		  width: 5px;
		  height: 5px;
	}
	.eventListMain::-webkit-scrollbar-button{
	  width: 5px;
	  height: 5px;
	  background-color: transparent;
	}
	.eventListMain::-webkit-scrollbar-track{
	  width:5px;
	  height: 10px;
	  background-color: transparent;
	}
	.eventListMain::-webkit-scrollbar-thumb{
	 height: 5px;
	  width: 5px;
	  border-radius: 5px;
	  transition: .2s;
	  background-color: rgba(0,0,0,0.25);
	}
	.eventListMain::-webkit-scrollbar:hover{
		width: 10px;
	}
	.havenEvents{
		z-index: 99;
		position: absolute;
		height: 80vh;
		top: 10vh;
		width:200px;
		border-radius: 10px;
		background-color: rgba(255,255,255,0.98);
		/*backdrop-filter: blur(10px);*/
		box-shadow: 0 0 15px rgba(128,128,128,0.5);
		transition: .2s;
	}
	.eventsItem{
		width: 90%;
		height: 45px;
		font-size: 1.02rem;
		line-height: 45px;
		padding-left: 10px;
		box-sizing: border-box;
		letter-spacing: 1px;
		position: relative;
		margin-left: 5%;
		margin-top: 5px;
		border-radius: 10px;
		background-color: var(--mainColorBlue2);
		color: white;
		cursor: pointer;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: normal;
	}
	.eventList{
		position: absolute;
		left: 10vw;
		transition: .2s;
		top: 10vh;
		width: 66vw;
		height: 80vh;
		border-radius: 10px;
		z-index: 99999;
		box-shadow: 0 0 15px var(--mainColorGray2);
		background-color: white;
	}
	.eventListHeader{
		height: 35px;
		line-height: 35px;
		display: flex;
		width: 100%;
	}
	.eventListMain{
		position: relative;
		height: calc(80vh - 35px);
		width: 100%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.eventListType{
		width: 100%;
		height: auto;
		position: relative;
	}
	.eventType{
		margin: 0;
		text-align: left;
		font-weight: 500;
		font-size: 18px;
		height: 35px;
		line-height: 35px;
		margin:10px;
	}
	.event_h{
		width: 100%;
		height: 35px;
		line-height: 35px;
		border: none;
		border-bottom: 1px solid var(--mainColorBlue2);
	}
	.event{
		position: relative;
		width: 90%;
		height: 100px;
		background-color: white;
		margin-left: 5%;
		border-radius: 0 10px 10px 10px;
		border:1px solid var(--mainColorBlue2);
	}
	.event::after{
		content: "";
		z-index: -1;
		position: absolute;
		width: 30px;
		height: 30px;
		background-color: var(--mainColorBlue2);
		left: -5px;
		top: -5px;
		border-radius: 5px;
	}
	.event::before{
		content: "";
		z-index: -1;
		position: absolute;
		width: 150px;
		height: 30px;
		background-color: var(--mainColorBlue);
		left: 10px;
		bottom: 10px;
		border-radius: 15px;
		filter: blur(15px);
		box-shadow: 0 0 10px var(--mainColorBlue2);
	}
	.functionItem{
		position: relative;
		width: 90%;
		margin-left: 5%;
		height: 30px;
		margin-top: 10px;
		background-color:transparent  ;
		color: var(--mainColorBlue3);
		text-align: center;
		line-height: 30px;
		border-radius: 10px;
		display: flex;
		user-select: none;
		cursor: pointer;
		transition: .2s;
	}
	
	.functionItem:hover{
		background-color: var(--mainColorGray3);
	}
	
	.methodsList{
		animation: functionListShow .2s ease-out;
		animation-fill-mode: forwards;
		border-radius: 20px;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		position: absolute;
		z-index: 999;
		width: 600px;
		height: 680px;
		background-color: rgba(255,255,255,0.98);
		left: 50vw;
		top: 50vh;
		transition: .2s;
		transform-origin:center;
		transform:translate(-50%,-50%) scale(2);
		opacity: 0;
		
	}
	
	@keyframes functionListShow {
		from{
			transform:translate(-50%,-50%) scale(2);
			opacity: 0;
		}to{
			transform:translate(-50%,-50%) scale(1);
			opacity: 1;
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
	.mainArea{
		width: 210px;
		height: 150px;
		overflow-y: scroll;
		background-color: white;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 15px;
		margin-left: 60px;
		transform: scale(1);
	}
	.functionPropsLine{
		display: flex;
		width: 90%;
		height: 25px;
		margin-top: 5px;
		margin-left: 5%;
		background-color: transparent;
		
	}
	.propInput{
		outline: none;
		border: none;
		border-radius: 10px;
		background-color: var(--mainColorGray3);
		color: #212121;
		text-align: center;
		font-weight: normal;
		line-height: 25px;
		height: 25px;
	}
</style>