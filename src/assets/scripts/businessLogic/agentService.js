import HttpService from 'scripts/common/HttpService';
import BLDef from 'scripts/common/BLDef';

export default {
    // 图片合成
    async GetQRCode(obj) {
        const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.MemberInfo_GetQRCode, obj);    
        return retData;
    },
}