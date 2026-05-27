<template>
	<div>
	<teleport to="body">
		<div id="backPositionArea" @mouseup="isDown=false" style="border-radius: 10px;z-index: 99;position: absolute;top: 25vh;left: 50vw;transform: translate(-50%);width: 40vw;background-color: rgba(255,255,255,1);box-shadow: -5px 5px 15px var(--mainColorGray2);min-width: 700px;height:50vh;min-height:280px;">
			<h2 style="margin: 0;text-align: center;width: 100%;height: 30px;line-height: 30px;color:var(--mainColorBlack);font-weight: normal;">图片位置</h2>
			<button @click="cancle" style="width: 50px;height: 25px;color: white;position: absolute;right:5px;top:5px;border-radius: 10px;background-color: var(--mainColorBlue2);">
				关闭
			</button>
				<selectList :list="backgroundSizeListIndex" :width="'100px'" ref="backSizeSel" :selected="backgroundSizeListIndex[sizeType]" @change="changeSize" style="z-index: 149;;margin: 0;background-color: rgba(0,0,0,0.65);color: white;font-weight: normal;position: absolute;left: 5px;top:5px;">
				</selectList>
				<div style="position: absolute;top:5px;width: 40%;background-color: transparent;height: 25px;color: var(--mainColorGray2);" v-if="sizeType==2">
				<input placeholder="长度" class="diyInput" style="margin-left: 110px;" v-model="backgroundSizeList['自定义'].width"/>
				x
				<input placeholder="宽度" class="diyInput" v-model="backgroundSizeList['自定义'].height"/>
				</div>
			<div  id="backPositionOut" @mousemove="null" style="border: 1px solid var(--mainColorBlue2);background-repeat: no-repeat;margin-left: 50%;transform: translateX(-50%);transform-origin: center;display: flex;justify-content: center;margin-top: 40px;" 
			:style="{height:`${height+'px'}`,
			width:`${width+'px'}`,
			backgroundPosition:`${positionX+positionY}`,
			backgroundSize:`${scale}`}">
				<div id="positionLeftTop" style="left: -35px;top: -35px;" 
					@click="setDirect('Top');setDirect('Left');moveLeft=0;moverTop=0;positionX='left ';positionY='top'" 
					class="conerl">
				</div>
				<div id="positionLeftBottom" style="left: -35px;bottom: -35px;" 
					@click="setDirect('Bottom');setDirect('Left');moveLeft=0;moveTop=0;positionX='left ';positionY='bottom'" 
					class="conerl">
				</div>
				<div id="positionRightTop" style="right: -35px;top: -35px;" 
					@click="setDirect('Top');setDirect('Right');moveLeft=0;moverTop=0;positionX='right ';positionY='top'" 
					class="conerl">
				</div>
				<div id="positionRightBottom" style="right: -35px;bottom: -35px;" 
					@click="setDirect('Bottom');setDirect('Right');moveTop=0;moveLeft=0;positionX='right ';positionY='bottom'" 
					class="conerl">
				</div>
				<div style="left:50%;top: -30px;transform: translateX(-50%);border-radius: 10px;min-height: 15px;width: 50%;"
					@click="positionX='center ';setCenter('poXInput')" 
					class="conerl_center"
					:style="{height:`${1.3*scaleValue+'rem'}`}">
					<div style="left:50%;top:29%;transform: translate(-50%);width: 50%;background-color: var(--mainColorBlue2);min-height: 3px;"
						class="conerl_center"
						:style="{height:`${0.5*scaleValue+'rem'}`}">
					</div>
				</div>
				<div style="top:50%;left: -33px;transform: translateY(-50%);border-radius: 10px;width:15px"
					@click="positionY='center ';setCenter('poYInput')" 
					class="conerl_center"
					:style="{height:`${height/2}`+'px'}">
					<div style="top:23%;left: 50%;transform: translate(-50%);background-color: var(--mainColorBlue2);width:5px"
						class="conerl_center"
						:style="{height:`${height/4+'px'}`}">
					</div>
				</div>
				<!--顶部移动-->
				<div id="positionTopBar" @mouseup="mUP" @mousedown="setDirect('Top')"  style="width: 20px;position: absolute;top: 0;z-index: 99;transition: .1s;" :style="{height:`${TB=='Top'?moveTop+11:0}`+'px',left:`${LR=='Left'?-10:width-10}`+'px'}">
					<button   class="positionBar" style="position: absolute;height: 1.6rem;width: 1.1rem;top: -1.8rem;left: 0;clip-path: polygon(0 0 ,100% 0,100% 68%,50% 100%,0 68%,0 0);" :style="{opacity:`${TB=='Top'?'1':'0.3'}`}">
					</button>
					<!--div style="position: absolute;height: 100%;width: 2px;left:9px;top: 0;background-color: aliceblue;">
					</div-->
				</div>
				<!--左边移动-->
				<div id="positionLeftBar" @mouseup="mUP" @mousedown="setDirect('Left')" style="height: 20px;position: absolute;left: 0;z-index: 99;transition: .1s;" :style="{width:`${LR=='Left'?moveLeft+10:0}`+'px',top:`${TB=='Top'?-10:height-10}`+'px'}">
					<button  class="positionBar" style="position: absolute;width: 1.6rem;height: 1.1rem;left: -1.8rem;top: 0;clip-path: polygon(0 0 ,68% 0,100% 50%,68% 100%,0 100%,0 0);" :style="{opacity:`${LR=='Left'?'1':'0.3'}`}">
					</button>
					<!--div style="position: absolute;width: 100%;height: 2px;top:9px;left: 0;background-color: aliceblue;">
					</div-->
				</div>
				<!--底边移动-->
				<div id="positionBottomBar" @mouseup="isDown=false" @mousedown="setDirect('Bottom')" style="width: 20px;position: absolute;bottom: 0;height: 100px;z-index: 99;right: -10px;transition: .1s;" :style="{height:`${TB=='Bottom'?(height-moveTop)-10:0}`+'px',left:`${LR=='Left'?-10:width-10}`+'px'}">
					<button  class="positionBar" style="position: absolute;height: 1.6rem;width: 1.1rem;bottom: -1.8rem;left: 0;clip-path: polygon(0 32%,50% 0,100% 32%,100% 100%,0 100%,0 0);" :style="{opacity:`${TB=='Bottom'?'1':'0.3'}`}">
					</button>
					<!--div style="position: absolute;height: 100%;width: 2px;left:9px;bottom: 0;background-color: aliceblue;">
					</div-->
				</div>
				<!--右边移动-->
				<div id="positionRightBar" @mouseup="isDown=false" @mousedown="setDirect('Right')" style="height: 20px;position: absolute;right: 0;z-index: 99;transition: .1s;" :style="{width:`${LR=='Right'?(width-moveLeft)-10:0}`+'px',top:`${TB=='Top'?-10:height-10}`+'px'}">
					<button  class="positionBar" style="position: absolute;width: 1.6rem;height: 1.1rem;right: -1.8rem;top: 0;clip-path: polygon(0 50%,32% 0,100% 0,100% 100%,32% 100%,0 50%);" :style="{opacity:`${LR=='Right'?'1':'0.3'}`}">
					</button>
					<!--div style="position: absolute;width: 100%;height: 2px;top:9px;right: 0;background-color: aliceblue;">
					</div-->
				</div>
				<div @mouseup="mUP" @mousedown="setStartPoint($event)"  @mousemove="moveBar($event)" style="position: absolute;width: 100%;height:100%;background-color: rgba(0,0,0,0);top: 0;left: 0;">
					
				</div>
			</div>
			<div style="width: 80%;height: 45px;background-color: white;border-radius: 15px;border:1px solid var(--mainColorBlue2);position: absolute;left: 50%;transform: translateX(-50%);bottom:10px">
				<div style="width:45%;height:35px;position: relative;margin-left: 4%;float: left;">
					<selectList :selected="'left[靠左]'" @change="selectChange_poX" ref="slPLeft" :list="['left[靠左]','right[靠右]']" style="margin: 0;margin-left:0px;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position:absolute;left:0;width:100px;top:10px;" :width="'100px'"></selectList>
					<input class="poValue" style="left: 105px;top: 10px;" @input="setMoveLeft" id="poXInput" :placeholder="moveLeft">
					<unit style="position:absolute;left: 10.5rem;top:13px;" @unitChange="(pre,now)=>{unitChange([pre,now],0)}" @littleSet="littleSetX" :defaultUnit="thisUnit_x"></unit>
				</div>
				<div style="width:45%;height:35px;position: relative;float: right;">
					<selectList :selected="'top[靠顶]'" @change="selectChange_poY" ref="slPTop" :list="['top[靠顶]','bottom[靠底]']" style="margin: 0;margin-right:0px;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position:absolute;right:0px;width:100px;top:10px;" :width="'100px'"></selectList>
					<input class="poValue" style="right: 130px;top: 10px;" @input="setMoveTop" id="poYInput" :placeholder="moveTop">
					<unit style="position:absolute;right: 11.5rem;top:13px;" @unitChange="(pre,now)=>{unitChange([pre,now],1)}" @littleSet="littleSetY" :defaultUnit="thisUnit_y"></unit>
				</div>
				<button @click="returnPosition" style="width: 15%;left: 50%;transform: translateX(-50%);top: 7px;height:31px;background-color: var(--mainColorBlue2);color:white;position: absolute;border-radius: 15px;">
					确认
				</button>
			</div>
		</div>
	</teleport>
	</div>
