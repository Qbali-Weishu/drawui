<template>
	<div>
		<teleport to="body" v-if="mode == 'normal'">
			<div class="varProvide" ref="varProvide" :style="{transform:`${codeBord.show && (varTypeIndex==4 || varTypeIndex==5) ?'translateX(-100%)':'translateX(-50%)'}`}">
				<!--顶部栏-->
				<div class='header'>
					<!--类型选择-->
					<div @click="openVarSelectBord" style="width: 150px;text-align: center;line-height: 25px;font-weight: normal;cursor: pointer;;color: white;position: absolute;left: 8px;top: 5px;height: 25px;border-radius: 10px;background-color: var(--mainColorBlue2);">
						{{varType}}
					</div>
				</div>
				<!--数据变量列表部分-->
				<div class="list" v-if="varTypeIndex==0">
					<div class="dataVarType" v-for="(varItem,index) in varDict" :key="index">
						<!--复制按钮-->
						<div style="width: 20px;height: 20px;margin-top: 5px;margin-left: 5px;cursor: pointer;">
							<svg v-if="['normal','copy'].includes(mode)" t="1664713981199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" width="20" height="20"><path d="M761.088 715.3152a38.7072 38.7072 0 0 1 0-77.4144 37.4272 37.4272 0 0 0 37.4272-37.4272V265.0112a37.4272 37.4272 0 0 0-37.4272-37.4272H425.6256a37.4272 37.4272 0 0 0-37.4272 37.4272 38.7072 38.7072 0 1 1-77.4144 0 115.0976 115.0976 0 0 1 114.8416-114.8416h335.4624a115.0976 115.0976 0 0 1 114.8416 114.8416v335.4624a115.0976 115.0976 0 0 1-114.8416 114.8416z" p-id="2595" fill="#e6e6e6"></path><path d="M589.4656 883.0976H268.1856a121.1392 121.1392 0 0 1-121.2928-121.2928v-322.56a121.1392 121.1392 0 0 1 121.2928-121.344h321.28a121.1392 121.1392 0 0 1 121.2928 121.2928v322.56c1.28 67.1232-54.1696 121.344-121.2928 121.344zM268.1856 395.3152a43.52 43.52 0 0 0-43.8784 43.8784v322.56a43.52 43.52 0 0 0 43.8784 43.8784h321.28a43.52 43.52 0 0 0 43.8784-43.8784v-322.56a43.52 43.52 0 0 0-43.8784-43.8784z" p-id="2596" fill="#e6e6e6"></path></svg>
							<svg v-else @click="returnProvide(varItem.name)" t="1664893805815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4644" width="20" height="20"><path d="M327.175 767.786h-204.743c-42.33 0-76.778-34.448-76.778-76.779v-614.228c0-42.33 34.448-76.778 76.778-76.778h716.601c42.33 0 76.778 34.448 76.778 76.778v358.3c0 14.127-11.466 25.593-25.593 25.593-14.128 0-25.593-11.466-25.593-25.593v-358.3c0-14.128-11.466-25.593-25.593-25.593h-716.601c-14.127 0-25.593 11.465-25.593 25.593v614.228c0 14.128 11.466 25.594 25.593 25.594h204.743c14.128 0 25.593 11.465 25.593 25.593-0.001 14.126-11.466 25.593-25.593 25.593v0zM711.068 1023.714c-10.135 0-19.757-6.092-23.751-16.071l-86.862-217.13-151.663 173.315c-7.012 8.036-18.273 10.852-28.255 7.114s-16.585-13.309-16.585-23.955v-767.786c0-10.135 5.989-19.297 15.254-23.392s20.064-2.354 27.59 4.453l563.043 511.857c7.831 7.114 10.493 18.325 6.653 28.153-3.839 9.827-13.309 16.379-23.853 16.379h-218.103l88.347 220.814c5.271 13.104-1.126 28-14.281 33.27l-127.964 51.186c-3.122 1.229-6.348 1.843-9.521 1.843l-0.051-0.050zM608.697 716.601c1.434 0 2.866 0.102 4.3 0.357 8.804 1.485 16.123 7.474 19.45 15.714l92.851 232.178 80.464-32.196-92.851-232.178c-3.173-7.882-2.199-16.839 2.56-23.852 4.761-7.013 12.693-11.261 21.19-11.261h189.746l-471.267-428.425v641.818l134.313-153.506c4.913-5.58 11.926-8.753 19.246-8.753v0.103z" p-id="4645" fill="#e6e6e6"></path></svg>
						</div>
						<!--名称-->
						<input @input="nameCheck();saveName(key)" class="input" v-model="varDict[index].name"/>
						<!--值-->
						<input v-if="!['object','array','function'].includes(typeof(varItem.value))" class="input" @input="saveValue(index)" 
						style="background-color: var(--mainColorGrayBg2);"
						:style="{'color':getTextColor(varItem.value)}" 
						v-model="varDict[index].value"/>
						<div @click="openObjectBord($event,index)" v-else class="input" style="background-color: var(--mainColorBlue2);color: white;cursor: pointer;">
							Object数据对象
						</div>
						<!--展开选项-->
						<div v-if="mode=='normal'" @click="openOpeBord($event,index)" style="width: 20px;height: 20px;margin-top: 5px;margin-left: 5px;cursor: pointer;">
							<svg t="1664714952110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3674" width="20" height="20"><path d="M901.632 896H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 568.32H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 240.64H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808z" p-id="3675" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--入参变量列表部分-->
				<div class="list" v-else-if="varTypeIndex==1">
					<div class="propsVarType" v-for="(varItem,key) in varDict" :key="key">
						<!--复制按钮-->
						<div style="width: 20px;height: 20px;margin-top: 35px;margin-left: 5px;cursor: pointer;">
							<svg v-if="['normal','copy'].includes(mode)" t="1664713981199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" width="20" height="20"><path d="M761.088 715.3152a38.7072 38.7072 0 0 1 0-77.4144 37.4272 37.4272 0 0 0 37.4272-37.4272V265.0112a37.4272 37.4272 0 0 0-37.4272-37.4272H425.6256a37.4272 37.4272 0 0 0-37.4272 37.4272 38.7072 38.7072 0 1 1-77.4144 0 115.0976 115.0976 0 0 1 114.8416-114.8416h335.4624a115.0976 115.0976 0 0 1 114.8416 114.8416v335.4624a115.0976 115.0976 0 0 1-114.8416 114.8416z" p-id="2595" fill="#e6e6e6"></path><path d="M589.4656 883.0976H268.1856a121.1392 121.1392 0 0 1-121.2928-121.2928v-322.56a121.1392 121.1392 0 0 1 121.2928-121.344h321.28a121.1392 121.1392 0 0 1 121.2928 121.2928v322.56c1.28 67.1232-54.1696 121.344-121.2928 121.344zM268.1856 395.3152a43.52 43.52 0 0 0-43.8784 43.8784v322.56a43.52 43.52 0 0 0 43.8784 43.8784h321.28a43.52 43.52 0 0 0 43.8784-43.8784v-322.56a43.52 43.52 0 0 0-43.8784-43.8784z" p-id="2596" fill="#e6e6e6"></path></svg>
							<svg v-else @click="returnProvide(varItem.name)" t="1664893805815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4644" width="20" height="20"><path d="M327.175 767.786h-204.743c-42.33 0-76.778-34.448-76.778-76.779v-614.228c0-42.33 34.448-76.778 76.778-76.778h716.601c42.33 0 76.778 34.448 76.778 76.778v358.3c0 14.127-11.466 25.593-25.593 25.593-14.128 0-25.593-11.466-25.593-25.593v-358.3c0-14.128-11.466-25.593-25.593-25.593h-716.601c-14.127 0-25.593 11.465-25.593 25.593v614.228c0 14.128 11.466 25.594 25.593 25.594h204.743c14.128 0 25.593 11.465 25.593 25.593-0.001 14.126-11.466 25.593-25.593 25.593v0zM711.068 1023.714c-10.135 0-19.757-6.092-23.751-16.071l-86.862-217.13-151.663 173.315c-7.012 8.036-18.273 10.852-28.255 7.114s-16.585-13.309-16.585-23.955v-767.786c0-10.135 5.989-19.297 15.254-23.392s20.064-2.354 27.59 4.453l563.043 511.857c7.831 7.114 10.493 18.325 6.653 28.153-3.839 9.827-13.309 16.379-23.853 16.379h-218.103l88.347 220.814c5.271 13.104-1.126 28-14.281 33.27l-127.964 51.186c-3.122 1.229-6.348 1.843-9.521 1.843l-0.051-0.050zM608.697 716.601c1.434 0 2.866 0.102 4.3 0.357 8.804 1.485 16.123 7.474 19.45 15.714l92.851 232.178 80.464-32.196-92.851-232.178c-3.173-7.882-2.199-16.839 2.56-23.852 4.761-7.013 12.693-11.261 21.19-11.261h189.746l-471.267-428.425v641.818l134.313-153.506c4.913-5.58 11.926-8.753 19.246-8.753v0.103z" p-id="4645" fill="#e6e6e6"></path></svg>
						</div>
						<!--名称-->
						<input @input="nameCheck();saveName(key)" class="input"  style="margin-top: 30px;" v-model="varDict[key].name"/>
						<!--类型与值-->
						<div style="height: 90px;position: relative;;width: calc(50% - 40px);background-color: transparent;">
							<!--类型-->
							<div class="propsItem_data" @click="openPropsBord($event,key)" opeName="设置类型">
								{{varItem.type}}
							</div>
							<input v-if="!['object','array','function'].includes(typeof(varItem.value))" class="input" @input="saveValue" v-model="varItem.default" 
								:style="{'color':getTextColor(varItem.value)}"  
								style="margin-top: 30px;width: 80%;margin-left: 20%;background-color: var(--mainColorGrayBg2);"/>
							<div v-else @click="openObjectBord($event,key)"  class="input" style="background-color: var(--mainColorBlue2);color: white;cursor: pointer;margin-top: 30px;width: 80%;margin-left: 20%;">
								Object数据对象
							</div>
							<!--连接线-->
							<svg t="1664716964679" style="position: absolute;top: 10px;left: 0;transform: scale(2,1);" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4943" width="20" height="20"><path d="M257.6 960h-64c0-103.5 20.3-203.8 60.2-298.3 38.6-91.2 93.8-173.2 164.2-243.5 70.4-70.3 152.3-125.5 243.6-164.1C756 214.2 856.5 194 960 194v64c-387.3 0-702.4 314.9-702.4 702z" fill="white" p-id="4945"></path></svg>
							<svg t="1664716964679" style="position: absolute;bottom: 10px;left: 0;transform: scale(2,-1);" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4943" width="20" height="20"><path d="M257.6 960h-64c0-103.5 20.3-203.8 60.2-298.3 38.6-91.2 93.8-173.2 164.2-243.5 70.4-70.3 152.3-125.5 243.6-164.1C756 214.2 856.5 194 960 194v64c-387.3 0-702.4 314.9-702.4 702z" fill="white" p-id="4945"></path></svg>
						</div>
						<!--展开选项-->
						<div v-if="mode=='normal'" @click="openOpeBord($event,key)" style="width: 20px;height: 20px;margin-top: 35px;margin-left: 5px;cursor: pointer;">
							<svg t="1664714952110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3674" width="20" height="20"><path d="M901.632 896H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 568.32H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 240.64H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808z" p-id="3675" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--引入变量列表部分-->
				<div class="list" v-else-if="varTypeIndex==2">
					<!--标题栏-->
					<div style="display: flex;width: 100%;height: 30px;">
						<div style="width: 30px;">
						</div>
						<div  class="input" style="background-color: transparent;color: white;">
							名称
						</div>
						<div class="input" style="background-color: transparent;color: white;">
							来源
						</div>
					</div>
					<div class="dataVarType" v-for="(varItem,index) in varDict" :key="index">
						<!--复制按钮-->
						<div style="width: 20px;height: 20px;margin-top: 5px;margin-left: 5px;cursor: pointer;">
							<svg v-if="['normal','copy'].includes(mode)" t="1664713981199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" width="20" height="20"><path d="M761.088 715.3152a38.7072 38.7072 0 0 1 0-77.4144 37.4272 37.4272 0 0 0 37.4272-37.4272V265.0112a37.4272 37.4272 0 0 0-37.4272-37.4272H425.6256a37.4272 37.4272 0 0 0-37.4272 37.4272 38.7072 38.7072 0 1 1-77.4144 0 115.0976 115.0976 0 0 1 114.8416-114.8416h335.4624a115.0976 115.0976 0 0 1 114.8416 114.8416v335.4624a115.0976 115.0976 0 0 1-114.8416 114.8416z" p-id="2595" fill="#e6e6e6"></path><path d="M589.4656 883.0976H268.1856a121.1392 121.1392 0 0 1-121.2928-121.2928v-322.56a121.1392 121.1392 0 0 1 121.2928-121.344h321.28a121.1392 121.1392 0 0 1 121.2928 121.2928v322.56c1.28 67.1232-54.1696 121.344-121.2928 121.344zM268.1856 395.3152a43.52 43.52 0 0 0-43.8784 43.8784v322.56a43.52 43.52 0 0 0 43.8784 43.8784h321.28a43.52 43.52 0 0 0 43.8784-43.8784v-322.56a43.52 43.52 0 0 0-43.8784-43.8784z" p-id="2596" fill="#e6e6e6"></path></svg>
							<svg v-else @click="returnProvide(varItem.name)" t="1664893805815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4644" width="20" height="20"><path d="M327.175 767.786h-204.743c-42.33 0-76.778-34.448-76.778-76.779v-614.228c0-42.33 34.448-76.778 76.778-76.778h716.601c42.33 0 76.778 34.448 76.778 76.778v358.3c0 14.127-11.466 25.593-25.593 25.593-14.128 0-25.593-11.466-25.593-25.593v-358.3c0-14.128-11.466-25.593-25.593-25.593h-716.601c-14.127 0-25.593 11.465-25.593 25.593v614.228c0 14.128 11.466 25.594 25.593 25.594h204.743c14.128 0 25.593 11.465 25.593 25.593-0.001 14.126-11.466 25.593-25.593 25.593v0zM711.068 1023.714c-10.135 0-19.757-6.092-23.751-16.071l-86.862-217.13-151.663 173.315c-7.012 8.036-18.273 10.852-28.255 7.114s-16.585-13.309-16.585-23.955v-767.786c0-10.135 5.989-19.297 15.254-23.392s20.064-2.354 27.59 4.453l563.043 511.857c7.831 7.114 10.493 18.325 6.653 28.153-3.839 9.827-13.309 16.379-23.853 16.379h-218.103l88.347 220.814c5.271 13.104-1.126 28-14.281 33.27l-127.964 51.186c-3.122 1.229-6.348 1.843-9.521 1.843l-0.051-0.050zM608.697 716.601c1.434 0 2.866 0.102 4.3 0.357 8.804 1.485 16.123 7.474 19.45 15.714l92.851 232.178 80.464-32.196-92.851-232.178c-3.173-7.882-2.199-16.839 2.56-23.852 4.761-7.013 12.693-11.261 21.19-11.261h189.746l-471.267-428.425v641.818l134.313-153.506c4.913-5.58 11.926-8.753 19.246-8.753v0.103z" p-id="4645" fill="#e6e6e6"></path></svg>
						</div>
						<!--名称-->
						<input @input="nameCheck();saveName(index)" class="input" v-model="varItem.name"/>
						<!--来源-->
						<div class="input" v-if="varItem.from">{{varItem.from}}</div>
						<!--展开选项-->
						<div v-if="mode=='normal'" @click="openOpeBord($event,index)" style="width: 20px;height: 20px;margin-top: 5px;margin-left: 5px;cursor: pointer;position: absolute;right: 5px;">
							<svg t="1664714952110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3674" width="20" height="20"><path d="M901.632 896H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 568.32H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 240.64H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808z" p-id="3675" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--开放变量列表部分-->
				<div class="list" v-else-if="varTypeIndex==3">
					<div class="dataVarType" v-for="(varItem,index) in varDict" :key="index">
						<!--名称-->
						<h3 class="input" style="background-color: transparent;color: white;margin: 0;padding: 0;">开放源:</h3>
						<!--值-->
						<div class="input">
							{{varItem.name}}
						</div>
						<!--取消开放-->
						<div v-if="mode=='normal'" @click="removeProvide(index)" style="width: 20px;height: 20px;margin-top: 5px;margin-left: 5px;cursor: pointer;position: absolute;right: 5px;">
							<svg t="1664786998821" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6677" width="20" height="20"><path d="M799.584 687.424l53.728-43.488c131.328-106.368 151.584-299.04 45.248-430.368S599.52 61.952 468.192 168.32l-51.52 41.728L306.72 72.96a32 32 0 0 0-49.28 40.832l640.416 798.4a32 32 0 0 0 49.28-40.832l-147.552-183.936zM518.528 230.496a225.984 225.984 0 1 1 284.448 351.264l-53.44 43.264-118.72-148 84.864-70.688-51.232-61.472-83.68 69.76-114.048-142.176 51.808-41.952zM504.384 823.552a225.984 225.984 0 1 1-284.448-351.264l110.976-89.856-50.336-62.176L169.6 410.112C38.272 516.448 18.016 709.152 124.352 840.48c106.368 131.328 299.04 151.584 430.368 45.248l105.12-85.12-50.336-62.176-105.12 85.12z" p-id="6678" fill="#e6e6e6"></path><path d="M446.72 526.304l51.2 61.44-125.856 104.864-51.2-61.44z" p-id="6679" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--计算变量列表部分-->
				<div class="list" v-else-if="varTypeIndex==4 ||  (mode!='normal' && varTypeIndex==3)">
					<div class="dataVarType" style="height: 60px;" v-for="(varItem,index) in varDict" :key="index">
						<!--复制按钮-->
						<div style="width: 20px;height: 20px;margin-top: 20px;margin-left: 5px;cursor: pointer;flex-shrink: 0;">
							<svg v-if="['normal','copy'].includes(mode)" t="1664713981199" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2594" width="20" height="20"><path d="M761.088 715.3152a38.7072 38.7072 0 0 1 0-77.4144 37.4272 37.4272 0 0 0 37.4272-37.4272V265.0112a37.4272 37.4272 0 0 0-37.4272-37.4272H425.6256a37.4272 37.4272 0 0 0-37.4272 37.4272 38.7072 38.7072 0 1 1-77.4144 0 115.0976 115.0976 0 0 1 114.8416-114.8416h335.4624a115.0976 115.0976 0 0 1 114.8416 114.8416v335.4624a115.0976 115.0976 0 0 1-114.8416 114.8416z" p-id="2595" fill="#e6e6e6"></path><path d="M589.4656 883.0976H268.1856a121.1392 121.1392 0 0 1-121.2928-121.2928v-322.56a121.1392 121.1392 0 0 1 121.2928-121.344h321.28a121.1392 121.1392 0 0 1 121.2928 121.2928v322.56c1.28 67.1232-54.1696 121.344-121.2928 121.344zM268.1856 395.3152a43.52 43.52 0 0 0-43.8784 43.8784v322.56a43.52 43.52 0 0 0 43.8784 43.8784h321.28a43.52 43.52 0 0 0 43.8784-43.8784v-322.56a43.52 43.52 0 0 0-43.8784-43.8784z" p-id="2596" fill="#e6e6e6"></path></svg>
							<svg v-else @click="returnProvide(varItem.name)" t="1664893805815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4644" width="20" height="20"><path d="M327.175 767.786h-204.743c-42.33 0-76.778-34.448-76.778-76.779v-614.228c0-42.33 34.448-76.778 76.778-76.778h716.601c42.33 0 76.778 34.448 76.778 76.778v358.3c0 14.127-11.466 25.593-25.593 25.593-14.128 0-25.593-11.466-25.593-25.593v-358.3c0-14.128-11.466-25.593-25.593-25.593h-716.601c-14.127 0-25.593 11.465-25.593 25.593v614.228c0 14.128 11.466 25.594 25.593 25.594h204.743c14.128 0 25.593 11.465 25.593 25.593-0.001 14.126-11.466 25.593-25.593 25.593v0zM711.068 1023.714c-10.135 0-19.757-6.092-23.751-16.071l-86.862-217.13-151.663 173.315c-7.012 8.036-18.273 10.852-28.255 7.114s-16.585-13.309-16.585-23.955v-767.786c0-10.135 5.989-19.297 15.254-23.392s20.064-2.354 27.59 4.453l563.043 511.857c7.831 7.114 10.493 18.325 6.653 28.153-3.839 9.827-13.309 16.379-23.853 16.379h-218.103l88.347 220.814c5.271 13.104-1.126 28-14.281 33.27l-127.964 51.186c-3.122 1.229-6.348 1.843-9.521 1.843l-0.051-0.050zM608.697 716.601c1.434 0 2.866 0.102 4.3 0.357 8.804 1.485 16.123 7.474 19.45 15.714l92.851 232.178 80.464-32.196-92.851-232.178c-3.173-7.882-2.199-16.839 2.56-23.852 4.761-7.013 12.693-11.261 21.19-11.261h189.746l-471.267-428.425v641.818l134.313-153.506c4.913-5.58 11.926-8.753 19.246-8.753v0.103z" p-id="4645" fill="#e6e6e6"></path></svg>
						</div>
						<div class="codeInfo"  @click="openCodeBord(index)">
							<input @click.stop="" @input="nameCheck();saveName(index)" v-model="varItem.name" placeholder="请输入变量名" class="input" style="width: 90%;text-align: left;padding-left: 24px;box-sizing: border-box;color: white;font-weight: normal;font-size: 14px;line-height: 30px;height: 30px;background-color: transparent;">
							<div style="position: relative;;width: 100%;display: flex;text-align: left;padding-left: 16px;box-sizing: border-box;color: white;font-weight: normal;font-size: 14px;line-height: 25px;height: 25px;">
								<input @click.stop="" @input="saveText(index)" placeholder="输入变量描述" class="input" style="color: white;margin-left:0;width: 80%;background-color:#323232;text-align: left;margin-top: 0;font-size: 12px;padding-left: 8px;box-sizing: border-box;" v-model="varDict[index].text"/>
								<svg style="position: absolute;bottom:5px;right:16px;" t="1664803971409" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7746" width="20" height="20"><path d="M881 562H81c-27.6 0-50-22.4-50-50s22.4-50 50-50h800c27.6 0 50 22.4 50 50s-22.4 50-50 50z" p-id="7747" fill="#e6e6e6"></path><path d="M907.6 540.7L695.5 328.6c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0L978.4 470c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z" p-id="7748" fill="#e6e6e6"></path><path d="M695.5 695.4l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L766.2 766.1c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7z" p-id="7749" fill="#e6e6e6"></path></svg>
							</div>
						</div>
						<!--展开选项-->
						<div v-if="mode=='normal'" @click="openOpeBord($event,index)" style="width: 20px;height: 20px;margin-top: 20px;margin-left: 5px;cursor: pointer;">
							<svg t="1664714952110" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3674" width="20" height="20"><path d="M901.632 896H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 568.32H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808zM901.632 240.64H122.368c-30.72 0-55.808-25.088-55.808-55.808v-1.536c0-30.72 25.088-55.808 55.808-55.808h779.776c30.72 0 55.808 25.088 55.808 55.808v1.536c-0.512 30.72-25.6 55.808-56.32 55.808z" p-id="3675" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--监听列表部分-->
				<div class="list" v-else-if="varTypeIndex==5">
					<div class="watchVarType" v-for="(varItem,index) in varDict" :key="index">
						<div style="width: 90%;height: 100px;">
							<!--名称-->
							<h3 class="headerTitle" style="text-align: left;margin-left: 40px;width: 100px;overflow: hidden;text-overflow: ellipsis;float: left;background-color: transparent;border-radius: 10px;font-size: 18px;font-style: italic;">
								{{varItem.name}}
							</h3>
							<input @click.stop="" @input="saveText(index)" placeholder="输入监听描述" class="input" style="color: white;float: left;margin-left:5px;width: calc(100% - 150px);background-color:#323232;text-align: left;margin-top: 0px;font-size: 12px;padding-left: 8px;box-sizing: border-box;" v-model="varDict[index].text"/>
							<div class="codeInfo" style="width: 90%;margin-left: 10%;margin-top: 30px;" @click="openCodeBord(index)">
								<div class='blockText1' style="padding-left: 24px;">
									监听处理
								</div>
								<div style="height: 30px;display: flex;width: calc(100% - 120px);margin-left: 25px;float: left;line-height: 30px;font-size: 14px;">
									<div class='blockText1' style="padding-left: 16px;">
										即时监听:
									</div>
									<circleCheckBox :precheck="varItem.immediate" style="width: 15px;margin-left: 5px;margin-top: 7px;" @setCheck="(check)=>{varDict[index].immediate=check}" :showText="false"></circleCheckBox>
									<div class='blockText1' style="padding-left: 16px;">
										深度监听:
									</div>
									<circleCheckBox :precheck="varItem.deep" style="width: 15px;margin-left: 5px;margin-top: 7px;" @setCheck="(check)=>{varDict[index].deep=check}" :showText="false"></circleCheckBox>
								</div>
								<div style="margin-top: 30px;position: relative;;width: 100%;display: flex;text-align: left;padding-left: 16px;box-sizing: border-box;color: white;font-weight: normal;font-size: 14px;line-height: 25px;height: 25px;">
									<h4 class="input" style="color: rgba(255,255,255,0.7);margin-left:0;width: 80%;background-color:transparent;text-align: left;margin-top: 0;font-size: 12px;padding-left: 8px;box-sizing: border-box;" >编辑监听到此变量变化时处理事件</h4>
									<svg style="position: absolute;bottom:5px;right:16px;" t="1664803971409" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7746" width="20" height="20"><path d="M881 562H81c-27.6 0-50-22.4-50-50s22.4-50 50-50h800c27.6 0 50 22.4 50 50s-22.4 50-50 50z" p-id="7747" fill="#e6e6e6"></path><path d="M907.6 540.7L695.5 328.6c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0L978.4 470c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z" p-id="7748" fill="#e6e6e6"></path><path d="M695.5 695.4l212.1-212.1c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L766.2 766.1c-19.5 19.5-51.2 19.5-70.7 0s-19.5-51.2 0-70.7z" p-id="7749" fill="#e6e6e6"></path></svg>
								</div>
								<hr style="margin-top: 20px;width: 100%;margin-left: 0;"/>
							</div>
							
						</div>
						<!--取消监听-->
						<div v-if="mode=='normal'" @click="removeWatch(index)" style="width: 20px;height: 20px;margin-top: 50px;margin-left: 8px;cursor: pointer;">
							<svg t="1664861445697" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1629" width="20" height="20"><path d="M853.333333 725.333333h-42.666666c-25.6 0-42.666667-17.066667-42.666667-42.666666v-256c0-25.6 17.066667-42.666667 42.666667-42.666667h42.666666c93.866667 0 170.666667 76.8 170.666667 170.666667s-76.8 170.666667-170.666667 170.666666z m0-85.333333z m0-170.666667v170.666667c46.933333 0 85.333333-38.4 85.333334-85.333333s-38.4-85.333333-85.333334-85.333334zM162.133333 725.333333c-4.266667 0-4.266667 0 0 0-93.866667-8.533333-162.133333-81.066667-162.133333-170.666666 0-93.866667 76.8-170.666667 170.666667-170.666667h42.666666c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666666H170.666667c-46.933333 0-85.333333 38.4-85.333334 85.333334 0 42.666667 34.133333 81.066667 76.8 85.333333 25.6 0 42.666667 21.333333 38.4 46.933333 0 21.333333-17.066667 38.4-38.4 38.4z" p-id="1630" fill="#e6e6e6"></path><path d="M512 981.333333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667c140.8 0 256-115.2 256-256V392.533333c0-25.6 17.066667-42.666667 42.666667-42.666666s42.666667 17.066667 42.666666 42.666666V640c0 187.733333-153.6 341.333333-341.333333 341.333333zM213.333333 674.133333c-25.6 0-42.666667-17.066667-42.666666-42.666666V384c0-187.733333 153.6-341.333333 341.333333-341.333333 76.8 0 149.333333 25.6 209.066667 72.533333 17.066667 12.8 21.333333 42.666667 8.533333 59.733333s-42.666667 21.333333-59.733333 8.533334C622.933333 145.066667 567.466667 128 512 128 371.2 128 256 243.2 256 384v247.466667c0 21.333333-17.066667 42.666667-42.666667 42.666666zM85.333333 981.333333c-12.8 0-21.333333-4.266667-29.866666-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733333l853.333333-853.333333c17.066667-17.066667 42.666667-17.066667 59.733333 0s17.066667 42.666667 0 59.733333l-853.333333 853.333333c-8.533333 8.533333-17.066667 12.8-29.866667 12.8z" p-id="1631" fill="#e6e6e6"></path></svg>
						</div>
						
					</div>
				</div>
				<!--重复变量显示-->
				<div  v-if="repeatName.length>0 && varTypeIndex<=2" style="margin-left: 10px;font-weight: normal;color: #FFD001;position: relative;float: left;display: flex;width: calc(100% - 70px);overflow: hidden;text-overflow: ellipsis;height: 25px;line-height: 25px;">
					重复变量:
					<h3 style="width: 30px;height: 25px;font-weight: normal;margin: 0;padding: 0;color: #FFD001;margin-left: 5px;line-height: 25px;" v-for="(text,index) in repeatName" :key="index">
						{{text+" "}}
					</h3>
				</div>
				<!--添加按钮-->
				<div v-if="varTypeIndex<=2 && mode=='normal'" @click="addItem" style="float: right;height: 25px;width: 50px;border-radius: 10px;background-color: var(--mainColorGrayBg3);margin-right: 8px;cursor: pointer;">
					<svg t="1664870451648" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2724" width="50" height="25"><path d="M512 512V170.666667h42.666667v341.333333h341.333333v42.666667h-341.333333v341.333333h-42.666667v-341.333333H170.666667v-42.666667h341.333333z" fill="#e6e6e6" p-id="2725"></path></svg>
				</div>
			</div>
		</teleport>
		<!--变量类型选择-->
		<teleport to="body" v-if="varSelectBord.show">
			<div 
				class="opeBord"
				style="height: 190px;width: 150px;"
				:style="{left:`${varSelectBord.left}px`,top:`${varSelectBord.top}px`}">
				<div @click="setVarType(index)" class="varTypeItem" v-for="(text,index) in typeKinds" :key="index">
					{{text}}
				</div>
				<input ref="selectInput" class="blurInput" @blur="closeBord('select')"/>
			</div>
		</teleport>
		<!--操作列表-->
		<teleport to="body" v-if="opeBord.show">
			<div 
				class="opeBord"
				:style="{left:`${opeBord.left}px`,top:`${opeBord.top}px`}">
				<!--在引入变量下显示，打开选择列表-->
				<div class="opeItem" v-if="varTypeIndex==2" @click="openLayerBord">
					层级列表
				</div>
				<!--使用编辑器-->
				<div class="opeItem" @click="openObjectBord($event,opeBord.index)">
					编辑器
				</div>
				<!--开放变量-->
				<div class="opeItem" @click="provideItem(varDict[opeBord.index].name)">
					开放此项
				</div>
				<!--监听变量-->
				<div class="opeItem" @click="watchItem(varDict[opeBord.index].name)">
					监听此项
				</div>
				<!--删除变量-->
				<div style="width: 90%;margin-left: 5%;height: 1px;background-color: white;margin-top: 5px;">
				</div>
				<div class="opeItem" @click="removeItem(opeBord.index)">
					删除此项
				</div>
				<input ref="opeInput" class="blurInput" @blur="closeBord('ope')"/>
			</div>
		</teleport>
		<!--入参数据类型列表-->
		<teleport to="body" v-if="propsBord.show">
			<div 
				class="opeBord"
				style="height: 190px"
				:style="{left:`${propsBord.left}px`,top:`${propsBord.top}px`}">
				<div @click="setPropsType(index)" class="varTypeItem" v-for="(text,index) in propsType" :key="index">
					{{text}}
				</div>
				<input ref="propsInput" class="blurInput" @blur="closeBord('props')"/>
			</div>
		</teleport>
		<!--组件层次列表-->
		<teleport to="body" v-if="layerBord.show">
			<div 
				class="layerBord"
				>
				<h3 class="headerTitle">
					父级层次开放数据
				</h3>
				<hr/>
				<div style="width: 100%;height: calc(100% - 40px);overflow: scroll;margin-top: 5px;">
					<div  class="layer" v-for="(layer,index) in layerBord.layers" :key="index">
						<div class='layerTitle'>
							{{layer.layerName}}
						</div>
						<div class="layerItem" @click="setInject(layer.layerName,provideItem.name)" v-for="(provideItem,key) in layer.data">
							{{provideItem.name}}
						</div>
					</div>
				</div>
				<input ref="layerInput" class="blurInput" @blur="closeBord('layer')"/>
			</div>
		</teleport>
		<!--代码编辑框-->
		<teleport to="body" v-if="codeBord.show && ((mode=='normal'&&(varTypeIndex==4 || varTypeIndex==5)) || (mode!='normal' && varTypeIndex==3) )">
			<div
				class="codeBord"
				
				>
				<h3 class="headerTitle">
					{{varTypeIndex==4?'计算属性':varDict[codeBord.key].name+' 监听处理'}}
				</h3>
				<div v-if="mode=='normal'" @click="closeBord('codeWithSave')" class='saveCodeButton'>
					保存并关闭
				</div>
				<button @click="closeBord('codeWithoutSave')"  style="background-color: transparent;color: white;height: 25px;position: absolute;right: 10px;top: 8px;">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
				</button>
				<hr/>
				<div ref="container" id="codeEditBox2" style="height: 100%;text-align: left;width: 100%;" ></div>
			</div>
		</teleport>
		<!--计算属性变量参考-->
		<teleport to="body" v-if="codeBord.show && (varTypeIndex==4 || varTypeIndex==5)">
			<!--参考节点，包含data,props,inject-->
			<div
				class="layerBord"
				style="left: calc(50vw - 200px);top:20vh;"
				>
				<h3 class="headerTitle">
					参考变量
				</h3>
				<hr/>
				<div style="width: 100%;height: calc(100% - 55px);overflow: scroll;margin-top: 5px;">
					<div  class="layer" v-for="(type,index) in codeBord.ref" :key="index">
						<div @click="codeBord.refHeight[type.name]=codeBord.refHeight[type.name] == 0 ? 150 : 0"  class='layerTitle'>
							{{type.name}}
							<div class="tellSpread" :style="{top:`${codeBord.refHeight[type.name]==150 ?8:11}px`}">
							</div>
							<div class="tellSpread" :style="{bottom:`${codeBord.refHeight[type.name]==150 ?8:11}px`}">
							</div>
						</div>
						<div style="width: 100%;height: auto;overflow: scroll;transition: .2s;" :style="{maxHeight:`${codeBord.refHeight[type.name]}px`}">
							<div class="layerItem"  v-for="(refItem,key) in type.data" @click.stop="copyRefName(refItem.name)">
								{{refItem.name}}
							</div>
						</div>
					</div>
				</div>
				<input ref="layerInput" class="blurInput" @blur="closeBord('layer')"/>
				<div style="width: 100%;height: 20px;text-align: left;background-color: transparent;padding-left: 8px;box-sizing: border-box;color: white;font-weight: normal;">
					单击复制 手动输入需前缀 this. 
				</div>
			</div>
		</teleport>
		<!--Object,Array,Function类型编辑-->
		<teleport to="body" v-if="objectBord.show && varTypeIndex<=2">
			<div
				class="codeBord"
				:style="{left:`${objectBord.left}px`,top:`${objectBord.top}px`}"
				style="width: 500px;height: 300px;"
				>
				<div v-if="mode=='normal'" @click="closeBord('objectWithSave')" class='saveCodeButton'>
					保存并关闭
				</div>
				<button @click="closeBord('objectWithoutSave')"  style="background-color: transparent;color: white;height: 25px;position: absolute;right: 10px;top: 8px;">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
				</button>
				<hr style="margin-top: 30px;"/>
				<div ref="container" id="codeEditBox2" style="height: calc(100% - 30px);text-align: left;width: 100%;" ></div>
			</div>
		</teleport>
		<!--提供给状态管理器选择的-->
		<teleport to="body" v-if="mode=='provide' || mode=='copy'">
			<div :style="{left:`${providePosition.left}px`,top:`${providePosition.top}px`}" 
			class="varProvide provideMode" 
			>
				<h3 style="margin: 0;padding: 0;width: 100%;height: 25px;font-weight: normal;font-size: 16px;color: white;text-align: center;margin-top: 8px;">{{{'provide':'状态源选择','copy':"选择变量"}[mode]}}</h3>
				<div style="position: absolute;right: 8px;top: 5px;width: 20px;height: 20px;cursor: pointer;" @click="quit">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
					
				</div>
				<div class="list">
					<div class="dataVarType" v-for="(varItem,index) in varDict" :key="index">
						<!--名称-->
						<div class="input provideItem" @click="returnProvide(varItem)">{{varItem}}</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>
