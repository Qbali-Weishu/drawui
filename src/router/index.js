import { createRouter, createWebHistory } from 'vue-router'

/*let URL=document.URL.toString().split("/")
let userid=URL[URL.length-2]
let projectName=URL[URL.length-1]
	try{
		let url=window.location.href.split("?")[1].split("=")[1]
		window.USERPATH=url
		console.log(window.USERPATH,'url')
	}catch(e){console.error(e)}*/
const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ /*'../views/Home.vue')*/
  /*},
  {
    path: '/about',
    name: 'About',*/
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    /*component: () => import(*//* webpackChunkName: "about" */ /*'../views/About.vue')
  },*/{
    path:"/test",
    name:"test1",
    component: () => import(/* webpackChunkName: "about" */ "../testSpace/test1.vue")
  },{
    path:"/Project",
    name:"Project",
    component: () => import( /* webpackChunkName: "project" */ "../views/main.vue")
  },
  {
  	  path:"/codeview",
  	  name:"codeview",
  	  component: () => import (/* webpackChunkName: "about" */ "../components/microTools/cubicBezier.vue")
  },
  {
		path:"/animate",
	  	name:"animate",
	  	component: () => import (/* webpackChunkName: "about" */ "../components/animateEditor.vue")
  },
  {
    path:"/request",
    name:"request",
    component: () => import(/* webpackChunkName: "about" */ "../testSpace/testRequest.vue")
  }
]
/*if(URL.indexOf("userProject")>-1){
  console.log("cuna")
  routes.push(
    {
      path:"/userProject/:username/:projectid",
      //component:() => import(/* webpackChunkName: "about" */ /*"../views/project/"+projectName+".vue")*/
      /*component:() => import(/* webpackChunkName: "about" */ /*"../components/created/"+userid+".type/"+projectName+".com/index.vue")*/
    /*}
  )
}*/

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
