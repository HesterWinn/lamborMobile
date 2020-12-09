<template>
	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="themeModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">请选择皮肤</h4>
		          	</div>
	            	<div class="modal-body">  
						<ul class="icon-theme-list">
							<li data="theme-red">
								<img class="col-12" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/theme_red_bg.jpg'">
								<p>红</p>
							</li>
							<li data="theme-blue">
								<img class="col-12" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/theme_blue_bg.jpg'">
								<p>蓝</p>
							</li>
							<li data="theme-purple">
								<img class="col-12" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/theme_purple_bg.jpg'">
								<p>紫</p>
							</li>
							<li data="theme-pink">
								<img class="col-12" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/theme_pink_bg.jpg'">
								<p>绛</p>
							</li>
							<li data="theme-black">
								<div class="circle-black-bg"></div>
								<p>黑</p>
							</li>
							<li data="theme-brown">
								<div class="circle-brown-bg"></div>
								<p>棕</p>
							</li>
						</ul>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <div class="modal-footer-close" data-dismiss="modal" ></div>
		</div>
	</div>
</template>

<script>
	import BLDef from 'scripts/common/BLDef'
	import EventBus from 'scripts/common/EventBus'
	
	export default {
		data() {
	    	return {
		        // 資源位置
		        ResourceURL: BLDef.ResourceURL,
		        ResourceCDN: BLDef.ResourceCDN
	    	};
	    },
		created: function() {
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.bindSetTheme();
					this.ModalHeight();
				})
			},
			bindSetTheme: function(){
				$(".icon-theme-list li").click(function(){
					var that = $(this);
					var theme = that.attr("data");
					EventBus.$emit('SET_THEME', theme); //调用父级方法
				});
			},
			//弹窗高度
			ModalHeight: function(){
				//主题
				$('#themeModal').on('show.bs.modal', function () {
		            $(this).css('display', 'block');  
		            var ModalHeight=$(window).height() / 2 - $('#themeModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
			}
		},
	}
</script>



