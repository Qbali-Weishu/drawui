<template>
  <div ref="container" id="codeEditBox" style="height: 100%;text-align: left;width: 100%;max-width: 600px;max-height: 340px;" ></div>
</template>

<script>

//import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
//import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import {toRaw} from 'vue'
export default {
  name: 'newCode',
  props: {
    language: {
      type: String,
      default: 'json'
    },
    oldValue: String,
    value: String,
    is_readOnly: Boolean,
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
	  editor:null,
	  codeWidth:"100%",
	  timeout:null,
	  startSet:false,
	  suggstions:false
    }
  },
  beforeMount(){
  },
  mounted() {
    this.init();
  },
  beforeDestroy(){
	this.editor.dispose()
  },
  // 监听父组件传值的变化，实时更新到编辑器中
  watch: {
  },
  methods: {
    init() {
      // 初始化编辑器实例
	  /*
	  setTimeout(()=>{
	  					 editor.updateOptions({
	  						 acceptSuggestionOnEnter: 'on',
	  						 quickSuggestions:true,
	  					 })
	  					 alert("提示启动")
	  },5000)*/
      this.$nextTick(() => {
	  this.editor=monaco.editor.create(this.$refs['container'],{
			value:"",
			theme:'vs-dark',
			language:"javascript",
			selectOnLineNumbers:true,//显示行号
			roundedSelection:false,
			lineNumbersMinChars:1,
			acceptSuggestionOnEnter: 'off',
			readOnly:false,
			cursorStyle:'line',
			automaticLayout:true,
			glyphMargin:true,
			useTabStops:false,
			fontSize:14,
			autoIndent:true,
			quickSuggestions:false,
			quickSuggestionsDelay:200,//提示框延时
			minimap: {
		          enabled: false // 是否启用预览图
		        }, // 预览图设置
			cursorSmoothCaretAnimation: false, 
	  })
	   this.editor.onDidChangeModelContent((event) => {
			if(!this.startSet){
				if(this.timeout!=null)
					clearTimeout(this.timeout)
				this.timeout=setTimeout(()=>{
				   this.$emit('changeCode', this.getVal())
					System.showToast("内容已保存，请注意检查是否需要结尾符号} ] )",3000)
				},2000)
			}else{
				this.startSet=false
			}
	    })
    });
	},
    // 此方法获取到编辑的最新值，传给父组件
    getVal() {
      return toRaw(this.editor).getValue()
    },
	setCode:function(code,isStart=false){
		this.startSet=isStart
		this.$nextTick(()=>{
			setTimeout(()=>{
				toRaw(this.editor).setValue(code)
			},500)
		})
	},
	},
}
</script>

<style scoped>
.the-code-diff-editor-container {
  width: 100%;
  height: 100%;
  overflow: auto;

  .monaco-editor .scroll-decoration {
    box-shadow: none;
  }
}
.monacoBorder {
  border: 1px solid #e2e2e1;
}
#codeEditBox >>> .margin-view-overlays{
	text-align: left;
}
</style>
