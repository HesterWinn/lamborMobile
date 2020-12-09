<template>
    <!-- 提示弹窗 -->
	<div class="mob-wrap">
		<div class="modal fade" id="tipTopModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content"> 
	            	<div class="modal-body">  
						<em class="icon-tip"></em>{{Tip}}
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
	
</template>

<script>
    import EventBus from 'scripts/common/EventBus';

    export default {
        data() {
            return {
                Tip: undefined,
            };
        },
        created: function () {
            const self = this;
            EventBus.$on('SHOW_TIP', data => {
                this.Tip = data;
                $("#tipTopModal").modal("show");
				setTimeout(function(){
					$("#tipTopModal").modal("hide");
				},1500);
            });
        },
        beforeDestroy() {
            EventBus.$off('SHOW_TIP');
        }
    };
</script>

