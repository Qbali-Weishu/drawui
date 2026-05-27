<template>
	<div>
		<div style="height: auto;width: 100%;display: flex;flex-direction: column;">
			<!--发送与接收历史记录-->
			<div class='sendItem' v-for='(item,index) in record'>
				<div style="height: 35px;width: 55%;line-height: 35px;position: relative;display: flex;flex-direction: column;" 
				:style="{width:`${ item.recordType==0 ? '65%' : '55%'}`}">
					<h4 style="margin: 0;padding: 0;text-overflow: ellipsis;width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.name}}</h4>
				</div>
				<button class="detailButton" @click="button1(item)">{{ item.recordType==0 ? '详情':'接收'}}</button>
				<button style="color: white;background-color: transparent;margin-left: 10px;" @click="button2">{{ item.recordType==0 ? 'X':'拒收'}}</button>
			</div>
		</div>
		<teleport to="body" v-if="showSave">
			<div id="choseForSaveAccept" style="position: absolute;top:45vh;left:55vw;transform: translate(-50%,-50%);width: 40%;height: 300px;background-color: rgba(255,255,255,0.85);box-shadow: -5px 5px 15px var(--mainColorGray)
			;border-radius: 10px;backdrop-filter: blur(10px);z-index: 9999;">
			<div id="files_save" draggable="false"
			 style="background-size: contain;background-repeat: no-repeat;background-position: center;height: calc(100% - 40px);width: 100%;background-color: transparent;overflow-y: scroll;;overflow-x: hidden;position: relative;">
				<div class="pathRecord" style="margin-left: 5px;display: flex;">
					<div style="width: 80%;display: flex;white-space: normal;line-height: 30px;flex-shrink: 0;height: 100%;"> 
						<button class='pathButton' v-for="(item,index) in path[parent.pathIndex[parent.nowHubType]]" :key="index" @click="backToLast(index)">
						{{item}}
						<span class="pathSplit">/</span>
						<hr style="height: 2px;border-radius: 2px;width:100%;position: absolute;bottom: -15px;left: 0;border: none;outline: none;background-color: var(--mainColorGray2);" v-if="index==getLastIndex()">
						</button>
					</div>
					<button @click="save" style="background-color: var(--mainColorBlue2);color: white;border-radius: 10px;width: 10%;height: 25px;">保存</button>
					<button @click="cancle" style="background-color: transparent;color: var(--mainColorRed);border: 10px;width: 10%;height: 25px;">取消</button>
				</div>
				<div  class="fileBord"  style="width: 100%;height: auto;" >
					
					<div style="position: relative;margin-top: 10px;margin-left:10px;background-color: rgba(255,255,255,0.8);display: flex;flex-direction: column;" v-for="(item,index) in fileList">
						<!--预览图片-->
						<div class="fileItem"  @click="openFile(item,$event)" style="background-color: white;transform-origin: center;overflow: hidden;background-size: contain;background-position: center;background-repeat: no-repeat;height: 70%;margin-bottom: 10%;width:90%;margin-left: 5%;border-radius: 10px;box-shadow: -3px 3px 15px rgba(0,0,0,0.25);">
							<img :src="`${parent.imgList['folder']}`" style="height: 100%;width:100%;object-fit: contain;">
						</div>
						<!--预览图片-->
						<!--名称-->
						<h4 style="margin: 0;border-radius: 5px;border: none;height: 20px;line-height: 20px;width: auto;width: calc(100% - 15px);transition: .15s;margin-left: 0;background-color: transparent;">
						{{item.name}}</h4>
						<!--名称-->
					</div>
				</div>
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
	import hubFunctions from "./hub.js"
	export default{
		name:"sendList",
		inject:['parent'],
		data(){
			return {
				externalRequest:null,//外部请求,用于在外部组件中请求文件上传保存地址的路径返回
				record:[],//发送与接收记录
				entrance:{},//仓库入口地址,在getFile中更新
				fileList:[],//当前层次的文件列表
				path:{
					FILES:['根目录'],
					STYLE:['根目录'],
					COMPONENTS:['根目录'],
				},
				imageFileTemp:	//图片文件路径存储，采用懒加载方式，此项存储已经加载的地址，以v-for的index作为键名
				{
					
				},
				showSave:false,//显示接收界面
				nowAcceptTarget:null,//当前操作的文件对象
				menu:{//右键菜单
					show:false,
					top:'30%',
					left:"30%",
					option:[
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
			}
		},
		beforeMount(){
			console.log(this.parent)
			this.record=[]
			let http=new XMLHttpRequest()
			http.open("GET",'/file/getShareList?id='+window.USERPATH,true)
			let _this=this
			http.onreadystatechange=function(){
				if(http.readyState==4 && http.status==200){
						let data=JSON.parse(http.responseText)
						for(let i in data){
							_this.record.push(data[i])
						}
						window.localStorage.setItem("shareRecord"+window.USERPATH,JSON.stringify(_this.record))
						console.log(_this.record,"record")
				}else{
					console.error("request error")
				}
			}
			http.send(JSON.stringify({userId:window.userPath}))
		},
		mounted(){
			this.$nextTick(()=>{
				this.getFileList()
			})
			window.hubExternalRequest=this.setExternalRequest
			console.log("加载完成",window.hubExternalRequest)
		},
		methods:{
			setExternalRequest:function(source){//设置外部请求原对象
			    this.showSave=true
				//外部请求时，hub
				let box=document.getElementById("hubOut")
				box.style.transition="0s"
				box.style.transformOrigin="10% center"
				box.style.transform="scale(1) translateX(-50%)"
				box.style.transition=".05s"
				this.$nextTick(()=>{
					this.getFileList()//调出文件存储位置时，刷新文件列表
					this.externalRequest=source	
				})

			},
			backToLast:function(index){
				let temp=[]
				for(let i=0;i<=index;i++){
					temp.push(this.path[this.parent.pathIndex[this.parent.nowHubType]][i])
				}
				this.path[this.parent.pathIndex[this.parent.nowHubType]]=temp
				this.getFileList()
			},
			openFile:function(data,e){
				let type=data.type,name=data.name
				let node=e.target
				let getOuterHtml=node.outerHTML
				let imgTemp=""//当点击到img时暂存outerHtml
				let parentNode=null
				if(type=="folder"){
					this.path[this.parent.pathIndex[this.parent.nowHubType]].push(name)
					this.getFileList()
				}
			},
			getLastIndex:function(e){
				return this.path[this.parent.pathIndex[this.parent.nowHubType]].length-1
			},
			button1:function(item){//type为0表示为自己发送以及或已经接受的，1为未接受的
				if(item.type==0){//显示详情
					//自己已发送，显示原文件地址，发送时间，发送对象，接收状态
					//已接收，显示存储地址，接收时间，发送对象
				}else{//调出接收文件并保存					
					this.showSave=true
					this.nowAcceptTarget=item
					let _this=this
					this.$nextTick(()=>{
						this.getFileList()//调出文件存储位置是，刷新文件列表
						document.getElementById("choseForSaveAccept").addEventListener("click",function(e){
							_this.menu.show=false//点击其他地方时关闭右键菜单
							_this.search.target=""
							_this.search.result=[]
							_this.search.resultTarget=null
							_this.search.noResult=false
						})
						
						document.getElementById("choseForSaveAccept").addEventListener("contextmenu",function(e){
							e.preventDefault()
							e.stopPropagation()
							if(e.button==2){//右键事件
								_this.menu.show=true
								_this.menu.top=e.pageY+'px'
								_this.menu.left=e.pageX+'px'
								_this.menu.option=[
									{name:"新建文件夹",event:()=>{hubFunctions.createNewFolder.call(_this);}},
									{name:"查找",event:function(){
										_this.search.target=""
										_this.search.result=[]
										_this.search.noResult=false
										_this.search.show=true
									}}
								]
							}
						})
						//未接收，显示发送时间，对方账户名，发送备注
					})
				}
			},
			button2:function(item){
				if(item.type==0){//
					//自己已发送，显示原文件地址，发送时间，发送对象，接收状态
					//已接收，显示存储地址，接收时间，发送对象
				}else{
					
				}
			},
			getFileList:function(){
				//console.log(this.store.HUB,this.store.HUB.Project[this.pathIndex[this.nowHubType]],this.pathIndex[this.nowHubType])
				this.fileList=[]
				let entrance=
				this.parent.store.HUB[this.parent.hubListIndex[this.parent.hub]][this.parent.pathIndex[this.parent.nowHubType]].children//最外层
				this.$nextTick(()=>{
					this.imageFileTemp=[]
					let fileListTemp=[]
					let index=0
					let data=this.path[this.parent.pathIndex[this.parent.nowHubType]]
					for(let i=1;i<data.length;i++){
						entrance=entrance[data[i]].children
					}
					this.entrance=entrance
					for(let key in entrance){
						let type=entrance[key].type
						if(type=='folder'){
							fileListTemp.push({name:key,type:entrance[key].type})
						}
					}
					//更新当前仓库入口地址
					this.fileList=fileListTemp
					entrance=null
				})
			},
			save:function(){//存储接收图片
				let pathList=[]
				for(let i=1;i<this.path[this.parent.pathIndex[this.parent.nowHubType]].length;i++){
					pathList.push(this.path[this.parent.pathIndex[this.parent.nowHubType]][i])
				}
				let savePath=pathList.join("/")
				let flag="/"
				if(pathList.length==0){
					flag=""
				}
				if(this.externalRequest!=null){//外部上传至hub中时只需要返回文件夹路径
					savePath=this.parent.pathIndex[this.parent.nowHubType]+flag+savePath+'/'
					this.externalRequest(savePath)
					this.externalRequest=null
				}else{//接收文件时需要带上文件名称
					savePath=this.parent.pathIndex[this.parent.nowHubType]+flag+savePath+'/'+this.nowAcceptTarget.name
				}
				this.showSave=false
				this.backToLast(0)//回到根目录
			},
			cancle:function(){
				this.showSave=false;
				this.parent.getFileList();
				this.$nextTick(()=>{
					if(this.externalRequest!=null){//外部调用时会引发hub出现，阻挡屏幕，需要将hub隐藏
					    let box=document.getElementById("hubOut")
						this.externalRequest=null
						setTimeout(()=>{
							box.style.transformOrigin="10% center"
							box.style.transform="scale(0) translateX(-50%)"
							box.style.opacity="0"
						},100)
					}
				})

				
			}
		}
	}
</script>

<style scoped>
	.pathRecord{
		margin-top: 5px;
		overflow-x: scroll;
		white-space: normal;
		width:80;
		background-color: transparent;
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
	#files_save::-webkit-scrollbar{
		display: block;
		  width: 5px;
		  height: 5px;
	}
	#files_save::-webkit-scrollbar-button{
	  width: 5px;
	  height: 5px;
	  background-color: transparent;
	}
	#files_save::-webkit-scrollbar-track{
	  width:5px;
	  height: 10px;
	  background-color: transparent;
	}
	#files_save::-webkit-scrollbar-thumb{
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
	.detailButton{
		margin-left: 2%;
		background-color: transparent;
		height: 35px;
		padding: 0;
		color: var(--mainColorBlue2);
		transition: .3s;
	}
	.sendItem{
		user-select: none;
		-moz-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		cursor: pointer;
		display: flex;
		position: relative;
		width: calc(90% - 10px);
		border-radius: 10px;
		margin-left: 5%;
		height: 35px;
		padding-left: 10px;
		font-size: 14px;
		border-bottom: 1px solid var(--mainColorGray);
		font-weight: normal;
		text-align: left;
		color: white;
		transition: .3s;
	}
	.sendItem:hover{
		background-color: var(--mainColorBlue2);
	}
	.sendItem:hover .detailButton{
		color: white;
	}
	#choseForSaveAccept::before{
		content: "";
		position: absolute;
		z-index: -1;
		width: 150%;
		height: 150%;
		left: -38%;
		top:-28%;
		border-radius: 10px;
		
		background-color: transparent;
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
		z-index: 99999;
		top: 50%;
		left: 30%;
		flex-direction: column;
		background-color: rgba(255,255,255,0.75);
		backdrop-filter: blur(10px);
		box-shadow:-3px 3px 10px rgba(0,0,0,0.25);
	}
</style>