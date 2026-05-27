<template>
	<div style="height:400px;width: 250px;background-color: #212121;border-radius: 10px;position: absolute;top: 30px;left: 100px;z-index: 999;">
		<button @click="quit" style="background-color: transparent;color: white;height: 25px;position: absolute;top: 5px;right: 8px">
			<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
					<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="white" p-id="18203"></path></svg>
		</button>
		<div style="height: 20px;width: 100%;"></div>
		<div v-for="(item,index) in list" :key="index" class="cssVarItem">
			<div class="copyButton" buttonName="复制" @click="copy(item.name)">
				<svg t="1662781066799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17683" style="margin-top: 0px;margin-left: 3px" width="20" height="20"><path d="M780.6 127.2H354.4c-63 0-113.8 50.7-113.8 113.8v426.2c0 63 50.7 113.8 113.8 113.8h426.2c63 0 113.8-50.7 113.8-113.8V241c0-63-50.7-113.8-113.8-113.8z m52.4 537c0 29.7-24.3 55.4-55.4 55.4H357.4c-29.7 0-55.4-24.3-55.4-55.4V244c0-29.7 24.3-55.4 55.4-55.4h420.2c29.7 0 55.4 24.3 55.4 55.4v420.2z" p-id="17684" fill="#e6e6e6"></path><path d="M155.6 279.3c-15.2 0-27 11.8-28.6 25.5v473.5c3.6 65.2 57 116.3 123.1 116.3h464.6c15.1 0 27.4-12.3 28.8-27.4 0-16.4-13.7-28.8-28.8-28.8l-463.1 0.1c-37 0-67.2-30.2-67.2-67.2V308.1c0-16.4-13.7-28.8-28.8-28.8z" p-id="17685" fill="#e6e6e6"></path></svg>
			</div>
			<h4 class="name" :buttonName="item.name">
				{{item.name}}
			</h4>
			<h4 class="name" style="pointer-events: none;margin-right: 2px;">
				:
			</h4>
			<h4 class='value' :buttonName="item.value">
				{{item.value}}
			</h4>
		</div>
	</div>
</template>

<script>
	import { structStore } from "../../store/struct.js"
	export default{
		name:"cssVar",
		data(){
			return {
				store:null,
				list:[],
				data:{}
			}
		},
		mounted(){
			console.log("cssVar")
			if(this.store==null) this.store=structStore()
			this.getData()
			this.getList()
		},
		methods:{
			getList:function(){
				for(let key in this.data){
					if(key.startsWith("--")){
						this.list.push({
							name:key,
							value:this.data[key]
						})
					}
				}
			},
			getData:function(){
				try{
					this.data=Object.assign(
									this.store.CLASSLIST.APP.ROOT.text,
									this.store.CLASSLIST.APP.BODY.text
								)
				}catch{
					console.log(this.store.CLASSLIST)
				}
				
				console.log(this.data)
				 
			},
			copy:function(name){
				try{
					navigator.clipboard.writeText(name)
					System.showToast("复制成功",2000)
				}catch{
					alert("写入剪贴板失败，请复制  "+name)
				}
			},
			quit:function(){
				this.$emit("quit")
			}
		}
	}
</script>

<style scoped>
	.copyButton{
		width: 20px;margin-left: 5px;margin-top: 5px;height: 20px;cursor: pointer;
	}
	.cssVarItem{
		width: 90%;
		margin-left: 5%;
		height: 30px;
		margin-top: 5px;
		color: white;
		line-height: 30px;
		border-radius: 10px;
		display: flex;
		position: relative;
	}
	.name{
		
		white-space: nowrap;margin: 0;padding: 0;width: auto;max-width:120px ;flex-shrink:0;overflow: hidden;text-overflow: ellipsis;height: 30px;line-height: 30px;color: #35d4c7;margin-left: 8px;
	}
	.value{
		white-space: nowrap;margin: 0;padding: 0;width: auto;overflow: hidden;text-overflow: ellipsis;height: 30px;line-height: 30px;color: white;
	}
	.copyButton:hover::after,
	.name:hover::after,
	.value:hover::after{
		
		content: attr(buttonName);
		position: absolute;
		width: auto;
		height: 20px;
		padding-left: 8px;
		padding-right: 8px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	@keyframes showhover {
		from{
			opacity: 0;
			bottom: 0px;
		}to{
			opacity: 1;
			bottom:-25px;
		}
	}

</style>