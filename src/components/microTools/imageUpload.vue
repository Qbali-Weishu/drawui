<!--图片选择组件-->
<template>
	<div style="width: 100%;height: 100%;background-color: transparent;position: relative;">

		<div id="imgOutside" style="overflow: hidden;border-radius: 10px;box-shadow: -2px 2px 10px var(--mainColorGray2);position: relative;width: 90%;height: 90%;background-color: transparent;color: var(--mainColorGray2);font-weight: normal;border-collapse: 1px;border: 1px dashed var(--mainColorGray2);margin-top: 5%;margin-left: 5%;">
			<img v-if="uploaded==null" id="imageUploadSource" :src="`${noImage}`" draggable="true"  
			style="height: 100%;width: 100%;transition: .3s;" />
			<button class="choseButton" @click="fileSourceAsk">选择图片</button>
			<div draggable="true" id="imageUploadedSource"  v-if="uploaded!=null" style="width: 100%;height: 100%;background-repeat: no-repeat;position: absolute;left: 0;z-index: 99;background-color: var(--mainColorGray2);" 
			:style="{backgroundImage:`url(${uploaded})`,backgroundSize:`${backgroundSize}`,backgroundBlendMode:`${blendMode}`}"
			></div>
			
			<div v-if="isAskFileSource" class="fileSource" style="text-align: center;position: absolute;z-index: 99;top:0;left:0">
				<h3 style="margin: 0;padding: 0;font-weight: 500;width: 100%;margin-top: 25px;color:rgba(128,128,128,0.8)">图片文件源</h3>
				<button @click="fileSourceAsk" style="position: absolute;right:10px;top:5px;width:45px;height:20px;background-color:var(--mainColorRed);border-radius: 5px;color:white;">取消</button>
				<div style="width: 100%;height: 80px;display: flex;justify-content: center;flex-direction: column;">
					<button class="fileSouceButton" @click="getFileFromHub">文件仓库</button>
					<button class="fileSouceButton" @click="openFileChose">本地上传</button>
				</div>
			</div>
			
		</div>
		<div style="width: 100%;line-height: 35px;color: var(--mainColorGray2);font-weight: normal;">{{uploaded==null ? '拖拽上传图片...' : "" }}</div>
		<input type="file" accept="image/*" v-if="uploaded==null" style="display: none;" id="getUploadImage" @change="changeFile"/>
		<div style="display: flex;position: relative;bottom: 0px;left: 0;margin-top: 15px;" v-if="uploaded!=null">
			<button @click="uploaded=null" style="width: 50%;line-height: 35px;color:var(--mainColorRed);font-weight: normal;background-color: transparent;border-right: 1px solid rgba(0,0,0,0.1);letter-spacing: 5px;">移除</button>
			<button @click="returnImage" style="width: 50%;line-height: 35px;color:var(--mainColorBlue);font-weight: normal;background-color: transparent;border-left: 1px solid rgba(0,0,0,0.1);letter-spacing: 5px;">确认</button>
		</div>
	</div>
</template>

