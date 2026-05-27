<template>
  <div id="projectContainer">
    <header style="user-select: none;">
		<div class="recoverButton" v-if="editingMode==2" title="退出动画模式" @click="recoverMode(2,0)">
			<svg t="1667917831614" class="icon" style="margin-top: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24106" width="20" height="20"><path d="M778.965749 128.759549l-383.064442 383.063419 388.097062 388.096039-0.070608 0.033769c12.709463 13.137205 20.529569 31.024597 20.529569 50.731428 0 40.376593-32.736589 73.112158-73.115228 73.112158-19.705807 0-37.591153-7.819083-50.730405-20.528546l-0.034792 0.035816L241.890654 564.622498l0.035816-0.035816c-13.779841-13.281491-22.3838-31.915897-22.3838-52.585659 0-0.071631 0-0.106424 0-0.178055 0-0.072655 0-0.10847 0-0.144286 0-20.669762 8.603959-39.341007 22.3838-52.622498l-0.035816-0.034792L680.573835 20.337187l0.180102 0.179079c13.139252-12.5662 30.950919-20.313651 50.587142-20.313651 40.378639 0 73.115228 32.736589 73.115228 73.114205C804.455283 95.485725 794.567076 115.334795 778.965749 128.759549z" p-id="24107" fill="#ffffff"></path></svg>
		</div>
		<div style="margin-left:16px;margin-top:8px;float: left;font-weight: normal;width: 100px;height: 30px;line-height: 30px;background-color: var(--mainColorBlue2);color: white;border-radius: 10px;cursor: pointer;">
			{{['普通设计模式','浮动设计模式','动画编辑模式'][editingMode]}}
		</div>
		<!--顶部工具栏-->
		<headerTools></headerTools>
      <button class="share">
        <img
          style="width: 150%; heiht: 150%; object-fit: cover"
          src="../assets/icons/setting.png"
        />
      </button>
      <button class="share">
        <img
          style="width: 150%; heiht: 150%; object-fit: cover"
          src="../assets/icons/yl.png"
        />
      </button>
      <button class="share">
        <img
          style="width: 135%; heiht: 135%; object-fit: cover"
          src="../assets/icons/send.png"
        />
      </button>
    </header>
	<!--用于添加临时计算缩放比例-->
	<div id="_hiddenNode_" style="position: absolute;left: -500vw;top:-500vh;z-index: -1;width: 1px;height:1px;">
	</div>
	<!--提示框-->
	<div class="headerTip" v-if="headerTip.show">
		<div style="position: absolute;right:8px;top:5px;height:20px;width:20px">
		</div>
		{{headerTip.text}}
	</div>
	<!--顶层按钮-->
	<div class="headerTip" v-if="headerButton.show" @click="headerButton.event">
		<div style="position: absolute;right:8px;top:5px;height:20px;width:20px">
		</div>
		{{headerButton.text}}
	</div>
    <main id="main">
      <!--左侧栏-->
      <leftbar id="leftBar" @openLeftBar='openLeftBar'>
      </leftbar>
      <!--中央部分-->
      <div id="drawMain" >
        <!--绘制部分-->
        <div 
          id="projectFrameOut"
		  style="overflow: scroll;"
          @mousedown="screenDown"
          @mouseup="screenUp"
        >
		<!--@mousemove="screenMove"-->
        <div  id="projectFrameInner" class='projectFrameInner'  style="top: 1%; left: 1%;z-index: 1;">
            <div
              id="scaleDom"
              style="
                position: absolute;
                z-index: 99999;
                background-color: rgba(0, 0, 0, 0);
                border: none;
                width: 0;
                height: 0;
              "
            ></div>
			<div
			  id="selectDomDiv"
			  style="
			    background-color:rgba(54,98,236,0.5);
				border:1px solid var(--mainColorBlue);
			    position: absolute;
			    width: 0;
			    height: 0;
			    top: 0;
			    left: 0;
			    z-index: 99999;
			  "
			></div>
        </div>
		<div  id="focusLayer" @mousedown.stop="closeAllView" @mouseup="screenUp" v-if="showFocusLayer" class='projectFrameInner' style="background:#212121;top: 1%; left: 1%;z-index: 2;">
		</div>
        </div>
        <!--底部栏-->
        <div id="bottomBar" style="user-select: none;">
          <button class="bottomBarButton">数据源</button>
          <button class="bottomBarButton" style="width: 100px">
            隐藏标注点
          </button>
          <button class="bottomBarButton">页面属性</button>
          <button id="bottomCenterButton"></button>
          <div class="containerDevice">
            <button
              class="deviceButton"
              @click="changeDevice"
              data-device="0"
              :style="{
                backgroundImage: `url(${
                  nowDevice == 0 ? imgs.chosedWeb : imgs.noChoseWeb
                })`,
                backgroundColor: `${
                  nowDevice == 0 ? 'var(--mainColorBlue)' : 'white'
                }`,
              }"
            ></button>
            <button
              class="deviceButton"
              @click="changeDevice"
              data-device="1"
              :style="{
                backgroundImage: `url(${
                  nowDevice == 1 ? imgs.chosedPhone : imgs.noChosePhone
                })`,
                backgroundColor: `${
                  nowDevice == 1 ? 'var(--mainColorBlue)' : 'white'
                }`,
              }"
            ></button>
            <button
              class="deviceButton"
              @click="changeDevice"
              data-device="2"
              :style="{
                backgroundImage: `url(${
                  nowDevice == 2 ? imgs.chosedPad : imgs.noChosePad
                })`,
                backgroundColor: `${
                  nowDevice == 2 ? 'var(--mainColorBlue)' : 'white'
                }`,
              }"
            ></button>
          </div>
        </div>
      </div>
      <!--右侧栏-->
      <div id="rightBar" 
	  :style="{transform:`${frameOutMoveStatus ?'translateX(100%)':''}`,opacity:`${frameOutMoveStatus ?'0':'1'}`}"
	  style="display: flex;z-index: 99;transition: .2s;">
			<!--用于取消因为拖动引起的文本选择-->
			<input class="hiddenInput" id="temp_drawLine"/>
          <!--显示当前操作组-->
          <div class="rightOptionList">
            <!--组件列表按钮-->
            <button class="rightOptionList_item" @click="openDomScale"
            data-target="jg"
            :style="{
                backgroundImage: `url(${
                  imgs.imgJG 
                })`,
                backgroundColor: `${
                  rightBarOption == 'jg' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
            <!--子组件列表与解锁按钮-->
            <button class="rightOptionList_item" v-if="isChosedOne()" @click="openRightBar"
            data-target="jg_child"
            :style="{
                backgroundImage: `url(${
                  imgs.imgJGCHILD 
                })`
              }">
            </button>
            <button class="rightOptionList_item"
			@click="openRightBar"
			data-target="props"
            :style="{
                backgroundImage: `url(${
                  imgs.imgPROPS 
                })`,
                backgroundColor: `${
                  rightBarOption == 'props' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
            <!--数据集按钮-->
            <button class="rightOptionList_item"
			@click="openRightBar"
			data-target="sjj"
            :style="{
                backgroundImage: `url(${
                  imgs.imgSJJ
                })`,
                backgroundColor: `${
                  rightBarOption == 'sjj' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
			<!--事件按钮-->
			<button class="rightOptionList_item"
			@click="openRightBar"
			data-target="event"
			:style="{
			    backgroundImage: `url(${
			      imgs.imgEvent
			    })`,
			    backgroundColor: `${
			      rightBarOption == 'event' ? 'var(--mainColorGray3)' : 'transparent'
			    }`
			  }">
			</button>
          </div>
		  <quickEditDom 
		  v-show="rightBarOption=='style'"
		  id="quickEditDom"
		  style="
		  position: absolute;
		  width: 210px;    
		  height: 98%;
		  margin-top: 0%;
		  right:0px;
		  z-index:3;
		  transform-origin: right;
		  transition: .2s;
		  /*box-shadow: -2px 2px 15px rgba(0, 0, 0, 0.25);*/
		  background-color: transparent;
		  border-radius:0 10px 10px 0;
		  "
		  :choseGroup="choseGroup"
		  ref="drawUIQucikEdit"
		  ></quickEditDom>
		  <propsBord v-show="rightBarOption=='props'" ref="props"></propsBord>
      </div>
        <components
      id="components"
      style="
        transform-origin: left;
        transition: 0.05s;
        position: absolute;
        height: 440px;
        width: 310px;
        left: 85px;
        top: 10vh;
        z-index: 3;
      "
      ref="components"
    ></components>
      <support
      id="support"
      style="
        transform-origin: left;
        transition: 0.05s;
        position: absolute;
        left: 55px;
        top: 23vh;
        z-index: 3;
      "
      v-for="i in components.support"
      :key="i"
    ></support>


	<hub ref="hub" v-if="components.hub == 1"  style="position: absolute;top:13vh;left: 50%;transform: translateX(-50%);transform-origin: center;" class="hubClass">
		
	</hub>
	
    <!--加载组件-->
    <div v-if="$_isShowComponent" style="display:none">
        <component v-for="(item,index) in mountedComponent" :key="index"  :is="item.name" style="position:absolute;top:0;left:0;z-index:99" :mountTarget="item.target" :newId="item.newId" :props="item.props"></component>
    </div>
	<!--加载组件-->
	
	<!--缩略图列表-->
	<div id="domTreePlay" style="transform: translateX(125%);overflow-y: hidden;">
		<!--返回上一层-->
		<div id="domTree_back" @click="treeBack" @contextmenu="showLayers" style="color:var(--mainColorBlue) ;margin-top: 5px;position: absolute;top: 0;left: 20%;width: 60%;height: 30px;background-color: transparent;line-height: 30px;text-align: center;font-weight: 400;cursor: pointer;">
			上一层
		</div>
		<input id="tempLayers" style="position: absolute;width: 2px;height: 2px;top:-10px;left:0;z-index: 99;padding: 0;" @blur="closeLayers"/>
		<div id="domTree_back_layers" style="display: none;background-color: rgba(255,255,255,0.95);left:15%;border-radius: 10px;position: absolute;top:35px;width:80%;height:300px;overflow-y: scroll;z-index: 105;box-shadow: 0 2px 10px var(--mainColorGray2);">
			<div class="treeLayersItem" v-for="(item,index) in dom.layers" :key="index" @mousedown="treeBack($event,index)">
				{{item.id}}
			</div>
		</div>
		<!--缩略图与组件树切换-->
		<div id="scale2tree"  >
			
			<div id="showST" @click="scale2tree" style="transition: .2s;padding: 0;margin: 0;width: 30px;hieght:30px;position: absolute;top: 0;left: 0;">
				<svg t="1653580088743" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top: 8px;" p-id="1923" width="15" height="15"><path d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0" p-id="1924" fill="#8a8a8a"></path></svg>
			</div>
			<div id="setST" style="transition: .2s;display: flex;flex-direction: column;width: 100%;height: 60px;transform: scale(0);transform-origin: center;">
				<button class="STitem" data-target="0" @mousedown="setSTAction($event)">缩略图</button>
				<button class="STitem" data-target="1" @mousedown="setSTAction($event)" style="border-top: 2px solid var(--mainColoGray2);margin-top: 2px;">结构树</button>
			</div>
		</div>
		<!--缩略图与组件树切换-->
		<input id="tempST" style="position: absolute;width: 2px;height: 2px;top:-10px;left:0;z-index: 99;padding: 0;" @blur="closeST"/>
		<div id="scaleDomList" style="width: 100%;height: calc(100% - 30px);position: absolute;top: 30px;">
		<!--缩略图列表-->
			<div class="treeItem" :id="'v_'+domId"  v-for="(domId,index) in tree.show" :key="index">
				<div style="height:100%;width:180px;position:absolute;top:0;left:0;z-index:2" :data-domid="domId" @click="treeNodeOnChosed"></div>
					<div class="treeItem_DomScale" style="z-index:1" > 
						<div style="background-color:transparent;width:174px;height:55px;" :style="{transform:`scale(${domListScales[index]})`}" v-html="getScaleDom(domId,null,index)"></div>
					</div>
					<!--button class="callEdit" :data-domid="domId"  @click="callQuickEdit" style="position:absolute;top:7px;height:45px;left:2px;background-color:var(--mainColorBlue);width:20px;border-radius:10px"></button-->
					<h4 style="margin:0;" class="treeDomText">{{domId}}</h4>
				</div>
			<div style="position: absolute;right:-10px;width:10px;top: 0px;height: 40px;background-color: var(--mainColorGreen);border-radius: 5px;"></div>
		</div>
		<!--组件树列表-->
		<div id="treeDomList" style="width: 100%;height: calc(100% - 30px);position: absolute;top: 30px;transform:scale(0);z-index: 99;">
			<div class="treeItem_tree" :id="'v_'+domId" v-for="(domId,index) in getDomTrees()" :key="'_'+index">
				<div style="height:100%;width:100%;position:absolute;top:0px;left:0;z-index:2" :data-domid="domId" @click="treeNodeOnChosed"></div>
					<div class="treeItem_DomTree" style="z-index:1" > 
						{{domId}}
					</div>
		</div>
		</div>
	</div>
    </main>
	
	<eventEdit style="right: 0;" v-show="showEventEdit" @close="closeEventEdit"></eventEdit>
	<div v-for="(item,index) in toastList">
		<drawUiToast :text="item.text" :duration="item.duration" @close="closeToast(index)"></drawUiToast>
	</div>
	
	<!--控制器,用于控制css，js变量提供列表-->
	<provideControl ref="provideControl"></provideControl>
	
	<!--状态管理器-->
	<status-controller ref="statusController"></status-controller>
	<!--动画编辑器-->
	<animateEditor></animateEditor>
	<!--对齐线接收点-->
	<!--左边-->
	<div v-if="alignLine.direct=='x' && alignBound.show" @mouseenter="enter('left')"  @mouseleave="leave"
		class="alignCircle"
		:style="{top:`${alignBound.top+alignBound.height/2-9}px`,left:`${alignBound.left-20}px`}">
		<div style="position: relative;width:100%;height:100%;margin:1px;margin-top: -2px;">
				</div>
			<svg t="1666255818506" class="icon" viewBox="0 0 1024 1024" style="position: absolute;left: 0;top:0" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12674" width="20" height="20"><path d="M512.00494408 444.59558129c-18.62347388 0-34.51300049 6.60003662-47.64880418 19.72595215-13.1852417 13.1852417-19.75561523 29.08465576-19.75561523 47.67846656 0 18.58886742 6.57531762 34.49322486 19.75561523 47.64880347 13.13580298 13.15063453 29.02532959 19.75561523 47.64880418 19.75561524 18.61358643 0 34.47344994-6.60003662 47.63891602-19.75561524 13.1852417-13.15063453 19.75561523-29.05499268 19.75561523-47.64880347 0-18.58886742-6.57531762-34.49322486-19.75561523-47.67846656-13.16546607-13.12591552-29.02532959-19.72595215-47.63891602-19.72595215m0-67.40441941c37.22717286 0 68.98150635 13.15063453 95.32727004 39.53100609 26.33587623 26.31610132 39.51123047 58.1248169 39.51123047 95.32727075 0 37.20739722-13.17535424 69.01611352-39.51123047 95.33221411-26.35070777 26.35565185-58.10009789 39.53100609-95.32727004 39.5310061-37.24694848 0-68.98150635-13.17535424-95.37670946-39.5310061-26.30126977-26.31610132-39.50134301-58.1248169-39.50134229-95.33221411 0-37.20245385 13.20007325-69.01116943 39.50134229-95.32727075 26.40014648-26.38037086 58.12976098-39.53100609 95.37670946-39.53100609m0-168.55554176c-41.09820557 0-80.41168189 8.0337522-117.84155296 24.09136987-37.46447753 16.06256104-69.73297095 37.62762451-96.78076197 64.63586425-27.04779029 27.06756592-48.61779785 59.31134033-64.65563916 96.79064942-16.04772949 37.48425317-24.07159424 76.79772949-24.09136987 117.84649634-0.02966309 41.04876685 8.00408912 80.36224389 24.09136987 117.84649634 16.06750512 37.47930908 37.61773705 69.72308349 64.65563916 96.79064942 27.02801538 27.00823974 59.27673316 48.57330323 96.78076197 64.63586425 37.47930908 16.05761695 76.78784203 24.09136987 117.84155296 24.09136988 41.05865502 0 80.32269263-8.0337522 117.8316648-24.09136988 37.51391625-16.06256104 69.75769067-37.62762451 96.77087379-64.63586425 27.00823974-27.06756592 48.57824731-59.31134033 64.66552734-96.79064942 16.06750512-37.48425317 24.12597633-76.79772949 24.09136988-117.84649634-0.01977563-41.04876685-8.04364038-80.36224389-24.09136988-117.84649634-16.05761695-37.47930908-37.60784888-69.72308349-64.66552734-96.79064942-27.03790283-27.00823974-59.30639625-48.57330323-96.77087379-64.63586425-37.424927-16.05761695-76.74334741-24.09136987-117.8316648-24.09136987m0-67.42419434c50.39758301 0 98.44683814 9.79376244 144.16259766 29.35656762 45.74047852 19.54797364 85.14788818 45.89868141 118.27166701 79.00268532 33.08422828 33.07434083 59.40527367 72.50152612 78.98291039 118.23706054C872.99975586 413.52844214 882.78857422 461.60241699 882.78857422 512c0 50.39758301-9.78881836 98.44189477-29.36645508 144.19226074-19.57763672 45.72564698-45.89868141 85.16271972-78.98291039 118.22717309-33.12377953 33.11389136-72.52624512 59.46459984-118.27166701 79.01257277C610.45178223 872.99975586 562.4025271 882.78857422 512 882.78857422c-50.40747047 0-98.45672632-9.79376244-144.2021482-29.35656762-45.72070289-19.54797364-85.1182251-45.89868141-118.24200463-79.01257277-33.11883545-33.06445336-59.43493676-72.50152612-79.00268531-118.22717308C150.96563697 610.44189477 141.21142578 562.39758301 141.21142578 512c0-50.39758301 9.75421118-98.47155786 29.34667945-144.19226074 19.56774926-45.73059106 45.88384986-85.16271972 79.00268602-118.23706055 33.12377953-33.10400391 72.52130103-59.45471167 118.24200392-79.00268531C413.54821777 151.00024414 461.5974729 141.21142578 512.00494408 141.21142578" p-id="12675" fill="#FF8F1F"></path></svg>
	</div>
	<!--上边-->
	<div v-if="alignLine.direct=='y' && alignBound.show" @mouseenter="enter('top')"  @mouseleave="leave"
		class="alignCircle" 
		:style="{left:`${alignBound.left+alignBound.width/2-9}px`,top:`${alignBound.top-20}px`}">
		<div style="position: relative;width:100%;height:100%;margin:1px;margin-top: -2px;">
			</div>
		<svg t="1666255818506" class="icon" viewBox="0 0 1024 1024" style="position: absolute;left: 0;top:0" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12674" width="20" height="20"><path d="M512.00494408 444.59558129c-18.62347388 0-34.51300049 6.60003662-47.64880418 19.72595215-13.1852417 13.1852417-19.75561523 29.08465576-19.75561523 47.67846656 0 18.58886742 6.57531762 34.49322486 19.75561523 47.64880347 13.13580298 13.15063453 29.02532959 19.75561523 47.64880418 19.75561524 18.61358643 0 34.47344994-6.60003662 47.63891602-19.75561524 13.1852417-13.15063453 19.75561523-29.05499268 19.75561523-47.64880347 0-18.58886742-6.57531762-34.49322486-19.75561523-47.67846656-13.16546607-13.12591552-29.02532959-19.72595215-47.63891602-19.72595215m0-67.40441941c37.22717286 0 68.98150635 13.15063453 95.32727004 39.53100609 26.33587623 26.31610132 39.51123047 58.1248169 39.51123047 95.32727075 0 37.20739722-13.17535424 69.01611352-39.51123047 95.33221411-26.35070777 26.35565185-58.10009789 39.53100609-95.32727004 39.5310061-37.24694848 0-68.98150635-13.17535424-95.37670946-39.5310061-26.30126977-26.31610132-39.50134301-58.1248169-39.50134229-95.33221411 0-37.20245385 13.20007325-69.01116943 39.50134229-95.32727075 26.40014648-26.38037086 58.12976098-39.53100609 95.37670946-39.53100609m0-168.55554176c-41.09820557 0-80.41168189 8.0337522-117.84155296 24.09136987-37.46447753 16.06256104-69.73297095 37.62762451-96.78076197 64.63586425-27.04779029 27.06756592-48.61779785 59.31134033-64.65563916 96.79064942-16.04772949 37.48425317-24.07159424 76.79772949-24.09136987 117.84649634-0.02966309 41.04876685 8.00408912 80.36224389 24.09136987 117.84649634 16.06750512 37.47930908 37.61773705 69.72308349 64.65563916 96.79064942 27.02801538 27.00823974 59.27673316 48.57330323 96.78076197 64.63586425 37.47930908 16.05761695 76.78784203 24.09136987 117.84155296 24.09136988 41.05865502 0 80.32269263-8.0337522 117.8316648-24.09136988 37.51391625-16.06256104 69.75769067-37.62762451 96.77087379-64.63586425 27.00823974-27.06756592 48.57824731-59.31134033 64.66552734-96.79064942 16.06750512-37.48425317 24.12597633-76.79772949 24.09136988-117.84649634-0.01977563-41.04876685-8.04364038-80.36224389-24.09136988-117.84649634-16.05761695-37.47930908-37.60784888-69.72308349-64.66552734-96.79064942-27.03790283-27.00823974-59.30639625-48.57330323-96.77087379-64.63586425-37.424927-16.05761695-76.74334741-24.09136987-117.8316648-24.09136987m0-67.42419434c50.39758301 0 98.44683814 9.79376244 144.16259766 29.35656762 45.74047852 19.54797364 85.14788818 45.89868141 118.27166701 79.00268532 33.08422828 33.07434083 59.40527367 72.50152612 78.98291039 118.23706054C872.99975586 413.52844214 882.78857422 461.60241699 882.78857422 512c0 50.39758301-9.78881836 98.44189477-29.36645508 144.19226074-19.57763672 45.72564698-45.89868141 85.16271972-78.98291039 118.22717309-33.12377953 33.11389136-72.52624512 59.46459984-118.27166701 79.01257277C610.45178223 872.99975586 562.4025271 882.78857422 512 882.78857422c-50.40747047 0-98.45672632-9.79376244-144.2021482-29.35656762-45.72070289-19.54797364-85.1182251-45.89868141-118.24200463-79.01257277-33.11883545-33.06445336-59.43493676-72.50152612-79.00268531-118.22717308C150.96563697 610.44189477 141.21142578 562.39758301 141.21142578 512c0-50.39758301 9.75421118-98.47155786 29.34667945-144.19226074 19.56774926-45.73059106 45.88384986-85.16271972 79.00268602-118.23706055 33.12377953-33.10400391 72.52130103-59.45471167 118.24200392-79.00268531C413.54821777 151.00024414 461.5974729 141.21142578 512.00494408 141.21142578" p-id="12675" fill="#FF8F1F"></path></svg>
	</div>
	<!--右边-->
	<div v-if="alignLine.direct=='x' && alignBound.show" @mouseenter="enter('right')" @mouseleave="leave"
		class="alignCircle" 
		:style="{top:`${alignBound.top+alignBound.height/2-9}px`,left:`${alignBound.left+alignBound.width+2}px`}">
		<div style="position: relative;width:100%;height:100%;margin:1px;margin-top: -2px;">
				</div>
		<svg t="1666255818506" class="icon" viewBox="0 0 1024 1024" style="position: absolute;left: 0;top:0" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12674" width="20" height="20"><path d="M512.00494408 444.59558129c-18.62347388 0-34.51300049 6.60003662-47.64880418 19.72595215-13.1852417 13.1852417-19.75561523 29.08465576-19.75561523 47.67846656 0 18.58886742 6.57531762 34.49322486 19.75561523 47.64880347 13.13580298 13.15063453 29.02532959 19.75561523 47.64880418 19.75561524 18.61358643 0 34.47344994-6.60003662 47.63891602-19.75561524 13.1852417-13.15063453 19.75561523-29.05499268 19.75561523-47.64880347 0-18.58886742-6.57531762-34.49322486-19.75561523-47.67846656-13.16546607-13.12591552-29.02532959-19.72595215-47.63891602-19.72595215m0-67.40441941c37.22717286 0 68.98150635 13.15063453 95.32727004 39.53100609 26.33587623 26.31610132 39.51123047 58.1248169 39.51123047 95.32727075 0 37.20739722-13.17535424 69.01611352-39.51123047 95.33221411-26.35070777 26.35565185-58.10009789 39.53100609-95.32727004 39.5310061-37.24694848 0-68.98150635-13.17535424-95.37670946-39.5310061-26.30126977-26.31610132-39.50134301-58.1248169-39.50134229-95.33221411 0-37.20245385 13.20007325-69.01116943 39.50134229-95.32727075 26.40014648-26.38037086 58.12976098-39.53100609 95.37670946-39.53100609m0-168.55554176c-41.09820557 0-80.41168189 8.0337522-117.84155296 24.09136987-37.46447753 16.06256104-69.73297095 37.62762451-96.78076197 64.63586425-27.04779029 27.06756592-48.61779785 59.31134033-64.65563916 96.79064942-16.04772949 37.48425317-24.07159424 76.79772949-24.09136987 117.84649634-0.02966309 41.04876685 8.00408912 80.36224389 24.09136987 117.84649634 16.06750512 37.47930908 37.61773705 69.72308349 64.65563916 96.79064942 27.02801538 27.00823974 59.27673316 48.57330323 96.78076197 64.63586425 37.47930908 16.05761695 76.78784203 24.09136987 117.84155296 24.09136988 41.05865502 0 80.32269263-8.0337522 117.8316648-24.09136988 37.51391625-16.06256104 69.75769067-37.62762451 96.77087379-64.63586425 27.00823974-27.06756592 48.57824731-59.31134033 64.66552734-96.79064942 16.06750512-37.48425317 24.12597633-76.79772949 24.09136988-117.84649634-0.01977563-41.04876685-8.04364038-80.36224389-24.09136988-117.84649634-16.05761695-37.47930908-37.60784888-69.72308349-64.66552734-96.79064942-27.03790283-27.00823974-59.30639625-48.57330323-96.77087379-64.63586425-37.424927-16.05761695-76.74334741-24.09136987-117.8316648-24.09136987m0-67.42419434c50.39758301 0 98.44683814 9.79376244 144.16259766 29.35656762 45.74047852 19.54797364 85.14788818 45.89868141 118.27166701 79.00268532 33.08422828 33.07434083 59.40527367 72.50152612 78.98291039 118.23706054C872.99975586 413.52844214 882.78857422 461.60241699 882.78857422 512c0 50.39758301-9.78881836 98.44189477-29.36645508 144.19226074-19.57763672 45.72564698-45.89868141 85.16271972-78.98291039 118.22717309-33.12377953 33.11389136-72.52624512 59.46459984-118.27166701 79.01257277C610.45178223 872.99975586 562.4025271 882.78857422 512 882.78857422c-50.40747047 0-98.45672632-9.79376244-144.2021482-29.35656762-45.72070289-19.54797364-85.1182251-45.89868141-118.24200463-79.01257277-33.11883545-33.06445336-59.43493676-72.50152612-79.00268531-118.22717308C150.96563697 610.44189477 141.21142578 562.39758301 141.21142578 512c0-50.39758301 9.75421118-98.47155786 29.34667945-144.19226074 19.56774926-45.73059106 45.88384986-85.16271972 79.00268602-118.23706055 33.12377953-33.10400391 72.52130103-59.45471167 118.24200392-79.00268531C413.54821777 151.00024414 461.5974729 141.21142578 512.00494408 141.21142578" p-id="12675" fill="#FF8F1F"></path></svg>
	</div>
	<!--下边-->
	<div v-if="alignLine.direct=='y' && alignBound.show" @mouseenter="enter('bottom')" @mouseleave="leave" 
		class="alignCircle" 
		:style="{left:`${alignBound.left+alignBound.width/2-9}px`,top:`${alignBound.top+alignBound.height+2}px`}">
		<div style="position: relative;width:100%;height:100%;margin:1px;margin-top: -2px;">
				</div>
			<svg t="1666255818506" class="icon" viewBox="0 0 1024 1024" style="position: absolute;left: 0;top:0" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12674" width="20" height="20"><path d="M512.00494408 444.59558129c-18.62347388 0-34.51300049 6.60003662-47.64880418 19.72595215-13.1852417 13.1852417-19.75561523 29.08465576-19.75561523 47.67846656 0 18.58886742 6.57531762 34.49322486 19.75561523 47.64880347 13.13580298 13.15063453 29.02532959 19.75561523 47.64880418 19.75561524 18.61358643 0 34.47344994-6.60003662 47.63891602-19.75561524 13.1852417-13.15063453 19.75561523-29.05499268 19.75561523-47.64880347 0-18.58886742-6.57531762-34.49322486-19.75561523-47.67846656-13.16546607-13.12591552-29.02532959-19.72595215-47.63891602-19.72595215m0-67.40441941c37.22717286 0 68.98150635 13.15063453 95.32727004 39.53100609 26.33587623 26.31610132 39.51123047 58.1248169 39.51123047 95.32727075 0 37.20739722-13.17535424 69.01611352-39.51123047 95.33221411-26.35070777 26.35565185-58.10009789 39.53100609-95.32727004 39.5310061-37.24694848 0-68.98150635-13.17535424-95.37670946-39.5310061-26.30126977-26.31610132-39.50134301-58.1248169-39.50134229-95.33221411 0-37.20245385 13.20007325-69.01116943 39.50134229-95.32727075 26.40014648-26.38037086 58.12976098-39.53100609 95.37670946-39.53100609m0-168.55554176c-41.09820557 0-80.41168189 8.0337522-117.84155296 24.09136987-37.46447753 16.06256104-69.73297095 37.62762451-96.78076197 64.63586425-27.04779029 27.06756592-48.61779785 59.31134033-64.65563916 96.79064942-16.04772949 37.48425317-24.07159424 76.79772949-24.09136987 117.84649634-0.02966309 41.04876685 8.00408912 80.36224389 24.09136987 117.84649634 16.06750512 37.47930908 37.61773705 69.72308349 64.65563916 96.79064942 27.02801538 27.00823974 59.27673316 48.57330323 96.78076197 64.63586425 37.47930908 16.05761695 76.78784203 24.09136987 117.84155296 24.09136988 41.05865502 0 80.32269263-8.0337522 117.8316648-24.09136988 37.51391625-16.06256104 69.75769067-37.62762451 96.77087379-64.63586425 27.00823974-27.06756592 48.57824731-59.31134033 64.66552734-96.79064942 16.06750512-37.48425317 24.12597633-76.79772949 24.09136988-117.84649634-0.01977563-41.04876685-8.04364038-80.36224389-24.09136988-117.84649634-16.05761695-37.47930908-37.60784888-69.72308349-64.66552734-96.79064942-27.03790283-27.00823974-59.30639625-48.57330323-96.77087379-64.63586425-37.424927-16.05761695-76.74334741-24.09136987-117.8316648-24.09136987m0-67.42419434c50.39758301 0 98.44683814 9.79376244 144.16259766 29.35656762 45.74047852 19.54797364 85.14788818 45.89868141 118.27166701 79.00268532 33.08422828 33.07434083 59.40527367 72.50152612 78.98291039 118.23706054C872.99975586 413.52844214 882.78857422 461.60241699 882.78857422 512c0 50.39758301-9.78881836 98.44189477-29.36645508 144.19226074-19.57763672 45.72564698-45.89868141 85.16271972-78.98291039 118.22717309-33.12377953 33.11389136-72.52624512 59.46459984-118.27166701 79.01257277C610.45178223 872.99975586 562.4025271 882.78857422 512 882.78857422c-50.40747047 0-98.45672632-9.79376244-144.2021482-29.35656762-45.72070289-19.54797364-85.1182251-45.89868141-118.24200463-79.01257277-33.11883545-33.06445336-59.43493676-72.50152612-79.00268531-118.22717308C150.96563697 610.44189477 141.21142578 562.39758301 141.21142578 512c0-50.39758301 9.75421118-98.47155786 29.34667945-144.19226074 19.56774926-45.73059106 45.88384986-85.16271972 79.00268602-118.23706055 33.12377953-33.10400391 72.52130103-59.45471167 118.24200392-79.00268531C413.54821777 151.00024414 461.5974729 141.21142578 512.00494408 141.21142578" p-id="12675" fill="#FF8F1F"></path></svg>
	</div>
	<!--连接线-->
	<teleport to="body">
		<svg @mouseup="testUp" v-if="alignLine.move" style="position: absolute;z-index:999;overflow: visible;" 
		:style="{width:`${alignLine.width}px`,height:`${alignLine.height}px`,left:`${alignLine.left}px`,top:`${alignLine.top}px`}">
			<path :d="alignLine.svgpath" style="stroke-width: 2px;stroke: #FF8F1F;fill:transparent;">
			</path>
		</svg>
	</teleport>
	<!--旋转与圆角拖动设置、解锁选择框-->
	<teleport to="body" v-if="nodeTopBar.show">
		<div class='radiusRotate' id='radiusRotate' :style="{width:`${editingMode==2?'150px':'120px'}`,left:`${nodeTopBar.left}px`,top:`${nodeTopBar.top}px`,opacity:`${startRadiusRotate.down?'0.5':'1'}`,transform:`${startRadiusRotate.down?'scale(0)':''}`}">
			<div title="设置圆角半径" style="width:40px;height:25px;cursor: pointer;" @mousedown="startSetRR($event,'radius')">
				<svg t="1666003768289" class="icon" viewBox="0 0 1024 1024" style="margin-left: 10px;margin-top: 4px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10812" width="16" height="16"><path d="M832 1024h-128v-128h128a64 64 0 0 0 64-64v-128h128v128a192 192 0 0 1-192 192z m-512 0H192a192 192 0 0 1-192-192v-128h128v128a64 64 0 0 0 64 64h128v128zM1024 320h-128V192a64 64 0 0 0-64-64h-128V0h128a192 192 0 0 1 192 192v128zM128 320H0V192a192 192 0 0 1 192-192h128v128H192a64 64 0 0 0-64 64v128z" fill="#ffffff" p-id="10813"></path></svg>
			</div>
			<div title="设置旋转角度" style="width:40px;height:25px;cursor: pointer;" @mousedown="startSetRR($event,'rotate')">
				<svg t="1665995172472" class="icon" viewBox="0 0 1024 1024" style="margin-left: 10px;margin-top: 2px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9839" width="20" height="20"><path d="M694.4 960H195.2C131.7 960 80 908.4 80 845.1V462c0-63.4 51.7-114.9 115.2-114.9h499.2c63.5 0 115.2 51.6 115.2 114.9v383.1c0 63.3-51.7 114.9-115.2 114.9zM195.2 423.7c-21.2 0-38.4 17.2-38.4 38.3v383.1c0 21.1 17.2 38.3 38.4 38.3h499.2c21.2 0 38.4-17.2 38.4-38.3V462c0-21.1-17.2-38.3-38.4-38.3H195.2z" p-id="9840" fill="#ffffff"></path><path d="M905.6 450.3c-14.8 0-28.9-8.6-35.2-23C788.6 240.8 592.7 213 483.2 213c-21.2 0-38.4-17.2-38.4-38.3s17.2-38.3 38.4-38.3c218.2 0 385 94.9 457.6 260.3 8.5 19.4-0.4 42-19.8 50.5-5 2.1-10.3 3.1-15.4 3.1z" p-id="9841" fill="#ffffff"></path><path d="M473.6 285.4c-9.8 0-19.7-3.7-27.2-11.2l-72.5-72.4c-15-15-15-39.2 0-54.2l72.5-72.4c15-15 39.3-15 54.3 0s15 39.2 0 54.2l-45.4 45.3 45.4 45.3c15 15 15 39.2 0 54.2-7.4 7.4-17.3 11.2-27.1 11.2z" p-id="9842" fill="#ffffff"></path></svg>
			</div>
			<div title="解锁当前节点" style="width:40px;height:25px;cursor: pointer;" data-target="jg_child" @click="openRightBar" >
				<svg t="1666234698699" class="icon" viewBox="0 0 1024 1024" style="pointer-events: none;margin-left: 10px;margin-top: 2px;" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2171" width="20" height="20"><path d="M512 595.9c-21.9 0-39.7 17.8-39.7 39.7v111.9c0 21.9 17.8 39.7 39.7 39.7s39.7-17.8 39.7-39.7V635.6c0-21.9-17.8-39.7-39.7-39.7z" fill="#ffffff" p-id="2172"></path><path d="M750.1 377V238.1C750.1 106.8 643.3 0 512 0S273.9 106.8 273.9 238.1c0 21.9 17.8 39.7 39.7 39.7s39.7-17.8 39.7-39.7c0-87.5 71.2-158.7 158.7-158.7s158.7 71.2 158.7 158.7v121.4c-3.9-0.2-7.9-0.3-11.8-0.3H365.1c-133.7 0-242.5 108.8-242.5 242.5v179.8c0 133.7 108.8 242.5 242.5 242.5h293.7c133.7 0 242.5-108.8 242.5-242.5V601.7c0.1-101.5-62.6-188.6-151.2-224.7zM822 781.5c0 90-73.2 163.2-163.2 163.2H365.1c-90 0-163.2-73.2-163.2-163.2V601.7c0-90 73.2-163.2 163.2-163.2h293.7c90 0 163.2 73.2 163.2 163.2v179.8z" fill="#ffffff" p-id="2173"></path></svg>
			</div>
			<!--交互对象-->
			<div title="链接交互对象" v-if="editingMode==2" style="width:40px;height:25px;cursor: pointer;" @mousedown="startLinkObject">
				<svg t="1667887473084" style="pointer-events: none;margin-left: 10px;margin-top: 2px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15261" width="20" height="20"><path d="M961.9 847.7c-7.1-59.9-65.4-101-124.3-87.4-4 0.9-5.4 0-6.9-3.6-9.5-22.5-19.7-44.7-30.3-66.8-41.2-85.8-86.1-169.6-129.8-254.1-32.1-62-64.4-124-92.6-187.9-1.3-3-1.3-4.7 1.4-7 23-20.5 34.9-46.2 35-77.1 0.1-61.6-54.5-110.1-115.2-101.4-40.5 5.8-69.2 28.3-83.1 66.8-13.8 38.5-5.9 73.7 21.2 104.4 1.9 2.2 2.5 3.6 1.1 6.3-16.6 33.1-32.1 66.8-47.3 100.7-41.6 93.2-80.7 187.5-122 280.9-20.7 46.8-41.9 93.5-65 139.2-1.6 3.2-2.9 4.1-6.6 2.7-15.5-5.5-31.4-6.9-47.7-4.7-57.8 7.8-97.7 63.7-86.3 121 8.6 43.3 43.1 75.7 87.3 82 42.5 6.1 85.2-16.7 104.8-56 1.9-3.8 4.1-4.7 8-4.7 165.7 0.1 331.3 0.1 497 0 4.5 0 6.6 1.4 8.6 5.4 19.5 38.8 61.7 61.1 104.2 55.5 51.1-6.8 88.6-49.1 89.5-102.2-0.5-3.3-0.5-7.7-1-12z m-798.1 73.9c-33.7-0.1-61.3-27.7-61.4-61.5-0.1-33.7 27.5-61.3 61.4-61.3 34-0.1 61.4 27.1 61.5 61.1 0 34.1-27.6 61.8-61.5 61.7z m294.8-788.1c12.6-22.3 38-34.5 63.4-30.4 24.7 4 45.1 23.6 50.1 48.2 0.8 4.1 1.1 8.2 1.2 11.8 0 42.8-41.2 72.4-81.1 58.9-1.3-0.4-2.3-0.9-3.3-1.6-8.2-3.4-15.5-8.6-21.4-15.1-1-0.5-1.8-1.2-2.7-2.2-16.2-19.2-18.7-47.4-6.2-69.6z m334.2 649.7c-21.4 19.1-33.3 42.9-34.7 71.6-0.2 4.6-1.6 5.3-5.7 5.3-80.2-0.1-160.3-0.1-240.5-0.1-80 0-160 0-240 0.1-4.2 0-5.8-0.7-6-5.5-1.1-24.7-10.5-46.2-27.3-64.3-1.8-2-2.4-3.3-1-5.9 37.4-72.8 69.7-148 102.3-223.1 38.6-88.9 75.8-178.5 117-266.2 5.1-10.8 10.5-21.5 15.6-32.4 1.2-2.6 2.4-3.6 5.5-2.5 19 6.8 38.4 7.7 58 3 2.5-0.6 3.9-0.4 5 2.2 48.5 108.4 105.9 212.3 160 317.8 32.6 63.5 65.4 126.8 93.4 192.6 1.3 3.1 1.2 4.9-1.6 7.4zM860 921.6c-33.9-0.2-61.1-27.7-61.1-61.6 0-34 27.3-61.2 61.3-61.2 33.9 0 61.4 27.4 61.5 61.2 0.1 33.9-27.9 61.8-61.7 61.6z" p-id="15262" fill="#ffffff"></path></svg>
			</div>
		</div>
	</teleport>
	<!--旋转与圆角拖动设置移动遮罩层-->
	<teleport to="body" v-if="startRadiusRotate.down">
		<div @mouseup="endSetRR" @mousemove="setRadiusRotate" style="width:100vw;height:100vh;position:absolute;z-index:10000;left:0;top:0;background-color: transparent">
		</div>	
	</teleport>
	<!--拖动条-->
	<teleport to="body" v-if="startRadiusRotate.down">
		<!--拖动条-->
		<div ref="nodeTopBar" style="width:300px;height:4px;background-color:white;border:1px solid var(--mainColorBlue2);border-radius: 5px;position: absolute;z-index: 9999;"
		:style="{left:`${startRadiusRotate.position.left}px`,top:`${startRadiusRotate.position.top}px`}">
			<div style="top:-3px;height:10px;width:10px;border-radius:15px;background-color: var(--mainColorBlue2);position:absolute"
			:style="{left:`calc(${startRadiusRotate.percent}% - 3px)`}">
			</div>
		</div>
	</teleport>
	<!--聚焦层-->
	<!--focusLayers></focusLayers-->
	<!--右键列表-->
	<contextmenu ref='contextmenu'></contextmenu>
	<!--保存为组件-->
	<saveComponent v-if="showSaveComponent"></saveComponent>
	<mountComponent v-for="(componentProps,index) in mountComponentList" :key='index' v-bind="componentProps">
		
	</mountComponent>
  </div>
</template>

<script>
	//引入状态管理器
	import { structStore } from "../store/struct.js";
	//引入用户信息
	import { userInfoStore } from "../store/userInfo.js";
	import { storeToRefs } from "pinia";
	//引入 imgs 资源
	import imgsResouce from "../assets/mainResource.js"
	//引入组件管理器
	import components from "../components/components.vue";
	//引入支持库
	import support from "../components/support.vue";
	//引入资源仓库
	import hub from "../components/hub.vue";
	//引入样式编辑器
	import quickEditDom from "../components/quickEditDom.vue";
	//引入事件管理器
	import eventEdit from "../components/eventEdit.vue";
	//引入提示库
	import drawUiToast from "../components/microTools/showToast.vue"
	//引入组件提供控制器
	import provideControl from "../components/controller/provide/provideControl.vue"
	//引入状态管理控制器
	import statusController from "../components/controller/status/statusController.vue"
	//引入节点处理工厂
	import nodeFactory from "../engines/nodeFactory.js"
	//引入节点状态控制器
	import nodeStatus from "../engines/nodeStatus.js"
	//引入各个组件的mixin
	import mainMixin from "./mixins/mainMixin.js"
	//引入系统数据注册的mixin
	import registerSystem from "./mixins/registerSystem.js"
	//引入接收子组件回传事件的mixin
	import componentEmit from "./mixins/componentEmit.js"
	//引入节点旋转worker
	import domWorker from "worker-loader!../worker/domWorker"
	//引入聚焦层
	import focusLayers from "../components/application/focusLayers.vue"
	//引入左侧栏
	import leftbar from './pagecomponent/leftbar.vue'
	//引入节点右键
	import contextmenu from './pagecomponent/contextmenu.vue'
	//引入顶部工具栏
	import headerTools from "./pagecomponent/headerTools.vue"
	//引入交互动效编辑器
	import animateEditor from "../components/animateEditor.vue"
	//引入组件保存
	import saveComponent from "./pagecomponent/saveComponent.vue"
	//引入组件创建器
	import mountComponentNode from "../engines/mountComponent.js"
	//引入组件挂载器
	import mountComponent from './pagecomponent/mountComponent.vue'
	//引入组件入参设置器
	import propsBord from "./pagecomponent/propsBord.vue"
	export default{
		name:"project",
		mixins:[componentEmit,mainMixin,registerSystem],
		props:{
			parentComponentPath:{
				type:String,//父级组件路径
				default:""
			},
			parentComponentLayers:{
				type:Array,//已经打开的组件层次
				default:[]
			},
			componentPath:{
				//当前组件路径
				type:String,
				default:"$"//代表为项目根路径
			}
		},
		data() {
			return {
			mainPosition:{
				left:0,
				top:0,
			},//主屏位置
			componentLayer:[],//组件打开层次
		    store: null, //项目数据
		    device: "DEVICE_WEB", //当前设备类型
		    keyBord: {
		      Shift: false,
		      Control: false,
		    },
		    screenPercent:0.785,
		    imgs:imgsResouce,
		    nowDevice: 0,
		    screen: {
				displayWidth:1536,//屏幕宽度
				boxWidth:1536,//浏览器宽度
		      top: 0, //绘制区顶部，用于计算元素添加的实际位置
		      left: 0, //绘制区左边，用于计算元素添加的实际位置
		    },
		    mouseAction: {
		      //鼠标控制
		      isDown: false,
		      isMove: false, //选框
		      area: {
		        left: 0,
		        top: 0,
		        width: 0,
		        height: 0,
		      },
		      startX: 0,
		      startY: 0,
		      moveX: 0,
		      moveY: 0,
		    },
		    choseGroup: {
		      //被选中组件
		    },
		    
		    dom: {//记录节点操作
		      opering: false,
				opeTarget:null,
				layers:[]//用于记录打开的层级
		    },
		    components: {
		      components: 1,
		      support: 0,
				hub:0,
		    },
		    rightBarOption:"style",//标记右侧按钮,用作右侧按钮被选中处理,默认为结构按钮
		    nowViewDom:"projectFrameInner",//当前编辑的元素id，单个元素，用于调出右侧操作面板
		    openView: [], //记录已打开组件对象池，主屏触发关闭所有回传事件
		    mountedComponent:[],//要挂载的组件，用于动态添加和加载项目文件
		    $_isShowComponent:false,//挂载组件需要等待所有组件加载完成后再加载
		    tree:{
		      source:null,//源结构树
		      show:null,//实际显示结构树
		      lockParent:null//标记解锁的父级元素
		    },
		    unLockList:{},//已解锁的元素ID列表，用于取消选择时锁定
		    unLockIndexList:[],//解锁元素层级表
			toastList:[],
			domListScales:[],//右侧元素缩放显示中的缩放比例
			frameOutMoveStatus:false,//是否允许中央部分的移动事件
			headerTip:{
				show:false,
				text:""
			},
			};
		},
		provide(){
			return{
				choseGroup:this.choseGroup,
			}
		},
		components: {
			components,
			quickEditDom,
			support,
			hub,
			eventEdit,
			drawUiToast,
			provideControl,
			statusController,
			focusLayers,
			leftbar,
			contextmenu,
			headerTools,
			animateEditor,
			saveComponent,
			mountComponent,
			propsBord
		},
		computed:{
			Tree(){
				//读取当前层次的节点树
				if(this.store==null){
					this.store = structStore(); //初始化pinia对象，加载项目数据
		    }
		    return this.store.DOMSTRUCT.DEVICE_WEB.index
			}
		},
		watch:{
			Tree:{//监听结构树变化,更新列表
				handler:function(newVal){
					this.tree.source=newVal
					this.tree.show=newVal
				},
				immediate:true,
				deep:true
			},
			screenPercent:{//监听结构树变化,更新列表
				handler:function(newPercent){
					System.scalePercent=newPercent
				},
				immediate:true,
				deep:true
			}
		},
		beforeMount(){
			//记录组件打开层次
			this.componentLayer=JSON.parse(JSON.stringify(this.parentComponentLayers)).push(this.parentComponentPath)
		
			
			if(this.store==null){
				this.store = structStore(); //初始化pinia对象，加载项目数据
			}
			
			//标记用户信息
			const userInfo=userInfoStore()
			System.userInfo={
				userName:userInfo.userName,
				identity:userInfo.identity
			}
			//注册系统数据
			this.register_beforeMount()
			this.tree.source=System.nodeMeta.index//获取最外层id列表
			this.tree.show=System.nodeMeta.index//显示列表也为最外层列表
			System.domWorker=new domWorker()
			document.onselectstart = function() { return false; };
		},
		mounted() {
			//按键管理
			System.keybord={
				shift:false
			}

			//注册提示组件
			System.showToast=(text,duration)=>{
				this.toastList.push({
					text:text,
					duration:duration,
					show:true
				})
			}
			//复制事件
			System.copy=(type,data,option={})=>{
				//剪贴板允许15个
				if(this.store.CUTBORD.length>15){
					this.store.CUTBORD.splice(0,1)
				}
				this.store.CUTBORD.push({
					type:type,
					data:data,
					option:option
				})
			}
			//获取剪贴板最后一个
			System.getCutBord=()=>{
				return this.store.CUTBORD.at(-1)
			}
			//请求控制器
			System.requestProvideControl=(target,options)=>{
				try{
					this.$refs['provideControl'].startProvide(target,options)
				}catch(e){
					console.error(e)
					System.showToast("请求失败",2000)
				}
			}
			
			//清除选择框
			System.removeSelect=(onlySide=false)=>{
				if(onlySide){
					this.removeChoseSide()
				}else{
					this.cancleAllSelectedNode()
				}
			}
			
			//更新选择目标列表
			System.updateOperateNode=(newList)=>{
				this.choseGroup=JSON.parse(JSON.stringify(newList))
				this.choseGroupTemp=JSON.parse(JSON.stringify(newList))
			}
			this.mainPosition={
				left:document.getElementById("main").offsetLeft,
				top:document.getElementById("main").offsetTop
			}
			let outBox=document.getElementById("projectFrameOut")
			this.screen.boxWidth=document.body.clientWidth
			let resizeTimeout=null
			//视口大小改变时处理
			let resizeFunction=()=>{
				if(resizeTimeout!=null){
				  	clearTimeout(resizeTimeout)
				  	resizeTimeout=null
				}
				resizeTimeout=setTimeout(()=>{
					let val=screen.width
						if(val!=this.screen.displayWidth){
							try{
								this.$nextTick(()=>{
									let percent=val/this.screen.displayWidth
									let chaneScreenPercent=(percent).toFixed(2)*1//当窗口变化时，更改显示大小
									document.getElementById("projectFrameInner").style.transform=`scale(${this.screenPercent*chaneScreenPercent})`
									this.screen.displayWidth=val
									this.screen.boxWidth=document.body.clientWidth
									this.screenPercent*=percent
									this.prepareForScreen()
									window.ScreenPercent=this.screenPercent
								})
							}catch{}
						}		  
				  },300)
				}
				resizeFunction()
				window.onresize=resizeFunction
				try{
					this.tree.show=System.nodeMeta.index//显示列表也为最外层列表
					this.prepareForScreen()
						
						//初始化工程项目
						System.initTree(document.getElementById("projectFrameInner"))
						document.getElementById("projectContainer").addEventListener("dragstart", function (e) {
						  //禁止拖拽
						  e.preventDefault();
						  return false;
						});
						document.getElementById("projectContainer").addEventListener("dragend", function (e) {
						  e.preventDefault();
						});

						let _this = this;
						window.addEventListener("keydown", function (e) {
						
						let key = e.key;
						if(e.keyCode==32){
							key="Space"
						}
						try{
							if(["Shift","Control",'Space'].includes(key) || e.keyCode==32){
								if (!_this.keyBord[key]) {
									_this.keyBord[key] = true;
									window[key]=true
									System.keybord[key.toLowerCase()]=true
									try{
										if(System.keyDownEvent[key.toLowerCase()]){
											System.keyDownEvent[key.toLowerCase()]()
										}
									}catch{
										console.log("error")
									}
								}
							}
						}catch(e){
							console.error(e)
						}
					  });
					  window.addEventListener("keyup", function (e) {
						let key = e.key;
						if(e.keyCode==32){
							key="Space"
						}
						if(["Shift","Control",'Space'].indexOf(key)>-1){
							_this.keyBord[key] = false;
							window[key]=false
							System.keybord[key.toLowerCase()]=false
							try{
								if(System.keyUpEvent[key.toLowerCase()]){
									System.keyUpEvent[key.toLowerCase()]()
								}
							}catch{}
						}
					  });
					  this.$_isShowComponent=true
					  //元素插入需要先确定目标，故先调出components，以便后续调用其目标设置方法
					  document.getElementById("components").style.transform="scaleX(1) translateX(-200%)"
				}catch(e){
					  console.error(e)
				}	
		},
		methods:{
			//关闭顶部提示框
			closeToast:function(index){
				this.toastList[index].show=false
				let text=0
				this.toastList.forEach(item => {
					if(item.show){
						text=1
						return
					}
				})
				if(text==0){
					this.toastList=[]
				}
			},
			//设置主屏位置
			prepareForScreen:function(){
				let out = document.getElementById("projectFrameOut").getBoundingClientRect();
				let sumWidth = 1536 * this.screenPercent;//1536设置的屏幕宽度
				let sumHeight = 721 * this.screenPercent;//721设置的屏幕高度
				let left = (screen.width*0.99- 305 - sumWidth.toFixed(0)) / 2;
				let top = (screen.height- 250 - sumHeight.toFixed(0)) / 2;
				document.getElementById("projectFrameInner").style.left = left.toFixed(0) + "px";
				document.getElementById("projectFrameInner").style.top = top.toFixed(0) + "px";
				let box = document.getElementById("projectFrameInner").getBoundingClientRect();
				this.screen.top = document.getElementById("projectFrameInner").offsetTop//box.y.toFixed(0)*1;//用户视口顶端定位，即projectFrameInner
				this.screen.left =  document.getElementById("projectFrameInner").offsetLeft//box.x.toFixed(0)*1;
				out=null
				box=null
			},
			//检测是否仅有一个元素被选中,用于显示子元素列表按钮
			isChosedOne:function(){
				let selected=0
				for(let key in this.choseGroup){
					if(this.choseGroup[key]!=undefined){
					selected++
					}
				}
				return selected==1
			},
			//返回要在右侧显示的结构点
			getDomTrees:function(){
				try{
					let returnToHtml=[]
					let dom
					for(let i=0;i<this.tree.show.length;i++){
						dom=this.tree.show[i]
						if(System.getParentId(dom)==null || System.getParentId(dom)==this.tree.lockParent){
							returnToHtml.push(dom)
						}
					}
					return returnToHtml
				}catch(e){
					return []
				}
			},
			//获取元素缩略显示html
			getScaleDom:function(domId,parentDom,index){
				try{
					let dom=document.getElementById(domId)
					let targetWidth=109
					let targetHeight=60
					let width=dom.offsetWidth
					let height=dom.offsetHeight
					let bili=0
					let bili1=((targetWidth/width)).toFixed(3)*1
					let bili2=((targetHeight)/height).toFixed(3)*1
					bili=bili1<bili2?bili1:bili2
					let copyDom=dom.cloneNode()
					copyDom.innerHTML=dom.innerHTML
					copyDom.id=domId+"_show"
					copyDom.style.height=height+"px"
					copyDom.style.width=width+"px"
					copyDom.style.left=0
					copyDom.style.top="0"
					copyDom.style.position="absolute"
					copyDom.style.right="0"
					copyDom.style.bottom="0"
					copyDom.style.transformOrigin="center"
					copyDom.style.marginLeft="55px"
					copyDom.style.marginTop="30px"
					copyDom.style.transform=`translate(-50%,-50%) scale(${bili})`
					return copyDom.outerHTML
				}catch{
				}
			},
			
			//外部组件唤起其他组件时若需实现点击主屏关闭则需先通过此处插入关闭事件
			insertOpenView:function(target){
				this.openView.push(target)
			},
			//打开左侧栏
			openLeftBar: function (e) {
				let target = e.target.dataset.target;
				const Action={
					"components":()=>{
						if (this.components.components == 0) {
								this.components.components = 1;
							} 
							else {
								let box=document.getElementById("components")
								box.style.transition="0s"
								box.style.transform="scale(1) translateX(-200%)"
								box.style.transition=".05s"
								box.style.transform=""
								box.style.opacity="1"
							}
						this.openView.push({ target: components.close, value: "components" });
					},
					"support":()=>{
						if (this.components.support == 0) {
								this.components.support = 1;
						}else{
							let box=document.getElementById("support")
							box.style.transition="0s"
							box.style.transform="scale(1) translateX(-200%)"
							box.style.transition=".05s"
							box.style.transform=""
							box.style.opacity="1"
						}
						
						this.openView.push({ target: support.close, value: "support" });
					},
					'hub':()=>{
						if (this.components.hub == 0) {
						  this.components.hub = 1;
						}else{
							let box=document.getElementById("hubOut")
							box.style.transition="0s"
							box.style.transformOrigin="10% center"
							box.style.transform="scale(1) translateX(-50%)"
							box.style.transition=".05s"
							box.style.opacity="1"
						}
						try{
							document.getElementById("acceptList").style.transform="scale(0)"
							setTimeout(()=>{
								this.$refs["hub"].setAcceptList()//在展开时调用hub内的setAcceptList方法，延迟500毫秒以控制文件接受列表显示
							},500)
						}catch{}
						this.openView.push({ target: hub.close, value: "hub" });
					},
					'statusControl':()=>{
						this.$refs['statusController'].open()
					}
				}
				Action[target]()
			},
			openRightBar:function(e){//切换到当前元素的子节点列表
				let target = e.target.dataset.target;
				this.rightBarOption=target
				const actions={
					"jg_child":()=>{
						if(System.intoChild())
							target="jg"
						this.rightBarOption='style'
					},
					"jg":()=>{
						this.rightBarOption='style'
					},
					'props':()=>{
						let out=this.$refs['props'].resetTarget()
						if(out){
							if(out.status=='error'){
								this.rightBarOption='style'
								System.showToast(out.text,3000)
							}
						}
						
					}
				}[target]()
				
			},
			openDomScale:function(e){//弹出元素树
				let box=document.getElementById("domTreePlay")
				let preTransform=box.style.transform
				box.style.transform=preTransform.replace("translateX(125%)","translateX(0%)")
				let close=(id)=>{//关闭事件
				preTransform=box.style.transform
				if(preTransform.indexOf("translateX")>-1){
					preTransform=preTransform.replace("translateX(0%)","translateX(125%)")	
				}else{
					preTransform="translateX(125%) "+preTransform
				}
				
				box.style.transform=preTransform
					this.rightBarOption=""
				}
				this.openView.push({target:close,value:""})//插入关闭事件
				this.rightBarOption="jg"//将结构按钮设置为选中状态
			},
			//更改显示设备
			changeDevice: function (e) {
				let device = e.target.dataset.device;
				System.device=['DEVICE_WEB','DEVICE_PHONE','DEVICE_PAD'][device]
				this.nowDevice = device;
				//保存当前设备的源数据
			},
			lockDom:function(type=1,target=""){//锁定目标,type1为锁定全部，0为锁定指定对象，target为指定锁定对象
				if(type==1){//锁定全部
					let unlocklist=[]
					for(let key in this.unLockList){
						if(this.unLockList[key]==1){
							unlocklist.push(key)
						}
					}
					this.unLockIndexList=[]//置空解锁层级列表
					System.lockNode(unlocklist)
					this.tree.lockParent=null//解锁父级元素置空
					this.tree.show=this.tree.source//全部解锁，则回到最外层
				}else{//锁定一个
					if(target!=null){
						let index=this.unLockIndexList.indexOf(target)
						this.unLockIndexList.splice(index,this.unLockIndexList.length-index)//删除被锁定的及其后面的
						System.lockNode(target)
						delete this.unLockList[target]//删除原解锁的组件ID
					}
				  }
			},
			//关闭所有打开的视图
			closeAllView:function(){
				this.openView.forEach(close => {
					close.target(close.value);
				});
				
				this.$refs["components"].setInsertTarget("projectFrameInner")//将插入目标再设置为主屏
				this.nowViewDom="projectFrameInner"//设置操作对象为主屏
				this.openView = [];
				//清楚选择框
				this.removeChoseSide(); //此处不将choseGroup置空，因为更改选择元素时会产生影响操作，将置空操作留值cancleAllSelectedNode中执行
				this.cancleAllSelectedNode(); //取消所有选中元素，注：已在元素鼠标按下事件中阻止冒泡，不允许向上传递至父组件，此处保证不与被选中的组件被点击时的事件
			},
			downAction: function (e) {
				//按下的实际操作
				this.closeAllView()
				//清除上一个鼠标移入的节点的locateNode属性
				try{
					System.lastLocatedNode.classList.remove('locatedNode')
				}catch{}
				this.lockDom()//锁定全部
				let domSelect = document.getElementById("selectDomDiv");
				let DownX = e.clientX,
					DownY = e.clientY
				
				this.mouseAction.startX =(DownX-document.getElementById("drawMain").offsetLeft-this.screen.left)*(1/this.screenPercent)//- this.screen.left//displyPercentX //;
				this.mouseAction.startY = (DownY-document.getElementById("drawMain").offsetTop-this.screen.top)*(1/this.screenPercent)-60/this.screenPercent//DownY-60//- this.screen.top //;
				
				let areaRight = this.mouseAction.area.left + this.mouseAction.area.width;
				let areaBottom = this.mouseAction.area.top + this.mouseAction.area.height;
				
				let positionInArea =
					areaRight > this.mouseAction.startX > this.mouseAction.area.left &&
					areaBottom > this.mouseAction.startY > this.mouseAction.area.top
					  ? true
					  : false;
					  
				domSelect.style.height = 0;
				domSelect.style.width = 0;
				
				this.mouseAction.area.left = this.mouseAction.startX;
				this.mouseAction.area.top = this.mouseAction.startY;
				
				domSelect.style.left = this.mouseAction.startX + "px";
				domSelect.style.top = this.mouseAction.startY + "px";
					if (positionInArea && this.mouseAction.area.width != 0) {
						//取消选择框
						System.unSelectAll()
						this.mouseAction.area.width = 0;
					}
				this.mouseAction.isDown = true;
				this.dom.layers=[]
				
				//创建遮罩层
				let mask=document.createElement("div")
				mask.style.cssText=`
					width:100%;
					height:100%;
					background:rgba(0,0,0,0);
					position:absolute;
					z-index:999;
					top:0;
					left:0
				`
				mask.id="mainMask"
				mask.onmouseup=this.screenUp
				mask.onmousemove=this.screenMove
				document.getElementById("drawMain").appendChild(mask)
			},
			screenDown: function (e) {
			  //主屏鼠标按下事件
			  this.downAction(e);
			},
			screenMove: function (e) {
				//主屏鼠标移动事件
				let left 		=	(e.clientX-this.mainPosition.left-this.screen.left)*(1/this.screenPercent) //e.clientX-55//- this.screen.left;
				let top 		= 	(e.clientY-this.mainPosition.top-this.screen.top)*(1/this.screenPercent)//e.clientY-60// - this.screen.top ;
				let width 	= 	left -  this.mouseAction.startX- 50/this.screenPercent//this.screen.left;
				let height 	= 	top - this.mouseAction.startY//this.screen.top;
				this.mouseAction.moveX = e.clientX;
				this.mouseAction.moveY = e.clientY;
				if ((Math.abs(width) > 5 || Math.abs(height) > 5) && this.mouseAction.isDown) {
					//拉出框选外框
					this.mouseAction.isMove = true;
					let domSelect = document.getElementById("selectDomDiv");
					if (width < 0) {
						let resetLeft 				= this.mouseAction.startX + width;
						domSelect.style.left 		= resetLeft + "px";
						this.mouseAction.area.left 	= resetLeft;
						width = width * -1;
					}
					if (height < 0) {
						let resetTop 				= this.mouseAction.startY + height;
						this.mouseAction.area.top 	= resetTop ;
						domSelect.style.top 		= resetTop + "px";
						height = height * -1;
					}else{
						height+= 1 / this.screenPercent
					}
					this.mouseAction.area.width 	= width;
					this.mouseAction.area.height 	= height;
					domSelect.style.width 		= width + "px";
					domSelect.style.height 		= height + "px";
				}
			},
			
			screenUp: function (e) {
				let mainMaskBox=document.getElementById("mainMask")
				if(mainMaskBox)
					mainMaskBox.remove()
				//主屏鼠标抬起事件
				this.mouseAction.isDown = false; //将鼠标按下状态设置为假
				if (this.mouseAction.isMove) {
			    //检测是否有选中的元素
			    let outerNodes 	= document.getElementById("projectFrameInner").childNodes;
			    let domSelect 	= document.getElementById("selectDomDiv");
				let frameOutLeft=document.getElementById("projectFrameInner").offsetLeft
				let frameOutTop	=document.getElementById("projectFrameInner").offsetTop
			    let leftSide 	= (this.mouseAction.area.left + 50 /this.screenPercent- frameOutLeft/this.screenPercent -(document.getElementById("drawMain").offsetLeft-this.screen.left) / this.screenPercent).toFixed(0) * 1 ,
					topSide 	= (this.mouseAction.area.top-frameOutTop -(document.getElementById("drawMain").offsetTop-this.screen.top) / this.screenPercent).toFixed(0) * 1;
				let rightSide 	= leftSide + (this.mouseAction.area.width / this.screenPercent).toFixed(0) * 1,
					bottomSide 	= topSide + (this.mouseAction.area.height / this.screenPercent).toFixed(0) * 1;
				let _this=this
			    outerNodes.forEach((node) => {  
					if(node.id == undefined || node.id == "scaleDom" || node.id == "selectDomDiv"){
					}else{
						try {
							let nodeleft = node.offsetLeft,
								nodetop = node.offsetTop;
							let noderight = nodeleft + node.offsetWidth,
								nodebottom = nodetop + node.offsetHeight;
							let isEnterChose = 0;
							if ( nodebottom > topSide && noderight > leftSide &&nodetop < topSide && nodeleft < leftSide ) {
								//左上
								isEnterChose = !0;
							} else if ( nodebottom > topSide && noderight < rightSide && nodetop < topSide && nodeleft > leftSide ) {
								isEnterChose = !0;
							} else if ( nodebottom > topSide && nodeleft < rightSide && noderight > rightSide && nodetop < topSide ) {
								//右上
								isEnterChose = !0;
							} else if ( nodebottom < bottomSide && nodeleft < rightSide && noderight > rightSide && nodetop > bottomSide ) {
								isEnterChose = !0;
							} else if ( nodetop < bottomSide && noderight > leftSide && nodeleft < leftSide && nodebottom > bottomSide ) {
								//左下
								isEnterChose = !0;
							} else if ( nodetop < bottomSide && nodeleft > leftSide && noderight < rightSide && nodebottom > bottomSide ) {
								isEnterChose = !0;
							} else if (nodetop < bottomSide && nodeleft < rightSide && noderight > rightSide && nodebottom > bottomSide ) {
								//右下
								isEnterChose = !0;
							} else if (nodetop > topSide && nodeleft < leftSide && noderight > leftSide && nodebottom < bottomSide ) {
								isEnterChose = !0;
							} else if ( nodetop > topSide && nodebottom < bottomSide && nodeleft > leftSide && noderight < rightSide ) {
								isEnterChose = !0;
							}
							if (isEnterChose) {
								System.selectMoreNode=true
								//处于选择范围内时设置选中
								System.selectNode(node.id)
							}
						} catch (e) {
						}
					}
			      
			    });
			    this.mouseAction.isMove = false; //将鼠标移动状态至false
			    domSelect.style.height = 0;
			    domSelect.style.width = 0;
			    domSelect.style.border = "none";
			    outerNodes=null
				domSelect=null
			  } 
			},
			removeChoseSide: function () {
				//清楚被选中的边框
				System.clearBoundSide()
			},

			cancleAllSelectedNode: function () {
			  //取消所有选中元素
				this.tree.lockParent=null//设置解锁父级id为空
				this.removeChoseSide();
				System.unSelectAll()
			},
			treeNodeOnChosed:function (e) {
				let targetDom=e.target.dataset.domid 
				//将节点处理选择事件
				System.selectNode(targetDom)
			},
			//调出快速编辑框
			callQuickEdit:function(e){
				let box=document.getElementById("quickEditDom")
				box.style.transition="0s"
				box.style.transform="scale(1) translateX(200%)"
				//上面的执行完后马上再更改
				box.style.transition=".05s"
				box.style.opacity=1
				box.style.transform=""
				if(Object.keys(this.choseGroup)==0){
					this.$refs.drawUIQucikEdit.changeToGroupOrMain(true)//true表示为主屏调用
				}else{
					try{
						let domId=this.nowViewDom
							if(this.choseGroup[domId]==undefined){
								System.selectNode(domId)
							}
					}catch{}
			  }
			  this.$refs.drawUIQucikEdit.closeAllEverySpread()//打开时向quickEditDom传递命令关闭所有展开项
			},
			//切换结构树与缩略图
			scale2tree:function(e){
				let outBox=document.getElementById("scale2tree")
				let box1=document.getElementById("showST")
				let box2=document.getElementById("setST")
				outBox.style.backgroundColor="rgba(225,225,225,0.8)"
				outBox.style.width="80px"
				outBox.style.height="60px"
				outBox.style.boxShadow="-2px 2px 10px rgba(0,0,0,0.25)"
				box1.style.transform="scale(0)"
				setTimeout(()=>{
					box2.style.transform="scale(1)"
				},100)
				setTimeout(()=>{
					document.getElementById("tempST").focus()
				},200)
				
			},
			//关闭结构树/缩略图切换
			closeST:function(e){
				let outBox=document.getElementById("scale2tree")
				let box1=document.getElementById("showST")
				let box2=document.getElementById("setST")
				box2.style.transform="scale(0)"
				setTimeout(()=>{
					outBox.style.backgroundColor="transparent"
					outBox.style.width="30px"
					outBox.style.height="25px"
					outBox.style.boxShadow="none"
					box1.style.transform="scale(1)"
				},100)
			},
			//设置结构树/缩略图
			setSTAction:function(e){
				e.stopPropagation()
				let outBox=document.getElementById("scale2tree")
				let domBox=document.getElementById("domTreePlay")
				let backBox=document.getElementById("domTree_back")
				let layerBox=document.getElementById("domTree_back_layers")
				let target=e.target.dataset.target
				let box2=document.getElementById("scale2tree")
				let scaleList=document.getElementById("scaleDomList")
				let treeList=document.getElementById("treeDomList")
				setTimeout(()=>{
					if(target==0){//缩略图
						domBox.style.transform="rotate3d(0,1,0,0deg)"
						outBox.style.transform="rotate3d(0,1,0,0deg)"
						backBox.style.transform="rotate3d(0,1,0,0deg)"
						layerBox.style.transform="rotate3d(0,1,0,0deg)"
						box2.style.float="left"
						box2.style.marginLeft="10px"
						scaleList.style.transform="scale(1)"
						treeList.style.transform="scale(0)"
					}else{//结构树
						domBox.style.transform="rotate3d(0,1,0,180deg)"
						outBox.style.transform="rotate3d(0,1,0,180deg)"
						backBox.style.transform="rotate3d(0,1,0,180deg)"
						layerBox.style.transform="rotate3d(0,1,0,180deg)"
						box2.style.float="right"
						box2.style.marginRight="10px"
						scaleList.style.transform="scale(0)"
						treeList.style.transform="scale(1) rotate3d(0,1,0,180deg)"
					}
				},210)
			},
			//结构树返回上一级
			treeBack:function(e,targetIndex=null){
				try{
					let layersIndex
					if(targetIndex==null){
						layersIndex=this.dom.layers.length-1
					}else{
						layersIndex=targetIndex
					}
					let parentId=this.dom.layers[layersIndex].id
					this.nowViewDom=parentId//nowViewDom设置为当前元素的父级元素，以获取所有列表
					this.dom.opeTarget=parentId
					System.selectNode(parentId)
					//刷新结构树列表
					this.tree.show=[]
					this.$nextTick(()=>{
						this.tree.show=System.getNodeLayers(parentId)
						this.$refs["components"].setInsertTarget(parentId)//设置添加组件目标对象
						let tempArr=[]
						for(let i=0;i<layersIndex;i++){
							tempArr.push(this.dom.layers[i])
						}
						this.dom.layers=tempArr
					})
					
				}catch(e){
					console.log(this.dom.layers)
					console.error(e)
				}
			},
			showLayers:function(e){
				e.preventDefault()
				document.getElementById("domTree_back_layers").style.display=""
				document.getElementById("tempLayers").focus()
			},
			closeLayers:function(e){
				setTimeout(()=>{
					document.getElementById("domTree_back_layers").style.display="none"
				},100)
			}
		}
	}
</script>

<style scoped>
	@import url("./css/main.css");
</style>