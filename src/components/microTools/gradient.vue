<!--绘制渐变图-->
<template>
	<div class="gradient_main" style="width: 210px;height: 200px;">
		<!--顶部确认按钮-->
		<div @click="returnColor" class="confirm" v-if="!adding && !moving">
			<!--svg t="1657542307240" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
				p-id="2284" width="15" height="15" style="margin-top: 0px;margin-left: 8px;">
				<path
					d="M930.9618176 308.32612693c20.80003413-20.80003413 21.086208-54.23868587 0.63788373-74.68701013-20.44832427-20.44832427-53.886976-20.1621504-74.68701013 0.63788373L410.8025856 680.3881984 167.10806187 436.69476693c-20.8175104-20.8175104-54.26926933-21.11679147-74.7175936-0.6684672-20.44832427 20.44832427-20.1490432 53.9000832 0.6684672 74.7175936l280.04952746 280.04952747c20.8175104 20.8175104 54.26926933 21.11679147 74.7175936 0.6684672 0.14308693-0.14308693 0.2752512-0.29381973 0.41724587-0.4390912 0.14964053-0.14636373 0.30583467-0.28289707 0.45438293-0.43144533l482.26413227-482.26522454z"
					fill="#3662EC" p-id="2285"></path>
			</svg-->
			确认
		</div>
		<div style="width: 100%;height: 100%;border-radius: 10px;">
			<!--线性渐变-->
			<!--效果展示-->
			<div v-if="gradientType==0 || gradientType==3" @mousedown="startLine" @mouseout="endLine"
				id="imageGradientSource"
				@mouseup="endLine($event);moving=false;" @mousemove="moveAngleLine"
				style="border-radius: 10px;z-index: 2;;width: 207px;height: 100%;float: left;position: relative;"
				:style="{backgroundImage:`${gradient}`}">
				<h3 style="position: absolute;top: 10px;left: 50px;" v-if="mouseDown && lineWidth!=0">
					{{(rotate)+'deg'}}
				</h3>
				<div v-if="mouseDown && lineWidth!=0"
					style="pointer-events: none;position: absolute;height:2px;background-color: aliceblue;transform-origin: left center;"
					:style="{left:`${angleCenter.x+'px'}`,top:`${angleCenter.y+'px'}`,width:`${lineWidth+'px'}`,transform:`${'rotate('+(rotate-90)+'deg)'}`}">
					<div style="pointer-events: none;clip-path: polygon(0 0,100% 50%,0 100%);width: 9px;height: 9px;background-color:white;position: absolute;top: -3px;right: -3px;"
						v-if="lineWidth>0">
					</div>
				</div>
				<!--角度控制-->
				<div class="angle" @mouseup="mouseDown=false" @mousedown="mouseDown=true" @click="changeAngle"
					@mousemove.stop="moveAngleLine($event,0)"
					style="background-color: white;width: 70px;height:70px;position: absolute;top: -15px;left: -15px;border-radius:50%;transition: .2s; ;transform-origin: center;border: 1px dashed var(--mainColorBlue2);">
					<div id="angleDirect"
						style="pointer-events: none;background-color: var(--mainColorBlue2);width: 2px;left: 35px;top: 0;transform-origin:center bottom;height: 35px;position: absolute;border-radius: 5px;"
						:style="{transform:`${'translateX(-50%) rotate('+rotate+'deg)'}`}">
					</div>
					<!--快捷角度选择-->
					<div @click.stop="rotate=45*index;processColor()" v-for="(item,index) in linearDirect" :key="index"
						:style="{transform:`rotate(${45*index-4}deg)`}"
						style="width: 6px;height:40px;transform-origin:center bottom;position: absolute;left:32px;top: -5px;">
						<button
							style="width: 12px;height: 12px;background-color: var(--mainColorBlue);border: 1px solid white;position: absolute;top: 0;left: 0;border-radius: 50%;padding: 0;">
						</button>
					</div>
				</div>
				<!--添加按钮-->
				<div @click="adding=true" v-if="!adding"
					style="cursor: pointer;width: 30px;height: 13px;border-radius: 5px;background-color: white;border: 1px solid var(--mainColorBlue2);float: left;box-sizing: border-box;position: absolute;bottom:30px;right:5px">
					<svg t="1657429148519" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2285" width="15" height="15" style="margin-top: -2px;">
						<path
							d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
							fill="#8a8a8a" p-id="2286"></path>
					</svg>
				</div>
			</div>

			<!--径向渐变-->
			<div v-if="gradientType==1 || gradientType==4" @mousedown="mouseDown=true;moveRadialCenter($event,1)"
				id="imageGradientSource"
				@mouseout="mouseDown=false" @mouseup="mouseDown=false;moving=false;" @mousemove="moveRadialCenter"
				style="border-radius: 10px;z-index: 2;;width: 207px;height: 100%;float: left;position: relative;"
				:style="{backgroundImage:`${gradient}`}">
				<selectList 
					@mousedown.native="radial.openOption=true" 
					@change="selectChange_radial" ref="selectList"
					:selected="{'circle':'圆形','ellipse':'椭圆'}[radial.type]" :list="['圆形','椭圆']"
					style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 135px;top: -13px;z-index: 10;"
					:width="'65px'"></selectList>
				<!--圆心控制-->
				<div @mouseover.stop="radial.openOption=false;" @mousemove.stop=""
					style="background-color:rgba(255,255,255,0.5);width: 30px;height:30px;position: absolute;border-radius:50%;transform-origin: center;border: 1px dashed var(--mainColorBlue2);"
					:style="{left:`${(angleCenter.x-17)+'px'}`,top:`${(angleCenter.y-16)+'px'}`,pointerEvents:`${radial.openOption?'initial':'none'}`}">
					<div v-for="(item,index) in radialDirect" :key="index"
						:style="{transform:`rotate(${45*index-4}deg)`}"
						style="width: 6px;height:20px;transform-origin:center bottom;position: absolute;left:13px;top: -5px;">
						<button @mousedown.stop="processRadial(item[0],item[1])"
							style="width: 10px;height: 10px;background-color: var(--mainColorBlue);border: 1px solid white;position: absolute;top: 0;left: 0;border-radius: 50%;padding: 0;pointer-events: initial;cursor: pointer;">
						</button>
					</div>
				</div>
				<!--添加按钮-->
				<div @mousedown.stop="adding=true" v-if="!adding && !moving"
					:style="{pointerEvents:`${moving?'none':'intial'}`}"
					style="cursor: pointer;width: 30px;height: 13px;border-radius: 5px;background-color: white;border: 1px solid var(--mainColorBlue2);float: left;box-sizing: border-box;position: absolute;bottom:30px;right:5px">
					<svg t="1657429148519" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2285" width="15" height="16" style="margin-top: -4px;margin-left: 8px;">
						<path
							d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
							fill="#8a8a8a" p-id="2286"></path>
					</svg>
				</div>
			</div>

			<!--旋转渐变-->
			<!--此处同时也调用startLine重新对angleCenter点进行赋值-->
			<div v-if="gradientType==2 || gradientType==5" @mousedown="mouseDown=true;startLine($event);moveRadialCenter($event,1)"
				id="imageGradientSource"
				@mouseleave="mouseDown=false;" @mouseup="mouseDown=false;moving=false;" @mousemove="moveRadialCenter"
				style="border-radius: 10px;z-index: 2;;width: 207px;height: 100%;float: left;position: relative;"
				:style="{backgroundImage:`${gradient}`}">
				<!--圆心控制-->
				<div id="conicP" @mousedown.stop="mouseDown=true;"
					style="background-color:transparent;width: 50px;height:50px;position: absolute;border-radius:50%;transform-origin: center;border: 1px dashed var(--mainColorBlue2);"
					:style="{left:`${(angleCenter.x-27)+'px'}`,top:`${(angleCenter.y-26)+'px'}`,pointerEvents:`${mouseDown?'none':'initial'}`}">
					<div @mousedown.stop="changeAngle($event);"
						style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 2;background-color: transparent;border-radius: 50%;">
					</div>
					<div
						style="width: 13px;height:13px;border-radius: 10px;position: absolute;top: 18px;left: 19px;z-index: 3;background-color: rebeccapurple;">
					</div>
					<div id="angleDirect"
						style="pointer-events: none;background-color: var(--mainColorBlue2);width: 2px;left: 26px;top: 0;transform-origin:center bottom;height: 25px;position: absolute;border-radius: 5px;"
						:style="{transform:`${'translateX(-50%) rotate('+rotate+'deg)'}`}">
					</div>
					<div @mousedown.stop="rotate=45*index;processColor()" v-for="(item,index) in linearDirect"
						:key="index" :style="{transform:`rotate(${45*index-5}deg)`}"
						style="width: 6px;height:34px;transform-origin:center bottom;position: absolute;left:22px;top: -9px;">
						<button
							style="pointer-events: initial;width: 10px;height: 10px;background-color: var(--mainColorBlue);border: 1px solid white;position: absolute;top: 0;left: 0;border-radius: 50%;padding: 0;">
						</button>
					</div>
				</div>
				<!--添加按钮-->
				<div @mousedown.stop="adding=true" v-if="!adding && !moving"
					:style="{pointerEvents:`${moving?'none':'intial'}`}"
					style="cursor: pointer;width: 30px;height: 13px;border-radius: 5px;background-color: white;border: 1px solid var(--mainColorBlue2);float: left;box-sizing: border-box;position: absolute;bottom:30px;right:5px">
					<svg t="1657429148519" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2285" width="15" height="15" style="margin-top: -2px;">
						<path
							d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
							fill="#8a8a8a" p-id="2286"></path>
					</svg>
				</div>
			</div>

			<teleport to="body" v-if="showColorBord">
				<colorBord id="fontColorChose" @closeColorBord='showColorBord=false' :pre="preColor"
					style="position: fixed;z-index: 999;border-radius: 10px;overflow: hidden;box-shadow: -5px 5px 15px rgba(0,0,0,0.25);"
					@colorSet="colorSet" :style="{left:colorBordX+'px',top:colorBordY+'px'}"></colorBord>
			</teleport>
			<!--位置控制-->
			<div v-show="!moving"
				style="white-space: nowrap;display: flex;width: 207px;height:15px;position:relative;background-color: transparent;float: left;height: 50px;z-index: 3;">
				<!--位置控制-->
				<div style="width:100%;margin-left: 5px;float: left;">
					<div id="moveOut" class="gradientPositionOut"
						style="transition: .2s;transform-origin: center;border: 1px dashed var(--mainColorBlue2);"
						:style="{transform:(adding||spreadAP)?'scale(1.7) translate(7%,-15%)':'scale(1)',boxShadow:(adding||spreadAP)?'0px 0px 10px var(--mainColorGray2)':''}"
						@mouseup="endMove" @mousedown="positionDown($event)">
						<div v-if="mouseDown" draggable="false" @mousemove="movePosition($event)"
							@mouseout="mouseDown=false;" @dragstart.stop="preventDrag"
							style="width: 100%;height: 30px;position: absolute;top: -5px;left: 0;z-index: 999;background-color: transparent;">
						</div>
						<div v-for="(item,index) in gradientItems" :key="index"
							:style="{zIndex:index+1,backgroundColor:item['color'],pointerEvents:adding?'none':'initial'}"
							class="gradientPositionInner" style="z-index: 1;" @mousemove=""
							@mouseenter="setMoving($event,index)" @contextmenu="callmenu($event,index)">
							<div v-if="movingTarget==index" class="barInput"
								style="overflow: hidden;position: absolute;bottom: -25px;height: 20px;width: 40px;left: -10px;background-color: rgba(255,255,255);border-radius: 10px;"
								:style="{transform:(adding||spreadAP)?'scale(0.65)':'scale(1)'}">
								<input
									style="border: none;outline: none;width: 100%;height: 100%;text-align: center;background-color: transparent;"
									v-model="gradientItems[index].p" />
							</div>
						</div>
						<div @mousedown.stop="adding=false" v-if="adding || spreadAP"
							style="font-weight: normal;cursor: pointer;width: 30px;height: 15px;border-radius: 5px;background-color: white;border: 1px solid var(--mainColorBlue2);box-sizing: border-box;position: absolute;right: -40px;top: -2px;transform:scale(0.7) translateX(-50%);">
							<h3
								style="margin: 0;font-weight: normal;font-size: 12px;transform: scale(0.8) translateY(-10%);color:var(--mainColorBlue2)">
								取消</h3>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!--右键菜单-->
		<teleport to="body" v-if="menu.show">
			<div class="contextMenu" :style="{top:`${menu.top+'px'}`,left:`${menu.left+'px'}`}">
				<input id="gradientMenu"
					style="position: absolute;top: -40px;left: -20px;width: 0px;height:1px;outline: none;border: none;"
					@blur="blur" />
				<div class='rightButtonOptions' v-for="(item,index) in menu.options"
					@click="item.event();menu.show=false">
					{{item.name}}
				</div>
			</div>
		</teleport>
		<!--右键菜单-->
	</div>
