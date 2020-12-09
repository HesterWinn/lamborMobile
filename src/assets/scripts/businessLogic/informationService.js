import HttpService from 'scripts/common/HttpService';
import BLDef from 'scripts/common/BLDef';

export default {

    // 取得優惠活動清單
    async GetActivityList(DataObj) {
        const retData = await HttpService.PostDynamic(BLDef.InformationService.ServiceType, BLDef.InformationService.ActType.BounsActivity_Query, DataObj);    
        return retData;
    }, // end GetActivityList

    // 取得優惠活動詳細
    async GetActivityDetail(DataObj) {
        const retData = await HttpService.PostDynamic(BLDef.InformationService.ServiceType, BLDef.InformationService.ActType.BounsActivity_LoadDetailPage, DataObj);    
        return retData;
    }, // end GetActivityDetail

};