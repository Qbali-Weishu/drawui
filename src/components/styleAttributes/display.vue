<template>
	<div id="displayEdit"  style="position:relative;height:auto;min-height:35px;" :style="{'height':`${height}`}">
		<pre style="color: var(--mainTextColor1);line-height: 35px;">显示类型</pre>
		<!--选择列表-->
		<teleport to="body" v-if="showList">
			<div id="displayList" >
				<div class="displayListItem"  v-for="(item,index) in Object.keys(disList)" :key="index"  >
					<div class="displayListItemInner" :style="{backgroundColor:`${realData==item?'var(--mainColorBlue2)':'transparent'}`}" :data-dis="item" @click="set">{{disList[item]}}</div>
				</div>
				<h4 style="width: 20%;line-height: 30px;height: 30px;margin:0;float: left;padding: 0;margin-left: 10px;color:white;font-size: 13px;font-weight:400">自定义</h4>
				<input style="border:1px solid var(--mainColorGray2);float: left;width: 60%;margin-left: 10px;height:30px;outline:none;text-align: center;color:var(--mainColorGray2);border-radius: 15px;box-shadow: -2px 2px 10px var(--mainColorGray3);" v-model="realData"/>
			</div>
		</teleport>
		<!--选择列表-->
		<div @click="show" style="overflow: hidden;cursor: pointer;;position:relative;margin-right:20px;float:right;width:50%;height:30px;background-color:transparent;border-radius:10px;">
			<button id="drawUISetDisplay" style="background-color: transparent;text-align: center;width: 100%;font-weight: normal;">{{disList[realData]}}</button>
			<button style="position:absolute;left:0;height:30px;border-radius:10px;background-color:white;width:calc(100% - 40px)"  v-if="realDataContion" >{{realDataContion}}</button>
		    <button class="styleBindVar" style=";position:absolute;right:-20px" :data-attribute="bindName" @click="requestVar('display')">{ }</button>
		</div>
		<!--flex布局子项选择-->
		<div v-if="realData=='flex'" class="flexCss" style="overflow: scroll;width:100%;">
			<div class="flexItemOut" v-for="(outItem,outIndex) in Object.keys(flexList)" :key="outIndex"><!--属性名outItem flexDirection等-->
				<button style="float:left;margin:0;padding:0;height:30px;width:55px;font-size:13px;backgroundColor:transparent;color:var(--mainTextColor1);font-weight:normal;margin-left:20px;text-align:left">{{flexList[outItem].name}}</button><br>
				<div style="display: flex;width:100%;height:30px;justify-content: center;">
					<!--,border:`${childrenData_edit[outItem].value==innerItem.value ?'1px solid black':'none'}`-->
					<button class="flexItem" :style="{backgroundImage:`url(${innerItem.icon})`,border:`${childrenData_edit.children[outItem].value==innerItem.value ?'3px solid rgb(128,128,128)':'none'}`}" v-for="(innerItem,innerIndex) in flexList[outItem].list" :data-flexitem="outItem+'|'+innerItem.value"  @click="setFlexItem"><!--值名innerItem.value-->
						<div style="position: absolute;display:inline-block" class="showText" >
							{{innerItem.text}}
						</div>
					</button>
				</div>
			</div>
		</div>
		<!--flex布局子项选择-->
	</div>	
