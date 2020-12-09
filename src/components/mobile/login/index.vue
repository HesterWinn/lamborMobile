<template>
	<div>
		<!--头部-->
		<main-header :HeaderTitle="this.HeaderTitle"></main-header>
		
		<!-- 内容 -->
		<section class="msg-wrap login-wrap">
			<article>
				<div class="logo">
					<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/login/logo.png'" />
				</div>
            	<form class="login-form">
					<div class="row">
						<em class="icon-user"></em>
						<input type="text" class="form-control" placeholder="请输入帐号" name="Acct"
		                            v-model="LoginObj.Acct"
		                            v-validate="{ rules: { regex:Reg.Account, required: true }}"
		                            />
					</div>
					<div class="row">
						<em class="icon-psw"></em>
						<input type="password" class="form-control" placeholder="请输入密码"name="Pwd"
                                    v-model="LoginObj.Pwd"
                                    v-validate="{ rules: { regex:Reg.Password, required: true }}"
                                    />
					</div>
					<div class="row">
						<em class="icon-scan"></em>
						<input type="text" class="form-control input-scan" placeholder="请输入验证码" name="VCodeImg"
                                    v-model="LoginObj.VCodeImg"
                                    v-validate="{ rules: { regex:Reg.VCode , required: true }}"
                                    />
                        <a class="img-scan" v-on:click="GetAuthCode()">
                        	<img v-bind:src="AuthImg" />
                        </a>
						<p class="error-tip" v-if="errors.has('Acct') && fields.Acct.touched">
							* 仅可以使用英文字母,数字, 字数范围4-12
						</p>
						<p class="error-tip" v-else-if="errors.has('Pwd') && fields.Pwd.touched">
							* 仅可以使用英文字母,数字与一般常用符号, 字数范围6-20
						</p>
						<p class="error-tip" v-else-if="errors.has('VCodeImg') && fields.VCodeImg.touched">
							* 验证码错误
						</p>
						<p id="errorTip" class="error-tip"></p>
					</div>
					<div class="row">
						<a class="btn btn-gold" @click="LoginSubmit()" >登&emsp;录</a>
						<router-link :to="{name: 'register'}" class="btn btn-purple">注&emsp;册</router-link>
						<!--<a class="btn btn-wx" @click="WxLoginSubmit()"><em class="icon-wx"></em>微信登录</a>-->
					</div>
				</form>
			</article>
		</section>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/login/index.less';
