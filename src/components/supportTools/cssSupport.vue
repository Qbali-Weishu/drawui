<template>
	<div>
		<!--CSS样式表-->
		<teleport to="body">
			<div  @click.stop="closeAll" style="position: absolute;z-index: 999;width: 70vw;;left: 10vw;min-width: 600px;height: 90vh;top: 5vh;background-color: #323232;border-radius: 10px;box-shadow: 0 0 30px rgba(33,33,33,0.5);">
				<!--顶部-->
				<div style="width: 100%;height: 25px;background-color: transparent;display: flex;margin-top: 5px;">
					<div style="width: 35%;height: 25px;display: flex;">
						<!--内容区块-->
						<button @click="callFloatBar(0)" class="cssSheetTopButton" style="background-color: var(--mainColorBlue2);">
						{{nowCssSourceText[nowCssSource]}}
						<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="position: absolute;right: 5px;margin-top: 5px;margin-left: 0px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
						
						</button>
						<!--变量表-->
						<button class="cssSheetTopButton" @click="showCssVar">通用变量</button>
						<!--类别筛选-->
						<button @click="callFloatBar(1)" class="cssSheetTopButton">
							{{nowCssTypeText[nowCssType]}}
							<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="position: absolute;right: 5px;margin-top: 5px;margin-left: 0px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
						</button>
						<!--新建-->
						<button class="cssSheetTopButton" @click="showAddCss=true">
							新建
							<svg t="1661847589632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" style="margin-top: 0px;position: absolute;right: 5px;" width="20" height="20"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#8a8a8a" p-id="2393"></path></svg>
							
						</button>
						<!--展开区块-->
						<!--内容区块-->
						<div class="showTargetList" style="left: 10px;top: 25px;overflow: hidden;" v-if="floatBar==0">
							<div class="editTargetItem" @click="nowCssSource=0;initData()">
								全局
							</div>
							<div class="editTargetItem"  @click="nowCssSource=1;initData()">
								当前组件
							</div>
							<input ref="floatBar0" @blur="blurFloatBar" style="width: 1px;height: 1px;outline: none;border: none;;position: absolute;top: -10px;"/>
						</div>
						<!--类别筛选-->
						<div class="showTargetList" style="left: 18%;top: 25px;overflow: hidden;" v-if="floatBar==1">
							<div class="editTargetItem" @click="nowCssType=0;classify()">
								所有
							</div>
							<div style="border-bottom: 3px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;margin-top: 5px;z-index: 1;"></div>
							<div class="editTargetItem" @click="nowCssType=1;classify()">
								CSS类
							</div>
							<div class="editTargetItem" @click="nowCssType=2;classify()">
								标签
							</div>
							<div class="editTargetItem" @click="nowCssType=3;classify()">
								其他
							</div>
							<input  ref="floatBar1" @blur="blurFloatBar" style="width: 1px;height: 1px;outline: none;border: none;;position: absolute;top: -10px;"/>
						</div>
						
						<!--变量表-->
						<cssVar v-if="showCssVarList" @quit="showCssVarList=false"></cssVar>
					</div>
					
					<!--搜索-->
					<div v-if="!editCss" style="font-weight: normal;font-size: 12px;background-color: var(--mainColorBlue2);border-radius: 10px;color: white;height: 25px;position: absolute;top: 5px;right: 100px;cursor: pointer;">
						<input class="searchInput" list="searchList" placeholder="搜索样式" v-model="searchTarget"/>
						<datalist id="searchList"> 
							<option v-for="(item,index) in classDataList_show" :key="index" :value="item.name"></option>
						</datalist>
					</div>
					<!--退出CSS编辑-->
					<button v-if="editCss" @click.stop="quitCss" style="font-weight: normal;font-size: 12px;background-color: var(--mainColorBlue2);border-radius: 10px;color: white;height: 25px;position: absolute;top: 5px;right: 100px;cursor: pointer;">
						保存并关闭
					</button>
					
					<button @click.stop="settingBar.show=true;closeItem.push(()=>{settingBar.show=false;settingBar.nowEditTarget=null;settingBar.width='80px'})" class="cssSheetTopButton" style="background-color: transparent;position: absolute;right: 50px;top: 8px;width: 30px;">
						<svg t="1663050425168" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4355" width="20" height="20"><path d="M1016.832 606.208q2.048 12.288-1.024 29.696t-10.24 35.328-17.408 32.256-22.528 20.48-21.504 6.144-20.48-4.096q-10.24-3.072-25.6-5.632t-31.232-1.024-31.744 6.656-27.136 17.408q-24.576 25.6-28.672 58.368t9.216 62.464q10.24 20.48-3.072 40.96-6.144 8.192-19.456 16.896t-29.184 15.872-33.28 11.264-30.72 4.096q-9.216 0-17.408-7.168t-11.264-15.36l-1.024 0q-11.264-31.744-38.4-54.784t-62.976-23.04q-34.816 0-62.976 23.04t-39.424 53.76q-5.12 12.288-15.36 17.92t-22.528 5.632q-14.336 0-32.256-5.12t-35.84-12.8-32.256-17.92-21.504-20.48q-5.12-7.168-5.632-16.896t7.68-27.136q11.264-23.552 8.704-53.76t-26.112-55.808q-14.336-15.36-34.816-19.968t-38.912-3.584q-21.504 1.024-44.032 8.192-14.336 4.096-28.672-2.048-11.264-4.096-20.992-18.944t-17.408-32.768-11.776-36.864-2.048-31.232q3.072-22.528 20.48-28.672 30.72-12.288 55.296-40.448t24.576-62.976q0-35.84-24.576-62.464t-55.296-38.912q-9.216-3.072-15.36-14.848t-6.144-24.064q0-13.312 4.096-29.696t10.752-31.744 15.36-28.16 18.944-18.944q8.192-5.12 15.872-4.096t16.896 4.096q30.72 12.288 64 7.68t58.88-29.184q12.288-12.288 17.92-30.208t7.168-35.328 0-31.744-2.56-20.48q-2.048-6.144-3.584-14.336t1.536-14.336q6.144-14.336 22.016-25.088t34.304-17.92 35.84-10.752 27.648-3.584q13.312 0 20.992 8.704t10.752 17.92q11.264 27.648 36.864 48.64t60.416 20.992q35.84 0 63.488-19.968t38.912-50.688q4.096-8.192 12.8-16.896t17.92-8.704q14.336 0 31.232 4.096t33.28 11.264 30.208 18.432 22.016 24.576q5.12 8.192 3.072 17.92t-4.096 13.824q-13.312 29.696-8.192 62.464t29.696 57.344 60.416 27.136 66.56-11.776q8.192-5.12 19.968-4.096t19.968 9.216q15.36 14.336 27.136 43.52t15.872 58.88q2.048 17.408-5.632 27.136t-15.872 12.8q-31.744 11.264-54.272 39.424t-22.528 64q0 34.816 18.944 60.928t49.664 37.376q7.168 4.096 12.288 8.192 11.264 9.216 15.36 23.552zM540.672 698.368q46.08 0 87.04-17.408t71.168-48.128 47.616-71.168 17.408-86.528-17.408-86.528-47.616-70.656-71.168-47.616-87.04-17.408-86.528 17.408-70.656 47.616-47.616 70.656-17.408 86.528 17.408 86.528 47.616 71.168 70.656 48.128 86.528 17.408z" p-id="4356" fill="#e6e6e6"></path></svg>
					</button>
					<!--退出-->
					<button @click.stop="quit" style="background-color: transparent;color: white;height: 25px;position: absolute;top: 5px;right: 8px">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
					</button>
					<div @click.stop="" v-if="settingBar.show" style="padding:0 10px 10px 10px;overflow: hidden;;z-index: 999;;position: absolute;top: 30px;right: 50px;border-radius: 10px;background-color: #212121;transition:.3s cubic-bezier(.48,-0.1,.03,1.35);" 
							:style="{
									height:`${settingBar.nowEditTarget!=null?settingBar.height:(settingBar.options.length*35)+'px'}`,
									width:`${settingBar.width}`}">
						<!--实际操作部分-->
						<cssSetting @click="settingBar.options[0].event" @close="settingBar.options[0].close">
						</cssSetting>
					</div>
				</div>
				<!--内容部分-->
				<div style="height: calc(100% - 50px);margin-top: 10px;background-color: transparent;width: 100%;display: flex;" id="cssListMain" >
					<main style="height: 100%;transition: .2s;overflow: scroll;" :style="{width:`${editCss?'calc(100% - 300px)':'100%'}`}" ref="cssListMain">
						<div class="cssItem" v-for="(item,index) in classDataList_show" :key="index" :data-cssname="item.name">
							<!--类型，名称，操作项-->
							<div class="cssItem_title">
								<!--类型icon-->
								<div class="cssTypeIcon" :style="{backgroundColor:`${['ROOT','BODY'].includes(item.name)?'var(--mainColorGrayBg2)':classColor[item.type]}`}">
									<svg v-if="item.type=='class' && !['ROOT','BODY'].includes(item.name)" t="1662729581227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11007" style="margin-top: 3px;margin-left: 8px;" width="20" height="20"><path d="M256 169.984l0 342.016 105.984-64 107.989333 64 0-342.016-214.016 0zM768 86.016q34.005333 0 59.989333 25.002667t25.984 59.008l0 683.989333q0 34.005333-25.984 59.008t-59.989333 25.002667l-512 0q-34.005333 0-59.989333-25.002667t-25.984-59.008l0-683.989333q0-34.005333 25.984-59.008t59.989333-25.002667l512 0z" p-id="11008" fill="#e6e6e6"></path></svg>
									<svg v-else-if="item.type=='label'  && !['ROOT','BODY'].includes(item.name)" t="1662730305279" class="icon" viewBox="0 0 1927 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13741" style="margin-top: 3px;margin-left: 8px;" width="20" height="20"><path d="M1751.04 102.4q34.816 0 66.048 13.312t54.784 36.352 36.864 54.272 13.312 66.048l0 491.52q0 35.84-13.312 66.56t-36.864 54.272-54.784 36.864-66.048 13.312l-1584.128 0q-35.84 0-66.56-13.312t-54.272-36.864-36.864-54.272-13.312-66.56l0-491.52q0-34.816 13.312-66.048t36.864-54.272 54.272-36.352 66.56-13.312l1584.128 0zM508.928 287.744l-62.464 0 0 194.56-192.512 0 0-194.56-65.536 0 0 453.632 65.536 0 0-188.416 192.512 0 0 188.416 62.464 0 0-453.632zM894.976 289.792l-320.512 0 0 68.608 128 0 0 384 64.512 0 0-384 128 0 0-68.608zM1408 289.792l-101.376 0-117.76 332.8-128-332.8-100.352 0 0 453.632 61.44 0 0-330.752 120.832 330.752 76.8 0 124.928-324.608 0 324.608 63.488 0 0-453.632zM1794.048 676.864l-193.536 0 0-385.024-63.488 0 0 451.584 257.024 0 0-66.56z" p-id="13742" fill="#e6e6e6"></path></svg>
									<svg v-else-if="['ROOT','BODY'].includes(item.name)" t="1663050176244" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3357" style="margin-top: 3px;margin-left: 8px;" width="20" height="20"><path d="M512.1 896.4c-102.6 0-199-39.9-271.5-112.5-72.5-72.5-112.5-169-112.5-271.5 0-102.6 39.9-199 112.5-271.5 72.5-72.5 169-112.5 271.5-112.5 102.6 0 199 39.9 271.5 112.5 72.5 72.5 112.5 169 112.5 271.5 0 102.6-39.9 199-112.5 271.5-72.5 72.5-168.9 112.5-271.5 112.5z" fill="#3e3e3e" p-id="3358"></path><path d="M512.1 192.4c43.3 0 85.2 8.4 124.5 25.1 38.1 16.1 72.3 39.2 101.8 68.6 29.4 29.4 52.5 63.7 68.6 101.8 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.2-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.8s-63.7 52.5-101.8 68.6c-39.4 16.7-81.3 25.1-124.5 25.1-43.3 0-85.2-8.4-124.5-25.1-38.1-16.1-72.3-39.2-101.8-68.6-29.4-29.4-52.5-63.7-68.6-101.8-16.7-39.4-25.1-81.3-25.1-124.5s8.4-85.2 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.8 29.4-29.4 63.7-52.5 101.8-68.6 39.4-16.7 81.3-25.1 124.5-25.1m0-128c-247.4 0-448 200.6-448 448s200.6 448 448 448 448-200.6 448-448c0-247.5-200.6-448-448-448z" fill="#e6e6e6" p-id="3359" data-spm-anchor-id="a313x.7781069.0.i2" class=""></path></svg>
									<svg v-else t="1662730354860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14729" style="margin-top: 3px;margin-left: 8px;" width="20" height="20"><path d="M272.60928 122.88H296.96a170.20928 170.20928 0 0 1 170.27072 170.20928v194.56h-194.56A170.20928 170.20928 0 0 1 102.4 317.44v-24.35072A170.20928 170.20928 0 0 1 272.60928 122.88z m0 413.40928h194.56v194.56A170.20928 170.20928 0 0 1 296.98048 901.12h-24.3712A170.20928 170.20928 0 0 1 102.4 730.91072V706.56a170.20928 170.20928 0 0 1 170.20928-170.27072zM686.08 122.88h24.35072A170.20928 170.20928 0 0 1 880.64 293.08928V317.44a170.20928 170.20928 0 0 1-170.20928 170.27072h-194.56v-194.56A170.20928 170.20928 0 0 1 686.05952 122.88h0.02048z m-170.27072 413.40928h194.56A170.20928 170.20928 0 0 1 880.64 706.56v24.35072A170.20928 170.20928 0 0 1 710.43072 901.12H686.08a170.20928 170.20928 0 0 1-170.27072-170.20928v-194.62144z" p-id="14730" fill="#e6e6e6"></path></svg>
									
									<h4 style="margin: 0;padding: 0;float: right;line-height: 25px;margin-right: 8px;color: var(--mainTextColor1);text-align: center;">
										{{['ROOT','BODY'].includes(item.name)?'通用':classText[item.type]}}
									</h4>
								</div>
								<!--名称-->
								<input v-model="item.name" @input="inputName(index)" class="cssItem_name"/>
								<!--操作项-->
								<div class="cssItem_ope">
									<div class="cssItem_opeButton" buttonName="编辑" @click="callCssEdit(item,index)">
										<svg t="1662780950377" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15709" style="margin-top: 3px;margin-left: 3px;" width="20" height="20"><path d="M541.866667 238.933333l243.2 243.2L413.866667 853.333333H170.666667v-243.2l371.2-371.2z m0 59.733334L213.333333 631.466667V810.666667h179.2l328.533334-328.533334L541.866667 298.666667z m72.533333-128L853.333333 413.866667l-29.866666 29.866666-243.2-243.2 34.133333-29.866666z" fill="#e6e6e6" p-id="15710"></path></svg>
									</div>
									<div class="cssItem_opeButton" buttonName="复制" @click="copyItem(index)">
										<svg t="1662781066799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17683" style="margin-top: 3px;margin-left: 3px" width="20" height="20"><path d="M780.6 127.2H354.4c-63 0-113.8 50.7-113.8 113.8v426.2c0 63 50.7 113.8 113.8 113.8h426.2c63 0 113.8-50.7 113.8-113.8V241c0-63-50.7-113.8-113.8-113.8z m52.4 537c0 29.7-24.3 55.4-55.4 55.4H357.4c-29.7 0-55.4-24.3-55.4-55.4V244c0-29.7 24.3-55.4 55.4-55.4h420.2c29.7 0 55.4 24.3 55.4 55.4v420.2z" p-id="17684" fill="#e6e6e6"></path><path d="M155.6 279.3c-15.2 0-27 11.8-28.6 25.5v473.5c3.6 65.2 57 116.3 123.1 116.3h464.6c15.1 0 27.4-12.3 28.8-27.4 0-16.4-13.7-28.8-28.8-28.8l-463.1 0.1c-37 0-67.2-30.2-67.2-67.2V308.1c0-16.4-13.7-28.8-28.8-28.8z" p-id="17685" fill="#e6e6e6"></path></svg>
									</div>
									<div class="cssItem_opeButton" buttonName="粘贴" @click="patseItem(index)">
										<svg t="1662781170759" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18705" style="margin-top: 3px;margin-left: 3px" width="20" height="20"><path d="M787.712 128A108.288 108.288 0 0 1 896 236.288v393.856a108.288 108.288 0 0 1-108.288 108.330667l-49.28-0.042667v54.869333c0 54.442667-42.325333 98.986667-95.914667 102.485334l-6.741333 0.213333h-360.106667a147.712 147.712 0 0 1-147.456-139.605333L128 748.288v-360.106667c0-54.4 42.368-98.986667 95.914667-102.4l6.784-0.256h54.826666V236.288A108.288 108.288 0 0 1 393.856 128h393.813333zM285.525333 344.576H230.698667c-22.485333 0-40.96 17.066667-43.349334 38.912l-0.256 4.693333v360.106667c0 46.848 36.266667 85.162667 82.261334 88.405333l6.357333 0.213334h360.106667c22.442667 0 40.96-16.981333 43.306666-38.826667l0.256-4.778667v-54.869333H393.856a108.288 108.288 0 0 1-108.330667-108.288V344.576z m502.186667-157.482667H393.813333c-27.178667 0-49.237333 22.016-49.237333 49.194667v393.856c0 27.178667 22.058667 49.237333 49.237333 49.237333h393.813334c27.221333 0 49.237333-22.058667 49.237333-49.237333V236.373333c0-27.221333-22.016-49.237333-49.194667-49.237333z m-295.424 295.381334h196.949333a29.525333 29.525333 0 0 1 4.010667 58.794666l-4.010667 0.256h-196.949333a29.525333 29.525333 0 0 1-3.968-58.794666l3.968-0.256h196.949333z m196.949333-157.568a29.525333 29.525333 0 0 1 0 59.093333h-196.949333a29.525333 29.525333 0 0 1 0-59.093333z" fill="#e6e6e6" p-id="18706"></path></svg>
									</div>
									<div class="cssItem_opeButton" buttonName="清空" @click="clearItem(index)">
										<svg t="1663058565299" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10542" style="margin-top: 3px;margin-left: 3px" width="20" height="20"><path d="M603.392 223.701333a85.333333 85.333333 0 0 0-120.661333 0L431.786667 274.56a42.666667 42.666667 0 0 0 0 60.330667l271.530666 271.530666 81.066667-81.066666a85.333333 85.333333 0 0 0 0-120.661334l-181.034667-180.992z m-120.661333 603.392l160.298666-160.341333L341.333333 365.098667a85.333333 85.333333 0 0 1 0-120.746667l81.066667-81.024a170.666667 170.666667 0 0 1 241.322667 0L844.8 344.362667a170.666667 170.666667 0 0 1 0 241.365333L577.152 853.333333H853.333333a42.666667 42.666667 0 1 1 0 85.333334h-384a42.496 42.496 0 0 1-17.578666-3.797334A170.453333 170.453333 0 0 1 301.653333 887.466667l-181.034666-181.034667a170.666667 170.666667 0 0 1 0-241.365333l100.010666-99.968a42.666667 42.666667 0 1 1 60.330667 60.373333l-99.968 99.968a85.333333 85.333333 0 0 0 0 120.661333l180.992 181.034667a85.333333 85.333333 0 0 0 120.704 0z" p-id="10543" fill="#e6e6e6"></path></svg>
										</div>
									<div v-if="!['ROOT','BODY'].includes(item.name)" class="cssItem_opeButton" buttonName="删除" @click="removeClass(index)">
										<svg t="1662781014501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16674" style="margin-top: 3px;margin-left: 3px" width="20" height="20"><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z" p-id="16675" fill="#e6e6e6"></path></svg>
									</div>
								</div>
							</div>
							<!--代码内容-->
							<div @click="copyCssText" style="font-weight: normal;border: 2px double var(--mainColorGrayBg2);user-select: none;;position: absolute;bottom: -20px;left: 10px;width: 80px;color: white;cursor: pointer;;height: 25px;border-radius: 10px;background-color:#323232;text-align: center;line-height: 25px;">
								复制文本
							</div>
							<div class="cssItem_value">
								<cssViewer :data="item.text"></cssViewer>
							</div>
						</div>
					</main>
					<!--编辑预览-->
					<div style="overflow: hidden;height: 100%;;margin-left: 10px;transition: .2s;background-color: transparent;position: relative;" :style="{width:`${editCss?'280px':'0'}`}">
						<div  style="transform:  translateY(-50%);overflow: scroll;position: absolute;width: 90%;padding: 8px;box-sizing: border-box;margin-left: 5%;height: 600px;top: 50%;;border: 3px dashed white;border-radius: 10px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
							<div style="background-color:transparent;" ref="preview"  :style="{transform:`scale(${scaleView})`,width:`${previewWidth}`,height:`${previewHeight}`}">
							</div>
						</div>
					</div>
				</div>
			</div>
		</teleport>
		
		<!--新增CSS-->
		<teleport to="body" v-if="showAddCss">
			<div style="z-index: 99999;;position: absolute;width: 400px;background-color: #212121;border-radius: 10px;top: calc(50vh - 150px);left: calc(45vw - 200px);transition: .5s;overflow: hidden;" :style="{height:`${addNewCssType==-1?'300px':'130px'}`}">
				<h4 style="width: 100%;height: 25px;line-height: 25px;text-align: center;font-weight: normal;color:var(--mainTextColor1)">新建样式</h4>
				<!--关闭按钮-->
				<div style="position: absolute;right: 8px;top: 10px;width: 20px;height: 20px;cursor: pointer;" @click="showAddCss=false;addNewCssType=-1">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
				</div>
				<!--选择区-->
				<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${addNewCssType==-1?'0px':'-100%'}`}">
					<div class="newCssItem" >
						<div style="width: 40px;height: 65px;">
							<svg t="1662729581227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11007" style="margin-top: 15px;margin-left: 8px;" width="30" height="30"><path d="M256 169.984l0 342.016 105.984-64 107.989333 64 0-342.016-214.016 0zM768 86.016q34.005333 0 59.989333 25.002667t25.984 59.008l0 683.989333q0 34.005333-25.984 59.008t-59.989333 25.002667l-512 0q-34.005333 0-59.989333-25.002667t-25.984-59.008l0-683.989333q0-34.005333 25.984-59.008t59.989333-25.002667l512 0z" p-id="11008" fill="#e6e6e6"></path></svg>
						</div>
						<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="addNewCssType=0">
							<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
								新建CSS样式类
							</h3>
							<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
								创建CSS类
							</h4>
						</div>
						<div class='nextArrow' @click="addNewCssType=-1" :style="{right:`${addNewCssType==0?'-58px':'8px'}`,bottom:`${addNewCssType==0?'68px':'8px'}`,transform:`${addNewCssType==0?'scaleX(-100%)':'scaleX(100%)'}`}">
							<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
						</div>
					</div>
					<div class="newCssItem">
						<div style="width: 40px;height: 65px;">
							<svg t="1662730305279" class="icon" viewBox="0 0 1927 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13741" style="margin-top: 15px;margin-left: 8px;" width="30" height="30"><path d="M1751.04 102.4q34.816 0 66.048 13.312t54.784 36.352 36.864 54.272 13.312 66.048l0 491.52q0 35.84-13.312 66.56t-36.864 54.272-54.784 36.864-66.048 13.312l-1584.128 0q-35.84 0-66.56-13.312t-54.272-36.864-36.864-54.272-13.312-66.56l0-491.52q0-34.816 13.312-66.048t36.864-54.272 54.272-36.352 66.56-13.312l1584.128 0zM508.928 287.744l-62.464 0 0 194.56-192.512 0 0-194.56-65.536 0 0 453.632 65.536 0 0-188.416 192.512 0 0 188.416 62.464 0 0-453.632zM894.976 289.792l-320.512 0 0 68.608 128 0 0 384 64.512 0 0-384 128 0 0-68.608zM1408 289.792l-101.376 0-117.76 332.8-128-332.8-100.352 0 0 453.632 61.44 0 0-330.752 120.832 330.752 76.8 0 124.928-324.608 0 324.608 63.488 0 0-453.632zM1794.048 676.864l-193.536 0 0-385.024-63.488 0 0 451.584 257.024 0 0-66.56z" p-id="13742" fill="#e6e6e6"></path></svg>
						</div>
						<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="addNewCssType=1">
							<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
								新建标签样式
							</h3>
							<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
								为指定标签设定样式
							</h4>
						</div>
						<div class='nextArrow' @click="addNewCssType=-1" :style="{right:`${addNewCssType==1?'-58px':'8px'}`,bottom:`${addNewCssType==1?'150px':'8px'}`,transform:`${addNewCssType==1?'scaleX(-100%)':'scaleX(100%)'}`}">
							<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
						</div>
					</div>
					<div class="newCssItem">
						<div style="width: 40px;height: 65px;">
							<svg t="1662730354860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14729" style="margin-top: 15px;margin-left: 8px;" width="30" height="30"><path d="M272.60928 122.88H296.96a170.20928 170.20928 0 0 1 170.27072 170.20928v194.56h-194.56A170.20928 170.20928 0 0 1 102.4 317.44v-24.35072A170.20928 170.20928 0 0 1 272.60928 122.88z m0 413.40928h194.56v194.56A170.20928 170.20928 0 0 1 296.98048 901.12h-24.3712A170.20928 170.20928 0 0 1 102.4 730.91072V706.56a170.20928 170.20928 0 0 1 170.20928-170.27072zM686.08 122.88h24.35072A170.20928 170.20928 0 0 1 880.64 293.08928V317.44a170.20928 170.20928 0 0 1-170.20928 170.27072h-194.56v-194.56A170.20928 170.20928 0 0 1 686.05952 122.88h0.02048z m-170.27072 413.40928h194.56A170.20928 170.20928 0 0 1 880.64 706.56v24.35072A170.20928 170.20928 0 0 1 710.43072 901.12H686.08a170.20928 170.20928 0 0 1-170.27072-170.20928v-194.62144z" p-id="14730" fill="#e6e6e6"></path></svg>
						</div>
						<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="addNewCssType=2">
							<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
								新建其他样式
							</h3>
							<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
								创建选择器,after,before等
							</h4>
						</div>
						<div class='nextArrow' @click="addNewCssType=-1" :style="{right:`${addNewCssType==2?'-58px':'8px'}`,bottom:`${addNewCssType==2?'232px':'8px'}`,transform:`${addNewCssType==2?'scaleX(-100%)':'scaleX(100%)'}`}">
							<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--输入区-->
				<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${addNewCssType==-1?'100%':'0'}`}">
					<div class="newCssInputArea" v-if="addNewCssType==0">
						<h3 class="newCssInputTitle">
							类名称
						</h3>
						<input v-model="newCssName" class="newCssInputValue"/>
					</div>
					<div class="newCssInputArea" v-if="addNewCssType==1">
						<h3 class="newCssInputTitle" style="letter-spacing: 3px;">
							标  签
						</h3>
						<input v-model="newCssName" class="newCssInputValue"/>
					</div>
					<div  class="newCssInputArea" v-if="addNewCssType==2">
						<h3 class="newCssInputTitle" >
							样式名称
						</h3>
						<input v-model="newCssName" class="newCssInputValue"/>
					</div>
					<button @click="saveNew" style="width: 30%;margin-left: 35%;height: 30px;background-color: var(--mainColorBlue2);color: white;border-radius: 10px;">
						保存
					</button>
				</div>
			</div>
			
		</teleport>
		
	</div>
