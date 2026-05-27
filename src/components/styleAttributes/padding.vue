<!--圆角编辑组件-->
<template>
    <div class="qucikEditOut" id="paddingEdit" style="position:relative;height:auto;min-height:65px" :style="{'height':`${height}`}">
       <div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="!spreadEdit" @click="spread">
       	<svg t="1662195973771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27253" style="margin-top: 10px;" width="15" height="15"><path d="M0.042667 749.792759v164.515811A110.075414 110.075414 0 0 0 109.691431 1023.957335h164.515812a54.867047 54.867047 0 1 0 0-109.648765H109.691431V749.792759a54.867047 54.867047 0 1 0-109.648764 0zM329.07429 54.867047A54.867047 54.867047 0 0 0 274.207243 0H109.691431A110.075414 110.075414 0 0 0 0.042667 109.648765v164.515811a54.867047 54.867047 0 1 0 109.648764 0V109.648765h164.515812a54.867047 54.867047 0 0 0 54.867047-54.781718z m365.894088 0c0 30.292071 24.574976 54.781717 54.867047 54.781718h164.515812v164.515811a54.867047 54.867047 0 0 0 109.648765 0V109.648765A110.075414 110.075414 0 0 0 914.351237 0H749.835425a54.867047 54.867047 0 0 0-54.867047 54.867047z m0 914.223241c0 30.292071 24.574976 54.867047 54.867047 54.867047h164.515812A110.075414 110.075414 0 0 0 1024.000002 914.30857V749.792759a54.867047 54.867047 0 1 0-109.648765 0v164.515811H749.835425a54.867047 54.867047 0 0 0-54.867047 54.781718z" p-id="27254" fill="#e6e6e6"></path><path d="M512.021334 261.36511A250.698888 250.698888 0 1 0 729.612268 387.397192a50.08858 50.08858 0 1 0-87.036374 49.83259A150.436398 150.436398 0 1 1 512.021334 361.542269a50.173909 50.173909 0 0 0 0-100.262489z" p-id="27255" fill="#e6e6e6"></path></svg>
       </div>
       <div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-else @click="spread">
       	<svg t="1662196076352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28219" style="margin-top: 9px;" width="18" height="18"><path d="M384 128h-85.33v170.67H128V384h256zM896 384v-85.33H725.33V128H640v256zM725.33 725.33H896V640H640v256h85.33zM298.67 896H384V640H128v85.33h170.67z" p-id="28220" fill="#e6e6e6"></path></svg>
       </div>
		<pre style="color: var(--mainTextColor1);margin-left: 0;">内  边  距</pre>
        <div style="clear: both;"></div>
        <div v-if="!spreadEdit" style="position:relative;margin-left:20%;width:60%;background-color: #323232;height:30px;border-radius:10px;">
            <input id="drawUISetBorderPadding" style="position:absolute;left:0"  @input="setSame()" v-model="realData" />
            <unit style="position:absolute;right:0px;top:5px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="thisUnit" :callBackData="null"></unit>
            <!--button class="styleBindVar" style=";position:absolute;right:-20px" @click="requestVar('padding')">{ }</button-->
        </div>
        
        <div v-if="spreadEdit" style="position:absolute;bottom:160px;left:50%;transform:translateX(-50%)">
            <div class="showForMore">
            <!--:style="{'border-top-left-radius':`${childrenData['borderTopLeftRadius'].value+'px'}`,
            'border-top-right-radius':`${childrenData['borderTopRightRadius'].value+'px'}`,
            'border-bottom-left-radius':`${childrenData['borderBottomLeftRadius'].value+'px'}`,
            'border-bottom-right-radius':`${childrenData['borderBottomRightRadius'].value+'px'}`}"-->
            <!--上-->
            <div style="position:absolute;margin-top:5px;;margin-left:50%;float:left;transform:translateX(-50%);width:80px;height:24px;background-color:var(--mainDarkBg1);border-radius:10px;">
				<input id="drawUISetBorderPadding" style="width:30px;height:20px;position:absolute;left:0"  @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['paddingTop'].value" />
				<unit style="position:absolute;right:3px;top:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['paddingTop'].unit" :callBackData="'paddingTop'" :showLittle="childrenData_edit.children['paddingTop'].condition==null" :style="{right:`${childrenData_edit.children['paddingTop'].condition!=null ? '-10px':'3px'}`}"></unit>
            </div>
             <button class="styleBindVar" style="position:absolute;margin-top:6px;;margin-left:40px;float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'paddingTop')">{ }</button>
            <!--左-->
            <div style="position:absolute;top:40px;;left:20px;float:left;width:42px;height:50px;background-color:var(--mainDarkBg1);border-radius:10px;">
                <input id="drawUISetBorderPadding" style="width:30px;height:20px;position:absolute;left:0" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['paddingLeft'].value" />
                <unit style="position:absolute;right:0px;bottom:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['paddingLeft'].unit" :callBackData="'paddingLeft'" :showLittle="childrenData_edit.children['paddingLeft'].condition==null" :style="{right:`${childrenData_edit.children['paddingLeft'].condition!=null ? '-7px':'0px'}`}"></unit>
            </div>
            <button class="styleBindVar" style="position:absolute;left:-5px;top:50%;transform:translateY(-50%);float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'paddingLeft')">{ }</button>
            <!--右-->
            <div style="position:absolute;top:40px;right:20px;width:42px;height:50px;background-color:var(--mainDarkBg1);border-radius:10px;">
                <input id="drawUISetBorderPadding" style="width:30px;height:20px;position:absolute;left:0" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['paddingRight'].value" />
                <unit style="position:absolute;right:0;bottom:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['paddingRight'].unit" :callBackData="'paddingRight'" :showLittle="childrenData_edit.children['paddingRight'].condition==null" :style="{right:`${childrenData_edit.children['paddingRight'].condition!=null ? '-7px':'0px'}`}"></unit>
            </div> 
            <button class="styleBindVar" style="position:absolute;right:-5px;top:50%;transform:translateY(-50%);float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'paddingRight')">{ }</button>
            <!--下-->
            <div style="position:absolute;bottom:5px;margin-left:50%;float:left;transform:translateX(-50%);width:80px;height:24px;background-color:var(--mainDarkBg1);border-radius:10px;">
                <input id="drawUISetBorderPadding" style="width:30px;height:20px;position:absolute;left:0" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['paddingBottom'].value" />
                <unit style="position:absolute;right:0;top:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['paddingBottom'].unit" :callBackData="'paddingBottom'" :showLittle="childrenData_edit.children['paddingBottom'].condition==null" :style="{right:`${childrenData_edit.children['paddingBottom'].condition!=null ? '-10px':'3px'}`}"></unit>
            </div>
            <button class="styleBindVar" style="position:absolute;bottom:8px;margin-left:40px;float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'paddingBottom')">{ }</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
 @import url(./css/padding.css);
