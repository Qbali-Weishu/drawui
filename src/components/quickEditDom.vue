<!--右侧栏快速编辑-->
<template>
    <div id="quickEditOut">
        <!--button id="hideQuick" @click="closeThis" v-if="!groupShow">></button-->
		
			<div id="quickEditMain">
				<!--button v-if="!groupShow" style="float:right;height:25px;padding:0;letter-spacing:3px;color:white;background-color:var(--mainColorBlue);width:72px;margin-top:3px;margin-right:20px;border-radius:10px;font-weight:bold" >结构</button>
				<button v-if="!groupShow" style="float:right;height:25px;padding:0;letter-spacing:3px;color:var(--mainColorBlue);background-color:transparent;width:72px;margin-top:3px;margin-right:5px;border-radius:10px;font-weight:bold" >数据集</button-->
				<!--编辑对象：元素本身/类-->
				<div style="z-index: 9999;;position: relative;height: 25px;width: 100%;background-color: transparent;border-bottom: 1px double var(--mainColorGrayBg2);padding-bottom: 8px;">
					<!--当前编辑-->
					<div v-if="mode=='inset' || mode=='class'" style="display: flex;width: 100%;margin-top: 8px;border-radius: 10px;margin-left:0;height: 25px;line-height: 25px;color: var(--mainTextColor1);text-align: center;font-weight: normal;">	
						<h4 style="width: 40%;margin: 0;padding: 0;font-weight: normal;color: var(--mainTextColor1);line-height: 25px;margin-top: 0px;">当前编辑</h4>
						<div  class="filterTypeButton" @click="callTargetList" style="position: relative;;cursor: pointer;transition: .2s;border-radius: 10px;width: 50%;height: 25px;line-height: 25px;font-weight: normal;color: var(--mainTextColor1);text-align: center;">
							{{nowStyleTarget}}
						</div>
						<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="position: absolute;right: calc(10% + 8px);margin-top: 8px;margin-left: 0px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
					</div>
					<!--选择列表-->
					<div class="showTargetList" v-if="showTargetList">
						<!--元素本身-->
						<div class="editTargetItem" buttonName="当前元素本体" 
							@click="
								editNowDom()">
							元素
						</div>
						<!--分割线-->
						<div style="overflow: hidden;border-bottom: 3px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;margin-top: 5px;z-index: 1;">
							<input style="width: 1px;height: 1px;outline: none;border: none;position: absolute;top: -10px;" ref="blurTargetList" @blur="closeTargetList"/><!---->
						</div>
						<!--类列表-->
						<div style="width: 100%;overflow:scroll; max-height:100px;z-index: 99;">
							<div class="editTargetItem" style="white-space: nowrap;width: 70%;" v-for="(classItem,index) in classList" :key="index"
								@click="editClass(classItem)"
								:style="{zIndex:`${classList.length-index}`}" :buttonName='classItem.name'>	
								<div style="float: left;width: 100%;height: 100%;position: relative;text-overflow: ellipsis;white-space: nowrap;background-color: transparent;">
									{{classItem.name}}
								</div>
								<div @mouseenter.stop="" @mouseover.stop="" @click.stop="removeClass(index)" class="removeEffect" style="position: absolute;right: -30px;top: 0;width: 25px;height: 25px;">
									<svg t="1661864077717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3301" width="20" height="25"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#8a8a8a" p-id="3302"></path></svg>
								</div>
							</div>
							<div style="height: 25px;width: 100%;line-height: 25px;font-weight: normal;color: var(--mainTextColor1);">
								...
							</div>
						</div>
						<!--分割线-->
						<div style="border-bottom: 3px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;margin-top: 5px;z-index: 1;"></div>
						<!--添加按钮-->
						<div class="editTargetItem" @click="requestClassList" buttonName="添加CSS样式类">
							<svg t="1661847589632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" width="25" height="25"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#e6e6e6" p-id="2393"></path></svg>
						</div>
					</div>
				</div>
				<div id="loadList">
					<div style="width:100%;height:auto;margin-top:5px">
						<component is="position" ref="position" style="position:relative"
						:isGroup="isGroup"
						:closeSpread="closeSpread"  
						@addOtherOpen="addOtherOpen"
						@requestVar="requestVar" 
						@getStyleData="mountedStyle" 
						@changeUnit="changeUnit" 
						:dataValue="LoadList['position']" 
						@set="setStyle"
						@reloadData="reloadData" 
						@emitPreFun="emitPreFun" 
						@preProcess="preProcess" ></component>
					</div>
					<!--绝对定位的-->
					<div v-if="['absolute','fixed','sticky'].includes(LoadList.position.children.position)" style="width:100%;height:auto;margin-top:5px">
						<component is="absolute" ref="absolute" style="position:relative"
						 :isGroup="isGroup"
						:left="LoadList.left"
						:top="LoadList.top"
						:right="LoadList.right"
						:bottom="LoadList.bottom"
						:absoluteOrigin="LoadList.absoluteOrigin"
						@requestVar="requestVar" ></component>
					</div>
					<div style="width:100%;height:auto;margin-top:5px" v-for="(item,index) in Object.keys(LoadList)" :key="index">
						<component v-if="item!=='position'" :is="item" :ref="item" style="position:relative" 
						:isGroup="isGroup" 
						:closeSpread="closeSpread"  
						@addOtherOpen="addOtherOpen"
						@requestVar="requestVar" 
						@getStyleData="mountedStyle" 
						@changeUnit="changeUnit" 
						:dataValue="LoadList[item]" 
						@set="setStyle"
						@reloadData="reloadData" 
						@emitPreFun="emitPreFun" 
						@preProcess="preProcess"></component> <!--:style="{zIndex:`${Object.keys(LoadList).length/*-index*/}`}"-->
					</div>
				</div>
				<!--底部操作-->
				<div style="width: 100%;height: 5%;display: flex;margin-top: 8px;border-top: 1px double var(--mainColorGrayBg2)">
					<!--调起CSS编辑器-->
					<div class="bottomItem">
						<svg t="1662693176601" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5553" style="margin-top: -2px;" width="23" height="23"><path d="M541.141333 268.864l61.717334 16.938667-132.394667 482.474666-61.717333-16.938666 132.394666-482.474667zM329.002667 298.666667l44.885333 45.610666-175.36 172.586667 175.04 167.573333-44.266667 46.229334L106.666667 517.504 329.002667 298.666667z m355.882666 0l222.336 218.837333L684.586667 730.666667l-44.266667-46.229334 175.018667-167.573333L640 344.277333 684.885333 298.666667z" p-id="5554" fill="#e6e6e6"></path></svg>
					</div>
					<!--存储为类-->
					<div @click="showSelectTarget=true" class="bottomItem" v-if="mode=='inset' || mode=='class'">
						<svg t="1662693375405" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12546" width="20" height="20"><path d="M865 890.8H199.9V323.4H865v567.4z m-617-48.1h568.9V371.5H248v471.2z" fill="#e6e6e6" p-id="12547"></path><path d="M709.2 371.5H355.6l16.6-185.4h320.1l16.9 185.4z m-301-48.1h248.3l-8.2-89.2H416.2l-8 89.2z" fill="#e6e6e6" p-id="12548"></path><path d="M456.2 746.9h-48.1l-0.3-24V506.4H456l0.2 24zM657 746.9h-48.4V506.4h48.1l0.3 24z" fill="#e6e6e6" p-id="12549"></path></svg>
					</div>
					<!--插入剪贴表-->
					<div  class="bottomItem" v-if="mode=='inset' || mode=='class'">
						<svg t="1662693469468" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16147" width="20" height="20"><path d="M791.272727 139.636364h-139.636363a23.272727 23.272727 0 0 0 0 46.545454h139.636363a48.64 48.64 0 0 1 11.869091 1.629091L550.167273 442.181818a23.272727 23.272727 0 0 0 0 32.814546 23.272727 23.272727 0 0 0 16.290909 6.981818 23.272727 23.272727 0 0 0 16.523636-6.981818L836.189091 220.858182A48.64 48.64 0 0 1 837.818182 232.727273v139.636363a23.272727 23.272727 0 0 0 46.545454 0v-139.636363a93.090909 93.090909 0 0 0-93.090909-93.090909z" p-id="16148" fill="#e6e6e6"></path><path d="M861.090909 512a23.272727 23.272727 0 0 0-23.272727 23.272727v256a46.545455 46.545455 0 0 1-46.545455 46.545455H232.727273a46.545455 46.545455 0 0 1-46.545455-46.545455V232.727273a46.545455 46.545455 0 0 1 46.545455-46.545455h256a23.272727 23.272727 0 0 0 0-46.545454H232.727273a93.090909 93.090909 0 0 0-93.090909 93.090909v558.545454a93.090909 93.090909 0 0 0 93.090909 93.090909h558.545454a93.090909 93.090909 0 0 0 93.090909-93.090909V535.272727a23.272727 23.272727 0 0 0-23.272727-23.272727z" p-id="16149" fill="#e6e6e6"></path></svg>
					</div>
					<!--从剪贴表导入-->
					<div  class="bottomItem" v-if="mode=='inset' || mode=='class'">
						<svg t="1662693562978" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18134" width="20" height="20"><path d="M517.12 460.334545v-116.363636a23.272727 23.272727 0 0 0-46.545455 0v116.363636a93.090909 93.090909 0 0 0 93.09091 93.09091h116.363636a23.272727 23.272727 0 0 0 0-46.545455h-116.363636a39.563636 39.563636 0 0 1-11.869091-1.861818l247.854545-247.854546A23.272727 23.272727 0 0 0 768 224.349091L518.981818 472.203636a39.563636 39.563636 0 0 1-1.861818-11.869091z" p-id="18135" fill="#e6e6e6"></path><path d="M861.090909 395.636364a23.272727 23.272727 0 0 0-23.272727 23.272727v372.363636a46.545455 46.545455 0 0 1-46.545455 46.545455H232.727273a46.545455 46.545455 0 0 1-46.545455-46.545455V232.727273a46.545455 46.545455 0 0 1 46.545455-46.545455h372.363636a23.272727 23.272727 0 0 0 0-46.545454H232.727273a93.090909 93.090909 0 0 0-93.090909 93.090909v558.545454a93.090909 93.090909 0 0 0 93.090909 93.090909h558.545454a93.090909 93.090909 0 0 0 93.090909-93.090909V418.909091a23.272727 23.272727 0 0 0-23.272727-23.272727z" p-id="18136" fill="#e6e6e6"></path></svg>
					</div>
				</div>
			</div>
			<!--button class="quickEditBottom" v-if="!groupShow" style="border-radius:3px">样式编辑器</button>
			<button class="quickEditBottom" v-if="!groupShow" >事件管理</button-->
			<support id="quickGetSupport" style="position:absolute;right:95px;top:17vh;transform:scaleX(1);transform-origin:left" :callName="'quickGetSupport'" :provide="true" :showCancle="showCancle" v-if="showGloablData" @send="bindVar" @removeBind="removeBindVar"></support>
			<teleport to="body" v-if="showSelectTarget">
				<!--选择存储为类/复制的项-->
				<div style="position: absolute;width: 200px;height: 80vh;top: 10vh;right: 270px;border-radius: 10px;z-index: 9999;background-color: #212121;">
					<h3 style="width: 100%;height: 25px;color: white;text-align: center;">选择存储项</h3>
					<button @click="showSelectTarget=false;selectAllStyleItem=false;hasSelectToSave={}" style="background-color: transparent;color: white;height: 25px;position: absolute;top: 8px;right: 8px;">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
						
					</button>
					<div style="height: calc(100% - 80px);width: 100%;overflow: scroll;">
						<div class="saveClassItem" v-for="(item,index) in saveTargetList" :key="index" @click="selectToSave(item)">
							<div style="position: absolute;left: -20px;top: 5px;" v-if="hasSelectToSave[item] || selectAllStyleItem">
								<svg t="1662810519305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20310" style="margin-top: 3px;" width="20" height="20"><path d="M748.864 302.528a49.024 49.024 0 0 1 68.288-1.28 46.656 46.656 0 0 1 5.952 61.44l-4.608 5.44-346.56 353.344a49.024 49.024 0 0 1-64.384 4.608l-5.504-4.864-196.8-203.264a46.72 46.72 0 0 1 1.792-66.88A49.024 49.024 0 0 1 270.08 448l5.312 4.736 162.048 167.232L748.8 302.528z" fill="#3662EC" p-id="20311"></path></svg>
							</div>
							<h3 style="width: 80%;margin-left: 15%;height: 35px;line-height: 35px;text-align:left;color: white;font-weight: normal;">
								{{styleItemText[item]}}
							</h3>
						</div>
					</div>
					<!--操作按钮-->
					<div style="width: 100%;height: 35px;display: flex;margin-top: 5px;">
						<button class="save_opeButton" @click="setSelectAll" :buttonName="selectAllStyleItem?'取消全选':'全选'">
							<svg t="1662811487479" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21025" width="20" height="20"><path d="M268 455a36 36 0 0 1-25.13-10.22l-120-117a36 36 0 1 1 50.26-51.56l92.43 90.12 205-240.68a36 36 0 1 1 54.8 46.68l-230 270a36 36 0 0 1-25.7 12.66H268zM740 456c-94.84 0-172-77.16-172-172s77.16-172 172-172 172 77.16 172 172-77.16 172-172 172z m0-272a100 100 0 1 0 100 100 100.11 100.11 0 0 0-100-100zM740 912c-94.84 0-172-77.16-172-172s77.16-172 172-172 172 77.16 172 172-77.16 172-172 172z m0-272a100 100 0 1 0 100 100 100.11 100.11 0 0 0-100-100zM284 912c-94.84 0-172-77.16-172-172s77.16-172 172-172 172 77.16 172 172-77.16 172-172 172z m0-272a100 100 0 1 0 100 100 100.11 100.11 0 0 0-100-100z" p-id="21026" fill="#e6e6e6"></path></svg>
						</button>
						<div @click="callInputSaveName" style="position: relative;;width: calc(100% - 80px);margin-left: 10px;height: 25px;background-color: var(--mainColorBlue2);text-align: center;font-weight:normal;line-height: 25px;color: white;cursor:pointer;border-radius: 10px;">
							<div style="position: absolute;left: 10px;top: 0px;">
								<svg t="1662810519305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20310" style="margin-top: 3px;" width="20" height="20"><path d="M748.864 302.528a49.024 49.024 0 0 1 68.288-1.28 46.656 46.656 0 0 1 5.952 61.44l-4.608 5.44-346.56 353.344a49.024 49.024 0 0 1-64.384 4.608l-5.504-4.864-196.8-203.264a46.72 46.72 0 0 1 1.792-66.88A49.024 49.024 0 0 1 270.08 448l5.312 4.736 162.048 167.232L748.8 302.528z" fill="white" p-id="20311"></path></svg>
							</div>
							确认
						</div>
					</div>
				</div>
			</teleport>
			<!--新增CSS-->
			<teleport to="body" v-if="showInputSaveName">
				<div style="z-index: 99999;;position: absolute;width: 400px;background-color: #212121;border-radius: 10px;top: calc(50vh - 150px);left: calc(45vw - 200px);transition: .5s;overflow: hidden;" :style="{height:`${newCssSaveType==-1?'300px':addNewCssType==-1?'220px':'150px'}`}">
					<h4 style="width: 100%;height: 25px;line-height: 25px;text-align: center;font-weight: normal;color:var(--mainTextColor1)">存储样式</h4>
					<!--关闭按钮-->
					<div style="position: absolute;right: 8px;top: 10px;width: 20px;height: 20px;cursor: pointer;" @click="showInputSaveName=false;addNewCssType=-1;newCssSaveType=-1">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
					</div>
					<!--选择区-->
					
					<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${newCssSaveType==-1?'0px':addNewCssType==-1?'-100%':'-200%'}`}">
						<div class="newCssItem" >
							<div style="width: 40px;height: 65px;">
								<svg t="1662729581227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11007" style="margin-top: 15px;margin-left: 8px;" width="30" height="30"><path d="M256 169.984l0 342.016 105.984-64 107.989333 64 0-342.016-214.016 0zM768 86.016q34.005333 0 59.989333 25.002667t25.984 59.008l0 683.989333q0 34.005333-25.984 59.008t-59.989333 25.002667l-512 0q-34.005333 0-59.989333-25.002667t-25.984-59.008l0-683.989333q0-34.005333 25.984-59.008t59.989333-25.002667l512 0z" p-id="11008" fill="#e6e6e6"></path></svg>
							</div>
							<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="newCssSaveType=0">
								<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
									新建CSS样式类
								</h3>
								<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
									创建CSS类
								</h4>
							</div>
							<div class='nextArrow' @click="newCssSaveType=-1" :style="{right:`${newCssSaveType==0?'-58px':'8px'}`,bottom:`${newCssSaveType==0?'68px':'8px'}`,transform:`${newCssSaveType==0?'scaleX(-100%)':'scaleX(100%)'}`}">
								<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
							</div>
						</div>
						<div class="newCssItem">
							<div style="width: 40px;height: 65px;">
								<svg t="1662730305279" class="icon" viewBox="0 0 1927 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13741" style="margin-top: 15px;margin-left: 8px;" width="30" height="30"><path d="M1751.04 102.4q34.816 0 66.048 13.312t54.784 36.352 36.864 54.272 13.312 66.048l0 491.52q0 35.84-13.312 66.56t-36.864 54.272-54.784 36.864-66.048 13.312l-1584.128 0q-35.84 0-66.56-13.312t-54.272-36.864-36.864-54.272-13.312-66.56l0-491.52q0-34.816 13.312-66.048t36.864-54.272 54.272-36.352 66.56-13.312l1584.128 0zM508.928 287.744l-62.464 0 0 194.56-192.512 0 0-194.56-65.536 0 0 453.632 65.536 0 0-188.416 192.512 0 0 188.416 62.464 0 0-453.632zM894.976 289.792l-320.512 0 0 68.608 128 0 0 384 64.512 0 0-384 128 0 0-68.608zM1408 289.792l-101.376 0-117.76 332.8-128-332.8-100.352 0 0 453.632 61.44 0 0-330.752 120.832 330.752 76.8 0 124.928-324.608 0 324.608 63.488 0 0-453.632zM1794.048 676.864l-193.536 0 0-385.024-63.488 0 0 451.584 257.024 0 0-66.56z" p-id="13742" fill="#e6e6e6"></path></svg>
							</div>
							<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="newCssSaveType=1">
								<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
									新建标签样式
								</h3>
								<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
									为指定标签设定样式
								</h4>
							</div>
							<div class='nextArrow' @click="newCssSaveType=-1" :style="{right:`${newCssSaveType==1?'-58px':'8px'}`,bottom:`${newCssSaveType==1?'150px':'8px'}`,transform:`${newCssSaveType==1?'scaleX(-100%)':'scaleX(100%)'}`}">
								<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
							</div>
						</div>
						<div class="newCssItem">
							<div style="width: 40px;height: 65px;">
								<svg t="1662730354860" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14729" style="margin-top: 15px;margin-left: 8px;" width="30" height="30"><path d="M272.60928 122.88H296.96a170.20928 170.20928 0 0 1 170.27072 170.20928v194.56h-194.56A170.20928 170.20928 0 0 1 102.4 317.44v-24.35072A170.20928 170.20928 0 0 1 272.60928 122.88z m0 413.40928h194.56v194.56A170.20928 170.20928 0 0 1 296.98048 901.12h-24.3712A170.20928 170.20928 0 0 1 102.4 730.91072V706.56a170.20928 170.20928 0 0 1 170.20928-170.27072zM686.08 122.88h24.35072A170.20928 170.20928 0 0 1 880.64 293.08928V317.44a170.20928 170.20928 0 0 1-170.20928 170.27072h-194.56v-194.56A170.20928 170.20928 0 0 1 686.05952 122.88h0.02048z m-170.27072 413.40928h194.56A170.20928 170.20928 0 0 1 880.64 706.56v24.35072A170.20928 170.20928 0 0 1 710.43072 901.12H686.08a170.20928 170.20928 0 0 1-170.27072-170.20928v-194.62144z" p-id="14730" fill="#e6e6e6"></path></svg>
							</div>
							<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="newCssSaveType=2">
								<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
									新建其他样式
								</h3>
								<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
									创建选择器,after,before等
								</h4>
							</div>
							<div class='nextArrow' @click="newCssSaveType=-1" :style="{right:`${newCssSaveType==2?'-58px':'8px'}`,bottom:`${newCssSaveType==2?'232px':'8px'}`,transform:`${newCssSaveType==2?'scaleX(-100%)':'scaleX(100%)'}`}">
								<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
							</div>
						</div>
					</div>
					
					
					<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${newCssSaveType==-1?'100%':addNewCssType==-1?'0':'-100%'}`}">
						<div class="newCssItem" >
							<div style="width: 40px;height: 65px;">
								<svg t="1662816881312" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21883" style="margin-top: 20px;margin-left: 8px;" width="25" height="25"><path d="M841.142857 1023.926857h-658.285714a182.857143 182.857143 0 0 1-182.857143-182.857143v-658.285714a182.857143 182.857143 0 0 1 182.857143-182.857143h658.285714a182.857143 182.857143 0 0 1 182.857143 182.857143v658.285714a182.857143 182.857143 0 0 1-182.857143 182.857143z m-219.428571-804.571428a36.571429 36.571429 0 0 0-36.571429 36.571428v512a36.571429 36.571429 0 0 0 36.571429 36.571429 36.571429 36.571429 0 0 0 36.571428-36.571429v-512a36.571429 36.571429 0 0 0-36.571428-36.571428z m-292.571429 0a36.571429 36.571429 0 0 0-36.571428 36.571428v512a36.571429 36.571429 0 0 0 36.571428 36.571429 36.571429 36.571429 0 0 0 36.571429-36.571429v-512a36.571429 36.571429 0 0 0-36.571429-36.571428z m438.857143 146.285714a36.571429 36.571429 0 0 0-36.571429 36.571428v219.428572a36.571429 36.571429 0 0 0 36.571429 36.571428 36.571429 36.571429 0 0 0 36.571429-36.571428v-219.428572a36.571429 36.571429 0 0 0-36.571429-36.571428z m-292.571429 0a36.571429 36.571429 0 0 0-36.571428 36.571428v219.428572a36.571429 36.571429 0 0 0 36.571428 36.571428 36.571429 36.571429 0 0 0 36.571429-36.571428v-219.428572a36.571429 36.571429 0 0 0-36.571429-36.571428z" p-id="21884" fill="#e6e6e6"></path></svg>
							</div>
							<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="addNewCssType=0">
								<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
									全局
								</h3>
								<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
									将当前所选样式存储为全局可用
								</h4>
							</div>
							<div class='nextArrow' @click="addNewCssType=-1" :style="{right:`${addNewCssType==0?'-58px':'8px'}`,bottom:`${addNewCssType==0?'68px':'8px'}`,transform:`${addNewCssType==0?'scaleX(-100%)':'scaleX(100%)'}`}">
								<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
							</div>
						</div>
						<div class="newCssItem">
							<div style="width: 40px;height: 65px;">
								<svg t="1662821114396" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1406" style="margin-top: 20px;margin-left: 8px;" width="30" height="30"><path d="M519.364267 925.3376c-5.461333 0-10.922667-2.082133-15.086934-6.2464L111.010133 525.815467a21.316267 21.316267 0 0 1 0-30.173867l109.7216-109.713067c-29.2864-5.4784-55.0144-18.824533-75.554133-39.364266a145.672533 145.672533 0 0 1-42.8544-102.7328c-0.256-39.0656 14.677333-75.648 42.0352-102.997334 27.1872-27.195733 63.470933-42.180267 102.186667-42.180266 39.048533 0 75.7248 15.172267 103.261866 42.717866 20.821333 20.8128 34.176 46.5152 39.6544 75.835734l102.536534-102.545067a21.367467 21.367467 0 0 1 30.173866 0l102.5024 102.519467c5.435733-29.2352 18.705067-54.8352 39.406934-75.537067 27.6224-27.639467 64.443733-42.8544 103.662933-42.8544 38.7072 0 74.9568 14.933333 102.0672 42.052267 56.490667 56.4736 56.2432 148.650667-0.554667 205.474133-20.6592 20.642133-46.498133 34.048-75.886933 39.569067l122.069333 122.052266a21.333333 21.333333 0 0 1 0 30.173867L778.359467 675.191467a21.333333 21.333333 0 0 1-36.2496-17.706667c4.650667-37.461333-4.642133-68.096-27.605334-91.067733a101.546667 101.546667 0 0 0-72.285866-29.943467c-27.306667 0-52.983467 10.632533-72.2944 29.943467a101.521067 101.521067 0 0 0-29.943467 72.277333c0 27.298133 10.632533 52.974933 29.943467 72.2944 22.8608 22.8608 54.024533 32.187733 91.0592 27.613867 9.028267-1.186133 17.800533 3.618133 21.802666 11.8016s2.3552 18.005333-4.087466 24.448l-144.247467 144.238933a21.2736 21.2736 0 0 1-15.086933 6.2464zM156.2624 510.737067l363.101867 363.1104L613.461333 779.7504c-28.373333-5.282133-53.495467-18.363733-73.710933-38.587733a143.9488 143.9488 0 0 1-42.4448-102.459734c0-38.7072 15.0784-75.093333 42.4448-102.4512 27.357867-27.357867 63.752533-42.436267 102.459733-42.436266s75.093333 15.0784 102.459734 42.4448c20.386133 20.394667 33.3824 45.3376 38.613333 73.6768l86.894933-86.903467-141.4656-141.4656a21.3504 21.3504 0 0 1 17.28-36.309333c37.956267 3.899733 69.956267-5.998933 93.090134-29.115734 40.1664-40.174933 40.413867-105.284267 0.554666-145.134933-19.0464-19.054933-44.586667-29.550933-71.893333-29.550933a103.176533 103.176533 0 0 0-73.489067 30.3616c-23.133867 23.125333-32.853333 54.357333-28.885333 92.834133a21.333333 21.333333 0 0 1-36.309333 17.271467L507.076267 159.9232 385.092267 281.915733a21.333333 21.333333 0 0 1-36.309334-17.271466c2.722133-26.461867-0.128-64.093867-29.149866-93.1072a102.673067 102.673067 0 0 0-73.096534-30.225067c-27.3152 0-52.8896 10.538667-72.0128 29.678933-19.2256 19.2256-29.7216 44.987733-29.5424 72.558934a103.296 103.296 0 0 0 30.3616 72.832c22.9888 22.997333 54.664533 32.810667 92.817067 28.868266a21.341867 21.341867 0 0 1 17.271467 36.309334L156.2624 510.737067z" p-id="1407" fill="#e6e6e6"></path></svg>					</div>
							<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="addNewCssType=1">
								<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
									当前组件
								</h3>
								<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
									当前所选样式存储仅可在当前组件内可用
								</h4>
							</div>
							<div class='nextArrow' @click="addNewCssType=-1" :style="{right:`${addNewCssType==1?'-58px':'8px'}`,bottom:`${addNewCssType==1?'150px':'8px'}`,transform:`${addNewCssType==1?'scaleX(-100%)':'scaleX(100%)'}`}">
								<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
							</div>
						</div>
					</div>
					<!--输入区-->
					<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${newCssSaveType==-1?'200%':addNewCssType==-1?'100%':'0'}`}">
						
						<div style="position: relative;height: 25px;width: 100%;">
						</div>
						<input v-model="newClassName" :placeholder="['请输入类名称,以 . 开头','请输入标签名称','请输入其他样式名(选择器..)'][newCssSaveType]" style="width: 80%;margin-left: 10%;margin-top: 8px;background-color: var(--mainColorGrayBg2);outline: none;border:none;border-radius: 10px;border-radius: 10px;line-height: 35px;height: 35px;color: white;text-align: center;"/>
						<button @click="saveToClass" style="margin-top: 8px;width: 30%;margin-left: 35%;height: 25px;background-color: var(--mainColorBlue2);color: white;border-radius: 10px;">保存</button>
					</div>
				</div>
				
			</teleport>
			<!--变量绑定器-->
			<styleVar ref='varBord' v-if="varBord.show" v-bind="varBord.props" @saveBindList="saveBindList" @quit="varBord.show=false"></styleVar>
	</div>
</template>
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
		max-width: 400px;
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
		width: 105px;
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
	
	.save_opeButton{
		position: relative;
		width: 50px;height: 25px;outline: none;border: none;background-color:transparent;transition: .2s;border-radius: 10px;margin-left: 8px;
	}
	.save_opeButton:hover{
		background-color:  var(--mainColorGrayBg2);
	}
	.save_opeButton:hover::after{
			content: attr(buttonName);
			position: absolute;
			width: 60px;
			height: 20px;
			line-height: 20px;
			transition: .2s;
			bottom: 2px;
			text-align: center;
			font-weight: normal;
			left:50%;
			transform: translateX(-50%);
			background-color: #212121;
			color: white;
			animation: showhover .2s;
			border-radius: 10px;
			font-size: 12px;
			animation-fill-mode: forwards;
		}
	.saveClassItem{
		height: 35px;
		cursor: pointer;
		position: relative;
		width: 80%;
		margin-left: 15%;
		background-color:transparent;
		transition: .2s;
		margin-top: 8px;
		border-radius: 10px;
		
	}
	.saveClassItem:hover{
		background-color: var(--mainColorBlue2);
	}
	.showTargetList {
		transition: .2s;
		padding-bottom: 8px;
		position: absolute;top: 10px;left: 20%;width: 80%;height: auto;min-height: 80px;background-color: #323232;border: 1px double #6d6d6d;border-radius: 10px;transition: .2s;max-height: 180px;
	} 
	.editTargetItem{
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
	.editTargetItem:hover::after{
			content: attr(buttonName);
			position: absolute;
			width: 100px;
			height: 20px;
			line-height: 20px;
			transition: .2s;
			bottom: 2px;
			text-align: center;
			font-weight: normal;
			left:50%;
			transform: translateX(-50%);
			background-color:#212121;
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
	.bottomItem{
		margin-top: 8px;width: 25%;height: 20px;transition: .2s;background-color: transparent;cursor: pointer;border-radius: 10px;
	}
	.bottomItem:hover{
		background-color: var(--mainColorBlue2);
	}
#hideQuick{
    height:50px;
    width:20px;
    border-radius: 10px;
    z-index: 3;
    background-color: var(--mainColorBlue);
    color:white;
    font-weight: bold;
    position: absolute;
    left:-25px;
    top:50%;
    transform: translateY(-50%);
}
#quickEditOut{
    float: right;
    /*box-shadow: -2px 2px 15px rgba(0, 0, 0, 0.25);*/
    background-color: rgba(255,255,255,0.7);
    border-radius:0 10px 10px 0;
}
#quickEditMain{
    height: 100%/*calc(90% - 10px)*/;
    width: 100%;
	transition: .2s;

/*background: rgba(255, 255, 255, 0.75);*/
background-color: #212121;
backdrop-filter: blur(30px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 0px 10px 10px 0px;
}
.quickEditBottom{
    height: 5%;
    margin-top: 0px;
    width:100%;
    color: var(--mainColorBlue);
    box-sizing: content-box;
    padding: 0;
    border: none;
    border-top: 3px solid rgba(0, 0, 0, 0.15);
    background: rgba(253, 253, 253, 0.75);
    backdrop-filter: blur(15px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 5px;
    font-weight: bold;
    letter-spacing: 3px;
}
#loadList{
    overflow-x:hidden ;
    max-height: 95%;
    height: 90%;
    margin-top: 0%;
    overflow-y: scroll;
    float: left;
    width:100%;
    background-color: transparent;
	/*禁止文字选中*/
	-webkit-touch-callout: none; /* iOS Safari */
	-webkit-user-select: none; /* Chrome/Safari/Opera */
	-khtml-user-select: none; /* Konqueror */
	-moz-user-select: none; /* Firefox */
	-ms-user-select: none; /* Internet Explorer/Edge */
	user-select: none; /* Non-prefixed version, currently not supported by any browser */
}
	.filterTypeButton:hover{
		background-color: var(--mainColorGrayBg2);
	}
.removeEffect{
		margin-left: 8px;
		cursor: pointer;
		width: calc(20% - 8px);
		height: 30px;
		border-radius: 8px;
		background-color:transparent;
		transition: .2s;
	}
	.removeEffect:hover{
		background-color: var(--mainColorGrayBg2);
	}
</style>
<script>
import style from '../engines/style.js'
import StyleEngine from "../engines/style.js"
import { styleFactory } from "../engines/styleClass.js"
import support from "./support.vue"
import { structStore } from "../store/struct.js";
import stylePropertype from "./styleAttributes/stylePropertype.js"
import * as styleCheck from "../engines/styleCheck.js"
//引入变量绑定器
import styleVar from "./microTools/styleVar.vue"
let path=require("path")
const files = require.context('./styleAttributes', false, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
const name = path.basename(key, '.vue')
modules[name] = files(key).default || files(key)
})
let openList=[]//子组件打开的其他控件，在调用close的时候一起关闭
function closeQuickChild(id){
	openList.forEach(id=>{
		try{
		document.getElementById(id).remove()
		}catch{}
	})
}
function closeQucikEditDom(id){
	closeQuickChild(id)
    let box = document.getElementById(id)
    if(box){
        document.getElementById("quickGetSupport").style.transform="scaleX(0)"
        box.style.transform="scale(0) translateX(200%)"
        box.style.opacity="0"
        box.style.height="73vh"
    }
}
export default{
    name:"quickEditDom",
    props:{
      choseGroup:{
          type:Object,
          default:{}
      }  
    },
	computed:{
		saveTargetList(){
			let temp=Object.keys(this.LoadList)
			temp.push("__code__")
			return temp
		}
	},
    data(){
        return {
			mode:"inset",//inset:内部设置,provide：提供外部
			editTatgetGroup:this.choseGroup,
            showGloablData:true,//标记是否展开变量表
            isGroup:false,//标记是否为组
            closeSpread:false,
            groupShow:false,
			isDom:true,//标记是否为标签修改
            LoadList:JSON.parse(JSON.stringify(stylePropertype)),
            setstyleInter:null,//防抖
            varRequest:null,//请求绑定变量的属性子组件ref名称
            showCancle:false,//是否显示取消绑定按钮
			choseGroupTimeout:null,
			propsData:{},//外部使用时传入数据
			store:null,
			factory:null,
			tempBF:null,
			nowStyleTarget:"元素",//当前编辑对象
			showTargetList:false,
			classList:[],//已有类名称
			hasSelectToSave:{},//已选中的存储项
			styleItemText:{
				'width':"宽度",
				"height":"高度",
				"aspectRatio":"比例锁定",
				"float":"浮动",
				"opacity":"透明度",
				'display':"显示方式",
				"margin":"外边距",
				"padding":"内边距",
				"float":"浮动",
				"left":"X位置",	
				"top":"Y位置",
				"font":"字体",
				"borderRadius":"圆角",
				"border":"描边",
				"background":"背景",
				"effect":"特效",
				"mixBlendMode":"背景混合",
				"position":"定位方式",
				"transition":"动画过度",
				"perspective":"透视",
				"transform":"变换",
				"__code__":"自定义代码"
			},
			selectAllStyleItem:false,//标记是否全选
			showSelectTarget:false,//控制选择列表
			showInputSaveName:false,
			newClassName:"",
			addNewCssType:-1,
			newCssSaveType:-1,
			cacheForStyleText:{},//各个样式内容文本存储，用于直接暂存生成类的css文本
			cacheForStyleData:{},//各个样式内容数据存储，用于生成类时复制
			preProcessFun:[],//各个组件提交的预处理函数，用于在每次加载数据时提前获取当前编辑对象的文本生成数据
			editTargetClassKey:"",
			classArea:"APP",
			editDomList:{},
			tempEditDomList:{},//临时存储
			firstSet:false,//用于标记节点数据修改之后有没有首次被主动修改数据
			loadTimeout:null,
			//变量绑定板
			varBord:{
				props:{
					top:0,
					right:0,
					_bindList:[],
					_defaultIndex:-1
				},
				bindTarget:"",
				show:false
			},
			//
			reloadTimeout:null
        }
    },
    close:closeQucikEditDom,
    components:{
        support,
		styleVar,
        ...modules
    },
    watch:{
        choseGroup:{
            handler:function(a){
				if(this.reloadTimeout!==null)
					clearTimeout(this.reloadTimeout)
				this.reloadTimeout=setTimeout(()=>{
					this.editTatgetGroup=a
					this.editDomList=JSON.parse(JSON.stringify(a))
					
					this.mode='inset'
					this.nowStyleTarget='元素'
					this.clear(()=>{
						this.$nextTick(()=>{
							let groupLength=Object.keys(this.choseGroup).length
							if(groupLength>1){
								this.changeToGroupOrMain()
								this.isGroup=true
								this.loadData()
							}
							else if(groupLength==0){
								 this.isGroup=false
								 this.groupShow=false
							}else{
								this.loadData()
								this.isGroup=false
								this.groupShow=false
							}
							this.processCssText()
							this.initClass()
							this.firstSet=true
						})
					})
				},100)
            },
            immediate:true,
            deep:true
        }
    },
	beforeMount:function(){
		//全局样式属性列表
		System.stylePropertype=stylePropertype
		//提供给外部组件进行修改时设置指向节点
		System.styleVirtualDom=""
	},
    mounted:function(){
		//备份数据
		this.tempBF=JSON.parse(JSON.stringify(this.LoadList))
		if(this.store==null){
			if(this.isDom){
				this.store=structStore()
			}
		}
		if(this.factory==null){
			this.factory=styleFactory
		}
        //closeQucikEditDom("quickEditDom")
		closeQuickChild("quickEditDom")
		
		window.styleEditUnitChange=this.changeUnit
		window.styleEditCheckSame=this.checkSame
		window.getFirstDomID=this.getFirstDomID//获取第一个元素的ID
		//请求向外编辑器修改对象
		System.requestProvideEditDom=(targetList,targetDom,virtualId="newVirtual",styleValue={})=>{

			this.clear()
			this.$nextTick(()=>{
				System.styleVirtualDom=virtualId
				this.mode="provide"
				structStore().VIRTUALSTYLE[virtualId]=styleValue
				let virtual=document.createElement("div")
				virtual.innerHTML=targetDom
				targetDom=virtual.childNodes[0]
				let out=document.getElementById("quickEditDom")
				out.style.paddingRight='45px'
				out.style.height="108%"
				out.style.top="-50px"
				let box=document.getElementById("quickEditMain")
				box.style.boxShadow="0 0 0px 2px #323232"
				box.style.borderRadius="10px"
				box.style.zIndex="999"
				box.style.height="110%"
				this.editDomList=targetList
				//this.editTatgetGroup=data
				this.loadData("get",targetDom)
			})
			
		}
		
		
		//注册外部关闭此编辑器
		System.closeStyleEdit=()=>{
			this.mode='inset'
			let out=document.getElementById("quickEditDom")
			out.style.paddingRight='0px'
			out.style.height="100%"
			out.style.top="0px"
			let box=document.getElementById("quickEditMain")
			box.style.transform=""
			box.style.height="100%"
			box.style.boxShadow="none"
			box.style.borderRadius="10px"
			box.style.zIndex="999"
			this.clear()
			this.editTatgetGroup={}
			this.editDomList={}
			//this.editTatgetGroup=JSON.parse(JSON.stringify(this.LoadList))
		}
		
		
		//系统API：获取指定ID的组件style数据
		System.requestCssStyle=(domId)=>{
			let nodeID=domId.replace("_accepter","")
			if(document.getElementById(domId))
				nodeID=document.getElementById(domId).dataset.node=='1'?'$NODE:'+domId:domId
			if(this.mode=='inset'){
				return System.metaData.STYLESTRUCT[nodeID].style
			}else if(this.mode=='provide'){
				return structStore().VIRTUALSTYLE[nodeID]
			}else if(this.mode=='class'){
				return System.metaData.CLASSLIST[this.classArea][this.editTargetClassKey].data
			}
			
		}
		
		//写入数据
		System.writeStyle=(dom,styleName,value,reload=false)=>{
			let nodeID=dom.replace("_accepter","")
			if(document.getElementById(dom))
				nodeID=document.getElementById(dom).dataset.node=='1'?'$NODE:'+dom:dom
			if(this.mode=='inset')
				System.metaData.STYLESTRUCT[nodeID].style[styleName]=value
			else if(this.mode=='provide')
				structStore().VIRTUALSTYLE[nodeID][styleName]=value	
			else if(this.mode=='class'){
				let css=System.requestGetCSS(styleName)
				structStore().CLASSLIST[this.classArea][this.editTargetClassKey].text[styleName]=css.text
				structStore().CLASSLIST[this.classArea][this.editTargetClassKey].data[styleName]=css.data
			}
		}
		
		System.getStyle=(value,name,option)=>{
			return this.cacheForStyleText//this.factory[name](value,'',false,option)
		}
		System.styleFactory=styleFactory
		System.getDomList=()=>{
			if(this.mode=='class'){
				return ['class_virtualDom']
			}
			let temp=[]
			for(let key in this.editDomList){
				if(this.editDomList[key]) temp.push(key)
			}
			return temp//this.editTatgetGroup
		}
		
		System.getUnit=(data)=>{
			return StyleEngine.getUnit(data)
		}
		
		//注册样式内容暂存事件
		System.setStyleCache=(styleName,value,text)=>{
			this.cacheForStyleData[styleName]=value
			this.cacheForStyleText[styleName]=text
		}
		
		//注册CSS文本提取事件
		System.requestGetCSS=(styleName)=>{
			return {
				text:this.cacheForStyleText[styleName],
				data:this.cacheForStyleData[styleName]
			}
		}
		
		System.reloadData=(target,data,id=null)=>{
			let nodeId
			if(id)
				nodeId=id.replace("_accepter","")
			if(document.getElementById(id)){
				nodeId=document.getElementById(id).dataset.node=='1'?'$NODE:'+id:id
			}
			if(!this.isGroup){
				try{
					if(id===null)
						this.LoadList[target]=data
					else{
						this.LoadList[target]=System.metaData.STYLESTRUCT[nodeId].style[target]
					}
				}catch(e){
					console.log("err",e)
					System.showToast("数据写入失败")
					return false
				}
			}
			return true
		}
		//动画模式下暂存style数据，结束动画编辑后恢复
		System.tempStyleData={}
		System.setTempStyleData=(nodeId)=>{
			nodeId=nodeId.replace("_accepter","")
			if(!nodeId.startsWith('$NODE:')){
				if(document.querySelector('#'+nodeId).dataset.node=='1')
					nodeId='$NODE:'+nodeId
			}
			console.log("nodeId",nodeId)
			/*if(document.querySelector('#'+nodeId).dataset.node=='1')
				nodeId='$NODE:'+node*/
			System.tempStyleData[nodeId]=JSON.parse(JSON.stringify(System.metaData.STYLESTRUCT[nodeId].style))
			//直接存储style样式
			System.tempStyleSheet={}
			let nextNode=document.querySelector('#'+nodeId).nextElementSibling
			System.tempStyleSheet[nodeId]={
				this:document.querySelector('#'+nodeId+"_style").innerHTML,
				next:nextNode?nextNode.innerHTML:null, 
				nextNodeId:nextNode?nextNode.id:null,
			}
			
		}
		System.recoverTempStyleData=(nodeId)=>{
			let nodeID=nodeId.replace("_accepter","")
			if(document.getElementById(nodeId))
				nodeID=document.getElementById(nodeId).dataset.node=='1'?'$NODE:'+nodeId:nodeId
			System.metaData.STYLESTRUCT[nodeID].style
			=JSON.parse(JSON.stringify(System.tempStyleData[nodeID]))
			this.loadData()
			
		}
		
		//
		const marginData={
			value:"",
			unit:"",
			condition:{
				bindList:null,
				default:""
			},
		}
		const absoluteData={
			value:"",
			children:{
				value:"",
				unit:""
			},
			group:false,
			condition:{
				bindList:null,
				default:""
			}
		}
		
		//重置绝对定位的数据
		System.resetAbsolutePosition=(id,direct,value,side,opSide)=>{
			id=id.replace("_accepter","")
			let nodeID=id.replace("_accepter","")
			if(document.getElementById(id))
				nodeID=document.getElementById(id).dataset.node=='1'?'$NODE:'+id:id
			if(System.metaData.STYLESTRUCT[nodeID].style['margin']){
				System.metaData.STYLESTRUCT[nodeID].style['margin'].children['marginLeft']=marginData
				System.metaData.STYLESTRUCT[nodeID].style['margin'].children['marginTop']=marginData
				System.metaData.STYLESTRUCT[nodeID].style['margin'].children['marginRight']=marginData
				System.metaData.STYLESTRUCT[nodeID].style['margin'].children['marginBottom']=marginData
				System.requestProcessStyle('margin',id,System.metaData.STYLESTRUCT[nodeID].style['margin'])
			}
			if(this.reloadTimeout!=null) clearTimeout(this.reloadTimeout)
			this.reloadTimeout=setTimeout(()=>{
				System.reloadData('margin',marginData)
				this.reloadTimeout=null
			},200)
			System.metaData.STYLESTRUCT[nodeID].style[opSide]=absoluteData
			//移除相反
			System.writeToClass(id,opSide,'')
			System.metaData.STYLESTRUCT[nodeID].style[side]=JSON.parse(JSON.stringify(absoluteData)) 
			System.metaData.STYLESTRUCT[nodeID].style[side].children.value=value.toFixed(0)
			System.metaData.STYLESTRUCT[nodeID].style[side].children.unit='px'
			try{
				System.metaData.STYLESTRUCT[nodeID].style.absoluteOrigin[direct]=side
			}catch{
				System.metaData.STYLESTRUCT[nodeID].style.absoluteOrigin={
					x:direct=='x'?side:'left',
					y:direct=='y'?side:"top"
				}
			}
			if(!this.isGroup){
				System.reloadData(side,System.metaData.STYLESTRUCT[nodeID].style[side])
			}
		}
    },
    methods:{
		checkSame:function(styleName){//供各属性组件检查被选中组的css属性是否相同
			let value=null
			for(let key in this.editDomList){//this.editTatgetGroup
				try{
					let cssValue=document.getElementById(key).style[styleName]
					if(value==null){
						value=cssValue
					}else if(cssValue!=value){
						return false
					}
				}catch{}
				
			}
			return true
		},
        clear:function(callBack=null){
            //console.log("清除")
			this.cacheForStyleText={}
			this.cacheForStyleData={}
			this.LoadList=JSON.parse(JSON.stringify(stylePropertype))
				
			if(callBack) callBack()
            
        },
		loadData:function(type="get",targetDom=null){
			if(this.loadTimeout!=null) clearTimeout(this.loadTimeout)
			this.clear()
			let preData=JSON.parse(JSON.stringify(this.LoadList))
			let styleData={}
			//标记是否是第一轮，若是则此时不需要进行相同参数的检测
			let isFirstLoop=true,check
			const loadAction=(domId)=>{
				//获取对应style数据
				styleData=System.requestCssStyle(domId)
				for(let styleName in preData){
					//若当前遍历到的样式在需要加载的目标节点的样式数据中存在
					//第一轮循环,不需要检测
					if(isFirstLoop && styleData[styleName]){
						preData[styleName]=styleData[styleName]
					} 
					else{
						//检测数据相同
						check=System.checkStyleSame(preData[styleName],styleData[styleName])
						if(check===true){
							preData[styleName]=styleData[styleName]
						}else if(check===false){
							preData[styleName]=JSON.parse(JSON.stringify(stylePropertype[styleName]))
						}
					}
				}
				//此时已经处理过一个节点，即已经执行完第一轮
				isFirstLoop=false
			}
			this.loadTimeout=setTimeout(()=>{
			this.$nextTick(()=>{
				
					if(this.mode!='class'){
						let i=0
						for(let key in this.editDomList){
							if(this.editDomList[key]){
								i++
							}
						}
						if(i>0){
							//有被选中要修改的节点
							Object.keys(this.editDomList).forEach(domId => {//对所有元素循环
								loadAction(domId)
							})
							this.LoadList=preData
							this.$nextTick(()=>{
								this.processCssText()
							})
						}
						else{
							//没有目标节点
							this.clear()
						}
							
					}else{
						//加载类样式
						loadAction(null)
						this.tempEditDomList=JSON.parse(JSON.stringify(this.editDomList))
						this.LoadList=preData
						this.$nextTick(()=>{
							this.processCssText()
						})
					}
					clearTimeout(this.loadTimeout)
					preData=null
				
				
			})
			},100)
		},
        reloadData:function(callBack,...data){//子元素修改值时申请修改当前LoadList中的值
            callBack.call(this,...data)
        },
        /*closeThis:function(e){
            closeQucikEditDom("quickEditDom")
        },*/
        loadStyleComponent:function(componnetsList){//加载当前元素需要的属性
            this.loadList=componnetsList
        },
        mountedStyle:function(styleName,callback){//回传stylename对应的属性值与dom选中列表choseGroup
            let changeTargets=Object.keys()
            callback("tests")
        },
        changeToGroupOrMain:function(isMain=false){//为组或为主屏编辑时 isMain表示是否为主屏
            this.groupShow=true
            this.LoadList=
            {
				"float":{value:""},
				"opacity":{
								   value:""
				},
				"display":{value:""},
                "margin":{value:"",children:{
                    "marginRight":{value:""},
                    "marginBottom":{value:""},
                    "marginTop":{value:""},
                    "marginLeft":{value:""},
                }},
                "padding":{value:"",children:{
                    "paddingRight":{value:""},
                    "paddingTop":{value:""},
                    "paddingBottom":{value:""},
                    "paddingRight":{value:""},
                }},
                "top":{value:""},
                "left":{value:""},
                
                
                "font":{value:"",children:{
                	"fontStyle":{value:""},
                	"fontVariant":{value:""},
                	"fontWeight":{value:""},
                	"fontSize":{value:""},
                	"lineHeight":{value:""},
                	"fontFamily":{value:""},
                	"textDecoration":{value:""},
                	"textAlign":{value:""},
                	"letterSpacing":{value:""},
                	"color":{value:""},
                	"textShadow":{value:""}
                }},
                "borderRadius":{value:""
                ,children:{
                    "borderTopLeftRadius":{value:""},
                    "borderTopRightRadius":{value:""},
                    "borderBottomLeftRadius":{value:""},
                    "borderBottomRightRadius":{value:""},
                }},
                "border":{value:"",
				group:true,
                    children:{
                   "borderTop":{value:""},
                   "borderRight":{value:""},
                   "borderBottom":{value:""},
                   "borderLeft":{value:""},
                }
                },
                "background":{
                    value:"",
                children:{
                    "backgroundColor":{value:""},
                    "backgroundPosition":{value:""},
                    "backgroundSize":{value:""},
                    "backgroundRepeat":{value:""},
                    "backgroundOrigin":{value:""},
                    "backgroundClip":{value:""},
                    "backgroundAttachment":{value:""},
                    "backgroundImage":{value:""},
					"backgroundBlendMode":{value:""}}},
                "effect":{
                    value:"",
                	children:{
                    "boxShadow":{value:""},
                    "filter":{value:""},
                    "backdropFilter":{value:""}},
                
                },
				"mixBlendMode":{
					value:""
				},
				"position":{
					value:""
				},
				"transition":{
					value:[]
				},
				"perspective":{
								   value:"",
								   children:{
								      "perspective":{value:""},
								      "perspectiveOriginX":{value:""},
									  "perspectiveOriginY":{value:""},},
				},
				'transform':{
								   value:"",
								   children:{
								      "transform":{value:""},},
				}
            } 
        },
        setStyle:function(stylename,stylevalue,judgeConditon=function(dom,stylevalue=''){return true},setStyleType=true,keepSpread=null,keepSpreadHeight=""){//修改由各子组件传回的样式
			if(this.mode=='inset'){
				if(this.setStyleTimeout!=null){//防抖
				    clearTimeout(this.setStyleTimeout)
				}
				let check=()=>{
					if(this.LoadList[stylename]!=undefined) return stylename
					else{
						for(let key in this.LoadList){
							if(this.LoadList[key].children!=undefined){
								if(stylename in this.LoadList[key].children){
									return key
								}
							}
						}
					}
					return false
				}
				Object.keys(this.editDomList).forEach(dom => {
					///this.editTatgetGroup
					try{
						stylename=check()
						if(judgeConditon.call(this,dom,stylevalue)){
							if(setStyleType==true){
								//预处理css文本this.cacheForStyleText[stylename]= 
								this.factory[stylename](stylevalue,dom)
							}
							else{
								if(StyleEngine.checkSame(dom,stylename,stylevalue)){
									//this.cacheForStyleText[stylename]=
									this.factory[stylename](stylevalue,dom)
								}
							}
						}//设置此样式的条件，如float在元素设置为position absolute,fixed时就不需要重置
					}catch(e){
						console.log(e)
					}
				})
				this.setStyleTimeout=setTimeout(()=>{
					/*if(!this.firstSet)
						System.drawSelectBound()*/
					this.firstSet=false
				},200)
				//StyleEngine.move(this.editDomList,0,0)//this.editTatgetGroup 调用一次move操作以重新定位元素，防止出现元素修改margin等值后无变化现象
			}else if(this.mode=='provide'){
				//执行请求样式编辑的组件中调用时定义的返回操作
				//先设置
				try{
					//this.cacheForStyleText[stylename]=
					this.factory[stylename](stylevalue,System.styleVirtualDom)
				}catch{}
				//再调回
				try{
					System.returnForStyle(stylename,stylevalue)
				}catch(e){
					console.error(e)
				}
			}else if(this.mode=='class'){
				try{
					this.factory[stylename](stylevalue,null)
				}catch{}
			}

        },
        changeUnit:function(callback,...data){//改变单位,具体执行代码再各子组件中单独定义并call为当前对象this
            callback.call(this,...data)
        },
        closeAllEverySpread:function(){//收起所有展开项
            this.closeSpread=true
        },
        requestVar:function(e,target,preBindData){
			try{
				this.varBord.bindTarget=target
				this.varBord.props={
					top:e.clientY,
					right:screen.width-e.clientX,
					_bindList:JSON.parse(JSON.stringify(preBindData.bindList)),
					_defaultIndex:preBindData.default
				}
				//若原先就是打开的状态，则表明可能出现了直接访问另一个变量绑定表,此时需要先保存原先打开的
				if(this.varBord.show){
					//保存但不退出
					this.$refs['varBord'].checkValue(false)
				}else{
					this.varBord.show=true
				}
			}catch{}
			
        },
		//接收变量绑定数据
		saveStyleBindToMeta:function(bindData,target){
			System.setStyleBindList(bindData,this.varBord.bindTarget)
		},
		saveBindList:function(bindData){
			console.log(this.varBord.bindTarget,bindData)
			new Function(`
				try{
					console.log('ok')
					this.LoadList.${this.varBord.bindTarget}.condition=${JSON.stringify(bindData)}
					//调用系统事件，存储变量列表
					this.saveStyleBindToMeta(${JSON.stringify(bindData)},'${this.varBord.bindTarget}')
				}catch(e){
					console.error(e)
				}
				`).call(this)	
		},
        bindVar:function(varName,varValue){//方法调用顺序为support.vue请求传入变量名称后再通过refs调用请求绑定的子组件的bindVar方法
            //console.log("bind",varValue)
            if(this.varRequest.attribute.startsWith("$"))
                this.varRequest.attribute=this.varRequest.attribute.replace("$","")
            this.$refs[`${this.varRequest.component}`][0].bindVar(this.varRequest.attribute,varName,varValue)
            document.getElementById("quickGetSupport").style.transform="scaleX(0)"
        },
        removeBindVar:function(){//请求取消绑定的样式组件无法自动修改，通过support取消后返回设定
            this.$refs[`${this.varRequest.component}`][0].removeBind(this.varRequest.attribute)
            document.getElementById("quickGetSupport").style.transform="scaleX(0)"
        },
		addOtherOpen:function(id){//子组件提供其他的组件id，如display选择列表
			openList.push(id)
		},
		getFirstDomID:function(){
			let domId=Object.keys(this.editDomList)[0]//this.editTatgetGroup
			return domId
		},
		callTargetList:function(){
			//唤起编辑对象列表
			this.showTargetList=true
			this.$nextTick(()=>{
				this.$refs['blurTargetList'].focus()
			})
		},
		closeTargetList:function(){
			setTimeout(()=>{
				this.showTargetList=false
			},200)
		},
		//选择保存项
		selectToSave:function(item){
			if(!this.showInputSaveName){
				if(this.hasSelectToSave[item]!==true && !this.selectAllStyleItem){
					this.hasSelectToSave[item]=true
				}else{
					this.hasSelectToSave[item]=false
					if(this.selectAllStyleItem){
						let key=Object.keys(this.LoadList)
						key.push("__code__")
						key.forEach(i => {
							if(i!=item){
								this.hasSelectToSave[i]=true
							}
						})
						this.selectAllStyleItem=false
					}
				}
			}
		},
		//保存为类
		callInputSaveName:function(){
			this.showSelectTarget=false
			if(this.selectAllStyleItem){
				this.showInputSaveName=true
				return
			}
			for(let key in this.hasSelectToSave){
				if(this.hasSelectToSave[key]===true){
					this.showInputSaveName=true
					return
				}
			}
			System.showToast("未选择保存项",2000)
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
		saveToClass:function(){
			
			let newClassText={}
			let newClass={}
			console.log("cache",this.cacheForStyleText)
			if(this.selectAllStyleItem){
				for(let key in this.LoadList){
					newClassText[key]=this.cacheForStyleText[key]
					newClass[key]=this.cacheForStyleData[key]
				}
			}else{
				for(let key in this.hasSelectToSave){
					if(this.hasSelectToSave[key] || this.selectAllStyleItem){
						newClassText[key]=this.cacheForStyleText[key]
						newClass[key]=this.cacheForStyleData[key]
					}
				}
			}
			
			
			if(this.newClassName.length==0){
				System.showToast("请输入名称",2000)
			}else{
				if(['ROOT','BODY'].includes(this.newClassName)){
					System.showToast("名称禁止，请重新输入",2000)
				}else{
					
					let allowed=false
					let realKey=this.newClassName
					let cover=false
					let index=0
					let tempStore=structStore()
					if(!tempStore.CLASSLIST[['APP','CURRENT'][this.addNewCssType]][this.newClassName]){
						//此key原先不存在
						
						//判断是否与key不同但name同
						let needJudge=false
						
						for(let key in tempStore.CLASSLIST[['APP','CURRENT'][this.addNewCssType]]){
							if(tempStore.CLASSLIST[['APP','CURRENT'][this.addNewCssType]][key].name==this.newClassName){
									needJudge=true
									realKey=key
									index=Object.keys(tempStore.CLASSLIST[['APP','CURRENT'][this.addNewCssType]]).indexOf(key)
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
							if(System.metaData.CLASSLIST[['APP','CURRENT'][this.addNewCssType]][this.newClassName].name==this.newClassName){
								//即新输入的与原有的key相同，且与key对应输入的实际名称name相同，则覆盖
								if(confirm("样式重名，是否覆盖原有样式?")){
									allowed=true
									cover=true
									index=Object.keys(System.metaData.CLASSLIST[['APP','CURRENT'][this.addNewCssType]]).indexOf(this.newClassName)
								}
							}else{
								//与key值相同，但是与实际名称不同
								//则重新生成key值
								realKey=this.newClassName+"__"+this.randomName()
								allowed=true
							}
						
					}
					if(allowed){
						System.metaData.CLASSLIST[['APP','CURRENT'][this.addNewCssType]][realKey]={
							type:['class','label','other'][this.newCssSaveType],
							text:newClassText,
							data:newClass,
							name:this.newClassName,
						}
						System.showToast('保存成功',2000)
						this.showInputSaveName=false
						this.addNewCssType=-1
						this.newCssSaveType=-1
						this.newClassName=""
						this.selectAllStyleItem=false
						this.hasSelectToSave={}
						
						//插入到文档中
						
					}
				}
			}
			
		},
		setSelectAll:function(){
			this.selectAllStyleItem=!this.selectAllStyleItem
			if(!this.selectAllStyleItem){
				let key=Object.keys(this.LoadList)
				key.push("__code__")
				key.forEach(i => {
					this.hasSelectToSave[i]=false
				})
			}
		},
		emitPreFun:function(name,func){
			this.preProcessFun[name]=func
		},
		//接收预处理数据
		preProcess:function(name,value){
			let node=null
			for(let key in this.editDomList){
				if(this.editDomList[key]){
					node=key
					break
				}
			}
			this.factory[name](value,node,false)
		},
		processCssText:function(){
			for(let key in this.preProcessFun){
				this.preProcessFun[key]()
			}
		},
		requestClassList:function(){
			//请求css类列表
			let options={
				preClass:JSON.parse(JSON.stringify(this.classList)),
				return:(list)=>{
					let tempCondition={
					}
					//暂时存储原有的
					for(let i=0;i<this.classList.length;i++){
						tempCondition[this.classList[i].area+"_"+this.classList[i].name]={
							key:this.classList[i].key,
							name:this.classList[i].name,
							area:this.classList[i].area,
							condition:this.classList[i].condition
						}
					}
					let loopKey=""
					for(let i=0;i<list.length;i++){
						loopKey=list[i].area+"_"+list[i].name
						list[i].condition=tempCondition[loopKey] ? tempCondition[loopKey].condition : null
					}
					this.classList=list
					try{
						let id=System.getDomList()[0]
						//写回
						System.metaData.STYLESTRUCT[id].class=JSON.parse(JSON.stringify(this.classList))
					}catch{}
					
					tempCondition=null
					System.showToast("设置成功",2000)
				}
			}
			
			System.requestProvideControl('cssProvide',options)
		},
		initClass:function(newGroup){
			//重置类
			
			let i=0
			let clear=false
			for(let key in newGroup){
				if(newGroup[key]){
					i++
					if(i>1){
						clear=true
						break
					}
				}
			}
			if(clear){
				this.classList=[]
			}else{
				//查找类数据
				try{
					let id=System.getDomList()[0]
					if(id)
						this.classList=JSON.parse(JSON.stringify(System.metaData.STYLESTRUCT[id].class))
					else{
						this.classList=[]
					}
				}catch{}
				
			}
		},
		editClass:function(item){
			this.clear()
			this.$nextTick(()=>{
				//若上一个为类则传递退出原先类的编辑状态
				
				this.nowStyleTarget=item.name;
				this.mode='class';
				this.editTargetClassKey=item.key;
				this.classArea=item.area;
				console.log("d")
				this.loadData();
			})
		},
		editNowDom:function(){
			this.clear()
			this.$nextTick(()=>{
				//若上一个为类则传递退出原先类的编辑状态
				
				this.nowStyleTarget='元素';
				this.mode='inset';
				this.editDomList=JSON.parse(JSON.stringify(this.tempEditDomList));
				console.log("e")
				this.loadData()
			})
		},
		removeClass:function(index){
			let temp=JSON.parse(JSON.stringify(this.classList))
			if(confirm("确认删除类"+this.classList[index].name)){
				try{
					this.mode='inset'
					this.classList.splice(index,1)
					let id=System.getDomList()[0]
					//写回
					System.metaData.STYLESTRUCT[id].class=JSON.parse(JSON.stringify(this.classList))
					System.showToast("删除成功")
					
					this.nowStyleTarget='元素'
					this.clear()
					this.$nextTick(()=>{
						console.log("f")
						this.loadData()
					})
				}catch(e){
					console.log(e,System.getDomList())
					System.showToast("删除失败")
					this.classList=temp
				}
				
			}
			temp=null
		},
		
    }
}
</script>
