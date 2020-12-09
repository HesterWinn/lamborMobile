import BLDef from 'scripts/common/BLDef';
import HttpService from 'scripts/common/HttpService';

export default {

    // 載入電子遊戲頁面
    async LoadMainPage(dataObj) {
        const retData = await HttpService.PostDynamic(BLDef.GameService.ServiceType, BLDef.GameService.ActType.EGame_LoadMainPage, dataObj);
        return retData;
    }, // end LoadMainPage
    
    // 搜尋遊戲
    async GameQuery(dataObj) {        
        const retData = await HttpService.PostDynamic(BLDef.GameService.ServiceType, BLDef.GameService.ActType.EGame_Query, dataObj);        
        return retData;
    }, // end GameQuery

    // 進行遊戲
    async Game_Player(dataObj, token) {
        const retData = await HttpService.PostDynamic(BLDef.GameService.ServiceType, BLDef.GameService.ActType.Game_Player, dataObj, token);        
        return retData;
    }, // end Game_Player

    // 載入手機下注遊戲大廳頁面
    async LoadMobileBetLobbyPage(dataObj) {
        const retData = await HttpService.PostAes(BLDef.GameService.ServiceType, BLDef.GameService.ActType.GamePhoneBet_LoadGameMainPage, dataObj);        
        return retData;
    }, // end LoadMobileBetLobbyPage

    // 搜尋手機下注遊戲
    async GameMobileBet_Query(dataObj) {        
        const retData = await HttpService.PostAes(BLDef.GameService.ServiceType, BLDef.GameService.ActType.GamePhoneBet_Query, dataObj);        
        return retData;
    }, // end GameMobileBet_Query

    // 取得遊戲商維護狀態
    async GetGameMaintainStatus() {        
        const retData = await HttpService.PostDynamic(BLDef.GameService.ServiceType, BLDef.GameService.ActType.GetGameMaintainStatus);        
        return retData;
    },
};