<template>
	<div id="eGame" class="cont-item hot-game" style="display: none;">
		<div class="header-row">
			<a href="#" @click="contRightSlider()" class="back-right-btn"><i></i></a>
			<h3>电子游戏</h3>
		</div>
		<section class="tab-section">
			<ul>
				<li class="col-4">
					<a v-on:click="PlayGame('AllBet','eGame');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/video/ob_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('Sunbet','eGame');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/video/sunbet_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('AG','eGame');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/video/ag_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a @click="PlayGame('PG','EGames','imgame13135')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/im/pragmatic_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('SG','eGame','S-FO01');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/eGame/sg_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('PT','eGame','trpmnk');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/video/pt_logo.png'">
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
            WarnGameTip: function () {
                this.$parent.WarnGameTip();	//调用父级方法，提示弹窗
            }, // end WarnGameTip
		}
	}
</script>
