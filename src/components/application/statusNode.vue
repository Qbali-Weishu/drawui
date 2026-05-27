<template>
	<div class="statusController" 
	:id="id"
	ref="main" 
	@mousedown.stop="startDown" 
	@contextmenu.stop="" 
	:style="{top:`${position.top}px`,left:`${position.left}px`}">
		<!--状态(变量选择)-->
		<div  style="position: relative;;height: 30px;border-bottom: 1px solid var(--mainColorGrayBg2);text-align: center;line-height: 30px;color: white;font-weight: normal;">
			{{sourceVar}}
			<div @mousedown.stop="callVarProvide" style="cursor: pointer;;position: absolute;left: 5px;top: 5px;height: 20px;width: 50px;border-radius: 10px;background-color: var(--mainColorBlue2);color: white;text-align: center;line-height: 20px;">
				选择
			</div>
			<div @mousedown.stop="remove" style="cursor: pointer;;position: absolute;right: 5px;top: 5px;height: 20px;width: 50px;border-radius: 10px;background-color: var(--mainColorBlue2);color: white;text-align: center;line-height: 20px;">
				删除
			</div>
		</div>
		<!--状态参数列表-->
		<div class="valueList">
			<div v-for="(item,index) in valueList" :key="index" class="valueItem">
				<!--设置锚点-->
				<div style="width: 10%;height: 25px;position: relative;flex-shrink: 0;margin-left: 2px;">
					<link-input :index="index" style="right:0;top:8px;" @valueInput="acceptVarValue"></link-input>
				</div>
				<!--数据编辑框-->
				<input
				 placeholder="输入状态取值" 
				:style="{'color':getTextColor(item.varValue),textDecoration:`${getTextColor(item.varValue)=='#f48771'?'underline':''}`}" 
				@input="checkValue(index,item.varValue)"
				@mousedown.stop="$emit('setIndex',id)" class="valueInput" v-model="item.varValue"/>
				<!--移除按钮-->
				<div class="removeButton" @mousedown.stop="" @click="removeNode(index)">
					<svg t="1661864077717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3301" width="100%" height="20"><path d="M801.171 547.589H222.83c-17.673 0-32-14.327-32-32s14.327-32 32-32h578.341c17.673 0 32 14.327 32 32s-14.327 32-32 32z" fill="#8a8a8a" p-id="3302"></path></svg>
				</div>
				<!--引出锚点-->
				<div style="width: 10%;height: 25px;position: relative;flex-shrink: 0;margin-left: 5px;" :id="item.id">
					<link-output 
						@outPuting="ouput" @endOuput="outPutting=false" style="right:0;top: 8px;" 
						:linkId="item.id" 
						:outPutData="{source:'this.'+sourceVar,linkSource:item.id,condition:{expression:'==',value:item.varValue},statusKey:statusKey}" :zIndex="9998"></link-output>
				</div>
			</div>
		</div>
		<!--新增按钮-->
		<div style="width: 100%;height: 30px;border-top: 1px solid var(--mainColorGrayBg2);position: relative;">
			<svg t="1664945535963" style="cursor: pointer;" @mousedown.stop="addStatus" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6011" width="100%" height="30"><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z" p-id="6012" fill="#e6e6e6"></path></svg>
			<div v-if="repeatValue.length>0" class="repeatToast">
				状态值 {{repeatValue}} 重复
			</div>
		</div>
		<teleport to="body">
			<div v-if="move" style="cursor: move;position: absolute;z-index: 9999;width: 100vw;height: 100vh;background-color: transparent;left: 0;top: 0;" @mousemove="movePosition" @mouseup="endMove">
			</div>
		</teleport>
	</div>
</template>

