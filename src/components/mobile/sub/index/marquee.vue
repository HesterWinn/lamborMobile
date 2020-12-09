<!--跑馬燈-->
<template>
	<div id="marquee"></div>
</template>

<script>
    import 'jquery.marquee';
    import moment from 'moment';
    import BLDef from 'scripts/common/BLDef';
    import CommUtility from 'scripts/common/CommUtility';
    import EventBus from 'scripts/common/EventBus';
    import CommonService from 'scripts/businessLogic/commonService';

    export default {
        data() {
            return {
                MQTimer: undefined,
                MarqueeKey: 'webMarquee',
                MarqueeFlag: undefined,
                MarqueeStartTick: +Infinity,
            };
        },
        props: {
            IsLogin: undefined
        },
        created: async function () { 
            const self = this;
            EventBus.$on('SignalR_MaintenanceFinish_Notify', (data) => {
                self.MaintenanceFinishNotify(data);
            });
            EventBus.$on('SignalR_UpdateMarquee', (data) => {
                this.MarqueeStartTick = +Infinity;
                self.UpdateMarquee(data);
            });
        },
        methods: {
            BindMarqueeEvent: function () {
                const self = this; 
                self.MarqueeFlag = true;
                $('#marquee').bind('finished', function () {
                    const continueFlag = self.checkMarquee();
                    if (continueFlag === false) {
                        $(this).marquee('destroy');
                        self.MarqueeFlag = false; 
                        self.DealMarqueeData();
                    } else {
                        $(this).marquee({ speed: 15, delayBeforeStart: 100 });
                    }
                }).marquee({ speed: 15, delayBeforeStart: 100 });
            },
            GetMarqueeData: async function () {
                const data = await CommonService.Comm_GetMarqueeInfo();
                console.log('======IsLogin:======');
                console.log(data);
                if (data.Ret === BLDef.ErrorRetType.SUCCESS) {
                    localStorage.setItem(this.MarqueeKey, JSON.stringify(data.Data.MarqueeList));                 
                } 
            },
            // 處理跑馬燈資料
            DealMarqueeData: function () {
                const self = this;          
                // 取得storage中的跑馬燈資訊            
                const playFlag = self.checkMarquee();

                if (playFlag === true) {
                    this.BindMarqueeEvent();
                } else {
                    if (this.MarqueeStartTick != +Infinity ) {
                        this.MQTimer = setTimeout(this.DealMarqueeData, this.MarqueeStartTick);
                    }                    
                }
            },
            // 檢查跑馬燈
            checkMarquee: function () {
                const marqueeStr = localStorage.getItem(this.MarqueeKey);
                if (marqueeStr) {
                    const marqueeList = JSON.parse(marqueeStr);
                    const marqueeKeepArray = [];                    
                    let playString = '';

                    // 組成跑馬燈內容
                    for (let i = 0, len = marqueeList.length; i < len; i += 1) {
                        const blockString = i == marqueeList.length - 1 ? '' : '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0';
                        const Item = marqueeList[i];
                        if ((Item.StartTick < moment().valueOf() && Item.EndTick > moment().valueOf()) || Item.IsRemoveByTime === false) {
                            marqueeKeepArray.push(Item);

                            switch (Item.Type) {
                                // 緊急公告
                                case BLDef.BroadcastMsgType.EMERGENCY:
                                    playString = playString + Item.Msg + blockString;
                                    break;
                                // 維護
                                case BLDef.BroadcastMsgType.MAINTAIN:
                                    playString = playString + Item.Msg
                                        .replace('{StartTime}', CommUtility.UtcTicksToLocalTime(Item.StartTick, 'YYYY/MM/DD HH:mm:ss'))
                                        .replace('{EndTime}', CommUtility.UtcTicksToLocalTime(Item.EndTick, 'YYYY/MM/DD HH:mm:ss')) + blockString;
                                    break;
                                default:
                                    break;
                            } // end switch
                        } else if (Item.StartTick > moment().valueOf()) {
                            marqueeKeepArray.push(Item);

                            // 判斷最近要觸發的跑馬燈倒數時間
                            if ( this.MarqueeStartTick > (Item.StartTick - moment().valueOf())) {
                                this.MarqueeStartTick = Item.StartTick - moment().valueOf() + 1000;
                            } // end if
                        }
                    }

                    localStorage.setItem(this.MarqueeKey, JSON.stringify(marqueeKeepArray));
                    // 將文字丟到跑馬燈上
                    $('#marquee').text(playString);

                    // 更新storage跑馬燈資訊
                    if (playString) {
                        return true;
                    }

                    // 沒有跑馬燈就移除localStorage
                    if (marqueeKeepArray.length == 0) {
                        this.MarqueeStartTick = +Infinity;
                        localStorage.removeItem(this.MarqueeKey);
                    }// end if
                }                
                            
                return false;
            },
            // signalr通知新的跑馬燈部分
            UpdateMarquee: async function () {                     
                await this.GetMarqueeData();
                if (this.MarqueeFlag !== true) {
                    clearTimeout(this.MQTimer);
                    this.DealMarqueeData();
                } 
            },
            // signalr結束維護通知
            MaintenanceFinishNotify: function (data) {
                if (data.Data.MarqueeMessage.ID && data.Data.MarqueeMessage.Type == BLDef.BroadcastMsgType.MAINTAIN) {
                    const playArray = [];
                    let marqueeList = [];
                    const marqueeStr = localStorage.getItem(this.MarqueeKey);
                    if (marqueeStr) {
                        marqueeList = JSON.parse(marqueeStr);
                    }

                    // 更新跑馬燈列表
                    for (let i = 0; i < marqueeList.length; i++) {
                        if (!marqueeList[i].ID || marqueeList[i].ID != data.Data.MarqueeMessage.ID) {
                            playArray.push(marqueeList[i]);
                        }
                    }

                    localStorage.setItem(this.MarqueeKey, JSON.stringify(playArray));
                }
            }
        },
        watch: {
            IsLogin: async function () {    
                if (this.IsLogin === true) {
                    await this.GetMarqueeData();
                    this.DealMarqueeData();
                }
            }
        },
        beforeDestroy() {
            EventBus.$off('SignalR_MaintenanceFinish_Notify');
            EventBus.$off('SignalR_UpdateMarquee');
        }
    };
</script>
