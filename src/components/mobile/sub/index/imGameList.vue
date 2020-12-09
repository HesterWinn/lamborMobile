<template>
	<div id="im" class="cont-item" style="display: none;">
		<div class="header-row">
			<a href="#" @click="contRightSlider()" class="back-right-btn"><i></i></a>
			<img class="titlt-logo" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/im_logo.png'" />
		</div>
		<section class="tab-section">
			<ul>
				<li class="col-4">
					<a @click="PlayGame('IMSB','EGames')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/iphone_logo.png'">
						<p>IM体育博彩</p>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4"><label>敬请期待</label></li>
				<li class="col-4"><label>敬请期待</label></li>
			</ul>
		</section>
		<p class="game-title">
			<em class="title-line-left"></em>
			IM老虎机系列
			<em class="title-line-right"></em>
		</p>
		<section class="tab-section logo-section">
			<ul>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/toptrend_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a @click="PlayGame('PG','EGames','imgame13135')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/pragmatic_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="PlayGame('WG','EGames','imgame15078')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/winning_wg_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="PlayGame('RT','EGames','imgame18050')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/red_tiger_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="PlayGame('PS','EGames','imgame19025')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/playstar_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="PlayGame('PNG','EGames','imgame21030')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/play_n_go_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a @click="PlayGame('BP','EGames','imgame24013')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/blueprint_logo.png'">
					</a>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import BLDef from 'scripts/common/BLDef';
	import URLService from 'scripts/common/URLService';
	
	export default {
		data() {
			return {
	            // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
            }
		},
		methods: {
			contRightSlider: function(){
				this.$parent.contRightSlider();	//调用父级方法，收起子列表
			},
			PlayGame: function (gameAPIVendor,gameCatlog,gameCode) {
                this.$parent.PlayGame(gameAPIVendor,gameCatlog,gameCode);	//调用父级方法，開新視窗
            }, // end PlayGame
            GameTip: function (gameAPIVendor,gameCatlog,gameCode) {
                this.$parent.GameTip(gameAPIVendor,gameCatlog,gameCode);	//调用父级方法，提示弹窗
            }, // end GameTip
            WarnGameTip: function () {
                this.$parent.WarnGameTip();	//调用父级方法，提示弹窗
            }, // end WarnGameTip
		}
	}
</script>
