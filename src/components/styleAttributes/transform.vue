<template>
	<div class="qucikEditOut" id="radiusEdit" style="position:relative;height:auto;min-height:35px;" :style="{'height':`${40+effectList.length*35}px`}">
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;">变       换</pre>
	    <div style="position:relative;float:right;width:60px;height:30px;background-color:transparent;border-radius:10px;display: flex;">
	       <div style="cursor: pointer;">
			   <svg t="1661847751903" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7163" style="margin-top: 3px;" width="25" height="25"><path d="M463.71 363.07l78.34 59.63c49.32-64.97 141.96-77.66 206.93-28.34s77.66 141.96 28.34 206.93c-49.32 64.97-141.96 77.66-206.93 28.34a147.455 147.455 0 0 1-19.11-17.34l-72.24 66.88a245.432 245.432 0 0 0 180.65 78.95c135.93 0 246.13-110.2 246.13-246.13s-110.2-246.13-246.13-246.13c-76.95-0.06-149.48 35.92-195.98 97.21z" fill="#8a8a8a" opacity=".3" p-id="7164"></path><path d="M364.32 758.13c-135.93 0-246.13-110.2-246.13-246.13s110.2-246.13 246.13-246.13S610.45 376.07 610.45 512 500.26 758.13 364.32 758.13z" fill="#8a8a8a" p-id="7165"></path></svg>
	       </div>
		   <div style="cursor: pointer;" @click="addEffect">
			   <svg t="1661847589632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" style="margin-top: 3px;" width="25" height="25"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#8a8a8a" p-id="2393"></path></svg>
		   </div>
	    </div>
		<!--展开-->
	    <div style="width: 90%;margin-left: 5%;position: relative;position: relative;clear: both;min-height: 10px;border-bottom: 1px solid var(--mainColorGrayBg2);padding-bottom: 8px;">
	        <div v-for="(item,index) in effectList" :key="index" class="effectItem">
				<div style="width: 80%;;height: 30px;display: flex;background-color: var(--mainDarkBg1);border-radius: 10px;overflow: hidden;">
					<button class="openBordButton" @click="callBord($event,index,item.value.type)" style="cursor: pointer;">
						<svg t="1661863427349" class="icon" viewBox="0 0 1572 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2326" width="20" height="30"><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM805.357911 171.767742c-16.04424 0-29.257143-13.212903-29.257143-29.257143V102.871889c0-16.04424 13.212903-29.257143 29.257143-29.257142 16.04424 0 29.257143 13.212903 29.257143 29.257142v39.63871c0 16.04424-13.212903 29.257143-29.257143 29.257143z" p-id="2327" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605zM805.357911 248.528418c-61.974808 0-123.635023 23.59447-170.823963 70.468817-94.063287 94.063287-94.063287 247.270046 0 341.647926 94.063287 94.063287 247.270046 94.063287 341.647926 0 94.063287-94.063287 94.063287-247.270046 0-341.647926-47.18894-47.18894-108.849155-70.468817-170.823963-70.468817zM580.423963 264.88725c-11.325346 11.325346-29.886329 11.325346-41.211674 0l-27.998771-27.998771c-11.325346-11.325346-11.325346-29.886329 0-41.211674 11.325346-11.325346 29.886329-11.325346 41.211674 0l27.998771 27.998771c11.325346 11.325346 11.325346 29.886329 0 41.211674z" p-id="2328" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM487.304455 489.821198c0 16.04424-13.212903 29.257143-29.257143 29.257143H418.408602c-16.04424 0-29.257143-13.212903-29.257143-29.257143 0-16.04424 13.212903-29.257143 29.257143-29.257143h39.63871c16.04424 0 29.257143 13.212903 29.257143 29.257143z" p-id="2329" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605z m-170.823963-443.576037c-94.063287 94.063287-94.063287 247.270046 0 341.647926 47.18894 47.18894 108.849155 70.468817 170.823963 70.468817 61.974808 0 123.635023-23.59447 170.823963-70.468817 94.063287-94.063287 94.063287-247.270046 0-341.647926-94.063287-94.063287-247.270046-94.063287-341.647926 0zM580.423963 714.755146c11.325346 11.325346 11.325346 29.886329 0 41.211674l-27.998771 27.998771c-11.325346 11.325346-29.886329 11.325346-41.211674 0-11.325346-11.325346-11.325346-29.886329 0-41.211674l27.998771-27.998771c11.325346-11.639939 29.886329-11.639939 41.211674 0z" p-id="2330" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM805.357911 807.874654c16.04424 0 29.257143 13.212903 29.257143 29.257143v39.63871c0 16.04424-13.212903 29.257143-29.257143 29.257143-16.04424 0-29.257143-13.212903-29.257143-29.257143v-39.63871c0-16.358833 13.212903-29.257143 29.257143-29.257143z" p-id="2331" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605zM634.533948 660.645161c94.063287 94.063287 247.270046 94.063287 341.647926 0 94.063287-94.063287 94.063287-247.270046 0-341.647926-94.063287-94.063287-247.270046-94.063287-341.647926 0-94.063287 94.063287-94.063287 247.270046 0 341.647926zM1030.291859 714.755146c11.325346-11.325346 29.886329-11.325346 41.211674 0l27.998771 27.998771c11.325346 11.325346 11.325346 29.886329 0 41.211674-11.325346 11.325346-29.886329 11.325346-41.211674 0l-27.998771-27.998771c-11.325346-11.325346-11.325346-29.886329 0-41.211674z" p-id="2332" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM1123.411367 489.821198c0-16.04424 13.212903-29.257143 29.257143-29.257143H1192.30722c16.04424 0 29.257143 13.212903 29.257143 29.257143 0 16.04424-13.212903 29.257143-29.257143 29.257143h-39.63871c-16.04424 0-29.257143-13.212903-29.257143-29.257143z" p-id="2333" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605zM805.357911 248.528418c-61.974808 0-123.635023 23.59447-170.823963 70.468817-94.063287 94.063287-94.063287 247.270046 0 341.647926 47.18894 47.18894 108.849155 70.468817 170.823963 70.468817 61.974808 0 123.635023-23.59447 170.823963-70.468817 94.063287-94.063287 94.063287-247.270046 0-341.647926-47.18894-47.18894-108.849155-70.468817-170.823963-70.468817zM1030.291859 264.88725c-11.325346-11.325346-11.325346-29.886329 0-41.211674l27.998771-27.998771c11.325346-11.325346 29.886329-11.325346 41.211674 0 11.325346 11.325346 11.325346 29.886329 0 41.211674l-27.998771 27.998771c-11.325346 11.325346-29.886329 11.325346-41.211674 0z" p-id="2334" fill="#8a8a8a"></path></svg>
					</button>
					<div class="effectType" @click="callSelectEffectType($event,index,index)">
						{{item.value.type}}
					</div>
				</div>
				<div class="removeEffect" @click="removeEffect(index)">
					<svg t="1661864077717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3301" width="20" height="30"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#8a8a8a" p-id="3302"></path></svg>
				</div>
			</div>
			
	    </div>
		
		<selectListT @change="setEffectType" ref="selectListType" v-if="showSelectType" :list="effectTypeList" @close="showSelectType=false"  style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
		<!--阴影编辑-->
		<teleport to="body" v-if="showBord">
			<div @mousemove.stop="" @mouseleave.top="inputFocus=false"  @mouseup.stop="mouseUp" draggable="false" style="overflow: hidden;position: absolute;right: 260px;width:300px;background-color: var(--mainDarkBg2);z-index: 99999;border-radius: 10px;height: 320px;" :style="{top:`${showType?top:(top+100)}px`}">
				<div @mousemove.stop="mouseMove" @mouseleave.stop="mouseUp" style="position: absolute;left: 0;top: 0;width: 200%;height: 100%;z-index: 2;background-color: transparent;cursor: e-resize;" v-if="mouseAction.down">
				</div>
				<!--顶部栏-->
				<div style="height: 35px;width: 100%;background-color: transparent;border-bottom: 2px solid var(--mainColorGrayBg);" >
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 80px;margin-left: 10px;line-height: 35px;color: var(--mainTextColor1);">变换设置</h3>
					
					<div style="float: right;width: 30px;height: 30px;position: relative;cursor: pointer;" @click="close">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#e6e6e6" p-id="18203"></path></svg>
					</div>
					<div @click="callFilterSelect" style="float: right;width: 80px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 10px;margin-top: 5px;margin-right: 8px;" class="filterTypeButton">
						<svg t="1662012961712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="float: left;margin-top: 4px;margin-left: 5px;" p-id="2165" width="16" height="16"><path d="M136.533333 634.246095C136.533333 567.588571 169.935238 481.913905 229.571048 379.562667c23.747048-40.706438 51.326781-83.412114 81.978514-127.405105A2906.199771 2906.199771 0 0 1 429.173029 95.583086a2774.250057 2774.250057 0 0 1 49.659123-60.172191l3.969219-4.632381L507.240838 2.633143l24.517486 28.145371 3.959466 4.642134c3.140267 3.666895 6.787657 7.9872 10.942172 12.873142a3313.176381 3313.176381 0 0 1 38.785219 47.289296 2940.362362 2940.362362 0 0 1 117.613714 156.574476c30.593219 43.99299 58.172952 86.698667 81.92 127.405105 59.63581 102.351238 93.037714 188.025905 93.037715 254.683428 0 210.690438-165.800229 381.834971-370.775772 381.834972C302.343314 1016.081067 136.533333 844.936533 136.533333 634.246095m343.186286-497.566476a2801.859048 2801.859048 0 0 0-114.922057 153.102629c-29.696 42.569143-56.32 83.792457-79.160076 122.958019-54.203733 92.94019-84.085029 169.662171-84.085029 221.505828 0 174.947962 137.069714 316.386743 305.688381 316.386743 168.686933 0 305.7664-141.438781 305.7664-316.386743 0-51.843657-29.891048-128.565638-84.094781-221.505828-22.840076-39.165562-49.464076-80.388876-79.091809-122.958019a2869.150476 2869.150476 0 0 0-114.93181-153.112381 4546.998857 4546.998857 0 0 0-27.648-33.811505c-8.572343 10.435048-17.788343 21.7088-27.511467 33.811505" p-id="2166" fill="#e6e6e6"></path><path d="M507.270095 902.397562c-142.833371 0-258.6624-116.90179-258.6624-261.246781 0-144.286476 134.456076-71.241143 258.6624 0 124.781714 71.553219 258.6624-144.286476 258.6624 0 0 144.335238-115.829029 261.246781-258.6624 261.246781" p-id="2167" fill="#e6e6e6"></path></svg>
						<h3 style="width: calc(100% - 30px);text-align: center;margin: 0;padding: 0;float: left;color: var(--mainTextColor1);font-weight: normal;font-size: 12px;margin-top: 3px;margin-left: 3px;">{{effectList[nowEditIndex].value.data.transType}}</h3>
					</div>
					<selectListT @change="setFilterType" ref="selectFilterType" v-if="showFilterSelect" :list="innerTransType" @close="showFilterSelect=false" :selected="nowType" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
				</div>
				<div style="width: 100%;height: calc(100% - 120px);display: flex;z-index: 1;">
					<!--透视展示框-->
					<div style="width: 70%;height: 100%;">
						<div id="output_" class="output large">
						    <section id="default-example_" class="default-example" >
						        <div id="example-element_" class="transition-all" ref="section" :style="{perspective:`none`,perspectiveOrigin:`${'50% 50%'}`,transform:`${test.transform}`}">
						            <div class="face front">1</div>
						            <div class="face back">2</div>
						            <div class="face right">3</div>
						            <div class="face left">4</div>
						            <div class="face top">5</div>
						            <div class="face bottom">6</div>
						        </div>
						    </section>
						</div>
					</div>
					<!--透视-->
					<div class="itemOut" v-if="effectList[nowEditIndex].value.type=='透视'">
						<h3 class="valueTitle">距离</h3>
						<div class="valueItem" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus"  @focus="processFocusIndex(0)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,0)">%</button>
						</div>
					</div>
					
					<!--旋转-->
					<div class="itemOut" v-if="effectList[nowEditIndex].value.type=='旋转'">
						<div class="valueItem" style="margin-top: 10px;" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue($event)" @blur="blurFocus($event)" v-model="effectList[nowEditIndex].value.data.value[0]" @focus="processFocusIndex(0)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,0)">{{nowType=='旋转'?'A':'X'}}</button>
						</div>
						<div class="valueItem" style="margin-top: 10px;" v-if="nowType=='3D旋转'" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[1]" @focus="processFocusIndex(1)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,1)">Y</button>
						</div>
						<div class="valueItem" style="margin-top: 10px;" v-if="nowType=='3D旋转'" :style="{boxShadow:`${focusIndex==2?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[2]" @focus="processFocusIndex(2)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,2)">Z</button>
						</div>
						<div class="valueItem" style="margin-top: 10px;" v-if="nowType=='3D旋转'" :style="{boxShadow:`${focusIndex==3?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[3]" @focus="processFocusIndex(3)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,3)">A</button>
						</div>
					</div>
					
					<!--缩放-->
					<div class="itemOut" v-if="effectList[nowEditIndex].value.type=='缩放'">
						<h3 class="valueTitle">{{nowType=='缩放'?'比例':'比例(X)'}}</h3>
						<div class="valueItem" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue(e);effectList[nowEditIndex].value.data.value[1]=effectList[nowEditIndex].value.data.value[0]" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[0]" @focus="processFocusIndex(0)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,[0,1])">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
						<h3 class="valueTitle" v-if="nowType=='3D缩放'">比例(Y)</h3>
						<div class="valueItem" v-if="nowType=='3D缩放'" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[1]" @focus="processFocusIndex(1)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,1)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
						<h3 class="valueTitle"  v-if="nowType=='3D缩放'">比例(Z)</h3>
						<div class="valueItem" v-if="nowType=='3D缩放'" :style="{boxShadow:`${focusIndex==2?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[2]" @focus="processFocusIndex(2)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,2)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
					</div>
					
					<!--拉伸-->
					<div class="itemOut" v-if="effectList[nowEditIndex].value.type=='拉伸'">
						<h3 class="valueTitle">角度(X)</h3>
						<div class="valueItem" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[0]" @focus="processFocusIndex(0)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,0)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
						<h3 class="valueTitle">角度(Y)</h3>
						<div class="valueItem" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[1]" @focus="processFocusIndex(1)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,1)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
					</div>
					
					<!--移动-->
					<div class="itemOut" v-if="effectList[nowEditIndex].value.type=='移动'">
						<h3 class="valueTitle">{{nowType=='移动'?'移动':'移动(X)'}}</h3>
						<div class="valueItem" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[0]" @focus="processFocusIndex(0)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,0)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
						<h3 class="valueTitle" v-if="nowType=='3D移动'">移动(Y)</h3>
						<div class="valueItem" v-if="nowType=='3D移动'" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[1]" @focus="processFocusIndex(1)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,1)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
						<h3 class="valueTitle"  v-if="nowType=='3D移动'">移动(Z)</h3>
						<div class="valueItem" v-if="nowType=='3D移动'" :style="{boxShadow:`${focusIndex==2?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
							<input @mousedown.stop="inputFocus=true" @input="inputValue" @blur="blurFocus" v-model="effectList[nowEditIndex].value.data.value[2]" @focus="processFocusIndex(2)" class="valueInput"/>
							<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,2)">{{effectList[nowEditIndex].value.data.unit[0]}}</button>
						</div>
					</div>
				</div>
				<!--位置-->
				<h3 style="z-index: 9999;;margin: 0;padding: 0;font-weight: normal;float: left;width: 60px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">位置</h3>
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex">
					 
					<div style="position: relative;display:flex;width:calc(50% - 15px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==postionInputIndex?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'positionX')">X</button>
						<input @mousedown.stop="inputFocus=true" @input="inputValue" v-model="position.x.value" @blur="blurFocus" @focus="processFocusIndex(postionInputIndex)" style="width:60%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
						<unit  :showLittle='false' style="margin-top: 7px;" v-if="!isNaN(position.x.value)" :defaultUnit="position.x.unit"></unit>
						<div style="width: 25px;height: 25px;background-color: transparent;border-radius: 0 10px 10px 0;margin-top: 3px;cursor: pointer;" @click="nowGettingPosition='x';callPositionSelect($event)">
							<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="float: left;margin-top: 10px;margin-left: 5px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
						</div>	
					</div>
					<div style="display:flex;width:calc(50% - 15px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==(postionInputIndex+1)?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'positionY')">Y</button>
						<input @mousedown.stop="inputFocus=true" @input="inputValue" v-model="position.y.value" @blur="blurFocus" @focus="processFocusIndex(postionInputIndex+1)" style="width:60%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
						<unit  :showLittle='false' v-if="!isNaN(position.y.value)" style="margin-top: 7px;" :defaultUnit="position.y.unit"></unit>
						<div style="width: 25px;height: 25px;background-color: transparent;border-radius: 0 10px 10px 0;margin-top: 3px;cursor: pointer;" @click="nowGettingPosition='y';callPositionSelect($event)">
							<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="float: left;margin-top: 10px;margin-left: 5px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
						</div>
					</div>
					<selectListT @change="setPosition" ref="selectPositionType" v-if="showPositionSelect" :list="Object.keys(positionList[nowGettingPosition])" @close="showPositionSelect=false" :selected="!isNaN(position[nowGettingPosition].value)?'自定义' :(positionToString[position[nowGettingPosition].value] || '居中')" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
				</div>
				
			</div>
		</teleport>
	</div>
