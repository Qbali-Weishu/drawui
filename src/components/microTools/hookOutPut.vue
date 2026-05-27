<!--抛出锚点-->
<template>
	<div  draggable="false" style="top: 15px;" class="mountPoint2" @mousedown.stop="dragStart($event)" @mouseenter.stop="dragEnter" @mouseleave.stop="dragLeave">
		<teleport to="body" v-if="drawLine">
			<div  v-if="mountStartPosition.start" style="pointer-events: none;position: absolute;height:2px;background-color: var(--mainColorBlue3);transform-origin: left center;z-index: 99999;transition: 0s;"
			:style="{left:`${mountStartPosition.x+'px'}`,
					 top:`${mountStartPosition.y+'px'}`,
					 width:`${mountStartPosition.lineWidth+'px'}`,
					 transform:`${'rotate('+(mountStartPosition.angle-90)+'deg)'}`}"
			>
			</div>
		</teleport>
	</div>
	
</template>

<script>
	//import Worker from "../../worker/drawLine.worker"
	import Worker from 'worker-loader!../../worker/worker'
	export default{
		name:"outputhook",
		props:{
			callIndex:0,//引用此组件的锚点源在其组件当中引用的索引序号，用于完成锚点引入时回传给其对象
			xpath:""//引出的位置，用于区分作用域
		},
		data(){
			return{
				mounted:false,
				showMen:false,//在抛出中有效
				mountStartPosition:{//控制锚点连线
						start:false,
						x:0,
						y:0,
						angle:0,
						lineWidth:0
					},
				drawLine:false,
				thisDown:false,
				worker:null,
				workerTimeOut:null
			}
		},
		mounted(){
			this.worker = new Worker()
		},
		methods:{
			dragEnter:function(e){
				/*window.onmouseup=(e)=>{
					this.drawLine=false
					this.showMen=false
				}*/
			},
			dragLeave:function(){
				
				/*window.onmouseup=(ev)=>{
					this.drawLine=false
					this.showMen=false

				}*/
			},
			dragStart:function(e,refName){
				System.varPermitAreaPath=this.xpath
				//先请求父组件注册返回抛出事件
				this.$emit("startHook",this.callIndex,()=>{
					this.drawLine=false
					this.showMen=false
				},this.xpath)
				this.drawLine=true
				/*let drawAction=(ev)=>{
						this.changeAngle(ev)
						let width = Math.sqrt((Math.pow(ev.clientX - this.mountStartPosition.x, 2) + Math.pow(ev.clientY - this.mountStartPosition.y,
							2)))
						this.mountStartPosition.lineWidth = width
				}*/
				window.onmousemove=(ev)=>{
					if(this.showMen){
							if(this.worker==null){
								this.worker=new Worker()
							}
						  this.worker.postMessage({clientX:ev.clientX,clientY:ev.clientY,px:this.mountStartPosition.x,py:this.mountStartPosition.y})
						  this.worker.onmessage = e => {
							this.mountStartPosition.angle=e.data.angle
							this.mountStartPosition.lineWidth=e.data.width
							if(this.workerTimeOut!=null){
								clearTimeout(this.workerTimeOut)
							}
						    this.workerTimeOut=setTimeout(() => {
						      this.worker.terminate()
							  this.workerTimeOut=null
							  this.worker=null
						    }, 1000)
						  }
					}
					
				}
				window.onmouseup=()=>{
					this.drawLine=false
					this.showMen=false
				}
				this.mountStartPosition.x=e.clientX
				this.mountStartPosition.y=e.clientY
				this.mountStartPosition.lineWidth=0
				this.mountStartPosition.start=true
				this.showMen=true
				this.mounted=false
			},
			

		}
	}
</script>

<style>
</style>