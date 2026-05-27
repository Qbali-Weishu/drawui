
import support from "./components/support.vue"

support.install=function(vue){
	vue.component(support.name,support)
}

export default support