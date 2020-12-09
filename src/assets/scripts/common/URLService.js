import SecurityService from 'scripts/common/Security';


export default{
    /* eslint-disable */

    // 將物件轉換為Url參數
    GetUrlParameterFromObj(Obj) {
        const Base64Str = SecurityService.AESEncryptWithBase64(JSON.stringify(Obj), '123456789');
        const UrlBase64Str = Base64Str.replace(/\+/gi, '-').replace(/\//gi, '_');
        return UrlBase64Str;
    }, // end GetUrlParameterFromObj

    // 將Url參數轉換回物件
    GetObjFromUrlParameter(UrlParameter) {
        const Base64Str = UrlParameter.replace(/\-/gi, '+').replace(/\_/gi, '/');
        const RetObj = SecurityService.AESDecryptToObj(Base64Str, '123456789');
        return RetObj;
    }, // end GetObjFromUrlParameter
};