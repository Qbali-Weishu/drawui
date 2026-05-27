<template>
	<div id="aspectEdit" style="z-index: 999;;margin-left: 10%;margin-top: -15px;height: 25px;transition: .2s;" :style="{width:`${percent.set?'80%':'30px'}`}" @mouseenter="showInput=true" @mouseleave='showInput=false;mouseAction.down=false'>
	    <div class="setAsp" @click="setSet" :style="{backgroundColor:`${percent.set?'var(--mainColorBlue2)':''}`}">
			<svg t="1662613617770" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top: 3px;" xmlns="http://www.w3.org/2000/svg" p-id="11235" width="20" height="20"><path d="M753.2 201.8v516.9c0 83.4-50.4 241.2-241.2 241.2-190.8 0-241.2-157.8-241.2-241.2V236.3c0-4.4 0.6-43.7 20.9-84.3 28.3-56.8 82.2-88 151.4-88 69.4 0 123.1 31.2 151.4 88 20.3 40.5 20.9 79.9 20.9 84.3v448c0 41.6-27.5 103.4-103.4 103.4-75.8 0-103.4-61.8-103.4-103.4V374.2c0-19 15.5-34.5 34.5-34.5 19.1 0 34.5 15.5 34.5 34.5v310.2c0.4 15.5 6.7 34.5 34.5 34.5s34.1-19 34.5-34.8V236.3c-0.2-17.1-6.1-103.4-103.4-103.4-43.7 0-73 16.3-89.8 49.9-13 26-13.6 53.3-13.6 53.5v482.5c0.2 17.6 6.1 172.3 172.3 172.3 170.4 0 172.3-165.3 172.3-172.3v-517c0-19 15.5-34.5 34.5-34.5 18.9 0.1 34.3 15.5 34.3 34.5z" p-id="11236" fill="#e6e6e6"></path></svg>
		</div>
	    <div v-if="percent.set" @mousemove.stop=""  style="float: left;position:relative;width:65%;height:25px;background-color:transparent;border-radius:10px;display: flex;"><!--border: 2px solid #DFDFDF;-->
			<input v-model="percent.width" @input="inputRatio(0)" class="aspectInput"/>
			<h3 style="margin: 0;padding: 0;width: 20px;line-height: 25px;color:var(--mainTextColor1)">/</h3>
			<input v-model="percent.height" @input="inputRatio(1)" class="aspectInput"/>
		</div>
	</div>
</template>

<script>
	export default{
		name:"aspectRatio",
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
			   showInput:false,
			   percent:{
				   width:0,
				   height:0,
				   set:false
			   },
			   remountedTimeout:null
			   
		    }
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					if(Object.prototype.toString.call(val)=='[object Object]'){
						if(this.remountedTimeout!=null)
							clearTimeout(this.remountedTimeout)
						this.remountedTimeout=setTimeout(()=>{
							this.childrenData_edit=JSON.parse(JSON.stringify(val))
							try{
								this.percent={
									width:this.childrenData_edit.children.width|| '',
									height:this.childrenData_edit.children.height || '',
									set:this.childrenData_edit.children.set|| false
								}
							}catch(e){
								this.realValue={
									width:'',
									height:'',
									set:false
								}
							}
							this.remountedTimeout=null
						},200)
						this.setted=false
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
					if(this.percent.set){
						this.inputValue(null,false)
						this.$emit("preProcess",'aspectRatio',this.childrenData_edit)
					}else{
						this.$emit("preProcess",'aspectRatio',{
							value:"",
							children:{
								width:1,
								height:1,
								set:false
							}
						})
					}
					
				}
				this.$emit("emitPreFun",'aspectRatio',callBack)
			},
			set:function(e){
			   	this.$emit("set","aspectRatio",this.childrenData_edit,function(a,b){return true},this.setted)
				this.setted=false
			},
			inputValue:function(callBack=null,emit=true){
				if(this.setDataValueTime!=null)
					clearTimeout(this.setDataValueTime)
				this.setDataValueTime=setTimeout(()=>{
					this.childrenData_edit.children['width']=this.percent.width
					this.childrenData_edit.children['height']=this.percent.height
					this.childrenData_edit.children['set']=this.percent.set
					if(emit){
						this.setted=true
						this.set()
					}
					this.setDataValueTime=null
					if(callBack){
						callBack()
					}
				},200)
			},
			gcd(a ,b) {
			    let max = a > b ? a : b;    //获取两数之间最大的数
			    let min = a > b ? b : a;    //获取两数之间最小的数
			    let r = max % min;          //获取两数的余数
			    if(r === 0) {
			        return min;
			    }else {
			        return this.gcd(min ,r);
			    }
			},
			setSet:function(){
				this.percent.set=!this.percent.set
				if(this.percent.set){
					//获取当前修改节点Id
					let id=System.getDomList()[0]
					
					//获取长宽值
					try{
						let preWidth=System.requestCssStyle(id).width.children.value
						let preHeight=System.requestCssStyle(id).height.children.value
						
						let widthUnit=System.requestCssStyle(id).width.children.unit
						let heightUnit=System.requestCssStyle(id).height.children.unit
						if(widthUnit===heightUnit){
							let widthValue=preWidth
							let heightValue=preHeight
							if(!isNaN(widthValue) && !isNaN(heightValue)){
								let gcd=this.gcd(widthValue,heightValue)//求最大公因数
								let tempWidth=widthValue,tempHeight=heightValue
								
								//约分
								if(gcd>1){
									
									while(tempWidth % gcd == 0 && tempHeight % gcd == 0 && tempHeight>gcd && tempWidth>gcd){
										tempWidth /= gcd
										tempHeight /= gcd
									}
								}
								
								//比较长度最小值
								tempHeight+=""
								tempWidth+=""
								let numberLength=Math.max(tempHeight.length,tempWidth.length)
								if(numberLength>2){
									tempWidth=tempWidth/Math.pow(10,numberLength-1)
									tempHeight=tempHeight/Math.pow(10,numberLength-1)
								}
								this.percent={
									width:parseFloat(tempWidth).toFixed(2).replace('.00',''),
									height:parseFloat(tempHeight).toFixed(2).replace('.00',''),
									set:true
								}
							}else{
								System.showToast("长宽参数错误",2000)
							}
						}
						else{
							this.percent.set=false
							System.showToast("单位不统一,无法固定比例",2000)
						}
						
					}catch{
						this.percent.set=false
						System.showToast("长或宽数据未设置，无法固定长宽比",2000)
					}
					
				}
				this.setted=true
				this.inputValue()
			},
			inputRatio:function(index){
				if(this.setDataValueTime!=null)
					clearTimeout(this.setDataValueTime)
				this.setDataValueTime=setTimeout(()=>{
					this.setted=true
					this.inputValue(()=>{
						let target=System.getDomList()[0]
						let preCss=System.requestCssStyle(target)
						let preWidth=preCss['width']
						let preHeight=preCss['height']
						//新比例
						let newRatio=this.percent.width/this.percent.height
						if(Math.abs(newRatio-(preWidth.children.value/preHeight.children.value))>=0.01){
							if(index==0){
								//修改横向比例,保持横向不动
								System.styleFactory.width(preWidth,target)				
							}else{
								System.styleFactory.height(preHeight,target)
							}
						}
						target=null
						preCss=null
						preWidth=null
						preHeight=null
						newRatio=null
					})
					
					
				},200)
			}
		}
	}

</script>

<style scoped>
	@import url(./css/aspectRatio.css);
</style>