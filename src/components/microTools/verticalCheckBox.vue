<template>
	<div style="user-select: none;;border-radius: 10px;width: 80px;height: 20px;background-color: white;border: 1px solid white;box-shadow: 0 0 15px rgba(0,0,0,0.15);position: relative;cursor: pointer;" @click="setCheck">
		<div  style="position: absolute;top: 0;width: 50%;height: 20px;border-radius: 10px;transition: .2s;color: white;line-height: 20px;font-weight: normal;text-align: center;" :style="{left:`${check?'0px':'50%'}`,backgroundColor:`${check?'var(--mainColorGreen)':'var(--mainColorBlue2)'}`}">{{showText?(check?'on':'off'):''}}</div>
	</div>
</template>

<script>
	export default{
		name:"verticalCheckBox",
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
			}
		}
	}
</script>

<style>
</style>