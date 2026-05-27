<template>
	<div style="width:100vw;height:100vh" id="testAnimate">
		<div class="el" id="testId"></div>
		<div class="el" id="nodeId2"></div>
		<teleport to="body">
			<div class="animateContainer" ref='main'>
				<!--触发事件列表-->
				<div class="eventContainer">
					<h3 class="animateHeaderText">交互动作</h3>
					<div class="listContainer">
						<div class="listItem" 
						:style="{backgroundColor:`${eventListIndex==index?'var(--mainColorBlue2)':''}`}"
						@click="setEvent(index)" v-for="(event,index) in eventKeyList" :key="index">
							<!--按钮-->
							<h4 class="listItemText">{{refEventName(event)}}</h4>
						</div>
					</div>
					<div @click="callAddEvent" title="添加交互事件" style="cursor: pointer;position: absolute;bottom: 8px;left:8px;;background-color: #212121;border-radius: 10px;height: 30px;width:30px;">
						<svg t="1667807135076" style="margin: 3px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11743" width="24" height="24"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#ffffff" p-id="11744"></path></svg>
					</div>
				</div>
				<!--数据部分容器-->
				<div class="emptyPropertype" v-if="emptyValue.event">
					<h4 class="emptyPropertype_text1">
						此节点暂无交互动作
					</h4>
					<h4 class="emptyPropertype_text2">
						请点击左侧
					</h4>
					<div style="width: 100%;display: flex;margin-top: 5px;">
						<button style="border-radius: 10px;width: 60%;color: white;margin-left:16px;height: 25px;background-color: var(--mainColorBlue2);">
							添加
						</button>
						<h4 class="emptyPropertype_text2">
							添加事件 
						</h4>
					</div>
				</div>
				<img 
				class='emptyPropertype_image'
				src="../assets/img/empty.svg" v-if="emptyValue.properType"/>
				<div v-if="!emptyValue.event" style="width: calc(100% - 140px);margin-left: 10px;height: 190px;margin-top:10px;">
					<!--顶部按钮-->
					<div style="width: 100%;height: 25px;display: flex">
						<!--节点播放所有-->
						<!--div class="headerButton" style="margin-left: 22px;" @click="refreshPlayer">播放所有</div-->
						<!--属性播放所有-->
						<!--div class="headerButton" style="margin-left: 32px;">播放所有</div-->
						<!--时间设置-->
						<div style="position: relative;width: 130px;height: 25px;margin-top: 0px;background-color: #323232;border-radius: 10px;margin-left: 22px;">
							<input v-model="realDuration" @blur="checkDuration" class="timeInput"/>
							<h4 style="margin: 0;padding: 0;height: 25px;line-height: 25px;color: white;font-weight: normal;position: absolute;top: 0;right: 10px;user-select: none;">ms</h4>
						</div>
						<!--进度条-->
						<div style="width: calc(100% - 230px);margin-left:32px;height: 20px;position: relative;margin-top: 16px;" ref="timelineController" id="test">
							<div id="bouncyCircle_controller" class="mojs-interactive__controller">
							</div>
							<!--重复设置-->
							<div @click="callRepeat" class="addKeyFrame" style="width: 20px;height: 20px;cursor: pointer;position: absolute;right:-16px;top:-8px" title="设置循环次数(最多10次)">
								<svg t="1667625863741" style="pointer-events: none;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="50310" width="20" height="20"><path d="M192 789.333333a21.24 21.24 0 0 1-12.8-4.28 344.513333 344.513333 0 0 1-99.333333-118A341.246667 341.246667 0 0 1 384 170.666667h256q6.36 0 12.733333 0.233333l-49.153333-49.146667a21.333333 21.333333 0 0 1 30.173333-30.173333l85.333334 85.333333a21.333333 21.333333 0 0 1 0 30.173334l-85.333334 85.333333a21.333333 21.333333 0 0 1-30.173333-30.173333l48.666667-48.666667Q646.126667 213.333333 640 213.333333H384c-164.666667 0-298.666667 134-298.666667 298.666667 0 94.833333 43.546667 181.933333 119.48 238.966667A21.333333 21.333333 0 0 1 192 789.333333z m228.433333 143.06a21.333333 21.333333 0 0 0 0-30.173333l-49.153333-49.146667q6.366667 0.233333 12.733333 0.233334H640a341.46 341.46 0 0 0 304.146667-496.42 344.513333 344.513333 0 0 0-99.333334-118 21.333333 21.333333 0 1 0-25.626666 34.113333C895.12 330.066667 938.666667 417.166667 938.666667 512c0 164.666667-134 298.666667-298.666667 298.666667H384q-6.12 0-12.246667-0.246667l48.666667-48.666667a21.333333 21.333333 0 0 0-30.173333-30.173333l-85.333334 85.333333a21.333333 21.333333 0 0 0 0 30.173334l85.333334 85.333333a21.333333 21.333333 0 0 0 30.173333 0zM768 512c0-70.58-57.42-128-128-128-33.546667 0-70.666667 13.38-99.246667 35.78a146.466667 146.466667 0 0 0-28.753333 29.6 146.466667 146.466667 0 0 0-28.753333-29.6C454.666667 397.38 417.546667 384 384 384c-70.58 0-128 57.42-128 128s57.42 128 128 128c33.546667 0 70.666667-13.38 99.246667-35.78a146.466667 146.466667 0 0 0 28.753333-29.6 146.466667 146.466667 0 0 0 28.753333 29.6C569.333333 626.62 606.453333 640 640 640c70.58 0 128-57.42 128-128z m-42.666667 0a85.426667 85.426667 0 0 1-85.333333 85.333333c-48 0-106.666667-39.373333-106.666667-85.333333s58.666667-85.333333 106.666667-85.333333a85.426667 85.426667 0 0 1 85.333333 85.333333z m-234.666666 0c0 45.96-58.666667 85.333333-106.666667 85.333333a85.333333 85.333333 0 0 1 0-170.666666c48 0 106.666667 39.373333 106.666667 85.333333z" fill="#ffffff" p-id="50311"></path></svg>
							</div>
						</div>
						
						<!--时间点对齐线-->
						<div v-if="!emptyValue.properType" style="width: calc(100% - 610px);margin-left:380px;height: 1px;position: absolute;background-color:transparent;margin-top: 32px;z-index: 9;">
							<div
							:style="{left:`calc(${progress*100}% - 2px)`}"
							style="position: absolute;top: -8px;height: 150px;width: 1px;background-color: white;">
							</div>
						</div>
					</div>
					<!--列表部分-->
					<div style="width: 100%;height: 25px;display: flex;">
						<div class="emptyPropertype" v-if="emptyValue.properType">
							<h4 class="emptyPropertype_text1">
								此节点暂无样式变化
							</h4>
							<h4 class="emptyPropertype_text2">
								请右键节点{{nodeList_show[nodeListIndex]}}
							</h4>
							<div style="width: 100%;display: flex;margin-top: 5px;">
								<h4 class="emptyPropertype_text2">
									点击 
								</h4>
								<button style="border-radius: 10px;width: 60%;color: white;margin-left:16px;height: 25px;background-color: var(--mainColorBlue2);">设为起始交互点</button>
							</div>
						</div>
						<img 
						class='emptyPropertype_image'
						src="../assets/img/empty.svg" v-if="emptyValue.properType"/>
						<!--节点列表-->
						<div style="width:130px;height: 150px;overflow: hidden;border-radius: 10px;margin-left: 22px;margin-top: 5px;" >
							<div class="nodeList" >
								<div class="nodeItem"
								 @click="setFrameData(nodeList[index]);nodeListIndex=index" 
								 @contextmenu="callNodeMenu($event,nodeList[index])"
								 style="width: 90%;" 
								 v-for="(item,index) in nodeList_show" 
								 :key="index"
								 :style="{backgroundColor:`${nowEditNodeId==nodeList[index]?'var(--mainColorBlue2)':''}`}">
									{{item}}
								</div>
							</div>
						</div>
						<!--属性列表-->
						<div style="position:relative;width:calc(100% - 180px);height: 150px;overflow: hidden;border-radius: 10px;margin-left: 32px;margin-top: 5px;" >
							<div class="nodeList" style="width: 101%;">
								<div  v-for="(item,index) in propertypeList"  style="width: 100%;height: 25px;margin-top: 5px;display: flex;" :key="index">
									<!--属性名-->
									<div class="nodeItem" style="height: 25px;line-height: 25px;">{{nameRef[item]}}</div>
									<!--按钮-->
									<div  style="width: 30px;height: 20px;margin-left: 10px;margin-right: 18px;display: flex;margin-top: 8px;">
										
									</div>
									<!--拖拽层-->
									<div @mousemove="draging($event,item)" @mouseup="endDrag(item)" style="position: absolute;z-index: 3;width: 100%;height: 100%;background-color: rgba(0,0,0,0);cursor: w-resize;" v-if="isDraging"></div>
									<!--时间内容-->
									<div class="line" :id="item+'_line_out'">
										<!--左边拉动原点-->
										<div @mousedown="startDrag($event,item,'left')" v-if="focusFrameProp==item" class="dragPoint" :style="{left:`calc(${blockData[item].blockLeft*100}% - 12px)`}"></div>
										<div @mousedown="startDrag($event,item,'right')" v-if="focusFrameProp==item" class="dragPoint" :style="{left:`calc(${blockData[item].blockLeft*100+blockData[item].blockWidth*100}% + 6px)`}"></div>
										<!--颜色条-->
										<div 
											@mousedown="startMove($event,item)"
											:id="item+'_line'"
											:class="{'focusFrame':focusFrameProp==item}"
											:style="{marginLeft:`${blockData[item].blockLeft*100}%`,width:`${blockData[item].blockWidth*100}%`,backgroundColor:`${lineColorList[index%5]}`}"
											style="position: relative;margin-top:0;height: 25px;border-radius: 3px;float: left;">
										</div>
										<!--重复颜色段-->
										<div 
											:style="{width:`${blockData[item].blockWidth*100}%`}" 
											class="repeatItem" 
											v-for="i in repeatList[item]"
											title="重复段"
											>
										</div>
										<!--帧添加按钮-->
										<div 
											title="在此处添加关键帧"
											@click="addKeyFrame()"
											v-if="focusFrameProp===item"
											:style="{left:`calc(${progress*100}% - 10px)`}"
											style="position: absolute;z-index: 2;width: 21px;top: 2px;height: 20px;background-color: transparent;z-index: 1;cursor: pointer;">
										</div>
										<!--首帧-->
										<div
										class="frame"
										@click="moveToFrame($event,item,-1)" 
										@contextmenu.stop="callMenu($event,item,-1)" 
										:style="{left:`calc(${blockData[item].blockLeft*100}% - 7px)`}">
											<svg t="1667623898734" class="icon" viewBox="0 0 1024 1024" style="margin-top: 2px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="49307" width="16" height="16"><path d="M848 0H176C149.49 0 128 21.49 128 48v32c0 26.51 21.49 48 48 48 0 181.93 102.032 335.468 241.684 384C278.032 560.532 176 714.07 176 896c-26.51 0-48 21.49-48 48v32c0 26.51 21.49 48 48 48h672c26.51 0 48-21.49 48-48v-32c0-26.51-21.49-48-48-48 0-181.93-102.032-335.468-241.684-384C745.968 463.468 848 309.93 848 128c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48z m-128 896H304c0-154.916 92.408-288 208-288 115.572 0 208 133.034 208 288z" p-id="49308" fill="#FF8F1F"></path></svg>
										</div>
										<!--遍历关键帧位置,除去尾帧-->
										<div 
										class="frame" 
										v-show="index_child<frameData[item].length-1"
										v-for="(frame,index_child) in frameData[item]" 
										@click="moveToFrame($event,item,index_child)" 
										@contextmenu.stop="callMenu($event,item,index_child)" 
										:key="index_child" :style="{left:`calc(${frame.progress*100}% - 11px)`}">
											<svg t="1667398413218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20394" width="20" height="20"><path d="M266.24 737.28c0-100.7616 60.6208-187.35104 147.41504-225.28C326.8608 474.05056 266.24 387.4816 266.24 286.72V122.88H174.08a30.72 30.72 0 0 1 0-61.44h675.84a30.72 30.72 0 0 1 0 61.44H757.76v163.84c0 100.7616-60.6208 187.35104-147.41504 225.28C697.1392 549.94944 757.76 636.5184 757.76 737.28v163.84h92.16a30.72 30.72 0 0 1 0 61.44h-675.84a30.72 30.72 0 0 1 0-61.44H266.24v-163.84z" fill="#ffffff" p-id="20395"></path><path d="M675.84 256a30.72 30.72 0 0 1 30.72 30.72c0 67.64544-34.816 129.3312-90.97216 164.72064a30.72 30.72 0 1 1-32.768-51.97824A132.97664 132.97664 0 0 0 645.12 286.72a30.72 30.72 0 0 1 30.72-30.72z" fill="#ffffff" p-id="20396"></path></svg>
										</div>
										<!--尾帧-->
										<div
										class="frame"
										@click="moveToFrame($event,item,frameData[item].length-1)" 
										@contextmenu.stop="callMenu($event,item,frameData[item].length-1)" 
										:style="{left:`calc(${blockData[item].blockLeft*100+blockData[item].blockWidth*100}% - 10px)`}">
											<svg t="1667623898734" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:2px;transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg" p-id="49307" width="16" height="16"><path d="M848 0H176C149.49 0 128 21.49 128 48v32c0 26.51 21.49 48 48 48 0 181.93 102.032 335.468 241.684 384C278.032 560.532 176 714.07 176 896c-26.51 0-48 21.49-48 48v32c0 26.51 21.49 48 48 48h672c26.51 0 48-21.49 48-48v-32c0-26.51-21.49-48-48-48 0-181.93-102.032-335.468-241.684-384C745.968 463.468 848 309.93 848 128c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48z m-128 896H304c0-154.916 92.408-288 208-288 115.572 0 208 133.034 208 288z" p-id="49308" fill="#FF8F1F"></path></svg>
										</div>
									</div>
									<!--删除按钮-->
									<div class="deleteButton" @click="removeProperType(item,false)">
										<svg t="1667366474425" class="icon" style="margin-left: 5px;margin-top: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2142" width="20" height="20"><path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#ffffff" p-id="2143"></path></svg>
									</div>
								</div>
							</div>
							<div v-if="!emptyValue.properType" @click="showNewProperType" title="添加变化节点" style="cursor: pointer;position: absolute;bottom: 0px;left:0px;;background-color: #212121;border-radius: 0 10px 0 0;height: 30px;width:30px;box-shadow: 1px -1px 0 1px var(--mainColorGrayBg2);">
								<svg t="1667807135076" style="margin: 3px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11743" width="24" height="24"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#ffffff" p-id="11744"></path></svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</teleport>
		<!--帧节点右键-->
		<teleport to="body" v-if="menu.show">
			<div style="position: absolute;z-index: 1000000;width: 100px;height: 70px;background-color: #212121;border-radius: 5px;" :style="{left:`${menu.left}px`,top:`${menu.top}px`}">
				<div class="menuItem" @click="callEditing">
					数据编辑
				</div>
				<div class="menuItem" @click="removeFrame">
					删除此帧
				</div>
				<input ref='menuInput' class='hiddenInput' @blur="closeMenu"/>
			</div>
		</teleport>
		<!--循环次数设置-->
		<teleport to="body" v-if="repeat.show">
			<div 
			style="position: absolute;z-index: 1000000;display:flex;width: 230px;height: 35px;background-color: #212121;border-radius: 5px;color: white;" 
			:style="{left:`${repeat.left}px`,top:`${repeat.top}px`}">
				<input class="repeatInput" v-model='repeat.times'/>
				<h4 style="mmargin: 0;padding: 0;font-weight: normal;line-height: 15px;height: 15px;color: white;">次</h4>
				<button class="editingConfirm" @click="saveRepeat">保存</button>
				<div class="editingCancle" @click="cancleRepeat">
					<svg t="1667646710839" style="margin-top: 2px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="51296" width="20" height="20"><path d="M806.4 263.2l-45.6-45.6L512 467.2 263.2 217.6l-45.6 45.6L467.2 512 217.6 760.8l45.6 45.6L512 557.6l248.8 248.8 45.6-45.6L557.6 512z" p-id="51297" fill="#ffffff"></path></svg>
				</div>
				<input ref='repeatInput' class='hiddenInput' @blur="closeMenu"/>
			</div>
		</teleport>
		<!--数据编辑-->
		<teleport to="body" v-if="editing.show">
			<div class="editing" :style="{left:`${editing.left}px`,top:`${editing.top}px`}">
				<input class="editingInput" v-model="editing.value"/>
				<button class="editingConfirm" @click="saveEditData">保存</button>
				<div class="editingCancle" @click="cancleEdting">
					<svg t="1667646710839" style="margin-top: 2px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="51296" width="20" height="20"><path d="M806.4 263.2l-45.6-45.6L512 467.2 263.2 217.6l-45.6 45.6L467.2 512 217.6 760.8l45.6 45.6L512 557.6l248.8 248.8 45.6-45.6L557.6 512z" p-id="51297" fill="#ffffff"></path></svg>
				</div>
			</div>
		</teleport>
		<!--新属性列表-->
		<teleport to="body" v-if="newProperType.show">
			<div class="addNewList" :style="{left:`${newProperType.left}px`,bottom:`32px`}">
				<div class="newProItem" @click="addNewPropertype(item)" v-for="(item,index) in newProperType.list" :key="index">
					{{item}}
				</div>
				<input ref='newProInput' class='hiddenInput' @blur="closeNewPro"/>
			</div>
		</teleport>
		<!--新事件列表-->
		<teleport to="body" v-if="newEvent.show">
			<div class="addNewList" :style="{left:`${newEvent.left}px`,bottom:`32px`}">
				<div class="newProItem" @click="addEvent(item)" v-for="(item,index) in eventShowList" :key="index">
					{{item}}
				</div>
				<input ref='newProInput' class='hiddenInput' @blur="closeEventList"/>
			</div>
		</teleport>
		<!--节点右键列表-->
		<teleport to="body" v-if="nodeMenu.show">
			<div class="addNewList" style="width: 130px;" :style="{left:`${nodeMenu.left}px`,top:`${nodeMenu.top}px`}">
				<div class="newProItem" @click="removeNode">
					删除此节点
				</div>
				<input ref='newProInput' class='hiddenInput' @blur="closeNodeMenu"/>
			</div>
		</teleport>
	</div>
