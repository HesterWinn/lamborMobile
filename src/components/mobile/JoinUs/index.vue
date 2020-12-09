<template>
    <div>
        <!--头部-->
		<main-header :HeaderTitle="this.HeaderTitle"></main-header>
        
        <!-- 内容 -->
		<section class="msg-wrap register-wrap join-us-wrap">
			<div class="logo">
				<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/register/logo.png'" />
				<h2>代理加盟</h2>
			</div>
            <form id="JoinUsForm" class="addcard-form" novalidate="novalidate">
                <div class="cln_block cln_required">
                	<h2 class="title">必填栏位</h2>
                	<div class="row input-group">
						<label>*真实姓名</label>
						<input type="text" class="form-control" v-model="PostDataModel.Name"
							placeholder="请输入您的真实姓名" name="Name" required 
	                        v-validate="{ rules: { regex:Reg.NickName, required: true }}" />
                    </div>
                    <div class="row input-group">
						<label>*手&emsp;&emsp;机</label>
						<input type="text" class="form-control" v-model="PostDataModel.PhoneNo"
							placeholder="请输入您的手机" name="PhoneNo" required 
	                        v-validate="{ rules: { regex:Reg.PhoneNo, required: true }}" />
                    </div>
                    <div class="row input-group">
						<label>*性&emsp;&emsp;别</label>
						<p class="form-select icon">
							<select v-model="PostDataModel.Sex" @change="ChangeProvince">
								<option v-for="Sex in LoadAddPageModel.SexSelectList" v-bind:value="Sex">{{Sex.Name}}</option>
							</select>
						</p>
                    </div>
                    <div class="row input-group">
						<label>*Email</label>
						<input type="text" class="form-control" v-model="PostDataModel.Email"
							placeholder="请输入您的Email" name="Email" required 
	                        v-validate="{ rules: { regex:Reg.Email2, required: true }}" />
                    </div>
                    <div class="row input-group">
						<label>*持卡人姓名</label>
						<input type="text" class="form-control" v-model="PostDataModel.CardName"
							placeholder="持卡人姓名" name="CardName" required 
	                        v-validate="{ rules: { regex:Reg.NickName, required: true }}" />
                    </div>
                    <div class="row input-group">
						<label>*银行名称</label>
						<input type="text" class="form-control" v-model="PostDataModel.BankName"
							placeholder="银行名称" name="BankName" required 
	                        v-validate="{ rules: { regex:Reg.BankName, required: true }}" />
                    </div>
                    <div class="row input-group">
						<label>*开户网点</label>
						<p class="form-select icon">
							<select v-model="PostDataModel.BankProvince" @change="ChangeProvince">
								<option v-for="Province in LoadAddPageModel.ProvinceSelectList" v-bind:value="Province">{{Province.Name}}</option>
							</select>
						</p>
						<p class="form-select icon ml-row">
							<select v-model="PostDataModel.BankCity" @change="ChangeTown">
								<option v-for="Town in LoadAddPageModel.TownSelectList" v-bind:value="Town">{{Town.Name}}</option>
							</select>
						</p>
						<p class="form-select icon ml-row">
							<select v-model="PostDataModel.BankDistrict">
								<option v-for="Dist in LoadAddPageModel.DistSelectList" v-bind:value="Dist">{{Dist.Name}}</option>
							</select>
						</p>
						<input type="text" class="form-control ml-row" name="BankBranchName" 
							placeholder="例：科技园支行" v-model="PostDataModel.BankBranchName" 
							v-validate="{ rules: { regex:Reg.BankBranchName, required: true }}" />
					</div>
					<div class="row input-group">
						<label>*银行账号</label>
						<input type="text" class="form-control" v-model="PostDataModel.BankAccnt"
							placeholder="请输入您的银行账号" name="BankAccnt" required 
	                        v-validate="{ rules: { regex:Reg.BankAccount, required: true }}" />
                    </div>
                    <div class="row input-group">
						<label>*验 证 码</label>
						<input type="text" class="form-control input-scan"
							name="AuthCode"
	                        v-model="PostDataModel.AuthCode" 
	                        v-validate="{ rules: { regex:Reg.VCode, required: true }}"                                                       
	                        placeholder="不区分大小写" />
						<img class="img-scan" v-bind:src="AuthImg" v-on:click="GetAuthCode()" />
					</div>
            	</div>
                
                <div class="cln_block cln_optional">
                    <h2 class="title">选填栏位</h2>
                    <div class="row input-group">
						<label>生&emsp;日</label>
						<input type="date" class="form-control" v-model="PostDataModel.Birth" name="Birth" />
                    </div>
                    <div class="row input-group">
						<label>微信号</label>
						<input type="text" class="form-control" v-model="PostDataModel.WeChatNo"
							placeholder="请输入您的微信号" name="WeChatNo" 
	                        v-validate="{ rules: { regex:Reg.WeChatID }}" />
                    </div>
                    <div class="row input-group">
						<label>Q&emsp;Q</label>
						<input type="text" class="form-control" v-model="PostDataModel.QQNo"
							placeholder="请输入您的QQ" name="QQNo" 
	                        v-validate="{ rules: { regex:Reg.QQID }}" />
                    </div>
                    <div class="row input-group">
						<label>备&emsp;注</label>
						<textarea type="text" class="form-control" v-model="PostDataModel.Remark"
							placeholder="备注" name="Remark" 
	                        v-validate="{ rules: { regex:Reg.Remark }}" ></textarea>
                    </div>
                </div>
                
				<p class="error-tip" v-if="errors.has('Name') && fields.Name.touched">*真实姓名仅可以使用中英文字母,空白, 字数范围2-50</p>
				<p class="error-tip" v-else-if="errors.has('PhoneNo') && fields.PhoneNo.touched">*请输入合法的手机号码</p>
				<p class="error-tip" v-else-if="!LoadAddPageModel.SexSelectList || LoadAddPageModel.SexSelectList == -1">*性别选择项不能为空</p>
				<p class="error-tip" v-else-if="errors.has('Email') && fields.Email.touched">*Email仅可以使用英文字母,数字,句号,@,下划线和减号, 字数范围5-100</p>
				<p class="error-tip" v-else-if="errors.has('CardName') && fields.CardName.touched">*持卡人姓名仅可以使用中英文字母,空白, 字数范围2-50</p>
				<p class="error-tip" v-else-if="errors.has('BankName') && fields.BankName.touched">*银行名称仅可以使用中英文字母,数字, 下划线和减号, 字数范围2-50</p>
				<!-- 开 户 行 -->
				<p class="error-tip" v-else-if="!PostDataModel.BankProvince || PostDataModel.BankProvince == -1">提示: 请选择省份</p>
				<p class="error-tip" v-else-if="!PostDataModel.BankCity || PostDataModel.BankCity == -1">提示: 请选择城市</p>
				<p class="error-tip" v-else-if="!PostDataModel.BankDistrict || PostDataModel.BankDistrict == -1">提示: 请选择区</p>
				<p class="error-tip" v-else-if="errors.has('BankBranchName') && fields.BankBranchName.touched">开户行仅可以使用中英文字母,空白, 字数范围2-50</p>
				
				<p class="error-tip" v-else-if="errors.has('BankAccnt') && fields.BankAccnt.touched">*银行账号仅可以使用10—25个数字</p>
				<p class="error-tip" v-else-if="errors.has('AuthCode') && fields.AuthCode.touched">*验证码错误</p>
				<p class="error-tip" v-else-if="errors.has('WeChatNo') && fields.WeChatNo.touched">*微信号仅可以使用6—20个字母、数字、下划线和减号, 必须以字母开头</p>
				<p class="error-tip" v-else-if="errors.has('QQNo') && fields.QQNo.touched">*QQ仅可以使用5—15个数字</p>
				<p class="error-tip" v-else-if="errors.has('Remark') && fields.Remark.touched">*仅可以使用中英文字母,数字,空白与一般常用符号, 字数限制100</p>
				
                <div class="row">
					<a v-on:click="AddIB()" class="btn btn-gold">提&emsp;交</a>
				</div>
             </form>
        </div>
    </div>
