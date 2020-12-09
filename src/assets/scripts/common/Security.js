import CJS from 'crypto-js';
import CUtility from '../common/CommUtility';

export default {
  KeyCreteKey(Data, KeySize, KeyBytes) {
    const Salt = CJS.enc.Utf8.parse(CUtility.CommUtility.GenGuid());
    return btoa(CJS.PBKDF2(Data.toString(CJS.enc.Utf8), Salt, { keySize: KeySize / KeyBytes, iterations: 300 }).toString());
  }, // end CreteKey

  // -----------------------------------------------------------------------------
  // KeyUtility - Generate Guid Key
  // -----------------------------------------------------------------------------
  KeyGenGuidKey(GuidValue) {
    const GuidStr = CUtility.GenGuid();
    const MD5Str = CJS.MD5(CJS.enc.Utf8.parse(((GuidValue === undefined) ? GuidStr : GuidValue)));
    const SHA256Str = CJS.SHA256(CJS.enc.Utf8.parse(GuidStr));

    return (SHA256Str + MD5Str);
  }, // end GenGuidKey

  // -----------------------------------------------------------------------------
  // KeyUtility - Generate SN Key
  // -----------------------------------------------------------------------------
  KeyGenSNKey(SNValue) {
    let SN = 0;

    if (SNValue === undefined) {
      SN = CUtility.CommUtility.GenRandomInteger(Number.MIN_VALUE, Number.MAX_VALUE);
    } else {
      SN = SNValue;
    }

    const MD5Str = CJS.MD5(CJS.enc.Utf8.parse(SN.toString()));
    const SHA256Str = CJS.SHA256(CJS.enc.Utf8.parse(SN.toString()));

    return (MD5Str + SHA256Str);
  }, // end GenSNKey

  // -----------------------------------------------------------------------------
  // KeyUtility - Generate Dynamic Key 1
  // -----------------------------------------------------------------------------
  KeyGenDynamicKey1(SrcData) {
    let Key = '';

    // 高低位交換
    const ReverseDateTickBytes = SrcData.split('');
    ReverseDateTickBytes.reverse();

    // 查表ASCII表
    let QueryTableSrcStr = '';
    for (let I = 0; I < ReverseDateTickBytes.length; I += 1) {
      QueryTableSrcStr += ReverseDateTickBytes[I].charCodeAt(0).toString(16);
    }

    if (QueryTableSrcStr.length % 2 !== 0) {
      QueryTableSrcStr = '0' + QueryTableSrcStr;
    }

    let QueryTableRetStr = '';
    for (let J = 0; J < QueryTableSrcStr.length; J += 2) {
      const TmpStr = QueryTableSrcStr[J] + QueryTableSrcStr[J + 1];
      const Tmp = parseInt(TmpStr) % 127;
      QueryTableRetStr += String.fromCharCode(Tmp);
    } // end for

    // 第一次 MD5 編碼
    Key = CJS.enc.Base64.stringify(CJS.MD5(CJS.enc.Utf8.parse(QueryTableRetStr)));

    // 第二次 SHA256 編碼
    Key += CJS.enc.Base64.stringify(CJS.SHA256(CJS.enc.Utf8.parse(Key)));

    // 第三次 SHA256 編碼
    Key = CJS.enc.Base64.stringify(CJS.SHA256(CJS.enc.Utf8.parse(Key)));

    return Key;
  }, // end GenDynamicKey1

  // -----------------------------------------------------------------------------
  // KeyUtility - Generate Dynamic Key 2
  // -----------------------------------------------------------------------------
  KeyGenDynamicKey2(Key1, Key2) {
    const FinalKey2 = this.KeyGenDynamicKey1(Key2);
    const Key = Key1 + FinalKey2;
    return CJS.enc.Base64.stringify(CJS.SHA256(CJS.enc.Utf8.parse(Key)));
  }, // end GenDynamicKey2

  // -----------------------------------------------------------------------------
  // DynamicSecurityUtility - Generate Guid Key
  // -----------------------------------------------------------------------------
  DynamicGenGuidKey(Guid) {
    return this.KeyGenGuidKey(Guid);
  }, // end GenGuidKey

  // -----------------------------------------------------------------------------
  // DynamicSecurityUtility - Generate SN Key
  // -----------------------------------------------------------------------------
  DynamicGenSNKey(SN) {
    return this.KeyGenSNKey(SN);
  }, // end GenSNKey

  // -----------------------------------------------------------------------------
  // DynamicSecurityUtility - Encrypt With Base64
  // -----------------------------------------------------------------------------
  DynamicEncryptWithBase64(DataObj, SNKey, GuidKey) {
    const Key = this.KeyGenDynamicKey2(SNKey, GuidKey);
    const ResultBuf = CJS.enc.Utf8.parse(this.AESEncryptWithBase64(JSON.stringify(DataObj), Key) + GuidKey + SNKey);
    return CJS.enc.Base64.stringify(ResultBuf);
  }, // end EncryptWithBase64

  // -----------------------------------------------------------------------------
  // DynamicSecurityUtility - Decrypt To String
  // -----------------------------------------------------------------------------
  DynamicDecryptToString(SData) {
    const Data = CJS.enc.Utf8.stringify(CJS.enc.Base64.parse(SData));

    // 取得資料
    const EncryptData = Data.substring(0, Data.length - 96 - 96);

    // 取得 Guid Key
    const GuidKey = Data.substring(EncryptData.length, EncryptData.length + 96);

    // 取得 SN Key
    const SNKey = Data.substring(EncryptData.length + 96, EncryptData.length + 96 + 96);

    // 產生 Final Key
    const Key = this.KeyGenDynamicKey2(SNKey, GuidKey);

    return this.AESDecryptToString(EncryptData, Key);
  }, // end DecryptToString

  // -----------------------------------------------------------------------------
  // DynamicSecurityUtility - Decrypt To Object
  // -----------------------------------------------------------------------------
  DynamicDecryptToObj(SData) {
    return JSON.parse(this.DynamicDecryptToString(SData));
  }, // end DecryptToString

  // -----------------------------------------------------------------------------
  // AESUtility - EncryptWithBase64
  // -----------------------------------------------------------------------------
  AESEncryptWithBase64(SData, Key) {
    const EData = CJS.enc.Utf8.parse(SData);
    const EKey = CJS.enc.Utf8.parse(Key);
    const EIV = CJS.MD5(EKey);
    const EncryptObj = CJS.AES.encrypt(EData, EIV, { iv: EIV, mode: CJS.mode.CBC, padding: CJS.pad.Pkcs7 });

    return EncryptObj.toString();
  }, // end EncryptWithBase64

  // -----------------------------------------------------------------------------
  // AESUtility - Decrypt To String
  // -----------------------------------------------------------------------------
  AESDecryptToString(SData, Key) {
    if (!SData) {
      return undefined;
    }

    const EKey = CJS.enc.Utf8.parse(Key);
    const EIV = CJS.MD5(EKey);
    const DecryptObt = CJS.AES.decrypt(SData, EIV, { iv: EIV, mode: CJS.mode.CBC, padding: CJS.pad.Pkcs7 });

    return CJS.enc.Utf8.stringify(DecryptObt);
  }, // end DecryptToString

  // -----------------------------------------------------------------------------
  // AESUtility - Decrypt To Obj
  // -----------------------------------------------------------------------------
  AESDecryptToObj(SData, Key) {
    if (!SData) {
      return undefined;
    }

    const EKey = CJS.enc.Utf8.parse(Key);
    const EIV = CJS.MD5(EKey);
    const DecryptObt = CJS.AES.decrypt(SData, EIV, { iv: EIV, mode: CJS.mode.CBC, padding: CJS.pad.Pkcs7 });
    return JSON.parse(CJS.enc.Utf8.stringify(DecryptObt));
  }, // end DecryptToObj
};
