<template>
	
	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="TriggerCancelModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content"> 
	            	<div class="modal-body">  
						<p>是否确定取消取款申请？</p>
		            </div>
		            <div class="modal-footer">
		            	<a class="btn btn-secondary" data-dismiss="modal" >取消</a>
		            	<a class="btn btn-primary" @click="CancelWithdrawApply();">确认</a>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
	
</template>

<script>
	import EventBus from 'scripts/common/EventBus';
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService';
	export default {
		props: {
            CurrentCancelItem: {},
        },
		created: function() {
			console.log(this.CurrentCancelItem);
		},
		methods: {
			// 取消取款申請
            CancelWithdrawApply: async function () {
                const inputObj = {
                    ID: this.CurrentCancelItem.ID,
                    Reason: '玩家自行取消取款申请'
                };

                EventBus.$emit('GlobalLoadingTrigger', true);
                const data = await PersonalCenterService.WithdrawApply_Cancel(inputObj);
                EventBus.$emit('GlobalLoadingTrigger', false);

                if (data.Ret === 0) {
                    this.CurrentCancelItem.IsCancel = true;
                    // EventBus.$emit('memberHeaderUpdateBalance');
                }     
                const notifyData = {
                    NotifyMessage: data.Message
                };
                EventBus.$emit('showNotifyMessage', notifyData);
                
                this.$parent.LoadApplyList();	//调用父级方法，更新申请列表
                $("#TriggerCancelModal").modal("hide");
            }
		},
	}
</script>

