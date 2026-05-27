

let createNewFolder=function(){//新建文件夹
			let newFolderNumber=0
			for(let key in this.entrance){
				if(key.startsWith('新建文件夹')){
					newFolderNumber++
				}
			}
			if(newFolderNumber==0){
				newFolderNumber=""
			}
			this.entrance['新建文件夹'+newFolderNumber]={type:"folder",children:{}}
			this.fileList.push({
				name:"新建文件夹"+newFolderNumber,
				type:"folder"
			})
			newFolderNumber=null
			//console.log(this,this.entrance,this.fileList)
		}
let lastCopyList=[]//最近一次复制的对象列表
let lastCutList=[]//最近一次剪切的对象列表
let path=""
let copy=function(targets){//targets为需要剪贴的目标列表,传入的就是文件名称
	this.menu.isCut=false////复制时将剪切状态至假
	lastCutList=[]//复制时将剪切列表至空
	let len=targets.length
	if(len>30){
		alert("超出允许数量(30)")
	}else{
		lastCopyList=targets
		let existKey=Object.keys(this.store.CUTBORD)//已有的剪贴文件
		if(existKey.length>=30){//最多允许30个剪贴文件
			let empty=existKey.length-length//移除站位
			for(let i=0;i<empty;i++){
				delete this.store.CUTBORD[existKey.length-1-i]
			}
		}
		let prePath=JSON.parse(JSON.stringify(this.path[this.pathIndex[this.nowHubType]]))//重新生成一个对象
		prePath.splice(0,1)//移除“根目录”
		path=prePath.join("/")
		for(let index in targets){
			let file=targets[index]//获取每个文件
			let copyData={targettype:"file",type:file.type,name:file.name,data:this.entrance[file.name].data}
			if(file.type=='folder'){
				copyData['children']=JSON.parse(JSON.stringify(this.entrance[file.name].children))//创建新的对象
			}
			this.store.CUTBORD[file.name]=copyData//类型为文件,prepath原路径，data文件数据
		}
	}
}
let cut=function(targets){
	lastCopyList=[]//剪切时将复制列表至空
	lastCutList=[]
	console.log(targets,"剪切")
	this.menu.isCut=true////复制时将剪切状态至假
	let len=targets.length
	if(len>30){
		alert("超出允许数量(30)")
	}else{
		lastCutList=targets
		let existKey=Object.keys(this.store.CUTBORD)//已有的剪贴文件
		if(existKey.length>=30){//最多允许30个剪贴文件
			let empty=existKey.length-length//移除站位
			for(let i=0;i<empty;i++){
				delete this.store.CUTBORD[existKey.length-1-i]
			}
		}
		let prePath=JSON.parse(JSON.stringify(this.path[this.pathIndex[this.nowHubType]]))//重新生成一个对象
		prePath.splice(0,1)//移除“根目录”
		path=prePath.join("/")//原文件路径
		for(let index in targets){
			let file=targets[index]//获取每个文件
			let cutData={targettype:"file",type:file.type,name:file.name,data:this.entrance[file.name].data}
			if(file.type=='folder'){
				cutData['children']=JSON.parse(JSON.stringify(this.entrance[file.name].children))//创建新的对象
			}
			this.store.CUTBORD[file.name]=cutData//类型为文件,prepath原路径，data文件数据
		}
	}
}
let preEntrance
let patse=function(){
	this.menu.isPatse=true
	console.log("patse",lastCopyList)
	for(let index in lastCopyList){
		let fileName=lastCopyList[index].name
		let data=this.store.CUTBORD[fileName]
		this.newFile=data//由于检测是否同名后会调用上传操作，故此处设定新文件为粘贴对象（假文件）
		let patseData={name:data.name,type:data.type,data:data.data}
		if(patseData.type=='folder'){
			patseData['children']=data.children
		}
		
		if(this.checkName(patseData,1)){//当存在同名文件时，在checkName继续调用uploadAction操作
			this.uploadAction(patseData,null,1)
		}
		
	}
	if(lastCutList.length!=0){
		console.log("JIANQIE",lastCutList)
		let entranceTemp=this.store.HUB[this.hubListIndex[this.hub]][this.pathIndex[this.nowHubType]].children;//最外层
		let prePathList=path.split("/")
		console.log(prePathList)
		let temp=[]
		for(let i in prePathList){
			if(prePathList[i].length>0){
				temp.push(prePathList[i])
			}
		}
		prePathList=JSON.parse(JSON.stringify(temp))
		temp=null
		for(let i=0;i<prePathList.length;i++){//定位到原文件所在文件夹
			try{
				entranceTemp=entranceTemp[prePathList[i]].children
			}catch{
				continue
			}
			
		}
		preEntrance=entranceTemp
		console.log(preEntrance)
		for(let index in lastCutList){
			let fileName=lastCutList[index].name
			let data=this.store.CUTBORD[fileName]
			this.newFile=data//由于检测是否同名后会调用上传操作，故此处设定新文件为粘贴对象（假文件）
			let patseData={name:data.name,type:data.type,data:data.data}
			if(patseData.type=='folder'){
				patseData['children']=data.children
			}
			if(this.checkName(patseData,1)){//当存在同名文件时，在checkName继续调用uploadAction操作
				this.uploadAction(patseData,null,1)
			}
		}
	}
}
let getPreEntrance=function(){
	return preEntrance
}
let alpha=[]

