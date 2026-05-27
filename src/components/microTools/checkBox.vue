<template>
	<div style="width: 20px;height: 20px;background-color: white;border: 1px solid var(--mainColorBlue3);border-radius: 6px;overflow: hidden;position: relative;cursor: pointer;" @click.stop="setCheck">
		<div  style="transform: rotate(35deg);margin-left: 7px;width: 7px;height: 15px;box-sizing: border-box;background-color: transparent;border: none;border-right: 3px solid var(--mainColorBlue3);border-bottom: 3px solid var(--mainColorBlue3);">
		</div>
		<div style="position: absolute;top:0;background-color: white;height: 20px;width: 20px;transition: .5s;cursor: pointer;" :style="{left:`${check?'20px':'0px'}`}" @click.stop="setCheck">
		</div>
	</div>
</template>

<script>
	export default{
		name:"dcheckBox",
		props:{
			precheck:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				check:this.precheck
			}
		},
		methods:{
			setCheck:function(){
				console.log('set')
				this.check=!this.check
				this.$emit("setCheck",this.check)
			}
		}
	}
</script>

<style>
</style>