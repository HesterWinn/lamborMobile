import 'signalr';
import BLDef from 'scripts/common/BLDef';
import SignalRBroadcastService from 'scripts/common/SignalRBroadcastService';

export default {
    data() {
        return {
            hub: undefined,
            connected: false
        };
    },
    // 建立連線
    ConnectServer(failAction) {
        const self = this;

        // start完成後更新連線資訊
        async function UpdateConnectionID() {
            const model = {};
            model.TK = localStorage.getItem('Token');   
            self.hub.invoke('connect', model).done(function (result) {
                if (result !== true) {
                    setTimeout(function () {
                        failAction();
                    }, 5000);  
                }
            });
        }

        const connection = $.hubConnection(BLDef.SignalRUrl);
        self.hub = connection.createHubProxy(BLDef.HubName);
        
        // 定義接收訊息後的呼叫function
        self.hub.on('message', function (data) {
            SignalRBroadcastService.BroadcastMessage(data);
        }); 

        // start若失敗則5秒後重連
        connection.start({ jsonp: true })
            .done(function () {
                const connectId = self.hub.connection.id;
                self.connected = true;
                console.log('connectId: ' + connectId);
                UpdateConnectionID();
            })
            .fail(function () {
                setTimeout(function () {
                    failAction();
                }, 5000);
            });                        
    },
    // SignalR斷線
    DisConnectServer() {
        const self = this;

        if (self.hub && self.connected === true) {
            const model = {};
            model.TK = localStorage.getItem('Token');
            self.hub.invoke('disconnected', model).done(function (result) {
                console.log('dissconect:' + result);
            });
        }
    }
};