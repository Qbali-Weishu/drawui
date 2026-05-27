<template>
	<div style="position: absolute;left: 50%;border-radius: 5px;">
		
		<div style="position: relative;height: auto;width: auto;" @mouseover="mouseOut=false" @mouseleave="mouseOut=true">
			
			<div style="display: flex;height: 25px;" :style="{width:`${width}`}">
				<div  style="width:75%;line-height: 25px;border-right: 1px solid rgba(128,128,128,0.1);text-align: center;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{selectedText}}</div>
				<div id="sel_bu" style="height: 100%;float: left;width:25%" @click="setSpread">
					<svg id="sel_sv" t="1651200666473" class="icon"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top: 5px;" p-id="1272" width="15" height="15">
						<path d="M806.4 319.2L512 613.6 221.6 323.2 176 368l290.4 290.4L512 704l45.6-45.6 294.4-294.4z" p-id="1273" fill="#8a8a8a"></path></svg>
				</div>
				<input style="border:none;width:1px;height:1px;background-color: transparent;position: absolute;z-index: -1;opacity: 0;" @blur="close">
			</div>
			<div v-if="spread && !toBody" :style="{width:`${width}`}" style="max-height: 150px;overflow-y: scroll;position: absolute;top: 25px;background-color: rgba(0,0,0,0.85);color:white;font-weight: normal;border-radius: 5px;white-space: nowrap;text-overflow: ellipsis;overflow-x: hidden;" >
				<ul>
					<li v-for="(item,index) in list" :key="index" @click="change(index)">{{item}}</li>
				</ul>
			</div>
			<teleport to="body" v-if="toBody && spread" >
				<div @mouseover="mouseOut=false" @mouseleave="leave" style="z-index: 99;width: 150px;transition: 0s;max-height: 150px;min-height: 100px;overflow-y: scroll;position: absolute;background-color: rgba(0,0,0,0.85);color:white;font-weight: normal;border-radius: 5px;white-space: nowrap;text-overflow: ellipsis;overflow-x: hidden;" 
				:style="{top:`${top}`,left:`${left}`}">
				<ul>
					<li v-for="(item,index) in list" :key="index" @click="change(index)" style="overflow: hidden;text-overflow: ellipsis;">{{item}}</li>
				</ul>
				</div>
			</teleport>
		</div>
	</div>
</template>

<script>
	export default{
		name:"selectList",
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
				mouseOut:false,//鼠标是否处于当前组件内,鼠标不在时，设置true，在其他处点击时将会引发input失去焦点事件
			}
		},
		beforeMount(){
			if(this.selected==''){
				if(this.list.length!=0){
					this.selectedText=this.list[0]
				}
			}else{
				let index=this.list.indexOf(this.selected)
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
			},
			getSelected:function(index=this.defaultIndex){//供外部获取
				return {"index":index,"text":this.list[index]}
			},
			change:function(index){//内部修改
				this.defaultIndex=index
				this.selectedText=this.list[index]
				this.spread=false
				this.$emit("change",{"index":index,"text":this.list[index]})	
			},
			setSpread:function(e){
				this.spread=!this.spread
				this.$nextTick(()=>{

						try{
							if(e.target.id=="sel_sv"){
								this.clickDom=e.target.parentNode.nextElementSibling.focus()
								console.log("focus")
							}else if(e.target.id="sel_bu"){
								this.clickDom=e.target.nextElementSibling.focus()
							}
							 if(this.toBody){
								 this.top=(e.clientY - 50 )+"px"
								 this.left=(e.clientX - 150 )+"px"
							 }
						}catch(e){
							console.error(e)
						}
					

				})
			},
			close:function(){
				if(this.mouseOut){
					this.spread=false
				}
				
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
		padding-left: 5px;
		border-radius: 5px;
		margin-top: 2px;
		
	}
	ul li:hover{
		background-color: #3662EC;
	}
</style>