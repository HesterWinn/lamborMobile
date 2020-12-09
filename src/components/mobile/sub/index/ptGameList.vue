<template>
	<div id="pt" class="cont-item" style="display: none;">
		<div class="header-row">
			<a href="#" @click="contRightSlider()" class="back-right-btn"><i></i></a>
			<img class="titlt-logo" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/pt/PT_logo.png'" />
		</div>
		<section class="tab-section">
			<ul>
				<li class="col-4">
					<a v-on:click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/pt/live_logo.png'">
						<p>PT真人视讯</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/pt/game_logo.png'">
						<p>PT电子游戏</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/pt/iphone_logo.png'">
						<p>PT体育博彩</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/pt/fish_logo.png'">
						<p>PT捕鱼</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/pt/lettery_logo.png'">
						<p>PT彩票</p>
					</a>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import BLDef from 'scripts/common/BLDef';
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
