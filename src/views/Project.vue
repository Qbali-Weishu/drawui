<template>
    <div id="projectContainer">
		<hub style="position: fixed;top:13vh;left: 50%;transform: translateX(-50%);" class="hubClass">
			
		</hub>
        <header>
            <h4 id="backToFronText">项目首页 > </h4> 
            <button class="layerButton">页面1<span class="headerLayerChoseT"></span></button>
            <h4 style="color:var(--color_text1);float:left;margin-left:1%;padding:0;margin-top:10px">></h4>
            <button class="layerButton">版面1<span class="headerLayerChoseT"></span></button>
            <button class="share"><img style="width:150%;heiht:150%;object-fit:cover" src="../assets/icons/setting.png"></button>
            <button class="share"><img style="width:150%;heiht:150%;object-fit:cover" src="../assets/icons/yl.png"></button>
            <button class="share"><img style="width:135%;heiht:135%;object-fit:cover" src="../assets/icons/send.png"></button>
        </header>
        <iframe :src="userProject" style="position:absolute;z-index:99;width:80vw;height:80vh;display:none" v-if="userProject!=null"></iframe>
        <main id="main">
            <!--左侧栏-->
            <div id="leftBar">
                <button data-name="组 件" data-target="components" :style="{backgroundImage:`url(${imgs.img1})`}" class="leftBarButton" style="margin-top:10vh" @mouseover="showActionTitle" @mouseout="hideActionTitle" @click="openLeftBar"></button>
                <button data-name="素 材" :style="{backgroundImage:`url(${imgs.img2})`}" class="leftBarButton" @mouseover="showActionTitle"  @mouseout="hideActionTitle"></button>
                <button data-name="支持库" :style="{backgroundImage:`url(${imgs.img3})`}" class="leftBarButton" @mouseover="showActionTitle"  @mouseout="hideActionTitle"></button>
                <button data-name="暂 存" :style="{backgroundImage:`url(${imgs.img4})`}" class="leftBarButton" @mouseover="showActionTitle"  @mouseout="hideActionTitle"></button>
                <button data-name="剪贴板" :style="{backgroundImage:`url(${imgs.img5})`}" class="leftBarButton" @mouseover="showActionTitle"  @mouseout="hideActionTitle"></button>
                <button data-name="待 办" :style="{backgroundImage:`url(${imgs.img6})`}" class="leftBarButton" @mouseover="showActionTitle"  @mouseout="hideActionTitle"></button>
                <button data-name="回收站" :style="{backgroundImage:`url(${imgs.img7})`}" class="leftBarButton" @mouseover="showActionTitle"  @mouseout="hideActionTitle"></button>
                <!--功能提示-->
                <div id="actionTitle" style="transform-origin:left;transform:scale(0);transition:.05s;height:27px;width:76px;color:white;position:absolute;left:50px;top:10vh;z-index:99998"><div style="background-color:#383838;clip-path:polygon(0 50%,100% 0,100% 100%);width:9px;height:9px;float:left;margin-top:9px"> </div><button style="float:left;background-color:#383838;height:27px;width:67px;border-radius:8px;color:white">{{actionTitleName}}</button></div>
            </div>
            <!--中央部分-->
            <div id="drawMain">
                <!--绘制部分-->
                <div id="projectFrameOut" @mousedown="screenDown" @mousemove="screenMove"  @mouseup="screenUp">
                    <div id="projectFrameInner" style="top:1%;left:1%;"  >
                       <!--div id="test" draggable="true" @mousedown="nodeOnSelectChose($event,true)" style="border:1px solid black;height:300px;width:300px;background-color:red;position:absolute;left:20%;top:30%"  >
                            <div id="test2" draggable="true" @mousedown="nodeOnSelectChose($event,true)" style="border:1px solid black;height:200px;width:200px;background-color:blue;position:absolute;left:20px;top:30px"  >
                                <div id="test3" draggable="true" @mousedown="nodeOnSelectChose($event,true)" style="border:1px solid black;height:100px;width:100px;background-color:red;position:relative;margin-left:20px;margin-top:30px"  >
                                </div>
                            </div>
                       </div-->
                       <div id="scaleDom" style="position:absolute;z-index:99999;background-color:rgba(0,0,0,0);border:none;width:0;height:0"></div>
                    </div>
                    <div id="selectDomDiv"  style="background-color:red;position:absolute;width:0;height:0;top:0;left:0;z-index:99999"></div>
                    
                </div>
                <!--底部栏-->
                <div id="bottomBar">
                    <button class="bottomBarButton">数据源</button>
                    <button class="bottomBarButton" style="width:100px">隐藏标注点</button>
                    <button class="bottomBarButton">页面属性</button>
                    <button id="bottomCenterButton"></button>
                    <div class="containerDevice">
                        <button class="deviceButton" @click="changeDevice" data-device="0" :style="{backgroundImage:`url(${nowDevice==0 ?  imgs.chosedWeb:imgs.noChoseWeb })`,backgroundColor:`${nowDevice==0 ? 'var(--mainColorBlue)':'white'}`}"></button>
                        <button class="deviceButton" @click="changeDevice" data-device="1" :style="{backgroundImage:`url(${nowDevice==1 ?  imgs.chosedPhone: imgs.noChosePhone})`,backgroundColor:`${nowDevice==1 ? 'var(--mainColorBlue)':'white'}`}"></button>
                        <button class="deviceButton" @click="changeDevice" data-device="2" :style="{backgroundImage:`url(${nowDevice==2 ?  imgs.chosedPad:imgs.noChosePad })`,backgroundColor:`${nowDevice==2 ? 'var(--mainColorBlue)':'white'}`}"></button>
                    </div>
                </div>
            </div>
            <!--右侧栏-->
            <div id="rightBar">
            </div>
        </main>
		<!--
        <components id="components" style="transform-origin: left;;transition:.1s;position:absolute;height:440px;width:310px;left:85px;top:10vh;z-index:3" v-for="i in components.components" :key="i"></components>
		-->
	</div>