</template>

<script>
	import colorBord from "./color.vue"
	import selectList from "./select.vue"
	export default {
		name: "gradient",
		components: {
			selectList,
			colorBord
		},
		props: {
			preGradient: {
				type: String,
				default: 'radial-gradient(circle at center center,#D16BA5 0%,#5FFBF1 100%)'
			},
			gType: { //默认渐变类型
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				moving: false, //标记是否在父组件移动，用于防止拖动位置或者方向时的受位置条阻挡
				preColor: "#FFF",
				showColorBord: false,
				gradientType: 0,
				typeList: ['linear-gradient', 'radial-gradient', 'conic-gradient', 'repeating-linear-gradient',
					'repeating-radial-gradient', 'repeating-conic-gradient'
				],
				gradient: "",
				gradientColors: "", //存储渐变颜色参数
				mouseDown: false,
				angleCenter: {
					x: 35,
					y: 35
				}, //角度设置器中心点位置
				rotate: 45,
				radial: {
					openOption: false, //控制移动还是点击
					type: "circle",
					x: 'center',
					y: 'center'
				},
				linearDirect: ["to right top", "to right", "to right bottom", "to bottom", "to left bottom", "to left",
					"to left top", "to top"
				],
				radialDirect: [
					['center', 'top'],
					['right', 'top'],
					['right', 'center'],
					['right', 'bottom'],
					['center', 'bottom'],
					['left', 'bottom'],
					['left', 'center'],
					['left', 'top']
				],
				lineWidth: 0,
				gradientItems: [{
					color: '#86A8E7',
					p: '0%'
				}, {
					color: '#5FFBF1',
					p: '100%'
				}], //渐变节点
				spreadAP: false,
				setPositionChild: null,
				adding: false, //标记处于添加状态
				movingTarget: 0,
				timer: null, //
				setTimer: null,
				newColor: "", //新颜色值
				afterColor: null, //获取颜色之后的操作事件
				colorBordY: 0, //颜色盘位置
				colorBordX: 0, //颜色盘位置
				menu: {
					show: false,
					top: 0,
					left: 0,
					options: []
				},
				backgroundColor:"#FFF",//背景色，以展示混合效果
			}
		},
		watch: {
			gradientItems: {
				handler: function(val) {
					if (this.setTimer != null) {
						clearTimeout(this.setTimer)
					}
					this.processColor()
				},
				deep: true,
				immediate: true
			}
		},
		beforeMount() {
			//this.prepare()//首先加载原先
		},
		mounted() {
			this.processColor()
			this.calcLeft()
		},
		methods: {
			setBlendMode:function(blendMode){
				document.getElementById("imageGradientSource").style.backgroundBlendMode=blendMode
			},
			splitData:function(gradient){//分离
				let p=gradient.split("(")[0]//渐变类型
				let pdata=gradient.split(p+"(")[1]//渐变具体部分
				let position=pdata.split(",")[0]//位置部分
				let colos=pdata.split(position+',')[1]//颜色部分
				let returnColos=[]//存储颜色数值
				let l=0,isHex=false
				let temp=""
				console.log(gradient,colos)
				for(let index=0;index<colos.length;index++){
					if(colos[index]=='#'){
						isHex=true
					}
					if(index==colos.length-1){
						returnColos.push(temp)
						temp=""
						break
					}
					if(!isHex){
						if(colos[index]==")"){
							l=1
							temp=temp.split(" ").join("")
						}
						if(l==1 && colos[index]==","){
							returnColos.push(temp)
							temp=""
							l=0
						}else{
							temp+=colos[index]
						}
					}else{
						if(colos[index]==','){
							returnColos.push(temp)
							temp=""
							isHex=false
						}else{
							temp+=colos[index]
						}
					}
				}
				return [p,position,returnColos]
			},
			prepare:function(pre=this.preGradient,pType=this.gType){
				console.log("en",pre)
				this.gradientType = pType
				let sp = this.splitData(pre)
				console.log(sp,'sp')
				let type = sp[0]
				let data = sp[2]
				let temp = []
				for (let index = 0; index < data.length; index++) {
					let dataInner = data[index].split(" ")
				
					if (this.gradientType == 2 || this.gradientType == 5) {
						dataInner[1] = dataInner[1].split("deg")[0]
						
					}
					temp.push({
						color: dataInner[0],
						p: dataInner[1]
					})
					dataInner = null
				}
				console.log("neibu",temp)
				if (this.gradientType == 0 || this.gradientType == 3) { //线性渐变 只有角度
					this.rotate = sp[1].split("deg")[0] * 1
				} else if (this.gradientType == 1 || this.gradientType == 4) { //径向渐变，需要类型与位置
					let f = sp[1].split(" ")
					this.radial.type = f[0]
					this.radial.x = f[2]
					this.radial.y = f[3]
					this.angleCenter.x = f[2].split("%")[0] * 207 / 100
					this.angleCenter.y = f[3].split("%")[0] * 200 / 100
				} else if (this.gradientType == 2 || this.gradientType == 5) { //旋转渐变，需要位置，旋转角度from rotate at x y
					let f =sp[1].split(" ")
					this.rotate = f[1].split("deg")[0] * 1
					if(this.rotate=='NaN')
						this.rotate=0
					this.radial.x = f[3]
					this.radial.y = f[4]
					this.angleCenter.x = f[3].split("%")[0] * 207 / 100
					this.angleCenter.y = f[4].split("%")[0] * 200 / 100
				}
				this.gradientItems = temp
				temp = null
				this.gradient = pre + ""
				
			},
			setType:function(type,gradient=null,color){//父组件设置类型
				this.backgroundColor=color
				if(type!=this.gradientType){
					let temp=[
						'linear-gradient(90deg,#D16BA5 0%,#5FFBF1 100%)',//线性渐变
						'radial-gradient(circle at center center,#D16BA5 0%,#5FFBF1 100%)',//径向渐变
						"conic-gradient(from 125deg at 51.21% 47.00%,#86A8E7 0deg,#2DDA83 219deg,#5FFBF1 360deg)",//旋转渐变\
						'repeating-linear-gradient(90deg,#D16BA5 0%,#5FFBF1 100%)',//线性渐变
						'repeating-radial-gradient(circle at center center,#D16BA5 0%,#5FFBF1 100%)',//径向渐变
						"repeating-conic-gradient(from 125deg at 51.21% 47.00%,#86A8E7 0deg,#2DDA83 219deg,#5FFBF1 360deg)",//旋转渐变\
					]
					this.prepare(gradient==null?temp[type]:gradient,type)
					temp=null
				}
			},
			processRadial: function(x, y) {
				if (['left', 'right', 'center'].includes(x)) {
					this.angleCenter.x = {
						'left': 0,
						'right': 207,
						'center': 103
					} [x]
				}
				if (['top', 'bottom', 'center'].includes(y)) {
					this.angleCenter.y = {
						'top': 0,
						'bottom': 200,
						'center': 100
					} [y]
				}
				this.radial.x = x
				this.radial.y = y
				if (this.gradientType == 1 || this.gradientType == 4) {
					this.gradient = `${this.typeList[this.gradientType]}(${this.radial.type} at ${x} ${y},${this.gradientColors})`
				} else if (this.gradientType == 2 || this.gradientType == 5) {
					//旋转时需要角度与圆心位置，rotate与radial中的xy
					this.gradient =
						`${this.typeList[this.gradientType]}(from ${this.rotate}deg at ${this.radial.x} ${this.radial.y},${this.gradientColors})`
				}
			},
			selectChange_radial: function(data) { //改变radial形状
				let type = ['circle', 'ellipse'][data['index']]
				if (this.radial.type != type) {
					this.radial.type = type
					this.processRadial('center', 'center')
				}
				type = null
				this.radial.openOption = false
			},
			processColor: function(e) {
				let gradient = this.typeList[this.gradientType]
				let colors = []
				let unit = ""
				if (this.gradientType == 2 || this.gradientType == 5) { //旋转渐变计算时不带单位，故此处需加上角度
					unit = "deg"
				}
				for (let index = 0; index < this.gradientItems.length; index++) {
					colors.push(`${this.gradientItems[index].color} ${this.gradientItems[index].p+unit}`)
				}
				colors = colors.join(",")
				this.gradientColors = colors
				if (this.gradientType == 0 || this.gradientType == 3) {
					gradient = gradient + "(" + this.rotate + 'deg,' + colors + ")"
				} else if (this.gradientType == 1 || this.gradientType == 4) {
					gradient = gradient + "(" + this.radial.type + " at " + this.radial.x + " " + this.radial.y + "," +
						colors + ")"
				} else if (this.gradientType == 2 || this.gradientType == 5) {
					//旋转时需要角度与圆心位置，rotate与radial中的xy
					gradient = `${gradient}(from ${this.rotate}deg at ${this.radial.x} ${this.radial.y},${colors})`
				}
				this.gradient = gradient
			},
			changeAngle: function(e) { //点击更改角度
				let x = e.offsetX,
					y = e.offsetY
				if (this.gradientType == 2 || this.gradientType == 5) {
					x += document.getElementById("conicP").offsetLeft
					y += document.getElementById("conicP").offsetTop
				}
				let dertaX = x - this.angleCenter.x,
					dertaY = y - this.angleCenter.y
				let tan = dertaY / dertaX
				let angle = Math.round(Math.atan(tan) / (Math.PI / 180))
				angle = angle + 90

				if (x < this.angleCenter.x && y > this.angleCenter.y) {
					angle += 180
				} else if (x < this.angleCenter.x && y < this.angleCenter.y) {
					angle += 180
				}
				if (angle >= 360) {
					document.getElementById("angleDirect").style.transition = "0s"
					angle = 0
				}
				if (x < this.angleCenter.x && angle < 180 && angle > 0) {
					angle += 180
				}
				if (y < this.angleCenter.y && 90 < angle && angle < 270) {
					angle -= 180
				}
				this.rotate = angle
				if (this.gradientType == 0 || this.gradientType == 3) {
					this.gradient = `${this.typeList[this.gradientType]}(${angle}deg,${this.gradientColors})`
				} else if (this.gradientType == 2 || this.gradientType == 5) {
					//旋转时需要角度与圆心位置，rotate与radial中的xy
					this.gradient =
						`${this.typeList[this.gradientType]}(from ${this.rotate}deg at ${this.radial.x} ${this.radial.y},${this.gradientColors})`
				}
			},
			startLine: function(e) {
				this.mouseDown = true
				this.angleCenter.x = e.offsetX
				this.lineWidth = 0
				this.angleCenter.y = e.offsetY
			},
			moveAngleLine: function(e, out = 1) { //只有在1的时候才会脱出方向线，防止在方向盘中使用时会引发事件穿插
				if (out) {
					if (this.mouseDown) {
						this.changeAngle(e)
						let x = e.offsetX,
							y = e.offsetY
						let width = Math.sqrt((Math.pow(x - this.angleCenter.x, 2) + Math.pow(y - this.angleCenter.y,
							2)))
						this.lineWidth = width
					}
				} else {

				}
			},
			moveRadialCenter: function(e, isDown = 0) { //径向渐变圆心位置
				
				if ((isDown || this.mouseDown) && !this.radial.openOption && (this.gradientType == 1 || this
						.gradientType == 4)) {
					let x = e.offsetX,
						y = e.offsetY
					this.angleCenter.x = x
					this.angleCenter.y = y
					this.moving = true
					this.processRadial((x * 100 / 207).toFixed(2) + "%", (y * 100 / 200).toFixed(2) + "%")
				} else if ((isDown || this.mouseDown) && (this.gradientType == 2 || this.gradientType == 5)) {
					let x = e.offsetX,
						y = e.offsetY
					this.angleCenter.x = x
					this.angleCenter.y = y
					this.moving = true
					this.processRadial((x * 100 / 207).toFixed(2) + "%", (y * 100 / 200).toFixed(2) + "%")
				}
			},
			endLine: function(e) {
				this.mouseDown = false;
				this.angleCenter.x = 35;
				this.angleCenter.y = 35;
				this.lineWidth = 0
			},
			calcPosition: function(x) {
				let data
				if (this.gradientType == 2 || this.gradientType == 5) {
					data = (x * 360) / 140
					if (data < 0) {
						data = 0
					} else if (data > 360) {
						data = 360
					}
				} else {
					data = (x * 100) / 140
					if (data < 0) {
						data = 0
					} else if (data > 100) {
						data = 100
					}
				}
				return data.toFixed(0)
			},
			positionDown: function(e) {
				this.mouseDown = true
				if (this.adding) {
					this.colorBordX = e.clientX
					this.colorBordY = e.clientY - 200
					this.showColorBord = true
					this.mouseDown = false
					let x = e.offsetX - 20
					let p
					if (this.gradientType == 2 || this.gradientType == 5) {
						p = this.calcPosition(x)
					} else {
						p = this.calcPosition(x) + "%"
					}
					this.afterColor = () => {
						let temp = JSON.parse(JSON.stringify(this.gradientItems))
						temp.push({
							color: this.newColor,
							p: p
						})
						if (this.gradientType == 2 | this.gradientType == 5) {
							temp.sort(function(a, b) {
								return a.p * 1 - b.p * 1;
							})
						} else {
							temp.sort(function(a, b) {
								return a.p.split("%")[0] * 1 - b.p.split("%")[0] * 1;
							})
						}

						this.gradientItems = temp
						temp = null
						this.adding = false
						this.$nextTick(() => {
							this.calcLeft()
							//this.processColor()
							this.afterColor = null
						})
					}
				}
			},
			callmenu: function(e, index) { //右键事件
				e.preventDefault()
				e.stopPropagation()
				this.menu.left = e.clientX
				this.menu.top = e.clientY
				let options = []
				if (this.gradientItems.length <= 2) {
					options = [{
							name: "删除",
							event: () => {
								alert("渐变需要至少2个颜色值")
							}
						},
						{
							name: "换色",
							event: () => {
								this.preColor = this.gradientItems[index].color
								this.afterColor = () => {
									this.gradientItems[index].color = this.newColor
								}
								this.colorBordX = e.clientX
								this.colorBordY = e.clientY - 200
								this.showColorBord = true
							}
						}
					]
				} else {
					options = [{
							name: "删除",
							event: () => {
								console.log("删除", index)
								this.gradientItems.splice(index, 1)
								this.calcLeft()
							}
						},
						{
							name: "换色",
							event: () => {
								this.preColor = this.gradientItems[index].color
								this.afterColor = () => {
									this.gradientItems[index].color = this.newColor
								}
								this.colorBordX = e.clientX
								this.colorBordY = e.clientY - 200
								this.showColorBord = true
							}
						}
					]
				}
				this.menu.options = options
				this.menu.show = true
				this.$nextTick(() => {
					document.getElementById("gradientMenu").focus()
				})
				console.log(this.menu.show)
				options = null
			},
			getLeft: function(index) {
				let p
				if (this.gradientType == 2 || this.gradientType == 5) {
					p = this.gradientItems[index].p * 1
					p = (p * 140 / 360) + 10
				} else {
					p = this.gradientItems[index].p.split("%")[0] * 1
					p = (p * 140 / 100) + 10
				}
				return p
			},
			blur: function(e) {
				setTimeout(() => {
					this.menu.show = false
				}, 200)
			},
			calcLeft: function() {
				let box = document.getElementById("moveOut")
				console.log(box.childNodes)
				for (let index in this.gradientItems) {
					index = index * 1
					let p = this.getLeft(index)
					console.log(p, index)
					box.childNodes[index + 2].style.left = (p - 10) + 'px'
				}
			},
			setMoving: function(e, index) {
				if (!this.mouseDown) {
					this.movingTarget = index

				}
			},
			endMove: function(e) {
				this.mouseDown = false
			},
			movePosition: function(e, index) {
				if (this.mouseDown) {
					let x = e.offsetX - 10
					let p = (e.offsetX - 10)
					if (p < 0) {
						p = 0
					} else if (p > 140) {
						p = 140
					}
					e.target.parentNode.childNodes[this.movingTarget + 2].style.left = p + 'px'
					let unit = "%"
					if (this.gradientType == 2 || this.gradientType == 5) {
						unit = ""
					}
					this.gradientItems[this.movingTarget].p = this.calcPosition(x) + unit
				}
			},
			addNode: function(e) {

			},
			preventDrag: function(e) {
				e.preventDefault()
			},
			colorSet: function(color) {
				console.log("color",color)
				this.newColor = color
				if (this.afterColor != null) {
					this.afterColor()
				}
			},
			returnColor: function(e) { //返回渐变图
			console.log("he",this.gradient)
				this.$emit("returnImage", this.gradient)
			}
		}
	}
