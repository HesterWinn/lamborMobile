import axios from 'axios';
import Security from '../common/Security';
import BLDef from '../common/BLDef';

export default{
  // 動態加解密request
  PostDynamic(ST, AT, DataObj, CustToken, platForm) {
    if (DataObj === undefined) {
      DataObj = null;
    } // end if
    localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000));
    console.log('ST:' + ST + ', AT:' + AT);
    console.log(DataObj);
    console.log(BLDef.BKBLUrl);
    const tmpToken = CustToken === undefined ? localStorage.getItem('Token') : CustToken;

    return axios.post(BLDef.BKBLUrl,
      {
        AT: AT,
        ST: ST,
        TK: tmpToken,
        Platform: platForm,
        Data: Security.DynamicEncryptWithBase64(DataObj, Security.KeyGenSNKey(1), Security.KeyGenGuidKey('1')),
      },
    ).then((rsp) => {
      try {
        const viewObj = Security.DynamicDecryptToObj(rsp.data.Rep);
        console.log('ST:' + ST + ', AT:' + AT);
        console.log(viewObj);
        // viewObj 為空
        if (viewObj === undefined || viewObj == null) {
          return { Ret: '-1', Message: '預設', Data: null };
        }

        // viewObj.Data 為空
        if (viewObj.Data === undefined || viewObj.Data == null) {
          return viewObj;
        }

        return viewObj;
      } catch (ex) {
        return { Ret: '-1', Message: 'excetion錯誤', Data: null };
      }
    });
  },

  // AES加密request
  PostAes(ST, AT, DataObj) {
    if (DataObj === undefined) {
      DataObj = null;
    } // end if
    localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000));
    console.log('ST:' + ST + ', AT:' + AT);
    console.log('----------------------------------------------------------');
    console.log(DataObj);
    console.log('----------------------------------------------------------');
    const key = localStorage.getItem('Auth');

    return axios.post(BLDef.BKBLUrl,
      {
        ST: ST,
        AT: AT,
        TK: localStorage.getItem('Token'),
        Data: Security.AESEncryptWithBase64(JSON.stringify(DataObj), key),
      },
    ).then((rsp) => {
      try {
        const viewObj = Security.AESDecryptToObj(rsp.data.Rep, key);
        console.log('ST:' + ST + ', AT:' + AT);
        console.log(viewObj);
        // viewObj 為空
        if (viewObj === undefined || viewObj == null) {
          return { Ret: '-1', Message: '預設', Data: null };
        }

        // viewObj.Data 為空
        if (viewObj.Data === undefined || viewObj.Data == null) {
          return viewObj;
        }
        return viewObj;
      } catch (ex) {
        return { Ret: '-1', Message: 'excetion錯誤', Data: null };
      }
    });
  },

  // http get html內容
  GetContent(serviceUrl) {
    return axios({
        url: serviceUrl,
        dataType: 'text',
    }).then(function success(rsp) {
        console.log(rsp.data);
        return rsp.data;
    }, function error() {
        return 'http錯誤';
    });
  },
  
  // 匯出Excel
  ExportExcel(exportFileName, ST, AT, DataObj) {
    if (DataObj == undefined) {
      DataObj = null;
    }
    const key = localStorage.getItem('Auth');

    return axios.post(BLDef.BKBLUrl,
      {
        ST: ST,
        AT: AT,
        TK: localStorage.getItem('Token'),
        Data: Security.AESEncryptWithBase64(JSON.stringify(DataObj), key),
      },
      { responseType: 'arraybuffer' },
    ).then((rsp) => {
        const filename = exportFileName + '.xlsx';
        const contentType = rsp.headers['content-type'];
        
        try {
          const blob = new Blob([rsp.data], { type: contentType });                    

            if (window.navigator.msSaveOrOpenBlob) { // for IE
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                const url = window.URL.createObjectURL(blob);
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', url);
                linkElement.setAttribute('download', filename);

                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: false
                });

                linkElement.dispatchEvent(clickEvent);
            }
        } catch (ex) {
            console.log(ex);
        }
    });
  },
};

