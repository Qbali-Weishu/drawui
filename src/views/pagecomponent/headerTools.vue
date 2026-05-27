<template>
	<div class="container">
		<!--边框栏-->
		<div class="side"></div>
		<!--选择-->
		<div class="item" :style="{backgroundColor:`${usingTool==0?'#323232':''}`}" @click="useTool(0)">
			<svg t="1666849182037" class="icon" style="margin: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33327" width="20" height="20"><path d="M174.63 78.98c0.03-12.61 16.41-19.91 25.81-11.5l328.72 293.98 318.27 284.63c10.51 9.4 0.4 26.75-14.25 24.46L435.7 608.43c-6.23-0.97-12.72 1.92-16.16 7.2L199.96 952.72c-8.09 12.42-27.76 8.34-27.72-5.76l1.17-426.97 1.22-441.01z" fill="#ffffff" p-id="33328"></path></svg>
			<!--svg t="1666849396446" class="icon arrow" style="margin-top: 10px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34404" width="10" height="10"><path d="M513 748.5c-23.2 0-45-9.5-61.3-26.9L69.3 314.4c-8.8-9.4-8.4-24.2 1-33s24.2-8.4 33 1l382.5 407.2c7.4 7.9 17.1 12.2 27.3 12.2s19.9-4.3 27.3-12.2l382.5-407.2c8.8-9.4 23.6-9.9 33-1 9.4 8.8 9.9 23.6 1 33L574.3 721.6C558 739 536.2 748.5 513 748.5z" fill="#ffffff" p-id="34405"></path></svg-->
		</div>
		<!--容器-->
		<div v-if="editingMode<2" class="item" :style="{backgroundColor:`${usingTool==1?'#323232':''}`}" @click="useTool(1)">
			<svg t="1666849533682" class="icon" style="margin: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35504" width="18" height="18"><path d="M841.373567 841.133572h73.138571v73.138571h-73.138571v-73.138571z m-146.287143 0h73.148571v73.138571H695.086424v-73.138571z m-146.277143 0h73.138572v73.138571h-73.138572v-73.138571z m-146.277143 0h73.138572v73.138571h-73.138572v-73.138571z m-292.574286 0h73.138572v73.138571h-73.138572v-73.138571z m0-731.415715h73.138572v73.138572h-73.138572V109.717857z m146.287143 731.415715h73.138572v73.138571h-73.138572v-73.138571zM109.957852 694.846429h73.138572v73.148571h-73.138572v-73.148571z m0-146.287143h73.138572v73.138571h-73.138572v-73.138571z m0-146.277143h73.138572v73.138571h-73.138572v-73.138571z m0-146.287143h73.138572v73.138572h-73.138572v-73.138572z m731.415715 438.851429h73.138571v73.148571h-73.138571v-73.148571z m0-146.287143h73.138571v73.138571h-73.138571v-73.138571z m0-146.277143h73.138571v73.138571h-73.138571v-73.138571z m0-146.287143h73.138571v73.138572h-73.138571v-73.138572z m0-146.277143h73.138571v73.138572h-73.138571V109.717857z m-146.287143 0h73.148571v73.138572H695.086424V109.717857z m-146.277143 0h73.138572v73.138572h-73.138572V109.717857z m-146.277143 0h73.138572v73.138572h-73.138572V109.717857z m-146.287143 0h73.138572v73.138572h-73.138572V109.717857z m0 0" fill="#ffffff" p-id="35505"></path><path d="M951.091424 0H73.388567C33.159352 0 0.249995 32.909357 0.249995 73.138572v877.702857c0 40.229214 32.909357 73.138572 73.138572 73.138571h877.702857c40.229214 0 73.138572-32.909357 73.138572-73.138571V73.138572c0-40.229214-32.909357-73.138572-73.138572-73.138572z m0 914.272143c0 21.939571-14.629714 36.569286-36.569286 36.569286H109.957852c-21.939571 0-36.569286-14.629714-36.569285-36.569286V109.717857c0-21.939571 14.629714-36.569286 36.569285-36.569286h804.554286c21.939571 0 36.569286 14.629714 36.569286 36.569286v804.554286z m0 0" fill="#ffffff" p-id="35506"></path></svg>
			<svg t="1666849396446" class="icon arrow" style="margin-top: 10px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34404" width="10" height="10"><path d="M513 748.5c-23.2 0-45-9.5-61.3-26.9L69.3 314.4c-8.8-9.4-8.4-24.2 1-33s24.2-8.4 33 1l382.5 407.2c7.4 7.9 17.1 12.2 27.3 12.2s19.9-4.3 27.3-12.2l382.5-407.2c8.8-9.4 23.6-9.9 33-1 9.4 8.8 9.9 23.6 1 33L574.3 721.6C558 739 536.2 748.5 513 748.5z" fill="#ffffff" p-id="34405"></path></svg>
		</div>
		<!--形状节点-->
		<div class="item" :style="{backgroundColor:`${usingTool==2?'#323232':''}`}" @click="useTool(2)">
			<svg t="1666849589585" class="icon" style="margin: 4px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="36568" width="22" height="22"><path d="M864 896H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h704a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zM192 832h640V192H192v640z" p-id="36569" fill="#ffffff"></path></svg>
			<svg  t="1666849396446" class="icon arrow" style="margin-top: 10px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34404" width="10" height="10"><path d="M513 748.5c-23.2 0-45-9.5-61.3-26.9L69.3 314.4c-8.8-9.4-8.4-24.2 1-33s24.2-8.4 33 1l382.5 407.2c7.4 7.9 17.1 12.2 27.3 12.2s19.9-4.3 27.3-12.2l382.5-407.2c8.8-9.4 23.6-9.9 33-1 9.4 8.8 9.9 23.6 1 33L574.3 721.6C558 739 536.2 748.5 513 748.5z" fill="#ffffff" p-id="34405"></path></svg>
		</div>
		<!--钢笔-->
		<div class="item" :style="{backgroundColor:`${usingTool==3?'#323232':''}`}" @click="useTool(3)">
			<svg t="1666849690918" class="icon" style="margin: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37854" width="20" height="20"><path d="M921.6 851.968c-5.12-4.096-123.904-99.328-239.616-36.864-145.408 78.848-285.696 110.592-359.424 81.92-50.176-19.456-88.064-45.056-114.688-66.56l499.712-133.12c14.336-4.096 24.576-14.336 28.672-28.672L815.104 389.12c4.096-14.336 0-29.696-10.24-39.936L588.8 133.12c-10.24-10.24-25.6-14.336-39.936-10.24l-279.552 77.824c-14.336 4.096-24.576 15.36-28.672 28.672L89.088 799.744v1.024c0 2.048-1.024 3.072-1.024 5.12V815.104c0 2.048 1.024 4.096 1.024 6.144v1.024c1.024 2.048 1.024 3.072 2.048 5.12 1.024 0 1.024 1.024 1.024 1.024 1.024 2.048 2.048 3.072 3.072 5.12v1.024c5.12 7.168 68.608 88.064 196.608 138.24 26.624 10.24 59.392 16.384 95.232 16.384 92.16 0 209.92-34.816 332.8-101.376 67.584-36.864 148.48 27.648 148.48 27.648 17.408 14.336 43.008 11.264 57.344-6.144 15.36-17.408 13.312-43.008-4.096-57.344zM314.368 273.408l234.496-65.536 182.272 182.272L664.576 624.64l-399.36 106.496 168.96-168.96c29.696 8.192 62.464 1.024 84.992-21.504 33.792-33.792 33.792-88.064 0-121.856a85.9136 85.9136 0 0 0-121.856 0c-23.552 23.552-30.72 56.32-21.504 84.992L207.872 672.768l106.496-399.36zM833.536 309.248c8.192 8.192 18.432 12.288 28.672 12.288s20.48-4.096 28.672-12.288c16.384-16.384 16.384-41.984 0-58.368l-204.8-204.8c-15.36-15.36-40.96-15.36-57.344 1.024-16.384 16.384-16.384 41.984 0 58.368l204.8 203.776z" fill="#ffffff" p-id="37855"></path></svg>
			<!--svg t="1666849396446" class="icon arrow" style="margin-top: 10px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34404" width="10" height="10"><path d="M513 748.5c-23.2 0-45-9.5-61.3-26.9L69.3 314.4c-8.8-9.4-8.4-24.2 1-33s24.2-8.4 33 1l382.5 407.2c7.4 7.9 17.1 12.2 27.3 12.2s19.9-4.3 27.3-12.2l382.5-407.2c8.8-9.4 23.6-9.9 33-1 9.4 8.8 9.9 23.6 1 33L574.3 721.6C558 739 536.2 748.5 513 748.5z" fill="#ffffff" p-id="34405"></path></svg-->
		</div>
		<!--文字-->
		<div class="item" :style="{backgroundColor:`${usingTool==4?'#323232':''}`}" @click="useTool(4)">
			<svg t="1666849710649" class="icon" style="margin: 5px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38915" width="20" height="20"><path d="M864.192 208H159.808a32 32 0 0 1 0-64h704.384a32 32 0 1 1 0 64z" p-id="38916" fill="#ffffff"></path><path d="M512 893.024a32 32 0 0 1-32-32V209.6a32 32 0 0 1 64 0v651.424a32 32 0 0 1-32 32z" p-id="38917" fill="#ffffff"></path></svg>
			<svg t="1666849396446" class="icon arrow" style="margin-top: 10px;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34404" width="10" height="10"><path d="M513 748.5c-23.2 0-45-9.5-61.3-26.9L69.3 314.4c-8.8-9.4-8.4-24.2 1-33s24.2-8.4 33 1l382.5 407.2c7.4 7.9 17.1 12.2 27.3 12.2s19.9-4.3 27.3-12.2l382.5-407.2c8.8-9.4 23.6-9.9 33-1 9.4 8.8 9.9 23.6 1 33L574.3 721.6C558 739 536.2 748.5 513 748.5z" fill="#ffffff" p-id="34405"></path></svg>
		</div>
		<!--插件-->
		<div class="item" style="flex-shrink: 0;font-weight: normal;background-color: #323232;width: 80px;color: white;line-height: 30px;text-align: center;display: initial;">
			插件应用
		</div>
		<!--页面添加蒙版-->
		<teleport to="body" v-if="showAddMask">
			<div 
			@contextmenu.stop="cancle" 
			@mousedown.stop="maskDown"
			@mousemove.stop="maskMove"
			@mouseup.stop="maskUp"
			ref="mask"
			:style="{cursor:`${maskCursor}`}"
			 style="position: absolute;z-index: 99999;left:60px;top:50px;width:calc(100% - 320px);height:calc(100vh - 100px);background-color:transparent;">
			<div style="position: relative;width: 100%;height: 100%;background-color: transparent;" ref='mask'>
			</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	export default{
		name:"headerTools",
		data(){
			return{
				usingTool:0,
				childType:0,
				list:[
					[],
					['设备容器','组件容器'],//容器
					['块','图片'],//节点
					[],
					[],
				],
				editingMode:0,
				cursorList:[
					require("../../assets/icons/cursor.png"),
					require("../../assets/icons/add.png"),
					require("../../assets/icons/add.png"),
					require("../../assets/icons/pencil.png"),
					'text'
				],
				showAddMask:false,
				maskCursor:'none',
				parent:null,
				newNodeId:null,
				newNode_temp:null,
				hasDown:false,
				hasMove:false,
				downPosition:{
					left:0,
					top:0
				},
				nodeStyle:{
					left:0,
					top:0,
					width:0,
					height:0
				}
			}
		},
		mounted(){
			//重置工具栏
			System.resetHeaderTools=()=>{
				this.editingMode=System.editingMode
				const action=[
					()=>{
						return [
							['设备容器','组件容器'],//容器
							['块','图片'],//节点
							[],
							[],
						]
					},
					()=>{
						return [
							['设备容器','组件容器'],//容器
							['块','图片'],//节点
							[],
							[],
						]
					},
					()=>{
						return [
							[],//容器
							['矩形','圆','直线','多边形','图片'],//节点
							[],
							[],
						]
					}
				]
				this.list=action[this.editingMode]()
			}
		},
		methods:{
			useTool:function(index){
				this.childType=0
				if(index>0){
					let keys=Object.keys(System.operatingNodes)
					if(keys.length>1){
						System.showToast("请选择一个节点进行添加",3000)
					}else{
						this.usingTool=index
						if(index<4)
							this.maskCursor="url("+this.cursorList[index]+"),auto"
						else
							this.maskCursor=this.cursorList[index]
						
						//System.setCursor(this.cursorList[index])
						System.showTip(`在${keys.length==0?'页面':System.nodeMeta.tree[keys[0]].name}上添加(右键取消)`)
						this.parent=keys.length==0?null:keys[0]
						//聚焦
						if(this.parent!==null){
							//对父层进行聚焦,不显示聚焦返回按钮
							System.focusAction(false)
						}
						this.showAddMask=true
						//清除选择框
						System.clearBoundSide()
					}
				}else{
					this.usingTool=index
					System.closeTip()
				}
			},
			allList:function(index){
				
			},
			cancle:function(e){
				e.preventDefault()
				e.stopPropagation()
				this.hasDown=false
				this.hasMove=false
				this.showAddMask=false
				System.closeTip()
				this.usingTool=0
				this.childType=0
				if(this.parent!==null){
					//锁定所有
					System.lockNode(this.parent)
					//关闭聚焦层
					System.closeFocusLayer()
					//关闭提示框
					System.closeTip()
				}
				this.parent=null
			},
			maskDown:function(e){
				if(e.button!==0){
					e.stopPropagation()
					e.preventDefault()
					return
				}
				let tempData=JSON.parse(JSON.stringify({
					left:e.offsetX,
					top:e.offsetY
				}))
				this.downPosition=tempData
				this.nodeStyle.left=e.offsetX+0
				this.nodeStyle.top=e.offsetY+0
				if(this.editingMode<2){
					//普通与浮动，则为添加节点
					const action=[
						[],//占位，无具体作用
						()=>{},//容器
						()=>{
							//创建数据节点
							const type={
								'块':'node',
								'图片':'image'
							}[this.list[this.usingTool][this.childType]]
							try{
								this.newNodeId=System.insertNewMeta(this.parent,type)
							}catch(e){
								console.error(e)
							}
							
							//创建虚拟节点
							let cssText=`
								position:absolute;
								left:${e.offsetX}px;
								top:${e.offsetY}px;
								background:#D8D8D8;
								pointer-events:none;
							`
							this.newNode_temp=document.createElement(type=='node'?'div':'img')
							this.newNode_temp.id=this.newNodeId
							this.newNode_temp.style.cssText=cssText
							this.$refs['mask'].appendChild(this.newNode_temp)
						},//节点,
						()=>{},//钢笔,
						()=>{
							try{
								this.newNodeId=System.insertNewMeta(this.parent,'text')
							}catch(e){
								console.error(e)
							}
							
							//创建虚拟节点
							let cssText=`
								position:absolute;
								left:${e.offsetX}px;
								top:${e.offsetY}px;
								background:transparent;
								color:#d8d8d8;
								pointer-events:none;
							`
							this.newNode_temp=document.createElement('span')
							this.newNode_temp.contentEditable=true
							this.newNode_temp.innerText="新建文本"
							System.nodeMeta.tree[this.newNodeId].innerContent="新建文本"
							this.newNode_temp.id=this.newNodeId
							this.newNode_temp.style.cssText=cssText
							this.$refs['mask'].appendChild(this.newNode_temp)
						}//文字
					]
					action[this.usingTool]()
				}else{
					//否则为动画模式，添加形状
				}
				//等待数据加载完成再开始触发移动事件
				this.hasDown=true
			},
			maskMove:function(e){
				if(this.hasDown){
					let node=document.getElementById(this.newNodeId)
					this.hasMove=true
					if(e.offsetX>=this.downPosition.left){
						//按下后向右拉动
						this.nodeStyle.left=this.downPosition.left+0
						this.nodeStyle.width=e.offsetX-this.downPosition.left+10
					}else{
						//按下后向左拉动，left减少
						this.nodeStyle.left=e.offsetX+10
						this.nodeStyle.width=this.downPosition.left-e.offsetX
					}
					node.style.left=this.nodeStyle.left+'px'
					node.style.width=`${this.nodeStyle.width}px`
					if(e.offsetY>=this.downPosition.top){
						//按下后下拉动
						this.nodeStyle.top=this.downPosition.top+0
						this.nodeStyle.height=e.offsetY-this.downPosition.top+10
					}else{
						//按下后向上拉动，top减少
						this.nodeStyle.top=e.offsetY+10
						this.nodeStyle.height=this.downPosition.top-e.offsetY
					}
					node.style.top=this.nodeStyle.top+'px'
					node.style.height=`${this.nodeStyle.height}px`	
				}
			},
			//遮罩层鼠标抬起
			maskUp:function(e){
				if(e.button!==0){
					e.stopPropagation()
					e.preventDefault()
					return
				}
				let parentId=this.parent===null?System.rootId:this.parent
				let parent=document.getElementById(parentId)
				let parentPosition=parent.getBoundingClientRect()
				let newNodePosition=JSON.parse(JSON.stringify(this.newNode_temp.getBoundingClientRect()))
				//计算实际位置
				let realLeft=((newNodePosition.left-parentPosition.left)/System.scalePercent).toFixed(0)*1
				let realTop=((newNodePosition.top-parentPosition.top)/System.scalePercent).toFixed(0)*1
				this.hasDown=false
				this.hasMove=false
				this.showAddMask=false
				let width,height
				if(this.usingTool<4){
					width=(this.nodeStyle.width/System.scalePercent).toFixed(0)*1
					height=(this.nodeStyle.height/System.scalePercent).toFixed(0)*1
				}else{
					width=100
					height=25
				}
				this.usingTool=0
				this.childType=0
				
				
				
				System.metaData.STYLESTRUCT[this.newNodeId].style.left={
					value:"",
					children:{
						value:realLeft,
						unit:"px"
					},
					group:false,
					condition:{
						bindList:null,
						default:""
					}
				}
				System.metaData.STYLESTRUCT[this.newNodeId].style.top={
					value:"",
					children:{
						value:realTop,
						unit:"px"
					},
					group:false,
					condition:{
						bindList:null,
						default:""
					}
				}
				System.metaData.STYLESTRUCT[this.newNodeId].style.width={
					value:"",
					children:{
						value:width,
						unit:"px"
					},
					group:false,
					condition:{
						bindList:null,
						default:""
					}
				}
				System.metaData.STYLESTRUCT[this.newNodeId].style.height={
					value:"",
					children:{
						value:height,
						unit:"px"
					},
					group:false,
					condition:{
						bindList:null,
						default:""
					}
				}
				System.mountNode(this.newNodeId,parent,System.nodeMeta.tree[this.newNodeId])
				console.log('new node',System.nodeMeta)
				if(this.parent!==null){
					//锁定所有
					System.lockNode(this.parent)
					//关闭聚焦层
					System.closeFocusLayer()
					//关闭提示框
					System.closeTip()
				}
				this.parent=null
			}
		}
	}
</script>

<style scoped>
	.container{
		float: left;
		width: 300px;
		height: 30px;
		display: flex;
		background-color: transparent;
		margin-left: 16px;
		margin-top: 8px;
	}
	.side{
		width: 1px;
		height:30px;
		background-color: #323232;
	}
	.item{
		width:50px;
		height:30px;
		margin-top: 0px;
		margin-left: 6px;
		background-color: transparent;
		transition: .2s;
		border-radius: 5px;
		cursor: pointer;
		display: flex;
		padding-right: 3px;
	}
	.item:hover{
		background-color: #323232;
	}
	.arrow{
		transition: .2s;
		transform: translateY(0);
	}
	.arrow:hover{
		animation: moveArrow .5s;
		animation-fill-mode: forwards;
	}
	@keyframes moveArrow {
		from{
			transform: translateY(0);
		}50%{
			transform: translateY(3px);
		}to{
			transform: translateY(0);
		}
	}
</style>