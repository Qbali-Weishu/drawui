<template>
    <div id="test1" @click="view" ref="asd">
		<div v-for="(key,index) in keys" :key="index"> 
			{{key}}
		</div>
		<div>
			<link-output style="left: 30px;top: 30px;"></link-output>
		</div>
		<button @click="fn1">同步到全局</button>
		<button @click="fn2">输出当前</button>
		<button @click="fn3">全局中加一</button>
		<button @click="fn4">全局重置</button>
		<button @click="fn5">全局输出</button>
		<div>
			<div class="class1">
				<div style="width: 100px;height: 100px;"></div>
			</div>
		</div>
		<select>
			<option>asd</option>
			<option>asd</option>
			<option>asd</option>
		</select>
		<div style="width: 300px;overflow: scroll;position: relative;height: 300px;">
			<div style="width: 800px;height: 300px;background-image: linear-gradient(to right,red,blue);position: relative;" ref="codeOut">
				
				<highlightjs language="JavaScript" :autodetect="false" :code="codeData" style="width: 300px;height:100px;position: absolute;top:10px;left:10px"></highlightjs>
				<div contenteditable="true" draggable="true" @drop="drop" @input="setInput" ref="inn" style="width: 300px;height: 100px;position: absolute;left: 10px;box-sizing: border-box;top: 10px;background-color: rgba(0,0,0,0);line-height: 30px;margin: 0;word-break: break-all;white-space: pre-wrap;font-size: 12px;font-weight: normal;padding:1em;text-align: left;padding-left: 2em;color:white" id="code">
					{{codeData}}
				</div>
			</div>
			
		</div>
		
		<div ref="ads" contenteditable="true" style="white-space: pre-wrap;" @input="setInput">
			
		</div>
		<div style="float: right;clip-path: polygon(0 0,100% 50%,0 100%);width: 9px;height: 9px;background-color:red;position: absolute;top: 30px;left: 0;">
		</div>
		<div style="position: absolute;top: 20vw;left: 20vw;height:300px;width:500px">
			
		<!--gradient></gradient-->
		</div>
		
		<div style="/* 矩形 1 */

position: absolute;
width: 233px;
height: 166px;
background: conic-gradient(from 180deg at 50% 50%, #D8D8D8 0deg, #D8D8D8 198deg, rgba(216,216,216,0.00) 360deg, rgba(216,216,216,0.00) 360deg);"></div>
<div style="position: absolute;top: 0;left: 0;width:1536px;height:20px;background-color: rebeccapurple;"> 
</div>
<!--div id="drawMain" style="position: absolute;width: 100vw;height: 100vh;top: 0;left: 0;z-index: 99999;">
<div id="ouyt" style="position: relative;width: 50vw;height:50vh;z-index: 99999;background-color: wheat;margin-left: 50px;" @mousedown="outMouseDown" @mousemove="outMouseMove">
	<div id="iout" style="width: 20vw;height: 20vh;transform-origin: top left;transform: scale(2);position: absolute;top: 5vh;left: 5vw;background-color: white;">
		<div id="inner" style="background-color: red;width:20px;height: 20px;position: absolute;top:0;left: 0;">
		</div>
	</div>
</div>
</div-->
		<cmp :html="'hellosada'" @handleChange="handleChange"></cmp>
		<site-name>asds</site-name>
		<component :is="comId" v-if="showCom" v-bind="data"></component>
        <textarea draggable="true" @drop="drop" @input="setInput" ref="inn" style="width: 100px;height: 200px;position: absolute;left: 600px;top: 100px;" id="code"></textarea>
		<button @click="callF" ref="pack" >编译</button>
        <!--div id="teout" style="background:red;position: absolute;left: 200px;top: 100px;width: auto;min-width: 250px;">
            <component :is="'for'"></component>
        </div-->
		<div style="position: absolute;left: 300px;top: 10px;width: 200px;height: 30px;background-color: white;display: flex;" >
			<div style="height: 20px;background-color: rebeccapurple;color: white;margin-top: 5px;border-radius: 5px;padding: 2px;box-sizing: border-box;" data-var="0">hello</div>
			<div style="height: 20px;background-color: red;color: white;margin-top: 5px;border-radius: 5px;padding: 2px;box-sizing: border-box;" data-var="0">hello</div>
			<div style="height: 20px;background-color: rebeccapurple;color: white;margin-top: 5px;border-radius: 5px;padding: 2px;box-sizing: border-box;" data-var="0">hello</div>
			<div style="width: 100%;height: 30px;text-align: left;outline: none;border: none;;line-height: 30px;letter-spacing: 2px;padding-left: 2px;box-sizing: border-box;"  contenteditable="true" @input.stop="testInput" @keydown="deleteText"></div>
		</div>
		<!--backgroundImage style="position: absolute;top:40%;left: 50%;;width: 230px;background-color: white;border-radius: 10px;"></backgroundImage-->
		<!--hub style="position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%);"></hub-->
		<!--h3 style="text-decoration-line: grammar-error;">she are asd</h3>
        <quickEditDom id="com" ></quickEditDom>
        <v-allot-list id="ttt"></v-allot-list>
        <demo1 v-if="$_isShowComponent"></demo1>
		<colorBord style="position: absolute;top:10vh;left: 20vw;"></colorBord>>
        <support style="position:absolute;top:0;left:0"></support>
        <h3 id="on">asda</h3>
        <div class="testDiv">
			<div style="background-color: #008000;height: 100px;width: 100px;position:relative;float: left;">
				asda
			</div>
			<div style="background-color: #80B3FE;height: 100px;width: 100px;position:relative;float: left;">
				aas
			</div>
        </div-->
		<iframe :src="userProject" style="position:absolute;z-index:99;width:80vw;height:80vh;display:none" v-if="userProject!=null"></iframe>
		<newCode style="position: absolute;top: 300px;"></newCode>
		<config></config>
		<cubicBezier style="left: 0;top: 0;z-index: 99999;"></cubicBezier>
	</div>
</template>
<style scoped>
	select{
		border: none;
		outline: none;
		text-align: left;
	}
	select:hover{
		background-color: #008000;
	}
.testDiv{
    height:200px;
    width:300px;
    position: relative;
}

#test1{
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: rgb(207, 207, 207);
}
#com{
    position: fixed;
    width: 250px;
    height: 450px;
    top:10vh;
    right:3vw;
}
#comw{
    position:relative;
    width: 31px;
    height: 44px;
    margin-top: 20%;
    background-color: white;
}
 .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
  div .class1:nth-child(1){
	  background-color: red;
  }
