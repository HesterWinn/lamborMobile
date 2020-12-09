<template>
	
	<!-- 充值弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="withdrawalModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">提现</h4>
		          	</div>
	            	<div class="modal-body">  
						<form class="withdrawal-form">
							<div class="cord-section">
								<a class="btn btn-purple" data-toggle="modal" data-target="#codeModal">查看详情</a>
								<div class="row">
									<label>目标洗码量：<i class="color-success">{{RakeData.TargetRake}}</i></label>
								</div>
								<div class="row">
									<label>当前洗码量：<i v-if="RakeData.IsRakeReached===false"class="color-orange">{{RakeData.CurrRake}}【未达标】</i>
													<i v-else class="color-orange">{{RakeData.CurrRake}}</i>
									</label>
								</div>
								<div class="row">
									<p  v-if="RakeData.IsRakeReached===false" 
										class="error-tip">(您当前洗码量未达标，取款会产生最高{{RakeData.VAdminFeeRatio}}的取款 手续费)</p>
								</div>
							</div>
							<div class="card-list" v-if="WithdrawData.IsBankInfoSet===true && BankData.BankName != ''">
								<ul>
									<li class="active">
										<!--<img src="/static/images/mobile/banklogo/IC4.jpg'" />-->
										{{BankData.BankName}}&emsp;{{BankData.BankAcct1}}&emsp;{{BankData.CardName}}
										<em class="icon-slider-active"></em>
									</li>
								</ul>
							</div>
							<div class="row">
								<a class="btn btn-gold btn-light-gold" @click="BindaddCard()">增加银行卡</a>
							</div>
							<div id="PersonalWithdrawForm" name="PersonalWithdrawForm">
								<!-- 完善银行信息 -->
								<div v-if="!WithdrawData.IsBankInfoSet || WithdrawData.IsBankInfoSet===false">
									<a class="btn btn-gray" data-dismiss="modal">取&emsp;消</a>
									<p class="error-tip">您尚未填写银行卡信息，请先完善信息资料，再行取款。</p>
								</div>
									
								<!-- 取款申请 -->
								<div v-if="WithdrawData.IsBankInfoSet===true">
									<div class="row top-line">
										<input type="text" class="form-control" 
												name="WithdrawApplyAmt"
												:placeholder="'每笔金额最低' + RealVMinLimit + ',最高' + RealVMaxLimit"
			                                    v-model="ApplyAmount"
			                                    v-validate="{ rules: { regex:Reg.MoneyAmount, between:[RealMinLimit, RealMaxLimit] , required: true }}" />
			                            <p class="error-tip" v-show="errors.has('WithdrawApplyAmt') && fields.WithdrawApplyAmt.touched">仅可以使用正整数, 数字范围{{RealVMinLimit}}-{{RealVMaxLimit}}</p>
										<!--<input id="amount1" type="text" class="form-control" placeholder="请输入金额" />-->
										<em @click="ApplyAmount = ''" class="icon-input-clean"></em>
									</div>
									<div class="row">
										<a class="btn btn-gold" @click="WithdrawNextStep();">提&emsp;交</a>
										<a class="btn btn-gray" data-dismiss="modal">取&emsp;消</a>
									</div>
								</div>
							</div>
						</form>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <!--<div class="modal-footer-close" data-dismiss="modal" ></div>-->
		</div>
		
		<!-- 输入取款密码 -->
		<psw-modal :ApplyAmount="this.ApplyAmount"></psw-modal>
		
		<!-- 洗码量详情 -->
		<code-modal :DepositHistoryData="this.DepositHistoryData"></code-modal>
		
		<!-- 添加银行卡弹窗 -->
		<add-card-modal :BankInfo="this.BankInfo" v-if="this.BankInfo"></add-card-modal>
		
		<!-- 设置取款密码弹窗 -->
		<withdrawal-psw-modal></withdrawal-psw-modal>
	</div>
	
</template>

