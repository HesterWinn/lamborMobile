<template>
	<div class="wrap" @scroll="handleScroll()">
		<!-- 内容 -->
		<section class="index-wrap">
			
			<!-- 头部 -->
			<div class="float-header">
				<home-header :IsLogin="this.IsLogin"></home-header>
			</div>

			<section class="banner col-12" :class="isFixed">
				<div id="bannerSlider">
				    <transition-group name="flip-list" tag="ul">
				        <li v-for="curImg in CurrBanners" v-bind:key="curImg">
				            <img :src="curImg">
				        </li>
				    </transition-group>
				</div>
				<!--<em class="icon-sound" @click="bindMsc()"></em>-->
			</section>
			<section class="btn-link" :class="isFixed">
				<router-link :to="{name: 'recharge'}" class="btn btn-secondary">充值中心</router-link>
				<!--<a class="btn btn-primary" id="freeTrailBtn" data-static="on" @click="BindFreeTrail()">免费试玩</a>-->
				<router-link :to="{name: 'tutorial'}" class="btn btn-primary" >添加到桌面</router-link>
			</section>
			<!-- 游戏列表 -->
			<game-list></game-list>
		</section>
		
		<!-- 免费试玩弹窗 -->
		<free-trail-modal></free-trail-modal>
		
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/index/index.less';
</style>
<script>
	import homeHeader from '@/components/mobile/sub/index/homeHeader';
	import EventBus from 'scripts/common/EventBus';
	import BLDef from 'scripts/common/BLDef';
	import CommonService from 'scripts/businessLogic/commonService';
	import freeTrailModal from '@/components/mobile/sub/index/freeTrailModal';
	import gameList from '@/components/mobile/index/gameList';

export default {
	data() {
		return {
			IsLogin: undefined,
			isFixed: "", //是否固定的
			CurrBanners: [],
            Banners: undefined,
            BannerIndex: 0,
            // 資源位置
            ResourceURL: BLDef.ResourceURL,
            ResourceCDN: BLDef.ResourceCDN,
		};
	},
	mounted: function () {
		this.Banners = [
            this.ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/banner1.jpg',
            this.ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/banner2.jpg',
            this.ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/banner3.jpg',
            this.ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/banner4.jpg',
        ]
        this.CurrBanners = [this.Banners[0]];
        this.startChange()
    },
	created: function() {
		this.Load()
		this.CheckIsLogin()
	},
	methods: {
		//bannerSlider
		startChange: function () {
            var _this = this;
            setInterval(function () {
                if (_this.BannerIndex < _this.Banners.length - 1) {
                    _this.BannerIndex++
                } else {
                    _this.BannerIndex = 0
                }
                _this.CurrBanners.splice(0, 1, _this.Banners[_this.BannerIndex])
            }, 3000)
        },
		//滚动的函数
		handleScroll: function() {
			let wh = $('.wrap').scrollTop(); 						//滚动的距离的
			let navH = $('.index-wrap .float-row').outerHeight(); 	//header的高度
			let h = $('.index-wrap .banner').outerHeight()-5; 	//banner的高度
			let floadHeader = $('.index-wrap .float-header');	//顶部跑步灯
			
			// 顶部跑步灯 跟着滚动条跑
			if(wh > (h - navH)) {
				let ww = ((h - navH)-wh);
				floadHeader.addClass('fixed');
				floadHeader.css('top',ww+"px");
			}else{
				floadHeader.removeClass('fixed');
			}
			// 充值中心按钮 跟着滚动条跑
			if(wh > h) {
				this.isFixed = "fixed";
			} else {
				this.isFixed = "";
			}
		},
		Load: function() {
			this.$nextTick(function() {
				let that = this
				
				//免费试玩状态
				var PlayGamePostData = localStorage.getItem('PlayGamePostData');
				if(PlayGamePostData != undefined && PlayGamePostData != ""){
					that.UpdateFreeTrail();
				};
				
				//内容高度
				var footerHeight = $("#themeLayout footer").height();
				var bodyHeight = $("#themeLayout").height() - footerHeight;
				$(".wrap").css("margin-top", "0");
				$(".wrap").css("height", bodyHeight + "px");
				
//				this.contSlider()
			})
		},
		CheckIsLogin: async function () {
        	const data = await CommonService.Comm_CheckPermission();
        	switch (data.Status) {
	            case BLDef.SysAccountStatus.NOT_LOGIN:	// 记录帳號狀態
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
        //点击免费试玩
        BindFreeTrail: function () {
        	var that = $("#freeTrailBtn");
        	if(that.attr('data-static') == 'on'){
        		$('#freeTrailModal').modal("show");
        	}else{
        		localStorage.setItem('PlayGamePostData', '');
        		that.attr('data-static','on');
        		that.html("免费试玩");
        		that.addClass("btn-primary").removeClass("btn-secondary");
        	}
        },
        //修改退出试玩状态
        UpdateFreeTrail: async function () {
        	var that = $("#freeTrailBtn");
        	that.attr('data-static','off');
        	that.html("退出试玩");
        	that.addClass("btn-secondary").removeClass("btn-primary");
		},
		contLeftSlider: function(id){
			$('#contRight').find('.cont-item').hide();
			$('#'+id).show();
			const moveLeft = $("body").width();
			$('#contLeft').animate({'right':moveLeft}, 300);
			$('#contRight').animate({'left':0}, 300);
			// 滚动条超过banner，展开子页面滚动条到指定位置
			let btnLinkHeight = $('.btn-link').outerHeight();
			var scrollTop = $('#contSlider')[0].offsetTop - btnLinkHeight;
			
			if($('.wrap').scrollTop() > scrollTop){
				$('.wrap').animate({
					scrollTop: scrollTop
				}, 0);
			}
		},
	},
	components: {
		gameList,
		homeHeader,
		freeTrailModal,
	},
}
</script>