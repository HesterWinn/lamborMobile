<template>
    <div>
    	<!--头部-->
		<main-header :HeaderTitle="this.HeaderTitle"></main-header>
    </div>
</template>

<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
    import URLService from 'scripts/common/URLService';
    import EventBus from 'scripts/common/EventBus';
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService';

    export default {
        data() {
            return {
            	HeaderTitle: '充值',
                PaymentType: undefined,
                PaymentData: {},
                ServerRspData: {},
            };
        },
        created: function () {
            this.GetParams();
        },
        methods: {
            // 獲取URL參數
            GetParams: async function () {            
                if (this.$route.params.Data != undefined) {                
                    const HashKey = URLService.GetObjFromUrlParameter(this.$route.params.Data);
                    const data = localStorage.getItem(HashKey);
                    if (data) {
                        this.PaymentData = URLService.GetObjFromUrlParameter(data);
                        localStorage.removeItem(HashKey);
                        const rspData = await PersonalCenterService.OnlineDeposit_Add(this.PaymentData);
                        if (rspData.Ret == 0) {
                            this.ServerRspData = rspData.Data;
                            this.ServerRspData.Amount = this.PaymentData.Amount;
                            this.PaymentType = this.PaymentData.PType;
                        } else {
                            const notifyData = {
                                NotifyMessage: rspData.Message,
                                CloseFunction: this.ReturnBack  
                            };
                            EventBus.$emit('showNotifyMessage', notifyData);
                        }
                    } else {                        
                        this.ReturnBack();
                    }
                } else {
                    this.ReturnBack();
                }
            },
            ReturnBack: function () {
                window.history.go(-1);
            }
        },
        components: {
			mainHeader,
		},
    };
</script>
