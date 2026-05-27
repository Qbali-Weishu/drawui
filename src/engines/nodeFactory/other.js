import { componentStore } from "../../store/componentsStore.js"
//取消所有节点选择
function unSelectAll(){
	System.operatingNodes={}
	System.clearBoundSide()
	//更新选择列表
	System.updateOperateNode(System.operatingNodes)
}
//获取子节点Id
function getChilds(id){
	if(id=="projectFrameInner" || id===null){
		return System.nodeMeta.index
	}
	try{
		return System.nodeMeta.tree[id].children || {}
	}catch(e){
		console.error(e)
		return {}
	}
}
function getParentList(Id){//获取所有父级元素
    let parent
    let parentList=[]
	if(Id=="projectFrameInner" || Id===null){
		return []
	}
    while(true){//逐层解锁
        try{
			parentList.push(Id)
			Id=System.nodeMeta.tree[Id].parent
			if(Id==null){
				break
			}
            }catch{
                break
            }
    }
    return parentList
}
function getParentId(id){
	if(id=="parentFrameInner" || id===null){
		return null
	}
	try{
		return System.nodeMeta.tree[id].parent
	}catch{
		return null
	}
}
//获取与domId同级别的layers
function getLayers(domId){
	if(domId==null){
		return []
	}
	const parent=System.nodeMeta.tree[domId].parent
	//parent为空数据且非null时标表明数据错误，直接返回空数据
	if(!parent && parent!==null)
		return []
	//此时为最外层
	if(parent==null)
		return System.nodeMeta.index
	//否则返回上一级组件
	return System.nodeMeta.tree[parent].children
}
//单位变换
const funcs={
	'px':(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
		return preData.toFixed(1)
	},
	'%':(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let parent=document.getElementById(parentId)
        if(!parent) return null
        let style=parent.getBoundingClientRect()[styleName] // height or width
        return (preData/style).toFixed(1)
    },
    "vw":(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let oneUnit=System.screenSize[styleName]/100
        //每单位宽度 1 oneUnit = ? px
		console.log(preData,oneUnit,System.screenSize,styleName,(preData / oneUnit).toFixed(1))
        return (preData / oneUnit).toFixed(1)
    },
    "vh":(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let oneUnit=System.screenSize[styleName]/100
        //每单位宽度 1 oneUnit = ? px
        return (preData / oneUnit).toFixed(1)
    },
    "vmax":(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let max=Math.max(System.screenSize.width,System.screenSize.height)
        let oneUnit=max/100
        return (preData/oneUnit).toFixed(1)
    },
    "vmin":(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let min=Math.min(System.screenSize.width,System.screenSize.height)
        let oneUnit=min/100
        return (preData/oneUnit).toFixed(1)
    },
    "em":(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let virtualDom=document.createElement("div")
        virtualDom.style.cssText=`
            position:absolute;
            top:0;
            left:0;
            transform:scale(0);
            ${styleName}:1em;
        `
        document.getElementById("projectFrameOut").appendChild(virtualDom)
        //首字母大写
        let newName=styleName[0].toUpperCase()+styleName.slice(1,styleName.length)
        let oneUnit=virtualDom['client'+newName]
        return (preData/oneUnit).toFixed(1)
    },
    "rem":(preData,parentId,styleName)=>{
		preData=preData.replace("px","")*1
        let virtualDom=document.createElement("div")
        virtualDom.style.cssText=`
            position:absolute;
            top:0;
            left:0;
            transform:scale(0);
            ${styleName}:1rem;
        `
        document.getElementById("projectFrameOut").appendChild(virtualDom)
        //首字母大写
        let newName=styleName[0].toUpperCase()+styleName.slice(1,styleName.length)
        let oneUnit=virtualDom['client'+newName]
        return (preData/oneUnit).toFixed(1)
    }
}
/*节点选中时，预先创建一个移除了rotate与scale的节点，记录节点的boundClientRect，
将节点的with增加10px，再次记录boundClientRect，检测right取值是否有变化，若有变化，
则计算10px的实际取值，即除以System.saclePercent,计算两次的right值的差值
用差值除以10px的实际取值，再乘cos值，得到需要增加的比例数，
*/
//计算实际缩放比例数
function scaleValuePercent(box){
	//获取原先样式值
	console.log(box.id,box)
	let classNode=document.getElementById(box.id+"_style").innerText
	let yside=1,xside=1
	let scaleReg=new RegExp(/scale\(([^\)]+)\){1}/g)
	
	if(scaleReg.test(classNode)){
		let data=RegExp.$1.split(",")
		if(data.length==1){
			data=data[0].includes("%")?data[0].replace("%","")/100:data[0]*1
			yside=xside=data
		}else{
			xside=data[0].includes("%")?data[0].replace("%","")/100:data[0]*1
			yside=data[1].includes("%")?data[1].replace("%","")/100:data[1]*1
		}
		classNode=classNode.replace(scaleReg,'')
	}
	scaleReg=new RegExp(/scaleX\(([^\)]+)\){1}/g)
	if(scaleReg.test(classNode)){
		xside=RegExp.$1.replace("%","")/100
		classNode=classNode.replace(scaleReg,'')
	}
	scaleReg=new RegExp(/scaleY\(([^\)]+)\){1}/g)
	if(scaleReg.test(classNode)){
		yside=RegExp.$1.replace("%","")/100
		classNode=classNode.replace(scaleReg,'')
	}
	
	let returnData={
		xside:xside,
		yside:xside
	}
	const rotateReg=new RegExp(/(rotate|rotate3d)\(([^\)]+)\){1}/g)
	if(rotateReg.test(classNode)){
		classNode=classNode.replace("{",'_temp{')
		let copyNode=box.cloneNode()
		copyNode.classList=box.classList
		copyNode.classList.remove(box.id)
		copyNode.classList.add(box.id+"_temp")
		let tempStyle=document.createElement("style")
		let rotateDeg=0
		tempStyle.innerText=classNode//.replace(rotateReg,"").replace(scaleReg,"")
		document.getElementsByTagName("head")[0].appendChild(tempStyle)
		document.getElementById("_hiddenNode_").appendChild(copyNode)
		//记录client
		let preRect=copyNode.getBoundingClientRect()
		
		let preWidth=copyNode.offsetWidth
		copyNode.style.width=(preWidth + 10)+"px"
		let newRect=copyNode.getBoundingClientRect()
		if(preRect.right!==newRect.right){
			//right有变化，说明可以直接改变
			let delta=newRect.right-preRect.right
			let percent=delta/10
			returnData.xside*=percent
		}else if(preRect.left!==newRect.left){
			let delta=newRect.left-preRect.left
			let percent=delta/10
			returnData.xside*=percent
		}
		
		let preHeight=copyNode.offsetHeight
		copyNode.style.height=(preHeight + 10)+"px"
		newRect=copyNode.getBoundingClientRect()
		if(preRect.bottom!==newRect.bottom){
			//right有变化，说明可以直接改变
			let delta=newRect.bottom-preRect.bottom
			let percent=delta/10
			returnData.yside*=percent
		}else if(preRect.top!==newRect.top){
			let delta=newRect.top-preRect.top
			let percent=delta/10
			returnData.yside*=percent
		}
		copyNode.remove()
		tempStyle.remove()
	}
	return returnData
}

