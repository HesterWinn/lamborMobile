<template>
	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="languageModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">请选择语系</h4>
		          	</div>
	            	<div class="modal-body">  
						<ul class="language-list">
							<li class="active" data="ZH">
								<img class="col-12" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/lang_img_ZH.png'">
								<em class="icon-success"></em>
								简体中文
							</li>
							<!--<li data="AS">
								<img class="col-12" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/lang_img_AS.png'">
								<em class="icon-success"></em>
								English
							</li>-->
						</ul>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <div class="modal-footer-close" data-dismiss="modal" ></div>
		</div>
	</div>
</template>

<script>
	import EventBus from 'scripts/common/EventBus';
	import BLDef from 'scripts/common/BLDef';
	export default {
		data() {
			return {
	            // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
            }
		},
		created: function() {
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.bindSetLanguage();
					this.ModalHeight();
				})
			},
			bindSetLanguage: function(){
				$(".language-list li").click(function(){
					var that = $(this);
					var language = that.attr("data");
					that.addClass("active").siblings("li").removeClass("active");
//					EventBus.$emit('SET_THEME', theme); //调用父级方法
				});
			},
			//弹窗高度
			ModalHeight: function(){
				//语系
				$('#languageModal').on('show.bs.modal', function () {
		            $(this).css('display', 'block');  
		            var ModalHeight=$(window).height() / 2 - $('#languageModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
			}
		},
	}
</script>



