<template>
	<div>
		<teleport :to="'#'+targetNode">
			<component v-if="!showComponent" :is="componentName" v-bind="props" ref="component"
			></component>
		</teleport>
	</div>
</template>

<script>
	export default{
		name:"mountComponent",
		props:{
			needDefineId:{
				type:Boolean,
				default:false,
			},
			targetNode:{//目标绑定节点ID
				type:String,
				default:""
			},
			bindData:{//绑定入参数据props
				type:Object,
				default:{}
			},
			componentName:{//要绑定的组件名称
				type:String,
				default:''
			},
			nodeId:{
				type:String,
				default:""
			},
			nativeList:{
				type:Object,
				default:{
					mousedown:function(){},
					mouseup:function(){},
					mouseover:function(){},
					mousemove:function(){},
					mouseout:function(){},
					contextmenu:function(){},
				}
			}
		},
		data(){
			return {
				props:this.bindData,
				showComponent:this.needDefineId
			}
		},
		mounted(){
			System.resetComponentProps[this.nodeId]=this.resetProps
		},
		methods:{
			resetProps:function(newValue){
				this.showComponent=true
				this.$nextTick(()=>{
					this.props=newValue
					this.showComponent=false
				})
			}
		}
	}
</script>

<style>
</style>