</template>
<style scoped>
#main{
    position: relative;
    display: inline-block;
    height:calc(100% - 80px);
    margin-top: 10px;
    width:99%;
    min-width: 1526px;
    background-color: transparent;
}
#leftBar{
position: absolute;
width: 65px;
left:10px;
height: 100%;
z-index:99998;
background: rgba(255, 255, 255, 1);
backdrop-filter: blur(30px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 20px;
}
.leftBarButton{
height:30px;
width:30px;
background-size:cover;
background-color:transparent;
margin-left:15px;
margin-right:15px;
margin-top:5vh
}
.bottomBarButton{
width: 86px;
height: 35px;
float: left;
margin-left: 20px;
background: var(--mainColorGreen);
border-radius: 10px;
margin-top: 5px;
color: white;
font-size: 100%;
}
.containerDevice{
    position: absolute;
    height: 37px;
    overflow: hidden;
    top: 4px;
    right: 200px;
    width:132px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 10px;
}
.deviceButton{
    transition: .2s linear;
    height: 31px;
    margin-top: 3px;
    width:31px;
    margin-left: 10px;
    float: left;
    border-radius: 8px;
    background-position: center;
    background-size: 90%;
    background-repeat: no-repeat;
}
#bottomCenterButton{
position: absolute;
width: 41px;
height: 41px;
padding: 0;
left:50%;
top:2px;
transform: translateX(-50%);
background: var(--mainColorBlue);
border: 0px solid #C7D2F9;
box-sizing: border-box;
border-radius: 25px;
box-sizing:border-box;
transition: .1s linear;
}
#bottomCenterButton:hover{
    border: 5px solid #C7D2F9;
}
#bottomCenterButton::before{
    content: "";
    width:80%;
    height:5px;
    position: absolute;
    border-radius: 5px;
    top:50%;
    transform: translateY(-50%);
    left:10%;
    background-color: white;    
}
#bottomCenterButton::after{
    content: "";
    height:80%;
    width:5px;
    position: absolute;
    border-radius: 5px;
    left:50%;
    transform: translateX(-50%);
    top:10%;
    background-color: white;   
}
#drawMain{
    width:calc(100% - 300px);
    height:100%;
    background-color: transparent;
    position: absolute;
    left:100px;
    z-index: 1;
}
#bottomBar{
    position: absolute;
width: 100%;
height: 45px;

background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(199, 199, 199, 0.25);
backdrop-filter: blur(30px);
/* Note: backdrop-filter has minimal browser support */

border-radius: 10px;
bottom:0
}
#projectFrameOut{
position: absolute;
top:0;
left:0;
width: 100%;
height: calc(100% - 60px);
background: #FFFFFF;
border: 1px dashed #000000;
box-sizing: border-box;
backdrop-filter: blur(30px);
/* Note: backdrop-filter has minimal browser support */
border-radius: 20px;
}
#projectFrameInner{
position: absolute;
width: 1536px;
transform-origin: left top;
height: 721px;
transform:scale(0.785);
background: rgba(239, 237, 237, 0.5);
backdrop-filter: blur(15px);
}
#rightBar{
    position: absolute;
width: 171px;
height: 100%;
right:10px;
background: rgba(255, 255, 255, 0.75);
backdrop-filter: blur(30px);
/* Note: backdrop-filter has minimal browser support */

