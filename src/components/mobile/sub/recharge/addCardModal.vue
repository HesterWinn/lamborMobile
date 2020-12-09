<template>

	<!-- 充值弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="addCardModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content modal-theme-black">
					<div class="modal-header">
						<h4 class="modal-title">添加银行卡</h4>
					</div>
					<div class="modal-body" id="bankInfoForm" name="bankInfoForm">
						<form class="addcard-form">
							<div class="row input-group">
								<label>用 户 名</label>
								<input type="text" class="form-control" name="CardName" placeholder="请输入持卡人姓名" v-model="BankData.CardName" v-validate="{ rules: { regex:Reg.NickName, required: true }}" />
							</div>
							<div class="row input-group">
								<label>银行卡号</label>
								<input type="text" class="form-control" name="BankAcct" v-model="BankData.BankAcct" v-validate="{ rules: { regex:Reg.BankAccount, required: true }}" placeholder="例：658525453658985" />
							</div>
							<div class="row input-group">
								<label>银行名称</label>
								<input type="text" class="form-control" name="BankName" placeholder="请输入银行名称" v-model="BankData.BankName" v-validate="{ rules: { regex:Reg.BankName, required: true }}" />
							</div>
							<div class="row input-group">
								<label>开 户 行</label>
								<p class="form-select icon">
									<select v-model="BankData.Province" @change="ChangeProvince">
										<option v-for="Province in ProvincesList" v-bind:value="Province">{{Province.Name}}</option>
									</select>
								</p>
								<p class="form-select icon ml-row">
									<select v-model="BankData.Town" @change="ChangeTown">
										<option v-for="Town in TownsList" v-bind:value="Town">{{Town.Name}}</option>
									</select>
								</p>
								<p class="form-select icon ml-row">
									<select v-model="BankData.Dist" @change="ChangeDist">
										<option v-for="Dist in DistsList" v-bind:value="Dist">{{Dist.Name}}</option>
									</select>
								</p>
								<input type="text" class="form-control ml-row" name="BankBranchName" v-model="BankData.BranchName" v-validate="{ rules: { regex:Reg.BankBranchName, required: true }}" />
							</div>
							<!--<div class="row checkbox-row">
								<input type="checkbox" id="check" class="form-checkbox" /><label for="check"></label>
								设为默认银行卡
							</div>-->
							<!-- 用 户 名 -->
							<p class="error-tip" v-if="errors.has('CardName') && fields.CardName.touched">用户名仅可以使用中英文字母,空白, 字数范围2-50</p>
							<!-- 银行卡号 -->
							<p class="error-tip" v-else-if="errors.has('BankAcct') && fields.BankAcct.touched">银行卡号仅可以使用10-25个数字</p>
							<!-- 银行名称 -->
							<p class="error-tip" v-else-if="errors.has('BankName') && fields.BankName.touched">银行名称仅可以使用中英文字母,数字, 下划线和减号, 字数范围2-50</i>
								<!-- 开 户 行 -->
								<p class="error-tip" v-else-if="errors.has('BankBranchName') && fields.BankBranchName.touched">开户行仅可以使用中英文字母,空白, 字数范围2-50</p>
								<p class="error-tip" v-else-if="!BankData.Province || BankData.Province == -1">提示: 请选择省份</p>
								<p class="error-tip" v-else-if="!BankData.Town || BankData.Town == -1">提示: 请选择城市</p>
								<p class="error-tip" v-else-if="!BankData.Dist || BankData.Dist == -1">提示: 请选择区</p>
								<div class="row">
									<a v-on:click="UpdateBankData()" class="btn btn-gold">绑&emsp;定</a>
									<a v-on:click="bindClose()" class="btn btn-gray">取&emsp;消</a>
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

</template>

