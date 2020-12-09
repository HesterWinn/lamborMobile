import HttpService from 'scripts/common/HttpService';
import BLDef from 'scripts/common/BLDef';

export default {     

    // 註冊
    async Regist(DataObj) {        
        const retData = await HttpService.PostDynamic(BLDef.RegisterService.ServiceType, BLDef.RegisterService.ActType.MemberRegister_Add, DataObj);              
        return retData;          
    }, // end Regist

    // 載入註冊成功頁面
    async LoadMainPage(DataObj) {
        const retData = await HttpService.PostAes(BLDef.RegisterService.ServiceType, BLDef.RegisterService.ActType.MemberRegister_LoadSuccessPage, DataObj);
        return retData;
    }, // end LoadMainPage

    // 載入加盟我們頁面
    async LoadIBRegisterMainPage(DataObj, platForm) {
        const retData = await HttpService.PostDynamic(BLDef.RegisterService.ServiceType, BLDef.RegisterService.ActType.IBRegister_LoadMainPage, DataObj, undefined, platForm);
        return retData;
    }, // end LoadIBRegisterMainPage

    // 新增代理
    async AddIB(DataObj) {
        const retData = await HttpService.PostDynamic(BLDef.RegisterService.ServiceType, BLDef.RegisterService.ActType.IBRegister_Add, DataObj);
        return retData;
    }, // end AddIB
};
