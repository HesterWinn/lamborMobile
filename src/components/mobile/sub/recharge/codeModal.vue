<template>
	
	<!-- 洗码量详情弹窗 -->
	<div class="mob-wrap">
		<div class="modal modal-shadow fade" id="codeModal" tabindex="-1" data-backdrop="false" role="dialog" aria-hidden="true">  
	    	<div class="modal-dialog">
	            <div class="modal-content modal-theme-black"> 
	            	<div class="modal-header">
	            		<h4 class="modal-title">已参与活动列表</h4>
		          	</div>
	            	<div class="modal-body">
	            		<table cellpadding="0" cellspacing="0">
	            			<thead>
	            				<tr>
		            				<td>序号</td>
		            				<td>活动</td>
		            				<td>时间 </td>
		            				<td>存款</td>
		            				<td>洗码量 </td>
		            			</tr>
	            			</thead>
	            			<tbody>
	            				<tr v-for="(Item, index) in DepositHistoryData.ActivityLogList">
		            				<td>{{index + 1}}</td>
		            				<td>{{Item.ActivityName}}</td>
		            				<td>{{Item.UpdateTick | utcTicksToLocalTime('YYYY/MM/DD')}}</td>
		            				<td>{{Item.VDepositAmt}}</td>
		            				<td>{{Item.RakeAmt}}</td>
		            			</tr>
	            			</tbody>
	            			<tfoot>
	            				<tr>
		            				<td>总计</td>
		            				<td>&ensp;</td>
		            				<td>&ensp; </td>
		            				<td>{{DepositHistoryData.VTotalDepositAmt}}</td>
		            				<td>{{DepositHistoryData.TotalTargetRakeAmount}} </td>
		            			</tr>
            				</tfoot>
	            		</table>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		    <div class="modal-footer-close" v-on:click="bindClose()" ></div>
		</div>
	</div>
	
</template>

<script>
	export default {
		props: {
            DepositHistoryData: {
                type: Object,
                default: function () {
                    return {};             
                }
            }
        },
		data() {
			return {
				
			};
        },
		created: function() {
			
		},
		methods: {
			//关闭洗码量弹窗
			bindClose: function() {
				$('#codeModal').modal("hide");
				$("#withdrawalModal").css('display', 'block');
			},
		},
	}
</script>

