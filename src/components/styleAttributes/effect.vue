<template>
	<div class="qucikEditOut" id="radiusEdit" style="position:relative;height:auto;min-height:35px" :style="{'height':`${40+effectList.length*35}px`}">
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;">特       效</pre>
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
					<button class="openBordButton" @click="callBord($event,index,item.type)" style="cursor: pointer;">
						<svg t="1661863427349" class="icon" viewBox="0 0 1572 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2326" width="20" height="30"><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM805.357911 171.767742c-16.04424 0-29.257143-13.212903-29.257143-29.257143V102.871889c0-16.04424 13.212903-29.257143 29.257143-29.257142 16.04424 0 29.257143 13.212903 29.257143 29.257142v39.63871c0 16.04424-13.212903 29.257143-29.257143 29.257143z" p-id="2327" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605zM805.357911 248.528418c-61.974808 0-123.635023 23.59447-170.823963 70.468817-94.063287 94.063287-94.063287 247.270046 0 341.647926 94.063287 94.063287 247.270046 94.063287 341.647926 0 94.063287-94.063287 94.063287-247.270046 0-341.647926-47.18894-47.18894-108.849155-70.468817-170.823963-70.468817zM580.423963 264.88725c-11.325346 11.325346-29.886329 11.325346-41.211674 0l-27.998771-27.998771c-11.325346-11.325346-11.325346-29.886329 0-41.211674 11.325346-11.325346 29.886329-11.325346 41.211674 0l27.998771 27.998771c11.325346 11.325346 11.325346 29.886329 0 41.211674z" p-id="2328" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM487.304455 489.821198c0 16.04424-13.212903 29.257143-29.257143 29.257143H418.408602c-16.04424 0-29.257143-13.212903-29.257143-29.257143 0-16.04424 13.212903-29.257143 29.257143-29.257143h39.63871c16.04424 0 29.257143 13.212903 29.257143 29.257143z" p-id="2329" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605z m-170.823963-443.576037c-94.063287 94.063287-94.063287 247.270046 0 341.647926 47.18894 47.18894 108.849155 70.468817 170.823963 70.468817 61.974808 0 123.635023-23.59447 170.823963-70.468817 94.063287-94.063287 94.063287-247.270046 0-341.647926-94.063287-94.063287-247.270046-94.063287-341.647926 0zM580.423963 714.755146c11.325346 11.325346 11.325346 29.886329 0 41.211674l-27.998771 27.998771c-11.325346 11.325346-29.886329 11.325346-41.211674 0-11.325346-11.325346-11.325346-29.886329 0-41.211674l27.998771-27.998771c11.325346-11.639939 29.886329-11.639939 41.211674 0z" p-id="2330" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM805.357911 807.874654c16.04424 0 29.257143 13.212903 29.257143 29.257143v39.63871c0 16.04424-13.212903 29.257143-29.257143 29.257143-16.04424 0-29.257143-13.212903-29.257143-29.257143v-39.63871c0-16.358833 13.212903-29.257143 29.257143-29.257143z" p-id="2331" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605zM634.533948 660.645161c94.063287 94.063287 247.270046 94.063287 341.647926 0 94.063287-94.063287 94.063287-247.270046 0-341.647926-94.063287-94.063287-247.270046-94.063287-341.647926 0-94.063287 94.063287-94.063287 247.270046 0 341.647926zM1030.291859 714.755146c11.325346-11.325346 29.886329-11.325346 41.211674 0l27.998771 27.998771c11.325346 11.325346 11.325346 29.886329 0 41.211674-11.325346 11.325346-29.886329 11.325346-41.211674 0l-27.998771-27.998771c-11.325346-11.325346-11.325346-29.886329 0-41.211674z" p-id="2332" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-150.375422 0-273.066667-122.376651-273.066667-273.066667 0-150.375422 122.376651-273.066667 273.066667-273.066666 150.375422 0 273.066667 122.376651 273.066667 273.066666s-122.691244 273.066667-273.066667 273.066667z m0-514.359447c-133.072811 0-241.607373 108.219969-241.607373 241.607373s108.219969 241.607373 241.607373 241.607373 241.607373-108.219969 241.607373-241.607373-108.534562-241.607373-241.607373-241.607373zM1123.411367 489.821198c0-16.04424 13.212903-29.257143 29.257143-29.257143H1192.30722c16.04424 0 29.257143 13.212903 29.257143 29.257143 0 16.04424-13.212903 29.257143-29.257143 29.257143h-39.63871c-16.04424 0-29.257143-13.212903-29.257143-29.257143z" p-id="2333" fill="#8a8a8a"></path><path d="M805.357911 762.573272c-69.839631 0-139.679263-26.740399-193.160062-79.906605-106.332412-106.332412-106.332412-279.673118 0-386.00553s279.673118-106.332412 386.00553 0 106.332412 279.673118 0 386.00553c-53.166206 53.166206-123.005837 79.906605-192.845468 79.906605zM805.357911 248.528418c-61.974808 0-123.635023 23.59447-170.823963 70.468817-94.063287 94.063287-94.063287 247.270046 0 341.647926 47.18894 47.18894 108.849155 70.468817 170.823963 70.468817 61.974808 0 123.635023-23.59447 170.823963-70.468817 94.063287-94.063287 94.063287-247.270046 0-341.647926-47.18894-47.18894-108.849155-70.468817-170.823963-70.468817zM1030.291859 264.88725c-11.325346-11.325346-11.325346-29.886329 0-41.211674l27.998771-27.998771c11.325346-11.325346 29.886329-11.325346 41.211674 0 11.325346 11.325346 11.325346 29.886329 0 41.211674l-27.998771 27.998771c-11.325346 11.325346-29.886329 11.325346-41.211674 0z" p-id="2334" fill="#8a8a8a"></path></svg>
					</button>
					<div class="effectType" @click="callSelectEffectType($event,index,index)">
						{{item.type}}
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
			<div @mousemove.stop=""  @mouseup.stop="mouseUp" draggable="false" style="overflow: hidden;position: absolute;right: 260px;width:300px;background-color: var(--mainDarkBg2);z-index: 99999;border-radius: 10px;" :style="{top:`${showType?top:(top+100)}px`,height:`${showType?'200px':'100px'}`}">
				<div @mousemove.stop="mouseMove" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: 2;background-color: transparent;cursor: e-resize;" v-if="mouseAction.down">
				</div>
				<div style="height: 35px;width: 100%;background-color: transparent;border-bottom: 2px solid var(--mainColorGrayBg);" >
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 80px;margin-left: 10px;line-height: 35px;color: var(--mainTextColor1);">{{['内阴影','外阴影'].includes(effectList[nowEditIndex].type)?'阴影设置':'滤镜设置'}}</h3>
					
					<div style="float: right;width: 30px;height: 30px;position: relative;cursor: pointer;" @click="close">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:10px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#e6e6e6" p-id="18203"></path></svg>
					</div>
					<div @click="callFilterSelect" v-if="!showType" style="float: right;width: 80px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 10px;margin-top: 5px;margin-right: 8px;" class="filterTypeButton">
						<svg t="1662012961712" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="float: left;margin-top: 4px;margin-left: 5px;" p-id="2165" width="16" height="16"><path d="M136.533333 634.246095C136.533333 567.588571 169.935238 481.913905 229.571048 379.562667c23.747048-40.706438 51.326781-83.412114 81.978514-127.405105A2906.199771 2906.199771 0 0 1 429.173029 95.583086a2774.250057 2774.250057 0 0 1 49.659123-60.172191l3.969219-4.632381L507.240838 2.633143l24.517486 28.145371 3.959466 4.642134c3.140267 3.666895 6.787657 7.9872 10.942172 12.873142a3313.176381 3313.176381 0 0 1 38.785219 47.289296 2940.362362 2940.362362 0 0 1 117.613714 156.574476c30.593219 43.99299 58.172952 86.698667 81.92 127.405105 59.63581 102.351238 93.037714 188.025905 93.037715 254.683428 0 210.690438-165.800229 381.834971-370.775772 381.834972C302.343314 1016.081067 136.533333 844.936533 136.533333 634.246095m343.186286-497.566476a2801.859048 2801.859048 0 0 0-114.922057 153.102629c-29.696 42.569143-56.32 83.792457-79.160076 122.958019-54.203733 92.94019-84.085029 169.662171-84.085029 221.505828 0 174.947962 137.069714 316.386743 305.688381 316.386743 168.686933 0 305.7664-141.438781 305.7664-316.386743 0-51.843657-29.891048-128.565638-84.094781-221.505828-22.840076-39.165562-49.464076-80.388876-79.091809-122.958019a2869.150476 2869.150476 0 0 0-114.93181-153.112381 4546.998857 4546.998857 0 0 0-27.648-33.811505c-8.572343 10.435048-17.788343 21.7088-27.511467 33.811505" p-id="2166" fill="#e6e6e6"></path><path d="M507.270095 902.397562c-142.833371 0-258.6624-116.90179-258.6624-261.246781 0-144.286476 134.456076-71.241143 258.6624 0 124.781714 71.553219 258.6624-144.286476 258.6624 0 0 144.335238-115.829029 261.246781-258.6624 261.246781" p-id="2167" fill="#e6e6e6"></path></svg>
						<h3 style="width: calc(100% - 30px);text-align: center;margin: 0;padding: 0;float: left;color: var(--mainTextColor1);font-weight: normal;font-size: 12px;margin-top: 3px;margin-left: 3px;">{{filterTypeIndex}}</h3>
					</div>
					<selectListT @change="setFilterType" ref="selectFilterType" v-if="showFilterSelect" :list="Object.keys(filterList)" @close="showFilterSelect=false" :selected="filterTypeIndex"  style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
				</div>
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex" v-if="showType">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 60px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">位置</h3>
					<div style="display:flex;width:calc(45% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==0?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'X')">X</button>
						<input @input="inputValue" v-model="effectList[nowEditIndex].data.X" @blur="blurFocus" @focus="processFocusIndex(0)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
					</div>
					<div style="display:flex;width:calc(45% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==1?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'Y')">Y</button>
						<input @input="inputValue" v-model="effectList[nowEditIndex].data.Y" @blur="blurFocus" @focus="processFocusIndex(1)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
					</div>
				</div>
				<!--阴影效果-->
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex" v-if="showType">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 60px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">效果</h3>
					<div style="display:flex;width:calc(45% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==2?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'B')">B</button>
						<input @input="inputValue" v-model="effectList[nowEditIndex].data.B" @blur="blurFocus" @focus="processFocusIndex(2)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
					</div>
					<div style="display:flex;width:calc(45% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==3?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button class="openBordButton" style="color:var(--mainColorWhite1);line-height:30px" @mousedown.stop="startDown($event,'S')">S</button>
						<input @input="inputValue" v-model="effectList[nowEditIndex].data.S" @blur="blurFocus" @focus="processFocusIndex(3)" style="width:80%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)"/>
					</div>
				</div>
				
				<!--颜色-->
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex" v-if="showType && !effectList[nowEditIndex].data.code">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 60px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">颜色</h3>
					<div style="display:flex;width:calc(80% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==4?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<button @click="callColorBord" style="padding: 0;height: 20px;width: 20px;border: 1px solid var(--mainColorGray2);border-radius: 5px;margin-top:7px;margin-left:10px" :style="{backgroundColor:`${effectList[nowEditIndex].data.color+alpha}`}" ></button>
						<input @input="inputValue" @blur="blurFocus" @focus="processFocusIndex(4)" style="width:45%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)" v-model="effectList[nowEditIndex].data.color"/>
						<input @input="inputValue" @blur="blurFocus" @focus="processFocusIndex(4)" style="width:30%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)" v-model="effectList[nowEditIndex].data.alpha"/>
					</div>
				</div>
				<!--颜色(CSS变量)-->
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex" v-if="showType && effectList[nowEditIndex].data.code">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 60px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">颜色</h3>
					<div style="display:flex;width:calc(80% - 40px);margin-left:10px;height:35px;background-color:var(--mainColorGrayBg2);border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==4?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<input @input="inputValue" @blur="blurFocus" @focus="processFocusIndex(4)" style="width:100%;height:30px;line-height:30px;outline:none;border:none;background:transparent;text-align:center;color:var(--mainTextColor1)" v-model="effectList[nowEditIndex].data.color"/>
					</div>
				</div>
				<div v-if="showType" style="width: 100%;height: 25px;display: flex;">
					<verticalCheckBox @setCheck="setCssVar" :precheck="effectList[nowEditIndex].data.code" style="margin-top: 5px;width: 50px;margin-left: 80px;"></verticalCheckBox>
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 150px;margin-left: 10px;line-height: 30px;color: var(--mainColorWhite1);">使用CSS变量颜色值</h3>
				</div>
				<!--滤镜-->
				<div style="height: 35px;width: 100%;background-color: transparent;margin-top:8px;display:flex" v-if="!showType">
					<h3 style="margin: 0;padding: 0;font-weight: normal;float: left;width: 40px;margin-left: 10px;line-height: 35px;color: var(--mainColorWhite1);">参数</h3>
					<div style="display:flex;width:calc(90% - 40px);margin-left:10px;height:35px;background-color: transparent;border-radius:10px;overflow:hidden" :style="{boxShadow:`${focusIndex==4?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
						<div ref="scrollBar" style="width: calc(65% - 20px);margin-left:10px;height: 10px;background-color:var(--mainColorGrayBg2);border-radius: 10px;margin-top: 13px;position: relative;">
							<div  style="height: 10px;z-index: 1;border-radius: 10px;background-color: var(--mainColorBlue2);" :style="{width:`${filterPercent}%`}"></div>
							<div @mousedown.stop="startDown($event,'')" style="width: 20px;height: 20px;border-radius: 10px;background-color: white;position: absolute;top: -5px;cursor: e-resize;" :style="{left:`calc(${filterPercent}% - 5px)`}"></div>
						</div>
						<!--单位-->
						<div style="width:30%;margin-left: 8%;height: 35px;border-radius: 10px;background-color: var(--mainColorGrayBg2);display: flex;">
							<input style="width: 50%;height: 25px;margin-top: 5px;line-height: 25px;background-color: transparent;color: var(--mainTextColor1);text-align: center;outline: none;border: none;" v-model="effectList[nowEditIndex].data.value"/>
							<h3 style="margin: 0;padding: 0;font-weight: normal;line-height: 25px;width: 35%;margin-top: 5px;color:var(--mainTextColor1);text-align: center;">{{filterUnit[effectList[nowEditIndex].data.filterType]}}</h3>
						</div>
					</div>
				</div>
			</div>
		</teleport>
		<teleport to="body" v-if="showColorBord">
			<colorBord id="fontColorChose" @closeColorBord='showColorBord=false' :immediate="true" :pre="effectList[nowEditIndex].data.color+alpha" style="position: fixed;right:230px;top:45vh;border-radius: 10px;overflow: hidden;box-shadow: -5px 5px 15px rgba(0,0,0,0.25);" @colorSet="colorSet"></colorBord>
		</teleport>
	</div>
