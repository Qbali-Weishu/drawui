<!--素材仓库-->
<template>
	<div id="hubOut" style="height: 50vh;min-height: 450px;max-height: 600px;width: 60vw;min-width: 700px;z-index: 999;box-shadow: -3px 3px 15px rgba(198,198,198,0.8);" >
			<teleport to="body" v-if="search.show">
				<div id="filesearchBarOut">
					<div style="position: absolute;width: 100%;height: 100%;top:0;left: 0;background-color: transparent;" @click="search.show=false;search.showResult=false;search.result=[];search.searchTimeOut=null;search.searchTypeIndex=0"></div>
					<div id="filesearchBar">
						<selectList :list="search.searchType" :selected="search.searchType[search.searchTypeIndex]" :width="'100px'" @change="function(data){search.searchTypeIndex=data.index}" style="z-index: 109;;margin: 0;background-color:var(--mainColorBlue2);color: white;font-weight: normal;position: absolute;left: 10px;top: 13px;">
						</selectList>
						<input id="searchArea" placeholder="搜索" v-model="search.target"/>
						<button style="position: absolute;right: 20%;top:17px;color: var(--mainColorGray4);box-shadow: 0px 0px 5px rgba(200,200,200,0.8);border-radius: 10px;padding: 0;width: 20px;height: 20px;" @click="search.target=''">X</button>
						<button @click="searchAction" style="background-color: var(--mainColorBlue2);width: 15%;height: 30px;position: absolute;right: 10px;top: 10px;border-radius:10px;color:white;padding: 0;letter-spacing: 3px;">搜索</button>
					</div>
					<div id="searchResult" v-if="search.showResult">
						<div class="searchResultItem" v-for="(item,index) in search.result" @click="goToResult(item.path)">
							<h3 style="margin: 0;color:rgba(0,0,0,1);font-weight: normal;">{{item.name}}</h3>
							<h4 style="margin: 0;font-weight: normal;">{{item.path}}</h4>
						</div>
						<!--img v-if="search.result.length==0 && !search.noResult" :src="imgList['searching']" style="object-fit:contain;width: 50%;height: 50%;position: absolute;transform: translate(-50%,-50%);border-radius: 15px;left: 50%;top:50%"/>
						<img v-if="search.noResult" :src="imgList['notFound']" style="object-fit:contain;width: 50%;height: 50%;position: absolute;transform: translate(-50%,-50%);border-radius: 15px;left: 50%;top:50%"/-->
						<h4 v-if="(search.result.length==0 && !search.noResult) || search.noResult" style="margin: 0;position: absolute;bottom:20px;left: 50%;transform: translateX(-50%);font-weight: normal;letter-spacing: 3px;color:var(--mainColorGray4)">{{search.noResult ? '无结果':'搜索中...'}}</h4>
					</div>
				</div>
			</teleport>
			<!--文件接收列表-->
			<div id="acceptList" class="acceptList" :style="{transform:`scale(${ accept.show ? '1' :'0'})`,opacity:`${accept.show ? '1' :'0'}`}">
				<button @click="accept.show=false" style="background-color: var(--mainColorBlue2);color: white;float: left;border-radius: 10px;width: 55px;margin: 5px;">关闭</button>
				<sendList :style="{opacity:`${ accept.show ? '1' :'0'}`}" style="width: 100%;height: 80%;overflow-y: scroll;"></sendList>
			</div>
			<fileShare v-if="menu.share" :path="menu.shareFilePath"></fileShare>
			<!--文件接收列表-->
			<div id="head">
				<selectList :list="hubList" :selected="hubList[hub]" :width="'100px'" @change="changeHub" style="z-index: 109;;margin: 0;background-color:var(--mainColorBlue2);color: white;font-weight: normal;position: absolute;left: 10px;top: 5px;">
				</selectList>
				<!--全选按钮-->
				<button v-if="menu.chose" @click="choseAllFile" style="width: auto;height: 25px;background-color: transparent;color:var(--mainColorBlue2);position: absolute;top:5px;left: 130px;border-radius: 5px;padding-left: 10px;padding-right: 10px;">{{menu.choseAll ? '取消全选' :'全选'}}</button>
				<!--全选按钮-->
				<h2 style="margin: 0;padding: 0;font-weight: normal;line-height: 40px;">资源仓库</h2>
			</div>
			<div v-if="isShowFile" id="showFiles" style="transition: .3s;background-color: transparent;position: absolute;z-index: 9;overflow: hidden;">
				<button v-if="isShowFile" class="closeViewButton" id="closeViewFrameButton" @click="closeView">返回</button>
			</div>
			<hr style="border: none;outline: none;background-color: var(--mainColorGray2);height: 1px;">
			<main class="hubMain" >
				<div class="hubLeftBar">
					<button class="leftButton" @click="nowHubType=0;getFileList()" :style="{backgroundColor:`${nowHubType==0?'var(--mainColorBlue2)':'white'}`,color:nowHubType==0? 'white':'var(--mainColorBlue2)'}">文件资源</button>
					<button class="leftButton" @click="nowHubType=1;getFileList()" :style="{backgroundColor:`${nowHubType==1?'var(--mainColorBlue2)':'white'}`,color:nowHubType==1? 'white':'var(--mainColorBlue2)'}">样式资源</button>
					<button class="leftButton" @click="nowHubType=2;getFileList()" :style="{backgroundColor:`${nowHubType==2?'var(--mainColorBlue2)':'white'}`,color:nowHubType==2? 'white':'var(--mainColorBlue2)'}">组件资源</button>
					<div style="position: absolute;bottom: 5px;height: 35px;width: 100%;left: 0;display: flex;">
						<!--上传按钮-->
						<button style="background-color: transparent;width: 30%;height: 35px;" @click="openUploadInput">
							<svg t="1651295754764" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1965" width="20" height="20"><path d="M512 700.276364a34.909091 34.909091 0 0 1-34.909091-34.909091v-465.454546a34.909091 34.909091 0 1 1 69.818182 0v465.454546a34.909091 34.909091 0 0 1-34.909091 34.909091zM837.818182 919.272727H186.181818A81.454545 81.454545 0 0 1 104.727273 837.818182v-93.090909a34.909091 34.909091 0 0 1 69.818182 0v93.090909a11.636364 11.636364 0 0 0 11.636363 11.636363h651.636364a11.636364 11.636364 0 0 0 11.636363-11.636363v-93.090909a34.909091 34.909091 0 0 1 69.818182 0v93.090909a81.454545 81.454545 0 0 1-81.454545 81.454545z" p-id="1966" fill="#3662EC"></path><path d="M279.272727 407.505455a34.210909 34.210909 0 0 1-24.669091-10.24 34.676364 34.676364 0 0 1 0-49.338182l232.727273-232.727273a34.909091 34.909091 0 0 1 49.338182 49.338182l-232.727273 232.727273a34.210909 34.210909 0 0 1-24.669091 10.24z" p-id="1967" fill="#3662EC"></path><path d="M744.727273 407.505455a34.210909 34.210909 0 0 1-24.669091-10.24l-232.727273-232.727273a34.909091 34.909091 0 1 1 49.338182-49.338182l232.727273 232.727273a34.676364 34.676364 0 0 1 0 49.338182 34.210909 34.210909 0 0 1-24.669091 10.24z" p-id="1968" fill="#3662EC"></path></svg>
						</button>
						<!--文件接收列表按钮-->
						<button style="background-color: transparent;width: 30%;height: 35px;" @click="accept.show=true">
							<svg t="1651295897549" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2735" width="20" height="20"><path d="M752.792079 76.039604h-359.920792a126.732673 126.732673 0 0 0-126.428515 121.663366H253.465347a110.612277 110.612277 0 0 0-109.294258 111.524753v527.207921A110.612277 110.612277 0 0 0 253.465347 947.960396h395.40594a110.612277 110.612277 0 0 0 109.294258-111.524752v-10.138614A126.935446 126.935446 0 0 0 879.524752 699.564356V202.772277a126.935446 126.935446 0 0 0-126.732673-126.732673zM648.871287 897.267327H253.465347a59.919208 59.919208 0 0 1-58.601189-60.831683v-527.207921a59.919208 59.919208 0 0 1 58.601189-60.831683h12.369108V699.564356a126.935446 126.935446 0 0 0 126.732674 126.732674h314.297029v10.138614a59.919208 59.919208 0 0 1-57.992871 60.831683zM828.831683 699.564356a76.039604 76.039604 0 0 1-76.039604 76.039604h-359.920792a76.039604 76.039604 0 0 1-76.039604-76.039604V202.772277a76.039604 76.039604 0 0 1 76.039604-76.039604h359.920792a76.039604 76.039604 0 0 1 76.039604 76.039604z" fill="#3662EC" p-id="2736"></path><path d="M461.306931 476.514851h60.831683a66.002376 66.002376 0 0 0 65.90099-65.90099v-121.663366a66.002376 66.002376 0 0 0-65.90099-65.90099h-60.831683a66.002376 66.002376 0 0 0-65.90099 65.90099v121.663366a66.002376 66.002376 0 0 0 65.90099 65.90099zM446.09901 288.950495a15.410693 15.410693 0 0 1 15.207921-15.207921h60.831683a15.410693 15.410693 0 0 1 15.207921 15.207921v121.663366a15.410693 15.410693 0 0 1-15.207921 15.207921h-60.831683a15.410693 15.410693 0 0 1-15.207921-15.207921zM724.910891 223.049505h-70.970297a25.346535 25.346535 0 0 0 0 50.693069h70.970297a25.346535 25.346535 0 0 0 0-50.693069zM724.910891 324.435644h-70.970297a25.346535 25.346535 0 0 0 0 50.693069h70.970297a25.346535 25.346535 0 0 0 0-50.693069zM724.910891 425.821782h-70.970297a25.346535 25.346535 0 0 0 0 50.693069h70.970297a25.346535 25.346535 0 0 0 0-50.693069zM724.910891 527.207921h-304.158416a25.346535 25.346535 0 0 0 0 50.693069h304.158416a25.346535 25.346535 0 0 0 0-50.693069zM724.910891 628.594059h-304.158416a25.346535 25.346535 0 0 0 0 50.69307h304.158416a25.346535 25.346535 0 0 0 0-50.69307z" fill="#3662EC" p-id="2737"></path></svg>
						</button>
						<input v-if="loadUploadInput" type="file" id="hub_upload" style="display: none;" @change="inputChange" multiple/>
					</div>
				</div>
				<div class="sourceList">
					<!--访问路径-->
					<div id="pathRecord" class="pathRecord" style="margin-left: -15px;">
						<div style="width: 100%;display: flex;white-space: normal;line-height: 30px;flex-shrink: 0;height: 100%;"> 
							<button class='pathButton' v-for="(item,index) in path[pathIndex[nowHubType]]" :key="index" @click="backToLast(index)">
							{{item}}
							<span class="pathSplit">/</span>
							<hr style="height: 2px;border-radius: 2px;width:100%;position: absolute;bottom: -15px;left: 0;border: none;outline: none;background-color: var(--mainColorGray2);" v-if="index==getLastIndex()">
							</button>
						</div>
					</div>
					<!--访问路径-->
					<!--文件列表-->
					<!--draggabl需要参考rename，当rename为true时表示正在进行更名操作，取消可拖动操作，允许input选择-->
					<div id="files" @mousewheel="wheel" @dragover="dragover" @drop="drop" :draggable="!rename"
					 :style="{backgroundImage:`url(${fileList.length==0 ? imgList['empty'] :''})`}"
					 style="background-size: contain;background-repeat: no-repeat;background-position: center;height: calc(100% - 40px);width: 100%;background-color: transparent;overflow-y: scroll;;overflow-x: hidden;position: relative;">
						<h4 v-if="fileList.length==0" style="position: absolute;bottom: 0px;margin:0;left: 50%;transform: translateX(-50%);color: var(--mainColorGray2);font-weight: normal;">空空如也~ 请上传文件到此处</h4>
						<div  class="fileBord"  style="width: 100%;height: auto;" >
							
							<div :class="'fileItem_'+index" style="position: relative;margin-top: 10px;margin-left:10px;background-color: rgba(255,255,255,0.8);display: flex;flex-direction: column;" v-for="(item,index) in fileList">
								<!--预览图片-->
								<div class="fileItem" @contextmenu="callContextMenu($event,item,index)" @click="openFile(item,$event)" style="background-color: white;transform-origin: center;overflow: hidden;background-size: contain;background-position: center;background-repeat: no-repeat;height: 70%;margin-bottom: 10%;width:90%;margin-left: 5%;border-radius: 10px;box-shadow: -3px 3px 15px rgba(0,0,0,0.25);">
									<img @error="fileError" :src="`${item.type=='folder'?imgList['folder'] :imageFileTemp[item.name]}`" style="height: 100%;width:100%;object-fit: contain;">
								</div>
								<!--预览图片-->
								
								<!--更名输入框-->
								<input draggable="false" style="bottom: 8.5%;width: 80%;height: 20px;position: absolute;left:10%;outline: none;border: none;background-color:rgba(228,228,228,1);border-radius: 8px;z-index: 99;text-align: center;" 
								v-if="!hasSameFile&&rename&& (( item.type!='folder'&&(sameFile['pre'].name+'.'+sameFile['pre'].fileL==item.name)) || (item.type=='folder'&&sameFile['pre'].name==item.name))" v-model="sameFile['new'].name"
								@click="function($event){$event.stopPropagation()}"/>
								<!--更名输入框-->
								
								<!--选择输入框-->
								<input type="checkbox" style="opacity: 0;" :data-name='item.name' :data-index='index' v-if="menu.chose" @click="chose" :checked="mouse.choseList[item.name]!=undefined"/>
								<!--选择输入框-->
								
								<!--选择展示-->
								<div class="showForChose" v-if="menu.chose"></div>
								<!--选择展示-->
								<!--名称-->
								<h4 style="margin: 0;border-radius: 5px;border: none;height: 20px;line-height: 20px;width: auto;width: calc(100% - 15px);transition: .15s;" 
								:style="{marginLeft:`${menu.chose ? '15px' : '0' }`,backgroundColor:`${(search.resultTarget!=null && search.resultTarget==item.name) ?'var(--mainColorGray)' : 'transparent' }`}">{{item.name}}</h4>
								<!--名称-->
							</div>
						</div>
					</div>
				</div>
				<!--文件重名-->
			</main>
			<teleport to="body" v-if="hasSameFile">
				<div id="drawUI_sameFile" style="text-align: center;box-shadow: -2px 2px 15px rgba(128,128,128,0.25);border-radius: 10px;top:30vh;left:25vw;height: 40vh;min-height: 300px;width: 50vw;min-width:500px;background-color:rgba(255,255,255,0.85);backdrop-filter:blur(10px);position:absolute;z-index: 999;">
					<h3 style="font-weight: bold;color: var(--mainColorGray2);">文件重名</h3>
					<div style="display: flex;width: 100%;height: 70%;justify-content: center;">
						<!--已存在文件-->
						<div style="display: flex;flex-direction: column;width: 50%;justify-content: center;align-items: center;height: 95%;">
							<div  style="background-color: white;transform-origin: center;overflow: hidden;background-size: contain;background-position: center;background-repeat: no-repeat;height: 90%;margin-bottom: 5%;width:70%;margin-left: 0%;border-radius: 10px;box-shadow: -3px 3px 15px rgba(0,0,0,0.25);">
								<img @error="fileError" :src="sameFile['pre'].src" style="height: 100%;width:100%;object-fit: contain;">
							</div>
							<input class="sameFileInput" v-model="sameFile['pre'].name" :style="{boxShadow:`${rename?'1px 1px 10px rgba(0,0,0,0.25)':''}`}" :readonly="!rename">
						</div>
						<!--新文件-->
						<div style="display: flex;flex-direction: column;width: 50%;justify-content: center;align-items: center;height: 95%;">
							<div  style="background-color: white;transform-origin: center;overflow: hidden;background-size: contain;background-position: center;background-repeat: no-repeat;height: 90%;margin-bottom: 5%;width:70%;margin-left:0%;border-radius: 10px;box-shadow: -3px 3px 15px rgba(0,0,0,0.25);">
								<img @error="fileError" :src="sameFile['new'].src" style="height: 100%;width:100%;object-fit: contain;">
							</div>
							<input class="sameFileInput" v-model="sameFile['new'].name" :style="{boxShadow:`${rename?'1px 1px 10px rgba(0,0,0,0.25)':''}`}" :readonly="!rename">
						</div>
					</div>
					<div style="width: 100%;height: 15%;display: flex;align-items: center;justify-content: center;">
						<button style=";width: 30%;border-right: 1px solid var(--mainColorGray);color: var(--mainColorRed);border-radius: 10px 0 0 10px;" class="sameFileButton" @click="cancleUpload">取消</button>
						<button style="width: 30%;border:none;color:var(--mainColorBlue);border-radius:none"  class="sameFileButton" @click="renameFile">{{rename?'保存':"重命名"}}</button>
						<button style=";width: 30%;border-left: 1px solid var(--mainColorGray);color: var(--mainColorBlue);border-radius:0 10px 10px 0;" class="sameFileButton" @click="replaceFile">替换原文件</button>
					</div>
				</div>
			</teleport>
			<!--右键菜单-->
			<teleport to="body">
				<div id="hubRightButton" v-if="menu.show" :style="{top:`${menu.top}`,left:`${menu.left}`}"> 
					<h3 style="overflow: hidden;text-overflow:ellipsis;font-weight:normal;margin:0;color:var(--mainColorBlue)" v-if="menu.isFile">{{menu.fileName}}</h3>
					<div class='rightButtonOptions' :style="{borderTop:`${item.remove!=undefined ? '2px solid var(--mainColorGray)' :'none'}`,borderRadius:`${item.remove!=undefined ? '0 0 8px 8px' :'8px'}`}" v-for="(item,index) in menu.option" @click="item.event();menu.show=false">
						{{item.name}}
					</div>
				</div>
			</teleport>
			<!--右键菜单-->
	</div>
