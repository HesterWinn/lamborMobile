<template>
	<!-- 底部 -->
	<footer>
		<section class="menu">
			<ul class="list">
				<li class="tab-hall" :class="UrlMenu==='' ?'active':''">
					<router-link :to="{name: 'index'}">
						<em class="icon-hall"></em>
						<p>大厅</p>
					</router-link>
				</li>
				<li class="tab-service" data-toggle="modal" data-target="#qqServiceModal">
					<em class="icon-service"></em>
					<p>客服</p>
				</li>
				<!--<li class="btn-active" data-toggle="modal" data-target="#activityListModal">
					<em class="icon-active"></em>
					<p>活动</p>
				</li>-->
				<li class="btn-active" :class="UrlMenu==='activity' ?'active':''">
					<router-link :to="{name: 'activity'}">
						<em class="icon-active"></em>
						<p>活动</p>
					</router-link>
				</li>
				<li class="tab-member" :class="UrlMenu==='member' ?'active':''">
					<router-link :to="{name: 'member'}">
						<em class="icon-member"></em>
						<p>个人</p>
					</router-link>
				</li>
			</ul>
		</section>
		
		<!-- qq客服弹窗 -->
		<qq-service-modal></qq-service-modal>
		
	</footer>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/layout/mainMenu.less';
</style>
<script>
	import EventBus from 'scripts/common/EventBus'
	import qqServiceModal from '@/components/mobile/sub/service/qqServiceModal'
	export default {
		data() {
			return {
                UrlMenu: '',
			};
        },
		created: function() {
			this.Load()
			this.getUrlMunu()
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					$('.menu li').click(function(){
						var that = $(this);
						that.addClass("active").siblings("li").removeClass("active")
					})
					this.ModalHeight()
				})
			},
			getUrlMunu: function(){
				const path = this.$route.path
				if(path.indexOf('member') != -1 || path.indexOf('login') != -1 || path.indexOf('register') != -1){
					this.UrlMenu = 'member'
				}else if(path.indexOf('activity') != -1){
					this.UrlMenu = 'activity'
				}else{
					this.UrlMenu = ''
				}
			},
			//弹窗高度
			ModalHeight: function(){
				//活动列表
				$('#activityListModal').on('show.bs.modal', function () {
		            $(this).css('display', 'block');  
		            var ModalHeight=$(window).height() / 2 - $('#activityListModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
				//客服
				$('#serviceModal').on('show.bs.modal', function () {
		            $(this).css('display', 'block');  
		            var ModalHeight=$(window).height() - $('#serviceModal .modal-dialog').height();  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
				//客服
//				$('#qqServiceModal').on('show.bs.modal', function () {
//		            $(this).css('display', 'block');  
//		            var ModalHeight=$(window).height() - $('#qqServiceModal .modal-dialog').height();  
//		            $(this).find('.modal-dialog').css({  
//		                'margin-top': ModalHeight  
//		            }); 
//				});
				$('#qqServiceModal').on('show.bs.modal', function () {
		            $(this).css('display', 'block');  
		            var ModalHeight=$(window).height() / 2 - $('#qqServiceModal .modal-dialog').height() / 2;  
		            $(this).find('.modal-dialog').css({  
		                'margin-top': ModalHeight  
		            }); 
				});
			},
		},
		components: {
			qqServiceModal,
		},
	}
</script>

