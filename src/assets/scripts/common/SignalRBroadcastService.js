import EventBus from 'scripts/common/EventBus';
import BLDef from 'scripts/common/BLDef';
import SignalRService from 'scripts/common/SignalRService';

export default {
    BroadcastMessage(data) {
        console.log('SignalR Broadcast:');
        console.log(data);
        switch (data.AT) {
            case BLDef.SignalR_ActionType.DisableMember:// 停用會員
                // 登出後，SignalR斷線
                SignalRService.DisConnectServer();
                EventBus.$emit('SignalR_DisableMember', data);
                
                break;
            case BLDef.SignalR_ActionType.Logout_OtherPageLogout:// 登出時，其他分頁跟著登出
                // 登出後，SignalR斷線
                SignalRService.DisConnectServer();
                EventBus.$emit('SignalR_Logout_OtherPageLogout', data);
                break;
            case BLDef.SignalR_ActionType.Kick_By_OtherBrowser:// 登入不同瀏覽器，後踢前
                // 登出後，SignalR斷線
                SignalRService.DisConnectServer();
                EventBus.$emit('SignalR_Kick_By_OtherBrowser', data);
                break;
            case BLDef.SignalR_ActionType.Maintenance_Notify:// 維護時間到，進行通知
                EventBus.$emit('SignalR_Maintenance_Notify', data);
                break;
            case BLDef.SignalR_ActionType.UpdateWithdrawalList:// 更新出金申請列表
                EventBus.$emit('SignalR_UpdateWithdrawalList', data);
                break;
            case BLDef.SignalR_ActionType.UpdateMarquee:// 更新跑馬燈
                EventBus.$emit('SignalR_UpdateMarquee', data);
                break;
            case BLDef.SignalR_ActionType.MaintenanceFinish_Notify:// 維護結束，進行通知
                EventBus.$emit('SignalR_MaintenanceFinish_Notify', data);
                break;
            case BLDef.SignalR_ActionType.VerifyEmailSuccess:// 驗證Email成功                  
                EventBus.$emit('SignalR_VerifyEmail_Success', data);
                EventBus.$emit('SignalR_VerifyEmail_Notify', data);
                break;
            case BLDef.SignalR_ActionType.AddPrivateMessage:// 站內訊息增加
                EventBus.$emit('SignalR_AddPrivateMessage', data);
                break;
            case BLDef.SignalR_ActionType.ReadPrivateMessage:// 站內訊息減少
                EventBus.$emit('SignalR_ReadPrivateMessage', data);
                break;
            default:
                break;
        }
    }
};