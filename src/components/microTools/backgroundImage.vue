<template>
	<div :style="{height:`${backgroundImage==null?'280px' : '320px'}`}">
		
		<div style="width: 100%;height: 25px;display: flex;border-radius: 10px;">
			<selectList @change="selectChange_Attachment" ref="selectList_Attachment" :list="backgroundAttachmentListIndex" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 5px;top: 5px;z-index: 153;" :width="'80px'"></selectList>
			<selectList @change="selectChange_clip" ref="selectList_clip" :list="backgroundClipListIndex" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 90px;top: 5px;z-index: 153;" :width="'80px'"></selectList>
			<selectList @change="selectChange_origin" ref="selectList_origin" :list="backgroundOriginListIndex" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 175px;top: 5px;z-index: 153;" :width="'80px'"></selectList>
			<div style="background-color: white;border: none;position: absolute;top: -30px;right: 0;height: 25px;width: 150px;border-radius: 10px;box-shadow: 0px 0px 10px var(--mainColorGray2);">
				<selectList @change="selectChange" ref="selectList" :list="selectList" style="margin: 0;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position: absolute;left: 10px;z-index: 153;border-radius: 10px;" :width="'80px'"></selectList>
				<svg @click="showBlend" t="1658025057887" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position: absolute;right:30px;cursor: pointer;" p-id="4296" width="20" height="25">
					<path d="M136.533333 634.246095C136.533333 567.588571 169.935238 481.913905 229.571048 379.562667c23.747048-40.706438 51.326781-83.412114 81.978514-127.405105A2906.199771 2906.199771 0 0 1 429.173029 95.583086a2774.250057 2774.250057 0 0 1 49.659123-60.172191l3.969219-4.632381L507.240838 2.633143l24.517486 28.145371 3.959466 4.642134c3.140267 3.666895 6.787657 7.9872 10.942172 12.873142a3313.176381 3313.176381 0 0 1 38.785219 47.289296 2940.362362 2940.362362 0 0 1 117.613714 156.574476c30.593219 43.99299 58.172952 86.698667 81.92 127.405105 59.63581 102.351238 93.037714 188.025905 93.037715 254.683428 0 210.690438-165.800229 381.834971-370.775772 381.834972C302.343314 1016.081067 136.533333 844.936533 136.533333 634.246095m343.186286-497.566476a2801.859048 2801.859048 0 0 0-114.922057 153.102629c-29.696 42.569143-56.32 83.792457-79.160076 122.958019-54.203733 92.94019-84.085029 169.662171-84.085029 221.505828 0 174.947962 137.069714 316.386743 305.688381 316.386743 168.686933 0 305.7664-141.438781 305.7664-316.386743 0-51.843657-29.891048-128.565638-84.094781-221.505828-22.840076-39.165562-49.464076-80.388876-79.091809-122.958019a2869.150476 2869.150476 0 0 0-114.93181-153.112381 4546.998857 4546.998857 0 0 0-27.648-33.811505c-8.572343 10.435048-17.788343 21.7088-27.511467 33.811505" p-id="4297" fill="#8a8a8a"></path>
					<path d="M507.270095 902.397562c-142.833371 0-258.6624-116.90179-258.6624-261.246781 0-144.286476 134.456076-71.241143 258.6624 0 124.781714 71.553219 258.6624-144.286476 258.6624 0 0 144.335238-115.829029 261.246781-258.6624 261.246781" p-id="4298" fill="#8a8a8a"></path></svg>
				<svg @click="cancle" t="1651210547316" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position: absolute;right:3px;cursor: pointer;" p-id="3021" width="20" height="25"><path d="M176.661601 817.172881C168.472798 825.644055 168.701706 839.149636 177.172881 847.338438 185.644056 855.527241 199.149636 855.298332 207.338438 846.827157L826.005105 206.827157C834.193907 198.355983 833.964998 184.850403 825.493824 176.661601 817.02265 168.472798 803.517069 168.701706 795.328267 177.172881L176.661601 817.172881Z" p-id="3022" fill="#8a8a8a"></path><path d="M795.328267 846.827157C803.517069 855.298332 817.02265 855.527241 825.493824 847.338438 833.964998 839.149636 834.193907 825.644055 826.005105 817.172881L207.338438 177.172881C199.149636 168.701706 185.644056 168.472798 177.172881 176.661601 168.701706 184.850403 168.472798 198.355983 176.661601 206.827157L795.328267 846.827157Z" p-id="3023" fill="#8a8a8a"></path></svg>
				<selectListT v-if="showBlendMode"  :toBody="true" :width="'150px'" :selected="blendMode" @close="showBlendMode=false" @change="selectChange_blendMode" ref="selectList_blendMode" :list="backgroundBlendModeListIndex" style="margin: 0;margin-left:45px;background-color: rgba(0,0,0,0.85);color: white;font-weight: normal;position:absolute;width:55%;" ></selectListT>
			</div>
		</div>
			
		<div style="margin-top: 10px;">
			<imageUpload v-if="imageType==0" ref="imageSource" @returnImage="returnImage" style="width: 255px;height: 185px;" ></imageUpload>
			<gradient v-if="imageType!=0" ref="gradient"  @returnImage="returnImage"  style="width: 207px;height: 200px;margin-left: 27px;margin-top: 20px;z-index: 151;" ></gradient>
		</div>
		<selectList :list="backgroundSizeListIndex" @mouseenter.native="gradientIndexTop=false" @mouseleave.native="gradientIndexTop=true" :width="'80px'" ref="backSizeSel" :selected="backgroundSizeListIndex[sizeType]" @change="changeSize" style="z-index: 149;;margin: 0;background-color: rgba(0,0,0,0.65);color: white;font-weight: normal;position: absolute;left: 25px;" :style="{bottom:`${backgroundImage!=null?'45px':'5px'}`}">
		</selectList>
		<div style="position: absolute;width: 100%;background-color: transparent;height: 25px;color: var(--mainColorGray2);" :style="{bottom:`${backgroundImage!=null?'43px':'5px'}`}" v-if="sizeType==2">
			<input placeholder="长度" class="diyInput" style="margin-left: 110px;" v-model="backgroundSizeList['自定义'].width"/>
				x
			<input placeholder="宽度" class="diyInput" v-model="backgroundSizeList['自定义'].height"/>
		</div>
		<teleport to="body" v-if="showSetPosition&&(backgroundImage!=null)">
			<backgroundPosition @close="showSetPosition=false" @changeSize="changeSize" ref="positionSet" @getBackPosition="getBackPosition" @hideUpload="hideUpload" @showUpload="showUpload"></backgroundPosition>
		</teleport>
		<button class="potionButton" @click="setPosition" v-if="backgroundImage!=null">
			{{backPositionText}}
		</button>
	</div>
