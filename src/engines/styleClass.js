/*css样式处理类*/
import stylePropertype from "../components/styleAttributes/stylePropertype.js"
let render=false
//变量绑定处理
let bindStyleList={}
//标记当前正在处理组件样式
let processingStyle=false
function nameToLower(name){
	return name.replace(/([A-Z])/g,function($,$1){
			return "-"+$1.toLowerCase()
	})
}

function changeToClass(dom,key,value){
	dom=dom.replace('$NODE:','')
	let styleNode=document.getElementById(dom+"_style")
	if(!styleNode){
		//若class样式节点不存在时，将创建
		styleNode=document.createElement("style")
		styleNode.innerText=`
			.${dom}{
				
			}
		`
		styleNode.id=dom+"_style"
		document.getElementsByTagName('head')[0].appendChild(styleNode)
	}
	let nameExp=new RegExp(`\\.\\s*${dom}\\s*\\{{1}`,'g')
	let styleContent="{"+styleNode.innerText.replace(nameExp,"").replace("}","")
	//转为aaa-bbb-ccc的格式
	let name=nameToLower(key)
	let reg=new RegExp(`(;|{)\\s*${name}(:{1})([^;])*;{0,1}`,'g')
	if(value){
		if(reg.test(styleContent)){
				styleContent=styleContent.replace(reg,`${RegExp.$1}${name}:${value};`)
		}else{
			styleContent+=`${name}:${value};`
		}
	}else{
		try{
			if(styleContent.match(reg)[0].startsWith("{"))
				styleContent=styleContent.replace(reg,`{`)
			else
				styleContent=styleContent.replace(reg,`;`)
		}catch{}
	}
	styleNode.innerText=`.${dom}${styleContent}}`
}

function setTo(dom,key,value){
	try{
		if(dom){
			changeToClass(dom,key,value)
		}
			
			//document.getElementById(dom).style[key]=value
	}catch{}
		
	}

//转换变量取值
/*function transfromTargetdata(value){
	try{
		//为变量,此时value为变量名，但struct中对变量名存储不是以变量名为键名，故需要比对,从System.componentVar中提取
		new Function(`
			let ${value}=0
		`)
		let varValue
		//变量值键名参考
		let varTypeRef
		for(let key in System.componentVar){
			if(System.componentVar[key].name==value){
				
			}
		}
		return System.componentVar[value].
	}catch(e){
		if(!isNaN(value)){
			//为数字
			return this.typeColor.Number
		}else if(value=='false' || value=='true'){
			return this.typeColor.Boolean
		}else if(value=='null' || value=='undefine'){
			return this.typeColor.Other
		}else{
			try{
				new Function(
				`
					let a=${value}
				`)
				return '#00B1FF'
			}catch{
				//字符串错误
				return '#f48771'
			}
		}
	}
}*/

