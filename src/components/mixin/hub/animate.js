let scaleAnimate=function(box,from,to,time,type){
	console.log("enter")
	let step
	if(type==1){//放大
		step=0.8
		if(from>=to){
			from=to
			box.style.transform=`scale(${from})`
			return
		}
		from += step
		
	}else{//缩小
		step=0.8
		if(from<=to){
			from=to
			box.style.transform=`scale(${from})`
			return
		}
		from -= step
	}
	box.style.transform=`scale(${from})`
	
	console.log(from,step,to)
	
	window.requestAnimationFrame(function(){scaleAnimate(box,from,to,time,type)})
}
export default{
	name:'hubAnimate',
	scaleAnimate
}