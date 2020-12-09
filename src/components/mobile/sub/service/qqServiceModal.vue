<template>
	<!-- qq客服 弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="qqServiceModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">7x24小时在线客服</h4>
		          	</div>
	            	<div class="modal-body">
            			<ul>
            				<li v-for="QQInfo in CustomerService.CustomerServiceSettingInfoList">
	            				<a @click="CallQQClient(QQInfo.QQAcct)">
		            				<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/index/icon_qq_service.png'" />
		            			</a>
		            			<label>{{QQInfo.Name}}</label>
	            			</li>
            			</ul>
            			<!--<h5>QQ在线客服：艾米</h5>-->
            			<p>
            				<span>温馨提示：</span>
            				<span>如果您在使用过程中有任何疑问，都可点 击客服QQ联系客服咨询。</span>
            			</p>
            			<p>
            				<em class="icon-service1"></em>客服电话：<a href="tel:CustomerService.CustomerServicePhoneNo">{{this.CustomerService.CustomerServicePhoneNo}}</a>
            			</p>
					</div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <div class="modal-footer-close" data-dismiss="modal" ></div>
		</div>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/service/index.less';
</style>

<script>
	import BLDef from 'scripts/common/BLDef';
	import CommonService from 'scripts/businessLogic/commonService';
	
	export default {
	    data() {
	        return {
	            CustomerService: {},
	            // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
	        };
	    },
	    created: function () {
	        this.GetCustomerServiceInfo();
	    },
	    methods: {
	        GetCustomerServiceInfo: async function () {
	            const inputObj = { WGUID: BLDef.WGUID };
	            const data = await CommonService.Comm_GetCustomerServiceInfo(inputObj);
	            if (data.Ret === BLDef.ErrorRetType.SUCCESS) {
	                this.CustomerService = data.Data.CustomerServiceInfo;
	                //客服最多不超过3个
	                if(this.CustomerService.CustomerServiceSettingInfoList && this.CustomerService.CustomerServiceSettingInfoList.length > 3){
	                	this.CustomerService.CustomerServiceSettingInfoList = this.CustomerService.CustomerServiceSettingInfoList.slice(0,3)
	                }
	            }
	        },
	        CallQQClient: function (QQAcct) {
	            const QQHref = 'http://wpa.qq.com/msgrd?v=3&uin=' + QQAcct + '&site=qq&menu=yes';
	            window.open(QQHref);
	        }
	    },
	};
</script>
