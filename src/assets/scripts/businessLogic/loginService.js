import HttpService from 'scripts/common/HttpService';
import BLDef from 'scripts/common/BLDef';
import axios from 'axios';

export default {

  // 取得PreToken
  async LoadPage() {
    const retData = await HttpService.PostDynamic(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.LoadPage);    
    return retData.Data.LoginData.Token;
  },
  
  // 取得圖形驗證碼
  async ReGenVCode(RGBData, preToken) {    
    const retData = await HttpService.PostDynamic(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.RegenVCode, RGBData, preToken);    
    return retData.Data.LoginData.VCodeImg;
  },

  // 登入
  async LoginConfirm(preToken, dataObj) {    
    const retData = await HttpService.PostDynamic(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.LoginConfirm, dataObj, preToken);    
    return retData;
  },
  // 登出
  async LogOut(dataOb) {
    const retData = await HttpService.PostAes(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.LogOut, dataOb);    
    return retData;
  },
  // 心跳包更新存活時間
  async UpdateSurviveTime() {
    const retData = await HttpService.PostAes(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.UpdateSurviveTime);    
    return retData;
  },  
  // 忘記密碼
  async ForgetPassword(dataOb) {
    const retData = await HttpService.PostDynamic(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.ForgetLoginPassword, dataOb);    
    return retData;
  },
  
  // 微信登入
  async WxLoginConfirm(preToken, dataObj) {    
    const retData = await HttpService.PostDynamic(BLDef.LoginService.ServiceType, BLDef.LoginService.ActType.WxLoginConfirm, dataObj, preToken);    
    return retData;
  },

};
