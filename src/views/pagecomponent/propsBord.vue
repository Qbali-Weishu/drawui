<!--组件入参设置面板-->
<template>
	<div class="propsBord">
		<!--提交按钮-->
		<div class="header">
			<button class="update">更新</button>
		</div>
		<!--参数列表-->
		<div>
			<div class="propsItem" v-for="(item,index) in propsList" :key="index">
				<!--参数名称-->
				<div class="propsName">{{item.name}}</div>
				<!--参数数据-->
				<!--输入框-->
				<div v-if="item.inputType==0" class="propsValue">
					<input class="propsInput" v-model="item.nowValue"/>
				</div>
				<!--下拉框-->
				<div v-else-if="item.inputType==1" class="propsValue">
					<button @click='callSelect(index,$event)' class="propsItemSelect">
						{{item.nowValue}}
						<svg style="position: absolute;right:8px;top: 3px;" t="1668580251649" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2152" width="20" height="20"><path d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z" p-id="2153" fill="#ffffff"></path></svg>
					</button>
					<selectListT @change="(outTarget)=>{setPropsValue_select(index,outTarget)}" :ref="'select_'+index" v-if="nowEditngPropsItem.showComponent[index]" 
						:list="item.selectOptions" 
						@close="nowEditngPropsItem.showComponent[index]=false" 
						:selected="item.nowValue"  
						style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'">
					</selectListT>
				</div>
				<!--开关-->
				<div v-else-if="item.inputType==2" class="propsValue">
					<verticalCheckBox 
						@setCheck="setPropsValue_switch" 
						style="margin-top: 5px;width: 50px;margin-left: 80px;position: absolute;left: 0;" 
						:precheck="item.nowValue" 
						:showText="false">
					</verticalCheckBox>
				</div>
				<!--单选-->
				<div v-else-if="item.inputType==3" class="propsValue" style="height: 100px;">
					<div style="width: 90%;margin-left: 5%;;max-height:100px;overflow: scroll;background-color: #323232;border-radius: 10px;">
						<div class="checkItem" v-for="(option,optionIndex) in item.checkRadios" :key="optionIndex">
							<circleCheckBox :ref="'radio_'+index+'_'+optionIndex" @setCheck="(check)=>{setPropsValue_radio(index,optionIndex)}" :precheck="item.nowValue==optionIndex" :showText="false" 
							style="width: 10px;height:10px;margin-top: 10px;"></circleCheckBox>
							<div style="width: calc(100% - 30px);height: 30px;color: white;font-weight: normal;line-height: 30px;">
								{{option}}
							</div>
						</div>
					</div>
				</div>
				<!--多选-->
				<div v-else-if="item.inputType==4" class="propsValue" style="height: 100px;">
					<div style="width: 90%;margin-left: 5%;;max-height:100px;overflow: scroll;background-color: #323232;border-radius: 10px;">
						<div class="checkItem" v-for="(option,optionIndex) in item.checkRadios" :key="optionIndex">
							<checkBox :ref="'check_'+index+'_'+optionIndex" 
							:precheck="item.nowValue[optionIndex]" 
							:showText="false" 
							@setCheck="(value)=>{setPropsValue_check(index,optionIndex,value)}"
							style="width: 20px;height:20px;margin-top: 5px;transform: scale(0.7);"></checkBox>
							<div style="width: calc(100% - 30px);height: 30px;color: white;font-weight: normal;line-height: 30px;">
								{{option}}
							</div>
						</div>
					</div>
				</div>
				<!--自定义-->
				<div v-else-if="item.inputType==5" class="propsValue">
					<button class="propsButton" @click="callCustomize(index)">{{propsList[index].nowValue}}</button>
				</div>
			</div>
		</div>
		<teleport to="body" v-if="showConfig">
			<div class="showBord"  
					id="propsEditBord_accepter">
				<component :is="configComponent"></component>
			</div>
		</teleport>
	</div>
</template>

