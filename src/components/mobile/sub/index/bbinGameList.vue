<template>
	<div id="bbin" class="cont-item" style="display: none;">
		<div class="header-row">
			<a href="#" @click="contRightSlider()" class="back-right-btn"><i></i></a>
			<img class="titlt-logo" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/bbin/bbin_logo.png'" />
		</div>
		<section class="tab-section">
			<ul>
				<li class="col-4">
					<a v-on:click="PlayGame('BBIN','LiveVideo');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/bbin/live_logo.png'">
						<p>BBIN真人视讯</p>
					</a>
					<em class="hot"></em>
				</li>
				<li class="col-4">
					<a v-on:click="PlayGame('BBIN','Undefine','Ltlottery');">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/bbin/bbin_icon_logo.png'">
						<p>BBIN彩票</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="PlayBBINGame();">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/bbin/iphone_logo.png'">
						<p>BBIN体育博彩</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/bbin/fish_logo.png'">
						<p>BBIN捕鱼</p>
					</a>
				</li>
				<li class="col-4">
					<a @click="WarnGameTip()">
						<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/bbin/one_arm_logo.png'">
						<p>BBIN老虎机</p>
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
            GameTip: function (gameAPIVendor,gameCatlog) {
                this.$parent.GameTip(gameAPIVendor,gameCatlog);	//调用父级方法，提示弹窗
            }, // end GameTip
            WarnGameTip: function () {
                this.$parent.WarnGameTip();	//调用父级方法，提示弹窗
            }, // end WarnGameTip
            
            // BBIN游戏
            PlayBBINGame: function () {
                const dataObj = {
                    GameAPIVendor: BLDef.GameApiType.BBIN,
                    GameCode: 'ball',
                    GameCatlog: BLDef.GameCatlogType.Undefine,
                    PlayType: BLDef.IdentityType.FORMAL,
                    Platform: BLDef.Paltform.Web_PC
                };
                localStorage.setItem('PlayGamePostData', URLService.GetUrlParameterFromObj(dataObj));
                this.$router.push({ name: 'playGame'})
            },
		}
	}
</script>
