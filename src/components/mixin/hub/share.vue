<template>
	<div class="shareOut">
		<div style="height: 20%;width: 100%;display: flex;">
			<h4 style="margin: 0;padding: 0;line-height: 55px;height: 50px;width: 25%;font-weight: normal;font-size: 13.5px;color:var(--mainColorGray4)">将下列文件分享到</h4>
			<selectList :list="targetList" :selected="targetList[targetIndex]" :width="'80px'" @change="function(data){targetIndex=data.index}" style="z-index: 109;;margin: 0;background-color:var(--mainColorBlue2);color: white;font-weight: normal;position: absolute;left:25%;top: 13px;">
			</selectList>
			<input id="sendTarget" :placeholder="targetIndex==0 ? '请输入接收方账户名' : '请输入目标仓库ID'" v-model="sendTarget"/>
			<button style="position: absolute;right: 28%;top:17px;color: var(--mainColorGray4);box-shadow: 0px 0px 5px rgba(200,200,200,0.8);border-radius: 10px;padding: 0;width: 20px;height: 20px;" @click="search.target=''">X</button>
			<button @click="send" style="background-color: var(--mainColorBlue2);width: 15%;height: 30px;position: absolute;right: 10%;top: 10px;border-radius:10px;color:white;padding: 0;letter-spacing: 3px;">发送</button>
			<button @click="finish" style="background-color: transparent;;width: 8%;height: 30px;position: absolute;right: 10px;top: 10px;border-radius:10px;color:var(--mainColorRed);padding: 0;letter-spacing: 3px;">取消</button>
			</div>
		<div
		 style="background-size: contain;background-repeat: no-repeat;background-position: center;height: calc(90% - 40px);width: 100%;background-color: transparent;overflow-y: scroll;;overflow-x: hidden;position: relative;">
			<h4 v-if="choseList.length==0" style="position: absolute;bottom: 0px;margin:0;left: 50%;transform: translateX(-50%);color: var(--mainColorGray2);font-weight: normal;">空空如也~ 请上传文件到此处</h4>
			<div  class="fileBord"  style="width: 100%;height: auto;" >
				<div :class="'fileItem_'+index" style="position: relative;margin-top: 10px;margin-left:10px;background-color: rgba(255,255,255,0.8);display: flex;flex-direction: column;" v-for="(item,index) in Object.keys(choseList)">
					<button @click="removeTarget(item)" style="height: 15px;padding: 0;width: 30px;position: absolute;right: 5px;border-radius: 10px;font-size: 1.5rem;line-height: 12px;background-color: var(--mainColorGray2);">
						<h4 style="margin: 0;padding: 0;height: 15px;color: white;">-</h4>
					</button>
					<!--预览图片 item是choseList中每一项的键名，即文件名字-->
					<div class="fileItem" @contextmenu="callContextMenu($event,item.name,index)" @click="openFile(item,$event)" style="margin-top: 17px;background-color: white;transform-origin: center;overflow: hidden;background-size: contain;background-position: center;background-repeat: no-repeat;height: 70%;margin-bottom: 5%;width:90%;margin-left: 5%;border-radius: 10px;box-shadow: -3px 3px 15px rgba(0,0,0,0.25);">
						<img @error="parent.fileError" :src="`${choseList[item].type=='folder'?parent.imgList['folder'] : parent.imageFileTemp[item]}`" style="height: 100%;width:100%;object-fit: contain;">
					</div>
					<!--预览图片-->
					<!--名称-->
					<h4 style="margin: 0;border-radius: 5px;border: none;height: 20px;line-height: 20px;width: auto;width: calc(100% - 15px);transition: .15s;" 
					>{{item}}</h4>
					<!--名称-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/*此处的文件列表界面数据与hub不同；格式为 {名称（item）：类型}*/
	import selectList from "../../microTools/select.vue"
	export default{
		inject:['parent'],
		name:"fileShare",
		data(){
			return {
				targetList:['账户','仓库'],
				targetIndex:0,
				choseList:JSON.parse(JSON.stringify(this.parent.mouse.choseList)),
				sendTarget:""
			}
		},
		components:{
			selectList
		},
		mounted(){
			console.log(this.parent.imageFileTemp)
			//console.log(this.parent.mouse.choseList,this.parent.imageFileTemp)
		},
		watch:{
			choseList:{
				handler:function(val){
					if(Object.keys(val).length==0){
						this.parent.menu.share=false
					}
				},
				immediate:true,
				deep:true
			}
		},
		beforeMount(){
			
			/*for(let key in this.parent.mouse.choseList){//清除文件夹选项
				if(this.parent.mouse.choseList[key].type=='folder'){
					delete this.choseList[key]
				}
			}*/
		},
		methods:{
			removeTarget:function(name){
				delete this.choseList[name]
				console.log(this.choseList)
			},
			send:function(){
				if(this.sendTarget.length==0){
					alert("请输入发送对象")
				}else{
					let preData=window.localStorage.getItem("shareRecord"+window.USERPATH)
					let _this=this
					let path="/file/share?id="+window.USERPATH
					let data={source:this.parent.mouse.choseList,target:this.sendTarget,sendType:this.targetIndex}
					let http=new XMLHttpRequest()
					let date=new Date()
					http.open("POST",path,true)
					http.onreadystatechange=function(){
						if(http.readyState==4 && http.status==200){
							if(http.responseText=='success'){
								alert("发送成功，请通知对方查收")
								let shareFileList
								shareFileList=[]
								//自己已发送，显示原文件地址，发送时间，发送对象，接收状态
								for(let name in _this.parent.mouse.choseList){
									shareFileList.push({
										name:name,
										path:_this.parent.menu.shareFilePath+'/'+name,
										time:date.getDate(),
										target:_this.sendTarget,
										status:false,
										recordType:0
										})
								}
							}else{
								alert("发送错误")
							}
							_this.finish()
						}
					}
					http.send(JSON.stringify(data))
				}
			},
			finish:function(){
				this.parent.menu.share=false;
				this.parent.menu.chose=false;
				this.parent.mouse.choseList={}
			}
		}
	}
</script>

<style scoped>
	h4{
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	.shareOut{
		height: 80%;
		width: 70%;
		position: absolute;
		z-index: 9999;
		left:50%;
		transform: translateX(-50%);
		top:10%;
		box-shadow: -3px 3px 15px rgba(198,198,198,0.8);
		border-radius: 15px;
		background-color: white;
	}
	.fileBord{
		display: grid;
		grid-template-columns: repeat(5,19%);
		grid-gap: 0px;
		grid-auto-rows: 160px;
		grid-template-rows: repeat(auto-fill);
	}
	#sendTarget{
		position: absolute;
		height: 35px;
		top:7px;
		border-radius: 10px;
		width: 40%;
		font-size: 14px;
		text-align: right;
		padding-right: 60px;
		padding-left: 5px;
		left: 23%;
		outline: none;
		border: none;
		background-color: var(--mainColorGray3);
	}

	.fileItem{
		transform: scale(1);
		transition: .3s;
		cursor: pointer;
		transform-origin: center;
	}
</style>