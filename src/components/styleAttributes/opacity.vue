<template>
	<div id="widthEdit" @mouseenter="showInput=true" @mouseleave='showInput=false;mouseAction.down=false;mouseUp($event)'>
	    <pre style="color: var(--mainTextColor1);float: left;line-height: 35px;">透明度</pre>
		<input @input="input" v-model="opacity" placeholder="100%" :style="{transform:`${showInput?'scale(1)':'scale(0)'}`}" style="transform-origin: center;transition: .2s;width: 50px;height: 35px;position: absolute;left: 0px;top: 0;z-index: 9;background-color:#323232;outline: none;border: none;color: var(--mainTextColor1);text-align: center;line-height: 35px;"/>
	    <div @mousemove.stop=""  @mouseup.stop="mouseUp" style="float: left;position:relative;width:65%;height:30px;background-color:transparent;border-radius:10px;"><!--border: 2px solid #DFDFDF;-->
	       	<div @mousemove.stop="mouseMove" style="position: absolute;left: 0;top: 0;width: 100%;height: 100%;z-index: 2;background-color: transparent;cursor: e-resize;" v-if="mouseAction.down">
	       	</div>
			<div style="display:flex;width:100%;margin-left:10px;height:35px;background-color: transparent;border-radius:10px;overflow:hidden" :style="{boxShadow:`${focus?'0 0 0px 2px var(--mainColorBlue2)':'none'}`}">
	       		<div ref="scrollBar" style="width: 80%;margin-left:10px;height: 6px;background-color:var(--mainColorGrayBg2);border-radius: 10px;margin-top: 15px;position: relative;">
	       			<div  style="height: 6px;z-index: 1;border-radius: 10px;background-color: var(--mainColorBlue2);" :style="{width:`${filterPercent}%`}"></div>
	       			<div @mousedown.stop="startDown($event,'')" style="width: 12px;height: 12px;border-radius: 10px;background-color: white;position: absolute;top: -3px;cursor: e-resize;" :style="{left:`calc(${filterPercent}% - 5px)`}"></div>
	       		</div>
	       </div>
	    </div>
	</div>
</template>

<script>
	export default{
		name:"opacity",
		props:{
		    dataValue:{
		        default:""
		    }
		},
		components:{
		},
		data(){
		    return{
		       setData:"",
		       enterValue:"",//传入的参数
		       targetDom:null,//要被修改的dom对象
		       realDataContion:null,
		       isSameValue:true,
		       setStyleTimeout:null,
		       spreadEdit:false,//是否展开
		       height:65,
		       spreadRotate:0,
		       spreadChange:false,
		       store:null,
		       bindName:null,//请求变量绑定的组件名称
		       
		       thisUnit:"px",
		       realData:this.dataValue,//原数据对象,
		       height:"35px",
		       childrenData:{
		              
		              "boxShadow":{value:0,unit:"",condition:null},
		              "filter":{value:0,unit:"",condition:null},
		              "backdropFilter":{value:0,unit:"",condition:null},
		       },
		       childrenData_group:{
		       		"boxShadow":{value:0,unit:"",condition:null},
		              "filter":{value:0,unit:"",condition:null},
		              "backdropFilter":{value:0,unit:"",condition:null},
		              
		       },
		       childrenData_edit:{},//实际操作数据
		       setted:false,
		       setDataValueTime:null,
		       setTarget:0,//0realData,1各个值

		       showSelectType:false,
		       top:0,
		       focus:false,
		       focusTimeout:null,
		       mouseAction:{
		       	down:false,
		       	startX:0,
		       	target:"X",
		       	deltaX:0,
		       	pre:0
		       },
		       filterPercent:10,
		       scrollBarLeft:0,
		       scrollBarWidth:0,
		       showFilterSelect:false,
			   opacity:"",
			   showInput:false
		    }
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					this.setted=false
					this.effectList=[]
					if(Object.prototype.toString.call(val)=='[object Object]'){
						this.childrenData_edit=JSON.parse(JSON.stringify(val))
						this.filterPercent=(this.childrenData_edit.children.opacity+"") || "1"
						if(!this.filterPercent.endsWith("%") && this.filterPercent*1<1){
							this.filterPercent*=100
						}
						this.opacity=this.filterPercent+"%"
					}
		        },
		        immediate:true,
		        deep:true
		    }
		},
		mounted(){
			this.emitProcess()
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					setTimeout(()=>{
						this.input(()=>{
							this.$emit("preProcess",'opacity',this.childrenData_edit)
						},false)
						
					},200)
					
				}
				this.$emit("emitPreFun",'opacity',callBack)
			},
			set:function(e){
			   	this.$emit("set","opacity",this.childrenData_edit,function(a,b){return true},this.setted)
				this.setted=false
			},
			input:function(callBack=null,emit=true){
				if(this.setDataValueTime!=null)
					clearTimeout(this.setDataValueTime)
				this.setDataValueTime=setTimeout(()=>{
					if(!this.opacity.endsWith("%") && !isNaN(this.opacity)){
						if(this.opacity*1>100){
							this.opacity="100%"
							this.filterPercent=100
						}else if(this.opacity*1<0){
							this.opacity="0%"
							this.filterPercent=0
						}else{
							if(this.opacity*1<1){
								this.filterPercent=this.opacity*100
								this.opacity=this.opacity*100+"%"
								
							}else{
								this.filterPercent=this.opacity*1
								this.opacity+="%"
							}
						}
					}else{
						if(!this.childrenData_edit.value){
							this.opacity="100%"
							this.filterPercent=100
						}else{
							this.opacity=this.childrenData_edit.value+"%"
							this.filterPercent=this.childrenData_edit.value*1
						}
						
					}
					this.childrenData_edit.value=this.filterPercent
					if(emit){
						this.setted=true
						this.set()
					}
					if(callBack!==null && ~Object.prototype.toString.call(callBack).indexOf("Function")){
						callBack()
					}
				},500)
			},
			startDown:function(e,target){
				this.scrollBarLeft=this.$refs['scrollBar'].getBoundingClientRect().x.toFixed(0)*1
				this.scrollBarWidth=this.$refs['scrollBar'].getBoundingClientRect().width.toFixed(0)*1
				this.mouseAction.startX=e.clientX
				this.mouseAction.target=target
				this.mouseAction.down=true
				
			},
			mouseMove:function(e){
				if(this.mouseAction.down){
					if(e.clientX<=(this.scrollBarLeft+this.scrollBarWidth) && e.clientX>=this.scrollBarLeft){
					this.mouseAction.deltaX=e.clientX-this.mouseAction.startX
					this.filterPercent=((e.clientX-this.scrollBarLeft)*100/this.scrollBarWidth).toFixed(0)
					this.childrenData_edit.value=this.filterPercent
					this.opacity=this.filterPercent+"%"
					if(this.setDataValueTime!=null)
						clearTimeout(this.setDataValueTime)
					this.setDataValueTime=setTimeout(()=>{
						this.setted=true
						this.set()
					},50)
					}
				}
			},
			mouseUp:function(e){
				this.mouseAction.down=false
				this.deltaX=0
			},
		}
	}

</script>

<style>
 @import url(./css/opacity.css);
</style>