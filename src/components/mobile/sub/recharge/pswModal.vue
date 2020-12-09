<template>
	
	<!-- 充值弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="pswModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	    		<!-- 取款密码彈窗 -->
	            <div class="modal-content modal-theme-black">
	            	<div id="withdrawPwdForm">
	            		<div class="modal-header">
		            		<h4 class="modal-title">取款密码</h4>
			          	</div>
		            	<div class="modal-body">
							<form class="withdrawal-form">
								<div class="row top-line">
									<input type="password"  class="form-control"
										placeholder="请输入取款密码" name="WithdrawApplyWithdrawPwd"
	                                	v-model="WithdrawData.WithdrawPwd"
	                                	v-validate="{ rules: { regex:Reg.WithdrawPwd, required: true }}" />
	                                <em @click="WithdrawData.WithdrawPwd = ''" class="icon-input-clean"></em>
									<p class="error-tip" v-show="errors.has('WithdrawApplyWithdrawPwd') && fields.WithdrawApplyWithdrawPwd.touched">仅可以使用数字, 字数长度6</p>
									<p class="error-tip" v-show="CurrentWithdrawPwdErrCnt>0">*取款密码输入错误{{CurrentWithdrawPwdErrCnt}}次，错误3次时账户锁定</p>
									<p class="warn-tip">温馨提示：为了您的资金安全，忘记取款密码或取款密码输错3次以上，请联系在线客服处理，谢谢合作。</p>
								</div>
								<div class="row">
									<a v-on:click="SubmitWithdraw()" class="btn btn-gold">提&emsp;交</a>
									<a v-on:click="bindClose()" class="btn btn-gray">取&emsp;消</a>
								</div>
							</form>
			            </div>
	            	</div>
	            	<!-- 取款密码错误后弹出账户锁定 -->
			        <div id="pwdErrorForm" class="hide"> 
		            	<div class="modal-header">
		            		<h4 class="modal-title">账号锁定</h4>
			          	</div>
		            	<div class="modal-body">
							<p class="color-red">您的取款密码输入错误已3次，<br />取款功能已被锁定，请联系客服解锁</p>
							<a v-on:click="bindClose()" class="btn btn-gray">取&emsp;消</a>
			            </div>
			        </div>
		        </div>
		    </div>
		</div>
	</div>
	
</template>

<script>
	import Vue from 'vue';
    import CommUtility from 'scripts/common/CommUtility';
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
                CommUtility: CommUtility,
                Reg: Regex.Regex,
                ProcessingFlag: false,
                InitialFormData: undefined,
                WithdrawData: {
                    WithdrawPwd: ''
                },
                CurrentWithdrawPwdErrCnt: undefined
            };
        },
		created: function() {
			this.InitialFormData = Vue.util.extend({}, this.WithdrawData);
            const self = this;
            EventBus.$on('withdrawalPwdWindowTrigger', function (PwdErrCnt) {
                if (self.CurrentWithdrawPwdErrCnt === undefined) {
                    self.CurrentWithdrawPwdErrCnt = PwdErrCnt;
                }
                self.TriggerPwdWindow();
            });
		},
		mounted: function () {
            CommUtility.BindEnterTrigger('withdrawPwdForm', this.SubmitWithdraw);
        },
		methods: {
			//关闭取款密码
			bindClose: function() {
				$('#pswModal').modal("hide");
				$("#withdrawalModal").css('display', 'block');
			},
			// 取款密碼彈窗
            TriggerPwdWindow: function () {
                if (this.CurrentWithdrawPwdErrCnt >= 4) {
                    $('#pwdErrorForm').show();
                    $('#withdrawPwdForm').hide();
                } else {                                                  
                    this.ResetPwdForm();  
                    $('#withdrawPwdForm').show();
                    $('#pwdErrorForm').hide();
                }
            },
            // 發送取款申請
            SubmitWithdraw: async function () {
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });
                const result = await this.$validator.validateAll();
                if (result === false) {
                    return;
                }

                if (this.ProcessingFlag === true) {
                    return;
                }

                this.ProcessingFlag = true;
                this.WithdrawData.Amt = this.ApplyAmount;

                EventBus.$emit('GlobalLoadingTrigger', true);
                const data = await PersonalCenterService.WithdrawApply_Add(this.WithdrawData);
                EventBus.$emit('GlobalLoadingTrigger', false);
                
                this.ProcessingFlag = false;
                
                const notifyData = {
                    NotifyMessage: data.Message
                };

                if (data.Ret !== 0) {                        
                    // 取款密碼錯誤
                    if (data.Ret == BLDef.ErrorRetType.COMM_PWD_CONFIRM_FAIL) {
                        this.CurrentWithdrawPwdErrCnt = data.Data.PwdErrCnt;
                        if (data.Data.PwdErrCnt >= 3) {
                            this.ResetPwdForm();
                            $('#withdrawPwdForm').hide();
                            $('#pwdErrorForm').show();
                        }
                    } else { // 其他錯誤
                        this.ResetPwdForm();
                        $('#withdrawPwdForm').hide();
                        EventBus.$emit('showNotifyMessage', notifyData);
                        $('#pswModal').modal('hide');
                    }
                } else {
                    // 成功                    
                    this.ResetPwdForm();
                    $('#withdrawPwdForm').hide();
                    notifyData.NotifySubMessage = '您好，您的申请已经提交，我们会尽快处理，请耐心等待！';
                    notifyData.CloseFunction = this.WithdrawalReset;
                    EventBus.$emit('showNotifyMessage', notifyData);
                    $('#pswModal').modal('hide');
                }
            },
            // 重置取款密碼表單
            ResetPwdForm: function () {
                this.WithdrawData = Vue.util.extend({}, this.InitialFormData);
                this.$validator.reset();
            },
		},
		beforeDestroy() {
            EventBus.$off('withdrawalPwdWindowTrigger');
        }
	}
</script>