</template>

<script>
	import cssViewer from "./cssViewer.vue"
	import { structStore } from "../../store/struct.js"
	import cssSetting from "./cssSetting.vue"
	import cssVar from "./cssVar.vue"
	export default{
		name:"cssSupport",
		props:{
			data:{
				type:Object,
				default:{}
			}
		},
		components:{
			cssViewer,
			cssSetting,
			cssVar
		},
		data(){
			return {
				store:null,
				nowCssSource:0,
				nowCssSourceText:["全局",'当前组件'],
				nowCssType:0,
				nowCssTypeText:["所有",'CSS类','标签','其他'],
				floatBar:-1,
				isCallFloatBar:false,
				addNewCssType:-1,
				showAddCss:false,
				editCss:false,
				newCssName:"",
				classColor:{
					"class":'#EB5744',
					'label':'#6D96FF',
					'other':'#81C874'
				},
				classText:{
					"class":'CSS类',
					'label':'标签',
					'other':'其它'
				},
				classDataList_show:[],
				classDataList:[
					/*{
						"name":"class1",
						"type":"class",
						"data":{
							"margin":
								{
								    "marginTop": {
								        "value": 0,
								        "unit": "px",
								        "condition": null
								    },
								    "marginRight": {
								        "value": 0,
								        "unit": "px",
								        "condition": null
								    },
								    "marginBottom": {
								        "value": 0,
								        "unit": "px",
								        "condition": null
								    },
								    "marginLeft": {
								        "value": 150,
								        "unit": "px",
								        "condition": null
								    }
								}
						}
					},*/
					
				],
				nowEditIndex:-1,//当前编辑对象索引
				scaleView:"1",
				previewWidth:"300px",
				previewHeight:"200px",
				settingBar:{
					height:"35px",
					width:"80px",
					nowEditTarget:null,
					show:false,
					options:[
						{
							'name':"变量编辑",
							'target':'var',
							'event':()=>{
								this.settingBar.nowEditTarget='var',
								this.settingBar.height="150px"
								this.settingBar.width="280px"
							},
							'close':()=>{
								this.settingBar.nowEditTarget=null,
								this.settingBar.height='35px'
								this.settingBar.width="80px"
							}
						}
					]
				},
				closeItem:[],
				copyTemp:null,
				searchTarget:"",//搜索内容
				searchTimeout:null,
				showCssVarList:false,
				inputTimeout:null
			}
		},
		watch:{
			searchTarget:{
				handler:function(val){
					if(val.length>0){
						if(this.searchTimeout!=null)
							clearTimeout(this.searchTimeout)
						this.searchTimeout=setTimeout(()=>{
							let top=document.querySelector('#cssListMain [data-cssname="'+val+'"]').offsetTop-50
							this.$refs['cssListMain'].scrollTo({
								top:top,
								behavior:"smooth"
							})
							this.searchTimeout=null
						},200)
					}
				},
				immediate:true,
				deep:true
			}
		},
		mounted(){
			this.store=structStore()
			this.initData()
			//提供给外部使用时，应立即将当前选择的所有节点取消选择
			System.removeSelect()
		},
		methods:{
			closeAll:function(){
				for(let i=0;i<this.closeItem.length;i++){
					this.closeItem[i]()
				}
				this.closeItem=[]
			},
			copyCssText:function(e){
				let text=e.target.nextElementSibling.innerText.replaceAll(":\n",":")
			},
			callFloatBar:function(index){
				//调起悬浮列表
				let temp=this.floatBar
				this.floatBar=index
				if(index==0){
					this.$nextTick(()=>{
						this.$refs['floatBar0'].focus()
						if(temp!=-1)
							this.isCallFloatBar=true
						else
							this.isCallFloatBar=false
					})
				}else if(index==1){
					this.$nextTick(()=>{
						this.$refs['floatBar1'].focus()
						if(temp!=-1)
							this.isCallFloatBar=true
						else
							this.isCallFloatBar=false
					})
				}
			},
			blurFloatBar:function(){
					setTimeout(()=>{
						if(!this.isCallFloatBar){
							this.floatBar=-1
						}
						this.isCallFloatBar=false
					},200)
			},
			resetScale:function(box){
				//设置长宽时需要重新计算比例
				let percent=1
				
					let checkWidth=()=>{
						let widthValue=box.offsetWidth
						//console.log(widthValue)
						if(widthValue*percent>230){
							//当宽大于高时，以宽为缩放比例
							percent*=(230/(widthValue*percent)).toFixed(2)*1
						}
					}
					let checkHeight=()=>{
						let heightValue=box.offsetHeight
						//console.log(heightValue)
						if(heightValue*percent>580){
							//当宽大于高时，以宽为缩放比例
							percent*=(580/(heightValue*percent)).toFixed(2)*1
						}					
						
					}
					
					checkWidth()
					checkHeight()
			
				//设置当前缩放预览比例
				this.previewWidth=box.style.width
				this.previewHeight=box.style.height
				this.scaleView=percent
			},
			processStyle:function(text){
				let css=""
				let transformReg=new RegExp(/translate[XYZ]{0,1}\([^\)]+\){1}/g)//替换translate
				let processData,value=""
				for(let key in text){
					processData=text[key]
					if(Object.prototype.toString.call(processData)=='[object Object]'){
						for(let key1 in processData){
							value=processData[key1]
							if(key1=='transform'){
								value=value.replace(transformReg,"")
							}else if(key1=='transition'){
								
							}
							if(value)
								{
									key1=key1.replace(/([A-Z])/g,function($,$1){
											return "-"+$1.toLowerCase()
										})
									css+=`${key1}:${value};`
								}
								
						}
					}else{
						if(key=='transform'){
							processData=processData.replace(transformReg,"")
						}else if(key=='transition'){
							
						}
						if(processData){
							key=key.replace(/([A-Z])/g,function($,$1){
									return "-"+$1.toLowerCase()
								})
							css+=`${key}:${processData};`
						}
						
					}
				}
				return css
			},
			inputName:function(index){
				if(this.inputTimeout!=null)
					clearTimeout(this.inputTimeout)
				this.inputTimeout=setTimeout(()=>{
					let key=this.classDataList_show[index].key
					let name=this.classDataList_show[index].name
					this.classDataList[index].name=name

					this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key].name=name
					console.log(this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]])
					this.inputTimeout=null
				},200)
			},
			reLoad:function(styleName,styleValue){
				let dom=document.getElementById('cssViewer_virtual')
				this.resetScale(dom)
				//修改完成后请求提取修改完成的数据
				let css=System.requestGetCSS(styleName)
				let index=this.nowEditIndex
				if(!this.classDataList[index].text){
					this.classDataList[index].text={}
					this.classDataList_show[index].text={}
				}
				if(!this.classDataList[index].data){
					this.classDataList[index].data={}
					this.classDataList_show[index].data={}
				}
				this.classDataList[index].text[styleName]=css.text
				this.classDataList[index].data[styleName]=css.data
				this.classDataList_show[index].text[styleName]=css.text
				this.classDataList_show[index].data[styleName]=css.data
				let key=this.classDataList[index].key
				this.$nextTick(()=>{
					if(!this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key]){
						this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key]={
							data:{},
							text:{}
						}
					}else{
						if(!this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key].data){
							this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key]={
								data:{},
								text:{}
							}
						}
					}
					try{
						this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key].data[styleName]=css.data
						this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key].text[styleName]=css.text
					}catch{
						
					}
					//此时一定处于编辑状态，虚拟节点VIRTUALSTYLE数据一定存在，故必须要更新
					if(this.store.VIRTUALSTYLE['cssViewer_virtual']){
						this.store.VIRTUALSTYLE['cssViewer_virtual']['styleName']=css.data
					}else{
						eval(`this.store.VIRTUALSTYLE['cssViewer_virtual']={
							${styleName}:${JSON.stringify(css.data)}
							}`).call(this)
					}
					this.changeFromDocument('update','name','value')
				})
			},
			callCssEdit:function(item,index){
					this.nowEditIndex=index
					this.editCss=!this.editCss
					if(this.editCss){
						this.$nextTick(()=>{
							System.returnForStyle=null
							let dom
							if(item.type=='label'){
								dom=document.createElement(item.name)
							}else{
								dom=document.createElement("div")
							}
							this.$refs['preview'].innerHTML=""
							this.$refs['preview'].appendChild(dom)
							let q='cssViewer_virtual'
							dom.id=q
							//定义返回操作
							System.returnForStyle=this.reLoad
							if(item.data){
								//编辑已有的样式
								if(item.data.height && item.data.width){
									if(item.data.height.children.value>0 && item.data.width.children.value>0 ){
										dom.style.cssText+=this.processStyle(item.text)
										console.log("processText",item.text,this.processStyle(item.text))
										this.resetScale(dom)
										
									}else{
										dom.style.cssText=this.processStyle(item.text)
										if(confirm("检测到预览节点宽高为0，是否设置为默认规格?")){
											dom.style.width="300px"
											dom.style.height="200px"	
										}
										this.resetScale(dom)
									}
								}else{
									dom.style.cssText+=this.processStyle(item.text)
									if(confirm("检测到预览节点宽高为0，是否设置为默认规格?")){
										dom.style.width="300px"
										dom.style.height="200px"
									}
									this.resetScale(dom)	
								}
								if(item.data.background){
									if(!item.data.background.children.backgroundColor && !item.data.background.children.backgroundImage){
										if(confirm("预览节点背景为空，是否填入预览色")){
											dom.style.backgroundColor="var(--mainColorBlue2)"
										}
									}
								}else{
									if(confirm("预览节点背景为空，是否填入预览色")){
										dom.style.backgroundColor="var(--mainColorBlue2)"
									}
								}
							}else{
								dom.style.width="300px"
								dom.style.height="200px"
								dom.style.backgroundColor="var(--mainColorGrayBg2)"
								this.resetScale(dom)
								System.showToast("已自动创建预览节点",2000)
							}
							setTimeout(()=>{
								System.requestProvideEditDom({'cssViewer_virtual':true},null,'cssViewer_virtual',item.data)
							},230)
							
							//System.closeStyleEdit()
						})
					}else{
						System.closeStyleEdit()
					}
					
					
			},
			initData:function(){
				this.$nextTick(()=>{
					if(this.nowCssSource==0){
						this.classDataList=[
							{
								key:"ROOT",
								name:'ROOT',
								type:'other',
								text:this.store.CLASSLIST.APP['ROOT'].text,
								data:this.store.CLASSLIST.APP['ROOT'].data,
							},
							{
								key:"BODY",
								name:'BODY',
								type:'other',
								text:this.store.CLASSLIST.APP['BODY'].text,
								data:this.store.CLASSLIST.APP['BODY'].data,
							}
						]
						
						//全局
						for(let key in this.store.CLASSLIST.APP){
							if(!['ROOT','BODY'].includes(key)){
								console.log(this.store.CLASSLIST.APP[key].name,'name')
								this.classDataList.push({
									key:key,
									name:this.store.CLASSLIST.APP[key].name,
									type:this.store.CLASSLIST.APP[key].type,
									text:this.store.CLASSLIST.APP[key].text,
									data:this.store.CLASSLIST.APP[key].data,
								})
							}
						}
					}else{
						this.classDataList=[]
						for(let key in this.store.CLASSLIST.CURRENT){
							this.classDataList.push({
								key:key,
								name:this.store.CLASSLIST.CURRENT[key].name,
								type:this.store.CLASSLIST.CURRENT[key].type,
								text:this.store.CLASSLIST.CURRENT[key].text,
								data:this.store.CLASSLIST.CURRENT[key].data
							})
						}
					}
					this.classDataList_show=JSON.parse(JSON.stringify(this.classDataList))
					System.showToast("已自动过滤无参数样式",2000)
				})
				
				
			},
			classify:function(){
				
				if(this.nowCssType==0){
					this.classDataList_show=JSON.parse(JSON.stringify(this.classDataList))
				}else{
					this.classDataList_show=[]
					this.$nextTick(()=>{
						for(let i =0;i<this.classDataList.length;i++){
							if(this.classDataList[i].type==['',"class",'label','other'][this.nowCssType]){
								this.classDataList_show.push(this.classDataList[i])
							}
						}
					})
				}
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
			saveNew:function(){
				if(this.newCssName.length>0){
					try{
						let allowed=false
						let realKey=this.newCssName
						let cover=false
						let index=0
						if(!this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][this.newCssName]){
							//此key原先不存在
							
							//判断是否与key不同但name同
							let needJudge=false
							
							for(let key in this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]]){
								if(this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][key].name==this.newCssName){
										needJudge=true
										realKey=key
										index=Object.keys(this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]]).indexOf(key)
										break
								}
								
							}
							if(!needJudge)
								allowed=true
							else{
								if(confirm("样式重名，是否覆盖原有样式?")){
									allowed=true
									cover=true
								}
							}
						}else{		
							//此key原先存在
								//由于只保留一次key值，故可能存在新输入的样式名称与不显示的key名称相同
								if(this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][this.newCssName].name==this.newCssName){
									//即新输入的与原有的key相同，且与key对应输入的实际名称name相同，则覆盖
									if(confirm("样式重名，是否覆盖原有样式?")){
										allowed=true
										cover=true
										index=Object.keys(this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]]).indexOf(this.newCssName)
									}
								}else{
									//与key值相同，但是与实际名称不同
									//则重新生成key值
									realKey=this.newCssName+"__"+this.randomName()
									allowed=true
								}
							
						}
						if(allowed){
							this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][realKey]={
								type:['class','label','other'][this.addNewCssType],
								text:{},
								name:this.newCssName,
							}
							let newData={
								name:this.newCssName,
								type:['class','label','other'][this.addNewCssType],
								text:{},
								data:{}
							}
							if(!cover){
								//不覆盖时才添加
								this.classDataList.push(newData)
								this.classDataList_show.push(newData)
							}else{
								//覆盖时修改
								this.classDataList[index]=newData
								this.classDataList_show[index]=newData
							}
							System.showToast("保存成功",2000)
							this.changeFromDocument('add','name','value')
						}
						this.showAddCss=false
						this.newCssName=""
						this.addNewCssType=-1
						this.initData()
					}catch{}
					
				}else{
					System.showToast("保存失败,请输入名称",2000)
				}
			},
			removeClass:function(index){
				//删除
					
				if(confirm("确认删除"+this.classDataList[index].name)){
					try{
						let name=this.classDataList[index].key
						this.classDataList.splice(index,1)
						this.classDataList_show.splice(index,1)
						
						delete this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][name]
						System.showToast("删除成功")
						this.changeFromDocument('remove','name','value')
					}catch(e){
						console.error(e)
						System.showToast("删除失败")
					}
					
				}
			},
			copyItem:function(index){
				//复制CSS参数
				this.copyTemp={
					text:this.classDataList[index].text,
					data:this.classDataList[index].data
				}
				System.showToast("复制成功")
			},
			patseItem:function(index){
				if(this.copyTemp){
					this.classDataList[index].text=this.copyTemp.text
					this.classDataList[index].data=this.copyTemp.data
					this.classDataList_show[index].text=this.copyTemp.text
					this.classDataList_show[index].data=this.copyTemp.data
					let name=this.classDataList[index].key
					this.$nextTick(()=>{
						this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][name].data=this.classDataList[index].data
						this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][name].text=this.classDataList[index].text
						System.showToast("粘贴成功")
						this.changeFromDocument('add','name','value')
					})
					
				}else{
					System.showToast('剪贴内容为空')
				}
				
			},
			clearItem:function(index){
				//清空
				if(confirm("确认清空"+this.classDataList[index].name)){
					try{
						this.classDataList[index].text={}
						this.classDataList[index].data={}
						this.classDataList_show[index].text={}
						this.classDataList_show[index].data={}
						let name=this.classDataList[index].key
						this.$nextTick(()=>{
							this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][name].data=this.classDataList[index].data
							this.store.CLASSLIST[['APP','CURRENT'][this.nowCssSource]][name].text=this.classDataList[index].text
							System.showToast("清空成功")
							this.changeFromDocument('update','name','value')
						})
					}catch(e){
						console.error(e)
						System.showToast("清空失败")
					}
					
				}
			},
			changeFromDocument:function(type,name,value){
				//从文档中修改样式节点
				if(type=='add'){
					
				}else if(type=='update'){
					
				}else if(type=='delete'){
					
				}
				
			},
			showCssVar:function(){
				console.log("show")
				this.showCssVarList=true
			},
			gotoItem:function(index){
				//位置跳转
				System.showToast(index)
			},
			quitCss:function(){
				//退出css编辑器
				this.editCss=false
				this.$nextTick(()=>{
					setTimeout(()=>{
						System.closeStyleEdit()
						//传递编辑结束信息
					},230)
				})
			},
			quit:function(){
				//退出CSS表
				this.quitCss()
				this.$emit("quit")
			}
		}
	}
