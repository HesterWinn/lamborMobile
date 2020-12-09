<template>
	<div>
		<!--头部-->
		<main-header :HeaderTitle="this.HeaderTitle"></main-header>
		
		<!-- 内容 -->
		<section class="msg-wrap register-wrap">
			<article>
				<div class="logo">
					<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/register/logo.png'" />
					<h2>填写注册资料</h2>
				</div>
            	<form class="addcard-form" novalidate="novalidate">
            		<div class="row input-group">
						<label>账&emsp;&emsp;户</label>
						<input class="form-control"
							type="text" placeholder="请输入您的登录账号" name="Acct" 
	                        v-model="RegistObj.Acct"  
	                        required 
	                        v-validate="{ rules: { regex:Reg.Account, required: true }}"                               
	                        @blur="CheckAccountAvailable()"/>
					</div>
					<div class="row input-group">
						<label>手&emsp;&emsp;机</label>
						<input class="form-control"
							placeholder="请输入手机号码" name="PhoneNo"                        
	                        v-model="RegistObj.PhoneNo" 
	                        v-validate="{ rules: { regex:Reg.PhoneNo, required: true }}" />
					</div>
					<div class="row input-group">
						<label>登录密码</label>
						<input class="form-control"
							type="password" id="Pwd"                               
	                        name="Pwd" 
	                        v-model="RegistObj.Pwd" 
	                        v-validate="{ rules: { regex:Reg.Password, required: true }}"                               
	                        placeholder="请输入6-20个字符的登录密码" />    
					</div>
					<div class="row input-group">
						<label>确认密码</label>
						<input type="password" class="form-control"
							name="CheckPwd"       
	                        v-model="RegistObj.CheckPwd" 
	                        v-validate="{ rules: { regex:Reg.Pwd, required: true , 'is': RegistObj.Pwd}}"                                 
	                        placeholder="请再次确认密码" />  
					</div>
					<div class="row input-group">
						<label>取款密码</label>
						<input type="password" class="form-control"
	                        name="WithdrawPwd"   
	                        v-model="RegistObj.WithdrawPwd" 
	                        v-validate="{ rules: { regex:Reg.WithdrawPwd, required: true }}"                                                                                                          
	                        placeholder="请输入六位取款密码" />
					</div>
					<div class="row input-group">
						<label>确认密码</label>
						<input type="password" class="form-control"
							name="CheckWithdrawPwd"  
	                        v-model="RegistObj.CheckWithdrawPwd" 
	                        v-validate="{ rules: { regex:Reg.WithdrawPwd, required: true , 'is': RegistObj.WithdrawPwd}}"                                                                      
	                        placeholder="请确认取款密码" />
					</div>
					<div class="row input-group">
						<label>验 证 码</label>
						<input type="text" class="form-control input-scan"
							name="AuthCode"
	                        v-model="RegistObj.AuthCode" 
	                        v-validate="{ rules: { regex:Reg.VCode, required: true }}"                                                       
	                        placeholder="不区分大小写" />
						<img class="img-scan" v-bind:src="AuthImg" v-on:click="GetAuthCode()" />
					</div>
					<div class="row checkbox-row">
						<input type="checkbox" id="check" class="form-checkbox" v-model="RegistObj.CheckedAgree" /><label for="check"></label>
						本人已阅读过<a href="#" data-toggle="modal" data-target="#userAgreementModal">《用户协议》</a>并同意其所示内容
					</div>
					<div class="row">
						<p class="error-tip"  v-if="errors.has('Acct') && fields.Acct.touched">
							* 仅可以使用英文字母,数字, 字数范围4-12
						</p>
						<p class="error-tip" v-else-if="!AcctAvailable">
							* 此账号已被使用
						</p>
						<p class="error-tip" v-else-if="errors.has('PhoneNo') && fields.PhoneNo.touched">
							* 请输入合法的手机号码
						</p>
						<p class="error-tip" v-else-if="errors.has('Pwd') && fields.Pwd.touched">
							* 仅可以使用英文字母,数字与一般常用符号, 字数范围6-20
						</p>
						<p class="error-tip" v-else-if="errors.has('CheckPwd') && fields.CheckPwd.touched">
							* 请重新填写与上面一致的密码！
						</p>
						<p class="error-tip" v-else-if="errors.has('WithdrawPwd') && fields.WithdrawPwd.touched">
							* 仅可以使用数字, 字数长度6
						</p>
						<p class="error-tip" v-else-if="errors.has('CheckWithdrawPwd') && fields.CheckWithdrawPwd.touched">
							* 请重新填写与上面一致的取款密码！
						</p>
						<p class="error-tip" v-else-if="errors.has('AuthCode') && fields.AuthCode.touched">
							* 验证码错误
						</p>
						<p class="error-tip" v-else-if="!this.RegistObj.CheckedAgree">
							* 请勾选同意条款!
						</p>
					</div>
					<div class="row">
						<a v-on:click="SumbitRegist()" class="btn btn-gold">提&emsp;交</a>
						<a class="btn btn-gray" href="#" onClick="javascript :history.back(-1);" >取&emsp;消</a>
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
	import CommService from 'scripts/businessLogic/commonService';
	import RegistService from 'scripts/businessLogic/registerService';
	import CommUtility from 'scripts/common/CommUtility';

	import mainHeader from '@/components/mobile/sub/mainHeader';
	import userAgreementModal from '@/components/mobile/sub/register/userAgreementModal';
	
	export default {
		data() {
			return {
                HeaderTitle: '注册',
		        Reg: Regex.Regex,   // 正則表達式類別
		        AuthImg: '',		// 驗證碼
		        RegistObj: {		// 登入資料物件
		            Acct: '',
		            PhoneNo: '',
		            Pwd: '',
		            VCodeImg: '',
		            CheckedAgree: false,
		        },
		        AcctAvailable: true,	// 驗證帳號是否重複
		        // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
        },
		created: function () {
	        this.GetAuthCode();     
	    },
		methods: {
			// 取得驗證碼
	        GetAuthCode: async function () {
	            /* eslint-disable camelcase */
	            const VCode_CharacterRGB = this.RGB;
	            const RGBData = {
	                VCode_CharacterRGB,
	            };
	            const retData = await CommService.VerifyCode_Gen(RGBData);            
	            this.AuthImg = retData.Data.VCode;
	            this.PreToken = retData.Data.ID;
	        }, // end GetAuthCode
	        
			// 驗證帳號是否重複
	        CheckAccountAvailable: async function () {
	            this.flag = !this.$validator.errors.has('Acct');  
	
	            if (this.flag && this.RegistObj.Acct.length > 0) {                
	                const obj = { 
	                    Acct: this.RegistObj.Acct,
	                    WGUID: BLDef.WGUID,
	                };                
	                const retData = await CommService.CheckAcctAvailable(obj);                
	                this.AcctAvailable = retData.IsAvailable;
	            } else {
	                this.AcctAvailable = true;
	            } // end if            
	        }, // end CheckAccountAvailable
	        
	        // 提交註冊申請
	        SumbitRegist: async function () {
	            // 是否通過各種欄位驗證
	            const validateConfirm = await this.validate();
	            if (!validateConfirm || !this.AcctAvailable || !this.RegistObj.CheckedAgree) {                  
	                return;
	            } // end if
	            
	            // 驗證帳號是否已被使用
	            await this.CheckAccountAvailable();
	            if (!this.AcctAvailable) {
	                return;
	            } // end if      
	            
	            // 處理中則直接返回
	            if (this.tempObj === true) {               
	                return;
	            } // end if     
	            this.tempObj = true;       
	            
	            // 註冊資料物件
	            const DataObj = {
	                VCodeID: this.PreToken,
	                VCode: this.RegistObj.AuthCode,
	                WGUID: BLDef.WGUID,
	                PromotionUrl: window.location.href.split('/').slice(0, 3).join('/'), // 完整DomainName含參數
                	PromotionInfo: this.$route.params.Data, // 上级代理 參數
	                Member: this.RegistObj
	            }; 
	            
	            // 註冊服務
	            EventBus.$emit('GlobalLoadingTrigger', true);
	            const retData = await RegistService.Regist(DataObj);
	            EventBus.$emit('GlobalLoadingTrigger', false);
	
	            // 錯誤訊息物件
	            const notifyData = {
	                    NotifyMessage: retData.Message
	            };
	
	            if (retData.Ret == 0) {
	                // 成功       
	                EventBus.$emit('afterLogin');         
	                localStorage.setItem('Token', retData.Data.LoginData.Token);
	                localStorage.setItem('Auth', retData.Data.LoginData.Auth);
	                localStorage.setItem('RegisterSuccess_Account', retData.Data.LoginData.Acct);
	                
	                EventBus.$emit('SHOW_TIP', "注册成功，正在登录"); //调用父级方法
	                // 成功並跳頁
	                this.$router.push({ name: 'index' } );
	            } else if (retData.Ret === BLDef.ErrorRetType.COMM_VERIFY_CODE_INCORRECT) {  
	                // 驗證碼錯誤              
	                this.tempObj = false;
	                this.RegistObj.AuthCode = '';
	                this.$validator.reset();                    
	                this.GetAuthCode();
	                EventBus.$emit('showNotifyMessage', notifyData);
	            } else {    
	                // 失敗            
	                this.tempObj = false;
	                this.RegistObj = {};
	                this.$validator.reset();                    
	                this.GetAuthCode();
	                EventBus.$emit('showNotifyMessage', notifyData);
	            } // end if
	        }, // end SumbitRegist
	
	        // 所有欄位驗證
	        validate: function () {
	            Object.keys(this.fields).forEach(key => {
	                    this.fields[key].touched = true;
	                });
	            return this.$validator.validateAll().then(result => {            
	                return result;
	            });   
	        }, // end validate
		},
		components: {
			mainHeader,
			userAgreementModal,
		},
	}
</script>