<template>
	<div style="user-select: none;;border-radius: 10px;width: 15px;height: 15px;background-color: white;border: 1px solid white;box-shadow: 0 0 15px rgba(0,0,0,0.15);position: relative;cursor: pointer;overflow: hidden;" @click.stop="setCheck">
		<div  style="position: absolute;top: -2px;width: 100%;height:120%;border-radius: 10px;transition: .2s;color: white;line-height: 20px;font-weight: normal;text-align: center;" :style="{backgroundColor:`${check?'var(--mainColorBlue2)':'white' }`}"></div>
	</div>
</template>

<script>
	export default{
		name:"circleCheckBox",
		props:{
			precheck:{
				type:Boolean,
				default:false
			},
			showText:{
				type:Boolean,
				default:true
			},
		},
		data(){
			return {
				check:this.precheck
			}
		},
		methods:{
			setCheck:function(){
				this.check=!this.check
				this.$emit("setCheck",this.check)
			},
			setValue:function(value){
				this.check=value
			}
		}
	}
</script>

<style>
</style>