<script>
	//引入抛出点
	import linkOutput from "../microTools/linkOutPut.vue"
	//引入传入点
	import linkInput from "../microTools/linkInPut.vue"

	//状态管理器
	export default{
		name:"statusController",
		components:{
			linkOutput,
			linkInput,
		},
		props:{
			id:"",
			_valueList:{
				type:Array,
				default:[]
			},
			_sourcrVar:{
				type:String,
				default:""
			},
			_statusKey:{
				type:String,
				default:""
			},
			_mode:{
				type:String,
				default:"output" // input
			},
			_potision:{
				type:Object,
				default:{
					left:0,
					top:0
				}
			}
		},
		data(){
			return {
				sourceVar:"test",//变量来源
				statusKey:"test",//状态管理器Id
				valueList:[
					//当前状态管理器中的所有节点
					/*{
						id:"testId",//当前状态管理器的节点ID，用于在变量绑定处反向定位
						varValue:'test'//抛出的数据
					},
					{
						id:"testTwo",//当前状态管理器的节点ID，用于在变量绑定处反向定位
						varValue:'test'//抛出的数据
					}*/
				],
				position:{
					left:0,
					top:0,
					xdistance:0,
					ydistance:0
				},
				disX:0,
				disY:0,
				move:false,
				firstMove:false,
				screenPosition:{
					//状态管理器区域的xy值
					left:0,
					top:0
				},
				scalePercent:1,
				outPutting:false,
				checkTimeout:null,
				repeatTimeout:null,
				repeatValue:"",
				typeColor:{
					'String':'#00FF81',
					'Number':'#b5cea8',//'#FFD001',
					"Array":"white",
					'Boolean':'#DF59FF',
					'Object':"white",
					'Other':'#FF8A00',//针对null undefine
					'var':'#3dc9b0'//变量
				},
			}
		},
		beforeMount(){
			let root=Math.random()
			let len=Math.ceil((root+0.5)*15)
			let id=""
			let randomNumber=0
			for(let i=0;i<len;i++){
			    randomNumber=Math.ceil(Math.random()*25)
			    id+=String.fromCharCode(randomNumber+65)
			}
			//设置节点ID
			this.sourceVar=this._sourcrVar
			this.valueList=this._valueList
			this.statusKey=this._statusKey
			
			this.position=this._potision
		},
		mounted(){
		},
		methods:{
			getTextColor:function(value){
				try{
					new Function(`
						let ${value}=0
					`)
					return this.typeColor.var
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
				
			},
			//调起变量选择请求
			callVarProvide:function(e){
				const callBack=(name)=>{
					//需要重新读取预期值列表
					
					//检查选择的变量是否已存在于状态源中
					let exists=[]
					for(let key in System.metaData.STATUS){
						exists.push(System.metaData.STATUS[key].varSource)
					}
					if(exists.includes(name)){
						System.showToast("状态源重复，选择失败",2000)
					}else{
						if(confirm("是否确认重置此状态源")){
							this.sourceVar=name
							//否则将选择的状态管理器数据重置
							System.metaData.STATUS[this.id].varSource=name
							System.metaData.STATUS[this.id].varList=[]
							this.valueList=[]
						}
					}
				}
				System.requestProvide("varProvide",
				{ 	varType:"数据变量(data)",
					mode:"provide",
					callBack:callBack,
					left:e.clientX,
					top:e.clientY
				})
			},
			startDown:function(e){
				this.screenPosition.left=this.$refs['main'].parentNode.parentNode.getBoundingClientRect().left
				this.screenPosition.top=this.$refs['main'].parentNode.parentNode.getBoundingClientRect().top
				//记录因缩放导致的偏差
				let sp=this.$refs['main'].parentNode.style.transform.split("scale(")[1]
				this.scalePercent=sp.slice(0,sp.length-1)*1
				this.disX=(this.screenPosition.left-this.$refs['main'].parentNode.getBoundingClientRect().left)/this.scalePercent
				this.disY=(this.screenPosition.top-this.$refs['main'].parentNode.getBoundingClientRect().top)/this.scalePercent
				//记录按下的位置与节点左上角的位置差距
				this.position.ydistance=e.clientY-this.$refs['main'].getBoundingClientRect().top
				this.position.xdistance=e.clientX-this.$refs['main'].getBoundingClientRect().left
				//消除因缩放导致的偏差
				this.position.left=(e.clientX-this.position.xdistance-this.screenPosition.left)/this.scalePercent+this.disX
				this.position.top=(e.clientY-this.position.ydistance-this.screenPosition.top)/this.scalePercent+this.disY
				this.$emit("setIndex",this.id)
				this.move=true
			},
			movePosition:function(e){
				this.position.left=(e.clientX-this.position.xdistance-this.screenPosition.left)/this.scalePercent+this.disX
				this.position.top=(e.clientY-this.position.ydistance-this.screenPosition.top)/this.scalePercent+this.disY
			},
			endMove:function(e){
				this.move=false
				this.$emit("setPosition",this.id,this.position)
			},
			//接收状态参数设置
			acceptVarValue:function(index,value){
				if(this.outPutting){
					System.showToast("数据错误",2000)
					return
				}
			},
			ouput:function(){
				this.outPutting=true
				this.$emit("setIndex",this.id)
			},
			//移除当前状态管理器
			remove:function(){
				//需要重新渲染节点，故提交给父级处理
				this.$emit("remove",this.id)
			},
			//查看设置来源
			viewSource:function(){
				
			},
			addStatus:function(){
				//添加状态源预期值,不需要重新渲染节点，故直接操作System.meta
				let index=0
				for(let index=0;index<this.valueList.length;index++){
					if(!this.valueList[index].varValue){
						System.showToast("第"+(index+1)+"个状态值为空")
						return
					}
				}
				try{
					let id=Math.random().toString(36).slice(2,7)
					System.metaData.STATUS[this.id].varList.push({
						id:id,
						varValue:""
					})
					this.valueList.push({
						id:id,
						varValue:""
					})
				}catch(e){
					console.error(e)
					System.showToast("新增失败")
				}				
			},
			//检测取值是否重复
			checkValue:function(index,value){
				this.repeatValue=""
				if(this.checkTimeout!=null)
					clearTimeout(this.checkTimeout)
				if(this.repeatTimeout!=null)
					clearTimeout(this.repeatTimeout)
				this.checkTimeout=setTimeout(()=>{
					let next=true
					for(let i=0;i<this.valueList.length;i++){
						if(i!=index && this.valueList[i].varValue==value){
							this.repeatValue=value
							next=false
							break
						}
					}
					//写回原数据
					if(next){
						System.metaData.STATUS[this.id].varList[index].varValue=value
					}
					console.log(System.metaData.STATUS[this.id])
					this.checkTimeout=null
				},200)
			},
			removeNode:function(index){
				let temp=JSON.parse(JSON.stringify(this.valueList[index]))
				if(confirm("确认删除状态取值"+this.valueList[index].varValue)){
					try{
						this.valueList.splice(index,1)
						System.metaData.STATUS[this.statusKey].varList.splice(index,1)
						System.showToast("删除成功",2000)
					}catch{
						this.valueList.slice(index,0,temp)
						System.metaData.STATUS[this.statusKey].varList.splice(index,0,temp)
						System.showToast("删除失败,数据已恢复",2000)
					}
				}
			}
		}
	}
</script>

<style scoped>
	.statusController{
		user-select: none;
		z-index: 9999;
		position: absolute;
		width: 230px;
		background-color: #212121;
		border-radius: 10px;
		max-height: 300px;
		pointer-events: initial;
		border: 1px solid var(--mainColorGrayBg2);
	}
	.valueList{
		max-height: 240px;
		overflow: scroll;
		width: 100%;
		min-height: 30px;
	}
	.valueItem{
		position: relative;
		height: 30px;
		width: 100%;
		display: flex;
		background-color: transparent;
	}
	.valueInput{
		width: 60%;
		height: 18px;
		margin-top: 2.5px;
		border-radius: 10px;
		outline: none;
		border: none;
		transition: .2s;
		box-shadow: none;
		text-align: center;
		color: white;
		font-weight: normal;
		line-height: 25px;
		flex-shrink: 0;
	}
	.valueInput :focus{
		box-shadow: 0 0 0 2px var(--mainColorBlue2);
	}
	.repeatToast{
		font-weight: normal;
		width: 100%;
		height: 25px;
		position: absolute;
		bottom: -35px;
		border-radius: 10px;
		color: white;
		line-height: 25px;
		text-align: center;
		left: 0;
		background-color: var(--mainColorGrayBg2);
		animation: showRepeatToast .5s ;
		animation-fill-mode: forwards ;
		animation-timing-function: cubic-bezier(.48,-0.1,.03,1.35);
	}
	@keyframes showRepeatToast{
		from{
			opacity: 0;
			transform: scale(0);
		}to{
			opacity: 1;
			transform: scale(1);
		}
	}
	.removeButton{
		cursor: pointer;
		background-color: transparent;
		transition: .2s;
		width: 15%;height: 20px;
		margin-top: 5px;
		margin-left: 5px;
		border-radius: 5px;
		position: relative;
	}
	.removeButton:hover{
		background-color:var(--mainColorGrayBg2);
	}
	.removeButton:hover::after{
		content: '移除';
		position: absolute;
		width: 70px;
		height: 20px;
		line-height: 20px;
		transition: .2s;
		top:0px;
		left:0px;
		text-align: center;
		font-weight: normal;
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
	@keyframes showhover {
		from{
			opacity: 0;
			left: 0px;
		}to{
			opacity: 1;
			left:-80px;
		}
	}
</style>