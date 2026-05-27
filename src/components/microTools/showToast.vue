<template>
	<div>
		<teleport to="body">
			<div class="toast" ref="toast" >
				{{text}}
			</div>
		</teleport>
	</div>
</template>

<script>
	export default{
		name:"drawUiToast",
		props:{
			text:String,
			duration:{
				type:Number,
				default:1000
			}
		},
		mounted(){
			this.$nextTick(()=>{
				setTimeout(()=>{
					this.$refs['toast'].style.top="10px"
					setTimeout(()=>{
						this.$refs['toast'].style.top="-50px"
						setTimeout(()=>{
							this.$emit('close')
						},300)
						
					},this.duration)
				},100)
			})

		},
		methods:{
			test:function(){
				alert("ok")
			}
		}
	}
</script>

<style>
	.toast{
		text-align: center;
		color: var(--mainColorBlack);
		padding: 10px;
		height: 25px;
		line-height: 25px;
		background-color: white;
		backdrop-filter: blur(15px);
		box-shadow:0 0 30px #3e3e3e;
		border-bottom: 10px;
		border-radius: 50px;
		position: absolute;
		top: -50px;
		left: 50vw;
		transform: translateX(-50%);
		transition: .2s;
		font-weight: normal;
		z-index: 999;
		user-select: none;
		min-width: 150px;
		z-index: 999999;
	}
</style>