<script>
	import Vue from 'vue'
	import EventBus from 'scripts/common/EventBus'
	import Regex from 'scripts/common/CommDef'
	import BLDef from 'scripts/common/BLDef'
	import CommUtility from 'scripts/common/CommUtility'
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService'
	import CommonService from 'scripts/businessLogic/commonService'

	export default {
		props: {
			BankInfo: {
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {
				AddCardType: '', //添加银行卡入口, goldCoin:提现, recharge:充提中心
				ProcessingFlag: false,
				DropDowning: '',
				Reg: Regex.Regex,
				BankData: {
					CardName: '',
					BankName: '',
					BranchName: '',
					BankAcct: '',
					Province: {},
					Town: {},
					Dist: {},
				},
				OrgBankData: {},
				ProvincesList: [],
				TownsList: [],
				DistsList: [],
				DefaultDistsItem: {},
				DefaultDistsList: [],
				DropDownInvalid: false
			};
		},
		created: function() {
			this.Load()
			this.BindingEvent()
			this.LoadPage()
		},
		mounted: function() {
			CommUtility.BindEnterTrigger('bankInfoForm', this.UpdateBankData);
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.ModalHeight();
				})
			},
			//弹窗高度
			ModalHeight: function() {
				var that = this
				//充值
				$('#depositModal').on('show.bs.modal', function() {
					that.AddCardType = 'recharge';
					$(this).css('display', 'block');
					var ModalHeight = $(window).height() / 2 - $('#depositModal .modal-dialog').height() / 2;
					$(this).find('.modal-dialog').css({
						'margin-top': ModalHeight
					});
				});
				//充值金币
				$('#withdrawalModal').on('show.bs.modal', function() {
					that.AddCardType = 'goldCoin';
					$(this).css('display', 'block');
					var ModalHeight = $(window).height() / 2 - $('#withdrawalModal .modal-dialog').height() / 2;
					$(this).find('.modal-dialog').css({
						'margin-top': ModalHeight
					});
				});
				//添加银行卡
				$('#addCardModal').on('show.bs.modal', function() {
					$(this).css('display', 'block');
					var ModalHeight = $(window).height() / 2 - $('#addCardModal .modal-dialog').height() / 2;
					$(this).find('.modal-dialog').css({
						'margin-top': ModalHeight
					});
				});
			},
			BindingEvent: function() {
				document.addEventListener('click', this.HideDropDown);
			},
			// 顯示紀錄類型選單
			ShowDropDown: function(targetClass) {
				$('.down_box').slideUp(100);
				if(this.DropDowning !== targetClass) {
					$('.' + targetClass).slideDown(300);
					this.DropDowning = targetClass;
				} else {
					$('.' + targetClass).slideUp(100);
					this.DropDowning = '';
				}
			},
			// 隱藏紀錄類型選單
			HideDropDown: function(event) {
				const target = $(event.target);
				if(target.closest('.d_course').length === 0) {
					$('.down_box').slideUp(100);
					this.DropDowning = '';
				}
			},
			// 載入畫面
			LoadPage: async function() {
				var data = this.BankInfo
				console.log(data)
				if(!data.Data) {
					return
				}
				if(data.Data.BankAcct.Province.Name == '') {
					data.Data.BankAcct.Province = Vue.util.extend({}, data.Data.ProvinceSelectList[0]);
				}
				if(data.Data.BankAcct.Town.Name == '') {
					data.Data.BankAcct.Town = Vue.util.extend({}, data.Data.TownSelectList[0]);
				}
				if(data.Data.BankAcct.Dist.Name == '') {
					data.Data.BankAcct.Dist = Vue.util.extend({}, data.Data.DistSelectList[0]);
				}
				this.BankData = Vue.util.extend({}, data.Data.BankAcct);
				this.OrgBankData = Vue.util.extend({}, data.Data.BankAcct);
				this.ProvincesList = data.Data.ProvinceSelectList;
				this.TownsList = Vue.util.extend([], data.Data.TownSelectList);
				this.DistsList = Vue.util.extend([], data.Data.DistSelectList);
				this.DefaultDistsItem = Vue.util.extend({}, data.Data.DistSelectList[0]);
				this.DefaultDistsList = [this.DefaultDistsItem];
			},
			// 選擇省分
			ChangeProvince: async function() {
				const selectProvince = this.BankData.Province;
				const inputObj = {
					SType: BLDef.SelectTypesDef.CITIES,
					InputValues: [selectProvince.Value]
				};
				const data = await CommonService.GetCityTypes(inputObj);
				if(data.Ret === 0) {
					this.BankData.Province = selectProvince;
					this.TownsList = data.Data.SelectList;
					this.BankData.Town = data.Data.SelectList[0];
					this.DistsList = this.DefaultDistsList;
					this.BankData.Dist = this.DefaultDistsItem;
				}
			},
			// 選擇城市
			ChangeTown: async function() {
				const selectTown = this.BankData.Town;
				const inputObj = {
					SType: BLDef.SelectTypesDef.DISTS,
					InputValues: [selectTown.Value]
				};
				const data = await CommonService.GetDistTypes(inputObj);
				if(data.Ret === 0) {
					this.BankData.Town = selectTown;
					this.DistsList = data.Data.SelectList;
					this.BankData.Dist = data.Data.SelectList[0];
					if(this.DistsList.length === 1) {
						this.DropDownInvalid = false;
					}
				}
			},
			// 選擇區域
			ChangeDist: function() {
				const selectDist = this.BankData.Dist;
				this.BankData.Dist = selectDist;
				if(selectDist.Value !== '-1') {
					this.DropDownInvalid = false;
				}
			},
			// 檢查下拉選單合法性
			CheckDropDownInvalid: function() {
				if(!this.BankData.Province || !this.BankData.Town) {
					return true;
				}
				if(this.BankData.Province.Value == -1 || this.BankData.Town.Value == -1) {
					return true;
				}
				if(this.DistsList.length > 1 && (!this.BankData.Dist || this.BankData.Dist.Value == -1)) {
					return true;
				}
				return false;
			},
			// 更新銀行資料
			UpdateBankData: async function() {
				this.DropDownInvalid = this.CheckDropDownInvalid();
				Object.keys(this.fields).forEach(key => {
					this.fields[key].touched = true;
				});
				const result = await this.$validator.validateAll();
				if(result === false || this.DropDownInvalid === true) {
					return;
				}

				if(this.ProcessingFlag === true) {
					return;
				}

				this.ProcessingFlag = true;

				const inputObj = {
					OrgBankAcct: this.OrgBankData,
					BankAcct: this.BankData
				};

				EventBus.$emit('GlobalLoadingTrigger', true);
				const data = await PersonalCenterService.BankInfo_Mod(inputObj);
				EventBus.$emit('GlobalLoadingTrigger', false);

				this.ProcessingFlag = false;
				if(data.Ret === 0) {
					this.resetForm()
					EventBus.$emit('UpdateBankData') //更新银行卡信息
					
					$('#addCardModal').modal("hide")
//					if(this.AddCardType == "goldCoin") { //提现
////					$('#withdrawalModal').modal("show");
//						$('#withdrawalPswModal').modal("show") //设置取款密码
//					} else if(this.AddCardType == "recharge") { //充值
////					$('#depositModal').modal("show")
//					}
				}
                const notifyData = {
                    NotifyMessage: data.Message
                };
                EventBus.$emit('showNotifyMessage', notifyData);
			},
			resetForm: function() {
				this.OrgBankAcct = Vue.util.extend({}, this.BankData)
				this.$validator.reset()
			},
			//关闭添加银行卡
			bindClose: function() {
				this.resetForm()
				$('#addCardModal').modal("hide")
			},
		},
	}
</script>