</template>
<script>
	import { structStore } from "../../store/struct.js";
	export default{
		name:"display",
		props:{
		    dataValue:{
		        default:"inline"
		    }
		},
		data(){
			return{
				showList:false,
				disList:
					{
						"":"空值",
						"flex":		   "[flex]		弹性布局",
						"inline-block":"[inline-block]  行内块级",
						"block":	   "[block] 	    块级元素",
						"none":	   	   "[none] 	        隐藏",
						/*"inline":	   "[inline] 	    内联元素",*/
						"list-item":   "[list-item] 	以列表显示",
						"run-in":	   "[run-in] 		根据上下文确定",
						"table":	   "[table] 		表格显示",
						"inherit":	   "[inherit] 		继承"
					},
				flexList:{
					"flexDirection":{
						name:"主轴方向",
						list:[
							{value:"row",text:"行向",icon:require('../../assets/icons/flex/flexDirectionRow.png')},
							{value:"column",text:"列向",icon:require('../../assets/icons/flex/flexDirectionColumn.png')},
							{value:"row-reverse",text:"行向反向",icon:require('../../assets/icons/flex/flexDirectionRowReverse.png')},
							{value:"column-reverse",text:"列向反向",icon:require('../../assets/icons/flex/flexDirectionColumnReverse.png')
							}]},
					"flexWrap":{
						name:"换行",
						list:[
							{value:"nowrap",text:"不换行",icon:require('../../assets/icons/flex/flexWrapNoWrap.png')},
							{value:"wrap",text:"自动换行",icon:require('../../assets/icons/flex/flexWrapWrap.png')},
							]},
					"alignContent":{
						name:'垂直对齐',
						list:[
							{value:"center",text:"居中",icon:require('../../assets/icons/flex/alignContentCenter.png')},
							{value:"flex-start",text:"顶端对齐",icon:require('../../assets/icons/flex/alignContentFlexStart.png')},
							{value:"flex-end",text:"底端对齐",icon:require('../../assets/icons/flex/alignContentFlexEnd.png')},
							{value:"space-around",text:"外部同间隔",icon:require('../../assets/icons/flex/alignContentSpaceAround.png')},
							{value:"space-between",text:"首尾顺序",icon:require('../../assets/icons/flex/alignContentSpaceBetween.png')},
							{value:"stretch",text:"铺满",icon:require('../../assets/icons/flex/alignContentStretch.png')}]},
					"justifyContent":{
						name:'水平对齐',
						list:[
							{value:"center",text:"居中",icon:require('../../assets/icons/flex/justifyContentCenter.png')},
							{value:"flex-start",text:"首端对齐",icon:require('../../assets/icons/flex/justifyContentFlexStart.png')},
							{value:"flex-end",text:"尾端对齐",icon:require('../../assets/icons/flex/justifyContentFlexEnd.png')},
							{value:"space-between",text:"首尾顺序",icon:require('../../assets/icons/flex/justifyContentSpaceBetween.png')},
							{value:"space-around",text:"外部同间隔",icon:require('../../assets/icons/flex/justifyContentSpaceAround.png')},
							{value:"space-evenly",text:"元素同间隔",icon:require('../../assets/icons/flex/justifyContentSpaceEvenly.png')},
							]},
					"alignItems":{
						name:'子项对齐',
						list:[
							{value:"center",text:"居中",icon:require('../../assets/icons/flex/alignItemCenter.png')},
							{value:"flex-start",text:"顶端对齐",icon:require('../../assets/icons/flex/alignItemFlexStart.png')},
							{value:"flex-end",text:"底端对齐",icon:require('../../assets/icons/flex/alignItemFlexEnd.png')},
							{value:"stretch",text:"铺满",icon:require('../../assets/icons/flex/alignItemStretch.png')},
							{value:"baseline",text:"文字基线对齐",icon:require('../../assets/icons/flex/alignItemBaseline.png')}]}
				},
				setData:"",
				thisUnit:"px",
				enterValue:"",//传入的参数
				targetDom:null,//要被修改的dom对象
				realData:this.dataValue.value,//原数据对象
				realDataContion:null,
				isSameValue:true,
				setStyleTimeout:null,
				spreadEdit:false,//是否展开
				height:"35px",
				spreadRotate:0,
				spreadChange:false,
				store:null,
				bindName:null,//请求变量绑定的组件名称
				childrenData_edit:{						
						"flexDirection":{value:""},
						"flexWrap":{value:""},
						"alignContent":{value:""},
						"justifyContent":{value:""},
						"alignItems":{value:""},},
				setted:false
				
			}
		},
		computed:{
		    VARLIST(){
		        this.store=structStore()
		        return this.store.VARLIST
		    }
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					this.setted=false
					if(Object.prototype.toString.call(val) =='[object Object]'){
						try{
							this.childrenData_edit=JSON.parse(JSON.stringify(val))
							this.realData=val.value
						}catch(e){
							console.error(e)
						}
						
					}
					
		        },
		        immediate:true,
		        deep:true
		    },
		    realData:{
		        handler:function(val){
					if(this.realData=="flex"){//为弹性布局时显示选项
						this.height="210px"}
					else{
						this.height="35px"
					}
		            /*if(this.setStyleTimeout!=null){
		                clearTimeout(this.setStyleTimeout)
		            }
		            this.setStyleTimeout=setTimeout(()=>{
						try{
							this.set()
						}catch{}
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
		                    if(bind!=null && bind.startsWith("$")){
		                        bind=bind.replace("$","")
		                    }
		                    if(this.realDataContion!=null)//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
		                        this.realData=this.store.VARLIST[this.realDataContion.replace("$","")].value
		                }
					}
		        },
		        immediate:true,
		        deep:true
		    }
		},
		mounted(){
			this.emitProcess()
			if(document.getElementById("displayList"))
				document.getElementById("displayList").style.right=document.getElementById("quickEditDom").style.right
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					setTimeout(()=>{
						let temp={
							value:this.realData,
							children:{},
							group:true
						}
						for(let key in this.childrenData_edit.children){
							temp.children[key]=this.childrenData_edit.children[key]
						}
						this.$emit("preProcess",'display',temp)
					},200)
					
				}
				this.$emit("emitPreFun",'display',callBack)
			},
			show:function(){
				this.showList=!this.showList
				if(this.showList){
					this.$emit("addOtherOpen","displayList")
				}
				this.$nextTick(()=>{
					if(document.getElementById("displayList"))
						document.getElementById("displayList").style.right=document.getElementById("quickEditDom").style.right
				})
			},
			set:function(emit=true){
				this.setted=true
				this.showList=false
				if(e){
					let dis=e.target.dataset.dis
					this.realData=dis
					console.log(this.realData)
				}
				/*
					更改childrenData_edit格式
				*/
				this.childrenData_edit.value=this.realData
				if(emit)
					this.$emit("set","display",this.childrenData_edit,this.childrenData_edit,()=>{return true},this.setted)
			},
			setFlexItem:function(e){//设置flex布局的显示内容
				this.setted=true
				let data=e.target.dataset.flexitem
				let varName=data.split("|")[0]
				let varValue=data.split("|")[1]
				if(this.childrenData_edit.children[varName].value==varValue){//取消
					varValue=""//设置值为空
				}
				this.childrenData_edit.children[varName].value=varValue
				
				/*
					更改childrenData_edit格式
				*/
				this.$emit("set","display",this.childrenData_edit,()=>{return true},this.setted)//varName,varValue)
				this.setted=false
				this.$nextTick(()=>{
					this.realData="flex"
				})
			}
		}
	}
</script>

<style>
	@import url(./css/display.css);
</style>