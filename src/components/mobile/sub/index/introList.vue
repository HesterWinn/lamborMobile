<template>
	<div>
		<section class="tab-section">
			<ul>
				<li class="col-4 row-2 radius-top-left">
					<a @click="PlayGame('AG','LiveVideo');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/ag_logo.png'">
						<i>AG真人视讯</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/ag_video_logo.png'">
						<i>AG电游</i>
					</a>
				</li>
				<li class="col-4 radius-top-right">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/fish_logo.png'">
						<i>AG捕鱼</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/sunbet_logo.png'">
						<i>电子游戏</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/sunbet_logo.png'">
						<i>真人视讯</i>
					</a>
				</li>
			</ul>
		</section>
		<section class="tab-section">
			<ul>
				<li class="col-6">
					<a @click="PlayGame('AllBet','LiveVideo');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/ob_logo.png'">
						<i>真人视讯</i>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-6">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/ob_game_logo.png'">
						<i>欧博电子游戏</i>
					</a>
				</li>
			</ul>
		</section>
		<section class="tab-section">
			<ul>
				<li class="col-4 row-2">
					<a @click="PlayGame('SABA','EGames')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/one_logo.png'">
						<i>沙巴体育</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="GameTip('OG','LiveVideo');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/og_logo.png'">
						<i>真人视讯</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip();">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/mg_logo.png'">
						<i>真人视讯</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/kg_logo.png'">
						<i>KG彩票</i>
					</a>
				</li>
				<li class="col-4">
					<a @click="PlayGame('MG1','EGames','1302-1001')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/mg_logo.png'">
						<i>老虎机</i>
					</a>
				</li>
			</ul>
		</section>
		<section class="tab-section">
			<ul>
				<li class="col-4 row-3">
					<a @click="contLeftSlider('bbin')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/bbin_logo.png'">
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4 row-3">
					<a @click="contLeftSlider('pt')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/pt_logo.png'">
					</a>
				</li>
				<li class="col-4 row-3">
					<a @click="contLeftSlider('im')">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/game/im_logo.png'">
					</a>
					<em class="hot"></em>
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
			
			// 2018.10.15 动画加载 SeyoChen
			// 堆叠效果1
			// AnimationFun: function () {
			// 	$('.tab-section').css('padding-top','10rem');
			// 	$('.tab-section').css('opacity','0');
			// 	var i = 1;
			// 	$('.tab-section').each(function () {
			// 		$(this).fadeIn();
			// 		$(this).animate({padding:'0',opacity:'1'}, i*100);
			// 		i++;
			// 	});
			// }
			// 缓慢显示效果2
			AnimationFun: function () {
				$('.tab-section a').css('opacity','0');
				var i = 1;
				$('.tab-section li').each(function () {
					// $(this).fadeIn();
					$(this).find('a').animate({opacity:'1'}, i*150);
					i++;
				});
			}
			// 2018.10.15 动画加载 SeyoChen end
		},
		mounted: function () {
			this.AnimationFun();
		}
	}
</script>
