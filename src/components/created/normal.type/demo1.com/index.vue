<!--组件demo1的主组件-->
<template>
<teleport :to="'#'+mountTarget">
    <div :id="newId" style="height:300px;width:300px;background:yellow;">
        <div :id="`${newId}dddmm`" class="test">
            {{props.name}}
        </div>
    </div>
     </teleport>
</template>
<style scoped>
.test{
    height:100px;width:200px;background:green
}
</style>
<script>
export default {
    name:"demo1",
    data(){
        return{
            data1:""
        }
    },
    props:{
        mountTarget:String,
        newId:String,
        props:{
            type:Object,
            default:{
                name:"name1",
                name2:"name2"
            }
        }//组件实际需要的数据
    },
    inject:["testInject"],
    provide:["data1"],
    beforeMount(){
        console.log("挂载目标",this.mountTarget)
    },
    mounted(){
        try{
            document.getElementById(this.newId).addEventListener("mousedown",function(e){e.stopPropagation();
			window.nodeOnSelectChose(e,true)})
        }catch{

        }
    },
    methods:{
        getOptions:function(senToParent){
            let parentVar={
                props:this.$props,
                data:this.$data,
                inject:this.$options.inject,
                provide:this.$options.provide
            }
            senToParent(parentVar)
        }
    }
}
</script>