</template>

<script> 
	import mojs from '@mojs/core';
	import MojsPlayer from '@mojs/player';
	import MojsCurveEditor from '@mojs/curve-editor';
	import { structStore } from "../store/struct.js";
	import { ref } from 'vue';
	/*动画数据处理器*/
	import * as animationData from "../engines/animationData.js"
	/*引入mixins*/
	import mixins1 from "./animateData_mixins1.js"
	import style from '../engines/style.js';
	
	var replay=()=>{}
	export default{
		name:"animateEditor",
		mixins:[mixins1],
		props:{
			
		},
		data(){
			return {
				nodeId:"",
				player:null,
				eventListIndex:0,//默认加载的首个触发事件数据
				nodeListIndex:-1,//默认加载的首个节点数据
				propertypeListIndex:-1,//默认加载的首个样式属性数据
				aniamtionData:{},
				eventKeyList:[],
				nodeList:[],//没有去除前缀的
				nodeList_show:[],//去除了前缀的
				propertypeList:[],
				timeline:null,
				circle:null,
				duration:0,
				progress:0,
				nowTime:0,
				animationView:{},//当前触发事件下的动画数据
				playView:{},//当前编辑的动画数据
				dataItem:[],
				lineColorList:['#9AC1F0','#72FA93','#A0E548','#E45F2B','#F6C445'],
				frameData:{},
				preFrameList:{},//前一帧数据
				progressList:{},//每个节点的每个属性的每个帧时间占比
				nameRef:{
					width:"宽度",
					height:"高度",
					opacity:"透明度",
					x:'x轴偏移',
					y:'y轴偏移',
					marginLeft:"左外边距",
					marginRight:"右外边距",
					marginTop:"上外边距",
					marginBottom:"下外边距",
					paddingLeft:"左内边距",
					paddingRight:"右内边距",
					paddingTop:"上内边距",
					paddingBottom:"下内边距",
					left:"距左边位置",
					top:"距上边位置",
					right:"距右边位置",
					bottom:"距下边位置",
					blur:'高斯模糊',
					borderTopColor:'上边框颜色',
					borderLeftColor:'左边框颜色',
					borderRightColor:'右边框颜色',
					borderBottomColor:'下边框颜色',
					borderTopWidth:'上边框宽度',
					borderLeftWidth:'左边框宽度',
					borderRightWidth:'右边框宽度',
					borderBottomWidth:'下边框宽度',
					backgroundColor:"背景颜色",
					borderRadius:'圆角'
				},
				blockData:{},//块属性
				repeatList:{},//重复
				focusFrameProp:null,
				nowEditNodeId:"",
				isPlaying:false,
				hasStarted:false,
				isDraging:false,
				lineData:{
					left:0,
					width:0
				},
				menu:{
					show:false,
					left:0,
					top:0
				},
				repeat:{
					show:false,
					left:0,
					top:0
				},
				editing:{
					show:false,
					item:"",
					index:0,
					preValue:0,
					value:0
				},
				emptyValue:{
					node:false,
					properType:false,
					event:false
				},
				newProperType:{
					show:false,
					left:0,
					list:[]
				},
				realDuration:0,
				loadTimeout:null
			}
		},
		watch:{
			duration:{
				handler:function(newValue){
					this.realDuration=newValue.toFixed(0)
				},
				deep:true,
				immediate:true
			},
		},
		mounted(){
			//System.metaData=structStore()
			System.loadAnimationData=this.loadAnimateData
			System.closeAnimationBord=this.close
			System.setStartFrame=this.setStartFrame
			System.recordAnimationFrame_all=this.recordAnimation_all
			System.recordAnimationFrame=this.recordAnimation
			//System.recordAnimationFrame=this.recordAnimation_al
			System.linkAnimationNode=this.addNode
			System.recoverAnimate=this.recover
			///this.loadAnimateData('testId')
		},
		methods:{
			createKey:function(){
				return Math.random().toString(32).substr(2)
			},
			setStartFrame:function(nodeId){
				//备份数据
				for(let i=0;i<this.nodeList_show.length;i++){
					System.setTempStyleData(this.nodeList_show[i])
				}
				nodeId=nodeId.replace('$NODE:','').replace('_accepter',"")
				console.log(nodeId,this.nodeList_show,this.nowEditNodeId)
				if(!this.nodeList_show.includes(nodeId)){
					System.showToast("此节点未在交互对象中，请添加")
					return
				}else if(('node_'+nodeId)!==this.nowEditNodeId){
					System.showToast("此节点非当前操作节点，设置失败",3000)
					return
				}
				//获取处理过后的动画帧数据
				let frameData=System.processAnimateData(nodeId)
				let keyFrame={}
				let frameTagList={}
				let frameUnit={}
				let duration=0
				//如果是在已经存在的动画中重新设置起始状态，则读取已有的时长
				if(this.timeline){
					duration=this.duration
				}else{
					//否则默认为3s
					duration=3000
				}
				let delay=0,randomId,proKey,preStartValue="",preEndValue,removeSatrt=false,tempData=null
				for(let key in frameData){
					randomId=this.createKey()
					removeSatrt=false
					if(this.animationView[this.nowEditNodeId].frameTagList[key]){
						//读取animation中的首帧指向
						proKey=this.animationView[this.nowEditNodeId].frameTagList[key]
						preStartValue=this.animationView[this.nowEditNodeId].propertype[proKey].startValue
						preEndValue=this.animationView[this.nowEditNodeId].propertype[proKey].endValue
						try{
							delete this.animationView[this.nowEditNodeId].propertype[proKey][preStartValue]
						}catch{}
						keyFrame[proKey]={}
						keyFrame[proKey][frameData[key].value]=preEndValue
						keyFrame[proKey].startValue=frameData[key].value
						keyFrame[proKey].duration=duration
						keyFrame[proKey].delay=delay
						keyFrame[proKey].endValue=preEndValue
						continue
					}else{
						preEndValue=frameData[key].value
						if(key.toLowerCase().includes('color')){
							proKey='FRAMETAG'+randomId+'-'+key
						}else{
							proKey=key+"_frame"+randomId+"_tag"
						}
						//设置首帧指向
						frameTagList[key]=proKey
						
					}
					//读取delay
					delay=this.animationView[this.nowEditNodeId].propertype[proKey]
							?
							this.animationView[this.nowEditNodeId].propertype[proKey].delay:0
					//x_frame1_tag
					//'FRAMETAG1-backgroundColor'
					/*
						start:end
						startValue:0
						endValue:0
						duration:0,
						delay:0
					*/
					keyFrame[proKey]={}
					keyFrame[proKey][frameData[key].value]=preEndValue
					
					keyFrame[proKey].startValue=frameData[key].value
					keyFrame[proKey].endValue=frameData[key].value
					keyFrame[proKey].duration=duration
					keyFrame[proKey].delay=delay
					if(frameData[key].unit)
						frameUnit[key]=frameData[key].unit
				}
				this.animationView[this.nowEditNodeId].frameTagList=
					Object.assign(this.animationView[this.nowEditNodeId].frameTagList,frameTagList)
				for(let key in keyFrame){
					this.animationView[this.nowEditNodeId].propertype[key]=keyFrame[key]
				}
				for(let key in frameUnit){
					this.animationView[this.nowEditNodeId].frameUnit[key]=frameUnit[key]
				}
				//System.metaData.ANIMATION[this.nodeId][this.eventKeyList[this.eventListIndex]][this.nowEditNodeId]=JSON.parse(JSON.stringify(this.animationView[this.nowEditNodeId]))
				this.loadAnimateData(this.nodeId,this.eventListIndex,this.nodeListIndex)
			},
			recordAnimation:function(nodeId=null){
				try{
					nodeId=nodeId.replace('$NODE:','').replace('_accepter',"")
				}catch{}
				if(this.focusFrameProp === null ){
					System.showToast("未选择属性，请单击时间条选择",3000)
					return
				}
				let frameData=System.processAnimateData(nodeId)
				let exist=false,existKey,frame
				for(let frameIndex=0;frameIndex<this.frameData[this.focusFrameProp].length;frameIndex++){
					frame=this.frameData[this.focusFrameProp][frameIndex]
					if(frame.progress == this.progress){
						exist=true
						existKey=frame.key
						break
					}
				}
				if(exist){
					//修改对应的结束点
					startValue=this.animationView[this.nowEditNodeId].propertype[existKey].startValue
					endValue=this.animationView[this.nowEditNodeId].propertype[existKey].endValue          
					try{
						delete this.animationView[this.nowEditNodeId].propertype[existKey][startValue]
					}catch{}								
					this.animationView[this.nowEditNodeId].propertype[existKey][startValue]=frameData[key].value
					this.animationView[this.nowEditNodeId].propertype[existKey].endValue=frameData[key].value
				}else{
					//否则在此处添加帧
					this.addKeyFrame(this.progress,null,frameData[this.focusFrameProp].value,this.focusFrameProp)
				}
			},
			recordAnimation_all:function(nodeId=null){
				
				//获取处理过后的动画帧数据
				let frameData=System.processAnimateData(nodeId)
				try{
					nodeId=nodeId.replace('$NODE:','').replace('_accepter',"")
				}catch{}
				if(this.progress==0){
					//此时等同于设置起点属性
					this.setStartFrame(nodeId)
				}else{
					let frame,startValue,endValue
					//检测此属性在指针所处位置是否有帧
					for(let key in this.frameData){
						let exist=false,existKey
						for(let frameIndex=0;frameIndex<this.frameData[key].length;frameIndex++){
							frame=this.frameData[key][frameIndex]
							if(frame.progress == this.progress){
								exist=true
								existKey=frame.key
								break
							}
						}
						if(exist){
							//若有帧，修改对应的结束点
							startValue=this.animationView[this.nowEditNodeId].propertype[existKey].startValue
							endValue=this.animationView[this.nowEditNodeId].propertype[existKey].endValue          
							try{
								delete this.animationView[this.nowEditNodeId].propertype[existKey][startValue]
							}catch{}								
							this.animationView[this.nowEditNodeId].propertype[existKey][startValue]=frameData[key].value
							this.animationView[this.nowEditNodeId].propertype[existKey].endValue=frameData[key].value
						}else{
							//否则在此处添加帧
							this.addKeyFrame(this.progress,null,frameData[key].value,key)
						}
					}
				}
			},
			close:function(){
				this.$refs['main'].style.bottom="-300px"
			},
			refEventName:function(name){
				return this.nameList[name] || name
			},
			refreshPlayer:function(target="all"){
				document.querySelector('.controller').remove()
				let _this=this
				const timeLine=new mojs.Timeline({
					onStart(){
						_this.duration=this._props.duration
					},
					onProgress(p, isForward, isYoyo){
						_this.progress=p
						_this.nowTime=p*_this.duration
					}
				});
				let progress=this.progress*(this.duration/4000)
				timeLine.add(this.circle)
				let a=document.getElementById('bouncyCircle_controller')
				const player=new MojsPlayer({ add: timeLine,isPlaying:false, 
				parent: a,
				progress:progress,
				className: "controller",
				isSaveState:false});
			},
			loadAnimateData:function(nodeId,targetEventIndex=0,targetNodeIndex=0){
				try{
					nodeId=nodeId.replace('$NODE:','').replace('_accepter',"")
				}catch{}
				this.nodeId=nodeId
				this.$refs['main'].style.bottom="16px"
				this.animationData=System.metaData.ANIMATION[nodeId]
				this.animationView={}
				if(this.animationData){
					//加载触发列表
					this.eventKeyList=Object.keys(this.animationData)
					//将默认加载索引重置为0
					this.propertypeListIndex=0
					if(this.eventKeyList.length>0){
						this.setEvent(targetEventIndex,targetNodeIndex)
						this.emptyValue.event=false
					}else{
						this.emptyValue.event=true
						this.timeline=null
						this.player=null
					}	
				}else{
					this.eventListIndex=-1
					this.nodeListIndex=-1
					this.propertypeListIndex=-1
					this.eventKeyList=[]
					this.nodeList=[]
					this.nodeList_show=[]
					this.propertypeList=[]
					this.emptyValue.node=true
					this.emptyValue.properType=true
					this.emptyValue.event=true
					this.timeline=null
					this.player=null
				}
			},
			setEvent:function(eventIndex,targetNodeIndex=0){
				
				//切换事件前先恢复原节点数据
				this.recover(false)
				this.eventListIndex=eventIndex
				this.nodeListIndex=targetNodeIndex
				let temp_nodeList=Object.keys(this.animationData[this.eventKeyList[eventIndex]])
				this.nodeList_show=temp_nodeList.map((item)=>{
					return item.split("_")[1].replace('$NODE:','').replace('_accepter',"")
				})
				
				this.nodeList=temp_nodeList
				this.nowEditNodeId=temp_nodeList[targetNodeIndex]
				this.animationView=this.animationData[this.eventKeyList[eventIndex]]
				if(Object.keys(this.animationView[this.nowEditNodeId].frameTagList).length>0){
					this.emptyValue.properType=false
					this.loadAnimationView()
				}
				else{
					this.emptyValue.properType=true
					this.timeline=null
					this.player=null
					this.propertypeList=[]
				}
			},
			loadAnimationView:function(targetDuration=-1){
				this.preFrameList={}
				let dataItem=[]
				let frameData={}
				const transformList=['x','y','z','skewX','skewY','rotateX','rotateY','rotateZ','scale','scaleX','scaleY','scaleZ']
				const transformVar={x:'--translateX',y:'--translateY',z:'--translateZ',
									skewX:'--skewX',skewY:'--skewY',rotateX:'--rotateX',rotateY:'--rotateY',rotateZ:'--rotateZ',
									scale:'--scale',scaleX:'--scaleX',scaleY:'--scaleY',scaleZ:'--scaleZ'
									}
				const transformUnit={x:'px',y:'px',z:'px',
									skewX:'deg',skewY:'deg',rotateX:'deg',rotateY:'deg',rotateZ:'deg',
									scale:'',scaleX:'',scaleY:'',scaleZ:''
									}
				//多层次的属性style名称参考
				const refProper_parent={
					'blur':'filter',
					'backBlur':'backdropFilter'
				}
				//多层次属性的style参数名参考
				const refProper_cild={
					'blur':'blur',
					'backBlur':'blur'
				}
				
				const _this=this
				const render={
					'shape':(key)=>{
						
						propertype=this.animationView[key].propertype
						frameTag=JSON.parse(JSON.stringify(this.animationView[key].frameTagList)) 
						nextTag=this.animationView[key].nextTagList
						let CUSTOM_PROPERTIES = {
						    // list of custom props with defaults
						    anotherCustomProp: 0,
						    // function that will be called on each frame, you are responsible to render properties
						    draw (el, props) {
						    }
						}
						let stylePro=""
						frameData={}
						let frameProgress=0
						for(let name in propertype){
							stylePro=name.split("_")[0]
							if(name.endsWith('_tag')){
								CUSTOM_PROPERTIES[name]=0
							}
							if(frameTag[stylePro]){
								//计算此帧的时间位置
								frameProgress=(propertype[name].delay || 0)+propertype.duration
								//若遍历到的属性名在样式之中，则记录关键帧位置
								if(frameData[stylePro]){
									frameData[stylePro].push(frameProgress)
								}else{
									frameData[stylePro]=[frameProgress]
								}
							}
							if(nextTag[name]){
								propertype[name].onComplete=()=>{
									//一个关键帧结束时，将属性索引指向下一个帧
									frameTag[stylePro]=nextTag[name]
								}
							}
						}
						//配置绘制信息
						propertype.customProperties=CUSTOM_PROPERTIES
						this.playView[key]=new mojs.Shape(propertype)
						this.frameData=frameData
						dataItem.push(this.playView[key])
					},
					'burst':(key)=>{
						this.playView[key]=new mojs.Burst(this.animationView[key].propertype)
						dataItem.push(this.playView[key])
					},
					"swirl":(key)=>{
						this.playView[key]=new mojs.ShapeSwirl(this.animationView[key].propertype)
						dataItem.push(this.playView[key])
					},
					'node':(key)=>{
						/*
							propertype:{
								width_frame1:data,
								width_frame2:data
							}
							frameTag:{
								width:'wdith_frame2'
							}
							nextTag:{
								'width_frame1':'width_frame2'
							}
						*/
						let propertype={},frameTag={},nextTag={},frameUnit={}
						//属性表
						propertype=this.animationView[key].propertype
						//帧数据表,要保证不会修改首帧指向
						frameTag=JSON.parse(JSON.stringify(this.animationView[key].frameTagList)) 
						//下一帧指向表
						nextTag=this.animationView[key].nextTagList
						//属性单位表
						frameUnit=this.animationView[key].frameUnit
						console.log(this.animationView[key],"animation")
						let propsList=[]
						let styleName
						let tempData=null
						let CUSTOM_PROPERTIES = {
						    anotherCustomProp: 0,
						    // function that will be called on each frame, you are responsible to render properties
						    draw (el, props) {
								//
								if(tempData===null){
									tempData=JSON.parse(JSON.stringify(props))
								}
								for(let name in frameTag){
									if(_this.preFrameList['node_'+el.id+"_"+frameTag[name]]){
										if((this.timeline?this.timeline.progress:0)< _this.preFrameList['node_'+el.id+"_"+frameTag[name]].progress){
											try{
												frameTag[name]=_this.preFrameList['node_'+el.id+"_"+frameTag[name]].preFrame
											}catch{}
										}
									} 
									if(transformList.includes(name)){
										//库自带的属性处理
										el.style.setProperty(transformVar[name],props[frameTag[name]]+transformUnit[name])
									}else if(refProper_parent[name]){
										//需要多层次属性的，如blur值filter:blur,backBlur指backdrop-filter:blur
										el.style[refProper_parent[name]]=`${refProper_cild[name]}(${props[frameTag[name]]}${frameUnit[name] || ''})`
										
									}else{
										//不需要多层次属性的
										el.style[name]=props[frameTag[name]]+(frameUnit[name] || '')
									}
								}
						    }
						}
						for(let name in propertype){
							if(nextTag[name]){
								propertype[name].onComplete=()=>{
									styleName=name.endsWith("_tag")?name.split("_")[0]:name.split("-")[1]
									//记录前一帧及时间占比位置，用于在往回拖动的时候设置
									if(!this.preFrameList[key+"_"+this.animationView[key].nextTagList[name]]){
										//如果已经设置过，则不允许再设置，除非是直接手动修改关键帧位置
										this.preFrameList[key+"_"+this.animationView[key].nextTagList[name]]={
											progress:this.progressList[key+"_"+name],//上一帧位置
											preFrame:frameTag[styleName]+""//上一帧指向
										}
									}
									//一个关键帧结束时，将属性索引指向下一个帧
									frameTag[styleName]=this.animationView[key].nextTagList[name]
								}
							}
						}
						//配置绘制信息
						propertype.customProperties=CUSTOM_PROPERTIES
						try{
							this.playView[key]=new mojs.Html(propertype)
							let parse=0
							for(let name in propertype){
								if(name.endsWith('_tag')){
									parse=parseFloat(tempData[name])
									CUSTOM_PROPERTIES[name]=!isNaN(parse)?parse:tempData[name]
								}
							}
							propertype.customProperties=CUSTOM_PROPERTIES
							this.playView[key]=new mojs.Html(propertype)
							document.getElementById(key.replace('$NODE:','').replace('_accepter',"").split('_')[1]).style.cssText=`transform:translate3d(var(--translateX), var(--translateY),var(--translateZ)) rotateX(var(--rotateX)) rotateY(var(--rotateY)) rotateZ(var(--rotateZ))
																			skew(var(--skewX), var(--skewY)) scale3d(var(--scaleX), var(--scaleY),var(--scaleZ))` 
							for(let propName in transformVar){
								document.getElementById(key.replace('$NODE:','').replace('_accepter',"").split('_')[1]).style.setProperty(transformVar[propName],(propName.startsWith("scale")?1:0)+transformUnit[propName])
							}
							dataItem.push(this.playView[key])
						}catch(e){
							alert("请设置动画帧数据")
						}
					}
				}
				const timeLine=new mojs.Timeline({
					onStart(){
						//_this.duration=this._props.duration
						_this.hasStarted=true
						System.clearBoundSide()
						System.unSelectAll()
					},
					onProgress(p, isForward, isYoyo){
						_this.progress=p
						_this.nowTime=p*_this.duration
					},
					onComplete (isForward, isYoyo) {
						_this.isPlaying=!isForward
					},
				});
				//一次只处理一个
				let keys=Object.keys(this.animationView)
				let key=''
				for(let i=0;i<keys.length;i++ ){
					key=keys[i]
					if(key.startsWith('shape_')){
						//形状
						render['shape'](key)
					}else if(key.startsWith("burst_")){
						//发散
						render['burst'](key)
					}else if(key.startsWith('swirl_')){
						//漩涡
						render['swirl'](key)
					}else{
						//节点
						console.log("animation node")
						render['node'](key)
					}
				}
				if(dataItem.length>0){
					this.dataItem=dataItem
					timeLine.add(...dataItem)
					if(targetDuration>0)
						timeLine._props.duration=targetDuration
					this.duration=timeLine._props.duration
					this.setFrameData(this.nowEditNodeId)
					try{
						document.querySelector('.controller').remove()
					}catch{}
					let a=document.getElementById('bouncyCircle_controller')
					const player=new MojsPlayer({ add: timeLine,isPlaying:false, 
					parent: a,
					progress:0,
					className: "controller",
					isSaveState:false});
					this.player=player
					this.timeline=timeLine
					this.player.playButton.el.onclick=()=>{
						this.isPlaying=!this.isPlaying
					}
				}else{
					this.propertypeList=[]
				}
			},
			setFrameData:function(nodeId,resetFrame=true){
				try{
					nodeId=nodeId.replace('$NODE:','').replace('_accepter',"")
				}catch{}
				//加载属性列
				let eventKey=this.eventKeyList[this.eventListIndex]
				this.propertypeList=Object.keys(this.animationData[eventKey][nodeId].frameTagList)
				if(this.propertypeList.length>0){
					this.emptyValue.properType=false
				}else{
					this.emptyValue.properType=true
				}
				this.nowEditNodeId=nodeId
				//设置关键帧数据
				let frameProgress=0
				let stylePro=""
				let frameData={}
				let propertype=this.animationView[nodeId].propertype
				let frameTag=this.animationView[nodeId].frameTagList
				let blockLeft,blockWidth
				let lastStylePro=null
				let blockData={}
				let tempLeft
				this.repeatList={}
				for(let name in propertype){
					stylePro=name.startsWith("FRAMETAG")?name.split("-")[1]:name.split("_")[0]
					this.repeatList[stylePro]=propertype[name].repeat || 0
					//有下一帧时才会加入
					if(frameTag[stylePro]){
						//计算此帧的时间位置
						tempLeft=(propertype[name].delay || 0)/this.duration
						if(!blockData[stylePro] || tempLeft < blockData[stylePro].blockLeft){
							//仅在首次delay出现或当前的delay小于已经设置的delay时设置
							blockLeft=tempLeft
							blockData[stylePro]={
								blockLeft:blockLeft
							}
						}
						blockWidth+=propertype[name].duration
						frameProgress=((propertype[name].delay || 0)+propertype[name].duration)/this.duration
						//若遍历到的属性名在样式之中，则记录关键帧位置
						if(frameData[stylePro]){
							frameData[stylePro].push({
								progress:frameProgress,
								key:name
							})
						}else{
							frameData[stylePro]=[{
								progress:frameProgress,
								key:name
							}]
						}
						this.progressList[nodeId+"_"+name]=frameProgress
					}
				}
				for(let key in frameData){
					frameData[key].sort((x,y)=>{
						return x.progress - y.progress
					})
					blockData[key].blockWidth=frameData[key][frameData[key].length-1].progress-blockData[key].blockLeft
				}
				if(resetFrame){
					this.frameData=frameData
					this.blockData=blockData
				}
			},
			focusFrame:function(item){
				if(this.focusFrameProp===item){
					this.focusFrameProp=null
				}else{
					this.focusFrameProp=item
				}
			},
			//新增变化属性
			addNewPropertype:function(propertype){
				let delay=this.duration*this.progress
				let duration=this.duration-delay
				let frameData={}
				let key
				if(propertype.toLowerCase().includes('color')){
					key="FRAMETAG"+this.createKey()+"-"+propertype
				}else{
					key=propertype+"_frame"+this.createKey()+"_tag"
				}
				this.animationView[this.nowEditNodeId].frameTagList[propertype]=key
				let data=this.newProperType.data
				let value=data[propertype].value,unit=data[propertype].unit
				frameData[value]=value
				frameData.startValue=value
				frameData.endValue=value
				frameData.delay=delay
				frameData.duration=duration
				if(unit)
					this.animationView[this.nowEditNodeId].frameUnit[propertype]=unit
				this.animationView[this.nowEditNodeId].propertype[key]=frameData
				this.loadAnimationView()
				System.showToast("添加成功")
			},
			addKeyFrame:function(targetProgress=this.progress,targetStartValue=null,targetEndValue=null,focusFrameProp=null){
				
				//设置当前选中帧的位置
				//设置指向
				//读取此属性的帧位置
				let prop=focusFrameProp === null ? this.focusFrameProp : focusFrameProp
				console.log('targetEnd')
				let progress=this.frameData[prop]
				
				let random=Math.random().toString(32).slice(2,5)
				//判断是否需要为带有颜色值的属性重新标注
				let newKey=prop.toLowerCase().includes("color")?'FRAMETAG'+random+"-"+prop:prop+"_frame"+random+"_tag"
				let preKey=false,preFrame=null,afterFrame=null
				let data,delay=0,endValue=0,startValue=0
				let temp=this.animationView[this.nowEditNodeId].propertype
				for(let i=0;i<progress.length;i++){
					preFrame=null
					if(targetProgress<progress[i].progress){
						//标记前面有帧
						preKey=true
						//如果选中的时间点大于progress[i],则修改
						//提取progress[i]的前一帧
						for(let key in this.animationView[this.nowEditNodeId].nextTagList){
							if(this.animationView[this.nowEditNodeId].nextTagList[key]==progress[i].key){
								preFrame=key
								afterFrame=progress[i].key
								this.animationView[this.nowEditNodeId].nextTagList[preFrame]=newKey//设置上一帧的下一帧指向为当前生成的新帧名
								this.animationView[this.nowEditNodeId].nextTagList[newKey]=afterFrame//将当前生成的下一帧指向为后一帧
								//delay为上一帧的delay加上duration
								delay=(temp[preFrame].delay || 0)+temp[preFrame].duration
								//endValue为上一帧的结束参数，也是新帧的起始参数
								startValue=temp[preFrame].endValue
								endValue=targetEndValue || 0
								break
							}
						}
						if(!preFrame){
							//标明在表头添加且原来中间没有帧，此时还需要修改frameTagList的首帧指向，且frameData仅有结束点尾帧
							afterFrame=progress[i].key
							this.animationView[this.nowEditNodeId].frameTagList[prop]=newKey
							this.animationView[this.nowEditNodeId].nextTagList[newKey]=progress[i].key//将当前生成的下一帧指向为后一帧
							//延时为原来的起点首帧的延时,即Blockdata中的blockLeft,progress[i].key即原来首帧key,
							try{
								//修改下一帧的
								delay=this.blockData[prop].blockLeft*this.duration//temp[progress[i].key].delay || 0
								endValue=temp[progress[i].key].endValue || 0
								startValue=temp[progress[i].key].startValue || 0 //后一个的起始是前一个的结束
							}catch(e){
								console.error(e)
							}
							
							
							//尾帧的duration减少，且delay变化为新增帧的delay加上duration
							break
						}else{
							break
						}
						break
					}
				}
				if(!preKey){
					//标明在最后添加,则前一帧为progress的最后一个
					alert("最后添加")
					preFrame=progress[progress.length-1].key
					this.animationView[this.nowEditNodeId].nextTagList[preFrame]=newKey
					delay=(temp[preFrame].delay || 0) + temp[preFrame].duration
					endValue=temp[preFrame].endValue
				}
				let duration=(targetProgress*this.duration-delay).toFixed(0)*1
				startValue 	= targetStartValue	=== null?	startValue	:	targetStartValue
				
				endValue 	= targetEndValue	=== null?	endValue	:	targetEndValue
				data={}
				//让新帧和原帧保持不变
				data[startValue]=endValue
				data.delay=delay
				data.duration=duration
				data.endValue=endValue
				data.startValue=startValue
				data.progress=targetProgress
				//修改后一帧的delay和duration,startValue
				if(afterFrame!==null){
					let preDelay=this.animationView[this.nowEditNodeId].propertype[afterFrame].delay
					let preDuration=this.animationView[this.nowEditNodeId].propertype[afterFrame].duration
					this.animationView[this.nowEditNodeId].propertype[afterFrame].duration=preDelay+preDuration-delay-duration
					this.animationView[this.nowEditNodeId].propertype[afterFrame].delay=delay+duration
					//this.animationView[this.nowEditNodeId].propertype[afterFrame].duration-=duration
					let afterData=JSON.parse(JSON.stringify(this.animationView[this.nowEditNodeId].propertype[afterFrame]))
					//删掉原来的startValue
					delete afterData[afterData.startValue]
					let tempValue={}
					tempValue[targetEndValue]=afterData.endValue
					tempValue=Object.assign(tempValue,afterData)
					tempValue.startValue=targetEndValue
					//修改为新的
					this.animationView[this.nowEditNodeId].propertype[afterFrame]=tempValue
					afterData=null
				}
				//设置数据
				this.animationView[this.nowEditNodeId].propertype[newKey]=data
				
				
				
				this.focusFrameProp=null
				if(this.loadTimeout !== null)
					clearTimeout(this.loadTimeout)
				this.loadTimeout=setTimeout(()=>{
					this.progress=0
					this.loadAnimationView()
				},200)
			},
			moveToFrame:function(e,item,index){
				if(!['pause','stop'].includes(this.player._sysTween._state)){
					System.showToast("请暂停动画播放")
					return
				}
				this.isPlaying=true
				let _this=this
				//当index为-1时表示为起点，此时为Blockdata的left
				let progress=index==-1?this.blockData[item].blockLeft:this.frameData[item][index].progress
				let bounding=e.target.getBoundingClientRect()
				let x=bounding.left+bounding.width/2
				if(!this.hasStarted){
					this.timeline.play()
				}
				this.progress=progress
				try{
					document.querySelector('.controller').remove()
				}catch{}
				let a=document.getElementById('bouncyCircle_controller')
				let player=new MojsPlayer({ add: this.timeline,isPlaying:true, 
				parent: a,
				progress:progress-0.01,
				className: "controller",
				rightBound:progress,
				isBounds:true,
				speed:10,
				isSaveState:false});
				setTimeout(()=>{
					try{
						document.querySelector('.controller').remove()
					}catch{}
					this.isPlaying=false
					player=new MojsPlayer({ add: this.timeline,isPlaying:false,
					parent: a,
					progress:progress,
					className: "controller",
					isSaveState:false});
					player.playButton.el.onclick=()=>{
						this.isPlaying=!this.isPlaying
					}
					this.player=player
				},30)
				/*this.focusFrame(item)
				let playNode=document.querySelector("._button_wb9ek_4._button-switch_1putg_4._icon-fork_1n6j9_4._play-button_16uj5_4")
				
				let node=document.querySelector("._player-slider_1h9vh_6 ._slider_1h9vh_15 ._track_1dpwb_5")
				
				var simulateClick = ()=>{
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, x, 20, false, false, false, false, 0, null);
					playNode.dispatchEvent(evt)
					node.dispatchEvent(evt);
				}
				simulateClick();//Why it can not show "input" ?*/
			},
			startMove:function(e,item){
				this.focusFrameProp=item
				let left=this.blockData[item].blockLeft
				let width=this.blockData[item].blockWidth
				let box=document.getElementById(item+"_line").getBoundingClientRect()
				let sideBound=document.getElementById(item+"_line_out").getBoundingClientRect()
				this.lineData={
					sideLeft:sideBound.left,
					sideWidth:sideBound.width,
					left:box.left-sideBound.left,
					width:box.width,
					startX:e.clientX,
					maxLeft:1-box.width/sideBound.width,
					preLeft:left,
					preWidth:width,
					direct:'move',
				}
				this.isDraging=true
			},
			
			startDrag:function(e,item,direct){
				let left=this.blockData[item].blockLeft
				let width=this.blockData[item].blockWidth
				let box=document.getElementById(item+"_line").getBoundingClientRect()
				let sideBound=document.getElementById(item+"_line_out").getBoundingClientRect()
				this.lineData={
					sideLeft:sideBound.left,
					sideWidth:sideBound.width,
					left:box.left-sideBound.left,
					width:box.width,
					startX:e.clientX,
					maxLeft:box.width/sideBound.width,
					preLeft:left,
					preWidth:width,
					direct:direct,
				}
				this.isDraging=true
			},
			draging:function(e,item){
				let delta=e.clientX-this.lineData.startX
				if(this.lineData.direct=='left'){
					//左边拉动
					let left=(this.lineData.left+delta)/this.lineData.sideWidth
					let width=(this.lineData.width-delta)/this.lineData.sideWidth
					if(width<=0){
						this.isDraging=false
						if(confirm('是否删除此属性帧序列')){
							delete this.frameData[item]
							//删除properTypeList中的数据
							let inIndex=this.propertypeList.indexOf(item)
							this.propertypeList.splice(inIndex,1)
							this.loadAnimationView(this.duration)
							return
						}else{
							this.blockData[item].blockLeft=this.lineData.preLeft
							this.blockData[item].blockWidth=this.lineData.preWidth
							return
						}
					}
					this.blockData[item].blockLeft=left
					this.blockData[item].blockWidth=width
				}else if(this.lineData.direct=='right'){
					let width=(this.lineData.width+delta)/this.lineData.sideWidth
					if(width<=0){
						this.isDraging=false
						if(confirm('是否删除此属性帧序列')){
							delete this.frameData[item]
							//删除properTypeList中的数据
							let inIndex=this.propertypeList.indexOf(item)
							this.propertypeList.splice(inIndex,1)
							this.loadAnimationView(this.duration)
							return
						}else{
							this.blockData[item].blockLeft=this.lineData.preLeft
							this.blockData[item].blockWidth=this.lineData.preWidth
							return
						}
					}
					//右边拉动
					this.blockData[item].blockWidth=width
				}else{
					//移动
					let left=(this.lineData.left+delta)/this.lineData.sideWidth
					if(left<=0){
						left=0
					}else if(left>=this.lineData.maxLeft){
						left=this.lineData.maxLeft
					}
					this.blockData[item].blockLeft=left
				}
			},
			endDrag:function(item){
				
				this.isDraging=false
				let frameData=this.frameData[item]
				let left=this.blockData[item].blockLeft || 0
				if(this.lineData.direct=='left'){
					this.progress=0
					if(left<frameData[0].progress){
						//如果新的左端小于原来首端的位置，则只需要重新设置起始点,同时修改首帧时长
						let deltaDuration=(frameData[0].progress-left)*this.duration
						let key=frameData[0].key
						this.animationView[this.nowEditNodeId].propertype[key].delay=left*this.duration
						this.animationView[this.nowEditNodeId].propertype[key].duration=(frameData[0].progress-left)*this.duration
						this.loadAnimationView(this.duration)
						return
					}
					//检查小的
					let overflowIndex=0
					for(let i=0;i<frameData.length;i++){
						if(left>frameData[i].progress){
							overflowIndex++
						}else{
							break
						}
					}
					if(confirm("是否删除越出范围的帧节点2？")){
						let key
						for(let i=0;i<overflowIndex;i++){
							key=frameData[i].key
							delete this.animationView[this.nowEditNodeId].propertype[key]
							try{
								delete this.animationView[this.nowEditNodeId].nextTagList[key]
							}catch{}
						}
						//首帧属性名
						key=frameData[overflowIndex].key
						//设置首帧delay
						this.animationView[this.nowEditNodeId].propertype[key].delay=left*this.duration
						this.animationView[this.nowEditNodeId].propertype[key].duration=(frameData[overflowIndex].progress-left)*this.duration
						//重设首帧指向
						this.animationView[this.nowEditNodeId].frameTagList[item]=key
						
						this.loadAnimationView(this.duration)
					}else{
						//恢复原有
						this.blockData[item].blockLeft=this.lineData.preLeft
						this.blockData[item].blockWidth=this.lineData.preWidth
					}
				}else if(this.lineData.direct=='right'){
					this.progress=0
					left+=this.blockData[item].blockWidth
					let lastIndex=frameData.length-1
					if(left>frameData[lastIndex].progress){
						//如果新的右端大于原尾端的位置，则只需要设置尾帧的duration
						let deltaDuration=(frameData[0].progress-left)*this.duration
						let key=frameData[lastIndex].key
						this.animationView[this.nowEditNodeId].propertype[key].duration=left*this.duration-(this.animationView[this.nowEditNodeId].propertype[key].delay || 0)
						
						this.loadAnimationView()
						return
					}
					//检查大的
					let overflowIndex=lastIndex
					for(let i=lastIndex;i>-1;i--){
						if(left>frameData[i].progress){
							break
						}else{
							overflowIndex--
						}
					}
					if(lastIndex==0){
						//只有一个帧，则只改变duration
						this.animationView[this.nowEditNodeId].propertype[frameData[0].key].duration=this.blockData[item].blockWidth*this.duration
						this.loadAnimationView()
						return
					}
					if(confirm("是否删除越出范围的帧节点1？")){
						let key
						for(let i=overflowIndex+2;i<lastIndex;i++){
							key=frameData[i].key
							delete this.animationView[this.nowEditNodeId].propertype[key]
							try{
								delete this.animationView[this.nowEditNodeId].nextTagList[key]
							}catch{}
						}
						if(overflowIndex==-1){
							//全部删除完
							//删除frameData中的数据
							delete this.frameData[item]
							//删除properTypeList中的数据
							let inIndex=this.propertypeList.indexOf(item)
							this.propertypeList.splice(inIndex,1)
							this.loadAnimationView(this.duration)
							return
						}
						//尾帧属性名
						key=frameData[overflowIndex+1].key
						//设置尾帧duration
						this.animationView[this.nowEditNodeId].propertype[key].duration=left*this.duration-this.animationView[this.nowEditNodeId].propertype[key].delay
						
						this.loadAnimationView()
					}else{
						//恢复原有
						this.blockData[item].blockLeft=this.lineData.preLeft
						this.blockData[item].blockWidth=this.lineData.preWidth
					}
				}else{
					//结束移动，仅修改delay
					let key=frameData[0].key
					let delta=left-this.lineData.preLeft
					if(Math.abs(delta)<0.01) return
					for(let i=0;i<frameData.length;i++){
						if(this.animationView[this.nowEditNodeId].propertype[frameData[i].key].delay)
							this.animationView[this.nowEditNodeId].propertype[frameData[i].key].delay+=delta*this.duration
						else
							this.animationView[this.nowEditNodeId].propertype[frameData[i].key].delay=delta*this.duration
					}
					this.loadAnimationView()
				}
			},
			removeFrame:function(drag=false){
				let styleItem=this.menu.item,index=this.menu.index
				if(drag || confirm("确认删除此帧节点?")){
					let key=this.frameData[styleItem][index].key
					//检测是否为首帧
					if(index==0){
						//若删除的为首帧，则检测是否有后一帧
						if(this.frameData[styleItem].length==1){
							//原来只有一帧,则全部删除，则将整个属性删除
							this.removeProperType(styleItem)
							return
						}
					}
					//否则就是删除首帧之后还有后帧或删除的不是首帧,提取被删除帧的delay和duration
					let delay=this.animationView[this.nowEditNodeId].propertype[key].delay
					let duration=this.animationView[this.nowEditNodeId].propertype[key].duration
					//修改后一帧
					if(index<(this.frameData[styleItem].length-1)){
						//后面还有帧且删除的非最后一帧
						let afterKey=this.frameData[styleItem][index+1].key
						this.animationView[this.nowEditNodeId].propertype[afterKey].delay=delay
						this.animationView[this.nowEditNodeId].propertype[afterKey].duration+=duration
						//重设变化取值
						//起始键名
						let preStart=this.animationView[this.nowEditNodeId].propertype[key].startValue
						//被删除的帧的后一帧的起始值键名
						let afterPreStart=this.animationView[this.nowEditNodeId].propertype[afterKey].startValue
						let	afterPreEnd=this.animationView[this.nowEditNodeId].propertype[afterKey].endValue
						//删除后一帧的数据变化起始点
						delete this.animationView[this.nowEditNodeId].propertype[afterKey][afterPreStart]
						//后一帧的起始点变为当前被删除帧的起始点，结束点不变
						this.animationView[this.nowEditNodeId].propertype[afterKey][preStart]=afterPreEnd
						//修改startValue参数，endValue不变
						this.animationView[this.nowEditNodeId].propertype[afterKey].startValue=preStart
						//修改前帧指向
						if(index==0){
							//删除的为首帧，修改frameTagList指向为后一帧
							this.animationView[this.nowEditNodeId].frameTagList[styleItem]=afterKey
						}else{
							//否则删除的不是首帧,修改前帧指向
							let beforeKey=this.frameData[styleItem][index-1].key
							this.animationView[this.nowEditNodeId].nextTagList[beforeKey]=afterKey
						}
						//有两帧以上且非最后一帧时，nextTagList中会有记录，删除被删除的帧即可
						if(this.frameData[styleItem].length>1){
							try{
								delete this.animationView[this.nowEditNodeId].nextTagList[key]
							}catch{}
						}
					}
					//删除最后一个时不需要重新设置，只需要删除
					try{
						delete this.animationView[this.nowEditNodeId].propertype[key]
					}catch{}
					//需要重新设置duration时长
					this.loadAnimationView()
				}
			},
			saveEditData:function(){
				let item=this.editing.item
				let index=this.editing.index
				let endValue,key
				if(index!==-1){
					key=this.frameData[item][index].key
					let startValue=this.animationView[this.nowEditNodeId].propertype[key].startValue
					this.animationView[this.nowEditNodeId].propertype[key].endValue=this.editing.value
					this.animationView[this.nowEditNodeId].propertype[key][startValue]=this.editing.value
					//还需要修改下一帧
					if(index < this.frameData[item].length-1){
						//删除下一帧的起点
						let nextFrame=this.frameData[item][index+1].key
						startValue=this.animationView[this.nowEditNodeId].propertype[nextFrame].startValue
						endValue=this.animationView[this.nowEditNodeId].propertype[nextFrame].endValue
						delete this.animationView[this.nowEditNodeId].propertype[nextFrame][startValue]
						this.animationView[this.nowEditNodeId].propertype[nextFrame].startValue=this.editing.value
						let temp={}
						temp[this.editing.value]=endValue
						for(let nameKey in this.animationView[this.nowEditNodeId].propertype[nextFrame]){
							try{
								if(temp[nameKey]===undefined)
									temp[nameKey]=this.animationView[this.nowEditNodeId].propertype[nextFrame][nameKey]
							}catch{}
						}
						
						this.animationView[this.nowEditNodeId].propertype[nextFrame]=JSON.parse(JSON.stringify(temp))
						temp=null					
					}
				}else{
					//index为-1时修改首帧的startValue
					key=this.frameData[item][0].key
					let startValue=this.animationView[this.nowEditNodeId].propertype[key].startValue
					endValue=this.animationView[this.nowEditNodeId].propertype[key].endValue
					delete this.animationView[this.nowEditNodeId].propertype[key][startValue]
					this.animationView[this.nowEditNodeId].propertype[key].startValue=this.editing.value
					this.animationView[this.nowEditNodeId].propertype[key][this.editing.value]=endValue
				}
				
				//this.animationView[this.nowEditNodeId].propertype[key]=JSON.parse(JSON.stringify(temp))
				this.editing.show=false
				this.loadAnimationView()
				setTimeout(()=>{
					System.showToast("保存成功")
				},500)
				//记录操作历史
			},
			cancleEdting:function(){
				if(confirm("确认取消对此帧的编辑")){
					this.editing.show=false
				}
			},
			saveRepeat:function(){
				this.animationView[this.nowEditNodeId].repeatTimes=this.repeat.times*1
				this.repeat.show=false
				setTimeout(()=>{
					alert("保存成功")
				},500)
			},
			cancleRepeat:function(){
				if(confirm("确认取消对此帧的编辑")){
					this.repeat.show=false
				}
			},
			//删除属性
			removeProperType:function(item,notAsk=true){
				if(notAsk || confirm("确认删除属性"+item)){
					let styleItem=item,index=0
					let key=this.animationView[this.nowEditNodeId].frameTagList[styleItem]+""
					try{
						delete this.animationView[this.nowEditNodeId].frameTagList[styleItem]
					}catch{}
					//遍历所有属性
					//原本就没有帧序列，只有首帧和尾帧,则代表数据中只有一项变化,即nextTagList中不存在
					for(let i=0;i<this.frameData[item].length;i++){
						key=this.frameData[styleItem][i].key
						try{
							delete this.animationView[this.nowEditNodeId].propertype[key]
						}catch{}
					}
					//删除frameData中的数据
					delete this.frameData[styleItem]
					//删除properTypeList中的数据
					let inIndex=this.propertypeList.indexOf(styleItem)
					this.propertypeList.splice(inIndex,1)
					this.progress=0
					if(this.propertypeList.length==0){
						this.emptyValue.properType=true
						this.player=null
						this.timeline=null
						try{
							this.$refs['timelineController'].remove()
						}catch{}
						return
					}
					
					//需要重新设置duration时长
					this.loadAnimationView()
				}
			},
			callRepeatBar:function(e,item){
				this.repeat={
					show:true,
					left:e.clientX,
					top:e.clientY,
				}
			},
			//重置时长
			checkDuration:function(){
				if(this.realDuration==this.duration){
					return
				}
				let durationDelta=this.realDuration-this.duration
				let hasSum=0,frameKey,avg=0,length
				for(let key in this.frameData){
					//duration平分，delay根据遍历次数乘上差值
					hasSum=0
					length=this.frameData[key].length
					avg=durationDelta/length
					for(let i=0;i<length;i++){
						frameKey=this.frameData[key][i].key
						if(i>=length-1){
							avg=durationDelta-hasSum
						}
						this.animationView[this.nowEditNodeId].propertype[frameKey].delay+=avg*i
						this.animationView[this.nowEditNodeId].propertype[frameKey].duration+=avg
						hasSum+=avg
					}
				}
				this.loadAnimationView()
			},
			//新增变化节点
			addNode:function(nodeId){
				console.log('hello')
				if(this.eventListIndex<0 || this.eventKeyList.length===0)
				{
					System.showToast("添加失败，未选择交互动作")
					return
				}
				System.setTempStyleData(nodeId)
				try{
					nodeId=nodeId.replace('$NODE:','').replace('_accepter',"")
				}catch{}
				
				this.animationView["node_"+nodeId]={
					repeatTimes:0,
					frameUnit:{},
					frameTagList:{},
					nextTagList:{},
					propertype:{
						el:'#'+nodeId
					},
				}
				this.setEvent(this.eventListIndex,this.nodeList.length)
			}
		}
	}
</script>
<style scoped>
@import url(./animateData.css);
</style>