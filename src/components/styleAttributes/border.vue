<template>
	<div class="qucikEditOut" @mouseup.stop="mouseUp" @mouseleave="mouseUp" id="radiusEdit" style="position:relative;height:auto;min-height:35px;" >
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;float: left;line-height: 45px;">描       边</pre>
		<!--展开-->
		<div @mousemove.stop="mouseMove" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: 2;background-color: transparent;cursor: e-resize;" v-if="mouseAction.down">
		</div>
	    <div style="float: right;width: 60%;position: relative;position: relative;height: 30px;;padding-bottom: 5px;margin-top: 5px;">
			<div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="!editMore" @click="setEditMore">
				<svg t="1662195973771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27253" style="margin-top: 10px;" width="15" height="15"><path d="M0.042667 749.792759v164.515811A110.075414 110.075414 0 0 0 109.691431 1023.957335h164.515812a54.867047 54.867047 0 1 0 0-109.648765H109.691431V749.792759a54.867047 54.867047 0 1 0-109.648764 0zM329.07429 54.867047A54.867047 54.867047 0 0 0 274.207243 0H109.691431A110.075414 110.075414 0 0 0 0.042667 109.648765v164.515811a54.867047 54.867047 0 1 0 109.648764 0V109.648765h164.515812a54.867047 54.867047 0 0 0 54.867047-54.781718z m365.894088 0c0 30.292071 24.574976 54.781717 54.867047 54.781718h164.515812v164.515811a54.867047 54.867047 0 0 0 109.648765 0V109.648765A110.075414 110.075414 0 0 0 914.351237 0H749.835425a54.867047 54.867047 0 0 0-54.867047 54.867047z m0 914.223241c0 30.292071 24.574976 54.867047 54.867047 54.867047h164.515812A110.075414 110.075414 0 0 0 1024.000002 914.30857V749.792759a54.867047 54.867047 0 1 0-109.648765 0v164.515811H749.835425a54.867047 54.867047 0 0 0-54.867047 54.781718z" p-id="27254" fill="#e6e6e6"></path><path d="M512.021334 261.36511A250.698888 250.698888 0 1 0 729.612268 387.397192a50.08858 50.08858 0 1 0-87.036374 49.83259A150.436398 150.436398 0 1 1 512.021334 361.542269a50.173909 50.173909 0 0 0 0-100.262489z" p-id="27255" fill="#e6e6e6"></path></svg>
			</div>
			<div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="editMore" @click="setEditMore">
				<svg t="1662196076352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28219" style="margin-top: 9px;" width="18" height="18"><path d="M384 128h-85.33v170.67H128V384h256zM896 384v-85.33H725.33V128H640v256zM725.33 725.33H896V640H640v256h85.33zM298.67 896H384V640H128v85.33h170.67z" p-id="28220" fill="#e6e6e6"></path></svg>
			</div>
	    </div>
		<div style="width: 100%;display: flex" v-if="!editMore">
			<!--统一设置-->
			<div  style="width: 20px;height: 30px;">
				<svg t="1662194454542" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14357" style="margin-top: 7px;" width="20" height="20"><path d="M512 256 448 256 448 192l64 0L512 256zM512 320 448 320l0 64 64 0L512 320zM512 448 448 448l0 64 64 0L512 448zM512 576 448 576l0 64 64 0L512 576zM512 704 448 704l0 64 64 0L512 704zM256 448 192 448l0 64 64 0L256 448zM384 448 320 448l0 64 64 0L384 448zM640 448 576 448l0 64 64 0L640 448zM768 448l-64 0 0 64 64 0L768 448zM832 128 128 128l0 704 704 0L832 128M832 64c35.392 0 64 28.608 64 64l0 704c0 35.392-28.608 64-64 64L128 896c-35.328 0-64-28.608-64-64L64 128c0-35.392 28.672-64 64-64L832 64 832 64z" p-id="14358" fill="#e6e6e6"></path></svg>
			</div>
			<div style="display: flex;width: 35%;margin-left: 5%;height: 25px;background-color: var(--mainColorGrayBg2);border-radius: 10px;margin-top: 5px;clear: both;">
				<div @mousedown.stop="startDown($event,-1)" style="width: 20px;height: 30px;margin-left: 5px;cursor:e-resize;">
					<svg t="1662192643447" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13381" style="margin-top: 2px;" width="20" height="20"><path d="M128 725.333333h768v-85.333333H128v85.333333z m0 128h768v-42.666666H128v42.666666z m0-298.666666h768v-128H128v128zM128 170.666667v170.666666h768V170.666667H128z" p-id="13382" fill="#e6e6e6"></path></svg>
				</div>
				<input placeholder="1" @input="inputWidth(-1)" v-model="realValue.width" style="width: 30px;height: 20px;margin-top: 2px;line-height: 25px;background-color: transparent;color: var(--mainTextColor1);text-align: center;outline: none;border: none;"/>
			</div>
			
			<!--color-->
			<div style="width: 50px;margin-left: 8px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 10px;background-color: var(--mainColorGrayBg2);margin-top: 5px;margin-right: 0px;" class="filterTypeButton">
				<button @click="callColorBord(realValue.color)" style="padding: 0;height: 20px;width: 20px;border: 1px solid white;border-radius: 5px;margin-top:2px;margin-left:0px" :style="{backgroundColor:`${realValue.color}`}" ></button>
			</div>
			<!--style-->
			<div @click="callFilterSelect" style="width: 30px;margin-left: 8px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 5px;margin-top: 5px;margin-right: 0px;" class="filterTypeButton">
				<svg t="1662194511909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15331" style="float: left;margin-top: 0px;margin-left: 5px;" width="20" height="28"><path d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z" p-id="15332" fill="#e6e6e6"></path><path d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z" p-id="15333" fill="#e6e6e6"></path><path d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z" p-id="15334" fill="#e6e6e6"></path></svg>
			</div>
					</div>
		<div style="width: 100%;" v-if="editMore">
			<div style="width: 100%;display: flex" v-for="(borderItem,index) in borderNameList" :key="index">
				<div style="width: 20px;height: 30px;">
						<svg v-if="index==0" t="1662195534809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16714"  style="margin-top: 7px;" width="20" height="20"><path d="M512 256 448 256 448 192l64 0L512 256zM512 320 448 320l0 64 64 0L512 320zM512 448 448 448l0 64 64 0L512 448zM512 576 448 576l0 64 64 0L512 576zM512 704 448 704l0 64 64 0L512 704zM128 192 64 192l0 64 64 0L128 192zM128 320 64 320l0 64 64 0L128 320zM128 448 64 448l0 64 64 0L128 448zM128 576 64 576l0 64 64 0L128 576zM128 704 64 704l0 64 64 0L128 704zM896 192l-64 0 0 64 64 0L896 192zM896 320l-64 0 0 64 64 0L896 320zM896 448l-64 0 0 64 64 0L896 448zM896 576l-64 0 0 64 64 0L896 576zM896 704l-64 0 0 64 64 0L896 704zM256 448 192 448l0 64 64 0L256 448zM384 448 320 448l0 64 64 0L384 448zM640 448 576 448l0 64 64 0L640 448zM768 448l-64 0 0 64 64 0L768 448zM512 832 448 832l0 64 64 0L512 832zM128 832 64 832l0 64 64 0L128 832zM896 832l-64 0 0 64 64 0L896 832zM256 832 192 832l0 64 64 0L256 832zM384 832 320 832l0 64 64 0L384 832zM640 832 576 832l0 64 64 0L640 832zM768 832l-64 0 0 64 64 0L768 832zM896 64 64 64l0 64 832 0L896 64z" p-id="16715" fill="#e6e6e6"></path></svg>
						<svg v-if="index==1" t="1662195572160" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16917" style="margin-top: 7px;" width="20" height="20"><path d="M704 512 704 448l64 0 0 64L704 512zM640 512 640 448 576 448l0 64L640 512zM512 512 512 448 448 448l0 64L512 512zM384 512 384 448 320 448l0 64L384 512zM256 512 256 448 192 448l0 64L256 512zM768 128 768 64l-64 0 0 64L768 128zM640 128 640 64 576 64l0 64L640 128zM512 128 512 64 448 64l0 64L512 128zM384 128 384 64 320 64l0 64L384 128zM256 128 256 64 192 64l0 64L256 128zM768 896l0-64-64 0 0 64L768 896zM640 896l0-64L576 832l0 64L640 896zM512 896l0-64L448 832l0 64L512 896zM384 896l0-64L320 832l0 64L384 896zM256 896l0-64L192 832l0 64L256 896zM512 256 512 192 448 192l0 64L512 256zM512 384 512 320 448 320l0 64L512 384zM512 640 512 576 448 576l0 64L512 640zM512 768l0-64L448 704l0 64L512 768zM128 512 128 448 64 448l0 64L128 512zM128 128 128 64 64 64l0 64L128 128zM128 896l0-64L64 832l0 64L128 896zM128 256 128 192 64 192l0 64L128 256zM128 384 128 320 64 320l0 64L128 384zM128 640 128 576 64 576l0 64L128 640zM128 768l0-64L64 704l0 64L128 768zM896 896 896 64l-64 0 0 832L896 896z" p-id="16918" fill="#e6e6e6"></path></svg>
						<svg v-if="index==2" t="1662195601522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17120" style="margin-top: 7px;" width="20" height="20"><path d="M512 704 448 704l0 64 64 0L512 704zM512 640 448 640 448 576l64 0L512 640zM512 512 448 512 448 448l64 0L512 512zM512 384 448 384 448 320l64 0L512 384zM512 256 448 256 448 192l64 0L512 256zM128 768 64 768l0-64 64 0L128 768zM128 640 64 640 64 576l64 0L128 640zM128 512 64 512 64 448l64 0L128 512zM128 384 64 384 64 320l64 0L128 384zM128 256 64 256 64 192l64 0L128 256zM896 768l-64 0 0-64 64 0L896 768zM896 640l-64 0L832 576l64 0L896 640zM896 512l-64 0L832 448l64 0L896 512zM896 384l-64 0L832 320l64 0L896 384zM896 256l-64 0L832 192l64 0L896 256zM256 512 192 512 192 448l64 0L256 512zM384 512 320 512 320 448l64 0L384 512zM640 512 576 512 576 448l64 0L640 512zM768 512l-64 0L704 448l64 0L768 512zM512 128 448 128 448 64l64 0L512 128zM128 128 64 128 64 64l64 0L128 128zM896 128l-64 0L832 64l64 0L896 128zM256 128 192 128 192 64l64 0L256 128zM384 128 320 128 320 64l64 0L384 128zM640 128 576 128 576 64l64 0L640 128zM768 128l-64 0L704 64l64 0L768 128zM896 896 64 896l0-64 832 0L896 896z" p-id="17121" fill="#e6e6e6"></path></svg>
						<svg v-if="index==3" t="1662195640614" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17323" style="margin-top: 7px;" width="20" height="20"><path d="M256 512 256 448 192 448l0 64L256 512zM320 512 320 448l64 0 0 64L320 512zM448 512 448 448l64 0 0 64L448 512zM576 512 576 448l64 0 0 64L576 512zM704 512 704 448l64 0 0 64L704 512zM192 128 192 64l64 0 0 64L192 128zM320 128 320 64l64 0 0 64L320 128zM448 128 448 64l64 0 0 64L448 128zM576 128 576 64l64 0 0 64L576 128zM704 128 704 64l64 0 0 64L704 128zM192 896l0-64 64 0 0 64L192 896zM320 896l0-64 64 0 0 64L320 896zM448 896l0-64 64 0 0 64L448 896zM576 896l0-64 64 0 0 64L576 896zM704 896l0-64 64 0 0 64L704 896zM448 256 448 192l64 0 0 64L448 256zM448 384 448 320l64 0 0 64L448 384zM448 640 448 576l64 0 0 64L448 640zM448 768l0-64 64 0 0 64L448 768zM832 512 832 448l64 0 0 64L832 512zM832 128 832 64l64 0 0 64L832 128zM832 896l0-64 64 0 0 64L832 896zM832 256 832 192l64 0 0 64L832 256zM832 384 832 320l64 0 0 64L832 384zM832 640 832 576l64 0 0 64L832 640zM832 768l0-64 64 0 0 64L832 768zM64 896 64 64l64 0 0 832L64 896z" p-id="17324" fill="#e6e6e6"></path></svg>
				</div>
				<div style="display: flex;width: 35%;margin-left: 5%;height: 25px;background-color: var(--mainColorGrayBg2);border-radius: 10px;margin-top: 5px;clear: both;">
					<div @mousedown.stop="startDown($event,index)"  style="width: 20px;height: 30px;margin-left: 5px;cursor:e-resize;">
						<svg t="1662192643447" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13381" style="margin-top: 2px;" width="20" height="20"><path d="M128 725.333333h768v-85.333333H128v85.333333z m0 128h768v-42.666666H128v42.666666z m0-298.666666h768v-128H128v128zM128 170.666667v170.666666h768V170.666667H128z" p-id="13382" fill="#e6e6e6"></path></svg>
					</div>
					<input v-model="borderList[index].width" @focus="nowEditIndex=index" @input="inputWidth(index)" placeholder="1" style="width: 30px;height: 20px;margin-top: 2px;line-height: 25px;background-color: transparent;color: var(--mainTextColor1);text-align: center;outline: none;border: none;"/>
				</div>
				<!--color-->
				<div style="width: 50px;margin-left: 8px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 10px;background-color: var(--mainColorGrayBg2);margin-top: 5px;margin-right: 0px;" class="filterTypeButton">
					<button @click="callColorBord(borderList[index].color,index)" style="padding: 0;height: 20px;width: 20px;border: 1px solid white;border-radius: 5px;margin-top:2px;margin-left:0px" :style="{backgroundColor:`${borderList[index].color}`}" ></button>
				</div>
				<!--style-->
				<div @click="callFilterSelect($event,index)" style="width: 30px;margin-left: 8px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 5px;margin-top: 5px;margin-right: 0px;" class="filterTypeButton">
					<svg t="1662194511909" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15331" style="float: left;margin-top: 0px;margin-left: 5px;" width="20" height="28"><path d="M223.962372 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S276.942718 607.897867 223.962372 607.897867z" p-id="15332" fill="#e6e6e6"></path><path d="M511.913993 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S564.894339 607.897867 511.913993 607.897867z" p-id="15333" fill="#e6e6e6"></path><path d="M800.037628 607.897867c-52.980346 0-95.983874-43.003528-95.983874-95.983874s43.003528-95.983874 95.983874-95.983874 95.983874 43.003528 95.983874 95.983874S852.84596 607.897867 800.037628 607.897867z" p-id="15334" fill="#e6e6e6"></path></svg>
				</div>
			</div>
		</div>
		<selectListT @change="setFilterType" ref="selectFilterType" v-if="showFilterSelect" :selected="selected" :list="Object.keys(filterList)" @close="showFilterSelect=false"   style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'60px'"></selectListT>
		
		<!--分割线-->
		<div style="border-bottom: 1px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;margin-top: 5px;"></div>
		<teleport to="body" v-if="showColorBord">
			<colorBord id="fontColorChose" @closeColorBord='showColorBord=false' :immediate="true" :pre="color" style="position: fixed;right:230px;top:45vh;border-radius: 10px;overflow: hidden;box-shadow: -5px 5px 15px rgba(0,0,0,0.25);" @colorSet="colorSet"></colorBord>
		</teleport>
	</div>
