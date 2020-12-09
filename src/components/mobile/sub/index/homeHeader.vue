<template>
	<div>
		<!-- 跑马灯 -->
		<div class="float-row">
			<div class="fl-btn">
				<router-link class="icon-file" :to="{name: 'privateMessage'}"></router-link>
			</div>
			<div id="settingBtn" class="fr-btn open">
				<em class="icon-setting"></em>
				<ul id="menuSetting" class="show">
					<li><em class="icon-sound" @click="bindMsc()"></em></li>
					<li>
						<a href="#" class="icon-theme" data-toggle="modal" data-target="#themeModal"></a>
					</li>
					<li>
						<a href="#" class="icon-lang" data-toggle="modal" data-target="#languageModal">
							<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/lang_img_ZH.png'" />
						</a>
					</li>
				</ul>
			</div>
			
			<!-- 跑马灯 -->
			<marquee :IsLogin="this.IsLogin"></marquee>
			<!--<marquee id="marquee" scrollamount="3">欢迎光临联盟娱乐...</marquee>-->
		</div>
	
		<!-- 选择皮肤弹窗 -->
		<theme-modal></theme-modal>
		
		<!-- 选择语系弹窗 -->
		<language-modal></language-modal>
		
	</div>
	
</template>

<script>
	import BLDef from 'scripts/common/BLDef';
	import EventBus from 'scripts/common/EventBus';
	import marquee from '@/components/mobile/sub/index/marquee';
	import themeModal from '@/components/mobile/sub/index/themeModal';
	import languageModal from '@/components/mobile/sub/index/languageModal';
	
	export default {
		props: {
            IsLogin: undefined
        },
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
					this.bindSetting()
				})
			},
			//收起/展开设置
			bindSetting: function(){
				$("#settingBtn .icon-setting").click(function(){
					
					var that = $("#settingBtn");
					if(that.hasClass("open")){
						that.removeClass('open');
						$("#menuSetting").fadeOut();
					}else{
						that.addClass('open');
						$("#menuSetting").fadeIn();
					}
				});
			},
			bindMsc: function(){
				EventBus.$emit('PLAY_MSC');
			},
		},
		components: {
			marquee,
			themeModal,
			languageModal,
		},
	}
</script>



