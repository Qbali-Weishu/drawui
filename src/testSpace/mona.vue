<template>
  <div ref="container" id="codeEditBox" style="height: 200px;width:100%;text-align: left;position: relative;max-width: 1300px;max-height: 300px;"></div>
</template>

<script>

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
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
    };
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
      this.$nextTick(() => {
	  this.editor=monaco.editor.create(this.$refs['container'],{
		  value:"",//初始显示文字
		  language:"javascript",
		  theme:'vs-dark',
		  selectOnLineNumbers:true,//显示行号
		  roundedSelection:false,
		  acceptSuggestionOnEnter: 'off',
		  readOnly:false,
		  cursorStyle:'line',
		  automaticLayout:true,
		  glyphMargin:true,
		  useTabStops:false,
		  fontSize:18,
		  autoIndent:true,
		  quickSuggestions:false,
		  quickSuggestionsDelay:200,//提示框延时
		  minimap: {
		          enabled: false // 是否启用预览图
		        }, // 预览图设置
		cursorSmoothCaretAnimation: false, 
	  })
	this.$nextTick(()=>{
		setTimeout(()=>{
			this.$refs['container'].style.width="1000px"
		},10000)
	})
    });
	},
    // 此方法获取到编辑的最新值，传给父组件
    getVal() {
      return toRaw(this.editor).getValue()
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
</style>
