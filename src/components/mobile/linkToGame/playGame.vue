<template>
    <div class="play-game-wrap" style="width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling : touch;">
        <!--头部-->
		<header>
			<router-link :to="{name: 'index'}" class="icon-back"></router-link>
			<h2>联盟娱乐</h2>
		</header>
        
        <iframe id="Iframe_Game" :src="GamePlayUrl" frameborder="0" border="0" cellspacing="0" style="width:100%;height:796px;overflow:auto;-webkit-overflow-scrolling : touch;"></iframe>
    </div>
</template>

<script>
import BLDef from 'scripts/common/BLDef'; 
import URLService from 'scripts/common/URLService';
import CommonService from 'scripts/businessLogic/commonService';
import GameService from 'scripts/businessLogic/gameService';
import EventBus from 'scripts/common/EventBus';
import mainHeader from '@/components/mobile/sub/mainHeader';

export default {
    data() {
        return {
            GamePlayUrl: undefined,
            PlayGameData: {}
        };
    },
    mounted: function () {
        this.Load();
        this.GetParams();
        $('#themeLayout footer').hide();
    },
    methods: {
    	Load: function() {
			this.$nextTick(function() {
				window.history.forward(1);
                //内容高度
				var headerHeight = $("#themeLayout header").height()
				var bodyHeight = $("#themeLayout").height()
				var gameHeight = bodyHeight - headerHeight
				$(".wrap").css("margin-top", 0)
				$(".wrap").css("height", bodyHeight + "px")
				$('#Iframe_Game').css("margin-top", headerHeight + "px")
				$('#Iframe_Game').css("height", gameHeight + "px")
			})
		},
        // 獲取URL參數
        GetParams: async function () {            
            if (localStorage.getItem('PlayGamePostData') != undefined) {                
                this.PlayGameData = URLService.GetObjFromUrlParameter(localStorage.getItem('PlayGamePostData'));    
                localStorage.removeItem('PlayGamePostData');            
                if (this.PlayGameData.PlayType != BLDef.IdentityType.TRIAL) {                    
                    // 檢查權限:凍結不可進行遊戲
                    EventBus.$emit('GlobalLoadingTrigger', true);
                    const permissionData = await this.CheckAcctStatus();
                    EventBus.$emit('GlobalLoadingTrigger', false);
                    if (permissionData.Status != BLDef.SysAccountStatus.LOGINED_ENABLED) {                        
                        const notifyData = {
                            NotifyMessage: (BLDef.SysAccountStatus.NOT_LOGIN == permissionData.Status || BLDef.SysAccountStatus.NOT_LOGIN_DISABLED == permissionData.Status || BLDef.SysAccountStatus.NOT_LOGIN_DELETED == permissionData.Status) ? '请登录账号' : '账户被冻结, 请联系客服人员!',
                            CloseFunction: this.CloseCurrentWindow
                        };
		                EventBus.$emit('showWarnTip', notifyData);
                        return;                          
                    } 
                    this.PlayGame();
                } else {
                    this.CheckAuthCode(this.PlayGameData.VCodeObj);
                }            
            } else {
                this.CloseCurrentWindow();
            }
        },
        // 檢查登入狀態
        CheckAcctStatus: async function () {
        		EventBus.$emit('GlobalLoadingTrigger', true);
            const retData = await CommonService.Comm_CheckPermission();
            EventBus.$emit('GlobalLoadingTrigger', false);
            return retData;
        },
        // 檢查驗證碼
        CheckAuthCode: async function (VCodeObj) {
            const inputObj = VCodeObj;
            EventBus.$emit('GlobalLoadingTrigger', true);
            const retData = await CommonService.VerifyCode_Verify(inputObj);
            EventBus.$emit('GlobalLoadingTrigger', false);
            if (retData.Ret != 0) {
                const notifyData = {
                    NotifyMessage: retData.Message,
                    CloseFunction: this.CloseCurrentWindow
                };
                EventBus.$emit('showWarnTip', notifyData);
            } else {                 
                this.PlayGame();
            }
        },
        // 進行遊戲
        PlayGame: async function () {
            const token = this.PlayGameData.PlayType == BLDef.IdentityType.TRIAL ? this.PlayGameData.CToken : undefined;
            const BaseUrl = window.location.href.split('/').slice(0, 3).join('/');
            const inputObj = {
                WGUID: BLDef.WGUID,
                GameAPIVendor: this.PlayGameData.GameAPIVendor,
                GameCatlog: this.PlayGameData.GameCatlog,
                GameCode: this.PlayGameData.GameCode,
                Platform: BLDef.Paltform.Web_PC,
                PlayType: this.PlayGameData.PlayType,
                Url: BaseUrl
            };

            EventBus.$emit('GlobalLoadingTrigger', true);
            const gameData = await GameService.Game_Player(inputObj, token);
            EventBus.$emit('GlobalLoadingTrigger', false);
              
            if (gameData.Ret != 0) {
                const notifyData = {
                    NotifyMessage: '測試服暫不提供本遊戲',
                    CloseFunction: this.CloseCurrentWindow
                };
                EventBus.$emit('showWarnTip', notifyData);
                return;
            } 
                      
            this.GamePlayUrl = gameData.Data.GamePlayUrl;
            console.log(this.GamePlayUrl);
            
//          const notifyData = {
//                  NotifyMessage: GamePlayUrl
//              };
//          EventBus.$emit('showNotifyMessage', notifyData);
//          location.href = this.GamePlayUrl;
        },
        // 關閉視窗
        CloseCurrentWindow: function () {
//          window.close();
			this.$router.push({ name: 'index'}); //登录成功 跳转首页
        }    
    },
    components: {
        mainHeader,
    },
    beforeDestroy() {
    	$(".wrap").css("margin-top", "3.5rem");
        $('#themeLayout footer').show();
    }
};
</script>

