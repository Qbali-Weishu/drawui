addEventListener('message', preLogic => {
	let {data}=preLogic
	const comDesc=JSON.parse(data.comDesc)
	try{
		let checkLogicRecusion=function(logic,logicIndexKey,ind=""){
			let text=""
			console.log(logicIndexKey)
			for(let i=0;i<logicIndexKey.length;i++){
				let key=logicIndexKey[i]
				let comTarget=key.split("_")
				comTarget.splice(0,1)
				comTarget=comTarget.join("_")
				text+=ind+comDesc[comTarget].head+"\n"+checkLogicRecusion(logic[key].logic,logic[key].logicIndexKey,ind+'    ')+comDesc[comTarget].till+"\n"
			}
			return text
		}
		let text=checkLogicRecusion(JSON.parse(data.logic),JSON.parse(data.logicIndexKey))
		return postMessage({"code":text})
	}catch{
		return postMessage(false)
	}
})
export default {}