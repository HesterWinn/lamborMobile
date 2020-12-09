<template>
	
	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="gameVendorListModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">账户列表</h4>
	            		<div class="modal-close" type="button" data-dismiss="modal"></div>
		          	</div>
	            	<div class="modal-body">  
						<ul class="account-fund">
				            <li v-for="(item, index) in this.GameVendorList" :key="index" 
				            	:class="item.IsMaintaining === true ? 'click-flase' : ''"
				            	@click="ChangeGameVendor(item)">
				                <div>
				                    <span class="span1">
				                        <label v-if="item.GameAPIVendor === -1">主账户</label>
				                        <img v-if="item.GameAPIVendor !== -1" v-bind:src="ResourceCDN + '/PartnerLogo/bglight/v-logo' + item.GameAPIVendor + '.png?VersionCode'" style="vertical-align:middle" />
				                    </span>
				                    <span class="span2">
				                        <div style="width:20px" v-if="item.BalanceCompleted === false">
				                            <img class="icon-load" :src="ResourceCDN+'/EditionImg/Lambor1.0/images/web/index/ajax-loader.gif?VersionCode'">
				                        </div>
				                        <em v-if="item.BalanceCompleted === true">{{item.VAmount}}</em>
				                    </span>
				                </div>
				            </li>
				        </ul>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
	
</template>

<script>
	import BLDef from 'scripts/common/BLDef'
	import EventBus from 'scripts/common/EventBus'
	import GameService from 'scripts/businessLogic/gameService'
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService'
	
	export default {
		data() {
			return {
	            APIVendorType: '',		//账户类型：FromAPIVendor 转出账户； ToAPIVendor 转入账户
	            tmpSummaryList: [],		//厂商余额列表
                GameVendorList: [],		//厂商列表
                // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
        },
        created: function () {
            const self = this;
            EventBus.$on('changeAPIVendorType', data => {
                self.APIVendorType = data;
            });
        },
        mounted: function () {
            this.GetVendorList()
        },
		methods: {
			// 获取厂商列表
			GetVendorList: async function () {
                const data = await GameService.GetGameMaintainStatus()
                if (data.Ret == 0) {
                    const tmpGameVendorList = data.Data.GameAPIVendorMaintainStatusList
                    for (let i = 0; i < tmpGameVendorList.length; i++) {
                        tmpGameVendorList[i].VAmount = undefined
                        tmpGameVendorList[i].BalanceCompleted = false
                    }
                    this.GameVendorList = tmpGameVendorList
                    for (let i = 0; i < this.GameVendorList.length; i++) {
	                    this.tmpSummaryList[i] = {};
	                    this.BalanceInit(i);
	                }
                }
           	},
           	// 设置默认遊戲商餘額
            BalanceInit: function (vendorIndex) {
                this.GameVendorList[vendorIndex].BalanceCompleted = false;
                if (this.GameVendorList[vendorIndex].IsMaintaining === true) {
                    this.tmpSummaryList[vendorIndex].Amount = '敬请期待';
                    this.GameVendorList[vendorIndex].VAmount = '敬请期待';
                    this.GameVendorList[vendorIndex].BalanceCompleted = true;
                } else {
                    this.GetBalance(vendorIndex, this.GameVendorList[vendorIndex].GameAPIVendor);
                }
            },
            // 取得遊戲商餘額
            GetBalance: async function (vendorIndex, vendorID) {
                const inputObj = {
                    APIVendorID: vendorID
                };
                console.log(inputObj);
                const data = await PersonalCenterService.EWalletTransfer_GetBalance(inputObj);
                 console.log(data);
                if (data.Ret == 0 ) {
                    this.tmpSummaryList[vendorIndex].Amount = data.Data.GameApiBalance.Amount;
                    this.GameVendorList[vendorIndex].VAmount = data.Data.GameApiBalance.VAmount;
                } else {
                    this.tmpSummaryList[vendorIndex].Amount = '维护中';
                    this.GameVendorList[vendorIndex].VAmount = '维护中';
                }
                this.GameVendorList[vendorIndex].BalanceCompleted = true;
            },
            ChangeGameVendor: function(GameVendor){
            	if(GameVendor.IsMaintaining === true){		//敬请期待，不可点击
            		return
            	}
        		EventBus.$emit('changeAPIVendorObj', GameVendor) //更新选中的 转出、转入厂商
        		$('#gameVendorListModal').modal('hide')
            },
		},
		beforeDestroy() {
            EventBus.$off('changeAPIVendorType');
        }
	}
</script>



