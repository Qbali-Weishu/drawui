<template>
  <div style="width: 100%; height: 300px;text-align: left;">
	  <section class="try">
	  	<div class="container" style="margin: 0;">
	  		<div class="editor row">
	  			<div class="row">
	  				<div class="span4">
	  					<label class="control-label">编辑器主题</label>
	  					<select class="theme-picker">
	  						<option>Visual Studio</option>
	  						<option>Visual Studio Dark</option>
	  						<option>High Contrast Dark</option>
	  					</select>
	  				</div>
	  			</div>
	  			<div class="span9">
	  				<div class="editor-frame">
	  					<div class="loading editor" style="display: none">
	  						<div class="progress progress-striped active">
	  							<div class="bar"></div>
	  						</div>
	  					</div>
	  					<div id="editor" style="width: 100vw;height: 450px;"></div>
	  				</div>
	  			</div>
	  		</div>
	  		<hr>
	  	</div>
	  </section>
  </div>
</template>

<script>
export default {
	name:"monacoEditor",
  data() {
    return {
      monacoEditor: null,
	  editor:null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
		let _this=this
		this.$nextTick(()=>{
			console.log(window)
			window.callCodeEditor()
		})
	}
  },
};
</script>