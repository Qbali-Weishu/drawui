<template>
	<div class="qucikEditOut" id="radiusEdit" style="position:relative;height:auto;min-height:35px;height: 40px;" >
		<!--展开三角-->
	    <pre class="styleTitle" style="color: var(--mainTextColor1);margin-left: 0px;float: left;line-height: 45px;">背景混合</pre>
		<!--展开-->
	    <div style="float: left;width: 60%;margin-left: 5%;position: relative;position: relative;min-height: 30px;;padding-bottom: 5px;margin-top: 5px;">
			<div @click="callFilterSelect" style="float: right;width: 100px;height: 25px;position: relative;cursor: pointer;transition: .2s;border-radius: 10px;margin-top: 5px;margin-right: -24px;" class="filterTypeButton">
					<h3 style="width: calc(100% - 30px);text-align: center;margin: 0;padding: 0;float: left;color: var(--mainTextColor1);font-weight: normal;font-size: 12px;margin-top: 3px;margin-left: 3px;">{{selected}}</h3>
					<svg t="1662188293303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3179" style="float: left;margin-top: 8px;margin-left: 5px;" width="10" height="10"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="3180" fill="#e6e6e6"></path></svg>
			</div>
			<selectListT @change="setFilterType" ref="selectFilterType" v-if="showFilterSelect" :selected="selected" :list="Object.keys(filterList)" @close="showFilterSelect=false"   style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 999999;" :width="'80px'"></selectListT>
	    </div>
		<div style="border-bottom: 1px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;"></div>
	</div>
</template>

<script>
	import selectListT from "../microTools/select2.vue"
	export default{
		name:"mixBlendMode",
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
			return {
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
				
				filterTypeIndex:"",
				showFilterSelect:false,
				filterList:{
					"正常":"normal",//px
					"正片叠底":"multiply",//percent
					'滤色':'screen',//percent
					"叠加":'overlay',
					'变暗':"darken",//percent
					"变亮":"lighten",
					"颜色减淡":"color-dodge",//deg
					"颜色加深":"color-burn",//percent
					"强光":"hard-light",//percent
					"柔光":"soft-light",//percent
					"差值":"difference",//percent
					"排除":"exclusion",//String
					"色相":'hue',
					'饱和度':"saturation",
					"颜色":"color",
					"明度":"luminosity",
					"默认":"initial",
					"继承":"inherit",
					"复原":"unset",
				},
				blendMode:"",
				selected:""
			}
		},
		watch:{
		    dataValue:{
		        handler:function(val){
					this.setted=false
					this.effectList=[]
					if(Object.prototype.toString.call(val)=='[object Object]'){
						this.childrenData_edit=JSON.parse(JSON.stringify(val))
						if(this.childrenData_edit.children.mixBlendMode==""){
							this.childrenData_edit.children.mixBlendMode="normal"
							this.selected="正常"
						}else{
							for(let key in this.filterList){
								if(this.filterList[key]==this.childrenData_edit.children.mixBlendMode){
									this.selected=key
									break
								}
							}
						}
						
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
		computed:{

		},
		mounted(){
			this.emitProcess()
		},
		methods:{
			emitProcess:function(){
				let callBack=()=>{
					this.$emit("preProcess",'mixBlendMode',this.childrenData_edit)
				}
				this.$emit("emitPreFun",'mixBlendMode',callBack)
			},
			set:function(e){
			   	this.$emit("set","mixBlendMode",this.childrenData_edit,function(a,b){return true},this.setted)
				this.setted=false
			},
			callFilterSelect:function(e){
				this.showFilterSelect=true
				this.$nextTick(()=>{
					if(screen.height-e.clientY<400){
						this.$refs['selectFilterType'].setSpread({clientX:e.clientX,clientY:screen.height-450})
					}else{
						this.$refs['selectFilterType'].setSpread(e)
					}
				})
			},
			setFilterType:function(index){
				let mixIndex=Object.keys(this.filterList)[index.index]
				this.selected=mixIndex
				this.childrenData_edit.children['mixBlendMode']=this.filterList[mixIndex]
				this.setted=true
				this.set()
			},
		}
	}
</script>

<style scoped>
	@import url(./css/mixBlendMode.css);
</style>