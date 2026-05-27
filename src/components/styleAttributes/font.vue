<!--圆角编辑组件-->
<template>
	<div id="fontEdit" style="position:relative;height:auto;min-height:65px;transition: .15s;overflow: hidden;background-color: transparent;width: 90%;margin-left: 5%;border-radius: 10px;"
		:style="{'height':`${height}`}">
		<div style="width: 20px;height: 30px;cursor: pointer;position: absolute;z-index: 999;right: 0;top: 5px;" v-if="!spreadEdit" @click="spread">
			<svg t="1662195973771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27253" style="margin-top: 10px;" width="15" height="15"><path d="M0.042667 749.792759v164.515811A110.075414 110.075414 0 0 0 109.691431 1023.957335h164.515812a54.867047 54.867047 0 1 0 0-109.648765H109.691431V749.792759a54.867047 54.867047 0 1 0-109.648764 0zM329.07429 54.867047A54.867047 54.867047 0 0 0 274.207243 0H109.691431A110.075414 110.075414 0 0 0 0.042667 109.648765v164.515811a54.867047 54.867047 0 1 0 109.648764 0V109.648765h164.515812a54.867047 54.867047 0 0 0 54.867047-54.781718z m365.894088 0c0 30.292071 24.574976 54.781717 54.867047 54.781718h164.515812v164.515811a54.867047 54.867047 0 0 0 109.648765 0V109.648765A110.075414 110.075414 0 0 0 914.351237 0H749.835425a54.867047 54.867047 0 0 0-54.867047 54.867047z m0 914.223241c0 30.292071 24.574976 54.867047 54.867047 54.867047h164.515812A110.075414 110.075414 0 0 0 1024.000002 914.30857V749.792759a54.867047 54.867047 0 1 0-109.648765 0v164.515811H749.835425a54.867047 54.867047 0 0 0-54.867047 54.781718z" p-id="27254" fill="#e6e6e6"></path><path d="M512.021334 261.36511A250.698888 250.698888 0 1 0 729.612268 387.397192a50.08858 50.08858 0 1 0-87.036374 49.83259A150.436398 150.436398 0 1 1 512.021334 361.542269a50.173909 50.173909 0 0 0 0-100.262489z" p-id="27255" fill="#e6e6e6"></path></svg>
		</div>
		<div style="width: 20px;height: 30px;cursor: pointer;position: absolute;z-index: 999;right: 0;top: 5px;" v-else @click="spread">
			<svg t="1662196076352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28219" style="margin-top: 9px;" width="18" height="18"><path d="M384 128h-85.33v170.67H128V384h256zM896 384v-85.33H725.33V128H640v256zM725.33 725.33H896V640H640v256h85.33zM298.67 896H384V640H128v85.33h170.67z" p-id="28220" fill="#e6e6e6"></path></svg>
		</div>
		<pre  style="color: var(--mainTextColor1);line-height: 35px;margin-left: 0;">文       字</pre>
		<!--快速选择大小-->
		<div style="clear: both;"></div>
		<div v-if="!spreadEdit" class="fontQuick">
			<div class="fontQuickItem" v-for="(item,index) in Object.keys(hList)" @click="quickSetFont"
				:data-htype="item"
				:style="{backgroundColor:`${!diy&&Htype==item ? 'var(--mainColorSelected1)':'transparent'}`,color:`${!diy&&Htype==item ? '#323232':'#e6e6e6'}`}">
				{{item}}
				<div style="position: absolute;display:inline-block;z-index: 9;font-size: 12px;" class="showText">
					{{hList[item].name}}
				</div>
			</div>
		</div>
		<div id="fontMain" v-if="spreadEdit"
			style="overflow: scroll;width: 100%;height: 170px;position:absolute;bottom:1px;left:50%;transform:translateX(-50%);z-index: 1;">
			<!--字体-->
			<div class="fontEditMain" v-if="spreadEdit"
				style="display: flex;width: 96%;background-color: transparent;height: auto;margin-left: 2%;z-index: 1;margin-top: 10px;">
				<div class="tip"
					style="position: relative;display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip" style="z-index: 99;">字体</div>
					<svg style="margin-top: 5px;" t="1650777091710" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2043" width="60%" height="60%">
						<path
							d="M653.568 724.352l-366.72 0.32L216.32 893.888l158.656 0 0 57.088L64 950.976l0-57.088 55.424 0L495.232 73.088 528 73.088l386.304 820.8L960 893.888l0 57.088-280.96 0 0-57.088 60.544 0L653.568 724.352zM339.264 614.656l256.64-0.768L480 376.768 456.96 376.768 339.264 614.656z"
							p-id="2044" fill="#bfbfbf"></path>
					</svg>
				</div>
				<!--字体添加按钮-->
				<button @click="callFontFamilyList($event,0)" :style="{
						right:`${Object.keys(showFontFamilyList).length==0 ? '30%':'5px'}`,
						fontSize:`${Object.keys(showFontFamilyList).length==0 ? '115%':'195%'}`,
						width:`${Object.keys(showFontFamilyList).length==0 ? '40%':'12%'}`}"
					style="height: 31px;margin-left: 2%;top: 27px;padding: 0;color: var(--mainTextColor1);border-radius: 5px;background-color: transparent;">
					{{Object.keys(showFontFamilyList).length==0?'添加字体':'+'}}
				</button>
				<!--显示已有字体-->
				<div style="clear: both;"></div>
				<div  v-if="Object.keys(showFontFamilyList).length>0" id="exsitFamily" style="display: flex;width: 70%;flex-direction: column;height: auto;overflow-y: scroll;max-height: 105px;overflow-y: scroll;">
					<!--@click="callFontFamilyList($event,1)"-->
					<div v-for="(font,index) in Object.keys(showFontFamilyList)" :key="index" 
						:style="{fontFamily:`${font}`}"
						style="position: relative;line-height: 35px;margin-left: 10px;display: inline-block;width: 90%;height: 35px;background-color: transparent;margin-bottom: 10px;border-radius: 10px;color:var(--mainTextColor1)">
							<div style="width: 80%;height: 100%;text-align: center;overflow: hidden;text-overflow: ellipsis;">
								{{showFontFamilyList[font] !=0 ? showFontFamilyList[font] : font}}
							</div>
							
							<!--删除-->
							<button class='deleteBu' :key="index" :data-family="font" @click="setFontFamily($event,true)" style="position: absolute;right:5px;width:25px;height:25px;border-radius: 10px;background-color: transparent;color:white;font-size: 165%;padding: 0;top:5px">
								<svg t="1661850889523" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8930" width="20" height="20"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#e6e6e6" p-id="8931"></path></svg>
							</button>
						
						
					</div>
				</div>
				<!--字体列表-->
				<div v-if="showFontFamily" class="fontHideList" style="top:65px;width: 80%;left:18%">
					<div class="fontHideItem"
						:data-family="itemName"
						@click="setFontFamily"
						style="position: relative;z-index: 2;display: inline-block;margin: 0;padding: 0;margin-left: 2px;width:100%;text-align: left;height: 35px;color: white;margin-top: 5px;font-size: 15px;letter-spacing: 1px;"
						v-for="(itemName,index) in Object.keys(fontFamilyList)"
						:style="{fontFamily:`${fontFamilyList[itemName] != 0 ? fontFamilyList[itemName] : itemName}`}">
						ABC {{fontFamilyList[itemName] != 0 ? fontFamilyList[itemName] :  itemName }}
					</div>
				</div>
			</div>
			<div class="fontEditMain" v-if="spreadEdit"
				style="display: flex;width: 96%;background-color: transparent;height: 35px;margin-left: 2%;margin-top: 0px;">
				<!--字体大小-->
				<div class="tip"
					style="position: relative;display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip">字体大小</div>
					<svg t="1650777173374" class="icon" viewBox="0 0 1152 1024" style="margin-top: 8px;" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="2920" width="60%" height="60%">
						<path d="M64 1024H0L352 0h64L64 1024z" fill="#bfbfbf" p-id="2921"></path>
						<path d="M416 0h-64L704 1024h64L416 0z" fill="#bfbfbf" p-id="2922"></path>
						<path d="M128 704h512v64H128zM768 1024h-64l192-512h64l-192 512z" fill="#bfbfbf" p-id="2923">
						</path>
						<path d="M960 512h-64l192 512h64l-192-512z" fill="#bfbfbf" p-id="2924"></path>
						<path d="M1088 896h-320l64-64h192l64 64z" fill="#bfbfbf" p-id="2925"></path>
					</svg>
				</div>
				<div
					style="position: relative;display: inline-block;width: 50%;height: 35px;background-color:transparent;margin-left: 10px;border-radius: 10px;line-height: 35px;font-weight: normal;">
					<input placeholder="12" @input="diy=true;setted=true;changeItem=['fontSize'];set()" style="width: 90%;height: 30px;border: none;outline: none;text-align: center;background-color: transparent;color:var(--mainTextColor1);line-height: 30px;" v-model="childrenData_edit['fontSize']['value']"/>
				</div>
				<!--微调减-->
				<!--button style="display: inline-block;margin-left: 5px;width: 25px;background-color: transparent;height: 35px;" @click="littleSet('sub');diy=true">
					<svg style="margin-top: 8px;margin-left: -3px;" t="1650795703022" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12482"
						width="15px" height="15px">
						<path
							d="M631.1 266.9h345.4v41H631.1zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
							p-id="12483" fill="#bfbfbf"></path>
					</svg>
				</button-->
				<!--微调减-->
				<!--单位选择-->
				<unit :showLittle="true" :defaultUnit="'px'"
					@unitChange="unitChange" @littleSet="littleSet"
					style="display: inline-block;margin-left: 5px;width: 45px;transform: scale(1.1) translateY(6px);z-index: 100;">
					
				</unit>
				<!--单位选择-->
				<!--微调加-->
				<!--button style="display: inline-block;margin-left: 5px;width: 25px;background-color: transparent;height:35px" @click="littleSet('add');diy=true">
					<svg  style="margin-top: 8px;margin-left: -3px;" t="1650795550851" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283"
						width="15px" height="15px">
						<path
							d="M631.1 266.9h152.2v41H631.1zM824.3 266.9h152.2v41H824.3zM783.3 307.8h41V460h-41zM783.3 114.6h41v152.2h-41z"
							p-id="12284" fill="#bfbfbf"></path>
						<path
							d="M783.3 266.9h41v41h-41zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
							p-id="12285" fill="#bfbfbf"></path>
					</svg>
				</button-->
				<!--微调加-->
			</div>
			<div class="fontEditMain" v-if="spreadEdit"
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<!--字重-->
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color:transparent;">
					<div class="hideFontTip">字重</div>
					<svg t="1650777235944" class="icon" viewBox="0 0 1024 1024" style="margin-top: 8px;" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="3398" width="60%" height="60%">
						<path
							d="M943.292 906.778L692.864 99.413a29.756 29.756 0 0 0-29.824-20.88c-0.265-0.026-0.53 0.016-0.802 0-0.273 0.016-0.53-0.026-0.81 0a29.798 29.798 0 0 0-29.842 20.88l-54.289 175.028-53.512-172.502a21.367 21.367 0 0 0-22.494-14.916 21.35 21.35 0 0 0-22.486 14.916l-60.262 194.296-59.486-191.761a12.757 12.757 0 0 0-14.336-8.773 12.774 12.774 0 0 0-14.336 8.773L79.94 911.829a12.8 12.8 0 1 0 24.448 7.578l66.373-213.965c0.503 0.06 0.99 0.154 1.51 0.154h51.2a12.8 12.8 0 1 0 0-25.6h-44.817l166.059-535.347 60.424 194.781L228.37 909.312a21.333 21.333 0 1 0 40.755 12.63l64.461-207.813h52.028a21.333 21.333 0 1 0 0-42.667h-38.784L501.308 173.45l53.666 172.987L381.158 906.77a29.858 29.858 0 0 0 28.536 38.724 29.884 29.884 0 0 0 28.518-21.026l59.955-193.271h328.141l59.947 193.271a29.884 29.884 0 0 0 37.376 19.678 29.867 29.867 0 0 0 19.66-37.367zM516.685 671.47l145.544-469.205L807.765 671.47h-291.08z"
							fill="#bfbfbf" p-id="3399"></path>
					</svg>
				</div>
				<span style="width: 10px;"></span>
				<button class="showFontHide" style="width: 20%;padding: 0;font-size: 95%;border-radius: 10px;color:var(--mainTextColor1);height: 25px;margin-top: 5px;background-color: transparent;" :style="{fontWeight:`${childrenData_edit['fontWeight'].value=='' ? 100 : childrenData_edit['fontWeight'].value}`}" @click="callSelectFontWeight" id="fontWeightButton">
					{{childrenData_edit['fontWeight'].value=='' ? 100 : childrenData_edit['fontWeight'].value}}
					<selectListT @change="setFontWeight" ref="selectListFontWeight" v-if="showSelectFontweight" :list="Object.keys(fontWeightList)" @close="showSelectFontweight=false"  style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
				</button>
				<!--对齐-->
				<!--div style="display: inline-block;width: 35px;height: 35px;background-color: transparent;margin-left: 10px;"></div-->
				<div class="align tip" style="border-radius: 5px;position: relative;margin-left: 3px;padding-top: 1px;height: 23px;width: 25px;margin-top: 7px;" @click="setAlign('left')"
					:style="{border:`${childrenData_edit['textAlign'].value=='left' ?'2px solid white':'none'}`}">
					<div class="hideFontTip" style="top: -20px;left:0">左对齐</div>
					<svg t="1650777328803" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="4650" width="20px" height="20px">
						<path
							d="M128 213.333333h768v85.333334H128zM128 384h597.333333v85.333333H128zM128 554.666667h768v85.333333H128zM128 725.333333h597.333333v85.333334H128z"
							p-id="4651" fill="#bfbfbf"></path>
					</svg>
				</div>
				<div class="align tip" style="border-radius: 5px;position: relative;margin-left: 3px;padding-top: 2px;height: 23px;width: 25px;margin-top: 7px;" @click="setAlign('center')"
				:style="{border:`${childrenData_edit['textAlign'].value=='center' ?'2px solid white':'none'}`}">
					<div class="hideFontTip" style="top: -20px;left:-10px">居中对齐</div>
					<svg t="1650777498416" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="5478" width="75%" height="75%">
						<path
							d="M870.4 793.6v102.4H153.6v-102.4h716.8z m102.4-230.4v102.4H51.2v-102.4h921.6z m-102.4-230.4v102.4H153.6v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"
							fill="#bfbfbf" p-id="5479"></path>
					</svg>
				</div>
				<div class="align tip" style="border-radius: 5px;position: relative;margin-left: 3px;padding-top: 2px;height: 23px;width: 25px;margin-top: 7px;" @click="setAlign('justify')"
				:style="{border:`${childrenData_edit['textAlign'].value=='justify' ?'2px solid white':'none'}`}">
					<div class="hideFontTip" style="top: -20px;left:-20px">两端对齐</div>
					<svg t="1650777536072" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="5684" width="75%" height="75%">
						<path
							d="M150.588235 271.058824h722.82353a30.117647 30.117647 0 0 0 30.117647-30.117648V180.705882a30.117647 30.117647 0 0 0-30.117647-30.117647H150.588235a30.117647 30.117647 0 0 0-30.117647 30.117647v60.235294a30.117647 30.117647 0 0 0 30.117647 30.117648zM150.588235 572.235294h722.82353a30.117647 30.117647 0 0 0 30.117647-30.117647V481.882353a30.117647 30.117647 0 0 0-30.117647-30.117647H150.588235a30.117647 30.117647 0 0 0-30.117647 30.117647v60.235294a30.117647 30.117647 0 0 0 30.117647 30.117647zM150.588235 873.411765h722.82353a30.117647 30.117647 0 0 0 30.117647-30.117647v-60.235294a30.117647 30.117647 0 0 0-30.117647-30.117648H150.588235a30.117647 30.117647 0 0 0-30.117647 30.117648v60.235294a30.117647 30.117647 0 0 0 30.117647 30.117647z"
							p-id="5685" fill="#bfbfbf"></path>
					</svg>
				</div>
				<div class="align tip" style="border-radius: 5px;position: relative;margin-left: 3px;padding-top: 2px;height: 23px;width: 25px;margin-top: 7px;" @click="setAlign('right')"
				:style="{border:`${childrenData_edit['textAlign'].value=='right' ?'2px solid white':'none'}`}">
					<div class="hideFontTip" style="top: -20px;left:-35px">右对齐</div>
					<svg t="1650777445198" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="5276" width="80%" height="80%">
						<path
							d="M921.6 768v102.4H307.2v-102.4h614.4z m0-204.8v102.4H102.4v-102.4h819.2z m0-204.8v102.4H307.2V358.4h614.4z m0-204.8v102.4H102.4V153.6h819.2z"
							fill="#bfbfbf" p-id="5277"></path>
					</svg>
				</div>
			</div>
			<!--颜色-->
			<div class="fontEditMain" v-if="spreadEdit"
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip" style="z-index: 99;">字体颜色</div>
					<svg t="1650792788667" class="icon" viewBox="0 0 1024 1024" style="margin-top: 8px;" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="7392" width="65%" height="65%">
						<path
							d="M512 978.3296a466.432 466.432 0 0 1-465.92-465.92A479.5904 479.5904 0 0 1 198.0416 163.84C286.72 80.4352 399.36 38.912 514.6624 46.592c137.6768 9.1648 152.4224 98.8672 163.2256 164.352 6.2464 37.7856 12.1344 73.4208 37.12 98.4064s62.7712 32.4608 102.4 39.8336c66.56 12.3904 157.8496 29.3888 160.6656 162.3552a449.1776 449.1776 0 0 1-128.4608 326.4512A474.1632 474.1632 0 0 1 512 978.3296zM487.7312 127.5904c-84.8896 0-167.168 33.5872-233.728 95.8464A397.4144 397.4144 0 0 0 128 512.4096a384.4608 384.4608 0 0 0 384 384 391.9872 391.9872 0 0 0 278.9376-115.712A367.9744 367.9744 0 0 0 896 513.28c-1.3312-63.3344-23.6032-70.5024-93.7472-83.5584-45.312-8.448-101.6832-18.944-145.152-62.4128S604.16 268.544 597.0944 224.3072c-10.6496-64.4608-15.0528-91.136-87.8592-96-7.168-0.3072-14.336-0.7168-21.504-0.7168z"
							p-id="7393" fill="#bfbfbf"></path>
						<path d="M424.9088 317.8496m-87.04 0a87.04 87.04 0 1 0 174.08 0 87.04 87.04 0 1 0-174.08 0Z"
							fill="#bfbfbf" p-id="7394"></path>
						<path d="M299.4688 520.0896m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf"
							p-id="7395"></path>
						<path d="M406.9888 699.2896m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" fill="#bfbfbf"
							p-id="7396"></path>
					</svg>
				</div>
				<div
					style="position: relative;width: 65%;height: 35px;background-color: transparent;margin-left: 10px;border: 1px solid var(--mainColorGray2);border-radius: 10px;line-height: 35px;color: var(--mainColorGray2);">
					<button id="drawUISetBorderRadius" style="position:absolute;left:25px;height:35px;border-radius:10px;background-color:white;width:calc(100% - 40px)"  v-if="childrenData_edit['color'].condition" >{{childrenData_edit['color'].condition}}</button>
					<button @click="showColorBord=!showColorBord" style="padding: 0;height: 20px;width: 20px;border: 1px solid var(--mainColorGray2);position: absolute;left: 5px;top:7px;border-radius: 5px;" :style="{backgroundColor:`${childrenData_edit['color'].value =='' ? '#000' : childrenData_edit['color'].value}`}"></button>
					<input @click="showColorBord=false" @input="setted=true;changeItem=['color'];set()" placeholder="#000" style="font-size: 105%;width: 80%;height: 30px;outline: none;border: none;background-color: transparent;text-align: center;font-weight: bold;color: var(--mainColorGray2);" v-model="childrenData_edit['color'].value" />
				</div>
				<button class="styleBindVar" style=";position:absolute;right:0px;top:-3px" :data-attribute="bindName" @click="requestVar('color')">{ }</button>
				<teleport to="body" v-if="showColorBord">
					<colorBord id="fontColorChose" @closeColorBord='showColorBord=false' style="position: fixed;right:350px;top:45vh;z-index: 99;border-radius: 10px;overflow: hidden;box-shadow: -5px 5px 15px rgba(0,0,0,0.25);" @colorSet="colorSet"></colorBord>
				</teleport>
			</div>
			<!--行高-->
			<div class="fontEditMain" v-if="spreadEdit"
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip">行高</div>
					<svg t="1650792824765" class="icon" viewBox="0 0 1028 1024" style="margin-top: 5px;" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="7641" width="80%" height="80%">
						<path
							d="M310.272 687.104L178.688 512 47.616 687.104h109.056v128H47.616l131.072 175.104L309.76 815.104H201.216v-128h109.056z m2.048 300.544h688.128v33.792H312.32v-33.792z m0-510.976h688.128v33.792H312.32v-33.792z m267.264-38.912c-33.792-5.12-47.104-15.872-39.424-32.256l39.424-89.6h133.632c7.68 26.624 14.336 47.616 19.456 63.488 5.12 15.872 9.216 27.648 11.776 36.352 2.56 8.192 1.536 14.336-4.096 17.408-5.12 3.584-14.336 5.12-27.648 5.12v14.848h164.864v-14.848c-15.872 0-27.648-2.56-35.328-7.68s-18.432-20.992-31.232-47.616L673.792 23.552 520.704 382.976c-20.992 34.816-43.008 53.248-66.56 54.784v14.848h125.44V437.76z m70.656-294.4l54.784 154.624H583.68l66.56-154.624z m90.112 800.256c-5.12 3.584-14.336 5.12-27.648 5.12v14.848h164.864v-14.848c-15.872 0-27.648-2.56-35.328-7.68s-18.432-20.992-31.232-47.616L673.792 534.016 520.704 893.44c-20.992 34.816-43.008 53.248-66.56 54.784v14.848h125.44v-14.848c-33.792-5.12-47.104-15.872-39.424-32.256l39.424-89.6h133.632c7.68 26.624 14.336 47.616 19.456 63.488 5.12 15.872 9.216 27.648 11.776 36.352 2.56 8.192 1.536 13.824-4.096 17.408zM583.68 808.96l66.56-154.624 54.784 154.624H583.68z"
							p-id="7642" fill="#bfbfbf"></path>
					</svg>
				</div>
				<div
					style="width: 40%;height: 35px;background-color: transparent;margin-left: 10px;border: 1px solid var(--mainColorGray2);border-radius: 10px;">
					<input placeholder="15" @input="diy=true;setted=true;changeItem=['lineHeight'];set()" style="width: 90%;height: 30px;border: none;outline: none;text-align: center;background-color: transparent;" v-model="childrenData_edit['lineHeight']['value']"/>
				</div>
				<!--微调减-->
				<button style="display: inline-block;margin-left: 5px;width: 25px;background-color: transparent" @click="littleSet('sub','lineHeight')">
					<svg style="margin-top: -15px;margin-left: -3px;" t="1650795703022" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12482"
						width="160%" height="160%">
						<path
							d="M631.1 266.9h345.4v41H631.1zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
							p-id="12483" fill="#bfbfbf"></path>
					</svg>
				</button>
				<!--微调减-->
				<!--单位选择-->
				<unit :showLittle="false" :defaultUnit="'px'"
					@unitChange="unitChange"
					:callBackData="'lineHeight'"
					style="display: inline-block;margin-left: 5px;width: 25px;transform: scale(1.1) translateY(5px);z-index: 105;">
					
				</unit>
				<!--单位选择-->
				<!--微调加-->
				<button style="display: inline-block;margin-left: 5px;width: 25px;background-color: transparent" @click="littleSet('add','lineHeight')">
					<svg style="margin-top: -15px;margin-left: -3px;" t="1650795550851" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283"
						width="160%" height="160%">
						<path
							d="M631.1 266.9h152.2v41H631.1zM824.3 266.9h152.2v41H824.3zM783.3 307.8h41V460h-41zM783.3 114.6h41v152.2h-41z"
							p-id="12284" fill="#bfbfbf"></path>
						<path
							d="M783.3 266.9h41v41h-41zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
							p-id="12285" fill="#bfbfbf"></path>
					</svg>
				</button>
				<!--微调加-->
			</div>
			<!--间隔-->
			<div class="fontEditMain" v-if="spreadEdit"
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip">列宽</div>
					<svg t="1650792865988" class="icon" style="margin-top: 8px;" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="8542" width="60%" height="60%">
						<path
							d="M614.4 256v204.8H409.6V256L256 388.608 102.4 512l153.6 123.392L409.6 768v-204.8h204.8v204.8l153.6-132.608 153.6-123.392-153.6-123.392zM51.2 51.2C23.04 51.2 0 74.24 0 102.4v819.2c0 28.16 23.04 51.2 51.2 51.2s51.2-23.04 51.2-51.2V102.4c0-28.16-23.04-51.2-51.2-51.2zM972.8 51.2c-28.16 0-51.2 23.04-51.2 51.2v819.2c0 28.16 23.04 51.2 51.2 51.2s51.2-23.04 51.2-51.2V102.4c0-28.16-23.04-51.2-51.2-51.2z"
							p-id="8543" fill="#bfbfbf"></path>
					</svg>
				</div>
				<div
					style="width: 40%;height: 35px;background-color: transparent;margin-left: 10px;border: 1px solid var(--mainColorGray2);border-radius: 10px;">
					<input placeholder="0" @input="setted=true;changeItem=['letterSpacing'];set()" style="width: 90%;height: 30px;border: none;outline: none;text-align: center;background-color: transparent;color:var(--mainColorGray2)" v-model="childrenData_edit['letterSpacing']['value']"/>
				</div>
				<!--微调减-->
				<button style="display: inline-block;margin-left: 5px;width: 25px;background-color: transparent" @click="littleSet('sub','letterSpacing')">
					<svg style="margin-top: -15px;margin-left: -3px;" t="1650795703022" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12482"
						width="160%" height="160%">
						<path
							d="M631.1 266.9h345.4v41H631.1zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
							p-id="12483" fill="#bfbfbf"></path>
					</svg>
				</button>
				<!--微调减-->
				<!--单位选择-->
				<unit :showLittle="false" :defaultUnit="'px'"
					@unitChange="unitChange"
					:callBackData="'letterSpacing'"
					style="display: inline-block;margin-left: 5px;width: 25px;transform: scale(1.1) translateY(5px);z-index: 100;">
					
				</unit>
				<!--单位选择-->
				<!--微调加-->
				<button style="display: inline-block;margin-left: 5px;width: 25px;background-color: transparent" @click="littleSet('add','letterSpacing')">
					<svg style="margin-top: -15px;margin-left: -3px;" t="1650795550851" class="icon"
						viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12283"
						width="160%" height="160%">
						<path
							d="M631.1 266.9h152.2v41H631.1zM824.3 266.9h152.2v41H824.3zM783.3 307.8h41V460h-41zM783.3 114.6h41v152.2h-41z"
							p-id="12284" fill="#bfbfbf"></path>
						<path
							d="M783.3 266.9h41v41h-41zM368.5 150.5L57.2 855.2h73.2l101.3-236.8h346.7l98.9 236.8h78.1L444.2 150.5h-75.7zM559 572H251.3l54.9-127.6c35.4-82.2 65.9-156.6 96.4-241.7h4.9c31.7 85.1 61 159.5 97.7 241.7L559 572z"
							p-id="12285" fill="#bfbfbf"></path>
					</svg>
				</button>
				<!--微调加-->
			</div>

			<div class="fontEditMain" v-if="spreadEdit"
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<!--样式-->
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip">样式</div>
					<svg t="1650792929183" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="9429" style="margin-top: 8px;" width="60%" height="60%">
						<path d="M0 0h1024v1024H0z" fill="#bfbfbf" fill-opacity=".01" p-id="9430"></path>
						<path
							d="M754.526316 64.565895v107.789473h-108.65179l-183.161263 660.210527h121.155369v107.789473H242.526316v-107.789473h108.328421l183.161263-660.210527H413.184v-107.789473z"
							fill="#bfbfbf" p-id="9431"></path>
					</svg>
				</div>
				<div @click="showFontStyle=!showFontStyle"
					style="width: 30%;height: 35px;background-color: transparent;margin-left: 10px;border: 1px solid var(--mainColorGray2);border-radius: 10px;line-height: 35px;color:var(--mainColorGray2)"
					:style="{fontStyle:`${childrenData_edit['fontStyle'].value}`}"
					class="showFontHide">
					{{fontStyleList[childrenData_edit['fontStyle'].value]  || 'style'}}<!--取中文名-->
					<div v-if="showFontStyle" class="fontHideList">
						<div class="fontHideItem"
							:data-style='itemName'
							@click="setFontStyle"
							style="position: relative;z-index: 2;display: inline-block;margin: 0;padding: 0;margin-left: 2px;width:100%;text-align: left;height: 35px;color: white;margin-top: 5px;font-size: 13px;font-weight: normal;"
							v-for="(itemName,index) in Object.keys(fontStyleList)"
							:style="{fontStyle:`${itemName}`}">
							 {{(fontStyleList[itemName] != 0 ? fontStyleList[itemName] : '') +' '+ itemName }}
						</div>
					</div>
				</div>
				<!--修饰-->
				<div class="tip"
					style="display: inline-block;width: 25px;height: 35px;background-color: transparent;margin-left: 3px;">
					<div class="hideFontTip" style="left: 50px;transform-origin: right;">修饰</div>
					<svg t="1650792970519" class="icon" viewBox="0 0 1024 1024" version="1.1"
						xmlns="http://www.w3.org/2000/svg" p-id="10129" width="100%" height="100%">
						<path
							d="M768 170.666667v170.666666l-42.666667-0.042666V320a64 64 0 0 0-57.856-63.701333L661.333333 256 554.666667 255.957333v219.904h298.666666V554.666667l-298.666666-0.042667V682.666667l0.298666 4.992a42.666667 42.666667 0 0 0 37.376 37.376L597.333333 725.333333h85.333334v85.333334H341.333333v-85.333334h85.333334a42.666667 42.666667 0 0 0 42.368-37.674666L469.333333 682.666667v-128.042667L170.666667 554.666667v-78.762667l298.666666-0.042667V256H362.666667a64 64 0 0 0-63.701334 57.856L298.666667 320V341.333333H256V170.666667h512z"
							p-id="10130" fill="#bfbfbf"></path>
					</svg>
				</div>
				<!--调出颜色盘-->
				<button @click="showColorBord=!showColorBord;colorGet='textDecorationColor'" style="padding: 0;height: 20px;width: 20px;border: 1px solid var(--mainColorGray2);position: absolute;right: 5px;top:7px;border-radius: 5px;" :style="{backgroundColor:`${fontDecorationColor}`}"></button>
				<div @click="showFontDecoration=!showFontDecoration"
					style="width: 35%;height: 35px;background-color: transparent;margin-left: 5px;border: 1px solid var(--mainColorGray2);border-radius: 10px;line-height: 35px;font-size: 15px;"
					class="showFontHide">
					<h4 style="width: 70%;height: 35px;padding: 0;margin: 0;line-height: 35px;text-align: center;color:var(--mainColorGray2)" :style="{textDecoration:`${childrenData_edit['textDecoration'].value}`}">ABC</h4>
					
					<div v-if="showFontDecoration" class="fontHideList"
						style="left: 80px;transform-origin: right center;z-index: 109;">
						<div style="height: 30px;width: 100%;display: flex;">
							<button style="margin: 0;width: 50%;;height: 25px;background-color: transparent;color: white;box-sizing: content-box;" @click="changeDecorationTarget($event,'line')" :style="{borderBottom:`${fontDecorationTarget=='line'?'2px solid white':'none'}`}">线型</button>
							<button style="margin: 0;width: 50%;;height: 25px;background-color: transparent;color: white;box-sizing: content-box;" @click="changeDecorationTarget($event,'style')" :style="{borderBottom:`${fontDecorationTarget=='style'?'2px solid white':'none'}`}">样式</button>
						</div>
						<div class="fontHideItem"
							style="font-weight: normal;position: relative;z-index: 2;display: inline-block;margin: 0;padding: 0;margin-left: 2px;width:100%;text-align: left;height: 35px;color: white;margin-top: 5px;font-size: 13px;"
							v-for="(itemName,index) in Object.keys(fontDecorationList[fontDecorationTarget])"
							@click="setDecoration(itemName)"
							:style="{textDecorationLine:`${(fontDecorationTarget=='line' || ['inherit','initial','unset','revert',''].indexOf(itemName)>-1) ? itemName :'underline' }`,textDecorationStyle:`${fontDecorationTarget=='style'?itemName:''}`}">
							{{(fontDecorationList[fontDecorationTarget][itemName] != 0 ? fontDecorationList[fontDecorationTarget][itemName] : '') +' '+ itemName }}
						</div>
					</div>
				</div>
			</div>
			<!--文字阴影-->
			<div class="fontEditMain" v-if="spreadEdit"
				style="position: relative;display: flex;width: 96%;background-color: transparent;height: 40px;margin-left: 2%;">
				<div class="tip" style="display: inline-block;width: 35px;height: 35px;background-color: transparent;">
					<div class="hideFontTip">文字阴影</div>
					<svg t="1650793011304" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 5px;"
						xmlns="http://www.w3.org/2000/svg" p-id="10754" width="60%" height="60%">
						<path
							d="M796.695864 1023.625577c-15.99415 0-30.388884-9.59649-35.18713-23.991225l-334.277727-847.68993-326.280653 847.68993c-7.997075 19.19298-28.789469 28.789469-49.581864 22.39181-19.19298-7.997075-28.789469-30.388884-20.792394-49.581864L392.043878 33.587714c6.39766-14.394735 19.19298-23.991224 35.187129-23.991224 15.99415 0 30.388884 9.59649 35.187129 23.991224L831.882993 972.444298c7.997075 19.19298-1.599415 41.584789-22.39181 49.581864-3.19883 0-7.997075 1.599415-12.795319 1.599415z"
							p-id="10755" fill="#bfbfbf"></path>
						<path
							d="M679.938571 740.529128H185.719347c-20.792395 0-38.385959-17.593565-38.385959-38.385959 0-20.792395 17.593565-38.385959 38.385959-38.385959h494.219224c20.792395 0 38.385959 17.593565 38.385959 38.385959 0 22.391809-17.593565 38.385959-38.385959 38.385959zM631.956122 63.976599H432.029252c-14.394735 0-27.190054-12.79532-27.190055-27.190055S416.035102 7.997075 432.029252 7.997075h199.92687c14.394735 0 27.190054 12.79532 27.190055 27.190054S646.350857 63.976599 631.956122 63.976599zM697.532136 206.32453h-207.923945c-14.394735 0-27.190054-12.79532-27.190055-27.190054 0-14.394735 12.79532-27.190054 27.190055-27.190054h206.32453c14.394735 0 27.190054 12.79532 27.190054 27.190054 1.599415 14.394735-11.195905 27.190054-25.590639 27.190054zM747.114 350.271877h-207.923946c-14.394735 0-27.190054-12.79532-27.190054-27.190054 0-14.394735 12.79532-27.190054 27.190054-27.190055h206.324531c14.394735 0 27.190054 12.79532 27.190054 27.190055 1.599415 14.394735-11.195905 27.190054-25.590639 27.190054zM803.093523 492.619809h-207.923945c-14.394735 0-27.190054-12.79532-27.190054-27.190054 0-14.394735 12.79532-27.190054 27.190054-27.190055h206.32453c14.394735 0 27.190054 12.79532 27.190055 27.190055 1.599415 14.394735-11.195905 27.190054-25.59064 27.190054zM860.672462 636.567156H654.347932c-14.394735 0-27.190054-12.79532-27.190055-27.190055s12.79532-27.190054 27.190055-27.190054h206.32453c14.394735 0 27.190054 12.79532 27.190055 27.190054s-11.195905 27.190054-27.190055 27.190055z"
							p-id="10756" fill="#bfbfbf"></path>
						<path
							d="M913.453156 778.915087H707.128626c-14.394735 0-27.190054-12.79532-27.190055-27.190054s12.79532-27.190054 27.190055-27.190054h206.32453c14.394735 0 27.190054 12.79532 27.190054 27.190054s-11.195905 27.190054-27.190054 27.190054zM967.833265 922.862434H761.508734c-14.394735 0-27.190054-12.79532-27.190054-27.190054 0-14.394735 12.79532-27.190054 27.190054-27.190055h206.324531c14.394735 0 27.190054 12.79532 27.190054 27.190055 1.599415 14.394735-11.195905 27.190054-27.190054 27.190054z"
							p-id="10757" fill="#bfbfbf"></path>
					</svg>
				</div>
				<teleport to="body" v-if="showShadowSet">
					<div style="position: absolute;width: 230px;height: 100px;background-color: rgba(0,0,0,0.75);border-radius: 10px;top: 60vh;right:450px;z-index: 99;">
						<button style="position: absolute;right: 0;top: 0;height: 20px;color: white;background-color: transparent;font-weight: bold;" @click="closeAndSetShadow()">X</button>
						<div style="width: 50%;height: 30px;float: left;background-color: transparent;margin-top: 25px;"><h4 class='shadowText'>X</h4><input class='shadowInput' @input="inputShadow=true" v-model="newTextShadow['X']"/></div>
						<div style="width: 50%;height: 30px;float: left;background-color: transparent;margin-top: 25px;"><h4 class='shadowText'>Y</h4><input class='shadowInput' @input="inputShadow=true" v-model="newTextShadow['Y']"/></div>
						<div style="width: 50%;height: 30px;float: left;background-color: transparent;margin-top: 5px;"><h4 class='shadowText'>B</h4><input class='shadowInput' @input="inputShadow=true" v-model="newTextShadow['B']"/></div>
						<div style="width: 50%;height: 30px;float: left;background-color: transparent;margin-top: 5px;">
							<h4 class='shadowText'>C</h4>
							<input class='shadowInput' style="text-align: left;padding-left: 5px;width: calc(80% - 5px);" @input="inputShadow=true" v-model="newTextShadow['C']"/>
							<button @click="showColorBord=!showColorBord;colorGet='textShadow'" style="padding: 0;height: 20px;width: 20px;border: 1px solid var(--mainColorGray2);position: absolute;right:12px;bottom:15px;border-radius: 5px;" :style="{backgroundColor:`${newTextShadow['C']}`}"></button>
							</div>
					</div>
				</teleport>
				<h4 v-if="textShadowList.length==0" style="font-weight: normal;width:70%;text-align:center;margin:0;padding:0;line-height:30px;color:var(--mainColorGray2)">点击右侧添加文字阴影</h4>
				<div
				 v-if="textShadowList.length!=0"
					style="width: 70%;height: auto;max-height: 75px;background-color: transparent;margin-left: 5px;border-radius: 10px;display: flex;flex-direction: column;">
					<div style="background-color: transparent;display: flex;margin-bottom: 5px;width: 100%;margin-left: 2%;height:32px;border:none;border-radius: 10px;font-size: 0.75em;padding: 0;color: var(--mainColorGray2);" v-for="(item,index) in textShadowList" :key="index">
						<button @click="showColorBord=!showColorBord;colorGet='textShadow';shadowIndex=index" style="padding: 0;margin-top: 5px;height: 20px;width: 20px;border: 1px solid var(--mainColorGray2);border-radius: 5px;" :data-shadowIndex='index' :style="{backgroundColor:`${item['C']}`}" :key="index"></button>
						<input style="background-color: rgba(238,238,238,0.8);margin-top: 3px;width: 25px;height: 25px;outline: none;border: none;border-right: 1px solid rgba(128,128,128,0.2);border-radius: 5px;margin-left: 2px;text-align: center;" @input="inputShadow=true" v-model="item['X']" :key="index"/>
						<input style="background-color:rgba(238,238,238,0.8);margin-top: 3px;width: 25px;height: 25px;outline: none;border: none;border-right: 1px solid rgba(128,128,128,0.2);border-radius: 5px;text-align: center;margin-left: 2px;" @input="inputShadow=true" v-model="item['Y']"/>
						<input style="background-color: rgba(238,238,238,0.8);margin-top: 3px;width: 25px;height: 25px;outline: none;border: none;border-right: 1px solid rgba(128,128,128,0.2);border-radius:5px;text-align: center;margin-left: 2px;" @input="inputShadow=true" v-model="item['B']"/>
						<!--svg style="margin-top: 8px;margin-left: 5px;" t="1651036286972" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2246" width="15" height="15"><path d="M237.136842 474.273684C107.789474 474.273684 0 366.484211 0 237.136842S107.789474 0 237.136842 0s237.136842 107.789474 237.136842 237.136842-107.789474 237.136842-237.136842 237.136842z m0-366.48421C167.073684 107.789474 107.789474 167.073684 107.789474 237.136842s59.284211 129.347368 129.347368 129.347369 129.347368-59.284211 129.347369-129.347369S307.2 107.789474 237.136842 107.789474z m549.726316 366.48421c-129.347368 0-237.136842-107.789474-237.136842-237.136842s107.789474-237.136842 237.136842-237.136842C916.210526 0 1024 107.789474 1024 237.136842s-107.789474 237.136842-237.136842 237.136842z m0-366.48421c-70.063158 0-129.347368 59.284211-129.347369 129.347368s59.284211 129.347368 129.347369 129.347369S916.210526 307.2 916.210526 237.136842 856.926316 107.789474 786.863158 107.789474z m0 916.210526c-129.347368 0-237.136842-107.789474-237.136842-237.136842 0-129.347368 107.789474-237.136842 237.136842-237.136842 129.347368 0 237.136842 107.789474 237.136842 237.136842 0 129.347368-107.789474 237.136842-237.136842 237.136842z m0-366.484211c-70.063158 0-129.347368 59.284211-129.347369 129.347369s59.284211 129.347368 129.347369 129.347368 129.347368-59.284211 129.347368-129.347368-59.284211-129.347368-129.347368-129.347369zM237.136842 1024C107.789474 1024 0 916.210526 0 786.863158c0-129.347368 107.789474-237.136842 237.136842-237.136842s237.136842 107.789474 237.136842 237.136842c0 129.347368-107.789474 237.136842-237.136842 237.136842z m0-366.484211c-70.063158 0-129.347368 59.284211-129.347368 129.347369S167.073684 916.210526 237.136842 916.210526s129.347368-59.284211 129.347369-129.347368-59.284211-129.347368-129.347369-129.347369z" p-id="2247" fill="#8a8a8a"></path></svg-->
						<svg @click="removeShadow(index)" style="margin-top: 4px;margin-left: 1px;cursor: pointer;" t="1651038979631" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5166" width="20" height="25"><path d="M170.666667 469.333333h682.666666v85.333334H170.666667z" fill="#8a8a8a" p-id="5167"></path></svg>
					</div>
				</div>
				<button @click="addShadow()" style="position: absolute;right:0px;height: 20px;width: 20px;padding: 0;margin: 0;margin-left: 10px;margin-top: 3px;border-radius: 5px;font-size: 2em;color:var(--mainColorGray2);background-color: transparent;">+</button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	@import url(./css/font.css);
