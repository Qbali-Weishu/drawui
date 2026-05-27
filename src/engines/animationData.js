///用于处理动画数据

let unsetList=[]
let nowProcessNode=""
//把多个相同的处理函数归结到一个
function whltrb(value,key){
	let chilren=value.children
	if(value.condition.bindList !== null && value.condition.bindList.chilren>0){
		unsetList.push(key)
		return {}
	}
	let returnData={}
	if(chilren.value.length==0 || !chilren.value){
		return {}
	}
	returnData[key]={
			value:chilren.value,
			unit:chilren.unit
		}
	return returnData
}
const properType ={
	'margin':(value)=>{
		let chilren=value.children
		let returnData={}
		for(let key in chilren){
			if(chilren[key].condition.bindList !== null && chilren[key].condition.bindList.chilren>0){
				unsetList.push(key)
				continue
			}
			if(chilren[key].value)
				returnData[key]={
					value:chilren[key].value,
					unit:chilren[key].unit || 'px'
				}
			else
				returnData[key]={}
		}
		return returnData
	},
	'padding':(value)=>{
		let chilren=value.children
		let returnData={}
		for(let key in chilren){
			if(chilren[key].condition.bindList !== null && chilren[key].condition.bindList.chilren>0){
				unsetList.push(key)
				continue
			}
			if(chilren[key].value)
				returnData[key]={
					value:chilren[key].value,
					unit:chilren[key].unit
				}
			else
				returnData[key]={}
		}
		return returnData
	},
	'borderRadius':(value)=>{
		let chilren=value.children
		let returnData={}
		for(let key in chilren){
			if(chilren[key].condition.bindList !== null && chilren[key].condition.bindList.chilren>0){
				unsetList.push(key)
				continue
			}
			if(chilren[key].value)
				returnData[key]={
					value:chilren[key].value,
					unit:chilren[key].unit
				}
			else
				returnData[key]={}
		}
		return returnData
	},
	height:(value)=>{
		return whltrb(value,'height')
	},
	width:(value)=>{
		return whltrb(value,'width')
	},
	left:(value)=>{
		return whltrb(value,'left')
	},
	top:(value)=>{
		return whltrb(value,'top')
	},
	right:(value)=>{
		return whltrb(value,'right')
	},
	bottom:(value)=>{
		return whltrb(value,'bottom')
	},
	background:(value)=>{
		let chilren=value.children
		let returnData={}
		let ref='backgroundColor'
		if(chilren[ref].value){
			returnData['backgroundColor']={
				value:processColor(window.getComputedStyle(nowProcessNode).backgroundColor) //chilren[ref].value
			}
		}
		return returnData
	},
	effect:(value)=>{
		let filter=value.children.filter
		let backFilter=value.children.backdropFilter
		let returnData={}
		if(filter.value.length>0){
			if(filter.condition.bindList !== null && filter.condition.bindList.length>1){
				//跳过
			}else{
				for(let i=0;i<filter.value.length;i++){
					if(filter.value[i].data.filterType=='blur'){
						returnData['blur']={
							value:filter.value[i].data.value,
							unit:'px'
						}
					}
				}
			}
		}
		if(backFilter.value.length>0){
			if(backFilter.condition.bindList !== null && backFilter.condition.bindList.length>1){
				//跳过
			}else{
				for(let i=0;i<backFilter.value.length;i++){
					if(backFilter.value[i].data.filterType=='blur'){
						returnData['backBlur']={
							value:backFilter.value[i].data.value,
							unit:'px'
						}
					}
				}
			}
		}
		return returnData
	},
	border:(value)=>{
		let chilren=value.children
		let returnData={}
		for(let key in chilren){
			if(chilren[key].condition.bindList !== null && chilren[key].condition.bindList.chilren>0){
				unsetList.push(key)
				continue
			}
			returnData[key+'Color']={
				value:processColor(window.getComputedStyle(nowProcessNode)[key+'Color']), //chilren[key].value.color,
				unit:''
			}
			returnData[key+'Width']={
				value:chilren[key].value.width,
				unit:'px'
			}
		}
		return returnData
	},
	opacity:(value)=>{
		let chilren=value.children
		if(value.condition.bindList !== null && value.condition.bindList.chilren>0){
			unsetList.push(key)
			return {}
		}
		let returnData={
			value:chilren.opacity,
			unit:'%'
		}
	},
	transform:(value)=>{
		
	}
}
function processColor(color){
	let list=""
	if(color.startsWith("rgba")){
		list=color.replace("rgba(","").replace(")","").split(",")
	}else if(color.startsWith("rgb")){
		list=color.replace("rgb(","").replace(")","").split(",")
	}else{
		return color
	}
	for(let i=0;i<list.length;i++){
		list[i]=(list[i]*1).toString(16)
		if(list[i].length<2){
			list[i]="0"+list[i]
		}
	}
	return '#'+list.join("")
}
function processAnimateData(nodeId){
	nowProcessNode=document.querySelector('.'+nodeId.replace('$NODE:',''))
	if(document.getElementById(nodeId).dataset.node=='1'){
		nodeId='$NODE:'+nodeId
	}
	//读取样式数据
	let styleData=System.metaData.STYLESTRUCT[nodeId].style
	let returnData={}
	unsetList=[]
	let processedData={}
	for(let key in styleData){
		if(properType[key]){
			processedData=properType[key](styleData[key])
			for(let innerKey in processedData){
				if(processedData[innerKey].value){
					returnData[innerKey]=processedData[innerKey]
				}
			}
		}
	}
	return returnData
	/*
		可执行属性
		margin borderRadius height width  backgroundColor
		boxShadow filter backdropFilter border{width,color} opacity padding top bottom left
		right fontWeight fontSize lineHeight letterSpacing color textShadow
		transform  
	*/
}

System.processAnimateData=processAnimateData