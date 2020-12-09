<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap recoed-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>
			
			<article>
				<section class="tab-section">
		           	<div class="row mt-15">
		            	<input type="date" class="form-control" 
		            		name="StartTime"
		            		v-model="QueryConditions.StartTime"
		            		v-validate="{ rules: { required: true }}"
		            		/>
		            	<input type="date" class="form-control" 
		            		name="EndTime" 
		            		v-model="QueryConditions.EndTime" 
		            		v-validate="{ rules: { required: true }}"
		            		/>
		            	<a class="btn btn-bind" @click="SearchRecords()">查询</a>
		            </div>
	            	<div class="row">
						<p class="form-select icon">
							<select name="passway" id="passway" v-model="QueryConditions.TabTime" @change="ChangeTabType()">   
						        <option v-bind:value="'today'">今日</option>   
						        <option v-bind:value="'yesterday'">昨日</option>   
						        <option v-bind:value="'thisweek'">本周</option>   
						        <option v-bind:value="'lastweek'">上周</option>   
						        <option v-bind:value="'thismonth'">本月</option>   
						        <option v-bind:value="'lastmonth'">上月</option>   
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
				<section class="list-table mt-10">
					<div class="table">
						<table cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<td>序号</td>
									<td>日期</td>
									<td>会员名称</td>
									<td>有效名称</td>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</section>
				<p class="scroll-footer-tip">暂无数据</p>
			</article>
		</section>
	</div>
</template>

<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
	import moment from 'moment';
	
	export default {
		data() {
			return {
                HeaderTitle: '推广查询',
                QueryConditions: {
                    StartTime: moment(new Date()).format('YYYY-MM-DD'),
                    EndTime: moment(new Date()).format('YYYY-MM-DD'),
                    TabTime: 'thisweek',
                },
			};
        },
		created: function() {
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					
				})
			},
			// 切換搜尋類型
            ChangeTabType: function () {
                let flag = this.QueryConditions.TabTime
                
                console.log(flag)
                if(flag == 'today'){				//今日
                	this.QueryConditions.StartTime = moment(new Date()).format('YYYY-MM-DD')
                	this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                }else if(flag == 'yesterday'){		//昨日
                	this.QueryConditions.StartTime = moment(new Date()).utcOffset(480).add(-1, 'day').format('YYYY-MM-DD')
                	this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                }else if(flag == 'thisweek'){		//本周
                	this.QueryConditions.StartTime = moment(new Date()).utcOffset(480).startOf('week').format('YYYY-MM-DD')
                	this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                }else if(flag == 'lastweek'){		//上周
                	this.QueryConditions.StartTime = moment(new Date()).utcOffset(480).subtract(1, 'week').startOf('week').format('YYYY-MM-DD')
                	this.QueryConditions.EndTime = moment(new Date()).utcOffset(480).subtract(1, 'week').endOf('week').format('YYYY-MM-DD')
                }else if(flag == 'thismonth'){		//本月
                	this.QueryConditions.StartTime = moment(new Date()).utcOffset(480).startOf('month').format('YYYY-MM-DD')
                	this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                }else if(flag == 'lastmonth'){		//上月
                	this.QueryConditions.StartTime = moment(new Date()).utcOffset(480).subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
                	this.QueryConditions.EndTime = moment(new Date()).utcOffset(480).subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
                }
            }, // end ChangeTabType
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
				this.QueryConditions.StartTime = this.QueryConditions.EndTime = moment(new Date()).format('YYYY-MM-DD')
                this.$validator.reset()
			}
		},
	}
</script>