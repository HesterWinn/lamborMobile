<template>
	<div>
		<!-- 内容 -->
		<article class="msg-wrap member-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>

			<section v-if="this.MemberData.Acct" class="head-section">
				<div class="left">
					<img :src='MemberData.HeadImgUrl' />
					<p>{{this.MemberData.Name}}</p>
				</div>
				<div class="fl">
					<p>
						<i v-if="this.IsWX">账号: {{this.MemberData.Acct}}&emsp;&ensp;</i>
					</p>
					<p>
						<i>现金余额: {{this.VBalance | moneyFormat}}</i>
						<a v-if="IsGetBalanceIng===true" class="btn btn-bind btn-refresh"><span class="LoadIcon"></span></a>
						<a v-else class="btn btn-refresh" @click="GetBalance()">刷新</a>
					</p>
					<a class="btn" @click="BindCopy()">复制网址</a>
					<router-link :to="{name: 'openPlatform'}" v-if="this.IsWX && !this.MemberData.AcctPwdEnabled" class="btn btn-bind">开通登录账密</router-link>
					<a class="btn btn-bind" v-else-if="this.IsWX && this.MemberData.AcctPwdEnabled">已开通登录账密</a>
					<input class="" type="text" v-model="copyUrl" id="copyObj">
				</div>
			</section>
			<section v-else class="head-section">
				<div class="left">
					<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/avatar_default.png'" />
					<p>未登录</p>
				</div>
				<div class="fl">
					<p>
						<router-link :to="{name: 'login'}" class="btn">登录/注册</router-link>
					</p>
				</div>
			</section>
			<section class="tab-section">
				<ul>
					<li data-toggle="modal" data-target="#depositModal">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon1.png'" />
						<p>充值</p>
					</li>
					<li data-toggle="modal" data-target="#withdrawalModal">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon2.png'" />
						<p>提现</p>
					</li>
					<li>
						<router-link :to="{name: 'transactionRecord'}">
							<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon3.png'" />
							<p>记录查询</p>
						</router-link>
					</li>
					<li>
						<router-link :to="{name: 'privateMessage'}">
							<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon4.png'" />
							<p>公告信息</p>
						</router-link>
					</li>
					<!--<li>
						<router-link :to="{name: 'extendRecord'}">
							<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon5.png'" />
							<p>推广查询</p>
						</router-link>
					</li>-->
					<li>
						<router-link :to="{name: 'fundManage'}">
							<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon5.png'" />
							<p>资金管理</p>
						</router-link>
					</li>
					<li>
						<router-link :to="{name: 'modifyPassword'}">
							<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/tab_icon6.png'" />
							<p>修改密码</p>
						</router-link>
					</li>
				</ul>
			</section>
			<section class="footer-section">
				<div class="left">
					<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/img_scan.png'" />
				</div>
				<div class="fl">
					<p>设定二维码，畅享掌上游戏快感，在游戏的同时收获更多</p>
					<a href="#" class="btn" data-toggle="modal" data-target="#scanModal">生成二维码</a>
				</div>
			</section>

			<a @click="Logout()" class="btn btn-white">退&emsp;出</a>

			<!-- 复制成功 -->
			<copy-modal></copy-modal>

			<!-- 生成二维码 -->
			<scan-modal :UserInfo="this.UserInfo" v-if="this.UserInfo.userId"></scan-modal>

			<!-- 充值弹窗 -->
			<deposit-modal></deposit-modal>

			<!-- 提现弹窗 -->
			<withdrawal-modal></withdrawal-modal>

		</article>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/member/index.less';
