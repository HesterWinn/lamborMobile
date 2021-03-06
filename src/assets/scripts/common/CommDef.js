export default
{
  /* eslint-disable */
  // 正則表達式
  Regex: {
     // 帳號欄位
     Account: /^[0-9A-Za-z]{4,12}$/,
     // 密碼欄位
     Password: /^[0-9A-Za-z!@#$%^&?\s]{6,20}$/,
     // 驗證碼欄位
     VCode: /^[0-9A-Za-z]{4}$/,
     // 手機號碼
     // PhoneNo: /^[0-9-+_]{6,30}$/,
     PhoneNo: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,
     // 遊戲關鍵字
     GameKeyword: /^[^\f\t\v]{0,20}$/,     
     // 取款密碼
     WithdrawPwd: /^[0-9]{6}$/,
     // 暱稱/姓名
     NickName: /^[A-Za-z\s\u4E00-\u9FA5]{2,50}$/,
     // 微信帳號
     WeChatID: /^[A-Za-z][A-Za-z0-9-_]{5,19}$/,
     // 信箱驗證1
     Email1: /^[0-9A-Za-z-_@\.]{5,100}$/,
     // 信箱驗證2
     Email2: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
     // QQ帳號
     QQID: /^[0-9]{5,15}$/,
     // 銀行名稱
     BankName: /^[0-9A-Za-z-_\u4E00-\u9FA5]{2,50}$/,
     // 分行名稱
     BankBranchName: /^[A-Za-z\u4E00-\u9FA5\s]{2,50}$/,
     // 銀行帳號
     BankAccount: /^[0-9]{10,25}$/,

     // 金額
     MoneyAmount: /^[1-9][0-9]*$/,
     // 備註
     Remark: /^[0-9A-Za-z-_\u4E00-\u9FA5!@#$%^&?\s]{0,100}$/,
     // 站內信關鍵字
     PMKeyWord: /^[0-9A-Za-z-_\u4E00-\u9FA5+/.*!@#$%^&?\s]{3,30}$/,
     
     // 银行卡号中间 * 号显示
     RegBankAcct: /^(\d{4})\d+(\d{4})$/,

  },
};
