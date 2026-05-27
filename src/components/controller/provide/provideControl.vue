<template>
	<div>
		<component v-if="provide" :is="nowProvideCom" @quit="endProvide" :propsOptions="propsOptions"></component>
	</div>
</template>

<script>
	let path=require("path")
	const files = require.context('../../provideCom/', false, /\.vue$/)
	const modules = {}
	files.keys().forEach(key => {
	const name = path.basename(key, '.vue')
	modules[name] = files(key).default || files(key)
	})
	/**管理提供给外部的组件*/
	export default{
		name:"provideControl",
		components:{
			...modules
		},
		data(){
			return{
				nowProvideCom:"",
				provide:false,
				propsOptions:{}
			}
		},
		mounted(){
			System.requestProvide=this.startProvide
			System.endProvide=this.endProvide
		},
		methods:{
			startProvide:function(target,options){
				console.log("provide targTe",options,target)
				this.nowProvideCom=target
				this.propsOptions=options
				this.provide=true
			},
			endProvide:function(){
				setTimeout(()=>{
					this.provide=false
				},100)
			}
		}
	}
</script>

<style>
</style>