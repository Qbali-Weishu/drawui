<!--
	actionEdit.vue
	事件/函数流程编辑器
-->
<template>
	<div class="actionEditOut" @mousewheel="mouseScale">
		<div class="header" style="position: absolute;top: -45px;left: 0;z-index: 99999;border-radius: 10px;"  v-if="!provide">
			<button class="headerButton_home" @click="backToIndexLayer" >
				<svg t="1661691633689" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6453" data-spm-anchor-id="a313x.7781069.0.i6" style="margin-top: 3px;" width="24" height="24"><path d="M832 146.5H188.5c-53 0-96 43.1-96 96v460c0 53 43.1 96 96 96h120.1c15.9 0 28.8-12.9 28.8-28.8s-13-28.7-28.9-28.7h-120c-21.2 0-38.4-17.2-38.4-38.4v-460c0-21.2 17.2-38.4 38.4-38.4H832c21.2 0 38.4 17.2 38.4 38.4v460c0 21.2-17.2 38.4-38.4 38.4H712c-15.9 0-28.8 12.9-28.8 28.8s12.9 28.8 28.8 28.8h120c53 0 96-43.1 96-96v-460c0-53-43.1-96.1-96-96.1z" p-id="6454" data-spm-anchor-id="a313x.7781069.0.i7" class="" fill="#6D96FF"></path><path d="M769.5 621.9V319.4c0-15.8-13-28.8-28.8-28.8h-461c-15.8 0-28.8 13-28.8 28.8v302.5c0 15.8 13 28.8 28.8 28.8h461c15.9 0 28.8-12.9 28.8-28.8zM536.4 700.3c-15.6-15.3-41-15.4-56.6 0L351.6 826.5c-11.7 11.5-15.3 28.8-9 44 6.2 15.2 20.9 25.1 37.3 25.1h256.2c16.5 0 31.1-9.8 37.4-25.1 6.2-15.2 2.7-32.5-9-44L536.4 700.3zM422.1 838l86-84.7 86 84.7h-172z" p-id="6455" data-spm-anchor-id="a313x.7781069.0.i4" class="" fill="#6D96FF"></path></svg>
			</button>
			<button class="headerButton1" @click="showVarList=true" > 
				变量表
			</button>
			<button class="headerButton1" @click="callMethodsHub">
				函数库
			</button>
			<button class="headerButton1" @click="showEventComponents=true" >
				小组件
			</button>
			
			<h3 @click="redoAction" style="margin: 0;line-height: 40px;width: calc(100% - 420px);text-align: center;font-weight: normal;font-size: 18px;">
				事件编辑[ {{target}} ]
			</h3>
			<div style="height: 35px;transition: .2s;width: 30%;">
				<button v-if="showrecoverSizingCB" class="headerButton2" @click="recoverSizingAction" style="border-left: 1px solid var(--mainColorGray2);float: right;">
					展开
				</button>
				<!--退出按钮-->
				<button @click="quit" class="headerButton2" style="background-color: transparent;color: white;height: 25px;margin-top: 8px;float: right;">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
					
				</button>
			</div>
			<!--location定位输入框-->
			<div class="logicLocationBar" v-if="logicLocationOptions.show">
				<input v-model="logicLocationOptions.location" style="width: 80%;height: 30px;margin-top: 5px;background-color:white;outline:none;border:none;line-height:30px;margin-left: 10px;" placeholder="输入定位编码"/>
				<div style="width: calc(20% - 20px);height: 30px;background-color: transparent;cursor: pointer;" @click="logicLocation">
					<svg t="1661667141292" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top: 5px;float: right;margin-right: 10px;pointer-events: none;" p-id="2955" width="30" height="30"><path d="M513.799649 295.742238c-118.176919 0-214.158172 96.181215-214.158173 214.158172 0 118.176919 96.181215 214.158172 214.158173 214.158172 117.976958 0 214.158172-95.781293 214.158172-213.958211s-96.181215-214.358133-214.158172-214.358133z m0 367.328256c-84.383519 0-152.970123-68.586604-152.970124-152.970123s68.586604-152.970123 152.970124-152.970123 152.970123 68.586604 152.970123 152.970123-68.586604 152.970123-152.970123 152.970123z" fill="#6D96FF" p-id="2956"></path><path d="M991.306385 480.506151H913.9215c-7.198594-96.581136-48.190588-186.363601-117.377075-255.550088s-158.968951-110.178481-255.550088-117.377075V30.594025c0-16.796719-13.797305-30.594025-30.594025-30.594025s-30.594025 13.797305-30.594024 30.594025v76.984963c-96.381176 7.198594-186.363601 48.190588-255.550088 117.377075S114.077719 383.725054 106.879125 480.506151H30.694005c-16.796719 0-30.594025 13.797305-30.594025 30.594025s13.797305 30.594025 30.594025 30.594024h76.18512c7.198594 96.581136 48.190588 186.363601 117.377075 255.550088s158.968951 110.178481 255.550088 117.377075v78.784612c0 16.796719 13.797305 30.594025 30.594024 30.594025s30.594025-13.797305 30.594025-30.594025v-78.784612c96.381176-7.198594 186.363601-48.190588 255.550088-117.377075s110.178481-158.968951 117.377075-255.550088h77.384885c16.796719 0 30.594025-13.797305 30.594025-30.594024 0-16.99668-13.797305-30.594025-30.594025-30.594025zM753.1529 753.852763c-64.787346 64.787346-151.170475 100.580355-242.752588 100.580356-91.782074 0-177.965241-35.793009-242.752587-100.580356-64.787346-64.787346-100.580355-151.170475-100.580355-242.752587s35.793009-177.965241 100.580355-242.752588c64.787346-64.787346 151.170475-100.580355 242.752587-100.580355 91.782074 0 177.965241 35.793009 242.752588 100.580355 64.787346 64.787346 100.580355 151.170475 100.580355 242.752588s-35.593048 177.965241-100.580355 242.752587z" fill="#6D96FF" p-id="2957"></path></svg>
				</div>
			</div>
		</div>
		<!--访问路径-->
		<div class="header" style="background-color: white;border-bottom: 1px solid var(--mainColorGray4);border-radius: 15px 15px 0 0;height: 30px;" v-if="!provide">
			<div class="pathItem" v-for="(pathItem,index) in pathList" :key="index" @click="spreadPathBar($event,index)">
				{{pathItem.name}}
				<svg t="1661070301497" class="icon" viewBox="0 0 1024 1024" version="1.1" style="position: absolute;right: -20px;top: 3px;pointer-events: none;" xmlns="http://www.w3.org/2000/svg" p-id="3074" width="20" height="20"><path d="M326.4 838.4l352-352c12.8-12.8 32-12.8 44.8 0l0 0c12.8 12.8 12.8 32 0 44.8l-352 352c-12.8 12.8-32 12.8-44.8 0l0 0C313.6 876.8 313.6 851.2 326.4 838.4z" p-id="3075" fill="#6D96FF"></path><path d="M678.4 531.2 326.4 185.6c-12.8-12.8-12.8-32 0-44.8l0 0C339.2 128 358.4 128 371.2 134.4l352 352c12.8 12.8 12.8 32 0 44.8l0 0C710.4 544 684.8 544 678.4 531.2z" p-id="3076" fill="#6D96FF"></path></svg>
				
			</div>
			
		</div>
		<!--变量表-->
		<div class="varList" :style="{transform:`scale(${showVarList?'1':'0'})`}">
			<div @click="callAddGlobalVar" ref="addVarButton" style="transition: .2s;float: left;position: absolute;width: 80px;height: 25px;line-height: 25px;text-align: center;font-weight: normal;background-color: var(--mainColorBlue3);color: white;border-radius: 10px;margin: 8px;cursor: pointer;">
				新增
			</div>
			<div v-if="showAddVar" ref="addGlobalVar" class="newVarOut" style="z-index: 999;;overflow: hidden;position: absolute;top: 10px;left:30px;height: 75px;width: 100px;background-color: rgba(255,255,255,0.85);backdrop-filter: blur(15px);border-radius: 10px;box-shadow: 0 0 15px rgba(0,0,0,0.15);">
				<div class="newVarButton" @click.stop="addGlobalVarAction('common')">普通类型</div>
				<div class="newVarButton" @click.stop="addGlobalVarAction('jsonarray')">JSON / 数组</div>
				<input @blur="closeAddGlobalVar" style="position: absolute;width: 1px;height: 1px;background-color: transparent;outline: none;border: none;left: -10px;top: -10px;" ref="blurAddBar"/>
			</div>
			<button @click="showVarList=false" style="background-color: transparent;height: 30px;width: 40px;font-size: 14px;letter-spacing: 5px;color: var(--mainColorBlue2);float: right;margin-bottom: 5px;">
				<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
						<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
			
			</button>
			<div class="varItem" v-for="(varItem,index) in varList" :key="index">
				<!--只能抛出的锚点-->
				<button @click="copyVar(index)" style="width: 20px;height: 20px;padding: 0;margin: 0;margin-top: 10px;margin-left: 5px;background-color: transparent;">
					<svg t="1661176927855" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4607" width="20" height="20">
						<path d="M640 512h256c71.68 0 128 56.32 128 128v256c0 71.68-56.32 128-128 128h-256c-71.68 0-128-56.32-128-128v-256c0-71.68 56.32-128 128-128z" fill="#6D96FF" p-id="4608" data-spm-anchor-id="a313x.7781069.0.i9" class="">
							
						</path>
						<path d="M230.4 665.6c15.36 0 25.6 10.24 25.6 25.6s-10.24 25.6-25.6 25.6h-102.4C56.32 716.8 0 660.48 0 588.8v-460.8C0 56.32 56.32 0 128 0h460.8C660.48 0 716.8 56.32 716.8 128v102.4c0 15.36-10.24 25.6-25.6 25.6s-25.6-10.24-25.6-25.6v-102.4c0-40.96-35.84-76.8-76.8-76.8h-460.8C87.04 51.2 51.2 87.04 51.2 128v460.8c0 40.96 35.84 76.8 76.8 76.8h102.4z m204.8-307.2C394.24 358.4 358.4 394.24 358.4 435.2v460.8c0 40.96 35.84 76.8 76.8 76.8h460.8c40.96 0 76.8-35.84 76.8-76.8v-460.8c0-40.96-35.84-76.8-76.8-76.8h-460.8z m0-51.2h460.8C967.68 307.2 1024 363.52 1024 435.2v460.8c0 71.68-56.32 128-128 128h-460.8C363.52 1024 307.2 967.68 307.2 896v-460.8C307.2 363.52 363.52 307.2 435.2 307.2z" fill="#8a8a8a" p-id="4609" data-spm-anchor-id="a313x.7781069.0.i11" class="">
							
						</path></svg>
				</button>
				<input placeholder="变量名称" style="cursor: pointer;width: 28%;height: 35px;border: none;outline: none;background-color: transparent;color: var(--mainColorBlue2);margin-left:16px;"  v-model="varItem.name"/>
				<input placeholder="变量数据" style="cursor: pointer;width: 30%;height: 31px;margin-top: 2px;border: none;outline: none;background-color: white;box-shadow: 0px 0px 10px var(--mainColorGray2);border-radius: 10px;text-align: center;" @click='checkVarValue($event,varItem,index)' v-model="varItem.display" :style="{color:`${(['true','false','null','undefined'].includes(varItem.default) || typeof(varItem.default)=='object') || varItem.type=='object'?'var(--mainColorGreen)':'black'}`}"/>
				<button @click="editText($event,index)" style="width: 15%;height: 31px;margin-top: 2px;background-color: transparent;color: var(--mainColorBlue2);border-radius: 10px;margin-left: 5px;">注释</button>
				<button @click="removeVar(index)"  style="background-color: transparent;padding: 0;margin-left: 5px;">
					<svg t="1658236827983" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4317" width="20" height="20"><path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768z" p-id="4318" fill="#eb5744"></path><path d="M416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768z" p-id="4319" fill="#eb5744"></path><path d="M928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160z" p-id="4320" fill="#eb5744"></path><path d="M736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="4321" fill="#eb5744"></path></svg>
				</button>
			</div>
			<!--注释编辑框-->
			<div class="textEdit" v-if="showTextEdit">
				<textarea style="width: 93%;height: 80%;outline: none;border: none;background-color: transparent;resize:none;padding:10px;font-size:16px;box-sizing:border-box" 
				v-model="varList[varTextIndex].text" placeholder="请输入注释内容(自动保存)"></textarea>
				<button @click="showTextEdit=false" style="width:50px;height:15%;border-radius:10px;float:right;margin-right:10px;background-color:white;border:1px solid var(--mainColorBlue2);color:var(--mainColorBlue2);padding:0;box-sizing:border-box">
					关闭
				</button>	
			</div>
		</div>
		
		<!--悬浮提供的组件列表-->
		<teleport to="body">
			<div v-if="showEventComponents" class="componentList" style="position: absolute;top:calc(10vh + 40px);left:16vw;height:500px;width:200px;background-color: rgba(255,255,255,0.5);backdrop-filter:blur(10px);box-shadow: 0 0 15px rgba(0,0,0,0.15);z-index: 99999;">
				<!--展开后才显示的头部部分-->
				<div class="componentHeader" >
					<input style="margin-left: 5%;width: 45%;height:20px;border-radius: 10px;outline: none;border: 1px solid var(--mainColorBlue); background-color: white;text-align: center;float: left;" placeholder="查找组件"/>
					<button @click="showEventComponents=false;spreadEventComponents=false" style="width: 20%;border-radius: 10px;height:20px;color: var(--mainColorRed);float: right;background-color:transparent;height: 30px;margin-left: 5px;">
						关闭
					</button>
					<button style="width:20%;border-radius: 10px;color: var(--mainColorBlue2);float: right;background-color:transparent;height: 30px;margin-left: 0px;">
						导入
					</button>
				</div>
				<div style="height: calc(100% - 30px);width: 100%;background-color: transparent;position: relative;overflow-y: scroll;">
						<button class="comItem_provide" v-for="(comKey,index) in Object.keys(eventComponents)" @click="returnRequestECName(comKey)" :key="index">
							{{Object.prototype.toString.call(eventComponents[comKey].name)=='[object String]'?eventComponents[comKey].name:eventComponents[comKey].name.name}}
						</button>
				</div>
			</div>
		</teleport>
		
		<div   style="width: 100%;height: 35px;display: flex;position: absolute;background-color:white;z-index: 99;padding-top: 5px;box-sizing: border-box;">
			<div v-if="provide" class="provideBackButton" style="margin-top: 0px;background-color: transparent;" @click="quit">
				<svg t="1661672923723" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3931" style="position: absolute;left: 5px;top: 3px;" width="20" height="20"><path d="M325.818182 546.909091a35.141818 35.141818 0 0 1-24.669091-10.24 34.676364 34.676364 0 0 1 0-49.338182l372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182 49.338182l-372.363636 372.363636a35.141818 35.141818 0 0 1-24.669091 10.24z" p-id="3932" fill="#6D96FF"></path><path d="M698.181818 919.272727a35.141818 35.141818 0 0 1-24.669091-10.24l-372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182-49.338182l372.363636 372.363636a34.676364 34.676364 0 0 1 0 49.338182 35.141818 35.141818 0 0 1-24.669091 10.24z" p-id="3933" fill="#6D96FF"></path></svg>
				<h3 style="margin: 0;padding: 0;font-weight: normal;color: var(--mainColorBlue3);line-height: 20px;height: 20px;margin-left: 10px;margin-top: 3px;">上一层</h3></div>
			<!--形参列表-->
			<div class="propsItem" v-for="(item,index) in functionProps" :key="index" @dblclick="setProps(index)">
				{{item.name}}
			</div>
			<div style="margin-left: 5px;" class="addProps" @click="setProps()">
				<svg t="1661086368559" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 3px;pointer-events: none;margin-left: 5px;" xmlns="http://www.w3.org/2000/svg" p-id="16249" width="20" height="20">
					<path d="M553.924855 171.920558c-0.00921-13.028735 0.234337-26.574239-3.067872-38.96443-5.119601-19.218714-18.909675-30.887474-39.641859-30.297027-20.61348 0.585331-34.056654 12.429077-37.930891 32.254611-2.798742 14.3181-2.785439 29.319769-2.830465 44.020586-0.24764 80.400145 0.007163 160.801313-0.243547 241.201457-0.049119 15.670911-1.564635 31.338752-2.577708 50.239218-98.885148 0-192.211696-0.076748-285.538245 0.080841-14.731516 0.023536-29.743418-0.484024-44.128033 2.062985-21.678742 3.839445-35.698037 17.189498-35.279504 40.448224 0.417509 23.198352 15.137769 35.647895 36.541241 39.732933 11.136641 2.125407 22.8668 1.454118 34.331923 1.486864 47.583738 0.1361 95.1685 0.059352 142.752238 0.059352 48.931432 0.001023 97.861842 0.001023 154.017816 0.001023 0 23.531949 0 39.740096 0.001023 55.95029 0.002047 78.759785-0.140193 157.51957 0.134053 236.279355 0.051165 14.685467 0.190335 29.689183 3.109828 43.971467 4.095271 20.032242 18.065448 30.807656 38.755676 30.91408 20.958334 0.105401 34.201963-11.717879 38.899962-31.088042 3.034103-12.508895 2.701528-25.999141 2.709715-39.050388C554.080397 624.788809 554.087561 398.354684 553.924855 171.920558z" p-id="16250" fill="#6D96FF"></path><path d="M875.004571 471.123011c-31.028691-1.725294-62.22725-0.382717-93.352131-0.410346-32.763195-0.027629-65.586764-1.266853-98.271164 0.338714-29.446659 1.445932-46.768163 17.430998-47.673789 39.670511-0.910743 22.390963 16.537651 41.936111 44.455491 42.623773 65.485457 1.613754 131.064035 1.636267 196.550515 0.061398 29.308513-0.706081 45.031613-18.176988 44.598754-41.958624C920.885528 487.927745 905.33332 472.807373 875.004571 471.123011z" p-id="16251" fill="#6D96FF"></path></svg>
			</div>
			<!--函数模式-->
			<div v-if="provide" style="margin: 0;background-color:var(--mainColorGray3);color: var(--mainColorBlue3);cursor: pointer;height: 25px;line-height: 25px;border-radius: 10px;width: 80px;text-align: center;margin-left: 5px;" @click="callSelectObject">{{['( )=>','function( )'][object]}}</div>
			<selectListT  @change="selectChange_object" ref="selectList_object" v-if="showSelectObject && provide" :list="['( )=>','function( )']" @close="showSelectObject=false" :selected="['( )=>','function( )'][object]" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 153;" :width="'80px'"></selectListT>
		</div>
		<main  @click="closeAllFloat" @keydown="ecMainKeyDown" @contextmenu.stop="callMainAreaMenu" style="position: absolute;z-index: 1;overflow: scroll;width: 100%;height: calc(80vh - 40px);padding-top: 30px;box-sizing: border-box;"  ref="logicMain">
			
			<div style="display: none;">
				<!--远程组件挂载缓冲-->
				<div v-for="(newComId,index) in remoteEC" :key="index" >
					
				</div>
			</div>
			<!--位置箭头指向-->
			<teleport :to="'#'+positionArrow.target" v-if="positionArrow.show">
				<div v-if="positionArrow.show" style="position: absolute;z-index: 999999;width: 100px;height: 30px;transition: .2s;" ref="arrow" :style="{right:`${positionArrow.right}px`,top:`${positionArrow.top}px`}">
					<div style="position: relative;width: auto;height: 30px;background-color:#eb5744;text-align: center;line-height: 30px;font-weight: normal;border-radius: 10px;box-shadow: 0 0 30px rgba(0,0,0,0.1);color: white;cursor: pointer;">
						{{positionArrow.text}}
						<svg t="1661693703117" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position: absolute;left: 10px;bottom: -20px;" :style="{transform:`${positionArrow.rotate?'rotateY(180deg) rotate(0deg)':'rotateY(180deg) rotate(45deg)'}`}" p-id="8363" width="20" height="20"><path d="M1009.984 686.048l-111.968-112.016a47.984 47.984 0 1 0-67.856 67.888l30.064 30.064h-28.368v0.08h-92.096L241.92 174.064A47.84 47.84 0 0 0 207.984 160H48.016a48 48 0 0 0 0 96.016h140.08l497.824 498.016a47.84 47.84 0 0 0 33.92 14.064h140.272l-29.968 29.984a48 48 0 1 0 67.856 67.888l111.968-112.016A47.92 47.92 0 0 0 1024.032 720c0-13.264-5.376-25.264-14.048-33.952z" fill="#eb5744" p-id="8364"></path></svg>
					</div>
				</div>
			</teleport>
			<input  style="width: 1px;height:1px;position: absolute;left: -100px;top: -100px;outline: none;border: none;" @blur="befocused=false" ref="ecMainFocus"/>
			
			<div class="ecblock1 main" style="padding: 10px;box-sizing: border-box;position: relative;background-color: transparent;min-height: 50px;" ref="ecMain" draggable="false" :style="{transformOrigin:`${scaleCenter}`,transform:`scale(${scalePerCent})`}">
							<div class="areaContentLine">
					<!--顺序控制器-->
					<div class="logicViews" style="overflow-y: scroll;">
						<div class="logicIndexItem"  v-for="(indexItem,index) in logicIndex" :key="index" @contextmenu.stop="logicViewMenu($event,index)" @click="logicSelect?selectThisLogic(index):gotoArea(indexItem.index)">
							<div class="logicSelectCircle" v-if="logicSelect" :style="{backgroundColor:`${logicSelectedList[index]?'var(--mainColorBlue3)':'white'}`}" ></div>
							<div style="float: left;white-space:nowrap;text-overflow: ellipsis;overflow: hidden;">{{indexItem.name}}</div>
						</div>
					</div>
				</div>
				<div v-for="(item,index) in requestConponent" :key="index" class="componentArea" :id="item.newComId">
					<component 
						v-if="!item.remote"
						:is="item.name" 
						v-bind="item.data" 
						@removeChild="removeChild"
						@setChildHeight='setChildHeight'
						@setChildRemove='setChildRemove'
						@setPathList='setPathList'
						@gotoArea="gotoArea"
						@copy="copyECDom"></component>
				</div>
				<!--div  draggable="true" @drop="acceptInsert" style="margin-left:133px;bottom: -15px;display: inline-block;position: absolute;" class="insertECBar" >
				</div-->
				<div @click="requestNewComponent" draggable="false" @mousemove="null" @mousedown="" @mouseup="" 
				style="margin-left:60px;display: inline-block;position: absolute;background-color: var(--mainColorBlue3);transform:scale(1.2) ;width: 30px;height: 15px;border-radius: 5px;border: 1px solid var(--mainColorBlue3);box-sizing: border-box;cursor: pointer;" 
				ref="addNewButton" 
				:style="{top:`${logicIndex.length<2?60:logicIndex.length*30}px`}">
					<span class="spanItem" style="transform:translateX(-50%) rotate(0);pointer-events: none;margin: 0;"></span>
					<span class="spanItem" style="transform:translateX(-50%) rotate(90deg);pointer-events: none;margin: 0;"></span>
				</div>
				
			</div>
		</main>
		<teleport to="body" v-if="rightBarMenu.show">
			<input style="position: absolute;border: none;outline: none;top: -30px;left: -50px;width: 1px;height:1px;" @blur="closeBar" ref="inputForClose">
			<div class="ecRightBar" :style="{left:`${rightBarMenu.left}px`,top:`${rightBarMenu.top}px`}">
				<div class="ecRightBarItem" v-for="(option,index) in rightBarMenu.options" :key="index" @click="option.event" :style="{borderTop:`${option.partition?'2px solid rgba(128,128,128,0.5)':'none'}`,borderRadius:`${option.partition?'0 0 5px 5px':'5px'}`}">
					{{option.name}}
				</div>
			</div>
		</teleport>
		<teleport to="body" v-if="mainRightBarMenu.show">
			<input style="position: absolute;border: none;outline: none;top: -30px;left: -50px;width: 1px;height:1px;" @blur="closeBar" ref="inputForClose">
			<div class="ecRightBar" :style="{left:`${mainRightBarMenu.left}px`,top:`${mainRightBarMenu.top}px`}">
				<div class="ecRightBarItem" style="border-radius: 10px;" v-for="(option,index) in mainRightBarMenu.options" :key="index" @click="option.event" :style="{cursor:`${option.able?'pointer':'not-allowed'}`}">
					{{option.name}}
				</div>
			</div>
		</teleport>
		<!--重命名编辑框-->
		<teleport to="body" v-if="showRename">
			<div class="renamelogic">
				<input id="reNameLogic" @blur="checkShowRename" v-model="logicNewName" style="font-weight: normal;line-height: 30px;width: 90%;;margin-top: 10px;margin-left: 5%;height: 30px;outline: none;border: none;background-color: var(--mainColorGray3);color: rgba(21,21,21);text-align: center;border-radius: 10px;"/>
				<div style="width: 100%;display: flex;height: 30px;margin-top: 10px;background-color: transparent;">
					<div @click="showRename=false" style="cursor: pointer;margin-left: 2%;width: 47%;height: 30px;background-color: white;color:var(--mainColorBlue2);border-radius: 10px;;text-align: center;line-height: 30px;font-weight: normal;box-shadow: 0 0 15px rgba(0,0,0,0.1);">取消</div>
					<div @click="reNameAction" style="cursor: pointer;margin-left: 2%;width: 47%;height: 30px;background-color: var(--mainColorBlue2);color:white;border-radius: 10px;text-align: center;line-height: 30px;font-weight: normal;">确认</div>
				</div>
			</div>
		</teleport>
		<!--注释编辑框-->
		<teleport to="body" v-if="showExplain">
			<div class="writeexplain">
				<textarea id="explainLogic" @blur="checkShowExplain" v-model="logicNewExplain" style="font-weight: normal;line-height: 30px;width: 90%;margin-top: 10px;margin-left: 5%;height: 130px;outline: none;border: none;background-color: var(--mainColorGray3);color: rgba(21,21,21);border-radius: 10px;resize: none;padding: 5px;box-sizing: border-box;"></textarea> 
				<div style="width: 100%;display: flex;height: 30px;margin-top: 10px;background-color: transparent;">
					<div @click="showExplain=false" style="cursor: pointer;margin-left: 2%;width: 47%;height: 30px;background-color: white;color:var(--mainColorBlue2);border-radius: 10px;;text-align: center;line-height: 30px;font-weight: normal;box-shadow: 0 0 15px rgba(0,0,0,0.1);">取消</div>
					<div @click="writeExplainAction" style="cursor: pointer;margin-left: 2%;width: 47%;height: 30px;background-color: var(--mainColorBlue2);color:white;border-radius: 10px;text-align: center;line-height: 30px;font-weight: normal;">确认</div>
				</div>
			</div>
		</teleport>
		<!--代码编辑框-->
		
		<teleport to="body"  v-if="openCodeEditor">
			<div ref="showEditor" draggable="false" @dblclick.stop="editorDbClick" @mousedown.stop="startDown($event)" @mouseup.stop="endMove" @mouseleave.stop="endMove" @mousemove.stop="moveBord" style="width: 80vw;height:80vh;position: absolute;z-index: 99999;border-radius: 20px;box-shadow: 0 0 15px rgba(0,0,0,0.15);overflow: scroll;background-color: whitesmoke;transform-origin: left bottom" :style="{top:`${codeEditorPosition.y}`,left:`${codeEditorPosition.x}`,transform:`${hasScaleEditor?'translate(-50%,-50%) scale(0.35)':'translate(-50%,-50%) scale(1)'}`}">
				<div style="z-index: 9999;;width: 400px;height: 35px;margin: 0;padding: 0;background-color: transparent;position: absolute;top: 0;left: 0;">
					<h4 :eventTitle="monacoOption.title" class="eventTitle" style="z-index: 9999;;position: relative;white-space: nowrap;cursor: pointer;;text-overflow: ellipsis;margin: 0;margin-left: 8px;padding: 0;width: 150px;height: 35px;line-height: 35px;float: left;background-color: transparent;color: var(--mainColorBlue3);font-weight: normal;">
						<div style="width: 100%;height: 100%;overflow: hidden;text-overflow: ellipsis;background-color: transparent;">{{monacoOption.title}}
						</div>
					
					</h4>
					<div style="max-width: 300px;height: 35px;float: left;background-color: transparent;">
						<div @click="copyMonacoProps(index)" class="monacoProps" :propsTitle="item" style="position: relative;max-width: 100px;text-overflow: ellipsis;float: left;height: 30px;line-height: 30px;text-align: center;background-color: var(--mainColorBlue3);color: white;border-radius: 10px;padding-left: 8px;padding-right: 8px;margin-top: 3px;margin-left: 8px;cursor: pointer;" v-for="(item,index) in monacoOption.props" :key="index" >
							<div style="width: 100%;height: 100%;overflow: hidden;text-overflow: ellipsis;background-color: transparent;">{{item}}</div>
						</div>
					</div>
					
					<div v-if="monacoOption.object>-1" style="float: left;margin: 0;background-color:var(--mainColorGray3);color: var(--mainColorBlue3);cursor: pointer;height: 25px;line-height: 25px;border-radius: 10px;width: 80px;text-align: center;margin-left: 5px;margin-top: 5px;" @click="callSelectObject_monaco">{{['( )=>','function( )'][monacoOption.object]}}</div>
					<selectListT @change="selectChange_monacoObject" ref="selectList_monacoObject" v-if="showSelectObject_monaco && monacoOption.object>-1" :list="['( )=>','function( )']" @close="showSelectObject_monaco=false" :selected="['( )=>','function( )'][monacoOption.object]" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
				</div>
				<button @click="closeCode" draggable="false" style="position:relative;float: right;border: none;outline: none;border-radius: 10px;background-color: rgba(245,245,255,0.75);backdrop-filter: blur(10px);color: var(--mainColorBlue3);height: 30px;width: 50px;">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
						<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
				</button>
				<button @click="scaleCode" draggable="false" style="position:relative;float: right;border: none;outline: none;border-radius: 10px;background-color: rgba(245,245,255,0.75);backdrop-filter: blur(10px);color: var(--mainColorBlue3);height: 30px;width: 50px;">
					<svg t="1660884243062" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;" xmlns="http://www.w3.org/2000/svg" p-id="19130" width="20" height="20"><path d="M924 616a36 36 0 0 0-36 36v236H136V136h128a36 36 0 0 0 0-72H100a36 36 0 0 0-36 36v824a36 36 0 0 0 36 36h824a36 36 0 0 0 36-36V652a36 36 0 0 0-36-36z" p-id="19131" fill="#8a8a8a"></path><path d="M444 616h272a36 36 0 0 0 0-72H530.91l418.55-418.54a36 36 0 1 0-50.92-50.91L480 493.09V308a36 36 0 0 0-72 0v272a36 36 0 0 0 36 36z" p-id="19132" fill="#8a8a8a"></path></svg>
				</button>
				<monacoEditor ref="codeEditor" @close="openCodeEditor=false" :hasScale='hasScaleEditor' ></monacoEditor>
			</div>
		</teleport>
		
		<!--路径同级组件-->
		<teleport to="body" v-if="showPathBar" >
			<div  :style="{left:`${pathBarLeft}px`}" class="testBar" style="z-index: 9999;;width: 200px;max-height: 400px;min-height: 100px;overflow-y: scroll;background-color: rgba(255,255,255,0.75);backdrop-filter: blur(10px);box-shadow: 0 0 15px rgba(0,0,0,0.15);border-radius: 10px;position: absolute;top:calc(10vh + 35px)">
				<div v-for="(item,index) in viewPathItemList" class="spreadPathItem" :key="index" @contextmenu="pathContext($event,index)" @click="pathBarLogicSelectedList[index]=pathGotoArea(item.index);cons()" >
					<div style="position: absolute;top: 0;left: 0;width: 100%;height: 25px;z-index: 1;transition: .2s;" :style="{backgroundColor:`${pathBarLogicSelectedList[index]?'var(--mainColorBlue3)':'transparent'}`}"></div>
					<div class="pathBarText" :style="{color:`${pathBarLogicSelectedList[index]?'white':'var(--mainColorBlue3)'}`}" >{{item.name}}</div>
				</div>
			</div>
		</teleport>
		
		<!--形参修改-->
		<teleport to="body">
			<div class="editProps" ref="propsEdit" v-if="showEditProps">
				<div style="width: 100%;height: 35px;background-color: transparent;position: relative;">
					<h3 style="z-index: 1;;margin: 0;padding: 0;width: 70%;text-align: center;height: 35px;line-height: 35px;color: var(--mainColorBlack);font-weight: normal;">形参设置</h3>
					<button @click="()=>{closeEditProps()}" draggable="false" style="position:absolute;z-index: 99;;right: 0px;top:0px;border: none;outline: none;border-radius: 10px;background-color: transparent;backdrop-filter: blur(10px);color: var(--mainColorBlue3);height: 30px;width: 50px;">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 10px;pointer-events: none;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15" >
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
					</button>
				</div>
				<div class="headerItem">
					<div class="headerText">形参名称</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input placeholder="请输入形参名称" v-model="nowEditPropsData.name"/>
				</div>
				<div class="headerItem">
					<div class="headerText">默认值</div>
					<span style="margin-top: 12px;height: 5px;width: 20px;border-radius: 5px;background-color: var(--mainColorBlue3);"></span>
					<input placeholder="请输入形参默认值" v-model="nowEditPropsData.default" />
				</div>
				<div  v-if="nowEditPropsData.index!=-1" style="width: 60%;margin-left: 20%;height: 30px;display: flex;margin-top: 20px;">
					<button @click="removeProps" style="width: 50%;height: 30px;line-height: 30px;font-weight: normal;color: var(--mainColorRed);background-color: white;box-shadow: 0 0 15px rgba(0,0,0,0.1);border-radius: 10px;margin-left: 8px;margin-right: 8px;">删除</button>
					<button @click="saveProps" style="width: 50%;height: 30px;line-height: 30px;font-weight: normal;color: white;background-color: var(--mainColorBlue3);border-radius: 10px;margin-left: 8px;margin-right: 8px;">保存</button>
				</div>
				<button v-if="nowEditPropsData.index==-1" @click="saveProps" style="width: 50%;height: 30px;line-height: 30px;font-weight: normal;color: white;background-color: var(--mainColorBlue3);border-radius: 10px;margin-left: 25%;margin-top: 20px;">保存</button>
			</div>
		</teleport>
		
		<!--Object Array类型新增编写-->
		<teleport to="body" v-if="showEditJson">
			<div  style="z-index: 99999;;position: absolute;width: 500px;height: 300px;border-radius: 10px;overflow: hidden;box-shadow: 0 0 15px rgba(0,0,0,0.15);background-color: white;left: 50vw;top:50vh;transform: translate(-50%,-50%);">
				<div style="position: absolute;left: 0;top: 5px;font-weight: normal;line-height: 20px;margin-left:25px;color: var(--mainColorGray2);user-select: none;font-size: 13px;">变量名={ 数据 }</div>
				<div style="z-index: 999;;width: 150px;height: 25px;position: absolute;display: flex;right: 0px;top: 0px;">
					
					<button @click="saveJson" style="width: 130px;height: 25px;color: white;font-weight: normal;font-size: 14px;margin-top:2px;background-color: var(--mainColorBlue3);border-radius: 10px;cursor: pointer;">保存并退出</button>
					<div @click="closeEditJson" style="width: 40px;height: 25px;cursor: pointer;">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 8px;margin-left: 10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#111111" p-id="18203"></path></svg>
						
					</div>
				</div>
				<div style="width: 100%;height: calc(100% - 35px);margin-top: 35px;position: relative;">
					<newCode ref="editJson"></newCode> 
				</div>
			</div>
		</teleport>
		
		<!--逻辑定位列表-->
		<teleport to="body" v-if="locationLayers.show">
			<div style="width: 150px;right: 85vw;position: absolute;top: 10vh;height: 80vh;z-index: 9999;background-color: white;border-radius: 15px;">
				<div @click="quickLocation" style="width: 100%;height: 35px;font-weight: normal;color:var(--mainColorBlue3);line-height: 35px;padding-left: 10px;box-sizing: border-box;cursor: pointer;position: relative;">
					<svg t="1661672923723" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3931" style="position: absolute;left: 5px;top: 8px;" width="20" height="20"><path d="M325.818182 546.909091a35.141818 35.141818 0 0 1-24.669091-10.24 34.676364 34.676364 0 0 1 0-49.338182l372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182 49.338182l-372.363636 372.363636a35.141818 35.141818 0 0 1-24.669091 10.24z" p-id="3932" fill="#6D96FF"></path><path d="M698.181818 919.272727a35.141818 35.141818 0 0 1-24.669091-10.24l-372.363636-372.363636a34.909091 34.909091 0 0 1 49.338182-49.338182l372.363636 372.363636a34.676364 34.676364 0 0 1 0 49.338182 35.141818 35.141818 0 0 1-24.669091 10.24z" p-id="3933" fill="#6D96FF"></path></svg>
					<h3 style="margin: 0;padding: 0;color: var(--mainColorBlue3);line-height: 35px;margin-left: 15px;">返回</h3>
				</div>
				<div style="width: 100%;height: calc(100% - 35px);overflow: scroll;">
					<div class="locationLayerButton" v-for="(item,index) in locationLayers.list" :key="index" @click="copyLocationLayer(index,item.path)" :style="{backgroundColor:`${locationLayers.lastIndex==index?'var(--mainColorBlue3)':'white'}`,color:`${locationLayers.lastIndex==index?'white':'var(--mainColorBlue3)'}`}">
						{{item.name}}
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	import { structStore } from "../../store/struct.js";
	import { componentStore } from "../../store/componentsStore.js";
	import forCom from "../eventComponents/for.vue"
	import outputhook from "./hookOutPut.vue"
	import monacoEditor from "./monaco.vue"
	import selectListT from "./select2.vue"
	import jsonEditor from "./jsonEditor.vue"
	import newCode from "../eventComponents/tools/code.vue"
	import Worker from 'worker-loader!../../worker/logicCheck'
	const path=require("path")
	export default{
		name:"actionEdit",
		components:{
			outputhook,
			forCom,
			monacoEditor,
			selectListT,
			jsonEditor,
			newCode
		},
		props:{
			provide:{
				type:Boolean,
				default:false,//为true时为外部挂载
			},
			dataSource:{
				type:Object,
				default:{}
			},
			sourceXpath:""
		},
		data(){
			return {
				actionID:'',//事件唯一标识，用于定义区分的事件
				LOGICSOURCE:null,//当前编辑源
				type:0,//0为dom事件，1为函数编辑,用于控制起始节点与是否显示dom标签事件的快捷选项
				isDom:true,//true为标签事件，false为组件内部事件
				store:null,
				target:"",
				objectName:"",//对象名称 标签Id
				varList:[],//变量表
				nowEditVarIndex:-1,//当前所编辑的变量序号
				callObject:{
					edit:false,
					top:0,
					left:0
				},
				showTextEdit:false,//控制注释编辑框的显示 
				varTextIndex:"",//注释内容
				showVarList:false,
				eventComponents:[],//事件小组件列表
				showEventComponents:false,//是否显示组件库
				spreadEventComponents:false,//是否展开组件库
				ecList:[
					{
						parentXpath:'',
						ownPath:'for_SJIAJD',
						logicIndexList:[],
						callIndex:0
					},
					{
						parentXpath:'',
						ownPath:'for_SJIAJD',
						logicIndexList:[],
						callIndex:1
					}
					
				],
				childHeight:[],
				requestConponent:[],
				removeEvent:[],
				rightBarMenu:{
					selected:0,//被选中的序号
					show:false,
					left:0,
					top:0,
					options:[
						{name:"重命名",event:()=>{
								
								//注册回调事件
								System.renameLogicCallBack=(newName)=>{
									this.logicIndex[this.rightBarMenu.selected].name=newName
									let index=this.logicIndex[this.rightBarMenu.selected].index
									this.$refs["ecMain"].childNodes[index+2].querySelector('.header .logicName').innerText=newName
								}
								let xpath=this.xpath+"=>"+this.logicIndex[this.rightBarMenu.selected].xpath
								let prename=this.logicIndex[this.rightBarMenu.selected].name
								
								System.requestRenameLogic(xpath,prename)
							},partition:false},
							
						{name:"注释说明",event:()=>{
							
								let xpath="=>"+this.logicIndex[this.rightBarMenu.selected].xpath
								System.requestWriteExplain(xpath)
								
							},partition:false},
						{name:"选择",event:()=>{
							this.logicSelect=!this.logicSelect
							this.$nextTick(()=>{
								setTimeout(()=>{
									let nodes=document.getElementsByClassName('logicSelectCircle')
									for(let i=0;i<nodes.length;i++){
										let item=nodes[i]
										item.style.width="16px"
									}
									setTimeout(()=>{
										if(this.logicSelect){
											this.rightBarMenu.options[2].name="取消选择"
											this.rightBarMenu.options[5].name="复制选中"
											this.rightBarMenu.options[6].name="剪切选中"
											this.rightBarMenu.options[9].name="删除选中"
										}else{
											this.rightBarMenu.options[2].name="选择"
											this.rightBarMenu.options[5].name="复制"
											this.rightBarMenu.options[6].name="剪切"
											this.rightBarMenu.options[9].name="删除"
										}
									},200)
								},50)
							})
						},partition:false},
						{name:"上移",event:()=>{this.indexUp(this.rightBarMenu.selected)},partition:true},
						{name:"下移",event:()=>{this.indexDown(this.rightBarMenu.selected)},partition:false},
						
						{name:"复制",event:()=>{
							let index=this.logicIndex[this.rightBarMenu.selected].index
							if(this.logicSelect){
								let xpathList=[]
								for(let i=0;i<this.logicIndex.length;i++){
									if(this.logicSelectedList[i]){
										index=this.logicIndex[i].index
										xpathList.push(this.xpath+"=>"+this.logicIndex[index].xpath)
									}
								}
								System.copyEcNode(xpathList)
							}else{
								System.copyEcNode(this.xpath+"=>"+this.logicIndex[index].xpath)
							}
						},partition:true},
						{name:"剪切",event:()=>{
							let index=this.logicIndex[this.rightBarMenu.selected].index
							if(this.logicSelect){
								let tempLength=this.logicIndex.length
								//先复制所有
								for(let i=tempLength-1;i>-1;i--){
									if(this.logicSelectedList[i]){
										index=this.logicIndex[i].index
										System.copyEcNode(this.xpath+"=>"+this.logicIndex[index].xpath,null,true)
									}
								}
								//再删除所有
								for(let i=tempLength-1;i>-1;i--){
									if(this.logicSelectedList[i]){
										this.rightBarMenu.selected=i
										index=this.logicIndex[this.rightBarMenu.selected].index
										this.removeEvent[index]()
										this.logicIndex.splice(this.rightBarMenu.selected,1)
										this.logicSelectedList.splice(i,1)
									}
								}
								//删除完成后再统一重置logicIndex
								let tempIndex=[]
								this.logicIndex.forEach(item =>{
									tempIndex.push(item.xpath)
								})
								System.requestResetLogicIndex(this.xpath,tempIndex)
								tempIndex=[]
								//当所有元素被删除时自动将选择模式置为false
								if(this.logicIndex.length==0){
									this.logicSelect=false
									this.rightBarMenu.options[2].name="选择"
									this.rightBarMenu.options[5].name="复制"
									this.rightBarMenu.options[6].name="剪切"
									this.rightBarMenu.options[9].name="删除"
								}
							}else{
								let callBack=()=>{
									//要删除的对应Index
									this.removeEvent[index]()
									this.logicIndex.splice(this.rightBarMenu.selected,1)
									let tempIndex=[]
									this.logicIndex.forEach(item =>{
										tempIndex.push(item.xpath)
									})
									System.requestResetLogicIndex(this.xpath,tempIndex)
									tempIndex=[]
									
								}
								System.copyEcNode(this.xpath+"=>"+this.logicIndex[index].xpath,callBack)
							}
							
						}},
						{name:"粘贴在前",event:()=>{
							let positionIndex=this.rightBarMenu.selected
							System.pasteAction.call(this,positionIndex)
						}
						
						},
						{name:"粘贴在后",event:()=>{
							let positionIndex=this.rightBarMenu.selected+1
							System.pasteAction.call(this,positionIndex)
						}
						},
						{name:"提取路径",event:(item)=>{
							let allowed=true
							if(this.logicSelect){
								if(this.logicSelectedList.length>1){
									System.showToast("操作禁止,仅可对单一目标操作",2000)
									allowed=false
								}
							}
							if(allowed){
								let arrow=this.xpath==""?"":"=>"
								try{
									navigator.clipboard.writeText(this.xpath+arrow+this.logicIndex[this.rightBarMenu.selected].xpath)
									System.showToast("复制成功",2000)
								}catch{
									alert("写入剪贴板失败,请复制路径:"+this.xpath+arrow+this.logicIndex[this.rightBarMenu.selected].xpath)
								}
							}
						},
							partition:false,
						},
						{name:"删除",event:(item)=>{
							if(this.logicSelect){
								let tempLength=this.logicIndex.length
								for(let i=tempLength-1;i>-1;i--){
									if(this.logicSelectedList[i]){
										this.rightBarMenu.selected=i
										let index=this.logicIndex[this.rightBarMenu.selected].index
										this.removeEvent[index]()
										this.logicIndex.splice(this.rightBarMenu.selected,1)
										this.logicSelectedList.splice(i,1)
									}
								}
								if(this.logicIndex.length==0){
									this.logicSelect=false
									this.rightBarMenu.options[2].name="选择"
									this.rightBarMenu.options[5].name="复制"
									this.rightBarMenu.options[6].name="剪切"
									this.rightBarMenu.options[9].name="删除"
								}
							}else{
								let index=this.logicIndex[this.rightBarMenu.selected].index
								this.removeEvent[index]()
								this.logicIndex.splice(this.rightBarMenu.selected,1)
							}
							let tempIndex=[]
							this.logicIndex.forEach(item =>{
								tempIndex.push(item.xpath)
							})
							System.requestResetLogicIndex(this.xpath,tempIndex)
							tempIndex=[]
						},
						partition:true}
					]
				},
				logicIndex:[
					
				],
				xpath:"",
				keyBord:{
					ctrl:false
				},
				viewPathItemList:[
				],
				viewPathItemIndex:-1,
				pathList:[
				],//访问路径列表
				pathGotoArea:null,
				pathContext:null,
				pathBarLeft:0,
				showPathBar:false,
				scalePerCent:1,//缩放比例
				scaleCenter:"left top",//缩放中心点
				nowScrollTop:0,//已经滚动到的高度
				logicNewName:"",//记录修改的名字
				showRename:false,
				renameXpath:"",//需要修改的xpath
				logicNewExplain:"",//记录修改的名字
				showExplain:false,
				explainXpath:"",//需要修改的xpath
				remoteEC:[],//远程组件加载列表
				provideEcList:false,//标记组件列表加载目标,为true时时需悬浮
				codeEditCallBack:null,
				openCodeEditor:false,
				closeCodeEditor:false,
				codeEditorPosition:{x:"50vw",y:"50vh"},
				startTop:0,
				deltaY:0,
				bordLeft:0,
				bordTop:0,
				domOutDown:false,
				hasScaleEditor:false,
				deltaX:0,
				code:'',
				recoverSizingCB:null,//组件缩小回调事件
				showrecoverSizingCB:false,//组件展开按钮
				functionProps:[],//形参列表
				object:0,//函数形式
				showSelectObject:false,
				showSelectObject_monaco:false,
				floatEvent:[],//弹窗事件列表
				showEditProps:false,//控制形参编辑弹窗
				nowEditPropsData:{
					name:"",
					default:"",
					index:-1,
					hasEdit:false,//标记是否已经修改
				},
				monacoOption:{},
				logicSelect:false,//选择模式
				logicSelectedList:[],
				pathBarLogicSelectedList:[],//路由同级组件的选中列表
				showAddVar:false,
				timeout:null,
				addGlobalType:null,
				showEditJson:false,
				hasSaveJson:false,
				jsonDataEditCache:"Object",
				newJsonData:false,
				worker:null,
				workerTimeOut:null,
				mainRightBarMenu:{
					show:false,
					left:0,
					top:0,
					options:[
						{
							name:"刷新",
							event:()=>{
								if(this.allowRefresh){
									System.refreshEvent()
									this.allowRefresh=false
									setTimeout(()=>{
										this.allowRefresh=true
									},5000)
								}else{
									System.showToast("请勿频繁操作",2000)
								}
							},
							able:true
						},
						{
							name:"撤销",
							event:()=>{
								this.redoAction()
							},
							able:true
						},
						{
							name:"恢复撤销",
							event:()=>{
								this.undoAction()
							},
							able:true
						},
						{
							name:"逻辑预览",
							event:()=>{
								this.checkLogic()
							},
							able:!this.provide
						},
						{
							name:"逻辑定位",
							event:()=>{
								this.callLogicLocation()
							},
							able:true
						},

					],
				},
				logicLocationOptions:{
					show:false,
					pathList:[],
					location:"",
				},
				locationLayers:{
						show:false,
						lastIndex:-1,
						list:[]
				},
				closeChildLayers:[],//存储所有子层关闭事件
				allowRefresh:true,//是否允许重新加载
				positionArrow:{
					show:false,
					text:"",
					left:-100,
					top:-100,
					target:"actionEdit",
					rotate:false
				},
				editStack:[],//操作栈
				undoStack:[],//重做栈
				befocused:false,//当前面板被点击，用于定位当前组件的事件，空白处被点击时才会执行其他操作
				scrollTimeout:null
			}
			
		},

		beforeMount(){
			
		},
		mounted(){
			if(this.provide)
				this.actionID=System.requestNewXpathID()
			System.requestCallTarget=()=>{
				return this
			}
			//修改位置箭头left - top
			window['setArrowPostion'+this.actionID]=(x,y,name,target)=>{
				this.positionArrow.target=target
				this.positionArrow.show=true
				this.positionArrow.text=name
				this.positionArrow.right=x
				this.positionArrow.top=y
			}
			if(!this.provide){
				
				//console.log(JSON.parse(JSON.stringify(this.store)))
				//向服务器请求组件列表
				let http=new XMLHttpRequest()
				let _this=this
				http.open("POST","/common/project/event/components",true)
				http.onreadystatechange=function(){
					if(http.readyState==4 && http.status==200){
						_this.eventComponents=JSON.parse(http.responseText)
					}
				}
				http.send(null)
				//this.setEditData(1,true,'function1')
				//注册请求选择新增组件的操作
				System.requestECList=this.requestEventComponent_list
				
				//注册请求新增组件的操作
				System.requestEC=this.requestEventComponent
				
				//注册新增组件的事件数据插入操作
				System.insertToLogic=this.insertToLogic
				
				//注册已有组件的逻辑内容修改操作
				System.requestSetLogicContent=this.requestSetUserDefine
				
				//注册请求生成新组建ID的操作
				System.requestNewXpathID=this.randomName
				
				//注册远端组件请求唯一标识
				System.remoteEmitId=this.randomName
				
				//注册组件删除事件
				System.requestRemoveEC=this.removeFromLogic
				
				//注册新增回调事件
				System.requestEcCallBack=null
				
				//注册变量名检查事件
				System.requestCheckVar=this.drawUI_checkVar
				
				//注册事件逻辑先后顺序修改与移除后修改logicIndex的操作
				System.requestResetLogicIndex=this.requestResetLogicIndex
				
				//注册子逻辑请求logic内容操作
				System.requestLogicContent=this.provideLogicContent
				
				//粘贴逻辑
				System.pasteLogic=this.pasteLogic
				
				//
				System.getLogic=null
				
				//注册逻辑重命名事件
				System.requestRenameLogic=this.renameLogic
				
				//注册逻辑命名结束回调事件
				System.renameLogicCallBack=null
				//注册逻辑注释编辑事件
				System.requestWriteExplain=this.writeExplain
				
				//注册请求获取其他组件数据
				System.requestGetOtherUserDefine=this.getOtherUserDefine
				//注册请求修改其他组件数据
				System.requestSetOtherUserDefine=this.setOtherUserDefine
				
				//注册远端组件数据
				System.remoteEc={}
				
				//注册指定位置跳转事件
				System.scrollTimeout=null
				System.ecScrollToArea=function(option,targetBox,logicName=""){
					this.$nextTick(()=>{
						let boxTop=option.top
						let temBox=targetBox
						let x=0,y=0
						try{
							while(temBox!=this.$refs['ecMain']){
								
								boxTop+=temBox.offsetTop
								x+=temBox.offsetLeft
								temBox=temBox.parentNode
							}
						}catch{}
						option.top=boxTop
						
						
						option.top=option.top*this.scalePerCent
						
						
						try{
							if(System.scrollTimeout!=null)
								clearTimeout(System.scrollTimeout)
							System.scrollTimeout=setTimeout(()=>{
								option.top=targetBox.getBoundingClientRect().y-this.$refs['logicMain'].getBoundingClientRect().y+this.$refs['logicMain'].scrollTop-80
								if(option.top<50) option.top=0
								this.$refs['logicMain'].scrollTo(option)
								this.$nextTick(()=>{
										let box=this.$refs['logicMain']
										let offsetTop=box.offsetTop
										let dis=Math.abs(offsetTop-this.nowScrollTop)
										this.nowScrollTop=offsetTop
										box=targetBox.childNodes[0]
										/*box.style.animationDelay=`.${(dis / 3).toFixed(0)}s`
										box.style.animationDuration="2s"
										box.style.animationName=`scrollEnd`*/
										this.$refs['logicMain'].scrollTo(option)
										/*setTimeout(()=>{
											box.style.animation=""*/
											/*let bound=box.childNodes[0].getBoundingClientRect()
											let x=bound.x.toFixed(0)*1+bound.width
											let y=bound.y*/
										/*},3000)*/
										//x=x+targetBox.childNodes[0].offsetWidth-60
										let y=option.top-30
										y=-35
										x=-108
										if(y<35){
											
											this.positionArrow.rotate=true
										}else{
											
											this.positionArrow.rotate=false
										}
										let target=targetBox.childNodes[0].id
										window['setArrowPostion'+this.actionID](x,y,logicName,target)
								})
								System.scrollTimeout=null
							},200)
							
						}catch{}
						
					})
				}
				
				//注册子组件获取其argument数据
				System.requestArgument=this.returnUserDefine  
				
				//注册子元素获取后请求返回,具体由子组件中自定义
				System.acceptArgument=()=>{}
				
				//保存变量引出的作用域
				System.varPermitAreaPath=""
				
				//检查变量先后作用域
				System.requestCheckVarArea=this.requestCheckVarArea
				
				System.provideAllowGetData=(data)=>{
					if(this.eventComponents[data.ecName]==undefined){
						this.eventComponents[data.ecName]={
							unshow:data.unshow,
							allowdGetIndex:data.allowdGetIndex,
							name:""
						}
					}
				}
				//唤起代码编辑框
				System.callOpenCode=(callBack,preCode,options={})=>{
					this.codeEditCallBack=callBack
					this.createCodeEditor(preCode,options)
				}
				//为子iframe提供代码传入通道
				window.setCodeData=(text,canvas)=>{
					this.codeEditCallBack(text,canvas)
					if(this.closeCodeEditor){
						this.openCodeEditor=false
						this.closeCodeEditor=false
					}
				}
				

				
				//组件缩小事件
				System.requestBrowSizing=this.requestBrowSizing
				
				//子组件相应当前聚焦路径，递归上传
				System.insertPathList=this.insertToPathList
				
				//清空路径列表
				System.clearPathList=()=>{
					this.pathList=[]
				}
				
				System.copyEcNode=this.copyECDom
				
				System.pasteAction=function(positionIndex){
					console.log(this.xpath,'patse')
					let pasteList=System.getCutBord()
					console.log("剪贴板数据",pasteList)
					if(pasteList){
						let xpathName=""
						let tempLogicIndex=[]
						let pastePath
						let preRequestLength=this.requestConponent.length
						let action=true
							if(pasteList.type=="list_ecNode"){
								pasteList.data.forEach(item => {
									xpathName=item.nodeName.split("_")
									//重新生成标识ID
									xpathName[1]=System.requestNewXpathID()
									xpathName=xpathName.join("_")
									pastePath=this.xpath+"=>"+xpathName
									System.pasteLogic(pastePath,item.data)
									tempLogicIndex.push({
										name:item.data.ecTitle,//加载标题
										index:preRequestLength,//加载指向的索引,
										xpath:xpathName//加载指向的逻辑键名
									})
									preRequestLength++
								})
							}else if(pasteList.type=='ecNode'){
								xpathName=pasteList.option.nodeName.split("_")
								//重新生成标识ID
								xpathName[1]=System.requestNewXpathID()
								xpathName=xpathName.join("_")
								pastePath=this.xpath+"=>"+xpathName
								System.pasteLogic(pastePath,pasteList.data)
								tempLogicIndex.push({
									name:pasteList.data.ecTitle,//加载标题
									index:preRequestLength,//加载指向的索引,
									xpath:xpathName//加载指向的逻辑键名
								})
							}else{
								action=false
								System.showToast("暂无可粘贴节点",2000)
							}
							if(action){
								//在指定位置插入
								console.log("insertBefore",JSON.parse(JSON.stringify(this.logicIndex)),...tempLogicIndex)
								this.logicIndex.splice(positionIndex,0,...tempLogicIndex)
								console.log("insertAfter",JSON.parse(JSON.stringify(this.logicIndex)),...tempLogicIndex)
								let tempIndex=[]
								this.logicIndex.forEach(item =>{
									tempIndex.push(item.xpath)
								})
								//插入逻辑顺序
								System.requestResetLogicIndex(this.xpath,tempIndex)
								//重新加载逻辑
								this.processLogic(false)
								//排序
								setTimeout(()=>{
									this.$nextTick(()=>{
										this.setChildHeight(-1,0,false,{indexs:this.logicIndex,from:0,to:0})
										tempIndex=null
									})
								},200)
							}
							pasteList=null
							xpathName=null
							tempLogicIndex=null
							pastePath=null
							
							preRequestLength=null
					}else{
						System.showToast("暂无可粘贴节点",2000)
					}}
				
				//组件描述存储，用于检查逻辑
				try{
					let data=localStorage.getItem("comDesc")
					if(data) System.comDesc=Object.assign(JSON.parse(data))
					else System.comDesc={}
				}catch{}
				
				System.pushComDesc=(key,desc,till="")=>{
					if(!System.comDesc[key]){
						System.comDesc[key]={
							head:desc,
							till:till
						}
					}else if(System.comDesc[key].head!=desc || System.comDesc[key].till!=till){
						System.comDesc[key]={
							head:desc,
							till:till
						}
						localStorage.setItem("comDesc",JSON.stringify(System.comDesc))
					}
					console.log(System.comDesc)
				}
				
				//根据xpath获取location数字定位标识
				System.requestGetLogicLocation=this.createLocation
				
				
				//请求跳转到制定逻辑位置
				let lastTarget={}
				System.nextLocation=(targetThis)=>{
					let lastIndex=this.locationLayers.lastIndex
					try{
						if(targetThis.xpath==lastTarget.xpath){
							this.toTargetLocation(this.locationLayers.list[lastIndex].path,lastIndex,targetThis)
						}else{
							this.toTargetLocation(this.locationLayers.list[lastIndex+1].path,lastIndex+1,targetThis)
							lastTarget=targetThis
						}
					}catch{
						System.showToast("操作禁止",2000)
					}	
				}
				
				System.clearChildAction=(target=null,value=null)=>{
					if(target==null){
						this.locationLayers.list=[]
						this.locationLayers.show=false
						this.locationLayers.lastIndex=-1
					}else{
						let data
						try{
							data=JSON.stringify(value)
						}catch{
							data=value
						}
						new Function(`this.${target}=${data}`).call(this)
					}
				}
				
				//接收子层传入关闭事件
				System.requestInsertLayerClose=(event)=>{
					this.closeChildLayers.push(event)
				}
				
				
				
			}else{
				this.xpath=this.sourceXpath
				this.store=this.dataSource.store
				//外部调用只需要这三个参数,isDom在打开的时候已经加载，直接传入即可
				this.setEditData(this.dataSource.type,this.isDom,this.dataSource.name)
				this.$nextTick(()=>{
					this.initLogic(this.dataSource.logic,this.dataSource.logicIndexKey)
					System.requestInsertLayerClose(this.quit)
				})
				
			}
			this.$nextTick(()=>{
				System.clearPathList()
			})
			
		},
		methods:{
			cons:function(){
				console.log(this.pathBarLogicSelectedList)
			},
			processLogic:function(insert=true){
				this.$nextTick(()=>{
					//
					this.logicIndex=[]
					this.requestConponent=[]
					this.childHeight=[]
					let mylogic,myLogicIndexKey;
					//注册获取逻辑事件
					System.getLogic=(logic,logicIndexKey)=>{
						mylogic=logic
						myLogicIndexKey=logicIndexKey
						//console.log("初始化",myLogicIndexKey,mylogic)
					}
					//请求系统提取子逻辑节点，在提取操作中执行上方获取事件
				
					System.requestLogicContent(this.xpath)
					
						
					this.initLogic(mylogic,myLogicIndexKey,insert)
					//window.addEventListener("")
				})
			},
			mouseScale:function(e){
				//编辑界面缩放
				if(window.Control){
					this.scaleCenter=`${e.offsetX}px ${e.offsetY}px`
					if(e.deltaY>0){
						let temp=this.scalePerCent+0.2
						if(temp< 1 && (1-temp)<0.2){
							temp=1
						}
						this.scalePerCent=temp
					}else{
						let temp=this.scalePerCent-0.2
						if(temp<=0){
							temp=this.scalePerCent/2
							if(temp<=0.1){
								temp=0.01
							}
							
						}
						this.scalePerCent=temp
					}
				}
			},
			reNameCallBack:function(newName){
				//解决new Function指向问题
				System.renameLogicCallBack(newName)
			},
			checkShowRename:function(){
				setTimeout(()=>{
					this.showRename=false
				},200)
			},
			checkShowExplain:function(){
				setTimeout(()=>{
					this.showExplain=false
				},200)
			},
			getPathString:function(xpath){
				let xpathList=xpath.split("=>")
				let pathString=""
				let newKey=xpathList[xpathList.length-1]
				let lastOne=xpathList[xpathList.length-1]
				if(lastOne.length==0||lastOne==''){
					xpathList.length-=1
				}
				let tempXpathList=[]
				xpathList.forEach(item=>{
					if(item.length!=0 && item!=""){
						tempXpathList.push(item)
					}
				})
				if(tempXpathList.length>0)
					pathString="."+tempXpathList.join(".logic.")
				tempXpathList=null
				return [pathString,lastOne]
			},
			reNameAction:function(){
				let xpath=this.renameXpath
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let [pathString,lastOne]=this.getPathString(xpath)
				console.log(pathString)
				try{
					new Function(`
								//插入操作栈
								this.pushToActionStack("this.LOGICSOURCE.logic${pathString}.ecTitle","change",this.LOGICSOURCE.logic${pathString}.ecTitle+"")
							
								this.LOGICSOURCE.logic${pathString}.ecTitle='${this.logicNewName}'
								alert("修改成功")
								//console.log(this.LOGICSOURCE)
								this.reNameCallBack('${this.logicNewName}')
								this.showRename=false
								`).call(this)
					return true
				}catch(e){
					console.error(e)
					return false
				}
			},
			renameLogic:function(xpath,preName){
				this.renameXpath=xpath
				this.logicNewName=preName
				this.showRename=true
				this.$nextTick(()=>{
					document.getElementById("reNameLogic").focus()
				})
			},
			writeExplainAction:function(){
				let xpath=this.explainXpath
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let [pathString,lastOne]=this.getPathString(xpath)
				try{
					new Function(`
								//插入操作栈
								this.pushToActionStack("this.LOGICSOURCE${pathString}.ecExplain","change",this.LOGICSOURCE${pathString}.ecExplain+"")
								this.LOGICSOURCE${pathString}.ecExplain='${this.logicNewExplain}'
								alert("修改成功")
								this.showExplain=false
								`).call(this)
					return true
				}catch(e){
					console.error(e)
					return false
				}
			},
			writeExplain:function(xpath){
				this.explainXpath=xpath
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let xpathList=xpath.split("=>")
				let [pathString,lastOne]=this.getPathString(xpath)
				try{
					new Function(`
								this.logicNewExplain=this.LOGICSOURCE.logic${pathString}.ecExplain
								`).call(this)
				}catch(e){
					console.error(e)
					return false
				}
				this.showExplain=true
				this.$nextTick(()=>{
					document.getElementById("explainLogic").focus()
				})
			},
			editEventPrototype:function(xPath,data){//供事件小组件提供其数据后插入到当前事件/函数的数据中
				
			},
			requestEventPrototype:function(targetName){//供事件小组件请求其他小组件数据
				
			},
			recoverSizingAction:function(){
				try{
					this.recoverSizingCB()
				}catch{
					System.showToast("组件展开失败",1000)
				}
				this.recoverSizingCB=null
				this.showrecoverSizingCB=false
			},
			requestBrowSizing:function(recoverSingzing){
				this.recoverSizingCB=recoverSingzing
				this.showrecoverSizingCB=true
			},
			requestCheckVarArea:function(sourcePath,usePath,type='up'){
				//						\_________/\_______/
				//							|			|	
				//						被调用的地址	调用的地址
				let sourcePathNumber="",usePathNumber=""
				let tempSource=JSON.parse(JSON.stringify(this.LOGICSOURCE.logic))//逻辑入口
				let tempSourceIndexKey=JSON.parse(JSON.stringify(this.LOGICSOURCE.logicIndexKey))//逻辑入口
				let [sourceArray,sourceMaxLength]=this.createLocation(sourcePath)
				let [useArray,useMaxLength]=this.createLocation(usePath)
				let maxLength=Math.max(sourceMaxLength,useMaxLength)
				for(let i=0;i<sourceArray.length;i++){
					sourceArray[i]=sourceArray[i].padStart(maxLength,"0")
				}
				for(let i=0;i<useArray.length;i++){
					useArray[i]=useArray[i].padStart(maxLength,'0')
				}
				sourcePathNumber=sourceArray.join("")
				usePathNumber=useArray.join("")
				/*let xpathList=sourcePath.split("=>")
				if(sourcePath.startsWith("=>")){
					xpathList.splice(0,1)
				}
				
				this.createLocation(sourcePath)
				
				xpathList.forEach(pathItem => {
					try{
						let tempSplit=pathItem.split(".")
						sourcePathNumber+=tempSourceIndexKey.indexOf(tempSplit[0])
						if(tempSplit[tempSplit.length-1].length==0){
							tempSplit.pop()
						}
						if(tempSplit.length>1){
							for(let i=0;i<tempSplit.length-1;i++){
								tempSource=tempSource[tempSplit[i]]
							}
							//存在.xxx.xxx时将pathItem重新指向最后一个
							pathItem=tempSplit[tempSplit.length-1]
						}
						tempSourceIndexKey=tempSource[pathItem].logicIndexKey
						tempSource=tempSource[pathItem].logic
						
					}catch{}
					
				})
				tempSource=JSON.parse(JSON.stringify(this.LOGICSOURCE.logic))//逻辑入口
				tempSourceIndexKey=JSON.parse(JSON.stringify(this.LOGICSOURCE.logicIndexKey))//逻辑入口
				
				xpathList=usePath.split("=>")
				if(usePath.startsWith("=>")){
					xpathList.splice(0,1)
				}*/
				/*xpathList.forEach(pathItem => {
					try{
						let tempSplit=pathItem.split(".")
						usePathNumber+=tempSourceIndexKey.indexOf(tempSplit[0])
						if(tempSplit[tempSplit.length-1].length==0){
							tempSplit.pop()
						}
						if(tempSplit.length>1){
							for(let i=0;i<tempSplit.length-1;i++){
								tempSource=tempSource[tempSplit[i]]
							}
							//存在.xxx.xxx时将pathItem重新指向最后一个
							pathItem=tempSplit[tempSplit.length-1]
						}
						
						tempSourceIndexKey=tempSource[pathItem].logicIndexKey
						tempSource=tempSource[pathItem].logic
						
					}
					catch{}
				})*/
				console.log("测试",sourcePathNumber,usePathNumber)
				let length=Math.max(sourcePathNumber.length,usePathNumber.length)
				sourcePathNumber=sourcePathNumber.padEnd(length,"0")
				usePathNumber=usePathNumber.padEnd(length,"0")
				sourcePathNumber=sourcePathNumber*1
				usePathNumber=usePathNumber*1
				if(type=="up")
					return usePathNumber>sourcePathNumber
				else
					return usePathNumber<sourcePathNumber
			},
			createLocation:function(sourcePath,keepUserDefine=false,encode=false){
				let sourcePathNumber="",usePathNumber=""
				let tempSource=JSON.parse(JSON.stringify(this.LOGICSOURCE.logic))//逻辑入口
				let tempSourceIndexKey=JSON.parse(JSON.stringify(this.LOGICSOURCE.logicIndexKey))//逻辑入口
				let maxLength=0
				let xpathList=sourcePath.split("=>")
				let pathArray=[]
				if(sourcePath.startsWith("=>")){
					xpathList.splice(0,1)
				}
				let numbers
				let arrayIndex=0
				xpathList.forEach(pathItem => {
					try{
						//提取所有路径数量的最大值，用于处理拼接长度
						numbers=(tempSourceIndexKey.length+"").length 
						if(numbers>maxLength) maxLength=numbers//数字位数
						let tempSplit=pathItem.split(".")
						//sourcePathNumber+=tempSourceIndexKey.indexOf(tempSplit[0])
						pathArray.push(tempSourceIndexKey.indexOf(tempSplit[0])+"")
						if(tempSplit[tempSplit.length-1].length==0){
							tempSplit.pop()
						}
						if(tempSplit.length>1){
							for(let i=0;i<tempSplit.length-1;i++){
								tempSource=tempSource[tempSplit[i]]
							}
							//存在.xxx.xxx时将pathItem重新指向最后一个
							pathItem=tempSplit[tempSplit.length-1]
							//若保持用户定义层级,则需在当前存在用户定义层的位置加上@
							if(keepUserDefine){
								pathArray[arrayIndex]+="@"
							}
						}
						
						tempSourceIndexKey=tempSource[pathItem].logicIndexKey
						tempSource=tempSource[pathItem].logic
						arrayIndex++
						
					}catch{}
					
				})
				return [pathArray,maxLength]
				
			},
			requestSetUserDefine:function(xpath,key,value,newCom=false,event=()=>{}){

					let tempSource=this.LOGICSOURCE.logic//逻辑入口
					let xpathList=xpath.split("=>")
					let [pathString,lastOne]=this.getPathString(xpath)
					let type=Object.prototype.toString.call(value)
					value=['[object Object]','[object Array]'].includes(type)
							?JSON.stringify(value)
							:type=='[object String]'
								?'`'+value.toString()+'`'
								:value
					//ref=new RegExp(/function\((.*)\){/)
					//console.log('childrenset',`this.LOGICSOURCE.logic${pathString}.userDefine.${key}`)
				
					try{
						new Function(`
									//插入操作栈
									if(${!newCom}){
										try{
											this.pushToActionStack("this.LOGICSOURCE.logic${pathString}.userDefine.${key}","change",JSON.parse(JSON.stringify(this.LOGICSOURCE.logic${pathString}.userDefine.${key})))
										}catch{
											this.pushToActionStack("this.LOGICSOURCE.logic${pathString}.userDefine.${key}","change","")
										}
									}
									
									
									this.LOGICSOURCE.logic${pathString}.userDefine.${key}=${value}
									
									`).call(this)
						//console.log(this.LOGICSOURCE.logic)
						return true
					}catch(e){
						console.log(e)
						return false
					}
				

			},
			requestResetLogicIndex:function(parentXpath,logicIndex,newCom=false,event=()=>{}){
				console.log("接收传入",newCom,!newCom)
				//重置是对被修改的对象的父级元素内容进行修改
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let xpathList=parentXpath.split("=>")
				let [pathString,lastOne]=this.getPathString(parentXpath)
				console.log("重置",pathString)
				if(pathString.length!=0){
					pathString=".logic"+pathString
				}
				try{
					new Function(`
								//插入操作栈
								if(${!newCom}){
									//新增时不标记
									console.log("not insert ${!newCom}")
									this.pushToActionStack("this.LOGICSOURCE${pathString}.logicIndexKey","change",JSON.parse(JSON.stringify(this.LOGICSOURCE${pathString}.logicIndexKey)))
								}
								this.LOGICSOURCE${pathString}.logicIndexKey=${JSON.stringify(logicIndex)}
								 console.log(this.LOGICSOURCE,"this.LOGICSOURCE${pathString}.logicIndexKey")
								`).call(this)
					
					return true
				}catch(e){
					console.log("e",e)
					return false
				}
			},
			rec:function(data,indexKey){
				//解决provideLogicConten中new Function指向问题
				System.getLogic(data,indexKey)
			},
			provideLogicContent:function(xpath){
				if(xpath==""){
					let temp=this.LOGICSOURCE.logic
					let tempIndex=this.LOGICSOURCE.logicIndexKey
					this.rec(temp,tempIndex)
				}else{
					let tempSource=this.LOGICSOURCE.logic//逻辑入口
					let xpathList=xpath.split("=>")
					let [pathString,lastOne]=this.getPathString(xpath)
					let source
					try{
						new Function(`let temp=this.LOGICSOURCE.logic${pathString}.logic
									  let tempIndex=this.LOGICSOURCE.logic${pathString}.logicIndexKey
									  //console.log(tempIndex)
									  //console.log(this.LOGICSOURCE.logic)
									this.rec(temp,tempIndex)
									`).call(this)
					}catch(e){
							console.error("错误",e)
					
					}
				}
				
			},
			requestEventComponent_list:function(provide=false){//供事件小组件请求小组件列表
				//显示组件列表
				this.provideEcList=provide
				this.showEventComponents=true
				this.spreadEventComponents=true
				
			},
			requestEventComponent:function(requestName,remote=false,remoteMountTarget="app",emit=null,vBind=null){//供事件小组件请求其他小组件
				if(!remote){
					//非远程组件
					const t=require.context('../eventComponents', false, /\.vue$/)
					let returnCom=null
					t.keys().forEach(key => {
						const name = path.basename(key, '.vue')
						if(name==requestName){
							returnCom=t(key).default || t(key)
							return
						}
					})
					console.log("requestName",requestName,this.eventComponents[requestName])
					try{
						if(this.eventComponents[requestName].allowdGetIndex==undefined){
							try{
								console.log("a")
								//调用挂载组件的数据获取权限请求事件
								let temp=returnCom.methods.provideAllowGetData()
								this.eventComponents[requestName]={
									unshow:temp.unshow,
									allowdGetIndex:temp.allowdGetIndex,
									name:""
								}
							}catch(e){
								console.log("b",e)
								this.eventComponents[requestName]={
									unshow:false,
									allowdGetIndex:false,
									name:""
								}
							}
						}
					}catch{
						console.log("c")
						this.eventComponents[requestName]={
							unshow:false,
							allowdGetIndex:false,
							name:""
						}
					}
					
					return returnCom
				}else{
					if(window.remoteEc==undefined){
						window.remoteEc={}
					}
					//远程组件，此时requestName为组件唯一ID
					let loadScript=document.createElement("script")
					loadScript.src="http://localhost:8081/file/getVue"//"/drawui/project/ec/?request="+requestName
					document.body.appendChild(loadScript)
					this.$nextTick(()=>{
						setTimeout(()=>{
							//console.log(System.registerEC)
							//对远程组件执行本地注册
							window.registerEC(requestName)
							
							this.$nextTick(()=>{
								//注册完成后执行挂载
								window.remoteEc['childMount_'+requestName](remoteMountTarget)
								if(this.eventComponents[requestName].allowdGetIndex==undefined){
									try{
										let temp=window.remoteEcProvideAllowGetData['childMount_'+requestName]()
										this.eventComponents[requestName]={
											unshow:temp.unshow,
											allowdGetIndex:temp.allowdGetIndex,
											name:""
										}
									}catch{
										this.eventComponents[requestName]={
											unshow:false,
											allowdGetIndex:false,
											name:""
										}
									}
								}
								//挂载完成后执行渲染
								this.$nextTick(()=>{
									let lastIndex=window.remoteEc['mountChild'].length-1
									window.remoteEc.mountChild(remoteMountTarget,vBind,emit)
								})
							})
						},200)
					})
				}
			},
			insertToLogic:function(xpath,data,remote=false,desc=""){//新建子组件时自动插入【注：此处是新建的子组件在挂载完成(mounted)后执行】
				if(System.requestEcCallBack!=null){
					let tempSource=this.LOGICSOURCE.logic//逻辑入口
					let xpathList=xpath.split("=>")
					
					let [pathString,lastOne]=this.getPathString(xpath)
					
						
					//获取该组件的名称
					let ecName=lastOne.split("_")[0]
					let allowedGetLogicIndex=this.eventComponents[ecName].allowdGetIndex
					data.logic={}
					data.ecTitle="新步骤"
					data.logicIndexKey=[]
					data.ecExplain=""
					data.allowdGetIndex=allowedGetLogicIndex
					data.userDefine={}
					data.remote=remote
					let pushToStack=(path,type,data)=>{
						this.pushToActionStack("add",JSON.stringify(this.LOGICSOURCE),this.processLogic)
					}
					try{
						new Function('pushToStack',`
									//插入操作栈
									pushToStack()
									this.LOGICSOURCE.logic${pathString}=${JSON.stringify(data)}
									
									console.log("插入操作栈",this.LOGICSOURCE.logic${pathString},"add",${JSON.stringify(data)})
									
										`).call(this,pushToStack)
						//插入完成，将回调事件改为空
						System.requestEcCallBack=null
						
					}catch(e){
						console.error(e,"插入失败")
					}
					
				}
			},
			removeFromLogic:function(xpath){//删除事件组件
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let xpathList=xpath.split("=>")
				let [pathString,lastOne]=this.getPathString(xpath)
				new Function(`
							try{
							delete this.LOGICSOURCE.logic${pathString}
							//console.log(this.LOGICSOURCE.logic,"delete ok")
							//插入操作栈
							this.pushToActionStack("this.LOGICSOURCE.logic${pathString}","delete","")
							}catch(e){
								console.error(e)
							}	`).call(this)
			},
			removeChild:function(index){
				
			},
			randomName:function(){//随机生成组件的xpath唯一ID
				let root=Math.random()
				let len=Math.ceil((root+0.5)*10)
				let key=""
				for(let i=0;i<len;i++){
					let randomNumber=Math.ceil(Math.random()*25)
					key+=String.fromCharCode(randomNumber+65)
				}
				return key				
			},
			returnRequestECName:function(name){//返回选中的组件名称
				let temp=this.eventComponents[name].name
				if(System.requestEcCallBack!=null){
					if(Object.prototype.toString.call(temp)=='[object Object]'){
						/*name:{name:"",remote:true}*/
						System.requestEcCallBack({remote:true,name:name})//选中完成，执行由申请当前操作的组件定义的回调函数
					}else{
						System.requestEcCallBack(name)//选中完成，执行由申请当前操作的组件定义的回调函数
					}
				}
			},
			returnUserDefineAction:function(data){
				System.acceptArgument(data)
			},
			returnUserDefine:function(xpath){
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let xpathList=xpath.split("=>")
				let [pathString,lastOne]=this.getPathString(xpath)
				try{
					new Function(`this.returnUserDefineAction(this.LOGICSOURCE.logic${pathString}.userDefine)`).call(this)					
				}catch(e){
					return null
				}	
			},
			drawUI_checkVar:function(varName){//供事件小组件检查是否有同名变量
				for(let index=0;index<this.varList.length;index++){
					if(varName==this.varList[index].name){
						return true
					}
						
				}
				return false
			},
			requestNewComponent:function(){//请求新增组件
				//注册系统事件,选择之后执行
				System.requestEcCallBack=(component)=>{
					
					//判断是否是远程加载
					let remote=false
					let newComId=""
					if(Object.prototype.toString.call(component)=='[object Object]'){
						remote=component.remote
						component=component.name
					}
					
					//返回组件名称，判断是否在当前以引入的组件中,(且需要非远程组件)
					if(this.$options.components[component]==undefined && !remote){
						//不存在时请求加载组件
						this.$options.components[component]=System.requestEC(component)
					}
					let newXpathId=System.requestNewXpathID()
					let newXpath=component+"_"+newXpathId
					
					if(remote) newComId=newXpathId
					
					this.childHeight.push(0)
					this.logicIndex.push({name:"步骤"+this.requestConponent.length,index:this.requestConponent.length,xpath:newXpath})
					//注：为保证各组件独立执行，各组件的完整xpath由其在创建的时候请求系统注入，当前的logicIndex仅保存新增子组件将要使用的xpath，与子组件将要保存的一致
					this.requestConponent.push({
						name:component,
						remote:remote,
						newComId:newComId,
						data:{
							logicName:"步骤"+this.requestConponent.length,
							parentXpath:this.xpath,
							isNew:true,
							callIndex:this.requestConponent.length,
							newXpath:newXpathId,
							}})
					
					
					const finishEC=()=>{
						//给最后一个设定高度值
						this.$nextTick(()=>{
							//.componentArea
							let area=this.$refs['ecMain'].childNodes
							//最新的节点
							let lastOne=area[area.length-4]//.childNodes[0]
							lastOne.style.top=this.setChildHeight(0,0,false)+"px"
							let tempIndex=[]
							this.logicIndex.forEach(item =>{
								tempIndex.push(item.xpath)
							})
							System.requestResetLogicIndex(this.xpath,tempIndex)
							//跳转
							setTimeout(()=>{
								//已经push，所以需要减一
								this.gotoArea(this.requestConponent.length-1)
								area=null
								lastOne=null
								tempIndex=null
							},200)
							
						})
					}
					
					//请求加载远程组件
					if(remote){
						this.remoteEC.push(newComId)
						//远端组件所需要的绑定的事件
						let emit={
							removeChild:this.removeChild,
							setChildHeight:this.setChildHeight,
							setChildRemove:this.setChildRemove
						}
						//远端组件所需要的v-bind数据
						let vBind=this.requestConponent[this.requestConponent.length-1].data
						this.$nextTick(()=>{
							System.requestEC(component,true,newComId,emit,vBind)
							finishEC()
						})
					}else{
						finishEC()
					}
					
					
					
				}
				System.requestECList(this.provide)
			},
			//获取其他组件的用户定义内容
			getOtherUserDefine:function(xpath,callBack){
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let xpathList=xpath.split("=>")
				let pathString=""	
				let newKey=xpathList[xpathList.length-1]
				let lastOne=xpathList[xpathList.length-1]
				//获取组件名称
				let ecName=lastOne.split("_")[0]
				console.log(this.eventComponents,ecName)
				let allowed=this.eventComponents[ecName].allowdGetIndex
				
				if(allowed){
					if(lastOne.length==0||lastOne==''){
						xpathList.length-=1
					}
					let tempXpathList=[]
					xpathList.forEach(item=>{
						if(item.length!=0 && item!=""){
							tempXpathList.push(item)
						}
					})
					if(tempXpathList.length>0)
						pathString="."+tempXpathList.join(".logic.")
					try{
						new Function('callBack',`callBack(this.LOGICSOURCE.logic${pathString});console.log(callBack)`).call(this,callBack)					
					}catch(e){
						return null
					}	
				}else{
					alert("目标对象禁止获取相关数据")
				}
			},
			//设置其他组件的用户定义内容
			setOtherUserDefine:function(xpath,data){
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let xpathList=xpath.split("=>")
				let pathString=""	
				let newKey=xpathList[xpathList.length-1]
				let lastOne=xpathList[xpathList.length-1]
				//获取组件名称
				let ecName=lastOne.split("_")[0]
				let allowed=this.eventComponents[ecName].allowdGetIndex
				if(allowed){
					if(lastOne.length==0||lastOne==''){
						xpathList.length-=1
					}
					let tempXpathList=[]
					xpathList.forEach(item=>{
						if(item.length!=0 && item!=""){
							tempXpathList.push(item)
						}
					})
					if(tempXpathList.length>0)
						pathString="."+tempXpathList.join(".logic.")
					try{
						new Function(`
										//插入操作栈
										this.pushToActionStack("this.LOGICSOURCE.logic${pathString}","change",JSON.parse(JSON.stringify(this.LOGICSOURCE.logic${pathString})))
										this.LOGICSOURCE.logic${pathString}=${JSON.stringify(data)}
											//console.log(this.LOGICSOURCE.logic)
										`).call(this)					
					}catch(e){
						return null
					}	
				}else{
					alert("目标对象禁止设置相关数据")
				}
			},
			//设置逻辑内容
			setEditData:function(type,isDom,eventOrFuncName,nodeId=null,componentName=null){
				//请求调用赋值
				/*
					*@param type:this.type 编辑类型，0为事件，1为函数）
					*@param isDom:this.isDomw 标记是主屏标签还是组件内部标签，true时为主屏标签，false时为组件内部标签
					*@param eventOrFuncName:编辑对象分为事件/函数名
					*@param nodeId:节点ID 仅在节点dom事件时传入，函数编辑时为null  
					*@param componentName:组件名称，仅在编辑组件时使用
					* 先根据type确定时事件编辑还是函数编辑，然后再根据idDom确定时主屏的还是组件的
				*/
				this.type=type
				this.isDom=isDom
				this.target=eventOrFuncName
				this.objectName=nodeId
				if(this.store==null){
					if(this.isDom){
						this.store=structStore()
					}else{
						this.store=componentStore()
					}
				}
				if(this.isDom){
					//标签对象
					//if(type==0){
						//页面标签事件编辑 读取structStore -> Events -> nodeId -> 事件内部变量
					if(!this.provide) //读取页面的函数
						this.LOGICSOURCE=this.store.METHODS[eventOrFuncName]
					else
						this.LOGICSOURCE=this.dataSource.logicSource
				}else{

						if(!this.provide)
							this.LOGICSOURCE=this.store[componentName].METHODS[eventOrFuncName]
						else
							this.LOGICSOURCE=this.dataSource.logicSource
				}
				if(this.type==1){
					//变量表，仅函数可以使用
					this.varList=this.LOGICSOURCE.varList
				}
				//形参 函数与事件都可以有
				this.functionProps=this.LOGICSOURCE.props
				console.log(this.functionProps)
				//函数格式 ,函数与事件都可以修改
				this.object=this.LOGICSOURCE.object
				//console.log("事件源",this.LOGICSOURCE,this.varList)
				if(!this.provide){
					//此时表示未直接读取已有的数据，而不是经别的组件调用后重新赋值
					//其他组件调用时在mounted中直接向initLogic传入指定logic内容，不需要执行此块
					this.processLogic()
				}

			},
			//处理逻辑组件的挂载
			initLogic:function(logic,logicIndexKey,pushToLogicIndex=true){
				
				this.logicIndex=[]
				this.requestConponent=[]
				this.childHeight=[]
				this.$nextTick(()=>{
					
						for(let index=0;index<logicIndexKey.length;index++){
							let key=logicIndexKey[index]
							let comTarget=key.split("_")[0]
							let remote=logic[key].remote
							//此时为远程组件
							if(remote){
								let newXpathId=System.requestNewXpathID()
								this.requestConponent.push({
									name:comTarget,
									remote:true,
									newComId:newXpathId,
									data:{
										logicName:logic[key].ecTitle,
										parentXpath:this.xpath,
										ownPath:key,
										logicIndexList:[],
										callIndex:index
									}})
									this.$nextTick(()=>{
										//this.remoteEC.push(newComId)
										//远端组件所需要的绑定的事件
										let emit={
											removeChild:this.removeChild,
											setChildHeight:this.setChildHeight,
											setChildRemove:this.setChildRemove
										}
										//远端组件所需要的v-bind数据
										let vBind=this.requestConponent[this.requestConponent.length-1].data
										System.requestEC(comTarget,true,newXpathId,emit,vBind)
									})
							
							}else{
								if(this.$options.components[comTarget]!=undefined){
										//先检测是否已经加载到组件列表中

										this.requestConponent.push({
											name:comTarget,
											remote:false,
											newComId:"",
											data:{
												logicName:logic[key].ecTitle,
												parentXpath:this.xpath,
												ownPath:key,
												logicIndexList:[],
												callIndex:index
											}})
								}else{
									//否则请求
										this.$options.components[comTarget]=System.requestEC(comTarget)
										this.requestConponent.push({
											name:comTarget,
											remote:false,
											newComId:"",
											data:{
												logicName:logic[key].ecTitle,
												parentXpath:this.xpath,
												ownPath:key,
												logicIndexList:[],
												callIndex:index
											}})
								}
							}
							//在如粘贴在前等操作中会提前设置好logicIndex前后顺序，故需检测是否需要插入logicIndex中
							//if(pushToLogicIndex){
								this.logicIndex.push({
									name:logic[key].ecTitle,//加载标题
									index:index,//加载指向的索引,
									xpath:key//加载指向的逻辑键名
								})
							//}
							
						}
				})
			},
			//单击变量表数据框时检测
			checkVarValue:function(e,data,index){
				this.nowEditVarIndex=index
				/*
					变量表变量缺省值输入框被点击时检查变量值
					若参数长度超出范围,则拓展输入框
					若参数类型为Object 则弹出object编辑框
				*/
			   let value=e.target.value
			   
				   //若value为object，则此处应能够继续执行
				  /* value=JSON.parse(e.target.value)
				   this.callObject.edit=true
				   //向object编辑器传入object数据
				   this.showEditJson=true
				   this.$nextTick(()=>{
					   this.$refs['editJson'].setCode(value,true)
				   })*/
				   if(this.varList[this.nowEditVarIndex].type=='object'){
				   	this.showEditJson=true
					let jsonData=""
					if(Object.prototype.toString.call(this.varList[this.nowEditVarIndex].default)=='[object Object]'){
						jsonData=JSON.stringify(this.varList[this.nowEditVarIndex].default)
					}else{
						jsonData=this.varList[this.nowEditVarIndex].default
					}
				   	this.$nextTick(()=>{
				   		this.$refs['editJson'].setCode(this.varList[this.nowEditVarIndex].name+"="+jsonData,true)
				   	})
				   }else if(value.length>10){
						/*if(Object.prototype.toString.call(data)==='[object Object]'){
							value=JSON.stringify(data)
						}*/
						
						let parentNode=e.target.parentNode
						let tempTextArea=document.createElement("textarea")
						tempTextArea.style.cssText=`position:absolute;
													z-index:99;
													left:-10%;
													height:80px;
													top:-20px;
													font-size:16px;
													border-radius:10px;
													outline:none;
													border:none;
													width:120%;
													background-color:white;
													padding:5px;
													box-shadow:0px 0px 10px var(--mainColorGray2);
													resize:none;
													transition:.1s;
													transform:scale(0);
													`
						tempTextArea.value=value
						tempTextArea.addEventListener("blur",function(e){
							this.remove()
						})
						var timeOut=null
						tempTextArea.addEventListener("input",function(self){
							if(timeOut!=null)
								clearTimeout(timeOut)
							timeOut=setTimeout(()=>{
								e.target.value=this.value
								timeOut=null
							},100)
							
						})
						parentNode.appendChild(tempTextArea)
						
						setTimeout(()=>{
							tempTextArea.style.transform="scale(1)"
							setTimeout(()=>{
								tempTextArea.focus()
							},150)
						},50)
				   }
			   
			   
			},
			editText:function(e,index){//控制注释
				this.varTextIndex=index
				this.showTextEdit=true
				this.$nextTick(()=>{
					console.log(document.querySelector(".textEdit"),e.target.offsetY,e.target,e.target.offsetTop)
					document.querySelector(".textEdit").style.top=(e.target.parentNode.offsetTop+30)+"px"
					document.querySelector(".textEdit").style.left=(e.target.offsetLeft+30)+"px"
				})
			},
			quit:function(e){
				//子层逻辑编辑面板退出
				this.$emit("quit")
			},
			startHook:function(index,callBack){
				//完成锚点连线后由接收方执行System.eventComponent_Out,callback由outputHook中定义
				System.eventComponent_Out=()=>{
					callBack()
					return {name:this.varList[index].name,value:this.varList[index].default}
				}
			},
			setChildRemove:function(removeEvent){
				this.removeEvent.push(removeEvent)
			},
			//设置子元素所有高度
			setChildHeight:function(height,index,rec=true,logicIndex=null){
				/*
									*@param {*} height是请求此事件的子组件的高度，index是该子组件的加载顺序,即callIndex
									*@param {*} rec为true时标明为修改/删除/新增时的调用，rec为false时为新增后为最新的子节点设定高度值
									*@param {*} rec:是否修改
									*@param {*} loginIndex:移动时传入新的logicIndex数据
								*/
				
				    if(rec && height!=-1)//表示为 新增、修改
				        this.childHeight[index]=height
				    if(height==-1 && logicIndex==null)//表明为删除，此时将被删除的高度设置为0
				        this.childHeight[index]=0

				    let parentChilds=this.$refs['ecMain'].childNodes

				    //修改或新增时，需要加上子组件的高度与所有子组件的高度
				    let allChildHeight=0
					let domHeight=0
				    //rec为true时，为全部，为false时，除去最后即最新的一个
				    let dif=rec?0:1
				
				    //新增/删除/修改
				    if(logicIndex==null){
				        //非排序调用
				        for(let i=0;i<this.childHeight.length-dif;i++){
				            //将当前组件中，index之后的组件的top值全部修改
				            if(rec)
				            {
				                if(i>index){
									try{

										parentChilds[i+2].style.top=allChildHeight+"px"
									}
									catch{}
				                }
				            }
				            allChildHeight+=this.childHeight[i]+20
							domHeight+=this.childHeight[i]
				        }
				        if(rec && logicIndex==null){
				            this.$refs['ecMain'].style.height=domHeight+'px'
				            //加上自身高度
				            allChildHeight+=165
				            //再次调用当前函数，对排序过的进行重新更改高度
				            this.setChildHeight(-1,0,false,{indexs:this.logicIndex,from:0,to:0})
				        }else{
				            return allChildHeight
				        }
				    }else{//排序
				      
				        let moveToTop=0
				       
				            for(let i=0;i<this.logicIndex.length;i++){
								try{
									parentChilds[this.logicIndex[i].index+2].style.top=moveToTop+"px"
									moveToTop+=this.childHeight[this.logicIndex[i].index]+20
								}
				                catch{}
				            }

				    }
			},
			//上移
			indexUp:function(index){
				if(index==0){
					alert('已经到顶了')
				}else{
					let preLogicIndex=JSON.parse(JSON.stringify(this.logicIndex))
					let from=index
					let to=index-1
					let llg=preLogicIndex[from]
					//console.log(lg,from)
					//逻辑上移
					/*
					index:在logicIndex中的index，lg:其数据data中所指向的目标子节点顺序
					*/
					//起始位置与目标位置的距离
					let dif=from-to
					//console.log(dif)
					//插入到目标位置
					let t=from-dif
					this.logicIndex.splice(t,0,llg)
					//删除原位置
					this.logicIndex.splice(from+1,1)
					this.$nextTick(()=>{
						this.setChildHeight(-1,0,false,
						{indexs:preLogicIndex,from:from,to:to})
					})
					//存回新的数据
					let tempIndex=[]
					this.logicIndex.forEach(item =>{
						tempIndex.push(item.xpath)
					})
					System.requestResetLogicIndex(this.xpath,tempIndex)
					tempIndex=[]
				}
			},
			//下移
			indexDown:function(index){
				if(index==this.logicIndex.length-1){
					alert("已经到底了")
				}else{
					//逻辑下移
					/*
					index:在logicIndex中的index，lg:其数据data中所指向的目标子节点顺序
					*/
					let preLogicIndex=JSON.parse(JSON.stringify(this.logicIndex))
					let from=index
					let to=index+1
					let llg=preLogicIndex[from]
					let dif=to-from
					//删除原位置
					this.logicIndex.splice(from,1)
					//插入到目标位置
					this.logicIndex.splice(to,0,llg)		  
					this.$nextTick(()=>{
						this.setChildHeight(-1,0,false,
						{indexs:preLogicIndex,from:from,to:to})
					})
					//存回新的数据
					let tempIndex=[]
					this.logicIndex.forEach(item =>{
						tempIndex.push(item.xpath)
					})
					System.requestResetLogicIndex(this.xpath,tempIndex)
					tempIndex=[]
				}
			},
			//逻辑顺序列表右键
			logicViewMenu:function(e,index){
				e.preventDefault()
				if(this.logicSelect){
					this.logicSelectedList[index]=true
				}
				this.rightBarMenu.selected=index
				let left=e.clientX,top=e.clientY
				this.rightBarMenu.left=left
				this.rightBarMenu.top=top
				this.rightBarMenu.show=true
				this.$nextTick(()=>{
					this.$refs['inputForClose'].focus()
				})
			},
			//关闭右键
			closeBar:function(){
				setTimeout(()=>{
					this.rightBarMenu.show=false
					this.mainRightBarMenu.show=false
				},200)
			},
			gotoArea:function(index){
				//跳到指定位置
				let box=this.$refs['ecMain'].childNodes[index+2]
				console.log("box",box)
				let targetTop=box.offsetTop
				console.log(this.$refs["ecMain"].childNodes,index+2)
				System.ecScrollToArea.call(this,{
					top:targetTop,
					behavior:"smooth"
				},box,this.$refs["ecMain"].childNodes[index+2].querySelector('.header .logicName').innerText)
				
			},
			//创建编辑器
			createCodeEditor:function(preCode,option){
				this.monacoOption=option
				this.codeEditorPosition={x:"50vw",y:"50vh"}
				this.openCodeEditor=true
				this.$nextTick(()=>{
					try{
						setTimeout(()=>{
							this.$refs['codeEditor'].init(preCode)
							this.bordTop=this.$refs['showEditor'].offsetTop
							this.bordLeft=this.$refs['showEditor'].offsetLeft
						},1000)
					}catch(e){
						console.error(e)
					}
				})

			},
			//关闭编辑器
			closeCode:function(){
				let getTextCanvas=(text,canvas)=>{
					console.log(canvas)
					this.codeEditCallBack(text,canvas,this.monacoOption.object)
					this.openCodeEditor=false
					this.$nextTick(()=>{
						this.hasScaleEditor=false
					})
					
				}
				let canvas=this.$refs['codeEditor'].getTextCanvas(getTextCanvas)
				
				
			},
			//缩小编辑器
			scaleCode:function(){
				this.hasScaleEditor=true
				//this.$refs['codeEditor'].setMove()
				this.$refs['showEditor'].style.transform='translate(-50%,-50%) scale(0.35)'
				
			},
			//编辑器顶部栏被按下
			startDown:function(e){
				this.startLeft=e.clientX
				this.startTop=e.clientY
				this.$refs['showEditor'].style.transition="0s"
				this.codeEditorPosition.x=(this.bordLeft+this.deltaX)+"px"
				this.codeEditorPosition.y=(this.bordTop+this.deltaY)+"px"
				this.domOutDown=true
				//this.$refs['codeEditor'].setMove(true)
			},
			//编辑器移动
			moveBord:function(e){
				if(this.domOutDown){
					this.deltaX=e.clientX-this.startLeft
					this.deltaY=e.clientY-this.startTop
					this.codeEditorPosition.x=(this.bordLeft+this.deltaX)+"px"
					this.codeEditorPosition.y=(this.bordTop+this.deltaY)+"px"
				}
			},
			//编辑器移动完成
			endMove:function(e){
				this.bordLeft=this.bordLeft+this.deltaX
				this.bordTop=this.bordTop+this.deltaY
				this.deltaY=0
				this.deltaX=0
				this.$refs['showEditor'].style.transition=".2s"
				this.domOutDown=false
				//this.$refs['codeEditor'].setMove(false)
			},
			//编辑器双击事件
			editorDbClick:function(){
				if(this.hasScaleEditor){
					this.codeEditorPosition={x:"50vw",y:"50vh"}
					this.$refs['showEditor'].style.transform='translate(-50%,-50%) scale(1)'
					setTimeout(()=>{
						this.bordTop=this.$refs['showEditor'].offsetTop
						this.bordLeft=this.$refs['showEditor'].offsetLeft
					},300)
					this.hasScaleEditor=false
				}
				
			},
			//函数类型选择回调
			selectChange_object:function(index){
				//方法选择
				this.object=index.index
				this.showSelectObject=false
				this.LOGICSOURCE.object=index.index
			},
			//编辑器函数类型选择回调
			selectChange_monacoObject:function(index){
				//方法选择
				this.showSelectObject_monaco=false
				this.monacoOption.object=index.index
				this.codeEditCallBack(null,null,index.index)
			},
			//打开函数类型选择列表
			callSelectObject:function(e){
				this.showSelectObject=true
				this.$nextTick(()=>{
					this.$refs['selectList_object'].setSpread(e)
				})
			},
			//请求打开编辑器函数类型选择列表
			callSelectObject_monaco:function(e){
				this.showSelectObject_monaco=true
				this.$nextTick(()=>{
					this.$refs['selectList_monacoObject'].setSpread(e)
				})
			},
			//关闭所有提交的弹窗
			closeAllFloat:function(){
				this.floatEvent.forEach(closeEvent => {
					this.$nextTick(()=>{
						closeEvent.call(this)
					})
					
				})
				this.floatEvent=[]
				this.befocused=true
				this.$nextTick(()=>{
					this.$refs['ecMainFocus'].focus()
				})
			},
			//展开路径列表
			spreadPathBar:function(e,index){
				this.pathBarLeft=e.target.offsetLeft+document.getElementById("actionEdit").offsetLeft	
				this.$nextTick(()=>{
					if(this.viewPathItemIndex==index){
							this.showPathBar=false
							this.pathBarLogicSelectedList=[]
							this.viewPathItemIndex=-1
					}
					else{
						let cal=()=>{
							setTimeout(()=>{
								this.showPathBar=!1
								this.pathBarLogicSelectedList=[]
								this.viewPathItemIndex=-1
							},200)
						}
						this.floatEvent.push(cal)
						this.showPathBar=true
						cal=null
						this.viewPathItemIndex=index
					}
					if(this.showPathBar){
						this.viewPathItemList=this.pathList[index].children
						this.pathGotoArea=this.pathList[index].gotoArea
						this.pathContext=this.pathList[index].context
					}
				})	
			},
			//提交访问路径插入
			setPathList:function(pathName){
				let temp=
					{
						logicIndex:this.logicIndex,
						gotoArea:(index)=>{
							if(this.logicSelect){
								this.selectThisLogic(index)
								return this.logicSelectedList[index]
							}else{
								this.gotoArea(index)
								return false
							}
						},
						logicViewMenu:this.logicViewMenu
					}
				System.insertPathList(pathName,temp)
			},
			//插入访问路径
			insertToPathList:function(pathName,options){
				this.pathList.splice(0,0,
					{
						name:pathName,
						children:options.logicIndex,
						gotoArea:options.gotoArea,
						context:options.logicViewMenu
					}
				)
			},
			//形参修改
			setProps:function(index=-1){
				if(index!=-1){
					this.nowEditPropsData.name=this.functionProps[index].name
					this.nowEditPropsData.default=this.functionProps[index].default
				}
				this.nowEditPropsData.index=index
				this.showEditProps=true
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.$refs['propsEdit'].style.backgroundColor="rgba(255,255,255,0.75)"
						this.$refs['propsEdit'].style.backdropFilter="blur(10px)"
					},600)
				})
			},
			removeProps:function(){
				if(confirm("确定移除形参"+this.nowEditPropsData.name)){
					this.functionProps.splice(this.nowEditPropsData.index,1)
					this.LOGICSOURCE.props=JSON.parse(JSON.stringify(this.functionProps))
					this.showEditProps=false
					this.nowEditPropsData={
						name:"",
						default:"",
						index:-1,
						hasEdit:false,
					}
					System.showToast("移除成功",2000)
				}
			},
			saveProps:function(){
				console.log("hello")
				if(this.nowEditPropsData.name.length==0){
					System.showToast("未填写形参名称，保存失败",2000)
				}else{
					if(this.nowEditPropsData.index==-1){
						//新增
						if(this.nowEditPropsData.default.length==0){
							//无缺省值
							let i=0
							for(i=0;i<this.functionProps.length;i++){
								if(this.functionProps[i].default.length!=0){
									//找到第一个缺省形参位置
									i-=1
									break
								}
							}
							this.functionProps.splice(i,0,{name:this.nowEditPropsData.name,default:this.nowEditPropsData.default})
							
						}else{
							//有缺省形参，直接添加到最后
							this.functionProps.push({name:this.nowEditPropsData.name,default:this.nowEditPropsData.default})
						}
					}else{
						//修改
						if(this.nowEditPropsData.default.length==0){
							//无缺省值
							let i=0
							for(i=0;i<this.functionProps.length;i++){
								if(this.functionProps[i].default.length!=0){
									//找到第一个缺省形参位置
									i-=1
									break
								}
							}
							this.functionProps[this.nowEditPropsData.index]={name:this.nowEditPropsData.name,default:this.nowEditPropsData.default}
							
						}else{
							//有缺省形参，重新排序
							//删除原来位置
							this.functionProps.splice(this.nowEditPropsData.index,1)
							let i=0
							for(i=0;i<this.functionProps.length;i++){
								if(this.functionProps[i].default.length!=0){
									//找到第一个缺省形参位置
									i-=1
									break
								}
							}
							this.functionProps.splice(i,0,{name:this.nowEditPropsData.name,default:this.nowEditPropsData.default})
						}
					}
					this.LOGICSOURCE.props=JSON.parse(JSON.stringify(this.functionProps))
					this.showEditProps=false
					this.nowEditPropsData={
						name:"",
						default:"",
						index:-1,
						hasEdit:false,
					}
				}
			},
			closeEditProps:function(){
				let index=this.nowEditPropsData.index
				let change=index==-1?false:((this.nowEditPropsData.name != this.functionProps[index].name) ||(this.nowEditPropsData.default != this.functionProps[index].default))
				if(((index==-1 && this.nowEditPropsData.name!="") || change)){
					if(confirm("当前数据未保存，确认取消")){
						this.showEditProps=false
						this.nowEditPropsData={
							name:"",
							default:"",
							index:-1,
							hasEdit:false,
						}
					}
				}else{
					this.showEditProps=false
				}
			},
			//复制monaco编辑器形参
			copyMonacoProps:function(index){
				try{
					navigator.clipboard.writeText(this.monacoOption.props[index]+`/*文件上传onchange事件传入参数*/`)
					System.showToast("形参已复制",2000)
				}catch{
					alert("写入剪贴板失败,请复制: "+this.monacoOption.props[index])
				}
			},
			callMethodsHub:function(){
				System.requestMethodsHub()
			},
			//复制节点
			insertToCutBord:function(data,nodeName=""){
				if(Object.prototype.toString.call(data)=='[object Object]'){
					System.copy("ecNode",JSON.parse(JSON.stringify(data)),{
						nodeName:nodeName
					})
				}else if(Object.prototype.toString.call(data)=='[object Array]'){
					System.copy("list_ecNode",JSON.parse(JSON.stringify(data)))
				}
				
			},
			copyECDom:function(xpath,callBack=null){
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let array=false
				let tempList=[]
				let action=(pathItem)=>{
					let xpathList=pathItem.split("=>")
					let pathString=""
					let newKey=xpathList[xpathList.length-1]
					let lastOne=xpathList[xpathList.length-1]
					if(lastOne.length==0||lastOne==''){
						xpathList.length-=1
					}
					let tempXpathList=[]
					xpathList.forEach(item=>{
						if(item.length!=0 && item!=""){
							tempXpathList.push(item)
						}
					})
					
					if(tempXpathList.length>0)
						pathString="."+tempXpathList.join(".logic.")
					try{
						if(!array){
							new Function(`
										this.insertToCutBord(this.LOGICSOURCE.logic${pathString},'${lastOne}')
										`).call(this)
							//console.log(this.LOGICSOURCE.logic)
							if(callBack!=null)
								callBack()
							return true
						}else{
							let append=(data)=>{
								tempList.push(data)
							}
							new Function('append',`append({data:this.LOGICSOURCE.logic${pathString},nodeName:'${lastOne}'})`).call(this,append)
						}
						
					}catch(e){
						console.log(e)
						return false
					}
				}
				if(Object.prototype.toString.call(xpath)=='[object String]'){
					action(xpath)
				}else if(Object.prototype.toString.call(xpath)=='[object Array]'){
					array=true
					xpath.forEach(item => {
						action(item)
					})
					this.insertToCutBord(tempList)
				}
				
				
			},
			//复制全局变量
			copyVar:function(index){
				let thisVarName=""
				if(this.isDom){
					thisVarName="_pageThis_."+this.varList[index].name
				}else{
					thisVarName="_compThis_."+this.varList[index].name
				}
				try{
					navigator.clipboard.writeText(thisVarName)
					System.showToast("变量引用已复制",2000)
				}catch{
					alert("写入剪贴板失败，请复制:"+thisVarName)
				}
			},
			//开启选择状态
			selectThisLogic:function(index){
				if(this.logicSelectedList[index]){
					this.logicSelectedList[index]=false
				}else{
					this.logicSelectedList[index]=true
				}
			},
			//粘贴逻辑
			pasteLogic:function(xpath,data){
				let tempSource=this.LOGICSOURCE.logic//逻辑入口
				let [pathString,lastOne]=this.getPathString(xpath)
				try{
					new Function(`
								  this.LOGICSOURCE.logic${pathString}=${JSON.stringify(data)}
								  //插入操作栈
								  this.pushToActionStack("this.LOGICSOURCE.logic${pathString}","add","")
								`).call(this)
					return true
				}catch(e){
					console.error(e)
					return false
				}
			},
			//粘贴在前与在后的逻辑
			patseAction:function(positionIndex){
				console.log(this)
					let pasteList=System.getCutBord()
					console.log("剪贴板数据",pasteList)
					if(pasteList){
						let xpathName=""
						let tempLogicIndex=[]
						let pastePath
						let preRequestLength=this.requestConponent.length
						let action=true
							if(pasteList.type=="list_ecNode"){
								pasteList.data.forEach(item => {
									xpathName=item.nodeName.split("_")
									//重新生成标识ID
									xpathName[1]=System.requestNewXpathID()
									xpathName=xpathName.join("_")
									pastePath=this.xpath+"=>"+xpathName
									System.pasteLogic(pastePath,item.data)
									tempLogicIndex.push({
										name:item.data.ecTitle,//加载标题
										index:preRequestLength,//加载指向的索引,
										xpath:xpathName//加载指向的逻辑键名
									})
									preRequestLength++
								})
							}else if(pasteList.type=='ecNode'){
								xpathName=pasteList.option.nodeName.split("_")
								//重新生成标识ID
								xpathName[1]=System.requestNewXpathID()
								xpathName=xpathName.join("_")
								pastePath=this.xpath+"=>"+xpathName
								System.pasteLogic(pastePath,pasteList.data)
								tempLogicIndex.push({
									name:pasteList.data.ecTitle,//加载标题
									index:preRequestLength,//加载指向的索引,
									xpath:xpathName//加载指向的逻辑键名
								})
							}else{
								action=false
								System.showToast("暂无可粘贴节点",2000)
							}
							if(action){
								//在指定位置插入
								this.logicIndex.splice(positionIndex,0,...tempLogicIndex)
								let tempIndex=[]
								this.logicIndex.forEach(item =>{
									tempIndex.push(item.xpath)
								})
								//插入逻辑顺序
								System.requestResetLogicIndex(this.xpath,tempIndex)
								//重新加载逻辑
								this.processLogic()
								//排序
								setTimeout(()=>{
									this.$nextTick(()=>{
										this.setChildHeight(-1,0,false,{indexs:this.logicIndex,from:0,to:0})
										tempIndex=null
									})
								},200)
							}
							pasteList=null
							xpathName=null
							tempLogicIndex=null
							pastePath=null
							
							preRequestLength=null
					}else{
						System.showToast("暂无可粘贴节点",2000)
					}
			},
			callAddGlobalVar:function(){
				this.showAddVar=true
				this.$refs['addVarButton'].style.width="100px"
				this.$refs['addVarButton'].style.height="70px"
				this.$refs['addVarButton'].style.marginLeft="30px"
				this.$refs['addVarButton'].style.backgroundColor="rgba(255,255,255,0)"
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.$refs['addGlobalVar'].style.transform="scale(1)"
					},50)
					this.$refs['blurAddBar'].focus()
				})
			},
			closeAddGlobalVar:function(){
				this.timeout=setTimeout(()=>{
					if(this.addGlobalType==null){
						this.$refs['addGlobalVar'].style.transform="scale(0)"
						this.$refs['addVarButton'].style.width="80px"
						this.$refs['addVarButton'].style.height="25px"
						this.$refs['addVarButton'].style.marginLeft="8px"
						this.$refs['addVarButton'].style.backgroundColor="var(--mainColorBlue3)"
						setTimeout(()=>{
							this.showAddVar=false
							this.timeout=null
						},300)
					}
				},200)
				
			},
			addGlobalVarAction:function(type){
				this.addGlobalType=type
				this.hasSaveJson=false
				let permit=true
				try{
					this.varList.forEach(item => {
						if(item.name.length==0 || item.default.length==0){
							permit=false
							System.showToast("当前存在未定义变量,无法新增",3000)
							throw ""
						}
					})
				}catch{}
				
				if(permit){
					this.nowEditVarIndex=this.varList.length
					if(type=="common"){
						this.varList.push({
							name:"",
							default:"",
							text:"123",
							display:"",
							type:"common"
						})
					}else{
						this.newJsonData=true
						this.varList.push({
							name:"",
							default:{},
							text:"123",
							type:'object',
							display:"Object"
						})
						this.showEditJson=true
						this.$nextTick(()=>{
							this.$refs['editJson'].setCode("varname={}",true)
						})
					}
				}
				
				clearTimeout(this.timeout)
				this.$refs['addGlobalVar'].style.transform="scale(0)"
				this.$refs['addVarButton'].style.width="80px"
				this.$refs['addVarButton'].style.height="25px"
				this.$refs['addVarButton'].style.marginLeft="8px"
				this.$refs['addVarButton'].style.backgroundColor="var(--mainColorBlue3)"
				this.$refs['addGlobalVar'].style.transform="scale(0)"
				setTimeout(()=>{
					
					this.showAddVar=false
					this.timeout=null
					this.addGlobalType=null
				},300)
			},
			changeCode:function(code){
				this.hasSaveJson=false
			},
			checkJsonKeyDom:function(e){
				if(window.Control){
					if(e.key=='q'){
						e.preventDefault()
						try{
							navigator.clipboard.writeText(`"(_$)"`)
							System.showToast("格式已复制 在(_$)之后填写变量名称",2000)
						}catch{
							alert(`写入剪贴板失败,请复制内容: ${`"(_$)"`} 在(_$)之后填写变量名称`)
						}
					}
				}
			},
			saveJson:function(){
				let data=this.$refs['editJson'].getVal()
				console.log(data)
				data=data.split("=")
				let name=data[0]//变量名称
				
				
				if(name.length>0){
					let permited=true
					try{
						this.varList.forEach(item => {
							if(item.name==name){
								permited=false
								throw ""
							}
						})
					}catch{}
					if(permited){
						data.splice(0,1)
						data=data.join("=")
						//data=JSON.parse(data)
						this.varList[this.nowEditVarIndex].name=name
						this.varList[this.nowEditVarIndex].default=data
						System.showToast("保存成功",2000)
						this.showEditJson=false
						this.hasSaveJson=true
						this.newJsonData=false
					}else{
						System.showToast("保存失败，变量名称重复",2000)
					}

				}else{
					System.showToast("保存失败，未检测到变量名称",2000)
				}
			
			},
			closeEditJson:function(){
				if(!this.hasSaveJson){
					if(confirm("当前内容未保存，是否关闭")){
						this.showEditJson=false
						this.hasSaveJson=true
						if(this.newJsonData){
							this.varList.pop()
							this.newJsonData=false
						}
					}
				}else{
					this.showEditJson=false
					this.hasSaveJson=true
				}
			},
			removeVar:function(index){
				let varName=this.varList[index].name
				if(confirm("确认删除次变量"+varName)){
					this.varList.splice(index,1)
					System.showToast("删除成功",2000)
					console.log(this.store)
				}
			},
			//检查逻辑
			checkLogic:function(){
					//if(!this.provide){
						//
						//注册获取逻辑事件
							let logic=this.LOGICSOURCE.logic
							let logicIndexKey=this.LOGICSOURCE.logicIndexKey
							let propList=[]
							this.functionProps.forEach(item => {
								if(item.default.length!=0){
									propList.push(item.name+'='+item.default)
								}else{
									propList.push(item.name)
								}
							})
							propList=propList.join(",")
							console.log(propList)
							if(this.worker==null){
								this.worker=new Worker()
							}
							this.worker.postMessage({logic:JSON.stringify(logic),logicIndexKey:JSON.stringify(logicIndexKey),comDesc:JSON.stringify(System.comDesc)})
							this.worker.onmessage = e => {
								if(e.data!==false){
									if(!this.provide)
										System.callOpenCode(()=>{},"const methods={\n"+this.target+`:function(${propList}){\n`+e.data.code+"\n}\n}",{title:"代码逻辑检查"})
									else
										System.callOpenCode(()=>{},e.data.code,{title:"代码逻辑检查"})
									if(this.workerTimeOut!=null){
										clearTimeout(this.workerTimeOut)
									}
									this.workerTimeOut=setTimeout(() => {
									    this.worker.terminate()
										this.workerTimeOut=null
									    this.worker=null
									}, 1000)
								}else{
									System.showToast("启动失败，请刷新重试")
								}
								propList=null
							}
						

					/*}else{
						System.showToast("当前层次不支持此操作",2000)
					}*/
			},
			callLogicLocation:function(){
				if(!this.provide){
					this.locationLayers.show=false
					this.locationLayers.lastIndex=-1
					this.locationLayers.list=[]
					//为主页面时显示输入框
					this.logicLocationOptions.show=true
					
					this.floatEvent.push(()=>{
						this.logicLocationOptions.show=false
					})
				}else{
					//为子层时，直接跳转
					System.nextLocation(this)
				}
				
			},
			//根据定位编码定位到逻辑位置
			toTargetLocation:function(xpath,viewIndex=-1,targetThis=this){
				//let [pathArray,len]=this.createLocation(xpath,false)
				let allowed=true
				if(this.provide){
					if(this.locationLayers.length==0){
						allowed=false
					}
				}
				if(allowed){
					if(viewIndex>=this.locationLayers.list.length){
						System.showToast("已达到最后一层",2000)
						//到最后一层时，关闭列表显示
						System.clearChildAction("locationLayers.show",false)
					}else{
						let query=""
						let pathArray=xpath.split("=>")
						let temp=""
						for(let i=0;i<pathArray.length;i++){
							temp=pathArray[i].split(".")[0].split("_")
							temp.splice(0,1)
							temp=temp.join("_")
							query+=" #"+temp
						}
						let box=targetThis.$refs['ecMain'].querySelector(query).parentNode
						console.log("box",box)
						if(box){
							let targetTop=box.offsetTop
							System.ecScrollToArea.call(targetThis,{
								top:targetTop,
								behavior:"smooth"
							},box)
							this.locationLayers.lastIndex=viewIndex
						}else{
							System.showToast("未搜索到目标对象",2000)
						}
						
					}
				}else{
					System.showToast("操作禁止",2000)
				}

			},
			logicLocation:function(){
				this.logicLocationOptions.show=false
				let xpath=this.logicLocationOptions.location
				let [pathArray,len]=this.createLocation(xpath,true)
				let location=""
				let needTill=true
				for(let i=0;i<pathArray.length;i++){
					if(pathArray[i].endsWith("@")){
						needTill=false
						pathArray[i]=pathArray[i].padStart(len+1,"0")
					}else{
						pathArray[i]=pathArray[i].padStart(len,"0")
					}
					location+=pathArray[i]
					if(i<pathArray.length-1 && needTill){
						location+="-"
					}
				}
				if(location.split("@").length>0){
					this.locationLayers.show=true
					let prePath=xpath.split("=>")
					let tempPath=""
					let nameList=["Main"]
					for(let i=0;i<pathArray.length;i++){
						if(pathArray[i].endsWith("@") || i==pathArray.length-1){
							let target=prePath[i].split(".")
							this.locationLayers.list.push({
								name:nameList.at(-1),
								path:tempPath+target[0]
							})
							nameList.push(target.at(-1))
							tempPath=""
						}else{
							tempPath+=prePath[i]+"=>"
						}
					}
					this.toTargetLocation(this.locationLayers.list[0].path,0)
				}
				
				return location
			},
			copyLocationLayer:function(index,path){
				console.log(this.locationLayers.lastIndex+1,index)
				if(index==(this.locationLayers.lastIndex+1)){
					try{
						navigator.clipboard.writeText(path)
						System.showToast("已复制",2000)
					}catch{
						alert("写入剪贴板失败,请复制:"+path)
					}
					this.locationLayers.lastOne=-1
				}
				else{
					System.showToast("层次禁止，请按照顺序进行定位",3000)
				}
			},
			callMainAreaMenu:function(e){
				e.preventDefault()
				this.mainRightBarMenu.left=e.clientX
				this.mainRightBarMenu.top=e.clientY
				this.mainRightBarMenu.show=true
				this.$nextTick(()=>{
					this.$refs['inputForClose'].focus()
				})
			},
			quickLocation:function(){
				this.locationLayers.show=false
				this.locationLayers.lastIndex=-1
				this.locationLayers.list=[]
			},
			
			backToIndexLayer:function(){
				this.closeChildLayers.forEach(event => {
					try{
						event()
					}catch{}
				})
				this.closeChildLayers=[]
			},
			//操作顺序栈
			pushToActionStack:function(type,preData,event=()=>{}){
				/*
					xpath:更改源路径
					type:操作类型 add/delete/change
					preData:原数据，适用于change 类型
				*/
				this.editStack.push({
					type:type,
					preData:preData
				})
			},
			//重做
			redoAction:function(){
				//弹出操作栈顶
				/*let action=this.editStack.pop()
				let preData=localStorage.getItem("redo_"+action.name)
				localStorage.removeItem("redo_"+action.name)
				localStorage.setItem("undo_"+action.name,JSON.stringify(this.LOGICSOURCE))
				this.undoStack.push({
					name:action.name,
					type:action.type,
				})
				this.LOGICSOURCE=JSON.parse(preData)
				this.processLogic()*/
				try{
					let action=this.editStack.pop()
					this.undoStack.push({
						type:action.type,
						preData:JSON.stringify(this.LOGICSOURCE),
					})
					this.LOGICSOURCE=JSON.parse(action.preData)
					this.processLogic()
				}catch(e){
					console.error(e)
				}
				
				/*if(action.type=='change' || action.type=='delete'){
					//修改或删除操作，恢复原值
					try{
						new Function('redo',`
									${action.xpath}=${action.preData}
									redo()
									//存储撤销重做栈
									this.undoStack.push(action)
									`).call(this,action.event)
						
						return true
					}catch(e){
						console.log("e",e)
						return false
					}
				}else if(action.type=='add'){
					//新增操作，删除新增
					try{
						console.log("重做",action.type,action,action.event)
						new Function('redo',`
									delete ${action.xpath}
									redo()
									`).call(this,action.event)
						
					}catch(e){
						console.error(e)
					}
				}*/
				
			},
			undoAction:function(){
				//弹出操作栈顶
				/*let action=this.undoStack.pop()
				let preData=localStorage.getItem("undo_"+action.name)
				localStorage.removeItem("undo_"+action.name)
				localStorage.setItem("redo_"+action.name,JSON.stringify(this.LOGICSOURCE))
				this.editStack.push({
					name:action.name,
					type:action.type,
				})
				this.LOGICSOURCE=JSON.parse(preData)
				this.processLogic()*/
				try{
					let action=this.undoStack.pop()
					this.editStack.push({
						type:action.type,
						preData:JSON.stringify(this.LOGICSOURCE),
					})
					this.LOGICSOURCE=JSON.parse(action.preData)
					this.processLogic()
				}catch{}
			},
			ecMainKeyDown:function(e){
				if(window.Control){
					if(['z','y'].includes(e.key)){
						e.preventDefault()
					}
					if(this.befocused){
						switch(e.key){
							case "z":
								console.log("重做")
								this.redoAction()
								
								break
							case "y":
								console.log("恢复")
								this.undoAction()
								break
						}
					}
				}
			},
		}
	}
