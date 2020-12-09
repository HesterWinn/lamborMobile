import moment from 'moment'
import BLDef from 'scripts/common/BLDef'
import URLService from 'scripts/common/URLService'
import GameService from 'scripts/businessLogic/gameService'
import PersonalCenterService from 'scripts/businessLogic/personalCenterService'
import Router from '@/router'

export default {
  // 計算總資產金額
  async CalculateSummaryAmount() {
    let retSummaryAmount = 0;
    let retBool = false;
    const data = await GameService.GetGameMaintainStatus()

    if (data.Ret == 0) {
      for (let i = 0; i < data.Data.GameAPIVendorMaintainStatusList.length; i++) {
        if (data.Data.GameAPIVendorMaintainStatusList[i].IsMaintaining === false) {
            const inputObj = {
                APIVendorID: data.Data.GameAPIVendorMaintainStatusList[i].GameAPIVendor
            };
            // eslint-disable-next-line no-await-in-loop
            const balanceData = await PersonalCenterService.EWalletTransfer_GetBalance(inputObj);
            if (balanceData.Ret == 0 ) {
              retSummaryAmount = this.NumberAdd(retSummaryAmount, balanceData.Data.GameApiBalance.Amount);
              retBool = true;
            }
        }
      }

      if (retBool === false) {
        retSummaryAmount = '维护中';
      }
    } else {
      retSummaryAmount = '维护中';
    }
    return retSummaryAmount;
  },
  tmpScrollHeight: undefined,
  // 自訂加法器
  NumberAdd(arg1, arg2) {
    let r1;
    let r2;
    let m = 0;
    let c = 0;
    try { r1 = arg1.toString().split('.')[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split('.')[1].length; } catch (e) { r2 = 0; }
    c = Math.abs(r1 - r2);
    //eslint-disable-next-line 
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      //eslint-disable-next-line 
      const cm = Math.pow(10, c);
      if (r1 > r2) {
          arg1 = Number(arg1.toString().replace('.', ''));
          arg2 = Number(arg2.toString().replace('.', '')) * cm;
        } else {
          arg1 = Number(arg1.toString().replace('.', '')) * cm;
          arg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
  },
  GenGuid() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }, // end GenGuid

  GenRandomInteger(MinNum, MaxNum) {
    // 取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
    return Math.floor(Math.random() * (MinNum - MaxNum + 1)) + MinNum;
  }, // end GenRandomInteger
  
  // tick轉換為本地時間
  UtcTicksToLocalTime(utcDateTicks, format) {
    if (!utcDateTicks) {
      return undefined;
    }
    return moment(utcDateTicks).utcOffset(8 * 60).format(format);
  },

  // 本地時間轉換為tick
  LocalTimeToUtcTicks(orgLocalDateTime, IsEndTime, IsContainTime) {
    if (!orgLocalDateTime) {
      return undefined;
    }

    let localDateTime;
    if (IsContainTime === true) {      
      localDateTime = orgLocalDateTime;
    } else {
      // 將時分秒格式去除, 保留日期部份避免受當地時間影響
      localDateTime = moment(orgLocalDateTime).format('YYYY/MM/DD');
    }
    // 計算與UTC+8的時差
    const timeoffset = ((new Date().getTimezoneOffset() / 60) + 8) * -1;

    // 補正同一目標日期時間，與UTC+8差距的tick
    const utcEightFixTick = timeoffset * 3600 * 1000;

    if (IsEndTime === true) {      
        return new Date(localDateTime).getTime() + utcEightFixTick + (86400 * 1000 - 1); // 結束日期以當天的23:59:59.999
    } 

    return new Date(localDateTime).getTime() + utcEightFixTick;
  },

  // 手機格式隱藏部分號碼
  PhoneNumberFormat(phoneNumber) {
    if (!phoneNumber) {
      return phoneNumber;
    }

    const phoneNumberString = phoneNumber.toString();
    const phoneNumberLength = phoneNumberString.length;
    if (phoneNumberLength <= 4) {
        return phoneNumberString;
    }

    const tmpArray = phoneNumberString.split('');
    if (phoneNumberLength <= 8) {
        let toAddChars = '';
        for (let index = 0; index < phoneNumberLength - 4; index += 1) {
            toAddChars += '*';
        }
        tmpArray.splice(0, phoneNumberLength - 4, toAddChars);
    } else {
        tmpArray.splice(phoneNumberLength - 8, 4, '****');
    }
    return tmpArray.join('');
  },

  // 金錢轉換格式
  MoneyFormat(content) {
    if (content !== undefined && (!isNaN(parseFloat(content)) && isFinite(content))) {
      return '¥' + content.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return content;
  },

  // 性別轉換格式
  SexFormat(content) {    
    if (content !== undefined) {
      switch (Number(content)) {
        case BLDef.SexType.SexType_Undefined:
            return '';
        case BLDef.SexType.SexType_Male:
            return '男';
        case BLDef.SexType.SexType_Female:
            return '女';
        default:
            return undefined;
      }
    }
    return content;
  },

  // 僅顯示內容前幾位
  LimitTo(content, digit) {
    return content.substring(0, digit);
  },

  // 簡化顯示字元
  SimpleContent(orgText, displayLength) {
    // 過濾html標籤
    const tmp = document.createElement('DIV');
    tmp.innerHTML = orgText;
    const pureText = tmp.textContent || tmp.innerText || '';
    // 過濾ASCII不可見字元
    let finalText = pureText.replace(/[\x00-\x1F]/g, '');
    // 純字串若長度超過則省略
    if (finalText.length > displayLength) {
        finalText = finalText.substring(0, displayLength) + '...';
    }
    return finalText;
  },

  // 超過的數字顯示..+
  UpperLimitDisplay(content, limitNumber) {
    if (content !== undefined && isNaN(content) === false && content > limitNumber) {
      return limitNumber + '+';
    }
    return content;
  },
  
  // 顯示特殊彈窗
  WebShowUniqueForm(ID) {
    $('#main_section').css('z-index', '10086');
    $('#' + ID).show();
    this.MobileDisableScroll();  
  },

  // 關閉特殊彈窗
  WebCloseUniqueForm(ID) {
    $('#' + ID).hide();
    $('#main_section').css('z-index', '10');
    this.MobileEnableScroll();
  },

  // 顯示訊息彈窗
  WebShowMessageForm() {
    $('#MessageWindow').show();
    this.MobileDisableScroll();
  },

  // 關閉訊息彈窗
  WebCloseMessageForm() {
    $('#MessageWindow').hide();
    this.MobileEnableScroll();
  },
  
  // 手機防止畫面滾動
  MobileDisableScroll() {
    this.tmpScrollHeight = $(window).scrollTop();
    $('body').css('position', 'fixed');
    $('body').css('width', '100%');
  },

  // 手機恢復畫面滾動
  MobileEnableScroll() {
    $('body').css('position', 'static');
    $('body').css('width', 'auto');
    $(window).scrollTop(this.tmpScrollHeight);
  },

  // 另開統一的遊戲視窗
  OpenPlayGameWindow(routerName, windowName, Data) {
    let url = '';  
    if (Data == undefined) {          
        url = Router.resolve({ name: routerName } ).href;        
      } else {          
        url = Router.resolve({ name: routerName, params: { Data: URLService.GetUrlParameterFromObj(Data) } }).href;                    
      } 
      window.open(url, windowName, 'width=1500,height=800,left=10,top=150');       
  }, // end OpenPlayGameWindow

  // 綁定瀑布流事件
  BindWaterfallTable(scrollTriggerPercent, callbackFunction) {
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() * scrollTriggerPercent / 100) {
          callbackFunction();
        }
    });
  },
  
  // 綁定按下Enter事件
  BindEnterTrigger(TriggerElement, TriggerFunction) {
    $('#' + TriggerElement).keypress(function (e) {
      if (e.target.nodeName == 'TEXTAREA') {
        return;
      }

      if (e.which == 13) {
        TriggerFunction();
        $(':focus').blur();
      }
    });
  },
  
  IsWeiXin(){
	  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	  var ua = window.navigator.userAgent.toLowerCase();
	  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
	  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	  	return true;
	  }else{
	  	return false;
	  }
	}
};
