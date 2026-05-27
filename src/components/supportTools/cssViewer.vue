<!--CSS代码查看器-->
<template>
	<div ref="main" style="overflow: scroll;">
	</div>
</template>

<script>
	export default{
		name:"cssViewer",
		props:{
			data:{
				type:Object,
				default:{}
			}
		},
		data(){
			return{
				cssData:this.data
			}
		},
		watch:{
			data:{
				handler:function(val){
					this.processCss()
				},
				immediate:true,
				deep:true
			}
		},
		mounted(){
				this.processCss()
		},
		methods:{
			processCss:function(){
				try{
					this.$nextTick(()=>{
						let box=this.$refs['main']
						box.innerHTML=""
						let cssText=""
						let processData
						for(let key in this.data){
							processData=this.data[key]
							if(Object.prototype.toString.call(processData)=='[object Object]'){
								for(let key1 in processData){
									if(processData[key1])
										cssText+="<div class='cssView_item'><h4 class='cssView_name'>"+key1+": </h4><h4 class='cssView_value'> "+processData[key1]+";</h4></div>"
								}
							}else{
								if(processData)
								cssText+="<div class='cssView_item'><h4 class='cssView_name'>"+key+": </h4><h4 class='cssView_value'> "+processData+";</h4></div>"
							}
						}
						box.innerHTML=cssText
					})
					
				}catch{}
				
			},
		}
	}
</script>

<style>
	.cssView_item{
		height: 20px;
		margin: 0;
		background-color: transparent;
		display: flex;
		width: 100%;
		margin-top: 3px;
	}
	.cssView_name{
		margin: 0;
		padding: 0;
		margin-left: 8px;
		color: #35d4c7;
		float: left;
		line-height: 20px;
		height: 20px;
		font-weight: normal;
	}
	.cssView_value{
		margin: 0;
		margin-left: 8px;
		line-height: 20px;
		height: 20px;
		padding: 0;
		color: var(--mainTextColor1);
		font-weight: normal;
	}
</style>