function getRandint(end){
	let i=Math.random()
	i=i*end
	return i.toFixed(0)*1
}
let removeFile=function(fileName,prePath){
	try{
		console.log(prePath)
		if(alpha.length==0){
			for(let i=0;i<26;i++){
				alpha.push(String.fromCharCode(65+i))
			}
			for(let i=0;i<26;i++){
				alpha.push(String.fromCharCode(97+i))
			}
		}
		let idAlpha=[]
		for(let i=0;i<6;i++){
			let randm=getRandint(48)
			idAlpha.push(alpha[randm])
		}
		idAlpha=idAlpha.join("")+getRandint(100000)
		this.store.RECYCLE[fileName]={
			type:"file",
			prePath:prePath,
			recycleId:idAlpha
		}
		delete this.entrance[fileName]
		return true
	}catch(e){
		console.log(e)
		return false
	}
}

let createPath=function(path){
	try{
		let temp=[]
		for(let i=1;i<path.length;i++){//从1开始，跳过 根目录
			temp.push(path[i])
		}
		console.log(path)
		let out
		if(temp.length>0){
			out="/"+temp.join("/")
		}else{
			out=temp.join("/")
		}
		return out
	}catch(e){
	}

}
let search=function(targetName,type,entrance=this.entrance,path=JSON.parse(JSON.stringify(this.path[this.pathIndex[this.nowHubType]]))){
	console.log(targetName)
	try{
		for(let key in entrance){
			let keyTemp=key.replace(" ","")
			if(type==0){//精确查找
				if(key==targetName || keyTemp.startsWith(targetName+".")){
					this.search.result.push({name:key,path:createPath(path)+'/'+key})
				}
			}else{
				if(keyTemp.indexOf(targetName)>-1){
					this.search.result.push({name:key,path:createPath(path)+'/'+key})
				}
			}
			try{
				if(Object.keys(entrance[key].children).length>0){//递归向下查找
					let newPath=new Array()
					for(let i in path){
						newPath.push(path[i])
					}
					newPath.push(key)
					search.call(this,targetName,type,entrance[key].children,newPath)
				}
			}catch(e){
			}
		}
	}catch(e){
	}


}
export default{
	name:"hubFunctions",
	createPath,
	createNewFolder,
	copy,
	cut,
	patse,
	removeFile,
	getPreEntrance,
	search,
}