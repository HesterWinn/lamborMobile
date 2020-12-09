import HttpService from 'scripts/common/HttpService';
import BLDef from 'scripts/common/BLDef';

export default {
  
  // 取行圖形驗證碼
  async VerifyCode_Gen(dataObj) {    
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.VerifyCode_Gen, dataObj);    
    return retData;
  },

  // 檢查驗證碼是否正確
  async VerifyCode_Verify(dataObj) {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.VerifyCode_Verify, dataObj);    
    return retData;
  },

  // 驗證帳號是否重複
  async CheckAcctAvailable(checkInfo) {
    const DataObj = {
      CheckInfo: checkInfo
    };
    
    return HttpService.PostDynamic( BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.CheckAcctAvailable, DataObj).then(function (data ) {      
      return data.Data.CheckInfo;
    });
  },
  // 檢查登入狀態
  async Comm_CheckPermission() {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_CheckPermission);    
    return retData;
  },
  // 根據省取得城市選單
  async GetCityTypes(obj) {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.GetCityTypes, obj);    
    return retData;
  },
  // 根據城市取得區選單
  async GetDistTypes(obj) {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.GetDistTypes, obj);    
    return retData;
  },
  // 檢查資料填寫狀態
  async Comm_GetDataFillInStatus() {
    const retData = await HttpService.PostAes(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetDataFillInStatus);    
    return retData;
  },
  // 取得客服資訊
  async Comm_GetCustomerServiceInfo(obj) {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetCustomerServiceInfo, obj);    
    return retData;
  },
  // 取得會員資訊
  async Comm_GetMemberInfo() {
    const retData = await HttpService.PostAes(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetMemberInfo);    
    return retData;
  },
  // 取得跑馬燈資訊
  async Comm_GetMarqueeInfo() {
    const retData = await HttpService.PostAes(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetMarqueeInfo);    
    return retData;
  },
  // 取得首頁優惠活動資訊
  async Comm_GetBonusActivity(obj) {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetBonusActivity, obj);    
    return retData;
  },
  // 取得會員升級資訊
  async Comm_GetMemberLvProgressInfo(obj) {
    const retData = await HttpService.PostAes(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetMemberLvProgressInfo, obj);    
    return retData;
  },
  // 取得會員等級紅利資訊
  async Comm_GetMemberLvBonusInfo() {
    const retData = await HttpService.PostAes(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetMemberLvBonusInfo);    
    return retData;
  },
  // 取得性別選單
  async SexTypeList_Get() {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.SexTypeList_Get);    
    return retData;
  },
  // 取得語系選單
  async Comm_GetLanguages() {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetLanguages);    
    return retData;
  },
  // 取得登陆后相对应的红利活动 2018.09.20 SeyoChen
  async Comm_GetBonusActivity_MemberLv(obj) {
    const retData = await HttpService.PostDynamic(BLDef.CommonService.ServiceType, BLDef.CommonService.ActType.Comm_GetBonusActivity_MemberLv, obj);    
    return retData;
  },
};
