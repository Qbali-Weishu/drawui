<template>
  <router-view/>
</template>
<style>
body{
  font-size: 13px;
  font-weight: bold;
  --color_text1:#AFAFAF;
  --mainColorBlue:#8BA4FF;
  --mainColorGreen:#81C874;
  --mainColorGreen2:#2BE33D;
  --mainColorGray:rgba(0, 0, 0, 0.15);
  --mainColorGray3:rgba(0, 0, 0, 0.05);
  --mainColorGray2:rgba(0, 0, 0, 0.25);
  --mainColorGray4:rgba(0, 0, 0, 0.35);
  --mainColorGray8A:#8a8a8a;
  --mainColorBlue2:#3662EC;
  --mainColorBlueA8:#3662ec;
  --mainColorBlack:#5E5E5E;
  --mainColorBlack2:#333333;
  --mainColorRed:#FFAEAE;
  --mainColorRed2:#FF6D6D;
  --mainColorBlue3:#6D96FF;
  --mainTextColor1:#e6e6e6;
  --mainColorWhite1:#969696;
  --mainColorSelected1:#e6e6e6;
  --mainColorSelected2:#b4b4b4;
  --mainColorGrayBg:#2C2C2C;
  --mainColorGrayBg2:#3e3e3e;
  --mainColorGrayBg3:#686868;
  --mainDarkBg1:#2C2C2C;
  --mainDarkBg2:#212121;
  --mainColorOrange1:#FF8F1F;
  --timingFunction1:cubic-bezier(.48,-0.1,.03,1.35);
  margin: 0;
}
#app {
  width:100%;
  min-width: 1516px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow: hidden;
  color: #2c3e50;
}

#nav {
  padding: 0px;
  overflow: hidden;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

header{
  margin-top: 0px;
  overflow: hidden;
  position: relative;
  background: /*#FFFFFF*/var(--mainDarkBg2);
  height: 45px;
  width:100%;
  border-radius: 0px;
}
button{
  outline: none;
  border: none;
  cursor: pointer;
}
::-webkit-scrollbar{
	
  width: 5px;
  
}
::-webkit-scrollbar-button{
  width: 5px;
}
::-webkit-scrollbar-thumb{
  width: 5px;
  border-radius: 5px;
  background-color: var(--mainColorGray3);
}
::-webkit-scrollbar-track{
  width:5px;
}
.spreadButton{
	transition: .2s;
  background-color: var(--mainColorGray2);
  height:10px;
  width:10px;
  clip-path: polygon(0 0,100% 50%,0 100%);
}
.styleBindVar{
  /*变量绑定按钮 */
  float:right;
  padding:1px;
  height: 100%;
  background-color: transparent;
  font-weight: bold;
  color: var(--mainColorBlue);
  font-size: 14px;
}
.styleTitle{
	/*样式编辑器列表标题*/
	color:var(--mainColorGray8A)
}
.contextMenu{
		padding-top: 5px;
		padding-bottom: 5px;
		align-items: center;
		overflow: hidden;
		position: absolute;
		display: flex;
		height:auto;
		border-radius: 10px;
		min-width: 150px;
		width: auto;
		z-index: 999;
		top: 50%;
		left: 30%;
		flex-direction: column;
		background-color: rgba(255,255,255,0.75);
		backdrop-filter: blur(10px);
		box-shadow:-3px 3px 10px rgba(0,0,0,0.25);
}
.ecblock1{
		margin-top: 10px;
		/*box-shadow: 0 0 15px rgba(0,0,0,0.15);*/
		border-radius: 10px;
	}
	
.mountPoint1{
	/*只允许拖入的锚点*/
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: var(--mainColorGreen2);
	right: -5px;
	top: 28px;
	cursor: pointer;
	transform-origin: center;
	transition: .2s;
}
.mountPoint1:hover{
	transform: scale(1.2);
}

.mountPoint2{
	/*只允许拖出的锚点*/
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: var(--mainColorBlue3);
	left: -5px;
	top: 28px;
	cursor: pointer;
	transform-origin: center;
	transition: .2s;
}
.mountPoint2:hover{
	transform: scale(1.2);
}

