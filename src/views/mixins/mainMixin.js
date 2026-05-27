//用于分模块编写在main中用于接收各个组件事件的方法
const rotateReg=new RegExp(/rotate\((-{0,1}\d+)deg\)/g)
const transformReg=new RegExp(`transform(:{1})([^;])+;{1}`)
const radiusReg=new RegExp(`border-radius(:{1})([^;])+;{1}`)
import { render } from 'vue';
function nameToLower(name){
	return name.replace(/([A-Z])/g,function($,$1){
			return "-"+$1.toLowerCase()
	})
}
export default{
	data(){
		return{
			alignLine:{
				yside:"top",//拉伸节点所需参数，标记是哪条边拉动
				xside:"left",
				enter:false,
				move:false,
				alignDirect:"left",
				direct:"x",
				left:0,
				top:0,
				width:0,
				height:0,
				svgpath:"",
				mouseAction: {
				  //鼠标控制
				  isDown: false,
				  isMove: false, //选框
				  area: {
				    left: 0,
				    top: 0,
				    width: 0,
				    height: 0,
				  },
				  startX: 0,
				  startY: 0,
				  moveX: 0,
				  moveY: 0,
				},
			},
			alignPositon:{
				left:0,
				top:0,
				right:0,
				bottom:0
			},
			alignStartPositon:{
				left:0,
				top:0
			},
			nodeTopBar:{//顶部框位置
				show:false,
				left:0,
				top:0
			},
			startRadiusRotate:{
				multiple:false,
				preAngle:0,//单个转动时记录原先
				preRadius:0,
				rotate:0,
				radius:0,
				radiusUnit:"px",
				down:false,
				type:"rotate",
				width:0,//宽度
				left:0,
				percent:0,
				position:{
					left:0,
					top:0
				}
			},
			//暂时存储style节点里面的内容
			styleNodeText:{},
			showSaveComponent:false
		}
	},
	methods:{
		//对齐线拖动结束
		endAlignMove:function(e){
			//取消因为拖动引起的文本选择
			document.getElementById("temp_drawLine").focus()
			this.frameOutMoveStatus=false//定义在mian.vue中
			this.alignLine.move=false
			this.alignLine.svgpath=""
			this.alignLine.mouseAction.isDown=false
			
			if(this.alignLine.enter){
				//判断是否有进入对齐接收点
				let direct=this.alignLine.alignDirect
				let preDirect={
					"x":"left",
					"y":"top"
				}[this.alignLine.direct]//抛出点的位置，alignLine.direct在按下拖出线时记录，用于区分是绘制横向的两个位置点还是纵向的两个位置点
				
				let targetPotion=this.alignBound[direct]//目标位置
				let delta=(targetPotion-this.alignStartPositon[preDirect])/System.scalePercent
				if(preDirect=='left'){
					//横向移动
					if(System.keybord.control){
						//按下control为拉伸对齐
						//在拉伸中会自动计算页面比例，故此处需保持实际拉伸大小
						System.setScaleData('x',delta*System.scalePercent)
					}else{
						//否则仅移动
						System.moveNodes({},System.operatingNodes,delta.toFixed(0)*1,0,true)
					}
				}else{
					//纵向移动
					if(System.keybord.control){
						//按下control为拉伸对齐
						System.setScaleData('y',delta*System.scalePercent)
					}else{
						System.moveNodes({},System.operatingNodes,0,delta.toFixed(0)*1,true)
					}
				}
			}
			System.keyUpEvent['control']=null
			System.closeTip()
		},
		alignPath:function(e,startX=null,startY=null){
				let x1=startX
				let y1=startY
				let x2=0
				let flagx=-1,flagy=-1
				if(e.clientX>this.alignLine.mouseAction.startX){
					flagx=1
					x2=e.clientX-this.alignLine.mouseAction.startX
				}
				let y2=0//在向上拉时，y始终在最上面，故为0
				if(e.clientY>this.alignLine.mouseAction.startY){
					flagy=1
					y2=e.clientY-this.alignLine.mouseAction.startY
				}
				var path=`M${x1} ${y1} `
				let xdisance=(x2-x1)/4
				
				let cx1=flagx*(x2-x1)/2
				if(Math.abs(y2-y1)>30){
					if( cx1<50 && flagx==1)
						cx1=50
					else if(cx1>-50 && flagx==-1){
						cx1=this.alignLine.mouseAction.startX-e.clientX-50
					}
				}
				
				let cy1=-Math.abs(x2-x1)+(y2-y1)/2
				if(cy1<-100) 
					cy1=-100
				let c=`Q ${cx1} ${cy1} `
				path+=c+x2 +" "+y2+" "
				//绘制箭头
				//path+=`M${x2} ${y2} T${x2-8*flag} ${y2-8} M${x2} ${y2} T${x2-8*flag} ${y2+8}`
				this.alignLine.svgpath=path
		},
		startAlignLine:function(e,direct,side){
			//设置control按下事件
			System.keyDownEvent['control']=()=>{
				System.showTip("拉伸对齐")
			}
			if(!System.keybord.control){
				System.showTip("按下Ctrl键转为拉伸对齐")
			}
			System.keyUpEvent['control']=()=>{
				System.showTip("按下Ctrl键转为拉伸对齐")
			}
			let bound=e.target.getBoundingClientRect()
			let left=(direct=='x' && side=='left')?bound.left+8:bound.left
			let top=(direct == 'y' && side=='top')?bound.top+8:bound.top
			this.alignStartPositon={
				left:left,
				top:top
			}
			this.alignLine.direct=direct
			this.alignLine.move=true
			this.alignLine.mouseAction.isDown=true
			this.alignLine.mouseAction.startX=e.clientX
			this.alignLine.mouseAction.startY=e.clientY
		},
		drawAlignLine:function(e){
			//主屏鼠标移动事件
			let left 		=	e.clientX //e.clientX-55//- this.screen.left;
			let top 		= 	e.clientY//e.clientY-60// - this.screen.top ;
			let width 	= 	left -  this.alignLine.mouseAction.startX//this.screen.left;
			let height 	= 	top - this.alignLine.mouseAction.startY//this.screen.top;
			this.alignLine.mouseAction.moveX = e.clientX;
			this.alignLine.mouseAction.moveY = e.clientY;
			this.alignLine.left=this.alignLine.mouseAction.startX
			this.alignLine.top=this.alignLine.mouseAction.startY
			let startX=this.alignLine.left-this.alignLine.mouseAction.startX
			let startY=this.alignLine.top-this.alignLine.mouseAction.startY
			//domSelect.style.left 		= this.alignLine.mouseAction.startX + "px";
			//domSelect.style.top 		=  this.alignLine.mouseAction.startY + "px";
			if ((Math.abs(width) > 5 || Math.abs(height) > 5) && this.alignLine.mouseAction.isDown) {
				//拉出框选外框
				this.alignLine.mouseAction.isMove = true;
				if (width < 0) {
					let resetLeft= this.alignLine.mouseAction.startX + width;
					this.alignLine.left= resetLeft+8;
					startX=this.alignLine.mouseAction.startX-this.alignLine.left
					this.alignLine.mouseAction.area.left= resetLeft;
					width = width * -1;
					width -= 8
				}
				if (height < 0) {
					let resetTop = this.alignLine.mouseAction.startY + height;
					this.alignLine.mouseAction.area.top = resetTop ;
					this.alignLine.top = resetTop+8;
					startY=this.alignLine.mouseAction.startY-this.alignLine.top
					height = height * -1;
					height -=8
				}else{
					height+= 1 / this.screenPercent
				}
				this.alignLine.mouseAction.area.width 	= width;
				this.alignLine.mouseAction.area.height 	= height;
				this.alignLine.width = width;
				this.alignLine.height = height;
				this.alignPath(e,startX,startY)
			}
		},
		leave:function(direct){
			this.alignLine.enter=false
			this.alignBound.show=false
		},
		//接收对齐传入
		enter:function(direct){
			//提取对应位置
			this.alignLine.enter=true
			this.alignLine.alignDirect=direct//边的记号,direct是标记是x还是y
			this.alignLine[this.alignLine.direct+"side"]=direct
		},
		//显示圆角与旋转选择框
		showRRBar:function(left,top){
			this.nodeTopBar=
			{
				show:true,
				left:left,
				top:top
			}
		},
		//显示圆角与旋转拖拽框
		startSetRR:function(e,type){
			if(type=="radius"){
				this.startRadiusRotate.radiusUnit="px"
				//设置control按下事件
				System.keyDownEvent['control']=()=>{
					System.showTip("百分比(%)计算模式")
				}
				if(!System.keybord.control){
					System.showTip("按下Ctrl键转为百分比计算")
				}
				System.keyUpEvent['control']=()=>{
					System.showTip("按下Ctrl键转为百分比计算")
				}
			}
			//type:rotate Radius
			this.startRadiusRotate.down=true
			this.startRadiusRotate.type=type
			let nodeKeys=Object.keys(System.operatingNodes)
			if(nodeKeys.length>1){
				//多个移动
				this.startRadiusRotate.multiple=true
				this.startRadiusRotate.preAngle=0
			}else{
				this.startRadiusRotate.multiple=false
			}
			//隐藏选择边框
			System.hideSelectBound()
			this.styleNodeText={}
			for(let key in System.operatingNodes){
				document.querySelectorAll("."+key.replace('$NODE:',"")).forEach((node)=>{
					node.classList.add('tempRotateRadius')//类的定义在下面
				})
				//document.getElementById(key).
				this.styleNodeText[key]=document.getElementById(key.replace('$NODE:',"")+"_style").innerText
			}
			
			//创建旋转样式类
			let tempRotateRadiusStyle=document.getElementById("tempRotateRadiusStyle")
			if(!tempRotateRadiusStyle){
				tempRotateRadiusStyle=document.createElement("style")
			}
			
			let getRadius=new RegExp(/border-radius(:{1})(-{0,1}\d+)(px|%)(;{1})/g)
			let preRadius=0
			getRadius.test(this.styleNodeText[nodeKeys[0]])?preRadius=RegExp.$2*1:preRadius=0
			
			let getAngle=new RegExp(/rotate\((-{0,1}\d+)deg\)/g)
			let preAngle=0
			getAngle.test(this.styleNodeText[nodeKeys[0]])?preAngle=RegExp.$1*1:preAngle=0
			
			if(!this.startRadiusRotate.multiple){
				//单独调整一个
				this.startRadiusRotate.preRadius=preRadius
				this.startRadiusRotate.radius=preRadius
				this.startRadiusRotate.rotate=preAngle
				this.startRadiusRotate.preAngle=preAngle
				
				tempRotateRadiusStyle.innerText=`
					.tempRotateRadius{
						border-radius:${preRadius+this.startRadiusRotate.radiusUnit};
						rotate:${preAngle}deg;
					}
				`
			}else{
				
				tempRotateRadiusStyle.innerText=`
					.tempRotateRadius{
						border-radius:0px;
						rotate:0deg
					}
				`
			}
			
			tempRotateRadiusStyle.id="tempRotateRadiusStyle"
			document.getElementsByTagName('head')[0].appendChild(tempRotateRadiusStyle)
			
			this.beforeRotate()
			this.$nextTick(()=>{
				//读取拖动条长度
				let box=this.$refs['nodeTopBar'].getBoundingClientRect()
				this.startRadiusRotate.width=box.width.toFixed(0)*1
				//读取拖动条左边位置
				this.startRadiusRotate.left=box.left.toFixed(0)*1
				this.startRadiusRotate.percent=50
				this.startRadiusRotate.position={
					left:e.clientX-150,
					top:e.clientY-3
				}
			})
		},
		//旋转前先清除class样式
		beforeRotate:function(){
			if(!this.startRadiusRotate.multiple){
				for(let key in System.operatingNodes){
					if(rotateReg.test(this.styleNodeText[key])){
						//原本就有transform rotate
						document.getElementById(key.replace('$NODE:',"")+"_style").innerText=this.styleNodeText[key].replace(rotateReg,``)
					}
				}
			}
			
		},
		//旋转完成处理
		processToNode:function(){
			const add=(key,angle)=>{
				System.metaData.STYLESTRUCT[key].style['transform']={
						value:"",
						children:{
							"transform":[
								{
									value:{
										data:{
											transType:"旋转",
											value:[angle,0,0,0],
											unit:['','','','deg']
										},
										type:"旋转"
									},
									condition:{
										bindList:null,
										default:""
									}
								}
							],
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
						},
						group:false,
						condition:{
							bindList:null,
							default:""
						}
				}
			}
			let index=0
			let angle
			let changeKey=""
			for(let key in System.operatingNodes){
				changeKey=key
				angle=this.startRadiusRotate.rotate//+this.startRadiusRotate.preAngle
				if(rotateReg.test(this.styleNodeText[key])){
					angle+=RegExp.$1*1
					//原本就有transform rotate
					document.getElementById(key.replace('$NODE:',"")+"_style").innerText=this.styleNodeText[key].replace(rotateReg,`rotate(${angle}deg)`)
					//数据写回
					index=0
					while(true){
						if(!System.metaData.STYLESTRUCT[key].style['transform']){
							add(key,angle)
							break
						}
						if(System.metaData.STYLESTRUCT[key].style['transform'].children.transform[index].value.data.transType=='旋转'){
							System.metaData.STYLESTRUCT[key].style['transform'].children.transform[index].value.data.value=[angle,0,0,0]
							break
						}
						else if(System.metaData.STYLESTRUCT[key].style['transform'].children.transform[index].value.data.transType=='3D旋转'){
							System.metaData.STYLESTRUCT[key].style['transform'].children.transform[index].value.data.value=[0,0,1,angle]//等同于rotateZ
							break
						}
						index++
					}
				}else if(transformReg.test(this.styleNodeText[key])){
					//原本有transform属性，但没有rotate
					let t=this.styleNodeText[key].replace("transform:",
					"transform:"+`rotate(${(this.startRadiusRotate.rotate+this.startRadiusRotate.preAngle)}deg) `)
					document.getElementById(key.replace('$NODE:',"")+"_style").innerText=t
					if(System.metaData.STYLESTRUCT[key].style['transform']){
						System.metaData.STYLESTRUCT[key].style['transform'].children.transform.push(
							{
								value:{
									data:{
										transType:"旋转",
										value:[angle,0,0,0],
										unit:['','','','deg']
									},
									type:"旋转"
								},
								condition:{
									bindList:null,
									default:""
								}
							})
					}else{
						add(key,angle)
					}
				}else{
					//原本没有transform属性
					console.log('keyyy',key)
					document.getElementById(key.replace('$NODE:',"")+"_style").innerText=this.styleNodeText[key].replace("}",`transform:rotate(${(this.startRadiusRotate.rotate+this.startRadiusRotate.preAngle)}deg);}`)
					add(key,angle)
				}
				document.querySelectorAll("."+key.replace('$NODE:',"")).forEach((node)=>{
					node.classList.remove('tempRotateRadius')
				})
				//document.getElementById(key).classList.remove('tempRotateRadius')
			}
			System.setScaleValuePercent()
			//单个编辑时更新编辑框
			if(!this.startRadiusRotate.multiple)
				System.reloadData('transform',System.metaData.STYLESTRUCT[changeKey].style['transform'])
			this.startRadiusRotate.preAngle=0
		},
		//圆角完成处理
		processToNode_radius:function(){
			System.keyUpEvent['control']=null
			System.closeTip()
			const set=(key,add=false)=>{
				let child=["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]
				
				//清空四个角的样式
				for(let i=0;i<4;i++){
					System.writeToClass(key.replace('$NODE:',""),nameToLower(child[i]),'')
				}
				
				let children={
				    "borderTopLeftRadius":{
								value:this.startRadiusRotate.radius,
								unit:this.startRadiusRotate.radiusUnit,
								condition:{
									bindList:null,
									default:""
								},
							},
				    "borderTopRightRadius":{
								value:this.startRadiusRotate.radius,
								unit:this.startRadiusRotate.radiusUnit,
								condition:{
									bindList:null,
									default:""
								},
							},
				    "borderBottomLeftRadius":{
								value:this.startRadiusRotate.radius,
								unit:this.startRadiusRotate.radiusUnit,
								condition:{
									bindList:null,
									default:""
								},
							},
				    "borderBottomRightRadius":{
								value:this.startRadiusRotate.radius,
								unit:this.startRadiusRotate.radiusUnit,
								condition:{
									bindList:null,
									default:""
								},
							},
					}
				if(add){
					System.metaData.STYLESTRUCT[key].style['borderRadius']={
						value:"",
						children:children,
						group:false,
						condition:{
							bindList:null,
							default:""
						},
					}
				}else{
					System.metaData.STYLESTRUCT[key].style['borderRadius'].children=children
				}
				
			}
			let changeKey=""
			let t
			if(!this.startRadiusRotate.multiple){
				this.startRadiusRotate.rotate=0
				this.processToNode()
			}
			for(let key in System.operatingNodes){
				changeKey=key
				
				if(!radiusReg.test(this.styleNodeText[key])){
					//原先borderRadius样式不存在
					set(key,true)
					System.writeToClass(key,'border-radius',this.startRadiusRotate.radius+this.startRadiusRotate.radiusUnit)
					//document.getElementById(key+"_style").innerText=this.styleNodeText[key].replace('}',`border-radius:${this.startRadiusRotate.radius+this.startRadiusRotate.radiusUnit};}`)
				}else{
					set(key)
					System.writeToClass(key,'border-radius',this.startRadiusRotate.radius+this.startRadiusRotate.radiusUnit)
					//document.getElementById(key+"_style").innerText=this.styleNodeText[key].replace(radiusReg,`border-radius:${this.startRadiusRotate.radius+this.startRadiusRotate.radiusUnit};`)
				}
				//修改样式值
			}
			//更新样式
			System.reloadData('borderRadius',System.metaData.STYLESTRUCT[changeKey].style['borderRadius'])
			
		},
		endSetRR:function(){
			this.startRadiusRotate.down=false
			this.nodeTopBar=
			{
				show:false,
				left:0,
				top:0
			}
			
			if(this.startRadiusRotate.type=='radius')
				this.processToNode_radius()
			else
				this.processToNode()
			for(let key in System.operatingNodes){
				document.querySelectorAll("."+key.replace('$NODE:',"")).forEach((node)=>{
					node.classList.remove('tempRotateRadius')
				})
				//document.getElementById(key).classList.remove('tempRotateRadius')
			}
			System.drawSelectBound()
			//显示选择边框
			System.showSelectBound()
			
			this.startRadiusRotate.rotate=0
			this.startRadiusRotate.radius=0
		},
		rotateAndRadius:function(type){
		
		},
		//旋转处理
		render:function(data) {
			this.startRadiusRotate.rotate=data.data.rotate.toFixed(0)*1
			if(this.startRadiusRotate.multiple){
				document.getElementById("tempRotateRadiusStyle").innerText=
				`	.tempRotateRadius{
						rotate:${(this.startRadiusRotate.rotate+this.startRadiusRotate.preAngle)}deg;
					}
				`
			}else{
				document.getElementById("tempRotateRadiusStyle").innerText=
				`	.tempRotateRadius{
						border-radius:${this.startRadiusRotate.radius+this.startRadiusRotate.radiusUnit};
						rotate:${(this.startRadiusRotate.rotate+this.startRadiusRotate.preAngle)}deg;
					}
				`
			}
		},
		setRadiusRotate:function(e){
			if(this.startRadiusRotate.type=='radius'){
				let deltaX=e.clientX-this.startRadiusRotate.position.left-150
				this.startRadiusRotate.radius=deltaX+this.startRadiusRotate.preRadius
				if(this.startRadiusRotate.radius<0) this.startRadiusRotate.radius=0
				let percent=(deltaX/this.startRadiusRotate.width)*100+50
				this.startRadiusRotate.radiusUnit=System.keybord.control?'%':'px'
				if(percent>100) percent=100
				else if(percent<0) percent=0
				this.startRadiusRotate.percent=percent
				//percent/=2
				/*for(let key in System.operatingNodes){
					document.getElementById(key).style.borderRadius=percent+"%"
				}*/
				if(!this.startRadiusRotate.multiple){
					//单个时，仅修改圆角，保持各个的旋转角度
					document.getElementById("tempRotateRadiusStyle").innerText=
					`	.tempRotateRadius{
							rotate:${this.startRadiusRotate.rotate}deg;
							border-radius:${this.startRadiusRotate.radius}${this.startRadiusRotate.radiusUnit};
						}
					`
				}else{
					document.getElementById("tempRotateRadiusStyle").innerText=
					`	.tempRotateRadius{
							border-radius:${this.startRadiusRotate.radius}${this.startRadiusRotate.radiusUnit};
						}
					`
				}
				
			}else{
				System.domWorker.postMessage(
				{
					x:e.clientX,
					left:this.startRadiusRotate.position.left,
					width:this.startRadiusRotate.width
				})
				let temp
				System.domWorker.onmessage=data =>{
					this.startRadiusRotate.percent=data.data.percent
					setTimeout(()=>{
						this.render(data)
					},50)
				}
			}
		},
		//交互对象拖拽
		startLinkObject:function(e){
			let drawLine=false
			System.linkingAnimation=true
			const moveLine=(ev)=>{
				this.drawAlignLine({
					clientX:ev.clientX-2,
					clientY:ev.clientY-2
				})
			}
			this.alignLine.move=true
			this.alignLine.mouseAction.isDown=true
			this.alignLine.mouseAction.startX=e.clientX
			this.alignLine.mouseAction.startY=e.clientY
			window.onmouseup=()=>{
				drawLine=false
				this.alignLine.move=false
				System.linkingAnimation=false
				System.lastLocatedNode=null
				window.onmousemove=null
				window.onmouseup=null
			}
			window.onmousemove=moveLine
		},
		recoverMode:function(from,to){
			System.resetEditingMode(to)
			if(from==2 && to!==2){
				//从动画模式退出到普通模式
				//恢复动画前的数据
				System.recoverAnimate()//在animateEditor中定义
				//清除所有选择的节点
				System.unSelectAll()
			}
		}
	}
}