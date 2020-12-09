import Vue from 'vue';
import Router from 'vue-router';
import PageRedirect from '@/router/redirect';
import BLDef from 'scripts/common/BLDef';

import base from '@/components/base/base';
import webLayout from '@/components/base/baseLayout';
import mainLayout from '@/components/mobile/layout/mainLayout';
import index from '@/components/mobile/index/index';
import recharge from '@/components/mobile/recharge/index';
import tutorial from '@/components/mobile/sub/tutorial/index';
import depositPayment from '@/components/mobile/sub/recharge/depositPayment';
import member from '@/components/mobile/member/index';
import transactionRecord from '@/components/mobile/member/transactionRecord';
import extendRecord from '@/components/mobile/member/extendRecord';
import privateMessage from '@/components/mobile/member/privateMessage';
import modifyPassword from '@/components/mobile/member/modifyPassword';
import fundManage from '@/components/mobile/member/fundManage';
import login from '@/components/mobile/login/index';
import author from '@/components/mobile/login/author';
import code from '@/components/mobile/login/code';
import register from '@/components/mobile/register/index';
import openPlatform from '@/components/mobile/openPlatform/index';
import playGame from '@/components/mobile/linkToGame/playGame';
import activity from '@/components/mobile/activity/index';
import JoinUs from '@/components/mobile/JoinUs/index';

import NotFoundComponent from '@/components/base/notFound';

import CommonService from 'scripts/businessLogic/commonService';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [{
			// 找不到對應目錄時的畫面組件
			path: '*',
			component: NotFoundComponent,
		},
		{
			path: '/',
			name: 'webLayout',
			component: webLayout,
			children: [{
					//首页
					name: 'index',
					meta: {
						index: 0
					},
					path: '',
					component: index
				},
				{
					// web top menu 
					name: 'mainLayout',
					meta: {
						index: 3
					},
					path: '',
					component: mainLayout,
					children: [{
							//充值中心
							name: 'recharge',
							meta: {
								mdex: 1
							},
							path: 'recharge',
							component: recharge
						},
						{
							//添加到桌面教程
							name: 'tutorial',
							meta: {
								mdex: 2
							},
							path: 'tutorial',
							component: tutorial
						},
						{
							// 在線支付頁面
							name: 'depositPayment',
							meta: {
								mdex: 3
							},
							path: 'depositPayment/:Data',
							component: depositPayment,
						},
						{
							//个人中心
							name: 'member',
							meta: {
								mdex: 1
							},
							path: 'member',
							component: member,
						},
						{
							//记录查询
							name: 'transactionRecord',
							meta: {
								mdex: 2
							},
							path: 'member/transactionRecord',
							component: transactionRecord
						},
						{
							//推广查询
							name: 'extendRecord',
							meta: {
								mdex: 2
							},
							path: 'member/extendRecord',
							component: extendRecord
						},
						{
							//公告信息
							name: 'privateMessage',
							meta: {
								mdex: 2
							},
							path: 'member/privateMessage',
							component: privateMessage
						},
						{
							//修改密码
							name: 'modifyPassword',
							meta: {
								mdex: 2
							},
							path: 'member/modifyPassword',
							component: modifyPassword
						},
						{
							//资金管理
							name: 'fundManage',
							meta: {
								mdex: 2
							},
							path: 'member/fundManage',
							component: fundManage
						},
						{
							//登录
							name: 'login',
							meta: {
								mdex: 1
							},
							path: 'login',
							component: login
						},
						{
							//微信登录,带推广链接
							name: 'author',
							meta: {
								mdex: 1
							},
							path: 'author/:DomainLink',
							component: author
						},
						{
							//微信登录
							name: 'author',
							meta: {
								mdex: 1
							},
							path: 'author',
							component: author
						},
						{
							//微信授权获取code
							name: 'code',
							meta: {
								mdex: 1
							},
							path: 'code',
							component: code
						},
						{
							//微信授权获取code
							name: 'code',
							meta: {
								mdex: 1
							},
							path: 'code/:DomainLink',
							component: code
						},
						{
							//注册
							name: 'register',
							meta: {
								mdex: 1
							},
							path: 'register',
							component: register
						},
						{
							//注册
							name: 'register',
							meta: {
								mdex: 1
							},
							path: 'register/:Data',
							component: register
						},
						{
							//微信开通平台账密
							name: 'openPlatform',
							meta: {
								mdex: 1
							},
							path: 'openPlatform',
							component: openPlatform
						},
						{
							// 所有遊戲畫面
							name: 'playGame',
							meta: {
								mdex: 1
							},
							path: 'playGame',
							component: playGame
						},
						{
							// 所有遊戲畫面
							name: 'activity',
							meta: {
								mdex: 1
							},
							path: 'activity',
							component: activity
						},
						{
							// 加盟我们
							name: 'JoinUs',
							meta: {
								mdex: 1
							},
							path: 'JoinUs/:Data',
							component: JoinUs
						},
					]
				}
			]
		}
	]
});

// 路由前檢查
router.beforeEach(async(to, from, next) => {
	// 檢查裝置
	const device = navigator.userAgent;
	if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(device))) {
		location.replace(BLDef.WebVersionHost + to.fullPath);
		return;
	} // end if

	// 加時間防止被登出
	localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000));

	// 確認是否需檢查路由
	if(PageRedirect.Web[to.name] !== undefined) {
		const data = await CommonService.Comm_CheckPermission();

		// 避免Token殘留
		if(data.Status === 0) {
			localStorage.removeItem('Token');
		}

		const redirectData = PageRedirect.Web[to.name][data.Status];
		// 根據登入狀態判斷是否合法路由，若非法則進入指定路由
		if(redirectData.Ret === true) {
			next();
		} else {
			next({
				name: redirectData.RedirectName,
			});
		}
	} else {
		next();
	}
});

router.afterEach(function(transition) {
	console.log(transition);
	// 跳轉頁面後回歸頂部
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});

export default router;