</template>

<script>
	import DomTreeEngine from '../engines/domtree.js'
	import selectList from "./microTools/select.vue"
	import { structStore } from "../store/struct.js";
	import hubFunctions from "./mixin/hub/hub.js"
	import hubAnimate from "./mixin/hub/animate.js"
	import sendList from "./mixin/hub/sendList.vue"
	import fileShare from "./mixin/hub/share.vue"
	const startPath="../userProject/project/"
	let showAcceptList_out=true
	function closeHub(){
		let box = document.getElementById("hubOut")
		if(box){
			exportData.methods.setShowAcceptListFalse()
			try{
				document.getElementById("acceptList").style.transform="scale(0)"
			}catch{}
			setTimeout(()=>{
				box.style.transformOrigin="10% center"
				box.style.transform="scale(0) translateX(-50%)"
				box.style.opacity="0"
			},100)
		}
	}
	let exportData={
		name:"hub",
		close:closeHub,
		components:{
			selectList,
			fileShare,
			sendList
		},
		provide(){
			return{
				parent:this
			}
		},
		data(){
			return{
				externalUpload_success:null,//外部组件请求上传文件完成时处理函数,也可设置为image与file两个字符串，用于在外部组件请求时选中文件的对应处理
				showAcceptList:false,//控制接受列表显示
				uploadPath:"FILES/",//文件上传地址
				userProjectPath:startPath+window.USERPATH+"/resource/",//用户项目地址
				hubList:['个人仓库',"项目仓库"],
				hubListIndex:["Mine","Project"],
				hub:1,//仓库类别,0个人仓库，1项目仓库
				nowHubType:0,//区分pathIndex
				store:null,
				pathIndex:['FILES','STYLE','COMPONENTS'],//根据nowHubtype在pathIndex中获取path的key
				scrollTop:0,
				path:{
					FILES:['根目录'],
					STYLE:['根目录'],
					COMPONENTS:['根目录'],
				},
				fileList:[],//当前层次的文件列表
				imgList:{
					"folder":require("../assets/img/folder.png"),
					"image":require("../assets/img/image.png"),
					"video":require("../assets/img/video.png"),
					"audio":require("../assets/img/audio.png"),
					"text":require("../assets/img/text.png"),
					"application":require("../assets/img/text.png"),
					"unknown":require("../assets/img/unknown.png"),
					"error":require("../assets/img/error.png"),
					"empty":require("../assets/img/empty.png"),
					"searching":require("../assets/img/searching.png"),
					"notFound":require("../assets/img/notFound.png")
				},
				imageFileTemp:	//图片文件路径存储，采用懒加载方式，此项存储已经加载的地址，以v-for的index作为键名
				{
					
				},
				isShowFile:false,//是否打开文件预览
				newFile:null,//新上传的文件
				sameFile:{//上传出现同名文件时修改界面使用
					'pre':{
						name:"旧文件",
						nameTemp:"",//修改名称时暂存原先名称
						fileL:"",//文件后缀
						src:require("../assets/img/image.png")
					},
					'new':{
						name:"新文件",
						nameTemp:"",//修改名称时暂存原先名称
						fileL:"",//文件后缀
						src:require("../assets/img/image.png")
					}
				},
				renameFileData:{//已有文件重命名使用
					'pre':"",//,原文件名
					'new':"",//新文件名
				},
				viwOnlie:['images/','video/','audio/','text/','application/'],//支持在线查看的
				hasSameFile:false,//显示重名文件是否存在
				rename:false,
				entrance:{},//仓库入口地址,在getFile中更新
				loadUploadInput:false,//控制是否渲染上传input组件，在需要上传时再渲染，防止出现文件相同时不触发change事件
				menu:{//右键菜单
					isPatse:false,//标记是否为粘贴状态
					isCut:false,//标记是否剪切，以在粘贴时从原路径中删除
					show:false,
					top:'30%',
					left:"30%",
					share:false,
					isFile:false,//标记是否为文件右键
					fileName:"",//文件名称
					chose:false,//标记是否为选择状态
					choseAll:false,//标记是否全选
					shareFilePath:"",//记录分享文件的原路径地址
					choseText:"选择",
					option:[
						{name:"刷新",event:()=>{_this.getFileList();}},
						{name:"新建文件夹",event:()=>{hubFunctions.createNewFolder.call(this);}},
						{name:"选择",event:()=>{
							if(this.menu.chose){
								this.menu.chose=false
								console.log(this.menu.option[1])
								this.menu.option[1].name="选择"
							}else{
								this.menu.chose=true
								this.mouse.choseList={}
								console.log(this.menu.option[1])
								this.menu.option[1].name="取消选择"
							}
						}},
						{name:"粘贴",event:()=>{
							hubFunctions.patse.call(this)
						}},
						{name:"查找",event:()=>{
							this.search.target=""
							this.search.result=[]
							this.search.noResult=false
							this.search.show=true
						}}
					]
				},
				search:{
					searchType:['精确查找',"范围查找"],
					searchTypeIndex:0,
					show:false,
					showResult:false,
					result:[],
					target:"",
					searchTimeOut:null,
					overTime:null,//搜索时限，10s
					noResult:false,//无搜索结果时使用
					resultTarget:null//搜索完成的对象，用于跳转目标位置时凸显目标对象,点击目标对象时重置
				},
				keyBord: {
				  Shift: false,
				  Control: false,
				},
				mouse:{
					isDown:false,//记录鼠标是否按下
					isDownMove:false,//记录鼠标按下且移动
					choseStartIndex:-1,//记录选择起始位置
					choseEndIndex:-1,//记录选择结束位置
					choseList:{},//记录被选中
				},
				accept:{
					show:false//是否显示接收列表
				},
				uploadType:1//1为hub本体上传，0位外部组件调用
			}
		},
		computed:{
			searchTarget(){
				return this.search.target
			},
			searchResult(){
				return this.search.result
			}
		},
		watch:{
			searchTarget:{
				handler:function(val){
					if(this.search.searchTimeOut!=null){
						clearTimeout(this.search.searchTimeOut)
						this.search.setTimeout=null
					}
					this.search.searchTimeOut=setTimeout(()=>{
						this.search.result=[]//重置搜索结果
						if(val.length==0){
							this.search.showResult=false
						}else{
							this.search.showResult=true
							this.search.overTime=setTimeout(()=>{
								this.search.noResult=true//10s内没有找到目标则判定文件不存在
							},10000)
							hubFunctions.search.call(this,val,this.search.searchTypeIndex)//精确查找  1范围查找
						}
					},300)
				},
				immediate:true,
				deep:true
			},
			searchResult:{
				handler:function(val){
					if(val.length!=0){//出现搜索结果时清除超时定时器
						this.search.noResult=false
						clearTimeout(this.search.overTime)
					}
				},
				immediate:true,
				deep:true
			}
		},
		mounted(){
			window.externalSetUploadPath=this.externalSetUploadPath//将上传路径地址设置函数置为系统事件
			window.externalUpload=this.upload;
			window.hubProvideFile=this.provideFile;
			if(this.store==null){
				this.store=structStore()
				this.getFileList()
			}
			this.$nextTick(()=>{
				document.getElementById("pathRecord").addEventListener("wheel",function(e){
					let dertaY=e.deltaY
					if(dertaY<0){
						dertaY=-20
					}else
						dertaY=20
					document.getElementById("pathRecord").scrollLeft+=dertaY
				})
				this.showAcceptList=false
			})
			let _this=this
			document.getElementById("hubOut").addEventListener("click",function(e){
				_this.menu.show=false//点击其他地方时关闭右键菜单
				_this.search.target=""
				_this.search.result=[]
				_this.search.resultTarget=null
				_this.search.noResult=false
				if(_this.rename){//正在进行更名操作,此时为更名保存
					_this.renameFile()
				}
			})
			this.setMainContextMenu()
		},
		methods:{
			//设置文件列表主界面的右键相应事件
			setMainContextMenu:function(){
				let _this=this
				document.getElementById("hubOut").addEventListener("contextmenu",function(e){
					e.preventDefault()
					e.stopPropagation()
					
					if(_this.externalUpload_success==null){
						let text= _this.menu.chose ? '取消选择':"选择"
						if(e.button==2){//右键事件
							_this.menu.show=true
							_this.menu.isFile=false
							_this.menu.top=e.pageY+'px'
							_this.menu.left=e.pageX+'px'
							_this.menu.option=[
								{name:"刷新",event:()=>{_this.getFileList();}},
								{name:"新建文件夹",event:()=>{hubFunctions.createNewFolder.call(_this);}},
								{name:text,event:function(e){
									if(_this.menu.chose){//取消选择
										
										_this.mouse.choseList={}
										_this.menu.chose=false
									}else{
										_this.mouse.choseList={}//每次开始选择都要置空上次选择列表
										_this.menu.chose=true
									}
								}},
								{name:"粘贴",event:function(){
									hubFunctions.patse.call(_this)
								}},
								{name:"查找",event:function(){
									_this.search.target=""
									_this.search.result=[]
									_this.search.noResult=false
									_this.search.show=true
								}}
							]
						}
					}

				})
			},
			setShowAcceptListFalse:function(){
				this.showAcceptList=false
			},

			changeHub:function(data){
				this.hub=data.index
				this.getFileList()
			},
			choseAllFile:function(){
				if(this.menu.choseAll){
					this.menu.choseAll=false
					this.mouse.choseList={}
				}else{
					let name
					for(let i in this.fileList){
						name=this.fileList[i].name
						this.mouse.choseList[name]={type:this.fileList[i].type,data:this.entrance[name].data}
						name=null
					}
					this.menu.choseAll=true
				}
			},
			chose:function(e){
				let _this=this
				let name=e.target.dataset.name
				let index=e.target.dataset.index
				console.log(window.Shift,"sssf")
				if(e.target.checked){
					try{
						if(window.Shift){//shift连续选择
							if(this.choseStartIndex==-1){
								this.mouse.choseStartIndex=index
								this.mouse.choseEndIndex=index
							}else if(index<this.mouse.choseStartIndex){
								this.mouse.choseEndIndex=this.mouse.choseEndIndex
								this.mouse.choseStartIndex=index
							}else{
								this.mouse.choseEndIndex=index
							}
							for(let i=this.mouse.choseStartIndex;i<=this.mouse.choseEndIndex*1;i++){
								this.mouse.choseList[this.fileList[i].name]={type:this.fileList[i].type,data:this.entrance[name].data}
							}
							//console.log("err",this.mouse.choseList)
						}else if(window.Control){
							this.mouse.choseList[name]={type:this.entrance[name].type,data:this.entrance[name].data}
						}else{
							this.mouse.choseStartIndex=index
							this.mouse.choseList={}
							this.mouse.choseList[name]={type:this.entrance[name].type,data:this.entrance[name].data}
						}
					}catch(e){
						
					}
				}
				else{
					delete this.mouse.choseList[name]
				}
				console.log(this.mouse.choseList)
			},
			searchAction:function(){
				let val=this.search.target
				console.log(val)
				this.search.result=[]//重置搜索结果
				this.search.noResult=false
				if(val.length==0){
					this.search.showResult=false
				}else{
					this.search.showResult=true
					this.search.overTime=setTimeout(()=>{
						this.search.noResult=true//10s内没有找到目标则判定文件不存在
					},10000)
					hubFunctions.search.call(this,val,this.search.searchTypeIndex)//精确查找  1范围查找
				}
			},
			//文件右键
			callContextMenu:function(e,file,index){
				let fileName=file.name
				e.preventDefault()
				e.stopPropagation()
				let _this=this
				if(e.button==2){//右键事件
					_this.menu.show=true
					console.log(e,"eee",document.body.clientHeight)
					if(e.pageY>document.body.clientHeight/2){
						_this.menu.top=(e.pageY - 150)+'px'
					}else{
						_this.menu.top=e.pageY+'px'
					}
					
					_this.menu.left=e.pageX+'px'
					_this.menu.isFile=true
					let fileL=""
					if(this.entrance[fileName].type!='folder'){//当被修改目标非文件夹时，需要分离出后缀名
						fileName=fileName.split(".")
						fileL=fileName[fileName.length-1]//原文件后缀名
						fileName.splice(fileName.length-1)
						fileName=fileName.join(".")
					}
					_this.menu.fileName=fileName
					let options=[]
					if(_this.externalUpload_success==null){
						options=[			
							{name:"创建时间:2022/5/2 11:08",event:function(){}},
							{name:"大小:2035kb",event:function(){}},
							{name:"描述:临时文件",event:function(){}},
							
							{name:"复制",event:function(){
								let hill=""
								if(fileL!=""){//后缀
									hill="."+fileL
								}
								if(_this.menu.chose){
									let temp=[]
									for(let key in _this.mouse.choseList){
										temp.push({name:key,type:_this.entrance[key].type})
									}
									hubFunctions.copy.call(_this,temp)
								}else{
										hubFunctions.copy.call(_this,[{name:fileName+hill,type:_this.entrance[fileName+hill].type}])}
									}
								
							},
							
							{name:"剪切",event:function(){
								let hill=""
								if(fileL!=""){//后缀
									hill="."+fileL
								}
								if(_this.menu.chose){
									let temp=[]
									for(let key in _this.mouse.choseList){
										temp.push({name:key,type:_this.entrance[key].type})
										
									}
									hubFunctions.cut.call(_this,temp)
								}else{
									hubFunctions.cut.call(_this,[{name:fileName+hill,type:_this.entrance[fileName+hill].type}])
								}
								
							}},
							
							{name:"重命名",event:function(){
								_this.sameFile['pre'].name=fileName
								_this.sameFile['new'].name=fileName//已有文件使用，用于防止绑定pre值时导致变化引起编辑框被删除
								_this.sameFile['pre'].fileL=fileL
								_this.renameFile()
								
							}},
							
							{name:"共享",event:function(){
								let sharePrePath=[]
								sharePrePath=[]
								for(let i=1;i<_this.path[_this.pathIndex[_this.nowHubType]].length;i++){
									sharePrePath.push(_this.path[_this.pathIndex[_this.nowHubType]][i])
								}
								sharePrePath=sharePrePath.join("/")
								sharePrePath=_this.pathIndex[_this.nowHubType]+"/"+sharePrePath//带上FILES/STYLE/COMPONENTS
								_this.menu.shareFilePath=sharePrePath//设置分享文件原路径
								let hill=""
								if(fileL!=""){//后缀
									hill="."+fileL
								}
								let fileType=_this.entrance[fileName+hill].type
								if(_this.menu.chose){
									if(Object.keys(_this.mouse.choseList)==0){
										_this.mouse.choseList[fileName+hill]=fileType
									}
								}else{
									_this.mouse.choseList={}
									_this.mouse.choseList[fileName+hill]=fileType
								}
								_this.menu.share=true//将分享状态打开
							}},
							
							{name:"删除",remove:true,event:function(){
								let hill=""
								if(fileL!=""){//后缀
									hill="."+fileL
								}
								if(_this.menu.chose){
									if(Object.keys(_this.mouse.choseList)==0){
										_this.mouse.choseList[fileName+hill]=_this.entrance[fileName+hill].type
									}
								}else{
									_this.mouse.choseList={}
									_this.mouse.choseList[fileName+hill]=_this.entrance[fileName+hill].type
								}
								let removePrePath=[]
								removePrePath=[]
								for(let i=1;i<_this.path[_this.pathIndex[_this.nowHubType]].length;i++){
									removePrePath.push(_this.path[_this.pathIndex[_this.nowHubType]][i])
								}
								removePrePath=removePrePath.join("/")
								removePrePath=_this.pathIndex[_this.nowHubType]+"/"+removePrePath//带上FILES/STYLE/COMPONENTS
								let indexList=[]
								let nameList=[]
								let deleteTimes=0
								for(let i in _this.fileList){
									if(_this.mouse.choseList[_this.fileList[i].name]!=undefined){
										indexList.push(i-deleteTimes)
										nameList.push(_this.fileList[i].name)
										deleteTimes++
									}
								}
								console.log("deleteIndex",indexList)
								for(let anyIndex in indexList){
									if(hubFunctions.removeFile.call(_this,nameList[anyIndex],removePrePath)){
										let deleteTarget=document.getElementsByName("fileItem_"+index)
										_this.fileList.splice(indexList[anyIndex],1)
									}
								}

							}}]
						}else{//外部组件调用文件仓库选择文件时，将通过provideFile设置右键命令列表
							options=[
								{name:"创建时间:2022/5/2 11:08",event:function(){}},
								{name:"大小:2035kb",event:function(){}},
								{name:"描述:临时文件",event:function(){}},
								{name:"查看文件",event:function(){
									let temp=_this.externalUpload_success
									_this.externalUpload_success=null
									_this.openFile(file,e)
									_this.externalUpload_success=temp
								}},
							]
						}
						if(Object.keys(this.mouse.choseList).length>1){
							options.splice(5,1)
						}
					_this.menu.option=options
				}
			},
			fileError:function(e){
				e.target.src=this.imgList['error']
			},
			openUploadInput:function(e){
				this.loadUploadInput=true
				this.$nextTick(()=>{
					document.getElementById("hub_upload").click()
				})
			},
			inputChange:function(e){
				let fileList=e.target.files
				console.log(typeof(fileList))
				for(let key in fileList)
				{
					if(typeof(fileList[key])=='object')
						{
							console.log("upload",fileList[key])
						this.upload(fileList[key])
					}	
				}
			},
			getLastIndex:function(e){
				return this.path[this.pathIndex[this.nowHubType]].length-1
			},
			getFileList:function(){
				this.menu.chose=false//将选择状态至假
				this.deleteStep=0//删除数量复零
				this.search.resultTarget=null//重置搜索对象
				//console.log(this.store.HUB,this.store.HUB.Project[this.pathIndex[this.nowHubType]],this.pathIndex[this.nowHubType])
				this.fileList=[]
				let entrance=this.store.HUB[this.hubListIndex[this.hub]][this.pathIndex[this.nowHubType]].children;//最外层
				this.$nextTick(()=>{
					this.imageFileTemp=[]
					let fileListTemp=[]
					let index=0
					if(this.path[this.pathIndex[this.nowHubType]].length==1){
						for(let key in entrance){
							let type=entrance[key].type.split("/")[0]
							if(type=="image"){
								if(entrance[key].data==null){
									entrance[key].data='/file/getImage?userId='+window.USERPATH//require(`../userProject/project/userA001/resource/FILES/IMAGES/${key}`)
								}
								this.imageFileTemp[key]=entrance[key].data
							}else{
								if(["video","audio","text","application"].indexOf(type)>-1){
									this.imageFileTemp[key]=this.imgList[type]
								}else{
									this.imageFileTemp[key]=this.imgList['unknown']
								}
							}
							fileListTemp.push({name:key,type:entrance[key].type})
							index++
						}
					}else{
						let data=this.path[this.pathIndex[this.nowHubType]]
						for(let i=1;i<this.path[this.pathIndex[this.nowHubType]].length;i++){
							entrance=entrance[data[i]].children
						}
						for(let key in entrance){
							let type=entrance[key].type.split("/")[0]
							if(type=="image"){
								if(entrance[key].data==null){
									console.log(key,entrance[key].data)
									entrance[key].data='/file/getImage?userId='+window.USERPATH//此处应更换为用户项目地址require(`../userProject/project/userA001/resource/FILES/IMAGES/${key}`)
								}
								this.imageFileTemp[key]=entrance[key].data
							}else{
								if(["video","audio","text","application"].indexOf(type)>-1){
									this.imageFileTemp[key]=this.imgList[type]
								}else{
									this.imageFileTemp[key]=this.imgList['unknown']
								}
							}
							fileListTemp.push({name:key,type:entrance[key].type,img:this.imgList[type]})
							index++
						}
					}
					//更新当前仓库入口地址
					this.entrance=entrance
					this.fileList=fileListTemp
				})

			},
			openViewFrame:function(node,XY,offWidth,offHeight){//仅在为图片文件时才会调用
				let hori="left",vert="top",scrollTop=document.getElementById("files").scrollTop
				if(XY[1]>document.getElementById("hubOut").offsetHeight/2){//Y值超过半数
					vert="70%"
					if(scrollTop>50){
						vert="40%"
					}
				}
				else
					vert="10%"
				if(XY[0]>document.getElementById("hubOut").offsetWidth/2)
					hori="100%"
				else
					hori="10%"
				let viewFrame=document.getElementById("showFiles")//getElementById("showFiles")
				viewFrame.style.top=`${XY[1] - scrollTop}px`;
				viewFrame.style.left=`${XY[0]}px`;
				viewFrame.style.transformOrigin=`${hori} ${vert}`
				let _this=this
				node.addEventListener("error",function(e){
					_this.fileError(e)
				})
				viewFrame.style.transition="0s"
				setTimeout(()=>{

					viewFrame.style.height=`${offHeight}px`;
					viewFrame.style.width=`${offWidth}px`;
					viewFrame.style.transition=`200ms`
					
					node.style.cssText+=`
					height:100%;
					width:100%;
					margin:0
					`
					node.className=""
					viewFrame.appendChild(node)
					//hubAnimate.scaleAnimate(viewFrame,1,5,0.5,1)
					viewFrame.className="viewFrame"
					setTimeout(()=>{
						node.style.opacity=1

						//viewFrame.style.left=`${XY[0]}px`;
						//viewFrame.style.top=`${(XY[1]-scrollTop)}px`
						
						setTimeout(()=>{
							node.style.cssText+=`
							background-color:rgba(255,255,255,1);
							backdrop-filter:blur(10px)
							`
						},50)
					},50)
				},50)
			},
			openFile:function(data,e){
				this.search.resultTarget=null//重置搜索对象
				let type=data.type,name=data.name
				let node=e.target
				let getOuterHtml=node.outerHTML
				let imgTemp=""//当点击到img时暂存outerHtml
				let parentNode=null
				
					if(type=="folder"){
						this.path[this.pathIndex[this.nowHubType]].push(name)
						this.getFileList()
					}else if(type.startsWith("image/")){
						if(this.externalUpload_success==null){
							if(getOuterHtml.startsWith("<img")){
								imgTemp=getOuterHtml
								node=node.offsetParent
								parentNode=node
							}else{
								imgTemp=e.target.childNodes[0].outerHTML
								parentNode=e.target
							}
							this.isShowFile=true
							this.$nextTick(()=>{
								node=node.cloneNode()
								node.innerHTML=imgTemp
								let XY=DomTreeEngine.getOffsetTopLeft(parentNode,'hubOut')
								node.style.position=`absolute`
								let offWidth=parentNode.offsetWidth,offHeight=parentNode.offsetHeight
								node.style.borderRadius="3px"
								this.openViewFrame(node,XY,offWidth,offHeight)
							})}
						else{
							//外部文件请求文件路径
							this.externalUpload_success(this.entrance[name].data)
							this.externalUpload_success=null
							closeHub()
						}
					}else{
						if(this.externalUpload_success==null){
							this.isShowFile=true
							alert("下载文件")
						}else{
							alert("请求文件")
							this.externalUpload_success=null
							closeHub()
						}
					}
				
			},
			closeView:function(e){
				//关闭预览界面
				document.getElementById("closeViewFrameButton").style.opacity=0
				
					let viewFrame=document.getElementById("showFiles")
					viewFrame.style.transition="200ms"
					viewFrame.className=""
					
					setTimeout(()=>{
						this.isShowFile=false
					},300)
			},
			backToLast:function(index){
				let temp=[]
				for(let i=0;i<=index;i++){
					temp.push(this.path[this.pathIndex[this.nowHubType]][i])
				}
				this.path[this.pathIndex[this.nowHubType]]=temp
				this.getFileList()
				this.setMainContextMenu()
			},
			dragover:function(e){
				e.preventDefault()
			},
			drop:function(e){
				e.preventDefault()
				let file=[...e.dataTransfer.items]
				let getFile
				file.forEach(fileItem =>{
					if(fileItem.kind=='file'){
						getFile=fileItem.getAsFile()
						console.log(fileItem.type,'type')
						if(getFile.type!='')
							this.upload(getFile)
						else
							alert("不支持的文件")
					}
				})

			},
			uploadAction:function(file,newFileName=null,uploadtype=1){//上传实际部分与粘贴操作部分
				console.log("uploadAction",file)
				let entrance;
				let fName=file.name
				if(newFileName!=null)
					fName=newFileName
				if(uploadtype==1){
					entrance=this.entrance
				}else{//表示由window事件在其他组件中调用上传仓库，此时入口路径为默认上传地址
					entrance=this.store.HUB[this.hubListIndex[this.hub]][this.pathIndex[this.nowHubType]].children;//最外层
					let folderPaths=this.uploadPath.split("/")
					for(let i=1;i<folderPaths.length-1;i++){
						entrance=entrance[folderPaths[i]].children
					}
					console.log(entrance,"asdas")
				}
				
				let lastIndex=this.fileList.length
				let data=null
				let type=file.type.split("/")[0]
				let children={}
				if(file.type.startsWith("image/")){
					if(!this.menu.isPatse)//此时为上传(文件不存在与文件data为空)
						data=URL.createObjectURL(file)
					else{//此时为粘贴(文件存在)
						data=file.data
					}
					this.imageFileTemp[fName]=data
				}else{
					if(file.type=='folder'){//粘贴复制的文件夹
						children=file.children
					}
					else if(["video","audio","text","application"].indexOf(type)>-1){
						this.imageFileTemp[fName]=this.imgList[type]
						data=this.imgList[type]
					}else if(!file.name.endsWith(".exe")){
						this.imageFileTemp[fName]=this.imgList['unknown']
					}
				}

				this.fileList.push({name:fName,type:file.type,img:""})
				console.log("执行上传",entrance,this.uploadPath,fName)
				entrance[fName]={
					type:file.type,
					data:data,
					children:children
				}
				if(this.menu.isCut){//剪切模式时，删除原路径中的文件
					let preEntrance=hubFunctions.getPreEntrance()
					delete preEntrance[file.name]
				}
				this.loadUploadInput=false//上传结束，移除上传input
				if(this.externalUpload_success!=null){
					this.externalUpload_success()
					this.externalUpload_success=null
					this.uploadPath="FILES/"
				}
				this.getFileList()//上传完成，刷新界面
			},
			externalSetUploadPath:function(path,success){
				//外部组件调用此函数设置上传路径
				this.uploadPath=path
				let sp=path.split("/")
				let type=sp[0]
				this.path[type]=["根目录"]
				for(let i=0;i<sp.lenght-1;i++){
					this.path[type].push(sp[i])
				}
				this.getFileList()
				this.externalUpload_success=success
			},
			upload:function(file,newFileName=null,type=1){//默认为1，表示仓库界面上传，注册为window事件时，传入0，newFileName为上传新文件时所需要的更改的文件名称
				this.newFile=file
				this.uploadType=type
				this.menu.isPatse=false//主动上传时设置粘贴状态为假，防止在uploadAction中向data赋值时报错
				console.log("uoload out")
				if(this.checkName(file,type)){//当存在同名文件时，在checkName继续调用uploadAction操作
					this.uploadAction(file,null,type)
				}
			},
			checkName:function(file,type){//默认为1，表示仓库界面上传，在window 级别上传事件时，传入0，isPatse用于标记是否为粘贴时检测
				let name=file.name
				let entrance;
				if(type==1){
					entrance=this.entrance
				}else{//表示由window事件在其他组件中调用上传仓库，此时入口路径为默认上传地址
					entrance=this.store.HUB[this.hubListIndex[this.hub]][this.pathIndex[this.nowHubType]].children;//最外层
					let folderPaths=this.uploadPath.split("/")
					for(let i=1;i<folderPaths.length-1;i++){
						entrance=entrance[folderPaths[i]].children
					}
				}
				if(entrance[name]!=undefined){//说明当前路径下有同名文件
					let split=name.split(".")
					let srcdata=entrance[name].data
					if(entrance[name].data==null){//data等于null说明非图片文件
						let t=entrance[name].type.split("/")[0]
						if(["video","audio","text","application",'folder'].indexOf(t)>-1){
							srcdata=this.imgList[t]
						}else{
							srcdata=this.imgList['unknown']
						}
					}
					this.sameFile["pre"].src=srcdata//data存储的是缩略图
					this.sameFile['pre'].name=split[0]
					if(file.type!='folder'){
						this.sameFile['pre'].fileL=split[split.length-1]
					}else{
						this.sameFile['pre'].fileL=""
					}
					
					let src
					if(file.type.startsWith("image/")){
						if(!this.menu.isPatse){
							src=URL.createObjectURL(file)
						}else{
							src=this.entrance[name].data
						}
					}else{
						let t=file.type.split("/")[0]
						if(["video","audio","text","application",'folder'].indexOf(t)>-1){
							src=this.imgList[t]
						}else{
							src=this.imgList['unknown']
						}
					}
					this.sameFile["new"].src=src//缩略图
					this.sameFile['new'].name=split[0]
					if(file.type!='folder'){
						this.sameFile['new'].fileL=split[split.length-1]
					}else{
						this.sameFile['new'].fileL=""
					}
					this.hasSameFile=true
					return false
				}else{
					return true
				}
			},
			cancleUpload:function(e){
				this.hasSameFile=false
				this.sameFile["pre"].src=this.imgList['image']//data存储的是缩略图
				this.sameFile['pre'].name=""
				this.sameFile["new"].src=this.imgList['image']//data存储的是缩略图
				this.sameFile['new'].name=""
			},
			renameFile:function(){//确认重命名文件
				if(this.hasSameFile){//hasSameFile仅在上传出现同名文件时才会修改
					if(!this.rename){//传输文件打开更名编辑框编辑模式
						this.sameFile['pre'].nameTemp=this.sameFile['pre'].name+""
						this.sameFile['new'].nameTemp=this.sameFile['new'].name+""
						this.rename=true
					}else{//保存修改名称
						let point="."
						if(this.sameFile['pre'].fileL=="" || this.newFile.type=='folder'){
							point=""
						}
						let preFileNewName=this.sameFile['pre'].name+point+this.sameFile['pre'].fileL//获取原文件的新名字,加上后缀
						let preFIlePreName=this.sameFile['pre'].nameTemp+point+this.sameFile['pre'].fileL//获取原文件原名字,加上后缀
						console.log(preFIlePreName,preFileNewName)
						if(preFIlePreName!=preFileNewName){
							if(this.entrance[preFileNewName]!=undefined){//原文件新名字仍与已有文件重名
								alert("文件重名")
							}else{
								this.entrance[preFileNewName]=this.entrance[preFIlePreName]
								this.rename=false
								this.hasSameFile=false
								delete this.entrance[preFIlePreName]
								for(let item in this.fileList){
									if(this.fileList[item].name==preFIlePreName){
										this.fileList[item].name=preFileNewName
										break
									}
								}
							}
						}
						point="."
						if(this.sameFile['new'].fileL=="" || this.newFile.type=='folder'){
							point=""
						}
						let newFileNewName=this.sameFile['new'].name+point+this.sameFile['new'].fileL
						let newFilePreName=this.sameFile['new'].nameTemp+point+this.sameFile['new'].fileL
						if(this.entrance[newFileNewName]!=undefined){
							alert("文件重名")
						}else{
							//不能直接使用upload继续上传文件操作,file对象只读，使用uplodd时仍会造成使用原文件名称
							//this.upload(this.newFile,newFileNewName)//更名结束，继续上传
							this.uploadAction(this.newFile,newFileNewName,this.uploadType)//绕过upload，直接使用uploadAction上传
							this.rename=false
							this.hasSameFile=false
						}
					}
				}else{
					if(!this.rename){//传输文件打开更名编辑框编辑模式
						this.sameFile['pre'].nameTemp=this.sameFile['pre'].name+""
						this.rename=true
					}else{//保存修改
					console.log("save")
						this.rename=false//将更名状态取消
						let point="."
						if(this.sameFile['pre'].fileL==''){//若后缀为空，表示为文件夹
							point=""
						}
						let preFileNewName=this.sameFile['new'].name+point+this.sameFile['pre'].fileL//获取原文件的新名字,加上后缀
						let preFIlePreName=this.sameFile['pre'].nameTemp+point+this.sameFile['pre'].fileL//获取原文件原名字,加上后缀
						if(this.entrance[preFileNewName]!=undefined){//原文件新名字仍与已有文件重名
							alert("文件重名")
						}else{
							this.entrance[preFileNewName]=this.entrance[preFIlePreName]
							this.hasSameFile=false//存在同名文件状态取消
							delete this.entrance[preFIlePreName]//删除原文件数据
							for(let item in this.fileList){
								if(this.fileList[item].name==preFIlePreName){
									this.fileList[item].name=preFileNewName
									break
								}
							}
							//若更改的是图片文件，还需要更改缩略图imageFileTemp
							this.imageFileTemp[preFileNewName]=this.imageFileTemp[preFIlePreName]
							delete this.imageFileTemp[preFIlePreName]
						}
					}
				}
			},
			removeFile:function(fileName){//删除文件
				delete this.entrance[fileName]
				for(let item in this.fileList){
					if(this.fileList[item].name==fileName){
						this.fileList.splice(item,1)
						break
					}
				}
			},
			replaceFile:function(){//替换原文件
				let fileName=this.sameFile['pre'].name+'.'+this.sameFile['pre'].fileL
				this.removeFile(fileName)
				this.upload(this.newFile)
				this.rename=false
				this.hasSameFile=false
			},
			goToResult:function(path){//跳转到搜索目标对象处
				this.search.show=false
				let pathList=path.split("/")
				let targetName=pathList[pathList.length-1]
				let temp=["根目录"]
				for(let i=1;i<pathList.length-1;i++){
					temp.push(pathList[i])
				}
				console.log(temp,targetName)
				this.path[this.pathIndex[this.nowHubType]]=temp
				this.$nextTick(()=>{
					this.getFileList()
					this.$nextTick(()=>{
						let index=Object.keys(this.entrance).indexOf(targetName)//获取搜索对象在当前层级中的加载次序
						if(index>10){
							let dis=((index-10) / 5) + 0.5
							dis=dis.toFixed(0)*1
							console.log(index,dis)
							setTimeout(()=>{
								document.getElementById("files").scrollTop=dis*200
							},300)
						}
						this.search.resultTarget=targetName
					})
				})
			},
			provideFile:function(callBack,next=0){//对外部组件提供文件选择,callBack为externalUpload_success设置对象，next为流程控制器
				/*
				*取消右键按钮
				*文件点击事件改为获取路径
				* 文件右键改为详情查看
				* 
				*/
			    //注册传入的主屏点击关闭事件insertOpenView
			    this.hub=1//必须将仓库类型转为项目仓库，个人仓库素材需先转入项目仓库中
			    if(next==0)//直接执行
					callBack(closeHub)
				if(next==1){//完成后执行
					this.externalUpload_success=callBack
					this.setMainContextMenu()
				}
				if(next==2){//转为当前对象执行
					callBack.call(this)
					console.log(this.externalUpload_success,"quxiao")
				}

			}
		}
	}
	export default exportData
