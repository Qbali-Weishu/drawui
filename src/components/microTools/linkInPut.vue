<template>
	<div class="out" :id="linkId" @mousedown="down=true" @mouseup.stop="acceptInput">
		<div class="bigCircle">
		</div>
		<div class="littleRect">
		</div>
		<div class="arrow">
		</div>
		<!--连接线-->
		<teleport to="body">
			<svg v-if="move" style="position: absolute;left: 0px;top: 0px;width: 100vw;height:100vh" :style="{zIndex:`${zIndex-1}`}">
				<path :d="svgpath" style="stroke-width: 2px;stroke: var(--mainColorBlue2);fill:transparent;">
				</path>
			</svg>
		</teleport>
		<teleport to="body">
			<div v-if="move" :style="{zIndex:`${zIndex}`}" style="position: absolute;width: 100vw;height:100vh;left:0;top:0;background-color: rgba(0,0,0,0.3);" @mousemove.stop="path" @mouseup.stop="endMove">
			</div>
		</teleport>
	</div>
</template>

<script>
	//锚点引入工具
	export default{
		name:"linkInPut",
		props:{
			linkId:{//id，由父节点随机生成并传入
				type:String,
				default:"linkInPut"
			},
			index:{
				//需要设置的索引序号
				type:Number,
				default:0
			}
		},
		data(){
			return {
				startPosition:{
					left:0,
					top:0
					//按下时记录位置
				},
				move:false,
				svgpath:"",
				down:false,//用于确定有没有在当前节点中按下
			}
		},
		methods:{
			startOutput:function(e){
				//抛出状态就绪
				this.svgpath=""
				this.startPosition.left=e.clientX
				this.startPosition.top=e.clientY
				this.move=true
				
			},
			
			endMove:function(e){
				System.mountStatus=false
				this.move=false
			},
			path:function(e){
				let x1=this.startPosition.left
				let y1=this.startPosition.top
				let x2=e.clientX
				let y2=e.clientY
				var path=`M${x1} ${y1} `
				let xdisance=(x2-x1)/4
				let flag=xdisance<0?-1:1
				if(xdisance>100) xdisance=100
				let cx1=x1+xdisance;
				let ydistance=(y2-y1)/2
				if(ydistance<50) ydistance=50
				else if(ydistance>100) ydistance=100
				let cy1=y1-ydistance;
				xdisance=(x2-x1)/2
				if(xdisance>400) xdisance=400
				let cx2=x2-xdisance
				let cy2=y2+15
				let c=`C${cx1} ${cy1},${cx2} ${cy2},`
				path+=c+x2 +" "+y2+" "
				//绘制箭头
				path+=`M${x2} ${y2} T${x2-8*flag} ${y2-8} M${x2} ${y2} T${x2-8*flag} ${y2+8}`
				this.svgpath=path
			},
			//接收传入
			acceptInput:function(e){
				if(!this.down){
					//直接松开，没有经过按下
					let data=System.mountOutput
					//调用结束锚点链接事件
					System.endLinkMount(e)
					//上传接收到的数据
					this.$emit("valueInput",this.index,data)
				}else{
					//否则视为点击
					this.$emit("viewSource",e,this.index)
					this.down=false
				}
			}
		}
	}
</script>

<style scoped>
	.out{
		cursor: pointer;
		position: relative;
		width: 10px;
		height: 10px;
		background-color: transparent;
	}
	.bigCircle{
		overflow: hidden;
		position:relative;
		height: 10px;
		width: 10px;
		z-index: 1;
		background-color: white;
		border-radius: 5px;
	}
	.littleCircle{
		margin-left: 2px;
		height: 6px;
		width: 6px;
		z-index: 1;
		background-color: #212121;
		border-radius: 5px;
		margin-top: 2px;
	}
	.bigRect{
		position: absolute;
		left: 5px;
		top: 0;
		width: 5px;
		z-index: 9;
		height: 10px;
		background-color: #212121;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.littleRect{
		position: absolute;
		height: 2px;
		z-index: 9;
		left: 12px;
		top: 4px;
		width:8px;
		background-color: white;
		border-radius: 2px;
	}
	.arrow{
		position: absolute;
		right: -14px;
		width: 6px;
		top: 2px;
		height: 6px;
		clip-path: polygon(0 80%,80% 80%,80% 0,100% 0,100% 100%,0 100%,0 80%);
		background-color: white;
		z-index: 9;
		transform: rotate(-45deg); 
		transform-origin: center;
	}
</style>