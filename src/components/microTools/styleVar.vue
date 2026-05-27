<!--变量绑定器-->
<template>
	<div>
		<teleport to="body">
			<div class="styleVar" :style="{width:`${width}px`,right:`${right}px`,top:`${top}px`}" @mousemove="moveLine" @mouseup.stop="endLine">
				<div @focus.stop="" contenteditable="false" style="cursor: pointer;;width: 100%;display: flex;height: 30px;border-bottom: 1px solid var(--mainColorGrayBg2);border-radius: 10px 10px 0 0;">
					<!--展开按钮-->
					<div @click="spread" style="position: absolute;left: 0;top: 0;height: 30px;width: 30px;">
						<svg t="1664511752173" class="icon" viewBox="0 0 1024 1024" style="margin-top: 5px;margin-left: 5px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4887" data-spm-anchor-id="a313x.7781069.0.i5" width="20" height="20"><path d="M453.99 512L243.9 301.91c-15.93-16.11-15.79-42.08 0.32-58.01 15.98-15.81 41.71-15.81 57.7 0L512 453.99l254.02-254.02c16.02-16.02 41.99-16.02 58.01 0 16.02 16.02 16.02 41.99 0 58.01L570.02 512l254.02 254.02c16.02 16.02 16.02 41.99 0 58.01-16.02 16.02-41.99 16.02-58.01 0L512 570.01 301.91 780.1c-16.02 16.02-41.99 16.02-58.01 0s-16.02-41.99 0-58.01L453.99 512z" fill="transparent" opacity=".3" p-id="4888" data-spm-anchor-id="a313x.7781069.0.i0" class=""></path><path d="M265.87 758.13h123.07c27.35 4.69 41.02 18.37 41.02 41.02 0 22.66-13.67 36.33-41.02 41.02H183.83v-205.1c0-27.35 13.67-41.02 41.02-41.02s41.02 13.68 41.02 41.02v123.06z m492.26 0V635.07c4.69-27.35 18.37-41.02 41.02-41.02 22.66 0 36.33 13.68 41.02 41.02v205.11h-205.1c-27.35 0-41.02-13.67-41.02-41.02s13.68-41.02 41.02-41.03h123.06z m0-492.26H635.07c-27.35-4.69-41.02-18.37-41.02-41.02 0-22.66 13.68-36.33 41.02-41.02h205.11v205.11c0 27.35-13.67 41.02-41.02 41.02s-41.02-13.67-41.03-41.02V265.87z m-492.26 0v123.07c-4.69 27.35-18.37 41.02-41.02 41.02s-36.33-13.67-41.02-41.02V183.83h205.11c27.35 0 41.02 13.67 41.02 41.02s-13.67 41.02-41.02 41.02H265.87z" fill="#e6e6e6" p-id="4889"></path></svg>
					</div>
					<div @focus.stop="" contenteditable="false" style="width: 100%;height: 30px;line-height: 30px;text-align: center;color: white;font-weight: normal;">
						变量绑定
					</div>
					<div @click="checkValue" style="position: absolute;right: 8px;top: 3px;height: 30px;cursor: pointer;">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
					</div>
				</div>
				<!--列表部分-->
				<div style="max-height: 235px;min-height: 50px;width: 100%;overflow: scroll;border-bottom: 1px solid var(--mainColorGrayBg2);" >
					<div v-for="(item,index) in bindList" :key="index" class="valueItem_styleVar" :style="{backgroundColor:`${viewIndex==index ? 'var(--mainColorGrayBg2)':'transparent'}`}">
						<!--设置锚点-->
						<div v-if="!isSpread && viewIndex!=index" style="width: 10%;height: 30px;position: relative;flex-shrink: 0;margin-left: 2px;cursor: pointer;">
							<linkInPut @viewSource="viewSrouce" v-if="item.type=='link' && viewIndex!=index && defaultIndex!=index" :index="index" style="right:0;top:10px;" @valueInput="acceptVarValue"></linkInPut>
							<div v-else-if="viewIndex!=index && defaultIndex!=index" @mouseup="changeToLink($event,index)" style="margin-top: 10px;width: 10px;height: 10px;border-radius: 5px;background-color: var(--mainColorBlue2);"></div>
							
						</div>
						<!--隐藏连接线-->
						<div v-if="viewIndex==index && viewLink" @click="viewIndex=-1;viewLink=false;svgpath=[]" style="width: 10%;height: 30px;position: relative;flex-shrink: 0;margin-left: 2px;cursor: pointer;">
							<svg t="1664544055136" style="margin-left: 5px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15382" width="15" height="30"><path d="M816.735 392.609c23.948-16.884 48.504-34.194 73.666-51.93 45.496 43.008 83.948 94.01 113.095 151.396l10.12 19.925-10.12 19.925C910.156 715.705 721.366 834 511.5 834c-85.629 0-167.748-19.693-241.308-55.493a126426.42 126426.42 0 0 1 84.456-59.764C403.996 736.477 456.897 746 511.5 746c168.708 0 321.167-90.915 402.8-234a464.333 464.333 0 0 0-97.565-119.391z m-139.41-84.022C625.44 288.718 569.427 278 511.5 278c-168.708 0-321.167 90.915-402.8 234a464.315 464.315 0 0 0 103.832 124.777 65416.053 65416.053 0 0 0-73.757 52.294c-48.197-44.187-88.815-97.18-119.27-157.146L9.384 512l10.12-19.925C112.844 308.295 301.632 190 511.5 190c88.831 0 173.886 21.194 249.525 59.577a862427.371 862427.371 0 0 0-83.7 59.01zM443.857 655.699A429587.844 429587.844 0 0 1 670.2 495.944c0.53 5.28 0.801 10.636 0.801 16.056 0 87.813-71.187 159-159 159-24.386 0-47.49-5.49-68.143-15.301z m-89.033-119.54A160.242 160.242 0 0 1 353 512c0-87.813 71.187-159 159-159 27.292 0 52.977 6.876 75.419 18.99-40.078 28.27-77.89 54.947-113.456 80.048a71.196 71.196 0 0 0-5.619 3.965 321235.405 321235.405 0 0 0-113.52 80.155zM115.39 851.515c-19.018 15.127-46.698 11.973-61.825-7.045-15.127-19.018-11.973-46.698 7.045-61.825 16.64-13.236 299.253-213.08 864.8-611.613 19.864-13.998 47.314-9.242 61.312 10.622 13.998 19.864 9.242 47.314-10.622 61.312-553.782 390.242-846.339 597.118-860.71 608.549z" p-id="15383" fill="#e6e6e6"></path></svg>
						</div>
						<!--查看逻辑按钮-->
						<div v-if="isSpread" @click="defaultIndex!=index?showEditExp($event,index):()=>{}"  
						:style="{backgroundColor:`${defaultIndex!=index?'var(--mainColorGrayBg2)':'transparent'}`}"
						style="margin-left: 10px;font-weight: normal;text-align: center;line-height: 30px;cursor: pointer;;width: 120px;height: 30px;margin-right: 10px;color: white;border-radius: 10px;" >
							{{defaultIndex!=index?'编辑':''}}
						</div>
						<!--对应参数-->
						<input @input="inputValue(index)" @click="callVarProvide($event,index)" v-model="item.targetData" placeholder="参数值" 
						class="varInput" 
						:style="{marginLeft:`${item.type=='link'?'10px':'0px'}`,width:`${item.type=='link'?'60%':'calc(60% - 10px)'}`}"/>
						<!--移除按钮-->
						<div class="removeButton" @click="removeItem(index)">
							<svg t="1661864077717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3301" width="100%" height="20"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#8a8a8a" p-id="3302"></path></svg>
						</div>
						<!--设为默认按钮-->
						<div class="defaultButton" style="width: 10%;" @click="setDefault(index)">
							<svg v-if="defaultIndex==index" t="1664525276273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10817" width="20" height="20"><path d="M724.855705 608.101913a93.905865 93.905865 0 0 1-7.963909 6.223226c-1.240094 0.932915-2.51432 1.820322-3.765791 2.730483C532.083597 745.035641 513.664213 894.438576 512.094185 934.121597L512.014546 932.983896c-10.865047-161.348798-140.983945-271.91061-187.959631-306.747024a341.31039 341.31039 0 1 1 400.80079-18.134959zM512.014546 944.360909s-0.182032-3.674775 0.079639-10.239312C525.223258 1129.339763 512.014546 944.360909 512.014546 944.360909z" fill="#3662EC" p-id="10818"></path></svg>
							<svg v-else t="1664525276273" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10817" width="20" height="20"><path d="M724.855705 608.101913a93.905865 93.905865 0 0 1-7.963909 6.223226c-1.240094 0.932915-2.51432 1.820322-3.765791 2.730483C532.083597 745.035641 513.664213 894.438576 512.094185 934.121597L512.014546 932.983896c-10.865047-161.348798-140.983945-271.91061-187.959631-306.747024a341.31039 341.31039 0 1 1 400.80079-18.134959zM512.014546 944.360909s-0.182032-3.674775 0.079639-10.239312C525.223258 1129.339763 512.014546 944.360909 512.014546 944.360909z" fill="#8a8a8a" p-id="10818"></path></svg>						</div>
						</div>
				</div>
				<!--添加按钮-->
				<div  class="addButton" @click="addNewBind">
					<div style="position: absolute;height: 30px;width: 20px;left: 50%;transform: translateX(-50%);">
						<svg t="1664538249463" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12688" width="20" height="30"><path d="M511.81 118c22.66 0 41.013 18.364 41.013 41.025l-0.001 311.96h312.153c22.661 0 41.025 18.356 41.025 41.017 0 22.66-18.364 41.013-41.025 41.013H552.822v311.957c0 22.663-18.351 41.028-41.011 41.028-22.662 0-41.017-18.365-41.017-41.028l-0.001-311.957H159.028c-22.663 0-41.028-18.352-41.028-41.013 0-22.661 18.365-41.017 41.028-41.017h311.765v-311.96c0-22.661 18.356-41.025 41.018-41.025z" fill="#e6e6e6" p-id="12689"></path></svg>
					</div>
				</div>
			</div>
		</teleport>
		<!--连接线-->
		<teleport to="body">
			<svg v-if="svgpath.length>0" @click.stop="expressionBord.show=false"
				style="position: absolute;left: 0px;top: 0px;width: 100vw;height:100vh" 
				:style="{zIndex:`${9998}`}">
				<path :d="path.path" v-for="(path,index) in svgpath" :key="index" 
					style="stroke-width: 2px;fill:transparent;" :style="{stroke:`${colors[index % 6]}`}">
				</path >
				<circle v-for="(path,index) in svgpath" :key="index" 
					@click.stop="showExpreBord($event,index)" :cx="path.circle[0]" :cy="path.circle[1]" r='5' 
					style="cursor: pointer;stroke-width: 2px;"
					:style="{fill:`${colors[index % 6]}`,stroke:`${colors[index % 6]}`}">
				</circle>
				<!--表达式运算符-->
				<!--rect v-for="(path,index) in svgpath" :key="index" :x="path.circle[0]-20" :y="path.circle[1]+10" width='50' rx="10" height="25" 
					style="stroke: #212121;fill: #212121;min-width: 30px;">
				</rect-->
				
				<!--text v-for="(path,index) in svgpath" :key="index"  :x="path.circle[0]-8" :y="path.circle[1]+28" 
					style="cursor: pointer;fill:white;font-weight: normal;line-height:30px;height: 30px;font-size: 16px;">
					{{path.text}}
				</text-->
			</svg>
		</teleport>
		<!--表达式选择-->
		<teleport to="body">
			<div class="inputExpression" 
				v-if="expressionBord.show"
				:style="{left:`${expressionBord.left}px`,top:`${expressionBord.top}px`}">
				<div style="width: 100%;height: 30px;" v-for="(item,index) in expressionBord.textList" :key="index">
					<div class="operatorText"
					@click="setExpression(item)"
					:style="{backgroundColor:`${item==expressionBord.preExpre?'var(--mainColorGrayBg2)':''}`}">
						{{item}}
					</div>
				</div>
				<input style="position: absolute;left: -10px;top: -10px;width: 1px;height: 1px;outline: none;border: none;background-color: transparent;"
					ref="inputExpression" @blur="blurExpreBord"/>
			</div>
		</teleport>
		<!--条件表达式编辑-->
		<teleport to="body">
			<div class="expressionEdit" v-if="expressionEdit.show" :style="{top:`${expressionEdit.top}px`}">
				<div class="expressionItem" v-for="(item,index) in expressionEdit.logic">
					<!--数字时表示为对应的condition-->
					<div v-if="Object.prototype.toString.call(item) == '[object Number]'" class="expression_numberType">
						<!--变量名字-->
						<div style="width: auto;height: 30px;line-height: 30px;text-align: center;padding-left: 8px;padding-right: 8px;color: white;">
							{{processVarName(bindList[nowOpeBindIndex].sourceList[item])}}
						</div>
						<!--表达式（比较符号）-->
						<div @click.stop="showExpreBord($event,item,'express')" style="cursor: pointer;;font-weight: normal;width: auto;height: 20px;margin-top: 5px;background-color: var(--mainColorBlue2);padding-left: 5px;padding-right: 5px;color: white;border-radius: 5px;">
							{{processExp(bindList[nowOpeBindIndex].condition[item])}}
						</div>
						<!--变量状态值-->
						<div style="font-weight: normal;width: auto;height: 30px;line-height: 30px;text-align: center;padding-left: 8px;padding-right: 8px;color: white;">
							{{bindList[nowOpeBindIndex].condition[item].value}}
						</div>
						<!--左边添加-->
						<div @click="addArea(index,'left')" style="top:10px;cursor: pointer;;position: absolute;left: -10px;width: 8px;height: 8px;border-radius: 4px;background-color: white;">
						</div>
						<!--右边添加-->
						<div @click="addArea(index+1,'right')" style="top:10px;cursor: pointer;position: absolute;right: -10px;width: 8px;height: 8px;border-radius: 4px;background-color: white;">
						</div>
					</div>
					
					<!--字符串时判断-->
					<div v-if="Object.prototype.toString.call(item) == '[object String]'" class="expression_stringType">
						<!--为左右括号时
						<input v-if="item=='(' || item==')'" v-model="expressionEdit.logic[index]" class="expInput" style="transform: scale(2);transform-origin: center;width: 10px;height: 32px;"/-->
						<!--为 && 或 || 时-->
						<div v-if="item == '&&' || item =='||'" class="andOr" @click="setLogic(item,index)">
							{{item}}
						</div>
						<!--为普通字符串时-->
						<input v-else v-model="expressionEdit.logic[index]" @input="expressionEdit.isEdit=true" class="expInput" :style="{width:`${item.length*8.3}px`}"/>
					</div>
				</div>
				<!--保存/取消按钮-->
				<div v-if="expressionEdit.isEdit" @click="saveExpression" style="cursor: pointer;margin-left: 10px;width: 40px;border-radius: 10px;height: 25px;margin-top: 7.5px;background-color: var(--mainColorBlue2);color: white;text-align: center;line-height: 25px;font-weight: normal;">
					保存
				</div>
				<div @click="closeExpressEdit" style="cursor: pointer;margin-left: 10px;width: 40px;border-radius: 10px;height: 25px;margin-top: 7.5px;background-color: white;color: black;text-align: center;line-height: 25px;font-weight: normal;">
					关闭
				</div>
				
				
			</div>
		</teleport>
		<teleport to="body" v-if="expressionErrorShow && expressionEdit.show">
			<!--表达式错误显示-->
			<div  :style="{top:`${expressionEdit.top+45}px`}" style="background-color: #212121;border-radius: 10px;z-index: 99999;;position: absolute;right: 350px;width: 300px;height: auto;max-height: 300px;overflow: scroll;font-weight: normal;padding: 8px;color:#FF8500">
				表达式错误:
				<br/>
				{{expressionErrorText}}
			</div>
		</teleport>
		<!--不存在的状态管理器-->
		<teleport to="body" v-if="errorStatus.length>0">
			<div class="errorBord">
				<h3 style=";color: white;margin: 0;padding: 0;width: 60%;float:left;margin-left: 5%;font-weight: normal;text-align: left;height: 25px;line-height: 25px;">
					以下状态管理节点错误
				</h3>
				<div style="float: right;height:25px;cursor: pointer;margin-right:8px" @click="closeErrorBord">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
						<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
				</div>
				<div style="clear: both;">
				</div>
				<div style="width: 100%;height: calc(100% - 80px);overflow: scroll;margin-top:24px;float:left">
					<!--父层级-->
					<div class="errorStatusParent" v-for="(parentItem,index) in errorStatus" :key="index">
						<div class="errorParentTitle">
							<circleCheckBox @setCheck='(check)=>{setSelectError(index,check)}' :precheck="false" style="margin-top: 3px;margin-left:-8px;margin-right: 16px;"></circleCheckBox>
							{{parentItem.node}}
						</div>
						<!--此层级下的各个状态节点-->
						<div style="width: 90%;margin-left: 10%;max-height: 150px;overflow: scroll;">
							<div style="width: 100%;height: 25px;background-color:var(--mainColorGrayBg2);display: flex;position: relative;border-radius:10px;margin-top:8px" 
								v-for="(childItem,childIndex) in parentItem.children" :key="childIndex">
								<circleCheckBox @setCheck='(check)=>{setSelectError(index,check)}' :precheck="false" style="margin-top: 3px;margin-left:8px;margin-right: 16px;"></circleCheckBox>
								
								<h4 style="margin: 0;padding: 0;height: 25px;line-height: 25px;font-weight: normal;width: 80%;margin-left: 40px;color:white">
									{{childItem.node}}
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div @click="removeError" style="float:right;cursor:pointer;margin-right:8px;width: 100px;height:25px;border-radius:10px;background-color:var(--mainColorBlue2);color:white;font-weight:normal;text-align:center;line-height:25px">
					清除选中绑定
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	//锚点引入
	import linkInPut from "./linkInPut.vue" 
	//引入选择框
	import circleCheckBox from "./circleCheckBox.vue"
	//样式变量绑定数据
	export default{
		name:"styleVar",
		props:{
			top:{
				type:Number,
				default:0
			},
			right:{
				type:Number,
				default:30
			},
			_bindList:{
				type:Array,
				default:[]
			},
			_defaultIndex:""
		},
		components:{
			linkInPut,
			circleCheckBox
		},
		mounted(){
			console.log(this._bindList,this._defaultIndex)
			if(typeof(this._defaultIndex)=='string' || this._defaultIndex<-1)
				this.defaultIndex=-1
			else
				this.defaultIndex=this._defaultIndex
			console.log(this.defaultIndex)
			console.log(this._bindList)
			if(this._bindList==null || Object.prototype.toString.call(this._bindList)!='[object Array]')
				this.bindList=[]
			else{
				try{
					this.bindList=JSON.parse(JSON.stringify(this._bindList))
				}catch(e){
					console.log(e)
					this.bindList=[]
				}
			}
		},
		data(){
			return{
				width:180,
				bindList:[
					/*{
						type:"define",
						linkSource:[],//可能有多个条件
						condition:[],//对应多个条件表达式 { expression:"==",value:"123"}
						targetData:"",
						status:""
					}*/
				],
				defaultIndex:0,//默认参数索引
				isSpread:false,
				newIndex:-1,
				svgpath:"",
				viewLink:false,
				viewIndex:-1,
				saveTimeOut:null,
				inputTimeOut:null,
				expressionBord:{
					textList:[
							'==',
							'!=',
							'<=',
							'>=',
							'===',
							'!==',
							'>',
							'<'
							],
					show:false,//控制显示
					left:0,//位置控制
					top:0,//位置控制
					expressionIndex:-1,//对应次绑定下要修改的第几个表达式
					preExpre:"=="
				},
				expressionEdit:{
					show:false,
					logic:[],//原先逻辑顺序
					editBrack:false,//标记是否在编辑左右括号
					top:0,
					isEdit:false
				},
				nowOpeBindIndex:-1,//当前操作的第几个绑定
				colors:['#3662EC','#509296','#6b798e','#663d74','#7397ab','#4f6f46'],
				errorStatus:[],
				errorSelect:[],//需要删除的错误选项的索引，对应errorStatus中的值
				errorBindIndex:-1,
				expressionErrorText:null,
				expressionErrorShow:false,
				errorCallBack:()=>{},//处理错误项后的回调事件
			}
		},
		methods:{
			acceptVarValue:function(index,value){
				//value :linksource,sourceVar,condition
				let source=value.source,linkSource=value.linkSource,condition=value.condition,statusKey=value.statusKey
				let tempData=this.bindList[index].targetData
				if(!this.bindList[index].sourceList) 	this.bindList[index].sourceList=[] 	//变量名
				if(!this.bindList[index].statusList) 	this.bindList[index].statusList=[] 	//变量名对应的状态管理器键名
				if(!this.bindList[index].linkSource) 	this.bindList[index].linkSource=[]	//变量对应的取值
				if(!this.bindList[index].condition )  	this.bindList[index].condition=	[]	//对应的条件语句
				if(!this.bindList[index].logic 	   )  	this.bindList[index].logic=		[]		//整合所有条件的逻辑语句
				//检测传入的source（变量名）是否已存在
				let preSourceIndex=this.bindList[index].sourceList.indexOf(source)
				if(preSourceIndex==-1){
					let logicIndex=this.bindList[index].condition.length
					this.bindList[index].sourceList.push(source)
					this.bindList[index].statusList.push(statusKey)
					this.bindList[index].linkSource.push(linkSource)
					this.bindList[index].condition.push(condition)
					if(logicIndex>0)
						this.bindList[index].logic.push("&&")
					this.bindList[index].logic.push(logicIndex)
				}else{
					this.bindList[index].sourceList[preSourceIndex]	=	source
					this.bindList[index].statusList[preSourceIndex]	=	statusKey
					this.bindList[index].linkSource[preSourceIndex]	=	linkSource
					this.bindList[index].condition [preSourceIndex]	=	condition
				}
				this.bindList[index].type="link"
				this.bindList[index].targetData=tempData
				console.log("check var",System.metaData.STYLESTRUCT)
				System.showToast("设置成功",2000)
			},
			moveLine:function(e){
				if(System.mountStatus){
					System.drawLinkLine({clientX:e.clientX-10,clientY:e.clientY})
				}
			},
			//define转link
			changeToLink:function(e,index){
				if(System.mountStatus){
					try{
						let data=JSON.parse(JSON.stringify(System.mountOutput)) 
						let keys=Object.keys(data)
						//检测传进来的结构是否与要求的相同
						const refList=['linkSource','condition','source','statusKey']
						if(keys.length!=refList.length) return
						for(let i=0;i<keys.length;i++){
							if(!refList.includes(keys[i])){
								return
							}
						}
						setTimeout(()=>{
							let next=!this.bindList[index].targetData//新增或确认修改时直接赋值
							if(!next){
								if(confirm("是否将目标变量转为锚点引入")){
									next=true
								}
							}
							if(next){
								this.acceptVarValue(index,data)
								System.showToast("重置成功",2000)
							}
						},100)
					}catch(e){
						console.log(e)
					}					
				}
				this.endLine(e)
			},
			endLine:function(e){
				if(System.mountStatus){
					System.endLinkMount(e)
					System.mountStatus=false
				}
			},
			setDefault:function(index){
				if(this.bindList[index].logic.length > 1 || this.bindList[index].logic[0].length>0){
					if(confirm("参数值"+this.bindList[index].targetData+"存在条件表达式,是否确认清除并设为默认值")){
						this.defaultIndex=index
						this.bindList[index].logic=['']
					}
				}else{
					this.defaultIndex=index
				}
			},
			spread:function(){
				this.isSpread=!this.isSpread
				this.width=this.isSpread?300:180
				if(!this.isSpread){
					this.expressionEdit.show=false
				}
			},
			//新增变量绑定项
			addNewBind:function(){
				//记录当前状态为新增
				//新增前先保存
				if(this.setBindList(false,true)){
					if(this.saveTimeOut!=null) clearTimeout(this.saveTimeOut)
					let data
					let next=false
					if(this.bindList.length==0) next=true
					else if(this.bindList.at(-1).targetData) next=true
					if(next){
						this.newIndex=this.bindList.length
						if(this.defaultIndex==-1)
							this.defaultIndex=this.newIndex
						this.bindList.push({
								type:"define",
								targetData:"",
								status:"",
								logic:['']
						})
					}else{
						System.showToast("存在未设置变量，新增失败")
					}
				}else{
					System.showToast("存在未设置变量，新增失败")
				}
				
			},
			//检查是否有管理器不存在或节点不存在
			checkError:function(index){
				let errorStatus=[],erroeIndex=[]
				let statusList=this.bindList[index].statusList
				let linkSource=this.bindList[index].linkSource
				let condition=this.bindList[index].condition
				let filter
				for(let i=0;i<statusList.length;i++){
					if(!System.metaData.STATUS[statusList[i]]){
						console.log("ere")
						//若此状态管理器不存在
						errorStatus.push({
							node:this.bindList[index].sourceList[i].substr(5), //取对应的变量名,去除this.
							children:[]
						})
						erroeIndex.push(i)
					}else{
						//否则检测器子节点是否存在(使用节点的id进行比对)
						//读取此状态管理器你下的所有节点
						filter=System.metaData.STATUS[statusList[i]].varList.map((value) => {
							return value.id
						})
						console.log(filter,linkSource[i])
						//检测linksource中对应的是否存在filter中
						if(!filter.includes(linkSource[i])){
							console.log("ere2")
							errorStatus.push({
								node:this.bindList[index].sourceList[i].substr(5), //取对应的变量名 去除this.
								children:[
									{
										node:condition[i].value //以节点的状态值显示
									}
								]
							})
							erroeIndex.push(i)
						}
					}
				}
				this.errorStatus=errorStatus
				this.errorBindIndex=index
				return erroeIndex
			},
			//查看连接线
			viewSrouce:function(e,index){
				//先请求调出状态管理面板，若返回为false表示此状态管理节点已删除，则询问是否清除对应绑定
				let errorIndex=this.checkError(index)
				this.nowOpeBindIndex=index
				this.svgpath=[]
				
				let id,box,startX,startY,d
				//当绑定的数量大于错误的数量时显示连接线，否则表示所有的绑定都出错，此时不进行
				console.log(this.bindList[index].linkSource.length>errorIndex.length)
				if(this.bindList[index].linkSource.length>errorIndex.length){
					this.viewLink=true
					this.viewIndex=index
				}
				else{
					return
				}
				//找不到的状态节点
				for(let i=0;i<this.bindList[index].linkSource.length;i++){
					id=this.bindList[index].linkSource[i]
					if(!errorIndex.includes(i)){
						//仅当此节点存在时才会出现
						box=document.getElementById(id)
						startX=box.getBoundingClientRect().left
						startY=box.getBoundingClientRect().top
						d={clientX:e.target.getBoundingClientRect().left,clientY:e.target.getBoundingClientRect().top}
						this.path(d,startX,startY,this.bindList[index].condition[i].expression)
					}
				}
			},
			//三阶贝塞尔位置求解
			threeBezier:function(t, p1, cp1, cp2, p2) {
			        const [x1, y1] = p1;
			        const [x2, y2] = p2;
			        const [cx1, cy1] = cp1;
			        const [cx2, cy2] = cp2;
			        let x =
			            x1 * (1 - t) * (1 - t) * (1 - t) +
			            3 * cx1 * t * (1 - t) * (1 - t) +
			            3 * cx2 * t * t * (1 - t) +
			            x2 * t * t * t;
			        let y =
			            y1 * (1 - t) * (1 - t) * (1 - t) +
			            3 * cy1 * t * (1 - t) * (1 - t) +
			            3 * cy2 * t * t * (1 - t) +
			            y2 * t * t * t;
			        return [x, y];
			},
			//绘制svg路径
			path:function(e,startX=null,startY=null,text=""){
				let x1=startX+10
				let y1=startY+13
				let x2=e.clientX-6
				let y2=e.clientY+5
				var path=`M${x1} ${y1} `
				let xdisance=(x2-x1)/4
				let flag=xdisance<0?-1:1
				if(xdisance>100) xdisance=100
				let cx1=x1+xdisance;
				let ydistance=(y2-y1)/2
				if(ydistance<-100) ydistance=-100
				else if(ydistance>100) ydistance=100
				let cy1=y1-ydistance;
				xdisance=(x2-x1)/2
				if(xdisance>400) xdisance=400
				let cx2=x2-xdisance
				let cy2=y2+15
				let c=`C${cx1} ${cy1},${cx2} ${cy2},`
				path+=c+x2 +" "+y2+" "
				//绘制箭头
				path+=`M${x2} ${y2} T${x2-8*flag} ${y2-8} M${x2} ${y2} T${x2-8*flag} ${y2+8}`
				let t=Math.random().toFixed(2)*3
				if(t<0.3) t=0.3
				else if(t>0.7) t=0.7
				let circle=this.threeBezier(t,[x1,y1],[cx1,cy1],[cx2,cy2],[x2,y2])
				
				this.svgpath.push({path:path,circle:circle,text:text})
				
			},
			//删除绑定节点
			removeItem:function(index){
				if(this.bindList[index].targetData){
					if(confirm("确认删除变量引用"+this.bindList[index].targetData)){
						this.bindList.splice(index,1)
						System.showToast("删除成功")
						if(index==this.defaultIndex){
							this.defaultIndex=-1
						}
					}
				}else{
					this.bindList.splice(index,1)
					System.showToast("删除成功")
					//当删除的是原有的默认变量或已经全部删除时，指定默认为-1
					if(index==this.defaultIndex || this.bindList.length==0){
						this.defaultIndex=-1
					}
				}
			},
			//提交保存
			setBindList:function(toast=true,isNew=false){
				let check
				for(let i=0;i<this.bindList.length;i++){
					check=this.checkString(this.bindList[i].logic.join("",false))
					if(check===null && i!=this.defaultIndex){ //条件为空且非默认
						System.showToast("第"+(i+1)+"个变量绑定条件表达式为空，请编写",3000)
						return
					}
					else if(!check && i!=this.defaultIndex){//条件表达式有误
						System.showToast("第"+(i+1)+"个变量绑定条件表达式有误，请检查",3000)
						return
					}
					else if(!this.bindList[i].targetData && i!=this.newIndex){//参数为空且非新增的
						if(toast) System.showToast("保存失败,第"+(i+1)+"个变量存在错误绑定数据",2000)
						return false
					} 
				}
				if(this.newIndex==-1 && !isNew){
					//新增时不自动保存当前项
					let data={
						bindList:this.bindList,
						default:this.defaultIndex
					}
					this.$emit("setBindList",data)
				}
				return true
			},
			//输入监测
			inputValue:function(index){
				if(this.inputTimeOut!=null) clearTimeout(this.inputTimeOut)
				this.inputTimeOut=setTimeout(()=>{
					if(this.newIndex==index && this.bindList[index].targetData){
						//只有对新增的编辑过后，newIndex才会重置
						this.newIndex=-1
					}
					if(this.setBindList()){
						System.showToast("数据保存成功",1000)
					}
				},1000)
			},
			//显示比较操作符选择器
			showExpreBord:function(e,index,type='line'){
				//设置连接线索引(表达式顺序索引)
				this.expressionBord.expressionIndex=index
				//设置原先表达式 为连接线时取expressionBord中的，为编辑面板时取expressionEdit中的
				let outIndex=this.nowOpeBindIndex
				this.expressionBord.preExpre=this.bindList[outIndex].condition[index].expression
				//设置位置
				this.expressionBord.left=e.clientX+10
				this.expressionBord.top=e.clientY-75
				if(this.expressionBord.top<50) this.expressionBord.top=70
				this.expressionBord.show=true
				this.$nextTick(()=>{
					this.$refs['inputExpression'].focus()
				})
				if(type!='line') this.expressionEdit.isEdit=true
			},
			blurExpreBord:function(){
				setTimeout(()=>{
					this.expressionBord.show=false
				},200)
			},
			//设置比较符
			setExpression:function(expression){
				let bindIndex=this.nowOpeBindIndex
				let expreIndex=this.expressionBord.expressionIndex
				this.bindList[bindIndex].condition[expreIndex].expression=expression
				//修改svg的文字 expreIndex与svg的顺序索引一一对应
				if(this.svgpath.length>expreIndex)
					this.svgpath[expreIndex].text=expression
				this.expressionBord.show=false
			},
			//返回处理的名称,除去 this.
			processVarName:function(name){
				return name.slice(5,name.length)
			},
			//匹配比较符
			processExp:function(condition){
				const table={
					'==':"等于",
					'!=':"不等于",
					'<=':"小于等于",
					'>=':"大于等于",
					'===':"绝对等于",
					'!==':"绝对不等",
					'>':"大于",
					'<':"小于"
				}
				let exp=condition.expression
				return `(${exp}) ${table[exp]}`
			},
			//展开变量列表编辑框
			showEditExp:function(e,index){
				const action=()=>{
					this.expressionEdit.top=e.target.getBoundingClientRect().top
					this.nowOpeBindIndex=index
					this.expressionEdit.logic=JSON.parse(JSON.stringify(this.bindList[index].logic)) 
					this.expressionEdit.show=true
				}
				if(this.bindList[index].type=='link'){
					let errorIndex=this.checkError(index)
					if(errorIndex.length>0){
						this.errorCallBack=()=>{
							action()
						}
					}else{
						action()
					}
				}else{
					action()
				}
			},
			//保存变量编辑
			saveExpression:function(){
				if(this.checkString(this.expressionEdit.logic.join(""))){
					this.expressionEdit.isEdit=false
					let index=this.nowOpeBindIndex
					this.bindList[this.nowOpeBindIndex].logic=this.expressionEdit.logic
					System.showToast("保存成功",2000)
					console.log('保存',System.metaData.STYLESTRUCT)
				}
				
			},
			setLogic:function(item,index){
				this.expressionEdit.isEdit=true
				let toggle={"||":"&&",'&&':'||'}[item]
				this.expressionEdit.logic[index]=toggle
				//this.bindList[this.nowOpeBindIndex].logic[index]=toggle
			},
			//关闭条件编辑横条
			closeExpressEdit:function(){
				if(this.expressionEdit.isEdit){
					if(confirm("是否对修改进行保存")){
						if(this.checkString(this.expressionEdit.logic.join(""))){
							let index=this.nowOpeBindIndex
							this.bindList[this.nowOpeBindIndex].logic[index]=this.expressionEdit.logic
							this.expressionErrorShow=false
						}
					}else{
						this.expressionErrorShow=false
					}
				}else{
					this.expressionErrorShow=false
				}
				this.expressionEdit.isEdit=false
				this.expressionEdit.show=false
				
			},
			//新增条件项
			addArea:function(index,direct='left'){
				let next=true
				if(direct=='left'){
					if(index!=0 && typeof(this.expressionEdit.logic[index-1]) =='string' && !['&&','||'].includes(this.expressionEdit.logic[index-1])){
						next=false
					} 
				}else if(direct=='right'){
					if(typeof(this.expressionEdit.logic[index]) =='string'  && !['&&','||'].includes(this.expressionEdit.logic[index])){
						next=false
					} 
				}
				if(next){
					this.expressionEdit.logic.splice(index,0,'')
					this.expressionEdit.isEdit=true
				}
			},
			//选择需要删除的错误项
			setSelectError:function(index,check){
				if(check){
					this.errorSelect.push(index)
				}else{
					let i=this.errorSelect.indexOf(index)
					this.errorSelect.splice(i,1)
				}
			},
			//清除错误绑定
			removeError:function(){
				try{
					let errorIndex,condition,conditionIndex
					for(let i=0;i<this.errorSelect.length;i++){
						//读取选中的错误的变量源在当前操作的绑定项的sourceList中的位置，即实际要清除的索引
						errorIndex=this.bindList[this.errorBindIndex].sourceList.indexOf('this.'+this.errorStatus[i].node)
						//对于引入的变量，在logic中以引入的数字索引为指向即logci=['',0]中第二位为0表示指向condition 的第0个，
						//故只需读取在logic中选中的被删除的索引位置进行删除即可
						conditionIndex=this.bindList[this.errorBindIndex].logic.indexOf(errorIndex)
						this.bindList[this.errorBindIndex].sourceList.splice(errorIndex,1)
						this.bindList[this.errorBindIndex].linkSource.splice(errorIndex,1)
						this.bindList[this.errorBindIndex].statusList.splice(errorIndex,1)
						this.bindList[this.errorBindIndex].condition.splice(errorIndex,1)
						//还需要删除前一个条件 && ||
						this.bindList[this.errorBindIndex].logic.splice(conditionIndex-1,2)
						//为空时留出编辑框,并将类型改为自定义类型
						if(this.bindList[this.errorBindIndex].logic.length==0){
							this.bindList[this.errorBindIndex].type='define'
							this.bindList[this.errorBindIndex].logic=['']
						}
					}
					System.showToast("删除成功",2000)
					this.closeErrorBord()
				}catch{
					System.showToast("删除失败",2000)
				}
			},
			closeErrorBord:function(){
				this.errorStatus=[]
				try{
					this.errorCallBack()
					this.errorCallBack=()=>{}
				}catch{}
			},
			//检测表达式是否完整合法
			checkString:function(string,show=true){
				//使用Function,结合DATA,PROPS,COMPUTED,INJECT
				//虚假变量
				let varSentence="let "+System.componentVar.join("='',")+"=''"
				//表达式为空时抛出null
				if(string.length==0){
					this.expressionErrorText=''
					this.expressionErrorShow=false
					return null
				}
					
				try{
					new Function(`
						//重新虚拟定义变量
						${varSentence}
						let test=${string}
						test=""
						//console.log("ok",test)
					`)()
					this.expressionErrorText=''
					this.expressionErrorShow=false
					return true
				}catch(e){
					if(show){
						this.expressionErrorText=e
						if(e=='SyntaxError: Invalid left-hand side in assignment'){
							this.expressionErrorText+="(请检测是否存在运算符号左右未赋值或比较符号不正确)"
						}
						this.expressionErrorShow=true
					}
					return false
				}
			},
			//检测变量绑定参数后保存并关闭
			checkValue:function(quit=true){
				if(this.bindList.length==0){
					this.quit()
					return
				}
				//quit为true时在执行完保存后自动关闭
				//检测非默认项的变量绑定是否都正常
				if(this.defaultIndex==-1){
					System.showToast("未指定默认参数",3000)
					return
				}
				let check
				for(let i=0;i<this.bindList.length;i++){
					check=this.checkString(this.bindList[i].logic.join("",false))
					if(check===null && i!=this.defaultIndex){
						System.showToast("第"+(i+1)+"个变量绑定条件表达式为空，请编写",3000)
						return
					}
					else if(!check && i!=this.defaultIndex){
						System.showToast("第"+(i+1)+"个变量绑定条件表达式有误，请检查",3000)
						return
					}
				}
				let returnData
				if(this.bindList.length>0){
					returnData={
						bindList:this.bindList,
						default:this.defaultIndex
					}
				}else{
					returnData={
						bindList:null,
						default:-1
					}
				}
				console.log('returndata',returnData)
				System.processStyleBind(returnData)
				//save
				this.$emit("saveBindList",returnData)
				if(quit){
					this.quit()
				}
				return true
			},
			//调出变量列表
			callVarProvide:function(e,index){
				const callBack=(name)=>{
					this.bindList[index].targetData=name					
				}
				let left=screen.width-(this.right+400)
				System.requestProvide("varProvide",
				{ 	varType:"数据变量(data)",
					mode:"copy",
					callBack:callBack,
					left:left,
					top:e.clientY
				})
			},
			quit:function(){
				this.$emit("quit")
			}
		}
	}
</script>

<style scoped>
	@import url(./css/styleVar.css);
	.removeButton{
		cursor: pointer;
		background-color: transparent;
		transition: .2s;
		width: 15%;height: 20px;
		margin-top: 5px;
		margin-left: 5px;
		border-radius: 5px;
		position: relative;
	}
	.removeButton:hover{
		background-color:var(--mainColorGrayBg2);
	}
	.removeButton:hover::after{
		content: '移除';
		position: absolute;
		width: 70px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		top:0px;
		left:0px;
		text-align: center;
		font-weight: normal;
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	@keyframes showhover {
		from{
			opacity: 0;
			left: 0px;
		}to{
			opacity: 1;
			left:-80px;
		}
	}
	.defaultButton{
		cursor: pointer;
		background-color: transparent;
		transition: .2s;
		width: 15%;height: 20px;
		margin-top: 5px;
		margin-left: 5px;
		border-radius: 5px;
		position: relative;
	}
	.defaultButton:hover::after{
		content: '设为默认';
		position: absolute;
		width: 70px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		top:0px;
		left:0px;
		text-align: center;
		font-weight: normal;
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
</style>