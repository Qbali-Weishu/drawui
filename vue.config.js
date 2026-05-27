
const path = require('path')
 const { defineConfig }=require("@vue/cli-service")
function resolve(dir) {
    return path.join(__dirname, dir)
}
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
	runtimeCompiler: true,
	configureWebpack:{
		resolve: {
		      extensions: ['.js', '.vue', '.json'],
		      alias: {
		        'vue$': 'vue/dist/vue.esm.js',
		        '@': resolve('src')
		      }
		    },
		plugins: [
		  new MonacoWebpackPlugin({
		    languages: ['javascript', 'typescript', 'html', 'css', 'json'],
			features:["coreCommands","find"]
		  })
		]
	},
    // 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
    // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' 
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
    // 输出文件目录：在npm run build时，生成文件的目录名称 
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 
    assetsDir: "assets",
    // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 
    productionSourceMap: false,
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
    filenameHashing: false,
    // 代码保存时进行eslint检测
    lintOnSave: false,
    // webpack-dev-server 相关配置
	configureWebpack: {
	        // provide the app's title in webpack's name field, so that
	        // it can be accessed in index.html to inject the correct title.
	        name: "DrawUI",
	        resolve: {
	            alias: {
	                '@': resolve('src')
	            }
	    },
	},
	
    devServer: {
        // 自动打开浏览器
        open: true,
        host: '0.0.0.0',
        // 端口
        port: 8080,
        // https
        https: false,
		public:'192.168.31.153:8080',
        // 热更新
        // 使用代理
        proxy: {
            '/back': {
                // 目标代理服务器地址
                target: 'http://localhost:8081/',
                // 开启代理，本地创建一个虚拟服务器 允许跨域
                changeOrigin: true, 
            },
			'/common': {
			    // 目标代理服务器地址
			    target: 'http://localhost:8081/',
			    // 开启代理，本地创建一个虚拟服务器 允许跨域
			    changeOrigin: true, 
			},
            '/small': {
                // 目标代理服务器地址
                target: 'http://localhost:8081/',
                // 开启代理，本地创建一个虚拟服务器 允许跨域
                changeOrigin: true, 
            },
			'/file':{
				// 目标代理服务器地址
				target: 'http://localhost:8081/',
				// 开启代理，本地创建一个虚拟服务器 允许跨域
				changeOrigin: true, 
			},
			'/static':{
				// 目标代理服务器地址
				target: 'http://localhost:8081/',
				// 开启代理，本地创建一个虚拟服务器 允许跨域
				changeOrigin: true, 
			},
			'/node':{
				// 目标代理服务器地址
				target: 'http://localhost:3000/',
				// 开启代理，本地创建一个虚拟服务器 允许跨域
				changeOrigin: true, 
			},
        },
    },
	chainWebpack: config => {
			config.module.
				rule('worker-loader').
				test(/\.worker\.js$/).
				use({ loader: "worker-loader",
					options: {
						inline: true,
						name: "workerName.[hash].js"
					}}).loader("worker-loader").end()
			
		},
				
}
/*			config.plugin('monaco').use(new MonacoWebpackPlugin(
				{
				 languages:["javascript","css","html","json"],
				 features:["coreCommands","find"]
				}
			))*/