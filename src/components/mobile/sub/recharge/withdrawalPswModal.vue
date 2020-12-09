<template>
	
	<!-- 充值弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="withdrawalPswModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	    		<!-- 取款密码彈窗 -->
	            <div class="modal-content modal-theme-black">
            		<div class="modal-header">
	            		<h4 class="modal-title">取款密码设置</h4>
		          	</div>
	            	<div class="modal-body">
						<form class="withdrawal-form">
							<!--<h5><em class="icon-success1"></em>绑定成功</h5>-->
							<!--<p class="warn-tip">恭喜，您的银行卡绑定成功，为了您的资金安全 请设置取款密码并妥善保管好取款密码!</p>-->
							<p class="warn-tip">为了您的资金安全，请设置取款密码并妥善保管好取款密码!</p>
							<div class="row">
                            	<input 
									type="password" name="NewPassword" class="form-control"
		                            v-model="PasswordObj.NewPassword"                            
		                            v-validate="{ rules: { regex:Reg.WithdrawPwd, required: true }}" 
		                            placeholder="请输入取款密码"
		                        />
                                <em @click="PasswordObj.NewPassword = ''" class="icon-input-clean"></em>
							</div>
							<div class="row">
                               	<input 
									type="password" name="ConfirmPassword" class="form-control"
	                                v-model="PasswordObj.ConfirmPassword"
	                                v-validate="{'required': 'true', 'is': PasswordObj.NewPassword}" 
	                                data-vv-name="ConfirmPassword"
	                                placeholder="请再次确认取款密码"                               
	                        	/>
                                <em @click="PasswordObj.ConfirmPassword = ''" class="icon-input-clean"></em>
								<p class="error-tip" v-show="errors.has('NewPassword') && fields.NewPassword.touched">仅可以使用数字, 字数长度6</p>
								<p class="error-tip" v-else-if="(errors.has('ConfirmPassword') && fields.ConfirmPassword.touched)"> * 两次输入密码不一致 </p>
							</div>
							<div class="row">
								<a v-on:click="SubmitWithdraw()" class="btn btn-gold">提&emsp;交</a>
								<a v-on:click="bindClose()" class="btn btn-gray">取&emsp;消</a>
							</div>
						</form>
		            </div>
		        </div>
		    </div>
		</div>
	</div>
	
</template>

<script>
	import Vue from 'vue';
    import BLDef from 'scripts/common/BLDef';
    import Regex from 'scripts/common/CommDef';
    import EventBus from 'scripts/common/EventBus';
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService';
    
	export default {
		props: {
            ApplyAmount: undefined
        },
        data() {
            return {
                Reg: Regex.Regex,
                PasswordObj: {},
            };
        },
		methods: {
            // 送出设置取款密碼
            SubmitWithdraw: async function () {
            	EventBus.$emit('showNotifyMessage', { NotifyMessage: '操作失败' })
            	return
                Object.keys(this.fields).forEach(key => {
					this.fields[key].touched = true;
				});
				const result = await this.$validator.validateAll()
				if(result === false || this.DropDownInvalid === true) {
					return;
				}
                const inputObj = {
                    CPType: 4,
                    ChangePwdInfo: {
                        OriginPwd: '',
                        NewPwd: this.PasswordObj.NewPassword,
                        ConfirmNewPwd: this.PasswordObj.ConfirmPassword
                    }
                };

                EventBus.$emit('GlobalLoadingTrigger', true);
                const data = await PersonalCenterService.ChangePassword_Mod(inputObj);
                EventBus.$emit('GlobalLoadingTrigger', false);

                const notifyData = {
                    NotifyMessage: data.Message
                };
                if (data.Ret === 0) {
                    notifyData.CloseFunction = this.ResetPwdForm;
                    EventBus.$emit('SHOW_TIP', notifyData.NotifyMessage); //修改成功提示
					$('#withdrawalPswModal').modal("hide");
					$("#withdrawalModal").css('display', 'block');
                } else {
                    // 顯示訊息彈窗                    
                    EventBus.$emit('showNotifyMessage', notifyData);
                }
            },
            // 清除畫面驗證與資料
            ResetPwdForm: function () {
                this.PasswordObj = {};
                this.$validator.reset();
            },
            //关闭取款密码
			bindClose: function() {
				$('#withdrawalPswModal').modal("hide");
				$("#withdrawalModal").css('display', 'block');
			},
		},
	}
</script>

