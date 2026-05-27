<template>
	<div style="width: 100%;height:100%;overflow: hidden;display: flex;align-items: center;justify-content: center;">
		<div style="width: 90%;height: 90%;overflow: scroll;display: grid;display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-column-gap: 20px;
			grid-row-gap: 20px;">
			<div  v-for="(item,index) in imgList" :key="index" style="height: 150px;" class="imgItem" @click="returnChartType(index)">
				<img :src="item.img" style="object-fit: cover;width: 100%;height: 100%;"/>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:"echartConfig",
		data(){
			return {
				imgList:[
					{'key':"Basic Line Chart",
					 'img':"https://echarts.apache.org/examples/data/thumb/line-simple.png?_v_=1668744747967"
					},
					{'key':"Smoothed Line Chart",
					 'img':"https://echarts.apache.org/examples/data/thumb/line-smooth.png?_v_=1668744747967"
					},
					{'key':"",
					 'img':"https://echarts.apache.org/examples/data/thumb/area-basic.png?_v_=1668744747967"
					},
					{'key':"",
					 'img':"https://echarts.apache.org/examples/data/thumb/line-stack.png?_v_=1668744747967"
					},
					{'key':"",
					 'img':"https://echarts.apache.org/examples/data/thumb/area-stack.png?_v_=1668744747967"
					},
					{'key':"Gradient Stacked Area Chart",
					 'img':"https://echarts.apache.org/examples/data/thumb/area-stack-gradient.png?_v_=1668744747967"
					},
					{'key':"",
					 'img':"https://echarts.apache.org/examples/data/thumb/line-marker.png?_v_=1668744747967"
					},
					{'key':"",
					 'img':"https://echarts.apache.org/examples/data/thumb/area-pieces.png?_v_=1668744747967"
					},
					{'key':"",
					 'img':"https://echarts.apache.org/examples/data/thumb/scatter-symbol-morph.webp?_v_=1668744747967"
					},
					{'key':"Wish List and Mountain Height",
					 'img':"https://echarts.apache.org/examples/data/thumb/pictorialBar-hill.webp?_v_=1668744747967"
					},
				],
				setType:0
			}
		},
		mounted(){
			window['echart_setChartType']=this.setChartType
		},
		methods:{
			setChartType:function(){
				this.setType=0
				//调起挂载窗口
				window.openPropsConfiguration(()=>{})
			},
			returnChartType:function(index){
				window.setPropsValue(this.imgList[index].key)
				window.closePropsConfiguration()
			}
		}
	}
</script>

<style scoped>
	.imgItem{
		overflow: hidden;
		border-radius: 10px;
		transition: .2s;
		cursor: pointer;
		transform-origin: center;
	}
	.imgItem:hover{
		transform: scale(1.1);
	}
</style>