</script>

<style scoped>
	.cssItem{
		width: 96%;
		margin-left: 2%;
		height: auto;
		min-height: 100px;
		max-height: 200px;
		position: relative;
		background-color: transparent;
		margin-top: 8px;
		margin-bottom: 25px;
		display: block;
	}
	.cssItem_title{
		max-width: 500px;
		background-color: transparent;
		height: 25px;
		display: flex;
		
	}
	.cssItem_name{
		width: 200px;
		background-color: var(--mainColorGrayBg2);
		outline: none;
		border: none;
		border-radius:0 10px 10px 0;
		line-height: 25px;
		color: var(--mainTextColor1);
		
	}
	.cssItem_ope{
		width: 150px;
		margin-left: 10px;
		height: 25px;
		background-color: transparent;
		display: flex;
		border-radius: 10px;
	}
	.cssItem_opeButton{
		width: 25px;height: 25px;
		transition: .2s;
		background-color: transparent;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
	}
	.cssItem_value{
		width: 100%;
		background-color: var(--mainColorGrayBg2);
		border-radius: 10px;
		min-height: 100px;
		max-height: 160px;
		margin-top: 5px;
		overflow: scroll;
		padding-bottom: 8px;
	}
	.cssItem_opeButton:hover{
		background-color: var(--mainColorGrayBg2);
	}
	.cssItem_opeButton:hover::after{
				content: attr(buttonName);
				position: absolute;
				width: 50px;
				height: 20px;
				line-height: 20px;
				transition: .2s;
				bottom: 2px;
				text-align: center;
				font-weight: normal;
				left:50%;
				transform: translateX(-50%);
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
	.cssTypeIcon{
		width: 80px;
		height: 25px;
		border-radius: 10px 0 0 10px;
		user-select: none;
		color: var(--mainTextColor1);
	}
	.newCssInputArea{
		width: 100%;
		height: 65px;
		display: flex;
	}
	.newCssInputTitle{
	user-select: none;;width: 25%;text-align: center;margin: 0;padding: 0;line-height: 65px;font-weight: normal;color:var(--mainTextColor1)
	}
	.newCssInputValue{
		width: 65%;height: 35px;margin-top: 15px;border-radius: 10px;background-color: #323232;color: var(--mainTextColor1);text-align: center;line-height: 35px;outline: none;border: none;
	}
	.newCssInputValue:focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
	.nextArrow{
		transform: scaleX(100%);
		position: absolute;right: 8px;bottom: 3px;
		transition: .5s;
	}
	.newCssItem{
		height: 65px;
		width: 90%;
		background-color: #323232;
		margin-left: 5%;
		border-radius: 10px;
		margin-top: 16px;
		display: flex;
		cursor: pointer;
		position: relative;
		transition: .5s;
	}
	.newCssItem:hover{
		box-shadow: 0 0 0px 2px var(--mainColorBlue2);
	}
	.arrow_{
		transform: rotate(0deg);
	}
	.newCssItem:hover .arrow_{
		animation: arrow .5s;
	}
	@keyframes arrow {
		0%{
			transform: translate(0);
		}
		50%{
			transform: translateX(50%);
		}100%{
			transform: translateX(0);
		}
	}
	.showTargetList {
			transition: .2s;
			padding-bottom: 8px;
			z-index: 99999;
			position: absolute;top: 10px;left: 20%;width:150px;height: auto;min-height: 70px;background-color: #212121;border-radius: 10px;transition: .2s;max-height: 180px;
		} 
	.editTargetItem{
			padding-left: 8px;
			box-sizing: border-box;
			width: 90%;
			margin-left: 5%;
			margin-top: 8px;
			transition: .2s;
			background-color: transparent;
			cursor: pointer;
			position: relative;
			user-select: none;
			color: var(--mainTextColor1);
			font-weight: normal;
			height: 25px;
			line-height: 25px;
			border-radius: 10px;
			
			z-index: 99;
		}
		.editTargetItem:hover{
			background-color: var(--mainColorBlue2);
		}
	.cssSheetTopButton{
		position: relative;
		width: 23%;margin-left: 2%;background-color: var(--mainDarkBg1);color: white;font-weight: normal;border-radius: 10px;cursor: pointer;
	}
	.searchInput{
		width:150px;
		height: 25px;
		line-height: 25px;
		background-color: var(--mainColorGrayBg2);
		text-align: center;
		color: white;
		transition: .2s;
		border-radius: 10px;
		border: none;
		outline: none;
	}
	.searchInput:focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
</style>