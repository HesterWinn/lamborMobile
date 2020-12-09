<template>
	<!-- 内容 -->
	<div class="wrap" style="margin-top:0!important;">
		<transition :name="memberName" style="position:relative;">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	import BLDef from 'scripts/common/BLDef'
	import EventBus from 'scripts/common/EventBus'
	import CommonService from 'scripts/businessLogic/commonService'
	
	export default {
		data () {
			return{
				memberName:''
			}
		},
		created: function() {
			this.CheckIsLogin();
			var that = this;
			that.Load();
			
			// 畫面大小調整時觸發
			$(window).resize(function () {
				that.resize()
			});
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.resize()
				})
			},
			// 檢查登入狀態
	        CheckIsLogin: async function () {
	            const data = await CommonService.Comm_CheckPermission();
	            switch (data.Status) {
	                case BLDef.SysAccountStatus.NOT_LOGIN:
	                    this.IsLogin = false;
	                    break;
	                case BLDef.SysAccountStatus.LOGINED_ENABLED:
	                case BLDef.SysAccountStatus.LOGINED_FROZEN:
	                    this.IsLogin = true;
	                    break;
	                default:
	                    break;
	            }
	        },
			//内容高度
			resize: function(){
				//首页/游戏界面 在baselayout设定
				const path = this.$route.path
				if(path == '' || path == '/' || path.indexOf('playGame') != -1){
					return
				}
				var headerHeight = $("#themeLayout header").height();
				var footerHeight = $("#themeLayout footer").height();
				var bodyHeight = $("#themeLayout").height() - footerHeight;
				$(".wrap").css("height",bodyHeight+"px");
			},
		},
		beforeDestroy: function () {
			this.resize();
		},
		watch: {
			$route(to, from) {
			//如果to索引大于from索引,判断为前进状态,反之
				if (to.meta.mdex > from.meta.mdex) {
					this.memberName = 'slide-left';
				} else {
					this.memberName = 'slide-right';
				}
			}
		},
	}
</script>