<!--事件编辑器-->
<template>
	<div class="main">
		<!--编辑模式选择-->
		<div class="editorMode">
			<!--逻辑位图-->
			<div class="editorModeItem"
				:style="{backgroundColor:`${nowEditorMode==0?'var(--mainColorBlue2)':''}`}"
				@click="changeEditorMode(0)"
			 >逻辑位图</div>
			<!--代码块-->
			<div class="editorModeItem" 
				:style="{backgroundColor:`${nowEditorMode==1?'var(--mainColorBlue2)':''}`}"
				@click="changeEditorMode(1)"
			>代码块</div>
			<!--纯代码编辑-->
			<!--div class="editorModeItem" 
				:style="{backgroundColor:`${nowEditorMode==2?'var(--mainColorBlue2)':''}`}"
				@click="changeEditorMode(2)"
			>纯代码</div-->
			<div class="editorModeItem" 
				style="position:absolute;right:5px;top:5px"
				@click="closeBord"
			>X</div>
		</div>
		<!--编辑区-->
		<!--逻辑位图-->
		<div v-if="nowEditorMode==0">
		</div>
		<!--代码块-->
		<div v-if="nowEditorMode==1">
			<BlockMain></BlockMain>
		</div>

	</div>
</template>

<script>
	import Blockly from 'blockly'
	import BlockMain from "./eventEditor/blocklyComponents/blocklyMain.vue"
	export default{
		name:"eventEdit",
		data(){
			return{
				nowEditorMode:0,
				blocklyWork:null,
				editor:null,
				codeBord:{
					isEdit:false
				},
				timeout:null
			}
		},
		components:{
			BlockMain
		},
		methods:{
			changeEditorMode:function(target){
				if(this.nowEditorMode!==target){
					if(confirm("切换编辑模式将清空当前模式编辑内容，是否继续?")){
						this.nowEditorMode=target
						if(target==1){
							//代码块
							this.startBlockly()
						}
					}
				}
			},
			startBlockly:function(){
				this.$nextTick(()=>{
					this.blocklyWork=Blockly.inject(this.$refs['blocklyDiv'],{})
				})
				
			},
			closeBord:function(){
				//关闭编辑器
				this.$emit("close")
			}
		}
	}
</script>

<style scoped>
	.main{
		position: absolute;
		z-index: 999;
		left: 10vw;
		top:10vh;
		width: 70vw;
		height: 80vh;
		background-color: #212121;
		border-radius: 10px;
	}
	.editorMode{
		width: 100%;
		height: 25px;
		margin-top: 5px;
		display: flex;
		background-color: transparent;
	}
	.editorModeItem{
		margin-left: 8px;
		width: 100px;
		height: 25px;
		border-radius: 10px;
		color: white;
		background-color:  #323232;
		transition: .2s;
		text-align: center;
		color: white;
		font-weight: normal;
		line-height: 25px;
		cursor: pointer;
	}
	.editorModeItem:hover{
		background-color: var(--mainColorGrayBg2);
	}
	.codeContainer{
		width:100%;
		height:100%;
	}
</style>