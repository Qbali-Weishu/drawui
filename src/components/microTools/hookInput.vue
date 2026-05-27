<!--引入锚点-->
<template>
	<div  draggable="false" ref="inputHook" class="mountPoint1" @mouseup.stop="drop" @mousedown.stop="dragStart" @mouseenter.stop="dragEnter($event)" @mouseleave.stop="dragLeave">
	</div>
</template>

<script>
	export default{
		name:"inputhook",
		props:{
			callIndex:0,//引用此组件的锚点源在其组件当中引用的索引序号，用于完成锚点引入时回传给其对象
			xpath:"",//用于引出作用域
		},
		data(){
			return{
				mounted:false,
				//showMen:false,在抛出中有效
				mountStartPosition:{//控制锚点连线
						start:false,
						x:0,
						y:0,
						angle:0,
						lineWidth:0
					},
				enterDrag:false,
				drawLine:false,
				thisDown:false
			}
		},
		methods:{
			drop:function(e){//锚点放置
				let splitPath
				let parentPath
				try{
					splitPath=System.varPermitAreaPath.split("=>")
					splitPath.pop()
					if(System.varPermitAreaPath.startsWith("function:")){//函数定义时变量提升的特殊情况,此时只要父路径一致即可
						splitPath.pop()
					}
					parentPath=splitPath.join("=>")
				}catch{
					parentPath=""
				}
				if(System.varPermitAreaPath=="" || this.xpath.startsWith(parentPath)){
					if(!this.thisDown){
						this.$emit("dropHook",this.callIndex,this.$refs['inputHook'],System.varPermitAreaPath)
					}
				}else{
					this.thisDown=false
					this.drawLine=false
					alert("作用域越界，禁止传入")
				}
				this.thisDown=false
				//由于阻止冒泡，故此处需要再次执行放置时的操作
				//在此处触发，说明已经进入目标位置，无需再判断是否有enterDrag
			},
			dragEnter:function(e){//进入当前锚点
				this.enterDrag=true
				/*仅支持放置的锚点不需要设置鼠标放置事件*/
				/*window.onmouseup=(e)=>{
					this.showMen=false
					if(!this.enterDrag && !this.mounted[this.mountedIndex]){
						this.mountStartPosition.start=false
						
					}
				}*/
			},
			dragLeave:function(){//离开当前锚点
				this.enterDrag=false
				/*仅支持放置的锚点不需要设置鼠标放置事件*/
				/*window.onmouseup=(ev)=>{
					this.showMen=false
					if(!this.mounted[this.mountedIndex]){
						this.mountStartPosition.start=false
					}
				}*/
			},
			dragStart:function(){
				this.thisDown=true
			}
		}
	}
</script>

<style>
</style>