border-radius: 20px;
}
.share{ 
    height:30px;
    width: 30px;
    margin-top: 10px;
    margin-right: 15px;
    float: right;
    background-color: transparent;
}
#projectContainer{
    width:100%;
    height: 100vh;
    background-color: #EFEFEF;
    font-family: Righteous;
    font-style: Regular;
}
#backToFronText{
    float: left;
    color: var(--color_text1);
    margin-left: 5%;
    margin-top: 10px;
    height: 35px;
    padding: 0;
    cursor: pointer;
}
.layerButton{
    background-color:white;
    height: 30px;
    width:3em;
    padding: 0;
    color:var(--mainColorBlue);
    float: left;
    margin-left: 1%;
    font-size: 105%;
    margin-top:0.6em;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.headerLayerChoseT{
    background-color: white;
    height: 10px;
    width: 10px;
    clip-path: polygon(0 0,100% 50%,0 100%);
    float: right;
    margin-top: 6px;
    right: 2px;
}
.sideTransButton{
    outline:none;
    border:1px solid  #80B3FE;
    position:absolute;
    background-color: white;
}
</style>
<script>
import {structStore} from "../store/struct.js"
import {storeToRefs} from "pinia"
import CREATE from '../engines/create.js'
//import components from "../components/components.vue"
import DomTreeEngine from "../engines/domtree.js"
import StyleEngine from "../engines/style.js"
import hub from "../components/hub.vue";
export default{
    name:"Project2",
    data(){
        return{
            store:null,//项目数据
            device:"DEVICE_WEB",//当前设备类型
            keyBord:{
                Shift:false,
                Control:false
            },
            userProject:null,
            imgs:{
                img1:require("../assets/icons/zj.png"),
                img2:require("../assets/icons/sc.png"),
                img3:require("../assets/icons/zck.png"),
                img4:require("../assets/icons/zanc.png"),
                img5:require("../assets/icons/jtb.png"),
                img6:require("../assets/icons/db.png"),
                img7:require("../assets/icons/hsz.png"),
                noChoseWeb:require("../assets/icons/webNC.png"),
                chosedWeb:require("../assets/icons/webC.png"),
                noChosePhone:require("../assets/icons/iphoneNC.png"),
                chosedPhone:require("../assets/icons/iphoneC.png"),
                noChosePad:require("../assets/icons/padNC.png"),
                chosedPad:require("../assets/icons/padC.png")
            },
            nowDevice:0,
            screen:{
                top:0,//绘制区顶部，用于计算元素添加的实际位置
                left:0//绘制区左边，用于计算元素添加的实际位置
            },
            DOMSTRUCT:{},
            STYLESTRUCT:{},
            ATTRIBUTESTURCU:{},
            DATASETSTURCT:{},
            mouseAction:{//鼠标控制
                isDown:false,
                isMove:false,//选框
                area:{
                    left:0,
                    top:0,
                    width:0,
                    height:0
                },
                startX:0,
                startY:0,
                moveX:0,
                moveY:0,
                isTrans:false,//用于更改元素大小的边框按钮被拖动时处理
                transDirect:null,//被拖动的方向
                transPre:{x:0,y:0,width:0,height:0},//被选中部分的初始数据
                isMoveGroup:false,//被框选部分移动
                moveGroup:{startX:0,startY:0,dertaX:0,dertaY:0,distoLeft:0,distoTop:0}//最后两个是按下ctrl时计算按下点距离左边和上边的距离
            }, 
            choseGroup:{//被选中组件
            },
            actionTitleName:"组 件",
            dom:{
                opering:false
            },
            components:{
                components:0
            },
            openView:[]//已打开的组件对象池，用于单击主屏时关闭所有需要关闭的对象
        }
    },
    components:{
       // components,
		hub
    },
    mounted(){
        let box=document.getElementById("projectFrameOut").getBoundingClientRect()
        this.screen.top=box.y.toFixed(0)
        this.screen.left=box.x.toFixed(0)
        let out=document.getElementById("projectFrameOut").getBoundingClientRect()
        let sumWidth=1536*0.785
        let sumHeight=721*0.785
        //console.log(width,height,sumWidth.toFixed(0),sumHeight.toFixed(0))
        let left=(out.width.toFixed(0)-sumWidth.toFixed(0))/2
        let top=(out.height.toFixed(0)-sumHeight.toFixed(0))/2
        document.getElementById("projectFrameInner").style.left=left.toFixed(0)+"px"
        document.getElementById("projectFrameInner").style.top=top.toFixed(0)+"px"
        const store=structStore()
        var {DOMSTRUCT,STYLESTRUCT,ATTRIBUTESTURCU,DATASETSTURCT} = storeToRefs(store)
        this.DOMSTRUCT=DOMSTRUCT
        this.STYLESTRUCT=STYLESTRUCT
        this.ATTRIBUTESTURCU=ATTRIBUTESTURCU
        this.DATASETSTURCT=DATASETSTURCT
        //CREATE.init()//调用结构树加载器
        document.getElementById("projectContainer").addEventListener("dragstart",function(e){//禁止拖拽
            e.preventDefault()
            return false;
        })
        /*document.getElementById("projectContainer").addEventListener("dragend",function(e){
            e.preventDefault()
        })*/
        window.renderUserProject=this.renderUserProject
        //this.userProject="/userProject/asdd/test"
        let _this=this
        window.addEventListener("keydown",function(e){
            let key=e.key
            if(!_this.keyBord[key]){
                _this.keyBord[key]=true
            }
            /*if(key=="Control"){
                if(Object.keys(_this.choseGroup)!=[]){//若按下ctrl键，且当前有元素被选中时，在选中元素最上层添加一个蒙版，便于移动
                    _this.drawChoseSide(_this.mouseAction.transPre)
                }
            }*/
        })
        window.addEventListener("keyup",function(e){
            let key=e.key
             _this.keyBord[key]=false
            /*if(key=="Control"){
                if(Object.keys(_this.choseGroup)!=[]){//若按下ctrl键，且当前有元素被选中时，在选中元素最上层添加一个蒙版，便于移动
                    try{
                        document.getElementById("drawUIMengFrame").remove()
                    }catch(e){}
                    
                    _this.drawChoseSide(_this.mouseAction.transPre)
                }
            }*/
        })
        window.nodeOnSelectChose=this.nodeOnSelectChose
        this.store=structStore()//初始化pinia对象，加载项目数据
    },
    watch:{      
    },
    methods:{
        renderUserProject:function(html){
            console.log("传入")
            document.getElementById("projectFrameInner").innerHTML=html
            document.getElementById("testButton").addEventListener("click",function(e){
                console.log("parent",e.target)
            })
        },
        changeDevice:function(e){
            let device=e.target.dataset.device
            this.nowDevice=device
        },
        downAction:function(e){//按下的实际操作
        console.log("domdomddom")
            this.openView.forEach(close => {
                close.target(close.value)
            })
            this.openView=[]
            this.removeChoseSide()//此处不将choseGroup置空，因为更改选择元素时会产生影响操作，将置空操作留值cancleAllSelectedNode中执行
            this.cancleAllSelectedNode()//取消所有选中元素，注：已在元素鼠标按下事件中阻止冒泡，不允许向上传递至父组件，此处保证不与被选中的组件被点击时的事件
            let domSelect=document.getElementById("selectDomDiv")
            let DownX=e.clientX,DownY=e.clientY
            this.mouseAction.startX=DownX-this.screen.left
            this.mouseAction.startY=DownY-this.screen.top
            let areaRight=this.mouseAction.area.left+this.mouseAction.area.width
            let areaBottom=this.mouseAction.area.top+this.mouseAction.area.height
            let positionInArea= (
                                areaRight > this.mouseAction.startX > this.mouseAction.area.left &&
                                areaBottom > this.mouseAction.startY > this.mouseAction.area.top 
                                ) ? true : false
                domSelect.style.height=0
                domSelect.style.width=0
                domSelect.style.border="none"
                this.mouseAction.area.left=this.mouseAction.startX
                this.mouseAction.area.top=this.mouseAction.startY
                domSelect.style.left=this.mouseAction.startX+"px"
                domSelect.style.top=this.mouseAction.startY+"px"
            if(positionInArea && this.mouseAction.area.width!=0){//取消选择框
                this.choseGroup={}
                this.mouseAction.area.width=0
            }
            this.mouseAction.isDown=true
        },
        screenDown:function(e){//主屏鼠标按下事件
            this.downAction(e)
        },
        screenUp:function(e){//主屏鼠标抬起事件
            this.mouseAction.isDown=false//将鼠标按下状态设置为假
            if(this.mouseAction.isMove){//检测是否有选中的元素
                let outerNodes=document.getElementById("projectFrameInner").childNodes
                let domSelect=document.getElementById("selectDomDiv")
                let leftSide=(this.mouseAction.area.left/0.785).toFixed(0)*1,topSide=(this.mouseAction.area.top/0.785).toFixed(0)*1
                let rightSide=leftSide+(this.mouseAction.area.width/0.785).toFixed(0)*1,bottomSide=topSide+(this.mouseAction.area.height/0.785).toFixed(0)*1
                outerNodes.forEach(node =>{
                    try{
                        let nodeleft=node.offsetLeft,nodetop=node.offsetTop
                        let noderight=nodeleft+node.offsetWidth,nodebottom=nodetop+node.offsetHeight
                        let isEnterChose=0
                        if(nodebottom>topSide && noderight>leftSide&&nodetop<topSide&&nodeleft<leftSide){//左上
                            isEnterChose=!0
                        }else if(nodebottom>topSide && noderight<rightSide&&nodetop<topSide&&nodeleft>leftSide){
                            isEnterChose=!0
                        }else if(nodebottom>topSide&&nodeleft<rightSide&&noderight>rightSide&&nodetop<topSide){//右上
                            isEnterChose=!0
                        }else if(nodebottom<bottomSide&&nodeleft<rightSide&&noderight>rightSide&&nodetop>bottomSide){
                            isEnterChose=!0
                        }else if(nodetop<bottomSide&&noderight>leftSide&&nodeleft<leftSide&&nodebottom>bottomSide){//左下
                            isEnterChose=!0
                        }else if(nodetop<bottomSide&&nodeleft>leftSide&&noderight<rightSide&&nodebottom>bottomSide){
                            isEnterChose=!0
                        }else if(nodetop<bottomSide&&nodeleft<rightSide&&noderight>rightSide&&nodebottom>bottomSide){//右下
                            isEnterChose=!0
                        }else if(nodetop>topSide&&nodeleft<leftSide&&noderight>leftSide&&nodebottom<bottomSide){
                            isEnterChose=!0
                        }else if(nodetop>topSide&&nodebottom<bottomSide&&nodeleft>leftSide&&noderight<rightSide){
                            isEnterChose=!0

                        }
                        if(isEnterChose){
                            this.nodeOnSelectChose({target:{id:node.id}})
                        }
                    }catch(e){}
                })
                this.mouseAction.isMove=false//将鼠标移动状态至false
                domSelect.style.height=0
                domSelect.style.width=0
                domSelect.style.border="none"
                this.prepareForChoseSide()
            }else if(this.mouseAction.isTrans){//拉伸完成处理
                let scaleDom=document.getElementById("scaleDom")
                let pre=this.mouseAction.transPre
                let preX=pre.x,preY=pre.y
                let dertaX=scaleDom.offsetLeft-preX,dertaY=scaleDom.offsetTop-preY,nowWidth=scaleDom.offsetWidth,nowHeight=scaleDom.offsetHeight
                let heightBili=nowHeight/pre.height,widthBili=nowWidth/pre.width
                let origin=""
                switch(this.mouseAction.transDirect){
                    case "top"://上边拉伸，则以下边为缩放中心
                        origin="bottom"
                        break
                    case "left"://
                        origin="right"
                        break
                    case "bottom":
                        origin="top"
                        break
                    case "right":
                        origin="left"
                        break
                    case "topleft":
                        origin="bottom right"
                        break
                    case "topright":
                        origin="bottom left"
                        break
                    case "bottomleft":
                        origin="top right"
                        break
                    case "bottomright":
                        origin="top left"
                        break
                }
                this.mouseAction.isTrans=false//鼠标弹起,将当前有元素被拉伸状态设置为假，即当前无元素被拉伸
                if(widthBili!=0 || heightBili!=0){//若两者都为0，则表示仅点击，此时不做拉伸
                    scaleDom.style.border="none"
                    scaleDom.style.width="0"
                    scaleDom.style.height="0"
                    console.log("niii",this.choseGroup)
                    StyleEngine.scale(this.choseGroup,widthBili,heightBili,origin,dertaX,dertaY,preX,preY)
                    this.prepareForChoseSide()//拉伸完成重新绘制选择框
                }
            }else if(this.mouseAction.isMoveGroup){
                let moveDomId=this.keyBord.Control?"drawUIMengFrame":"drawUiMoveButton"
                let box=document.getElementById(moveDomId)
                console.log("move",this.mouseAction.moveGroup.startX,box.offsetLeft,this.choseGroup=={})
                StyleEngine.move(this.choseGroup,box.offsetLeft-this.mouseAction.moveGroup.startX,box.offsetTop-this.mouseAction.moveGroup.startY)
                this.prepareForChoseSide()
                this.mouseAction.isMoveGroup=false
            }
        },
        screenMove:function(e){//主屏鼠标移动事件
            let left = e.clientX-this.mouseAction.startX
            let top = e.clientY-this.mouseAction.startY
            let width=left-this.screen.left
            let height=top-this.screen.top
            if(Math.abs(width)>5||Math.abs(height)>5){
                if(this.mouseAction.isDown){//拉出框选外框  
                        this.mouseAction.isMove=true
                        let domSelect=document.getElementById("selectDomDiv")
                        //let directX=0,directY=0;//X为零表示默认的从左到右，Y为0表示默认的从上到下
                        if(width<0){
                            let resetLeft=this.mouseAction.startX+width
                            domSelect.style.left=resetLeft+"px"
                            this.mouseAction.area.left=resetLeft
                            width=width*-1
                        }
                        if(height<0){
                            let resetTop=this.mouseAction.startY+height
                            this.mouseAction.area.top=resetTop
                            domSelect.style.top=resetTop+"px"
                            height=height*-1
                        }
                        domSelect.style.border="2px solid black"
                        this.mouseAction.area.width=width
                        this.mouseAction.area.height=height
                        domSelect.style.width=width+"px"
                        domSelect.style.height=height+"px"
                }
                else if(this.mouseAction.isTrans){//元素被拉伸
                    console.log("hhhhhh")
                    let direct=this.mouseAction.transDirect
                    let position//=targetdom.style.position
                    width=(width/0.785).toFixed(0)*1
                    height=(height/0.785).toFixed(0)*1
                    /**isTran与主屏发起的拉伸不同，主屏的承载元素是外框，isTran是缩小过的内框，必须将width，height除比例 */
                    let floatFlag=false//元素是否以left,top等属性定位
                    if(position=="absolute" || position=="fixed"){
                        floatFlag=true
                    }
                    let deleteBorder = 6*0.785
                    let transTop=(same=0)=>{//处理上边修改,same=0代表默认为仅操作一边，否则为上边与其他边同时操作
                        if(same==0){
                            left=this.mouseAction.transPre.x -deleteBorder
                            width=this.mouseAction.transPre.width
                            }
                        if(height<0){
                            height=height*-1
                            top=this.mouseAction.transPre.y-height-deleteBorder//6是边框占用
                            height=this.mouseAction.transPre.height+height
                        }else{
                            top=this.mouseAction.transPre.y+height-deleteBorder//6是边框占用
                            height=this.mouseAction.transPre.height-height
                        }}
                    let transLeft=(same=0)=>{
                        if(same==0){
                            top=this.mouseAction.transPre.y -deleteBorder
                            height=this.mouseAction.transPre.height
                        }
                        if(width<0){
                            width=width*-1
                            left=this.mouseAction.transPre.x-width-deleteBorder//6是边框占用
                            width=this.mouseAction.transPre.width+width
                            
                        }else{
                            left=this.mouseAction.transPre.x+width-deleteBorder//6是边框占用
                            width=this.mouseAction.transPre.width-width
                        }
                    }
                    let transRight=(same=0)=>{
                        if(same==0){
                            height=this.mouseAction.transPre.height
                            top=this.mouseAction.transPre.y-deleteBorder
                        }
                        left=this.mouseAction.transPre.x -deleteBorder
                        width=width+this.mouseAction.transPre.width  
                    }
                    let transBottom=(same=0)=>{
                        if(same==0){
                            left=this.mouseAction.transPre.x-deleteBorder
                            width=this.mouseAction.transPre.width
                        }
                        top=this.mouseAction.transPre.y-deleteBorder
                        height=height+this.mouseAction.transPre.height
                    }
                    if(direct=="top"){
                        this.mouseAction.transDirect="top"
                        transTop()
                    }
                    else if(direct=="left"){
                         this.mouseAction.transDirect="left"
                        transLeft()
                    }
                    else if(direct=="right"){   
                     this.mouseAction.transDirect="right"
                        transRight()
                    }
                    else if(direct=="bottom"){
                         this.mouseAction.transDirect="bottom"
                        transBottom()
                    }else if(direct=="topleft"){
                         this.mouseAction.transDirect="topleft"
                        transTop(1)
                        transLeft(1)
                    }else if(direct=="topright"){
                         this.mouseAction.transDirect="topright"
                        transTop(1)
                        transRight(1)
                    }else if(direct=="bottomleft"){
                        this.mouseAction.transDirect="bottomleft"
                        transLeft(1)
                        transBottom(1)
                    }else if(direct=="bottomright"){
                        this.mouseAction.transDirect="bottomright"
                        transRight(1)
                        transBottom(1)
                    }
                    let scaleDom=document.getElementById("scaleDom")
                    scaleDom.style.border= "3px solid #80B3FE"
                    scaleDom.style.top   = top+"px"
                    scaleDom.style.left  = left+"px"
                    scaleDom.style.width = width+"px"
                    scaleDom.style.height= height+"px"
                }
                else if(this.mouseAction.isMoveGroup){//移动被选中元素
                    let moveDomId=this.keyBord.Control?"drawUIMengFrame":"drawUiMoveButton"
                    left=e.clientX/0.785-this.screen.left/0.785-12//12是元素宽度占用，该值为当前鼠标位置
                    top=e.clientY/0.785-this.screen.top/0.785-12
                    let newX=left-4-this.mouseAction.transPre.width/2,newY=top-4-this.mouseAction.transPre.height/2
                    /*if(this.keyBord.Control){
                        newX=left-this.mouseAction.moveGroup.distoLeft
                    }*/
                    document.getElementById(moveDomId).style.left=left+"px"
                    document.getElementById(moveDomId).style.top=top+"px"
                    this.mouseAction.transPre.x=newX
                    this.mouseAction.transPre.y=newY
                    this.drawChoseSide(this.mouseAction.transPre)
                    //赋值初始数据，为后续缩放比例计算
                }
            }
        },     
        showActionTitle:function(e){//鼠标移入时显示功能名称
            let top=e.target.offsetTop+(e.target.offsetHeight/2).toFixed(0)*1-10
            let content=e.target.dataset.name
            this.actionTitleName=content
            let node=document.getElementById("actionTitle")
            node.style.transform="scale(1)"
            node.style.opacity="1"
            node.style.top=top+"px"
        },
        hideActionTitle:function(e){
            let node=document.getElementById("actionTitle")
            node.style.opacity="0"
            node.style.transform="scale(0)"
        },
        openLeftBar:function(e){//打开左侧栏
            let target=e.target.dataset.target
            if(target=="components"){
                if(this.components.components==0){
                    this.components.components=1
                }else{
                    document.getElementById("components").style.transform="scaleX(1.0) translateX(0)"
                }
                this.openView.push({target:components.close,value:"components"})
            }
        },
        prepareForChoseSide:function(){//为绘制选择边框准备数据
            try{
                let leftDom,rightDom,topDom,bottomDom;//被选中范围内的最左右上下元素，用于计算边框
                let boundDom={}
                for(let key in this.choseGroup){
                    if(this.choseGroup[key]!=undefined){
                        boundDom[key]=this.choseGroup[key]
                    }
                }
                let domIds=Object.keys(boundDom)
                domIds.sort(function(domA,domB){ 
                    return DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[0]-DomTreeEngine.getOffsetTopLeft(document.getElementById(domB))[0]
                })
                leftDom=domIds[0]
                domIds.sort(function(domA,domB){ 
                    return (DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[0]+document.getElementById(domA).offsetWidth)-(DomTreeEngine.getOffsetTopLeft(document.getElementById(domB))[0]+document.getElementById(domB).offsetWidth) 
                })
                rightDom=domIds[domIds.length-1]
                domIds.sort(function(domA,domB){ 
                    return DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[1]-DomTreeEngine.getOffsetTopLeft(document.getElementById(domB))[1]
                })
                topDom=domIds[0]
                domIds.sort(function(domA,domB){ 
                    return (DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[1]+document.getElementById(domA).offsetHeight)-(DomTreeEngine.getOffsetTopLeft(document.getElementById(domB))[1]+document.getElementById(domB).offsetHeight)
                })
                bottomDom=domIds[domIds.length-1]
                let outSideLeft,outSideTop,outSideWidth,outSideHeight,outSideRight,outSideBottom
                outSideLeft=DomTreeEngine.getOffsetTopLeft(document.getElementById(leftDom))[0]
                outSideTop=DomTreeEngine.getOffsetTopLeft(document.getElementById(topDom))[1]
                outSideRight=DomTreeEngine.getOffsetTopLeft(document.getElementById(rightDom))[0]
                outSideBottom=DomTreeEngine.getOffsetTopLeft(document.getElementById(bottomDom))[1]
                outSideWidth=outSideRight-outSideLeft+document.getElementById(rightDom).offsetWidth
                outSideHeight=outSideBottom-outSideTop+document.getElementById(bottomDom).offsetHeight
                let choseData={x:outSideLeft,y:outSideTop,width:outSideWidth,height:outSideHeight}
                this.drawChoseSide(choseData)
                this.mouseAction.transPre=choseData//赋值初始数据，为后续缩放比例计算
                //console.log("最左",outSideLeft,leftDom,"最右",rightDom,"最上",document.getElementById(topDom),"最下",bottomDom)
            }catch(e){}
        },
        drawChoseSide:function(outside){//绘制被选中部分的边框
                this.removeChoseSide()//绘制前先清除
                let body=document.getElementById("projectFrameInner")
                let topLeftButton=document.createElement("div")
                let topRightButton=document.createElement("div")
                let bottomRightButton=document.createElement("div")
                let bottomLeftButton=document.createElement("div")
                /*let topSideButton=document.createElement("div")
                let rightSideButton=document.createElement("div")
                let bottomSideButton=document.createElement("div")
                let leftSideButton=document.createElement("div")*/
                let moveButton=document.createElement("div")
                
                let side=[]
                let _this=this
                for(let i=0;i<4;i++){
                    let bar=document.createElement("div")
                    let height=0,width=0
                    let top=outside.y-8*0.785,left=outside.x-8*0.785
                    if(i==0||i==2){
                        height=8*0.785
                        bar.id="topSideBound"
                        bar.setAttribute("data-direct","top")
                        bar.style.cursor="n-resize"
                        if(i==2){
                            bar.id="bottomSideBound"
                            top+=outside.height
                            bar.setAttribute("data-direct","bottom")
                        }
                        width=outside.width+8*0.785
                    }else{
                        bar.id="leftSideBound"
                        bar.style.cursor="w-resize"
                        bar.setAttribute("data-direct","left")
                        height=outside.height+8*0.785
                        width=8*0.785
                        if(i==1){
                            bar.id="rightSideBound"
                            bar.setAttribute("data-direct","right")
                            left+=outside.width
                        }
                    }
                    bar.style.height=height+"px"
                    bar.style.width=width+"px"
                    bar.style.position="absolute"
                    bar.style.top=top+"px"
                    bar.style.left=left+"px"
                    bar.style.zIndex="99998"
                    bar.style.opacity="0.7"
                    bar.style.backgroundColor="#80B3FE"
                    bar.className="sideTrans"
                    body.appendChild(bar)
                }
                
                moveButton.className="sideTrans"
                topLeftButton.className="sideTrans"
                topRightButton.className="sideTrans"
                bottomRightButton.className="sideTrans"
                bottomLeftButton.className="sideTrans"

                topLeftButton.setAttribute("data-direct","topleft")
                topRightButton.setAttribute("data-direct","topright")
                bottomRightButton.setAttribute("data-direct","bottomright")
                bottomLeftButton.setAttribute("data-direct","bottomleft")

                moveButton.style="position:absolute;z-index:99999;cursor:move;transform:translate(-50%,-50%);height:20px;width:20px;background: #FFFFFF;border: 1px solid #FF7676;box-sizing: border-box;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);border-radius: 10px;"
                moveButton.style.left=(outside.x+outside.width/2)+"px"
                moveButton.style.top=(outside.y+outside.height/2)+"px"
                moveButton.id="drawUiMoveButton"

                /*topSideButton.style="cursor:n-resize;opacity:0;transform:translateX(-50%);height:0px;outline:none;border:10px solid rgba(0,0,0,0);position:absolute;background-color: #80B3FE;"
                topSideButton.style.top=(outside.y-10*0.785)+"px"
                topSideButton.style.width=(outside.width-50*0.785)+"px"
                topSideButton.style.left=(outside.x+outside.width/2)+"px"

                rightSideButton.style="cursor:e-resize;opacity:0;transform:translateY(-50%);width:0px;outline:none;border:10px solid rgba(0,0,0,0);position:absolute;background-color: #80B3FE;"
                rightSideButton.style.left=(outside.x+outside.width-3*0.785)+"px"
                rightSideButton.style.height=(outside.height-50*0.785)+"px"
                rightSideButton.style.top=(outside.y+outside.height/2)+"px"

                bottomSideButton.style="cursor:n-resize;opacity:0;transform:translateX(-50%);height:0px;outline:none;border:10px solid rgba(0,0,0,0);position:absolute;background-color: #80B3FE;"
                bottomSideButton.style.top=(outside.y+outside.height-3*0.785)+"px"
                bottomSideButton.style.left=(outside.x+outside.width/2-2)+"px"
                bottomSideButton.style.width=(outside.width-50*0.785)+"px"

                leftSideButton.style="cursor:e-resize;opacity:0;transform:translateY(-50%);width:0px;outline:none;border:10px solid rgba(0,0,0,0);position:absolute;background-color: #80B3FE;"
                leftSideButton.style.left=(outside.x-15*0.785)+"px"
                leftSideButton.style.top=(outside.y+outside.height/2)+"px"
                leftSideButton.style.height=(outside.height-50*0.785)+"px"*/

                topLeftButton.style="cursor:nw-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;"
                topLeftButton.style.left=(outside.x-12-3*0.785)+"px"
                topLeftButton.style.top=(outside.y-12-3*0.785)+"px"

                topRightButton.style="cursor:ne-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;"
                topRightButton.style.top=(outside.y-12-3*0.785)+"px"
                topRightButton.style.left=(outside.x+outside.width+3*0.785)+"px"

                bottomRightButton.style="cursor:nw-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;"
                bottomRightButton.style.top=(outside.y+outside.height+0)+"px"
                bottomRightButton.style.left=(outside.x+outside.width)+"px"

                bottomLeftButton.style="cursor:ne-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;"
                bottomLeftButton.style.top=(outside.y+outside.height+3*0.785)+"px"
                bottomLeftButton.style.left=(outside.x-12-3*0.785)+"px"

                
                body.appendChild(topLeftButton)
                body.appendChild(topRightButton)
                body.appendChild(bottomRightButton)
                body.appendChild(bottomLeftButton)
                
                document.querySelectorAll(".sideTrans").forEach(dom=>{
                    dom.addEventListener("mousedown",function(innerE){
                        console.log(innerE)
                        _this.mouseAction.isTrans=true
                        innerE.stopPropagation()
                        let DownX=innerE.clientX,DownY=innerE.clientY
                        _this.mouseAction.startX=DownX-_this.screen.left
                        _this.mouseAction.startY=DownY-_this.screen.top
                        _this.mouseAction.transDirect=innerE.target.dataset.direct
                    })
                })

                if(this.keyBord.Control){
                    let mengFrame=document.createElement("div")//蒙版元素
                    mengFrame.style.position="absolute"
                    mengFrame.style.zIndex="99990"
                    mengFrame.style.backgroundColor="rgba(0,0,0,0)"
                    mengFrame.style.left=outside.x+"px"
                    mengFrame.style.top=outside.y+"px"
                    mengFrame.style.width=outside.width+"px"
                    mengFrame.style.height=outside.height+"px"
                    mengFrame.id="drawUIMengFrame"
                    mengFrame.style.cursor="move"
                    mengFrame.className="sideTrans"
                    body.appendChild(mengFrame)
                    document.getElementById("drawUIMengFrame").addEventListener("mousedown",function(innerE){
                        _this.mouseAction.isMoveGroup=true
                        _this.mouseAction.isTrans=false
                        innerE.stopPropagation()
                        let DownX=innerE.clientX,DownY=innerE.clientY
                        _this.mouseAction.startX=DownX-_this.screen.left
                        _this.mouseAction.startY=DownY-_this.screen.top
                        _this.mouseAction.moveGroup.startX=this.offsetLeft
                        _this.mouseAction.moveGroup.startY=this.offsetTop
                        _this.mouseAction.moveGroup.distoLeft=this.offsetLeft-outside.x
                        _this.mouseAction.moveGroup.distoTop=this.offsetTop-outside.y
                    })
                }else{
                    body.appendChild(moveButton)
                    document.getElementById("drawUiMoveButton").addEventListener("mousedown",function(innerE){
                        _this.mouseAction.isMoveGroup=true
                        _this.mouseAction.isTrans=false
                        innerE.stopPropagation()
                        let DownX=innerE.clientX,DownY=innerE.clientY
                        _this.mouseAction.startX=DownX-_this.screen.left
                        _this.mouseAction.startY=DownY-_this.screen.top
                        console.log("mive",this.offsetLeft)
                        _this.mouseAction.moveGroup.startX=this.offsetLeft
                        _this.mouseAction.moveGroup.startY=this.offsetTop
                    })
                }
                
                
                /**/
                
        },
        removeChoseSide:function(){//清楚被选中的边框
            let outSide=document.querySelector(".sideTrans")
            if(outSide!=undefined)
                document.querySelectorAll(".sideTrans").forEach(dom=>{dom.remove()})
        },
        virtualNode:function(e,point){//处理元素被选中
            let virtualNode 
            let realHtml
            console.log("生成虚拟元素")
            if(e.target.style==undefined){//其他函数中调用时仅传入id
                virtualNode=document.getElementById(e.target.id).cloneNode()
                realHtml=document.getElementById(e.target.id).innerHTML
            }else{//元素主动触发时传入dom对象
                virtualNode=e.target.cloneNode()
                realHtml=e.target.innerHTML
            }
                virtualNode.innerHTML=realHtml
                virtualNode.style.position="absolute"
                virtualNode.id=virtualNode.id+"_virtual"
                virtualNode.style.zIndex="99999"
                virtualNode.style.backgroundColor="rgba(123,153,103,1)"
                virtualNode.style.margin=0
                let left=(point.left-3*0.785),top=(point.top-3*0.785)
                virtualNode.style.left=left+"px"
                virtualNode.style.top=top+"px"
                virtualNode.setAttribute("data-top",top)
                virtualNode.setAttribute("data-left",left)
                virtualNode.style.border="3px solid #80B3FE"
                virtualNode.className="drawUIVirtual"
                let _this=this
                virtualNode.addEventListener("mousedown",function(innerE){
                    innerE.stopPropagation()
                    document.getElementById(e.target.id).click()//调用真实元素被点击事件
                })
                document.getElementById("projectFrameInner").appendChild(virtualNode)
        },
        nodeOnSelectChose:function(e,isMouseDown=false){//元素被框选事件，以鼠标移入事件绑定
            if(e.target.style!=undefined){
                e.stopPropagation()
            }
            let box,domId=e.target.id;
            let storeData=this.store.DOMSTRUCT[this.device]
            let tree=storeData.tree
            let indexSet=storeData.index
            let domIndexInStore=indexSet[domId]
            let parentId=tree[domIndexInStore].parent
            let parentIndex=indexSet[parentId]
            //console.log("外层元素",domId,parentIndex,parentId)
            let up=false//标志是否有上移，若无上移，则表示操作的就是当前元素，若有上移，说明操作的是其子元素，此时不取消
            while(parentId!=null && tree[parentIndex].lock!=0){//检测是否未最外层元素或父元素是否解锁
                //console.log(parentIndex,"上")
                domIndexInStore=indexSet[parentId]//将id索引上移至父容器
                parentId=tree[domIndexInStore].parent//tree内索引为domIndexStore的元素的父容器组件
                parentIndex=indexSet[parentId]
                up=true
            }
            domId=tree[domIndexInStore].id//上移完成后的操作id
            box=document.getElementById(domId)
            let domIsChosed=false//标记当前操作对象是选中还是取消选中
            if(this.mouseAction.isMove){//框选的情况
                if(this.choseGroup[domId]==undefined){
                    domIsChosed=true
                }
            }else if(isMouseDown){//点选的情况
                if(this.keyBord.Shift){//Shift多选
                    if(this.choseGroup[domId]==undefined){
                        domIsChosed=true
                    }
                    else{//取消选择
                        this.choseGroup[domId]=undefined
                        this.nodeCancleChose(e)
                    }
                }else{
                    if(this.choseGroup[domId]==undefined){
                        for(let domIdCancle in this.choseGroup){
                            this.nodeCancleChose({target:{id:domIdCancle}})
                        }
                        this.choseGroup={}
                        domIsChosed=true
                    }else{
                        if(Object.keys(this.choseGroup).length==1 && up==false){//取消选择
                            console.log("取消")
                            this.nodeCancleChose(e)
                            this.choseGroup={}
                        }else{
                            for(let domIdCancle in this.choseGroup){
                                this.nodeCancleChose({target:{id:domIdCancle}})
                            }
                            this.choseGroup={}
                            domIsChosed=true
                        }
                    }
                }
            }
            
            if(domIsChosed){//执行生成虚拟复制元素
                //console.log("有选中")
                this.choseGroup[domId]=
                    {
                        position:box.style.position,
                        top:box.style.top,
                        left:box.style.left,
                        marginTop:box.style.marginTop,
                        marginLeft:box.style.marginLeft,
                        height:box.style.height,
                        width:box.style.width,
                    }
                let point=DomTreeEngine.getOffsetTopLeft(box)
                //let virtualLeft=point[0],virtualTop=point[1]
                //this.virtualNode({target:{id:domId}},{left:virtualLeft,top:virtualTop})
            }
            this.prepareForChoseSide()
        },
        nodeCancleChose:function(e){
            //document.getElementById(e.target.id).style.backgroundColor="rgba(150,150,150,1)"
            //console.log("取消选择",e.target.id)
            let box=document.getElementById(e.target.id+"_virtual")
            console.log("cancle")
            if(box)box.remove()//需增加判断box是否存在，因为框选对象后shift取消选择，并不会取出choseGroup的键值对，在cancleAllselectedNode中仍然会对已经取消的元素操作
        },
        cancleAllSelectedNode:function(){//取消所有选中元素
            for(let domId in this.choseGroup){
                this.nodeCancleChose({target:{id:domId}})
            }
            this.choseGroup={}
        },
        nodeOnChosed:function(e){//元素被选中事件，元素树中选中
            console.log("click",e)
        }
    }
}
</script>