.mountPoint3{
	/*可出入的锚点*/
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 5px;
	background-color: var(--mainColorBlue3);
	right: -5px;
	top: 28px;
	cursor: pointer;
	transform-origin: center;
	transition: .2s;
}
.mountPoint3:hover{
	transform: scale(1.2);
}
.insertECBar{
	margin-bottom: 5px;
	width: 20px;
	height: 10px;
	border-radius: 10px;
	background-color: var(--mainColorBlue3);
	cursor: pointer;
	position: relative;
}
.insertECBar:before{
	content: "";
	position: absolute;
	height: 3px;
	left: -13px;
	top: 3px;
	width: 15px;
	border: 2px dashed var(--mainColorGray4);
	box-sizing: border-box;
	background-color: transparent;
}
.ecRightBar{
	z-index: 9999;
	position: absolute;
	width: 100px;
	height: auto;
	border-radius: 10px;
	background-color:rgba(0,0,0,0.85);
	box-shadow: 0 0 15px rgba(0,0,0,0.15);
	padding-bottom: 5px;
	padding-top: 5px;
}
.ecRightBarItem{
	cursor: pointer;
	background-color: transparent;
	color: white;
	border-radius: 5px;
	width: 90%;
	line-height: 30px;
	height: 30px;
	user-select: none;
	margin-left: 5%;
	position: relative;
	margin-top: 2px;
	transition: .2s;
	padding-left: 5px;
	box-sizing: border-box;
	letter-spacing: 2px;
	font-weight: normal;
}
.ecRightBarItem:hover{
	background-color: var(--mainColorBlue2);
}
	@keyframes scrollEnd {
		from{
			background-color: transparent;
		}
		50%{
			background-color: var(--mainColorGray);
		}
		to{
			background-color: transparent;
		}
	}
	
	.logicViews{
		border-radius: 10px;
		position: absolute;
		left: -120px;
		height: auto;
		max-height: 200px;
		min-height: 50px;
		width: 100px;
		background-color: white;
		box-shadow: 0 0 15px rgba(0,0,0,0.15);
	}
	.logicIndexItem{
		white-space: nowrap;
		display: flex;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
		height: 30px;
		background-color: transparent;
		color: var(--mainColorBlue3);
		border-bottom: 1px solid var(--mainColorGray3);
		font-weight: normal;
		line-height: 30px;
		text-align: left;
		padding-left: 5px;
		box-sizing: border-box;
		user-select: none;
		cursor: pointer;
	}
	.logicSelectCircle{
		box-sizing: border-box;
		width: 0px;
		transition: .2s;
		position: relative;
		height: 16px;
		border:none;
		border-radius: 10px;
		float: left;
		background-color: white;
		margin-top: 7px;
		margin-right: 5px;
		box-shadow: 0 0 5px rgba(0,0,0,0.2);
	}
	.logicName{
		user-select: none;
		width: 100%;
		height: 20px;
		line-height: 20px;
		border-radius: 10px 10px 0 0 ;
		background-color: transparent;
		color: white;
		position: absolute;
		top: -20px;
		padding-left: 10px;
		box-sizing: border-box;
		font-weight: normal;
		z-index: 1;
		left: 0;
	}
	.spanItem{
		width: 10px;
		height: 2px;
		background-color: white;
		pointer-events: none;
		position: absolute;
		left: 50%;
		top: 5px;
		transform-origin: center;
	}
	/*处理失焦的输入框*/
	.hiddenInput{
		width: 1px;
		height: 1px;
		opacity: 0;
		outline: none;
		border: none;
		position: absolute;
		top: -10px;
		left: -10px;
	}
	/*分割线*/
	.splitLine{
		border: none;outline: none;width: 90%;height: 2px;margin: 0;padding: 0;margin-left: 5%;background-color: white;
	}
	.timeLine{}
	
	.locatedNode{}
	.locatedNode::after{
		content: "";
		position:absolute;
		z-index: -1;
		width:20px;
		height:20px;
		background-color:transparent;
		background-image: url("./assets/img/located.svg");
		background-repeat: no-repeat;
		background-size: 100%;
		left:50%;
		transform-origin: center;
		top:-30px;
		animation: locatedShow .3s;
		animation-timing-function: var(--timingFunction1);
		animation-fill-mode: forwards;
	}
	@keyframes locatedShow {
		from{
			transform: translateX(-50%) scale(2) translateY(-10px);
		}to{
			transform: translateX(-50%) scale(2) translateY(0px);
		}
	}
</style>
