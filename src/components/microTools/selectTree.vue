<template>
	<div style="position: absolute;left: 50%;border-radius: 5px;" ref="main">
		
		<teleport to="body">
			<input ref="closeInput" style="border:none;width:100px;height:10px;background-color: rebeccapurple;position: absolute;z-index:99999;opacity: 1;left:-150px;top:-150px" @blur="close">
			<div @mouseover="mouseOut=false" @mouseleave="mouseOut=true" style="z-index: 9999999;width: 150px;transition: .2s;max-height: 450px;min-height: 100px;overflow-y: scroll;position: absolute;background-color: rgba(0,0,0,0.85);color:white;font-weight: normal;border-radius: 5px;white-space: nowrap;text-overflow: ellipsis;overflow-x: hidden;" 
			:style="{top:`${top}`,left:`${left}`}">
			<ul>

				<li v-for="(item,index) in list" :key="index" @click="change(index)" @mouseenter="setChildList(item.childList)" style="overflow: hidden;text-overflow: ellipsis;position: relative;">
					<span  v-if="defaultIndex==index && showNav" style="position: absolute;left: 0px;top: 10px;border-radius: 10px;width: 10px;height:10px;background-color: var(--mainColorBlue2);"></span>
					{{item.name}}
				</li>
			</ul>
			</div>
		</teleport>
		<selectTree v-if="showChildList" ref="childList" @change="acceptChildData" :list="childrenList" :width="'80px'" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;"></selectTree>
	</div>
</template>

<script>
	import selectTree from "./selectTree.vue"
	export default{
		name:"selectTree",
		components:{
			selectTree
		},
		props:{
			list:{
				type:Array,
				default:[]
			},
			selected:{
				type:String,
				default:""
			},
			width:{
				type:String,
				default:"130px"
			},
			back:{
				type:String,
				default:""
			},
			toBody:{//是否传送到body，用于展开动画
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				selectedText:this.selected,
				spread:false,
				defaultIndex:0,
				top:"20px",
				left:"",
				clickDom:null,
				showNav:false,//是否显示小蓝点
				mouseOut:false,//鼠标是否处于当前组件内,鼠标不在时，设置true，在其他处点击时将会引发input失去焦点事件
				childrenList:[],
				showChildList:false,
				data:[]
			}
		},
		beforeMount(){
			if(this.selected==''){
				if(this.list.length!=0){
					this.selectedText=this.list[0]
				}
			}else{
				
				let index=this.list.indexOf(this.selected)
				console.log(this.selected,index)
				this.defaultIndex=index
			}
		},
		mounted(){
		},
		watch:{
		},
		methods:{
			leave:function(e){
				this.mouseOut=true
				console.log("leave")
			},
			setSelected:function(text){//供外部设置原先值
				this.selectedText=text
				let index=this.list.indexOf(text)
				this.defaultIndex=index
				console.log(this.selected,index,this.defaultIndex)
			},
			getSelected:function(index=this.defaultIndex){//供外部获取
				return {"index":index,"text":this.list[index]}
			},
			change:function(index){//内部修改
				this.defaultIndex=index
				this.selectedText=this.list[index]
				this.spread=false
				this.$emit("change",{"index":index,"text":this.list[index]})	
				this.$emit("close")
			},
			setSpread:function(e,showNav=true){
				this.showNav=showNav
				this.spread=!this.spread
				this.showChildList=false
				this.$nextTick(()=>{
					
					this.top=e.clientY - this.list.length*10 
					if(this.top<0){
						this.top=e.clientY-30
					}else{
						if((screen.height - this.top) < 100){
							this.top=screen.height-this.length*20-20
						}
					}
					this.top+="px"
					this.left=(e.clientX - 150 )+"px"
					setTimeout(()=>{
						this.$refs['closeInput'].focus()
					},250)
					
				})
			},
			close:function(){
				setTimeout(()=>{
					this.$emit("close")
					this.spread=false
				},200)
					
			},
			setChildList:function(e,list){
				this.childrenList=list
				this.showChildList=true
				this.$nextTick(()=>{
					this.$refs['childList'].setSpread({clientY:e.clientY,clientX:this.$refs['main'].getBoundingClientRect().x-80})
				})
			},
			acceptChildData:function(data){
				this.$emit("change",this.data.push(...data))
			}
		}
	}
</script>

<style scoped>
	ul{
		text-align: left;
		padding: 5px;
		cursor: pointer;
		margin: 0;
		user-select: none;
		-ms-user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	ul li{
		list-style: none;
		line-height: 30px;
		font-size: 14px;
		padding: 0;
		padding-left: 15px;
		border-radius: 5px;
		margin-top: 2px;
		
	}
	ul li:hover{
		background-color: #3662EC;
	}
</style>