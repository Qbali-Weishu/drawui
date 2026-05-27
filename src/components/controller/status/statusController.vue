<template>
	<!--状态管理器-->
	<div @mousewheel="scaleStatus" @contextmenu="showMenu" @mousedown.stop="submitSpaceEvent" ref="statusController" 
	style="transform: scale(0);transform-origin: left 70%;transition: .5s;transition-timing-function: var(--timingFunction1);opacity: 0;right:90vw;overflow: hidden;;width: 50vw;height: 90vh;position: absolute;z-index: 999;top: 5vh;background-color: #323232;border-radius: 10px;border:2px solid var(--mainColorGrayBg2);">
		<div style="position: absolute;right: 8px;top: 5px;width: 20px;height: 20px;cursor: pointer;" @click="quit">
			<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
					<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
		</div>
		<div ref="container" style="position: relative;width: 450vw;height: 450vh;pointer-events: none;" 
		:style="{
			transition:`${mask.down?'0s':(findNode.show?'.5s':'.1s')}`,
			marginLeft:`${mask.marginLeft+mask.deltaX}px`,
			marginTop:`${mask.marginTop+mask.deltaY}px`,
			transformOrigin:`${center.x}px ${center.y}px`,
			transform:`scale(${percent})`}">
			<status-node
			v-for="(statusMeta,key) in statusList"
			@setIndex='setIndex' 
			@remove="removeStatus"
			@setPosition="setPosition"
			:key="key"
			:id='key' 
			:style="{zIndex:`${nowEditNode==key?'2':'1'}`,border:`${nowEditNode==key?'1px solid #FF8F1F':'1px solid var(--mainColorGrayBg2)'}`}" 
			:_sourcrVar="statusMeta.varSource" 
			:_statusKey="key"
			:_potision="statusMeta.position"
			:_valueList="statusMeta.varList"></status-node>
		</div>
		<!--右键节点列表-->
		<div style="position: absolute;z-index: 3;background-color: #212121;border-radius: 10px;width: 100px;height: auto;padding-bottom: 8px;" 
			:style="{left:`${rightBarPosition.left}px`,top:`${rightBarPosition.top}px`}" 
			v-if="showRightBar">
			<div class="item"
			v-for="(option,index) in rightBarOptions" :key="index" @click="option.event">
				{{option.name}}
			</div>
		</div>
		<input v-if="showRightBar" class='hiddenInput' ref="hiddenInput" @blur="blurMenu"/>
		<!--空格遮罩层-->
		<div @mousedown.stop="startDown" @mousemove.stop="moveMask" @mouseup.stop="endMoveMask" style="position: absolute;z-index: 5;background-color:rgba(0,0,0,0);cursor: move;border-radius: 10px;width: 100%;height:100%;left:0;top: 0;" 
			v-if="showMask">
		</div>
		<input class="hiddenInput" ref="inArea" @blur="outOfArea" @focus="inArea"/>
		<!--模糊遮罩层-->
		<div  v-if="showNewBord" style="width: 100%;height: 100%;position: absolute;left: 0;top: 0;background-color: rgba(100,100,100,0);z-index: 99998;"></div>
		<!--新增-->
		<teleport to="body" v-if="showNewBord">
			<div style="z-index: 99999;;position: absolute;width: 400px;background-color: #212121;border-radius: 10px;top: calc(50vh - 150px);left: calc(45vw - 200px);transition: .5s;overflow: hidden;" 
			:style="{height:`${newCssSaveType==1?'150px':'200px'}`}">
			
				<h4 style="width: 100%;height: 25px;line-height: 25px;text-align: center;font-weight: normal;color:var(--mainTextColor1)">新建状态节点</h4>
				<!--关闭按钮-->
				<div style="position: absolute;right: 8px;top: 10px;width: 20px;height: 20px;cursor: pointer;" @click="showNewBord=false;newCssSaveType=-1">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
				</div>
				<!--选择区-->
				
				<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${newCssSaveType==1?'-100%':'0px'}`}">
					<div class="newCssItem" >
						<div style="width: 40px;height: 65px;">
							<svg t="1665664083775" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1451" style="margin-top: 20px;margin-left: 8px;" width="25" height="25"><path d="M575.5 782.8h414.7M990.2 816.7H575.5c-18.7 0-33.8-15.1-33.8-33.8 0-18.7 15.1-33.8 33.8-33.8h414.7c18.7 0 33.8 15.1 33.8 33.8 0 18.6-15.1 33.8-33.8 33.8z" p-id="1452" fill="#ffffff"></path><path d="M782.8 575.5v414.7M782.8 1024c-18.7 0-33.8-15.1-33.8-33.8V575.5c0-18.7 15.1-33.8 33.8-33.8 18.7 0 33.8 15.1 33.8 33.8v414.7c0.1 18.7-15.1 33.8-33.8 33.8z" p-id="1453" fill="#ffffff"></path><path d="M0.5 120.2a494.8 119.7 0 1 0 989.6 0 494.8 119.7 0 1 0-989.6 0Z" p-id="1454" fill="#ffffff"></path><path d="M495.3 240.5c-132.2 0-256.5-12.5-350-35.1C51.6 182.7 0 152.5 0 120.2s51.6-62.5 145.3-85.1C238.8 12.5 363.1 0 495.3 0s256.5 12.5 350 35.1C939 57.8 990.6 88 990.6 120.2s-51.6 62.5-145.3 85.1c-93.5 22.7-217.8 35.2-350 35.2z m0-239.5C222.7 1 1 54.5 1 120.2 1 186 222.7 239.5 495.3 239.5S989.7 186 989.7 120.2C989.7 54.5 767.9 1 495.3 1zM885 301.1c-90.6 25.7-231.5 42.3-389.7 42.3s-299.1-16.5-389.7-42.3C39.8 319.8 0.5 343.4 0.5 369c0 60.9 221.5 110.2 494.8 110.2S990.2 429.9 990.2 369c0-25.6-39.3-49.2-105.2-67.9z" p-id="1455" fill="#ffffff"></path><path d="M495.3 479.8c-132.2 0-256.5-11.5-350-32.3C51.6 426.6 0 398.7 0 369c0-25.1 36.5-48.8 105.5-68.4h0.2c94.5 26.9 236.5 42.3 389.6 42.3s295-15.4 389.6-42.3h0.2c69 19.6 105.5 43.3 105.5 68.4 0 29.7-51.6 57.5-145.3 78.4-93.5 20.9-217.8 32.4-350 32.4zM105.6 301.6c-33.3 9.5-59.2 20-77 31.3C10.3 344.5 1 356.7 1 369c0 60.5 221.8 109.8 494.4 109.8S989.7 429.6 989.7 369c0-12.4-9.3-24.5-27.7-36.2-17.8-11.3-43.7-21.8-77-31.3-94.6 26.9-236.6 42.3-389.7 42.3s-295.1-15.4-389.7-42.2z" p-id="1456" fill="#ffffff"></path><path d="M523.3 598.6c-9.3 0.1-18.6 0.2-28 0.2-158.2 0-299.1-16.5-389.7-42.3C39.8 575.3 0.5 598.8 0.5 624.5c0 60.9 221.5 110.2 494.8 110.2 6.8 0 13.6 0 20.3-0.1" p-id="1457" fill="#ffffff"></path><path d="M495.3 735.2c-132.2 0-256.5-11.5-350-32.3C51.6 682 0 654.2 0 624.5c0-25.1 36.5-48.8 105.5-68.4h0.2c94.5 26.9 236.5 42.3 389.6 42.3 9.3 0 18.7-0.1 28-0.2v1c-9.3 0.1-18.7 0.2-28 0.2-153.1 0-295.1-15.4-389.7-42.3-33.3 9.5-59.2 20-77 31.3C10.3 600 1 612.1 1 624.5 1 685 222.7 734.2 495.3 734.2c6.8 0 13.6 0 20.3-0.1v1c-6.7 0.1-13.5 0.1-20.3 0.1z" p-id="1458" fill="#ffffff"></path><path d="M513.7 854.2c-6.1 0-12.2 0.1-18.4 0.1-158.2 0-299.1-16.5-389.7-42.3C39.8 830.7 0.5 854.3 0.5 879.9c0 60.9 221.5 110.2 494.8 110.2 8.1 0 16.2 0 24.2-0.1" p-id="1459" fill="#ffffff"></path><path d="M495.3 990.7c-132.2 0-256.5-11.5-350-32.3C51.6 937.5 0 909.6 0 879.9c0-25.1 36.5-48.8 105.5-68.4h0.2c94.5 26.9 236.5 42.3 389.6 42.3 6 0 12.2 0 18.3-0.1v1c-6.1 0-12.3 0.1-18.4 0.1-153.1 0-295.1-15.4-389.7-42.3-33.3 9.5-59.2 20-77 31.3C10.3 855.4 1 867.6 1 879.9c0 60.5 221.8 109.8 494.4 109.8 8 0 16.2 0 24.2-0.1v1c-8.1 0-16.2 0.1-24.3 0.1z" p-id="1460" fill="#ffffff"></path></svg>
						</div>
						<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="addFromExist">
							<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
								从变量表选择
							</h3>
							<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
								从变量表中选择已有变量作为状态源
							</h4>
						</div>
						
					</div>
					<div class="newCssItem">
						<div style="width: 40px;height: 65px;">
							<svg t="1665664259852" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4081" style="margin-top: 20px;margin-left: 8px;" width="25" height="25"><path d="M863.774118 898.951529c49.392941-0.481882 51.802353-38.068706 51.802353-66.800941v-367.435294c0-24.094118 10.24-42.164706 34.93647-42.164706 24.094118 0 34.334118 18.070588 34.334118 42.164706v379.482353c6.625882 66.319059-42.164706 120.470588-115.049412 120.470588H142.757647c-66.258824 0-121.072941-48.188235-121.072941-120.470588v-722.823529c0-66.258824 54.814118-120.410353 121.072941-120.410353h381.891765c24.094118 0 42.164706 10.179765 42.164706 34.334117 0 24.094118-18.070588 34.334118-42.164706 34.334118H142.757647c-49.392941 0-61.44 15.179294-61.44 51.802353v710.776471c0 47.043765 24.094118 66.740706 61.44 66.740705h721.016471zM734.870588 187.693176v-144.564705c0-24.094118 12.649412-42.164706 37.345883-42.164706 24.094118 0 37.345882 18.070588 37.345882 42.164706v144.564705h133.12c24.094118 0 42.164706 15.058824 42.164706 39.152942s-18.070588 39.152941-42.164706 39.152941h-133.12v126.494117c0 24.094118-13.251765 42.164706-37.345882 42.164706-24.696471 0-37.345882-18.070588-37.345883-42.164706v-132.517647H591.510588c-24.696471 0-42.767059-12.047059-42.767059-36.141176 0-23.853176 18.070588-35.900235 42.767059-36.141177h143.36z" fill="#ffffff" p-id="4082"></path></svg>
						</div>
						<div style="width: calc(100% - 60px);margin-left: 10px;height: 65px" @click="newCssSaveType=1">
							<h3 style="margin:0;padding: 0;line-height: 30px;color: var(--mainTextColor1);margin-top: 5px;">
								新建
							</h3>
							<h4 style="margin:0;padding: 0;color: #C1C1C1;line-height: 25px;">
								新建一个状态源并添加到变量表
							</h4>
						</div>
						<div class='nextArrow' @click="newCssSaveType=-1" :style="{right:`${newCssSaveType==1?'-58px':'8px'}`,bottom:`${newCssSaveType==1?'150px':'8px'}`,transform:`${newCssSaveType==1?'scaleX(-100%)':'scaleX(100%)'}`}">
							<svg  t="1662729959981" class="icon arrow_" viewBox="0 0 1229 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12742" width="20" height="20"><path d="M1214.397 443.016L790.485 15.008a50.788 50.788 0 0 0-72.29 0.205 51.607 51.607 0 0 0-4.3 68.092l344.76 348.14H51.097A51.402 51.402 0 0 0 0.002 483.256c0 28.466 22.936 51.505 50.992 51.505h1007.559L705.498 891.092a53.245 53.245 0 0 0 8.499 61.846 50.48 50.48 0 0 0 36.247 14.745 57.34 57.34 0 0 0 40.855-17.407l28.261-28.363 77.615-78.332 14.642-14.54 302.677-305.748a51.197 51.197 0 0 0 14.336-39.217v-2.048a51.197 51.197 0 0 0-14.336-39.012z" p-id="12743" fill="#e6e6e6"></path></svg>
						</div>
					</div>
				</div>
				<!--输入区-->
				<div style="width: 100%;height: calc(100% - 25px);position: absolute;top: 25px;transition: .5s;" :style="{left:`${newCssSaveType==1?'0':'100%'}`}">
					
					<div style="display: flex;position: relative;height: 25px;width: 100%;margin-top: 30px;">
						<h3 style="margin: 0;width: 25%;text-align: center;padding: 0;font-weight: normal;color: white;line-height: 25px;">
							名称
						</h3>
						<input class="input" placeholder="请输入变量名" v-model="newNodeVarSource"/>
					</div>
					<div class="saveButton" @click="addNewNode">
						保存
					</div>
				</div>
				
			</div>
			
		</teleport>
		<!--定位状态源-->
		<teleport to="body" v-if="findNode.show">
			<div :style="{left:`${findNode.left}px`,top:`${findNode.top}px`}"
			class="varProvide provideMode" 
			>
				<h3 style="margin: 0;padding: 0;width: 100%;height: 25px;font-weight: normal;font-size: 16px;color: white;text-align: center;margin-top: 8px;">状态源选择</h3>
				<div style="position: absolute;right: 8px;top: 5px;width: 20px;height: 20px;cursor: pointer;" @click="findNode.show=false">
					<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
							<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
				</div>
				<div class="list" >
					<input @input="inputNodeTarget" v-model="findNode.target" class="input" style="width: 80%;margin-left: 10%;margin-top: 16px;" placeholder="请输入状态源名称"/>
					<hr class='splitLine' style="margin-top: 8px;background-color: #3e3e3e;"/>
					<div class="dataVarType" v-for="(varItem,key) in findNode.list" :key="key">
						<!--名称-->
						<div class="provideItem" @click="scrollTo(key)">{{varItem.varSource}}</div>
					</div>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	import statusNode from "../../application/statusNode.vue"
	/*
	_mode为output时表示为抛出，为input时表示为交互绑定指向
	output时显示当前组件内的所有状态源
	input时需传入节点ID
	*/
	export default{
		name:"statusController",
		props:{
			_mode:{
				type:String,
				default:"output"
			},
			_bindID:{
				type:String,
				default:''
			}
		},
		components:{
			statusNode
		},
		data(){
			return {
				statusList:{
					/*'test2':{
						varSource:"test2",
						position:{
							left:0,
							top:0
						},
						varList:[]
					},*/
				},
				percent:1,
				scrollX:0,//横向移动距离
				scrollY:0,//纵向移动距离
				center:{
					x:"left",
					y:'top'
				},
				outPosition:{
					left:0,
					top:0
				},
				timeout:null,
				nowEditNode:"",//当前编辑节点
				rightBarOptions:[],
				showRightBar:false,
				rightBarPosition:{
					left:0,
					top:0
				},
				//新增的状态节点键名
				newKey:null,
				newNodeVarSource:"",//新增的变量名
				showNewBord:false,
				newCssSaveType:-1,
				showMask:false,//控制遮罩层
				mask:{
					down:false,
					startX:0,
					startY:0,
					deltaY:0,
					deltaX:0,
					marginLeft:0,
					marginTop:0,
				},
				findNode:{
					show:false,
					target:"",
					left:0,
					top:0,
					list:{},
					timeout:null
				}
			}
		},
		beforeMount(){
			if(this._mode=='output'){
				//输出模式
				this.rightBarOptions=[
					{
						name:"新建状态节点",
						event:this.showAddNewBord
					},
					{
						name:"定位状态节点",
						event:this.startFindNode
					}
				]
			}
		},
		mounted(){
			//请求数据
			this.statusList=JSON.parse(JSON.stringify(System.metaData.STATUS))
		},
		methods:{
			//提供给主界面打开方法
			open:function(){
				this.$refs['statusController'].style.transform="scale(1)"
				this.$refs['statusController'].style.right="300px"
				this.$refs['statusController'].style.opacity="1"
			},
			quit:function(){
				this.$refs['statusController'].style.transform="scale(0)"
				this.$refs['statusController'].style.right="90vw"
				this.$refs['statusController'].style.opacity="0"
			},
			//控制状态管理器界面的大小缩放
			scaleStatus:function(e){
				//确定缩放中心
				if(System.keybord.control){
					if(this.outPosition.left ==0){
						this.outPosition.left=this.$refs['statusController'].getBoundingClientRect().left
						this.outPosition.top=this.$refs['statusController'].getBoundingClientRect().top
					}
					if(this.percent<=0) this.percent=0.005
					let positionX=(e.clientX-this.outPosition.left)/this.percent+this.scrollX
					let positionY=(e.clientY-this.outPosition.top)/this.percent+this.scrollY
					this.center.x=positionX
					this.center.y=positionY
					let delta=e.deltaY/(125*10)
					this.percent-=delta
				}
			},
			setIndex:function(nodeId){
				this.$refs['inArea'].focus()
				console.log("e")
				this.nowEditNode=nodeId
			},
			removeStatus:function(id){
				if(confirm("确认删除变量"+this.statusList[id].varSource+"的状态管理?")){
					let temp=JSON.parse(JSON.stringify(this.statusList[id]))
					try{
						delete this.statusList[id]
						delete System.metaData.STATUS[id]
						System.showToast("删除成功，请注意他处的引用",2000)
					}catch{
						this.statusList[id]=temp
						System.metaData.STATUS[id]=temp
						System.showToast("删除失败，已恢复数据",2000)
					}
				}
			},
			setPosition:function(id,position){
				//变化的位置信息存储在各个节点中，故不需要重新赋值到已加载列表的position中
				System.metaData.STATUS[id].position={
					left:position.left,
					top:position.top
				}
			},
			//新建状态节点
			showAddNewBord:function(){
				this.showNewBord=true
				this.newNodeVarSource=""
				this.newCssSaveType=-1
			},
			addNewNode:function(e,newVar=true){
				if(newVar){
					if(this.newNodeVarSource.length<0){
						System.showToast("未输入变量名")
						return
					}
					try{
						new Function(`
							let a={}
							a[${this.newNodeVarSource}]=1
							`)
					}catch{
						System.showToast("变量名不合规，请重新输入",2000)
						return
					}
					if(this.newKey!=null){
						if(!System.metaData.STATUS[this.newKey].varSource){
							System.showToast("前一个新增节点未指定状态源",3000)
							return
						}
					}
				}
				let newKey=Math.random().toString(36).substr(2)
				this.newKey=newKey
				//写入状态管理节点列表
				System.metaData.STATUS[newKey]={
					varSource:this.newNodeVarSource,
					position:this.rightBarPosition,
					varList:[]
				}
				//写入DATA变量
				if(newVar){
					System.metaData.VARLIST.DATA['DATA_'+newKey]={
						name:this.newNodeVarSource,
						value:{
							test:""
						},
						codeText:``,//用于在value为Object时存储对象
						text:"",//注释
					}
				}
				//更新加载列
				this.statusList[newKey]={
					varSource:this.newNodeVarSource,
					position:this.rightBarPosition,
					varList:[]
				}
				this.nowEditNode=newKey
				this.showNewBord=false
				if(newVar)
					System.showToast("创建成功，已加入DATA变量,默认为空值",5000)
				else
					System.showToast("创建成功",2000)
			},
			//从已有添加
			addFromExist:function(e){
				const callBack=(name)=>{
					let exists=[]
					for(let key in System.metaData.STATUS){
						exists.push(System.metaData.STATUS[key].varSource)
					}
					if(exists.includes(name)){
						System.showToast("状态源重复，选择失败",2000)
					}else{
						this.newNodeVarSource=name
						this.addNewNode(e,false)
					}
				}
				System.requestProvide("varProvide",
				{ 	varType:"数据变量(data)",
					mode:"provide",
					callBack:callBack,
					left:e.clientX,
					top:e.clientY
				})
			},
			showMenu:function(e){
				e.preventDefault()
				this.rightBarPosition={
					left:e.offsetX,
					top:e.offsetY
				}
				this.showRightBar=true
				this.$nextTick(()=>{
					this.$refs['hiddenInput'].focus()
				})
			},
			blurMenu:function(){
				setTimeout(()=>{
					this.showRightBar=false
				},200)
			},
			submitSpaceEvent:function(){
				this.$refs['inArea'].focus()
			},
			inArea:function(){
				System.keyDownEvent['space']=()=>{
					this.showMask=true
				}				
				System.keyUpEvent['space']=()=>{
					this.showMask=false
				}
			},
			startDown:function(e){
				this.mask.startX=e.clientX
				this.mask.startY=e.clientY
				this.mask.down=true
			},
			moveMask:function(e){
				if(this.mask.down){
					this.mask.deltaX=e.clientX-this.mask.startX
					this.mask.deltaY=e.clientY-this.mask.startY
				}
			},
			endMoveMask:function(e){
				this.mask.down=false
				this.mask.marginLeft+=this.mask.deltaX
				this.mask.marginTop+=this.mask.deltaY
				this.mask.deltaX=0
				this.mask.deltaY=0
			},
			startFindNode:function(e){
				let top=e.clientY
				console.log(screen.height-top,screen.height,top)
				if((screen.height-top)<500){
					top-=(Object.keys(this.findNode.list).length*50/2+200)
				}
				this.findNode={
					show:true,
					target:"",
					left:e.clientX,
					top:top,
					list:this.statusList,
					timeout:null
				}
			},
			scrollTo:function(nodeId){
				this.nowEditNode=nodeId
				let box=document.getElementById(nodeId).getBoundingClientRect()
				let left=box.left-100
				let top=box.top-100
				let parentBox=this.$refs['statusController'].getBoundingClientRect()
				let parentLeft=parentBox.left
				let parentTop=parentBox.top
				this.mask.marginLeft+=parentLeft-left
				this.mask.marginTop+=parentTop-top
				setTimeout(()=>{
					this.findNode.show=false
				},550)
				
			},
			inputNodeTarget:function(){
				if(this.findNode.timeout!=null)
					clearTimeout(this.findNode.timeout)
				this.findNode.timeout=setTimeout(()=>{
					let temp={}
					for(let key in this.statusList){
						if(~this.statusList[key].varSource.indexOf(this.findNode.target)){
							temp[key]=this.statusList[key]
						}
					}
					this.findNode.list=temp
					this.findNode.timeout=null
				},200)
			}
		}
	}
</script>

<style scoped>
	.item{
		width:90%;margin-left: 5%;border-radius: 10px;margin-top: 8px;height: 30px;text-align: center;line-height: 30px;color: white;font-weight: normal;cursor: pointer;transition: .2s;
	}
	.item:hover{
		background-color: var(--mainColorBlue2);
	}
	.newCssItem{
		height: 65px;
		width: 90%;
		background-color: #323232;
		margin-left: 5%;
		border-radius: 10px;
		margin-top: 16px;
		display: flex;
		cursor: pointer;
		position: relative;
		transition: .5s;
	}
	.newCssItem:hover{
		box-shadow: 0 0 0px 2px var(--mainColorBlue2);
	}
	.arrow_{
		transform: rotate(0deg);
	}
	.newCssItem:hover .arrow_{
		animation: arrow .5s;
	}
	@keyframes arrow {
		0%{
			transform: translate(0);
		}
		50%{
			transform: translateX(50%);
		}100%{
			transform: translateX(0);
		}
	}
	.nextArrow{
		transform: scaleX(100%);
		position: absolute;right: 8px;bottom: 3px;
		transition: .5s;
	}
	.input{
		transition: .2s;
		color: white;
		border: none;outline: none;width: 70%;height: 25px;line-height: 25px;border-radius: 10px;background-color: var(--mainColorGrayBg2);text-align: center;
	}
	.input::placeholder{
		font-size: 12px;
		color: #e6e6e6;
	}
	.input:focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
	.saveButton{
		width: 30%;margin-left: 35%;height: 30px;margin-top: 24px;background-color: var(--mainColorBlue2);color: white;font-weight: normal;line-height: 25px;text-align: center;
		cursor: pointer;
		border-radius: 10px;
	}
	.varProvide{
		transition: .2s;
		position: absolute;
		height: 60vh;
		top: 20vh;
		width: 400px;
		left: 50vw;
		transform: translateX(-50%);
		border-radius: 15px;
		z-index: 99999;
		background-color: #212121;
	}
	.provideMode{
		width: 200px;
		transform: scale(0);
		transform-origin: left top;
		height: auto;
		max-height: 400px;
		border: 1px solid var(--mainColorGrayBg2);
		animation: showProvideMode .5s;
		animation-fill-mode: forwards;
		animation-timing-function: var(--timingFunction1);
	}
	@keyframes showProvideMode {
		from{
			transform: scale(0);
			opacity: 0;
		}to{
			transform: scale(1);
			opacity: 1;
		}
	}
	.provideItem{
		border-radius: 10px;
		text-align: center;
		font-weight: normal;
		line-height: 25px;
		height: 25px;
		margin-top: 8px;
		width: 80%;margin-left: 10%;background-color: var(--mainColorGrayBg2);color: white;cursor: pointer;
		transition: .2s;
	}
	.provideItem:hover{
		background-color: var(--mainColorBlue2);
	}
	.list{
		width: 100%;overflow: scroll;height: calc(100% - 60px);
		padding-bottom: 8px;
	}
	/*数据变量部分*/
	.dataVarType{
		margin-top: 8px;
		width: 100%;
		height: 30px;
		display: flex;
	}
</style>