<script>
	import { structStore } from "../../store/struct.js";
	import selectList from "./select.vue"
	export default{
		name:'imageUpload',
		data(){
			return{
				noImage:require("../../assets/img/noImage.svg"),
				uploaded:null,
				store:null,
				backgroundSize:"contain",
				setSizeTimeout:null,
				isAskFileSource:false,
				blendMode:"normal"
			}
		},
		components:{
			selectList
		},
		watch:{
			uploaded:{
				handler:function(val){
					if(val==null){
						this.addDragEvent("imageUploadSource")//重新绘制后事件需要重新赋值
					}else{
						this.addDragEvent("imageUploadedSource")//为已经添加的赋值事件，支持拖动直接修改
					}
					this.isAskFileSource=false
				},
				immediate:true,
				deep:true,
			}
		},
		mounted(){
			this.addDragEvent("imageUploadedSource")
			if(this.store==null)
				this.store=structStore()
		},
		methods:{
			setBlendMode:function(blendMode){
				this.blendMode=blendMode
			},
			//backgroundImage.vue中调用，用于设置文件源，编辑已有的背景图片

			setFileSource:function(url){
				this.uploaded=url
			},
			fileSourceAsk:function(e){
				this.isAskFileSource=!this.isAskFileSource
			},
			addDragEvent:function(target){
				
				this.$nextTick(()=>{
					let dom=document.getElementById(target)
					dom.addEventListener("dragstart",function(e){
						e.preventDefault()
						e.stopPropagation()
					})
					dom.addEventListener("dragend",function(e){
						e.preventDefault()
						e.stopPropagation()
					})
					dom.addEventListener("dragover",function(e){
						e.preventDefault()
					})
					dom.addEventListener("dragenter",function(e){
						e.preventDefault()
						e.stopPropagation()
					})
					let _this=this
					dom.addEventListener("drop",function(e){
						e.preventDefault()
						e.stopPropagation()
						let file=[...e.dataTransfer.items][0]
						if(file.kind=='file'){
							const img=file.getAsFile()
							_this.gettedFile(img)
						}
					})
				})
			},
			createPreview:function(imgFile){//创建图片预览
				if(!imgFile.type.startsWith("image/")){
					return
				}else{
					let fileName=imgFile['name']
					if(this.store.HUB.Project.FILES.children[fileName]!=undefined){
						alert("文件已存在")
					}else{
						//文件上传
						//上传完成后将返回的路径名设置回STRUCTLIST中
						this.uploaded=URL.createObjectURL(imgFile)
						this.fileSourceAsk()
					}
				}
			},

			getSize:function(e){
				
			},
			openFileChose:function(){
				document.getElementById("getUploadImage").click()
			},
			gettedFile:function(file){
				let uploadSuccess=() => {//文件选择完成后执行
				    alert("上传成功")
					this.createPreview(file)
					this.fileSourceAsk()
				}
				let savePath=""
				let getSavePath=(target)=>{
					savePath=target
					//设置hub中的uploadPath上传地址
					//设置文件上传路径 (hub.vue)
					window.externalSetUploadPath(savePath+file.name,uploadSuccess)
					//调用hub供外部上传文件函数，传入file对象 (hub.vue)
					window.externalUpload(file,null,0)
					let setOpenView=(close)=>{
						close("hub")
					}
					//直接执行
					window.hubProvideFile(setOpenView)
				}
				//1.调用hub文件存储路径选择器，获取文件存储路径（sendList.vue）
				try{
					window.hubExternalRequest(getSavePath)
				}catch(e){
					alert("组件加载中，请稍后")
				}
			},
			changeFile:function(e){//选中文件
				let file=e.target.files[0]
				this.gettedFile(file)
				//2.调用hub上传功能，保存上传的文件
				//3.上传成功则创建图片预览
			},
			returnImage:function(e){
				this.$emit("returnImage",this.uploaded)
			},
			setBackgroundSize:function(size){
				this.backgroundSize=size
				
			},
			//从hub仓库中获取图片路径
			getFileFromHub:function(){
				//显示hub仓库
				let box=document.getElementById("hubOut")
				box.style.transition="0s"
				box.style.transformOrigin="10% center"
				box.style.transform="scale(1) translateX(-50%)"
				box.style.transition=".05s"
				box.style.opacity="1"
				let setOpenView=(close)=>{
					window.mainInsertOpenView({ target: 
					(value)=>{
						window.hubProvideFile(function(){//点击屏幕时应同时关闭并且取消hub内的externalUpload_success
							this.externalUpload_success=null
						},2)
						close(value)
					}
					, value: "hub" })
				}
				//直接执行
				window.hubProvideFile(setOpenView)
				let getImagePath=(path)=>{
					this.uploaded=path
					this.fileSourceAsk()
				}
				//获取后执行
				window.hubProvideFile(getImagePath,1)
				
			}
		}
	}
</script>

<style>
	.fileSource{
		height: 100%;
		width: 100%;
		position: absolute;
		z-index: 155;
		top: 40vh;
		left: 40vw;
		background-color: rgba(255,255,255,0.75);
		backdrop-filter: blur(3px);
		box-shadow: -5px 5px 10px rgba(0,0,0,0.25);
		border-radius: 10px;
	}
	.fileSouceButton{
		width: 80%;
		margin: 5px;
		margin-left: 10%;
		height: 30px;
		border-radius: 10px;
		background-color: white;
		transform-origin: center;
		transition: .2s;
		color: var(--mainColorBlue2);
		border:2px solid var(--mainColorBlue2)
	}
	.fileSouceButton:hover{
		transform: scale(1.1);
		background-color: var(--mainColorBlue2);
		color:white
	}
	#imgOutside:hover #imageUploadSource
	{
		filter: blur(5px);
		opacity: 0.7;
		transform: scale(1.1);
		transform-origin: center;
	}
	#imageUploadSource:hover +.choseButton {
		background-color: var(--mainColorBlue2);
		transform:scale(1) translateX(-50%);
		color: white;
	}
	.choseButton{
		position: absolute;
		z-index: 98;
		transition: .3s;
		height: 30px;
		width: 50%;
		top: 50px;
		border-radius: 10px;
		left: 50%;
		transform-origin: left;
		transform:scale(0) translateX(-50%);
		background-color: transparent;
		color: transparent;
	}
	.choseButton:hover{
		color: white;
		transform:scale(1) translateX(-50%);
		background-color: var(--mainColorBlue2);
	}
	.diyInput{
		width: 20%;
		height: 20px;
		border: none;
		outline:none;
		border-radius: 5px;
		box-shadow: -2px 2px 10px var(--mainColorGray2);
		font-weight: normal;
		text-align: center;
		font-size: 12px;
	}
</style>