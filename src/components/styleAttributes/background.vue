<template>
	<div id="fontEdit" style="position:relative;height:auto;min-height:35px;transition: .15s;overflow: hidden;-webkit-overflow-scrolling: touch;width: 90%;margin-left: 5%;"
		:style="{'height':`${height}`}">
		<div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="!spreadEdit" @click="spread">
			<svg t="1662195973771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27253" style="margin-top: 10px;" width="15" height="15"><path d="M0.042667 749.792759v164.515811A110.075414 110.075414 0 0 0 109.691431 1023.957335h164.515812a54.867047 54.867047 0 1 0 0-109.648765H109.691431V749.792759a54.867047 54.867047 0 1 0-109.648764 0zM329.07429 54.867047A54.867047 54.867047 0 0 0 274.207243 0H109.691431A110.075414 110.075414 0 0 0 0.042667 109.648765v164.515811a54.867047 54.867047 0 1 0 109.648764 0V109.648765h164.515812a54.867047 54.867047 0 0 0 54.867047-54.781718z m365.894088 0c0 30.292071 24.574976 54.781717 54.867047 54.781718h164.515812v164.515811a54.867047 54.867047 0 0 0 109.648765 0V109.648765A110.075414 110.075414 0 0 0 914.351237 0H749.835425a54.867047 54.867047 0 0 0-54.867047 54.867047z m0 914.223241c0 30.292071 24.574976 54.867047 54.867047 54.867047h164.515812A110.075414 110.075414 0 0 0 1024.000002 914.30857V749.792759a54.867047 54.867047 0 1 0-109.648765 0v164.515811H749.835425a54.867047 54.867047 0 0 0-54.867047 54.781718z" p-id="27254" fill="#e6e6e6"></path><path d="M512.021334 261.36511A250.698888 250.698888 0 1 0 729.612268 387.397192a50.08858 50.08858 0 1 0-87.036374 49.83259A150.436398 150.436398 0 1 1 512.021334 361.542269a50.173909 50.173909 0 0 0 0-100.262489z" p-id="27255" fill="#e6e6e6"></path></svg>
		</div>
		<div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-else @click="spread">
			<svg t="1662196076352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28219" style="margin-top: 9px;" width="18" height="18"><path d="M384 128h-85.33v170.67H128V384h256zM896 384v-85.33H725.33V128H640v256zM725.33 725.33H896V640H640v256h85.33zM298.67 896H384V640H128v85.33h170.67z" p-id="28220" fill="#e6e6e6"></path></svg>
		</div>
		
		<pre style="color: var(--mainTextColor1);margin-left: 0;">背       景</pre>
		<div style="clear: both;"></div>
		<div v-show="spreadEdit" style="width: 100%;position: relative;overflow-y: scroll;height: 210px;">
		<!--背景颜色-->
		<div  style="position:absolute;left:50%;transform:translateX(-50%);width:96%;" >
			<div class="fontEditMain" 
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip" style="z-index: 99;">背景颜色</div>
					<svg t="1650792788667" class="icon" viewBox="0 0 1024 1024" style="margin-top: 8px;" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="7392" width="65%" height="65%">
						<path
							d="M512 978.3296a466.432 466.432 0 0 1-465.92-465.92A479.5904 479.5904 0 0 1 198.0416 163.84C286.72 80.4352 399.36 38.912 514.6624 46.592c137.6768 9.1648 152.4224 98.8672 163.2256 164.352 6.2464 37.7856 12.1344 73.4208 37.12 98.4064s62.7712 32.4608 102.4 39.8336c66.56 12.3904 157.8496 29.3888 160.6656 162.3552a449.1776 449.1776 0 0 1-128.4608 326.4512A474.1632 474.1632 0 0 1 512 978.3296zM487.7312 127.5904c-84.8896 0-167.168 33.5872-233.728 95.8464A397.4144 397.4144 0 0 0 128 512.4096a384.4608 384.4608 0 0 0 384 384 391.9872 391.9872 0 0 0 278.9376-115.712A367.9744 367.9744 0 0 0 896 513.28c-1.3312-63.3344-23.6032-70.5024-93.7472-83.5584-45.312-8.448-101.6832-18.944-145.152-62.4128S604.16 268.544 597.0944 224.3072c-10.6496-64.4608-15.0528-91.136-87.8592-96-7.168-0.3072-14.336-0.7168-21.504-0.7168z"
							p-id="7393" fill="#8a8a8a"></path>
						<path d="M424.9088 317.8496m-87.04 0a87.04 87.04 0 1 0 174.08 0 87.04 87.04 0 1 0-174.08 0Z"
							fill="#8a8a8a" p-id="7394"></path>
						<path d="M299.4688 520.0896m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#8a8a8a"
							p-id="7395"></path>
						<path d="M406.9888 699.2896m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#8a8a8a"
							p-id="7396"></path>
					</svg>
				</div>
				<div
					style="position: relative;width: 65%;height: 35px;background-color: transparent;margin-left: 10px;border: 1px solid var(--mainColorGray2);border-radius: 10px;line-height: 35px;color: var(--mainColorGray2);">
					<button id="drawUISetBackground" style="position:absolute;left:25px;height:35px;border-radius:10px;background-color:white;width:calc(100% - 40px)"   v-if="childrenData_edit.children['backgroundColor'].condition"></button><!--v-if="childrenData_edit.children['color'].condition"-->
					<button @click="showColorBord=!showColorBord" style="padding: 0;height: 20px;width: 20px;border: 1px solid var(--mainColorGray2);position: absolute;left: 5px;top:7px;border-radius: 5px;" :style="{backgroundColor:`${childrenData_edit.children['backgroundColor'].value =='' ? '#ffffff' : childrenData_edit.children['backgroundColor'].value}`}"></button><!--:style="{backgroundColor:`${childrenData_edit['color'].value =='' ? '#000' : childrenData_edit['color'].value}`}"-->
					<input @click="showColorBord=false"  placeholder="#ffffff" style="margin-left: 25px;font-size: 100%;width: 80%;height: 30px;outline: none;border-radius: 10px;border: none;background-color: transparent;text-align: center;font-weight: bold;color: white" v-model="childrenData_edit.children['backgroundColor'].value" /><!-- v-model="childrenData_edit['color'].value-->
				</div>
				<!--变量绑定按钮-->
				<button class="styleBindVar" style=";position:absolute;right:-5px;height:35px" :data-attribute="bindName" @click="requestVar('color')">{ }</button>
				<!--变量绑定按钮-->
				<teleport to="body" v-if="showColorBord">
					<colorBord id="fontColorChose" @closeColorBord='showColorBord=false' :immediate="true" :pre="childrenData_edit.children['backgroundColor'].value" style="position: fixed;right:230px;top:45vh;z-index: 99;border-radius: 10px;overflow: hidden;box-shadow: -5px 5px 15px rgba(0,0,0,0.25);" @colorSet="colorSet"></colorBord>
				</teleport>
			</div>
			<!--背景图片-->
			<div class="fontEditMain"
				style="position: relative;display: flex;width: 96%;background-color: transparent;margin-left: 2%;"
				:style="{'height':`${backgroundImageList.length ==0 ? '40px' : '160px'}`}"
				>
				
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip" style="z-index: 99;">背景图片</div>
					<svg t="1651157545302" class="icon" viewBox="0 0 1024 1024" style="margin-top: 5px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1946" width="65%" height="65%">
						<path d="M778.24 947.2H143.36c-53.248 0-96.256-43.008-96.256-96.256V275.456c0-53.248 43.008-96.256 96.256-96.256h634.88c53.248 0 96.256 43.008 96.256 96.256v575.488c0 53.248-43.008 96.256-96.256 96.256z m-634.88-706.56c-19.456 0-34.816 15.36-34.816 34.816v575.488c0 19.456 15.36 34.816 34.816 34.816h634.88c19.456 0 34.816-15.36 34.816-34.816V275.456c0-19.456-15.36-34.816-34.816-34.816H143.36z" p-id="1947" fill="#8a8a8a"></path>
						<path d="M946.176 844.8c-17.408 0-30.72-13.312-30.72-30.72V244.736c0-58.368-48.128-106.496-106.496-106.496H180.224c-17.408 0-30.72-13.312-30.72-30.72s13.312-30.72 30.72-30.72H808.96c93.184 0 167.936 75.776 167.936 167.936v569.344c0 17.408-13.312 30.72-30.72 30.72z" p-id="1948" fill="#8a8a8a"></path>
						<path d="M77.824 834.56c-11.264 0-21.504-6.144-26.624-16.384-8.192-15.36-2.048-33.792 12.288-41.984l512-276.48c12.288-7.168 27.648-4.096 36.864 6.144L739.328 645.12c11.264 12.288 10.24 31.744-2.048 43.008s-31.744 10.24-43.008-2.048L583.68 565.248 92.16 830.464c-4.096 3.072-9.216 4.096-14.336 4.096zM287.744 547.84c-53.248 0-97.28-44.032-97.28-97.28s44.032-97.28 97.28-97.28 97.28 44.032 97.28 97.28-44.032 97.28-97.28 97.28z m0-133.12c-19.456 0-35.84 16.384-35.84 35.84s16.384 35.84 35.84 35.84 35.84-16.384 35.84-35.84-16.384-35.84-35.84-35.84z" p-id="1949" fill="#8a8a8a"></path>
					</svg>
				</div>
				<!--变量绑定按钮-->
				<button style=";position:absolute;top:-5px;height:45px" :style="{right:`${selectedType==0 ? '-5px' :'5px'}`}" class="styleBindVar"  :data-attribute="bindName" @click="requestVar('color')">{ }</button>
				<!--变量绑定按钮-->
				<!--h4 v-if="backgroundImageList.length==0" style="font-weight: normal;width:70%;text-align:center;margin:0;padding:0;line-height:30px;color:var(--mainColorGray2)">点击右侧添加背景图片</h4-->
				<!--无图片时的添加按钮-->
				<button v-if="backgroundImageList.length==0" @click="showImageAdd" class="setImageButton" style="background-color: var(--mainColorBlue2);border-radius:10px;color:white;width:65%;height:35px;margin-left:10px">添加背景图</button>
				<!--有图片时的添加按钮-->
				<button v-if="backgroundImageList.length>0" @click="showImageAdd" style="position: absolute;right:15px;height: 25px;width: 25px;padding: 0;margin: 0;margin-left: 10px;margin-top: 2px;border-radius: 5px;font-size: 2em;color:var(--mainColorGray2);background-color: transparent;">+</button>

				<teleport to="body" v-if="showBackgroundImage">
					<backgroundImage v-if="showBackgroundImage" @seleteChange="setImageType"  @returnImage="returnImage" @cancle="cancle" @setPosition="setPosition" @setBlendMode="setBlend" id="backImageChose" ref="backImageChoseTool" :selectList="selectList" :position="childrenData_edit.children['backgroundPosition'].value" style="z-index: 999;position: absolute;right:225px;;width: 260px;background-color: white;border-radius: 10px;box-shadow:0px 0px 10px var(--mainColorGray4);transition:.2s;transform-origin:center"></backgroundImage>
				</teleport>
				<selectList v-if="backgroundImageList.length!=0" :toBody="true" :width="'100px'" :selected="backgroundImageList_show[selectedImage]" @change="selectChange" ref="selectList_image" :list="backgroundImageList_show" style="margin: 0;margin-left:45px;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position:absolute;left:0;top:5px;width:55%"></selectList>
				<!--被选中图片展示-->
			
				<div v-if="backgroundImageList.length!=0" id="showForImage" style="background-repeat:no-repeat;background-position:center;height: 120px;background-size:contain;width:65%;background-color:var(--mainColorGray);border-radius:10px;position:absolute;top:35px;left:45px" >
					<div style="position: absolute;height:100%;width:35px;right:-35px;top:0;background-color:transparent;display:flex;flex-direction:column">
						<button class="showForImageButton" @click="editNowBackImage">
							<svg t="1656572814972" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6097" width="18" height="18" style="margin-left: 0px;">
								<path d="M835.368421 458.105263c0-21.557895 18.863158-40.421053 40.421053-40.421052s40.421053 18.863158 40.421052 40.421052v323.368421c0 88.926316-72.757895 161.684211-161.68421 161.684211H215.578947c-88.926316 0-161.684211-72.757895-161.68421-161.684211V242.526316c0-88.926316 72.757895-161.684211 161.68421-161.684211h538.947369c21.557895 0 40.421053 18.863158 40.421052 40.421053S776.084211 161.684211 754.526316 161.684211H215.578947C169.768421 161.684211 134.736842 196.715789 134.736842 242.526316v538.947368c0 45.810526 35.031579 80.842105 80.842105 80.842105h538.947369c45.810526 0 80.842105-35.031579 80.842105-80.842105V458.105263z" fill="#8a8a8a" p-id="6098"></path>
								<path d="M417.684211 727.578947c-10.778947 0-21.557895-2.694737-29.642106-10.778947-16.168421-16.168421-16.168421-40.421053 0-56.589474l512-512c8.084211-10.778947 18.863158-13.473684 29.642106-13.473684 10.778947 0 21.557895 2.694737 29.642105 10.778947 16.168421 16.168421 16.168421 40.421053 0 56.589474l-512 512c-10.778947 10.778947-18.863158 13.473684-29.642105 13.473684z" fill="#8a8a8a" p-id="6099"></path>
								</svg>
						</button>
						<button class="showForImageButton" style="margin-top:10%" @click="removeBackImage">
							<svg t="1656572697259" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3703"  width="18" height="18" style="margin-left: 0px;">
								<path d="M512 64c60.5 0 119.2 11.8 174.4 35.2 53.3 22.6 101.3 54.9 142.4 96 41.2 41.2 73.5 89.1 96 142.4C948.2 392.8 960 451.5 960 512s-11.8 119.2-35.2 174.4c-22.6 53.3-54.9 101.3-96 142.4-41.2 41.2-89.1 73.5-142.4 96C631.2 948.2 572.5 960 512 960s-119.2-11.8-174.4-35.2c-53.3-22.6-101.3-54.9-142.4-96-41.2-41.2-73.5-89.1-96-142.4C75.8 631.2 64 572.5 64 512s11.8-119.2 35.2-174.4c22.6-53.3 54.9-101.3 96-142.4s89.1-73.5 142.4-96C392.8 75.8 451.5 64 512 64m0-64C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z" fill="#8a8a8a" p-id="3704"></path>
								<path d="M764 480H260c-17.6 0-32 14.4-32 32s14.4 32 32 32h504c17.6 0 32-14.4 32-32s-14.4-32-32-32z" fill="#8a8a8a" p-id="3705"></path>
								</svg>
						</button>
					</div>
				</div>
				
			</div>
			<!--重复方式-->
			<div class="fontEditMain"
				style="position: relative;display: flex;width: 96%;background-color: transparent;margin-left: 2%;margin-top:10px">
				<div class="tip" style="display: inline-block;width: 35px;height: 45px;background-color: transparent;">
					<div class="hideFontTip" style="z-index: 99;">图片重复</div>
					<svg t="1656505106351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1867" width="65%" height="65%">
						<path d="M742.4 281.6h-192v192h192V281.6z m-76.8 115.2h-38.4v-38.4h38.4v38.4zM742.4 550.4h-192v192h192v-192z m-76.8 115.2h-38.4v-38.4h38.4v38.4zM473.6 281.6H281.6v192h192V281.6zM396.8 396.8h-38.4v-38.4h38.4v38.4z" p-id="1868" fill="#8a8a8a"></path>
						<path d="M834.944 128H189.056A61.098667 61.098667 0 0 0 128 189.141333v645.717334c0 33.749333 27.306667 61.098667 61.056 61.141333h645.888A61.098667 61.098667 0 0 0 896 834.858667V189.141333c0-33.749333-27.306667-61.098667-61.056-61.141333zM819.2 819.2H204.8V208.64c2.304 4.693333 7.68 10.24 0-3.84h614.4v614.4z" p-id="1869" fill="#8a8a8a"></path>
						<path d="M473.6 550.4H281.6v192h192v-192z m-76.8 115.2h-38.4v-38.4h38.4v38.4z" p-id="1870" fill="#8a8a8a"></path>
					</svg>
				</div>
				<!--变量绑定按钮-->
				<button style=";position:absolute;top:-10px;height:45px" :style="{right:`${selectedType==0 ? '-5px' :'5px'}`}" class="styleBindVar"  :data-attribute="bindName" @click="requestVar('color')">{ }</button>
				<!--变量绑定按钮-->
				<selectList :toBody="true" :selected="repeat.selectList[repeat.selected]" ref="backRepeat" @change="selectChange_repeat" :list="repeat.selectList" style="margin: 0;margin-left:45px;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position:absolute;left:0;width:65%;top:0px;"></selectList>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import unit from "../microTools/unit.vue"
	import colorBord from "../microTools/color.vue"
	import backgroundImage from "../microTools/backgroundImage.vue"
	import selectList from "../microTools/select.vue"
	import StyleEngine from "../../engines/style.js"
	import {
		structStore
	} from "../../store/struct.js";
	export default{
		name:"background",
		props:{
		    dataValue:{
		        default:""
		    },
		    closeSpread:Boolean,
		    isGroup:{
				type:Boolean,
				default:false
			},//标记是否为组操作
		},
		components: {
			unit,
			colorBord,
			selectList,
			backgroundImage
		},
		data(){
			return {
				pushNew:true,//控制图片回传是新增还是修改
				selectList:['图片','线性渐变','径向渐变','旋转渐变',"线性重复",'径向重复','旋转重复'],
				showBackgroundImage:false,//用于控制图片选择器
				selectedType:0,//区分为图片还是渐变
				showColorBord:false,
				colorGet:"backgroundColor",
				backgroundImageList:[],//背景图片列表
				selectedImage:-1,//被选中展示的背景索引
				backgroundImageList_show:[],//背景显示列表，用于selectList
				backgroundSizeList:[],//背景图片大小列表
				backgroundClipList:[],//背景裁切列表
				backgroundAttachmentList:[],//背景滚动方式列表
				backgroundOriginList:[],//背景参考区域列表
				backgroundPositionList:[],//背景参考区域列表
				backgroundBlendModeList:[],//背景混合模式列表
				imageTypeList:[""],
				
				setData: "",
				thisUnit: "px",
				enterValue: "", //传入的参数
				targetDom: null, //要被修改的dom对象
				realData: this.dataValue.children, //原数据对象
				realDataContion: null,
				isSameValue: true,
				setStyleTimeout: null,
				spreadEdit: false, //是否展开
				height: "35px",
				spreadRotate: 0,
				spreadChange: false,
				store: null,
				bindName: null, //请求变量绑定的组件名称
				childrenData:this.dataValue.children ,
				repeat:{
					selectList:["继承",'默认','不重复',"重复","横向重复","竖向重复","还原","裁切","缩放"],
					selectStyle:['inherit','initial','no-repeat','repeat','repeat-x','repeat-y','revert','space','round'],
					selected:1
				},
				childrenData_group:{
					"backgroundColor":{value:"mix",unit:"",condition:null},
					"backgroundPosition":{value:"mix",unit:"",condition:null},/*多选*/
					"backgroundSize":{value:"mix",unit:"",condition:null},
					"backgroundRepeat":{value:"mix",unit:"",condition:null},
					"backgroundOrigin":{value:"mix",unit:"",condition:null},
					"backgroundClip":{value:"mix",unit:"",condition:null},
					"backgroundAttachment":{value:"mix",unit:"",condition:null},
					"backgroundImage":{value:"mix",unit:"",condition:null},/*多选*/ 
					"backgroundBlendMode":{value:"mix",unit:"",condition:null}/*多选*/ 
				},
				childrenData_edit: this.dataValue.children, //实际操作数据
				setTarget:"backgroundColor",//当前设置对象
				isSet:false,
				setted:false,
				setDtaValueTime:null,
				setTargte:[],//需要修改的属性名
				hasSetImage:false
			}
		},
		beforeMount(){
		},
		computed: {
			hideList() {
				return [this.showFontDecoration, this.showFontFamily, this.showFontStyle, this.showFontWeight]
			},
			VARLIST(){
			    this.store=structStore()
			    return this.store.VARLIST
			}
		},
		mounted:function(){
			this.emitProcess()
		},
		watch:{
			dataValue:{
				handler:function(val){
					this.setted=false
					this.hasSetImage=false
					this.isSet=!this.isGroup
					if(this.setDtaValueTime!=null)
					{
						clearTimeout(this.setDtaValueTime)
						
					}
					if(val.children){
						this.childrenData_edit=JSON.parse(JSON.stringify(val))
						let keys=["backgroundColor",
								"backgroundPosition",
								"backgroundSize",
								"backgroundRepeat",
								"backgroundOrigin",
								"backgroundClip",
								"backgroundAttachment",
								"backgroundImage",
								"backgroundBlendMode"],
							key=""
							//防止出现子属性不存在
						for(let i =0;i<keys.length;i++){
							key=keys[i]
							if(!this.childrenData_edit.children[key]) {
								this.childrenData_edit.children[key]=
								['backgroundColor','backgroundRepeat'].includes(key)
								?{
									value:"",
									conditon:{
										bindList:null,
										default:""
									}
								}
								:[]								
							}
						}
						let opeKeys=Object.keys(System.operatingNodes)
						if(opeKeys.length==1){
							let nodeKey=opeKeys[0].replace("$NODE:","")
							this.childrenData_edit.children['backgroundColor'].value=
							window.getComputedStyle(System.getElement(nodeKey)).backgroundColor
						}
						this.setDtaValueTime=setTimeout(()=>{
							this.backgroundImageList=[]
							this.backgroundImageList_show=[]
							if(this.isGroup){
								
								this.backgroundImageList=[]//背景图片列表
								this.selectedImage=-1//被选中展示的背景索引
								this.backgroundImageList_show=[]//背景显示列表，用于selectList
								this.backgroundSizeList=[]//背景图片大小列表
							}
							this.backgroundSizeList=this.childrenData_edit.children.backgroundSize
							this.backgroundClipList=this.childrenData_edit.children.backgroundClip
							this.backgroundOriginList=this.childrenData_edit.children.backgroundOrigin
							this.backgroundBlendModeList=this.childrenData_edit.children.backgroundBlendMode
							this.backgroundPositionList=this.childrenData_edit.children.backgroundPosition
							this.backgroundAttachmentList=this.childrenData_edit.children.backgroundAttachment
							try{
								let repeat=this.childrenData_edit.children["backgroundRepeat"]
								if(repeat==""){
									this.repeat.selected=3
								}else{
									let index=this.repeat.selectStyle.indexOf(repeat)
									if(~index){
										this.repeat.selected=index
									}else{
										this.repeat.selected=3
									}
								}
							}catch{}
							
							this.$refs['backRepeat'].setSelected(this.repeat.selectList[this.repeat.selected])
							try{
								this.backgroundImageList=this.childrenData_edit.children["backgroundImage"]
								this.backgroundImageList_show=[]
								for(let i=0;i<this.backgroundImageList.length;i++){
									let url=this.backgroundImageList[i].value.trim()
									if(url=="" || url.length<2 || !this.judgeBackImage(url)){
										continue
									}
									let isImage=false
									if(url.startsWith("url")){
										isImage=true
										url=url.replace('url("','')
										url=url.replace('")','')
									}
									if(isImage){
										this.backgroundImageList_show.push("图片-"+url)
									}else{
										this.backgroundImageList_show.push("渐变色-"+url)
									}
								}
								
								if(this.backgroundImageList.length>0){
									this.selectChange({"index":0})
									if(this.showBackgroundImage){//当背景图片存在且已经打开图片选择器时自动调用编辑功能以改变你图片上传组件中的数据
										this.editNowBackImage()
									}
								}else{
									this.showBackgroundImage=false
								}
							}catch(e){
								console.error(e)
							}
							this.setDtaValueTime=null
						},200)
					}
					
					
					
					
				},
				immediate:true,
				deep:true
			},
			childrenData_edit:{
				handler:function(val){
					
					
				},
				immediate:true,
				deep:true
			},
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.set(false)
					this.$emit("preProcess",'background',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'background',callBack)
			},
			setImageType:function(type){//backgroundImage组件回传图片类型
				this.selectedType=type
			},
			set:function(emit=true){
				if(emit){
					console.log("setMy")
					this.$emit("set","background",this.childrenData_edit,function(a,b){return true},this.setted)
				}
					
				this.setted=false
			},
			judgeBackImage:function(image){
				let title=image.split("(")[0]
				let backImageKinds=['url','radial-gradient','linear-gradient','conic-gradient','repeating-radial-gradient','repeating-linear-gradient','repeating-conic-gradient']
				return backImageKinds.indexOf(title)>-1
			},
			cancle:function(e){
				
				this.showBackgroundImage=false
				this.pushNew=false//回传完毕，将插入新增改为不允许
			},
			spread:function(e){
				this.spreadEdit=!this.spreadEdit
			        if(this.spreadEdit){//未展开
			            this.spreadRotate=90
			            this.height= this.backgroundImageList_show.length>0?"250px":"170px"
						this.$nextTick(()=>{
							if(this.setted){
								
								this.childrenData_edit.children=JSON.parse(JSON.stringify(this.dataValue.children))  
							}
						})
			        }else{
			            this.height="35px"
			        }
			    },
			colorSet:function(color){
				this.isSet=true
				this.setted=true
				this.childrenData_edit.children['backgroundColor'].value=color
				this.set()
			},
			returnImage:function(image,size,origin,clip,acttchment,position,blendMode){
				if(this.selectedType==0){//图片回传
					if(this.pushNew){
						this.backgroundImageList.push(
							{
								value:'url("'+image+'")',
								condition:{
									bindList:null,
									default:""
								}
							}
						)
						this.selectedImage+=1
						this.backgroundImageList_show.push("图片"+image)
					}else{
						this.backgroundImageList[this.selectedImage].value='url("'+image+'")'
						this.backgroundImageList_show[this.selectedImage]=("图片"+image)
					}
				}else{//渐变回传
					
					if(this.pushNew){
						this.backgroundImageList.push({
								value:image,
								condition:{
									bindList:null,
									default:""
								}
							})
						this.selectedImage+=1
						//console.log("添加")
						this.backgroundImageList_show.push("渐变"+image)
					}else{
						//console.log("修改")
						this.backgroundImageList[this.selectedImage].value=image
						this.backgroundImageList_show[this.selectedImage]=("渐变"+image)
					}
				}
				
				let length=this.backgroundSizeList.length
				if(this.pushNew){
					
					this.backgroundSizeList.push({
						value:size,
						condition:{
							bindList:null,
							default:""
						}
					})
					
					
					this.backgroundClipList.push({
						value:clip,
						condition:{
							bindList:null,
							default:""
						}
					})
					
					
					this.backgroundOriginList.push({
						value:origin,
						condition:{
							bindList:null,
							default:""
						}
					})
					

					this.backgroundBlendModeList.push({
						value:blendMode,
						condition:{
							bindList:null,
							default:""
						}
					})
					
					
					//length=this.backgroundPositionList.length//注：setPosition中不对position属性做任何添加，直接赋值
					//if(length>0 && this.backgroundPositionList[length-1].length<2){
					//	this.backgroundPositionList.pop()
					//}
					this.backgroundPositionList.push({
						value:position,
						condition:{
							bindList:null,
							default:""
						}
					})
					
					
					
					this.backgroundAttachmentList.push(
						{
							value:acttchment,
							condition:{
								bindList:null,
								default:""
							}
						}
					)
				}else{
					this.backgroundSizeList[this.selectedImage]={
						value:size,
						condition:{
							bindList:null,
							default:""
						}
					}
					this.backgroundClipList[this.selectedImage]={
						value:clip,
						condition:{
							bindList:null,
							default:""
						}
					}
					this.backgroundOriginList[this.selectedImage]={
						value:clip,
						condition:{
							bindList:null,
							default:""
						}
					}
					this.backgroundAttachmentList[this.selectedImage]={
						value:acttchment,
						condition:{
							bindList:null,
							default:""
						}
					}
					this.backgroundPositionList[this.selectedImage]={
						value:position,
						condition:{
							bindList:null,
							default:""
						}
					}
					this.backgroundBlendModeList[this.selectedImage]={
						value:blendMode,
						condition:{
							bindList:null,
							default:""
						}
					}
				}
				this.imageSet()
				this.hasSetImage=true
				this.pushNew=false
			},
			imageSet:function(){//设置背景图
				this.isSet=true
				if(!this.setted){
					this.setted=true
				}
				this.setTarget="image"
				let len=this.backgroundImageList.length
				let value=""
				this.childrenData_edit.children["backgroundImage"]=[]
				for(let i=0;i<len;i++){
					this.childrenData_edit.children["backgroundImage"].push(this.backgroundImageList[i])
				}

				this.childrenData_edit.children["backgroundSize"]=this.backgroundSizeList
				
				if(this.pushNew){//添加新图片时自动展示最新的
					
					this.selectChange({"index":len-1})
				}

				this.childrenData_edit.children["backgroundOrigin"]=this.backgroundOriginList
				
				this.childrenData_edit.children["backgroundBlendMode"]=this.backgroundBlendModeList

				
				this.childrenData_edit.children["backgroundPosition"]=this.backgroundPositionList

				this.childrenData_edit.children["backgroundClip"]=this.backgroundClipList
				this.childrenData_edit.children["backgroundAttachment"]=this.backgroundAttachmentList
				
				this.set()
			},
			showImageAdd:function(e,type=0){
				this.pushNew=true
				//弹出背景图选择器，当type为0时表示为图片，否则为渐变
				if(type==0){
					this.selectList=['图片','线性渐变','径向渐变','旋转渐变',"线性重复",'径向重复','旋转重复']
				}else{
					this.selectList=['线性渐变','径向渐变','旋转渐变',"线性重复",'径向重复','旋转重复']
				}
				this.showBackgroundImage=true
				this.$nextTick(()=>{
					let top=(e.pageY-30)
					if(top>screen.height-550){
						top=screen.height-550
					}
					document.getElementById("backImageChose").style.top=top+"px"
					
					
				})
			},
			selectChange:function(data){//选择被展示的图片
				
				this.selectedImage=data['index']
				
				if(this.selectedImage > -1 && this.selectedImage<this.backgroundImageList.length){
					let imageList
					let hill=""
					imageList=this.childrenData_edit.children["backgroundImage"]
					this.$nextTick(()=>{
						let box=document.getElementById("showForImage")
						//console.log("setShow",imageList[this.selectedImage]+hill)
						box.style.backgroundImage=imageList[this.selectedImage].value
						this.$refs['selectList_image'].setSelected(this.backgroundImageList_show[this.selectedImage])
					})
				}
			},
			selectChange_repeat:function(data){
				this.setted=true
				this.repeat.selected=data['index']
				let repeat=this.repeat.selectStyle[data['index']]
				if(this.setted){
					this.childrenData_edit.children['backgroundRepeat'].value=repeat
					this.setTarget=['backgroundRepeat']
					this.set()
				}
			},
			//编辑当前展示的背景图
			editNowBackImage:function(e=null){
				//console.log("sss",this.backgroundImageList)
				this.pushNew=false
				this.showBackgroundImage=true
				this.$nextTick(()=>{
					
					if(e!=null){//表示为切换编辑对象时调用
						let top=(e.pageY-30)
						if(top>screen.height-550){
							top=screen.height-550
						}
						document.getElementById("backImageChose").style.top=top+"px"
					}
					
					
					let url=this.backgroundImageList[this.selectedImage].value
					let size=this.backgroundSizeList[this.selectedImage].value
					let origin=this.backgroundOriginList[this.selectedImage].value
					let clip=this.backgroundClipList[this.selectedImage].value
					let Attachment=this.backgroundAttachmentList[this.selectedImage].value
					let position=this.backgroundPositionList[this.selectedImage].value
					let blendMode=this.backgroundBlendModeList[this.selectedImage].value
					if(!url.endsWith(")")){
						url+=")"
					}
					if(size==""){
						size="contain"
					}
					if(origin==""){
						origin="padding-box"
					}
					if(clip==''){
						clip="border-box"
					}
					if(blendMode==""){
						blendMode="normal"
					}
					this.$refs["backImageChoseTool"].setFileSource(url,size,position,origin,clip,Attachment,blendMode)
				})
			},
			removeBackImage:function(){
				if(confirm("是否移除此项背景图")){
					this.backgroundImageList.pop(this.selectedImage)
					this.backgroundImageList_show.pop(this.selectedImage)
					this.selectedImage=this.backgroundImageList.length>0?0:-1
					this.imageSet()
				}

			},
			setPosition:function(position){
				this.isSet=true
				this.setted=true
				if(this.backgroundPositionList.length<this.selectedImage){
					this.backgroundPositionList.push(
					{
						value:position,
						condition:{
							bindList:null,
							default:""
						}
					}
					)
				}else{
					this.backgroundPositionList[this.selectedImage].value=position
					}
				this.childrenData_edit.children['backgroundPosition']=this.backgroundPositionList
				this.set()
			},
			setBlend:function(blend){
				this.isSet=true
				this.setted=true
				if(this.backgroundBlendModeList.length<this.selectedImage){
					this.backgroundBlendModeList.push(
						{
							value:blend,
							condition:{
								bindList:null,
								default:""
							}
						}
					)
				}else{
					this.backgroundBlendModeList[this.selectedImage].value=blend
				}
				this.childrenData_edit.children['backgroundBlendMode']=this.backgroundBlendModeList
				if(this.hasSetImage){
					this.set()
				}
			},
			requestVar:function(e,name){//请求绑定变量
				this.$emit("requestVar",e,name,this.realDataContion[name])
			}
		}
	}
</script>

<style>
	@import url(./css/background.css);
</style>