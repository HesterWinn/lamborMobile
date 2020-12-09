<template>
	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="activityListModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">优惠活动</h4>
		          	</div>
	            	<div class="modal-body">  
						<ul class="activity-list">
							<li @click="ChangeActiveType('1')" data-toggle="modal" data-target="#activityInfoModal">
								<em class="icon-hot"></em>
								<em class="icon-arrow"></em>
								新人报道！联盟娱乐有礼！超高返水，送不停！
							</li>
							<li @click="ChangeActiveType('2')" data-toggle="modal" data-target="#activityInfoModal">
								<em class="icon-arrow"></em>
								激情乐翻天，返水享不停！超级豪礼，全球同抢！
							</li>
						</ul>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <div class="modal-footer-close" data-dismiss="modal" ></div>
		</div>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/activityList/index.less';
</style>
<script>
	import EventBus from 'scripts/common/EventBus';
	export default {
		methods: {
            ChangeActiveType: function (flag) {
            	EventBus.$emit('changeActiveType', flag);
            },
        }
   }
</script>