</template>

<script>
	import { structStore } from "../../store/struct.js";
	import colorBord from "../microTools/color.vue"
	import selectListT from "../microTools/select2.vue"
	import verticalCheckBox from "../microTools/verticalCheckBox.vue"
	import unit from "../microTools/unit.vue"
	export default{
		name:"transform",
		props:{
		    dataValue:{
		        default:""
		    },
			isGroup:{
				type:Boolean,
				default:false
			}
		},
		components:{
			selectListT,
			colorBord,
			verticalCheckBox,
			unit
		},
		data(){
			try{
				return{
					newNode:false,//是否已更新操作对象
					setData:"",
					enterValue:"",//传入的参数
					targetDom:null,//要被修改的dom对象
					realDataContion:null,
					isSameValue:true,
					setStyleTimeout:null,
					spreadEdit:false,//是否展开
					height:65,
					spreadRotate:0,
					spreadChange:false,
					store:null,
					bindName:null,//请求变量绑定的组件名称
					
					inputFocus:false,
					thisUnit:"px",
					realData:this.dataValue,//原数据对象,
					height:"35px",
					childrenData:{
					       
					       "boxShadow":{value:0,unit:"",condition:null},
					       "filter":{value:0,unit:"",condition:null},
					       "backdropFilter":{value:0,unit:"",condition:null},
					},
					childrenData_group:{
							"boxShadow":{value:0,unit:"",condition:null},
					       "filter":{value:0,unit:"",condition:null},
					       "backdropFilter":{value:0,unit:"",condition:null},
					       
					},
					childrenData_edit:{},//实际操作数据
					setted:false,
					setDataValueTime:null,
					setTarget:0,//0realData,1各个值
					
					effectList:[],
					effectTypeList:[
						'透视','旋转','缩放','拉伸','移动'
					],
					nowEditIndex:-1,//当前编辑索引
					showSelectType:false,
					top:0,
					showBord:false,
					shadowColor:"#000",
					shadowData:{
						X:"",
						Y:"",
						B:"",
						S:""
					},
					focusIndex:-1,
					focusTimeout:null,
					showColorBord:false,
					mouseAction:{
						down:false,
						startX:0,
						target:"X",
						deltaX:0,
						pre:0
					},
					alpha:"",
					test:{
						transform:""
					},
					valueNumber:{
						"透视":{
							number:1,
							'3dNumber':1
						},
						"旋转":{
							number:1,
							'3dNumber':4
						},
						"缩放":{
							number:2,
							'3dNumber':3
						},
						"拉伸":{
							number:2,
							'3dNumber':1
						},
						"移动":{
							number:2,
							'3dNumber':3
						}
					},
					transformList:{
						"透视":{
							'透视':'perspective'
						},
						"旋转":{
							'旋转':'rotate',
							'3D旋转':"rotate3d",
						},
						"缩放":{
							'缩放':"sacle",
							'3D缩放':'scale3d',
						},
						"拉伸":{
							"拉伸":"skew",
						},
						"移动":{
							"移动":"translate",
							'3D移动':'translate3d'
						}
					},
					filterUnit:{
						blur:"px",
						brightness:"%",
						contrast:"%",
						grayscale:"%",
						'hue-rotate':"deg",
						invert:"%",
						opacity:"%",
						sepia:"%",
						saturate:"%"
					},
					filterPercent:10,
					scrollBarLeft:0,
					scrollBarWidth:0,
					filterTypeIndex:"",//滤镜类型中文，用于在首次加载时类型显示
					showFilterSelect:false,
					positionList:{
						x:{
							'居中':"center",
							'靠左':'left',
							'靠右':'right',
							'自定义':"define"
						},
						y:{
							'居中':'center',
							'顶部':'top',
							'底部':'bottom',
							'自定义':"define"
						}
						
					},
					nowGettingPosition:"",
					position:{
						x:{
							value:"center",
							unit:"px"
						},
						y:{
							value:"center",
							unit:"px"
						}
					},
					showPositionSelect:false,
					positionToString:{
						'left':"靠左",
						'right':'靠右',
						'top':'顶部',
						'bottom':'底部',
						'center':'居中'
					},
					text:""
				}
			}catch(e){
				console.error("变量定义错误",e)
			}
		},
		computed:{
		    VARLIST(){
		        this.store=structStore()
		        return this.store.VARLIST
		    },
			showType(){
				try{
					return ['内阴影','外阴影'].includes(this.effectList[this.nowEditIndex].value.type) || this.effectList[this.nowEditIndex].value.data.filterType=='drop-shadow'
				}catch{
					this.effectList=[]
					this.setted=false
					this.showBord=false
					return false
				}
			},
			innerTransType(){
				return Object.keys(this.transformList[this.effectList[this.nowEditIndex].value.type])
			},
			nowType(){
				return this.effectList[this.nowEditIndex].value.data.transType
			},
			postionInputIndex(){
				let real=this.effectList[this.nowEditIndex].value.data.transType
				let type=this.effectList[this.nowEditIndex].value.type
				return real.startsWith("3D")?this.valueNumber[type]['3dNumber']:this.valueNumber[type]['number']
			}
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					//当没有移动修改或没有输入状态时可以关闭
					if(!this.mouseAction.down && !this.inputFocus){
						this.showBord=false
						this.mouseAction={
							down:false,
							startX:0,
							target:"X",
							deltaX:0,
							pre:0
						}
						this.setted=false
						this.effectList=[]
						this.$nextTick(()=>{
							if(Object.prototype.toString.call(val)=='[object Object]'){
								this.childrenData_edit=JSON.parse(JSON.stringify(val))
								let transform=val.children['transform']
								for(let i=0;i<transform.length;i++){
									this.effectList.push(transform[i])
								}
								this.position={
									x:{
										value:val.children.transformOrigin.x.value || 'center',
										unit:val.children.transformOrigin.x.unit || 'px'
									},
									y:{
										value:val.children.transformOrigin.y.value || 'center',
										unit:val.children.transformOrigin.y.unit || 'px'
									}
								}
							}
						})
						this.newNode=false
					}
		        },
		        immediate:true,
		        deep:true
		    },
		    realData:{
		        handler:function(val){
					/*console.log("float",this.realData,this.dataValue.value,this.dataValue.value!='')
		            if(this.setStyleTimeout!=null){
		                clearTimeout(this.setStyleTimeout)
		            }
		            this.setStyleTimeout=setTimeout(()=>{
		                this.set()
		            },200)*/
		            
		        },
		        immediate:true,
		        deep:true
		    },
		    VARLIST:{
		        handler:function(val){
		            if(this.store!=null){
		                //仅当在选择需要绑定的属性名称时才会处理  (this.isSameValue && this.realDataContion!=null)
		                if(this.bindName!=null){//说明原先已经统一绑定变量 调出变量界面一定会经过设置bindName的操作，故可根据bindName确定变量绑定对象
		                    let bind=this.bindName 
							this.setted=true
		                    if(bind!=null && bind.startsWith("$")){
		                        bind=bind.replace("$","")
		                    }
		                    if(this.realDataContion!=null)//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
		                        this.realData=this.store.VARLIST[this.realDataContion.replace("$","")].value  
							this.set()
		                }
		        }
		        },
		        immediate:true,
		        deep:true
		    }
		},
		mounted(){
			this.emitProcess()
			System.beforeOpeNodesAction['transform']=()=>{				
				this.showBord=false
				this.newNode=true
			}
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.inputValue(false,false)
					this.$emit("preProcess",'transform',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'transform',callBack)
			},
			set:function(e){
			   	//this.$emit("set","transform",this.childrenData_edit,function(a,b){return true},this.setted)
				try{
					if(this.setted){
						this.$nextTick(()=>{
							this.$emit("set",'transform',this.childrenData_edit,()=>{return true},this.setted)
							this.setted=false
							try{
								if(this.showBord){
									let data=System.getStyle(this.childrenData_edit,'transform',{removeOther:true})
									let box=this.$refs['section'] || document.getElementById("example-element_")
									box.style.transform='translateX(-50%) '+data.transform.transform
									box.style.transformOrigin=data.transform.transformOrigin || 'center'
								}
							}catch(e){
							}
						})
					}
				}catch{
					this.setted=false
				}
				this.inputFocus=false
				
			},
			addEffect:function(){
				let data={
					value:{
						data:{
							transType:"旋转",
							value:[0,0,0,0],
							unit:['','','','deg']
						},
						type:"旋转"
					},
					condition:{
						bindList:null,
						default:""
					}
				}
				this.nowEditIndex=this.effectList.length
				this.effectList.push(data)
				
				try{
					this.childrenData_edit.children['transform'].push(data)
				}catch{
					this.childrenData_edit.children={
						'transfrom':[data],
						'transformOrigin':{
							"x":{
								value:"",
								unit:"px",
								condition:{
									bindList:null,
									default:""
								}
							},
							"y":{
								value:"",
								unit:"px",
								condition:{
									bindList:null,
									default:""
								}
							}
						}
					}
				}
				
				document.getElementById("loadList").scrollTop+=35
				this.setted=true
				this.inputValue()
			},
			callSelectEffectType:function(e,index){
				this.nowEditIndex=index
				this.showSelectType=true
				
				this.$nextTick(()=>{
					if(screen.height-e.clientY<250){
						this.$refs['selectListType'].setSpread({clientX:e.clientX,clientY:e.clientY-100})
					}else{
						this.$refs['selectListType'].setSpread(e)
					}
					
				})
			},
			removeEffect:function(index){
				this.effectList.splice(index,1)
				this.inputValue(true)
			},
			inputValue:function(onlySet=false,emit=true){
				if(this.setDataValueTime!=null)
					clearTimeout(this.setDataValueTime)
				this.setDataValueTime=setTimeout(()=>{
					
					try{
						let shadow=[],origin={}
						let i=this.nowEditIndex
						
						for(i=0;i<this.effectList.length;i++){
								shadow.push(this.effectList[i])
						}
						origin.x=this.position.x
						origin.y=this.position.y
						this.childrenData_edit.children['transform']=shadow
						this.childrenData_edit.children['transformOrigin']=origin
						if(emit){
						this.setted=true
						this.set()
						}
					}catch{}
					this.setDataValueTime=null
				},200)
				
			},
			setEffectType:function(index){
				//this.setted=true
				switch(index.index){
					case 0:
						//透视
						this.effectList[this.nowEditIndex].value.type="透视"
						this.effectList[this.nowEditIndex].value.data={
							transType:"透视",
							value:[1],
							unit:[""]
						}
						break
					case 1:
						//旋转
						this.effectList[this.nowEditIndex].value.type="旋转"
						this.effectList[this.nowEditIndex].value.data={
							transType:"旋转",
							value:[0,0,0,0],//默认第一个为X
							unit:['','','','deg']
						}
						break
					case 2:
						//缩放
						this.effectList[this.nowEditIndex].value.type="缩放"
						this.effectList[this.nowEditIndex].value.data={
							transType:"缩放",
							value:[100,100,100],
							unit:['%','%','%']
						}
						break
					case 3:
						this.effectList[this.nowEditIndex].value.type="拉伸"
						this.effectList[this.nowEditIndex].value.data={
							transType:"拉伸",
							value:[0,0],
							unit:["deg",'deg']
						}
						break
					case 4:
						//移动
						this.effectList[this.nowEditIndex].value.type="移动"
						this.effectList[this.nowEditIndex].value.data={
							transType:"移动",
							value:[0,0,0],
							unit:['px','px','px']
						}
						break
				}
				
				this.effectList[this.nowEditIndex].value.type=this.effectTypeList[index.index]
				this.setted=true
				this.inputValue(true)
			},
			callBord:function(e,index,type){
				
				this.nowEditIndex=index
				this.top=e.clientY
				let touchBottom=false
				if(screen.height-this.top<450){
					touchBottom=true
					this.top-=400
				}
				this.showBord=true
				//显示时加载已有的样式
				this.inputValue()
			},
			blurFocus:function(){
				this.focusTimeout=setTimeout(()=>{
					this.focusIndex=-1
				})
			},
			processFocusIndex:function(index){
				if(this.focusTimeout!=null)
					clearTimeout(this.focusTimeout)
				this.focusIndex=index
			},
			close:function(){
				this.showBord=false
			},
			callColorBord:function(){
				let hex=(255*this.effectList[this.nowEditIndex].value.data['alpha'].split("%")[0]*1/100).toFixed(0)*1
				this.alpha=hex.toString(16)
				this.showColorBord=true
			},
			colorSet:function(color){
				
				this.setted=true
				
				if(color.length==9){
					let alpha=color[7]+color[8]
					this.effectList[this.nowEditIndex].value.data.alpha=(parseInt(alpha, 16)*100/255+0.65).toFixed(0)+"%"
					let tempColor=""
					for(let i=0;i<7;i++){
						tempColor+=color[i]
					}
					color=tempColor
				}
				this.effectList[this.nowEditIndex].value.data.color=color
				this.set()
				/*if(this.childrenData_edit[this.colorGet].condition!=null){//若已绑定变量，同时修改变量值
					let varname=this.childrenData_edit['backgroundColor'].condition.replace("$",'')
					this.store.VARLIST[varname].value=color
				}*/
			},
			startDown:function(e,target){
				
				this.mouseAction.startX=e.clientX
				this.mouseAction.target=target
				if(['positionX','positionY'].includes(this.mouseAction.target)){
					if(!isNaN(this.position[this.nowGettingPosition].value)){
						this.mouseAction.pre=this.position[this.nowGettingPosition].value*1
					}
				}else{
					if(typeof(this.mouseAction.target)=='number')
						this.mouseAction.pre=this.effectList[this.nowEditIndex].value.data.value[target]*1
					else
						this.mouseAction.pre=this.effectList[this.nowEditIndex].value.data.value[target[0]]*1
				}
				
				this.mouseAction.down=true
			},
			mouseMove:function(e){
				this.showBord=true
				if(this.mouseAction.down){
					this.mouseAction.deltaX=e.clientX-this.mouseAction.startX
					if(['positionX','positionY'].includes(this.mouseAction.target)){
						if(!isNaN(this.position[this.nowGettingPosition].value)){
							this.position[this.nowGettingPosition].value=this.mouseAction.pre+this.mouseAction.deltaX	
							}
					}else{
						console.log(this.mouseAction.target)
						if(typeof(this.mouseAction.target)=='number'){
							this.effectList[this.nowEditIndex].value.data.value[this.mouseAction.target]=this.mouseAction.pre+this.mouseAction.deltaX	
						}
						else{
							console.log(this.mouseAction.target)
							for(let i=0;i<this.mouseAction.target.length;i++){
								this.effectList[this.nowEditIndex].value.data.value[this.mouseAction.target[i]]=this.mouseAction.pre+this.mouseAction.deltaX
							}
						}
							
					}
					
					if(this.setDataValueTime!=null)
						clearTimeout(this.setDataValueTime)
					this.setDataValueTime=setTimeout(()=>{
						this.setted=true
						this.inputValue()
					},50)
				}
			},
			mouseUp:function(e){
				this.mouseAction.down=false
				this.deltaX=0
			},
			callFilterSelect:function(e){
				this.showFilterSelect=true
				this.$nextTick(()=>{
					if(screen.height-e.clientY<400){
						this.$refs['selectFilterType'].setSpread({clientX:e.clientX,clientY:screen.height-450})
					}else{
						this.$refs['selectFilterType'].setSpread(e)
					}
				})
			},
			callPositionSelect:function(e){
				this.showPositionSelect=true
				this.$nextTick(()=>{
					if(screen.height-e.clientY<100){
						this.$refs['selectPositionType'].setSpread({clientX:e.clientX,clientY:screen.height-150})
					}else{
						this.$refs['selectPositionType'].setSpread(e)
					}
				})
			},
			setFilterType:function(index){
				let type=Object.keys(this.transformList[this.effectList[this.nowEditIndex].value.type])[index.index]
				this.effectList[this.nowEditIndex].value.data.value[0]=0
				if(type.startsWith("3D")) {
					
					if(screen.height-this.top<300){
						this.top-=300
					}
					this.effectList[this.nowEditIndex].value.data.valueNumber=this.effectList[this.nowEditIndex].value.data
				}
				this.effectList[this.nowEditIndex].value.data.transType=type
			},
			setCssVar:function(use){
				this.effectList[this.nowEditIndex].value.data.color="#ffffff"
				this.effectList[this.nowEditIndex].value.data.code=use
			},
			setPosition:function(index){
				if(index.index==3){
					this.position[this.nowGettingPosition].value=0
					this.position[this.nowGettingPosition].unit="px"
					
				}else{
					let list=this.positionList[this.nowGettingPosition]
					this.position[this.nowGettingPosition].value=list[Object.keys(list)[index.index]]
				}
				this.setted=true
				this.inputValue()
			}
		}
	}
</script>

<style scoped>
	@import url(./css/transform.css);
</style>