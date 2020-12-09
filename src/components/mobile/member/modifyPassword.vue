<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap modify-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>
			
			<article>
				<ul class="tab-head">
					<li :class="ModifyType===2 ?'active':''" @click="SwitchMode(2)">登录密码修改</li>
					<li :class="ModifyType===4 ?'active':''" @click="SwitchMode(4)">取款密码修改</li>
				</ul>
				<section class="tab-section">
	            	<form novalidate="novalidate" class="addcard-form">
						<div class="row input-group">
							<label>原始密码</label>
							<input 
	                            type="password" name="OriginPassword" class="form-control"                          
	                            v-model="PasswordObj.OriginPassword"  
	                            v-validate="{ rules: { regex:Reg.Password, required: true }}" 
	                            placeholder="请输入原来的密码" 
	                        />
						</div>
						<div class="row input-group">
							<label>新 密 码</label>
							<input 
								type="password" name="NewPassword" class="form-control"
	                            v-model="PasswordObj.NewPassword"                            
	                            v-validate="{ rules: { regex:Reg.Password, required: true }}" 
	                            placeholder="请输入新密码"
	                        />
						</div>
						<div class="row input-group">
							<label>确认密码</label>
							<input 
								type="password" name="ConfirmPassword" class="form-control"
                                v-model="PasswordObj.ConfirmPassword"
                                v-validate="{'required': 'true', 'is': PasswordObj.NewPassword}" 
                                data-vv-name="ConfirmPassword"
                                placeholder="请再次输入新密码"                               
                        	/>
                        	<p class="error-tip" v-if="errors.has('OriginPassword') && fields.OriginPassword.touched">
                    			* {{Reg.PasswordErrorMsg}}
                         	</p>
                         	<p class="error-tip" v-else-if="errors.has('NewPassword') && fields.NewPassword.touched">
                    			* {{Reg.PasswordErrorMsg}}
                         	</p>
                         	<p class="error-tip" v-else-if="(errors.has('ConfirmPassword') && fields.ConfirmPassword.touched)">
                    			* 两次输入密码不一致
                         	</p>
						</div>
						<div class="row mt-10">
							<a class="btn btn-gold" @click="SubmitChange();">提&emsp;交</a>
							<router-link :to="{ name: 'member'}" class="btn btn-gray">取&emsp;消</router-link>
						</div>
					</form>
				</section>
			</article>
		</section>
	</div>
</template>

<script>
	import mainHeader from '@/components/mobile/sub/mainHeader';
	import Regex from 'scripts/common/CommDef';
    import PersonalCenterService from 'scripts/businessLogic/personalCenterService';
    import EventBus from 'scripts/common/EventBus';
	
	export default {
		data() {
			return {
                HeaderTitle: '修改密码',
                ModifyType: 2,	//tab类型
                ProcessingFlag: false,
                PasswordObj: {},
                Reg: {
                    Password: Regex.Regex.Password,
                    PasswordErrorMsg: '仅可以使用英文字母,数字与一般常用符号, 字数范围6-20'
                }
			};
        },
		created: function() {
			this.Load();
		},
		methods: {
			Load: function() {
				this.$nextTick(function() {
					
				})
			},
			SwitchMode: function (mode) {
                this.ModifyType = mode;
            },
			// 送出修改密碼
            SubmitChange: async function () {                
                Object.keys(this.fields).forEach(key => {
                    this.fields[key].touched = true;
                });
                const result = await this.$validator.validateAll()
                
                if (result === false) {
                    return;
                }
                // 處理中則直接返回
                if (this.ProcessingFlag === true) {
                    return;
                }

                this.ProcessingFlag = true;

                const inputObj = {
                    CPType: this.ModifyType,
                    ChangePwdInfo: {
                        OriginPwd: this.PasswordObj.OriginPassword,
                        NewPwd: this.PasswordObj.NewPassword,
                        ConfirmNewPwd: this.PasswordObj.ConfirmPassword
                    }
                };

                EventBus.$emit('GlobalLoadingTrigger', true);
                const data = await PersonalCenterService.ChangePassword_Mod(inputObj);
                EventBus.$emit('GlobalLoadingTrigger', false);

                const notifyData = {
                    NotifyMessage: data.Message
                };

                if (data.Ret === 0) {
                    notifyData.CloseFunction = this.ResetPwdForm;
//                  EventBus.$emit('showNotifyMessage', notifyData);
                    EventBus.$emit('SHOW_TIP', notifyData.NotifyMessage); //修改成功提示
					this.$router.push({ name: 'member'}); //修改成功 跳转个人中心
                } else {
                    // 顯示訊息彈窗                    
                    EventBus.$emit('showNotifyMessage', notifyData);
                }

                this.ProcessingFlag = false;
            },
            // 清除畫面驗證與資料
            ResetPwdForm: function () {
                this.PasswordObj = {};
                this.$validator.reset();
            },
            // 切換密碼類型時更新正則與驗證訊息
            UpdateRegex: function () {
                if (this.ModifyType === 2) {
                    this.Reg.Password = Regex.Regex.Password;
                    this.Reg.PasswordErrorMsg = '仅可以使用英文字母,数字与一般常用符号, 字数范围6-20';
                } else if (this.ModifyType === 4) {
                    this.Reg.Password = Regex.Regex.WithdrawPwd;
                    this.Reg.PasswordErrorMsg = '仅可以使用数字, 字数长度6';
                }
            }
			
		},
		components: {
			mainHeader,
		},
		watch: {
			'$route' (to, from) {
				this.ResetPwdForm()
            	this.UpdateRegex()
			}
		},
	}
</script>