<template>

	<!-- 推广二维码弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="scanModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">
			<div class="modal-shadow-bg"></div>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-close" type="button" data-dismiss="modal"></div>
					<div id="imgBox" class="modal-body"></div>
					
					<!-- 加载中 -->
					<div class="LoadBox" v-show="ShowLoading===true">
				        <div class="Lp">
				            <span class="LoadIcon"></span>
				        </div>
				    </div>
	        	</div>
				<!-- /.modal-content -->
			</div>
		</div>
	</div>

</template>

<script>
	import 'scripts/custom/jquery.qrcode.min.js';
	import BLDef from 'scripts/common/BLDef';
	import Security from 'scripts/common/Security';
	import agentService from 'scripts/businessLogic/agentService';

	export default {
		props: {
//          UserInfo: Object,
		},
		data() {
			return {
				PromotionLinkImg: undefined,
				ScanType: undefined,
				userScan: undefined,
				agentScan: undefined,

				ToKen: '',
				Auth: '',
				logoutTimeL: '',
				ShowLoading: true,
				// 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN,
			}
		},
		created: function() {
			this.Load()
			this.GetScanImgUrl()
		},
		methods: {
			//获取推广二维码地址，在调试
			GetScanImgUrl: async function() {
				var dataObj = {
					UserID: 0,
					WGUID : BLDef.WGUID
				};
				const data = await agentService.GetQRCode(dataObj)
				console.log('======================================================');
				console.log(data);
				console.log(data.Data.QRCode);
				console.log('======================================================');

				// if (data.Ret == 0) {
				this.PromotionLinkImg =  data.Data.QRCode;
//				this.PromotionLinkImg = 'data:image/png;base64,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'
				this.draw()
				// } 
			},
			Load: function() {
				this.$nextTick(function() {
					//					
					//弹窗高度
					$('#scanModal').on('show.bs.modal', function() {
						$(this).css('display', 'block');
						var ModalHeight = $(window).height() / 2 - $('#scanModal .modal-dialog').height() / 2 + 10;
						$(this).find('.modal-dialog').css({
							'margin-top': ModalHeight
						});
					});

					$('#scanModal .modal-shadow-bg').click(function() {
						$("#scanModal").modal('hide');
					});
				})
			},
			// 图片合成
			draw: function() {
				var data1 = [ //会员推广背景
					'/static/images/mobile/agent/user_scan_bg.jpg',
					this.PromotionLinkImg
				]

				var c = document.createElement('canvas'),
					ctx = c.getContext('2d'),
					len = data1.length;
				c.width = 720
				c.height = 1280
				ctx.rect(0, 0, c.width, c.height);
				ctx.fillStyle = 'transparent'; //画布填充颜色
				ctx.fill();
				this.drawing(0, len, c, data1, ctx);
			},
			drawing: function(n, len, c, data1, ctx) {
				var that = this
				var width = $('#imgBox').width()
				var height = $('#imgBox').height()

				if(n < len) {
					var img = new Image;
					//img.crossOrigin = 'Anonymous'; //解决跨域
					img.src = data1[n];
					img.onload = function() {
						if(n == 0) { //底图
							ctx.drawImage(img, 0, 0, 720, 1280);
						} else { //二维码
							ctx.drawImage(img, 720 * 0.37, 1280 * 0.72, 720 * 0.29, 720 * 0.29);
						}
						that.drawing(n + 1, len, c, data1, ctx); //递归
					}
				} else {
					//保存生成作品图片
					this.convertCanvasToImage(c);
				}
			},
			convertCanvasToImage: function(canvas) {
				var hc_image = new Image();
				hc_image.src = canvas.toDataURL("image/png");
				$('#imgBox').html(hc_image);
				this.ShowLoading = false
			}
		},
	}
</script>