</template>

<script>
	/* width | style | color */
	import selectListT from "../microTools/select2.vue"
	import colorBord from "../microTools/color.vue"
	export default{
		name:"border",
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
			colorBord
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
				
				thisUnit:"px",
				realData:this.dataValue,//原数据对象,
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
				nowEditIndex:0
			}
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					if( Object.prototype.toString.call(val)=='[object Object]'){
						
						
						if(this.remountedTimeout!=null)
							clearTimeout(this.remountedTimeout)
						this.remountedTimeout=setTimeout(()=>{
							this.childrenData_edit=JSON.parse(JSON.stringify(val))
							try{
								this.realValue={
									width:this.childrenData_edit.value.width || 0,
									color:this.childrenData_edit.value.color || '#ffffff',
									style:this.childrenData_edit.value.style || "solid"
								}
							}catch{}
							
							try{
								if(val.value==null){
									this.editMore=true
									let index=0
									this.borderList[0]=this.childrenData_edit.children['borderTop'].value
									this.borderList[1]=this.childrenData_edit.children['borderRight'].value
									this.borderList[2]=this.childrenData_edit.children['borderBottom'].value
									this.borderList[3]=this.childrenData_edit.children['borderLeft'].value

								}else{
									this.editMore=false
									if(val.value==''){
										this.realValue={
											width:1,
											style:"solid",
											color:"#ffffff"
										}
										
									}else if(val.val!=null){
										this.realValue=this.childrenData_edit.value
										
									}
									
								}
							}catch(e){
								console.error(e)
								this.editMore=false
								this.realValue={
									"color":"#ffffff",
									width:"1",
									style:"solid"
								}
							}
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
		computed:{
		},
		mounted(){
			this.emitProcess()
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
			requestVar:function(e,name){//请求绑定变量
			    this.$emit("requestVar",e,"margin.children."+name,this.childrenData_edit.children[name].condition)
			},
			callFilterSelect:function(e,index){
				this.nowEditIndex=index
				
				
				if(this.editMore) this.selected=this.styleToText[this.borderList[this.nowEditIndex].style]
				else this.selected=this.styleToText[this.realValue.style]
				
				this.showFilterSelect=true
				this.$nextTick(()=>{
					if(screen.height-e.clientY<400){
						this.$refs['selectFilterType'].setSpread({clientX:e.clientX,clientY:screen.height-450})
					}else{
						this.$refs['selectFilterType'].setSpread(e)
					}
				})
			},
			//设置边框style类型
			setFilterType:function(index){
				let mixIndex=Object.keys(this.filterList)[index.index]
				
				this.selected=mixIndex
				if(this.editMore){
					this.borderList[this.nowEditIndex].style=this.filterList[mixIndex]
				}else{
					this.realValue.style=this.filterList[mixIndex]
				}
				
				this.setted=true
				this.set()
			},
			colorSet:function(color){
				if(this.editMore){
					this.borderList[this.nowEditIndex].color=color
				}else{
					try{
						this.realValue.color=color
					}catch{
						this.realValue={
							color:color
						}
					}
					
				}
				this.setted=true
				this.set()
			},
			callColorBord:function(color,index){
				this.nowEditIndex=index
				/*let hex=(255*this.effectList[this.nowEditIndex].data['alpha'].split("%")[0]*1/100).toFixed(0)*1
				this.alpha=hex.toString(16)*/
				this.color=color
				this.showColorBord=true
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
				if(name=='border'){
					this.$emit("requestVar",e,"border",this.childrenData_edit.condition)
				}else{
					this.$emit("requestVar",e,"border.children."+name,this.childrenData_edit.children[name].condition)
				}
			},
		}
	}
</script>

<style scoped>
@import url(./css/border.css);
</style>