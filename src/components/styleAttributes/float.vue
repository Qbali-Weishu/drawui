<template>
	<div id="floatEdit">
		<pre style="color: var(--mainTextColor1);margin-left: 0;margin-top: 8px;">浮       动</pre>
		<div @click="callFloatSelect" id="ee" style="cursor: pointer;;color: var(--mainTextColor1);line-height: 35px;font-weight: normal;white-space: nowrap;position:relative;margin-right:20px;float:right;width:45%;height:30px;background-color:transparent;border-radius:10px;margin-top: 8px;">
			<!--button class="floatButton N" @click="chose" style="margin-left: -5%;" id="N" data-float="none" :style="{backgroundColor:`${ realData=='none' ? 'var(--mainColorSelected1)':'transparent' }`,color:`${realData=='none' ? 'var(--mainColorSelected2)':'#323232'}`}">N</button>
			<button class="floatButton L" @click="chose" data-float="left" :style="{backgroundColor:`${ realData=='left' ? 'var(--mainColorSelected1)':'transparent' }`,color:`${realData=='left' ? 'var(--mainColorSelected2)':'#323232'}`}">L</button>
			<button class="floatButton R" @click="chose" data-float="right" :style="{backgroundColor:`${ realData=='right' ? 'var(--mainColorSelected1)':'transparent' }`,color:`${realData=='right' ? 'var(--mainColorSelected2)':'#323232'}`}">R</button>
			<button class="floatButton P" @click="chose" data-float="inherit" :style="{backgroundColor:`${ realData=='inherit' ? 'var(--mainColorSelected1)':'transparent' }`,color:`${ realData=='inherit' ? 'var(--mainColorSelected2)':'#323232'}`}">I</button-->
			{{selected}}
		</div>
		<selectListT @change="setFloatType" ref="selectFloatType" v-if="showFloatSelect" :list="Object.keys(floatList)" @close="showFloatSelect=false" :selected="selected"  style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
	</div>	
</template>

<script>
	import { structStore } from "../../store/struct.js";
	import selectListT from "../microTools/select2.vue"
	export default{
		name:"float",
		components:{
			selectListT
		},
		props:{
		    dataValue:{
		        default:""
		    },
			isGroup:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return{
				setData:"",
				enterValue:"",//传入的参数
				targetDom:null,//要被修改的dom对象
				realData:this.dataValue.value !='' ? this.dataValue.value :'none',//原数据对象
				realDataContion:null,
				realDataDefault:"",//变量绑定时的默认值
				isSameValue:true,
				setStyleTimeout:null,
				spreadEdit:false,//是否展开
				height:"35px",
				spreadRotate:0,
				spreadChange:false,
				store:null,
				bindName:null,//请求变量绑定的组件名称
				setted:false,
				floatList:{
					"无浮动":"none",
					"浮于左侧":"left",
					"浮于右侧":"right",
					"继承父级":"inherit"
				},
				
				showFloatSelect:false
			}
		},
		computed:{
		    VARLIST(){
		        this.store=structStore()
		        return this.store.VARLIST
		    },
			selected(){
				for(let key in this.floatList){
					if(this.floatList[key]==this.realData)
						return key
				}
				return ""
			}
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					if(Object.prototype.toString.call(val)=='[object Object]'){
						this.setted=false
						this.realData=val.children.float || 'none'
						this.realDataContion=val.condition
					}
		        },
		        immediate:true,
		        deep:true
		    },
		    realData:{
		        handler:function(val){
					/*console.log("float",this.realData,this.dataValue.value,this.dataValue.value!='')
		            if(this.setStyleTimeout!=null){
		                clearTimeout(this.setStyleTimeout)
		            }
		            this.setStyleTimeout=setTimeout(()=>{
		                this.set()
		            },200)*/
		            
		        },
		        immediate:true,
		        deep:true
		    },
		    VARLIST:{
		        handler:function(val){
		            if(this.store!=null){
		                //仅当在选择需要绑定的属性名称时才会处理  (this.isSameValue && this.realDataContion!=null)
		                if(this.bindName!=null){//说明原先已经统一绑定变量 调出变量界面一定会经过设置bindName的操作，故可根据bindName确定变量绑定对象
		                    let bind=this.bindName 
							this.setted=true
		                    if(bind!=null && bind.startsWith("$")){
		                        bind=bind.replace("$","")
		                    }
		                    if(this.realDataContion!=null)//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
		                        this.realData=this.store.VARLIST[this.realDataContion.replace("$","")].value  
							this.set()
		                }
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
					this.$emit("preProcess",'float',this.realData)
				}
				this.$emit("emitPreFun",'float',callBack)
			},
			chose:function(e){
				this.setted=true
				this.realData=e.target.dataset.float
				this.set()
			},
			set:function(e,emit){
				let judgeConditon=function(dom){//传给quickEditDom以判断是否绝对定位元素
					try{
						let b=document.getElementById(dom).style.position
						return b!="absolute" && b!="fixed"
					}catch(e){
						console.log("传值错误",e,dom)
					}

				}
			    this.$emit("set","float",{
											value:this.realData,
											condition:this.realDataContion,
											},judgeConditon,this.setted)
				this.setted=false
			},
			requestVar:function(styleName){//请求绑定变量
			    //let attributeName=e.target.dataset.attribute
			    if(this.realDataContion!=null){
			        this.bindName="$"+styleName
			    }else{
			        this.bindName=styleName
			    }
			    let attributeName=this.bindName
			    //this.bindName=styleName//赋值绑定对象
			    try{
			        this.$emit("requestVar",{
			        component:"float",//请求组件名
			        attribute:attributeName,//请求属性值,$开头表示已经绑定，此时通知父组件显示取消绑定按钮
			        })
			    }catch(e){
			    }
			},
			bindVar:function(attribute,varName,varValue){//绑定变量
			    //this.bindName="$"+this.bindName
				this.setted=true
			    if(attribute=="float"){
			        this.realDataContion="$"+varName
			        this.realData=this.store.VARLIST[varName].value
			    }else{
			        this.childrenData_edit[attribute].condition="$"+varName
			        this.childrenData_edit[attribute].value=this.store.VARLIST[varName].value
			    }
				this.set()
			},
			removeBind:function(attribute){//移除变量绑定
				this.setted=true
				if(attribute.startsWith("$")){
						attribute=attribute.replace("$","")
				}
				this.bindName=null
				this.realDataContion=null
				this.realData=100
				this.set()
			},
			setFloatType:function(index){
				this.realData=this.floatList[Object.keys(this.floatList)[index.index]]
				this.setted=true
				this.set()
			},
			callFloatSelect:function(e){
				this.showFloatSelect=true
				this.$nextTick(()=>{
					this.$refs['selectFloatType'].setSpread(e)
				})
			}
		}
	}
</script>

<style scoped>
	@import url(./css/float.css);
</style>
