<template>
  <div style="width: 80vw; height: 80vh;text-align: left;background-color: white;padding: 10px;margin-top: 40px;"  @mousedown="mouseDown" @mousemove="mouseMove">
	  <section class="try" style="margin: 0;">
	  	<div class="container" style="margin: 0;">
	  		<div class="editor row" style="padding: 0;">
	  			<!--div class="row">
	  				<div class="span4">
	  					<label class="control-label">编辑器主题</label>
	  					<select class="theme-picker">
	  						<option>Visual Studio</option>
	  						<option>Visual Studio Dark</option>
	  						<option>High Contrast Dark</option>
	  					</select>
	  				</div>
	  			</div-->
	  			<div class="span9">
	  				<div class="editor-frame">
	  					<div class="loading editor" style="display: none">
	  						<div class="progress progress-striped active">
	  							<div class="bar"></div>
	  						</div>
	  					</div>
	  					<div id="editor" style="width: calc(80vw - 20px);height:calc(80vh - 70px)"></div>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	  </section>
  </div>
</template>

<script>
	import * as htmlToImage from 'html-to-image';
	import { toCanvas } from 'html-to-image';
export default {
	name:"monacoEditor",
	props:{
		hasScale:{
			type:Boolean,
			default:false
		}
	},
  data() {
    return {
      monacoEditor: null,
	  editor:null,
	  timeout:null,
	  parentScale:this.hasScale
    };
  },
  watch:{
	  hasScale:{
		  handler:function(value){
			  this.parentScale=value
		  },
		  immediate:true
	  }
  },
  mounted() {
	
  },
  methods: {
    init(preCode) {


		this.$nextTick(()=>{
			window.callCodeEditor(preCode)
		})
	},
	getTextCanvas(callBack){
		let text=window.getEditorValue()
		htmlToImage.toCanvas(document.getElementById("editor"))
		.then(function (canvas) {
		//关闭时回传图片
			callBack(text,canvas)
					 
		});
	},
	setMove:function(scale=null){
		if(scale==null)
			this.parentScale=this.hasScale
		else
			this.parentScale=scale
	},
	mouseDown:function(e){
		if(!this.parentScale){
			e.stopPropagation()
		}
	},
	mouseMove:function(e){
		if(!this.parentScale){
			e.stopPropagation()
		}
	},
  },
};
</script>