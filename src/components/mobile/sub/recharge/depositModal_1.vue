<template>
	
	<!-- 充值弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="depositModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">充值金币</h4>
		          	</div>
	            	<div class="modal-body">  
						<form class="withdrawal-form" novalidate="novalidate">
							<div class="card-list">
								<ul>
									<li :class="PostDepositData.PType == '2'?'active':''" @click="ChangeRechargeType('2')">
										<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/banklogo/IC0.png'" />
										微信支付 <i>默认</i>
										<em class="icon-slider-active"></em>
									</li>
									<li :class="PostDepositData.PType == '1'?'active':''" @click="ChangeRechargeType('1')">
										<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/banklogo/IC21.png'" />
										<em class="icon-slider-active"></em>
									</li>
								</ul>
							</div>
							<!--<div class="row">
								<a class="btn btn-gold btn-light-gold" data-toggle="modal" data-target="#addCardModal">增加银行卡</a>
							</div>-->
							<div class="row top-line">
								<input type="text" :placeholder="'每笔金额最低' + CurrentPageData.VMinLimitAmt + ',最高' + CurrentPageData.VMaxLimitAmt"
                                    v-model="PostDepositData.Amount"
                                    v-validate="{ rules: { regex:Reg.MoneyAmount, between:[CurrentPageData.MinLimitAmt, CurrentPageData.MaxLimitAmt], required: true }}"
                                    name="DepositAmount"
                                    id="DepositAmount"
                                    class="form-control"
                            	/>
								<em for="DepositAmount" class="icon-input-clean"></em>
								<!--欄位錯誤顯示-->
			                    <p class="error-tip" v-show="errors.has('DepositAmount') && fields.DepositAmount.touche">
			                    	仅可以使用正整数, 数字范围{{CurrentPageData.VMinLimitAmt}}-{{CurrentPageData.VMaxLimitAmt}}
			                    </p>
							</div>
							<div class="row">
								<a @click="CheckFormData()" class="btn btn-gold">提&emsp;交</a>
								<a class="btn btn-gray" data-dismiss="modal">取&emsp;消</a>
							</div>
						</form>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <!--<div class="modal-footer-close" data-dismiss="modal" ></div>-->
		</div>
	</div>
	
</template>

<script>
	import EventBus from 'scripts/common/EventBus'
    import Regex from 'scripts/common/CommDef'
    import BLDef from 'scripts/common/BLDef'
    import URLService from 'scripts/common/URLService'
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService'
    
	export default {
		data() {
			return {
				Submitted: false,
                RechargeTypeFlag: 'WxPay',	// 紀錄類型旗標，默认微信支付
                Reg: Regex.Regex,
                CurrentPageData: {},
                PostDepositData: {
                    PType: '2',				// 紀錄類型旗標，默认微信支付
                    BankCode: undefined,
                    Amount: ''
                },
                // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
        },
		created: function() {
			this.GetPageData();
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					//输入框清空
					$('.icon-input-clean').click(function(){
						var that = $(this);
						var id = that.attr("for");
						$("#"+id).val('');
					});
				})
			},
			// 取得頁面資料
            GetPageData: async function () {
                const data = await PersonalCenterService.OnlinePaymentDeposit_LoadMainPage();
                if (data.Ret == 0 ) {                    
                    this.CurrentPageData = data.Data;
                }
            },
			// 切換充值類型
            ChangeRechargeType: function (flag) {
                this.PostDepositData.PType = flag;                     
            }, // end ChangeQueryType
            
			// 檢查存款資料並開新視窗
            CheckFormData: async function () {
                this.Submitted = true;
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });

                const result = await this.$validator.validateAll();

                if (result === false) {
                    return;
                }

                const inputObj = this.PostDepositData;
                
                console.log(inputObj);

                const paymentData = URLService.GetUrlParameterFromObj(inputObj);

                const HashKey = new Date().getTime();
                localStorage.setItem(HashKey.toString(), paymentData);
                
//              this.$router.push( { name: 'depositPayment', params: { Data: URLService.GetUrlParameterFromObj(HashKey.toString()) } });
            },
		},
	}
</script>

