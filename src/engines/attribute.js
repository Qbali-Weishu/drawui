/**元素属性加载引擎 */
import { structStore } from "../store/struct";
function process(id,dom){
    let store=structStore()
    let domAttributeSet=store.ATTRIBUTESTURCT[id]
    if(domAttributeSet){
        domAttributeSet.forEach(attributeSet =>{
            let value=attributeSet.value
            if(attributeSet.varData!=null){//代表此时使用了变量，则需对&进行分割
                let value_split=value.split("&")
                //console.log("属性集",value_split)
                let valueOutcome=[]
                value_split.forEach(ele => {
                    if(ele.indexOf("$")>-1){
                        valueOutcome.push(`{{`+attributeSet.varData+`}}`)
                    }
                    else{
                        //console.log("ele",ele)
                        valueOutcome.push("'"+ele+"'")
                    }
                })
               //拼接valueOutcome成条件表达式
                    valueOutcome=valueOutcome.join("+")//拼接为字符串
                    valueOutcome=valueOutcome.replace("`",'')//去除条件引用{{}}外部的引号
                    dom.setAttribute(":"+attributeSet.name,valueOutcome)
            }else{
                dom.setAttribute(attributeSet.name,value)
            }
        })
    }

    //console.log(dom)
    return dom
}
export default{
    name:"AttributeEngine",
    process
}