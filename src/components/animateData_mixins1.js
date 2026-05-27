export default{
	data(){
		return {
			eventRefList:{
				'鼠标按下':"mousedown",
				'鼠标抬起':"mouseup",
				'鼠标移动':'mousemove',
				'鼠标左滑':'moveleft',
				'鼠标上滑':'movetop',
				'鼠标右滑':'moveright',
				'鼠标下滑':'movebottom',
				'鼠标右键':'contextmenu',
				'鼠标点击':"click",
				'获得焦点':"focus",
				'失去焦点':"blur",
				'键盘按下':"keydown",
				'键盘抬起':"keyup",
			},
			eventShowList:{},
			newEvent:{
				show:false,
				left:0
			},
			nameList:{
				click:"鼠标点击",
				mousedown:"鼠标按下"
			},
			nodeMenu:{
				show:false,
				left:0,
				top:0
			}
		}
	},
	methods:{
		callAddEvent:function(e){
			//处理选择没有的事件
			let exist=[]
			for(let i=0;i<this.eventKeyList.length;i++){
				exist.push(this.nameList[this.eventKeyList[i]])
			}
			let unExist=[]
			for(let key in this.eventRefList){
				if(!exist.includes(key)){
					unExist.push(key)
				}
			}
			this.eventShowList=unExist
			this.newEvent={
				show:true,
				left:e.clientX
			}
			this.$nextTick(()=>{
				this.$refs['newProInput'].focus()
			})
		},
		closeEventList:function(){
			setTimeout(()=>{
				this.newEvent.show=false
			},200)
		},
		addEvent:function(eventName){
			let event=this.eventRefList[eventName]
			if(!System.metaData.ANIMATION[this.nodeId]){
				System.metaData.ANIMATION[this.nodeId]={}
			}
			System.metaData.ANIMATION[this.nodeId][event]={}
			System.metaData.ANIMATION[this.nodeId][event]['node_'+this.nodeId]={
				repeatTimes:0,
				frameUnit:{},
				frameTagList:{},
				nextTagList:{},
				propertype:{
					parent:"#projectFrameInner",
					// selector for HTMLElement
					el: '#'+this.nodeId.replace('$NODE:','') ,
				}
			}
			this.loadAnimateData(this.nodeId,this.eventKeyList.length)
		},
		callMenu:function(e,item,index){
			e.preventDefault()
			this.menu={
				show:true,
				left:e.clientX,
				top:e.clientY,
				item:item,
				index:index
			}
			this.$nextTick(()=>{
				this.$refs['menuInput'].focus()
			})
		},
		closeMenu:function(){
			setTimeout(()=>{
				this.menu.show=false
			},200)
		},
		//新增变化属性
		showNewProperType:function(e){
			//读取所有属性
			let proList=System.processAnimateData(this.nodeList_show[this.nodeListIndex])
			let unExist=[],data={}
			for(let key in proList){
				if(!this.propertypeList.includes(key)){
					unExist.push(key)
					data[key]=proList[key]
				}
			}
			this.newProperType={
				show:true,
				left:e.clientX,
				list:unExist,
				data:data
			}
			this.$nextTick(()=>{
				this.$refs['newProInput'].focus()
			})
		},
		closeNewPro:function(){
			setTimeout(()=>{
				this.newProperType.show=false
			},200)
		},
		callRepeat:function(e){
			this.repeat={
				show:true,
				left:e.clientX-100,
				top:e.clientY+10,
				times:this.animationView[this.nowEditNodeId].repeatTimes || 0
			}
			this.$nextTick(()=>{
				this.$refs['repeatInput'].focus()
			})
		},
		callEditing:function(){
			let item=this.menu.item
			let index=this.menu.index
			let key
			let value
			if(index ==-1){
				key=this.frameData[item][0].key
				value=JSON.parse(JSON.stringify(this.animationView[this.nowEditNodeId].propertype[key])).startValue
			}else{
				key=this.frameData[item][index].key
				value=JSON.parse(JSON.stringify(this.animationView[this.nowEditNodeId].propertype[key])).endValue
			}
			this.editing={
				show:true,
				left:this.menu.left,
				top:this.menu.top,
				item:item,
				index:index,
				preValue:value,
				value:value
			}
		},
		callNodeMenu:function(e,nodeId){
			try{
				nodeId=nodeId.replace('$NODE:','')
			}catch{}
			e.preventDefault()
			this.nodeMenu={
				show:true,
				left:e.clientX,
				top:e.clientY,
				nodeId:nodeId
			}
			this.$nextTick(()=>{
				this.$refs['newProInput'].focus()
			})
		},
		removeNode:function(){
			let nodeId=this.nodeMenu.nodeId.replace("node_","")
			try{
				nodeId=nodeId.replace('$NODE:','')
			}catch{}
			if(nodeId === this.nodeId){
				System.showToast("此节点不可删除",2000)
				return
			}
			try{
				delete this.animationView[this.nodeMenu.nodeId]
				this.loadAnimation
				System.showToast("删除成功",2000)
				this.setEvent(this.eventListIndex,0)
			}catch{}
		},
		closeNodeMenu:function(){
			setTimeout(()=>{
				this.nodeMenu.show=false
			},200)
		},
		recover:function(close=true){
			
			//恢复原数据
			for(let i=0;i<this.nodeList_show.length;i++){
				document.querySelector("."+this.nodeList_show[i]).style.cssText=''
				System.recoverTempStyleData(this.nodeList_show[i])
				//调用清除在动画中新添加的属性
				this.clearUnInStyleStruct(this.nodeList_show[i])
			}
			//清除动画数据
			if(close){
				this.close()
				setTimeout(()=>{
					this.eventListIndex=-1
					this.nodeListIndex=-1
					this.propertypeListIndex=-1
					this.eventKeyList=[]
					this.nodeList=[]
					this.nodeList_show=[]
					this.propertypeList=[]
					this.emptyValue.node=true
					this.emptyValue.properType=true
					this.emptyValue.event=true
					this.timeline=null
					this.player=null
				},200)
			}
		},
		clearUnInStyleStruct:function(nodeID){
			//清除不属于样式数据中的属性
			//读取style class内容
			document.querySelector('#'+nodeID+"_style").innerHTML=System.tempStyleSheet[nodeID].this
			if(System.tempStyleSheet[nodeID].nextNodeId){
				document.querySelector('#'+System.tempStyleSheet[nodeID].nextNodeId+"_style").innerHTML=System.tempStyleSheet[nodeID].next
			}
		}
	}
}