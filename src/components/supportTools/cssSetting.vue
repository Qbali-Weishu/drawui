<template>
	<div style="width: 100%;height: 100%;overflow: scroll;background-color: transparent;transition: .2s;border-radius: 10px;margin-top: 8px;" :style="{width:`${hasFocus?'100%':'80px'}`,height:`${hasFocus?'100%':'30px'}`}">
		<div 
			:style="{transform:`${hasFocus?'translateX(0)':'translateX(-100px)'}`}"
			:class="[hasFocus?'settingButton_active':'settingButton_noactive','settingButton']"
			@click="hasFocus=true"
		>
			变量匹配
			<button @click.stop="close" style="background-color: transparent;color: white;height: 25px;position: absolute;top: 0px;right: 8px">
				<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
						<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
			</button>
		</div>
		<div v-if="hasFocus" style="width: 280px;height: 120px;border-top: 2px solid white;position: relative;overflow: scroll;z-index: 2;">
			<div style="height: 25px;display:flex;width:115px;margin-top: 5px;">
				<h4 style="margin: 0;padding:0;font-weight:normal;color:white;text-align:center;width:60px;line-height:25px">参数列表</h4>
				<div  class="addButton" @click="addData">
					<svg t="1661847589632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" style="margin-top: 0px;margin-left: 10px;" width="25" height="20"><path d="M801.171 483.589H544V226.418c0-17.673-14.327-32-32-32s-32 14.327-32 32v257.171H222.83c-17.673 0-32 14.327-32 32s14.327 32 32 32H480v257.17c0 17.673 14.327 32 32 32s32-14.327 32-32v-257.17h257.171c17.673 0 32-14.327 32-32s-14.327-32-32-32z" fill="#8a8a8a" p-id="2393"></path></svg>
				</div>
			</div>
			<!--参数列表-->
			<div style="width: 100%;height: calc(100% - 40px);margin-top: 5px;overflow: scroll;">
				<div class="dataItem" v-for="(item,index) in dataList" :key="index">
					<h4 style="margin: 0;padding:0;font-weight:normal;color:white;text-align:center;width:60px;line-height:25px">变量前缀</h4>
					<input @input="input" placeholder="请输入变量前缀,如--" class="dataInput" v-model="dataList[index]"/>
					<div class="removeEffect" @click="removeData(index)">
						<svg t="1661864077717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-left: 5px;" p-id="3301" width="20" height="25"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#8a8a8a" p-id="3302"></path></svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { structStore } from "../../store/struct.js"
	export default{
		name:"cssSetting",
		data(){
			return {
				hasFocus:false,
				dataList:[
					'--'
				],
				store:null,
				timeout:null
			}
		},
		mounted(){
			if(!this.store) this.store=structStore()
		},
		methods:{
			setData:function(){
				
				this.store.CLASSLIST.VAR=JSON.parse(JSON.stringify(this.dataList))
			},
			addData:function(){
				if(this.dataList.at(-1).length==0){
					System.showToast("存在未设置参数，无法新增",2000)
				}else{
					this.dataList.push("")
					this.setData()
				}
			},
			removeData:function(index){
				if(this.dataList[index].length==0){
					this.dataList.splice(index,1)
					System.showToast("删除成功")
				}else if(confirm("是否确认删除以"+this.dataList[index]+"为前缀的变量匹配")){
					this.dataList.splice(index,1)
					System.showToast("删除成功")
				}
			},
			close:function(){
				this.hasFocus=false
				this.$emit("close")
			},
			input:function(){
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
					this.setData()
					this.timeout=null
				},200)
			}
		}
	}
</script>

<style scoped>
	.settingButton{
		z-index: 1;
		font-size: 16px;
		cursor: pointer;user-select: none;font-weight: normal;height: 30px;width:280px;transition: .2s;background-color: transparent;line-height: 30px;text-align: center;color: white;background-color: transparent;
	}
	.settingButton_active{}
	.settingButton_noactive{}
	.settingButton_noactive:hover{
		background-color: var(--mainColorBlue2);
	}
	.settingButton_active:hover{
		background-color: transparent;
	}
	.addButton{
		width:45px;height:20px;transition: .2s;
		margin-top: 3px;
		border-radius: 10px;
		margin-left: 8px;
		cursor: pointer;
	}
	.addButton:hover{
		background-color: var(--mainColorGrayBg2);
	}
	.dataItem{
		width: 100%;
		height: 25px;
		margin-top: 5px;
		display: flex;
	}
	.dataInput{
		width: calc(100% - 110px);
		height: 25px;
		line-height: 25px;
		background-color: var(--mainColorGrayBg2);
		text-align: center;
		color: white;
		transition: .2s;
		border-radius: 10px;
		border: none;
		outline: none;
		margin-left: 10px;
	}
	.dataInput:focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
	.removeEffect{
		margin-left: 8px;
		cursor: pointer;
		width: 30px;
		height: 25px;
		border-radius: 8px;
		background-color:transparent;
		transition: .2s;
	}
	.removeEffect:hover{
		background-color: var(--mainColorGrayBg2);
	}
</style>