<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap recoed-wrap">
            <!--头部-->
		    <main-header :HeaderTitle="this.HeaderTitle"></main-header>
            
			<article>
				<ul class="tab-head">
					<li :class="QueryTypeFlag == 'CashFlow'?'active':''" @click="ChangeQueryType('CashFlow')">资金往来查询</li>
					<li :class="QueryTypeFlag == 'BettingRecord'?'active':''" @click="ChangeQueryType('BettingRecord')">投注记录查询</li>
				</ul>
				<section class="tab-section">
		           	<div class="row mt-15">
		           		<!-- 开始时间 -->
		            	<input type="date" class="form-control" 
		            		name="StartTime"
		            		v-model="QueryConditions.StartTime"
		            		v-validate="{ rules: { required: true }}" />
		            	<!-- 结束时间 -->
		            	<input type="date" class="form-control" 
		            		name="EndTime"
		            		v-model="QueryConditions.EndTime"
		            		v-validate="{ rules: { required: true }}" />
		            	<a class="btn btn-bind" @click="SearchRecords()">查询</a>
		            </div>
	            	<div class="row">
	            		<!-- 资金往来类型 -->
						<p class="form-select icon" v-show="this.QueryTypeFlag == 'CashFlow'">
							<select v-model="QueryConditions.Type">   
						        <option v-for="Type in TransTypeList" v-bind:value="Type.Value">{{Type.Name}}</option> 
						    </select> 
						</p>
						<!-- 投注记录类型 -->
		                <p class="form-select icon" v-show="this.QueryTypeFlag == 'BettingRecord'">
							<select v-model="QueryConditions.Type">
		                        <option v-for="Type in BettingTypeList" v-bind:value="Type.Value">{{Type.Name}}</option>
						    </select> 
						</p>
						<p class="error-tip" v-if="(QueryConditions.Type==null||QueryConditions.Type==-2)">
	                    	* 提示：选择项不能为空
	                    </p>
	                    <p class="error-tip" v-else-if="errors.has('StartTime') && fields.StartTime.touched">
	                    	* 请选择起始日期
	                    </p>
	                    <p class="error-tip" v-else-if="errors.has('EndTime') && fields.EndTime.touched">
	                    	* 请选择结束日期
	                    </p>
	                    <p class="error-tip" v-else-if="this.QueryConditions.EndTime < this.QueryConditions.StartTime">
	                    	* 起始日期不能大于结束日期
	                    </p>
					</div>
				</section>
				<section class="list-table mt-15">
					<!-- 资金往来查询 -->
					<div class="table" v-show="QueryTypeFlag == 'CashFlow'">
						<table cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<td>单号</td>
									<td>类型</td>
									<td>金额</td>
									<td>状态</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="Log in LogList">
									<td>{{Log.ID}}<p>{{Log.TransDateTick | utcTicksToLocalTime('YYYY/MM/DD')}}</p></td>
									<td>{{Log.VTransType}}</td>
									<td>{{Log.VTransAmt}}</td>
									<td class="color-yellow">{{Log.VTransType}}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- 投注记录查询 -->
			        <div class="table" v-show="QueryTypeFlag == 'BettingRecord'">
						<table cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<td>类型</td>
									<td>投注额</td>
									<td>损益</td>
									<td>游戏类型</td>
								</tr>
							</thead>
							<tbody>
								<tr v-for="Log in LogList">
									<td>{{Log.GameMainType}}<p>{{Log.ResultTick | utcTicksToLocalTime('YYYY/MM/DD')}}</p></td>
									<td v-bind:class="Log.TransAmt<0 ? 'color-red':''">{{Log.VBetAmount}}</td>
									<td>{{Log.VWinLoss}}</td>
									<td class="color-yellow">{{Log.GameName}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
				<p class="scroll-footer-tip"></p>
			</article>
		</section>
	</div>
</template>

<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
	
	import moment from 'moment';
    import BLDef from 'scripts/common/BLDef';  
    import CommUtility from 'scripts/common/CommUtility';  
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService';
    import EventBus from 'scripts/common/EventBus';
	
	export default {
		data() {
			return {
                HeaderTitle: '记录查询',
                
                QueryTypeFlag: 'CashFlow',	// 紀錄類型旗標
                LogList: [],			// 记录列表
                TransTypeList: [],		// 资金往来类型
                BettingTypeList: [],	// 投注记录类型
                
            	pushedDict: [],				// 瀑布式資料陣列
                LogTotalCount: undefined,	// 瀑布式记录总数
                MaxPage: undefined,			// 瀑布式最大頁數
                CurrentPage: 0,				// 瀑布式當前頁數
                waterfallLock: false,		// 瀑布式的Lock
                QueryConditions: {			// 瀑布式分页
                    WGUID: BLDef.WGUID,
                    PagingInfo: {
                        PageNo: 1,
                        PageSize: 30                   
                    },
                    Type: -1,
                    StartTime: moment(new Date()).format('YYYY-MM-DD'),
                    EndTime: moment(new Date()).format('YYYY-MM-DD'),
                },
                IsAllShow: false,			// 是否已載入完全部
                StartTimeErrorFlag: false,	//起始时间校验
                EndTimeErrorFlag: false,	//终止时间校验
			};
        },
        created: function () {
            this.LoadPage();
            this.BindWaterFallEvent();
        },
        methods: {
        	// 切換搜尋類型
            ChangeQueryType: function (flag) {
                this.QueryTypeFlag = flag;                     
            }, // end ChangeQueryType
            
        	//绑定瀑布流事件
        	BindWaterFallEvent: function () {
                CommUtility.BindWaterfallTable(80, this.MainShowMoreData);
            },
            // 瀑布式載入更多項目
            MainShowMoreData: function () {
                if (this.waterfallLock === false) {
                    this.waterfallLock = true;
                    if (this.CurrentPage < this.MaxPage) {
                        this.QueryConditions.PagingInfo.PageNo++;
                        this.GetCurrentPageData();
                    } else {
                        this.waterfallLock = false;
                    }
                }
            }, // end MainShowMoreData
            
            // 載入記錄查詢頁面
            LoadPage: async function () {
            	EventBus.$emit('GlobalLoadingTrigger', true)
                const data = await PersonalCenterService.CashFlowLog_LoadMainPag();
                if (data.Ret === BLDef.ErrorRetType.SUCCESS) {
                    this.TransTypeList = data.Data.TransTypeSList;                     
                } // end if
                const retData = await PersonalCenterService.BetLog_LoadMainPage();
                if (retData.Ret === BLDef.ErrorRetType.SUCCESS) {
                    this.BettingTypeList = retData.Data.GameApiTypeList;                    
                } // end if
                EventBus.$emit('GlobalLoadingTrigger', false)
                this.GetCurrentPageData();
            },
            
            // 查詢紀錄
            GetCurrentPageData: async function () {
                let data;
                EventBus.$emit('GlobalLoadingTrigger', true)
                if (this.QueryTypeFlag == 'CashFlow') {
                    data = await PersonalCenterService.CashFlowLog_Query(this.QueryConditions);
                } else if ( this.QueryTypeFlag == 'BettingRecord') {
                    data = await PersonalCenterService.BetLog_Query(this.QueryConditions);
                } // end if
                EventBus.$emit('GlobalLoadingTrigger', false)
                if (data.Ret == 0) {
                    this.LogList = this.LogList.concat(this.GetDataList(data.Data.LogList));
                    this.LogTotalCount = data.Data.PagingInfo.TotalCount;
                    this.MaxPage = Math.ceil(this.LogTotalCount / this.PageSize);
                    this.CurrentPage++;
                    
                    // 是否已載入完全部
		            if (this.LogList.length == this.LogTotalCount) {
		                this.IsAllShow = true;
		                $('.scroll-footer-tip').html("资料已全部载入");
		                if (this.LogList.length < 1){
		                	$('.scroll-footer-tip').html("暂无数据");
		                }
		            }
		            else {
		                this.IsAllShow = false;
		                $('.scroll-footer-tip').html("");
		            }
	            
                } // end if
                this.waterfallLock = false;
            }, // end GetCurrentPageData
            
            // 防止載入重複資料
            GetDataList: function (List) {
                const toPushArray = [];
                if ( this.QueryTypeFlag == 'CashFlow') {
                    for (let i = 0; i < List.length; i++) {
                        if (!this.pushedDict[List[i].ID + '_' + List[i].TransType]) {
                            this.pushedDict[List[i].ID + '_' + List[i].TransType] = List[i];
                            toPushArray.push(List[i]);
                        } // end if 
                    } // end for
                } else if ( this.QueryTypeFlag == 'BettingRecord') {
                    for (let i = 0; i < List.length; i++) {
                        if (!this.pushedDict[List[i].ID + '_' + List[i].GameAPIType]) {
                            this.pushedDict[List[i].ID + '_' + List[i].GameAPIType] = List[i];
                            toPushArray.push(List[i]);
                        } // end if
                    } // end for
                } // end if
                return toPushArray;
            }, // end GetDataList
            
            // 點擊搜索，更新搜尋條件
            SearchRecords: async function () { 
            	// 验证
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });
                const result = await this.$validator.validateAll();
                const anyFieldInvalid = this.CheckFied();			//其他栏位验证
                if (anyFieldInvalid === true || result === false) {
                    return;
                }
                
                const currentQueryCondition = {
                    WGUID: BLDef.WGUID,
                    PagingInfo: {
                        PageNo: 1,
                        PageSize: 30
                    },
                    StartTime: this.QueryConditions.StartTime,
                    EndTime: this.QueryConditions.EndTime,
                    StartTick: CommUtility.LocalTimeToUtcTicks(this.QueryConditions.StartTime),
                    EndTick: CommUtility.LocalTimeToUtcTicks(this.QueryConditions.EndTime, true),
                    Type: this.QueryConditions.Type
                };   
                //清空
            	this.LogList = [];
                this.pushedDict = [];
                this.QueryConditions = currentQueryCondition;
                this.GetCurrentPageData();
                this.CurrentPage = 0;
                this.IsDetailQuery = false;
            },  // end SearchRecords
            
            // 驗證搜尋欄位正確性
            CheckFied: function () {
                let anyInvalid = false;
                // 開始日期大於結束日期
                if (this.QueryConditions.StartTime !== undefined && this.QueryConditions.EndTime !== undefined) {
                    if (new Date(this.QueryConditions.StartTime) > new Date(this.QueryConditions.EndTime)) {
                        anyInvalid = true;
                    }
                }
                // 類型未選
                if (this.QueryConditions.Type === '-2') {
                    anyInvalid = true;
                }
                return anyInvalid;
            },   // end 驗證搜尋欄位正確性
            
		},
		components: {
			mainHeader,
		},
		watch: {
			'$route' (to, from) {
				this.QueryConditions.StartTime = this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                this.$validator.reset()
			}
		},
	}
</script>