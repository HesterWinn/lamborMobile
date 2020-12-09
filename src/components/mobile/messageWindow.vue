<template>
    <div class="mob-wrap">
		<div class="modal modal-shadow fade" id="MessageWindow" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content"> 
	            	<!--<div class="modal-header">
	            		<h4 class="modal-title">{{NotifyObj.NotifyMessage}}</h4>
		          	</div>-->
	            	<div class="modal-body">  
						<p>{{NotifyObj.NotifyMessage}}</p>
						<p v-if="NotifyObj.NotifySubMessage">{{NotifyObj.NotifySubMessage}}</p>
		            </div>
		            <div class="modal-footer">
		            	<a class="btn btn-secondary" data-dismiss="modal" >取消</a>
		            	<a class="btn btn-primary" href="javascript:void(0);" @click="WebCloseMessage()" >确认</a>
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
                    NotifySubMessage: undefined,
                    CloseFunction: Function
                }
            };
        },
        created: function () {
            const self = this;
            EventBus.$on('showNotifyMessage', data => {
                self.NotifyObj = data;
                $("#MessageWindow").modal("show");
            });
        },
        methods: {
			WebCloseMessage: function () {
                $("#MessageWindow").modal("hide");
                if (this.NotifyObj.CloseFunction) {
                    this.NotifyObj.CloseFunction();
                }
            }
		},
        beforeDestroy() {
            EventBus.$off('showNotifyMessage');
        }
    };
</script>