const translateBind=(bindData)=>{
	if(!bindData) return ""
	if(bindData.bindList === null || Object.prototype.toString.call(bindData.bindList) !=='[object Array]')
		return ""
	//默认索引
	let defaultIndex=bindData.default
	//默认参数
	let defaultData=bindData.bindList[defaultIndex].targetData
	//先处理出各个绑定项的数据
	let condition=[],statusIndex,targetData=[],expressionList=[]
	let statusName
	let conditonItem
	let expression
	for(let i=0;i<bindData.bindList.length;i++){
		condition=[]
		if(i==defaultIndex){
			continue
		}
		let logic=bindData.bindList[i].logic
		for(let j=0;j<logic.length;j++){
			if(Object.prototype.toString.call(logic[j])=='[object String]'){
				//自己输入的表达式或&&、||，直接带入
				condition.push(logic[j])
			}else{
				//表达式索引
				statusIndex=logic[j]
				//变量名
				statusName=bindData.bindList[i].sourceList[statusIndex]
				//表达式
				conditonItem=bindData.bindList[i].condition[statusIndex]
				expression=statusName+conditonItem.expression+conditonItem.value
				condition.push(expression)
			}
		}
		//合并表达式
		expressionList.push(condition.join(''))
		//插入数据
		targetData.push(bindData.bindList[i].targetData)
	}
	//最后存入默认值
	targetData.push(defaultData)
	let processedBind=[]
	//遍历targetData，因为targetData还有多出来的一个默认值
	let sencement=""
	for(let i=0;i<expressionList.length;i++){
		sencement=`(${expressionList[i]})?${targetData[i]}:`
		if(i==expressionList.length-1){
			//插入默认值
			sencement+=targetData[i+1]
		}
		if(i>0){
			sencement="("+sencement+")"
		}
		processedBind.push(sencement)
	}
	return processedBind.join("")
}
var timeout={}
const styleFactory={
	width:(value,id,write=true,option={reload:false})=>{
		let width=(value.children.value*1).toFixed(0)+value.children.unit
		System.setStyleCache("width",value,width)
		if(processingStyle){
			bindStyleList['width']=translateBind(value.condition)
			return
		}
		if(write || render)
			setTo(id,"width",width)
		if(option.reload){
			//高度中计算宽高比后调用此处修改
			System.writeStyle(id,'width',value,true,'width')
		}else{
			try{
				if(write){
					let asp=System.requestCssStyle(id)['aspectRatio'].children
					let preHeight=System.requestCssStyle(id)['height']
					if(asp){
						if(asp.set){
							//计算高的大小
							let height=value.children.value*1/(asp.width*1/asp.height*1)
							preHeight.children.value=height.toFixed(0)*1
							styleFactory.height(preHeight,id,true,{reload:true})
						}
					}
				}
			}catch(e){
			}
			if(write){
				System.writeStyle(id,'width',value)
			}
		}
	},
	height:(value,id,write=true,option={reload:false})=>{
		let height
		if(processingStyle){
			bindStyleList['height']=translateBind(value.condition)
			return
		}
		if(value.condition.bindList===null){
			height=(value.children.value*1).toFixed(0)+value.children.unit
		}
		if(write || render)
			setTo(id,"height",height)
		System.setStyleCache("height",value,height)
		if(option.reload){
			//宽度中计算宽高比后调用此处修改
			System.writeStyle(id,'height',value,true,'height')
			System.reloadData('height',value)
		}else{
			try{
				if(write){
					let asp=System.requestCssStyle(id)['aspectRatio'].children
					let preWidth=System.requestCssStyle(id)['width']
					if(asp){
						if(asp.set){
							//计算高的大小
							let width=value.children.value*1*asp.width/asp.height*1
							preWidth.children.value=width.toFixed(0)*1
							styleFactory.width(preWidth,id,true,{reload:true})
						}
					}
				}	
			}catch{}
			if(write)
				System.writeStyle(id,'height',value)
		}
	},
	top:(value,id,write=true,option={})=>{
		let top=(value.children.value*1).toFixed(0)+value.children.unit
		System.setStyleCache("top",value,top)
		if(processingStyle){
			bindStyleList['top']=translateBind(value.condition)
			return
		}
		if(write || render)
			setTo(id,"top",top)
		if(write){
			System.writeStyle(id,'top',value)
		}
	},
	left:(value,id,write=true,option={})=>{
		let left=(value.children.value*1).toFixed(0)+value.children.unit
		System.setStyleCache("left",value,left)
		if(processingStyle){
			bindStyleList['left']=translateBind(value.condition)
			return
		}
		if(write || render)
			setTo(id,"left",left)
		if(write){
			System.writeStyle(id,'left',value)
		}
	},
	right:(value,id,write=true,option={})=>{
		let right=(value.children.value*1).toFixed(0)+value.children.unit
		System.setStyleCache("right",value,right)
		if(processingStyle){
			bindStyleList['right']=translateBind(value.condition)
			return
		}
		if(write || render)
			setTo(id,"right",right)
		if(write){
			System.writeStyle(id,'right',value)
		}
	},
	bottom:(value,id,write=true,option={})=>{
		let bottom=(value.children.value*1).toFixed(0)+value.children.unit
		System.setStyleCache("bottom",value,bottom)
		if(processingStyle){
			bindStyleList['bottom']=translateBind(value.condition)
			return
		}
		if(write || render)
			setTo(id,"bottom",bottom)
		if(write){
			System.writeStyle(id,'bottom',value)
		}
	},
	float:(value,id,write=true,option={})=>{
		if(processingStyle){
			bindStyleList['float']=translateBind(value.condition)
			return
		}
		let data=JSON.parse(JSON.stringify(stylePropertype['float']))
		data.children.float=value.value
		data.condition=value.condition
		System.setStyleCache('float',value.value,value.value)
		if(write || render){
			setTo(id,"float",value.value)
			
		}
		if(write) System.writeStyle(id,"float",data)
	},
	padding:(value,id,write=true,option={})=>{
		let data=JSON.parse(JSON.stringify(stylePropertype['padding']))
		let returnData={}
		for(let key in value.children){
			data.children[key]=value.children[key].value+value.children[key].unit
			value.children[key].value*=1
			if(processingStyle){
				bindStyleList[key]=translateBind(value.children[key].condition)
				continue
			}
			if(write || render)
				setTo(id,key,value.children[key].value+value.children[key].unit)
			returnData[key]=value.children[key].value+value.children[key].unit
		}
		if(processingStyle) return
		System.setStyleCache("padding",data,returnData)
		if(write)
			System.writeStyle(id,"padding",value)
	},
	margin:(value,id,write=true,option={})=>{
		if(!value) return 
		let data=JSON.parse(JSON.stringify(stylePropertype['margin']))
		let returnData={}
		let unit
		for(let key in value.children){
			if(processingStyle){
				bindStyleList[key]=translateBind(value.children[key].condition)
				continue
			}
			unit=value.children[key].unit || 'px'
			data.children[key]=value.children[key].value+unit
			if(value.children[key].value){
				value.children[key].value*=1
				if(write || render)
					setTo(id,key,value.children[key].value+unit)
				returnData[key]=value.children[key].value+unit
			}else{
				if(write || render)
					setTo(id,key,value.children[key].value)
			}
			
		}
		if(processingStyle) return
		System.setStyleCache("margin",data,returnData)
		if(write)
			System.writeStyle(id,"margin",value)
	},
	display:(value,id,write=true,option={})=>{
		
		if(write || render){
			setTo(id,"display",value.value)
		}
			
		let data={
			value:value.value,
			children:{}
		}
		let returnData={
			'display':value.value
		}
		if(value.value=='flex'){
			for(let key in value.children){
				data.children[key]=value.children[key].value
				if(write){
					setTo(id,key,value.children[key].value)
				}
				if(key!='children')
					returnData[key]=value.children[key].value
			}
		}
		System.setStyleCache("display",data,returnData)
		if(write)
			System.writeStyle(id,"display",value)
	},
	font:(value,id,write=true,option={})=>{
		
		let data={
			"value":"",
			children:{}
		}
		let returnData={}
		for(let key in value.children){
			data.children[key]=value.children[key].value+value.children[key].unit
			if(write || render)
				setTo(id,key,value.children[key].value+(value.children[key].unit || ''))
			returnData[key]=value.children[key].value+value.children[key].unit
		}
		if(processingStyle) return data
		System.setStyleCache('font',data,returnData)
		if(write)
			System.writeStyle(id,'font',data)
		
	},
	borderRadius:(value,id,write=true,option={})=>{
		let data={
			"value":"",
			children:{}
		}
		let returnData={}
		let styleValue
		for(let key in value.children){
			if(processingStyle){
				bindStyleList[key]=translateBind(value.children[key].condition)
				continue
			}
			value.children[key].value*=1
			data.children[key]=value.children[key].value+value.children[key].unit
			styleValue=value.children[key].value+value.children[key].unit
			if(write || render)
				setTo(id,key,styleValue)
			returnData[key]=styleValue
		}
		if(processingStyle) return
		System.setStyleCache('borderRadius',data,returnData)
		if(write)
		{
			System.writeStyle(id,"borderRadius",value)
		}
	},
	border:(value,id,write=true,option={})=>{
		
		if(processingStyle){
			for(let key in value.children){
				bindStyleList[key]=translateBind(value.children[key].condition)
			}
			return
		}
		
		let retrunData={}
		if(value.value==null || value.value==''){
			let text=""
			for(let key in value.children){
				
				text=`${value.children[key].value['width'] || 1}px ${value.children[key].value['style'] || 'solid'} ${value.children[key].value['color'] || '#ffffff'}`
				if(write || render)
					setTo(id,key,text)
				retrunData[key]=text
			}
		}else{
			let text=`${value.value['width'] || 1}px ${value.value['style'] || 'solid'} ${value.value['color'] || '#ffffff'}`
			if(write || render)
				setTo(id,'border',text)
				retrunData['border']=text
			}
		System.setStyleCache("border",value,retrunData)
		if(write){
			
			System.writeStyle(id,"border",value)
			
		}
		
	},
	background:(value,id,write=true,option={})=>{
		let data=JSON.parse(JSON.stringify(stylePropertype['background']))
		let returnData={}
		let propertypeValue=[]
		for(let key in value.children){
			if(processingStyle){
				bindStyleList[key]=translateBind(value.children[key].condition)
				continue
			}
			data.children[key]=value.children[key]
			returnData[key]=value.children[key].value
			if((write || render) && ['backgroundColor','backgroundRepeat'].includes(key)){
				setTo(id,key,value.children[key].value)
			}
			else if(write || render){
				propertypeValue=[]
				for(let i=0;i<value.children[key].length;i++){
					propertypeValue.push(value.children[key][i].value)
				}
				propertypeValue=propertypeValue.join(",")
				setTo(id,key,propertypeValue)
			}
		}
		if(processingStyle) return
		System.setStyleCache("background",data,returnData)
		if(write)
			System.writeStyle(id,"background",data)
	},
	effect:(value,id,write=true,option={})=>{
		if(processingStyle){
			bindStyleList['boxShadow']=translateBind(value.children['boxShadow'].condition)
			bindStyleList['filter']=translateBind(value.children['filter'].condition)
			bindStyleList['backdropFilter']=translateBind(value.children['backdropFilter'].condition)
			return
		}
		try{
			let sumHex=(alpha)=>{
				let hex=(255*alpha.split("%")[0]*1/100).toFixed(0)*1
				return hex.toString(16)
			}
			
			
			
			let shadow=value.children['boxShadow'].value
			let filter=value.children['filter'].value
			let backdropFilter=value.children['backdropFilter'].value
			
			let shadowData=[],filterData=[],backdropData=[]
			let temp=""
			for(let i=0;i<shadow.length;i++){
				temp=`${shadow[i].data.X}px ${shadow[i].data.Y}px ${shadow[i].data.B}px ${shadow[i].data.S || 0}px ${shadow[i].data.code?shadow[i].data.color:shadow[i].data.color+sumHex(shadow[i].data.alpha)} ${shadow[i].type=="内阴影"?'inset':''}`
				shadowData.push(temp)
			}
			temp=""
			shadowData=shadowData.join(",")
			let unit=""
			for(let i=0;i<filter.length;i++){
				if(filter[i].filterType=='drop-shadow'){
					temp=`drop-shadow(${filter[i].data.X}px ${filter[i].data.Y}px ${filter[i].data.B}px ${filter[i].data.S || 0}px ${filter[i].data.code?filter[i].data.color:filter[i].data.color+sumHex(filter[i].data.alpha)})`
				}else{
					if(filter[i].data.filterType=='blur') unit="px"
					else if(filter[i].data.filterType=='hue-rotate') unit='deg'
					else unit="%"
					temp=`${filter[i].data.filterType}(${filter[i].data.value+unit})`
				}
				filterData.push(temp)
			}
			temp=""
			filterData=filterData.join(" ")
			
			unit=""
			for(let i=0;i<backdropFilter.length;i++){
				if(backdropFilter[i].data.filterType=='drop-shadow'){
					temp=`drop-shadow(${backdropFilter[i].data.X}px ${backdropFilter[i].data.Y}px ${backdropFilter[i].data.B}px ${backdropFilter[i].data.S || 0}px ${backdropFilter[i].data.code?backdropFilter[i].data.color:backdropFilter[i].data.color+sumHex(backdropFilter[i].data.alpha)})`
				}else{
					if(backdropFilter[i].data.filterType=='blur') unit="px"
					else if(backdropFilter[i].data.filterType=='hue-rotate') unit='deg'
					else unit="%"
					temp=`${backdropFilter[i].data.filterType}(${backdropFilter[i].data.value+unit})`
				}
				backdropData.push(temp)
			}
			temp=""
			backdropData=backdropData.join(" ")
			System.setStyleCache("effect",value,{boxShadow:shadowData,filter:filterData,backdropFilter:backdropData})
			if(write || render){	
				setTo(id,"boxShadow",shadowData)
				setTo(id,"filter",filterData)
				setTo(id,"backdropFilter",backdropData)
			} 
			if(write){
				System.writeStyle(id,"effect",value)
			}
		}catch{}
	},
	opacity:(value,id,write=true,option={})=>{
		//统一化成百分比，原小数形式会在opacity编辑中转换
		let returnData=value.value+'%',saveValue=value
		if(processingStyle){
			bindStyleList['opacity']=translateBind(value.condition)
			return
		}
		System.setStyleCache("opacity",saveValue,returnData)
		if(write || render){
			setTo(id,"opacity",returnData)
		}
		if(write){
			
			System.writeStyle(id,"opacity",saveValue)
		}
	},
	position:(value,id,write=true,option={})=>{
		if(processingStyle){
			bindStyleList['position']=translateBind(value.condition)
			return
		}
		try{
			System.setStyleCache("position",value.children.position,value.children.position)
			if(write || render){
				System.reloadData("position",value)
				setTo(id,"position",value.children.position)
			}
			if(write){
				System.writeStyle(id,"position",value)
			}
		}catch{}
	},
	transition:(value,id,write=true,option={})=>{
		/*
			transition:property name | duration | timing function | delay
		*/
		try{
			let transition=value.children.transition
			let transitionData=[]
			let temp=""
			for(let i=0;i<transition.length;i++){
				temp=`${transition[i].data.property} ${transition[i].data.duration}s ${transition[i].data.timing} ${transition[i].data.delay}s`
				transitionData.push(temp)
			}
			temp=""
			transitionData=transitionData.join(",")
			System.setStyleCache('transition',value,transitionData)
			if(write || render){
				setTo(id,"transition",transitionData)
				
			}
			if(write){
				System.writeStyle(id,"transition",value)
			}
		}catch{}
		
	},
	mixBlendMode:(value,id,write=true,option={})=>{
		System.setStyleCache("mixBlendMode",value,value.value)
		if(write || render){
			setTo(id,"mixBlendMode",value.value)
			
		}
		if(write) System.writeStyle(id,"mixBlendMode",value)
	},
	perspective:(value,id,write=true,option={})=>{
		let perspective=value.children['perspective'].value+"px"
		let perspectiveX=value.children['perspectiveOriginX'].value+"%"
		let perspectiveY=value.children['perspectiveOriginY'].value+"%"
		let returnData
		if(perspective.startsWith("none")){
			returnData=""
		}else{
			returnData={perspective:perspective,perspectiveOrigin:perspectiveX+" "+perspectiveY}
		}
		System.setStyleCache("perspective",value,returnData)
		if(write || render){
			if(value.children['perspective'].value!=='none'){
				setTo(id,'perspective',perspective)
				setTo(id,'perspectiveOrigin',perspectiveX+" "+perspectiveY)
			}else{
				setTo(id,'perspective','')
				setTo(id,'perspectiveOrigin','')
			}
		}
		if(write) System.writeStyle(id,"perspective",value)
	},
	transform:(value,id,write=true,option={removeOther:false})=>{
		const valueNumver={
						"透视":{
							number:1,
							'3dNumber':1
						},
						"旋转":{
							number:1,
							'3dNumber':4
						},
						"缩放":{
							number:2,
							'3dNumber':3
						},
						"拉伸":{
							number:2,
							'3dNumber':1
						},
						"移动":{
							number:2,
							'3dNumber':3
						}
					}
		const valueName={
			'旋转':'rotate',
			'3D旋转':'rotate3d',
			'缩放':'scale',
			'3D缩放':'scale3d',
			'拉伸':'skew',
			'移动':'translate',
			'3D移动':'translate3d',
			'透视':'perspective'
		}
		try{
			let transform=value.children['transform']
			
			let origin=value.children['transformOrigin']
			let transformData=[],returnTransform=[]
			let temp=""
			let transformValue=[]
			let type="",transType="",length=0,unit=""
			
			if(processingStyle){
				bindStyleList['transform']=translateBind(value.condition)
				bindStyleList['transformOriginX']=translateBind(value.children.transformOrigin.x.condition)
				bindStyleList['transformOriginY']=translateBind(value.children.transformOrigin.y.condition)
				return
			}
			
			
			for(let i=0;i<transform.length;i++){
				
				transType=transform[i].value.data.transType
				type=transform[i].value.type
				if(transType.startsWith("3D")){
					length=valueNumver[type]['3dNumber']
					
				}else{
					if(type=='旋转') unit="deg"
					length=valueNumver[type].number
				}
				for(let j=0;j<length;j++){
					//if(transType.startsWith("3D")){
					if(type!=='旋转' || transType.startsWith("3D"))
						unit=transform[i].value.data.unit[j]
					//}
					transformValue.push((transform[i].value.data.value[j]*1)+unit+" ")
				}
				temp=`${valueName[transType]}(${transformValue.join(',')})`
				transformValue=[]
				transformData.push(temp)
				if(!temp.startsWith('translate')){
					returnTransform.push(temp)
				}
			}
			temp=""
			transformData=transformData.join(" ")
			returnTransform=returnTransform.join(" ")
			let originX=""
			let originY=""
			try{
				if(['left','right','center'].includes(origin.x.value)){
					originX=origin.x.value
				}else if(!isNaN(origin.x.value)){
					originX=origin.x.value+origin.x.unit
				}else{
					System.showToast("变换原点参数错误")
				}
				
				if(['top','bottom','center'].includes(origin.y.value)){
					originY=origin.y.value
				}else if(!isNaN(origin.y.value)){
					originY=origin.y.value+origin.y.unit
				}else{
					System.showToast("变换原点参数错误")
				}
			}
			catch{
				originX='center'
				originY='center'
			}
			origin=originX+' '+originY
			let returnData
			if(write){
				if(transformData.length>0)
					returnData={transform:transformData,transformOrigin:origin}
				else{
					returnData=""
				}
			}else{
				if(transformData.length>0){
					if(option.removeOther){
						//返回已经移除禁止过后的数据
						returnData={transform:returnTransform,transformOrigin:origin}
					}else{
						//返回原数据
						returnData={transform:transformData,transformOrigin:origin}
					}
				}
				else{
					returnData=""
				}
			}
			System.setStyleCache('transform',value,returnData)
			if(write || render){	
					
					setTo(id,"transform",transformData)
					setTo(id,'transformOrigin',origin)
					
			}
			if(write) System.writeStyle(id,"transform",value)
		}catch{}
		System.setScaleValuePercent()
	},
	aspectRatio:(value,id,write=true,option={})=>{
		let data=""
		if(value.children['set']){
			data=value.children['width']+'/'+value.children['height']
		}else{
			data='unset'
			System.setStyleCache('aspectRatio',value)
			return ""
		}
		System.setStyleCache('aspectRatio',value,data)
		if(write || render){
			setTo(id,'aspectRatio',data)
		}
		if(write) System.writeStyle(id,'aspectRatio',value)

	}

}
//属性组修改
System.requestSetStyleGroup=(group)=>{
	
}