</template>

<script>
	import selectList from "./select.vue"
	import selectListT from "./select2.vue"
	import imageUpload from "./imageUpload.vue"
	import gradient from "./gradient.vue"
	import backgroundPosition from "./backgroundPosition.vue"
	//import img from "../../assets/images/noImage.svg"
	export default{
		name:"backgroundImage",
		props:{
			selectList:{
				type:Array,
				default:['图片','线性渐变','径向渐变','旋转渐变',"线性重复",'径向重复','旋转重复']
			},
			position:{
				type:String,
				default:''
			}
		},
		components:{
			gradient,
			selectList,
			selectListT,
			imageUpload,
			backgroundPosition
		},
		data(){
			return {
				hasReturn:false,
				sizeType:0,
				origin:'padding-box',
				clip:'border-box',
				Attachment:"scroll",
				blendMode:"normal",//背景混合模式
				backgroundSizeList:{//背景大小
					"适应":"contain",
					"充满":"cover",
					"自定义":{"width":"100%","height":"100%"}
				},
				backgroundSizeListIndex:['适应','充满','自定义'],
				backgroundClipList:{//裁切方式
					"边框延伸":"border-box",
					"内边距盒":"padding-box",
					"内容区域":"content-box",
					"文字蒙版":'text',
					"继    承":"inherit",
					"默    认":"initial",
					"不 设 置":'unset'
				},
				backgroundClipListIndex:["边框延伸","内边距盒","内容区域","文字蒙版","继    承","默    认","不 设 置"],
				backgroundOriginList:{//裁切方式
					"边距区域":"padding-box",
					"边框区域":"border-box",
					"内容区域":"content-box",
					"继    承":"inherit",
					
				},
				backgroundOriginListIndex:["边距区域","边框区域","内容区域","继    承"],
				backgroundAttachmentList:{//裁切方式
					'容器滚动':'scroll',
					"视口固定":"fixed",
					"内部滚动":'local',
					'继承':'inherit',
					'默认':'initial',
					'不设置':"unset"
				},
				backgroundAttachmentListIndex:['容器滚动',"视口固定","内部滚动",'继承','默认','不设置'],
				backgroundBlendModeList:{
					"正常":"normal",
					"变暗":"darken",
					"正片叠底":"multiply",
					"颜色加深":"color-burn",
					'变亮':"lighten",
					"滤色":"screen",
					"颜色减淡":"color-dodge",
					"叠加":"overlay",
					"柔光":"soft-light",
					"强光":"hard-light",
					"差集":"difference",
					"排除":"exclusion",
					"色相":"hue",
					"饱和度":"saturation",
					"颜色":"color",
					"明度":"luminosity"
				},
				backgroundBlendModeListIndex:["正常","变暗","正片叠底","颜色加深",'变亮',"滤色","颜色减淡","叠加","柔光","强光","差集","排除","色相","饱和度","颜色","明度"],
				showBlendMode:false,
				
				backPosition:this.position,
				backPositionText:"背景位置:",
				backPTextList:{
					'left':"靠左",
					'right':"靠右",
					'top':"顶边",
					'bottom':"底边",
					'center':"居中"
				},
				
				imageType:0,//等于selectList中的索引
				showSetPosition:false,
				positionX:"left 0px",
				positionY:'top 0px',
				backgroundImage:null,
				gradientIndexTop:true
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.imageType=this.$refs['selectList'].getSelected()['index']
				console.log("enter",this.imageType)
				this.prePosition()
			})
		},
		watch:{
			backgroundSizeList:{
				handler:function(val){
					if(this.setSizeTimeout!=null){
						clearTimeout(this.setSizeTimeout)
						this.setSizeTimeout=null
					}
					this.setSizeTimeout=setTimeout(()=>{
						if(this.sizeType==2){
							let data=val['自定义']
							let width=data['width'],height=data['height']
							if(width.indexOf("px")>-1){
								width=width.split("px")[0]+"px"//防止出现px重复的错误
							}else if(width.indexOf("%")>-1){
								width=width.split("%")[0]+"%"//防止出现%重复的错误
							}else{
								if(width*1+''=='NaN'){
									console.log("f1")
									alert("非法参数")
									width="100px"
								}else{
									width=width+"px"
								}
							}
							if(height.indexOf("px")>-1){
								height=height.split("px")[0]+"px"//防止出现px重复的错误
							}else if(height.indexOf("%")>-1){
								height=height.split("%")[0]+"%"//防止出现%重复的错误
							}else{
								if(height*1+''=='NaN'){
									console.log("f2")
									alert("非法参数")
									height="100px"
								}else{
									height=height+"px"
								}
							}
							this.backgroundSizeList['自定义']['width']=width
							this.backgroundSizeList['自定义']['height']=height
							let size=this.sizeType!=2 ? this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]:
									 this.backgroundSizeList['自定义'].width+' '+this.backgroundSizeList['自定义'].height
							this.$refs["imageSource"].setBackgroundSize(size)
						}

					},200)
				},
				immediate:true,
				deep:true
			},
		},
		methods:{
			showBlend:function(e){
				this.showBlendMode=true
				this.$nextTick(()=>{
					this.$refs['selectList_blendMode'].setSpread(e)
					let c=["normal","darken","multiply","color-burn","lighten",
						   "screen","color-dodge","overlay","soft-light","hard-light",
						   "difference","exclusion","hue","saturation","color","luminosity"].indexOf(this.blendMode)
					if(c==-1){
						c=0
					}
					this.$refs['selectList_blendMode'].setSelected(this.backgroundBlendModeListIndex[c])//还可能是在加载的时候调用，故需要主动修改选择列表的显示值
					c=null
				})
			},
			//隐藏
			hideUpload:function(){
				document.getElementById("backImageChose").style.transform="scale(0)"
			},
			showUpload:function(){
				document.getElementById("backImageChose").style.transform="scale(1)"
			},
			prePosition:function(){
				try{
					let positionList=this.backPosition.split(" ")
					let length=positionList.length
					if(positionList[length-1].length==0 || positionList[length-1]==''){
						length--
					}
					if(length==1){
						if(positionList[0]=='left'||positionList[0]=='right'){
							this.positionX=positionList[0]
							this.positionY='center'
							this.backPositionText=this.backPositionText[positionList[0]]+" 居中"
						}else if(positionList[0]=='top'||positionList[0]=='bottom'){
							this.positionY=positionList[0]
							this.positionX='center'
							this.backPositionText="居中 "+this.backPTextList[positionList[0]]
						}else if(positionList[0]=='center'){
							this.positionX='center'
							this.positionY='center'
							this.backPositionText="居中 "+this.backPTextList[positionList[0]]
						}
					}else if(length==2){
						this.positionX=positionList[0]
						this.positionY=positionList[1]
						this.backPositionText=this.backPTextList[positionList[0]]+' '+this.backPTextList[positionList[1]]
					}else if(length==3){
						if(positionList[1]=='top' || positionList[1]=='bottom' || positionList[1]=='center'){//x y value格式
							this.positionX=positionList[0]
							this.positionY=positionList[1]+' '+positionList[2]
							this.backPositionText=this.backPTextList[positionList[0]]+' '+
												  this.backPTextList[positionList[1]]+' '+positionList[2]
						}else{//x value y格式
						this.positionX=positionList[0]+' '+positionList[1]
						this.positionY=positionList[2]
							this.backPositionText=this.backPTextList[positionList[0]]+' '+
												  positionList[1]+' '+this.backPTextList[positionList[2]]
						}
					}else if(length==4){
						this.positionX=positionList[0]+' '+positionList[1]
						this.positionY=positionList[2]+' '+positionList[3]
						this.backPositionText=this.backPTextList[positionList[0]]+' '+
											  positionList[1]+' '+this.backPTextList[positionList[2]]+' '+
											  positionList[3]
					}
				}catch{}
				
			},
			//设置已有文件源，用于编辑已有的背景图片
			setFileSource:function(url,size,position,origin,clip,Attachment,blendMode){
				console.log(url,blendMode,"settt")
				this.backgroundImage=url
				clip=clip.trim()
				origin=origin.trim()
				size=size.trim()
				if(size=="contain" || size=="cover"){
					let tempSizeList=["contain",'cover']
					let index=tempSizeList.indexOf(size)
					this.changeSize({"index":index})
					tempSizeList=null
				}else{
					let data=size.split(" ")
					let length=data.length
					if(data[length-1].length==0 || data[length-1]==""){
						length-=1
					}
					if(length==1){
						this.backgroundSizeList["自定义"]['width']=data[0]
						this.backgroundSizeList["自定义"]['height']=data[0]
					}else if(length==2){
						this.backgroundSizeList["自定义"]['width']=data[0]
						this.backgroundSizeList["自定义"]['height']=data[1]
					}
					this.changeSize({"index":2})
				}
				if(url.startsWith('url')){//图片背景
					this.imageType=0
					url=url.replace('url("','')
					url=url.replace('")','')
					this.$nextTick(()=>{
						this.$refs["backSizeSel"].change(this.sizeType)//调用select组件的内部设置方法，设置背景大小属性
						console.log(this.$refs['imageSource'],this.imageType)
						this.$refs['imageSource'].setFileSource(url)
					})
				}else{//渐变背景
					let data=url.split("(")
					let gradientType=data[0]
					console.log("fileSource",gradientType)
					this.imageType=['','linear-gradient', 'radial-gradient', 'conic-gradient', 'repeating-linear-gradient',
									'repeating-radial-gradient', 'repeating-conic-gradient'
									].indexOf(gradientType)
					console.log("setType",this.imageType)
				}
				if(origin=="" || origin==undefined){
					origin="padding-box"
				}
				this.origin=origin
				if(clip=='' || clip==undefined){
					clip="border-box"
				}
				this.clip=clip
				if(Attachment=="" || Attachment==undefined){
					Attachment="scroll"
					
				}
				this.Attachment=Attachment
				console.log("he",blendMode)
				if(blendMode==""||blendMode==undefined || blendMode==null){
					blendMode="normal"
				}
				this.blendMode=blendMode
				this.backPosition=position
				this.$nextTick(()=>{
					this.prePosition()//处理位置
					this.selectChange_clip()
					this.selectChange_origin()
					this.selectChange_Attachment()
					this.selectChange_blendMode()
				})
				
				this.selectChange({index:this.imageType})//设置background.vue中的selectedType为当前处理的这个图片类型
				this.$refs['selectList'].setSelected(this.selectList[this.imageType])
			},
			changeSize:function(data,isChild=false){//isChild为true时标明为子组件调用
				this.sizeType=data['index']
				let size=this.sizeType!=2 ? this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]:
						 this.backgroundSizeList['自定义'].width+' '+this.backgroundSizeList['自定义'].height
				if(isChild!=false){
					if(this.sizeType==2){
						this.backgroundSizeList['自定义']=isChild
					}
					let temp=size
					console.log("ssize",size,["contain",'cover'].includes(size))
					if(["contain",'cover'].includes(size)){
						size={
							'contain':"适应",
							'cover':"充满",
						}[size]
					}else{
						size="自定义"
					}
					
					this.$refs['backSizeSel'].setSelected(size)
					size=temp
				}
				if(this.imageType==0){
					this.$refs["imageSource"].setBackgroundSize(size)//设置图片上传组件中的图片大小预览
				}
				
			},
			selectChange:function(data){//选择回传
				let diff=data['index']==this.imageType
				this.imageType=data['index']
				this.$emit("seleteChange",this.imageType)
				this.$nextTick(()=>{
					if(this.imageType>0){
						
						this.$refs['gradient'].setType(this.imageType-1,diff?this.backgroundImage:null)//减1，因为gradient中从线性渐变开始
					}
				})
			},
			selectChange_clip:function(data=null){//选择回传
				if(data!=null)//通过选择列表回传
					this.clip=this.backgroundClipList[this.backgroundClipListIndex[data['index']]]
				else{//在setFileSouce中调用
					let c=["border-box","padding-box","content-box",'text',"inherit","initial",'unset'].indexOf(this.clip)
					if(c==-1){
						c=0
					}
					this.$refs['selectList_clip'].setSelected(this.backgroundClipListIndex[c])//还可能是在加载的时候调用，故需要主动修改选择列表的显示值
					c=null
				}
			},
			selectChange_origin:function(data=null){//选择回传
				if(data!=null)//通过选择列表回传
					this.origin=this.backgroundOriginList[this.backgroundOriginListIndex[data['index']]]
				else{//在setFileSouce中调用
					let c=["padding-box","border-box","content-box","inherit",].indexOf(this.origin)
					if(c==-1){
						c=0
					}
					this.$refs['selectList_origin'].setSelected(this.backgroundOriginListIndex[c])//还可能是在加载的时候调用，故需要主动修改选择列表的显示值
					c=null
					}
			},
			selectChange_Attachment:function(data=null){//选择回传
				if(data!=null)//通过选择列表回传
					this.Attachment=this.backgroundAttachmentList[this.backgroundAttachmentListIndex[data['index']]]
				else{//在setFileSouce中调用
					let c=['scroll',"fixed",'local','inherit','initial',"unset"].indexOf(this.Attachment)
					if(c==-1){
						c=0
					}
					this.$refs['selectList_Attachment'].setSelected(this.backgroundAttachmentListIndex[c])//还可能是在加载的时候调用，故需要主动修改选择列表的显示值
					c=null
				}
			},
			selectChange_blendMode:function(data=null){//选择回传
				if(data!=null){//通过选择列表回传
					this.blendMode=this.backgroundBlendModeList[this.backgroundBlendModeListIndex[data['index']]]
					console.log(this.blendMode,"blendMode")
					this.$emit("setBlendMode",this.blendMode)
				}
				if(this.imageType==0){
					this.$refs['imageSource'].setBlendMode(this.blendMode)
				}
				else{
					this.$refs['gradient'].setBlendMode(this.blendMode)
				}
			},
			cancle:function(e){
				console.log("close")
				this.$emit("cancle")
			},
			returnImage:function(fileUrl){
				let size=""
				
				if(this.sizeType<2){
					size=this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]
				}else{
					let temp=this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]
					size=temp.width+" "+temp.height
				}
				this.backgroundImage=fileUrl
				console.log("backgroundPostion",this.backPosition)
				if(this.backPosition==""){
					this.backPosition="left 0px top 0px"
					this.prePosition()
				}
				console.log("huis",this.blendMode)
				this.$emit("returnImage",fileUrl,size,this.origin,this.clip,this.Attachment,this.backPosition,this.blendMode)
				this.hasReturn=true
				//this.cancle()
			},
			setPosition:function(){
				this.showSetPosition=!this.showSetPosition
				if(this.showSetPosition){
					this.$nextTick(()=>{
						let id=window.getFirstDomID()
						let width=document.getElementById(id).offsetWidth
						let height=document.getElementById(id).offsetHeight
						let backgroundColor=document.getElementById(id).style.backgroundColor
						let radius=document.getElementById(id).style.borderRadius
						let size=this.sizeType!=2 ? this.backgroundSizeList[this.backgroundSizeListIndex[this.sizeType]]:
						 this.backgroundSizeList['自定义'].width+' '+this.backgroundSizeList['自定义'].height
						this.$refs['positionSet'].setWHF(width,height,this.backgroundImage,this.positionX,this.positionY,backgroundColor,radius,size,this.sizeType)
					})
				}
			},
			getBackPosition:function(position){
				this.backPosition=position
				this.prePosition()
				this.$emit("setPosition",position)
			}
		}
	}
</script>

<style>
	.potionButton{
		position: absolute;
		bottom: 5px;
		left: 10%;
		width: 80%;
		height:35px;
		background-color: var(--mainColorBlue2);
		color: white;
		padding: 0;
		border-radius: 15px;
		transform: scale(1);
		transition: .2s;
		box-shadow: 0px 0px 0px var(--mainColorBlue2);
	}
	.potionButton:hover{
		box-shadow: 0px 0px 10px var(--mainColorBlue2);
	}
</style>