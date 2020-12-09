<template>
	<div>
		<!-- 内容 -->
		<section class="msg-wrap modify-wrap tutorial-wrap">
			<!--头部-->
			<main-header :HeaderTitle="this.HeaderTitle"></main-header>

			<article>
				<ul class="tab-head">
					<li :class="ModifyType===2 ?'active':''" @click="SwitchMode(2)">苹果IOS</li>
					<li :class="ModifyType===4 ?'active':''" @click="SwitchMode(4)">安卓Android</li>
				</ul>
				<section class="tab-section">
					<!-- 苹果IOS -->
	            	<div v-if="ModifyType===2">
	            		<p>步骤一：微信登录成功后，点击 “<label>开通登录账密</label>”,并记下账号密码 .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img1.png'" />
	            		<img class="mt-0" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img2.png'" />
	            		<p>步骤二：点击界面右上角的 “<label>...</label>” .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img3.png'" />
	            		<p>步骤三：在弹出的菜单中选择 “<label>在Safari中打开</label>”</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img4.png'" />
	            		<p>步骤四：当确定处于“<label>大厅</label>”页面时，在浏览器页面菜单中选择“<label>分享</label>”.</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img5.png'" />
	            		<p>步骤五：在浏览器页面菜单中选择 “<label>分享</label>” .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img6.png'" />
	            		<p>步骤六：在弹出菜单中选择 “<label>添加到主屏幕</label>” .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img7.png'" />
	            		<p>步骤七：以账号密码重新登入本站 .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img8.png'" />
	            	</div>
	            	<!-- 安卓Android -->
	            	<div v-if="ModifyType===4">
	            		<p>步骤一：微信登录成功后，点击 “<label>开通登录账密</label>”,并记下账号密码 .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img1.png'" />
	            		<img class="mt-0" :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img2.png'" />
	            		<p>步骤二：点击界面右上角的 “<label>...</label>” .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ad_img1.png'" />
	            		<p>步骤三：在弹出的菜单中选择 “<label>在浏览器打开</label>”</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ad_img2.png'" />
	            		<p>步骤四：在浏览器打开的页面中，点击“<label>大厅</label>” .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ad_img3.png'" />
	            		<p>步骤五：当确定处于“<label>大厅</label>”页面时，在浏览器页面设置菜单中选择“<label>添加书签</label>” .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ad_img4.png'" />
	            		<p>步骤六：在添加书签页面中选择 “<label>桌面</label>”并确定 .</br><i>（部分设备无法添加到桌面，可自行添加/收藏到书签）</i></p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ad_img5.png'" />
	            		<p>步骤七：以账号密码重新登入本站 .</p>
	            		<img :src="ResourceCDN+'/EditionImg-mobile/Lambor1.0/images/mobile/tutorial/ios_img8.png'" />
	            	</div>
				</section>
			</article>
		</section>
	</div>
</template>

<script>
	import BLDef from 'scripts/common/BLDef';
	import mainHeader from '@/components/mobile/sub/mainHeader';
	
	export default {
		data() {
			return {
                HeaderTitle: '添加快捷方式教程',
                ModifyType: 2,	//tab类型
                // 資源位置
	            ResourceURL: BLDef.ResourceURL,
	            ResourceCDN: BLDef.ResourceCDN
			};
        },
		methods: {
			SwitchMode: function (mode) {
                this.ModifyType = mode;
            },
		},
		components: {
			mainHeader,
		},
	}
</script>