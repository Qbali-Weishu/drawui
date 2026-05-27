/*
chainvas
*/
window['renderBezier']=[]

window['renderBezier'].push(function(){var e=window.Chainvas={chainable:function(a){return function(){var b=a.apply(this,arguments);return b===void 0?this:b}},chainablizeOne:function(a,b){try{e.utils.hasOwnProperty(a,b)&&e.utils.isFunction(a[b])&&(a[b]=e.chainable(a[b]))}catch(c){}return this},chainablize:function(a,b){var c=a.prototype;if(b)for(var d=b.length;d--;)e.chainablizeOne(c,b[d]);else for(d in c)e.chainablizeOne(c,d);return this},helpers:function(a,b){var c=a.prototype,d;for(d in e.methods)c&&!(d in c)&&(c[d]=e.methods[d]);
e.extend(c,b);return this},extend:function(a,b){return Chainvas.methods.prop.call(a,b)},global:function(a,b,c){typeof a==="string"&&(a=[a]);for(var d=a.length;d--;){var f=window[a[d]];f&&e.chainablize(f,c).helpers(f,b)}},methods:{prop:function(){if(arguments.length===1){var a=arguments[0],b;for(b in a)this[b]=a[b]}else arguments.length===2&&(this[arguments[0]]=arguments[1]);return this}},utils:{isFunction:function(a){var b=Object.prototype.toString.call(a);return b==="[object Function]"||b==="[object Object]"&&
"call"in a&&"apply"in a&&/^\s*\bfunction\s+\w+\([\w,]*\) \{/.test(a+"")},hasOwnProperty:function(a,b){try{return a.hasOwnProperty(b)}catch(c){return b in a&&(!a.prototype||!(b in a.prototype)||a.prototype[b]!==a[b])}}}}})

window['renderBezier'].push(function(){var a=["CSSStyleDeclaration","DOMTokenList","Node","Element"];if(window.HTMLElement&&"addEventListener"in window.HTMLElement.prototype&&window.Components&&window.Components.interfaces)for(var p in Components.interfaces)if(p.match(/^nsIDOMHTML\w*Element$/)){var b=p.replace(/^nsIDOM/,"");window[b]&&a.push(b)}Chainvas.global(a)})
window['renderBezier'].push(function(){
	Chainvas.global("CanvasRenderingContext2D",{circle:function(a,b,d){return this.beginPath().arc(a,b,d,0,2*Math.PI,!1).closePath()},roundRect:function(a,b,d,e,c){return this.beginPath().moveTo(a+c,b).lineTo(a+d-c,b).quadraticCurveTo(a+d,b,a+d,b+c).lineTo(a+d,b+e-c).quadraticCurveTo(a+d,b+e,a+d-c,b+e).lineTo(a+c,b+e).quadraticCurveTo(a,b+e,a,b+e-c).lineTo(a,b+c).quadraticCurveTo(a,b,a+c,b).closePath()}});
})



/*
bezierer
*/


window['renderBezier'].push(function() {

var self = window.CubicBezier = function(coordinates) {
		if (typeof coordinates === 'string') {
			console.log(coordinates,"coo")
			if(coordinates.indexOf('#') === 0) {
				coordinates = coordinates.slice(1);
			}
			
			this.coordinates = coordinates.split(',');
		}
		else {
			this.coordinates = coordinates;
		}

	
	
	
	if(!this.coordinates) {
		throw 'No offsets were defined';
	}
	
	this.coordinates = this.coordinates.map(function(n) { return +n; });
	
	for(var i=4; i--;) {
		try{
			var xy = this.coordinates[i];
			if(isNaN(xy) || (!(i%2) && (xy < 0 || xy > 1))) {
				throw 'Wrong coordinate at ' + i + '(' + xy + ')';
			}
		}catch{}
		
	}
	
	this.coordinates.toString = function() {
		return this.map(self.prettifyNumber) + '';
	}
};

self.prototype = {
	get P1() {
		let temo=this.coordinates.slice(0, 2);
		console.log(temo)
		return temo
	},
	
	get P2() {
		let temp=this.coordinates.slice(2);
		console.log("temot",temp)
		return temp
	},
	
	// Clipped to the range 0-1
	get clipped() {
		var coordinates = this.coordinates.slice();
		
		for(var i=coordinates.length; i--;) {
			coordinates[i] = Math.max(0, Math.min(coordinates[i], 1));
		}
		
		return new self(coordinates);
	},
	
	get inRange() {
		var coordinates = this.coordinates;

		return Math.abs(coordinates[1] - .5) <= .5 && Math.abs(coordinates[3] - .5) <= .5;
	},
	
	toString: function() {
		return 'cubic-bezier(' + this.coordinates + ')';
	},
		
	applyStyle: function(element) {
		element.style.setProperty(prefix + 'transition-timing-function', this, null);
	},
};

Chainvas.extend(self, {
	prettifyNumber: function(val) {
		return (Math.round(val * 100)/100 + '').replace(/^0\./, '.');
	},
	
	predefined: {
		'ease': '.25,.1,.25,1',
		'linear': '0,0,1,1',
		'ease-in': '.42,0,1,1',
		'ease-out': '0,0,.58,1',
		'ease-in-out':'.42,0,.58,1'
	}
});

})

window['renderBezier'].push(function(){
console.log("function2")
var self = window.BezierCanvas = function(canvas, bezier, padding) {
	this.canvas = canvas;
	this.bezier = bezier;
	this.padding = self.getPadding(padding);
	
	// Convert to a cartesian coordinate system with axes from 0 to 1
	var ctx = this.canvas.getContext('2d'),
		p = this.padding;
			
	ctx.scale(canvas.width * (1 - p[1] - p[3]), -canvas.height * (1 - p[0] - p[2]));
	ctx.translate(p[3] / (1 - p[1] - p[3]), -1 - p[0] / (1 - p[0] - p[2]));
};

self.prototype = {
	get offsets() {
		var p = this.padding, w = this.canvas.width, h = this.canvas.height;
		
		return [{
			left: w * (this.bezier.coordinates[0] * (1 - p[3] - p[1]) - p[3]) + 'px',
			top: h * (1 - this.bezier.coordinates[1] * (1 - p[0] - p[2]) - p[0]) + 'px'
		}, {
			left: w * (this.bezier.coordinates[2] * (1 - p[3] - p[1]) - p[3]) + 'px',
			top: h * (1 - this.bezier.coordinates[3] * (1 - p[0] - p[2]) - p[0]) + 'px'
		}]
	},
	
	offsetsToCoordinates: function(element) {
		var p = this.padding, w = this.canvas.width, h = this.canvas.height;
		
		// Convert padding percentage to actual padding
		p = p.map(function(a, i) { return a * (i % 2? w : h)});
		
		return [
			(parseInt(element.style.left) - p[3]) / (w + p[1] + p[3]),
			(h - parseInt(element.style.top) - p[2]) / (h - p[0] - p[2])
		];
	},
	
	plot: function(settings) {
		var xy = this.bezier.coordinates,
			ctx = this.canvas.getContext('2d');
		
		var defaultSettings = {
			handleColor: '#e6e6e6',
			handleThickness: .008,
			bezierColor: '#3662ec',
			bezierThickness: .02
		};
		
		settings || (settings = {});
		
		for (var setting in defaultSettings) {
			(setting in settings) || (settings[setting] = defaultSettings[setting]);
		}
		
		ctx.clearRect(-.5,-.5, 2, 2);
			
		// Draw control handles
		ctx.beginPath().prop({
			fillStyle: settings.handleColor,
			lineWidth: settings.handleThickness,
			strokeStyle: settings.handleColor
		});
		
		ctx.moveTo(0, 0).lineTo(xy[0], xy[1]);
		ctx.moveTo(1,1).lineTo(xy[2], xy[3]);
		
		ctx.stroke().closePath();
		
		ctx.circle(xy[0], xy[1], 1.5 * settings.handleThickness).fill()
		   .circle(xy[2], xy[3], 1.5 * settings.handleThickness).fill();
		
		// Draw bezier curve
		ctx.beginPath()
			.prop({
				lineWidth: settings.bezierThickness,
				strokeStyle: settings.bezierColor
			}).moveTo(0,0)
			.bezierCurveTo(xy[0], xy[1], xy[2], xy[3], 1,1).stroke()
			.closePath();
	}
	
};

self.getPadding = function(padding) {
	var p = typeof padding === 'number'? [padding] : padding;
	
	if (p.length === 1) {
		p[1] = p[0];
	}
	
	if (p.length === 2) {
		p[2] = p[0];
	}
	
	if (p.length === 3) {
		p[3] = p[1];
	}
	
	return p;
}

})


/*
enviroment
*/
function $(expr, con) { return (con || document).querySelector(expr); }
function $$(expr, con) { return (con || document).querySelectorAll(expr); }

/**
 * Find browser prefix
 */
window['renderBezier'].push(function(){
	var prefixes = ['', '-moz-', '-ms-', '-o-', '-webkit-'],
		prefix = (function(style) {
			for (var i=prefixes.length; i--;) {
				var prefix = prefixes[i];
				
				style.setProperty(prefix + 'transition', '1s', null);
				
				if (style.cssText) {
					return prefix;
				}
			}
			
			return null;
		})(document.createElement('a').style);
})



/*draw*/

window['renderBezier'].push(function() {
console.log("function3")
var self = window.bezierLibrary = {
	curves: {},
	
	render: function() {

		

		
		for (var name in self.curves) {
			try { var bezier = new CubicBezier(self.curves[name]); }
			catch(e) { continue; }
			
			self.add(name, bezier);
		}
	},
	
	add: function (name, bezier) {
		var canvas = document.createElement('canvas').prop({
				width:100,
				height:100
			})
	},
	
	selectThumbnail: function() {
		var selected = $('.selected', this.parentNode);
		
		if (selected) {
			selected.classList.remove('selected');
			selected.bezierCanvas.plot(self.thumbnailStyle);
		}
		
		this.classList.add('selected');
		
		this.bezierCanvas.plot(self.thumbnailStyleSelected);

	},
	
	deleteItem: function(a) {
		var name = $('span', a).textContent;
							
		delete bezierLibrary.curves[name];

		bezierLibrary.save();
		
		library.removeChild(a);
		
		if (a.classList.contains('selected')) {	
			$('a:first-of-type', library).onclick();
		}
	},
	
	save: function(curves) {
		localStorage.curves = JSON.stringify(curves || self.curves);
	},
	
	thumbnailStyle: {
		handleColor: 'rgba(0,0,0,.3)',
		handleThickness: .018,
		bezierThickness: .032
	},
	
	thumbnailStyleSelected: {
		handleColor: 'rgba(255,255,255,.6)',
		bezierColor: 'white',
		handleThickness: .018,
		bezierThickness: .032
	}
};

})

window['renderBezier'].push(function(){
	['curve','P1','P2','run','current',
	 'copy', 'copyoptionstoggle', 'copybuttons', 'copyoptions', 'json',
	].forEach(function(id) { window[id] = $('#' + id); });
	var ctx = curve.getContext("2d"),
		curveBoundingBox = curve.getBoundingClientRect(),
		bezierCanvas = new BezierCanvas(curve, null, [.25, 0]),
		favicon = document.createElement('canvas'),
		faviconCtx = favicon.getContext('2d'),
		pixelDepth = window.devicePixelRatio || 1;
	
	// Add predefined curves
	if (!localStorage.curves) {
		bezierLibrary.save(CubicBezier.predefined);
	}
	
	bezierLibrary.curves = JSON.parse(localStorage.curves);
	
	bezierLibrary.render();
	
	if(!window['settedBezier']){
		bezierCanvas.bezier = window.bezier = new CubicBezier(/*decodeURI(location.hash)*/window['preBezier']);
		
		var offsets = bezierCanvas.offsets;
		
		P1.style.prop(offsets[0]);
		P2.style.prop(offsets[1]);
	}

	
	
	favicon.width = favicon.height = 16 * pixelDepth;
	
	update(bezierCanvas,bezier);
	updateDelayed(bezier,current);
	
	/**
	 * Event handlers
	 */
	// Make the handles draggable
	P1.onmousedown = 
	P2.onmousedown = function() { 
		var me = this;
		
		document.onmousemove = function drag(e) {
			var x = e.pageX, y = e.pageY,
				left = curveBoundingBox.left,
				top = curveBoundingBox.top;
			
			if (x === 0 && y == 0) {
				return;
			}
			
			// Constrain x
			x = Math.min(Math.max(left, x), left + curveBoundingBox.width);
			
			me.style.prop({
				left: x - left + 'px',
				top: y - top + 'px'
			});
			
			update(bezierCanvas,bezier);
		};
		
		document.onmouseup = function () {
			me.focus();
			
			document.onmousemove = document.onmouseup = null;
		}
	};
	
	P1.onkeydown =
	P2.onkeydown = function(evt) {
		var code = evt.keyCode;
		
		if(code >= 37 && code <= 40) {
			evt.preventDefault();
			
			// Arrow keys pressed
			var left = parseInt(this.style.left),
				top = parseInt(this.style.top)
				offset = 3 * (evt.shiftKey? 10 : 1);
	
			switch (code) {
				case 37: this.style.left = left - offset + 'px'; break;
				case 38: this.style.top = top - offset + 'px'; break;
				case 39: this.style.left = left + offset + 'px'; break;
				case 40: this.style.top = top + offset + 'px'; break; 
			}
			
			update(bezierCanvas,bezier);
			updateDelayed(bezier,current);
			
			return false;
		}
	};
	
	/*P1.onblur =
	P2.onblur =
	P1.onmouseup =
	P2.onmouseup = updateDelayed;*/
	
	curve.onclick = function(evt) {
		var left = curveBoundingBox.left,
			top = curveBoundingBox.top,
			x = evt.pageX - left, y = evt.pageY - top;
			
		// Find which point is closer
		var distP1 = distance(x, y, parseInt(P1.style.left), parseInt(P1.style.top)),
			distP2 = distance(x, y, parseInt(P2.style.left), parseInt(P2.style.top));
	
		(distP1 < distP2? P1 : P2).style.prop({
			left: x + 'px',
			top: y + 'px'
		});
		
		update(bezierCanvas,bezier);
		updateDelayed(bezier,current);
		
		function distance(x1, y1, x2, y2) {
			return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
		}
	};
	
	curve.onmousemove = function(evt) {
		var left = curveBoundingBox.left,
			top = curveBoundingBox.top,
			height = curveBoundingBox.height,
			x = evt.pageX - left, y = evt.pageY - top;
		
		//this.parentNode.setAttribute('data-time', Math.round(100 * x / curveBoundingBox.width));
		//this.parentNode.setAttribute('data-progression', Math.round(100 * (3*height/4 - y) / (height * .5)));
	};
	
	handleOptionCopy = function(){
		this.select();
		this.setSelectionRange(0, 99999);
		document.execCommand("copy");
		copybuttons.classList.remove('copyoptions-open');
		copybuttons.classList.add('copied');
		copybuttons.addEventListener("animationend", handleCopyAnimationComplete, false);
	}
	/*save.onclick = function() {
		/*保存贝塞尔曲线数值*/
		/*var rawValues = bezier.coordinates + ''
		console.log(rawValues)
	};*/
	run.onclick = function() {
		window['previewTiming'].style['transitionTimingFunction']='cubic-bezier('+bezier.coordinates + ')'
		current.classList.toggle('move');
		if(current.classList.length>0){
			window['previewTiming'].style.left=0
		}else{
			window['previewTiming'].style.left="calc(100% - 20px)"
		}
	};
})



function handleCopyAnimationComplete(){
	copybuttons.removeEventListener("animationend", handleCopyAnimationComplete, false);
	copybuttons.classList.remove('copied');
}




function update(bezierCanvas,bezier) {
	// 重绘更新
	bezierCanvas.bezier = 
	window.bezier = new CubicBezier(
		bezierCanvas.offsetsToCoordinates(P1)
		.concat(bezierCanvas.offsetsToCoordinates(P2))
	);
	bezierCanvas.plot();
	if(window['setTimingTimeout']){
		clearTimeout(window['setTimingTimeout'])
	}
	window['setTimingTimeout']=setTimeout(()=>{
		window['returnTimingFunction'](bezier.coordinates.toString())
		window['setTimingTimeout']=null
	},100)
	//updateCopyInputs();
}


// For actions that can wait
function updateDelayed(bezier,current) {
}
