<template>
	<div class="insertEC" ref="ecInsert">
		<!--添加按钮-->
		<div @click.stop="returnInsertPosition" style="width: 15px;height: 15px;padding: 0;border: 0;background-color: var(--mainColorBlue3);user-select: none;border-radius: 10px;position: absolute;top: -8px;left: -8px;">
			<span class="spanItem" style="transform: rotate(0);pointer-events: none;width: 13px;top: 7px;left: 1px;"></span>
			<span class="spanItem" style="transform: rotate(90deg);pointer-events: none;width: 13px;top: 7px;left: 1px;"></span>
		</div>
	</div>
</template>

<script>
	export default{
		name:"insertEC",
		props:{
			positionIndex:0
		},
		methods:{
			returnInsertPosition:function(e){
				this.$emit("startInsertEC",e,this.positionIndex)
			}
		}
	}
</script>

<style scoped>
	.insertEC{
		margin-top:-15px;
		
		width: 265px;
		margin-left: -20px;
		height: 10px;
		background-color: transparent;
		border: none;
		border-top: 1px dashed black;
		position: relative;
		cursor: pointer;
	}
</style>