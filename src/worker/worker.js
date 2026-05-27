
addEventListener('message', e => {
    var { data } = e
	let x = data.clientX,
		y = data.clientY
	let px=data.px
	let py=data.py
	let dertaX = x - px,
		dertaY = y - py
	let tan = dertaY / dertaX
	let angle = Math.round(Math.atan(tan) / (Math.PI / 180))
	angle = angle + 90
		
	if (x < px && y > py) {
		angle += 180
	} else if (x < px && y < py) {
		angle += 180
	}
	if (angle >= 360) {
		angle = 0
	}
	if (x < px && angle < 180 && angle > 0) {
		angle += 180
	}
	if (y < py && 90 < angle && angle < 270) {
		angle -= 180
	}
	let width = Math.sqrt((Math.pow(data.clientX - px, 2) + Math.pow(data.clientY - py,2)))
	angle=angle || 0
    return postMessage({"angle":angle,width:width})

})
export default {}

/*const workerCode=()=>{
	
onmessage=(e,px,py)=>{
	console.log(e)
	//changeAngle: function(e,px,py) { //点击更改角度
		let x = e.clientX,
			y = e.clientY
		let dertaX = x - px,
			dertaY = y - py
		let tan = dertaY / dertaX
		let angle = Math.round(Math.atan(tan) / (Math.PI / 180))
		angle = angle + 90
	
		if (x < px && y > py) {
			angle += 180
		} else if (x < px && y < py) {
			angle += 180
		}
		if (angle >= 360) {
			angle = 0
		}
		if (x < px && angle < 180 && angle > 0) {
			angle += 180
		}
		if (y < py && 90 < angle && angle < 270) {
			angle -= 180
		}
		let width = Math.sqrt((Math.pow(e.clientX - px, 2) + Math.pow(e.clientY - py,2)))
		//this.mountStartPosition.angle=angle
	//}
	return postMessage([angle,line])
}
}
let code=workerCode.toString()
code=code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
const blob=new Blob([code],{type:"application/javascript"})
export const drawLine=URL.createObjectURL(blob)*/

