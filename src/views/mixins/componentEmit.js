
export default{
	data(){
		return{
			showEventEdit:false,//控制事件编辑器显示与隐藏
		}
	},
	methods:{
		closeEventEdit:function(){
			//关闭事件编辑器
			this.showEventEdit=false
		},
		openEventEdit:function(){
			this.showEventEdit=true
		}
	}
}