<script>
	import selectListT from "../../components/microTools/select2.vue"
	import verticalCheckBox from "../../components/microTools/verticalCheckBox.vue"
	import checkBox from "../../components/microTools/checkBox.vue"
	import circleCheckBox from "../../components/microTools/circleCheckBox.vue"
	import * as configuration from "./main.js"
	import { conf } from "monaco-editor/esm/vs/basic-languages/javascript/javascript"
	import * as builtInComponent from "../../builtInComponent/componentList.js"
	//System.mountComponentToNode('testConfig_accepter','testConfig',{})
	export default {
		name:"propsBord",
		data(){
			return{
				propsList:{},
				nowEditngPropsItem:{
					index:"",
					showComponent:{}
				},
				show:false,
				showConfig:false,
				configComponent:"",
				nodeKey:"",
				componentProps:{}
			}
		},
		components:{
			selectListT,
			verticalCheckBox,
			checkBox,
			circleCheckBox,
		},
		mounted(){
			//打开接受节点
			const propsValue={
				propsStatus:false,
				setProps:false,
				resetValue:""
			}
			//返回的数据
			let resetValue=null
			let _this=this
			let existProps
			const windowProps=new Proxy(propsValue,{
				set:function(target,attr,value){
					if(attr == 'propsStatus' ){
						if(value===true){
							//打开挂载节点
							_this.showConfig=true
						}else{
							_this.showConfig=false
						}
						return true
					}
					else if(attr == 'setProps'){
						if(value === true){
							//修改参数
							_this.propsList[_this.nowEditngPropsItem.index].nowValue=resetValue
							windowProps.setProps=false
							existProps=JSON.parse(JSON.stringify(System.nodeMeta.tree[_this.nodeKey].props))
							existProps[_this.nowEditngPropsItem.index]=resetValue
							console.log(_this.nodeKey)
							System.resetComponentProps[_this.nodeKey.replace("$NODE:","").replace("_accepter","")](existProps)
							return true
						}else{
							//关闭修改界面
							return true
						}
					}
					target[attr]=value
					return true
				},
				
			})
			let openCallBack=null
			window.openPropsConfiguration=(callBack)=>{
				openCallBack=callBack
				windowProps.propsStatus=true
			}
			window.closePropsConfiguration=()=>{
				windowProps.propsStatus=false
			}
			
			window.setPropsValue=(value)=>{
				resetValue=value
				windowProps.setProps=true
			}
			
			this.$nextTick(()=>{
				this.show=true
			})
		},
		methods:{
			resetTarget:function(){
				//挂载数据config.vue
				//引入组件链接
				/*let src=""
				let configScript=document.createElement("script")
				configScript.src=src
				const load=()=>{
					if(!window.remoteEc) window.remoteEc={}
					//注册组件
					window.registerEC("propsEditBord")
					//挂载组件
					window.remoteEc['childMount_propsEditBord']('propsEditBord_accepter')
				}
				configScript.onload=configScript.onreadystatechange=function(){
					load()
				}
				//测试
				load()
				document.getElementsByTagName('head')[0].appendChild(configScript)*/
				let keys=Object.keys(System.operatingNodes)
				if(keys.length>1){
					return {
						status:'error',
						text:"无法同时编辑多个组件"
					}
				}
				let nodeKey=keys[0]
				this.nodeKey=nodeKey
				//组件列表中其ID不以$NODE:开头，则非组件
				if(!nodeKey.startsWith("$NODE:"))
					return {
						status:'error',
						text:"选中对象非组件对象，无法编辑"
					}
				//读取对应组件的props列表
				let componentPath=System.nodeMeta.tree[nodeKey].__modulePath__
				let componentData=System.componentStore[componentPath]
				//暂时只支持复合组件与远程组件的自定义面板
				let componentProps
				if(Object.prototype.toString.call(componentData)=='[object String]'){
					if(componentData.startsWith("builtIn:")){
						//复合组件
						let target=componentData.replace("builtIn:","")
						componentData=builtInComponent.data[target].path
						let componentMountEvent=require(`../../builtInComponent/${componentData}/configComponent.js`)
						//执行组件挂载,获取组件名称
						let componentName=componentMountEvent.mountConfig()
						this.configComponent=componentName
						componentProps=JSON.parse(JSON.stringify(require(`../../builtInComponent/${componentData}/props.js`).propsList)) 
					}
				}else{
					componentProps=JSON.parse(JSON.stringify(System.componentStore[componentPath].props)) 
				}
				this.componentProps=componentProps
				//读取已有的数据
				let existProps=JSON.parse(JSON.stringify(System.nodeMeta.tree[nodeKey].props))
				let propsKeys=Object.keys(existProps)
				for(let key in componentProps){
					if(!propsKeys.includes(key)){
						//如果此入参没有设置，则设置为默认值
						if(['[object Object]','[object Array]'].includes(Object.prototype.toString.call(componentProps[key].default)))
							componentProps[key].nowValue=JSON.parse(JSON.stringify(componentProps[key].default))
						else if(typeof(componentProps[key].default)=='string'){
							componentProps[key].nowValue=componentProps[key].default+""
						}
						else if(typeof(componentProps[key].default)=='number'){
							componentProps[key].nowValue=componentProps[key].default+0
						}else if(typeof(componentProps[key].default)=='boolean'){
							componentProps[key].nowValue=!(!componentProps[key].default)
						}
					}else{
						//否则设置为已经指定的参数
						componentProps[key].nowValue=existProps[key]
					}
				}
				this.propsList=componentProps
			},
			callSelect:function(index,e){
				this.nowEditngPropsItem.showComponent[index]=true
				let ref='select_'+index
				
				this.$nextTick(()=>{
					console.log(this.$refs['select_prop1'][0])
					new Function('e',`this.$refs['${ref}'][0].setSpread(e)`).call(this,e)
				})
			},
			setPropsValue_select:function(targetItem,index){
				//targetItem：需要修改的props索引
				//index:选择返回的索引
				this.propsList[targetItem].nowValue=this.propsList[targetItem].selectOptions[index.index]
			},
			setPropsValue_switch:function(targetItem,value){
				this.propsList[targetItem].nowValue=value
			},
			setPropsValue_radio:function(targetItem,optionIndex){
				let radioListLength=this.propsList[targetItem].checkRadios.length
				let ref=""
				for(let i=0;i<radioListLength;i++){
					if(i!==optionIndex){
						ref="radio_"+targetItem+"_"+i
						new Function(`this.$refs['${ref}'][0].setValue(false)`).call(this)
					}else{
						ref="radio_"+targetItem+"_"+i
						new Function(`this.$refs['${ref}'][0].setValue(true)`).call(this)
						this.propsList[targetItem].nowValue=optionIndex
					}
				}
			},
			setPropsValue_check:function(targetItem,optionIndex,value){
				this.propsList[targetItem].nowValue[optionIndex]=value
			},
			callCustomize:function(targetItem){
				this.showConfig=true
				this.$nextTick(()=>{
					let eventName=this.propsList[targetItem].customize
					window.prePropsValue=this.propsList[targetItem].nowValue
					this.nowEditngPropsItem.index=targetItem
					try{
						window[eventName](targetItem)
					}catch{}
				})
			}
		}
	}
