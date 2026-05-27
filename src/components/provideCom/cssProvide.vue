<template>
	<div>
		<teleport to="body">
			<div class="main">
				<!--顶部-->
				<div style="width: 100%;height: 25px;background-color: transparent;display: flex;margin-top: 5px;">
					<div style="width:20%;height: 25px;display: flex;">
						<!--内容区块-->
						<button @click="callFloatBar(0)" class="cssSheetTopButton" style="background-color: var(--mainColorBlue2);">
						{{nowCssSourceText[nowCssSource]}}
						<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="position: absolute;right: 5px;margin-top: 5px;margin-left: 0px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
						
						</button>
						<!--展开区块-->
						<!--内容区块-->
						<div class="showTargetList" style="left: 10px;top: 25px;overflow: hidden;" v-if="floatBar==0">
							<div class="editTargetItem" @click="nowCssSource=0;initData()">
								全局
							</div>
							<div class="editTargetItem"  @click="nowCssSource=1;initData()">
								当前组件
							</div>
							<input ref="floatBar0" @blur="blurFloatBar" style="width: 1px;height: 1px;outline: none;border: none;;position: absolute;top: -10px;"/>
						</div>
						
					</div>
					
					<!--搜索-->
					<div  style="font-weight: normal;font-size: 12px;background-color: var(--mainColorBlue2);border-radius: 10px;color: white;height: 25px;position: absolute;top: 5px;right: 40px;cursor: pointer;">
						<input class="searchInput" list="searchList" placeholder="搜索" v-model="searchTarget"/>
						<datalist id="searchList"> 
							<option v-for="(item,index) in classDataList_show" :key="index" :value="item.name"></option>
						</datalist>
					</div>
					<!--退出-->
					<button @click.stop="quit" style="background-color: transparent;color: white;height: 25px;position: absolute;top: 5px;right: 8px">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
					</button>
				</div>
				<!--内容部分-->
				<div style="height: calc(100% - 80px);margin-top: 10px;background-color: transparent;width: 100%;display: flex;" id="cssListMain" >
					<main style="height: 100%;transition: .2s;overflow: scroll;" :style="{width:`${editCss?'calc(100% - 260px)':'100%'}`}" ref="cssListMain">
						<div class="cssItem" v-for="(item,index) in classDataList_show" :key="index" :data-cssname="item.name">
							<!--选择框-->
							<div style="flex-shrink: 0;position: absolute;left: 0px;top: 4px;width: 15px;height: 15px;border-radius: 5px;cursor: pointer;transition: .2s;" :style="{boxShadow:`${item.select?'':'0 0 0 2px white'}`}"  @click="selectToSave(index,item)">
								<svg t="1662810519305" v-if="item.select" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20310" style="margin-top: 0px;margin-left: -3px;" width="20" height="20"><path d="M748.864 302.528a49.024 49.024 0 0 1 68.288-1.28 46.656 46.656 0 0 1 5.952 61.44l-4.608 5.44-346.56 353.344a49.024 49.024 0 0 1-64.384 4.608l-5.504-4.864-196.8-203.264a46.72 46.72 0 0 1 1.792-66.88A49.024 49.024 0 0 1 270.08 448l5.312 4.736 162.048 167.232L748.8 302.528z" fill="#3662EC" p-id="20311"></path></svg>
							</div>
							<!--类型，名称，操作项-->
							<div class="cssItem_title" style="margin-left: 25px;">
								<!--类型icon-->
								<div class="cssTypeIcon" :style="{backgroundColor:`${['ROOT','BODY'].includes(item.name)?'var(--mainColorGrayBg2)':classColor[item.type]}`}">
									<svg v-if="item.type=='class' && !['ROOT','BODY'].includes(item.name)" t="1662729581227" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11007" style="margin-top: 3px;margin-left: 8px;" width="20" height="20"><path d="M256 169.984l0 342.016 105.984-64 107.989333 64 0-342.016-214.016 0zM768 86.016q34.005333 0 59.989333 25.002667t25.984 59.008l0 683.989333q0 34.005333-25.984 59.008t-59.989333 25.002667l-512 0q-34.005333 0-59.989333-25.002667t-25.984-59.008l0-683.989333q0-34.005333 25.984-59.008t59.989333-25.002667l512 0z" p-id="11008" fill="#e6e6e6"></path></svg>
									<h4 style="margin: 0;padding: 0;float: right;line-height: 25px;margin-right: 8px;color: var(--mainTextColor1);text-align: center;">
										{{['ROOT','BODY'].includes(item.name)?'通用':classText[item.type]}}
									</h4>
								</div>
								<!--名称-->
								<div class="cssItem_name">{{item.name}}</div>
								<!--操作项-->
								<div class="cssItem_ope">
									<div class="cssItem_opeButton" :buttonName="editCss?'关闭':'预览'" @click="callCssEdit(item,index)">
										<svg t="1663211722231" v-if="!editCss" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2186" style="margin-top: 3px;margin-left: 3px;" width="20" height="20"><path d="M179.2 179.2H384V128H128v256h51.2zM844.8 844.8H640V896h256v-256h-51.2zM640 128v51.2h204.8V384H896V128zM179.2 640H128v256h256v-51.2H179.2zM256 682.666667h512V341.333333H256v341.333334z m51.2-290.133334h409.6v238.933334H307.2V392.533333z" p-id="2187" fill="#e6e6e6"></path></svg>
										<svg t="1663211891531" v-else-if="editCss && nowEditIndex==index" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4053" style="margin-top: 3px;margin-left: 3px;" width="20" height="20"><path d="M833.633836 551.096437 481.955218 551.096437c-16.207124 0-29.359678-13.019525-29.359678-29.322839 0-16.188704 13.057387-29.321816 29.359678-29.321816l359.371834 0-74.718749-74.719772c-11.435447-11.414981-11.473309-29.894867 0.057305-41.424458 11.453866-11.453866 30.124088-11.340279 41.407062-0.038886l109.329011 109.310591c5.555529 1.069355 10.881838 3.703345 15.196097 8.018627 6.681166 6.681166 9.468652 15.691377 8.399297 24.319895 1.069355 8.630564-1.718131 17.640776-8.399297 24.321942-4.314259 4.315282-9.640568 6.987135-15.196097 8.018627l-109.329011 109.309568c-11.281951 11.30037-29.953196 11.413957-41.407062-0.039909-11.530614-11.530614-11.491729-30.009478-0.057305-41.423435L833.633836 551.096437zM745.933425 238.32392l0-97.704253c0-43.2572-35.029818-78.230736-78.230736-78.230736l-508.36931 0c-43.181475 0-78.230736 35.011398-78.230736 78.230736l0 742.759641c0 43.256176 35.011398 78.230736 78.230736 78.230736l508.36931 0c43.181475 0 78.230736-35.050284 78.230736-78.230736l0-97.704253c0-16.188704-13.134135-29.321816-29.341259-29.321816-16.208147 0-29.341259 13.133112-29.341259 29.321816l0 78.230736c0 21.571295-17.600867 39.059598-38.925544 39.059598l-469.635123 0c-21.49557 0-38.943964-17.450441-38.943964-39.059598l0-703.852516c0-21.533432 17.600867-39.019689 38.943964-39.019689l469.635123 0c21.515013 0 38.925544 17.410532 38.925544 39.019689l0 78.269621c0 16.187681 13.133112 29.321816 29.341259 29.321816C732.79929 267.645736 745.933425 254.511601 745.933425 238.32392z" p-id="4054" fill="#e6e6e6"></path></svg>
									</div>
								</div>
							</div>
						</div>
					</main>
					<!--编辑预览-->
					<div style="overflow: hidden;height: 100%;;margin-left: 10px;transition: .2s;background-color: transparent;position: relative;" :style="{width:`${editCss?'250px':'0'}`}">
						<div  style="transform:  translateY(-50%);overflow: scroll;position: absolute;width: 90%;padding: 8px;box-sizing: border-box;margin-left: 5%;height: 510px;top: 50%;;border: 3px dashed white;border-radius: 10px;display: flex;flex-direction: column;align-items: center;justify-content: center;">
							<div style="background-color:transparent;" ref="preview"  :style="{transform:`scale(${scaleView})`,width:`${previewWidth}`,height:`${previewHeight}`}">
							</div>
						</div>
					</div>
				</div>
				<!--底部按钮-->
				<div style="width: 100%;height: 30px;">
					<button @click="saveSelect" style="width: 100px;float: right;margin-right: 10px;height: 30px;background-color: var(--mainColorBlue2);color: white;border-radius: 10px;cursor: pointer;">添加选中类</button>
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	///css支持组件，供选择类、变量等
	import { structStore } from "../../store/struct.js"
	export default{
		name:"cssProvide",
		props:{
			propsOptions:{
				type:Object,
				default:{}
			}
		},
		data(){
			return {
				store:null,
				nowCssSource:0,
				nowCssSourceText:["全局",'当前组件'],
				floatBar:-1,
				classDataList_show:[],
				searchTarget:"",
				isCallFloatBar:false,
				classColor:{
					"class":'#EB5744',
					'label':'#6D96FF',
					'other':'#81C874'
				},
				classText:{
					"class":'CSS类',
					'label':'标签',
					'other':'其它'
				},
				editCss:false,
				scaleView:"1",
				previewWidth:"300px",
				previewHeight:"200px",
				nowEditIndex:-1,
				selectedList:null,
				selectTimeout:null
			}
		},
		mounted(){
			if(!this.store){
				this.store=structStore()
			}
			this.initData()
		},
		methods:{
			initData:function(){
				
				this.classDataList_show=[]
				this.$nextTick(()=>{
					let area=['APP','CURRENT'][this.nowCssSource]
					let source=this.store.CLASSLIST[area]
					if(!this.selectedList){
						this.selectedList={}
						let preData=this.propsOptions.preClass
						for(let i=0;i<preData.length;i++){
							this.selectedList[preData[i].area+"_"+preData[i].name]={
								select:true,
								name:preData[i].name,
								area:preData[i].area
							}
						}
						
					}
					let preClass
					try{
						let type=Object.prototype.toString.call(this.selectedList)
						console.log(type,'type')
						if(type=='[object Array]'){
							//首次传入
							preClass=this.selectedList.map(function(item){
								return item.area+"_"+item.name
							})
						}else if(type=='[object Object]'){
							//内部有修改,selectedList结构被重置
							preClass=[]
							for(let key in this.selectedList){
								if(this.selectedList[key].select) preClass.push(key)
							}
						}
						
						console.log(preClass,this.selectedList)
						
					}catch{
						preClass=[]
					}
					for(let key in source){
						if(source[key].type=='class'){
							this.classDataList_show.push(
								{
									key:key,
									select:~preClass.indexOf(area+"_"+source[key].name),
									...source[key]
								}
							)
						}
					}
				})
				
			},
			callFloatBar:function(index){
				//调起悬浮列表
				let temp=this.floatBar
				this.floatBar=index
				this.$nextTick(()=>{
					this.$refs['floatBar0'].focus()
					if(temp!=-1)
						this.isCallFloatBar=true
					else
						this.isCallFloatBar=false
				})
				
			},
			blurFloatBar:function(){
					setTimeout(()=>{
						if(!this.isCallFloatBar){
							this.floatBar=-1
						}
						this.isCallFloatBar=false
					},200)
			},
			resetScale:function(box){
				//设置长宽时需要重新计算比例
				let percent=1
				
					let checkWidth=()=>{
						let widthValue=box.offsetWidth
						//console.log(widthValue)
						if(widthValue*percent>210){
							//当宽大于高时，以宽为缩放比例
							percent*=(210/(widthValue*percent)).toFixed(2)*1
						}
					}
					let checkHeight=()=>{
						let heightValue=box.offsetHeight
						//console.log(heightValue)
						if(heightValue*percent>480){
							//当宽大于高时，以宽为缩放比例
							percent*=(480/(heightValue*percent)).toFixed(2)*1
						}					
						
					}
					
					checkWidth()
					checkHeight()
			
				//设置当前缩放预览比例
				this.previewWidth=box.style.width
				this.previewHeight=box.style.height
				this.scaleView=percent
			},
			processStyle:function(text){
				let css=""
				let transformReg=new RegExp(/translate[XYZ]{0,1}\([^\)]+\){1}/g)//替换translate
				let processData,value=""
				for(let key in text){
					processData=text[key]
					if(Object.prototype.toString.call(processData)=='[object Object]'){
						for(let key1 in processData){
							value=processData[key1]
							if(key1=='transform'){
								value=value.replace(transformReg,"")
							}else if(key1=='transition'){
								
							}
							if(value)
								{
									key1=key1.replace(/([A-Z])/g,function($,$1){
											return "-"+$1.toLowerCase()
										})
									css+=`${key1}:${value};`
								}
						}
					}else{
						if(key=='transform'){
							processData=processData.replace(transformReg,"")
						}else if(key=='transition'){
							
						}
						if(processData){
							key=key.replace(/([A-Z])/g,function($,$1){
									return "-"+$1.toLowerCase()
								})
							css+=`${key}:${processData};`
						}
					}
				}
				return css
			},
			callCssEdit:function(item,index){
					this.nowEditIndex=index
					this.editCss=!this.editCss
						this.$nextTick(()=>{
							let dom
							if(item.type=='label'){
								dom=document.createElement(item.name)
							}else{
								dom=document.createElement("div")
							}
							this.$refs['preview'].innerHTML=""
							this.$refs['preview'].appendChild(dom)
							let q='cssViewer_virtual_select'
							dom.id=q
							dom.style.cssText+=this.processStyle(item.text)
							this.resetScale(dom)
						})
			},
			selectToSave:function(index,item){
				if(this.classDataList_show[index].select){
					this.classDataList_show[index].select=!this.classDataList_show[index].select
				}else{
					this.classDataList_show[index].select=true
					
				}
				let temp=JSON.parse(JSON.stringify(this.classDataList_show))
				let tempIndex=this.nowCssSource
				
				if(this.selectTimeout!=null){
					clearTimeout(this.selectTimeout)
				}
				this.selectTimeout=setTimeout(()=>{
					
					
					
					for(let i=0;i<temp.length;i++){
						let key=['APP','CURRENT'][tempIndex]+"_"+temp[i].name
						if(temp[i].select){
							this.selectedList[key]=
								{
									select:true,
									key:item.key,
									area:['APP','CURRENT'][tempIndex],
									name:temp[i].name
								}
							
						}else{
							this.selectedList[key]={
								select:false
							}
						}
					}
					this.selectTimeout=null
				},100)
			},
			saveSelect:function(){
				let list=[]
				for(let key in this.selectedList){
					if(this.selectedList[key].select){
						list.push({
							area:this.selectedList[key].area,
							name:this.selectedList[key].name,
							key:this.selectedList[key].key
						})
					}
				}
				this.propsOptions.return(list)
				this.quit()
			},
			quit:function(){
				this.$emit("quit")
			}
		}
	}
