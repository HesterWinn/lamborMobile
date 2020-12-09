<template>
	<div>
		<!-- 充值弹窗 -->
		<div class="mob-wrap">
			<div class="modal modal-shadow fade" id="depositModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content modal-theme-black">
						<div class="modal-header">
							<h4 class="modal-title">充值金币</h4>
						</div>
						<!--<ul class="tab-head">
							<li :class="ModifyType===2 ?'active':''" @click="SwitchMode(2)">在线支付</li>
							<li :class="ModifyType===4 ?'active':''" @click="SwitchMode(4)">公司入款</li>
						</ul>-->
						<div class="modal-body">
							<form class="withdrawal-form" novalidate="novalidate">
								<div class="active-list">
									<p>根据您的账户实际情況，系统为您推荐以下最优活动选择：</p>
									<ul>
										<li v-if="Activity" v-for="Item in this.ActivityList" :key="index" :class="Item.PKID == Activity.PKID?'active':''" @click="ChangeActiveType(Item)">
											<img :src="ResourceURL + Item.HtmlSmallImgUrl" />
											<em class="icon-slider-active"></em>
										</li>
									</ul>
								</div>
								<div class="card-list">
									<ul>
										<li :class="PostDepositData.PType == '2'?'active':''" @click="ChangeRechargeType('2')">
											<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/banklogo/IC0.png'" /> 微信支付 <i>默认</i>
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
									<input v-if="CurrentPageData.VMinLimitAmt" type="text" :placeholder="'每笔金额最低' + CurrentPageData.VMinLimitAmt + ',最高' + CurrentPageData.VMaxLimitAmt" v-model="PostDepositData.Amount" v-validate="{ rules: { regex:Reg.MoneyAmount, between:[CurrentPageData.MinLimitAmt, CurrentPageData.MaxLimitAmt], required: true }}" name="DepositAmount" class="form-control" />
									<input v-else type="text" placeholder="请输入充值金额" v-model="PostDepositData.Amount" v-validate="{ rules: { regex:Reg.MoneyAmount, between:[CurrentPageData.MinLimitAmt, CurrentPageData.MaxLimitAmt], required: true }}" name="DepositAmount" class="form-control" />
									<em @click="PostDepositData.Amount = ''" class="icon-input-clean"></em>
									<!--欄位錯誤顯示-->
									<p class="error-tip" v-show="errors.has('DepositAmount') && fields.DepositAmount.touche">
										仅可以使用正整数, 数字范围{{CurrentPageData.VMinLimitAmt}}-{{CurrentPageData.VMaxLimitAmt}}
									</p>
								</div>
								<div class="row">
									<!--<a @click="CheckFormData()" class="btn btn-gold">提&emsp;交</a>-->
									<a @click="depositSubmit()" class="btn btn-gold">提&emsp;交</a>
									<a class="btn btn-gray" data-dismiss="modal">取&emsp;消</a>
								</div>
							</form>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
				<!--<div class="modal-footer-close" data-dismiss="modal" ></div>-->
			</div>
		</div>

	</div>

</template>

<script>
	import BLDef from 'scripts/common/BLDef'
	import EventBus from 'scripts/common/EventBus';
	import Regex from 'scripts/common/CommDef';
	import URLService from 'scripts/common/URLService';
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService';

	export default {
		data() {
			return {
				BLDef: BLDef,
				ModifyType: 2, //tab类型
				Submitted: false,
				RechargeTypeFlag: 'WxPay', // 紀錄類型旗標，默认微信支付
				Reg: Regex.Regex,
				CurrentPageData: {},
				PostDepositData: {
					AType: '2', // 紀錄活动
					PType: '2', // 紀錄類型旗標，默认微信支付
					BankCode: undefined,
					Amount: ''
				},
				Activity: undefined,
				ActivityList: undefined, //活动列表
				// 資源位置
        ResourceURL: BLDef.ResourceURL,
        ResourceCDN: BLDef.ResourceCDN,
			};
		},
		created: function() {
			this.GetDepositData()
		},
		methods: {
			// tab 切换
			SwitchMode: function(mode) {
				this.ModifyType = mode;
			},
			// 取得最佳存款优惠
			GetDepositData: async function() {
				const data = await PersonalCenterService.Deposit_LoadMainPage();
				console.log(data.Data);
				if(data.Ret !== 0) {
					return;
				}
				this.ActivityList = data.Data.OnlineDepositActivityList // 初始获得在线支付的优惠活动
				if(this.ActivityList.length > 0) {
					this.Activity = this.ActivityList[0] //默认选择第一个
				}
				for (let i = 0; i < this.ActivityList.length; i++) {
            // 类型为红利设定
            if (this.ActivityList[i].ActivityType == BLDef.BonusWayType.DEPOSIT) {
                const DespTxt = this.ActivityList[i].ActType == 1 ? '首存返利充100送' : '续存返利充100送';
                this.ActivityList[i].Name = DespTxt + this.ActivityList[i].VBonusRatio;
                this.ActivityList[i].HtmlSmallImgUrl = this.ActivityList[i].ActType == 1 ? '/static/images/mobile/promotion/activity_img1.jpg' : '/static/images/mobile/promotion/activity_img2.jpg';
            }
            // 赋予UniqueID
            this.ActivityList[i].PKID = '1_' + this.ActivityList[i].ActivityType + '_' + this.ActivityList[i].BonusSerialNo;
            console.log(this.ActivityList[i].PKID);
        }
				console.log(this.ActivityList)
				this.GetPageData()
			},
			// 取得頁面資料
			GetPageData: async function() {
				EventBus.$emit('GlobalLoadingTrigger', true)
				const data = await PersonalCenterService.OnlinePaymentDeposit_LoadMainPage(this.Activity);
				EventBus.$emit('GlobalLoadingTrigger', false)
				if(data.Ret == 0) {
					this.CurrentPageData = data.Data;
				}
				console.log(data)
			},
			// 切換充值類型
			ChangeRechargeType: function(flag) {
				this.PostDepositData.PType = flag;
			}, // end ChangeQueryType

			// 切換活动
			ChangeActiveType: function(flag) {
				this.Activity = flag
			}, // end ChangeQueryType

			// 檢查存款資料並開新視窗
			CheckFormData: async function() {
				this.Submitted = true;
				Object.keys(this.fields).forEach(key => {
					this.fields[key].touched = true;
				});

				const result = await this.$validator.validateAll();

				if(result === false) {
					return;
				}

				const inputObj = this.PostDepositData;

				console.log(inputObj);

				const paymentData = URLService.GetUrlParameterFromObj(inputObj);

				const HashKey = new Date().getTime();
				localStorage.setItem(HashKey.toString(), paymentData);

				//              this.$router.push( { name: 'depositPayment', params: { Data: URLService.GetUrlParameterFromObj(HashKey.toString()) } });
			},
			depositSubmit: function() {
				const notifyData = {
					NotifySubTitle: '温馨提示：',
					NotifySubMessage: '当前金流商系统维护中,充值功能暂不可 用，具体维护时间请留意系统公告！'
				};
				EventBus.$emit('showWarnTip', notifyData);
			},
		},
	}
</script>