</script>

<style scoped>
	.propsBord{
		position:absolute;
		width: 210px;
		height:100%;
		background:#212121;
		border-radius:10px;
		right:0px;
	}
	.header{
		width: 100%;
		height:30px;
		position:relative;
		background:transparent
	}
	.update{
		background:var(--mainColorBlue2);
		color:white;
		border-radius:10px;
		width:80px;
		cursor:pointer;
		height:25px;
		position:absolute;
		right:8px;
		top:3px;
	}
	.propsItem{
		width: 100%;
		height:auto;
		background-color:transparent;
		display:flex;
		margin-top:8px
	}
	.propsName{
		width:30%;
		text-align:left;
		height:30px;
		line-height:30px;
		color:white;
		font-weight:normal;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.propsValue{
		width:70%;
		height:30px;
	}
	.propsInput{
		width: 100%;
		height:25px;
		line-height: 25px;
		outline: none;
		border: none;
		background-color: #323232;
		color: white;
		border-radius: 10px;
		margin-top: 3px;
		margin-left: 0;
		padding: 0;
		text-align: center;
		font-weight: normal;
	}
	.propsItemSelect{
		position: relative;
		width: 90%;
		height:25px;
		background-color: #323232;
		color: white;
		border-radius: 10px;
		cursor: pointer;
		outline: none;
		border: none;
		transition: .2s;
	}
	.propsItemSelect:hover{
		background-color: var(--mainColorGrayBg2);
	}
	.checkItem{
		width: 90%;
		margin-left: 5%;
		height: 30px;
		display: flex;
	}
	.propsButton{
		width: 80%;
		margin-left: 10%;
		border-radius: 10px;
		height: 30px;
		background-color: var(--mainColorBlue2);
		color: white;
		cursor: pointer;
	}
	.showBord{
		border-radius: 20px;
		position: absolute;
		z-index:99999;
		top:10vh;
		left:10vw;
		background-color:#212121;
		width:70vw;
		height: 80vh;
		animation: showBord .5s;
		animation-fill-mode: forwards;
		animation-timing-function: var(--timingFunction1);
	}
	@keyframes showBord {
		from{
			opacity: 0;
			transform: translateY(500px);
		}to{
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>