//直接调用工厂函数处理样式
System.requestProcessStyle=(factory,id,styleData,write=false)=>{
	render=true
	try{
		styleFactory[factory](styleData,id,write)
	}catch(e){
		console.error(e)
	}
	
	render=false
	/*let css=""
	let processData=System.requestGetCSS(factory).text
	let key=factory,value
	if(Object.prototype.toString.call(processData)=='[object Object]'){
		for(let key1 in processData){
			value=processData[key1]
			if(key1=='transform'){
				value=value.replace(transformReg,"")
			}else if(key1=='transition'){
				
			}
			if(value)
				{
					key1=key1.replace(/([A-Z])/g,function($,$1){
							return "-"+$1.toLowerCase()
						})
					css+=`${key1}:${value};`
				}
		}
	}else{
		if(key=='transform'){
			processData=processData.replace(transformReg,"")
		}else if(key=='transition'){
			
		}
		if(processData){
			key=key.replace(/([A-Z])/g,function($,$1){
					return "-"+$1.toLowerCase()
				})
			css+=`${key}:${processData};`
		}
		
	}
	return css*/
}
//读取对应id的css元数据 包含 style 与 class,若style与class有变量绑定，也在此处处理
System.getCSSMeta=(id,nowComponentMeta,comData)=>{
    let cssMeta=nowComponentMeta.STYLESTRUCT[id]
	let hasTransform=false
	let hasFloat=false
	try{
		let style=cssMeta.style
		let classList=cssMeta.class
		let cssText=""
		let cssClassList=[]
		let keyName=""
		for(let key in style){
			if(key=='transform') hasTransform=true
			if(key=='float' && ['left','right'].includes(style[key].children.float)) hasFloat=true
			keyName=key.replace(/([A-Z])/g,function($,$1){
				return '-'+$1.toLowerCase()
			})
		    if(style[key].condition.bindList==null){
		        //此样式无变量绑定
		        cssText+=System.requestProcessStyle(key,id,style[key])
		    }else{
		        cssText+=keyName+":"+style[key].condition.default+";"
		    }
		}
		//判断是否有transfrom属性，以保证层级正确
		let styleNode=document.getElementById(id+"_style")
		if(!styleNode){
			//若class样式节点不存在时，将创建
			styleNode=document.createElement("style")
			styleNode.innerText=`
				.${id}{
					
				}
			`
			styleNode.id=id+"_style"
			document.getElementsByTagName('head')[0].appendChild(styleNode)
		}
		
		if(!hasTransform){
			//直接修改class类内容
			let text=styleNode.innerText.replace("}","transform:scale(1);}")
			styleNode.innerText=text
		}
		if(!hasFloat){
			//直接修改class类内容
			let text=styleNode.innerText.replace("}","float:left;}")
			styleNode.innerText=text
		}
		for(let key in comData){
		    let test=new Function(`return ${classList[key]}`).call(comData)
		    if(test){
		        cssClassList.push(key)
		    }
		}
		return [cssText,cssClassList]
	}catch(e){
		console.error(e)
		return [null,null,false]
	}
	
    return "",[],hasFloat//styleText[String],classList[Array]
}
//设置样式变量绑定列表
System.setStyleBindList=(data,target)=>{
	let errorIndex=[]
	for(let key in System.operatingNodes){
		if(System.operatingNodes[key]){
			try{
				new Function('System',
				`
					System.metaData.STYLESTRUCT[${key}].style.${target}.condition=${data}
				`)(System)
			}catch(e){
				errorIndex.push({
					text:e,
					from:key
				})
			}
		}
	}
}

System.processStyleBind=(meta)=>{
	bindStyleList={}
	processingStyle=true
	for(let key in meta){
		styleFactory[key](meta[key])
	}
	processingStyle=false
	return bindStyleList
}
System.writeToClass=changeToClass
export {
	styleFactory
}