function nameToLower(name){
	return name.replace(/([A-Z])/g,function($,$1){
			return "-"+$1.toLowerCase()
	})
}


function unitTransform(transformData,metaValue,metaUnit,styleName,offset,parentId){
    //                 \____________/\________/\_______/\________/\_____/\_______/
    //                        |          |         |         |       |       |
    //                    渲染参数     元参数     元单位     属性名   偏移量   父ID    
	// 
	let numberRex=new RegExp(/^-{0,1}\d{1,}/g)
	if(!numberRex.test(transformData)){
		System.showToast("数据错误")
		return false
	}
    if(!['%','vw','vh','vmax','vmin','rem','em','px'].includes(metaUnit)){
        System.showToast("包含无法转换的单位,将以偏差计算")
        //使用calc
        let flag=offset>=0 ? "+" : "-"
        return `calc(${metaValue} ${flag} ${Math.abs(offset)})`
    }
    return funcs[metaUnit](transformData,parentId,styleName)
}

//生成随机ID
function createRandomId(){
    let root=Math.random()
    let len=Math.ceil((root+0.5)*15)
    let id=""
    let randomNumber=0
    for(let i=0;i<len;i++){
        randomNumber=Math.ceil(Math.random()*25)
        id+=String.fromCharCode(randomNumber+65)
    }
    return id
}

//读取组件元数据
function readComponentMeta(path){
	System.componentStore=componentStore()
    return System.componentStore[path]
}

export {
	unSelectAll,
	getChilds,
	getParentList,
	getParentId,
	getLayers,
	unitTransform,
	scaleValuePercent,
	nameToLower,
	createRandomId,
	readComponentMeta
}