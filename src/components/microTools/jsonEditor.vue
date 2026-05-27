<template>
	<div style="width: 100%;height:100%">
	   <JsonEditorVue class="editor" v-model="data" :showBtns="false" :language="'zh-CN'" style="height: 100%;" @blur="validate"/>
	</div>
</template>

<script>
	import JsonEditorVue from 'json-editor-vue3'

	 const jsonData = ``
	 export default {
		name:"jsonEditor",
		components: { JsonEditorVue },
	    data() {
	      return {
	        data:{}
	      }
	    },
		mounted(){
		},
		methods:{
			validate:async function(editor) {
			  const res = await editor.validate();
			  // res 是错误列表，如果是空数组，则表示检测没有错误
			  console.log(this.data)
			}
		},
		setData:function(data){
			try{
				this.data=JSON.parse(data)
			}catch{
				System.showToast("数据错误",2000)
			}
		},
		getData:function(){
			return this.data
		}
	  }
</script>

<style>
</style>