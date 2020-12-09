<template>
	<!-- 头部 -->
	<header>
		<input class="icon-back" type="button" name="Submit" onclick="javascript:history.back(-1);">
		<!--<div class="fl-btn">
			<em class="icon-close"></em>
		</div>-->
		<!--<div class="fr-btn">
			<em class="icon-menu"></em>
		</div>-->
		<h2>{{this.HeaderTitle}}</h2>
	</header>
</template>


<style lang="less">
	@import '~styles/cdn.less';
	@import '~styles/modal/mobile/layout/mainHeader.less';
</style>

<script>
	export default {
		props: {
            HeaderTitle: {
                type: String,                      
                default: function () {
                    return "联盟娱乐";             
                }
            }
        },
		created: function() {
			this.Load();
		},
		methods: {
			Load: function(){
				this.$nextTick(function () {
				})
			},
		},
	}
</script>