</style>
<script>
	import EventBus from 'scripts/common/EventBus'
	import BLDef from 'scripts/common/BLDef'
	import CommUtility from 'scripts/common/CommUtility'
	import mainHeader from '@/components/mobile/sub/mainHeader'
	import copyModal from '@/components/mobile/sub/member/copyModal'
	import scanModal from '@/components/mobile/sub/member/scanModal'
	import depositModal from '@/components/mobile/sub/recharge/depositModal'
	import withdrawalModal from '@/components/mobile/sub/recharge/withdrawalModal'

	import CommonService from 'scripts/businessLogic/commonService'
	import LoginService from 'scripts/businessLogic/loginService'
	import SignalRService from 'scripts/common/SignalRService'
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService'

	export default {
		data() {
			return {
				HeaderTitle: "个人中心",
				MemberData: {},
				VBalance: '0',	//余额
				IsGetBalanceIng: false,	//是否正在获取余额
				IsWX: false, //是否微信登录
				//推广二维码包含信息
				UserInfo: {
					userId: undefined,
					userType: undefined,
				},
				copyUrl: window.location.origin, //复制网址
				// 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
		},
		created: function() {
			let that = this
			that.Load()
			that.VBalance = localStorage.getItem('VBalance') || '0'
			EventBus.$on('UpdateVBalance', data => {
                that.VBalance = data
            });
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.GetMemberInfo()
//					this.GetBalance()
					this.ModalHeight()
				})
			},
			// 登出
			Logout: async function() {
				const inputObj = {
					LogoutInfo: {}
				};
				EventBus.$emit('GlobalLoadingTrigger', true)
				await LoginService.LogOut(inputObj)
				EventBus.$emit('GlobalLoadingTrigger', false)
				// 移除登入相關資料
				localStorage.removeItem('logoutTime');
				localStorage.removeItem('Token');
				localStorage.removeItem('WXobj');
				localStorage.removeItem('Auth');
				localStorage.removeItem('Acct');

				EventBus.$emit('SHOW_TIP', "登出成功") //登出成功提示

				// 若沒接收到signalr斷線訊息，則3秒後自行斷線
            	setTimeout(function () {
					// 斷Signalr連線
					SignalRService.DisConnectServer()
					window.location.href = '/login' //跳转登录页面
            	}, 1000);  
            	
			},
			//复制网址
			BindCopy: function() {
				const range = document.createRange();
				//复制节点对象
				range.selectNode(document.getElementById('copyObj'));
				const selection = window.getSelection();
				if(selection.rangeCount > 0) selection.removeAllRanges();
				//选择复制范围
				selection.addRange(range);
				document.execCommand('Copy');

				EventBus.$emit('SHOW_TIP', "复制成功"); //复制成功提示
			},
			//弹窗高度
			ModalHeight: function() {
				//充值
				$('#copyModal').on('show.bs.modal', function() {
					$(this).css('display', 'block');
					var ModalHeight = $(window).height() / 2 - $('#copyModal .modal-dialog').height() / 2;
					$(this).find('.modal-dialog').css({
						'margin-top': ModalHeight
					});
				});
			},
			//获取用户信息
			GetMemberInfo: async function() {
				EventBus.$emit('GlobalLoadingTrigger', true);
				const data = await CommonService.Comm_GetMemberInfo();
				EventBus.$emit('GlobalLoadingTrigger', false);
				if(data.Data && data.Data.Member) {
					this.MemberData = data.Data.Member;
					this.MemberData.HeadImgUrl = this.ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/member/avatar.jpg';
					this.MemberData.Name = this.MemberData.Acct;

					this.UserInfo.userId = this.MemberData.AcctID;
					this.UserInfo.userType = this.MemberData.AcctID;

					let WXobj = null
					if(localStorage.getItem('WXobj')) {
						console.log(localStorage.getItem('WXobj'))
						WXobj = JSON.parse(localStorage.getItem('WXobj'))
						if(WXobj && WXobj.Name) {
							this.IsWX = true
							this.MemberData.Name = WXobj.Name
							this.MemberData.HeadImgUrl = WXobj.HeadImgUrl
							this.MemberData.AcctPwdEnabled = WXobj.AcctPwdEnabled
							this.MemberData.BankCardAdded = WXobj.BankCardAdded
						}
					}
					console.log(this.MemberData);
				}
			},
			GetBalance: async function () {
				this.IsGetBalanceIng = true
                this.VBalance = await CommUtility.CalculateSummaryAmount()
                this.IsGetBalanceIng = false
            },
		},
		components: {
			mainHeader,
			copyModal,
			scanModal,
			depositModal,
			withdrawalModal,
		},
		beforeDestroy() {
            EventBus.$off('UpdateVBalance');
       },
	}
</script>