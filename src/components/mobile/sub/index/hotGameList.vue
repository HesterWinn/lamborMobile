<template>
	<div class="mb-footer">
		<p class="game-title">
			<em class="title-line-left"></em>
			热门游戏分类
			<em class="title-line-right"></em>
		</p>
		<section class="tab-section">
			<ul>
				<li class="col-4">
					<a @click="contLeftSlider('video')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/live_logo.png'">
						<i>真人视讯</i>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="contLeftSlider('eGame')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/game_logo.png'">
						<i>电子游戏</i>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="contLeftSlider('sport')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/sport_logo.png'">
						<i>体育博彩</i>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="contLeftSlider('lottery')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/lottery_logo.png'">
						<i>彩票</i>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a @click="contLeftSlider('fish')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/fish_logo1.png'">
						<i>捕鱼</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="contLeftSlider('tiger')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/one_arm_logo.png'">
						<i>老虎机</i>
					</a>
					<em class="hot"></em>
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
			contLeftSlider: function(id){
				this.$parent.contLeftSlider(id);	//调用父级方法，展开子列表
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