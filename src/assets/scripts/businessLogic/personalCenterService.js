import HttpService from 'scripts/common/HttpService';
import BLDef from 'scripts/common/BLDef';

export default {
  // 修改個人資料
  async MemberInfo_Mod(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.MemberInfo_Mod, obj);
    return retData;
  },

  // 載入銀行資料頁面
  async BankInfo_LoadMainPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.BankInfo_LoadMainPage, obj);
    return retData;
  },

  // 修改銀行資料
  async BankInfo_Mod(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.BankInfo_Mod, obj);
    return retData;
  },

  // 修改密碼
  async ChangePassword_Mod(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.ChangePassword_Mod, obj);
    return retData;
  },  

  // 載入存款頁面
  async Deposit_LoadMainPage() {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.Deposit_LoadMainPage);
    return retData;
  },

  // 在線支付載入頁面
  async OnlinePaymentDeposit_LoadMainPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.OnlinePaymentDeposit_LoadMainPage, obj);
    return retData;
  },

  // 公司入款載入頁面
  async CompanyDeposit_LoadMainPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.CompanyDeposit_LoadMainPage, obj);
    return retData;
  },

  // 新增在線支付
  async OnlineDeposit_Add(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.OnlineDeposit_Add, obj);
    return retData;
  },

  // 新增公司入款
  async CompanyRemittance_Add(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.CompanyRemittance_Add, obj);
    return retData;
  },

  // 載入取款頁面資訊
  async WithdrawApply_LoadMainPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.WithdrawApply_LoadMainPage, obj);
    return retData;
  },

  // 取得取款限制資訊
  async WithdrawApply_GetWithdrawLimitInfo() {
  	console.log(BLDef.PersonalCenterService.ServiceType)
  	console.log(BLDef.PersonalCenterService.ActType.WithdrawApply_GetWithdrawLimitInfo)
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.WithdrawApply_GetWithdrawLimitInfo);
    return retData;
  },

  // 取得洗碼量資訊
  async WithdrawApply_GetRakeAmtInfo(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.WithdrawApply_GetRakeAmtInfo, obj);
    return retData;
  },

  // 申請出金
  async WithdrawApply_Add(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.WithdrawApply_Add, obj);
    return retData;
  },

  // 取消出金
  async WithdrawApply_Cancel(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.WithdrawApply_Cancel, obj);
    return retData;
  },

  // 資金管理-查詢餘額
  async EWalletTransfer_GetBalance(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.EWalletTransfer_GetBalance, obj);
    return retData;
  },

  // 資金管理-轉帳
  async EWalletTransfer_Transfer(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.EWalletTransfer_Transfer, obj);
    return retData;
  },

  // 載入紀錄查詢頁面
  async CashFlowLog_LoadMainPag() {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.CashFlowLog_LoadMainPag);
    return retData;
  },

  // 交易紀錄查詢
  async CashFlowLog_Query(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.CashFlowLog_Query, obj);
    return retData;
  },

  // 取得交易紀錄詳細內容
  async CashFlowLog_LoadDetailPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.CashFlowLog_LoadDetailPage, obj);
    return retData;
  },

  // 匯出excel
  async CashFlowLog_ExportDetail(fileName, obj) {
    const retData = await HttpService.ExportExcel(fileName, BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.CashFlowLog_ExportDetail, obj);
    return retData;
  },

  // 查詢餘額
  async MemberCashFlowInfo_GetBalance(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.MemberCashFlowInfo_GetBalance, obj);
    return retData;
  },

  // 信箱驗證-驗證
  async EmailVerify_Verify(obj) {
    const retData = await HttpService.PostDynamic(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.MemberInfo_VerifyEmail, obj);
    return retData;
  }, // end EmailVerify_Verify

  // 信箱驗證-寄送驗證信
  async EmailVerify_SendValidEmail(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.MemberInfo_SendValidEmail, obj);
    return retData;
  }, // end EmailVerify_SendValidEmail

  // 信箱驗證
  async MemberInfo_GetValidEmailInfo() {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.MemberInfo_GetValidEmailInfo);
    return retData;
  }, // end MemberInfo_GetValidEmailInfo

  // 載入投注記錄下拉式選單
  async BetLog_LoadMainPage() {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.BetLog_LoadMainPage);
    return retData;
  }, // end BetLog_LoadMainPage

  // 查詢投注記錄
  async BetLog_Query(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.BetLog_Query, obj);
    return retData;
  }, // end BetLog_Query

  // 載入投注記錄明細
  async BetLog_LoadDetailPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.BetLog_LoadDetailPage, obj);
    return retData;
  }, // end BetLog_LoadDetailPage

  // 載入站內信主頁面
  async PrivateMessage_LoadMainPage() {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.PrivateMessage_LoadMainPage);
    return retData;
  },

  // 查詢站內信
  async PrivateMessage_Query(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.PrivateMessage_Query, obj);
    return retData;
  },

  // 站內信讀取
  async PrivateMessage_LoadDetailPage(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.PrivateMessage_LoadDetailPage, obj);
    return retData;
  },

  // 刪除站內信
  async PrivateMessage_Del(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.PrivateMessage_Del, obj);
    return retData;
  },
  
  // 开通微信平台账密
  async WeChat_OpenPlatForm(obj) {
    const retData = await HttpService.PostAes(BLDef.PersonalCenterService.ServiceType, BLDef.PersonalCenterService.ActType.WeChat_OpenPlatForm, obj);
    return retData;
  },
};
