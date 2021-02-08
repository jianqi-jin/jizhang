<template>
<div class="app-wrap">
    <div class="navigator">
        <navigator></navigator>
    </div>
    <div class="content-wrap">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import Navigator from '@/components/Navigator/Navigator.vue';
import {mapActions} from 'vuex';
export default {
    components: {
        Navigator
    },
    data() {
        return {
            msg: 'msg'
        }
    },
    mounted() {
        this.checkLogin();
    },
    methods: {
        ...mapActions(['checkLogin'])
    }
}
</script>

<style lang="stylus">
body
    margin 0
*
    box-sizing border-box
.app-wrap
    position relative
    height 100vh
    width 100vw
    .navigator
        position absolute
        width 210px
        height 100vh
        overflow scroll
    .content-wrap
        position absolute
        right 0px
        left 210px
        overflow scroll
        height 100vh
</style>