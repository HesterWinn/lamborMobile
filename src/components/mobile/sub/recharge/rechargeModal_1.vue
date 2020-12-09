<template>
	
	<!-- 充值弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="rechargeModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">充值金币</h4>
		          	</div>
	            	<div class="modal-body">  
						<form class="recharge-form">
							<div class="slider">
								<ul>
									<li class="active">
										<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/recharge/qq.png'" />
										<em class="icon-slider-active"></em>
									</li>
									<li>
										<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/recharge/bank.png'" />
										<em class="icon-slider-active"></em>
									</li>
									<li>
										<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/recharge/wx.png'" />
										<em class="icon-slider-active"></em>
									</li>
								</ul>
							</div>
							<div class="row">
								<p class="form-select icon">
									<select name="passway" id="passway">   
								        <option value="1">ATM自动柜员机</option>   
								        <option value="2">ATM现金入款</option>   
								        <option value="3">银行柜台</option>   
								    </select> 
								</p>
							</div>
							<div class="row">
								<input id="amount" type="text" class="form-control" placeholder="请输入金额" />
								<em for="amount" class="icon-input-clean"></em>
								<p class="tip">现金金额 0</p>
							</div>
							<div class="row">
								<a class="btn btn-gold">确认充值</a>
								<a class="btn btn-purple">联系客服充值</a>
							</div>
						</form>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <div class="modal-footer-close" data-dismiss="modal" ></div>
		</div>
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
		created: function() {
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					//选择支付方式
					$('.slider li').click(function(){
						$(this).addClass("active").siblings("li").removeClass("active");
					});
					//输入框清空
					$('.icon-input-clean').click(function(){
						var that = $(this);
						var id = that.attr("for");
						$("#"+id).val('');
					});
				})
			},
		},
	}
</script>

