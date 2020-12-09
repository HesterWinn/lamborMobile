'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
//NODE_ENV: '"development"',

	/* 发版链接 */
	// 後端API位址
	 BKBLUrl: '"http://wwwbl.sgxplay.com/BL/ExecuteAction"',
	 // 網站識別碼
	 WGUID: '"kqwv"',
	 // Signalr連線位址
	 SignalRUrl: '"http://broadcast.sgxplay.com"',
	 // 網頁版網址
	 WebVersionHost: '"http://www.sgxplay.com"',
	 // 資原檔URL
	 ResourceURL: '"http://mobile.sgxplay.com"',
	 ResourceCDN: '"http://d1ysb7s3855d77.cloudfront.net"',
  
	/* 本地链接 */
//	BKBLUrl: '"http://192.168.201.197:7007/BL/ExecuteAction"',
//// 網站識別碼
//	WGUID: '"qqq1"',
//// Signalr連線位址
//	SignalRUrl: '"http://192.168.201.197:7001"',
//// 網頁版網址
//	WebVersionHost: '"http://192.168.200.127:7005"',
//	// 資原檔URL
//	ResourceURL: '"http://192.168.200.127:7005"',
//	ResourceCDN: '"http://wowza211.cdn1.chinacache.woooow/LamborSummary"',
  
  // 手機版網址
  MobileVersionHost: '"http://mobile.sgxplay.com"',
  // 微信授权位址
  WxAccreditHost: '"https://open.weixin.qq.com/connect/oauth2/authorize"',
  
  
})
