<template>
	<div class="author">
		<h5>{{code}}</h5>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
			};
		},
		created: function() {
			this.load();
		},
		methods: {
			// 微信登录
			WxLogin: async function() {
				this.code = this.$route.query.code || '空' //微信code值
			},
			load: function() {
				(function(doc, win) {
					//此处是兼容ios的写法
					var supportOrientation = (typeof window.orientation === 'number' &&
							typeof window.onorientationchange === 'object'),
						oFlag = false,
						ow, lFlag = false,
						lh;
					// oFlag = false,ow,lFlag = false,lh 记住第一次的值就好了 不让fontsize因为计算单位发生变化而改变
					var init = function() {
						var orientation, docEl = doc.documentElement,
							dpr = Math.min(win.devicePixelRatio, 3),
							count = 0;
						var updateOrientation = function() {
							var clientWidth = docEl.clientWidth;
							var clientHeight = docEl.clientHeight;
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
							console.log(orientation)
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
							if(orientation === 'portrait') {
								if(clientWidth == undefined) return;
								if(clientWidth / dpr > 750) {
									clientWidth = 750 * dpr;
								}
								oFlag = true
								docEl.style.fontSize = Math.round(40 * (ow / 750)) + 'px';
							}
							if(orientation === 'landscape') {
								if(clientHeight === undefined) return;
								if(clientHeight / dpr > 750) {
									clientHeight = 750 * dpr;
								}
								lFlag = true
								docEl.style.fontSize = Math.round(40 * (lh / 750)) + 'px';
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
			}
		}
	}
</script>