export default {
	rightBarOptions:function(){
		return [
		{name:"重命名",event:()=>{
				
				//注册回调事件
				System.renameLogicCallBack=(newName)=>{
					this.logicIndex[this.rightBarMenu.selected].name=newName
					let index=this.logicIndex[this.rightBarMenu.selected].index
					this.$refs["ecMain"].childNodes[index+2].querySelector('.header .logicName').innerText=newName
				}
				let xpath=this.xpath+"=>"+this.logicIndex[this.rightBarMenu.selected].xpath
				let prename=this.logicIndex[this.rightBarMenu.selected].name
				
				System.requestRenameLogic(xpath,prename)
			},partition:false},
			
		{name:"注释说明",event:()=>{
			
				let xpath="=>"+this.logicIndex[this.rightBarMenu.selected].xpath
				System.requestWriteExplain(xpath)
				
			},partition:false},
		{name:"选择",event:()=>{
			this.logicSelect=!this.logicSelect
			this.$nextTick(()=>{
				setTimeout(()=>{
					let nodes=document.getElementsByClassName('logicSelectCircle')
					for(let i=0;i<nodes.length;i++){
						let item=nodes[i]
						item.style.width="16px"
					}
					setTimeout(()=>{
						if(this.logicSelect){
							this.rightBarMenu.options[2].name="取消选择"
							this.rightBarMenu.options[5].name="复制选中"
							this.rightBarMenu.options[6].name="剪切选中"
							this.rightBarMenu.options[9].name="删除选中"
						}else{
							this.rightBarMenu.options[2].name="选择"
							this.rightBarMenu.options[5].name="复制"
							this.rightBarMenu.options[6].name="剪切"
							this.rightBarMenu.options[9].name="删除"
						}
					},200)
				},50)
			})
		},partition:false},
		{name:"上移",event:()=>{this.indexUp(this.rightBarMenu.selected)},partition:true},
		{name:"下移",event:()=>{this.indexDown(this.rightBarMenu.selected)},partition:false},
		
		{name:"复制",event:()=>{
			let index=this.logicIndex[this.rightBarMenu.selected].index
			if(this.logicSelect){
				let xpathList=[]
				for(let i=0;i<this.logicIndex.length;i++){
					if(this.logicSelectedList[i]){
						index=this.logicIndex[i].index
						xpathList.push(this.xpath+"=>"+this.logicIndex[index].xpath)
					}
				}
				System.copyEcNode(xpathList)
			}else{
				System.copyEcNode(this.xpath+"=>"+this.logicIndex[index].xpath)
			}
		},partition:true},
		{name:"剪切",event:()=>{
			let index=this.logicIndex[this.rightBarMenu.selected].index
			if(this.logicSelect){
				let tempLength=this.logicIndex.length
				//先复制所有
				for(let i=tempLength-1;i>-1;i--){
					if(this.logicSelectedList[i]){
						index=this.logicIndex[i].index
						System.copyEcNode(this.xpath+"=>"+this.logicIndex[index].xpath,null,true)
					}
				}
				//再删除所有
				for(let i=tempLength-1;i>-1;i--){
					if(this.logicSelectedList[i]){
						this.rightBarMenu.selected=i
						index=this.logicIndex[this.rightBarMenu.selected].index
						this.removeEvent[index]()
						this.logicIndex.splice(this.rightBarMenu.selected,1)
						this.logicSelectedList.splice(i,1)
					}
				}
				//删除完成后再统一重置logicIndex
				let tempIndex=[]
				this.logicIndex.forEach(item =>{
					tempIndex.push(item.xpath)
				})
				System.requestResetLogicIndex(this.xpath,tempIndex)
				tempIndex=[]
				//当所有元素被删除时自动将选择模式置为false
				if(this.logicIndex.length==0){
					this.logicSelect=false
					this.rightBarMenu.options[2].name="选择"
					this.rightBarMenu.options[5].name="复制"
					this.rightBarMenu.options[6].name="剪切"
					this.rightBarMenu.options[9].name="删除"
				}
			}else{
				let callBack=()=>{
					//要删除的对应Index
					this.removeEvent[index]()
					this.logicIndex.splice(this.rightBarMenu.selected,1)
					let tempIndex=[]
					this.logicIndex.forEach(item =>{
						tempIndex.push(item.xpath)
					})
					console.log(this.logicIndex,'剪切')
					System.requestResetLogicIndex(this.xpath,tempIndex)
					tempIndex=[]
					console.log(this.logicIndex)
				}
				System.copyEcNode(this.xpath+"=>"+this.logicIndex[index].xpath,callBack)
			}
			
		}},
		{name:"粘贴在前",event:()=>{
			let positionIndex=this.rightBarMenu.selected
			System.pasteAction.call(this,positionIndex)
		}
		
		},
		{name:"粘贴在后",event:()=>{
			let positionIndex=this.rightBarMenu.selected+1
			console.log(this.xpath)
			System.pasteAction.call(this,positionIndex)
		}
		},
		{name:"提取路径",event:(item)=>{
			let allowed=true
			if(this.logicSelect){
				if(this.logicSelectedList.length>1){
					System.showToast("操作禁止,仅可对单一目标操作",2000)
					allowed=false
				}
			}
			if(allowed){
				let arrow=this.xpath==""?"":"=>"
				try{
					navigator.clipboard.writeText(this.xpath+arrow+this.logicIndex[this.rightBarMenu.selected].xpath)
					System.showToast("复制成功",2000)
				}catch{
					alert("写入剪贴板失败,请复制路径:"+this.xpath+arrow+this.logicIndex[this.rightBarMenu.selected].xpath)
				}
			}
		},
			partition:false,
		},
		{name:"删除",event:(item)=>{
			if(this.logicSelect){
				let tempLength=this.logicIndex.length
				for(let i=tempLength-1;i>-1;i--){
					if(this.logicSelectedList[i]){
						this.rightBarMenu.selected=i
						let index=this.logicIndex[this.rightBarMenu.selected].index
						this.removeEvent[index]()
						this.logicIndex.splice(this.rightBarMenu.selected,1)
						this.logicSelectedList.splice(i,1)
					}
				}
				if(this.logicIndex.length==0){
					this.logicSelect=false
					this.rightBarMenu.options[2].name="选择"
					this.rightBarMenu.options[5].name="复制"
					this.rightBarMenu.options[6].name="剪切"
					this.rightBarMenu.options[9].name="删除"
				}
			}else{
				let index=this.logicIndex[this.rightBarMenu.selected].index
				this.removeEvent[index](false)
				this.logicIndex.splice(this.rightBarMenu.selected,1)
			}
			let tempIndex=[]
			this.logicIndex.forEach(item =>{
				tempIndex.push(item.xpath)
			})
			System.requestResetLogicIndex(this.xpath,tempIndex)
			tempIndex=[]
		},
		partition:true},
		]
	}
}