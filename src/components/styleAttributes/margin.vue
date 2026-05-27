<!--圆角编辑组件-->
<template>
    <div class="qucikEditOut" id="marginEdit" style="position:relative;height:auto;min-height:65px;transition: .2s;" :style="{'height':`${height}`}">
        <!--button class="spreadButton" id="spreadButton_margin" @click="spread" :style="{'transform':`rotate(${spreadRotate}deg)`}" style="float:left;margin-left:3px;margin-top:10px;background-color:var(--mainTextColor1);"></button-->
        <div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-if="!spreadEdit" @click="spread">
        	<svg t="1662195973771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27253" style="margin-top: 10px;" width="15" height="15"><path d="M0.042667 749.792759v164.515811A110.075414 110.075414 0 0 0 109.691431 1023.957335h164.515812a54.867047 54.867047 0 1 0 0-109.648765H109.691431V749.792759a54.867047 54.867047 0 1 0-109.648764 0zM329.07429 54.867047A54.867047 54.867047 0 0 0 274.207243 0H109.691431A110.075414 110.075414 0 0 0 0.042667 109.648765v164.515811a54.867047 54.867047 0 1 0 109.648764 0V109.648765h164.515812a54.867047 54.867047 0 0 0 54.867047-54.781718z m365.894088 0c0 30.292071 24.574976 54.781717 54.867047 54.781718h164.515812v164.515811a54.867047 54.867047 0 0 0 109.648765 0V109.648765A110.075414 110.075414 0 0 0 914.351237 0H749.835425a54.867047 54.867047 0 0 0-54.867047 54.867047z m0 914.223241c0 30.292071 24.574976 54.867047 54.867047 54.867047h164.515812A110.075414 110.075414 0 0 0 1024.000002 914.30857V749.792759a54.867047 54.867047 0 1 0-109.648765 0v164.515811H749.835425a54.867047 54.867047 0 0 0-54.867047 54.781718z" p-id="27254" fill="#e6e6e6"></path><path d="M512.021334 261.36511A250.698888 250.698888 0 1 0 729.612268 387.397192a50.08858 50.08858 0 1 0-87.036374 49.83259A150.436398 150.436398 0 1 1 512.021334 361.542269a50.173909 50.173909 0 0 0 0-100.262489z" p-id="27255" fill="#e6e6e6"></path></svg>
        </div>
        <div style="width: 20px;height: 30px;cursor: pointer;float: right;" v-else @click="spread">
        	<svg t="1662196076352" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28219" style="margin-top: 9px;" width="18" height="18"><path d="M384 128h-85.33v170.67H128V384h256zM896 384v-85.33H725.33V128H640v256zM725.33 725.33H896V640H640v256h85.33zM298.67 896H384V640H128v85.33h170.67z" p-id="28220" fill="#e6e6e6"></path></svg>
        </div>
		<div v-if="showPin" style="width: 20px;height: 30px;cursor: pointer;float: right;margin-right: 8px;" @click="setEditMore">
			<svg t="1666520310121" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11047" style="margin-top: 9px;" width="18" height="18"><path d="M509.200032 0.01163C332.702036 1.511613 191.403641 144.509989 192.003634 321.007984c0.499994 162.998149 122.998603 297.396622 280.996809 316.596404 3.999955 0.499994 6.99992 3.899956 6.99992 7.899911V992.000363c0 17.699799 14.299838 31.999637 31.999637 31.999637s31.999637-14.299838 31.999637-31.999637V645.604298c0-4.099953 2.999966-7.399916 7.099919-7.899911C709.397758 618.404607 831.996366 483.506139 831.996366 320.007996 831.996366 142.310014 687.19801-1.488353 509.200032 0.01163zM692.997944 501.00594c-23.499733 23.499733-50.899422 41.999523-81.399075 54.899376-31.499642 13.299849-64.999262 20.099772-99.598869 20.099772s-68.099227-6.799923-99.598869-20.099772C381.901478 543.005463 354.501789 524.505673 331.002056 501.00594c-23.499733-23.499733-41.999523-50.899422-54.899377-81.399076-13.299849-31.499642-20.099772-64.999262-20.099772-99.598868 0-34.599607 6.799923-68.099227 20.099772-99.598869 12.899853-30.499654 31.399643-57.899342 54.899377-81.399076 23.499733-23.499733 50.899422-41.999523 81.399075-54.899376C443.900773 70.810826 477.400393 64.010903 512 64.010903s68.099227 6.799923 99.598869 20.099772C642.098522 97.010528 669.498211 115.510318 692.997944 139.010051c23.499733 23.499733 41.999523 50.899422 54.899377 81.399076 13.299849 31.499642 20.099772 64.999262 20.099772 99.598869 0 34.599607-6.799923 68.099227-20.099772 99.598868-12.899853 30.499654-31.399643 57.899342-54.899377 81.399076z" p-id="11048" fill="#ffffff"></path></svg>
		</div>
		<pre style="color: var(--mainTextColor1);margin-left: 0;">外  边  距</pre>
        <div style="clear: both;"></div>
        <div v-if="!spreadEdit" style="position:relative;margin-left:20%;width:60%;height:30px;background-color:transparent;border-radius:10px;background-color: #323232;">
            <input id="drawUISetBorderMargin" style="position:absolute;left:0" @input="setSame()" v-model="realData" />
            <unit style="position:absolute;right:0px;top:5px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="thisUnit" :callBackData="null"></unit>
            <!--button class="styleBindVar" style=";position:absolute;right:-20px" @click="requestVar('margin')">{ }</button-->
        </div>
        
        <div v-if="spreadEdit" style="position:absolute;bottom:1px;left:50%;transform:translateX(-50%);">
            <div class="showForMore">
            <!--:style="{'border-top-left-radius':`${childrenData['borderTopLeftRadius'].value+'px'}`,
            'border-top-right-radius':`${childrenData['borderTopRightRadius'].value+'px'}`,
            'border-bottom-left-radius':`${childrenData['borderBottomLeftRadius'].value+'px'}`,
            'border-bottom-right-radius':`${childrenData['borderBottomRightRadius'].value+'px'}`}"-->
            <!--上-->
            <div style="position:relative;margin-top:-40px;;margin-left:50%;float:left;transform:translateX(-50%);width:80px;height:24px;background-color:#323232;border-radius:10px;">
                <input id="drawUISetBorderMargin" style="width:30px;height:20px;position:absolute;left:8px;text-align:center" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['marginTop'].value" />
                <unit style="position:absolute;right:3px;top:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['marginTop'].unit" :callBackData="'marginTop'" :showLittle="childrenData_edit.children['marginTop'].condition==null" :style="{right:`${childrenData_edit.children['marginTop'].condition!=null ? '-10px':'3px'}`}"></unit>
            </div>
             <button class="styleBindVar" style="position:relative;margin-top:-40px;;margin-left:83px;float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'marginTop')">{ }</button>
            <!--左-->
            <div style="position:relative;margin-top:20px;;margin-left:-55px;float:left;width:42px;height:50px;background-color:#323232;border-radius:10px;">
                <input id="drawUISetBorderMargin" style="width:30px;height:20px;position:absolute;left:4px;text-align:center" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['marginLeft'].value" />
                <unit style="position:absolute;right:0px;bottom:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['marginLeft'].unit" :callBackData="'marginLeft'" :showLittle="childrenData_edit.children['marginLeft'].condition==null" :style="{right:`${childrenData_edit.children['marginLeft'].condition!=null ? '-7px':'0px'}`}"></unit>
            </div>
            <button class="styleBindVar" style="position:absolute;left:-48px;bottom:-20px;transform:translateY(-50%);float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'marginLeft')">{ }</button>
            <!--右-->
            <div style="position:relative;margin-top:20px;;margin-right:-55px;float:right;width:42px;height:50px;background-color:#323232;border-radius:10px;">
                <input id="drawUISetBorderMargin" style="width:30px;height:20px;position:absolute;left:4px;text-align:center" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['marginRight'].value" />
                 <unit style="position:absolute;right:0;bottom:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['marginRight'].unit" :callBackData="'marginRight'" :showLittle="childrenData_edit.children['marginRight'].condition==null" :style="{right:`${childrenData_edit.children['marginRight'].condition!=null ? '-7px':'0px'}`}"></unit>
            </div> 
            <button class="styleBindVar" style="position:absolute;right:-48px;bottom:-20px;transform:translateY(-50%);float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'marginRight')">{ }</button>
            <!--下-->
            <div style="position:relative;margin-top:101px;margin-left:50%;float:left;transform:translateX(-50%);width:80px;height:24px;background-color:#323232;border-radius:10px;">
                <input id="drawUISetBorderMargin" style="width:30px;height:20px;position:absolute;left:8px;text-align:center" @input="setted=true;setTarget=1;set()" v-model="childrenData_edit.children['marginBottom'].value" />
				<unit style="position:absolute;right:0;top:2px;" @unitChange="unitChange" @littleSet="littleSet" :defaultUnit="childrenData_edit.children['marginBottom'].unit" :callBackData="'marginBottom'" :showLittle="childrenData_edit.children['marginBottom'].condition==null" :style="{right:`${childrenData_edit.children['marginBottom'].condition!=null ? '-10px':'3px'}`}"></unit>
            </div>
            <button class="styleBindVar" style="position:absolute;bottom:-35px;left:83px;float:left;width:30px;height:24px;background-color:transparent;border-radius:10px;overflow:hidden" :data-attribute="bindName" @click="requestVar($event,'marginBottom')">{ }</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