</style>
<script>
	import EventBus from 'scripts/common/EventBus';
    import Regex from 'scripts/common/CommDef';
    import BLDef from 'scripts/common/BLDef';
    import LoginService from 'scripts/businessLogic/loginService';
    import CommUtility from 'scripts/common/CommUtility';
    
	import mainHeader from '@/components/mobile/sub/mainHeader';
	
	export default {
		data() {
			return {
                HeaderTitle: '登录',
                
		        // 正則表達式類別
		        Reg: Regex.Regex,
		
		        // 驗證碼
		        AuthImg: '/static/images/mobile/common/load1.gif',
		
		        // 登入資料物件
		        LoginObj: {
		            Acct: '',
		            Pwd: '',
		            VCodeImg: undefined,
		        },
		
		        // PreToken
		        PreToken: '',
		
		        // 驗證碼顏色設定
		        RGB: {
		            R: 255,
		            G: 200,
		            B: 255,
		        },
		        // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
        },
		created: function() {
			this.GetPreToken();
		},
		methods: {
			// 獲取PreToken
		    GetPreToken: async function () {
		      const obj = { WGUID: BLDef.WGUID };
		      const retData = await LoginService.LoadPage(obj);
		      if (retData !== '') {
		          this.PreToken = retData;          
		          this.GetAuthCode();
		      }
		    }, // end GetPreToken
		    
			// 取得驗證碼
		    GetAuthCode: async function () {
		        /* eslint-disable camelcase */
		        const VCode_CharacterRGB = this.RGB;
		        const RGBData = {
		            VCode_CharacterRGB,
		        };
		        const retData = await LoginService.ReGenVCode(RGBData, this.PreToken);
		        this.AuthImg = retData;
		    }, // end GetAuthCode
		    
			// 登入
		    LoginSubmit: async function () {
		        this.flag = await this.validate();
		
		        // 處理中則直接返回
		        if (this.tempObj === true) {
		            return;
		        } // end if
		        this.tempObj = true;
		
		        if (this.flag === true) {
		            const dataObj = { LoginData: {}, WGUID: '' };
		            dataObj.LoginData = this.LoginObj;
		            dataObj.WGUID = BLDef.WGUID;
		            EventBus.$emit('GlobalLoadingTrigger', true);
		            const retData = await LoginService.LoginConfirm(this.PreToken, dataObj);
		            EventBus.$emit('GlobalLoadingTrigger', false);
		
		            // 失敗
		            if (retData.Ret !== 0) {
		                const notifyData = {
		                    NotifyMessage: retData.Message
		                };
		                EventBus.$emit('showNotifyMessage', notifyData);
		
		                // 針對錯誤重置欄位
		                switch (retData.Ret) {
		                    // 驗證碼錯誤
		                    case 30:
		                        this.LoginObj.VCodeImg = '';
		                        this.$validator.reset();
		                        break;
		                    default:
		                        this.LoginObj.Acct = '';
		                        this.LoginObj.Pwd = '';
		                        this.LoginObj.VCodeImg = '';
		                        this.$validator.reset();
		                        break;
		                } // end switch
		
		                this.GetAuthCode();
		                this.tempObj = false;
		            } else {
		                localStorage.setItem('Token', retData.Data.LoginData.Token)
		                localStorage.setItem('Auth', retData.Data.LoginData.Auth)
		                localStorage.setItem('Acct', retData.Data.LoginData.Acct)
		                localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000))
		                EventBus.$emit('afterLogin')
		                this.GetBalance()
		                
//		                EventBus.$emit('SHOW_TIP', "登录成功"); //登录成功提示
//						this.$router.push({ name: 'member', params: { loginscss: '1' }}); //登录成功 跳转个人中心
						this.$router.push({ name: 'index'}) //登录成功 跳转首页
		                this.tempObj = false;
		            }
		        } else {
		            this.tempObj = false;
		        } // edn if
		    }, // end  LoginSubmit
		
		    // 所有欄位驗證
		    validate: function () {
		        Object.keys(this.fields).forEach(key => {
		                    this.fields[key].touched = true;
		                });
		        return this.$validator.validateAll().then(result => {
		            return result;
		        });
		    }, // end validate
		    
		    // 微信登录
		    WxLoginSubmit: async function () {
//		    	const code = await LoginService.GetWxCode()
	            const dataObj = {
	            	LoginData:{
	            		Code:'011HZ9mr0G4yOe1Fjemr04r9mr0HZ9m1',
	            		DomainLink:'KSOabhSvbyjtc_LTUCadog==',
//	            		Code: code,
	            		WGUID: ''
	            	}, WGUID: '' 
	            };
	            dataObj.WGUID = dataObj.LoginData.WGUID = BLDef.WGUID
	            EventBus.$emit('GlobalLoadingTrigger', true)
	            const retData = await LoginService.WxLoginConfirm(this.PreToken, dataObj)
	            EventBus.$emit('GlobalLoadingTrigger', false)
	            
	            console.log(retData)
	            
	            // 失敗
	            if (retData.Ret !== 0) {
	                const notifyData = {
	                    NotifyMessage: retData.Message
	                };
	                EventBus.$emit('showNotifyMessage', notifyData)
	
	            } else {
	            	const LoginData = retData.Data.LoginData
	            	localStorage.setItem('Token', LoginData.Token)
	                localStorage.setItem('Auth', LoginData.Auth)
	                localStorage.setItem('Acct', LoginData.Acct)
	                localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000))
	                const WXobj = {
	                	AcctID: LoginData.AcctID,
	                	HeadImgUrl: LoginData.HeadImgUrl,
	                	Name: LoginData.Name
	                };
		            localStorage.setItem('WXobj', JSON.stringify(WXobj));
	                EventBus.$emit('afterLogin');
	                
					this.$router.push({ name: 'index'}) //登录成功 跳转首页
	            }
		    }, // end  WxLoginSubmit
		    //获取账户余额
		    GetBalance: async function () {
                const VBalance = await CommUtility.CalculateSummaryAmount()	//获取需要时间，提前获取保存至本地
                localStorage.setItem('VBalance', VBalance)
                EventBus.$emit('UpdateVBalance',VBalance)
            },
		},
		components: {
			mainHeader,
		},
	}
</script>