/*位置对比线程*/
//存储位置
var xPositionData=[],yPositionData=[]
var data
let left
let right
let top
let bottom
let xcenter
let ycenter
let leftDelta
let topDelta
addEventListener("message",options=>{
	let mode=options.data.mode
	if(mode==0){
		//0为设置位置
		if(options.data.preLeft!==null)
			xPositionData.push(options.data.preLeft)
		if(options.data.preTop!==null)
			yPositionData.push(options.data.preTop)
		if(options.data.preRight!==null)
			xPositionData.push(options.data.preRight)
		if(options.data.preBottom!==null)
			yPositionData.push(options.data.preBottom)
		//中线位置
		if(options.data.preLeft!==null && options.data.preRight!==null )
			xPositionData.push(((options.data.preLeft+options.data.preRight)/2).toFixed(0)*1)
		if(options.data.preTop!==null && options.data.preBottom!==null )
			yPositionData.push(((options.data.preTop+options.data.preBottom)/2).toFixed(0)*1)
		if(options.data.leftDelta!==null)
			leftDelta=options.data.leftDelta
		if(options.data.topDelta!==null)
			topDelta=options.data.topDelta
	}else if(mode==1){
		//1为删除位置
		let index=[xPositionData.indexOf(options.data.preLeft),
					xPositionData.indexOf(((options.data.preLeft+options.data.preRight)/2).toFixed(0)*1),
					xPositionData.indexOf(options.data.preRight)
				 ]
		let temp=0
		for(let i=0;i<3;i++){
			for(let j=0;j<3-i-1;j++){					
				if(index[j+1]>index[j]){
					temp=index[j]
					index[j]=index[j+1]
					index[j+1]=temp
				}
			}
		}
		for(let i=0;i<3;i++){
			if(~index[i]){
				xPositionData.splice(index[i],1)
			}
		}
		
		index=[yPositionData.indexOf(options.data.prTop),
					yPositionData.indexOf(((options.data.preTop+options.data.preBottom)/2).toFixed(0)*1),
					yPositionData.indexOf(options.data.preBottom)
				 ]
		temp=0
		for(let i=0;i<3;i++){
			for(let j=0;j<3-i-1;j++){					
				if(index[j+1]>index[j]){
					temp=index[j]
					index[j]=index[j+1]
					index[j+1]=temp
				}
			}
		}
		for(let i=0;i<3;i++){
			if(~index[i]){
				yPositionData.splice(index[i],1)
			}
		}
	}else if(mode==2){
		//2为比较
		let data={
			'left':null,
			'right':null,
			'top':null,
			'bottom':null,
			'xcenter':null,
			'ycenter':null
		}
		let allow=false
		left=(options.data.position.left + leftDelta).toFixed(0)*1
		right=(options.data.position.right + leftDelta).toFixed(0)*1
		top=(options.data.position.top+topDelta).toFixed(0)*1
		bottom=(options.data.position.bottom+topDelta).toFixed(0)*1
		xcenter=((left+right)/2).toFixed(0)*1
		ycenter=((top+bottom)/2).toFixed(0)*1
		if(xPositionData.includes(left)){
			allow=true
			data.left=left
			console.log("left",left)
		}
		if(xPositionData.includes(right)){
			allow=true
			data.right=right
			console.log("right",right)
		}
		if(xPositionData.includes(xcenter)){
			allow=true
			data.xcenter=xcenter
		}
		if(yPositionData.includes(top)){
			allow=true
			data.top=top
		}
		if(yPositionData.includes(bottom)){
			allow=true
			data.bottom=bottom
		}
		if(yPositionData.includes(ycenter)){
			allow=true
			data.ycenter=ycenter
		}
		if(allow)
			return postMessage(data)
		else
			return postMessage(false)
	}else{
		//否则为清除线位置
		/*return postMessage({
			'left':null,
			'right':null,
			'top':null,
			'bottom':null,
			'xcenter':null,
			'ycenter':null
		})*/
	}
})
export default {}