let list={}
function testDefin(){
	if(list['MyVueElement']) return
	const MyVueElement = defineCustomElement({
	  // normal Vue component options here
	  props: {},
	  emits: {},
	  data(){
		  return{
			hello:"hello world"
		  }
	  },
	  methods:{
		  test:function(){
			  alert("ok")
		  }
	  },
	  template: `
				
				<div @click="test">
					{{hello}}
					<my-vue-child></my-vue-child>
				</div>`,
	
	  // defineCustomElement only: CSS to be injected into shadow root
	  styles: [`.class1{color:red;}`]
	})
	
	
	// Register the custom element.
	// After registration, all `<my-vue-element>` tags
	// on the page will be upgraded.
	customElements.define('my-vue-element', MyVueElement)
	
	new Function('defineCustomElement',`
		const child=defineCustomElement({
			props: {},
			emits: {},
			data(){
					  return{
						hello:"hello child"
					  }
			},
			methods:{
					  test:function(){
						  alert("ok1")
					  }
			},
			template: \`
							<div @click.stop="test">
								{{hello}}
							</div>\`,
				
			// defineCustomElement only: CSS to be injected into shadow root
			styles: [\`/* inlined css */\`]
		})
		customElements.define('my-vue-child', child)
	`)(defineCustomElement)
	
	// You can also programmatically instantiate the element:
	// (can only be done after registration)
	document.getElementById('asjdka2asd').appendChild(
	  new MyVueElement({
	    // initial props (optional)
	  })
	)
	list.MyVueElement=MyVueElement
}
function createChild_(componentData,indexs,parentName=""){
	let nodeData,componentName,createdNode,innerContent
	//dom结构
	let childTree=""
	for(let i=0;i<indexs.length;i++){
		let styleValue=JSON.stringify(System.processStyleBind(componentData.STYLESTRUCT[indexs[i]].style))
		nodeData=componentData.DOMSTRUCT[System.device].tree[indexs[i]]
		let __ROOT__=indexs[i].startsWith('$NODE:')
					?System.componentStore[nodeData.__modulePath__].__ROOT__
					:nodeData
		let innerContent=__ROOT__.innerContent 
							?(
								__ROOT__.innerContent.startsWith("$VAR:")
								?__ROOT__.innerContent.replace("$VAR:","")
								:__ROOT__.innerContent
							) 
							:__ROOT__.innerContent
		if(indexs[i].startsWith('$NODE:')){
			
			//组件,再次定义
			componentName=defineCom(nodeData.__modulePath__,'',false,parentName)
			let propsData=""
			for(let key in nodeData.props){
				propsData+=`${key}:'${nodeData.props[key]}'`
			}
			propsData="{"+propsData+"}"
			childTree+=`<${componentName} v-bind="${propsData}" :style=${styleValue}></${componentName}>`
		}else{
			
			createdNode=document.createElement(nodeData.tag || 'div')
			createdNode.setAttribute(":style",styleValue)
			createdNode.innerHTML=`{{${innerContent}}}`
			createdNode.innerHTML+=createChild(componentData,nodeData.children)
			childTree+=createdNode.outerHTML
		}
	}
	return childTree
}
let componentList={}
let componentNativeList={}
function defineCom(componentId,newNodeId="",isParent=false,parentName="",nativeList={}){
	if(Object.keys(nativeList).length>0)
		componentNativeList=nativeList
	let componentData=System.componentStore[componentId]
	let componentName=(parentName,length>0?(parentName+"-"):'')+componentData.__moduleId__.replace("$","").replace('_','-')
	componentName=componentName.toLowerCase()
	if(componentList[componentName]){
		return componentName
	}
	let __ROOT__=componentData.__ROOT__
	let innerContent=__ROOT__.innerContent 
						?(
							__ROOT__.innerContent.startsWith("$VAR:")
							?__ROOT__.innerContent.replace("$VAR:","")
							:__ROOT__.innerContent
						) 
						:__ROOT__.innerContent
	//处理props
	let props=JSON.stringify(processProps(componentData.props))
	let children=createChild(componentData,componentData.DOMSTRUCT[System.device].index,componentName)
	let nodeId=newNodeId.length>0?`id='${newNodeId}'`:""
	let newComponent=new Function("defineCustomElement","nativeList",`
		console.log(nativeList)
		const component=defineCustomElement({
			props: ${props},
			emits: {},
			data(){
					  return{
						hello:"hello child"
					  }
			},
			methods:{
				test:function(){
					alert("ok1")
				}
			},
			template: \`
					<${componentData.__ROOT__.tag || 'div'} 
						data-node='1'
						${nodeId}
					>
						{{${innerContent}}}
						${children}
					</${componentData.__ROOT__.tag || 'div'}>
					\`,
				
			// defineCustomElement only: CSS to be injected into shadow root
			styles: [\`/* inlined css */\`]
		})
		customElements.define('${componentName}', component)
		return component
	`)(defineCustomElement,componentNativeList)
	componentList[componentName]=newComponent
	//返回定义的componentName
	return componentName
}