</script>

<style scoped>
	.acceptList{
		position: absolute;
		height: 70%;
		transform-origin: bottom left;
		transition: .15s;
		width: 25%;
		background-color: rgba(0,0,0,0.85);
		overflow:hidden;
		z-index: 999;
		left: 58px;
		border-radius: 10px;
		bottom: 22px;
	}
	.viewFrame{
		transition:.5s ;
		opacity:1;
		border-radius:3px;
		transform: scale(4.5);
		box-shadow:rgb(0 0 0 / 25%) -3px 3px 15px ;
	}
	input[type=checkbox]{
		padding: 0;
		z-index: 2;
		margin: 0;border:0;position: absolute;bottom: 12px;height: 20px;width: 20px;
		border-radius: 10px;
	}
	input[type=checkbox]:checked + .showForChose{
		background-color: var(--mainColorBlue2);
	}
	.showForChose{
		transition: .2s ;
		border-radius: 10px;
		border: 1px solid var(--mainColorGray2);
		width: 20px;height: 20px;position: absolute;bottom: 12px;background-color: white;z-index: 1;margin: 0;padding: 0;
		z-index: 1;
	}
	.searchResultItem{
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid var(--mainColorGray3);
		width: 100%;
		height: 35px;
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		cursor: pointer;
		padding: 5px;
		padding-left: 10px;
		color: var(--mainColorGray4);
		background-color: transparent;
	}
	.searchResultItem:hover{
		background-color: rgba(198,198,198,0.5);
	}
	#searchArea{
		position: absolute;
		height: 35px;
		top:7px;
		border-radius: 10px;
		width: 50%;
		font-size: 1rem;
		padding-left: 5px;
		left: 120px;
		outline: none;
		border: none;
		background-color: var(--mainColorGray3);
	}
	@keyframes showSearchBar{
		from{
			transform: scale(1.1);
			opacity: 0;
		}
		to{
			opacity: 1;
			transform: scale(1);
		}
	}
	#filesearchBarOut{
		overflow: hidden;
		position: fixed;
		z-index: 999;
		left: 50%;
		top:13vh;
		min-width: 700px;
		width: 60vw;
		min-height: 450px;
		height: 50vh;
		transform: translateX(-50%);
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(235,235,235,0.75);
		backdrop-filter: blur(3px);
	}
	#filesearchBar{
		z-index: 101;
		transition: .2s ;
		transform: scale(1.1);
		transform-origin: center;
		opacity: 0;
		animation-delay: .1s;
		animation: showSearchBar .2s;
		animation-fill-mode: forwards;
		min-width: 400px;
		width: 40%;
		position: absolute;
		top: 20px;
		height: 50px;
		border-radius: 15px;
		box-shadow: -5px 5px 10px var(--mainColorGray);
		background-color:white;
	}
	#searchResult{
		z-index: 100;
		overflow-x: hidden;
		overflow-y: scroll;
		min-width: 400px;
		width: 40%;
		position: absolute;
		top: 80px;
		height: 75%;
		border-radius: 15px;
		box-shadow: -5px 5px 10px var(--mainColorGray);
		background-color:rgba(255,255,255,0.2);
	}
	.rightButtonOptions{
		min-height: 35px;
		height: auto;
		width: 90%;
		padding-left: 10px;
		line-height: 35px;
		font-weight: normal;
		color: rgba(0,0,0,0.55);
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		cursor: pointer;
		font-size: 1rem;
		background-color: transparent;
		transition: .15s;
		
	}
	.rightButtonOptions:hover{
		background-color: var(--mainColorGray);
	}
	#hubRightButton{
		padding-top: 5px;
		padding-bottom: 5px;
		align-items: center;
		overflow: hidden;
		position: absolute;
		display: flex;
		height:auto;
		border-radius: 10px;
		min-width: 150px;
		width: auto;
		z-index: 999;
		top: 50%;
		left: 30%;
		flex-direction: column;
		background-color: rgba(255,255,255,0.75);
		backdrop-filter: blur(10px);
		box-shadow:-3px 3px 10px rgba(0,0,0,0.25);
	}
	.sameFileButton{
		background-color: transparent;
		font-weight: normal;
		letter-spacing: 3px;
		font-size:1.1em;
		padding: 5px;
	}
	.sameFileButton:hover{
		background-color:rgba(198,198,198,0.2);
	}
	.sameFileInput{
		transition: .3s;
		border-radius: 10px;text-align: center;height: 14%;width: 50%;outline: none;border: none;background-color: var(--mainColorGray3);color:var(--mainColorGray4);font-weight: bold;
	}
	.closeViewButton{
		background-color: transparent;
		position: absolute;
		left:-1rem;
		top:-3%;
		transform: scale(0.2);
		color:white;
		padding: 5px;
		border-radius: 10px;
		letter-spacing: 3px;
		background-color:var(--mainColorBlue2);
		font-size: 1em;
		padding-top: 1px;
		padding-bottom: 2px;
		z-index: 99;
		margin: 0px;
		margin-top: 0px;
	}
	.fileItem{
		transform: scale(1);
		transition: .3s;
		cursor: pointer;
		transform-origin: center;
	}
	.fileItem:hover{
		transform: scale(1.1);
	}
	.fileBord{
		display: grid;
		grid-template-columns: repeat(5,19%);
		grid-gap: 0px;
		grid-auto-rows: 160px;
		grid-template-rows: repeat(auto-fill);
	}
