<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap recharge-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>

			<article>
				<section class="tab-section">
					<div class="col-6" data-toggle="modal" data-target="#depositModal">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/recharge/img_recharge.png'" />
						<p>充值</p>
					</div>
					<div class="col-6" data-toggle="modal" data-target="#withdrawalModal">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/recharge/img_withdrawal.png'" />
						<p>提现</p>
					</div>
				</section>
				<section class="list-table">
					<h2>充值提现记录</h2>
					<div class="table">
						<table cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<td>单号</td>
									<td>日期</td>
									<td>金额</td>
									<td>状态</td>
								</tr>
							</thead>
							<tbody>
								<!-- 取款申請列表 -->
								<tr v-for="Item in WithdrawApplyLogList">
									<td>
										<p>{{Item.ID}}</p>
									</td>
									<td>{{Item.CreateTick | utcTicksToLocalTime('YYYY/MM/DD')}}</td>
									<td>{{Item.VAmt}}</td>
									<td v-show="Item.IsCancel !== true" class="color-red"> 审核中
										<a class="btn btn-yellow" @click="TriggerCancelForm(Item)">取消</a>
									</td>
									<td v-show="Item.IsCancel == true" class="color-gold">已取消申请</td>
								</tr>
								<!-- 最近交易记录 -->
								<tr v-for="Log in this.RecordList">
									<td>
										<p>{{Log.ID}}</p>
									</td>
									<td> {{Log.TransDateTick | utcTicksToLocalTime('YYYY/MM/DD')}} </td>
									<td>{{Log.VTransAmt}}</td>
									<td v-if="Log.VTransType.indexOf('成功') != -1" class="color-success">{{Log.VTransType}}</td>
									<td v-else class="color-yellow">{{Log.VTransType}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
			</article>

			<!-- 充值弹窗 -->
			<deposit-modal></deposit-modal>

			<!-- 充值金币弹窗 -->
			<withdrawal-modal></withdrawal-modal>

			<!-- 添加银行卡弹窗 -->
			<add-card-modal></add-card-modal>

			<!-- 取消申请 -->
			<trigger-cancel-modal :CurrentCancelItem="this.CurrentCancelItem" v-if="this.CurrentCancelItem.ID"></trigger-cancel-modal>

		</section>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/recharge/index.less';
</style>
<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
	import depositModal from '@/components/mobile/sub/recharge/depositModal';
	import withdrawalModal from '@/components/mobile/sub/recharge/withdrawalModal';
	import addCardModal from '@/components/mobile/sub/recharge/addCardModal';
	import TriggerCancelModal from '@/components/mobile/sub/recharge/TriggerCancelModal';
	
	import EventBus from 'scripts/common/EventBus';
	import BLDef from 'scripts/common/BLDef';
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService';

	export default {
		data() {
			return {
				HeaderTitle: '充提中心',
				RecordList: [], //最近交易记录
				WithdrawApplyLogList: [], //取款申請列表
				CurrentCancelItem: {}, //取消申请
				// 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
		},
		created: function() {
			this.Load();
			this.LoadApplyList();
			this.LoadRecordList();
			this.ModalHeight();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					//table 滚动高度
					var bodyHeight = $("#themeLayout").height() - 290;
					$(".recharge-wrap .table").css("height", bodyHeight + "px");
				})
			},
			// 載入取款申請列表
			LoadApplyList: async function() {
				const inputObj = {
					PagingInfo: {
						PageNo: -1,
						PageSize: -1
					}
				};
				EventBus.$emit('GlobalLoadingTrigger', true)
				const data = await PersonalCenterService.WithdrawApply_LoadMainPage(inputObj)
				EventBus.$emit('GlobalLoadingTrigger', false)
				if(data.Ret === 0) {
					for(let i = 0; i < data.Data.WithdrawApplyLogList.length; i++) {
						data.Data.WithdrawApplyLogList[i].IsCancel = false;
					}
					this.WithdrawApplyLogList = data.Data.WithdrawApplyLogList;
				}
			},
			// 获取最近交易记录
			LoadRecordList: async function() {
				const inputObj = {
					WGUID: BLDef.WGUID,
					Type: '-1',
					PagingInfo: {
						PageNo: 1,
						PageSize: 8
					}
				};
				EventBus.$emit('GlobalLoadingTrigger', true)
				const data = await PersonalCenterService.CashFlowLog_Query(inputObj)
				EventBus.$emit('GlobalLoadingTrigger', false)
				if(data.Ret === BLDef.ErrorRetType.SUCCESS) {
					this.RecordList = data.Data.LogList;
				}
			},
			// 觸發取款彈窗
			TriggerCancelForm: function(Item) {
				this.CurrentCancelItem = Item;
				$('#TriggerCancelModal').modal('show');
			},
			//弹窗高度
			ModalHeight: function() {
				//充值
				$('#TriggerCancelModal').on('show.bs.modal', function() {

					console.log("asssda");

					this.AddCardType = 'recharge';
					$(this).css('display', 'block');
					var ModalHeight = $(window).height() / 2 - $('#TriggerCancelModal .modal-dialog').height() / 2;
					$(this).find('.modal-dialog').css({
						'margin-top': ModalHeight
					});
				});
			},
		},
		components: {
			mainHeader,
			depositModal,
			withdrawalModal,
			addCardModal,
			TriggerCancelModal,
		},
	}
</script>