</template>

<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/register/index.less';
</style>
<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
	import Regex from 'scripts/common/CommDef';
	import RegisterService from 'scripts/businessLogic/registerService';
	import BLDef from 'scripts/common/BLDef';
	import CommService from 'scripts/businessLogic/commonService';
	import EventBus from 'scripts/common/EventBus';
	import moment from 'moment';
	import CommUtility from 'scripts/common/CommUtility';
	
	export default {
	    data() {
	        return {
	            HeaderTitle: "加盟我们",
	            // 正則表達式
	            Reg: Regex.Regex,
	
	            // post用的model
	            PostDataModel: {
	                Name: '',
	                Email: '',
	                CardName: '',
	                BankName: '',
	                BankProvince: '',
	                BankCity: '',
	                BankDistrict: '',
	                BankBranchName: '',
	                BankAccnt: '',
	                Birth: moment(new Date()).format('YYYY-MM-DD'),
	                WeChatNo: '',
	                QQNo: '',
	                Remark: '',
	                AuthCode: '',
	            },
	            // 載入頁面
	            LoadAddPageModel: {
	                ProvinceSelectList: {},
	                TownSelectList: {},
	                DistSelectList: {},
	            },
	            // 驗證碼
	            AuthImg: '',
	            // PreToken
	            PreToken: '',
	            FlagObj: false,
	            // 驗證碼顏色設定
	            RGB: {
	                R: 255,
	                G: 200,
	                B: 255,
	            },
	            // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
	        };
	    },
	    created: async function () {
	        this.Load()
	        this.LoadPage()
	        this.GetAuthCode()
	    },
	    mounted: function () {
	        CommUtility.BindEnterTrigger('JoinUsForm', this.AddIB);
	    },
	    methods: {
	    	Load: function() {
				this.$nextTick(function() {
					//提示弹窗居中
					$('#WarnTipModal').on('show.bs.modal', function () {
			            $(this).css('display', 'block');  
			            var ModalHeight=$(window).height() / 2 - $('#WarnTipModal .modal-dialog').height() / 2 - 50;  
			            $(this).find('.modal-dialog').css({  
			                'margin-top': ModalHeight  
			            }); 
					});
				})
			},
	        // 取得驗證碼
	        GetAuthCode: async function () {
	            /* eslint-disable camelcase */
	            const VCode_CharacterRGB = this.RGB;
	            const RGBData = {
	                VCode_CharacterRGB,
	            };
	            const retData = await CommService.VerifyCode_Gen(RGBData);
	            this.AuthImg = retData.Data.VCode;
	            this.PreToken = retData.Data.ID;
	        }, // end GetAuthCode
	
	        // 載入頁面
	        LoadPage: async function () {
	            const dataObj = {};
	            const retData = await RegisterService.LoadIBRegisterMainPage(dataObj);
	
	            // 失敗
	            if (retData.Ret != 0) {
	                return;
	            } // end if
	
	            // 成功
	            this.LoadAddPageModel = retData.Data;
	            this.PostDataModel.BankProvince = this.LoadAddPageModel.ProvinceSelectList[0];
	            this.PostDataModel.BankCity = this.LoadAddPageModel.TownSelectList[0];
	            this.PostDataModel.BankDistrict = this.LoadAddPageModel.DistSelectList[0];
	            this.PostDataModel.Sex = { Value: -1 }; // default value
	        }, // end LoadPage
	        // 選擇省並變更其他選單資料
	        ChangeProvince: async function () {
	            const dataObj = {
	                SType: BLDef.SelectTypesDef.CITIES,
	                InputValues: [this.PostDataModel.BankProvince.Value]
	            };
	            const retData = await CommService.GetCityTypes(dataObj);
	            if (retData.Ret == 0) {
	                this.LoadAddPageModel.TownSelectList = retData.Data.SelectList;
	                this.PostDataModel.BankCity = retData.Data.SelectList[0];
	                this.PostDataModel.BankDistrict = this.LoadAddPageModel.DistSelectList[0];
	                this.LoadAddPageModel.DistSelectList = [this.LoadAddPageModel.DistSelectList[0]];
	            } // end if
	        }, // end ChangeProvince
	
	        // 選擇城市並變更其他選單資料
	        ChangeTown: async function () {
	            const dataObj = {
	                SType: BLDef.SelectTypesDef.DISTS,
	                InputValues: [this.PostDataModel.BankCity.Value]
	            };
	            const retData = await CommService.GetDistTypes(dataObj);
	            if (retData.Ret === 0) {
	                this.LoadAddPageModel.DistSelectList = retData.Data.SelectList;
	                this.PostDataModel.BankDistrict = retData.Data.SelectList[0];
	            } // end if
	        }, // end ChangeTown
	        
	        // 所有欄位驗證
	        validate: function () {
	            Object.keys(this.fields).forEach(key => {
	                    this.fields[key].touched = true;
	                });
	            return this.$validator.validateAll().then(result => {
	                return result;
	            });
	        }, // end validate
	
	        AddIB: async function () {
	            const validate = await this.validate();
	            // 驗證所有欄位
	            if (!validate) {
	                return
	            } // end if
	            // 驗證開戶網點下拉式選單
	            if (this.PostDataModel.Sex == -1 ||
	            	this.PostDataModel.BankProvince.Value == -1 ||
	            	this.PostDataModel.BankCity.Value == -1 ||
	            	this.PostDataModel.BankDistrict.Value == -1) {
	                return
	            } // end
	            if (this.FlagObj === true) {
	                return;
	            } // end if
	
	            this.FlagObj = true;
	
	            // 時間資料轉換
	            if (this.PostDataModel.Birth !== undefined) {
	                this.PostDataModel.Birth = moment(this.PostDataModel.Birth).format('YYYY/MM/DD');
	            }
	
	            const dataObj = {
	                VCodeID: this.PreToken,
	                VCode: this.PostDataModel.AuthCode,
	                WGUID: BLDef.WGUID,
	                PromotionUrl: window.location.href, // new $window.URL($location.absUrl()).origin, // 完整DomainName含參數
	                PromotionInfo: this.$route.params.Data,
	                IB: this.PostDataModel
	            };
	
	            EventBus.$emit('GlobalLoadingTrigger', true);
	            const retData = await RegisterService.AddIB(dataObj);
	            EventBus.$emit('GlobalLoadingTrigger', false);
	
	            this.FlagObj = false;
	
	            const notifyData = {
	                NotifyMessage: retData.Message
	            };
	
	            // 失敗
	            if (retData.Ret != 0) {
	                // 秀出錯誤訊息
	                EventBus.$emit('showNotifyMessage', notifyData);
	                this.PostDataModel.AuthCode = '';
	                this.$validator.reset();
	                this.GetAuthCode();
	                return;
	            } // end if
	            const notifyData1 = {
	            	NotifySubTitle: '申请成功!',
                    NotifyMessage: '感谢您申请代理加盟，我们已经收到您的申请讯息，我们将进行资料审核，会尽快通知您审核结果，感谢您的耐心等候',
                    CloseFunction: this.CloseFunction
                };
                EventBus.$emit('showWarnTip', notifyData1)
	        },  // end AddIB
	        
	        CloseFunction: function () {
                this.$router.push({ name: 'index'}) //登录成功 跳转首页
            }
	    },
	    components: {
	        mainHeader,
	    },
	};
</script>

