<template>
  <div id="projectContainer">
    <header style="user-select: none;">
      <h4 id="backToFronText">项目首页 ></h4>
      <button class="layerButton">
        页面1<span class="headerLayerChoseT"></span>
      </button>
      <h4
        style="
          color: var(--color_text1);
          float: left;
          margin-left: 1%;
          padding: 0;
          margin-top: 10px;
        "
      >
        >
      </h4>
      <button class="layerButton">
        版面1<span class="headerLayerChoseT"></span>
      </button>
      <button class="share">
        <img
          style="width: 150%; heiht: 150%; object-fit: cover"
          src="../assets/icons/setting.png"
        />
      </button>
      <button class="share">
        <img
          style="width: 150%; heiht: 150%; object-fit: cover"
          src="../assets/icons/yl.png"
        />
      </button>
      <button class="share">
        <img
          style="width: 135%; heiht: 135%; object-fit: cover"
          src="../assets/icons/send.png"
        />
      </button>
    </header>
    <main id="main">
      <!--左侧栏-->
      <div id="leftBar">
		  <!--:style="{ backgroundImage: `url(${imgs.img1})` }"-->
			<button
			  data-name="组 件"
			  data-target="components"
			  class="leftBarButton"
			  style="display: flex;margin-top: 10vh;position: relative;white-space: nowrap;line-height: 35px;"
			  @click="openLeftBar"
			>
			<div data-target="components" @click="openLeftBar" data-name="组 件"  @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg   t="1650938742784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1961" width="115%" height="115%">
				<path   d="M972.09863 1016.986301H259.506849c-19.638356 0-35.068493-15.430137-35.068493-35.068493V768.70137c-8.416438 5.610959-18.235616 9.819178-28.054794 12.624657h-1.40274c-12.624658 4.208219-26.652055 5.610959-39.276712 5.610959-77.150685 0-138.871233-63.123288-138.871233-138.871233 0-77.150685 63.123288-138.871233 138.871233-138.871232 14.027397 0 28.054795 2.805479 42.082191 7.013698 1.40274 0 2.805479 1.40274 4.20822 1.40274 7.013699 2.805479 14.027397 5.610959 19.638356 8.416438l2.805479 1.40274V269.326027c0-19.638356 15.430137-35.068493 35.068493-35.068493h228.646576l-4.20822-8.416438c-7.013699-11.221918-12.624658-22.443836-15.430137-35.068493v-1.40274c-4.208219-12.624658-5.610959-26.652055-5.610958-39.276712C462.90411 72.942466 526.027397 11.221918 601.775342 11.221918c77.150685 0 138.871233 63.123288 138.871233 138.871233 0 14.027397-2.805479 28.054795-7.013698 42.082191 0 1.40274-1.40274 2.805479-1.40274 4.20822-2.805479 7.013699-5.610959 14.027397-8.416438 19.638356l-7.013699 16.832877h255.29863c19.638356 0 35.068493 15.430137 35.068493 35.068493v314.213698c0 11.221918-5.610959 22.443836-15.430137 29.457535-9.819178 7.013699-22.443836 7.013699-33.665753 2.805479L897.753425 587.747945c-1.40274 0-1.40274-1.40274-2.80548-1.40274-2.805479-1.40274-7.013699-4.208219-11.221918-5.610958h-1.402739c-7.013699-2.805479-14.027397-2.805479-21.041096-2.80548-37.873973 0-68.734247 30.860274-68.734247 68.734247s30.860274 68.734247 68.734247 68.734246c7.013699 0 14.027397-1.40274 19.638356-2.805479 7.013699-1.40274 12.624658-5.610959 18.235616-8.416439 1.40274-1.40274 2.805479-1.40274 4.20822-2.805479l53.304109-25.249315c11.221918-5.610959 23.846575-4.208219 33.665754 1.40274s16.832877 18.235616 16.832876 29.457534V981.917808c0 19.638356-15.430137 35.068493-35.068493 35.068493z m-677.523288-70.136986h642.454795v-182.356164h-1.40274c-11.221918 7.013699-22.443836 12.624658-35.068493 16.832876h-1.40274c-12.624658 4.208219-26.652055 5.610959-39.276712 5.610959-77.150685 0-138.871233-63.123288-138.871233-138.871233 0-77.150685 63.123288-138.871233 138.871233-138.871232 14.027397 0 28.054795 2.805479 42.082192 7.013698 1.40274 0 2.805479 1.40274 4.208219 1.40274 7.013699 2.805479 14.027397 5.610959 19.638356 8.416438l9.819178 4.208219v-224.438356H662.093151c-11.221918 0-22.443836-5.610959-29.457535-15.430137-7.013699-9.819178-7.013699-22.443836-2.805479-33.665753l29.457534-67.331507c0-1.40274 1.40274-1.40274 1.40274-2.805479 1.40274-2.805479 4.208219-7.013699 5.610959-11.221918v-1.40274c2.805479-7.013699 2.805479-14.027397 2.805479-21.041096 0-37.873973-30.860274-68.734247-68.734246-68.734246s-68.734247 30.860274-68.734247 68.734246c0 7.013699 1.40274 14.027397 2.80548 19.638356 1.40274 7.013699 5.610959 12.624658 8.416438 18.235617 1.40274 1.40274 1.40274 2.805479 2.805479 4.208219l28.054795 60.317808c5.610959 11.221918 4.208219 23.846575-1.40274 33.665754s-18.235616 16.832877-29.457534 16.832876H294.575342v274.936987c0 11.221918-5.610959 22.443836-15.430137 29.457534-9.819178 7.013699-22.443836 7.013699-33.665753 2.805479L192.175342 589.150685c-1.40274 0-1.40274-1.40274-2.805479-1.40274-2.805479-1.40274-7.013699-4.208219-11.221918-5.610959h-1.40274c-7.013699-2.805479-14.027397-2.805479-21.041095-2.805479-37.873973 0-68.734247 30.860274-68.734247 68.734246s30.860274 68.734247 68.734247 68.734247c7.013699 0 14.027397-1.40274 19.638356-2.805479 7.013699-1.40274 12.624658-5.610959 18.235616-8.416439 1.40274-1.40274 2.805479-1.40274 4.208219-2.805479l46.290411-22.443836c11.221918-5.610959 23.846575-4.208219 33.665754 1.40274 9.819178 7.013699 16.832877 18.235616 16.832876 29.457534v235.660274z" p-id="1962" fill="#8a8a8a"></path></svg>
			</button>
			<!--:style="{ backgroundImage: `url(${imgs.img2})` }"-->
			<button
			  data-name="素 材"
			  class="leftBarButton"
			>
			<div data-name="素 材"  data-target="hub" @click="openLeftBar" @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg   t="1650938884153" class="icon" viewBox="0 0 1289 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6410" width="115%" height="115%">
				<path   d="M186.936889 82.185481A92.122074 92.122074 0 0 0 94.814815 174.26963v650.164148a92.122074 92.122074 0 1 0 184.206222 0v-325.063111a167.973926 167.973926 0 0 1 167.973926-167.973926H929.185185v-27.079111a92.122074 92.122074 0 0 0-92.122074-92.122074h-275.721481l-130.085926-130.010075H186.974815z m260.058074 325.063112a92.122074 92.122074 0 0 0-92.122074 92.122074v325.063111c0 34.019556-10.088296 65.649778-27.496296 92.122074H1097.197037a92.122074 92.122074 0 0 0 92.084148-92.122074v-325.063111a92.122074 92.122074 0 0 0-92.084148-92.122074H446.994963zM186.936889 992.407704A167.973926 167.973926 0 0 1 18.962963 824.433778V174.26963A167.973926 167.973926 0 0 1 186.936889 6.33363h275.721481l130.085926 130.010074h244.318815A167.973926 167.973926 0 0 1 1005.037037 304.31763v27.079111h92.122074a167.973926 167.973926 0 0 1 167.936 167.973926v325.063111a167.973926 167.973926 0 0 1-167.936 167.973926h-910.222222z" fill="#8a8a8a" p-id="6411"></path></svg>
			</button>
			<!--:style="{ backgroundImage: `url(${imgs.img3})` }"-->
			<button
			  data-target="support"
			  data-name="支持库"
			  class="leftBarButton"
			  @click="openLeftBar"
			>
			<div data-target="support" @click="openLeftBar" data-name="支持库" @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg t="1650938999480" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7327" width="115%" height="115%">
				<path d="M768 128a128 128 0 0 1 128 128v512a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h512z m0 64H256a64 64 0 0 0-63.84 59.2L192 256v512a64 64 0 0 0 59.2 63.84L256 832h512a64 64 0 0 0 63.84-59.2L832 768V256a64 64 0 0 0-59.2-63.84L768 192z m-205.92 136.064a32 32 0 0 1 21.344 36.8l-0.96 3.616-94.88 288a32 32 0 0 1-61.76-16.416l0.96-3.616 94.88-288a32 32 0 0 1 40.416-20.384z m-183.68 35.36a32 32 0 0 1 8.608 41.44l-2.24 3.36-77.28 103.04 77.312 103.04a32 32 0 0 1-3.36 42.24l-3.04 2.56a32 32 0 0 1-42.208-3.296l-2.592-3.072-91.712-122.24a32 32 0 0 1-2.304-34.88l2.304-3.52 91.712-122.24a32 32 0 0 1 44.8-6.4z m267.2 0a32 32 0 0 1 42.208 3.36l2.624 3.04 91.68 122.24 2.304 3.52a32 32 0 0 1 0 31.36l-2.304 3.52-91.68 122.24-2.624 3.104a32 32 0 0 1-38.816 5.536l-3.36-2.24-3.072-2.56a32 32 0 0 1-5.568-38.848l2.24-3.36 77.28-103.072-77.28-103.04-2.24-3.36a32 32 0 0 1 8.64-41.44z" p-id="7328" fill="#8a8a8a"></path></svg>
			</button>
			<!--:style="{ backgroundImage: `url(${imgs.img4})` }"-->
			<button
			  data-name="暂 存"
			  class="leftBarButton"
			>
			<div data-name="暂 存"  @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg   t="1650939055683" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7732" width="115%" height="115%">
				<path   d="M695.15 479.59c-132.66 0-240.2 107.54-240.2 240.2S562.49 960 695.15 960A238.47 238.47 0 0 0 868 888a234.15 234.15 0 0 0 67.11-169.64c-0.16-132-107.31-238.92-239.33-238.76zM698 899.22A178.28 178.28 0 0 1 695.15 543a181.44 181.44 0 0 1 182.6 176.55 177.7 177.7 0 0 1-175.66 179.67q-2.03 0.02-4.09 0z" p-id="7733" fill="#8a8a8a"></path><path d="M753 605.45l-69.41 66.82a28.8 28.8 0 0 0-19.3 28.8v135.65a28.8 28.8 0 0 0 30.82 30.82 31.68 31.68 0 0 0 31.1-30.82v-120.1l67.11-67.39a28.8 28.8 0 0 0 0-43.49 27.07 27.07 0 0 0-40.32-0.29z" p-id="7734" fill="#8a8a8a"></path><path d="M483.18 883.09H218.79A135.36 135.36 0 0 1 84 748V198.79A135.08 135.08 0 0 1 218.79 64h538.28a135.08 135.08 0 0 1 134.79 134.79v339l-22.75-22.46a254.6 254.6 0 0 0-39.75-32.54l-5.76-4V198.5a66.53 66.53 0 0 0-51-64.23V311.4a92.45 92.45 0 0 1-92.45 92.45H298.57a92.45 92.45 0 0 1-92.45-92.45V133.7a66.82 66.82 0 0 0-53.57 65.09V748a66.53 66.53 0 0 0 66.53 66.53h220.61l3.46 7.49a294.34 294.34 0 0 0 24.48 39.75zM274.66 132.55V311.4a23.9 23.9 0 0 0 23.9 23.9h381a24.48 24.48 0 0 0 24.19-23.9V132.55z" p-id="7735" fill="#8a8a8a"></path><path d="M593.2 306.21a40.32 40.32 0 0 1-40.32-40.32v-60.77a40.32 40.32 0 1 1 80.64 0v60.48a40.32 40.32 0 0 1-40 40.61z" p-id="7736" fill="#8a8a8a"></path></svg>
			</button>
			<!--:style="{ backgroundImage: `url(${imgs.img5})` }"-->
			<button
			  data-name="剪贴板"
			  class="leftBarButton"
			>
			<div data-name="剪贴板"  @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg  t="1650939118706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8578" width="115%" height="115%">
				<path  d="M885.333333 981.333333H181.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V224a53.393333 53.393333 0 0 1 53.333333-53.333333h53.333334a21.333333 21.333333 0 0 1 0 42.666666h-53.333334a10.666667 10.666667 0 0 0-10.666666 10.666667v704a10.666667 10.666667 0 0 0 10.666666 10.666667h704a10.666667 10.666667 0 0 0 10.666667-10.666667V224a10.666667 10.666667 0 0 0-10.666667-10.666667h-53.333333a21.333333 21.333333 0 0 1 0-42.666666h53.333333a53.393333 53.393333 0 0 1 53.333334 53.333333v704a53.393333 53.393333 0 0 1-53.333334 53.333333z m-224-213.333333H320a21.333333 21.333333 0 0 1 0-42.666667h341.333333a21.333333 21.333333 0 0 1 0 42.666667z m85.333334-170.666667h-42.666667a21.333333 21.333333 0 0 1 0-42.666666h42.666667a21.333333 21.333333 0 0 1 0 42.666666z m-170.666667 0H320a21.333333 21.333333 0 0 1 0-42.666666h256a21.333333 21.333333 0 0 1 0 42.666666z m170.666667-170.666666H320a21.333333 21.333333 0 0 1 0-42.666667h426.666667a21.333333 21.333333 0 0 1 0 42.666667z m0-170.666667H320a21.333333 21.333333 0 0 1-21.333333-21.333333c0-26.046667 13.273333-50.786667 38.38-71.546667 19.54-16.153333 46.053333-29.666667 77.186666-39.38a129.22 129.22 0 0 1 41.453334-54.84 128 128 0 0 1 155.293333 0 129.22 129.22 0 0 1 41.453333 54.84c31.133333 9.713333 57.653333 23.226667 77.186667 39.38C754.726667 183.88 768 208.62 768 234.666667a21.333333 21.333333 0 0 1-21.333333 21.333333z m-398.38-42.666667h370.093333c-4.493333-6.926667-10.493333-12.82-15.953333-17.333333-17.166667-14.193333-42.14-26.066667-72.226667-34.32a21.333333 21.333333 0 0 1-14.853333-14.666667C604.893333 110.666667 571.166667 85.333333 533.333333 85.333333s-71.56 25.333333-82 61.673334a21.333333 21.333333 0 0 1-14.853333 14.666666c-30.1 8.26-55.073333 20.133333-72.24 34.326667-5.46 4.513333-11.46 10.406667-15.953333 17.333333z" fill="#8a8a8a" p-id="8579"></path></svg>
			</button>
			<!--:style="{ backgroundImage: `url(${imgs.img6})` }"-->
			<button
			  data-name="待 办"
			  class="leftBarButton"
			  @mouseover="hideActionTitle"
			  @mouseout="hideActionTitle"
			>
			<div data-name="待 办"  @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg  t="1650939154880" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9491" width="115%" height="115%">
				<path  d="M758.4 428.8c0-14.4-14.4-27.2-27.2-27.2H238.4c-14.4 0-27.2 14.4-27.2 27.2s14.4 27.2 27.2 27.2h491.2c14.4 1.6 28.8-12.8 28.8-27.2zM400 566.4h-155.2c-16 0-30.4 11.2-30.4 27.2 0 14.4 14.4 27.2 30.4 27.2H400c16 0 30.4-14.4 30.4-27.2 0-16-14.4-27.2-30.4-27.2z m0 166.4h-155.2c-16 0-30.4 11.2-30.4 27.2 0 14.4 14.4 27.2 30.4 27.2H400c16 0 30.4-14.4 30.4-27.2 0-16-14.4-27.2-30.4-27.2z m329.6-496H238.4c-14.4 0-27.2 14.4-27.2 27.2 0 14.4 14.4 27.2 27.2 27.2h491.2c14.4 0 27.2-14.4 27.2-27.2 1.6-14.4-12.8-27.2-27.2-27.2zM484.8 953.6H102.4V70.4h764.8v412.8c0 16 11.2 27.2 27.2 27.2s27.2-11.2 27.2-27.2V43.2c0-14.4-14.4-27.2-27.2-27.2H75.2C62.4 16 48 30.4 48 43.2v937.6c0 12.8 14.4 27.2 27.2 27.2h409.6c16 0 27.2-11.2 27.2-27.2s-11.2-27.2-27.2-27.2z m273.6-387.2c-120 0-217.6 99.2-217.6 220.8S636.8 1008 758.4 1008 976 908.8 976 787.2s-97.6-220.8-217.6-220.8z m0 387.2c-89.6 0-163.2-73.6-163.2-164.8S668.8 624 758.4 624s163.2 73.6 163.2 164.8S848 953.6 758.4 953.6z m81.6-193.6h-54.4v-54.4c0-14.4-14.4-27.2-27.2-27.2-14.4 0-27.2 14.4-27.2 27.2v83.2c0 14.4 14.4 27.2 27.2 27.2h81.6c14.4 0 27.2-14.4 27.2-27.2 0-14.4-14.4-28.8-27.2-28.8z" fill="#8a8a8a" p-id="9492"></path></svg>
			</button>
			<!-- :style="{ backgroundImage: `url(${imgs.img7})` }"-->
			<button
			  data-name="回收站"
			 
			  class="leftBarButton"
			  @mouseover="hideActionTitle"
			  @mouseout="hideActionTitle"
			>
			<div data-name="回收站"  @mouseover="showActionTitle" @mouseout="hideActionTitle" style="position: absolute;z-index: 99;background-color: transparent;width: 100%;height: 100%;"></div>
			<svg   t="1650939251675" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10675" width="115%" height="115%">
				<path   d="M896 256v576a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V256H64V192h192V128a64 64 0 0 1 64-64h384a64 64 0 0 1 64 64v64h192v64h-64z m-192-128H320v64h384V128z m128 128H192v576a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V256zM576 384h64v384H576V384zM384 384h64v384H384V384z" fill="#8a8a8a" p-id="10676"></path></svg>
			</button>

        <!--功能提示-->
        <div
          id="actionTitle"
          style="
            transform-origin: left;
            transform: scale(0);
            transition: 0.05s;
            height: 27px;
            width: 76px;
            color: white;
            position: absolute;
            left: 50px;
            top: 10vh;
            z-index: 99998;
          "
        >
		
          <div
            style="
              background-color: #383838;
              clip-path: polygon(0 50%, 100% 0, 100% 100%);
              width: 9px;
              height: 9px;
              float: left;
              margin-top: 9px;
            "
          ></div>
          <button
            style="
			position: absolute;
			left: 9px;
              float: left;
              background-color: #383838;
              height: 27px;
              width: 67px;
              border-radius: 8px;
              color: white;
            "
          >
		  {{ actionTitleName }}
          </button>

        </div>
		  <!--div id="spreadLeftBar" style="position: fixed;left: 45px;height: 95vh;width:105px;background-color: rebeccapurple;top: 0;z-index: 99;">
			  
		  </div-->
      </div>

      <!--中央部分-->
      <div id="drawMain" >
        <!--绘制部分-->
        <div 
          id="projectFrameOut"
		  style="overflow: scroll;"
          @mousedown="screenDown"
          @mousemove="screenMove"
          @mouseup="screenUp"
        >
          <div  id="projectFrameInner"  style="top: 1%; left: 1%">
            <!--div id="test" draggable="true" @mousedown="nodeOnSelectChose($event,true)" style="border:1px solid black;height:300px;width:300px;background-color:red;position:absolute;left:20%;top:30%"  >
                            <div id="test2" draggable="true" @mousedown="nodeOnSelectChose($event,true)" style="border:1px solid black;height:200px;width:200px;background-color:blue;position:absolute;left:20px;top:30px"  >
                                <div id="test3" draggable="true" @mousedown="nodeOnSelectChose($event,true)" style="border:1px solid black;height:100px;width:100px;background-color:red;position:relative;margin-left:20px;margin-top:30px"  >
                                </div>
                            </div>
                       </div-->
            <div
              id="scaleDom"
              style="
                position: absolute;
                z-index: 99999;
                background-color: rgba(0, 0, 0, 0);
                border: none;
                width: 0;
                height: 0;
              "
            ></div>
			<div
			  id="selectDomDiv"
			  style="
			    background-color: red;
			    position: absolute;
			    width: 0;
			    height: 0;
			    top: 0;
			    left: 0;
			    z-index: 99999;
			  "
			></div>
          </div>

        </div>
        <!--底部栏-->
        <div id="bottomBar" style="user-select: none;">
          <button class="bottomBarButton">数据源</button>
          <button class="bottomBarButton" style="width: 100px">
            隐藏标注点
          </button>
          <button class="bottomBarButton">页面属性</button>
          <button id="bottomCenterButton"></button>
          <div class="containerDevice">
            <button
              class="deviceButton"
              @click="changeDevice"
              data-device="0"
              :style="{
                backgroundImage: `url(${
                  nowDevice == 0 ? imgs.chosedWeb : imgs.noChoseWeb
                })`,
                backgroundColor: `${
                  nowDevice == 0 ? 'var(--mainColorBlue)' : 'white'
                }`,
              }"
            ></button>
            <button
              class="deviceButton"
              @click="changeDevice"
              data-device="1"
              :style="{
                backgroundImage: `url(${
                  nowDevice == 1 ? imgs.chosedPhone : imgs.noChosePhone
                })`,
                backgroundColor: `${
                  nowDevice == 1 ? 'var(--mainColorBlue)' : 'white'
                }`,
              }"
            ></button>
            <button
              class="deviceButton"
              @click="changeDevice"
              data-device="2"
              :style="{
                backgroundImage: `url(${
                  nowDevice == 2 ? imgs.chosedPad : imgs.noChosePad
                })`,
                backgroundColor: `${
                  nowDevice == 2 ? 'var(--mainColorBlue)' : 'white'
                }`,
              }"
            ></button>
          </div>
        </div>
      </div>
      <!--右侧栏-->
      <div id="rightBar" style="display: flex;z-index: 99;">
          <!--显示当前操作组-->
          <!--div id="selectDomOut">
              <div id="selectDomInner">
                  <input placeholder="搜索元素..." id="selectDom"/>
                  <button id="selectDomButton"></button>
              </div>
              <递进的元素结构树>
              
          </div-->
            <!--右侧操作选项列表-->
          <div class="rightOptionList">
            <!--组件列表按钮-->
            <button class="rightOptionList_item" @click="openDomScale"
            data-target="jg"
            :style="{
                backgroundImage: `url(${
                  imgs.imgJG 
                })`,
                backgroundColor: `${
                  rightBarOption == 'jg' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
            <!--子组件列表按钮-->
            <button class="rightOptionList_item" v-if="isChosedOne()" @click="openRightBar"
            data-target="jg_child"
            :style="{
                backgroundImage: `url(${
                  imgs.imgJGCHILD 
                })`
              }">
            </button>
            <!--编辑器按钮
            <button class="rightOptionList_item" @click="callQuickEdit"
            :style="{
                backgroundImage: `url(${
                  imgs.imgBJQ 
                })`,
                backgroundColor: `${
                  rightBarOption == 'bjq' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
			-->
            <!--PROPS按钮-->
            <button class="rightOptionList_item"
			@click="openRightBar"
			data-target="props"
            :style="{
                backgroundImage: `url(${
                  imgs.imgPROPS 
                })`,
                backgroundColor: `${
                  rightBarOption == 'props' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
            <!--数据集按钮-->
            <button class="rightOptionList_item"
			@click="openRightBar"
			data-target="sjj"
            :style="{
                backgroundImage: `url(${
                  imgs.imgSJJ
                })`,
                backgroundColor: `${
                  rightBarOption == 'sjj' ? 'var(--mainColorGray3)' : 'transparent'
                }`
              }">
            </button>
			<!--事件按钮-->
			<button class="rightOptionList_item"
			@click="openRightBar"
			data-target="event"
			:style="{
			    backgroundImage: `url(${
			      imgs.imgEvent
			    })`,
			    backgroundColor: `${
			      rightBarOption == 'event' ? 'var(--mainColorGray3)' : 'transparent'
			    }`
			  }">
			</button>
          </div>
		  <quickEditDom
		  id="quickEditDom"
		  style="
		  position: absolute;
		  width: 210px;    
		  height: 98%;
		  margin-top: 0%;
		  right:0px;
		  z-index:3;
		  transform-origin: right;
		  transition: .2s;
		  /*box-shadow: -2px 2px 15px rgba(0, 0, 0, 0.25);*/
		  background-color: transparent;
		  border-radius:0 10px 10px 0;
		  "
		  :choseGroup="choseGroup"
		  ref="drawUIQucikEdit"
		  @reDrawOutside="prepareForChoseSide"
		  ></quickEditDom>
      </div>
        <components
      id="components"
      style="
        transform-origin: left;
        transition: 0.05s;
        position: absolute;
        height: 440px;
        width: 310px;
        left: 85px;
        top: 10vh;
        z-index: 3;
      "
      ref="components"
    ></components>
      <support
      id="support"
      style="
        transform-origin: left;
        transition: 0.05s;
        position: absolute;
        left: 55px;
        top: 23vh;
        z-index: 3;
      "
      v-for="i in components.support"
      :key="i"
    ></support>


	<hub ref="hub" v-if="components.hub == 1"  style="position: absolute;top:13vh;left: 50%;transform: translateX(-50%);transform-origin: center;" class="hubClass">
		
	</hub>
	
    <!--加载组件-->
    <div v-if="$_isShowComponent" style="display:none">
        <component v-for="(item,index) in mountedComponent" :key="index"  :is="item.name" style="position:absolute;top:0;left:0;z-index:99" :mountTarget="item.target" :newId="item.newId" :props="item.props"></component>
    </div>
	<!--加载组件-->
	
	<!--缩略图列表-->
	<div id="domTreePlay" style="transform: translateX(125%);overflow-y: hidden;">
		<!--返回上一层-->
		<div id="domTree_back" @click="treeBack" @contextmenu="showLayers" style="color:var(--mainColorBlue) ;margin-top: 5px;position: absolute;top: 0;left: 20%;width: 60%;height: 30px;background-color: transparent;line-height: 30px;text-align: center;font-weight: 400;cursor: pointer;">
			上一层
		</div>
		<input id="tempLayers" style="position: absolute;width: 2px;height: 2px;top:-10px;left:0;z-index: 99;padding: 0;" @blur="closeLayers"/>
		<div id="domTree_back_layers" style="display: none;background-color: rgba(255,255,255,0.95);left:15%;border-radius: 10px;position: absolute;top:35px;width:80%;height:300px;overflow-y: scroll;z-index: 105;box-shadow: 0 2px 10px var(--mainColorGray2);">
			<div class="treeLayersItem" v-for="(item,index) in dom.layers" :key="index" @mousedown="treeBack($event,index)">
				{{item.id}}
			</div>
		</div>
		<!--缩略图与组件树切换-->
		<div id="scale2tree"  >
			
			<div id="showST" @click="scale2tree" style="transition: .2s;padding: 0;margin: 0;width: 30px;hieght:30px;position: absolute;top: 0;left: 0;">
				<svg t="1653580088743" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top: 8px;" p-id="1923" width="15" height="15"><path d="M66.488889 211.781818h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485 0-27.397172-22.768485-49.648485-50.980202-49.648485H66.488889C38.341818 112.484848 15.508687 134.723232 15.508687 162.133333s22.833131 49.648485 50.980202 49.648485z m891.009293 248.242424H66.488889C38.277172 460.024242 15.508687 482.262626 15.508687 509.672727s22.768485 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.410101-22.923636-49.648485-50.993131-49.648485z m0 351.63798H66.488889c-28.134141 0-50.980202 22.238384-50.980202 49.648485s22.833131 49.648485 50.980202 49.648485h891.022222c28.198788 0 50.980202-22.238384 50.980202-49.648485-0.012929-27.397172-22.781414-49.648485-50.993131-49.648485z m0 0" p-id="1924" fill="#8a8a8a"></path></svg>
			</div>
			<div id="setST" style="transition: .2s;display: flex;flex-direction: column;width: 100%;height: 60px;transform: scale(0);transform-origin: center;">
				<button class="STitem" data-target="0" @mousedown="setSTAction($event)">缩略图</button>
				<button class="STitem" data-target="1" @mousedown="setSTAction($event)" style="border-top: 2px solid var(--mainColoGray2);margin-top: 2px;">结构树</button>
			</div>
		</div>
		<!--缩略图与组件树切换-->
		<input id="tempST" style="position: absolute;width: 2px;height: 2px;top:-10px;left:0;z-index: 99;padding: 0;" @blur="closeST"/>
	    <!--选中组时显示-->
	    <div class="domTreePlayItem" v-if="isShowDomtreeGroup()">
	        <button
	          :style="{ backgroundImage: `url(${imgs.imgZH})`}"
	          class="domTreePlayIcon"
	          ></button>
	          <button id="domTreePlayGroup">当前组</button>
	    </div>
		<div id="scaleDomList" style="width: 100%;height: calc(100% - 30px);position: absolute;top: 30px;">
				  <!--缩略图列表-->
			<div class="treeItem"  v-for="(domId,index) in getDomTrees()" :key="getDomTreesKey+index">
				<div style="height:100%;width:180px;position:absolute;top:0;left:0;z-index:2" :data-domid="domId" @click="treeNodeOnChosed"></div>
					<div class="treeItem_DomScale" style="z-index:1" > 
						<div style="background-color:transparent;width:174px;height:55px;" v-html="getScaleDom(domId)"></div>
					</div>
					<!--button class="callEdit" :data-domid="domId"  @click="callQuickEdit" style="position:absolute;top:7px;height:45px;left:2px;background-color:var(--mainColorBlue);width:20px;border-radius:10px"></button-->
					<h4 style="margin:0;" class="treeDomText">{{domId}}</h4>
				</div>
			<div style="position: absolute;right:-10px;width:10px;top: 0px;height: 40px;background-color: var(--mainColorGreen);border-radius: 5px;"></div>
		</div>
		<!--组件树列表-->
		<div id="treeDomList" style="width: 100%;height: calc(100% - 30px);position: absolute;top: 30px;transform:scale(0);z-index: 99;">
			<div class="treeItem_tree" :id="'v_'+domId" v-for="(domId,index) in getDomTrees()" :key="getDomTreesKey+'_'+index">
				<div style="height:100%;width:100%;position:absolute;top:0px;left:0;z-index:2" :data-domid="domId" @click="treeNodeOnChosed"></div>
					<div class="treeItem_DomTree" style="z-index:1" > 
						{{domId}}
					</div>
					<!--button class="callEdit" :data-domid="domId"  @click="callQuickEdit" style="position:absolute;top:7px;height:45px;left:2px;background-color:var(--mainColorBlue);width:20px;border-radius:10px"></button-->
				</div>
		</div>
	</div>
    </main>
	<eventEdit></eventEdit>
	<div v-for="(item,index) in toastList">
		<drawUiToast :text="item.text" :duration="item.duration" @close="closeToast(index)"></drawUiToast>
	</div>
	
	<!--控制器-->
	<provideControl ref="provideControl"></provideControl>
  </div>
</template>

<script>
import { structStore } from "../store/struct.js";
import { storeToRefs } from "pinia";
import CREATE from "../engines/create.js";
import components from "../components/components.vue";
import support from "../components/support.vue";
import hub from "../components/hub.vue";
import quickEditDom from "../components/quickEditDom.vue";
import eventEdit from "../components/eventEdit.vue";
import DomTreeEngine from "../engines/domtree.js";
import StyleEngine from "../engines/style.js";
import {markRaw} from "vue"
import domtree from '../engines/domtree.js';
import drawUiToast from "../components/microTools/showToast.vue"
/*引入组件提供控制器*/
import provideControl from "../components/controller/provide/provideControl.vue"
import nodeFactory from "../engines/nodeFactory.js"
export default {
  name: "Project",
  data() {
    return {
      getDomTree:["dom1","dom3"],
      store: null, //项目数据
      device: "DEVICE_WEB", //当前设备类型
      keyBord: {
        Shift: false,
        Control: false,
      },
      userProject: null,
      screenPercent:0.785,
      imgs: {
        img1: require("../assets/icons/zj.png"),
        img2: require("../assets/icons/sc.png"),
        img3: require("../assets/icons/zck.png"),
        img4: require("../assets/icons/zanc.png"),
        img5: require("../assets/icons/jtb.png"),
        img6: require("../assets/icons/db.png"),
        img7: require("../assets/icons/hsz.png"),
        noChoseWeb: require("../assets/icons/webNC.png"),
        chosedWeb: require("../assets/icons/webC.png"),
        noChosePhone: require("../assets/icons/iphoneNC.png"),
        chosedPhone: require("../assets/icons/iphoneC.png"),
        noChosePad: require("../assets/icons/padNC.png"),
        chosedPad: require("../assets/icons/padC.png"),
        imgZH: require("../assets/icons/zh.png"),
        imgJG: require("../assets/icons/jg.png"),
        imgJGCHILD: require("../assets/icons/jg_child.png"),
        imgBJQ: require("../assets/icons/bjq.png"),
        imgPROPS: require("../assets/icons/props.png"),
        imgSJJ: require("../assets/icons/sjj.png"),
		imgEvent: require("../assets/icons/event.png"),
      },
      nowDevice: 0,
      screen: {
		displayWidth:1536,//屏幕宽度
		boxWidth:1536,//浏览器宽度
        top: 0, //绘制区顶部，用于计算元素添加的实际位置
        left: 0, //绘制区左边，用于计算元素添加的实际位置
      },
      DOMSTRUCT: {},
      STYLESTRUCT: {},
      ATTRIBUTESTURCU: {},
      DATASETSTURCT: {},
      mouseAction: {
        //鼠标控制
        isDown: false,
        isMove: false, //选框
        area: {
          left: 0,
          top: 0,
          width: 0,
          height: 0,
        },
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        isTrans: false, //用于更改元素大小的边框按钮被拖动时处理
        transDirect: null, //被拖动的方向
        transPre: { x: 0, y: 0, width: 0, height: 0 }, //被选中部分的初始数据
        isMoveGroup: false, //被框选部分移动
        moveGroup: {
          startX: 0,
          startY: 0,
          dertaX: 0,
          dertaY: 0,
          distoLeft: 0,
          distoTop: 0,
        }, //最后两个是按下ctrl时计算按下点距离左边和上边的距离
      },
      choseGroup: {
        //被选中组件
      },
      actionTitleName: "组 件",//左侧菜单栏提示文字
      dom: {//记录节点操作
        opering: false,
		opeTarget:null,
		layers:[]//用于记录打开的层级
      },
      components: {
        components: 1,
        support: 0,
		hub:0,
      },
      rightBarOption:"",//标记右侧按钮,用作右侧按钮被选中处理,默认为结构按钮
      nowViewDom:"projectFrameInner",//当前编辑的元素id，单个元素，用于调出右侧操作面板
      openView: [], //记录已打开组件对象池，主屏触发关闭所有回传事件
      mountedComponent:[],//要挂载的组件，用于动态添加和加载项目文件
      $_isShowComponent:false,//挂载组件需要等待所有组件加载完成后再加载
      tree:{
        source:null,//源结构树
        show:null,//实际显示结构树
        lockParent:null//标记解锁的父级元素
      },
      getDomTreesKey:"",
      unLockList:{},//已解锁的元素ID列表，用于取消选择时锁定
      unLockIndexList:[],//解锁元素层级表
	  toastList:[]
    };
  },
  provide(){
    return{
      choseGroup:this.choseGroup,
    }
  },
  components: {
    components,
    quickEditDom,
    support,
	hub,
	eventEdit,
	drawUiToast,
	provideControl
  },
  computed:{
    Tree(){
      if(this.store==null){
        this.store = structStore(); //初始化pinia对象，加载项目数据
      }
      return this.store.DOMSTRUCT.DEVICE_WEB.index
    }
  },
  watch:{
    Tree:{//监听结构树变化
      handler:function(newVal){
        this.tree.source=Object.keys(newVal)
        this.tree.show=Object.keys(newVal)
      },
      immediate:true,
      deep:true
    }
  },
  beforeMount(){
    if(this.store==null){
      this.store = structStore(); //初始化pinia对象，加载项目数据
    }
    this.tree.source=Object.keys(this.store.DOMSTRUCT.DEVICE_WEB.index)//获取最外层id列表
    this.tree.show=Object.keys(this.store.DOMSTRUCT.DEVICE_WEB.index)//显示列表也为最外层列表
  },
  mounted() {
	  //挂载系统System对象
	//System=this.store.System
	  
	System.keybord={
		shift:false
	}
	
	window.ScreenPercent=this.screenPercent
	window.mainInsertOpenView=this.insertOpenView
	let outBox=document.getElementById("projectFrameOut")
	this.screen.boxWidth=document.body.clientWidth
	let resizeTimeout=null
	let resizeFunction=()=>{
		if(resizeTimeout!=null){
		  			  clearTimeout(resizeTimeout)
		  			  resizeTimeout=null
		}
		resizeTimeout=setTimeout(()=>{
			let val=screen.width
			  if(val!=this.screen.displayWidth){
				  try{
					  this.$nextTick(()=>{
						  let percent=val/this.screen.displayWidth
						  //percent*=document.body.clientWidth/this.screen.boxWidth
						  let chaneScreenPercent=(percent).toFixed(2)*1//当窗口变化时，更改显示大小
						  document.getElementById("projectFrameInner").style.transform=`scale(${this.screenPercent*chaneScreenPercent})`
						  this.screen.displayWidth=val
						  this.screen.boxWidth=document.body.clientWidth
						  this.screenPercent*=percent
						  this.prepareForScreen()
						  window.ScreenPercent=this.screenPercent
					  })
				  }catch{}
			  }
		  					  
		  },300)
	  }
	  resizeFunction()
	  
	      window.onresize=resizeFunction
		  try{
		  		  this.tree.show=Object.keys(this.store.DOMSTRUCT.DEVICE_WEB.index)//显示列表也为最外层列表
		  		  //console.log("初始渲染列表",this.tree.show,this.store.DOMSTRUCT.DEVICE_WEB.index)
		  		  /*window.insertTreeShow=(name)=>{//插入租金时向当前显示组件列表中插入


	    this.tree.show.push(name)
		  		  }*/
		  		  window.mountComponent=this.mountComponent//注册窗口事件，挂载元素
		  		  this.prepareForScreen()
		  		  //CREATE.init(); //初始化结构树加载器
				  //设置原数据
				  const device="DEVICE_WEB"
				  System.metaData=this.store.DOMSTRUCT[device]
				  System.initTree(document.getElementById("projectFrameInner"))
		  		  document
		  		    .getElementById("projectContainer")
		  		    .addEventListener("dragstart", function (e) {
		  		      //禁止拖拽
		  		      e.preventDefault();
		  		      return false;
		  		    });
		  		  document
		  		    .getElementById("projectContainer")
		  		    .addEventListener("dragend", function (e) {
		  		      e.preventDefault();
		  		      //console.log(e);
		  		    });

		  		  window.renderUserProject = this.renderUserProject;
		  		  //this.userProject="/userProject/asdd/test"
		  		  let _this = this;
		  		  window.addEventListener("keydown", function (e) {
					
		  		    let key = e.key;
					try{
						if(["Shift","Control"].indexOf(key)>-1){
							if (!_this.keyBord[key]) {
							  _this.keyBord[key] = true;
							window[key]=true
							console.log("window",window.Control)
							//console.log(window.Shift,"shift")
							}
							if (key == "Control") {
							  if (Object.keys(_this.choseGroup).length != 0) {
							    //若按下ctrl键，且当前有元素被选中时，在选中元素最上层添加一个蒙版，便于移动
							    _this.drawChoseSide(_this.mouseAction.transPre);
							  }
							}
						}
					}catch(e){}
		  		  });
		  		  window.addEventListener("keyup", function (e) {
		  		    let key = e.key;
					
					if(["Shift","Control"].indexOf(key)>-1){
						_this.keyBord[key] = false;
						window[key]=false
						if (key == "Control") {
						  if (Object.keys(_this.choseGroup) != []) {
						    //若按下ctrl键，且当前有元素被选中时，在选中元素最上层添加一个蒙版，便于移动
						    if (_this.mouseAction.isMoveGroup) {
						      //检测是否则按下control后拖动的过程中松开ctrl但未松开鼠标
						      _this.mouseAction.isMoveGroup = false; //设定鼠标移动状态为假
						      _this.keyBord["Control"] = true; //设定鼠标按下状态，
						      let moveDomId = "drawUIMengFrame";
						      let box = document.getElementById(moveDomId);
						      StyleEngine.move(
						        _this.choseGroup,
						        (_this.mouseAction.moveX - _this.mouseAction.moveGroup.startX) /
						          _this.screenPercent,
						        (_this.mouseAction.moveY - _this.mouseAction.moveGroup.startY) /
						          _this.screenPercent
						      );
						      _this.choseGroup = {};
						      _this.keyBord["Control"] = false; //等待鼠标抬起操作完成后再置为未按下状态，
						      _this.removeChoseSide(); //清除选择框
						      document.getElementById("projectFrameOut").click();
						    } else {
						      _this.drawChoseSide(_this.mouseAction.transPre);
						    }
						    try {
						      document.getElementById("drawUIMengFrame").remove();
						    } catch (e) {}
						  }
						}
					}

		  		  });
		  		  window.nodeOnSelectChose = ()=>{}//this.nodeOnSelectChose;
		  		  this.$_isShowComponent=true
		  		  //元素插入需要先确定目标，故先调出components，以便后续调用其目标设置方法
		  		  document.getElementById("components").style.transform="scaleX(1) translateX(-200%)"
		  }catch(e){
			  console.error(e)
		  }
		System.showToast=(text,duration)=>{
			this.toastList.push({
				text:text,
				duration:duration,
				show:true
			})
	    }
	
		//复制事件
		System.copy=(type,data,option={})=>{
			//剪贴板允许15个
			if(this.store.CUTBORD.length>15){
				this.store.CUTBORD.splice(0,1)
			}
			this.store.CUTBORD.push({
				type:type,
				data:data,
				option:option
			})
		}
		//获取剪贴板最后一个
		System.getCutBord=()=>{
			return this.store.CUTBORD.at(-1)
		}
		
		//请求控制器
		System.requestProvideControl=(target,options)=>{
			try{
				this.$refs['provideControl'].startProvide(target,options)
			}catch(e){
				console.error(e)
				System.showToast("请求失败",2000)
			}
		}
		
		//清除选择框
		System.removeSelect=(onlySide=false)=>{
			if(onlySide){
				this.removeChoseSide()
			}else{
				this.cancleAllSelectedNode()
			}
		}
  },
  methods: {
	closeToast:function(index){
		this.toastList[index].show=false
		let text=0
		this.toastList.forEach(item => {
			if(item.show){
				text=1
				return
			}
		})
		if(text==0){
			this.toastList=[]
		}
	},
	prepareForScreen:function(){
		  let out = document
		    .getElementById("projectFrameOut")
		    .getBoundingClientRect();
		  let sumWidth = 1536 * this.screenPercent;
		  let sumHeight = 721 * this.screenPercent;
		  //console.log()
		  //console.log("screen",sumWidth,sumHeight,screen.width,screen.height)
		  let left = (screen.width*0.99- 305 - sumWidth.toFixed(0)) / 2;
		  let top = (screen.height- 250 - sumHeight.toFixed(0)) / 2;
		  //console.log("top",(document.getElementById("main").offsetTop+out.height)/2,top)
		  document.getElementById("projectFrameInner").style.left =
		    left.toFixed(0) + "px";
		  document.getElementById("projectFrameInner").style.top =
		    top.toFixed(0) + "px";
		  let box = document
		    .getElementById("projectFrameInner")
		    .getBoundingClientRect();
			//console.log("offset",document.getElementById("projectFrameInner").offsetTop,box.y)
		  this.screen.top = document.getElementById("projectFrameInner").offsetTop//box.y.toFixed(0)*1;//用户视口顶端定位，即projectFrameInner
		  this.screen.left =  document.getElementById("projectFrameInner").offsetLeft//box.x.toFixed(0)*1;
		  out=null
		  box=null
	  },
    mountComponent:function(componentName,targetId,newId,props){//要加载的组件名，要挂载的目标id,在mounted中定义为window事件，在domtree中加载结构树时使用
	  let componentType={"demo1":"layout"}
      componentType=componentType[componentName]//元素所属类型
      let com=require(`../components/created/${componentType}.type/${componentName}.com/index.vue`).default
      this.mountedComponent.push({
        name:markRaw(com),
        target:targetId,
        newId:newId,
        props:props//默认传的就是该组件的默认参数
      })
      components.close("components")//挂载完成关闭组件库
	  com=null
    },
    isChosedOne:function(){//检测是否仅有一个元素被选中,用于显示子元素列表按钮
      let selected=0
      for(let key in this.choseGroup){
        if(this.choseGroup[key]!=undefined){
          selected++
        }
      }
      return selected==1
    },
    getDomTrees:function(){//返回要在右侧显示的结构点
      try{
        let returnToHtml=[]
        this.tree.show.forEach(dom => {//dom是元素id
          if(DomTreeEngine.getParentId(dom)==null || DomTreeEngine.getParentId(dom)==this.tree.lockParent){
            returnToHtml.push(dom)
          }
        })
        return returnToHtml
      }catch(e){
        return []
      }
    },
    getScaleDom:function(domId,parentDom){//获取元素缩略显示html
      try{
        let dom=document.getElementById(domId)
        let targetWidth=109
        let targetHeight=60
        let width=dom.offsetWidth
        let height=dom.offsetHeight
        let bili=0
        let bili1=((targetWidth/width)).toFixed(3)*1
        let bili2=((targetHeight)/height).toFixed(3)*1
        bili=bili1<bili2?bili1:bili2
        let copyDom=dom.cloneNode()
        copyDom.innerHTML=dom.innerHTML
        copyDom.style.height=height+"px"
        copyDom.style.width=width+"px"
        copyDom.style.left=0
        copyDom.style.top=0
        copyDom.style.right=0
        copyDom.style.bottom=0
        copyDom.style.transformOrigin="center"
        copyDom.style.margin="0"
        copyDom.style.marginLeft="55px"
        copyDom.style.marginTop="30px"
        copyDom.style.transform="translate(-50%,-50%) scale("+bili+")"
        return copyDom.outerHTML
      }catch{}
    },
    isShowDomtreeGroup:function(){//显示多选组
        let group=0
        for(let key in this.choseGroup){
            if(this.choseGroup[key]!=undefined){
                group++
                if(group>1){
                  //console.log("多选",this.choseGroup)
                    this.callQuickEdit()
                    break
                }
            }
        }
        return group>1
    },
    renderUserProject: function (html,style) {//渲染用户界面
      /*document.getElementById("projectFrameInner").innerHTML = html;
      document
        .getElementById("testButton")
        .addEventListener("click", function (e) {});*/
        console.log("渲染",html,style)
    },
    changeDevice: function (e) {
      let device = e.target.dataset.device;
      this.nowDevice = device;
    },
    lockDom:function(type=1,target=""){//锁定目标,type1为锁定全部，0为锁定指定对象，target为指定锁定对象
      if(type==1){//锁定全部
        let unlicklist=[]
        for(let key in this.unLockList){
          if(this.unLockList[key]==1){
            unlicklist.push(key)
          }
        }
        this.unLockIndexList=[]//置空解锁层级列表
        DomTreeEngine.lock(unlicklist)
        this.tree.lockParent=null//解锁父级元素置空
        this.tree.show=this.tree.source//全部解锁，则回到最外层
      }else{//锁定一个
        if(target!=null){
          let index=this.unLockIndexList.indexOf(target)
          this.unLockIndexList.splice(index,this.unLockIndexList.length-index)//删除被锁定的及其后面的
          DomTreeEngine.lock(target)
          delete this.unLockList[target]//删除原解锁的组件ID
        }
      }
    },
    downAction: function (e) {
      //按下的实际操作
      this.nowViewDom="projectFrameInner"//设置操作对象为主屏
      this.openView.forEach(close => {
        close.target(close.value);
      });
      this.lockDom()//锁定全部
      this.$refs["components"].setInsertTarget("projectFrameInner")//将插入目标再设置为主屏
      this.nowViewDom="projectFrameInner"//设置操作对象为主屏
      this.openView = [];
      this.removeChoseSide(); //此处不将choseGroup置空，因为更改选择元素时会产生影响操作，将置空操作留值cancleAllSelectedNode中执行
      this.cancleAllSelectedNode(); //取消所有选中元素，注：已在元素鼠标按下事件中阻止冒泡，不允许向上传递至父组件，此处保证不与被选中的组件被点击时的事件
      let domSelect = document.getElementById("selectDomDiv");
      let DownX = e.clientX,
        DownY = e.clientY
      this.mouseAction.startX =(DownX-document.getElementById("drawMain").offsetLeft-this.screen.left)*(1/this.screenPercent)//- this.screen.left//displyPercentX //;
      this.mouseAction.startY = (DownY-document.getElementById("drawMain").offsetTop-this.screen.top)*(1/this.screenPercent)-60/this.screenPercent//DownY-60//- this.screen.top //;
      let areaRight = this.mouseAction.area.left + this.mouseAction.area.width;
      let areaBottom = this.mouseAction.area.top + this.mouseAction.area.height;
      let positionInArea =
        areaRight > this.mouseAction.startX > this.mouseAction.area.left &&
        areaBottom > this.mouseAction.startY > this.mouseAction.area.top
          ? true
          : false;
      domSelect.style.height = 0;
      domSelect.style.width = 0;
      domSelect.style.border = "none";
      this.mouseAction.area.left = this.mouseAction.startX;
      this.mouseAction.area.top = this.mouseAction.startY;
      domSelect.style.left = this.mouseAction.startX + "px";
      domSelect.style.top = this.mouseAction.startY + "px";
      if (positionInArea && this.mouseAction.area.width != 0) {
        //取消选择框
        this.choseGroup = {};
        this.mouseAction.area.width = 0;
      }
      this.mouseAction.isDown = true;
	  this.dom.layers=[]
    },
    screenDown: function (e) {
      //主屏鼠标按下事件

      //this.downAction(e);
    },
    screenUp: function (e) {
      //主屏鼠标抬起事件
      //console.log("donw", e.pageX);
      this.mouseAction.isDown = false; //将鼠标按下状态设置为假
	  this.mouseAction.isMove=false
      if (this.mouseAction.isMove) {
        //检测是否有选中的元素
        let outerNodes =
          document.getElementById("projectFrameInner").childNodes;
        let domSelect = document.getElementById("selectDomDiv");
		let frameOutLeft=document.getElementById("projectFrameInner").offsetLeft
		let frameOutTop=document.getElementById("projectFrameInner").offsetTop
        let leftSide = (this.mouseAction.area.left + 50 /this.screenPercent- frameOutLeft/this.screenPercent -(document.getElementById("drawMain").offsetLeft-this.screen.left) / this.screenPercent).toFixed(0) * 1 ,
          topSide = (this.mouseAction.area.top-frameOutTop -(document.getElementById("drawMain").offsetTop-this.screen.top) / this.screenPercent).toFixed(0) * 1;
        //console.log(outerNodes,leftSide,topSide)
		let rightSide =
            leftSide + (this.mouseAction.area.width / this.screenPercent).toFixed(0) * 1,
          bottomSide =
            topSide + (this.mouseAction.area.height / this.screenPercent).toFixed(0) * 1;
		
		let _this=this
        outerNodes.forEach((node) => {
						  
			if(node.id == undefined || node.id == "scaleDom" || node.id == "selectDomDiv"){
				
			}else{
				try {
				
				  let nodeleft = node.offsetLeft,
				    nodetop = node.offsetTop;
				  let noderight = nodeleft + node.offsetWidth,
				    nodebottom = nodetop + node.offsetHeight;
							  //console.log("框选",nodeleft,leftSide,noderight," to ",nodetop,topSide,nodebottom)
				  let isEnterChose = 0;
				  if (
				    nodebottom > topSide &&
				    noderight > leftSide &&
				    nodetop < topSide &&
				    nodeleft < leftSide
				  ) {
				    //左上
				    isEnterChose = !0;
				  } else if (
				    nodebottom > topSide &&
				    noderight < rightSide &&
				    nodetop < topSide &&
				    nodeleft > leftSide
				  ) {
				    isEnterChose = !0;
				  } else if (
				    nodebottom > topSide &&
				    nodeleft < rightSide &&
				    noderight > rightSide &&
				    nodetop < topSide
				  ) {
				    //右上
				    isEnterChose = !0;
				  } else if (
				    nodebottom < bottomSide &&
				    nodeleft < rightSide &&
				    noderight > rightSide &&
				    nodetop > bottomSide
				  ) {
				    isEnterChose = !0;
				  } else if (
				    nodetop < bottomSide &&
				    noderight > leftSide &&
				    nodeleft < leftSide &&
				    nodebottom > bottomSide
				  ) {
				    //左下
				    isEnterChose = !0;
				  } else if (
				    nodetop < bottomSide &&
				    nodeleft > leftSide &&
				    noderight < rightSide &&
				    nodebottom > bottomSide
				  ) {
				    isEnterChose = !0;
				  } else if (
				    nodetop < bottomSide &&
				    nodeleft < rightSide &&
				    noderight > rightSide &&
				    nodebottom > bottomSide
				  ) {
				    //右下
				    isEnterChose = !0;
				  } else if (
				    nodetop > topSide &&
				    nodeleft < leftSide &&
				    noderight > leftSide &&
				    nodebottom < bottomSide
				  ) {
				    isEnterChose = !0;
				  } else if (
				    nodetop > topSide &&
				    nodebottom < bottomSide &&
				    nodeleft > leftSide &&
				    noderight < rightSide
				  ) {
				    isEnterChose = !0;
				  }
				  if (isEnterChose) {
							  //console.log("框选",node.id)
				    this.nodeOnSelectChose({ target: { id: node.id } });
				  }
				} catch (e) {
							  console.log("sele err",e)
				}
			}
          
        });
        this.mouseAction.isMove = false; //将鼠标移动状态至false
        domSelect.style.height = 0;
        domSelect.style.width = 0;
        domSelect.style.border = "none";
        this.prepareForChoseSide();
        outerNodes=null
		domSelect=null
		
      } else if (this.mouseAction.isTrans) {
        //拉伸完成处理
        let scaleDom = document.getElementById("scaleDom");
        let pre = this.mouseAction.transPre;
        let preX = pre.x,
          preY = pre.y;
        let dertaX = scaleDom.offsetLeft - preX,
          dertaY = scaleDom.offsetTop - preY,
          nowWidth = scaleDom.offsetWidth,
          nowHeight = scaleDom.offsetHeight;
        let heightBili = nowHeight / pre.height,
          widthBili = nowWidth / pre.width;
        let origin = "";
        switch (this.mouseAction.transDirect) {
          case "top": //上边拉伸，则以下边为缩放中心
            origin = "bottom";
            break;
          case "left": //
            origin = "right";
            break;
          case "bottom":
            origin = "top";
            break;
          case "right":
            origin = "left";
            break;
          case "topleft":
            origin = "bottom right";
            break;
          case "topright":
            origin = "bottom left";
            break;
          case "bottomleft":
            origin = "top right";
            break;
          case "bottomright":
            origin = "top left";
            break;
        }
        this.mouseAction.isTrans = false; //鼠标弹起,将当前有元素被拉伸状态设置为假，即当前无元素被拉伸
        if (widthBili != 0 || heightBili != 0) {
          //若两者都为0，则表示仅点击，此时不做拉伸
          scaleDom.style.border = "none";
          scaleDom.style.width = "0";
          scaleDom.style.height = "0";
         // console.log("niii", this.choseGroup);
          StyleEngine.scale(
            this.choseGroup,
            widthBili,
            heightBili,
            origin,
            dertaX,
            dertaY,
            preX,
            preY
          );
          this.prepareForChoseSide(); //拉伸完成重新绘制选择框
          this.$refs.drawUIQucikEdit.loadData()//重新加载快速编辑框的数据
        }
      } else if (this.mouseAction.isMoveGroup) {
        let moveDomId = this.keyBord.Control
          ? "drawUIMengFrame"
          : "drawUiMoveButton";
        let box = document.getElementById(moveDomId);
        if (this.keyBord.Control) {
          //box.offsetLeft-this.mouseAction.transPre.startX
          //let nowLeft=(e.pageX-this.screen.left)/0.785+12
          //let nowTop=(e.pageY-this.screen.top)/0.785+12
          StyleEngine.move(
            this.choseGroup,
            (e.pageX - this.mouseAction.moveGroup.startX) / this.screenPercent,
            (e.pageY - this.mouseAction.moveGroup.startY) / this.screenPercent
          );
        } else {
          StyleEngine.move(
            this.choseGroup,
            box.offsetLeft - this.mouseAction.moveGroup.startX,
            box.offsetTop - this.mouseAction.moveGroup.startY
          );
        }
        this.prepareForChoseSide();
        /*StyleEngine.move(this.choseGroup,box.offsetLeft-this.mouseAction.moveGroup.startX,box.offsetTop-this.mouseAction.moveGroup.startY)*/
        this.prepareForChoseSide();
        this.mouseAction.isMoveGroup = false;
      }
    },
    screenMove: function (e) {
      //主屏鼠标移动事件
      let left =(e.clientX-document.getElementById("main").offsetLeft-this.screen.left)*(1/this.screenPercent) //e.clientX-55//- this.screen.left;
      let top = (e.clientY-document.getElementById("main").offsetTop-this.screen.top)*(1/this.screenPercent)//e.clientY-60// - this.screen.top ;
      let width = left -  this.mouseAction.startX- 50/this.screenPercent//this.screen.left;
      let height = top - this.mouseAction.startY//this.screen.top;
	  
      this.mouseAction.moveX = e.clientX;
      this.mouseAction.moveY = e.clientY;
      if (Math.abs(width) > 5 || Math.abs(height) > 5) {
		if (this.mouseAction.isDown) {
          //拉出框选外框
          this.mouseAction.isMove = true;
          let domSelect = document.getElementById("selectDomDiv");
          if (width < 0) {
            let resetLeft = this.mouseAction.startX + width;
            domSelect.style.left = resetLeft + "px";
            this.mouseAction.area.left = resetLeft;
            width = width * -1;
          }
          if (height < 0) {
            let resetTop = this.mouseAction.startY + height;
            this.mouseAction.area.top = resetTop ;
            domSelect.style.top = resetTop + "px";
            height = height * -1;
          }else{
			  height+= 1 / this.screenPercent
		  }
          domSelect.style.border = "2px solid black";
          this.mouseAction.area.width = width;
          this.mouseAction.area.height = height;
          domSelect.style.width = width + "px";
          domSelect.style.height = height + "px";
        } else if (this.mouseAction.isTrans) {
          //元素被拉伸
          let direct = this.mouseAction.transDirect;
          let position; //=targetdom.style.position
		  left=(e.clientX-document.getElementById("main").offsetLeft-this.screen.left-55-5*this.screenPercent)/this.screenPercent;
		  top = (e.clientY-document.getElementById("main").offsetTop-this.screen.top-5*this.screenPercent) / this.screenPercent;
			width = left - this.mouseAction.startX//this.screen.left;
			height = top - this.mouseAction.startY//this.screen.top;
          /**isTran与主屏发起的拉伸不同，主屏的承载元素是外框，isTran是缩小过的内框，必须将width，height除比例 */
          let floatFlag = false; //元素是否以left,top等属性定位
          if (position == "absolute" || position == "fixed") {
            floatFlag = true;
          }
          let deleteBorder = 6 * this.screenPercent;
          let transTop = (same = 0) => {
            //处理上边修改,same=0代表默认为仅操作一边，否则为上边与其他边同时操作
            if (same == 0) {
              left = this.mouseAction.transPre.x - deleteBorder;
              width = this.mouseAction.transPre.width;
            }
            if (height < 0) {
              height = height * -1;
              top = this.mouseAction.transPre.y - height - deleteBorder; //6是边框占用
              height = this.mouseAction.transPre.height + height;
            } else {
              top = this.mouseAction.transPre.y + height - deleteBorder; //6是边框占用
              height = this.mouseAction.transPre.height - height;
            }
          };
          let transLeft = (same = 0) => {
            if (same == 0) {
              top = this.mouseAction.transPre.y - deleteBorder;
              height = this.mouseAction.transPre.height;
            }
            if (width < 0) {
              width = width * -1;
              left = this.mouseAction.transPre.x - width - deleteBorder; //6是边框占用
              width = this.mouseAction.transPre.width + width;
            } else {
              left = this.mouseAction.transPre.x + width - deleteBorder; //6是边框占用
			  
              width = this.mouseAction.transPre.width - width;
            }
          };
          let transRight = (same = 0) => {
            if (same == 0) {
              height = this.mouseAction.transPre.height;
              top = this.mouseAction.transPre.y - deleteBorder;
            }
            left = this.mouseAction.transPre.x - deleteBorder;
            width = width+this.mouseAction.transPre.width;
          };
          let transBottom = (same = 0) => {
            if (same == 0) {
              left = this.mouseAction.transPre.x - deleteBorder;
              width = this.mouseAction.transPre.width;
            }
            top = this.mouseAction.transPre.y - deleteBorder;
            height = height + this.mouseAction.transPre.height;
          };
          if (direct == "top") {
            this.mouseAction.transDirect = "top";
            transTop();
          } else if (direct == "left") {
            this.mouseAction.transDirect = "left";
            transLeft();
          } else if (direct == "right") {
            this.mouseAction.transDirect = "right";
            transRight();
          } else if (direct == "bottom") {
            this.mouseAction.transDirect = "bottom";
            transBottom();
          } else if (direct == "topleft") {
            this.mouseAction.transDirect = "topleft";
            transTop(1);
            transLeft(1);
          } else if (direct == "topright") {
            this.mouseAction.transDirect = "topright";
            transTop(1);
            transRight(1);
          } else if (direct == "bottomleft") {
            this.mouseAction.transDirect = "bottomleft";
            transLeft(1);
            transBottom(1);
          } else if (direct == "bottomright") {
            this.mouseAction.transDirect = "bottomright";
            transRight(1);
            transBottom(1);
          }
          let scaleDom = document.getElementById("scaleDom");
          scaleDom.style.border = "3px solid #80B3FE";
          scaleDom.style.top = top + "px";
          scaleDom.style.left = left + "px";
          scaleDom.style.width = width + "px";
          scaleDom.style.height = height + "px";
        } else if (this.mouseAction.isMoveGroup) {
          //移动被选中元素
          let moveDomId = this.keyBord.Control
            ? "drawUIMengFrame"
            : "drawUiMoveButton";
          left = (e.clientX-document.getElementById("main").offsetLeft-this.screen.left)/this.screenPercent; //12是元素宽度占用，该值为当前鼠标位置
          top = (e.clientY-document.getElementById("main").offsetTop-this.screen.top) / this.screenPercent;
          let newX = left - this.mouseAction.transPre.width / 2 - 50/this.screenPercent,
            newY = top - this.mouseAction.transPre.height / 2;
          if (this.keyBord.Control) {
            newX = left - this.mouseAction.moveGroup.distoLeft - 4;
            newY = top - 4 - this.mouseAction.moveGroup.distoTop;
          }
          document.getElementById(moveDomId).style.left = left + "px";
          document.getElementById(moveDomId).style.top = top + "px";
          this.mouseAction.transPre.x = newX;
          this.mouseAction.transPre.y = newY;
          this.drawChoseSide(this.mouseAction.transPre);

          //赋值初始数据，为后续缩放比例计算
        }
      }
    },
    showActionTitle: function (e) {
		e.stopPropagation()
      //鼠标移入时显示功能名称
	  if(e.target.parentNode.id!="leftBar"){
		  let top =
		    e.target.parentNode.offsetTop + (e.target.parentNode.offsetHeight / 2).toFixed(0) * 1 - 10;
		  let content = e.target.dataset.name;
		  this.actionTitleName = content;
		  let node = document.getElementById("actionTitle");
		  node.style.transform = "scale(1)";
		  node.style.opacity = "1";
		  node.style.top = top + "px";
	  }

    },
    hideActionTitle: function (e) {
      let node = document.getElementById("actionTitle");
      node.style.opacity = "0";
      node.style.transform = "scale(0)";
    },
	//外部组件唤起其他组件时若需实现点击主屏关闭则需先通过此处插入关闭事件
	insertOpenView:function(target){
		this.openView.push(target)
	},
    openLeftBar: function (e) {
      //打开左侧栏
      let target = e.target.dataset.target;
      if (target == "components") {
        if (this.components.components == 0) {
          this.components.components = 1;
        } else {
          let box=document.getElementById("components")
          box.style.transition="0s"
          box.style.transform="scale(1) translateX(-100%)"
          box.style.transition=".05s"
          box.style.transform=""
          box.style.opacity="1"
		  //console.log("box",target)
        }
        this.openView.push({ target: components.close, value: "components" });
      }else if(target == "support"){
        if (this.components.support == 0) {
          this.components.support = 1;
        }else{
          let box=document.getElementById("support")
          box.style.transition="0s"
          box.style.transform="scale(1) translateX(-200%)"
          box.style.transition=".05s"
          box.style.transform=""
          box.style.opacity="1"
        }
        this.openView.push({ target: support.close, value: "support" });
      }else if(target=='hub'){
		  if (this.components.hub == 0) {
		    this.components.hub = 1;
		  }else{
		    let box=document.getElementById("hubOut")
		    box.style.transition="0s"
			box.style.transformOrigin="10% center"
		    box.style.transform="scale(1) translateX(-50%)"
		    box.style.transition=".05s"
		    box.style.opacity="1"
		  }
		  try{
			  document.getElementById("acceptList").style.transform="scale(0)"
			  setTimeout(()=>{
			  	this.$refs["hub"].setAcceptList()//在展开时调用hub内的setAcceptList方法，延迟500毫秒以控制文件接受列表显示
			  },500)
		  }catch{}

		  this.openView.push({ target: hub.close, value: "hub" });
	  }
    },
    openRightBar:function(e){//切换到当前元素的子节点列表
      let target = e.target.dataset.target;
      if(target=="jg_child"){//打开子组件列表
        target="jg"
		try{
			if(this.dom.opeTarget!=null)
				document.getElementById("v_"+this.dom.opeTarget).style.backgroundColor=""//进入子列表之前，取消原节点高亮显示	
		}catch{}
		if(this.dom.opeTarget!=null && this.dom.opeTarget.length>1 && this.dom.layers.indexOf(this.dom.opeTarget)==-1){
			this.dom.layers.push({id:this.dom.opeTarget,"name":""})//进入子节点之前，记录当前层级
		}
		this.tree.show=DomTreeEngine.getChildIds(this.nowViewDom)//将右侧元素显示列表置为当前元素的子元素列表
        this.unLockList[this.nowViewDom]=1//将当前解锁的元素加入unLock列表
        this.tree.lockParent=this.nowViewDom//设置解锁的父级元素为当前操作元素，等同于解锁操作
        DomTreeEngine.unLock(this.nowViewDom)//标记当前元素的所有父辈为解锁状态
        this.choseGroup={}//置空choseGroup
        this.unLockIndexList=DomTreeEngine.getParentList(this.nowViewDom)//获取当前要解锁元素的所有父级元素id，this.nowViewDon记录的都是要选中元素的父级元素
		
	  }
      this.rightBarOption=target
    },
	openDomScale:function(e){//弹出元素树
			let box=document.getElementById("domTreePlay")
			let preTransform=box.style.transform
			box.style.transform=preTransform.replace("translateX(125%)","translateX(0%)")
			let close=(id)=>{//关闭事件
			preTransform=box.style.transform
			if(preTransform.indexOf("translateX")>-1){
				preTransform=preTransform.replace("translateX(0%)","translateX(125%)")	
			}else{
				preTransform="translateX(125%) "+preTransform
			}
			
			box.style.transform=preTransform
				this.rightBarOption=""
			}
			this.openView.push({target:close,value:""})//插入关闭事件
			this.rightBarOption="jg"//将结构按钮设置为选中状态
	},
    prepareForChoseSide: function () {//若传入的表示指定绘制对象
      //为绘制选择边框准备数据
      try {
        let leftDom, rightDom, topDom, bottomDom; //被选中范围内的最左右上下元素，用于计算边框
        let boundDom = {};
        let domIds

        for (let key in this.choseGroup) {
          if (this.choseGroup[key] != undefined) {
            boundDom[key] = this.choseGroup[key];
            }
        }
        domIds = Object.keys(boundDom);
        if(domIds.length==0){
          if(this.unLockIndexList.length!=0){
            domIds=[this.unLockIndexList[0]]
          }
        }
        if (domIds.length > 0) {
          domIds.sort(function (domA, domB) {
            return (
              DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[0] -
              DomTreeEngine.getOffsetTopLeft(document.getElementById(domB))[0]
            );
          });
          leftDom = domIds[0];
          domIds.sort(function (domA, domB) {
            return (
              DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[0] +
              document.getElementById(domA).offsetWidth -
              (DomTreeEngine.getOffsetTopLeft(
                document.getElementById(domB)
              )[0] +
                document.getElementById(domB).offsetWidth)
            );
          });
          rightDom = domIds[domIds.length - 1];
          domIds.sort(function (domA, domB) {
            return (
              DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[1] -
              DomTreeEngine.getOffsetTopLeft(document.getElementById(domB))[1]
            );
          });
          topDom = domIds[0];
          domIds.sort(function (domA, domB) {
            return (
              DomTreeEngine.getOffsetTopLeft(document.getElementById(domA))[1] +
              document.getElementById(domA).offsetHeight -
              (DomTreeEngine.getOffsetTopLeft(
                document.getElementById(domB)
              )[1] +
                document.getElementById(domB).offsetHeight)
            );
          });
          bottomDom = domIds[domIds.length - 1];
          let outSideLeft,
            outSideTop,
            outSideWidth,
            outSideHeight,
            outSideRight,
            outSideBottom;
          outSideLeft = DomTreeEngine.getOffsetTopLeft(
            document.getElementById(leftDom)
          )[0];
          outSideTop = DomTreeEngine.getOffsetTopLeft(
            document.getElementById(topDom)
          )[1];
          outSideRight = DomTreeEngine.getOffsetTopLeft(
            document.getElementById(rightDom)
          )[0];
          outSideBottom = DomTreeEngine.getOffsetTopLeft(
            document.getElementById(bottomDom)
          )[1];
          outSideWidth =
            outSideRight -
            outSideLeft +
            document.getElementById(rightDom).offsetWidth;
          outSideHeight =
            outSideBottom -
            outSideTop +
            document.getElementById(bottomDom).offsetHeight;
			//console.log("获取offsetRight",outSideRight,outSideLeft,document.getElementById(rightDom).offsetWidth,document.getElementById(rightDom))
          let choseData = {
            x: outSideLeft,
            y: outSideTop,
            width: outSideWidth,
            height: outSideHeight,
            startX: outSideLeft,
            startY: outSideTop,
          };
          

          this.drawChoseSide(choseData);
          this.mouseAction.transPre = choseData; //赋值初始数据，为后续缩放比例计算
        } else {
          this.removeChoseSide();
        }

        //console.log("最左",outSideLeft,leftDom,"最右",rightDom,"最上",document.getElementById(topDom),"最下",bottomDom)
      } catch (e) {}
    },
    drawChoseSide: function (outside) {
      //绘制被选中部分的边框
      this.removeChoseSide(); //绘制前先清除
      let body = document.getElementById("projectFrameInner");
      let topLeftButton = document.createElement("div");
      let topRightButton = document.createElement("div");
      let bottomRightButton = document.createElement("div");
      let bottomLeftButton = document.createElement("div");
      /*let topSideButton=document.createElement("div")
                let rightSideButton=document.createElement("div")
                let bottomSideButton=document.createElement("div")
                let leftSideButton=document.createElement("div")*/
      let moveButton = document.createElement("div");
      let side = [];
      let _this = this;
      for (let i = 0; i < 4; i++) {
        let bar = document.createElement("div");
        let height = 0,
          width = 0;
        let top = outside.y,
          left = outside.x;
        if (i == 0 || i == 2) {
          height = 4 * this.screenPercent;
          bar.id = "topSideBound";
          bar.setAttribute("data-direct", "top");
          bar.style.cursor = "n-resize";
          if (i == 2) {
            bar.id = "bottomSideBound";
            top += outside.height - height;
            bar.setAttribute("data-direct", "bottom");
          }
          width = outside.width;
        } else {
          bar.id = "leftSideBound";
          bar.style.cursor = "w-resize";
          bar.setAttribute("data-direct", "left");
          height = outside.height;
          width = 4 * this.screenPercent;
          if (i == 1) {
            bar.id = "rightSideBound";
            bar.setAttribute("data-direct", "right");
            left += outside.width - width;
          }
        }
        bar.style.height = height + "px";
        bar.style.width = width + "px";
        bar.style.position = "absolute";
        bar.style.top = top + "px";
        bar.style.left = left + "px";
        bar.style.zIndex = "99998";
        bar.style.opacity = "0.7";
        bar.style.backgroundColor = "#80B3FE";
        bar.className = "sideTrans";
        body.appendChild(bar);
		bar=null
      }

      moveButton.className = "sideTrans";
      topLeftButton.className = "sideTrans";
      topRightButton.className = "sideTrans";
      bottomRightButton.className = "sideTrans";
      bottomLeftButton.className = "sideTrans";

      topLeftButton.setAttribute("data-direct", "topleft");
      topRightButton.setAttribute("data-direct", "topright");
      bottomRightButton.setAttribute("data-direct", "bottomright");
      bottomLeftButton.setAttribute("data-direct", "bottomleft");

      moveButton.style =
        "position:absolute;z-index:99999;cursor:move;transform:translate(-50%,-50%);height:20px;width:20px;background: #FFFFFF;border: 1px solid #FF7676;box-sizing: border-box;box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);border-radius: 10px;";
      moveButton.style.left = outside.x + outside.width / 2 + "px";
      moveButton.style.top = outside.y + outside.height / 2 + "px";
      moveButton.id = "drawUiMoveButton";

      topLeftButton.style =
        "cursor:nw-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;";
      topLeftButton.style.left = outside.x - 12 - 3 * this.screenPercent + "px";
      topLeftButton.style.top = outside.y - 12 - 3 * this.screenPercent + "px";

      topRightButton.style =
        "cursor:ne-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;";
      topRightButton.style.top = outside.y - 12 - 3 * this.screenPercent + "px";
      topRightButton.style.left = outside.x + outside.width + 3 * this.screenPercent + "px";

      bottomRightButton.style =
        "cursor:nw-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;";
      bottomRightButton.style.top = outside.y + outside.height + 0 + "px";
      bottomRightButton.style.left = outside.x + outside.width + "px";

      bottomLeftButton.style =
        "cursor:ne-resize;width:10px;height:10px;outline:none;border:1px solid  #80B3FE;position:absolute;background-color: white;";
      bottomLeftButton.style.top =
        outside.y + outside.height + 3 * this.screenPercent + "px";
      bottomLeftButton.style.left = outside.x - 12 - 3 * this.screenPercent + "px";

      body.appendChild(topLeftButton);
      body.appendChild(topRightButton);
      body.appendChild(bottomRightButton);
      body.appendChild(bottomLeftButton);

      document.querySelectorAll(".sideTrans").forEach((dom) => {
        dom.addEventListener("mousedown", function (innerE) {
          //console.log(innerE);
          _this.mouseAction.isTrans = true;
          innerE.stopPropagation();
           let DownX = innerE.clientX,
              DownY = innerE.clientY;
            _this.mouseAction.startX = (DownX - _this.screen.left -60) /_this.screenPercent ;
            _this.mouseAction.startY = (DownY - _this.screen.top-50)/_this.screenPercent;
          _this.mouseAction.transDirect = innerE.target.dataset.direct;
        });
      });

      if (this.keyBord.Control) {
        let mengFrame = document.createElement("div"); //蒙版元素
        mengFrame.style.position = "absolute";
        mengFrame.style.zIndex = "99990";
        mengFrame.style.backgroundColor = "rgba(0,0,0,0)";
        mengFrame.style.left = outside.x + "px";
        mengFrame.style.top = outside.y + "px";
        mengFrame.style.width = outside.width + "px";
        mengFrame.style.height = outside.height + "px";
        mengFrame.id = "drawUIMengFrame";
        mengFrame.style.cursor = "move";
        mengFrame.className = "sideTrans";
        body.appendChild(mengFrame);
        document
          .getElementById("drawUIMengFrame")
          .addEventListener("mousedown", function (innerE) {
            _this.mouseAction.isMoveGroup = true;
            _this.mouseAction.isTrans = false;
            innerE.stopPropagation();
            let DownX = innerE.clientX,
              DownY = innerE.clientY;
            _this.mouseAction.startX = outside.x;
            _this.mouseAction.startY = outside.y;
            _this.mouseAction.startX = innerE.pageX;
            _this.mouseAction.startY = innerE.pageY;
            _this.mouseAction.moveGroup.startX = innerE.pageX;
            _this.mouseAction.moveGroup.startY = innerE.pageY;
            let box = document.getElementById("drawUIMengFrame");
            /*console.log(
              "clent",
              box.offsetLeft,
              box.offsetLeft * _this.screenPercent,
              outside.x / _this.screenPercent
            );*/
            _this.mouseAction.moveGroup.distoLeft =
              innerE.clientX - box.offsetLeft * _this.screenPercent - _this.screen.left;
            _this.mouseAction.moveGroup.distoTop =
              innerE.clientY - box.offsetTop * _this.screenPercent - _this.screen.top;
            /*_this.mouseAction.startX=DownX-_this.screen.left
                        _this.mouseAction.startY=DownY-_this.screen.top
                        _this.mouseAction.moveGroup.startX=this.offsetLeft
                        _this.mouseAction.moveGroup.startY=this.offsetTop
                        _this.mouseAction.moveGroup.distoLeft=innerE.clientX*0.785-outside.x/0.785-12//12是元素占用
                        _this.mouseAction.moveGroup.distoTop=innerE.clientY*0.785-outside.y/0.785-12*/
          });
		  mengFrame=null
      } else {
        body.appendChild(moveButton);
        document
          .getElementById("drawUiMoveButton")
          .addEventListener("mousedown", function (innerE) {
            _this.mouseAction.isMoveGroup = true;
            _this.mouseAction.isTrans = false;
            innerE.stopPropagation();
            let DownX = innerE.clientX,
              DownY = innerE.clientY;
            _this.mouseAction.startX = DownX - _this.screen.left;
            _this.mouseAction.startY = DownY - _this.screen.top;
            //console.log("mive", this.offsetLeft);
            _this.mouseAction.moveGroup.startX = this.offsetLeft;
            _this.mouseAction.moveGroup.startY = this.offsetTop;
          });
      }
	  moveButton=null
	  body=null
	  topLeftButton=null
	  topRightButton=null
	  bottomRightButton=null
	  bottomLeftButton=null
      /**/
    },
    removeChoseSide: function () {
      //清楚被选中的边框
      let outSide = document.querySelector(".sideTrans");
      if (outSide != undefined)
        document.querySelectorAll(".sideTrans").forEach((dom) => {
          dom.remove();
        });
    },
    nodeOnSelectChose: function (e, isMouseDown = false,fromTree=false) {//fromTree用于标记是否是从元素树中选择的
      //元素被框选事件，以鼠标移入事件绑定
	  let domClick=false//标志是否为元素被点击时主动传入的，否则为仅传入元素id
      if (e.target.style != undefined) {
        domClick=true
        e.stopPropagation();
      }
      let box,domId = e.target.id;
      let storeData = this.store.DOMSTRUCT[this.device];
      let tree = storeData.tree;
      let indexSet = storeData.index;
      //判断当前id是否存在于tree中【即是否为主动添加组件】
	  box=document.getElementById(domId)
      if(domClick){
        while(indexSet[domId]==undefined){
			box=box.parentNode
			domId=box.id
        }
      }
	  
      let domIndexInStore = indexSet[domId];
      let parentId = tree[domIndexInStore].parent;
      let parentIndex = indexSet[parentId];
      let up = false; //标志是否有上移，若无上移，则表示操作的就是当前元素，若有上移，说明操作的是其子元素，此时不取消
      while (parentId != null && tree[parentIndex].lock != 0) {
        //检测是否未最外层元素或父元素是否解锁
        domIndexInStore = indexSet[parentId]; //将id索引上移至父容器
        parentId = tree[domIndexInStore].parent; //tree内索引为domIndexStore的元素的父容器组件
        parentIndex = indexSet[parentId];
        up = true;
      }
      domId = tree[domIndexInStore].id; //上移完成后的操作id
      box = document.getElementById(domId);
      let domIsChosed = false; //标记当前操作对象是选中还是取消选中
      if (this.mouseAction.isMove) { 
        //框选的情况
        if (this.choseGroup[domId] == undefined) {
          domIsChosed = true;
        }
      } else if (isMouseDown) {
        //点选的情况
        if (this.keyBord.Shift) { 
          //Shift多选
          if (this.choseGroup[domId] == undefined) {//需要对其父级元素检测，若当前选中元素与父级元素都存在，则删除此元素
            domIsChosed = true;
            Object.keys(this.choseGroup).forEach(hasDom=>{//对已有的进行遍历
                while(true){
                    let parentId=DomTreeEngine.getParentId(hasDom)
                    if(parentId!=null){
                        if(parentId==domId){//若当前遍历到的元素的父级元素与domId相同，则从choseGroup中删除
                            delete this.choseGroup[hasDom]
                            break
                        }else{
                            hasDom=parentId
                        }
                    }else{
                        break
                    }
                }
            })
            let whiLength=Object.keys(this.choseGroup).length,i=0
            while(i<whiLength){//检测父元素是否存在
                i++;
                let parentId=DomTreeEngine.getParentId(domId)
                if(parentId!=null){
                    if(this.choseGroup[parentId] != undefined){//父容器存在是，子容器向上
                        domId=parentId
                        permit=false
                        domIsChosed=false
                        break
                    }
                }else{
                    break
                }
            }
            //console.log("循环2",domId)
          } else {
            //取消选择
            this.choseGroup[domId] = undefined;
            this.nodeCancleChose(e);
          }
        } else {
          //quickEditDom.close("quickEditDom")//关闭快速编辑框
          if (this.choseGroup[domId] == undefined) {
            for (let domIdCancle in this.choseGroup) {
              this.nodeCancleChose({ target: { id: domIdCancle } });
            }
            this.choseGroup = {};
            domIsChosed = true;
            //先锁定全部,并模拟使用openRightbar以调出当前元素的同级元素列表
            this.lockDom()
            this.nowViewDom=box.parentNode.id//nowViewDom设置为当前元素的父级元素，以获取所有列表
            this.openRightBar({target:{dataset:{target:'jg_child'}}})//模拟操作
            this.nowViewDom=domId
            this.$refs["components"].setInsertTarget(domId)//设置添加组件目标对象
          } else {
            if (Object.keys(this.choseGroup).length == 1 && up == false) {
				//取消选择
				for (let domIdCancle in this.choseGroup) {
				  this.nodeCancleChose({ target: { id: domIdCancle } });
				}
				this.choseGroup = {};
				//this.tree.lockParent=null//设置解锁父级id为空
				this.lockDom()
				this.nowViewDom=box.parentNode.id//nowViewDom设置为当前元素的父级元素，以获取所有同级元素列表
				this.openRightBar({target:{dataset:{target:'jg_child'}}})//模拟操作
            } else {//多个切换至一个
              for (let domIdCancle in this.choseGroup) {
                this.nodeCancleChose({ target: { id: domIdCancle } });
              }
              this.choseGroup = {};
              //先锁定全部,并模拟使用openRightbar以调出当前元素的同级元素列表
              this.lockDom()
              this.nowViewDom=box.parentNode.id//nowViewDom设置为当前元素的父级元素，以获取所有列表
              this.openRightBar({target:{dataset:{target:'jg_child'}}})//模拟操作
              domIsChosed = true;
              this.nowViewDom=domId
              this.$refs["components"].setInsertTarget(domId)
            }
          }
        }
      }

      if (domIsChosed) { 
		this.dom.opeTarget=domId
		this.$nextTick(()=>{
			document.getElementById("v_"+domId).style.backgroundColor="rgba(205,205,205,0.8)"
		})
        this.choseGroup[domId] = {
          position: box.style.position,
          top: box.style.top,
          left: box.style.left,
          marginTop: box.style.marginTop,
          marginLeft: box.style.marginLeft,
          height: box.style.height,
          width: box.style.width,
        };
        //let point = DomTreeEngine.getOffsetTopLeft(box);
        //let virtualLeft=point[0],virtualTop=point[1]
        //this.virtualNode({target:{id:domId}},{left:virtualLeft,top:virtualTop})
      }else{
        this.nowViewDom=""
        this.$refs["components"].setInsertTarget("projectFrameInner")
      }
      this.prepareForChoseSide();//绘制选中外框
    },
    nodeCancleChose: function (e) {
		let domId=e.target.id
		if(this.dom.opeTarget!=null){
			this.dom.opeTarget=null
		}
		let box = document.getElementById(domId + "_virtual");
		//执行取消操作后需要在结构树中同步取消被选中节点的高亮显示
		document.getElementById("v_"+domId).style.backgroundColor=""
		if (box){
			box.remove();
		} //需增加判断box是否存在，因为框选对象后shift取消选择，并不会取出choseGroup的键值对，在cancleAllselectedNode中仍然会对已经取消的元素操作
    },
    cancleAllSelectedNode: function () {
      //取消所有选中元素
      this.tree.lockParent=null//设置解锁父级id为空
      for (let domId in this.choseGroup) {
        this.nodeCancleChose({ target: { id: domId } });
      }
      this.choseGroup = {};
	  this.choseGroupTemp={}
	  this.removeChoseSide()
    },
    treeNodeOnChosed:function (e) {
      let targetDom=e.target.dataset.domid 
      ///console.log(e,"domdom",e.target.id,targetDom)
      this.nodeOnSelectChose({target:{id:targetDom}},true,true)
      this.prepareForChoseSide()
    },
    callQuickEdit:function(e){//调出快速编辑框
      let box=document.getElementById("quickEditDom")
      box.style.transition="0s"
      box.style.transform="scale(1) translateX(200%)"
      box.style.transition=".05s"
      box.style.transform=""
      box.style.opacity="1"
      if(Object.keys(this.choseGroup)==0){
        this.$refs.drawUIQucikEdit.changeToGroupOrMain(true)//true表示为主屏调用
      }else{
        try{
          let domId=this.nowViewDom
          if(this.choseGroup[domId]==undefined){
            this.nodeOnSelectChose({target:{id:domId}},true,true)
          }
        }catch{}
      }
      //this.openView.push({target:quickEditDom.close,value:"quickEditDom"})
      this.$refs.drawUIQucikEdit.closeAllEverySpread()//打开时向quickEditDom传递命令关闭所有展开项
    },
	scale2tree:function(e){//切换结构树与缩略图
		let outBox=document.getElementById("scale2tree")
		let box1=document.getElementById("showST")
		let box2=document.getElementById("setST")
		outBox.style.backgroundColor="rgba(225,225,225,0.8)"
		outBox.style.width="80px"
		outBox.style.height="60px"
		outBox.style.boxShadow="-2px 2px 10px rgba(0,0,0,0.25)"
		box1.style.transform="scale(0)"
		setTimeout(()=>{
			box2.style.transform="scale(1)"
		},100)
		setTimeout(()=>{
			document.getElementById("tempST").focus()
		},200)
		
	},
	closeST:function(e){//关闭结构树/缩略图切换
		let outBox=document.getElementById("scale2tree")
		let box1=document.getElementById("showST")
		let box2=document.getElementById("setST")
		box2.style.transform="scale(0)"
		setTimeout(()=>{
			outBox.style.boxShadow="none"
			outBox.style.backgroundColor="transparent"
			outBox.style.width="30px"
			outBox.style.height="25px"
			box1.style.transform="scale(1)"
		},100)
	},
	setSTAction:function(e){//设置结构树/缩略图
		e.stopPropagation()
		let outBox=document.getElementById("scale2tree")
		let domBox=document.getElementById("domTreePlay")
		let backBox=document.getElementById("domTree_back")
		let layerBox=document.getElementById("domTree_back_layers")
		let target=e.target.dataset.target
		let box2=document.getElementById("scale2tree")
		let scaleList=document.getElementById("scaleDomList")
		let treeList=document.getElementById("treeDomList")
		setTimeout(()=>{
			if(target==0){//缩略图
				domBox.style.transform="rotate3d(0,1,0,0deg)"
				outBox.style.transform="rotate3d(0,1,0,0deg)"
				backBox.style.transform="rotate3d(0,1,0,0deg)"
				layerBox.style.transform="rotate3d(0,1,0,0deg)"
				box2.style.float="left"
				box2.style.marginLeft="10px"
				scaleList.style.transform="scale(1)"
				treeList.style.transform="scale(0)"
			}else{//结构树
				domBox.style.transform="rotate3d(0,1,0,180deg)"
				outBox.style.transform="rotate3d(0,1,0,180deg)"
				backBox.style.transform="rotate3d(0,1,0,180deg)"
				layerBox.style.transform="rotate3d(0,1,0,180deg)"
				box2.style.float="right"
				box2.style.marginRight="10px"
				scaleList.style.transform="scale(0)"
				treeList.style.transform="scale(1) rotate3d(0,1,0,180deg)"
			}
		},210)

	},
	treeBack:function(e,targetIndex=null){//结构树返回上一级
		try{
			let layersIndex
			if(targetIndex==null){
				layersIndex=this.dom.layers.length-1
			}else{
				layersIndex=targetIndex
			}
			let parentId=this.dom.layers[layersIndex].id
			this.nowViewDom=document.getElementById(parentId).parentNode.id//nowViewDom设置为当前元素的父级元素，以获取所有列表
			this.openRightBar({target:{dataset:{target:'jg_child'}}})//模拟操作
			this.nowViewDom=parentId
			this.dom.opeTarget=parentId
			this.nodeOnSelectChose({target:{id:parentId}},true,true)
			this.$refs["components"].setInsertTarget(parentId)//设置添加组件目标对象
			let tempArr=[]
			for(let i=0;i<layersIndex;i++){
				tempArr.push(this.dom.layers[i])
			}
			this.dom.layers=tempArr
			//console.log("parentId",parentId)
			//console.log(DomTreeEngine.getChildIds(DomTreeEngine.getParentId(parentId)),"上一层")//将右侧元素显示列表置为当前元素的子元素列表	
		}catch{}	
	},
	showLayers:function(e){
		e.preventDefault()
		document.getElementById("domTree_back_layers").style.display=""
		document.getElementById("tempLayers").focus()
	},
	closeLayers:function(e){
		setTimeout(()=>{
			document.getElementById("domTree_back_layers").style.display="none"
		},100)
		
	}
  },
};
</script>
<style scoped>
	.treeLayersItem{
		width: 100%;
		height: 25px;
		line-height: 25px;
		font-weight: 400;
		border-bottom: 1px solid var(--mainColorGray);
		cursor: pointer;
		transition: .2s;
	}
	.treeLayersItem:hover{
		background-color: var(--mainColorGray);
	}
	.STitem{
		width: 100%;height: 29px;font-size: 12px;color: var(--mainColorBlue);letter-spacing: 1px;transition: .2s;
	}
	.STitem:hover{
		background-color: rgba(215,215,215,0.8);
	}
	#scale2tree{
		border-radius: 5px;
		height: 25px;
		transition: .2s;
		position: relative;
		margin: 0;
		margin-left: 10px;
		margin-top: 5px;
		z-index: 105;
		width: 30px;
		background-color:transparent;
		float: left;
		box-shadow: none;
		overflow: hidden;
		
	}
.treeDomItem{
	background-color: rebeccapurple;
	height: 30px;
	width: 100%;
	transition: .2s;
}
.treeDomItem:hover{
	background-color: red;
}
#main {
  position: relative;
  display: inline-block;
  height: calc(100% - 70px);
  margin-top: 10px;
  width: 99%;
  min-width: 1526px;
  background-color: transparent;
}
#leftBar {
  position: absolute;
  width: 45px;
  left: 0px;
  height: 100%;
  z-index: 99998;
  background:var(--mainDarkBg2) /*rgba(255, 255, 255, 1)*/;
  backdrop-filter: blur(30px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 10px;
  transition: 350ms;
}
.leftBarButton {
  height: 30px;
  position: relative;
  width: 30px;
  background-size: cover;
  background-color: transparent;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 2vh;
}
.bottomBarButton {
  width: 86px;
  height: 35px;
  float: left;
  margin-left: 20px;
  background: var(--mainColorGreen);
  border-radius: 10px;
  margin-top: 5px;
  color: white;
  font-size: 100%;
}
.domTreePlayIcon{
    height: 46px;
    width: 46px;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    background-position-x: 25%;
    background-position-y: 50%;
    background-color: transparent;
    padding: 0;
    float: left;
}
.treeItem{
  margin-top: 10px;
  height: 83px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-left: 15%;
  cursor: default;
  text-align: center;
  align-items: center;
  background-color: rgba(230,230,230,0.5);
  border-radius: 10px;
}

.treeItem_tree{
  margin-top: 5px;
  height: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 0%;
  cursor: pointer;
  text-align: center;
  align-items: center;
  background-color: transparent;
  border-radius: 0px;
  border-top: 1px solid var(--mainColorGray);
  transition: .1s;
}

.treeItem_tree:hover{
	background-color: rgba(205,205,205,0.8);
}


.rightOptionList{
  width:15%;
  height:95%;
  position: absolute;
  left:0;
  z-index: 3;
  background-color:var(--mainDarkBg2) /*rgba(255,255,255,0.8)*/;
  margin-top:0%;
  top:0px;
  border-radius: 10px 0 0 10px;
}
.rightOptionList_item{
  background-position: center;
  background-size: 70%;
  background-repeat: no-repeat;
  width:35px;
  height:35px;
  padding: 0;
  margin-top: 10px;
  background-color: transparent;
}
.treeItem_DomScale{
  position: relative;
  border:3px solid var(--mainColorBlue);
  margin:0;
  height: 65px;
  display: flex;
  overflow:hidden;
  flex-direction:column;
  width:115px;
  background-color: white;
  border-radius: 10px;
}
.treeItem_DomTree{
  position: relative;
  border:none;
  margin:0;
  margin-top: 5px;
  cursor: pointer;
  height: 25px;
  display: flex;
  overflow:hidden;
  flex-direction:column;
  width:100%;
  background-color:transparent;
  border-radius: 0px;
  transition: .3s;
}


.treeDomText{
display: flex;
color: var(--mainColorBlue);
-webkit-touch-callout: none; /* iOS Safari */
-webkit-user-select: none; /* Chrome/Safari/Opera */
-khtml-user-select: none; /* Konqueror */
-moz-user-select: none; /* Firefox */
-ms-user-select: none; /* Internet Explorer/Edge */
user-select: none; /* Non-prefixed version, currently not supported by any browser */
}
#selectDomOut{
    position: relative;
    height:50px;
    width:100%;
    margin-left: 0;
    background-color: white;
    border-radius: 15px;
    overflow: hidden;
}
#selectDomInner{
    height: 43px;
    width:90%;
    margin-left: 5%;
    position: relative;
    margin-top: 3px;
    background: #F3F3F3;
    border-radius: 12px;
    text-align: left;
}
#domTreePlayGroup{
    width: 65%;
    height: 30px;
    margin-top: 7px;
    color:white;
    font-weight: bold;
    background: #8BA4FF;
    border-radius: 10px;    
}
#selectDom{
    height: 100%;
    width: 73%;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    color: #ACACAC;
    text-align: center;
    background-color: transparent;
    float: left;
}
#selectDomButton{
    float: left;
    width: 35px;
    height: 35px;
    margin-top: 4px;
    background-color: white;
    padding: 0;
    outline: none;
    border:10px solid #8BA4FF;
    border-radius: 10px;
}
#domTreePlay{
	transition: .3s;
    z-index: 98;
	right:260px;
	position: absolute;
    height: calc(100% - 80px);
    border-radius: 10px;
    width:200px;
    top:1vh;
	box-shadow: -5px 5px 15px rgba(0,0,0,0.25);
    background-color: rgba(245,245,245,0.7);
	backdrop-filter: blur(10px);
}
.domTreePlayItem{
    cursor: pointer;
    height: 50px;
    background: #FFFFFF;
    border: 2px solid #8BA4FF;
    box-sizing: border-box;
    border-radius: 10px;
    width: 90%;
    margin-left: 5%;
    margin-top: 10px;
}
.containerDevice {
  position: absolute;
  height: 37px;
  overflow: hidden;
  top: 4px;
  right: 200px;
  width: 132px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 10px;
}
.deviceButton {
  transition: 0.2s linear;
  height: 31px;
  margin-top: 3px;
  width: 31px;
  margin-left: 10px;
  float: left;
  border-radius: 8px;
  background-position: center;
  background-size: 90%;
  background-repeat: no-repeat;
}
.callEdit{
  cursor: pointer;
  z-index: 3;
}
.callEdit::before{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  content: "";
  height:10px;
  width:10px;
  background-color: white;
  border-radius: 5px;
}
#bottomCenterButton {
  position: absolute;
  width: 41px;
  height: 41px;
  padding: 0;
  left: 50%;
  top: 2px;
  transform: translateX(-50%);
  background: var(--mainColorBlue);
  border: 0px solid #c7d2f9;
  box-sizing: border-box;
  border-radius: 25px;
  box-sizing: border-box;
  transition: 0.1s linear;
}
#bottomCenterButton:hover {
  border: 5px solid #c7d2f9;
}
#bottomCenterButton::before {
  content: "";
  width: 80%;
  height: 5px;
  position: absolute;
  border-radius: 5px;
  top: 50%;
  transform: translateY(-50%);
  left: 10%;
  background-color: white;
}
#bottomCenterButton::after {
  content: "";
  height: 80%;
  width: 5px;
  position: absolute;
  border-radius: 5px;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  background-color: white;
}
#drawMain {
  width: calc(100% - 305px);
  height: 100%;
  background-color: transparent;
  position: absolute;
  left: 50px;
  z-index: 1;
}
#bottomBar {
  position: absolute;
  width: 100%;
  height: 45px;

  background:var(--mainDarkBg2) /*#ffffff*/;
  /*box-shadow: 0px 4px 4px rgba(199, 199, 199, 0.25);*/
  backdrop-filter: blur(30px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 10px;
  bottom: 0;
}
#projectFrameOut {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 50px);
  background:var(--mainDarkBg1) /*#ffffff*/;
  transform: scale(1);
  /*border: 1px dashed #000000;*/
  box-sizing: border-box;
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 20px;
}
#projectFrameInner {
  position: absolute;
  width: 1536px;
  transform-origin: left top;
  height: 721px;
  transform: scale(0.785);
  background: white/*rgba(239, 237, 237, 0.5);*/
}
#rightBar {
  position: absolute;
  width: 250px;
  height: 100%;
  right: 0px;
  background:var(--mainDarkBg2) /*rgba(255, 255, 255, 0.98)*/;
  /*backdrop-filter: blur(30px);*/
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 20px;
}
.share {
  height: 30px;
  width: 30px;
  margin-top: 10px;
  margin-right: 15px;
  float: right;
  background-color: transparent;
}
#projectContainer {
  width: 100%;
  height: 100vh;
  background-color:var(--mainDarkBg1) /*#efefef*/;
  font-family: Righteous;
  font-style: Regular;
}
#backToFronText {
  float: left;
  color: var(--color_text1);
  margin-left: 5%;
  margin-top: 10px;
  height: 35px;
  padding: 0;
  cursor: pointer;
}
.layerButton {
  background-color: white;
  height: 30px;
  width: 3em;
  padding: 0;
  color: var(--mainColorBlue);
  float: left;
  margin-left: 1%;
  font-size: 105%;
  margin-top: 0.6em;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.headerLayerChoseT {
  background-color: white;
  height: 10px;
  width: 10px;
  clip-path: polygon(0 0, 100% 50%, 0 100%);
  float: right;
  margin-top: 6px;
  right: 2px;
}
.sideTransButton {
  outline: none;
  border: 1px solid #80b3fe;
  position: absolute;
  background-color: white;
}
</style>