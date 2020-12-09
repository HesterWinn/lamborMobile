<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap fund-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>
			
			<article>
				<section class="tab-section">
	            	<form novalidate="novalidate" class="addcard-form">
						<div class="row input-group">
							<label>主  账  户</label>
							<i class="form-control">￥456486135213.00</i>
						</div>
						<div class="row input-group">
							<label>转出账户</label>
							<div class="form-control" @click="bindGameVendor('FromAPIVendor')" :class="FromAPIVendorObj.VAmount ? 'active' : ''">
								<img v-if="FromAPIVendorObj.GameAPIVendor && FromAPIVendorObj.GameAPIVendor !== -1" :src="ResourceCDN + '/PartnerLogo/bglight/v-logo' + FromAPIVendorObj.GameAPIVendor + '.png?VersionCode'" />
								<p v-if="FromAPIVendorObj.GameAPIVendor === -1">主账户</p>
								<i>{{FromAPIVendorObj.VAmount || '请选择转出账户'}}</i>
							</div>
						</div>
						<div class="row input-group">
							<label>转入账户</label>
							<div class="form-control" @click="bindGameVendor('ToAPIVendor')" :class="ToAPIVendorObj.VAmount ? 'active' : ''">
								<img v-if="ToAPIVendorObj.GameAPIVendor && ToAPIVendorObj.GameAPIVendor !== -1" :src="ResourceCDN + '/PartnerLogo/bglight/v-logo' + ToAPIVendorObj.GameAPIVendor + '.png?VersionCode'" />
								<p v-if="ToAPIVendorObj.GameAPIVendor === -1">主账户</p>
								<i>{{ToAPIVendorObj.VAmount || '请选择转入账户'}}</i>
							</div>
						</div>
						<div class="row input-group">
							<label>转账金额</label>
                        	<input type="text" placeholder="请输入转换金额" name="TransferAmount" class="form-control"
                           		v-model="TransferData.Amount"
	                            v-validate="{ rules: { regex:Reg.MoneyAmount, between:[1, 100000000] , required: true }}"
	                        />
                        	<p class="error-tip" v-if="TransferData.FromAPIVendorID==undefined">
                    			* 请选择转出账户
                         	</p>
                         	<p class="error-tip" v-else-if="TransferData.ToAPIVendorID==undefined">
                    			* 请选择转入账户
                         	</p>
                         	<p class="error-tip" v-else-if="errors.has('TransferAmount') && fields.TransferAmount.touched">
                    			* 仅可以使用正整数, 数字范围¥1-¥100,000,000
                         	</p>
						</div>
						<div class="row mt-10">
							<a class="btn btn-gold" @click="PostTransfer();">提&emsp;交</a>
							<router-link :to="{ name: 'member'}" class="btn btn-gray">取&emsp;消</router-link>
						</div>
					</form>
				</section>
			</article>
		</section>
		
		<!-- 厂商列表 -->
		<game-vendor-list-modal></game-vendor-list-modal>
	</div>
</template>

<script>
	import Vue from 'vue'
	import mainHeader from '@/components/mobile/sub/mainHeader'
	import gameVendorListModal from '@/components/mobile/sub/member/gameVendorListModal'
	import BLDef from 'scripts/common/BLDef'
	import Regex from 'scripts/common/CommDef'
	import EventBus from 'scripts/common/EventBus'
	import PersonalCenterService from 'scripts/businessLogic/personalCenterService'
	
	export default {
		data() {
			return {
                HeaderTitle: '资金管理',
                Reg: Regex.Regex,
                InitialAPIVendorObj:{
                	GameAPIVendor: undefined,
                	VAmount: undefined
                },
                FromAPIVendorObj: undefined,		//转出账户
                ToAPIVendorObj:undefined,			//转入账户
                //表单数据
                TransferData: {
                    FromAPIVendorID: undefined,
                    ToAPIVendorID: undefined,
                    Amount: ''
                },
                APIVendorType: '',					//账户类型：FromAPIVendor 转出账户； ToAPIVendor 转入账户
                // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
        },
        created: function () {
            const self = this;
            self.FromAPIVendorObj = Vue.util.extend({}, self.InitialAPIVendorObj)
            self.ToAPIVendorObj = Vue.util.extend({}, self.InitialAPIVendorObj)
            
            //选择转出、转入账户
            EventBus.$on('changeAPIVendorObj', data => {
            	if(self.APIVendorType == 'FromAPIVendor'){
            		self.FromAPIVendorObj = data
            		self.TransferData.FromAPIVendorID = data.GameAPIVendor
            		if(data.GameAPIVendor == self.TransferData.ToAPIVendorID){	//转出与转入账户相同，默认转出为空
            			self.ToAPIVendorObj = Vue.util.extend({}, self.InitialAPIVendorObj)
            		}
            	}else{
            		self.ToAPIVendorObj = data
            		self.TransferData.ToAPIVendorID = data.GameAPIVendor
            		if(data.GameAPIVendor == self.TransferData.FromAPIVendorID){	//转出与转入账户相同，默认转出为空
            			self.FromAPIVendorObj = Vue.util.extend({}, self.InitialAPIVendorObj)
            		}
            	}
            	console.log('FromAPIVendor')
            	console.log(self.FromAPIVendorObj)
            	console.log('ToAPIVendorObj')
            	console.log(self.ToAPIVendorObj)
            });
        },
		methods: {
			//点击转出、转入账户
			bindGameVendor: function(flag){
				this.APIVendorType = flag;
				EventBus.$emit('changeAPIVendorType', flag); //修改弹窗转出、转入类型
				$('#gameVendorListModal').modal('show')		//打开弹窗
			},
			// 進行轉帳
            PostTransfer: async function () {
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });
                const result = await this.$validator.validateAll();
                if (result === false || this.TransferData.FromAPIVendorID === undefined || this.TransferData.ToAPIVendorID === undefined) {
                    return;
                }
                const inputObj = this.TransferData;
                
                EventBus.$emit('GlobalLoadingTrigger', true);
                const data = await PersonalCenterService.EWalletTransfer_Transfer(inputObj);
                EventBus.$emit('GlobalLoadingTrigger', false);
                
                const notifyData = {
                    NotifyMessage: data.Message
                };
                if (data.Ret == 0) {
                    this.ResetForm();
                }
                // 彈窗訊息
                EventBus.$emit('showNotifyMessage', notifyData);
            },
            // 重置選項與金額
            ResetForm: function () {
                this.ToAPIVendorObj = Vue.util.extend({}, self.InitialAPIVendorObj)
                this.FromAPIVendorObj = Vue.util.extend({}, self.InitialAPIVendorObj)
                this.TransferData = {
                    FromAPIVendorID: undefined,
                    ToAPIVendorID: undefined,
                    Amount: ''
                }
                this.$validator.reset();
            },
		},
		components: {
			mainHeader,
			gameVendorListModal,
		},
		watch: {
			'$route' (to, from) {
				this.TransferData = {
					FromAPIVendorID: undefined,
                    ToAPIVendorID: undefined,
                    Amount: ''
				}
                this.$validator.reset()
			}
		},
		beforeDestroy() {
            EventBus.$off('changeAPIVendorObj');
        }
	}
</script>