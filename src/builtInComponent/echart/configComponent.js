import config from "./config.vue"
const exportValue="echartCpnfig"
export function mountConfig(){
	if(window.APP._context.components[exportValue]){
		return exportValue
	}
	//否则定义
	window.APP.component(exportValue,config)
	return exportValue
}