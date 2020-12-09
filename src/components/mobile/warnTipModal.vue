<template>
    <div class="mob-wrap">
		<div class="modal modal-shadow fade" id="WarnTipModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">提示</h4>
		          	</div>
	            	<div class="modal-body">
						<h5 class="title" v-if="NotifyObj.NotifySubTitle">{{NotifyObj.NotifySubTitle}}</h5>
						<h5 v-if="NotifyObj.NotifySubMessage">{{NotifyObj.NotifySubMessage}}</h5>
						<p v-if="NotifyObj.NotifyMessage">{{NotifyObj.NotifyMessage}}</p>
		            </div>
		            <div class="modal-footer">
		            	<a class="btn btn-gold" href="javascript:void(0);" @click="WebCloseMessage()">确&emsp;定</a>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
	
</template>

<script>
	import EventBus from 'scripts/common/EventBus';
    import CommUtility from 'scripts/common/CommUtility';
    
	export default {
		data() {
            return {
                NotifyObj: {
                    NotifyMessage: undefined,
                    NotifySubTitle: undefined,
                    NotifySubMessage: undefined,
                    CloseFunction: Function
                }
            };
        },
        created: function () {
            const self = this;
            EventBus.$on('showWarnTip', data => {
                self.NotifyObj = data;
                $("#WarnTipModal").modal("show");
            });
        },
		methods: {
			WebCloseMessage: function () {
                $("#WarnTipModal").modal("hide");
                if (this.NotifyObj.CloseFunction) {
                    this.NotifyObj.CloseFunction();
                }
            }
		},
		beforeDestroy() {
            EventBus.$off('showWarnTip');
        }
	}
			
</script>

