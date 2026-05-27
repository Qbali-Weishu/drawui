//选择框绘制线程
addEventListener("message",boundList=>{
    let retrunData={
        left:null,
        top:null,
        right:null,
        bottom:null
    }
	boundList=boundList.data
    for(let i=0;i<boundList.length;i++){
        if(boundList[i].left<retrunData.left || retrunData.left ===null)
			retrunData.left=boundList[i].left
        if(boundList[i].top<retrunData.top || retrunData.top===null)
            retrunData.top=boundList[i].top
        if(boundList[i].right>retrunData.right || retrunData.right===null)
            retrunData.right=boundList[i].right
        if(boundList[i].bottom>retrunData.bottom || retrunData.bottom===null)
            retrunData.bottom=boundList[i].bottom
    }
    return postMessage(retrunData)
})
export default {}