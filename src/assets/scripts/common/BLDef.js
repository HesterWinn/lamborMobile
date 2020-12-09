export default {
  // 以下內容在本機端修改後請勿commit到git上

  // 後端API位址
  BKBLUrl: process.env.BKBLUrl,  
  // 網站識別碼
  WGUID: process.env.WGUID,
  // Signalr連線位址
  SignalRUrl: process.env.SignalRUrl,
  // PC版位址
  WebVersionHost: process.env.WebVersionHost,
  // 手機版位址
  MobileVersionHost: process.env.MobileVersionHost,
  // 微信授权位址
  WxAccreditHost: process.env.WxAccreditHost,
  // 資原檔URL
  ResourceURL: process.env.ResourceURL,
  // 資原檔URL
  ResourceCDN: process.env.ResourceCDN,

  // end 以下內容在本機端修改後請勿commit到git上

  // Signalr連線Hub名稱
  HubName: 'clienthub',

  // SignalR動作類型定義
  SignalR_ActionType: {
    // <summary>未定義</summary>
    Undefined: -1,
    // <summary>更新帳戶餘額</summary>
    UpdateBalance: 0,
    // <summary>停用會員</summary>
    DisableMember: 1,
    // <summary>登出時，其他分頁跟著登出</summary>
    Logout_OtherPageLogout: 2,
    // <summary>登入不同瀏覽器，後踢前</summary>
    Kick_By_OtherBrowser: 3,
    // <summary>登入時，其他分頁變成登入狀態</summary>
    Login_OtherPageLogin: 4,
    // <summary>維護時間到，進行通知</summary>
    Maintenance_Notify: 5,
    // <summary>維護時間到，更新畫面上的物件</summary>
    Maintenance_UpdateView: 6,
    // <summary>更新出金申請列表</summary>
    UpdateWithdrawalList: 7,
    // <summary>更新跑馬燈</summary>
    UpdateMarquee: 8,
    // <summary>通知站長更新財務管理</summary>
    Notify_UpdateFinancialMgr: 9,
    // <summary>維護結束，進行通知</summary>
    MaintenanceFinish_Notify: 10,
    // <summary>驗證信箱成功</summary>
    VerifyEmailSuccess: 12,
    // <summary>新增站內訊息</summary>
    AddPrivateMessage: 14,
    // <summary>讀取站內訊息</summary>
    ReadPrivateMessage: 15
  },

  // 後端回傳錯誤代碼列舉
  ErrorRetType: {
    // <summary>預設</summary>
    DEFAULT: -1,
    // <summary>成功</summary>
    SUCCESS: 0,
    // <summary>失敗</summary>
    COMM_FAIL: 1,
    // <summary>例外錯誤</summary>
    COMM_EXCEPTION_ERROR: 2,
    // <summary>逾時</summary>
    COMM_TIMEOUT: 3,
    // <summary>連線失敗</summary>
    COMM_CONNECT_FAIL: 4,
    // <summary>網路斷線</summary>
    COMM_NET_OFFLINE: 5,
    // <summary>伺服器不存在</summary>
    COMM_SERVER_NOT_EXIST: 6,
    // <summary>超出記憶體</summary>
    COMM_OUT_OF_MEM: 7,
    // <summary>檔案不存在</summary>
    COMM_FILE_NOT_EXIST: 8,
    // <summary>參數過多</summary>
    COMM_PARAM_TOO_MUCH: 9,
    // <summary>錯誤的檢查碼</summary>
    COMM_BAD_CHECKSUM: 10,
    // <summary>找不到命令(動作)</summary>
    COMM_NOT_FOUND_CMD: 11,
    // <summary>超出範圍</summary>
    COMM_OUT_OF_RANGE: 12,
    // <summary>超出緩衝區</summary>
    COMM_OUT_OF_BUFSIZE: 13,
    // <summary>重試失敗</summary>
    COMM_RETRY_FAIL: 14,
    // <summary>加密失敗</summary>
    COMM_ENCRYPT_FAIL: 15,
    // <summary>解密失敗</summary>
    COMM_DECRYPT_FAIL: 16,
    // <summary>壓縮失敗</summary>
    COMM_COMPRESS_FAIL: 17,
    // <summary>解壓縮失敗</summary>
    COMM_DECOMPRESS_FAIL: 18,
    // <summary>格式錯誤</summary>
    COMM_FORMART_ERROR: 19,
    // <summary>金鑰錯誤</summary>
    COMM_KEY_ERROR: 20,
    // <summary>系統維護中</summary>
    COMM_SYSTEM_MATAINING: 21,
    // <summary>請求過於頻繁</summary>
    COMM_TOO_FREQUENT_REQUEST: 22,
    // <summary>參數錯誤</summary>
    COMM_ILLEGAL_PARAM: 23,
    // <summary>找不到對應的動作方法</summary>
    COMM_NOT_FOUND_ACTION: 24,
    // <summary>帳號或是密碼錯誤</summary>
    COMM_ACCOUNT_OR_PASSWORD_INCORRECT: 25,
    // <summary>修改失敗</summary>
    COMM_MODIFY_FAIL: 26,
    // <summary>新增失敗</summary>
    COMM_ADD_FAIL: 27,
    // <summary>查詢失敗</summary>
    COMM_QUERY_FAIL: 28,
    // <summary>刪除失敗</summary>
    COMM_DEL_FAIL: 29,
    // <summary>驗證碼不正確</summary>
    COMM_VERIFY_CODE_INCORRECT: 30,
    // <summary>PRETOKEN不正確</summary>
    COMM_PRE_TOKEN_INCORRECT: 31,
    // <summary>JSON序列化錯誤</summary>
    COMM_JSON_SERIALIZE_FAIL: 32,
    // <summary>JSON反序列化錯誤</summary>
    COMM_JSON_DESERIALIZE_FAIL: 33,
    // <summary>欄位驗證錯誤</summary>
    COMM_VALIDATE_FAIL: 34,
    // <summary>欄位SQL Injection錯誤</summary>
    COMM_SQL_INJECTION_FAIL: 35,
    // <summary>參數錯誤</summary>
    COMM_PARAM_INCORRECT: 36,
    // <summary>密碼確認錯誤</summary>
    COMM_PWD_CONFIRM_FAIL: 37,
    // <summary>沒有權限</summary>
    COMM_PERMISSION_DENY: 38,
    // <summary>上傳失敗</summary>
    COMM_UPLOAD_FAIL: 39,
    // <summary>XSS過濾失敗</summary>
    COMM_XSS_FILTER_FAIL: 40,
    // <summary>服務不存在</summary>
    COMM_SERVICE_NOT_EXIST: 41,
    // <summary>未知身份</summary>
    COMM_UNKNOW_IDENTITY: 42,
    // <summary>尚未登入</summary>
    COMM_NOT_LOGIN: 43,
    // <summary>帳號凍結</summary>
    COMM_ACCOUNT_FREEZE: 44,
    // <summary>動作不存在</summary>
    COMM_ACTION_NOT_EXIST: 45,
    // <summary>建立帳號失敗</summary>
    COMM_CREATE_ACCOUNT_FAIL: 46,
    // <summary>不提供試玩</summary>
    COMM_NOT_PROVIDE_DEMO: 47,

    // <summary>傳送認證信箱</summary>
    COMM_SEND_VERIFICATION_EMAIL_FAIL: 50,
    // <summary>認證信箱存在</summary>
    COMM_VERIFICATION_EMAIL_EXIST: 51,
    // <summary>傳送信箱次數上限</summary>
    COMM_SEND_VERIFICATION_EMAIL_COUNT_LIMIT: 52,
    // <summary>驗證信箱</summary>
    COMM_VERIFY_EMAIL_FAIL: 53,

    // <summary>轉帳失敗</summary>
    CASH_TRANSFER_FAIL: 10000,
    // <summary>重複轉帳</summary>
    CASH_DULICATE_TRANSFER: 10001,
    // <summary>餘額不足</summary>
    CASH_BALANCE_NOT_ENOUGH: 10002,
    // <summary>轉帳/交易不存在</summary>
    CASH_TRANSACTION_NOT_EXIST: 10003,
    // <summary>轉帳/交易已存在</summary>
    CASH_TRANSACTION_EXIST: 10004,
    // <summary>拒絕交易</summary>
    CASH_REJECT_TRANSACTION: 10005,
    // <summary>帳號身分錯誤</summary>
    SignalR_ACCT_FAIL: 20000,
    // <summary>資料存取失敗</summary>
    SignalR_DATA_FAIL: 20001,
    // <summary>傳遞資料目標錯誤</summary>
    SignalR_POST_TARGET_FAIL: 20002,
    // <summary>傳遞資料錯誤</summary>
    SignalR_POST_DATA_FAIL: 20003,
    // <summary>DB執行失敗</summary>
    DB_EXECUTE_FAIL: 100000,
    // <summary>DB連線失敗</summary>
    DB_CONNECT_FAIL: 100001,
    // <summary>DB不存在</summary>
    DB_NOT_EXIST: 100002,
    // <summary>DB預存程序(SP)不存在</summary>
    DB_SP_NOT_EXIST: 100003,
    // <summary>DB無執行權限</summary>
    DB_NO_EXEC_PERMISSION: 100004,
    // <summary>DB例外錯誤</summary>
    DB_EXCEPTION_ERROR: 100005,
    // <summary>DB新增失敗</summary>
    DB_ADD_FAIL: 100006,
    // <summary>DB刪除失敗</summary>
    DB_DELETE_FAIL: 100007,
    // <summary>DB修改失敗</summary>
    DB_MODIFY_FAIL: 100008,
    // <summary>DB查詢失敗</summary>
    DB_QUERY_FAIL: 100009,
    // <summary>DB查詢無結果(無資料)</summary>
    DB_QUERY_NO_RESULTS: 100010,
    // <summary>帳號不存在</summary>
    DB_ACCOUNT_NOT_EXIST: 100011,
    // <summary>帳號無執行權限</summary>
    DB_ACCOUNT_NO_EXCUTE_PERMISSION: 100012,
    // <summary>帳號密碼錯誤</summary>
    DB_ACCOUNT_PASSWORD_ERROR: 100013,
    // <summary>帳號停用狀態</summary>
    DB_STATUS_DISABLED: 100014,
    // <summary>帳號停用狀態</summary>
    DB_DATA_NOT_EXIST: 100015,
    // <summary>超出限制範圍</summary>
    DB_OVER_LIMIT: 100016,
    // <summary>資料關係尚未移除無法刪除</summary>
    DB_DATA_RELATIONSHIP_NOT_REMOVE: 100017,
    // <summary>相關資料已存在</summary>
    DB_DATA_IS_EXIST: 100018,
    // <summary>資料異常</summary>
    DB_DATA_ABNORMAL: 100019,
    // <summary>數量超出限制範圍</summary>
    DB_QUANTITY_OVER_LIMIT: 100020,
    // <summary>資料重複</summary>
    DB_DATA_DUPLICATE: 100021,
  },

  // 遊戲前台交易類型
  GFE_TransType: {
    // <summary>存款成功</summary>
    TransType_Deposit: 1,
    // <summary>錢包轉帳</summary>
    TransType_EWallet: 2,
    // <summary>紅利派送</summary>
    TransType_BonusActivity: 3,
    // <summary>反水派送</summary>
    TransType_RakeSettled: 4,
    // <summary>取款成功</summary>
    TransType_Withdraw: 5,
  },

  // 系統後台維護種類列舉
  MaintainTypesEnum: {
    // <summary>未定義</summary>
    UNDEFINED: -1,
    // <summary>全系統</summary>
    AllSYS: 0,
    // <summary>遊戲前台</summary>
    GameFrontEnd: 1,
    // <summary>遊戲API</summary>
    GameApi: 2,
    // <summary>金流商</summary>
    CashFlowProvider: 3,
  },

  // 跑馬燈訊息類型
  BroadcastMsgType: {
    // <summary>未定義</summary>
    UNDEFINED: -1,
    // <summary>一般</summary>
    NORMAL: 0,
    // <summary>緊急</summary>
    EMERGENCY: 1,
    // <summary>維護</summary>
    MAINTAIN: 2,
  },

  // 帳號狀態
  SysAccountStatus: {
    // <summary>未登入</summary>
    NOT_LOGIN: 0,
    // <summary>未登入/停用</summary>
    NOT_LOGIN_DISABLED: 1,
    // <summary>未登入/刪除</summary>
    NOT_LOGIN_DELETED: 2,
    // <summary>已登入/已啟用</summary>
    LOGINED_ENABLED: 3,
    // <summary>已登入/已凍結</summary>
    LOGINED_FROZEN: 4,
  },
  // 身分
  IdentityType: {
    // <summary>正式</summary>
    FORMAL: 0,
    // <summary>試玩</summary>
    TRIAL: 1,
  },

  // 平台
  Paltform: {
    // <summary>電腦版</summary>
    Web_PC: 0,
    // <summary>行動版</summary>
    Web_Mobile: 1,
  },

  // 遊戲分類
  GameCatlogType: {
    // <summary>未定義</summary>
    Undefine: -1,
    // <summary>視訊</summary>
    LiveVideo: 0,
    // <summary>電子遊戲</summary>
    EGames: 1,
    // <summary>HTML5移動平台</summary>
    LiveVideonHtml5: 2,
    // <summary>電子遊戲Html5</summary>
    ElectronicGameHtml5: 3,
  },

  // 選單資料種類
  SelectTypesDef: {
    // <summary>未定義</summary>
    Undefined: -1,
    // <summary>省分選單資料</summary>
    Provinces: 0,
    // <summary>城市選單資料</summary>
    CITIES: 1,
    // <summary>區域選單資料</summary>
    DISTS: 2,
    // <summary>結算類型選單資料</summary>
    Settle_Cycle_Types: 3,
    // <summary>設定狀態選單資料</summary>
    Setting_Status_Types: 4,
    // <summary>天選單資料</summary>
    Days: 5,
    // <summary>星期幾選單資料</summary>
    Week_Days: 6,
    // <summary>小時選單資料</summary>
    Hours: 7,
    // <summary>性別核選按紐選單資料</summary>
    Sex_Radio_Types: 8,
    // <summary>性別選單資料</summary>
    Sex_Types: 9,
    // <summary>入金紅利選單資料</summary>
    Deposit_Bonus_Types: 100,
    // <summary>反水設定選單資料</summary>
    Reverse_Water_Setting_Types: 101,
    // <summary>金流手續費設定選單資料</summary>
    Cash_Flow_Fee_Setting_Types: 102,
    // <summary>金流商選單資料</summary>
    Cash_Flow_Vendors: 103,

    // <summary>代理階層</summary>
    IBHierarchy: 104,
    // <summary>會員等級選單資料</summary>
    MEMBER_LEVELS: 105,
    // <summary>反水設定計算方式選單資料</summary>
    Reverse_Water_Setting_Calculate_Types: 106,
    // <summary>上級代理商資訊</summary>
    Upper_IB_Info: 110,
  },

  // ------------------------------------------------
  // 設定狀態
  // ------------------------------------------------
  SettingState: {
    // <summary>全部</summary>
    Settingtate_All: '701',
    // <summary>啟用中</summary>
    SettingState_Enabled: '702',
    // <summary>停用中</summary>
    SettingState_Disabled: '703',
    // <summary>禁用中</summary>
    SettingState_Stopping: '704',
    // <summary>已删除</summary>
    SettingState_Deleted: '705',
  },

  // ------------------------------------------------
  // 帳戶狀態
  // ------------------------------------------------
  AccountStatus: {
    // <summary>全部</summary>
    AccountStatus_All: '701',
    // <summary>启用中</summary>
    AccountStatus_Enabled: '702',
    // <summary>停用中</summary>
    AccountStatus_Disabled: '703',
    // <summary>钱包冻结</summary>
    AccountStatus_Freeze: '704',
    // <summary>已删除</summary>
    AccountStatus_Deleted: '705',
  },

  // ------------------------------------------------
  // 申請狀態
  // ------------------------------------------------
  ApplyStatus: {
    // <summary>待審核</summary>
    PendingReview: 0,
    // <summary>待補充</summary>
    Completed: 1,
    // <summary>已通過</summary>
    Pass: 2,
    // <summary>已拒絕</summary>
    Reject: 3,
  },

  // ------------------------------------------------
  // 性別種類
  // ------------------------------------------------
  SexType: {
    // <summary>男</summary>
    SexType_Male: 1,
    // <summary>女</summary>
    SexType_Female: 2,
    // <summary>未填</summary>
    SexType_Undefined: 0,
    // <summary>不限</summary>
    SexType_All: -1,
  },

  // ------------------------------------------------
  // 佣金收入方式
  // ------------------------------------------------
  CommissionInType: {
    // <summary>佣金上缴+抽反水</summary>
    CommissionInType_PlusCommission: 1401,
    // <summary>抽反水</summary>
    CommissionInType_Rake: 1402,
    // <summary>全部</summary>
    CommissionInType_All: -1,
  },

  // ------------------------------------------------
  // 佣金計算方式
  // ------------------------------------------------
  CommissionType: {
    // <summary>累計制</summary>
    CommissionType_GrandTotal: 1301,
    // <summary>非累計制</summary>
    CommissionType_NonGrandTotal: 1302,
    // <summary>全部</summary>
    CommissionType_All: -1,
  },

  // ------------------------------------------------
  // 系統角色
  // ------------------------------------------------
  SystemRole: {
    // <summary>系統商</summary>
    SystemRole_SystemProvider: 1,
    // <summary>站長</summary>
    SystemRole_WebMaster: 2,
    // <summary>代理</summary>
    SystemRole_IB: 3,
    // <summary>會員</summary>
    SystemRole_Member: 4,
    // <summary>站長後台人員</summary>
    SystemRole_WebMasterStaff: 5,
  },

  // ------------------------------------------------
  // 修改密碼
  // ------------------------------------------------
  ChangePasswordType: {
    // <summary>未定義</summary>
    Undefined: '-1',
    // <summary>變更密碼(需要原始密碼)</summary>
    ChangePWD: '2',
    // <summary>變更密碼(不用原本密碼)</summary>
    ChangePWDWithOutORGPWD: '3',
    // <summary>變更取款密碼</summary>
    ChangeWithdrawPWD: '4',
  },

  // ------------------------------------------------
  // 遊戲廠商分類
  // ------------------------------------------------
  GameApiType: {
   // <summary>亞遊</summary>
   AG: '1',
   // <summary>歐博</summary>
   AllBet: '2',
   // <summary>PT</summary>
   PT: '3',
   // <summary>KG</summary>
   KG: '4',
   // <summary>沙巴</summary>
   SABA: '5',
   // <summary>星联盟</summary>
   StarNet: '6',
   //  <summary>AG</summary>
   QT: '7',
   //  <summary>DT</summary>
    DT: '8',
   //  <summary>SG(新霸)</summary>
    SG: '9',
   //  <summary>OG</summary>
    OG: '10',
   //  <summary>阿波罗彩票</summary>
    APL: '11',
   // <summary>IM</summary>
    IM: '12', 
   // <summary>开元</summary>
    KY: '13',
    // <summary>MG</summary>
    MG: '14',
    // <summary>BBIN</summary>
    BBIN: '15',
    // <summary>IM中的TOPTRENDGAME_SLOT</summary>
    TTG: '16',
    // <summary>IM中的PRAGMATIC_SLOT</summary>
    PG: '17',
    // <summary>WINNINGGAMES_SLOT</summary>
    WG: '18',
   // <summary>REALTIMEGAMING_SLOT</summary>
    RTG: '19',
   // <summary>REDTIGER_SLOT</summary>
     RT: '20',
    // <summary>PLAYSTAR_SLOT</summary>
     PS: '21',
     // <summary>PLAYNGO_SLOT</summary>
      PNG: '22',
     // <summary>NETENT_SLOT</summary>
      NetEnt: '23',
     // <summary>SUNBET_LD</summary>
      Sunbet: '24',
     // <summary>GG</summary>
      GG: '25',
     // <summary>MWG</summary>
      MWG: '26',
     // <summary>IMSB_SB</summary>
      IMSB: '27',
     // <summary>ESPORTSBULL_ESPORTS</summary>
      ESportsbull: '28',
     // <summary>IG_LOTTERY</summary>
      IGLottery: '29',  
     // <summary>IG_LOTTERY</summary>
       BP: '30' 
  },

  // ------------------------------------------------
  // 支付類行
  // ------------------------------------------------
  PaymentType: {
    // <summary>未定義</summary>
    UNDEFINED: '-1',
    // <summary>網銀</summary>
    BANK: '1',
    // <summary>微信</summary>
    WECHATPAY: '2',
    // <summary>支付寶</summary>
    ALIPAY: '3',
  },

  // ------------------------------------------------
  // 設備類行
  // ------------------------------------------------
  PlatformType: {
    // <summary>未定義</summary>
    UNDEFINED: '-1',
    // <summary>PC網頁</summary>
    PC: '0',
    // <summary>手機網頁</summary>
    MOBILE: '1',
  },

  // ------------------------------------------------
  // 交易紀錄類型
  // ------------------------------------------------
  TransType: {
    // <summary>存款</summary>
    TransType_Deposit: 1,
    // <summary>入款退回</summary>
    TransType_EWallet: 2,
    // <summary>紅利派送</summary>
    TransType_BonusActivity: 3,
    // <summary>反水派送</summary>
    TransType_RakeSettled: 4,
    // <summary>取款</summary>
    TransType_Withdraw: 5,
  },

  // ------------------------------------------------
  // 紅利方式
  // ------------------------------------------------
  BonusWayType: {
    // <summary>未定義</summary>
    UNDEFINED: '-1',
    // <summary>存款 (紅利設定)</summary>
    DEPOSIT: '1',
    // <summary>紅利活動</summary>
    ACTIVITY: '2',
  },

  // ------------------------------------------------
  // 匯款存款方式
  // ------------------------------------------------
  RemittDepositType: {
    // <summary>ATM自动柜员机</summary>
    RemittDepositType_ATM: '1',
    // <summary>ATM现金入款</summary>
    RemittDepositType_ATM_Cash: '2',
    // <summary>银行柜台</summary>
    RemittDepositType_Cabinet: '3',
    // <summary>支付宝</summary>
    RemittDepositType_Alipay: '4',
    // <summary>手机银行转账</summary>
    RemittDepositType_MobileBank: '5',
    // <summary>网银转账</summary>
    RemittDepositType_WebBank: '6',
    // <summary>其他</summary>
    RemittDepositType_Others: '7',
  },

  // ------------------------------------------------
  // 公用服務
  // ------------------------------------------------
  CommonService: {
    ServiceType: 0,
    ActType: {
      // <summary>產生驗證碼</summary>
      VerifyCode_Gen: 1,
      // <summary>驗證驗證碼</summary>
      VerifyCode_Verify: 2,
      // <summary>檢查帳號是否可用</summary>
      CheckAcctAvailable: 3,
      // <summary>檢查銀行帳號/個人帳號資訊填寫填寫</summary>
      Comm_GetDataFillInStatus: 4,
      // <summary>檢查權限</summary>
      Comm_CheckPermission: 5,      
      // <summary>取得客服資訊</summary>
      Comm_GetCustomerServiceInfo: 8,
      // <summary>取得會員資訊</summary>
      Comm_GetMemberInfo: 9,
      // <summary>取得優惠活動</summary>
      Comm_GetBonusActivity: 14,
      // <summary>取得會員等級升級資訊</summary>
      Comm_GetMemberLvProgressInfo: 15,
      // <summary>取得會員等級紅利資訊</summary>
      Comm_GetMemberLvBonusInfo: 16,
      // <summary>取得性別選單</summary>
      SexTypeList_Get: 17,
      // <summary>取得語系選單</summary>
      Comm_GetLanguages: 18,
      // <summary>取得跑馬燈</summary>
      Comm_GetMarqueeInfo: 19,
      // <summary>取得会员等级的优惠活动</summary>
      Comm_GetBonusActivity_MemberLv: 20,
      // <summary>使用省分取得城市選單資料</summary>
      GetCityTypes: 101,
      // <summary>使用城市取得區域選單資料</summary>
      GetDistTypes: 102,
    },
  },

  // ------------------------------------------------
  // 登入服務
  // ------------------------------------------------
  LoginService: {
    ServiceType: 1,
    ActType: {
      // <summary>載入登入頁面</summary>
      LoadPage: 0,
      // <summary>重新產生驗證碼</summary>
      RegenVCode: 1,
      // <summary>登入確認</summary>
      LoginConfirm: 2,
      // <summary>登出</summary>
      LogOut: 3,
      // <summary>更新存活時間</summary>
      UpdateSurviveTime: 4,

      // <summary>忘記密碼</summary>
      ForgetLoginPassword: 6,
      // <summary>微信登录</summary>
      WxLoginConfirm: 7,
    },
  },

  // ------------------------------------------------
  // 註冊服務
  // ------------------------------------------------
  RegisterService: {
    ServiceType: 3,
    ActType:
    {
      // ------------------------------------------------
      // 0~199 - 會員註冊
      // ------------------------------------------------
      // <summary>註冊會員</summary>
      MemberRegister_Add: 1,
      // <summary>載入註冊成功畫面資料</summary>
      MemberRegister_LoadSuccessPage: 2,

      // ------------------------------------------------
      // 200~399 - 代理註冊
      // ------------------------------------------------
      // <summary>載入代理註冊頁面</summary>
      IBRegister_LoadMainPage: 200,
      // <summary>註冊代理</summary>
      IBRegister_Add: 201,
    },
  },

  // ------------------------------------------------
  // 個人中心服務
  // ------------------------------------------------
  PersonalCenterService: {
    ServiceType: 4,
    ActType:
    {
      // ------------------------------------------------
      // 0~199 for 總攬
      // ------------------------------------------------

      // ------------------------------------------------
      // 1000~1999 for 個人資料
      // ------------------------------------------------
      // <summary>修改會員資料</summary>
      MemberInfo_Mod: 1001,

      // <summary>寄送驗證信，only 前端 => 後端</summary>
      MemberInfo_SendValidEmail: 1002,
      // <summary>驗證信箱</summary>
      MemberInfo_VerifyEmail: 1005,
      // <summary>取得驗證信箱資訊</summary>
      MemberInfo_GetValidEmailInfo: 1006,

      // <summary>取得驗證信箱資訊</summary>
      MemberInfo_GetQRCode: 1007,

      // ------------------------------------------------
      // 2000~2999 for 銀行資料
      // ------------------------------------------------
      // <summary>載入會員銀行帳戶資料</summary>
      BankInfo_LoadMainPage: 2000,
      // <summary>修改會員銀行帳戶資料</summary>
      BankInfo_Mod: 2001,

      // ------------------------------------------------
      // 3000~3999 for 修改密碼
      // ------------------------------------------------
      // <summary>修改密碼</summary>
      ChangePassword_Mod: 3000,

      // ------------------------------------------------
      // 4000~4999 for 存款
      // ------------------------------------------------
      // <summary>載入存款_線上支付操作頁面</summary>
      OnlinePaymentDeposit_LoadMainPage: 4001,
      // <summary>載入存款_公司入款操作頁面</summary>
      CompanyDeposit_LoadMainPage: 4002,
      // <summary>新增線上付款</summary>
      OnlineDeposit_Add: 4003,
      // <summary>公司入款方式入金,新增一筆入款申請單 (狀態為申請中)</summary>
      CompanyRemittance_Add: 4004,

      // ------------------------------------------------
      // 5000~5999 for 取款
      // ------------------------------------------------
      // <summary>載入存款_選擇頁面</summary>
      Deposit_LoadMainPage: 4000,
      // <summary>載入取款申請主頁面資料</summary>
      WithdrawApply_LoadMainPage: 5000,
      // <summary>載入取款限制資訊</summary>
      WithdrawApply_GetWithdrawLimitInfo: 5001,
      // <summary>新增取款申請</summary>
      WithdrawApply_Add: 5002,
      // <summary>取消取款申請</summary>
      WithdrawApply_Cancel: 5003,
      // <summary>取得洗碼量相關資訊</summary>
      WithdrawApply_GetRakeAmtInfo: 5005,

      // ------------------------------------------------
      // 6000~6999 for 錢包轉帳
      // ------------------------------------------------
      // <summary>查詢遊戲商餘額</summary>
      EWalletTransfer_GetBalance: 6001,
      // <summary>轉帳</summary>
      EWalletTransfer_Transfer: 6002,

      // ------------------------------------------------
      // 7000~7999 for 記錄查詢
      // ------------------------------------------------
      // <summary>載入記錄查詢主頁面資料</summary>
      CashFlowLog_LoadMainPag: 7000,
      // <summary>查詢記錄</summary>
      CashFlowLog_Query: 7001,
      // <summary>載入記錄明細</summary>
      CashFlowLog_LoadDetailPage: 7002,
      // <summary>匯出明細</summary>
      CashFlowLog_ExportDetail: 7003,
      // <summary>載入投注記錄查詢主頁面資料</summary>
      BetLog_LoadMainPage: 7100,
      // <summary>查詢投注記錄</summary>
      BetLog_Query: 7101,
      // <summary>載入投注記錄明細</summary>
      BetLog_LoadDetailPage: 7102,
      // ------------------------------------------------
      // 8000~8999 個人金流資料
      // ------------------------------------------------
      // <summary>取得餘額</summary>
      MemberCashFlowInfo_GetBalance: 8000,

      // ------------------------------------------------
      // 9000~8999 站內信息
      // ------------------------------------------------
      // <summary>載入主頁面</summary>
      PrivateMessage_LoadMainPage: 9000,
      // <summary>查詢</summary>
      PrivateMessage_Query: 9001,
      // <summary>詳細資訊</summary>
      PrivateMessage_LoadDetailPage: 9002,
      // <summary>刪除</summary>
      PrivateMessage_Del: 9003,
      
      // <summary>开通微信平台账密</summary>
      WeChat_OpenPlatForm: 10000,
    },
  },

  // ------------------------------------------------
  // 資訊服務
  // ------------------------------------------------
  InformationService: {
    ServiceType: 5,
    ActType: {
      // ------------------------------------------------
      // 0~199 for 優惠活動
      // ------------------------------------------------
      // <summary>查詢優惠活動</summary>
      BounsActivity_Query: 1,
      // <summary>載入優惠活動詳細內容</summary>
      BounsActivity_LoadDetailPage: 2,

      // ------------------------------------------------
      // 0~199 for 新聞中心
      // ------------------------------------------------
      // <summary>查詢新聞中心資料</summary>
      NewsCenter_Query: 201,
      // <summary>載入新聞中心詳細內容</summary>
      NewsCenter_LoadDetailPage: 202,

      // ------------------------------------------------
      // 300~399 聯繫我們
      // ------------------------------------------------
      // <summary>載入連繫我們主頁面(登入使用者)</summary>
      ContactUs_LoadMainPage_LoginUser: 300,
      // <summary>載入連繫我們主頁面(訪客)</summary>
      ContactUs_LoadMainPage_Guest: 301,
      // <summary>新增聯繫我們(登入使用者)</summary>
      ContactUs_Add_LoginUser: 302,
      // <summary>新增聯繫我們(訪客)</summary>
      ContactUs_Add_Guest: 303,
    },
  },

  // ------------------------------------------------
  // 遊戲服務
  // ------------------------------------------------
  GameService: {
    ServiceType: 6,
    ActType: {
      // ------------------------------------------------
      // 0~999 for 電子遊戲
      // ------------------------------------------------
      // <summary>載入電子遊戲主頁面資料</summary>
      EGame_LoadMainPage: 0,
      // <summary>查詢電子遊戲資料</summary>
      EGame_Query: 1,

      // ------------------------------------------------
      // 1000~1999 for 遊戲手機下注
      // ------------------------------------------------
      // <summary>載入遊戲手機下注主頁面資料</summary>
      GamePhoneBet_LoadGameMainPage: 1000,
      // <summary>查詢遊戲手機下注資料</summary>
      GamePhoneBet_Query: 1001,

      // ------------------------------------------------
      // 2000~2999 for 進行遊戲
      // ------------------------------------------------
      // <summary>進行遊戲</summary>
      Game_Player: 2000,

      // <summary>取得遊戲維護狀態</summary>
      GetGameMaintainStatus: 3000,
    },
  },

};