</style>
<script>
	import selectListT from "../microTools/select2.vue"
	import unit from "../microTools/unit.vue"
	import colorBord from "../microTools/color.vue"
	import StyleEngine from "../../engines/style.js"
	import {
		structStore
	} from "../../store/struct.js";
	export default {
		name: "margin",
		props: {
			dataValue: {
				default: ""
			},
			closeSpread: Boolean,
			isGroup:{
				type:Boolean,
				default:false
			}, //标记是否为组操作
		},
		components: {
			unit,
			colorBord,
			selectListT
		},
		data() {
			return {
				diy: false, //非自定义
				Htype: "", //快速选择的H项名称
				hList: { //h1-h5大小
					"H1": {
						value: "20|700-30",//大小、字重、行高
						name: "一级标题"
					},
					"H2": {
						value: "16|700-24",
						name: "二级标题"
					},
					"H3": {
						value: "14|700-22",
						name: "三级标题"
					},
					"H4": {
						value: "12|700-20",
						name: "四级标题"
					},
					"P": {
						value: "12|400-22",
						name: "段落"
					},
				},
				showFontWeight: false,
				fontWeightList: {
					"thin": 100,
					"extra light": 200,
					"light": 300,
					"normal": 400,
					"medium": 500,
					"semi bold": 600,
					"bold": 700,
					"extra bold": 800,
					"black": 900,
					"lighter": 0,
					"bolder": 0
				},
				showFontStyle: false,
				fontStyleList: {//样式列表
					"":"空值",
					"inherit": "继承",
					"initial": "默认",
					"italic": "斜体",
					"normal": "普通",
					"oblique": "倾斜",
					"revert": "还原",
					"unset": "不设置",
				},
				
				showFontDecoration: false,
				fontDecorationTarget:"line",//line / style
				fontDecorationColor:'#000',//记录当前样式的颜色值
				fontDecorationList: {//修饰列表
					"line":{
						"":"空值",
						"inherit":"继承",
						"initial":"默认",
						"line-through":"删除线",
						"none":"无效果",
						"overline":"上边线",
						"revert":"还原",
						"underline":"下划线",
						"unset":"不设置"
					},
					"style":{
						"":"空值",
						"dashed":"虚线",
						"dotted":"点划线",
						"double":"双实线",
						"solid":"实线",
						"wavy":"波浪线",
						"inherit":"继承",
						"initial":"默认",
						"revert":"还原",
						"unset":"不设置"
					},
					
				},
				showFontFamily: false,
				showFontFamilyList: {}, //已有的所有字体列表
				fontFontFamilySetType:1,//默认为修改模式
				fontFontFamilySetTypeTarget:"",//修改的对象
				fontFamilyList: {
					"microsoft yahei": "微软雅黑",
					"simhei": "黑体",
					"serif": 0,
					"sans-serif": 0,
					"monospace": 0,
					"cursive": "草书",
					"fantasy": 0,
					"system-ui": "系统字体",
					"math": "数学符号",
					"emoji": "表情符号",
					"fangsong": "仿宋",
				},
				showColorBord:false,//颜色盘控制标志
				colorGet:'color',//需要设置颜色的属性名称
				textShadowList:[],//文字阴影列表
				newTextShadow:{"X":"0",'Y':"0","B":"0","C":"#fff"},
				shadowIndex:0,//要修改的阴影序号索引
				showShadowSet:false,
				
				setData: "",
				thisUnit: "px",
				enterValue: "", //传入的参数
				targetDom: null, //要被修改的dom对象
				realData: this.dataValue.children, //原数据对象
				realDataContion: null,
				isSameValue: true,
				setStyleTimeout: null,
				spreadEdit: false, //是否展开
				height: "65px",
				spreadRotate: 0,
				spreadChange: false,
				store: null,
				bindName: null, //请求变量绑定的组件名称
				childrenData:this.dataValue.children ,
				childrenData_group: {
					"fontStyle": {
						value: "mix",
						unit: "",
						condition: null
					},
					"fontVariant": {
						value: "mix",
						unit: "",
						condition: null
					},
					"fontWeight": {
						value: "mix",
						unit: "",
						condition: null
					},
					"fontSize": {
						value: "mix",
						unit: "px",
						condition: null
					},
					"lineHeight": {
						value: "mix",
						unit: "px",
						condition: null
					},
					"fontFamily": {
						value: "mix",
						unit: "",
						condition: null
					},
					"textDecoration": {
						value: "",
						unit: "",
						condition: null
					},
					"textAlign":{
						value: "",
						unit: "",
						condition: null
					},
					"letterSpacing":{
						value: "",
						unit: "px",
						condition: null
					},
					"color":{
						value: "",
						unit: "",
						condition: null
					},
					"textShadow":{
						value:"",
						unit:"",
						condition:null
					}
				},
				childrenData_edit: this.dataValue.children, //实际操作数据
				setted:false,
				setDtaValueTime:null,
				changeItem:[],//替代监听childData_edit,
				watchShaowInput:null,
				inputShadow:false,
				showSelectFontweight:false
			}
		},
		beforeMount(){
			for(let key in this.childrenData_edit){
				this.childrenData_edit[key].unit=this.childrenData_group[key].unit//传入时没有unit项，自动加上防止出错
			}
			if(this.childrenData_edit['textAlign'].value==''){
				this.setAlign('left')//自动设置对齐，防止修改后受父元素影响
			}
		},
		computed: {
			hideList() {//需要自定义滚动事件的组件列表
				return [this.showFontDecoration, this.showFontFamily, this.showFontStyle, this.showFontWeight]
			},
			VARLIST(){
			    this.store=structStore()
			    return this.store.VARLIST
			}
		},
		watch: {
			dataValue:{
				handler:function(val){
					try{
						if(Object.prototype.toString.call(val)=='[object Object]'){
							this.setted=false
							this.childrenData=JSON.parse(JSON.stringify(val.children))
							if(this.setDtaValueTime!=null)
							{
								clearTimeout(this.setDtaValueTime)
								
							}
							this.childrenData_edit=JSON.parse(JSON.stringify(val.children))
							
							
							this.setDtaValueTime=setTimeout(()=>{
								if(this.isGroup){
									this.childrenData_edit=JSON.parse(JSON.stringify(this.childrenData_group))
								}
								this.setDtaValueTime=null
							},300)
							let needUnit=["fontSize",'letterSpacing','lineHeight']//需要单位的列表
							let unNeedUnit=["fontFamily",'fontWeight','textAlign','color','fontStyle','textDecoration']
							for(let index in needUnit){
								let key=needUnit[index]
								let data=this.childrenData[key].value
								if(data==''){
									this.childrenData_edit[key].value=''
							
									this.childrenData_edit[key].unit='px'
									this.childrenData_edit[key].condition=null
								}else{
									let unit=StyleEngine.getUnit(data)//获取单位
									let value
									if(unit!=undefined && unit!=''){
										value=data.split(unit)[0]
										this.childrenData_edit[key].value=value
							
										this.childrenData_edit[key].unit=unit
										this.childrenData_edit[key].condition=null
									}else{
										this.childrenData_edit[key].value=data
							
										this.childrenData_edit[key].unit="px"
										this.childrenData_edit[key].condition=null
									}
								}
							}
							//无单位属性赋值
							for(let index in unNeedUnit){
								let key=unNeedUnit[index]
								let data=this.childrenData[key].value
								this.childrenData_edit[key].value=data
								this.childrenData_edit[key].unit=''
								this.childrenData_edit[key].condition=null
							}
							//阴影赋值
							//初始化阴影列表
							//this.$emit("set","textShadow",this.childrenData_edit['textShadow'].value,function(){return true},this.setted)
							let checkIsColor=function(name){
								return name.indexOf('#')>-1 || name.indexOf('rgb')>-1 || name.indexOf('hsl')>-1
							}
							let t=this.childrenData_edit['textShadow'].value.split(',')
							let rh=""
							let startRh=false
							let statIndex=0
							let boundList=[]//颜色值起始范围列表
							let boundLength=0//列表数量
							for(let index in t){
								if(checkIsColor(t[index])){//开头
									if(t[index].indexOf('#')==-1){//非hex颜色值
										startRh=true//颜色取值标志
										rh+=t[index]+","
										rh=rh.replace(" ","")
										boundList.push([index*1])//存储起始点
										boundLength++
									}
								}else if(t[index].indexOf(')')>-1){//结尾
									startRh=false
									rh+=t[index]
									rh=rh.replace(" ","")
									boundList[boundLength-1].push(index*1)//结尾点
									boundList[boundLength-1].push(rh)//数据值
									rh=""//复原RH
								}else{
									if(startRh){
										rh+=t[index]+','
										rh=rh.replace(" ","")
									}
								}
							}
											
							let lastStep=0//上一步剔除所跨越的索引长度
							for(let index in boundList){
								let data=boundList[index]
								let start=data[0]-lastStep,end=data[1]-lastStep
								lastStep=end-start//设置跨越长度
								t[start]=data[2]
								for(let i=start+1;i<=end;i++){//剔除
									t.splice(start+1,1)
								}
							}
							let shadowList=[]
							let key=['X','Y','B']
							let co=""
							for(let i in t){
								let anyItem={"X":"0","Y":"0","B":'0',"C":"#000"}
								if(t[i]!=''){//每一项阴影
									let sp=t[i].split(' ')
									let jIndex=0
									for(let j in sp){
										if(sp[j]!="" && !checkIsColor(sp[j])){
											anyItem[key[j-jIndex]]=sp[j].replace("px","")//若颜色值在前，则XYB的索引值相应要减去1，
										}else if(checkIsColor(sp[j])){
											jIndex=1
											anyItem['C']=sp[j]
										}
									}
									shadowList.push(anyItem)
								}
							}
							this.textShadowList=shadowList
							/*let shadow=this.setShadow(shadowList,false)*/
							/*this.childrenData_edit['textShadow'].value=shadow*/
							this.childrenData_edit['textShadow'].unit=""
							this.childrenData_edit['textShadow'].condition=null
						}
						
					}catch{}
					
					
				},
				immediate:true,
				deep:true
			},
			hideList: {
				handler: function(a) {
					this.$nextTick(() => { //等待dom节点加载完成
						document.querySelectorAll(".fontHideList").forEach(dom => {
							dom.addEventListener("wheel", function(e) {
								e.stopPropagation()
								e.preventDefault()
								let detY = e.deltaY
								if (detY < 0) detY = -25
								else detY = 25
								dom.scrollTop += detY
							})
						})
					})
				}
			},
			realData: {
				handler: function(val){
					this.showFontFamilyList = val.fontFamily.split(",");//显示已有字体
				}
			},
			childrenData_edit:{
				handler:function(val){
					
				},
				immediate:true,
				deep:true
			},
			textShadowList:{
				handler:function(value){
					if(this.watchShaowInput!=null)
					{
						clearTimeout(this.watchShaowInput)
					}
					this.watchShaowInput=setTimeout(()=>{
						if(this.inputShadow){
							this.setShadow()
							this.watchShaowInput=null
							this.inputShadow=false
						}						
					},200)
				},
				immediate:true,
				deep:true
			},
			VARLIST:{//当前组件仅color属性可绑定变量
			    handler:function(val){
			        if(this.store!=null){
			            //仅当在选择需要绑定的属性名称时才会处理  (this.isSameValue && this.realDataContion!=null)
			            if(this.bindName!=null){//说明原先已经统一绑定变量 调出变量界面一定会经过设置bindName的操作，故可根据bindName确定变量绑定对象
			                let bind=this.bindName 
			                if(bind!=null && bind.startsWith("$")){
			                    bind=bind.replace("$","")
			                }
			                if(this.childrenData_edit['color'].condition!=null){
								let value=this.store.VARLIST[this.childrenData_edit['color'].condition.replace("$","")].value
								if(value==''){
									value='#fff'
								}
								this.childrenData_edit['color'].value=this.store.VARLIST[this.childrenData_edit['color'].condition.replace("$","")].value
							}//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
			            }
			    }
			    },
			    immediate:true,
			    deep:true
			}
		},
		mounted() {
			this.$nextTick(()=>{
				try{
					document.getElementById("fontMain").addEventListener("wheel", function(e) {
						e.stopPropagation()
						e.preventDefault()
						let detY = e.deltaY
						if (detY < 0) detY = -25
						else detY = 25
						document.getElementById("fontMain").scrollTop += detY
					})
					document.getElementById("exsitFamily").addEventListener("wheel", function(e) {
						e.stopPropagation()
						e.preventDefault()
						let detY = e.deltaY
						if (detY < 0) detY = -25
						else detY = 25
						document.getElementById("exsitFamily").scrollTop += detY
					})
				}catch{}
			})
			/*document.querySelectorAll(".fontHideList").forEach(dom=>{
				dom.addEventListener("wheel",function(e){
					e.stopPropagation()
				})
			})*/

		},
		methods: {
			emitProcess:function(){
				let callBack=()=>{
					this.$emit("preProcess",'font',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'font',callBack)
			},
			set:function(source='other'){	
				if(this.setStyleTimeout!=null){
					clearTimeout(this.setStyleTimeout)
					this.setStyleTimeout=null
				}
				this.setStyleTimeout=setTimeout(()=>{
					/*for(let index in this.changeItem){
						let key=this.changeItem[index]
						this.$emit("set",key,this.childrenData_edit[key].value+this.childrenData_edit[key].unit,function(){return true},this.setted)
					}*/
					
					this.$emit("set","font",this.childrenData_edit,function(){return true},this.setted)
					this.changeItem=[]
					this.setted=false
				},300)
			},
			spread: function(e) {
				this.spreadEdit=!this.spreadEdit
				if(this.spreadEdit){//未展开
				    this.height="210px"
				}else{
				    this.height="65px"
				}
			},
			quickSetFont: function(e) {
				this.setted=true
				this.diy=false//设置为非自定义
				let hName = e.target.dataset.htype
				let hdata = this.hList[hName].value
				let size = hdata.split("|")[0] //字大小
				let weightHeight = hdata.split("|")[1].split("-")
				let weight = weightHeight[0] //字重
				let height = weightHeight[1] //行高
				if (hName != this.Htype) {
					this.Htype = hName
					this.childrenData_edit = { //选中后对所有目标修改元素统一操作
						"fontStyle": {
							value: "",
							unit: "",
							condition: null
						},
						"fontVariant": {
							value: "",
							unit: "",
							condition: null
						},
						"fontWeight": {
							value: weight,
							unit: "",
							condition: null
						},
						"fontSize": {
							value: size,
							unit: "px",
							condition: null
						},
						"lineHeight": {
							value: height,
							unit: "px",
							condition: null
						},
						"fontFamily": {
							value: this.childrenData_edit['fontFamily'].value,
							unit: "",
							condition: null
						},
						"textDecoration": {
							value: this.childrenData_edit['textDecoration'].value,
							unit: "",
							condition: null
						},
						"textAlign":{
							value: this.childrenData_edit['textAlign'].value,
							unit: "",
							condition: null
						},
						"letterSpacing":{
							value: "",
							unit: "px",
							condition: null
						},
						"color":{
							value: this.childrenData_edit['color'].value,
							unit: "",
							condition: null
						},
						"textShadow":{
							value:this.childrenData_edit['textShadow'].value,
							unit:"",
							condition:null
						}
					}
					
				} else { //取消选择,恢复默认
					this.Htype = ""
					this.childrenData_edit = { //选中后对所有目标修改元素统一操作
						"fontStyle": {
							value: "",
							unit: "",
							condition: null
						},
						"fontVariant": {
							value: "",
							unit: "",
							condition: null
						},
						"fontWeight": {
							value: "400",
							unit: "",
							condition: null
						},
						"fontSize": {
							value: "12",
							unit: "px",
							condition: null
						},
						"lineHeight": {
							value: "15",
							unit: "px",
							condition: null
						},
						"fontFamily": {
							value: "",
							unit: "",
							condition: null
						},
						"textDecoration": {
							value: "",
							unit: "",
							condition: null
						},
						"textAlign":{
							value: "",
							unit: "",
							condition: null
						},
						"letterSpacing":{
							value: "",
							unit: "px",
							condition: null
						},
						"color":{
							value: "",
							unit: "",
							condition: null
						},
						"textShadow":{
							value:'',
							unit:"",
							condition:null
						}
					}
				}
				
				size=size+"px"
				/*this.$emit("set", "fontSize", size,function(){return true},this.setted)
				this.$emit("set", "fontWeight", weight,function(){return true},this.setted)
				this.$emit("set", "linheHeight", height,function(){return true},this.setted)
				this.setted=false*/
				this.changeItem=["fontSize",'fontWeight','linheHeight']
				this.set()
				
			},
			callFontFamilyList: function(e, type) { //设置字体,type0为添加，1为修改
				this.showFontFamily = !this.showFontFamily
				this.fontFontFamilySetType=type*1
				this.fontFontFamilySetTypeTarget=e.target
			},
			setFontFamily:function(e,del=false){
				this.setted=true
				let familt=e.target.dataset.family
				if(del){
					this.showFontFamily=false
					delete this.showFontFamilyList[familt]//删除
					let val=""
					let len=Object.keys(this.showFontFamilyList).length
					for(let i=0;i<len;i++){
						val+=Object.keys(this.showFontFamilyList)[i]
						if(i<len-1){
							val+=","
						}
					}
					this.childrenData_edit.fontFamily.value=val//装载回源数据
					this.changeItem=['fontFamily']
					/*this.$emit("set","fontFamily",val,function(){return true},this.setted)
					this.setted=false*/
				}else{
					this.showFontFamily = !this.showFontFamily
					let chinese=this.fontFamilyList[familt]
					if(chinese!=0){
						familt=chinese
					}
					if(this.fontFontFamilySetType==0){//添加
						if(this.showFontFamilyList[familt]!=undefined){//原先已存在此字体
							alert("字体已存在")
						}else{
							this.showFontFamilyList[e.target.dataset.family]=familt
							let val=this.childrenData_edit.fontFamily.value
							let getFont=e.target.dataset.family
							getFont=getFont.replace('"',"").replace('"',"")
							if(val!="") val += ","+getFont
							else val=getFont
							val=val.replace('"',"")
							val=val.replace('"',"")
							this.childrenData_edit.fontFamily.value=val//装载回源数据
							this.changeItem=['fontFamily']
						}
					}else{
						let val=this.childrenData_edit.fontFamily.value//源数据
						let pre=this.fontFontFamilySetTypeTarget.style["fontFamily"]//原先设置对应的按钮的字体
						pre=pre.replace('"',"")//替换引号
						pre=pre.replace('"',"")
						val=val.replace(pre,e.target.dataset.family)//替换原先的为当前的
						delete this.showFontFamilyList[pre]//在已有显示列表中删除原先的
						this.childrenData_edit.fontFamily.value=val//装载回源数据
						this.changeItem=['fontFamily']
						this.showFontFamilyList[e.target.dataset.family]=familt//在已有显示列表中载入当前的
						this.fontFontFamilySetTypeTarget.innerText=familt//设置对应按钮内容
					}
				}
				this.set()
			},
			setFontWeight:function(index){
				this.setted=true
				let weightName=Object.keys(this.fontWeightList)[index.index]
				let fontWeight=this.fontWeightList[weightName]
				if(fontWeight==0)
					fontWeight=weightName
				//console.log("setWeight",fontWeight)
				this.childrenData_edit["fontWeight"].value=fontWeight
				this.changeItem=["fontWeight"]
				this.set()
			},
			setFontStyle:function(e){
				this.setted=true
				let styleName=e.target.dataset.style
				this.childrenData_edit["fontStyle"].value=styleName
				this.changeItem=["fontStyle"]
				this.set()
			},
			setAlign:function(align){
				this.setted=true
				if(this.childrenData_edit['textAlign'].value!=align){
					this.childrenData_edit['textAlign'].value=align
				}else{
					this.childrenData_edit['textAlign'].value=''
				}
				this.changeItem=['textAlign']
				this.set()
			},
			changeDecorationTarget:function(e,targte){
				e.stopPropagation()
				this.fontDecorationTarget=targte
			},
			colorSet:function(color){
				this.setted=true
				if(this.colorGet=='color'){
					this.childrenData_edit[this.colorGet].value=color
					if(this.childrenData_edit[this.colorGet].condition!=null){//若已绑定变量，同时修改变量值
						let varname=this.childrenData_edit['color'].condition.replace("$",'')
						this.store.VARLIST[varname].value=color
					}
					this.changeItem=['color']
					this.set()
					//this.$emit("set",'color',color,function(){return true},true)
				}
				else if(this.colorGet=='textDecorationColor'){
					let pre=this.childrenData_edit['textDecoration'].value.split(' ')
					if(pre.length>=2){
						let now=pre[0]+' '+pre[1]+' '+color
						this.childrenData_edit['textDecoration'].value=now
						this.fontDecorationColor=color
						this.changeItem=['textDecoration']
						this.set()
						//this.$emit("set",'textDecoration',now,function(){return true},true)
					}else{
						this.showColorBord=false
						setTimeout(()=>{
							alert("无目标对象，请选择线型与样式后再次修改")
						},200)
						
					}
				}
				else if(this.colorGet='textShadow'){
					this.textShadowList[this.shadowIndex]['C']=color
					this.changeItem=['textShadow']
					this.setShadow()
					//this.$emit("set",'textShadow',color,function(){return true},true)
				}
				
			},
			littleSet:function(option,target='fontSize'){
				this.setted=true
				this.changeItem=[target]
			    if(option=="add"){
			        this.childrenData_edit[target].value=this.childrenData_edit[target].value*1+1
			    }else{
					let value=this.childrenData_edit[target].value*1-1
					if(value<0){
						value=0
					}
			        this.childrenData_edit[target].value=value
			    }
				this.set()
			},
			closeAndSetShadow:function(){
				console.log("set")
				this.showShadowSet=false
				let flag=""
				let val=this.newTextShadow//获取新增的信息
				let preData=this.childrenData_edit['textShadow'].value.split(',')
				let ope=""
				for(let i in preData){
					if(preData[i]!=""){
						ope+=preData+","
					}
				}
				let v=val['X']+' '+val['Y']+' '+val['B']+' '+val['C']
				this.childrenData_edit['textShadow'].value+=v
				
				//console.log(this.childrenData_edit['textShadow'],"pre shadow")
				this.textShadowList.push(v)
				this.setShadow(this.textShadowList)
			},
			setShadow:function(value=this.textShadowList){
				console.log("set shadow")
				this.setted=true
				let val=""
				let flag=""
				for(let i in value){//遍历阴影每一项
					let data=value[i]//阴影数据
					//console.log(data)
					for(let key in data){
						
						if(key!='C' && data[key].indexOf("px")==-1){
							flag="px"
						}
						//console.log("遍历到",key,data[key],data[key].indexOf("px"))
						val+=data[key]+flag+' '
						flag=""
					}
					if(i<value.length-1){
						val+=','
					}
				}
				
				val=val.replace(' ,',',')
				this.childrenData_edit['textShadow'].value=val
				this.changeItem=['textShadow']
				//this.$emit("set",'textShadow',val,function(dom,stylevalue=''){return true})
				this.set()
				return val
			},
			removeShadow:function(index){
				this.textShadowList.splice(index,1)
				this.setShadow()
			},
			setDecoration:function(name){
				this.setted=true
				this.changeItem=['textDecoration']
				let pre=this.childrenData_edit['textDecoration'].value.split(' ')
				if(this.fontDecorationTarget=='line'){
					if(pre.length>=2){
						if(name==''){
							this.childrenData_edit['textDecoration'].value=''
						}else{
							let now=name
							for(let i=1;i<pre.length;i++){
								now+=' '+pre[i]
							}
							this.childrenData_edit['textDecoration'].value=now
						}
					}else{
						this.childrenData_edit['textDecoration'].value=name
					}
				}else{
					let now=pre[0]+' '+name
					for(let i=2;i<pre.length;i++){
						now+=' '+pre[i]
					}
					this.childrenData_edit['textDecoration'].value=now
				}
				this.set()
			},
			addShadow:function(item={"X":"0",'Y':"0","B":"0","C":"#fff"}){
				this.textShadowList.push(item)
				this.setShadow()
			},
			unitChange:function(pre,now,callBack='fontSize'){//原单位、现单位，仅需修单位不计算相对比例
				this.setted=true
				this.childrenData_edit[callBack].value='5'
			    this.childrenData_edit[callBack].unit=now
				this.changeItem=[callBack]
				this.set()
			},
			//系统API：请求变量面板，父组件挂起
			requestVar:function(styleName){//请求绑定变量
				//let attributeName=e.target.dataset.attribute
				if(this.childrenData_edit['color'].condition!=null){
					this.bindName="$"+styleName
				}else{
					this.bindName=styleName
				}
				
				let attributeName=this.bindName
				//this.bindName=styleName//赋值绑定对象
				try{
					this.$emit("requestVar",{
					component:"font",//请求组件名
					attribute:attributeName,//请求属性值,$:变量已绑定
					})
				}catch(e){
				}
			},
			//系统API：组件内自定义绑定回传，父组件挂起
		   bindVar:function(attribute,varName,varValue){//绑定变量
				if(attribute=="color"){
					this.childrenData_edit['color'].condition="$"+varName
					this.childrenData_edit['color'].value=this.store.VARLIST[varName].value
				}
			},
			//系统API：组件内绑定取消，父组件挂起
			removeBind:function(attribute){//移除变量绑定
				if(attribute.startsWith("$")){
					attribute=attribute.replace("$","")
				}
				this.bindName=null
				this.childrenData_edit['color'].condition=null
				this.childrenData_edit['color'].value="#fff"
			},
			callSelectFontWeight:function(e){
				this.showSelectFontweight=true
				this.$nextTick(()=>{
					this.$refs['selectListFontWeight'].setSpread(e)
				})
			}
		}
	}
</script>
