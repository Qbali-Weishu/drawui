<!--单位选择器-->
<template>
    <div class="unitChose">
        <button class="nowSetUnit" @click="openOptions">{{nowUnit}}</button>
		<teleport to="body" v-if="show">
			<div class="drawUIunitList" id="drawUIunitList" :style="{top:`${top}px`,left:`${left}px`}">
			    <button v-for="(unitItem,index) in getUnitList()" :data-unit="unitItem" @click="changeUnit" :key="unitItem+index" class="unitOptions">
			        {{unitItem}}
			    </button>
			</div>
		</teleport>
        <input style="position: absolute;left: -30px;top: -30px;height: 1px;width: 1px;border: none;outline: none;" ref="q" @blur="blur"/>
        <!--微调-->
        <div id="littleSet" v-if="showLittle">
            <button class="littleSetButton" data-type="add" @click="littleSet" @mousedown="interValSet" @mouseup="stopSet"></button>
            <button class="littleSetButton" data-type="sub" @click="littleSet" @mousedown="interValSet" @mouseup="stopSet" style="transform:rotate(180deg);margin-top:4px"></button>
        </div>
    </div>
</template>
<style scoped>
.unitChose{
	overflow: hidden;
    height:20px;
    width:40px;
    background-color: transparent;
}
.drawUIunitList{
	z-index: 99999;
    margin-top:20px;
    position: absolute;
    width: 50px;
    height: 80px;
	overflow-y: scroll;
    transition: .15s;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    background-color: rgba(255,255,255,0.6);
    box-shadow: -2px 2px 5px rgba(0,0,0,0.25);
    transform: translateX(-25%);
}
.unitOptions{
    
    background-color: transparent;
    font-weight: bold;
    border: none;
    outline: none;
    width: 100%;
    height: 20px;
    padding: 0;
    margin:0;
    transition: .15s;
    border-bottom: 1px solid var(--mainColorGray);
}
.unitOptions:hover{
    background-color: rgba(200,200,200,0.9);
}
.nowSetUnit{
    padding: 1px;
    height: 20px;
    width: 25px;
    border-radius: 15%;
    background-color:transparent /*var(--mainColorGray3)*/;
    font-weight: bold;
	color: var(--mainTextColor1);
    float: left;
    font-size: 12px;
}
#littleSet{
    float: left;
    height: 15px;
    width:10px;
    margin-left: 2px;
    background-color:transparent;
    padding: 0;
}
.littleSetButton{
    height: 8px;
    width:  10px;
    padding: 0;
    display: flex;
    clip-path: polygon(50% 0,100% 100%,0 100%,50% 0);
    background-color:#e6e6e6 /*gray*/;
}
</style>
<script>
import {createApp} from "vue"
export default {
    name:"unitChose",
    props:{
        defaultUnit:String,//默认单位
        diyList:Array,//自定义显示单位列表
        callBackData:String,//要调节的具体属性名称,用于处理含有子属性的属性，如borderRadius下的borderTopLeftRadius等
        showLittle:{
            type:Boolean,//是否显示微调按钮
            default:true}
    },
    data(){
        return{
            unitList:[
                "px",
                "%",
                "em",
                "vw",
                "vh",
                "rem"
            ],
            nowUnit:this.defaultUnit,
            testData:0,
            tempE:null,
			top:0,
			show:false,
			left:0,
            setValueInterVal:null,//快速增长
            setValueInterValTimeOut:null//取消快速增长
        }
    },
    watch:{
        defaultUnit:{
            handler(a){
                this.nowUnit=a
            }
        }
    },
    methods:{
        getUnitList:function(){
            let units=[]
            this.unitList.forEach(unit => {
                if(unit!=this.nowUnit) units.push(unit)
            })
            return units
        },
        openOptions:function(e){
			try{
				this.top=e.clientY
				this.left=e.clientX
			}catch{}
			
            this.show=!this.show
			if(this.show){
				this.$nextTick(()=>{
					this.$refs['q'].focus()
				})
			}
        },
        stopSet:function(){//抬起结束快速增长
            if(this.setValueInterValTimeOut!=null)
                clearTimeout(this.setValueInterValTimeOut)
            if(this.setValueInterVal!=null)
                clearInterval(this.setValueInterVal)
            
        },
		blur:function(e){
			setTimeout(()=>{
				this.show=false
			},200)
		},
        changeUnit:function(e){
            let unit=e.target.dataset.unit//新的
            this.$emit("unitChange",this.nowUnit,unit,this.callBackData)
            this.nowUnit=unit
            this.openOptions()
        },
        littleSet:function(e){
            let option=e.target.dataset.type
            if(option=="add"){
                this.$emit("littleSet","add",this.callBackData)
            }else{
                this.$emit("littleSet","sub",this.callBackData)
            }
        },
        interValSet:function(e){//按下1.5s后快速增长
            this.setValueInterValTimeOut=setTimeout(()=>{
                this.setValueInterVal=setInterval(()=>{
                    this.littleSet(e)
                },20)
            },1000)

        }
    }
}
</script>
