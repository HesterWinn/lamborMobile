<template>

	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="freeTrailModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">试玩模式</h4>
					</div>
					<div class="modal-body">
						<!--<p>试玩帐号,不做任何记录，是否继续试玩？</p>-->
						<form class="addcard-form" novalidate="novalidate">
							<div class="row input-group">
								<label>验 证 码</label>
								<input type="text" class="form-control input-scan" name="AuthCode" v-model="AuthCode" placeholder="不区分大小写" v-validate="{ rules: { regex:Reg.VCode, required: true }}" />
								<img class="img-scan" v-bind:src="AuthImg" v-on:click="GetAuthCode()" />
							</div>
							<div class="row checkbox-row">
								<input type="checkbox" id="check" class="form-checkbox" v-model="CheckedAgree" /><label for="check"></label> 我确定已年满18周岁，并自愿接受联盟娱乐网站的相关协议和规定
							</div>
							<div class="row">
								<p class="error-tip" v-if="errors.has('AuthCode')&& fields.AuthCode.touched">
									* 验证码错误
								</p>
								<p class="error-tip" v-else-if="!this.CheckedAgree">
									* 请勾选同意条款!
								</p>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<a class="btn btn-secondary" data-dismiss="modal">取消</a>
						<a class="btn btn-primary" @click="StartFreeGame();">确认</a>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
	</div>

</template>

<script>
	import CommUtility from 'scripts/common/CommUtility';
	import CommService from 'scripts/businessLogic/commonService';
	import Regex from 'scripts/common/CommDef';
	import EventBus from 'scripts/common/EventBus';
	import BLDef from 'scripts/common/BLDef';
	import URLService from 'scripts/common/URLService';

	export default {
		data() {
			return {
				AuthID: '', // 驗證碼ID
				AuthImg: '', // 驗證碼圖片              
				AuthCode: '', // 輸入的驗證碼
				Reg: Regex.Regex, // 正則表達式類別
				CheckedAgree: false, //勾选同意

				// 遊戲資料
				GamePostData: {
					GameCode: '',
					GameCatlog: undefined,
					CToken: undefined
				},

				// 驗證碼顏色設定
				RGB: {
					R: 255,
					G: 200,
					B: 255,
				},
			};
		},
		created: function() {
			this.Load();
			this.GetAuthCode();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.ModalHeight();
				})
			},
			//弹窗高度
			ModalHeight: function() {
				//免费试玩
				$('#freeTrailModal').on('show.bs.modal', function() {
					$(this).css('display', 'block');
					var ModalHeight = $(window).height() / 2 - $('#freeTrailModal .modal-dialog').height() / 2;
					$(this).find('.modal-dialog').css({
						'margin-top': ModalHeight
					});
				});
			},
			// 取得驗證碼
			GetAuthCode: async function() {
				/* eslint-disable camelcase */
				const VCode_CharacterRGB = this.RGB;
				const RGBData = {
					VCode_CharacterRGB,
				};
				const retData = await CommService.VerifyCode_Gen(RGBData);
				this.AuthImg = retData.Data.VCode;
				this.AuthID = retData.Data.ID;
			}, // end GetAuthCode

			// 開始遊戲
			StartFreeGame: async function() {
				let anyInvalid = false;
				// 是否通過各種欄位驗證
				const validateConfirm = await this.validate();
				if(!validateConfirm || !this.CheckedAgree) {
					return;
				} // end if

				const VCodeObj = {
					ID: this.AuthID,
					VCode: this.AuthCode,
				};

				const retData = await CommService.VerifyCode_Verify(VCodeObj);

				if(retData.Ret == 0) {
					// 成功                
					this.GamePostData.GameCatlog = BLDef.GameCatlogType.LiveVideonHtml5;
					this.GamePostData.CToken = retData.Data.Token;
					localStorage.setItem('PlayGamePostData', URLService.GetUrlParameterFromObj(this.GamePostData));

					this.$parent.UpdateFreeTrail(); //调用父级方法，修改状态
					$('#freeTrailModal').modal('hide');
				} else {
					// 失敗
					const notifyData = {
						NotifyMessage: retData.Message,
						CloseFunction: this.CloseFreeTrialForm
					};
					EventBus.$emit('showNotifyMessage', notifyData);
				}
			}, // end StartFreeGame

			// 所有欄位驗證
			validate: function() {
				Object.keys(this.fields).forEach(key => {
					this.fields[key].touched = true;
				});
				return this.$validator.validateAll().then(result => {
					return result;
				});
			}, // end validate
		},
	}
</script>