<template>
<div class="usercenter-wrap">
    <el-button type="primary" size="mini" @click="toEdit">编辑</el-button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        toEdit() {
            this.$router.push('/user/edit');
        }
    }
}
</script>

<style lang="stylus" scoped>
.usercenter-wrap
    padding 30px

</style>