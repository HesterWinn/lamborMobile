<template>
	<!-- 优惠活动列表 -->
	<section class="msg-wrap active-wrap">
		<!--头部-->
		<main-header :HeaderTitle="this.HeaderTitle"></main-header>
		<!-- 内容 -->
		<div class="activity-box">
			<h3></h3>
			<div class="activity-list">
                <a href="javascript:void(0);" 
                	:class="currActivity == Activity.ID ? 'active' : ''"
                	@click="ChangeActiveType(Activity.ID)" 
                	data-toggle="modal" data-target="#activityInfoModal" 
                	v-for="Activity in ActivityList">
                	
                    <img v-if="Activity.ID > 0" :src="ResourceURL + Activity.ActListLogo"/>
                    <img v-else :src="Activity.ActListLogo"/>
                </a>
            </div>
		</div>
		
		<!-- 活动详情弹窗 -->
		<activity-info-modal></activity-info-modal>
		
		<!-- 充值弹窗 -->
		<deposit-modal></deposit-modal>
    </section>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/activityList/index.less';
</style>
<script>
	import Vue from 'vue'
	import mainHeader from '@/components/mobile/sub/mainHeader'
	import EventBus from 'scripts/common/EventBus'
	import BLDef from 'scripts/common/BLDef'
	import CommUtility from 'scripts/common/CommUtility'
	import CommonService from 'scripts/businessLogic/commonService'
	import InformationService from 'scripts/businessLogic/informationService'
	import activityInfoModal from '@/components/mobile/sub/activityList/activityInfoModal'
	import depositModal from '@/components/mobile/sub/recharge/depositModal'
	
	export default {
		data() {
	        return {
	        	HeaderTitle: '优惠活动',
	            // 載入畫面資料
	            LoadMainPageDataModel: {
	            	BannerActivityList: [],
	                ActivityList: [],
	            },
	            // 分頁資料
	            PageInfo: {
	                PageNo: 1,
	                PageSize: 9,
	                PageCount: 0,
	                TotalCount: 0,
	            },
	            DefaultActivityList: [],
	            ActivityList: [],	//页面显示优惠活动列表
	            currActivity: undefined,	//当前选中活动
	            // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN,
	        };
	    },
	    created: function () {
	        this.GetPromotion(1);
	    },
		methods: {
			// 取得畫面資料
	        GetPromotion: async function (pageNo) {
	            this.PageInfo.PageNo = pageNo;
	            const DataObj = {
	                WGUID: BLDef.WGUID,
	                PagingInfo: this.PageInfo
	            };
	            // 获取未登录状态的优惠活动
	            const retData = await InformationService.GetActivityList(DataObj);
	            if (retData.Ret != 0) {
	                const notifyData = { 
	                    NotifyMessage: retData.Message
	                };
	                EventBus.$emit('showNotifyMessage', notifyData);
	                return;
	            } // end if
	            this.SetDefaultActivityList();		// 添加默认两个活动
	            switch (retData.Data.PagingInfo.TotalCount) {
	                case 0:
	                    this.LoadMainPageDataModel.BannerActivityList = Vue.util.extend([], this.DefaultActivityList);
	                    this.LoadMainPageDataModel.ActivityList = Vue.util.extend([], this.DefaultActivityList);
	                    break;
	                case 1:
	                    this.LoadMainPageDataModel.BannerActivityList = Vue.util.extend([], this.DefaultActivityList);
	                    this.LoadMainPageDataModel.BannerActivityList = this.LoadMainPageDataModel.BannerActivityList.concat(retData.Data.BannerActivityList);
	                    this.LoadMainPageDataModel.ActivityList = Vue.util.extend([], this.DefaultActivityList);
	                    this.LoadMainPageDataModel.ActivityList = this.LoadMainPageDataModel.ActivityList.concat(retData.Data.ActivityList);
	                    break;
	                case 2:
	                    this.LoadMainPageDataModel.BannerActivityList.push(this.DefaultActivityList[0]);
	                    this.LoadMainPageDataModel.BannerActivityList = this.LoadMainPageDataModel.BannerActivityList.concat(retData.Data.BannerActivityList);
	                    this.LoadMainPageDataModel.ActivityList.push(this.DefaultActivityList[0]);
	                    this.LoadMainPageDataModel.ActivityList = this.LoadMainPageDataModel.ActivityList.concat(retData.Data.ActivityList);
	                    break;
	                default:
	                    this.LoadMainPageDataModel.ActivityList = retData.Data.ActivityList;
	                    this.LoadMainPageDataModel.BannerActivityList = retData.Data.ActivityList.slice( 0, 3);
	                    break;
	            }
	            // 2018.09.20 SeyoChen 获取登录后优惠活动
	            const retDataLv = await CommonService.Comm_CheckPermission();
	            if (retDataLv.Status != 0) {
	                const dataObj = { WGUID: '', LoginID: '' };
	                dataObj.WGUID = BLDef.WGUID;
	                dataObj.LoginID = localStorage.getItem('Acct');
	                const ActivityData = await CommonService.Comm_GetBonusActivity_MemberLv(dataObj);
	                this.ActivityList = ActivityData.Data.ActivityList;
	            } else {         
	                this.ActivityList = this.LoadMainPageDataModel.ActivityList;          
	            }        
	            // 更新Paging
	            this.PageInfo.PageCount = Math.ceil(retData.Data.PagingInfo.TotalCount / retData.Data.PagingInfo.PageSize)
	        }, // end GetPromotion
	        
            // 設定預設的優惠活動(首存/續存)
	        SetDefaultActivityList: function () {
	            const Today = CommUtility.UtcTicksToLocalTime(new Date().getTime(), 'MM/DD');
	            // 優惠活動-首存
	            const DefaultActivityList1 = {
	                ID: '-1',
	                Name: '首存返利',
	                StartTick: new Date().getTime(),
	                EndTick: new Date().getTime(),
	                ActLogo: this.ResourceCDN + '/EditionImg-mobile/Lambor1.0/images/mobile/promotion/activity_banner1.png?VersionCode',
	                ActListLogo: this.ResourceCDN + '/EditionImg-mobile/Lambor1.0/images/mobile/promotion/activity_img1.jpg?VersionCode',
	                ActContent: '<p class="p_1">首存返利</p><p class="p_2">' + Today + '</p>'
	            };
	            // 優惠活動-續存
	            const DefaultActivityList2 = {
	                ID: '-2',
	                Name: '续存返利',
	                StartTick: new Date().getTime(),
	                EndTick: new Date().getTime(),
	                ActLogo: this.ResourceCDN + '/EditionImg-mobile/Lambor1.0/images/mobile/promotion/activity_banner2.png?VersionCode',
	                ActListLogo: this.ResourceCDN + '/EditionImg-mobile/Lambor1.0/images/mobile/promotion/activity_img2.jpg?VersionCode',
	                ActContent: '<p class="p_1">续存返利</p><p class="p_2">' + Today + '</p>'
	            };
	
	            this.DefaultActivityList.splice(0, 1, DefaultActivityList1);
	            this.DefaultActivityList.splice(1, 1, DefaultActivityList2);
	        }, // end SetDefaultActivityList
	        // 打开活动详情
	        ChangeActiveType: function (ActiveID) {
	        	this.currActivity = ActiveID
	        	console.log(this.currActivity)
            	EventBus.$emit('changeActiveType', ActiveID)
            },
        },
        components: {
			mainHeader,
			activityInfoModal,
			depositModal,
		},
   }
</script>