</style>
<script>
import { defineCustomElement } from 'vue'
import Vue from 'vue'//注意引用方式
import remoteImport from 'vue-remote-import';
import colorBord from "../components/microTools/color.vue"
import hub from "../components/hub.vue"
import gradient from "../components/microTools/gradient.vue"
import cubicBezier from "../components/microTools/cubicBezier.vue"
import actionEdit from "../components/microTools/actionEdit.vue"
import { h } from 'vue'
import newCode from "./mona.vue"
import codeMirror from "./code.vue"
import { structStore } from "../store/struct.js"
import { componentStore } from "../store/componentsStore.js"
import linkOutput from "../components/microTools/linkOutPut.vue"
require("./testJS.js")
let path=require("path")
const files = require.context('../components/', false, /\.vue$/)
const modules = {}
files.keys().forEach(key => {
const name = path.basename(key, '.vue')
modules[name] = files(key).default || files(key)
})
const eventComs={}
const files2 = require.context('../components/eventComponents', false, /\.vue$/)
files2.keys().forEach(key => {
const name = path.basename(key, '.vue')
console.log("name",name)
eventComs[name] = files2(key).default || files2(key)
})
let dt={
	'blog-title':"testData22"
}

export default{
    name:"test1",
	computed:{
		hRender(){
			return h
		}
	},
    components:{ 
		linkOutput,
		newCode,
		codeMirror,
		'my-title':{
				render() {
					return h(
					  'h1',           // 标签名称
					  this.blogTitle  // 标签内容
					)
				  },
				  methods:{
					  
				  },
				  props: {
					blogTitle: {
					  type: String,
					  required: true
					}
				  }
		},
	   //'support': httpVueLoader('/static/support.vue'),
		colorBord,
		hub,
		cubicBezier,
		gradient,
		...eventComs
		//support:() => remoteLoad('/static/support.vue','support')//:()=>{import("http://127.0.0.1:8081/static/support.vue")}
    //...modules
},
props:{
    list1:{
        type:Number,
        default:0
    }
},
inject:["testIn"],
provide:["msg"],
data(){
    return{
		keys:{'a':1,'b':2,'c':4},
		allStore:null,
		comStore:null,
		lineNumbers: true,
		codeData:`function asd(){
console.log("hello")
}
		`,
		code:"",
		content: '<h2>I am Example</h2>',
		        editorOption: {
		          // Some Quill options...
		        },
		data:{
			'blog-title':"testData"
		},
		data2:{
			'blog-title':"testData2"
		},
		time:null,
		reg:null,
		showCom:true,
		comId:"colorBord",
        msg:123,
        $_isShowComponent:false,
		selectList:["图片","渐变色"],
		colors:["rgba(128,128,128,0.5)","red"],
		hasTouchSpan:false,//标记是否已经接触到span标签，下次再删除，则直接移除整个span
		colorIndex:0,
		 jsLabs: ["https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/index.js"],
		        cssLabs: [
		          "https://cdn.jsdelivr.net/npm/element-ui@2.12.0/lib/theme-chalk/index.css"
		        ],
		        code: `<template>
		<div>
		  <h1>{{ title }}</h1>
		  <div><el-button type="primary" @click="handleClick">点一下, 玩一年</el-button></div>
		</div>
		</template>
		<script>
		export default {
		  data() {
		    return {
		      title: "宝刀屠龙"
		    }
		  },
		  methods: {
		    handleClick() {
		      this.$message.success('装备不花一分钱')
		    }
		  }
		};
		<\/script>
		<style>
		  body {color: #409EFF;}
		</style>`
    }
},
beforeMount(){

console.log(h)

// 检索注册的组件
	/*document.body.appendChild(
tt
	)
	**/
	try{
		let url=window.location.href.split("?")[1].split("=")[1]
		window.USERPATH=url
		console.log(window.USERPATH,'url')
	}catch(e){console.error(e)}
},
computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
mounted(){
	console.log("select",document.querySelector('div .class1:nth-child(1)'))
	this.allStore=structStore()
	this.comStore=componentStore()
	this.reg=new RegExp(/\n/g)
    let ind=0
    console.log(this.$options.provide,"provide")
    console.log(this.$options.inject,"inject")
    console.log(this.$props,"props")
    console.log(this.$data,"data")
    this.$_isShowComponent=true
	
	// 注册自定义元素
	// 注册完成后，此页面上的所有的 `<my-vue-element>` 标签会被更新
	// 你也可以编程式地实例化这个元素：
	// (只能在注册后完成此操作)
	System['testFunc']=()=>{
		console.log("testSystem")
	}
	/*let http=new XMLHttpRequest()
	http.open("POST","/node/set",true)
	http.onreadystatechange=()=>{
		
	}
	http.send(JSON.stringify(eventComs))
	setTimeout(()=>{
		this.comId='my-title'*/
		/*this.testForEventComponent_for({//逻辑标识为此部分代码唯一标识，用于在删除时准确定位
		    //将此处的数据传入for组件中，由for组件进行自行解析
		        "argument":["i",10,"i++"],
		        "logic":{
		            //重复一次logic,此处即for内容内部代码
					"for组件--逻辑标识":{//逻辑标识为此部分代码唯一标识，用于在删除时准确定位
					        //将此处的数据传入for组件中，由for组件进行自行解析
					            "argument":["j",15,"j++"],
					            "logic":{
					                //重复一次logic,此处即for内容内部代码
					            }
					       },
		        }
		   })*/
	/*},5000)*/

	/*setTimeout(()=>{
		this.ren("")
		this.showCom=true
		this.comId="myTitle"
		this.$nextTick(()=>{
			let preText=document.getElementById("testCOm").innerHTML
			console.log(preText)
			
			var parser = new DOMParser();
			var doc = parser.parseFromString(preText, "text/html");
			console.log(doc.body.firstChild)
			document.getElementById("testCOm").appendChild(doc.firstChild)
			
			document.getElementById("teout").appendChild(
			document.getElementById("testCOm"))
		})
	},5000)*/
    /**document.getElementById("on").onclick=()=>{
        console.log("on")
    }*/
    //获取inject列表
	this.$nextTick(()=>{
		const input = document.createElement("input")
		input.type="file"
		input.id="asdad"
		input.addEventListener('change',function(){
			const files = this.files;
			const fileList = Object.entries(files).map(([_,file]) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					file.preview = e.target.result;
				}
				return file;
			});
			
			/* 
			*  file中的preview存的就是可以预览使用url,如果你需要保证fileList的顺序,
			*  请不要使用这种方式,你可以采用索引的方式存储,来保证它的顺序一致性
			*/
		},false);
		document.body.appendChild(input)
		setTimeout(()=>{
			this.$refs['codeOut'].style.width="1000px"	
		},1000)
		/*this.codeData=`
		{
		    "asdas":{
		
		}
		}`
		this.$nextTick(()=>{
			this.$refs['ads'].appendChild(this.$refs['asd'].querySelector('code').cloneNode(true))
		})*/
		/*setTimeout(()=>{
			this.codeData=`function test(){
				console.log("test")
			}`
			this.$nextTick(()=>{
				this.$refs['ads'].appendChild(this.$refs['asd'].querySelector('code'))
			})
		},10000);*/

		
	})
},
watch:{},
    methods:{
		fn1:function(){
			console.log("test")
			this.allStore.CLASSLIST.CURRENT=this.comStore['component1'].CLASSLIST
		},
		fn2:function(){
			console.log(this.comStore['component1'].CLASSLIST)
		},
		fn3:function(){
			if(this.allStore.CLASSLIST.CURRENT['text']){
				this.allStore.CLASSLIST.CURRENT['text']+=1
			}else{
				this.allStore.CLASSLIST.CURRENT['text']=1
			}
			
		},
		fn4:function(){
			this.allStore.CLASSLIST.CURRENT={"重置":"重置完成"}
		},
		fn5:function(){
			console.log(this.allStore.CLASSLIST)
		},
		highlighter(code) {
		        return highlight(code, languages.js); // languages.<insert language> to return html with markup
		      },
		setInput:function(e){
				this.codeData=e.target.innerText
				
		},
		test1:function(){
			console.log("test1",this)
		},
		callF:function(){
			document.getElementById('asdad').click()
		},
		deleteText:function(e){
			if(e.key=='Backspace'){
				if(e.target.innerText.length==0 || e.target.innerText==""){
					//说明后面已经没有了
					if(this.hasTouchSpan){
						e.target.previousElementSibling.remove()
					}
					this.hasTouchSpan=!this.hasTouchSpan
				}
			}
		},
		testInput:function(e){
			let temp=""
		},
		drop:function(e){
			console.log(e,"drop")
		},
		pack:function(e){
			let code=document.getElementById("code").value
			let fso=new ActiveXObject("Scripting.FileSystemObject")
			console.log(fso.GetFolder("C://"))
			try{
				new Function(code)()
			}catch(e){
				console.error(e,"错误")
			}
		},
		outMouseDown:function(e){
			
			let left=document.getElementById("iout").offsetLeft
			let top=document.getElementById("iout").offsetTop
			console.log(e,document.getElementById("ouyt").offsetLeft,left,top,document.getElementById("iout").offsetTop,document.getElementById("ouyt").offsetTop)
			document.getElementById("inner").style.top=(e.clientY-document.getElementById("ouyt").offsetTop-top)*(1/2)+"px"
			document.getElementById("inner").style.left=(e.clientX-document.getElementById("ouyt").offsetLeft-left)*(1/2)+"px"
		},
		outMouseMove:function(e){
			
		},
		ren:function(html){
			window.APP.component('myTitle', {
			render(){
				return h(
				'div',
				{
					style:{
						color:"blue"
					},
					id:"testCOm"
				},
				`<h3>
				${this.blogTitle}
				</h3>
				`)
			},
			  props: {
			    blogTitle: {
			      type: String,
				  default:"asdjajdkajsdk",
			      required: true
			    }
			  }
			})
		},
        view:function(){
            
        },
		log:function(e){
			let index=e.target.selectedIndex
			console.log(e.target.options[index].text)
		},
		se:function(){
		        console.log("选择")
		    },
			testForEventComponent_for:function(data,parent=null){
				let div=document.createElement("div")
				div.style.cssText=`
						position:absolute
					`
				let out=document.createElement("div")
				out.style.cssText=`
								width:auto;
								height:auto;
								padding:20px;
								background-color:white;
								box-shadow:0 0 10px rgba(0,0,0,0.25);
								border-radius:10px;
								min-width:200px;
								min-height:200px;
				`
				let inputCssText=`
					border:none;
					outline:none;
					background-color:${this.colors[this.colorIndex]};
					border-radius:5px;
					text-align:center;
					height:40px;
					float:left
				`
				let for_var=document.createElement("input")
				let for_number=document.createElement("input")
				let for_step=document.createElement("input")
				for_var.value=data.argument[0]
				for_number.value=data.argument[1]
				for_step.value=data.argument[2]
				for_var.style.cssText=inputCssText
				for_number.style.cssText=inputCssText
				for_step.style.cssText=inputCssText
				
				for_var.style.width="25%"
				for_number.style.width="40%"
				for_step.style.width="25%";
				
				let for_logic=document.createElement("div")
				for_logic.style.cssText=`
					clear:left;
					width:90%;
					margin-left:5%;
					background-color:${this.colors[this.colorIndex]};
					border-radius:10px;
					height:70%;
					margin-top:10px;
					min-height:100px;
					`
				out.appendChild(for_var)
				out.appendChild(for_number)
				out.appendChild(for_step)
				
				this.colorIndex+=1
				if(Object.keys(data.logic).length!=0){
					for_logic.appendChild(this.testForEventComponent_for(data.logic["for组件--逻辑标识"],1))
				}
				out.appendChild(for_logic)
				
				if(parent==null){
					div.appendChild(out)
					document.getElementById("teout").append(div)
				}
				else{
					return out
				}
			}
		},
		
    }

</script>
