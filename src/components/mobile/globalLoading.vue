<template>
    <div class="LoadBox" v-show="ShowLoading===true">
        <div class="Lp">
            <span class="LoadIcon"></span>
        </div>
    </div>
</template>

<script>
    import EventBus from 'scripts/common/EventBus';

    export default {
        data() {
            return {
                ShowLoading: false
            };
        },
        created: function () {
            const self = this;
            EventBus.$on('GlobalLoadingTrigger', (flag) => {
                self.ShowLoading = flag;
            });
        },
        beforeDestroy() {
            EventBus.$off('GlobalLoadingTrigger');            
        }
    };
</script>