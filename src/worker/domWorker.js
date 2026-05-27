addEventListener("message",boundList=>{
	let x=boundList.data.x,left=boundList.data.left,width=boundList.data.width
	let deltaX=x-left-150
	let percent=(deltaX/width)*100+50
	let rotate=percent*1.8-90
	if(percent>100) percent=100
	else if(percent<0) percent=0
	//if(rotate>90)rotate=90
	//else if(rotate<-90)rotate=-90
	return postMessage({
		rotate:rotate*2,
		percent:percent
	})
})
export default {}