</script>

<style scoped>
	.main{
		position: absolute;
		width: 500px;
		height: 600px;
		top: 50vh;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 10px;
		background-color:#212121;
		z-index: 9999;
	}
	.cssItem{
		width: 96%;
		margin-left: 2%;
		height: auto;
		height: 25px;
		position: relative;
		background-color: transparent;
		margin-top: 8px;
		display: block;
	}
	.cssItem_title{
		max-width: 500px;
		background-color: transparent;
		height: 25px;
		display: flex;
		
	}
	.cssItem_name{
		width: 200px;
		font-weight: normal;
		user-select: none;
		background-color: var(--mainColorGrayBg2);
		outline: none;
		border: none;
		border-radius:0 10px 10px 0;
		line-height: 25px;
		color: var(--mainTextColor1);
		
	}
	.cssItem_ope{
		width: 30px;
		margin-left: 10px;
		height: 25px;
		background-color: transparent;
		display: flex;
		border-radius: 10px;
	}
	.cssItem_opeButton{
		width: 25px;height: 25px;
		transition: .2s;
		background-color: transparent;
		border-radius: 5px;
		cursor: pointer;
		position: relative;
	}
	.cssItem_value{
		width: 100%;
		background-color: var(--mainColorGrayBg2);
		border-radius: 10px;
		min-height: 100px;
		max-height: 160px;
		margin-top: 5px;
		overflow: scroll;
		padding-bottom: 8px;
	}
	.cssItem_opeButton:hover{
		background-color: var(--mainColorGrayBg2);
	}
	.cssItem_opeButton:hover::after{
				content: attr(buttonName);
				position: absolute;
				width: 50px;
				height: 20px;
				line-height: 20px;
				transition: .2s;
				bottom: 2px;
				text-align: center;
				font-weight: normal;
				left:50%;
				transform: translateX(-50%);
				background-color: var(--mainColorBlack);
				color: white;
				animation: showhover .2s;
				border-radius: 10px;
				font-size: 12px;
				animation-fill-mode: forwards;
			}
			@keyframes showhover {
				from{
					opacity: 0;
					bottom: 0px;
				}to{
					opacity: 1;
					bottom:-25px;
				}
			}
	.cssTypeIcon{
		overflow: hidden;
		width: 80px;
		height: 25px;
		border-radius: 10px 0 0 10px;
		user-select: none;
		color: var(--mainTextColor1);
	}
	.newCssInputArea{
		width: 100%;
		height: 65px;
		display: flex;
	}
	.newCssInputTitle{
	user-select: none;;width: 25%;text-align: center;margin: 0;padding: 0;line-height: 65px;font-weight: normal;color:var(--mainTextColor1)
	}
	.newCssInputValue{
		width: 65%;height: 35px;margin-top: 15px;border-radius: 10px;background-color: #323232;color: var(--mainTextColor1);text-align: center;line-height: 35px;outline: none;border: none;
	}
	.newCssInputValue:focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
	.nextArrow{
		transform: scaleX(100%);
		position: absolute;right: 8px;bottom: 3px;
		transition: .5s;
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
	.showTargetList {
			transition: .2s;
			padding-bottom: 8px;
			z-index: 99999;
			position: absolute;top: 10px;left: 20%;width:150px;height: auto;min-height: 70px;background-color: #212121;border-radius: 10px;transition: .2s;max-height: 180px;
		} 
	.editTargetItem{
			padding-left: 8px;
			box-sizing: border-box;
			width: 90%;
			margin-left: 5%;
			margin-top: 8px;
			transition: .2s;
			background-color: transparent;
			cursor: pointer;
			position: relative;
			user-select: none;
			color: var(--mainTextColor1);
			font-weight: normal;
			height: 25px;
			line-height: 25px;
			border-radius: 10px;
			
			z-index: 99;
		}
		.editTargetItem:hover{
			background-color: var(--mainColorBlue2);
		}
	.cssSheetTopButton{
		position: relative;
		width:100%;margin-left: 2%;background-color: var(--mainDarkBg1);color: white;font-weight: normal;border-radius: 10px;cursor: pointer;
	}
	.searchInput{
		width:130px;
		height: 25px;
		line-height: 25px;
		background-color: var(--mainColorGrayBg2);
		text-align: center;
		color: white;
		transition: .2s;
		border-radius: 10px;
		border: none;
		outline: none;
	}
	.searchInput:focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
</style>