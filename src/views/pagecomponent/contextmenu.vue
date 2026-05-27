<template>
	<div>
		<teleport to="body" v-if="showMenu">
			<div class="menuBar" :style="{left:`${menuPosition.left}px`,top:`${menuPosition.top}px`}">
				<div style="height: 100%;position: relative;width: 100%;padding-bottom: 16px;">
					<div class="menuItem" v-for="(item,index) in showMenuList" :key="index" 
						:style="{marginTop:`${node_contextmenu[item].partition?'16px':'8px'}`}"
						@click="action(item)">
						
						<!--分割线-->
						<div v-if="node_contextmenu[item].partition==true" style="position: absolute;left:0;top:-8px;border-bottom: 2px solid var(--mainColorGrayBg2);width: 100%;height: 1px;background-color: transparent;clear: both;"></div>
						
						<div class="icon" v-html="node_contextmenu[item].icon">
						</div>
						<h4 class="itemText">
							{{node_contextmenu[item].name}}
						</h4>
						
					</div>
				</div>
				<input class='hiddenInput' ref='focusInput' @blur="close"/>
			</div>
		</teleport>
	</div>
</template>

<script>
	import * as contextmenu from "../mixins/contextmenu.js"
	export default{
		data(){
			return {
				showMenu:false,
				node_contextmenu:contextmenu.list,
				menuId:"",
				showMenuList:[],
				menuPosition:{
					left:100,
					top:100,
				}
			}
		},
		mounted(){
			this.showMenuList=Object.keys(this.node_contextmenu)
		},
		methods:{
			//在面中通过ref调用show和close来控制
			show:function(e,id,multiple=false,editingMode=0){
				if(editingMode==2){
					//动画模式
					//选项为：设为起始交互点，记录所有属性，记录选中属性，新增变化属性，删除节点
					this.node_contextmenu=contextmenu.animateList
					System.drawSelectBound()
				}else{
					this.node_contextmenu=contextmenu.list
				}
				this.menuId=id
				if(multiple){
					this.showMenuList=['float','copy','cut','note','remove']
				}else{
					let keys=Object.keys(this.node_contextmenu)
					this.showMenuList=keys
				}
				this.menuPosition={
					left:e.clientX,
					top:e.clientY
				}
				this.showMenu=true
				this.$nextTick(()=>{
					this.$refs['focusInput'].focus()
				})
			},
			close:function(){
				setTimeout(()=>{
					System.menuStatus=false
					this.showMenu=false
				},200)
			},
			action:function(name){
				contextmenu[name]()
			}
		}
	}
</script>

<style scoped>
	.menuBar{
		position: absolute;
		width: auto;
		min-width: 150px;
		padding-left: 8px;
		padding-right: 8px;
		height: auto;
		max-height: 540px;
		border-radius: 10px;
		background-color: #212121;
		z-index: 999999999;
		border: 1px solid #323232;
	}
	.menuItem{
		position: relative;
		width: 90%;
		height:30px;
		margin-top: 8px;
		display: flex;
		margin-left: 5%;
		border-radius: 10px;
		transition: .2s;
		background-color: transparent;
		cursor: pointer;
	}
	.menuItem:hover{
		background-color: var(--mainColorGrayBg2);
	}
	.icon{
		width: 20px;
		height: 20px;
		margin-top: 6px;
		margin-left: 5px;
		background-color: transparent;
	}
	.itemText{
		margin: 0;
		padding: 0;
		width: calc(100% - 30px);
		margin-left: 5px;
		text-align: left;
		height:30px;
		line-height: 30px;
		user-select: none;
		color: white;
		font-weight: normal;
	}
</style>