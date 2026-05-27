<template>
	<div id="test">
		<img :src="item" v-for="(item,index) in imgList" :key="index"/>
	</div>
</template>

<script>
	import * as dataList from "./fileList.js"
	export default{
		name:"",
		data(){
			return{
				imgList:""
			}
		},
		mounted(){
			this.imgList=dataList.data
		}
	}
</script>

<style>
</style>