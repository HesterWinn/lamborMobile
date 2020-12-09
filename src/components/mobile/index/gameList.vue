<template>
	<article id="contSlider">
		<div id="contLeft">
			<!-- 厂商列表 -->
			<intro-list></intro-list>
			
			<!-- 热门游戏列表 -->
			<hot-game-list></hot-game-list>
		</div>
		<div id="contRight">
			<!-- bbin 游戏列表 -->
			<bbin-game-list></bbin-game-list>
			
			<!-- pt 游戏列表 -->
			<pt-game-list></pt-game-list>
			
			<!-- im 游戏列表 -->
			<im-game-list></im-game-list>
			
			<!-- video 游戏列表 -->
			<video-game-list></video-game-list>
			
			<!-- eGame 游戏列表 -->
			<e-game-list></e-game-list>
			
			<!-- sportGame 游戏列表 -->
			<sport-game-list></sport-game-list>
			
			<!-- lotteryGame 游戏列表 -->
			<lottery-game-list></lottery-game-list>
			
			<!-- sportGame 游戏列表 -->
			<fish-game-list></fish-game-list>
			
			<!-- tigerGame 游戏列表 -->
			<tiger-game-list></tiger-game-list>
		</div>
	</article>
</template>


<script>
	import BLDef from 'scripts/common/BLDef';
	import URLService from 'scripts/common/URLService';
	import introList from '@/components/mobile/sub/index/introList';
	import hotGameList from '@/components/mobile/sub/index/hotGameList';
	import bbinGameList from '@/components/mobile/sub/index/bbinGameList';
	import ptGameList from '@/components/mobile/sub/index/ptGameList';
	import imGameList from '@/components/mobile/sub/index/imGameList';
	import videoGameList from '@/components/mobile/sub/index/videoGameList';
	import eGameList from '@/components/mobile/sub/index/eGameList';
	import sportGameList from '@/components/mobile/sub/index/sportGameList';
	import lotteryGameList from '@/components/mobile/sub/index/lotteryGameList';
	import fishGameList from '@/components/mobile/sub/index/fishGameList';
	import tigerGameList from '@/components/mobile/sub/index/tigerGameList';
	import EventBus from 'scripts/common/EventBus';
	import CommUtility from 'scripts/common/CommUtility';
	
	export default {
		data() {
            return {
                // 真人AG遊戲Post Model
                GameData: {
                    GameAPIVendor: undefined,
                    GameCode: '',
                    GameCatlog: BLDef.GameCatlogType.LiveVideo,
                    PlayType: BLDef.IdentityType.FORMAL,
                    Platform: BLDef.Paltform.Web_PC
                },
            };
        },
        created: function() {
			var that = this
			
			that.Load()
			EventBus.$on('HOME_RIGHT_SLIDER', data => {
				that.contRightSlider()
            });
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					this.BindGame();
					
					// 游戏列表 - 块状堆砌效果
					var gameList = $('#contLeft .tab-section li')
					var length = gameList.length
					var index = 0
                    var interval = setInterval(function(){
                    	if(index > length){
                    		clearInterval(interval)
                    	}
						$(gameList[index]).addClass('show')
						index++
					},50)
				})
			},
			BindGame: function(){
				$('#contSlider .tab-section li').click(function(){
					$('#contSlider .tab-section li').removeClass('active')
					$(this).addClass('active');
				})
			},
			contLeftSlider: function(id){
				$('#contSlider .tab-section li').removeClass('active')
				this.$parent.contLeftSlider(id);	//调用父级方法，展开子列表
			},
			contRightSlider: function(){
				$('#contSlider .tab-section li').removeClass('active')
				const moveLeft = $("body").width();
				$('#contLeft').animate({'right':0}, 300);
				$('#contRight').animate({'left':moveLeft}, 300);
				setTimeout(function(){
					$('#contRight').find('.cont-item').hide();
				},300);
			},
			// 没有接入游戏提示
			WarnGameTip: function(){
				const notifyData = {
                    NotifyMessage: '測試服暫不提供本遊戲',
                };
                EventBus.$emit('showWarnTip', notifyData);
			},
			// 微信中不能游戏提示
			GameTip: function(gameAPIVendor,gameCatlog,gameCode){
				console.log(CommUtility.IsWeiXin())
				if(CommUtility.IsWeiXin()){
					const notifyData = {
	                    NotifyMessage: '本遊戲僅支持瀏覽器登陸，請添加本站至手機桌面後即可正常遊戲',
	                };
	                EventBus.$emit('showWarnTip', notifyData);
				}else{
					this.PlayGame(gameAPIVendor,gameCatlog,gameCode);
				}
			},
			// 開新視窗
            PlayGame: function (gameAPIVendor,gameCatlog,gameCode) {
            	if(gameCatlog){
            		switch (gameCatlog) {
	                    case 'LiveVideo': this.GameData.GameCatlog = BLDef.GameCatlogType.LiveVideo;
	                    	break;
	                    case 'EGames': this.GameData.GameCatlog = BLDef.GameCatlogType.EGames;
	                    	break;
	                    case 'Undefine': this.GameData.GameCatlog = BLDef.GameCatlogType.Undefine;
	                    	break;
		                default:
		                    break;
		            }
            	}
                    
                switch (gameAPIVendor) {
                    case 'AG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.AG;
                        this.GameData.GameCode = '';
                        break;
                    case 'AllBet':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.AllBet;
                        this.GameData.GameCode = '';
                        break;
                    case 'PT':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.PT;
                        this.GameData.GameCode = '';
                        break;
                    case 'StarNet':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.StarNet;
                        this.GameData.GameCode = '';
                        break;
                    case 'OG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.OG;
                        this.GameData.GameCode = '';
                        break;
                    case 'BBIN':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.BBIN;
                        this.GameData.GameCode = 'live';
                        break;
                    case 'MG1':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.MG;
                        this.GameData.GameCode = 'Diamond';
                        break;
                    case 'MG2':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.MG;
                        this.GameData.GameCode = '';
                        break;
                    case 'TTG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.TTG;
                        this.GameData.GameCode = '';
                        break;
                    case 'PG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.PG;
                        this.GameData.GameCode = '';
                        break;
                    case 'WG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.WG;
                        this.GameData.GameCode = '';
                        break;
                    case 'APL':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.APL;
                        this.GameData.GameCode = '';
                        break;
                    case 'SABA':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.SABA;
                        this.GameData.GameCode = '';
                        break;
                    case 'IMSB':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.IMSB;
                        this.GameData.GameCode = '';
                        break;
                    case 'SG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.SG;
                        this.GameData.GameCode = '';
                        break;
                    case 'DT':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.DT;
                        this.GameData.GameCode = '';
                        break;
                    case 'QT':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.QT;
                        this.GameData.GameCode = '';
                        break;
                    case 'RT':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.RT;
                        this.GameData.GameCode = '';
                        break;
                    case 'PS':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.PS;
                        this.GameData.GameCode = '';
                        break;
                    case 'PNG':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.PNG;
                        this.GameData.GameCode = '';
                        break;
                    case 'BP':
                        this.GameData.GameAPIVendor = BLDef.GameApiType.BP;
                        this.GameData.GameCode = '';
                        break;
                    default:
                        break;
                } // end switch
                
                console.log(gameCode);
                if(gameCode){
                	
	            	this.GameData.GameCode = gameCode;
            	}
                
                console.log(this.GameData)
                
                localStorage.setItem('PlayGamePostData', URLService.GetUrlParameterFromObj(this.GameData));
                this.$router.push({ name: 'playGame'})
//              let url = this.$router.resolve({ name: 'playGame' }).href;
//		    	window.open(url, 'PlayGamePopUpWindow', 'scrollbars=1,width=1500,height=800,left=10,top=150');
            }, // end PlayGame
		},
		components: {
			hotGameList,
			introList,
			bbinGameList,
			ptGameList,
			imGameList,
			videoGameList,
			eGameList,
			sportGameList,
			lotteryGameList,
			fishGameList,
			tigerGameList,
		},
		beforeDestroy() {
            EventBus.$off('HOME_RIGHT_SLIDER');
        }
	}
</script>
