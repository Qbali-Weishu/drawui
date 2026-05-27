import index from "./index.vue"
export function mount(){
	window.APP.component("echartIndex",index)
	return 'echartIndex'
}