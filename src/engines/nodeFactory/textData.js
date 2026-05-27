//四个顶点样式
const pointCss=`
					width:10px;
					height:10px;
					box-shadow:0 0 0 1px var(--mainColorBlue2);
					cursor:pointer;
					border-radius:3px;
					background-color:white;
					position:fixed;
					z-index:4
					`
//边样式
const sideCss=`
				cursor:pointer;
				background-color:var(--mainColorBlue);
				position:fixed;
				z-index:3
				`
//对齐线抛出点样式
const sideCircleCss=`
				cursor:pointer;
				background-color:rgba(243,113,61,1);
				border:1px solid white;
				position:fixed;
				z-index:4;
				border-radius:5px
				`
//边框相关节点ID
const sideIdList=[
			'sidePoint_left_top',
			'sidePoint_right_top',
			'sidePoint_left_bottom',
			'sidePoint_right_bottom',
			'sideBar_left',
			"sideBar_top",
			'sideBar_right',
			'sideBar_bottom',
			'sideCircle_left',
			'sideCircle_top',
			'sideCircle_right',
			'sideCircle_bottom']

export{
	pointCss,
	sideCircleCss,
	sideCss,
	sideIdList,
	
}