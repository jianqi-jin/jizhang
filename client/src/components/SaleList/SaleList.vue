<template>
<div>Sale</div>
</template>

<script lang="ts">

import {getSaleList} from '@/request/request.js';
export default {
    data() {
        return {
            pn: 0,
            rn: 10
        }
    },
    mounted() {
        getSaleList({
            pn: this.pn,
            rn: this.rn
        }).then(res => {
            console.log(res);
        })
    }
}
</script>

<style lang="stylus" scoped>

</style>