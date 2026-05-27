<template>
	<div style="width: 100vw;height: 100vh;overflow: hidden;">
			<div ref="mycode" class="codesql" style="height:105vh;width: 100vw;overflow-x: scroll;"></div>
	</div>
 
</template>

<script>
	import * as htmlToImage from 'html-to-image';
	import { toCanvas } from 'html-to-image';
	 import "codemirror/theme/ambiance.css";
	  import "codemirror/lib/codemirror.css";
	  import "codemirror/addon/hint/show-hint.css";
	  import "codemirror/theme/base16-dark.css"
	  
	let CodeMirror = require("codemirror/lib/codemirror");
	  require("codemirror/addon/edit/matchbrackets");
	  require("codemirror/addon/selection/active-line");
	  require("codemirror/mode/javascript/javascript");
	  require("codemirror/addon/hint/show-hint");
	  require("codemirror/addon/hint/javascript-hint");
	export default {
	 name: "codeMirror",
	  components: {
	  },
	  data(){
		  return{
			  code:''
		  }
	  },
	  beforeDestroy(){
		  //销毁前执行一次
		  window.getData=()=>{
			  htmlToImage.toCanvas(this.$refs['mycode'])
			  .then(function (canvas) {
				  //关闭时回传图片
				parent.window.setCodeData(editor.getValue(),canvas)
			 
			  });
		  
		  }
	  },
	  mounted(){
		  document.getElementById("app").style.overflow="hidden"
		  let timoue=null
		  this.$nextTick(()=>{
			  let mime = 'text/javascript'
			          let theme = 'base16-dark'//设置主题，不设置的会使用默认主题
			          let editor = CodeMirror(this.$refs.mycode, {
			            mode: mime,//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
			            indentWithTabs: true,
			            smartIndent: true,
			            lineNumbers: true,
			            matchBrackets: true,
			            theme: theme,
			            // autofocus: true,
			            extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
			            hintOptions: {//自定义提示选项
			              tables: {
			                users: ['name', 'score', 'birthDate'],
			                countries: ['name', 'population', 'size']
			              }
			            }
			          })
			  		editor.setSize('auto','600px');
			          //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
			          /*editor.on('keypress', function () {
			            editor.showHint()
						
			          })*/
					  window.getData=()=>{
						  htmlToImage.toCanvas(this.$refs['mycode'])
						  .then(function (canvas) {
							  //关闭时回传图片
						    parent.window.setCodeData(editor.getValue(),canvas)
						 
						  });

					  }
					  window.setCode=(code)=>{
						  editor.setValue(code)
					  }
					  let _this=this
					  editor.on("change",function(){
						  if(timoue!=null)
						  	clearTimeout(timoue)
						  timoue=setTimeout(()=>{
							parent.window.setCodeData(editor.getValue(),null)
							timoue=null
						  },1000)
					  })
		  })

	  },
	  methods:{
		  test:function(instance){
			  console.log(instance)
		  },
		  log:function(e,a){
			  console.log(e,a)
		  },
		  

	  }
	};
</script>

<style>
	 .codesql {
		 text-align: left;
	    font-size: 11pt;
	    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
	  }
</style>