</script>

<style scoped>
	.actionEditOut{
		border-radius: 10px;
		position: absolute;
		width: 66vw;
		height: calc(80vh + 30px);
		background-color: rgba(255,255,255,0.98);
		/*backdrop-filter: blur(10px);*/
		box-shadow: 0 0 15px var(--mainColorGray2);
		box-shadow: 15px;
	}
	.header{
		height: 40px;
		width: 100%;
		display: flex;
		border-radius: 10px;
		background-color: rgba(245,245,245,0.9);
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	.headerButton1{
		width: 65px;
		height: 30px;
		margin-top: 5px;
		margin-left: 5px;
		border-radius: 10px;
		background-color: white;
		color: var(--mainColorBlue2);
		font-weight: normal;
		padding: 0;
		transition: .2s;
	}
	.headerButton1:hover{
		background-color: var(--mainColorBlue2);
		color: white;
	}
	.headerButton_home{
		position: relative;
		width: 50px;
		height: 30px;
		margin-top: 5px;
		margin-left: 5px;
		border-radius: 10px;
		background-color: white;
		color: var(--mainColorBlue2);
		font-weight: normal;
		padding: 0;
		transition: .2s;
	}
	.headerButton_home:hover{
		box-shadow: 0 0 15px rgba(0,0,0,0.05);
	}
	.headerButton_home:hover::after{
		content: "返回首层";
		position: absolute;
		width: 50px;
		height: 20px;
		padding-left: 8px;
		padding-right: 8px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	.headerButton2{
		width: 47px;
		height: 30px;
		margin-top: 5px;
		margin-left: 5px;
		border-radius: 10px;
		background-color: transparent;
		color: var(--mainColorBlue2);
		font-weight: normal;
		padding: 0;
		transition: .2s;
	}
	.pathItem{
		position: relative;
		width: auto;
		padding-left: 8px;
		padding-right: 8px;
		background-color: white;
		color: var(--mainColorBlue3);
		font-weight: normal;
		text-align: center;
		line-height: 25px;
		height: 25px;
		margin-top: 3px;
		border-radius: 10px;
		min-width: 35px;
		margin-left: 20px;
		transition: .2s;
		cursor: pointer;
	}
	.pathItem:hover{
		background-color: var(--mainColorBlue3);
		color: white;
	}
	.spreadPathItem{
		position: relative;
		overflow: hidden;
		width: 90%;
		margin-left: 5%;
		height: 25px;
		margin-top: 5px;
		text-align: left;
		font-weight: normal;
		color: var(--mainColorBlue3);
		background-color: transparent;
		cursor: pointer;
		padding-left: 10px;
		box-sizing: border-box;
		line-height: 25px;
		border-radius: 10px;
		transition: .2s;
	}
	.spreadPathItem:hover{
		background-color: var(--mainColorGray3);
	}
	.pathBarText{
		white-space:nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		transition: .2s;
		z-index: 2;
		position: absolute;
		left: 8px;top: 0;
		color:var(--mainColorBlue3)
	}
	.varList{
		user-select: none;
		z-index: 2;
		transform-origin: 10px 0;
		transition: .1s;
		background-color: white;
		box-shadow: 0 0 10px var(--mainColorGray2);
		border-radius: 10px;
		position: absolute;
		width: 20vw;
		min-width: 300px;
		left:10px;
		top: 40px;
		height: 50vh;
		z-index: 99999;
	}
	.varItem{
		position: relative;
		width: 100%;
		height: 35px;
		margin-top: 5px;
		display: flex;
	}
	.textEdit{
		position: absolute;
		width:15vw;
		height:20vh;
		background-color: white;
		box-shadow: 0 0 10px var(--mainColorGray2);
		border-radius: 10px;
	}
	.componentList{
		background-color: white;
		border-radius: 10px;
		box-shadow: 0 5px 15px var(--mainColorGray3);
		position: absolute;
		width: 35vw;
		animation: showComponents .2s;
		animation-fill-mode: forwards;
		animation-timing-function: ease-in-out;
		top:5px;
		left:220px;
		height: 30px;
		z-index: 99;
		transition: .2s;
		transform-origin: left;
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	@keyframes showComponents{
		from{
			transform: scaleX(0);
		}to{
			transform: scale(1);
		}
	}
	.componentHeader{
		width: 100%;
		position: relative;
		border: none;
		border-bottom: none;
		animation-name: showHeader;
		animation-duration: .2s;
		animation-timing-function: ease-in;
		animation-fill-mode: forwards;

		overflow: hidden;
	}
	@keyframes showHeader {
		from{
			height: 0;
			border-bottom: none;
		}
		to{
			height: 30px;
			border-bottom:2px solid var(--mainColorGray2)
		}
	}
	.eventComponentMain{
		overflow-x: hidden;
		background-color: transparent;
		position: relative;
		border-radius:  0 0 10px 10px;
	}
	.comItem{
		height: 20px;
		margin: 5px;
		background-color: var(--mainColorBlue2);
		color:white;
		border-radius: 10px;
		min-width: 30px;
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	.areaContentLine{
		position: absolute;
		top: 0;
		left: 130px;
		height: 100%;
		background-color: transparent;
		width: 10px;
		border:2px dashed var(--mainColorGray2);
		border-right: none;
	}
	.areaContentLine::after{
		content: '';
		position: absolute;
		height: 50px;
		width: 10px;
		background-color: transparent;
		left: -14px;
		border:2px dashed var(--mainColorGray4);
		border-right: none;
		border-left: none;
		border-top: none;
		top: -10px;
	}
	.componentArea{
		transition: .2s;
		position: relative;
		margin:10px;
		margin-left: 125px;
	}
	.areaContentLine{
		position: absolute;
		top: 0;
		left: 130px;
		height: 100%;
		background-color: transparent;
		width: 10px;
		border:2px dashed var(--mainColorGray2);
		border-right: none;
	}
	.main{
		min-width: 200px;
		background-color: transparent;
		min-height: 50px;
	}

	.spanItem{
		width: 10px;
		height: 2px;
		background-color: white;
		pointer-events: none;
		position: absolute;
		left: 50%;
		top: 5px;
		transform-origin: center;
	}
	main::-webkit-scrollbar{
		display: block;
		  width: 5px;
		  height: 5px;
	}
	main::-webkit-scrollbar-button{
	  width: 5px;
	  height: 5px;
	  background-color: transparent;
	}
	main::-webkit-scrollbar-track{
	  width:5px;
	  height: 10px;
	  background-color: transparent;
	}
	main::-webkit-scrollbar-thumb{
	 height: 5px;
	  width: 5px;
	  border-radius: 5px;
	  background-color: rgba(0,0,0,0.25);
	}
	.renamelogic{
		position: absolute;
		z-index: 9999;
		top: 40vh;
		left: 40vw;
		transform: translate(-50% -50%);
		height: 90px;
		width: 300px;
		background-color: white;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 10px;
		overflow: hidden;
	}
	.writeexplain{
		position: absolute;
		z-index: 9999;
		top: 35vh;
		left: 40vw;
		transform: translate(-50% -50%);
		height: 200px;
		width: 300px;
		background-color: white;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
		border-radius: 10px;
		overflow: hidden;
	}
	.provideBackButton{
		width: 80px;
		text-align: center;
		color: white;
		background-color: var(--mainColorBlue3);
		margin-left: 10px;
		margin-top: 5px;
		cursor: pointer;
		border-radius: 10px;
		user-select: none;
		font-weight: normal;
		line-height: 25px;
		height: 25px;
		animation: showProvideBackButton .2s;
		animation-fill-mode: forwards;
		transform: translateX(50%);
		opacity: 0;
		animation-delay: .2s;
	}
	@keyframes showProvideBackButton{
		from{
			transform: translateX(50%);
			opacity: 0;
		}
		to{
			transform: translateX(0);
			opacity: 1;
		}
	}
	.comItem_provide{
		width: 90%;
		margin-left: 5%;
		border-radius: 10px;
		margin-top: 5px;
		height: 30px;
		color: var(--mainColorBlue3);
		background-color: transparent;
		transition: .2s;
		text-align: left;
	}
	.comItem_provide:hover{
		background-color: var(--mainColorGray3);
	}
	.propsItem{
		width: auto;
		padding-left: 10px;
		padding-right: 10px;
		height: 25px;
		border-radius: 10px;
		background-color: var(--mainColorBlue3);
		color: white;
		line-height: 25px;
		user-select: none;
		font-weight: normal;
		cursor: pointer;
		margin-left: 5px;
		position: relative;
	}
	.propsItem:hover::after{
		content: '双击修改';
		position: absolute;
		width: 100px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	.addProps{
		width: 30px;
		height: 25px;
		margin-left: 5px;
		position: relative;
		cursor: pointer;
	}
	.addProps:hover::after{
		content: '添加形参';
		position: absolute;
		width: 100px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: -35px;
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
			bottom: 0px;
		}to{
			opacity: 1;
			bottom:-25px;
		}
	}
	.editProps{
		position: absolute;
		width: 300px;
		height: 200px;
		z-index: 9999;
		top: 100vh;
		left: 50vw;
		transform: translate(-50%,-50%);
		border-radius: 10px;
		background-color: rgba(255,255,255,1);
		box-shadow: 0 0 15px rgba(0,0,0,0.1);
		transition: .2s;
		animation: showPropsEdit .5s;
		animation-fill-mode: forwards;
	}
	@keyframes showPropsEdit {
		from{
			opacity: 0;
			top: 100vh;
		}to{
			opacity: 1;
			top: 50vh;
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
	.monacoProps:hover::after{
		
		content: attr(propsTitle);
		position: absolute;
		width: auto;
		height: 20px;
		padding-left: 8px;
		padding-right: 8px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	.eventTitle:hover::after{
		content: attr(eventTitle);
		position: absolute;
		width: auto;
		height: 20px;
		padding-left: 8px;
		padding-right: 8px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	.newVarOut{
		transform-origin: left top;
		transform: scale(0);
		transition: .2s;
	}
	.newVarButton{
		width: 90%;
		margin-left: 5%;
		height: 30px;
		margin-top: 5px;
		line-height: 30px;
		font-weight: normal;
		text-align: center;
		border-radius: 8px;
		background-color: transparent;
		transition: .2s;
		cursor: pointer;
		color: #212121;
		
	}
	@keyframes showNewVar {
		from{
			transform: scale(0);
		}to{
			transform: scale(1);
		}
	}
	.newVarButton:hover{
		background-color: var(--mainColorGray3);
	}
	.logicLocationBar{
		display: flex;
		width: 50%;
		height: 45px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background-color: white;
		z-index: 999;
		bottom: 0;
		opacity: 0;
		box-shadow: 0 0 30px rgba(0,0,0,0.1);
		border-radius: 20px;
		transition: .2s;
		animation: showLocationBar .2s;
		animation-fill-mode: forwards;
	}
	@keyframes showLocationBar {
		from{
			bottom: 0px;
			opacity: 0;
		}
		to{
			bottom: -55px;
			opacity: 1;
		}
	}
	.locationLayerButton{
		width: 90%;
		height: 30px;
		margin-top: 5px;
		margin-left: 5%;
		border-radius: 10px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: .2s;
		line-height: 30px;
		box-shadow: 0 0 30px rgba(0,0,0,0.1);
		cursor: pointer;
	}
	.locationLayerButton:hover{
		background-color: var(--mainColorBlue3);
		color:white;
	}
</style>