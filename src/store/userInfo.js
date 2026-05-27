/*
*记录用户信息
*主要包含：
	*账号（加密）
	*身份（产品/原型[prototype]、UI设计 [design]、前端开发 [developer]）
*/
import {defineStore} from "pinia"
export const userInfoStore= defineStore({
    id:"userinfo",
    state:()=>{
        return{
			userName:"",
			identity:"",
		}
	},
    getters:{},
    actions:{}
})