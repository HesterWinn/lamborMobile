<template>
  <div id="app">
    <router-view></router-view>
    <!--advertisement 2018.10.15 SeyoChen-->
    <div id="advert-box" class="hide">
      <a id="advert-link"><img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/advertisement/advert.jpg'"/></a>
      <p class="advert-time-box" @click="CloseAdvert"><span class="advert-time">{{ShowTime}}</span><span>跳过</span></p>
    </div>
  </div>
</template>

<script>
  import EventBus from 'scripts/common/EventBus'
  import BLDef from 'scripts/common/BLDef'
  import LoginService from 'scripts/businessLogic/loginService'
  import CommonService from 'scripts/businessLogic/commonService'
  import SignalRService from 'scripts/common/SignalRService'

  export default {
    name: 'app',
    data() {
      return {
        CTTimer: undefined,
        HBTimer: undefined,

        ShowTime: 3, // 广告显示时间
        // 資源位置
        ResourceURL: BLDef.ResourceURL,
        ResourceCDN: BLDef.ResourceCDN
      };
    },
    created: function () {
//    this.ShowAdvertisement(); // 2018.10.15 SeyoChen
      this.CheckLoginStatus();
      const self = this;
      EventBus.$on('afterLogin', () => {
          clearInterval(self.CTTimer);
          self.SignalRConnect();
          self.LoginCount();
      });
    },
    methods: {
      // 檢查登入狀態
      CheckLoginStatus: async function () {
        const data = await CommonService.Comm_CheckPermission();
        switch (data.Status) {
          case BLDef.SysAccountStatus.NOT_LOGIN:
            this.LocalCheckToken();
            break;
          case BLDef.SysAccountStatus.LOGINED_ENABLED:
          case BLDef.SysAccountStatus.LOGINED_FROZEN:
            this.LoginHeartBeat();
            this.SignalRConnect();
            this.LoginCount();
            break;
          default:
            break;
        }
      },

      // 開始登出計時
      LoginCount: async function () {
        const self = this;
        const logoutTime = localStorage.getItem('logoutTime');
        // 時間到就登出
        if ( logoutTime > new Date().getTime()) {
          setTimeout( function () {
            self.LoginCount();
          }, 60000);
        } else {
          const inputObj = {
              LogoutInfo: {}
          };
          
          EventBus.$emit('GlobalLoadingTrigger', true);
          await LoginService.LogOut(inputObj);
          EventBus.$emit('GlobalLoadingTrigger', false);

          // 移除登入相關資料
          localStorage.removeItem('logoutTime');
          localStorage.removeItem('Token');
          localStorage.removeItem('Auth');          
          // 若沒接收到signalr斷線訊息，則3秒後自行斷線
          setTimeout(function () {
              // 斷Signalr連線
              SignalRService.DisConnectServer();
              window.location.href = '/';
          }, 3000); 
        } // end if
      }, // end LoginCount

      // 建立SignalR連線
      SignalRConnect: function () {
        console.log('SignalRConnect');
        SignalRService.ConnectServer(this.SignalRConnect);
      },
      // 登入後心跳包機制
      LoginHeartBeat: function () {
        this.PostHeartBeat();
        this.HBTimer = setInterval(this.PostHeartBeat, 1000 * 60 * 10);
      },
      // 發送心跳包到後端
      PostHeartBeat: async function () {
        async function PostAction() {
            const newTick = new Date().getTime() + 1000 * 60 * 10 - 1000 * 1;
            await LoginService.UpdateSurviveTime();            
            localStorage.setItem('HBTick', newTick);
        }

        const HBTick = localStorage.getItem('HBTick');
        if (HBTick) {
          // 有Tick但比現在舊
          if (HBTick < new Date().getTime()) {
            PostAction();
          } 
        } else { // 沒有心跳包
          PostAction();
        }
      },
      // 檢查本地Token
      LocalCheckToken: function () {
        this.CTTimer = setInterval(async function () {
            const currentTK = localStorage.getItem('Token');
//          console.log(currentTK);
            // 本地端有token則進到後端檢查
            if (currentTK) {
                const data = await CommonService.Comm_CheckPermission();
                if (data.Status == BLDef.SysAccountStatus.LOGINED_ENABLED || data.Status == BLDef.SysAccountStatus.LOGINED_FROZEN) {
//                  window.location.reload();
										window.location.href = '/';
                } else {
                    localStorage.removeItem('Token');
                }
            }
        }, 3000);
      },

      // 2018.10.15 SeyoChen 页面广告
      // 广告倒计时
      ShowAdvertisement: function () {
        var self = this;

        var set = setInterval(() => {
          self.ShowTime--;
          console.log(self.ShowTime);
          if (self.ShowTime === 0){
            self.ShowTime = '';
            // $('#advert-box').hide(700);
          }
        }, 1000);

        setTimeout(() => {
          self.ShowTime = '';
          clearInterval(set);
        }, 3000);
      },
      // 关闭广告
      CloseAdvert: function () {
        // 播放音乐
        EventBus.$emit('PLAY_MSC');

        $('#advert-box').hide(700);
      }
      // 2018.10.15 SeyoChen end
    },
    beforeDestroy() {
      EventBus.$off('afterLogin');
    }
  };
</script>
