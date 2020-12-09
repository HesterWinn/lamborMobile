<template>
	<div>
		<!--头部-->
		<main-header :HeaderTitle="this.HeaderTitle"></main-header>

		<!-- 内容 -->
		<section class="msg-wrap register-wrap">
			<article>
				<div class="logo">
					<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/register/logo.png'" />
					<h2>开通平台账号</h2>
				</div>
				<form class="addcard-form" novalidate="novalidate">
					<div class="row input-group">
						<label>微&emsp;&emsp;信</label>
						<p class="form-control">{{RegistObj.Name}}</p>
					</div>
					<div class="row input-group">
						<label>平台账号</label>
						<p class="form-control">{{RegistObj.Acct}}<i>(系统自动分配，可联系客服修改)</i></p>
					</div>
					<div class="row input-group">
						<label>登录密码</label>
						<input class="form-control" type="text" id="Pwd" name="Pwd" v-model="RegistObj.Pwd" v-validate="{ rules: { regex:Reg.Password, required: true }}" placeholder="请输入6-20个字符的登录密码" />
					</div>
					<div class="row checkbox-row">
						<input type="checkbox" id="check" class="form-checkbox" v-model="RegistObj.CheckedAgree" /><label for="check"></label> 本人已阅读过
						<a href="#" data-toggle="modal" data-target="#userAgreementModal">《用户协议》</a>并同意其所示内容
					</div>
					<div class="row">
						<p class="error-tip" v-if="errors.has('Pwd') && fields.Pwd.touched">
							* 仅可以使用英文字母,数字与一般常用符号, 字数范围6-20
						</p>
						<p class="error-tip" v-else-if="!this.RegistObj.CheckedAgree">
							* 请勾选同意条款!
						</p>
					</div>
					<div class="row">
						<a v-on:click="SumbitRegist()" class="btn btn-gold">提&emsp;交</a>
						<a class="btn btn-gray" href="#" onClick="javascript :history.back(-1);">取&emsp;消</a>
					</div>
				</form>
			</article>
		</section>

		<!-- 用户协议 -->
		<user-agreement-modal></user-agreement-modal>

	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/register/index.less';
</style>
<script>
	import EventBus from 'scripts/common/EventBus';
	import Regex from 'scripts/common/CommDef';
	import BLDef from 'scripts/common/BLDef';
	import CommonService from 'scripts/businessLogic/commonService';
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService';
	import LoginService from 'scripts/businessLogic/loginService';
	import SignalRService from 'scripts/common/SignalRService';
	import CommUtility from 'scripts/common/CommUtility';

	import mainHeader from '@/components/mobile/sub/mainHeader';
	import userAgreementModal from '@/components/mobile/sub/register/userAgreementModal';

	export default {
		data() {
			return {
				HeaderTitle: '注册',
				Reg: Regex.Regex, // 正則表達式類別
				AuthImg: '', // 驗證碼
				RegistObj: {}, // 登入資料物件
				AcctAvailable: true, // 驗證帳號是否重複
				// 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
		},
		created: function() {
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.GetMemberInfo()
				})
			},
			//获取用户信息
			GetMemberInfo: async function() {
				EventBus.$emit('GlobalLoadingTrigger', true)
				const data = await CommonService.Comm_GetMemberInfo();
				EventBus.$emit('GlobalLoadingTrigger', false)
				if(data.Data && data.Data.Member) {
					this.RegistObj = data.Data.Member;
					let WXobj = null
					if(localStorage.getItem('WXobj')) {
						WXobj = JSON.parse(localStorage.getItem('WXobj'))
						if(WXobj && WXobj.Name) {
							this.RegistObj.Name = WXobj.Name
						}
					}
					console.log(this.RegistObj);
				}
			},
			// 提交註冊申請
			SumbitRegist: async function() {
				// 是否通過各種欄位驗證
				const validateConfirm = await this.validate();
				if(!validateConfirm || !this.AcctAvailable || !this.RegistObj.CheckedAgree) {
					return;
				} // end if

				// 處理中則直接返回
				if(this.tempObj === true) {
					return;
				} // end if     
				this.tempObj = true;

				// 註冊資料物件
				const DataObj = {
					WGUID: BLDef.WGUID,
					ChangePwdInfo: {
						NewPwd: this.RegistObj.Pwd,
						ConfirmNewPwd: this.RegistObj.Pwd,
					}
				};

				// 註冊服務
				EventBus.$emit('GlobalLoadingTrigger', true);
				const retData = await PersonalCenterService.WeChat_OpenPlatForm(DataObj);
				EventBus.$emit('GlobalLoadingTrigger', false);
				// 錯誤訊息物件
				const notifyData = {
					NotifyMessage: retData.Message
				};

				if(retData.Ret == 0) {
					// 成功
					EventBus.$emit('SHOW_TIP', "开通成功"); //复制成功提示
					var that = this
					setTimeout(function() {
						that.$router.push({
							name: 'index'
						}); //登录成功 跳转首页
					}, 1500)

				} else if(retData.Ret === BLDef.ErrorRetType.COMM_VERIFY_CODE_INCORRECT) {
					// 驗證碼錯誤              
					this.tempObj = false;
					this.RegistObj.Pwd = '';
					this.$validator.reset();
					EventBus.$emit('showNotifyMessage', notifyData);
				} else {
					// 失敗            
					this.tempObj = false;
					this.RegistObj.Pwd = '';
					this.$validator.reset();
					EventBus.$emit('showNotifyMessage', notifyData);
				} // end if
			}, // end SumbitRegist

			// 所有欄位驗證
			validate: function() {
				Object.keys(this.fields).forEach(key => {
					this.fields[key].touched = true;
				});
				return this.$validator.validateAll().then(result => {
					return result;
				});
			}, // end validate

			// 登出
			Logout: async function() {
				// 移除登入相關資料
				localStorage.removeItem('logoutTime');
				localStorage.removeItem('Token');
				localStorage.removeItem('WXobj');
				localStorage.removeItem('Auth');

				const inputObj = {
					LogoutInfo: {}
				};
				EventBus.$emit('GlobalLoadingTrigger', true);
				await LoginService.LogOut(inputObj);
				EventBus.$emit('GlobalLoadingTrigger', false);
				EventBus.$emit('SHOW_TIP', "开通成功，正在前往登录"); //调用父级方法

				// 若沒接收到signalr斷線訊息，則3秒後自行斷線
				setTimeout(function() {
					// 斷Signalr連線
					SignalRService.DisConnectServer();
					window.location.href = '/login'; //跳转登录页面
				}, 3000);
			},
		},
		components: {
			mainHeader,
			userAgreementModal,
		},
	}
</script>