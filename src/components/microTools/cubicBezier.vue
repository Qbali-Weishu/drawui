<template>
	<div style="position:relative;width:150px;height: 300px;">
		<div style="width: 100%;height: 100%;position: relative;">
			<div style="top: 110px;z-index: 1;;position: absolute;width: 150px;height: 150px;left: 0px;background-color:#323232;border-radius: 10px 0 0 10px;"></div>
			<div id="curve-display" style="z-index: 999;">
				<div class="coordinate-plane">
					<span class="control-point" id="P0"></span>
					<button class="control-point" id="P1" style="left:50px; top: 250px;"></button>
					<button class="control-point" id="P2" style="left:250px; top: 250px;"></button>
					<span class="control-point" id="P3"></span>
					
					<canvas height="300" width="150" id="curve" style="z-index: 2;"></canvas>
					
				</div>
			</div>
		</div>
		<div style="height: 150px;width: 200px;background-color: #323232;position: absolute;left: 150px;top: 110px;border-radius: 0 10px 10px 0;z-index: 99;" id="preview">
			
			<div style="position: relative;width: 100%;height: 100%;">
				<div style="height: 30px;width: 100%;">
					<div style="width: 25px;float: right;cursor: pointer;margin-right: 0px;margin-top: 5px;" @click="close">
						<svg t="1660884156906" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-top:5px;" xmlns="http://www.w3.org/2000/svg" p-id="18201" width="15" height="15">
								<path d="M1007.67938 1007.616358a56.313464 56.313464 0 0 1-79.107008 0L646.111189 725.155175l-39.553504-39.553504a55.866531 55.866531 0 0 1 0-79.107009 55.866531 55.866531 0 0 1 79.107009 0l39.553504 39.553505 282.461182 282.461182a56.313464 56.313464 0 0 1 0 79.107009z" fill="#00C569" p-id="18202"></path><path d="M1007.67938 16.320625a56.313464 56.313464 0 0 0-79.107008 0L512.031514 432.861483 95.490656 16.320625a56.089997 56.089997 0 0 0-79.107008 0 56.313464 56.313464 0 0 0 0 79.107008l416.540858 416.540858L16.383648 928.509349a55.866531 55.866531 0 0 0 79.107008 79.107009L1007.67938 95.427633a56.089997 56.089997 0 0 0 0-79.107008z" fill="#e6e6e6" p-id="18203"></path></svg>
					</div>
					<!--演示控制-->
					<div class="timeRunButton" tname="演示" id="run" style="position: relative;width: 30px;float: right;cursor: pointer;margin-right: 10px;margin-top: 5px;border-radius: 10px;height: 25px;">
								<svg t="1662131137854" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-left:50%;margin-top: 3px;transform: translateX(-50%);" p-id="5359" width="20" height="20"><path d="M852.5 533.9L279 864.7c-11.9 6.9-27.2 2.8-34.1-9.1-2.2-3.8-3.3-8.1-3.3-12.5V181.5c0-13.8 11.2-24.9 24.9-24.9 4.4 0 8.7 1.2 12.5 3.3l573.4 330.8c11.9 6.9 16 22.1 9.1 34.1-2.1 3.8-5.2 6.9-9 9.1z" p-id="5360" fill="#e6e6e6"></path></svg>			
					</div>	
					<!--复制-->
					<div class="timeRunButton" tname="复制" @click="copy"  style="position: relative;width: 30px;float: right;cursor: pointer;margin-right: 5px;margin-top: 5px;border-radius: 10px;height: 25px;">
								<svg t="1662172302502" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2171" style="margin-left:50%;margin-top: 5px;transform: translateX(-50%);" width="16" height="16"><path d="M316.8 784h377.6v140.8c0 42.24-34.56 76.8-76.8 76.8h-518.4c-42.24 0-76.8-34.56-76.8-76.8v-518.4c0-42.24 34.56-76.8 76.8-76.8h140.8v377.6c0 42.24 34.56 76.8 76.8 76.8z" fill="#e6e6e6" p-id="2172"></path><path d="M1008 105.6v518.4c0 42.24-34.56 76.8-76.8 76.8h-518.4c-42.24 0-76.8-34.56-76.8-76.8v-518.4c0-42.24 34.56-76.8 76.8-76.8h518.4c42.24 0 76.8 34.56 76.8 76.8z" fill="#e6e6e6" p-id="2173"></path></svg>
					</div>
								
				</div>
				<div style="width: 100%;height:30px;display: flex;">
					<div style="width: 100%;height: 30px;line-height: 30px;text-align: center;color: var(--mainTextColor1);font-weight: normal;user-select: none;">
						{{'cubic-bezier('+bezier+')'}}
					</div>
					
				</div>
				<!--演示节点-->
				<div style="position: relative;width: calc(100% - 5px);height: 10px;background-color: var(--mainColorGrayBg2);border-radius: 10px;margin-top: 10px;">
					<div id="current" ref="current" style="transition: .5s;position: absolute;width: 20px;height: 20px;background-color: var(--mainColorBlue2);border-radius: 5px;left: 0;top: -5px;"></div>
				</div>
				
				<button id="save" class="save" @click="save">确认</button>
			</div>
		</div>
	</div>