</style>
<script>
import unit from "../microTools/unit.vue"
import StyleEngine from "../../engines/style.js"
import { structStore } from "../../store/struct.js";
export default{
    name:"padding",
    props:{
        dataValue:{
            default:""
        },
        closeSpread:Boolean,
        isGroup:Boolean,//标记是否为组操作
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
            realData:"",//原数据对象
            realDataContion:null,
            isSameValue:true,
            setStyleTimeout:null,
            spreadEdit:false,//是否展开
            height:"65px",
            spreadRotate:0,
            spreadChange:false,
            store:null,
            bindName:null,//请求变量绑定的组件名称
            childrenData:{
                
                "paddingTop":{value:0,unit:"px",condition:null},
                "paddingRight":{value:0,unit:"px",condition:null},
                "paddingBottom":{value:0,unit:"px",condition:null},
                "paddingLeft":{value:0,unit:"px",condition:null},
                
            },
            childrenData_group:{
                
                "paddingTop":{value:"mix",unit:"px",condition:null},
                "paddingRight":{value:"mix",unit:"px",condition:null},
                "paddingBottom":{value:"mix",unit:"px",condition:null},
                "paddingLeft":{value:"mix",unit:"px",condition:null},
                
            },
            childrenData_edit:{},//实际操作数据
    		setted:false,
    		setDataValueTime:null,
    		setTarget:0,//0realData,1各个值
        }
    },
    beforeMount:function(){
        this.childrenData_edit=JSON.parse(JSON.stringify(System.stylePropertype['padding']))
        for(let key in this.childrenData_edit.children){
        	if(!this.childrenData_edit.children[key].value) this.childrenData_edit.children[key].value=0
        	if(!this.childrenData_edit.children[key].unit) this.childrenData_edit.children[key].unit="px"
        }
    },
    computed:{
        VARLIST(){
            this.store=structStore()
            return this.store.VARLIST
        }
    },
    watch:{
        dataValue:{
            handler:function(val){//单独元素时才做修改
    			this.setted=false
				this.realData=""
				this.thisUnit=""
                if(Object.prototype.toString.call(val)=='[object Object]'){
					this.childrenData_edit=JSON.parse(JSON.stringify(val))
					for(let key in this.childrenData_edit.children){
						if(!this.childrenData_edit.children[key].value) this.childrenData_edit.children[key].value=0
						if(!this.childrenData_edit.children[key].unit) this.childrenData_edit.children[key].unit="px"
					}
					let nowText=null,nowUnit=null
					this.isSameValue=true
					for(let name in val.children){
						if(nowText==null && nowUnit==null){
							nowText=val.children[name].value
							nowUnit=val.children[name].unit
							continue
						}
						if(val.children[name].value!=nowText || val.children[name].unit!=nowUnit){
							this.isSameValue=false
							break
						}
					}
					if(!nowText) nowText=0
					if(!nowUnit) nowUnit="px"
					if(this.isSameValue){//所有值一致时
							this.spreadEdit=false
							this.height="65px"
							this.spreadRotate=0
							this.thisUnit=nowUnit
							this.realData=nowText
						
					}
					else{
						if(!this.closeSpread){
						this.spreadEdit=true
						this.spreadRotate=90
						this.height="210px"
						}
					}
                }
            },
            immediate:true,
            deep:true
        },
        childrenData_edit:{
            handler:function(val){
       
            },
            immediate:true,
            deep:true
        },
        realData:{
            handler:function(val){
				
            },
            immediate:true,
            deep:true
        },
        VARLIST:{//监听全局变量数据值变化同时修改绑定修改变量的属性值
            handler:function(val,newVal){
                if(this.store!=null){
                    //仅当在选择需要绑定的属性名称时才会处理  (this.isSameValue && this.realDataContion!=null)
                    if(this.bindName!=null){//说明原先已经统一绑定变量 调出变量界面一定会经过设置bindName的操作，故可根据bindName确定变量绑定对象
                        let bind=this.bindName 
                        if(bind!=null && bind.startsWith("$")){
                            bind=bind.replace("$","")
                        }
                        if(bind=='padding'){
                            if(this.realDataContion!=null)//仅当在已经绑定变量的情况下才会随着变量值改变而改变样式
    						{
    							let value=this.store.VARLIST[this.realDataContion.replace("$","")].value
    							if(value*1+""=='NaN' || value==''){
    								value=0
    							}
    							this.realData=value
    						}
                        }
                        else
                            {
                                if(this.childrenData_edit.children[bind].condition!=null)
    							{
    								let value=this.store.VARLIST[this.childrenData_edit.children[bind].condition.replace("$","")].value
    								if(value*1+""=='NaN' || value==''){
    									value=0
    								}
    								this.childrenData_edit.children[bind].value=value
    							}
                                    
                            }
                           
                    }
                }
            },
            immediate:true,
            deep:true
        },
        isSameValue:{//监听所有值相同时的操作
            handler:function(val){
                if(val){//所有值相同
                    let childVar=null
                    let sameVar=true,condition=null,value,unit
                    for(let key in this.childrenData_edit.children){
                        if(childVar==null){
                            childVar=this.childrenData_edit.children[key]
                            value=this.childrenData_edit.children[key].value
                            unit=this.childrenData_edit.children[key].unit
                            condition=this.childrenData_edit.children[key].condition
                        }else{
                            if(this.childrenData_edit.children[key]!=childVar){
                                sameVar=false;
                                break
                            }
                        }
                    }
                    if(sameVar){//当所有值都绑定同一个变量时，主值也绑定此变量
                        this.realData=value
                        this.thisUnit=unit
                        this.realDataContion=condition
                    }
                }
            }
        }
    },
    created(){
    },
    mounted(){//获取元素信息
		this.emitProcess()
    },
    methods:{
		setSame:function(){
			if(this.setDataValueTime!=null)
				clearTimeout(this.setDataValueTime)
			this.setDataValueTime=setTimeout(()=>{
				for(let key in this.childrenData_edit.children){
					this.childrenData_edit.children[key].value=this.realData*1
					this.childrenData_edit.children[key].unit=this.thisUnit
				}
				this.setted=true
				this.set()
			},200)
		},
		emitProcess:function(){
			let callBack=()=>{
				this.set(false)
				this.$emit("preProcess",'padding',this.childrenData_edit)
			}
			this.$emit("emitPreFun",'padding',callBack)
		},
        spread:function(e){
            this.spreadEdit=!this.spreadEdit
            if(!this.isSameValue)
            	this.nowUnit="px"
			if(this.spreadEdit){//未展开
                this.height="210px"
             }else{
				 
                this.height="65px"
             }
            },
        isSameValueFun:function(value){//检测是否是相同的值
            return value.split(" ").length==1
        },
        set:function(emit=true){
    		this.$emit("set","padding",this.childrenData_edit,()=>{return true},this.setted)
			this.setted=false
        },
        littleSet:function(option,callback=null){
    		this.setted=true
            if(option=="add"){
                if(callback==null){
    				this.setTarget=0
                    if(this.realData*1+""!="NaN")
                        this.realData++
                    else
                        this.realData=1
                }else{//单独角修改
    				this.setTarget=1
                    if(this.childrenData_edit.children[callback].value*1+""!="NaN")
                        this.childrenData_edit.children[callback].value++
                    else
                        this.childrenData_edit.children[callback].value=1
                }
                
            }else{
                if(callback==null){
    				this.setTarget=0
                    if(this.realData*1+""!="NaN")
                        this.realData--
                    else
                        this.realData=0
                }else{//单独角修改
    				this.setTarget=1
                    if(this.childrenData_edit.children[callback].value*1+""!="NaN")
                        this.childrenData_edit.children[callback].value--
                    else
                        this.childrenData_edit.children[callback].value=0
                }
            }
            this.set()
        },
        unitChange:function(pre,now,callBack){//原单位、现单位
    		this.setted=true
            let data
            let editCondition=false
            if(callBack=="padding"){
                data=this.realData
                editCondition=this.realDataContion!=null
            }
            else{
                data=this.childrenData[callBack].value
                editCondition=this.childrenData[callBack].condition!=null
            }
            this.$emit("changeUnit",
                function(Data,target,nowUnit,pre,condition){
                    let sumForLeftRight=function(dom){
                        let preX=StyleEngine.getStandard(dom,pre)[0]//获取原单位长度
                        let nowX=StyleEngine.getStandard(dom,nowUnit)[0]//获取新单位长度
                        let rate=nowX/preX//宽度比例
                        Data=Data/rate
                        Data=Data.toFixed(3)*1
    					preX=null
    					nowX=null
    					rate=null
                    }
                    let sumForTopBottom=function(dom){
                        let preY=StyleEngine.getStandard(dom,pre)[1]//获取原单位长度
                        let nowY=StyleEngine.getStandard(dom,nowUnit)[1]//获取新单位长度
                        let rate=nowY/preY//宽度比例
                        Data=Data/rate
                        Data=Data.toFixed(3)*1
    					preY=null
    					nowY=null
    					rate=null
                    }
                    Object.keys(this.choseGroup).forEach(dom =>{
                    if(target=="padding"){
                        for(let key in this.LoadList["padding"].children){
                            if(key == "paddingLeft" || key =="paddingRight"){
                                if(!condition)
                                    sumForLeftRight(dom);//padding-left和padding-right按照原来的处理
                            }else{
                                if(!condition)
                                    sumForTopBottom(dom)//padding-top和padding-top要转换，以防止%等单位问题
                            }
                            this.LoadList["padding"].children[key].value=Data
                            document.getElementById(dom).style[key]=Data+nowUnit
                        }
                    }else{
                        if(target=="paddingLeft" || target=="paddingRight"){
                            if(!condition)
                                sumForLeftRight(dom)
                        }
                        else{
                            if(!condition)
                                sumForTopBottom(dom)
                        }
                        this.LoadList["padding"]["children"][target].value=Data+nowUnit
                        document.getElementById(dom).style[target]=Data+nowUnit
                        }
                }
            )},data,callBack,now,pre,editCondition)
            this.set()
        },
        requestVar:function(e,name){//请求绑定变量
            this.$emit("requestVar",e,"padding.children."+name,this.childrenData_edit.children[name].condition)
        },
        bindVar:function(attribute,varName,varValue){//绑定变量
    		this.setted=true
            //this.bindName="$"+this.bindName
            if(attribute=="padding"){
                this.thisUnit="px"
                this.realDataContion="$"+varName
    			let value=this.store.VARLIST[varName].value
    			if(value*1+""=='NaN' || value==''){
    				value=0
    			}
    			this.setTarget=0
                this.realData=value
            }else{
                this.childrenData_edit.children[attribute].condition="$"+varName
    			let value=this.store.VARLIST[varName].value
                if(value*1+""=='NaN' || value==''){
                	value=0
                }
    			this.setTarget=1
    			this.childrenData_edit.children[attribute].value=value
                this.childrenData_edit.children[attribute].unit="px"
            }
    		this.set()
        },
        removeBind:function(attribute){//移除变量绑定
    	this.setted=true
            if(attribute.startsWith("$")){
                attribute=attribute.replace("$","")
            }
            this.bindName=null
            if(attribute=="padding"){
                this.thisUnit="px"
                this.realDataContion=null
    			this.setTarget=0
                this.realData=0
                for(let key in this.childrenData_edit.children){
                    this.childrenData_edit.children[key].condition=null
                    this.childrenData_edit.children[key].value=0
                    this.childrenData_edit.children[key].unit="px"
                }
            }else{
    			this.setTarget=1
                if(this.realDataContion!=null){//原先为统一绑定
                    this.realDataContion=null
                    this.isSameValue=false
                }
                this.childrenData_edit.children[attribute].condition=null
                this.childrenData_edit.children[attribute].value=0
                this.childrenData_edit.children[attribute].unit="px"
            }
    		this.set()
        }
    }
}
</script>