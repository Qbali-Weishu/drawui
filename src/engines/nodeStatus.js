//控制组件状态
//锁定节点
function lock(id=-1){
	console.trace()
	if(id==-1){
	    
	}
	else if(Object.prototype.toString.call(id)=='[object Array]'){//锁定目标列表中的所有
		//传入一个列表，锁定列表中的所有
	    id.forEach(lockId => {
	        try{
	            if(parent!="projectFrameInner"){
					System.nodeMeta.tree[lockId].status.lock=1
	            }
	        }catch{}
	    })
	}else if(Object.prototype.toString.call(id)=='[object Object]'){
		for(let key in id){
			try{
				if(id[key]==1){
					System.nodeMeta.tree[key].status.lock=1
				}
			}catch{}
		}
	}
	else{
		//只传入一个
	    try{
	        System.nodeMeta.tree[id].status.lock=1
	    }catch(e){
			console.error(e)
		}
	}
}
//解锁节点
function unLock(Id){
	//Id：要解锁的节点ID
	let parent
	System.nodeMeta.tree[Id].status.lock=0
	return
	if(parent==null){
		System.nodeMeta.tree[Id].status.lock=0
		return
	}
	while(true){//逐层解锁
	    try{
			
			System.nodeMeta.tree[Id].status.lock=0
			parent=System.nodeMeta.tree[Id].parent
			if(parent==null){
				break
			}
			
		}catch{
			break
		}
	}
}
//设置节点编辑状态
function edit(){
	
}
//结束节点编辑状态
function endEdit(){
	
}
System.lockNode=lock
System.unLockNode=unLock
System.editNode=edit
System.endEditNOde=endEdit
export {
	lock,
	unLock,
	edit,
	endEdit
}