</template>

<script>
	import unit from "./unit.vue"
	import selectList from "./select.vue"
	import styleEngine from "../../engines/style.js"
	export default{
		name:"backgroundPosition",
		data(){
			return {
				height:"25vh",
				width:"34vw",
				TB:"Top",//控制top与bottom只能选择一个
				LR:"Left",//控制left和right只能选择一个
				nowArea:0,//标记只控制横向移动还是竖向移动
				moveTarget:"positionTopBar",//移动目标
				startX:0,//标记按钮按下时的起始X值
				startY:0,//标记按钮按下时的起始Y值
				left:144,
				scale:1,
				top:0,
				xFlag:1,
				yFlag:1,
				moveLeft:0,//移动距离
				moveTop:-10,//移动距离
				dertaX:0,
				dertaY:0,
				isDown:false,
				poX:0,
				poY:0,
				positionX:"left 0px ",
				positionY:"top 0px",
				thisUnit_x:"px",
				thisUnit_y:"px",
				scaleValue:1,
				inputTimeout:null,
				sizeType:0,
				backgroundSizeList:{
					"适应":"contain",
					"充满":"cover",
					"自定义":{"width":"100%","height":"100%"}
				},
				backgroundSizeListIndex:['适应','充满','自定义'],
			}
		},
		emits:['close','getBackPosition','changeSize'],
		mounted(){
			this.$nextTick(()=>{
				this.$emit("hideUpload")
			})
		},
		components:{
			unit,
			selectList
		},
		
		watch:{
			backgroundSizeList:{
				handler:function(val){
					if(this.setSizeTimeout!=null){
						clearTimeout(this.setSizeTimeout)
						this.setSizeTimeout=null
					}
					this.setSizeTimeout=setTimeout(()=>{
						let data=val['自定义']
						let width=data['width'],height=data['height']
						if(width.indexOf("px")>-1){
							width=width.split("px")[0]+"px"//防止出现px重复的错误
						}else if(width.indexOf("%")>-1){
							width=width.split("%")[0]+"%"//防止出现%重复的错误
						}else{
							if(width*1+''=='NaN'){
								alert("非法参数")
								width="100px"
							}else{
								width=width+"px"
							}
						}
						if(height.indexOf("px")>-1){
							height=height.split("px")[0]+"px"//防止出现px重复的错误
						}else if(height.indexOf("%")>-1){
							height=height.split("%")[0]+"%"//防止出现%重复的错误
						}else{
							if(height*1+''=='NaN'){
								alert("非法参数")
								height="100px"
							}else{
								height=height+"px"
							}
						}
						this.backgroundSizeList['自定义']['width']=width
						this.backgroundSizeList['自定义']['height']=height
						let size=this.sizeType!=2 ? this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]:
								 this.backgroundSizeList['自定义'].width+' '+this.backgroundSizeList['自定义'].height
						document.getElementById("backPositionOut").style.backgroundSize=size
					},200)
				},
				immediate:true,
				deep:true
			},
		},
		methods:{
			//用于在图片上传组件中修改背景大小时同步在此处修改
			setSize:function(size){
				console.log("setsize3")
				document.getElementById("backPositionOut").style.backgroundSize=size
			},
			setWHF:function(w,h,image,preX='left 0px',preY='top 0px',backgroundColor='#FFF',radius='0',imsize='contain',sizeType=0){
				let title=image.split("(")[0]
				let backImageKinds=['url','radial-gradient','linear-gradient','conic-gradient','repeating-radial-gradient','repeating-linear-gradient','repeating-conic-gradient']
				
				if(backImageKinds.indexOf(title)==-1){
					image="url("+image+")"
				}
				
				let max=w>h?w:h
				let flag=w>h?0:1
				let scale=1
				
				let box=document.getElementById("backPositionArea")
				let offW=box.offsetWidth*0.8,offH=box.offsetHeight*0.6
				
				if(flag==1){//h>w
					scale=(offH/h).toFixed(0)*1
				}else{
					scale=(offW/w).toFixed(0)*1
				}
				let height=h*scale,width=w*scale
				if(height>offH){
						scale=scale*(offH/height).toFixed(2)
						height=h*scale,width=w*scale
				}
				if(width>offW){
						scale=(scale*(offW/width)).toFixed(2)
						console.log("scale",scale)
						height=h*scale,width=w*scale
				}
				console.log("预览界面",width,height,offW)
				this.height=height
				this.scale=imsize
				this.scaleValue=scale
				this.width=width
				this.$nextTick(()=>{
					this.left=document.getElementById("backPositionOut").offsetLeft-document.getElementById("backPositionOut").offsetWidth/2
					this.top=document.getElementById("backPositionOut").offsetTop
					let valueX=preX.split(" ")
					let length=valueX.length
					if(valueX[length-1].length==0||valueX[length-1]==''){
						length-=1
					}
					if(length==2){
						let unit=styleEngine.getUnit(valueX[1])
						this.thisUnit_x=unit
						let number=valueX[1].split(unit)[0]*1
						this.moveLeft=number*this.scaleValue
						this.positionX=valueX[0]+' '+this.moveLeft+unit+' '
						document.getElementById("poXInput").value=(number/this.scaleValue).toFixed(0)
					}else if(length==1){
						this.moveLeft=0
						this.positionX=preX+' '
						if(valueX[0]=='center'){
							document.getElementById("poXInput").value="居中"
						}
					}
					let valueY=preY.split(" ")
					length=valueY.length
					if(valueY[length-1].length==0||valueY[length-1]==''){
						length-=1
					}
					if(length==2){
						let unit=styleEngine.getUnit(valueY[1])
						this.thisUnit_y=unit
						let number=valueY[1].split(unit)[0]*1
						this.moveTop=number*this.scaleValue
						this.positionY=valueY[0]+' '+this.moveTop+unit+' '
						document.getElementById("poYInput").value=(number/this.scaleValue).toFixed(0)
					}else if(length==1){
						this.moveTop=0
						this.positionY=preY
						if(valueY[0]=='center'){
							document.getElementById("poYInput").value="居中"
						}
					}
					this.$nextTick(()=>{
						this.sizeType=sizeType
						this.$refs['backSizeSel'].change(this.sizeType)
						document.getElementById("backPositionOut").style.backgroundColor=backgroundColor
						document.getElementById("backPositionOut").style.backgroundSize=imsize
						document.getElementById("backPositionOut").style.backgroundImage=image
						document.getElementById("backPositionOut").style.borderRadius=radius
					})


				})
			},
			setDirect:function(direct){
				if(direct=="Top" || direct=="Bottom"){
					if(direct!=this.TB){
						//this.moveLeft=direct=="Bottom"?this.width-10:-10
						this.yFlag=direct=="Bottom"?-1:1
						this.$refs["slPTop"].change(direct=="Bottom"?1:0)
					}
					this.TB=direct
					this.nowArea=0
					this.moveTop=0
					document.getElementById("poYInput").value=(this.moveTop/this.scaleValue).toFixed(0)
				}else if(direct=="Left" || direct=="Right"){
					if(direct!=this.LR){
						//this.moveTop=direct=="Right"?this.height-10:-10
						this.xFlag=direct=="Right"?-1:1
						this.$refs["slPLeft"].change(direct=="Right"?1:0)
					}
					this.LR=direct
					this.nowArea=1
					this.moveLeft=0
					document.getElementById('poXInput').value=(this.moveLeft/this.scaleValue).toFixed(0)
				}
				this.moveTarget="position"+direct+"Bar"
			},
			setStartPoint:function(e){
				this.isDown=true
				this.startX=e.offsetX
				this.startY=e.offsetY
			},
			mUP:function(e){
				this.moveLeft+=this.dertaX
				this.dertaX=0
				document.getElementById("poXInput").value=(((this.moveLeft+this.dertaX)*this.xFlag)/this.scaleValue).toFixed(0)
				this.moveTop+=this.dertaY
				this.dertaY=0
				document.getElementById("poYInput").value=(((this.moveTop+this.dertaY)*this.yFlag)/this.scaleValue).toFixed(0)
				this.isDown=false
			},
			moveBar:function(e){
				e.stopPropagation()
				if(this.isDown){
								this.poX=e.offsetX
								this.dertaX=this.poX-this.startX
								this.poY=e.offsetY
								this.dertaY=this.poY-this.startY
								this.positionX=this.LR.toLowerCase()+' '+(this.moveLeft+this.dertaX)*this.xFlag+this.thisUnit_x+' '
								this.positionY=this.TB.toLowerCase()+' '+this.yFlag*(this.moveTop+this.dertaY)+this.thisUnit_y
				}
			},
			move:function(e){
				console.log(e)
			},
			selectChange_poX:function(data){
				let index=data['index']
				if(index==0){//返回left，则当原先是right时更改
					if(this.positionX.startsWith("right")){
						this.xFlag=1
						this.LR='Left'
						console.log("reset",this.positionX)
					}
				}else{
					if(this.positionX.startsWith("left")){
						this.xFlag=-1
						this.LR='Right'
					}
				}
				this.moveLeft=0
				document.getElementById('poXInput').value=(this.moveLeft/this.scaleValue).toFixed(0)
				this.positionX=this.LR.toLowerCase()+' '+(this.moveLeft+this.dertaX)*this.xFlag+this.thisUnit_x+' '
			},
			selectChange_poY:function(data){
				let index=data['index']
				if(index==0){//返回left，则当原先是right时更改
					if(this.positionY.startsWith("bottom")){
						this.yFlag=1
						this.TB='Top'
						console.log("reset",this.positionX)
					}
				}else{
					if(this.positionY.startsWith("top")){
						this.yFlag=-1
						this.TB='Bottom'
					}
				}
				this.moveTop=0
				document.getElementById("poYInput").value=(this.moveTop/this.scaleValue).toFixed(0)
				this.positionY=this.TB.toLowerCase()+' '+(this.moveTop+this.dertaY)*this.yFlag+this.thisUnit_y+' '
			},
			unitChange:function(msg,paParam){//原单位、现单位
				let pre=msg[0]
				let now=msg[1]
				console.log(msg,paParam)
				if(paParam==0){
					this.thisUnit_x=now
					this.moveLeft=0
					this.positionX=this.LR.toLowerCase()+' '+(this.moveLeft+this.dertaX)*this.xFlag+this.thisUnit_x+' '
				}else{
					this.thisUnit_y=now
				}
			},
			littleSetX:function(option){
				if(this.inputTimeout!=null){
					clearTimeout(this.inputTimeout)
				}
			    if(option=="add"){
			        this.moveLeft++
			    }else{
			        this.moveLeft--
			    }
				
				this.positionX=this.LR.toLowerCase()+' '+(this.moveLeft+this.dertaX)*this.xFlag+this.thisUnit_x+' '
				this.inputTimeout=setTimeout(()=>{
					document.getElementById('poXInput').value=(this.moveLeft/this.scaleValue).toFixed(0)
					this.inputTimeout=null
				},100)
			},
			littleSetY:function(option){
				if(this.inputTimeout!=null){
					clearTimeout(this.inputTimeout)
				}
			    if(option=="add"){
			        this.moveTop++
			    }else{
			        this.moveTop--
			    }
				this.positionY=this.TB.toLowerCase()+' '+(this.moveTop+this.dertaY)*this.yFlag+this.thisUnit_y+' '
				this.inputTimeout=setTimeout(()=>{
					document.getElementById("poYInput").value=(this.moveTop/this.scaleValue).toFixed(0)
					this.inputTimeout=null
				},100)
			},
			setMoveLeft:function(e){
				console.log(e)
				let val=e.target.value*1
				this.moveLeft=val
				this.positionX=this.LR.toLowerCase()+' '+(val+this.dertaX)+this.thisUnit_x+' '
			},
			setMoveTop:function(e){
				let val=e.target.value*1
				this.moveTop=val
				this.positionY=this.TB.toLowerCase()+' '+(val+this.dertaY)+this.thisUnit_y+' '
			},
			setCenter:function(dom){
				document.getElementById(dom).value='居中'
			},
			returnPosition:function(){
				let y="";
				if(this.positionY=='center '){
					y='center '
				}else{
					y=this.TB.toLowerCase()+' '+((this.moveTop/this.scaleValue)*this.yFlag).toFixed(0)+this.thisUnit_y+' '
				}
				let x="";
				if(this.positionX=='center '){
					x='center '
				}else{
					x=this.LR.toLowerCase()+' '+((this.moveLeft/this.scaleValue)*this.xFlag).toFixed(0)+this.thisUnit_x+' '
				}
				let zdy=true
				if(this.sizeType==2){
						zdy=this.backgroundSizeList['自定义']
				}
				this.$emit("changeSize",{'index':this.sizeType},zdy)
				this.$emit("getBackPosition",x+y)
				this.cancle()
			},
			cancle:function(){
				this.$emit("showUpload")
				this.$emit("close","")
				
			},
			//修改图片尺寸
			changeSize:function(data){
				this.sizeType=data['index']
				
				let size=this.sizeType!=2 ? this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]:
						 this.backgroundSizeList['自定义'].width+' '+this.backgroundSizeList['自定义'].height
				this.scale=size
			},
		}
	}
