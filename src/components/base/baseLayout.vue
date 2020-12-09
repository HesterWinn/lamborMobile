<template>
	<div>
		<div id="themeLayout" class="theme-red">
			<!-- 内容 -->
			<transition :name="transitionName">
				<router-view></router-view>
			</transition>
			
			<!-- 尾部 -->
			<main-menu></main-menu>
			
			<!-- 弹窗提示 -->
			<tip-top-modal></tip-top-modal>
			
			<!-- 提示框 -->
			<message-window></message-window>
			
			<!-- 温馨提示框 -->
			<warn-tip-modal></warn-tip-modal>
			
			<!-- loading -->
			<global-loading></global-loading>
			
			<!-- 按键音 -->
			<audio id="keydownMsc" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/mp3/keydown.wav'" preload="auto"></audio>
			
			<!-- 背景音乐 -->
			<audio id="bgMsc" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/mp3/Seve.mp3'" preload="auto" loop></audio>
			
		</div>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/custom/mobile/public.less';
	@import '~styles/custom/mobile/allTheme.less';
	@import '~styles/custom/mobile/modal.less';
	@import '~styles/modal/mobile/layout/landscape.css';
</style>
<script>
	import 'scripts/custom/jquery.min.js';
	import 'scripts/custom/modal.js';
	import mainMenu from '@/components/mobile/sub/mainMenu';
	import tipTopModal from '@/components/mobile/tipTopModal';
	import messageWindow from '@/components/mobile/messageWindow';
	import warnTipModal from '@/components/mobile/warnTipModal';
	import globalLoading from '@/components/mobile/globalLoading';
	
	import BLDef from 'scripts/common/BLDef';
	import EventBus from 'scripts/common/EventBus';

	export default {
		data() {
			return {
				Theme: "theme-red",
				NotifyObj: {},
				transitionName:'',
				// 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
		},
		created: function() {
			const self = this;

			EventBus.$on('SignalR_Maintenance_Notify', data => {
				self.MaintenanceNotify(data);
			});
			EventBus.$on('SignalR_Logout_OtherPageLogout', () => {
				self.GlobalLogout();
			});      
      
			//设置主题
			EventBus.$on('SET_THEME', data => {
				localStorage.setItem('SET_THEME', data);
				$("#themeLayout").removeClass().addClass(data);
			});
			
			// 播放音乐
			EventBus.$on('PLAY_MSC', () => {
	            this.PlayMsc();
	        });
			
			self.Load()
			self.ResetOrientation()
			
			//解决安卓手机唤起键盘时，footer跟着上
			let oHeight = $(document).height(); //屏幕当前的高度
			$(window).resize(function(){
				// 2018.10.25 SeyoChen
				let u = navigator.userAgent;
			    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			    if (isIOS) {
			    	return;//是iphoneX
			    }
			    // 2018.10.25 SeyoChen end

		        if($(document).height() < oHeight){
			        $("footer").css("display","none")
			        $("footer").css("height",0)
			    }else{
			        $("footer").css("display","block")
					$("footer").css("height","5rem")
			    } 
		    });
			
			// 全局点击 按键音
			$(document).on('click', function(e) {
				let _node = e.target.nodeName
				if(_node === 'A' || _node === 'EM' || _node === 'INPUT' || _node === 'SELECT' || _node === 'LI' || _node === 'IMG'){
					let keydownMsc = $('#keydownMsc').get(0)
		        	keydownMsc.play()
		            //微信端
		            if(document.addEventListener) {
		            	document.addEventListener("WeixinJSBridgeReady", function () {
				            keydownMsc.play()
				        }, false)
		            }
			    }
			});
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					let that = this
					that.LoadTheme()
					
					//提示弹窗居中
					$('#MessageWindow').on('show.bs.modal', function () {
			            $(this).css('display', 'block');  
			            let ModalHeight=$(window).height() / 2 - $('#MessageWindow .modal-dialog').height() / 2;  
			            $(this).find('.modal-dialog').css({  
			                'margin-top': ModalHeight  
			            }); 
					});
					
					//提示弹窗居中
					$('#WarnTipModal').on('show.bs.modal', function () {
			            $(this).css('display', 'block');  
			            let ModalHeight=$(window).height() / 2 - $('#WarnTipModal .modal-dialog').height() / 2;  
			            $(this).find('.modal-dialog').css({  
			                'margin-top': ModalHeight  
			            }); 
					});
					
					//首页自动播放背景音乐
					const path = that.$route.path
					if(path == '' || path == '/' || path.indexOf('author') != -1){
						setTimeout(function(){
							that.audioAutoPlay()
						},1000)
					}
				})
			},
			//默认加载主题
			LoadTheme: function(data) {
				let localTheme = localStorage.getItem('SET_THEME');
				if(localTheme) {
					this.Theme = localTheme;
				}
				localStorage.setItem('SET_THEME', this.Theme);
				$("#themeLayout").addClass(this.Theme);
			},
		    // 維護通知
		    MaintenanceNotify: function (data) {
		        switch (data.Data.MaintainType) {
		            case BLDef.MaintainTypesEnum.AllSYS:
		            case BLDef.MaintainTypesEnum.GameFrontEnd:
		                window.location.href = data.Data.NotifyData.Url;
		                break;
		            case BLDef.MaintainTypesEnum.GameApi:
		                break;
		            case BLDef.MaintainTypesEnum.CashFlowProvider:
		                break;
		            default:
		                break;
		        }
		    },
		    // signalr通知進行登出
		    GlobalLogout: function () {
		        window.location.href = '/login';
		    },
		    // 畫面大小調整時觸發
			ResetOrientation: function() {
				(function(doc, win) {
					//此处是兼容ios的写法
					let supportOrientation = (typeof window.orientation === 'number' &&
							typeof window.onorientationchange === 'object'),
						oFlag = false,
						ow, lFlag = false,
						lh;
					// oFlag = false,ow,lFlag = false,lh 记住第一次的值就好了 不让fontsize因为计算单位发生变化而改变
					let init = function() {
						let orientation, docEl = doc.documentElement,
							dpr = Math.min(win.devicePixelRatio, 3),
							count = 0;
						let updateOrientation = function() {
							let clientWidth = docEl.clientWidth;
							let clientHeight = docEl.clientHeight;
							if(supportOrientation) {
								orientation = window.orientation
								switch(orientation) {
									case 90:
									case -90:
										orientation = 'landscape'; // 横屏
										break;
									default:
										orientation = 'portrait'; // 竖屏
										break;
								}
							} else {
								orientation = (window.innerWidth > window.innerHeight) ? 'landscape' : 'portrait';
							}
							docEl.setAttribute('class', orientation);
							if(!oFlag) {
								if(clientWidth > clientHeight) {
									ow = clientHeight
								} else {
									ow = clientWidth
								}
							}
							if(!lFlag) {
								if(clientHeight > clientWidth) {
									lh = clientWidth
									lh = clientWidth
								} else {
									lh = clientHeight
								}
							}
							
							if(orientation === 'portrait') { // 竖屏
								if(clientWidth == undefined) return;
								if(clientWidth / dpr > 750) {
									clientWidth = 750 * dpr;
								}
								oFlag = true
//								docEl.style.fontSize = Math.round(40 * (ow / 750)) + 'px';
						        const h = ow / 2300;
						        $('html').css('font-size', 100 * h);	//设置页面字体大小
						        let winHeight = clientHeight > clientWidth ? clientHeight : clientWidth
						        
						        //设置游戏页面高度
						        if(window.location.href.indexOf('playGame') != -1){
						        	let headerHeight = $("#themeLayout header").height()
						        	$(".wrap").css("height",winHeight+"px")
						        	$(".wrap").css("margin-top", 0)
						        	$('#Iframe_Game').css("margin-top", headerHeight + "px")
						        	$('#Iframe_Game').css( "height",winHeight+"px")
						        }
						        //设置普通页面高度
						        else{
						        	let footerHeight = $("#themeLayout footer").height()
									let bodyHeight = winHeight - footerHeight
									$(".wrap").css("height",bodyHeight+"px")
						        }
							}
							if(orientation === 'landscape') { // 横屏
								if(clientHeight === undefined) return;
								if(clientHeight / dpr > 750) {
									clientHeight = 750 * dpr
								}
								lFlag = true
//								docEl.style.fontSize = Math.round(40 * (lh / 750)) + 'px';
								const h = lh / 2600;
						        $('html').css('font-size', 100 * h)
						        let winWidth = clientWidth > clientHeight ? clientHeight : clientWidth
						        
						        //设置游戏页面高度
						        if(window.location.href.indexOf('playGame') != -1){
						        	let headerHeight = $("#themeLayout header").height()
						        	$(".wrap").css("height",winWidth+"px")
						        	$(".wrap").css("margin-top", headerHeight + "px")
						        	$('#Iframe_Game').css("margin-top", 0)
						        	$('#Iframe_Game').css( "height",winWidth+"px")
						        }
						        //设置普通页面高度
						        else{
						        	let footerHeight = $("#themeLayout footer").height()
									let bodyHeight = winWidth - footerHeight
									$(".wrap").css("height",bodyHeight+"px")
						        }
						        EventBus.$emit('HOME_RIGHT_SLIDER'); //首页游戏第二级页面回收
							}
						};
						if(supportOrientation) {
							window.addEventListener('orientationchange', function() {
								if(count < 20) {
									count++;
									setTimeout(updateOrientation, 10)
								}
							}, false);
						} else {
							//监听resize事件
							window.addEventListener('resize', function() {
								if(count < 20) {
									count++;
									setTimeout(updateOrientation, 10)
								}
							}, false);
						}
						updateOrientation();
					};
					window.addEventListener('DOMContentLoaded', init, false);
				})(document, window)
			},
			// 自动播放音乐
			audioAutoPlay: function(){
				let voice = $('#bgMsc').get(0)
	        	voice.play()
	            //微信端
	            if(document.addEventListener) {
	            	document.addEventListener("WeixinJSBridgeReady", function () {
			            voice.play()
			        }, false)
	            }
	            // safari 不能自动播放
				if (/i(Phone|P(o|a)d)/.test(navigator.userAgent)) {
			      	$(document).one('touchstart',
			        function(e) {
			            voice.touchstart = true;
			            voice.play();
			            return false;
			        });
			    }
		    },
		    //播放/暂停音乐
		    PlayMsc: function(){
				let player = $("#bgMsc").get(0);
				let playerBtn = $(".icon-sound");
				if(playerBtn.hasClass("close")){
					playerBtn.removeClass("close");
					player.play();//播放
				}else{
					playerBtn.addClass("close");
					player.pause();//暂停
				}
			},
			//播放音乐
		    PlayMsc1: function(){
				let player = $("#bgMsc").get(0);
				let playerBtn = $(".icon-sound");
				playerBtn.removeClass("close");
				player.play();//播放
			},
			// 暂停音乐
		    PauseMsc: function(){
				let player = $("#bgMsc").get(0);
				let playerBtn = $(".icon-sound");
				playerBtn.addClass("close");
				player.pause();//暂停
			},
		},
		components: {
			mainMenu,
			tipTopModal,
			messageWindow,
			warnTipModal,
			globalLoading,
		},
		beforeDestroy() {
	    	EventBus.$off('SignalR_Maintenance_Notify')
	    	EventBus.$off('SignalR_Logout_OtherPageLogout')
    		EventBus.$off('PLAY_MSC')
		},
		watch: {
			$route(to, from) {
				//如果to索引大于from索引,判断为前进状态,反之
				if (to.meta.index > from.meta.index) {
					this.transitionName = 'base-left';
				} else {
					this.transitionName = 'base-right';
				}
				//首页播放背景，不是首页暂停
				if(to.name == 'index'){
//					this.PlayMsc1()
				}else{
					this.PauseMsc()
				}
			}
		},
	}
</script>