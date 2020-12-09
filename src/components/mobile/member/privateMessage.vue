<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>
			
			<article>
				<section class="tab-section">
		           	<div class="row mt-15">
		           		<!-- 开始时间 -->
		            	<input type="date" class="form-control" 
		            		name="StartTime"
		            		v-model="QueryConditions.StartTime"
		            		v-validate="{ rules: { required: true }}"
		            	/>
		            	<!-- 结束时间 -->
		            	<input type="date" class="form-control" 
		            		name="StartTime"
		            		v-model="QueryConditions.EndTime"
		            		v-validate="{ rules: { required: true }}"
		            	/>
		            	<a class="btn btn-bind" @click="UpdateQueryCondition()">查询</a>
		            </div>
	            	<div class="row">
	            		<!-- 公告类型 -->
						<p class="form-select icon">
						    <select v-model="DisplayQueryObj.MessageType">
	                            <option v-for="(MessageType,index) in this.MessageTypeList" :key="index" v-bind:value="MessageType">{{MessageType.Name}}</option>
	                        </select>
						</p>
					</div>
					<div class="error-row">
						<p class="error-tip" v-if="errors.has('StartTime') && fields.StartTime.touched">
	                    	* 请选择起始日期
	                    </p>
	                    <p class="error-tip" v-else-if="errors.has('EndTime') && fields.EndTime.touched">
	                    	* 请选择结束日期
	                    </p>
						<p class="error-tip" v-show="this.QueryConditions.EndTime < this.QueryConditions.StartTime">
	                    	* 起始日期不能大于结束日期
	                    </p>
					</div>
				</section>
				<section class="msg-list">
					<ul>
						<li v-for="(MessageData,index) in this.MessageList" :key="index" >
							<label>{{MessageData.CreateTick | utcTicksToLocalTime('YYYY/MM/DD HH:mm:ss')}}</label>
							<div class="msg">
								<p>【{{MessageData.Title}}】{{MessageData.Content}}</p>
								<div class="more">
									阅读全文<em class="icon-more"></em>
								</div>
							</div>
						</li>
					</ul>
				</section>
				<p class="scroll-footer-tip"></p>
			</article>
		</section>
	</div>
</template>

<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
	import moment from 'moment';
	import EventBus from 'scripts/common/EventBus';
	import BLDef from 'scripts/common/BLDef';
	import RegEx from 'scripts/common/CommDef';
    import CommUtility from 'scripts/common/CommUtility';  
    
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService';
	
	export default {
		data() {
			return {
                HeaderTitle: '公告信息',
                
                waterfallLock: false,
                // 正則表達式
                Reg: RegEx.Regex,
                DisplayQueryObj: {			//所选公告类型
                    MessageType: {}
                },
                QueryConditions: {
                    PrivateMessageType: -1,	//搜索类型
                    PagingInfo: {
                        PageSize: 30
                    },
                    StartTime: moment(new Date()).format('YYYY-MM-DD'),
                    EndTime: moment(new Date()).format('YYYY-MM-DD'),
                },
                MessageList: [], 		//信息列表
                MessageTypeList: [],	//信息类型
                CurrentPage: 0,
                MaxPage: 0,
                IsAllShow: false,			// 是否已載入完全部
			};
        },
		created: function() {
			this.Load();
		},
		mounted: function () {
            this.GetMessageType();
        },
		methods: {
			Load: function() {
				this.$nextTick(function() {
					//tab切换
					$(".tab-head li").click(function(){
						console.log($(this));
						$(this).addClass("active").siblings("li").removeClass("active");
					});
					//阅读全文
					$(".msg-list .more").click(function() {
						var that = $(this);
						var li = $(that.parents("li")[0]);
						if(li.hasClass("open")){
							li.removeClass("open");
						}else{
							li.addClass("open");
						}
					});
				})
			},
			//获取列表
			GetMessageType: async function () {
				EventBus.$emit('GlobalLoadingTrigger', true)
                const data = await PersonalCenterService.PrivateMessage_LoadMainPage();
                EventBus.$emit('GlobalLoadingTrigger', false)
                
                if (data.Ret === BLDef.ErrorRetType.SUCCESS) {
                    this.MessageTypeList = data.Data.PrivateMessageTypeList;
                    this.DisplayQueryObj.MessageType = data.Data.PrivateMessageTypeList[0];
                    this.QueryConditions.PrivateMessageType = data.Data.PrivateMessageTypeList[0];
                    this.waterfallLock = true;
                    this.GetCurrentPageData(1);
                }
            },
            // 切換頁面時進行原條件搜尋
            GetCurrentPageData: async function (pageNo) {
                if (pageNo !== undefined) {
                    this.QueryConditions.PagingInfo.PageNo = pageNo;
                }
                console.log(this.QueryConditions)
                EventBus.$emit('GlobalLoadingTrigger', true)
                const data = await PersonalCenterService.PrivateMessage_Query(this.QueryConditions);
                EventBus.$emit('GlobalLoadingTrigger', false)
                this.waterfallLock = false;
                
                this.MessageList = this.MessageList.concat(data.Data.PrivateMessageList); //分页
                
                this.MaxPage = Math.ceil(data.Data.PagingInfo.TotalCount / this.QueryConditions.PagingInfo.PageSize);
                
                // 是否已載入完全部
	            if (this.MessageList.length == data.Data.PagingInfo.TotalCount) {
	                this.IsAllShow = true;
	                $('.scroll-footer-tip').html("资料已全部载入");
	                if (this.MessageList.length < 1){
	                	$('.scroll-footer-tip').html("暂无数据");
	                }
	            }
	            else {
	                this.IsAllShow = false;
	                $('.scroll-footer-tip').html("");
	            }
		            
                this.CurrentPage++;
            },
            // 點擊搜索，更新搜尋條件
            UpdateQueryCondition: async function () {
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });
                EventBus.$emit('GlobalLoadingTrigger', true)
                const result = await this.$validator.validateAll();
                EventBus.$emit('GlobalLoadingTrigger', false)
                const anyFieldInvalid = this.CheckFied();
                if (anyFieldInvalid === true || result === false) {
                    return;
                }
                
                this.QueryConditions.PagingInfo.PageNo = 1;
                this.QueryConditions.PrivateMessageType = this.DisplayQueryObj.MessageType;
                this.QueryConditions.StartTick = CommUtility.LocalTimeToUtcTicks(this.QueryConditions.StartTime);
                this.QueryConditions.EndTick = CommUtility.LocalTimeToUtcTicks(this.QueryConditions.EndTime, true);
//              EventBus.$emit('PrivateMessage_ResetList');

                this.MessageList = [];
                
                this.waterfallLock = true;
                this.CurrentPage = 0;
                this.GetCurrentPageData(1);
            },
            
            // 驗證搜尋欄位正確性
            CheckFied: function () {
                let anyInvalid = false;
                // 開始日期大於結束日期
                if (new Date(this.QueryConditions.StartTime) > new Date(this.QueryConditions.EndTime)) {                    
                    anyInvalid = true;
                }
                return anyInvalid;
            },
            
		},
		components: {
			mainHeader,
		},
		watch: {
			'$route' (to, from) {
				console.log('點擊搜索，更新搜尋條件')
				this.QueryConditions.StartTime = this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                this.$validator.reset()
			}
		},
	}
</script>