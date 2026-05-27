<template>
    <div id="componentContainer" style="" ref="container">
        <div id="componentLeftBar">
            <button style="margin-top:50px">自定义</button>
            <div class="line"> </div>
            <button  v-for="(item,index) in prototypeList" :key="index" :data-type="item.type" @click="changeType">{{item.name}}</button>
            <div class="line"> </div>
            <button  v-for="(item,index) in drawList" :key="index">{{item}}</button>
            <div class="line"> </div>
            <button >路径</button>
        </div>
        <div id="componentOption"></div>
		<!--组件列表-->
        <div id="componentBar">
            <div @mousedown="startChose($event,item)" class="componentItemOut" v-for="(item,index) in Object.keys(showComponentList)"   :key="index">
                <img :src="showComponentList[item].logo" :data-comname="item"  class="componenesImg"/>
                <h3 class="componentIntroText">{{item}}</h3>
            </div>
        </div>
        <!--获取目标组件的数据用-->
        <component v-if="nowTestComponent!=null" ref="testCom" style="display:none" :is="nowTestComponent"></component>
		<teleport to="body" v-if="dragPosition.show">
			<div class="dragText" :style="{left:`${dragPosition.left}px`,top:`${dragPosition.top}px`}">
				{{dragPosition.text}}
				 <img :src="dragPosition.logo" class="componenesImg" style="opacity: 0.5;"/>
			</div>
		</teleport>
		<teleport to="body" v-if="sideBound.show">
			<div class="dragAccepterOut" @mouseenter="enter" @mouseout="leave" :style="{left:`${sideBound.left}px`,top:`${sideBound.top}px`}">
				<!--上-->
				<div class="dragAccepter" @mouseup="putDown('top')" :style="{left:`0px`,top:`0px`,width:`${sideBound.width}px`,height:`5px`}"></div>
				<!--左-->
				<div class="dragAccepter" @mouseup="putDown('left')" :style="{left:`0px`,top:`0px`,width:`5px`,height:`${sideBound.height}px`}"></div>
				<!--右-->
				<div class="dragAccepter" @mouseup="putDown('right')" :style="{left:`${sideBound.width-5}px`,top:`0px`,width:`5px`,height:`${sideBound.height}px`}"></div>
				<!--下-->
				<div class="dragAccepter" @mouseup="putDown('bottom')" :style="{left:`0px`,top:`${sideBound.height-5}px`,width:`${sideBound.width}px`,height:`5px`}"></div>
			</div>
		</teleport>
	</div>
</template>

