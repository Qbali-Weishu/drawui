<!--支持库-->
<template>
    <div id="support">
        <!--目标选择-->
        <div id="supportOptions" v-if="!provide && show">
            <button class="item" data-target="var" @click="openTarget">全局变量表</button>
            <button class="item" data-target="fun" @click="openTarget"> 方 法 库</button>
            <button class="item" data-target="style" @click="openTarget"> 样 式 库</button>
        </div>
        <div id="gloablVarList" class="gloablVarList" v-if="option=='var'">
            <div style="height:30px;width:100%;background-color:transparent">
                <button id="openProvideButton" style="float:left;background-color:transparent;color:var(--mainColorBlue);font-size:12px;font-weight:bold;height:100%" @click="showProvideData">开放数据</button>
                <button style="float:left;margin-left:40px;background-color:var(--mainColorBlue);color:white;font-size:12px;font-weight:bold;height:70%;width:40px;margin-top:5px;border-radius:10px" @click="changeList">JS</button>
                <button style="float:left;background-color:transparent;color:black;font-size:12px;font-weight:bold;height:100%">全局变量表</button>
                <button style="float:right;margin-right:5px;background-color:var(--mainColorRed);color:white;font-size:12px;font-weight:bold;height:70%;margin-top:5px;width:40px;border-radius:10px">X</button>
            </div>
            <div id="varList" style="">
                <div v-for="(item,index) in Object.keys(gloablVar)" :key="index" style="display:flex;flex-direction:row;margin-top:10px;height:25px;position:relative">
                    <input type="checkbox" class="checkBox" v-if="showProvide && gloablVarType==0" v-model="gloablVar[item].provide">
                    <div class="statusCheck" v-if="showProvide && gloablVarType==0"></div>
                    <button class="varName" :style="{width:`${varNameWidth}`}">{{item}}</button>
                    <input placeholder="初始值" class="varInput" v-model="gloablVar[item].value"/>
                    <button style="width:45px;background-color:var(--mainColorBlue);color:white;border-radius:10px;margin-left:10px">注释</button>
                    <button style="height:19px;width:19px;border-radius:50%;background-color:var(--mainColorRed);margin-top:3px;margin-left:10px"></button>
                </div>
            </div>
            <button style="width:100%;position:absolute;bottom:0;left:0;height:35px;background-color:transparent;border-top:3px solid var(--mainColorGray);letter-spacing:10px;text-align:center;color:var(--mainColorBlue)">添加</button>
        </div>
        <!--向外提供全局变量选择-->
        <div id="gloablVarList_provide" class="gloablVarList" style="transform-origin:left;width:180px" v-if="provide">
            <div style="height:30px;width:100%;background-color:transparent">
                <button style="float:left;margin-left:10px;background-color:var(--mainColorBlue);color:white;font-size:12px;font-weight:bold;height:70%;width:40px;margin-top:5px;border-radius:10px" @click="changeList">JS</button>
                <button style="float:left;background-color:transparent;color:black;font-size:12px;font-weight:bold;height:100%">全局变量表</button>
                <button style="float:right;margin-right:5px;background-color:var(--mainColorRed);color:white;font-size:12px;font-weight:bold;height:70%;margin-top:5px;width:40px;border-radius:10px" @click="close(`${callName}`)">X</button>
            </div>
            <!--varlist只会出现一个，无需考虑id冲突问题-->
            <div id="varList" style="overflow-y:scroll" :style="{height:`${showCancle ? '86%' : '100%'}`}">
                <div v-for="(item,index) in Object.keys(varList)" :key="index" style="display:flex;flex-direction:row;margin-top:10px;height:25px;position:relative">
                    <button class="varName" :style="{width:`${varNameWidth}`}" :data-varname="item" :data-value="gloablVar[item].value" @click="sendToProvide">{{item}}</button>
                    <input placeholder="初始值" class="varInput" v-model="gloablVar[item].value"/>
                </div>
            </div>
            <button v-if="showCancle" style="width:100%;height:8%;padding:0;background-color:white;border-top:1px solid var(--mainColorGray);color:var(--mainColorBlue);font-weight:bold" @click="removeBind">取消绑定</button>
        </div>
		
		<cssSupport @quit="showCssSupport=false;show=true" v-if="showCssSupport"></cssSupport>
		
		
    </div>
</template>
<style scoped>

