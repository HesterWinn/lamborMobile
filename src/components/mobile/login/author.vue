<template>
	<div class="LoadBox">
        <div class="author">
	  		<h5>授权中...</h5>
		</div>
    </div>
</template>

<script>
	import EventBus from 'scripts/common/EventBus';
    import Regex from 'scripts/common/CommDef';
    import BKBLDef from 'scripts/common/BLDef';
    import LoginService from 'scripts/businessLogic/loginService';
    import CommUtility from 'scripts/common/CommUtility';
    
	export default {
		data() {
			return {
				HeaderTitle: '登录',
			};
        },
		created: function() {
			this.WxLogin();
		},
		methods: {
			// 微信登录
		    WxLogin: async function () {
				const code = this.$route.query.code || ''	//微信code值
				if(code == ''){
		    		this.$router.push({ name: 'index'}) //非微信登录 跳转首页
		    		return;
				}
				
		    	const DomainLink = this.$route.params.DomainLink || ''	//微信DomainLink值
	            const dataObj = {
	            	LoginData:{
	            		DomainLink:DomainLink,
	            		Code: code,
	            		WGUID: ''
	            	}, WGUID: '' 
	            }
	            console.log(dataObj)
	            
	            dataObj.WGUID = dataObj.LoginData.WGUID = BKBLDef.WGUID
	            EventBus.$emit('GlobalLoadingTrigger', true)
	            const retData = await LoginService.WxLoginConfirm(this.PreToken, dataObj)
	            EventBus.$emit('GlobalLoadingTrigger', false)
	            
	            console.log(retData)
	            
	            // 失敗
	            if (retData.Ret !== 0) {
	                // const notifyData = {
	                //     NotifyMessage: retData.Message,
	                //     CloseFunction: this.CloseCurrentWindow
	                // };
					// EventBus.$emit('showWarnTip', notifyData);
					this.CloseCurrentWindow()
	            } else {
	            	const LoginData = retData.Data.LoginData
	            	localStorage.setItem('Token', LoginData.Token)
	                localStorage.setItem('Auth', LoginData.Auth)
	                localStorage.setItem('Acct', LoginData.Acct)
	                localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000))
	                const WXobj = {
	                	AcctID: LoginData.AcctID,
	                	HeadImgUrl: LoginData.HeadImgUrl,
	                	Name: LoginData.Name,
	                	AcctPwdEnabled: LoginData.AcctPwdEnabled,
	                	BankCardAdded: LoginData.BankCardAdded,
	                };
		            localStorage.setItem('WXobj', JSON.stringify(WXobj))
	                EventBus.$emit('afterLogin')
	                this.GetBalance()
	                
					this.$router.push({ name: 'index'}) //登录成功 跳转首页
	            }
		    }, // end  WxLoginSubmit
		    
		    // 關閉視窗
	        CloseCurrentWindow: function () {
				this.$router.push({ name: 'login'}); //登录成功 跳转首页
	        },
	        
	        //获取账户余额
		    GetBalance: async function () {
                const VBalance = await CommUtility.CalculateSummaryAmount()	//获取需要时间，提前获取保存至本地
                localStorage.setItem('VBalance', VBalance)
                EventBus.$emit('UpdateVBalance',VBalance)
            },
		},
	}
</script>