<script>
	import {toRaw} from 'vue'
	import circleCheckBox from "../microTools/circleCheckBox.vue"
	//js对外提供组件，用于提供变量选择
	export default{
		name:"varProvide",
		components:{
			circleCheckBox
		},
		props:{
			propsOptions:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				varType:"数据变量(data)",
				varTypeIndex:0,
				typeKinds:[],
				varSelectBord:{
					show:false,//控制变量类型选择面板
					top:0,
					left:0
				},
				opeBord:{//操作列表面板
					show:false,
					top:0,
					left:0,
					index:-1
				},
				propsBord:{//入参类型选择面板
					show:false,
					top:0,
					left:0,
					index:-1
				},
				layerBord:{//组件层级选择面板
					show:false,
					top:0,
					left:0,
					layers:[]
				},
				codeBord:{
					key:"",
					show:false,
					code:"",
					ref:[],
					refHeight:{
						DATA:150,
						PROPS:150,
						INJECT:150
					},
					isEdit:false
				},
				objectBord:{
					show:false,
					left:0,
					top:0,
					key:"",
					code:"",
					isEdit:false
				},
				varDict:[],
				typeText:[],
				propsType:['Object','Array','String','Number','Boolean'],
				editor:null,
				checkTimeout:null,
				saveTimeout:null,
				repeatName:[],
				typeColor:{
					'String':'#00FF81',
					'Number':'#FFD001',
					"Array":"white",
					'Boolean':'#DF59FF',
					'Object':"white",
					'Other':'#FF8A00'//针对null undefine
				},
				mode:"normal",//normal:正常处理，provide:提供选择,copy：提供复制
				providePosition:{
					left:0,
					top:0,
				}
			}
		},
		
		mounted(){
			//设置模式
			this.mode=this.propsOptions.mode
			console.log(this.propsOptions.left,this.propsOptions.mode)
			if(this.mode=='normal'){
				this.typeText=['DATA','PROPS','INJECT','PROVIDE','COMPUTED','WATCH']
				this.typeKinds=['数据变量(data)','入参变量(props)','引入变量(inject)','开放变量(provide)','计算变量(computed)','监听列表(watch)']
			}else{
				this.typeText=['DATA','PROPS','INJECT','COMPUTED']
				this.typeKinds=['数据变量(data)','入参变量(props)','引入变量(inject)','计算变量(computed)']
			}
			//设置原先类型
			this.resetVarType(this.propsOptions.varType)
			
		},
		methods:{
			getTextColor:function(value){
				if(!isNaN(value)){
					//为数字
					return this.typeColor.Number
				}else if(value=='false' || value=='true'){
					return this.typeColor.Boolean
				}else if(value=='null' || value=='undefine'){
					return this.typeColor.Other
				}
				return '#00B1FF'
			},
			setVarType:function(index){
				//设置当前访问位置
				this.varType=this.typeKinds[index]
				this.varTypeIndex=index
				this.resetVarType(this.varType)
			},
			//展开操作选项
			openOpeBord:function(e,index){
				this.opeBord={
					show:true,
					left:e.clientX,
					top:e.clientY,
					index:index
				}
				this.$nextTick(()=>{
					this.$refs['opeInput'].focus()
				})
			},
			//选择显示的变量类型
			openVarSelectBord:function(e){
				this.varSelectBord={
					show:true,
					left:e.clientX,
					top:e.clientY,
				}
				this.$nextTick(()=>{
					this.$refs['selectInput'].focus()
				})
			},
			//设置入参变量的类型
			openPropsBord:function(e,index){
				if(this.mode!='normal'){
					System.showToast("操作禁止,请从支持库中修改1",3000)
					return
				}
				this.propsBord={
					show:true,
					left:e.clientX,
					top:e.clientY,
					index:index
				}
				
				this.$nextTick(()=>{
					this.$refs['propsInput'].focus()
				})
			},
			openLayerBord:function(e){
				if(this.mode!='normal'){
					System.showToast("操作禁止,请从支持库中修改2",3000)
					return
				}
				let path
				let list=[]
				
				if(System.nowComponentPath=='$'){
					//根组件
					list=[{
						layerName:"根组件",
						data:System.projectMeta.VARLIST.PROVIDE
					}]
				}else{
					let path=System.componentLayers[System.nowComponentPath]
					list=[]
					let meta
					for(let i=0;i<path.length;i++){
						if(path[i]=='$'){
							list.push({
								layerName:"根组件",
								data:System.projectMeta.VARLIST.PROVIDE
							})
						}else{
							//读取组件节点
							meta=System.requestCompoentMeta(path[i])
							list.push({
								layerName:meta.componentName,
								data:meta.VARLIST.PROVIDE
							})
						}
					}
				}
				this.layerBord={
					top:e.clientY,
					left:e.clientX,
					show:true,
					layers:list
				}
				this.$nextTick(()=>{
					this.$refs['layerInput'].focus()
				})
			},
			openCodeBord:function(key){				
				if(this.mode=='normal'){
					//设置变量参考data,props,inject
					if(!this.varDict[key].name){
						System.showToast("未对变量命名,无法编辑")
						return
					}
					let kind=['DATA','PROPS','INJECT']
					let ref=[]
					for(let i=0;i<3;i++){
						ref.push({
							name:kind[i],
							data:JSON.parse(JSON.stringify(System.metaData.VARLIST[kind[i]]))
						})
					}
					this.codeBord.ref=ref
				}
				
				this.codeBord.show=true
				this.codeBord.code=this.varDict[key].code
				this.codeBord.key=key
				
				this.codeBord.isEdit=false
				this.$nextTick(() => {
					this.$refs['varProvide'].style.transform="translateX(-100%)"
					setTimeout(()=>{
						this.editor=monaco.editor.create(this.$refs['container'],{
							theme:'vs-dark',
							language:"javascript",
							readOnly:this.mode=='normal'?false:true,
						})
						if(this.mode=='normal'){
							this.editor.onDidChangeModelContent((event) => {
								if(this.timeout!=null)
									clearTimeout(this.timeout)
								this.timeout=setTimeout(()=>{
									this.codeBord.isEdit=true
								},1000)
							})
						}
						setTimeout(()=>{
							this.setCode(this.codeBord.code)
						},500)
					},600)
				});
			},
			getCodeVal:function() {
			  return toRaw(this.editor).getValue()
			},
			setCode:function(code,isStart=false){
				this.$nextTick(()=>{
					setTimeout(()=>{
						toRaw(this.editor).setValue(code)
					},500)
				})
			},
			resetVarType:function(vartype){
				this.codeBord.show=false
				this.varType=vartype
				this.varTypeIndex=this.typeKinds.indexOf(this.varType)
				let type=this.typeText[this.varTypeIndex]
				if(this.mode=='normal'){
					this.varDict=JSON.parse(JSON.stringify(System.metaData.VARLIST[type]))
				}else{
					this.varDict=JSON.parse(JSON.stringify(System.componentVar))
					this.providePosition={
						left:this.propsOptions.left,
						top:this.propsOptions.top
					}
					console.log(this.providePosition)
				}
				console.log(this.varDict)
				this.nameCheck()
				/*
					name,
					value,
					text,
				*/

			},
			closeBord:function(target){
				const action={
					'ope':()=>{
						this.opeBord.show=false
					},
					'select':()=>{
						this.varSelectBord.show=false
					},
					'props':()=>{
						this.propsBord.show=false
					},
					'layer':()=>{
						this.layerBord.show=false
					},
					'codeWithSave':()=>{
						try{
							this.varDict[this.codeBord.key].code=this.getCodeVal()
							System.showToast("保存成功")
						}catch{
							System.showToast("保存失败")
						}
						this.codeBord.show=false
					},
					'codeWithoutSave':()=>{
						if(this.codeBord.isEdit){
							if(confirm("是否保存更改过的内容")){
								action.codeWithSave()
							}else{
								this.codeBord.show=false
							}
						}else{
							this.codeBord.show=false
						}
					},
					
					'objectWithSave':()=>{
						try{
							let data=this.getCodeVal()
							let reg=new RegExp(/new\s+(Object\(){1}/)
							if(reg.test(data)){
								let firstIndex=data.indexOf('{')//第一个出现的位置
								if(data.search(reg)<firstIndex){
									data=data.slice(firstIndex,data.length-1)
								}
							}
							try{
								
								new Function('textData',`
									let test=JSON.parse(JSON.stringify(${data}))
									this.varDict[this.objectBord.key].value=${data}
									this.varDict[this.objectBord.key].codeText=textData
									this.saveObjectData(${data},textData)
								`
								).call(this,data)
							}catch(e){
								console.error(e,typeof(data),data)
								this.varDict[this.objectBord.key].code=data
							}
							System.showToast("保存成功")
						}catch{
							System.showToast("保存失败")
						}
						this.objectBord.show=false
					},
					'objectWithoutSave':()=>{
						if(this.objectBord.isEdit){
							if(confirm("是否保存更改过的内容")){
								action.objectWithSave()
							}else{
								this.objectBord.show=false
							}
						}else{
							this.objectBord.show=false
						}
					}
				}
				setTimeout(()=>{
					action[target]()
				},200)
			},
			setPropsType:function(index){
				let key=this.propsBord.index
				this.varDict[key].type=this.propsType[index]
			},
			setInject:function(fromName,itemName){
				let key=this.opeBord.index
				this.varDict[key].name=itemName
				this.varDict[key].from=fromName
			},
			copyRefName:function(name){
				try{
					navigator.clipboard.writeText('this.'+name)
					System.showToast("复制成功",2000)
				}catch{
					System.showToast("写入剪贴板失败",2000)
				}
			},
			//开放数据
			provideItem:function(itemName){
				
				try{
					System.metaData.VARLIST.PROVIDE[this.opeBord.index]={
						name:itemName,
						text:""
					}
					System.showToast("开放成功",2000)
				}catch{
					System.showToast("操作失败",2000)
				}
			},
			watchItem:function(itemName){
				try{
					let newProvideKey=Math.random().toString(36).substr(2)
					System.metaData.VARLIST.WATCH[newProvideKey]={
						name:itemName,
						code:"",
						immediate:true,
						deep:true,
						text:""
					}
					System.showToast("已设置监听",2000)
				}catch{
					System.showToast("操作失败",2000)
				}
			},
			removeItem:function(key){
				let temp=JSON.parse(JSON.stringify(this.varDict[key]))
				if(confirm("确认删除 "+ this.varDict[key].name)){
					try{
						let name=this.varDict[key].name
						delete this.varDict[key]
						delete System.metaData.VARLIST[this.typeText[this.varTypeIndex]][key]
						//需要检测监听与开放中有没有此变量
						let check=this.findFromWatchProvide(name)
						if(check[0])
							delete System.metaData.VARLIST.WATCH[check[0]]
						if(check[1])
							delete System.metaData.VARLIST.PROVIDE[check[1]]
						System.showToast("删除成功,已同步移除监听与开放,请注意检测其他处引用",5000)
					}catch(e){
						//失败恢复
						this.varDict[key]=temp
						System.metaData.VARLIST[this.typeText[this.varTypeIndex]][key]=temp
						System.showToast("删除失败",2000)
					}
					this.nameCheck()
				}
			},
			findFromWatchProvide:function(targetName){
				let returnData=[null,null]
				for(let key in System.metaData.VARLIST.WATCH){
					if(System.metaData.VARLIST.WATCH[key].name==targetName){
						returnData[0]=key
					}
				}
				for(let key in System.metaData.VARLIST.PROVIDE){
					if(System.metaData.VARLIST.PROVIDE[key].name==targetName){
						returnData[1]=key
					}
				}
				return returnData
			},
			addItem:function(){
				let newKey=Math.random().toString(36).substr(2)
				let index=0
				for(let key in this.varDict){
					index++
					if(!this.varDict[key].name){
						System.showToast('第'+index+'个变量未命名,新增失败',2000)
						return
					}
				}
				const newValueList={
					'DATA':{
						name:"",
						value:'',
						text:"",//注释
					},
					'PROPS':{
						name:"",
						type:"String",
						default:"",
						text:""
					},
					'COMPUTED':{
						name:"",
						code:"",
						text:""
					},
					'INJECT':{
						name:"data1",
						from:"",
						text:""
					}
				}
				this.varDict[newKey]=newValueList[this.typeText[this.varTypeIndex]]
				System.metaData.VARLIST[this.typeText[this.varTypeIndex]][newKey]=newValueList[this.typeText[this.varTypeIndex]]
			},
			//检测变量名是否重复
			nameCheck:function(){
				if(this.checkTimeout!=null)
					clearTimeout(this.checkTimeout)
				this.checkTimeout=setTimeout(()=>{
					let existName=[]
					let repeatName=[]
					for(let key in this.varDict){
						if(existName.includes(this.varDict[key].name)){
							if(!repeatName.includes(this.varDict[key].name)){
								repeatName.push(this.varDict[key].name)
							}
						}else{
							existName.push(this.varDict[key].name)
						}
					}
					this.repeatName=repeatName
					this.checkTimeout=null
				},200)
			},
			saveValue:function(key){
				if(this.saveTimeout!=null)
					clearTimeout(this.saveTimeout)
				this.saveTimeout=setTimeout(()=>{
					if(this.mode=='normal'){
						System.metaData.VARLIST[this.typeText[this.varTypeIndex]][key].value=this.varDict[key].value
					}else{
						System.showToast("操作禁止,请从支持库中修改",3000)
					}
				},200)
			},
			saveName:function(key){
				if(this.saveTimeout!=null)
					clearTimeout(this.saveTimeout)
				this.saveTimeout=setTimeout(()=>{
					if(this.mode=='normal'){
						System.metaData.VARLIST[this.typeText[this.varTypeIndex]][key].name=this.varDict[key].name
					}else{
						System.showToast("操作禁止,请从支持库中修改6",3000)
					}
				},200)
			},
			//保存注释
			saveText:function(index){
				if(this.saveTimeout!=null)
					clearTimeout(this.saveTimeout)
				this.saveTimeout=setTimeout(()=>{
					if(this.mode=='normal'){
						System.metaData.VARLIST[this.typeText[this.varTypeIndex]][key].text=this.varDict[key].text
					}else{
						System.showToast("操作禁止,请从支持库中修改",3000)
					}
				},200)
			},
			removeProvide:function(index){
				//取消开放
				let temp=JSON.parse(JSON.stringify(this.varDict[index]))
				if(confirm("确认取消开放"+temp.name)){
					try{
						delete this.varDict[index]
						delete System.metaData.VARLIST.PROVIDE[index]
						System.showToast("关闭成功,请检查是否在他处引入")
					}catch{
						this.varDict[index]=temp
						System.metaData.VARLIST.PROVIDE[index]=temp
						System.showToast("关闭失败")
					}	
				}		
			},
			removeWatch:function(index){
				//取消监听
				let temp=JSON.parse(JSON.stringify(this.varDict[index]))
				if(confirm("确认取消监听"+temp.name)){
					try{
						delete this.varDict[index]
						delete System.metaData.VARLIST.WATCH[index]
						System.showToast("关闭成功")
					}catch{
						this.varDict[index]=temp
						System.metaData.VARLIST.WATCH[index]=temp
						System.showToast("关闭失败")
					}	
				}			
			},
			saveObjectData:function(data,text){
				if(this.mode!='normal'){
					System.showToast("操作禁止,请从支持库中修改7",3000)
					return
				}
				System.metaData.VARLIST[this.typeText[this.varTypeIndex]][this.objectBord.key].value=data
				System.metaData.VARLIST[this.typeText[this.varTypeIndex]][this.objectBord.key].codeText=text
			},
			openObjectBord:function(e,index){
				
				this.objectBord={
					show:true,
					left:e.clientX,
					top:e.clientY,
					key:index,
					code:this.varDict[index].value,
					codeText:this.varDict[index].codeText,
					isEdit:false
				}
				this.$nextTick(() => {
					setTimeout(()=>{
						this.editor=monaco.editor.create(this.$refs['container'],{
							theme:'vs-dark',
							language:"javascript",
							readOnly:this.mode=='normal'?false:true,
						})
						if(this.mode=='normal'){
							this.editor.onDidChangeModelContent((event) => {
								if(this.timeout!=null)
									clearTimeout(this.timeout)
								this.timeout=setTimeout(()=>{
									this.objectBord.isEdit=true
								},1000)
							})
						}
						setTimeout(()=>{
							let text=this.objectBord.codeText || ''
							if(text.startsWith("{")){
								text='new Object(\n\t'+text+')'
							}else if(!this.objectBord.codeText || !this.objectBord.value)
								text='new Object(\n\t{'+text+'\n\t}\n)'
							this.setCode(text)
						},500)
					},600)
				});
			},
			//在provide模式下返回
			returnProvide:function(name){
				this.propsOptions.callBack(name)
				this.quit()
			},
			//退出
			quit:function(){
				this.$emit('quit')
			}
		}
	}
</script>
<style scoped>
	@import url(./css/varProvide.css);
</style>