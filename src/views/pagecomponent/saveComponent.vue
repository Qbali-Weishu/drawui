<template>
	<div>
		<teleport to="body">
			<div class="saveComponent">
				<div style="font-size: 18px;margin-top: 5px;;width: 100%;background-color: transparent;height: 25px;text-align: center;line-height: 25px;font-weight: normal;color: white;">
					保存为组件
				</div>
				<main style="width: 100%;height:calc(100% - 30px);background-color: transparent;display: flex;">
					<!--左侧-->
					<div style="width: 50%;height: 100%;">
						<!--组件ID-->
						<div style="height: 25px;width: 70%;margin-left: 15%;display: flex;margin-top: 32px;height: 25px;">
							<h3 class="title" style="width: 30%;">组件ID</h3>
							<div class="componentId">
								adsdaksdjaksd
							</div>
						</div>
						<!--组件名称-->
						<div style="height: 25px;width: 70%;margin-left: 15%;display: flex;height: 25px;margin-top: 16px;">
							<h3 class="title" style="width: 30%;">组件名称</h3>
							<input class="componentInput"/>
						</div>
						<!--预览图-->
						<h3 class="title" style="width: 30%;margin-left: 15%;margin-top: 32px;">组件预览图</h3>
						<div ref="preViewImage" style="position: relative;width: 70%;height: 40%;background-color: #323232;border-radius: 10px;margin-left: 15%;margin-top: 16px;">
							<svg v-if="!showEmptyImage" t="1668260312430" style="position: absolute;left: 50%;transform: translateX(-50%);margin-top: 16px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6868" width="80" height="80"><path d="M186.636724 430.268534c4.909823 0 9.82374-1.855254 13.596669-5.573949l306.881342-302.44838 0 648.318712c0 10.698666 8.67252 19.371186 19.371186 19.371186s19.371186-8.67252 19.371186-19.371186l0-647.568628 302.538431 298.121841c3.773953 3.718695 8.683776 5.572926 13.594623 5.572926 5.004991 0 10.007935-1.927909 13.798261-5.774517 7.509021-7.620561 7.41897-19.884886-0.201591-27.393907L540.528754 63.354933c-3.354398-3.306302-7.608282-5.134951-11.961426-5.501294-0.684592-0.073678-1.378393-0.115634-2.081405-0.115634-0.328481 0-0.648776 0.032746-0.974188 0.049119-4.989641-0.061398-10.001795 1.788739-13.837146 5.568832L173.039032 397.101133c-7.619538 7.509021-7.708566 19.774369-0.199545 27.393907C176.629813 428.341648 181.631734 430.268534 186.636724 430.268534z" p-id="6869" fill="#ffffff"></path><path d="M876.833219 705.913455c-10.698666 0-19.371186 8.67252-19.371186 19.371186l0 165.41847c0 13.05534-10.620895 23.676236-23.676236 23.676236l-618.946754 0c-13.05534 0-23.676236-10.620895-23.676236-23.676236L191.162808 725.284641c0-10.698666-8.67252-19.371186-19.371186-19.371186s-19.371186 8.67252-19.371186 19.371186l0 165.41847c0 34.417881 28.000728 62.417585 62.417585 62.417585l618.946754 0c34.417881 0 62.417585-27.999704 62.417585-62.417585L896.202359 725.284641C896.204405 714.585975 887.531885 705.913455 876.833219 705.913455z" p-id="6870" fill="#ffffff"></path></svg>
							<div v-if="!showEmptyImage" style="width: 100%;height: 25px;text-align: center;height: 25px;line-height: 25px;color:white;position: absolute;top: 100px;font-weight: normal;">
								点击或拖拽到此处上传组件预览图
							</div>
						</div>
					</div>
					<!--右侧-->
					<div style="width: 50%;height: 100%;">
						<!--组件入参-->
						<h3 class="title" style="width: 15%;margin-top: 32px;margin-left: 16px;float: left;">组件入参</h3>
						<div class="newProps">
							<svg t="1668259067773" style="position: absolute;left: 50%;transform: translateX(-50%);" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5858" width="20" height="25"><path d="M916.115386 467.228307 557.971519 467.228307 557.971519 109.085464c0-24.714891-20.056801-44.771693-44.770669-44.771693-24.715915 0-44.772716 20.056801-44.772716 44.771693l0 358.142843L110.285291 467.228307c-24.715915 0-44.771693 20.056801-44.771693 44.771693s20.056801 44.772716 44.771693 44.772716l358.142843 0 0 358.143866c0 24.761963 20.056801 44.770669 44.772716 44.770669 24.713868 0 44.770669-20.008706 44.770669-44.770669L557.971519 556.772716l358.143866 0c24.762987 0 44.771693-20.057825 44.771693-44.772716S940.878372 467.228307 916.115386 467.228307L916.115386 467.228307zM916.115386 467.228307" p-id="5859" fill="#ffffff"></path></svg>
						</div>
						<div style="clear: both;"></div>
						<div class="propsList">
							<div v-for="index in 10" :key="index" style="width: 100%;height: 25px;margin-top: 8px;background-color: transparent;display: flex;">
								<!--入参名称-->
								<input class="propsName"/>
								<!--入参类型-->
								<div class="propsType">String</div>
								<!--默认数据-->
								<input class="propsDefault"/>
								<!--删除按钮-->
								<div class="removeButton" title="删除此入参">
									<svg t="1668257835258" style="margin-left: 8px;" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4731" width="20" height="25"><path d="M973.154 563.218 51.222 563.218c-28.275 0-51.222-22.946-51.222-51.214 0-28.276 22.946-51.222 51.222-51.222L973.154 460.782c28.33 0 51.222 22.946 51.222 51.222C1024.375 540.272 1001.484 563.218 973.154 563.218L973.154 563.218z" p-id="4732" fill="#ffffff"></path></svg>
								</div>
							</div>
						</div>
						<!--递交事件-->
						<h3 class="title" style="width: 70px;position: absolute;top:calc(30% + 100px);margin-left: 16px;">递交事件</h3>
						<div class="newEmit">
							<svg t="1668259067773" style="position: absolute;left: 50%;transform: translateX(-50%);" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5858" width="20" height="25"><path d="M916.115386 467.228307 557.971519 467.228307 557.971519 109.085464c0-24.714891-20.056801-44.771693-44.770669-44.771693-24.715915 0-44.772716 20.056801-44.772716 44.771693l0 358.142843L110.285291 467.228307c-24.715915 0-44.771693 20.056801-44.771693 44.771693s20.056801 44.772716 44.771693 44.772716l358.142843 0 0 358.143866c0 24.761963 20.056801 44.770669 44.772716 44.770669 24.713868 0 44.770669-20.008706 44.770669-44.770669L557.971519 556.772716l358.143866 0c24.762987 0 44.771693-20.057825 44.771693-44.772716S940.878372 467.228307 916.115386 467.228307L916.115386 467.228307zM916.115386 467.228307" p-id="5859" fill="#ffffff"></path></svg>
						</div>
						<div class="emitList">
							<div style="width: 100%;height: 25px;margin-top: 8px;background-color: transparent;display: flex;">
								<!--入参名称-->
								<input class="emitName"/>
								<!--入参类型-->
								<div class="emitComplain">注释</div>
								<!--删除按钮-->
								<div class="removeButton"  title="删除此事件">
									<svg t="1668257835258" style="margin-left: 8px;" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4731" width="20" height="25"><path d="M973.154 563.218 51.222 563.218c-28.275 0-51.222-22.946-51.222-51.214 0-28.276 22.946-51.222 51.222-51.222L973.154 460.782c28.33 0 51.222 22.946 51.222 51.222C1024.375 540.272 1001.484 563.218 973.154 563.218L973.154 563.218z" p-id="4732" fill="#ffffff"></path></svg>
								</div>
							</div>
						</div>
					</div>
					<!--分割线-->
					<div style="width: 2px;height: 60%;background-color: white;position: absolute;left: calc(50% - 2px);top:20%"></div>
				</main>
				<div class="saveButton">
					保存
				</div>
				<div class="bottomText">
					<div style="border-radius: 3px;margin-left:10px;width: 10px;height: 10px;margin-top:10px;background-color: transparent;border:1px solid white;">
						
					</div>
					<div style="margin-left: 10px;;line-height: 30px;border-radius: 3px;width: 100px;height: 30px;background-color: transparent;font-weight: normal;">
						同时发布到社区
					</div>
					
				</div>
			</div>
		</teleport>
	</div>