<script>
import DomTreeEngine from '../engines/domtree.js'
import {structStore} from "../store/struct.js"
function closeComponent(id){
    let box = document.getElementById(id)
    if(box){
        box.style.transform="scale(0) translateX(-100%)"
        box.style.opacity="0"
    }
}
export default{
    name:"components",
    props:{
    },
    close:closeComponent,
    data(){
        return{
            nowType:"",
            showComponentList:{},
            prototypeList:[{name:"布局",type:'layout'},
                            {name:"基础",type:"normal"},
                            {name:"表单",type:"form"},
                            {name:"复合",type:"complex"}],
            nowTestComponent:null,            
            drawList:["形状","动画"],
            fileList:{},
            publicPath: "/public/",
            mountedHtml:"",//渲染后的html
            store:null,
            insertTarget:"projectFrameInner",
			dragPosition:{
				show:false,
				left:0,
				top:0,
				text:""
			},
			targetId:"",//添加的参考对象
			sideBound:{
				show:false,
				left:0,
				top:0,
				bottom:0,
				right:0,
				width:0,
				height:0
			}
        }
    },
    beforeMount(){
        this.fileList["layout"]=["demo1"]
    },
    mounted(){
        //document.getElementById("componentContainer").style.transform="scaleX(1.0)"
        window.setHtml=this.setHtml
        this.store=structStore()
		System.createComAccepter=this.createComAccepter
		System.closeComAccepter=this.closeComAccepter
    },
    watch:{
    },
    methods:{
        setInsertTarget:function(target){
            //供project调用，设置插入对象
            this.insertTarget=target
        },
        changeType:function(e){
			
            let type=e.target.dataset.type
			System.requestComponentList(type)
            this.nowType=type
			let data=System.componentConfig[type]
			this.fileList[type]=[]
			for(let i=0;i<data.length;i++){
				data[i].logo="https://img.alicdn.com/imgextra/i4/O1CN01aG16y424E11XsURUd_!!6000000007358-2-tps-206-240.png"//require(data[i].logo)
				this.fileList[type].push(data[i].name)
				this.showComponentList[data[i].name]=data[i]
			}
        },
        create:(comp,id,prop)=>{

        },
        setHtml:function(html){
            this.mountedHtml=html
        },
        randomNum:function(minNum,maxNum){ 
            switch(arguments.length){ 
                case 1: 
                    return parseInt(Math.random()*minNum+1,10); 
                break; 
                case 2: 
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                break; 
                default: 
                    return 0; 
                break; 
            } 
        },
        insertInto:function(e){//插入组件
            let comName=e.target.dataset.comname
            let newId=comName+this.randomNum(0,99999)
            let com=require(`../components/created/${this.nowType}.type/${comName}.com/index.vue`)
            //com.default.props.props.default为要加载的组件的真实传参
            window.mountComponent(comName,this.insertTarget,newId,com.default.props.props.default)
            let index=this.store.DOMSTRUCT.DEVICE_WEB.tree.length
            let pa=this.insertTarget=="projectFrameInner"?null:this.insertTarget
            this.store.DOMSTRUCT.DEVICE_WEB.tree.push(
                {
                id:newId,
                tag:comName,
                name:comName,
                parent:this.insertTarget=="projectFrameInner"?null:this.insertTarget,
                lock:1,//1锁定，0解锁
                //condition:null,移入bind中
                loop:false,
                input:[],//为组件时才会有,表示传入值
                event:[],//表示组件中$emit调用的父容器的事件
                bind:[],//绑定参数，除去v-for，剩余的v-if,v-model等
                children:[],
                loopSource:null,
                area:[10,20,30,40]}
            )
            /*if(pa==null){//当元素为最外层
            }*/
            this.store.DOMSTRUCT.DEVICE_WEB.index[newId]=index
            DomTreeEngine.insert(pa,newId)
        },
		startChose:function(e,item){
			System.isDragingComponent=true
			let box=this.$refs['container']
			box.style.transform="scale(0) translateX(-100%)"
			box.style.opacity="0"
			console.log(this.showComponentList,item)
			this.dragPosition={
				show:true,
				left:e.clientX+10,
				top:e.clientY+10,
				text:this.showComponentList[item].name,
				logo:this.showComponentList[item].logo,
				id:this.showComponentList[item].componentId
			}
			window.onmousemove=(e)=>{
				this.moveCom(e)
			}
			window.onmouseup=(e)=>{
				System.isDragingComponent=false
				this.dragPosition.show=false
				window.onmousemove=null
				window.onmouseup=null
			}
		},
		moveCom:function(e){
			this.dragPosition.left=e.clientX+10
			this.dragPosition.top=e.clientY+10
		},
		createComAccepter:function(nodeId){
			this.targetId=nodeId
			console.log(nodeId)
			let nodeBound=document.querySelector("#"+nodeId).getBoundingClientRect()
			this.sideBound=nodeBound
			this.sideBound.show=true
		},
		closeComAccepter:function(){
			this.sideBound.show=false
		},
		enter:function(){
			System.isEnterAccepter=true
		},
		leave:function(){
			System.isEnterAccepter=false
			this.sideBound.show=false
		},
		createNewId:function(){
			return 'node_'+Math.random().toString(32).substr(2)
		},
		putDown:function(direct){
			this.sideBound.show=false
			//读取父级
			let parentId=System.getParentId(this.targetId)
			//let newId=System.insertNewMeta(parentId,'node','relative')
			let newId=System.insertNewComponent(parentId,this.dragPosition.text,this.dragPosition.id)
			if(newId===false){
				alert("组件挂载失败")
				return
			}
			let hasParent=true
			if(parentId===null){
				//在最外层
				hasParent=false
				//插入新节点Id
				let newIndex=System.nodeMeta.index.indexOf(newId)
				//在insertNewComponent中加入到了最后，故需要删除后重新添加
				System.nodeMeta.index.splice(newIndex,1)
				let targetIndex=System.nodeMeta.index.indexOf(this.targetId)
				System.nodeMeta.index.splice(targetIndex,0,newId)
			}else{
				
			}
			let parent=parentId===null?document.querySelector('#'+System.rootId):document.querySelector('#'+parentId)	
			const action={
				'top':()=>{
					System.mountNode(newId,parent,System.nodeMeta.tree[newId],false,'before',document.querySelector('#'+this.targetId).previousElementSibling)
				},
				'left':()=>{
					action['top']()
				},
				'right':()=>{
					System.mountNode(newId,parent,System.nodeMeta.tree[newId],false,'after',document.querySelector('#'+this.targetId).nextElementSibling)
				},
				'bottom':()=>{
					action['right']()
				},
			}
			action[direct]()
		}
    }
}
</script>
<style scoped>
button{
    outline: none;
    border: none;
    width: 90%;
	border-radius: 10px;
    height: 25px;
    padding: 0;
    margin-top: 20%;
    color: white;
    font-size: 105%;
    transition: .2s;
    background-color: transparent;
	cursor: pointer;
}
button:hover{
	background-color: var(--mainColorGrayBg2);
}
.componentItemOut{
position: relative;
text-align: center;
overflow: hidden;
width: 100px;
height: 130px;
float: left;
margin-left: 10px;
margin-top: 15px;
margin-bottom: 10px;
background: #323232;
border-radius: 20px;
cursor: pointer;
}
.componenesImg{
    width: 90%;
	max-height: 70%;
    margin-top: 10px;
    background-color: white;
    border-radius: 15px;
}
.componentIntroText{
padding: 0;
margin: 0;
left:50%;
bottom: 3px;
position: absolute;
transform: translateX(-50%);
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;
/* identical to box height */
display: flex;
align-items: center;
color: white;
}
.line{
width: 100%;
height: 2px;
margin-top: 5px;
padding: 0;
background: var(--mainColorGrayBg2);
}
#componentContainer{
    background-color: transparent;
    width: 430px;
    height: 510px;
    position: absolute;
    transition: .15s;
    transform-origin: left;
}
#componentLeftBar{
    
    height:100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 23%;
    height: 100%;
    background: #212121;
    box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(30px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 15px;
}
#componentOption{
position: absolute;
width: 2%;
height: 86px;
left:23%;
top:50%;
transform: translateY(-50%);
background: #8BA4FF;
border-radius: 10px;
}
#componentBar{
overflow-y: scroll;
width: 75%;
height: 100%;
position: absolute;
top: 0;
right:0;
background: #212121;
box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
backdrop-filter: blur(30px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 20px;
}
.dragText{
	position: absolute;
	z-index: 999;
	width: auto;
	height:30px;
	max-width: 100px;
	padding-left: 16px;
	padding-right: 16px;
	background-color: #212121;
	color: white;
	text-align: center;
	line-height: 30px;
	border-radius: 10px;
	
}
.dragAccepterOut{
	position: absolute;
	z-index: 9999;
	width: 1px;
	height:1px;
	background-color: rgba(0,0,0,0);
}
.dragAccepter{
	position: absolute;
	z-index: 999;
	background-color: var(--mainColorOrange1);
	opacity: 0.8;
	transition: .2s;
	overflow: hidden;
}
.dragAccepter:hover{
	opacity: 1;
	background-color: var(--mainColorBlue2);
}
/*.dragAccepter:hover ::after{
	content:'';
	background-color: rgba(0,0,0,0);
	box-shadow: 0 0 0 1px white;
	animation: circleAfter .5s infinite;
	width: 100%;
	height:100%;
	position: absolute;
	z-index: 1;
	animation-delay: .2s;
}
.dragAccepter:hover ::before{
	content:'';
	background-color: rgba(0,0,0,0);
	box-shadow: 0 0 0 1px white;
	width: 100%;
	height:100%;
	position: absolute;
	z-index: 1;
	animation: circleBefore .5s infinite;
}
@keyframes circleAfter {
	from{
		transform: scale(0);
		opacity: 0;
	}to{
		transform: scale(1);
		opacity: 1;
	}
}
@keyframes circleBefore {
	from{
		transform: scale(0);
		opacity: 0;
	}to{
		transform: scale(1);
		opacity: 1;
	}
}*/
</style>