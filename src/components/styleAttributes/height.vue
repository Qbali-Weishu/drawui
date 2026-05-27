<!--宽度编辑组件-->
<template>
    <div id="heightEdit" style="margin-top: -15px;">
        <pre style="color: var(--mainTextColor1);">高  度</pre>
        <div style="position:relative;margin-right:20px;float:right;width:50%;height:30px;background-color:transparent;border-radius:10px;">
            <input @input="input" id="drawUISetHeight"  v-model="realData"/>
            <unit style="position:absolute;right:0;top:7px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="thisUnit"></unit>
            <button class="styleBindVar" style=";position:absolute;right:-20px;top:0" :data-attribute="bindName" @click="requestVar('height')">{ }</button>
        </div>
		<!--分割线-->
		<div style='clear: none;width:0px;height:0px'></div>
		<div style="float: left;;border-bottom: 1px solid var(--mainColorGrayBg2);width: 90%;height: 1px;background-color: transparent;position: relative;clear: both;margin-left: 5%;margin-top: 12px;"></div>
		
    </div>
</template>
<style scoped>
	@import url(./css/height.css);
</style>
<script>
import unit from "../microTools/unit.vue"
import StyleEngine from "../../engines/style.js"
import { structStore } from "../../store/struct.js";
export default{
    name:"height",
    props:{
        dataValue:{
            default:""
        }
    },
    components:{
        unit
    },
    data(){
        return{
            setData:"",
            thisUnit:"px",
            enterValue:"",//传入的参数
            targetDom:null,//要被修改的dom对象
            realData:this.dataValue,//原数据对象
            realDataContion:null,
			realDataDefault:"",
            isSameValue:true,
            setStyleTimeout:null,
            spreadEdit:false,//是否展开
            height:"35px",
            spreadRotate:0,
            spreadChange:false,
            store:null,
            bindName:null,//请求变量绑定的组件名称
			setValueTimeout:null,
			setted:false
        }
    },
    beforeMount(){

    },
    computed:{
        VARLIST(){
            this.store=structStore()
            return this.store.VARLIST
        }
    },
    watch:{
        dataValue:{
            handler:function(val){
				this.setted=false
				if(Object.prototype.toString.call(val)=='[object Object]'){
					this.childrenData_edit=JSON.parse(JSON.stringify(val))
					try{
						this.realData=this.childrenData_edit.children.value || 0
						this.thisUnit=this.childrenData_edit.children.unit || 'px'
						this.realDataContion=this.childrenData_edit.condition
					}catch(e){
						console.error(e)
						this.realData=200
						this.thisUnit="px"
					}
				}
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
                        if(bind!=null && bind.startsWith("$")){
                            bind=bind.replace("$","")
                        }
                        
                        if(this.realDataContion!=null){
							let value=this.store.VARLIST[this.realDataContion.replace("$","")].value
							if(value*1+""=='NaN'  || value==''){
								value=0
							}
							this.realData=this.store.VARLIST[this.realDataContion.replace("$","")].value
						}//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
                    }
            }
            },
            immediate:true,
            deep:true
        }
    },
    mounted(){//获取元素信息
	this.emitProcess()
    },
    methods:{
		emitProcess:function(){
			let callBack=()=>{
				setTimeout(()=>{
					this.set(false)
					this.$emit("preProcess",'height',this.childrenData_edit)
				},200)
				
			}
			this.$emit("emitPreFun",'height',callBack)
		},
        set:function(emit=true){
			this.childrenData_edit.children['value']=this.realData	
			this.childrenData_edit.children['unit']=this.thisUnit
			this.childrenData_edit.condition=this.realDataContion
			if(emit)
				this.$emit("set","height",this.childrenData_edit,()=>{return true},this.setted)
			this.setted=false
        },
        littleSet:function(option){
			console.log("set",this.setted)
			try{
				this.setted=true
				console.log("set",this.setted)
				if(option=="add"){
				    this.realData++
				}else{
				    this.realData--
				}
				console.log("set",this.setted)
				this.set()
			}catch(e){
				console.error(e)
			}
          
        },
        unitChange:function(pre,now){//原单位、现单位
            /*this.$emit("changeUnit",
                function(pre,now,preData,condition){
                    console.log(pre,"now",now)
                    Object.keys(this.choseGroup).forEach(dom =>{
                    document.getElementById("drawUISetHeight").value=preData
                    if(!condition){
                        let preY=StyleEngine.getStandard(dom,pre)[1]//获取原单位长度
                        let nowY=StyleEngine.getStandard(dom,now)[1]//获取新单位长度
                        let rate=nowY/preY//宽度比例
                        preData=preData/rate
                        preData=preData.toFixed(4)*1
                    }
                    document.getElementById(dom).style["height"]=preData+now
                    this.LoadList["height"]["value"]=preData+now
                }
            )},pre,now,this.realData,this.realDataContion!=null)*/
			this.setted=true
			this.thisUnit=now
			this.set()
        },
        requestVar:function(e){//请求绑定变量
        	this.$emit("requestVar",e,"height",this.realDataContion)
        },
        bindVar:function(attribute,varName,varValue){//绑定变量
            //this.bindName="$"+this.bindName
            if(attribute=="height"){
                this.thisUnit="px"
                this.realDataContion="$"+varName
                this.realData=this.store.VARLIST[varName].value
            }else{
                this.childrenData_edit[attribute].condition="$"+varName
                this.childrenData_edit[attribute].value=this.store.VARLIST[varName].value
                this.childrenData_edit[attribute].unit="px"
            }
        },
        removeBind:function(attribute){//移除变量绑定
            if(attribute.startsWith("$")){
                attribute=attribute.replace("$","")
            }
            this.bindName=null
            this.thisUnit="px"
            this.realDataContion=null
            this.realData=100
        },
		input:function(){
			if(this.setValueTimeout!=null)
				clearTimeout(this.setValueTimeout)
			this.setValueTimeout=setTimeout(()=>{
				this.setted=true
				this.set()
				this.realData*=1
				this.setValueTimeout=null
			},200)
		}
    }
}
</script>
