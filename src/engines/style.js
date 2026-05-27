/*元素样式加载引擎*/
/*仅加载css代码以显示元素*/
import { structStore } from "../store/struct";
import domdata from "./domdata";
let store =null
function process(id, dom) {
	if(store==null){
		store = structStore()
	}
    const domStyle = store.STYLESTRUCT[id]
    if (domStyle) {
        const style_class = domStyle.class
        const style_style = domStyle.style
        let conditionalClass = []//class条件式集合
        let conditionalStyle = []//style条件式集合
        for (let className in style_class) {
            let value = style_class[className]
            if (value == null) {//非条件绑定
                dom.classList.add(className)
            }
            else {//条件绑定
                conditionalClass.push({ className: value })
            }
        }
        if (conditionalClass.length > 0) {
            let string = JSON.stringify(conditionalClass)
            string = string.replace(/\"/g, "")//去引号
            dom.setAttribute(":class", string)
        }
        for (let styleName in style_style) {
            let value = style_style[styleName]
            if (value.condition == null) {
                dom.style[styleName] = value.value
            } else {
                conditionalStyle.push({ styleName: value.condition })
            }
        }
        if (conditionalStyle.length > 0) {
            let string = JSON.stringify(conditionalStyle)
            string = string.replace(/\"/g, "")//去引号
            dom.setAttribute(":style", string)
        }
    }
    return dom
}
function getUnit(data) {
	return "px"
	if(data.indexOf("undefind")>-1 || data.indexOf("NaN")>-1)
		return "px"
    let unit = ""
    let index = data.length - 1
    for (let i = 0; i < 3; i++) {
        let n = data[index]
        if (isNaN(n * 1)) {
            unit = data[index] + unit
            if(unit=="undefined"){
                return undefined
            }
        } else {
            break
        }
        index--
    }
    return unit
}
function getWHUnitValue(bili, name, domId) {//获取原样式值,
    let box = document.getElementById(domId)
    if (box.style[name].indexOf("calc") > -1) {//若有calc函数，则以其中第一个数值为基准
        let realData = box.style[name].match(/calc\((\S*)\)/)[1].split(" ")[0]//正则匹配
        return getUnit(realData)
    } else {
        return getUnit(document.getElementById(domId).style[name])
    }
}
function getStandard(domId, unit) {//获取单位长度基准
    let testDom = document.createElement("div")
    testDom.style.position = "relative"
    testDom.style.zIndex = "99999"
    testDom.style.width = 1 + unit
    testDom.style.height = 1 + unit
    testDom.style.opacity = 1
    testDom.style.backgroundColor = "red"
    testDom.id = "drawUITestDom"
    document.getElementById(domId).parentNode.appendChild(testDom)
    let testStandard
    let widthStandard
    let heightStandard
    testStandard = document.getElementById("drawUITestDom")
    widthStandard = testStandard.offsetWidth
    heightStandard = testDom.offsetHeight
    testStandard.remove()
    return [widthStandard, heightStandard]
}
function changeMargintopAndTop_move(domId, dom, type, unit_top, dertaY) {//一定是上边框被拉动才会触发
    let top = type
    let bottom = type
    if (dom.style[top] != "" || top.indexOf("margin") > -1) {//left与right同时存在，则left的优先级高于right,相对定位，右侧与底部的定位无效
        let standard = getStandard(domId, unit_top)
        let preTop = dom.style[top].split(unit_top)[0] * 1//原先左边
        let transDiff = dertaY / standard[1]//获取在主屏移动距离相当于在当前操作元素的部分的值
        transDiff = dertaY / standard[1]
        if (unit_top == "%" && dom.parentNode.id != "projectFrameInner") {//%是根据宽度定义的，需要转换
            
            transDiff = dertaY / standard[0]
        }
        preTop = preTop + transDiff
        dom.style[top] = preTop + unit_top
    } else if (dom.style[bottom] != "") {
        console.log("topHello")
        let standard = getStandard(domId, unit_top)
        let preBottom = dom.style[top].split(unit_top)[0] * 1//原先左边
        let transDiff = dertaY / standard[1]//获取在主屏移动距离相当于在当前操作元素的部分的值
        transDiff = dertaY / standard[1]
        if (unit_bottom == "%") {//%是根据宽度定义的，需要转换
            transDiff = dertaY / standard[0]
        }
        preTop = preTop - transDiff
        dom.style[bottom] = preBottom + unit_bottom
    } else {
        let preT = dom.offsetTop + dertaY
        dom.style[top] = preT + "px"
    }
}
function changeMarginleftAndLeft_move(domId, dom, type, unit_left, dertaX) {//一定是左边框拉动才会触发
    let left = type
    let right = type//相对定位时都是marginleft
    if (left == "margin-right") { left = "margin-left" }
	let float=""
	let position=""
	let box=document.getElementById(domId)
	if(box.style.position=="absolute" || box.style.position=="fixed")
		position="absolute"
	if (document.getElementById(domId).style.float=='right' && position!="absolute"){
		console.log("right")
		float="right";
		left="margin-right";
		right="margin-right"
		}//若是右侧浮动，则此时改为marginRight
    if ((dom.style[left] != "" || left.indexOf("margin") > -1) && float!="right") {//left与right同时存在，则left的优先级高于right,相对定位，右侧与底部的定位无效
        //console.log(dom.style[right], "right")
        let standard = getStandard(domId, unit_left)
        let getReal = dom.style[left].split(unit_left)[0] * 1
        let preLeft = 0//原先左边
        //console.log("rel", getReal)
        if (getReal) {
            preLeft = getReal
        }
        let transDiff = dertaX / standard[0]//获取在主屏移动距离相当于在当前操作元素的部分的值
        transDiff = dertaX / standard[0]
        preLeft = preLeft + transDiff
        let data=preLeft + unit_left
        dom.style[left] = data
    } else if (dom.style[right] != "" || float=="right") {
		console.log("toRight")
        let standard = getStandard(domId, unit_left)
        let preLeft = dom.style[right].split(unit_left)[0] * 1//原先左边距
        let transDiff = dertaX / standard[0]//获取在主屏移动距离相当于在当前操作元素的部分的值
        transDiff = dertaX /standard[0]
        preLeft = preLeft - transDiff
        let data=preLeft + unit_left
        dom.style[right] = data
    } else {
        let preLeft = dom.offsetLeft + dertaX
        dom.style[left] = preLeft + "px"
    }
}
function move(choseGroup, dertaX, dertaY) {
    let unit_top, unit_left
    Object.keys(choseGroup).forEach(domId => {
		try{
			let dom = document.getElementById(domId)
			let position = dom.style.position
			if (position == "fixed" || position == "absolute") {
			    unit_left = "px"
			    unit_top = "px"
			    if (dom.style.top != "")
			        unit_top = getUnit(dom.style.top)
			    else if (dom.style.bottom != "")
			        unit_top = getUnit(dom.style.bottom)
			    if (dom.style.left != "")
			        unit_left = getUnit(dom.style.left)
			    else if (dom.style.right != "")
			        unit_left = getUnit(dom.style.right)
			    //针对top,bottom,left,right
			    changeMarginleftAndLeft_move(domId, dom, "left", unit_left, dertaX)
			    changeMargintopAndTop_move(domId, dom, "top", unit_top, dertaY)
			}
			else if (position == "static" || position == "relative" || position == "") {
			    unit_left = "px"
			    unit_top = "px"
			    if (dom.style.marginTop != "")
			        unit_top = getUnit(dom.style.marginTop)
			    else if (dom.style.marginBottom != "")
			        unit_top = getUnit(dom.style.marginBottom)
			    if (dom.style.marginLeft != "")
			        unit_left = getUnit(dom.style.marginLeft)
			    else if (dom.style.marginRight != "")
			        unit_left = getUnit(dom.style.marginRight)
			    changeMarginleftAndLeft_move(domId, dom, "margin-left", unit_left, dertaX)
			    changeMargintopAndTop_move(domId, dom, "margin-top", unit_top, dertaY)
			}
		}catch{
			
		}

    })
}
function scale(choseGroup, widthBili, heightBili, origin, dertaX, dertaY, preX, preY) {//处理元素被拉伸,传参为变化内容后内容
    move(choseGroup,0,0)
    let box
    dertaX=dertaX*0.785
    let changeMargintopAndTop = (domId,type, unit_top) => {//一定是上边框被拉动才会触发
        let top = type
        let bottom = type
        if (top == "margin-bottom") { top = "margin-top" }
        if (box.style[top] != "" || top.indexOf("margin") > -1) {//left与right同时存在，则left的优先级高于right
            let standard = getStandard(domId, unit_top)
            let preTop = box.style[top].split(unit_top)[0] * 1//原先左边
            let transDiff = dertaY / standard[1]//获取在主屏移动距离相当于在当前操作元素的部分的值

            transDiff = dertaY / standard[1]
            if (unit_top == "%" && box.parentNode.id != "projectFrameInner") {//%是根据宽度定义的，需要转换
                transDiff = dertaY / standard[0]
            }
            preTop = preTop + transDiff
            box.style[top] = preTop + unit_top
        } else if (box.style[bottom] != "") {
            let standard = getStandard(domId, unit_top)
            let preBottom = box.style[top].split(unit_top)[0] * 1//原先左边
            let transDiff = dertaY / standard[1]//获取在主屏移动距离相当于在当前操作元素的部分的值

            transDiff = dertaY / standard[1]
            if (unit_bottom == "%" && dom.parentNode.id != "projectFrameInner") {//%是根据宽度定义的，需要转换
                transDiff = dertaY / standard[0]
            }
            preTop = preTop - transDiff
            box.style[bottom] = preBottom + unit_bottom
        } else {
            let preT = box.offsetTop + dertaY
            box.style[top] = preT + "px"
        }
    }
    let changeMarginleftAndLeft = (domId,type, unit_left) => {//一定是左边框拉动才会触发
        let left = type=="left"?"left":"margin-left"
        let right = type=="left"?"right":"margin-left"
        if (left == "margin-right") { left = "margin-left" }
        if (box.style[left] != "" || left.indexOf("margin") > -1) {//left与right同时存在，则left的优先级高于right
            let standard = getStandard(domId, unit_left)
            let getReal = box.style[left].split(unit_left)[0] * 1 / window.ScreenPercent
            let preLeft = 0//原先左边
            if (getReal) {
                preLeft = getReal
            }
			console.log(window.ScreenPercent,'jjj')
            let transDiff = dertaX / (standard[0]*window.ScreenPercent)//获取在主屏移动距离相当于在当前操作元素的部分的值
            preLeft = preLeft + transDiff
            box.style[left] = preLeft + unit_left
        } else if (box.style[right] != "") {
            let standard = getStandard(domId, unit_left)
            let preRight = box.style[right].split(unit_left)[0] * 1//原先左边
            let transDiff = dertaX / (standard[0]*window.ScreenPercent)//获取在主屏移动距离相当于在当前操作元素的部分的值
            transDiff = dertaX / (standard[0]*window.ScreenPercent)
            preRight = preRight - transDiff
            box.style[right] = preRight + unit_left
        } else {
            let preLeft = box.offsetLeft + dertaX*window.ScreenPercent
            box.style[left] = preLeft + "px"
        }
    }
    Object.keys(choseGroup).forEach(domId => {
        box = document.getElementById(domId)
        let unit_height = getWHUnitValue(0, "height", domId)
        let unit_width = getWHUnitValue(0, "width", domId)
        let preHeight
        let preWidth
        let transform = box.style.transform.split(" ")
        let addScale_width = 1, addScale_height = 1
        transform.forEach(s => {
            if (s.indexOf("scale(") > -1) {
                if (s.indexOf(",") > -1) {//scale同时存在X,y
                    let sp = s.match(/scale\((\S*)\)/)[1].split(",")
                    let w = sp[0] * 1, h = sp[1] * 1
                    addScale_width *= w
                    addScale_height *= h
                } else {
                    let wh = s.match(/scale\((\S*)\)/)[1] * 1
                    addScale_width *= wh
                    addScale_height *= wh
                }
            }
            if (s.indexOf("scaleX(") > -1) {
                let wh = s.match(/scaleX\((\S*)\)/)[1] * 1
                addScale_width *= wh
            }
            if (s.indexOf("scaleY(") > -1) {
                let wh = s.match(/scaleY\((\S*)\)/)[1] * 1
                addScale_height *= wh
            }
        })
        if (addScale_height != 0) heightBili = heightBili / addScale_height
        if (addScale_width != 0) widthBili = widthBili / addScale_width
        if (origin.indexOf("top") > -1 || origin.indexOf("bottom") > -1) {//仅当包含y轴操作时才计算
            preHeight = box.style.height.split(unit_height)[0] * 1 * (heightBili)
            preHeight = preHeight.toFixed(1)
        }
        if (origin.indexOf("left") > -1 || origin.indexOf("right") > -1) {
            preWidth = box.style.width.split(unit_width)[0] * 1 * (widthBili)
            preWidth = preWidth.toFixed(1)
        }
        box.style.height = preHeight + unit_height
        box.style.width = preWidth + unit_width

        let unit_top, unit_left
        let yBili = dertaY / preY
        let xBili = dertaX
        let position = box.style.position
        if (position == "fixed" || position == "absolute") {
            unit_left = "px"
            unit_top = "px"
            if (box.style.top != "")
                unit_top = getUnit(box.style.top)
            else if (box.style.bottom != "")
                unit_top = getUnit(box.style.bottom)
            if (box.style.left != "")
                unit_left = getUnit(box.style.left)
            else if (box.style.right != "")
                unit_left = getUnit(box.style.right)
            //针对top,bottom,left,right
            if (origin.indexOf("bottom") > -1) {
                changeMargintopAndTop(domId,"top", unit_top)
            }
            if (origin.indexOf("right") > -1) {
                if(box.style.left != ""){//如果是左侧栏有拉伸且原先是以left定位的就改变，若是以right定位的则不需改变
                    changeMarginleftAndLeft(domId,"left", unit_left)
                }
            }else if(origin.indexOf("left") > -1){
                if(box.style.right != ""){//如果是右侧有拉伸且原先是以right定位的就改变，若是以left定位的则不需改变
                    console.log("右侧拉伸")
                    changeMarginleftAndLeft(domId,"left", unit_left)
                }
            }
        }
        else if (position == "static" || position == "relative" || position == "") {
            unit_left = "px"
            unit_top = "px"
            if (box.style.marginTop != "")
                unit_top = getUnit(box.style.marginTop)
            else if (box.style.marginBottom != "")
                unit_top = getUnit(box.style.marginBottom)
            if (box.style.marginLeft != "")
                unit_left = getUnit(box.style.marginLeft)
            else if (box.style.marinRight != "")
                unit_left = getUnit(box.style.marginRight)
            if (origin.indexOf("bottom") > -1) {
                changeMargintopAndTop(domId,"margin-top", unit_top)
            }
            if (origin.indexOf("right") > -1) {
                changeMarginleftAndLeft(domId,"margin-left", unit_left)
            }
        }
    })
}
let checkSame=function(domId,styleName,styleValue){
	if(store==null){
		store = structStore()
	}
	const domStyle = store.STYLESTRUCT[domId].style
	return domStyle[styleName]==styleValue
}
export default {
    name: "StyleEngine",
    process,
    scale,
    move,
    getUnit,
    getStandard,
	checkSame
}