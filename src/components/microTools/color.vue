<template>
	<div style="height: 270px;background-color: white;z-index: 99999;" >
	    <Chrome :colorInner='colors' @colorSet='colorSet' style="box-shadow: none;z-index: 99999;" v-if="show"></Chrome>
		<button @click="close" style="background-color: white;position: absolute;bottom:5px;right:60px;padding: 0;width: 60px;height: 25px;border-radius: 5px;color: var(--mainColorBlue2);box-sizing: border-box;border: 1px solid var(--mainColorBlue2);">取消</button>
		<button @click="returnColor" style="background-color: var(--mainColorBlue2);position: absolute;bottom:5px;right: 5px;padding: 0;width: 50px;height: 25px;border-radius: 5px;color: white;border: 1px solid var(--mainColorBlue2);;">确认</button>
	</div>
</template>
<script>
import Chrome from "vue-color/src/components/Chrome.vue";
export default {
  name: "colorBord",
  props:{
	  immediate:{
		  type:Boolean,
		  default:false
	  },
	  pre:{
	  		  type:String,
	  		  default:"#FFF"
	  },
  },
  components: {
    Chrome,
  },
  data() {
    return {
		show:false,
		colors: {
        color: "",
        hex: "",
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1,
      },
		color:'#fff',
		preColor:"#FFF"
	}
	
  },
  beforeMount(){
		if(!this.pre)
			this.preColor="#ffffff"
		else
			this.preColor=(this.pre!='mix'?this.pre:'#FFFFFF')+""
		this.colors.color=this.preColor
	  
		let reg=new RegExp(/(#|rgba\(|rgb\(|hsl|hsv){1}/g)
		if((this.preColor=='mix') || (reg.test(this.preColor))){
		  this.show=true
		}
		else{
			alert("颜色值不合法 请使用 hex / rgb / hsl 颜色格式")
			this.show=false
			this.close()
		}
  },
  methods: {
    // 值改变事件
    updateValue(value) {
    },
	close:function(e){
		if(this.immediate && this.show){//若为即时模式，则取消之后需要回复原值
			this.$emit("colorSet",this.preColor)
		}
		this.$emit('closeColorBord')
	},
	colorSet:function(colory){
		try{
			
			this.color=colory.hex8
			if(this.immediate){
				//if(colory.rgba.a!=1)
				this.$emit("colorSet",colory.hex8)
				/*else
					this.$emit("colorSet",this.color)*/
			}
		}catch(e){
		}

	},
	returnColor:function(){
		this.$emit("colorSet",this.color)
		this.$emit('closeColorBord')
	}
  }
}
</script>
