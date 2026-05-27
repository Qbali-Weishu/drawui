/**元素结构树加载引擎 */
/**
 * 元素结构树加载，
 * 除元素的标签、样式、数据集、属性外
 * 不加载元素的动画与事件
 * 所有动画与事件绑定为系统事件
 * 在预览页面中再重新为元素绑定事件与动画
 */
import {structStore} from "../store/struct.js"
import StyleEngine from "./style.js"
import DataSetEngine from "./domdata.js"
import AttributeEngine from "./attribute.js"
import {createApp} from "vue"
import components from "../components/components.vue"
console.log("component",components)
const TAG=["div"]
let body;
let store=null,structsIndex=null,tree=null
function process(id,tag,parent){
    if(TAG.indexOf(tag)>-1){//表示是html标签，否则为组件
        let dom=document.createElement(tag)
        dom.id=id
        //dom.setAttribute("vueevent","click=>ajskdjs")//绑定系统事件，以vueevent作为标识符，click表示处理事件=>表示指向对象
        dom=StyleEngine.process(id,dom)//为元素绑定样式,返回处理过后的dom
        dom=DataSetEngine.process(id,dom)//为元素绑定数据集
        dom=AttributeEngine.process(id,dom)//为元素绑定属性
        //console.log("加载",dom.outerHTML)
        dom.addEventListener("mousedown",function(e){e.stopPropagation();window.nodeOnSelectChose(e,true)})
        parent.appendChild(dom)
		dom=null
    }else{
        window.mountComponent(tag,parent.id,id)
    }
    tree[structsIndex[id]].children.forEach(childDomId => {//子元素id
        //console.log("domtree",childDomId,structsIndex[childDomId])
        let childDomTag=tree[structsIndex[childDomId]].tag//根据子元素id查找其标签
        let childDomParent=document.getElementById(id)//父容器
        process(childDomId,childDomTag,childDomParent)
		childDomParent=null
		childDomTag=null
    })
}
function init(){//初始化引擎
    body=document.getElementById("projectFrameInner")
    /*StyleEngine.process()
    DataSetEngine.process()
    AttributeEngine.process()*/
    if(store==null){//减小内存使用
        store=structStore()
        structsIndex=store.DOMSTRUCT.DEVICE_WEB.index
        tree=store.DOMSTRUCT.DEVICE_WEB.tree
    }
    for(let index in structsIndex){//元素数据索引
        let domIndex=structsIndex[index]//元素索引
        if(tree[domIndex].parent==null){//只有当最外层组件时才会加载
            //console.log("加载",tree[domIndex].id)
            process(tree[domIndex].id,tree[domIndex].tag,body)
        }
		domIndex=null
    }
}
function getOffsetTopLeft(box,mainParent="projectFrameInner"){//计算元素相对于mainParent的位置
    let left=0,top=0
    while(box!=null && box.id!=undefined && box.id!=mainParent){
        left+=box.offsetLeft
        top+=box.offsetTop
        box=box.offsetParent
    }
    return [left,top];
}
function getParentId(child){//获取父元素ID
    let childIndex=store.DOMSTRUCT.DEVICE_WEB.index[child]
    let childData=store.DOMSTRUCT.DEVICE_WEB.tree[childIndex]
    return childData.parent
}
function getIndex(id){//获取元素在store中的索引
    return store.DOMSTRUCT.DEVICE_WEB.index[id]
}
function insert(parentId,childId){//插入父元素的子元素列表中
    if(parentId!=null){
        let parentIndex=getIndex(parentId)
        store.DOMSTRUCT.DEVICE_WEB.tree[parentIndex].children.push(childId)
    }
}
function getParentList(Id){//获取所有父级元素
    let index=store.DOMSTRUCT.DEVICE_WEB.index[Id]
    let parent
    let parentList=[]
    while(true){//逐层解锁
        try{
            if(parent!="projectFrameInner"){
                parentList.push(store.DOMSTRUCT.DEVICE_WEB.tree[index].id)
                parent=store.DOMSTRUCT.DEVICE_WEB.tree[index].parent
                index=store.DOMSTRUCT.DEVICE_WEB.index[parent]
                if(parent==null){
                    break
                }}
            }catch{
                break
            }
    }
    return parentList
}
function getChildIds(parent){//获取子元素列表
    try{
        if(parent!="projectFrameInner"){
            let parentIndex=store.DOMSTRUCT.DEVICE_WEB.index[parent]
            let parentData=store.DOMSTRUCT.DEVICE_WEB.tree[parentIndex]
            return parentData.children
        }else{//此时返回最外层
            return Object.keys(store.DOMSTRUCT.DEVICE_WEB.index)
        }
    }catch{}
}
function checkLock(parentId){
    let parentIndex=store.DOMSTRUCT.DEVICE_WEB.index[parentId]
    let parentData=store.DOMSTRUCT.DEVICE_WEB.tree[parentIndex]
    return parentData.lock
}
function isElement(tag){
    return TAG.indexOf(tag)>-1
}
function unLock(Id){//解锁
    let index=store.DOMSTRUCT.DEVICE_WEB.index[Id]
    let parent
    while(true){//逐层解锁
        try{
            if(parent!="projectFrameInner"){
        store.DOMSTRUCT.DEVICE_WEB.tree[index].lock=0
        parent=store.DOMSTRUCT.DEVICE_WEB.tree[index].parent
        index=store.DOMSTRUCT.DEVICE_WEB.index[parent]
        if(parent==null){
            break
        }}}catch{
            break
        }
    }
}
function lock(id=-1){//不传入参数时表示锁定全部已解锁的
    if(id==-1){
        
    }
    else if(Object.prototype.toString.call(id)=='[object Array]'){//锁定目标列表中的所有
        let index
        id.forEach(lockId => {
            try{
                if(parent!="projectFrameInner"){
            index=store.DOMSTRUCT.DEVICE_WEB.index[lockId]
            store.DOMSTRUCT.DEVICE_WEB.tree[index].lock=1
                }
            }catch{}
        })
    }else{
        try{
            let index=store.DOMSTRUCT.DEVICE_WEB.index[id]
            store.DOMSTRUCT.DEVICE_WEB.tree[index].lock=1
        }catch{}
    }
}
export default{
    name:"DomTreeEngine",
    init,
    getOffsetTopLeft,
    getChildIds,
    getParentId ,
    checkLock,
    isElement,
    unLock,
    lock,
    getParentList,
    insert
}