#supportOptions{
    background-color: transparent;
    height: 130px;
    width:  100px;
    position: absolute;
}
#supportOptions .item{
    color: white;
    font-weight: bold;
    font-size: 12px;
    height: 35px;
    width: 100%;
    border-radius: 10px;
    background-color: var(--mainColorBlack);
    margin-top: 5px;
}
#supportOptions .item:hover{
    background-color: var(--mainColorBlack2);
}
.gloablVarList{
    transform-origin: left;
    transition: .05s;
    background-color: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    position: absolute;
    left:100px;
    top: -15vh;
    border-radius: 15px;
    box-shadow: 5px 5px 15px var(--mainColorGray);
    width: 300px;
    height: 500px;
    overflow: hidden;
}
@keyframes showCheck{
    from{
        transform: scaleX(0);
    }
    to{
        transform: scaleX(1);
    }
}
.checkBox{
    opacity: 0;
    margin:0;
    height:19px;
    transform: scaleX(0);
    animation:showCheck .15s;
    animation-fill-mode: forwards;
    transform-origin: left;
    transition: .15s;
    cursor: pointer;
    width:19px;
    position: absolute;
    z-index: 2;
    top: 3px;
    left: 2px;
}
.varName{
    transition: .05s;
    color: var(--mainColorBlue);
    background-color: transparent;
    padding: 0;
    margin-left: 0;
}
.varInput{
    outline: none;
    border: none;
    background-color: white;
    width:28%;
    margin-left: 10px;
    border-radius: 10px;
    text-align: center;
    color: var(--mainColorBlack);
    box-shadow:  -2px 2px 10px var(--mainColorGray);;
}
.statusCheck{
    transform: scaleX(0);
    animation:showCheck .05s;
    animation-fill-mode: forwards;
    transform-origin: left;
    z-index: 1;
    position: absolute;
    height:19px;
    width:19px;
    top:3px;
    left:2px;
    background-color: white;
    border:2px solid var(--mainColorBlue);
    border-radius: 50%;
    transition: .15s;
}
.checkBox:checked +.statusCheck{
    background-color: var(--mainColorBlue);
}
.checkBox:checked .varName{
    margin-left: 20px;
}
</style>
<script>
import { structStore } from "../store/struct.js";
import cssSupport from "./supportTools/cssSupport.vue"
function closeGloablData(id){
    try{
        document.getElementById("gloablVarList").style.transform="scaleX(0)"
        document.getElementById("gloablVarLis_provide").style.transform="scaleX(0)"
    }
    catch{}
    console.log("close")
    let box = document.getElementById(id)
    if(box){
        box.style.transform="scale(0) translateX(-200%)"
        box.style.opacity="0"
    }
}
export default {
    name:"support",
    close:closeGloablData,
	components:{
		cssSupport
	},
    props:{
        provide:{
            type:Boolean,
            default:false
        },
        provideTarget:{//请求变量列表的元素id
            type:String,
            default:""
        },
        provideCallBack:Function,
        showCancle:{//是否显示取消绑定按钮
            type:Boolean,
            default:false
        },
        callName:{//请求变量列表组件的id
            type:String,
            default:""
        }
    },
    data(){
        return{
            varNameWidth:"30%",
            option:null,//null显示三个支持库的显示
            varList:{},//全局变量
            gloablVarType:0,//0js，1css
            showProvide:false,//是否显示provide开放数据
            provideChosed:null,//被选中的向外提供的变量名
            store:null,
            editTimeout:null,//防抖延时器
			showCssSupport:false,
			show:false
        }
    },
    mounted(){
		if(!this.provide) this.show=true
        this.store=structStore()
        this.gloablVar=this.store.VARLIST//加载页面全局变量数据
        this.varList=this.store.VARLIST
		
		//注册向外提供class类列表
		System.requestClassList=()=>{
			return "className"
		}
    },
    watch:{
        gloablVar:{
            handler:function(val){
                try{
                    console.log('修改')
                    document.getElementById(this.callName).style.transform="scale(1)"//保证修改的时候不缩回
                }catch(e){
                    console.log("修改error",e)
                }
                
            },
        }
    },
    methods:{
        close:function(id){//此处关闭仅是隐藏，与全局关闭操作不同
            document.getElementById(id).style.transform="scaleX(0)"
        },
        openTarget:function(e){
            this.option=e.target.dataset.target
            try{
				const funcList={
					'var':()=>{
						document.getElementById("gloablVarList").style.transform="scaleX(1)"
					},
					'style':()=>{
						this.showCssSupport=true
					}
				}[this.option]()
				this.show=false
            }catch(e){
				console.error(e)
			}

        },
        showProvideData:function(){//显示provide数据
            this.showProvide=!this.showProvide
        },
        changeList:function(e){//js与css转换
        if(this.gloablVarType==0){//原来是js，转换到css
            e.target.innerText="CSS"
            this.gloablVarType=1
            document.getElementById("openProvideButton").style.transform="scale(0)"
            let bodyStyle=document.styleSheets[0].cssRules[0].cssText.split("body")[1].replace("{ ","").replace("}","").split(";")
            let cssVarList={}
            bodyStyle.forEach(name => {
                //console.log(typeof(name.split(":")[0]),name.split(":")[0],name.split(":")[0].startsWith(" -"),)
                let valueSplit=name.split(":")
                console.log(valueSplit)
                if(valueSplit[0].startsWith(" -")){
                    cssVarList[valueSplit[0].replace(" --","")]={value:valueSplit[1]}
                }
            })
            this.varList=cssVarList
            document.getElementById("gloablVarList").style.width="350px"
            this.varNameWidth="40%"
            
        }else{
            e.target.innerText="JS"
            this.gloablVarType=0
            document.getElementById("gloablVarList").style.width="300px"
            this.varNameWidth="30%"
            document.getElementById("openProvideButton").style.transform="scale(1)"
            this.varList=this.store.VARLIST//加载页面全局变量数据
            }
        },
        sendToProvide:function(e){//向请求变量绑定方提供变量列表
            let varName=e.target.dataset.varname
            let varValue=e.target.dataset.value
            //this.provideCallBack(varName)//调用请求变量绑定的组件传入的函数，让请求方获取当前选择的变量名称
            this.$emit("send",varName,varValue)
        },
        removeBind:function(){
            this.$emit("removeBind")
        },
		
		
    }
}
</script>
