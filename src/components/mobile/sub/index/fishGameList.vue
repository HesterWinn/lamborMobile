<template>
	<div id="fish" class="cont-item hot-game" style="display: none;">
		<div class="header-row">
			<a href="#" @click="contRightSlider()" class="back-right-btn"><i></i></a>
			<h3>捕鱼</h3>
		</div>
		<section class="tab-section">
			<ul>
				<li class="col-4">
					<a v-on:click="PlayGame('AG','LiveVideo');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/video/ag_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('BBIN','LiveVideo');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/video/bbin_logo.png'">
					</a>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('PT','LiveVideo');">
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
			PlayGame: function (gameAPIVendor,gameCatlog) {
                this.$parent.PlayGame(gameAPIVendor,gameCatlog);	//调用父级方法，開新視窗
            }, // end PlayGame
            WarnGameTip: function () {
                this.$parent.WarnGameTip();	//调用父级方法，提示弹窗
            }, // end WarnGameTip
		}
	}
</script>