#files::-webkit-scrollbar{
	display: block;
	  width: 5px;
	  height: 5px;
}
#files::-webkit-scrollbar-button{
  width: 5px;
  height: 5px;
  background-color: transparent;
}
#files::-webkit-scrollbar-track{
  width:5px;
  height: 10px;
  background-color: transparent;
}
#files::-webkit-scrollbar-thumb{
 height: 5px;
  width: 5px;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.25);
}
	.pathRecord{
		overflow-x: scroll;
		white-space: normal;
		width:100%;
		line-height: 30px;
		user-select: none;
		-ms-user-select: none;
		text-align: left;
		-moz-user-select: none;
		-webkit-user-select: none;
		height:35px;
	}
	.pathSplit{
		position: absolute;
		right:-10px;
		color: var(--mainColorGray2);
		font-size: 1.3rem;
		top:3px;
	}
	.pathButton{
		flex-shrink: 0;
		margin-left: 15px;
		display: block;
		position: relative;
		padding: 0;
		background-color: var(--mainColorGray2);
		width: auto;
		padding: 2px;
		padding-left: 8px;
		padding-right: 8px;
		font-size: 1rem;
		border-radius: 10px;
		height: 25px;
		color: white;
		min-width: 50px;
	}
	.sourceList{
		width: 82%;
		margin-left: 2%;
		height: 100%;
		background-color: transparent;
	}
	.leftButton{
		transition: .3s;
		height: 35px;
		width: 90%;
		margin-top: 10px;
		border-radius: 10px;
	}
	.hubMain{
		display: flex;
		height: calc(95% - 40px);
		width: 100%;
	}
	.hubLeftBar{
		position: relative;
		display: flex;
		flex-direction: column;
		width: 14%;
		height: 100%;
		background-color: transparent;
		border-right: 1px solid rgba(198,198,198,0.3);
		margin-left: 1%;
		border-radius: 10px;
	}
	#hubOut{
		background-color: rgba(255,255,255,.95);
		border-radius: 15px;
		backdrop-filter: blur(10px);
	}
	.head{
		
		display: flex;
		height: 35px;
		width: 100%;
	}
</style>