</script>

<style>
	.gradientPositionOut {
		opacity: 0.5;
		border-radius: 5px;
		position: relative;
		height: 10px;
		background-color: rgba(255, 255, 255, 1);
		backdrop-filter: blur(3px);
		transform-origin: left center;
		width: 160px;
		margin-top: -45px;
		margin-bottom: 5px;
		float: left;
		transition: .2s;
	}

	.gradientPositionOut:hover {
		opacity: 1;
	}

	.barInput {
		opacity: 0;
		transition: .2s;
	}

	.gradientPositionOut:hover .barInput {
		opacity: 1;
	}

	.gradientPositionInner {
		cursor: pointer;
		width: 20px;
		height: 20px;
		position: absolute;
		left: 30px;
		top: -6px;
		border-radius: 50%;
		border: 1px dashed var(--mainColorBlue2);
		background-color: var(--mainColorBlue2);

	}

	.gradient_main {
		border-radius: 10px;
		width: 100%;
		height: 100%;
		background-color: transparent;
		position: relative;
	}

	.angle {
		transform: scale(0.4)
	}

	.angle:hover {
		transform: scale(1);
	}

	.gradientPosition {
		width: 8px;
		height: 100%;
		box-sizing: border-box;
		border-radius: 3px;
		background-color: rgba(255, 255, 255, 1);
	}

	.rightButtonOptions {
		min-height: 35px;
		height: auto;
		width: 90%;
		padding-left: 10px;
		line-height: 35px;
		font-weight: normal;
		color: rgba(0, 0, 0, 0.55);
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		cursor: pointer;
		font-size: 1rem;
		background-color: transparent;
		transition: .15s;

	}

	.rightButtonOptions:hover {
		background-color: var(--mainColorGray);
	}

	.confirm {
		position: absolute;
		right: 0px;
		bottom: 0px;
		background-color: white;
		color: var(--mainColorBlue2);
		width: 58px;
		font-size: 14px;
		line-height: 25px;
		text-align: center;
		font-weight: normal;
		letter-spacing: 2px;
		height: 25px;
		z-index: 3;
		border-radius: 8px;
		border: 1px dashed var(--mainColorBlue2);
		box-sizing: border-box;
		cursor: pointer;
		transition: .2s;
		transform-origin: center;
	}

	.confirm:hover {
		transform: scale(1.1);
	}

	.fa-arrow-right:before {
		content: "\f061"
	}

	.arrow {
		letter-spacing: 0.063em;
		text-align: center;
		-webkit-box-direction: normal;
		color: #fff;
		cursor: pointer;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		border: 0;
		vertical-align: baseline;
		transform: rotate(-45deg);
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
	}
</style>
