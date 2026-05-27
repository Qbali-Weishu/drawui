<template>
	<div>
	   <JsonEditorVue class="editor" v-model="data" :showBtns="false" :language="'zh-CN'" @blur="validate" />
	</div>
</template>

<script>
	import JsonEditorVue from 'json-editor-vue3'

	 const jsonData = `{"title":"测试json数据","children":[{"name":"子项名称", "desc":"子项说明" },{"name":"子项名称1", "desc":"子项说明1" }]}`
	 export default {
		 name:"newCode",
components: { JsonEditorVue },
	    data() {
	      return {
	        data:{ key: "key", value: "value" }
	      }
	    },
		mounted(){
		},
		methods:{
			validate:async (editor) => {
			  const res = await editor.validate();
			  // res 是错误列表，如果是空数组，则表示检测没有错误
			  console.log(res);
			}
		}
	  }
</script>

<style>
</style>