</template>

<script>
	require("./jsTools/bezier.js")
	export default{
		name:"cubicBezier",
		props:{
			preBezier:{
				type:String,
				default:"#.42,0,.58,1"
			}
		},
		data(){
			return {
				bezier:""
			}
		},
		beforeDestroy(){
			window['renderBezier']=[]
		},
		mounted(){
			window['preBezier']=this.preBezier
			window['settedBezier']=false
			window['returnTimingFunction']=(string)=>{
				
				this.bezier=string
			}
			window['previewTiming']=this.$refs['current']
			this.$nextTick(()=>{
				window['renderBezier'].forEach(item =>{
					item()
				})
			})
		},
		methods:{
			copy:function(e){
				try{
					navigator.clipboard.writeText('cubic-bezier('+this.bezier+')')
					System.showToast("复制成功",2000)
				}catch{
					alert("写入剪贴板失败,请复制:"+'cubic-bezier('+this.bezier+')')
				}
			},
			close:function(){
				this.$emit("quit")
			},
			save:function(){
				this.$emit("returnTiming",'cubic-bezier('+this.bezier+')')
			}
		}
	}
</script>

<style>
	#preview > .move {
		left: 100%;
		transform: translateX(-100%);
	}
	#curve-display {
		position: absolute;
		z-index: 999;
		grid-area: curve;
		justify-self: center;
	}
	
.coordinate-plane {
	position: relative;
	margin-top: 2rem;
}

	.coordinate-plane::before,
	.coordinate-plane::after {
		position: absolute;
		bottom: 25%;
		left: 0;
		width: 100%;
		padding: .3em .5em;
		box-sizing: border-box;
		color: rgba(0,0,0,.6);
		text-transform: uppercase;
		font-size: 75%;
		line-height: 1;
	}
	.control-point {
		position: absolute;
		z-index: 1;
		height: 20px;
		width: 20px;
		border: 1px solid rgba(0,0,0,.3);
		margin: -10px 0 0 -10px;
		outline: none;
		box-sizing: border-box;
		border-radius: 10px;
	}
	#P0, #P3 {
		background: white;
		pointer-events: none;
	}
	
	#P1, #P2 {
		cursor: pointer;
	}
	
	#P0 {
		left: 0;
		top: 75%;
	}
	
	#P1 {
		background: #3662ec/*#f08*/;
	}
	
	#P2 {
		background: #3662ec /*#0ab*/;
	}
	
	#P3 {
		left: 100%;
		top: 25%;
	}
	canvas#curve {
		background: #f0f0f0;
		background: linear-gradient(-45deg, transparent 49.5%, #e6e6e6 49.5%, #e6e6e6 50%, transparent 50%) center no-repeat,/*线*/
			repeating-linear-gradient(transparent, transparent 100%) no-repeat,
			linear-gradient(transparent,transparent 25%, /*rgba(0,0,0,.06)*/transparent 75%, transparent);
		background-size: 100% 50%, 100% 50%, auto;
		background-position: 25%, 0, 0;
	
		-webkit-user-select: none;
		user-select: none;
	}
	.save {
		position: absolute;
		bottom: 5px;
		width: 80px;
		background-color: var(--mainColorBlue2);
		color: white;
		border-radius: 10px;
		outline: none;
		border: none;
		height: 30px;
		z-index: 0;
		left: 50%;
		transform: translateX(-50%);
		font-size: 1em;
	}
	.timeRunButton:hover{
		background-color: var(--mainColorGrayBg2);
	}
	@keyframes showhover {
		from{
			opacity: 0;
			bottom: 0px;
		}to{
			opacity: 1;
			bottom:-25px;
		}
	}
	.timeRunButton:hover::after{
		content: attr(tname);
		position: absolute;
		width: 50px;
		height: 20px;
		padding-left: 8px;
		padding-right: 8px;
		line-height: 20px;
		transition: .2s;
		bottom: 2px;
		text-align: center;
		font-weight: normal;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--mainColorBlack);
		color: white;
		animation: showhover .2s;
		border-radius: 10px;
		font-size: 12px;
		animation-fill-mode: forwards;
	}
</style>