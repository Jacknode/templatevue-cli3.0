// import Vue from 'vue'
// import Router from 'vue-router'
Vue.use(VueRouter)

const _import = require('./_import_' + process.env.NODE_ENV);

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading


/* Layout */
import Layout from '../views/layout/Layout';

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [{
		path: '/login',
		name: 'Login',
		component: _import('login/index'),
		hidden: true
	}, {
		path: '/',
		name: 'Login',
		component: _import('login/index'),
		hidden: true
	}, {
		path: '/authredirect',
		component: _import('login/authredirect'),
		hidden: true
	}, {
		path: '/404',
		component: () =>
			import('@/views/404'),
		hidden: true
	}, {
		path: '/demo',
		component: () =>
			import('@/views/demo'),
		hidden: true
	}, {
		path: '/dashboard',
		component: Layout,
		children: [{
				path: '',
				component: () =>
					import('@/views/dashboard'),
				name: 'dashboard',
				meta: {
					title: 'dashboard',
					icon: 'dashboard',
					noCache: true
				}
			},

		],

	},
	{ //个人资料
		path: '/myPersonalIndex',
		component: Layout,
		name: 'myPersonalIndex',
		redirect: '/myPersonalIndex/myPersonal',
		meta: {
			title: 'myPersonal',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'myPersonal',
			name: 'myPersonal',
			component: () =>
				import('@/views/myPersonal/index'),
			meta: {
				title: 'myPersonal',
				icon: 'persoanl',
				noCache: true
			}
		}]
	},
	{ //文章列表
		path: '/articleEditIndex',
		component: Layout,
		name: 'articleEditIndex',
		redirect: '/articleEditIndex/articleEdit',
		meta: {
			title: 'articleEdit',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'articleEdit',
			name: 'articleEdit',
			component: () =>
				import('@/views/editWrap/articleEdit/index'),
			meta: {
				title: 'articleEdit',
				icon: 'edit',
				noCache: true
			}
		}]
	},
	{ //视频列表
		path: '/videoEditIndex',
		component: Layout,
		name: 'videoEditIndex',
		redirect: '/videoEditIndex/videoEdit',
		meta: {
			title: 'videoEdit',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'videoEdit',
			name: 'videoEdit',
			component: () =>
				import('@/views/editWrap/videoEdit/index'),
			meta: {
				title: 'videoEdit',
				icon: 'edit',
				noCache: true
			}
		}]
	},
	// 	{ //文章编辑
	// 		path: 'articleEdit',
	// 		component: () =>
	// 			import('@/views/articleEdit/index'),
	// 		name: 'articleEdit',
	// 		meta: {
	// 			title: 'articleEdit',
	// 			icon: 'persoanl',
	// 			noCache: true
	// 		}
	// 	},
	{ //视频单独编辑
		path: '/aloneVideoEditIndex',
		component: Layout,
		name: 'aloneVideoEditIndex',
		redirect: '/aloneVideoEditIndex/aloneVideoEdit',
		hidden:true,
		alwaysShow: true,
		meta: {
			title: 'aloneVideoEdit',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'aloneVideoEdit',
			name: 'aloneVideoEdit',
			component: () =>
				import('@/views/editWrap/aloneVideoEdit/index'),
			meta: {
				title: 'aloneVideoEdit',
				icon: 'persoanl',
				noCache: true
			}
		}]
	},
	{ //文章单独编辑
		path: '/aloneArticleEditIndex',
		component: Layout,
		name: 'aloneArticleEditIndex',
		redirect: '/aloneArticleEditIndex/aloneArticleEdit',
		hidden:true,
		alwaysShow: true,
		meta: {
			title: 'aloneArticleEdit',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'aloneArticleEdit',
			name: 'aloneArticleEdit',
			component: () =>
				import('@/views/editWrap/aloneArticleEdit/index'),
			meta: {
				title: 'aloneArticleEdit',
				icon: 'persoanl',
				noCache: true
			}
		}]
	},
	{ //文章修改
		path: '/UpdataIndex',
		component: Layout,
		name: 'UpdataIndex',
		redirect: '/UpdataIndex/Updata',
		hidden:true,
		alwaysShow: true,
		meta: {
			title: 'Updata',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'Updata',
			name: 'Updata',
			component: () =>
				import('@/views/editWrap/Updata/index'),
			meta: {
				title: 'Updata',
				icon: 'persoanl',
				noCache: true
			}
		}]
	},
	{ //视频修改
		path: '/videoUpDataIndex',
		component: Layout,
		name: 'videoUpDataIndex',
		redirect: '/videoUpDataIndex/videoUpData',
		hidden:true,
		alwaysShow: true,
		meta: {
			title: 'videoUpData',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'videoUpData',
			name: 'videoUpData',
			component: () =>
				import('@/views/editWrap/videoUpData/index'),
			meta: {
				title: 'videoUpData',
				icon: 'persoanl',
				noCache: true
			}
		}]
	},
	{ //页面刷新
		path: '/isRouterAliveIndex',
		component: Layout,
		name: 'isRouterAliveIndex',
		redirect: '/isRouterAliveIndex/isRouterAlive',
		hidden:true,
		alwaysShow: true,
		meta: {
			title: 'isRouterAlive',
			icon: 'persoanl',
			noCache: true
		},
		children: [{
			path: 'isRouterAlive',
			name: 'videoUpData',
			component: () =>
				import('@/views/editWrap/isRouterAlive/index'),
			meta: {
				title: 'isRouterAlive',
				icon: 'persoanl',
				noCache: true
			}
		}]
	},
	/**
	 *  404
	 **/
	// {path: '*', redirect: '/404', hidden: true}
];

export default new VueRouter({
	// mode: 'history', //后端支持可开
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRouterMap
})

export const asyncRouterMap = []