</template>

<script>
	import { structStore } from "../../store/struct.js";
	import colorBord from "../microTools/color.vue"
	import selectListT from "../microTools/select2.vue"
	import verticalCheckBox from "../microTools/verticalCheckBox.vue"
	export default{
		name:"float",
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
			verticalCheckBox
		},
		data(){
			try{
				return{
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
					
					thisUnit:"px",
					realData:"",//this.dataValue,//原数据对象,
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
						"外阴影","内阴影","滤镜","背景滤镜"
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
					filterList:{
						"高斯模糊":"blur",//px
						"亮度":"brightness",//percent
						'对比':'contrast',//percent
						"轮廓阴影":'drop-shadow',
						'灰度':"grayscale",//percent
						"色调转换":"hue-rotate",//deg
						"翻转":"invert",//percent
						"透明":"opacity",//percent
						"深色":"sepia",//percent
						"饱和度":"saturate",//percent
						"url":"url",//String
						"继承":'inherit',
						'默认':"initial",
						"还原":"revert",
						"不设置":"unset"
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
					showFilterSelect:false
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
					//是否显示编辑面板
					return ['内阴影','外阴影'].includes(this.effectList[this.nowEditIndex].type) || this.effectList[this.nowEditIndex].data.filterType=='drop-shadow'
				}catch{
					this.effectList=[]
					this.setted=false
					this.showBord=false
					return true
				}
			},
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					this.setted=false
					this.showBord=false
					this.$nextTick(()=>{
						if(Object.prototype.toString.call(val)=='[object Object]'){
							this.childrenData_edit=JSON.parse(JSON.stringify(val))
							//转换
							let shadow=this.childrenData_edit.children['boxShadow'].value
							for(let i=0;i<shadow.length;i++){
								
								this.effectList.push(shadow[i])
							}
							
							try{
								let filter=val.children['filter'].value
								for(let i=0;i<filter.length;i++){
									this.effectList.push(filter[i])
								}
							}catch{}
							try{
								let backdrop=val.children['backdropFilter'].value
								for(let i=0;i<backdrop.length;i++){
									this.effectList.push(backdrop[i])
								}
							}catch{}
							
						}
					})
					this.effectList=[]
					
					
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
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.inputValue(false,false)
					this.$emit("preProcess",'effect',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'effect',callBack)
			},
			set:function(emit=true){
				if(emit)
					this.$emit("set","effect",this.childrenData_edit,function(a,b){return true},this.setted)
				this.setted=false
			},
			addEffect:function(){
				this.nowEditIndex=this.effectList.length
				this.effectList.push({
					data:{
						X:"0",
						Y:"0",
						B:"4",
						S:"0",
						color:"#ffffff",
						code:false,
						alpha:"30%"
					},
					type:"外阴影"
				})
				try{
					this.childrenData_edit.children['boxShadow'].value.push({
						data:{
							X:"0",
							Y:"0",
							B:"4",
							S:"0",
							color:"#ffffff",
							alpha:"30%",
							code:false
						},
						type:"外阴影"
					})
				}catch{
					this.childrenData_edit.children={
						'boxShadow':{
							value:[{
								data:{
									X:"0",
									Y:"0",
									B:"4",
									S:"0",
									color:"#ffffff",
									alpha:"30%",
									code:false
								},
								type:"外阴影"
							}],
							condition:{
								bindList:null,
								default:""
							}
						},
						"filter":{
							value:[],
							condition:{
								bindList:null,
								default:""
							}
						},
						'backdropFilter':{
							value:[],
							condition:{
								bindList:null,
								default:""
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
					this.$refs['selectListType'].setSpread(e)
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
					let shadow=[],filter=[],badkrop=[]
					let i=this.nowEditIndex
					if(!onlySet){
						try{
							if(!this.effectList[i].data.color.startsWith("#")){
								this.effectList[i].data.color="#"+this.effectList[i].data.color
							}
							if(this.effectList[i].data.color.length<7){
								this.effectList[i].data.color=this.effectList[i].data.color.padEnd(7,this.effectList[i].data.color[1])
							}
							if(!this.effectList[i].data.alpha.endsWith("%")){
								this.effectList[i].data.alpha+="%"
							}
						}catch{}
						
					}
					
					for(i=0;i<this.effectList.length;i++){
						if(["内阴影",'外阴影'].includes(this.effectList[i].type)){
							
							shadow.push(this.effectList[i])
						}else if(this.effectList[i].type=='滤镜'){
							filter.push(this.effectList[i])
						}else if(this.effectList[i].type=='背景滤镜'){
							badkrop.push(this.effectList[i])
						}
					}
					this.childrenData_edit.children['boxShadow'].value=shadow
					this.childrenData_edit.children['filter'].value=filter
					this.childrenData_edit.children['backdropFilter'].value=badkrop
					if(emit){
					this.setted=true
					this.set()
					}
					this.setDataValueTime=null
				},200)
			},
			setEffectType:function(index){
				//this.setted=true
				if(index.index>1){
					
					
					this.effectList[this.nowEditIndex].data={
						filterType:"blur",
						value:5
					}
				}else{
					this.effectList[this.nowEditIndex].data={
						X:"0",
						Y:"0",
						B:"4",
						S:"0",
						color:"#ffffff",
						alpha:"30%",
						code:false
					}
				}
				
				this.effectList[this.nowEditIndex].type=this.effectTypeList[index.index]
				this.setted=true
				this.inputValue(true)
			},
			callBord:function(e,index,type){
				
				this.nowEditIndex=index
				this.top=e.clientY
				let touchBottom=false
				if(screen.height-this.top<350){
					touchBottom=true
					this.top=screen.height-400
				}
				this.showBord=true
				if(['内阴影','外阴影'].includes(type)){
					let hex=(255*this.effectList[this.nowEditIndex].data['alpha'].split("%")[0]*1/100).toFixed(0)*1		
					this.alpha=hex.toString(16)	
				}else{
					if(this.effectList[this.nowEditIndex].filterType!="drop-shadow"){
						this.top-=120
						
					}
					for(let key in this.filterList){
						if(this.filterList[key]==this.effectList[this.nowEditIndex].data.filterType){
							this.filterTypeIndex=key
							break
						}
					}
					
					//计算滑动条位置占比
					if(this.effectList[this.nowEditIndex].data['filterType']=='blur'){
						let value=this.effectList[this.nowEditIndex].data.value
						this.filterPercent=(value/500)*100
					}else if(this.effectList[this.nowEditIndex].data['filterType']=='hue-rotate'){
						let value=this.effectList[this.nowEditIndex].data.value
						this.filterPercent=(value/360)*100
					}
					else if(this.effectList[this.nowEditIndex].data['filterType']!='drop-shadow'){
						let value=this.effectList[this.nowEditIndex].data.value
						this.filterPercent=value
					}
					this.$nextTick(()=>{
						this.scrollBarLeft=this.$refs['scrollBar'].getBoundingClientRect().x.toFixed(0)*1
						this.scrollBarWidth=this.$refs['scrollBar'].getBoundingClientRect().width.toFixed(0)*1
					})
				}
				
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
				let hex=(255*this.effectList[this.nowEditIndex].data['alpha'].split("%")[0]*1/100).toFixed(0)*1
				this.alpha=hex.toString(16)
				this.showColorBord=true
			},
			colorSet:function(color){
				
				this.setted=true
				if(color.length==9){
					let alpha=color[7]+color[8]
					this.effectList[this.nowEditIndex].data.alpha=(parseInt(alpha, 16)*100/255+0.65).toFixed(0)+"%"
					let tempColor=""
					for(let i=0;i<7;i++){
						tempColor+=color[i]
					}
					color=tempColor
				}
				this.effectList[this.nowEditIndex].data.color=color
				this.set()
				/*if(this.childrenData_edit.children[this.colorGet].condition!=null){//若已绑定变量，同时修改变量值
					let varname=this.childrenData_edit.children['backgroundColor'].condition.replace("$",'')
					this.store.VARLIST[varname].value=color
				}*/
			},
			startDown:function(e,target){
				
				this.mouseAction.startX=e.clientX
				this.mouseAction.target=target
				if(["内阴影",'外阴影'].includes(this.effectList[this.nowEditIndex].type)){
					this.mouseAction.pre=this.effectList[this.nowEditIndex].data[target]*1
				}
				this.mouseAction.down=true
			},
			mouseMove:function(e){
				if(this.mouseAction.down){
					
					this.mouseAction.deltaX=e.clientX-this.mouseAction.startX
					if(["内阴影",'外阴影'].includes(this.effectList[this.nowEditIndex].type)){
						this.effectList[this.nowEditIndex].data[this.mouseAction.target]=this.mouseAction.pre+this.mouseAction.deltaX
					}else{
						//滤镜位置
						if(e.clientX<=(this.scrollBarLeft+this.scrollBarWidth) && e.clientX>=this.scrollBarLeft){
							this.filterPercent=((e.clientX-this.scrollBarLeft)*100/this.scrollBarWidth).toFixed(0)
							if(this.effectList[this.nowEditIndex].data['filterType']=='blur'){
								this.effectList[this.nowEditIndex].data["value"]=5*this.filterPercent
							}else if(this.effectList[this.nowEditIndex].data['filterType']=='hue-rotate'){
								this.effectList[this.nowEditIndex].data["value"]=(360*this.filterPercent/100).toFixed(0)
							}
							else{
								this.effectList[this.nowEditIndex].data["value"]=this.filterPercent
							}
						}
					}
					if(this.setDataValueTime!=null)
						clearTimeout(this.setDataValueTime)
					this.setDataValueTime=setTimeout(()=>{
						this.setted=true
						this.set()
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
			setFilterType:function(index){
				this.filterTypeIndex=Object.keys(this.filterList)[index.index]
				if(this.filterTypeIndex=='轮廓阴影'){
					this.effectList[this.nowEditIndex].data={
						X:"0",
						Y:"0",
						B:"5",
						S:"0",
						color:"#ffffff",
						code:false,
						alpha:"30%"
					}
				}
				this.effectList[this.nowEditIndex].data.filterType=this.filterList[this.filterTypeIndex]
			},
			setCssVar:function(use){
				this.effectList[this.nowEditIndex].data.color="#ffffff"
				this.effectList[this.nowEditIndex].data.code=use
			}
		}
	}
</script>

<style scoped>
	@import url(./css/effect.css);
</style>