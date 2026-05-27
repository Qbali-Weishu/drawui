<template>
	<div>
		<teleport to="body">
			<div class="layerOut">
				
			</div>
		</teleport>
	</div>
</template>

<script>
	export default{
		name:"focusLayers"
	}
</script>

<style scoped>
	.layerOut{
		position: absolute;
		z-index: 600;
		width: calc(99% - 305px);
		height: calc(100% - 120px);
		left: 60px;
		top: 50px;
		background-color: #212121;
		animation: showLayers 5s;
		animation-fill-mode: forwards;
	}
	@keyframes  showLayers {
		0%{
			backdrop-filter: blur(10px);
			background-color: rgba(50,50,50,0.8);
		}99%{
			backdrop-filter: blur(10px);
			background-color: rgba(50,50,50,0.8);
		}
		100%{
			backdrop-filter: blur(0px);
			background-color: #212121;
		}
	}
</style>