<template>
	<!-- 免费试玩弹窗提示 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="activityInfoModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header-close" data-dismiss="modal"></div>
	            	<div class="modal-body">
	            		<!--首存-->
	            		<section v-if="ActiveID == -1">
	            			<div class="activity-banner">
		            			<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/promotion/first_activity.jpg?VersionCode'" />
		            		</div>
		            		<div class="activity-info">
		            			<h5>新人报道！联盟娱乐有礼！</h5>
		            			<h5>超高返水，送不停！</h5>
		            			<p>你没听错！首存即享超高返水！为感谢广大新注册用户对联盟娱乐平台的信赖与支持，联盟娱乐特推出首存返利劲爆豪礼！专属福利， 回馈全球！首存越多，返水越高！所有新注册用户皆可参与！机不可失，快快行动吧！
									</br>详情请参考网站活动公告。</p>
		            		</div>
	            		</section>
	            		<!--續存-->
	            		<section v-else-if="ActiveID == -2">
	            			<div class="activity-banner">
		            			<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/promotion/orther_activity.jpg?VersionCode'" />
		            		</div>
		            		<div class="activity-info">
		            			<h5>激情乐翻天，返水享不停！</h5>
		            			<h5>超级豪礼，全球同抢！</h5>
		            			<p>为感谢广大客户对联盟娱乐平台的支持与信赖，联盟娱乐特推出续存返利重磅豪礼！存就送！超高返水，抢到手软！不分新老玩家、人人皆可参与，史无前例的全民狂欢，你还在等什么？
									</br>详情请参考网站活动公告。</p>
		            		</div>
	            		</section>
	            		<!-- 其他 -->
	            		<section v-else-if="ActiveID > 0">
	            			<div class="activity-banner">
		            			<img v-if="ActLogoFlag == true" :src="WebVersionHost + PromotionDetail.ActLogo" />
		            		</div>
		            		<div class="activity-info">
		            			<h5>{{PromotionDetail.Name}}</h5>
		            			<span>{{PromotionDetail.StartTick | utcTicksToLocalTime('YYYY/MM/DD HH:mm')}} -  {{PromotionDetail.EndTick | utcTicksToLocalTime('YYYY/MM/DD HH:mm')}} (GMT+8)</span>
		            			<p v-html="this.PromotionDetail.ActContent"></p>
		            		</div>
	            		</section>
	            		
	            		<div class="activity-info row">
					        <a @click="ToRechargePage()" class="btn btn-gold" >进入存款</a>
	            		</div>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	</div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/activityList/index.less';
</style>
<script>
	import InformationService from 'scripts/businessLogic/informationService'
	import CommonService from 'scripts/businessLogic/commonService'
	import CommUtility from 'scripts/common/CommUtility'
	import BLDef from 'scripts/common/BLDef'
	import EventBus from 'scripts/common/EventBus'
	import HttpService from 'scripts/common/HttpService'

	export default {
		data() {
			return {
                ActiveID: undefined,
                PromotionDetail: {},
	            // 圖片旗標
	            ActLogoFlag: false,
	            // 首存，续存
            	OtherActivityData: false,
	            // 传递活动详情到个人中心
	            TransActivityData: {},
	            // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN,
            }
		},
		created: function () {
            const self = this
            EventBus.$on('changeActiveType', data => {
                self.ActiveID = data
                if (self.ActiveID >= 0) {
	            	this.OtherActivityData = true
		            self.GetPromotionDetail()
		        }
            })
        },
        methods: {
        	Load: function() {
				this.$nextTick(function() {
					this.ModalHeight()
				})
			},
			// 獲得頁面資料
	        GetPromotionDetail: async function () {
	            const dataObj = {
	                WGUID: BLDef.WGUID,
	                ID: this.ActiveID
	            };
	            const retData = await InformationService.GetActivityDetail(dataObj);
	            this.TransActivityData = retData.Data.Detail; // 2018.09.21 SeyoChen
	
	            // 失敗
	            if (retData.Ret != 0) {
	                const notifyData = {
	                    NotifyMessage: retData.Message
	                };
	                EventBus.$emit('showNotifyMessage', notifyData);
	                return;
	            } // end if
	
	            // 成功
	            this.PromotionDetail = retData.Data.Detail;
	            console.log(retData.Data.Detail)
	            this.PromotionDetail.ActContent = await HttpService.GetContent(this.ResourceURL + retData.Data.Detail.ActContent);
	
	            if ( !(retData.Data.Detail.ActLogo == null)) {
	                this.ActLogoFlag = true;
	            } // end if
	        }, // end GetPromotionDetail
	        
	        // 传值到支付页面 2018.09.21 SeyoChen
	        ToRechargePage: async function () {
	        	$('#activityInfoModal').modal('hide')
//	        	if(!this.OtherActivityData){
//	        		$('#depositModal').modal('show')
//	        		return
//	        	}
	            const retDataCheck = await CommonService.Comm_CheckPermission();
	            if (retDataCheck.Status != 0) {
	            	$('#depositModal').modal('show')
	            }else {
	                this.$router.push( { name: 'login' })
	            }
	        },
		},
        beforeDestroy() {
            EventBus.$off('showNotifyMessage');
        }
   }
</script>