pre{
    font-weight:normal;
    padding:0;
    margin:0;
    font-family: 'Sail';
    font-style: normal;
    height: 30px;
    float: left;
    margin-left: 10px;
    text-align: left;
    color: var(--mainColorGray8A);
    line-height: 30px;
}
.qucikEditOut{
	overflow: hidden;
    transition: 0s;
    position: relative;
    height: 35px;
    width:90%;
	margin-left:5%;
    padding: 0;
    border-radius: 10px;
    background-color:transparent;
    border-bottom: 1px solid var(--mainColorGray);
}
#drawUISetBorderMargin{
    background-color: transparent;
    text-align: left;
    height: 30px;
    color:var(--mainTextColor1)/*var(--mainColorGray2)*/;
    outline: none;
    border: none;
    margin-right: 5px;
    font-weight: normal;
	text-align: center;
    width:calc(100% - 40px);
}
.showForMore{
    position: relative;
    width:80px;
    margin-left: 50%;
    margin-top: 0px;
    transform: translateX(-50%);
    height: 95px;
    box-sizing:border-box;
    border:3px solid var( --mainColorWhite1);
	border-radius: 5px;
    background-color: transparent;
}
</style>
<script>
import unit from "../microTools/unit.vue"
import StyleEngine from "../../engines/style.js"
import { structStore } from "../../store/struct.js";
export default{
    name:"margin",
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
            realData:this.dataValue,//原数据对象
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
                
                "marginTop":{value:0,unit:"px",condition:null},
                "marginRight":{value:0,unit:"px",condition:null},
                "marginBottom":{value:0,unit:"px",condition:null},
                "marginLeft":{value:0,unit:"px",condition:null},
                
            },
            childrenData_group:{
                
                "marginTop":{value:"mix",unit:"px",condition:null},
                "marginRight":{value:"mix",unit:"px",condition:null},
                "marginBottom":{value:"mix",unit:"px",condition:null},
                "marginLeft":{value:"mix",unit:"px",condition:null},
                
            },
            childrenData_edit:{},//实际操作数据
			setted:false,
			setDataValueTime:null,
			setTarget:0,//0realData,1各个值
			showPin:false
        }
    },
    beforeMount:function(){
        /*if(this.isGroup){
            this.childrenData_edit=this.childrenData_group
            this.realData="mix"
            this.thisUnit="px"
        }else{
            this.childrenData_edit=this.childrenData
        }*/
		this.childrenData_edit=JSON.parse(JSON.stringify(System.stylePropertype['margin']))
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
				
                if(Object.prototype.toString.call(val)=='[object Object]'){
					this.childrenData_edit=JSON.parse(JSON.stringify(val))
					let nodeKeys=Object.keys(System.operatingNodes)
					this.showPin=false
					if(nodeKeys.length==1){
						if(!System.metaData.STYLESTRUCT[nodeKeys[0]].style.position) this.showPin=true
						else{
							if(!['absolute','fixed','sticky'].includes(System.metaData.STYLESTRUCT[nodeKeys[0]].style.position.children.position)){
								this.showPin=true
							}
						}
					}
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
        VARLIST:{//监听全局变量数据值变化同时修改绑定修改变量的属性值
            handler:function(val,newVal){
                if(this.store!=null){
                    //仅当在选择需要绑定的属性名称时才会处理  (this.isSameValue && this.realDataContion!=null)
                    if(this.bindName!=null){//说明原先已经统一绑定变量 调出变量界面一定会经过设置bindName的操作，故可根据bindName确定变量绑定对象
                        let bind=this.bindName 
                        if(bind!=null && bind.startsWith("$")){
                            bind=bind.replace("$","")
                        }
                        if(bind=='margin'){
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
				this.$emit("preProcess",'margin',this.childrenData_edit)
			}
			this.$emit("emitPreFun",'margin',callBack)
		},
        spread:function(e){
			if(!this.childrenData_edit.children){
				this.childrenData_edit=JSON.parse(JSON.stringify(System.stylePropertype.margin))
			}else{
				const key=['marginTop','marginRight','marginLeft','marginBottom']
				for(let i=0;i<4;i++){
					if(!this.childrenData_edit.children[key[i]]){
						this.childrenData_edit.children[key[i]]=JSON.parse(JSON.stringify(System.stylePropertype.margin.children[key[i]]))
					}
				}
			}
			if(this.childrenData_edit)
            //let box=document.getElementById("spreadButton_margin").style.transform
				this.spreadEdit=!this.spreadEdit
				if(!this.isSameValue)
					this.nowUnit="px"
				if(this.spreadEdit){//未展开
                    //this.spreadRotate=90
                    //this.spreadEdit=true
                    this.height="210px"
                }else{
                    //this.spreadRotate=0
                    //this.spreadEdit=false
                    this.height="65px"
                }
            },
        isSameValueFun:function(value){//检测是否是相同的值
            return value.split(" ").length==1
        },
        set:function(emit=true){
			if(emit){
				this.$emit("set",'margin',this.childrenData_edit,()=>{return true},this.setted)
			}
			this.setted=true
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
            if(callBack=="margin"){
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
                    if(target=="margin"){
                        for(let key in this.LoadList["margin"].children){
                            if(key == "marginLeft" || key =="marginRight"){
                                if(!condition)
                                    sumForLeftRight(dom);//margin-left和margin-right按照原来的处理
                            }else{
                                if(!condition)
                                    sumForTopBottom(dom)//margin-top和margin-top要转换，以防止%等单位问题
                            }
                            this.LoadList["margin"].children[key].value=Data
                            document.getElementById(dom).style[key]=Data+nowUnit
                        }
                    }else{
                        if(target=="marginLeft" || target=="marginRight"){
                            if(!condition)
                                sumForLeftRight(dom)
                        }
                        else{
                            if(!condition)
                                sumForTopBottom(dom)
                        }
                        this.LoadList["margin"]["children"][target].value=Data+nowUnit
                        document.getElementById(dom).style[target]=Data+nowUnit
                        }
                }
            )},data,callBack,now,pre,editCondition)
            this.set()
        },
        requestVar:function(e,name){//请求绑定变量
            this.$emit("requestVar",e,"margin.children."+name,this.childrenData_edit.children[name].condition)
        },
        bindVar:function(attribute,varName,varValue){//绑定变量
			this.setted=true
            //this.bindName="$"+this.bindName
            if(attribute=="margin"){
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
            if(attribute=="margin"){
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