</script>

<style>
	.poValue{
		border: 1px solid var(--mainColorBlue2);
		border-radius: 3px;
		position: absolute;
		outline: none;
		width:3rem;
		height:1.5rem;
	}
	.positionBar{
		background-color: var(--mainColorBlue2);
		border-radius: 3px;
	}
	.conerl{
		position: absolute;
		width: 1.2rem;
		height: 1.2rem;
		padding: 0;
		margin: 0;
		background-color:white;
		border: 1px solid var(--mainColorBlue2);
		box-sizing: content-box;
		border-radius: 5px;
		cursor: pointer;
		transition: .2s;
	}
	.conerl:hover{
		background-color: var(--mainColorBlue2);
	}
	.conerl_center{
		position: absolute;
		width: 20px;
		height: 20px;
		padding: 0;
		margin: 0;
		background-color:white;
		border: 1px solid var(--mainColorBlue2);
		box-sizing: content-box;
		border-radius: 5px;
		cursor: pointer;
		transition: .2s;
		text-align: center;
		font-weight: normal;
		color: var(--mainColorBlue2);
	}
	.conerl_center:hover{
		background-color: var(--mainColorBlue2);
		color: white;
	}
	.quickposition{
		width: 100%;
		display: flex;
		height: 30px;
		align-items: center;
		justify-content: center;
		align-content: center;
		
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