</template>

<script>
	
	export default{
		name:"saveComponent",
		data(){
			return{
				showEmptyImage:false
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.saveComponent{
		position: absolute;
		z-index: 99999;
		width: 60vw;
		height: 60vh;
		left:45%;
		top:20vh;
		transform: translateX(-50%);
		border-radius: 15px;
		background-color: #212121;
		animation: showComponent .5s;
		animation-fill-mode: forwards;
	}
	@keyframes showComponent {
		from{
			top:150vh;
			opacity: 0;
		}to{
			top:20vh;
			opacity: 1;
		}
	}
	.title{
		margin: 0;
		padding: 0;
		font-weight: normal;
		font-weight: 14px;
		color: white;
		line-height: 25px;
		height: 25px;
		text-align: left;
	}
	.componentId{
		border-radius: 10px;text-align: center;width: 60%;margin-left:10%;height: 25px;background-color:#323232;line-height: 25px;color: white;font-weight: normal;
	}
	.componentInput{
		border-radius: 10px;text-align: center;width: 60%;margin-left:10%;height: 25px;line-height: 25px;background-color:#323232;border:none;outline:none;color: white;font-weight: normal;
	}
	.newProps{
		cursor: pointer;
		position: relative;clear: right;width: 60px;margin-top: 32px;height: 25px;border-radius: 10px;background-color: var(--mainColorBlue2);color: white;float: left;
	}
	.propsList{
		overflow: scroll;height: 30%;width: 80%;margin-left: 16px;border-radius:10px;margin-top: 8px;background-color: transparent;
	}
	.propsName{
		width: 40%;height: 25px;border-radius: 10px;text-align: center;line-height: 25px;color: white;outline: none;border: none;background-color: #323232;
	}
	.propsType{
		width: 20%;height: 27px;border-radius: 10px;text-align: center;font-weight: normal;color: white;cursor: pointer;background-color: #323232;margin-left: 8px;line-height: 27px;
	}
	.propsDefault{
		width: 30%;margin-left: 8px;height: 25px;border-radius: 10px;text-align: center;line-height: 25px;color: white;outline: none;border: none;background-color: #323232;
	}
	.newEmit{
		cursor: pointer;
		position: relative;width: 60px;position: absolute;top:calc(30% + 100px);height: 25px;border-radius: 10px;background-color: var(--mainColorBlue2);color: white;margin-left:85px;
	}
	.emitList{
		overflow: scroll;height : 25%;width:51vh;margin-left: 16px;border-radius:10px;position: absolute;top:calc(30% + 120px);margin-top: 8px;background-color: transparent;
	}
	.emitName{
		width: 70%;height: 25px;border-radius: 10px;text-align: center;line-height: 25px;color: white;outline: none;border: none;background-color: #323232;
	}
	.emitComplain{
		width: 20%;height: 27px;border-radius: 10px;text-align: center;font-weight: normal;color: white;cursor: pointer;background-color: #323232;margin-left: 8px;line-height: 27px;
	}
	.saveButton{
		top:85%;width: 150px;text-align:center;height: 25px;border-radius: 10px;background-color: var(--mainColorBlue2);color: white;line-height: 25px;position: absolute;left: 50%;transform: translateX(-50%);
	}
	.bottomText{
		top:calc(85% + 30px);width: 150px;text-align:center;height: 25px;border-radius: 10px;display:flex;background-color: transparent;color: white;line-height: 25px;position: absolute;left: 50%;transform: translateX(-50%);
	}
	.removeButton{
		width: 10%;height: 25px;cursor: pointer;transition: .2s;border-radius: 5px;margin-left: 8px;
	}
	.removeButton:hover{
		background-color: #323232;
	}
</style>