<script>
	import Vue from 'vue'
	import Regex from 'scripts/common/CommDef'
    import EventBus from 'scripts/common/EventBus'
    import CommUtility from 'scripts/common/CommUtility'
	import BLDef from 'scripts/common/BLDef'
	import pswModal from '@/components/mobile/sub/recharge/pswModal'
	import codeModal from '@/components/mobile/sub/recharge/codeModal'
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService'
	import addCardModal from '@/components/mobile/sub/recharge/addCardModal'
	import withdrawalPswModal from '@/components/mobile/sub/recharge/withdrawalPswModal'
	
	export default {
		data() {
            return {
                RakeData: {},
                DepositHistoryData: {},
                WithdrawData: {},
                Reg: Regex.Regex,
                ApplyAmount: undefined,
                RealMinLimit: undefined,
                RealVMinLimit: undefined,
                RealMaxLimit: undefined,
                RealVMaxLimit: undefined,
                BankInfo:undefined,
                BankData: {					//银行卡信息
                    CardName: '',
                    BankName: '',
                    BranchName: '',
                    BankAcct: '',
                    Province: {},
                    Town: {},
                    Dist: {},
                },
            };
        },
		created: function() {
			this.Load()
			this.LoadRakeData()
			this.GetWithdrawData()
			this.getBankInfo()
			
			// 更新银行卡信息
			EventBus.$on('UpdateBankData', data => {
                this.GetWithdrawData()
				this.getBankInfo()
            });
		},
		mounted: function () {
            CommUtility.BindEnterTrigger('PersonalWithdrawForm', this.WithdrawNextStep);
        },
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.ModalHeight()
				})
			},
			//弹窗高度
			ModalHeight: function(){
				//充值
				$('#pswModal').on('show.bs.modal', function () {
		            $("#withdrawalModal").css('display', 'none');
		            $(this).css('display', 'block'); 
		            var ModalHeight=$(window).height() / 2 - $('#pswModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
				//设置取款密码
				$('#withdrawalPswModal').on('show.bs.modal', function () {
		            $("#withdrawalModal").css('display', 'none');
		            $(this).css('display', 'block'); 
		            var ModalHeight=$(window).height() / 2 - $('#withdrawalPswModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
				//洗码量详情
				$('#codeModal').on('show.bs.modal', function () {
		            $("#withdrawalModal").css('display', 'none');
		            $(this).css('display', 'block'); 
		            var ModalHeight=$(window).height() / 2 - $('#codeModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
			},
			// 載入洗碼量資料
            LoadRakeData: async function () {
                const inputObj = {
                    WGUID: BLDef.WGUID,
                    PagingInfo: {
                        PageNo: -1,
                        PageSize: -1
                    }
                };
                EventBus.$emit('GlobalLoadingTrigger', true)
                const data = await PersonalCenterService.WithdrawApply_GetRakeAmtInfo(inputObj);
                EventBus.$emit('GlobalLoadingTrigger', false)
                if (data.Ret === 0) {
                    this.RakeData = data.Data;
                    this.DepositHistoryData = this.RakeData;
                }
            },
            GetWithdrawData: async function () {
            	EventBus.$emit('GlobalLoadingTrigger', true)
                const data = await PersonalCenterService.WithdrawApply_GetWithdrawLimitInfo();
                EventBus.$emit('GlobalLoadingTrigger', false)
                
                console.log(data)
                if (data.Ret === 0) {
                    this.WithdrawData = data.Data;      
                    this.RealMinLimit = this.WithdrawData.MinLimitAmt;
                    this.RealVMinLimit = this.WithdrawData.VMinLimitAmt;                    
                    if (this.WithdrawData.CurrBalance < this.WithdrawData.MaxLimitAmt && this.WithdrawData.CurrBalance > this.WithdrawData.MinLimitAmt) {
                        this.RealMaxLimit = this.WithdrawData.CurrBalance;
                        this.RealVMaxLimit = this.WithdrawData.VCurrBalance;
                    } else {
                        this.RealMaxLimit = this.WithdrawData.MaxLimitAmt;
                        this.RealVMaxLimit = this.WithdrawData.VMaxLimitAmt;
                    }
                }
            },
            //提现
            WithdrawNextStep: async function () {
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });
                const result = await this.$validator.validateAll();
                if (result === false) {
                    return;
                }
                $('#pswModal').modal('show');
                EventBus.$emit('withdrawalPwdWindowTrigger', this.WithdrawData.WithdrawPwdErrCnt);
            },
            // 获取银行卡信息 / 省市级
            getBankInfo: async function () {
            	EventBus.$emit('GlobalLoadingTrigger', true)
                this.BankInfo = await PersonalCenterService.BankInfo_LoadMainPage();
                EventBus.$emit('GlobalLoadingTrigger', false)
                console.log(this.BankInfo)
                // 银行卡信息
				if(this.BankInfo.Data){
					this.BankData = Vue.util.extend({}, this.BankInfo.Data.BankAcct)
					this.BankData.BankAcct1 = this.BankData.BankAcct.replace(this.Reg.RegBankAcct, "$1****$2")
				}
			},
			//添加银行卡
			BindaddCard: function(){
				let WXobj = null
				if(localStorage.getItem('WXobj')) {
					console.log(localStorage.getItem('WXobj'))
					WXobj = JSON.parse(localStorage.getItem('WXobj'))
					if(WXobj && WXobj.Name) {			//是否微信登录
						if(WXobj.BankCardAdded){		//已设置取款密码
							$('#addCardModal').modal('show')
						}else{							//未设置取款密码
							$('#withdrawalPswModal').modal('show')
						}
					}else{		//账号登录已设置取款密码，打开添加银行卡
						$('#addCardModal').modal('show')
					}
				}else{
					$('#addCardModal').modal('show')
				}
			}
		},
		components: {
			pswModal,
			codeModal,
			addCardModal,
			withdrawalPswModal,
		},
		beforeDestroy() {
            EventBus.$off('UpdateBankData');
        }
	}
</script>

